/**
 * crt-kernel.wgsl.js
 * WGSL kernel for the CRT scanline reconstruction pipeline.
 *
 * Exports two wgslFn nodes:
 *   crtKernelFn   -- full TriG scanline path + convergence + optional RGB split
 *                   + UV distortions: sag (geometry squeeze), rollbar (scroll),
 *                     h-swim (per-scanline horizontal jitter)
 *                   + interlacing (field-parity attenuation via CPU-driven
 *                     interlaceField uniform, toggled each renderFrame)
 *   crtHalationFn -- reads from post-scanline scannedColor; applies Gaus(dy, halationSharp)
 *                   so the halo follows the reconstructed scanline structure, not
 *                   the raw pre-filter source image. halationSharp: -0.4 = diffuse
 *                   glass scatter (default), -2.5 = original inter-scanline bleed.
 *
 * Gap A -- Source resolution awareness:
 *   All internal helpers now thread src (virtual CRT grid) and scale (res/src).
 *   Dist() snaps to source-pixel boundaries, not output pixels.
 *   Fetch() converts source-pixel offsets to output pixels via scale.
 *   phosphorDecay() uses integer scanline index (floor(pos_y * src_y) / src_y).
 *   sourceSizeX/Y = 0 -> backward-compatible (uses screenSize).
 *
 * Gap C -- Interlacing:
 *   interlace/interlaceField params are threaded into the kernel but GPU-side
 *   attenuation is no longer applied here. Off-field row fill is handled by the
 *   TSL layer (buildCRTEffect) using prevTexNode from the previous frame.
 *
 * Scene render target is already linear-light (Three.js WebGPU render target).
 * No sRGB decode (ToLinear) is applied.
 *
 * Textures are sampled with textureLoad() (integer pixel coords) rather than
 * textureSampleLevel().
 */

import { wgslFn } from 'three/tsl';

// ---------------------------------------------------------------------------
// Shared WGSL helper block -- appended to crtKernelFn; crtHalationFn includes
// it transitively via the [crtKernelFn] includes list.
// ---------------------------------------------------------------------------
const HELPERS = /* wgsl */`

// Sub-pixel fractional distance from the source-pixel-grid centre.
// pos is in UV space (0..1); src is the virtual CRT source resolution.
// Using src (not res) ensures the Gaussian beam width is in source-pixel units,
// matching how a real CRT electron beam spans a fixed number of phosphor cells
// regardless of output display resolution.
// scrollPhase: pre-computed JS-side phase = (t * scrollRate) % src_y, updated each frame.
// Wraps at integer source-line boundaries so fract(dy) is continuous -- no visible seam.
// Using a JS uniform avoids the tWrapped-boundary discontinuity (t*scrollRate jumps 180
// source lines when tWrapped resets to 0 every 3600 s).
fn Dist(pos: vec2f, src: vec2f, scrollPhase: f32) -> vec2f {
  let dx = pos.x * src.x;
  let dy = pos.y * src.y + scrollPhase;
  return -vec2f((dx - floor(dx)) - 0.5, (dy - floor(dy)) - 0.5);
}

// Uses exp2(sharp * pos^2) with base-2 exponentiation convention.
// Coefficients hardPix and hardScan are tuned for base-2: exp2(x) = exp(x * ln2).
// Equivalent to exp() with sharp scaled by 1/ln(2) ~ 1.443.
// Do NOT substitute exp() without rescaling: hardPix -1.2 -> -1.73, hardScan -8 -> -11.5.
fn Gaus(pos: f32, sharp: f32) -> f32 {
  return exp2(sharp * pos * pos);
}

// Approximate error function (Abramowitz & Stegun 7.1.26, max |err| < 1.5e-7).
fn Erf(x: f32) -> f32 {
  let t = 1.0 / (1.0 + 0.3275911 * abs(x));
  let p = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  let e = 1.0 - p * exp(-x * x);
  return select(-e, e, x >= 0.0);
}

// Aperture integral: fraction of a Gaussian beam (parameterised by sharp, base-2 convention)
// that passes through a rectangular slit of width \`apertureW\` source pixels centred at \`dx\`.
// Physically: the exact luminance contribution of a phosphor stripe to a given output pixel
// when the beam profile is Gaussian.  Returns a value in [0, 1].
// sigma = sqrt(-1 / (2 * sharp * ln(2))); the erf argument is (dx +/- w/2) / (sigma * sqrt(2)).
fn ErfGaus(dx: f32, sharp: f32, apertureW: f32) -> f32 {
  let sigma = sqrt(-1.0 / (2.0 * sharp * 0.693147));
  let lo = (dx - apertureW * 0.5) / (sigma * 1.41421356);
  let hi = (dx + apertureW * 0.5) / (sigma * 1.41421356);
  return 0.5 * (Erf(hi) - Erf(lo));
}

// Pre-computed variant -- caller passes sigmaR2 = sigma * sqrt(2) once to avoid
// redundant sqrt() + divisions when ErfGausSR2 is called multiple times with the same sharp.
// Used by Horz3G and Horz5G to hoist sigma computation out of the per-tap loop.
fn ErfGausSR2(dx: f32, sigmaR2: f32, halfAperture: f32) -> f32 {
  return 0.5 * (Erf((dx + halfAperture) / sigmaR2)
              - Erf((dx - halfAperture) / sigmaR2));
}

// Luminance of a linear RGB colour (BT.709 coefficients; scene RT is linear-light).
fn Luma(c: vec3f) -> f32 {
  return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

// Load the scene texture at a pixel-snapped position with an integer source-pixel offset.
// off is in source-pixel units; scale = res / src converts source offsets to res-space.
// Uses textureLoad (no sampler) -- every call already resolves to an integer texel.
// Returns vec3f -- no ToLinear decode (scene output is already linear).
//
// The base coordinate uses textureDimensions(tex) so that pos (UV 0-1) always maps
// to the full texture extent. This is critical in two-pass mode where the texture
// (scene output or kernelRT) can differ in size from the render target resolution.
// Offsets are converted from source-pixel units to texel units via (texSize / res) * scale.
fn Fetch(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f) -> vec3f {
  let texSize = vec2f(textureDimensions(tex, 0));
  let texScale = texSize / max(res, vec2f(1.0));
  let iCoordF  = pos * texSize + off * scale * texScale;
  // Clamp to valid texel range — prevents OOB taps from darkening the Horz normaliser
  // while preserving correct reconstruction for the boundary source pixels.
  let iCoord   = clamp(vec2i(floor(iCoordF)), vec2i(0), vec2i(texSize) - vec2i(1));
  return textureLoad(tex, iCoord, 0).rgb;
}

// Like Fetch but displaces R and B channels.
// DR-8 P3-B: FetchConv issues 3 textureLoad calls (center G, shifted R, shifted B).
// For Horz5G: 5 taps x 3 loads = 15 textureLoads. For TriG (Horz3G+Horz5G+Horz3G): 33 total.
// In practice this adds ~0% measured GPU cost: rPos/bPos are within ~20 px of center,
// hitting the same L1 cache lines as the center fetch on all tested hardware.
// Theoretical fix (precompute R/B shifts into separate RTT channels) would reduce to
// 5+5+5=15 loads for the same quality but requires 3-channel intermediate textures.
// Deferred: empirical cost negligible; architectural complexity high.
//   - Radially (dynamic/pincushion): scales with distance^2 from screen centre.
//     conv is the convergence uniform (0 = off, 0.035 = subtle, 0.1 = obvious).
//   - Statically (uniform across screen): R uses convStaticX/Y, B uses convBX/convBY.
//     Independent B offset breaks the anti-symmetric constraint -- real thermal drift
//     moves both R and B in the same direction, with B ~30% larger than R.
//     Old behaviour (anti-symmetric): set convBX = -convStaticX, convBY = -convStaticY.
//   - convAspect (P1-B): 0 = radially symmetric (delta gun / shadow mask),
//     1 = H-only pincushion (inline aperture grille / Trinitron geometry).
//     Real Trinitron: R and B guns displaced horizontally -> H-only misconvergence.
fn FetchConv(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f,
             conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32,
             convAspect: f32) -> vec3f {
  // Fast path: all convergence disabled -- single fetch, no extra reads.
  if (abs(conv) < 0.0001 && abs(convStaticX) < 0.0001 && abs(convStaticY) < 0.0001
      && abs(convBX) < 0.0001 && abs(convBY) < 0.0001) {
    return Fetch(tex, pos, off, res, scale);
  }
  let dir = pos - vec2f(0.5);
  // P1-B: anisotropic convergence -- mix between radial (dot(dir,dir)) and H-only (dir.x^2).
  // convAspect=0: radial (shadow mask / delta gun).
  // convAspect=1: H-only inline (aperture grille / Trinitron).
  // P1-C: normalize dir by screen aspect before dot() so radial distance is in physical
  // pixel units rather than UV units. For convAspect=1 (H-only default) this is a no-op.
  let aspect = res.x / max(res.y, 1.0);
  let dirPhys = vec2f(dir.x, dir.y * aspect);
  let mag = -conv * mix(dot(dirPhys, dirPhys), dir.x * dir.x, convAspect);
  // Static offset: convert source-pixel offset to UV (divide by source resolution).
  // scale = res / src, so src = res / scale -> staticUv = vec2f(convStaticX, convStaticY) / (res / scale)
  let staticRUv = vec2f(convStaticX, convStaticY) * scale / res;
  let staticBUv = vec2f(convBX, convBY) * scale / res;
  let rPos = pos + dir *  mag + staticRUv;
  let bPos = pos + dir * -mag + staticBUv;   // B uses its own independent static offset
  let center = Fetch(tex, pos, off, res, scale);
  var r: f32;
  var b: f32;
  if (max(abs(rPos.x - 0.5), abs(rPos.y - 0.5)) > 0.5) {
    r = center.r;
  } else {
    r = Fetch(tex, rPos, off, res, scale).r;
  }
  if (max(abs(bPos.x - 0.5), abs(bPos.y - 0.5)) > 0.5) {
    b = center.b;
  } else {
    b = Fetch(tex, bPos, off, res, scale).b;
  }
  return vec3f(r, center.g, b);
}

// (Tri and Horz3/Horz5 removed -- replaced by TriG/Horz3G/Horz5G with dx hoisting and convAspect.
//  Horz3Lin/Horz5Lin also removed: luma estimation now uses a single FetchConvGamma center tap.)

// Phosphor decay sweep: brightness decays exponentially from the moment the
// electron beam last passed through this scanline row.
// Scanline index is snapped to the scrolling source-pixel grid (floor(pos_y*src_y + t*scrollRate))
// so the decay phase is synchronised with the Gaussian scanline position (P2-A fix).
// All output pixels that map to the same source scanline share the same phase,
// eliminating sub-pixel phase shimmer across the scanline height.
fn phosphorDecay(pos_y: f32, src_y: f32, t: f32, flickerRate: f32, tau: f32, scrollPhase: f32) -> f32 {
  let scrolledY = pos_y * src_y + scrollPhase;
  let scanline  = floor(scrolledY);
  let phase     = fract(t * flickerRate - scanline / src_y);
  return exp(-phase / max(tau * flickerRate, 0.0001));
}

// Per-channel phosphor decay (P1-A): P22 CRT phosphor taus at broadcast luminance loading.
// P22 red (Y2O2S:Eu^3+): tau ~= 0.3-1 ms at broadcast luminance (JEDEC JEP-133).
//   Default 1.5 ms is slightly conservative (above physical max) but gives
//   identical output at 60 Hz -- chanMu(1.5ms, 60Hz) ~= chanMu(1ms, 60Hz) < 0.2%.
// P22 green (rare-earth oxysulphide): tau ~= 100-300 us.
// P22 blue (ZnS:Ag,Cl): tau physical < 100 us (some sources cite 57 ns at low drive;
//   at broadcast loading, persistence to 10% is ~50-100 us).
//   Any tau < 2 ms gives identical output at 60 Hz (full decay within one frame).
// NOTE: P1 willemite (Zn2SiO4:Mn^2+): tau ~= 10-15 ms -- NOT a P22 colour TV phosphor.
// Returns vec3f decay factors (one per channel) for use with mix(vec3f(1.0), decay, flickerAmt).
fn phosphorDecayRGB(pos_y: f32, src_y: f32, t: f32, flickerRate: f32,
                    tauR: f32, tauG: f32, tauB: f32, scrollPhase: f32) -> vec3f {
  let scrolledY = pos_y * src_y + scrollPhase;
  let scanline  = floor(scrolledY);
  let phase     = fract(t * flickerRate - scanline / src_y);
  return vec3f(
    exp(-phase / max(tauR * flickerRate, 0.0001)),
    exp(-phase / max(tauG * flickerRate, 0.0001)),
    exp(-phase / max(tauB * flickerRate, 0.0001))
  );
}

// Gamma-domain fetch helpers -- encode each texel to CRT gamma before
// the horizontal Gaussian weighted average.  Physical basis: the CRT beam spreads
// in voltage domain (gamma-decoded signal), not linear-light.  Interpolating in
// gamma space gives brighter, more natural-looking scanline edges (matches how
// crt-royale and Guest Advanced CRT compute horizontal reconstruction).
// After TriG() the result is decoded back to linear for the rest of the pipeline.
// P3-C: kernelGamma is user-configurable (default 2.5). 1/kernelGamma encodes to gamma space.
fn FetchConvGamma(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, gammaFast: f32) -> vec3f {
  let c = max(FetchConv(tex, pos, off, res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect), vec3f(0.0));
  return select(pow(c, vec3f(1.0 / kernelGamma)), sqrt(c), gammaFast > 0.5);
}

// P1-C + P3-B: dx is precomputed once in TriG and passed in -- eliminates 4 redundant Dist().x
// evaluations per output pixel. scrollRate and t are removed from Horz3G/Horz5G because
// Dist().x is purely spatial (no time dependence): dx = -(pos.x*src.x - floor(pos.x*src.x) - 0.5).
// P2-A (DR-9): sigmaR2 and halfAper are hoisted to the caller (TriG / crtHorzPassFn) and passed in,
// eliminating 2 redundant sqrt() calls per output pixel in the TriG path. hardPix and apertureW
// are no longer needed in the Horz signatures -- all callers compute and own those values.
// ErfGausSR2 integrates the Gaussian beam over the physical aperture width for each tap weight,
// matching crt-royale BEAM_SHAPE_MODE=2. The normaliser (wb+wc+wd) handles total energy.
fn Horz3G(tex: texture_2d<f32>, pos: vec2f, off: f32, scale: vec2f, res: vec2f, sigmaR2: f32, halfAper: f32, dx: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, gammaFast: f32) -> vec3f {
  let b = FetchConvGamma(tex, pos, vec2f(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let c = FetchConvGamma(tex, pos, vec2f( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let d = FetchConvGamma(tex, pos, vec2f( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let wb = ErfGausSR2(dx - 1.0, sigmaR2, halfAper);
  let wc = ErfGausSR2(dx + 0.0, sigmaR2, halfAper);
  let wd = ErfGausSR2(dx + 1.0, sigmaR2, halfAper);
  return (b * wb + c * wc + d * wd) / (wb + wc + wd);
}

fn Horz5G(tex: texture_2d<f32>, pos: vec2f, off: f32, scale: vec2f, res: vec2f, sigmaR2: f32, halfAper: f32, dx: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, gammaFast: f32) -> vec3f {
  let a = FetchConvGamma(tex, pos, vec2f(-2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let b = FetchConvGamma(tex, pos, vec2f(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let c = FetchConvGamma(tex, pos, vec2f( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let d = FetchConvGamma(tex, pos, vec2f( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let e = FetchConvGamma(tex, pos, vec2f( 2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let wa = ErfGausSR2(dx - 2.0, sigmaR2, halfAper);
  let wb = ErfGausSR2(dx - 1.0, sigmaR2, halfAper);
  let wc = ErfGausSR2(dx + 0.0, sigmaR2, halfAper);
  let wd = ErfGausSR2(dx + 1.0, sigmaR2, halfAper);
  let we = ErfGausSR2(dx + 2.0, sigmaR2, halfAper);
  return (a * wa + b * wb + c * wc + d * wd + e * we) / (wa + wb + wc + wd + we);
}

// Gamma-domain scanline reconstruction.  Fetches in gamma=kernelGamma space so the horizontal
// Gaussian blending happens in voltage domain (as on real CRT hardware), then
// decodes back to linear light for the rest of the pipeline.
// P1-C: Dist() is computed ONCE here and dx/dy passed to all Horz calls,
// eliminating 4 redundant Dist().x evaluations (saves ~32 ALU ops/px).
fn TriG(tex: texture_2d<f32>, pos: vec2f, src: vec2f, scale: vec2f, res: vec2f, hardPix: f32, hardScan: f32, scrollPhase: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, apertureW: f32, apertureH: f32, gammaFast: f32) -> vec3f {
  // P1-C: compute Dist() once -- both dx and dy -- before any Horz calls.
  let dist_val   = Dist(pos, src, scrollPhase);
  let dx         = dist_val.x;
  let dy         = dist_val.y;

  // 1-tap center fetch for luma estimation -- used for dynHardPix (horizontal beam width).
  // Keeps the center-row 1-tap approach for sigmaR2/halfAper which must be known before the Horz calls.
  let centerGamma  = FetchConvGamma(tex, pos, vec2f(0.0, 0.0), res, scale,
                                    conv, convStaticX, convStaticY, convBX, convBY,
                                    convAspect, kernelGamma, gammaFast);
  // DR-6 P1-A: decode to linear before computing luma (BT.709 coefficients require linear light).
  // Gamma-encoded luma overestimates mid-tone values by ~52% at gamma=2.5, causing over-wide beams.
  let centerLinear = select(pow(max(centerGamma, vec3f(0.0)), vec3f(kernelGamma)), centerGamma * centerGamma, gammaFast > 0.5);
  let luma         = clamp(Luma(centerLinear), 0.0, 1.0);
  // Power-law beam softening: dynHardPix broadens with luminance via sqrt(luma).
  // Physical motivation: at high beam current, electrostatic and aberration effects
  // increase spot size. The exact power law is not cleanly derivable from CRT electron
  // optics; luma^0.5 is an empirically tuned approximation that produces natural-looking
  // scanline edges (CRT-Royale uses luma^0.33; both are empirical).
  // Using linear luma (decoded from gamma) is correct: beam current is proportional to
  // display light output in linear domain, not gamma-encoded voltage.
  let beamW      = sqrt(luma);  // empirical sigma broadening: sigma ~ luma^0.5
  // Clamp to -0.1 so beam-broadening at corners (defocusFac=0 -> hardPix->0) cannot
  // make dynHardPix zero or positive, which would produce NaN in sigmaR2.
  let dynHardPix = min(hardPix + mix(0.0, 1.5, beamW), -0.1);

  // DR-9 P2-A: hoist sigmaR2 and halfAper -- shared by all three Horz calls (same dynHardPix).
  // Saves 2 redundant sqrt() calls per output pixel vs. computing inside each Horz function.
  let sigmaR2  = sqrt(-1.0 / (2.0 * dynHardPix * 0.693147)) * 1.41421356;
  let halfAper = apertureW * 0.5;

  // Horizontal reconstruction in gamma domain with precomputed dx (P1-C).
  let a_g = Horz3G(tex, pos, -1.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let b_g = Horz5G(tex, pos,  0.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  let c_g = Horz3G(tex, pos,  1.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);

  // P2-B: per-row luma for vertical Gaussian weights.
  // Each source row may have different luminance; outer-row dynScan must use its own luma,
  // not the center row's, to correctly model vertical beam width at luma transitions.
  // (centerGamma/beamW are still used above for dynHardPix horizontal broadening -- correct.)
  let aLinear = select(pow(max(a_g, vec3f(0.0)), vec3f(kernelGamma)), a_g * a_g, gammaFast > 0.5);
  let bLinear = select(pow(max(b_g, vec3f(0.0)), vec3f(kernelGamma)), b_g * b_g, gammaFast > 0.5);
  let cLinear = select(pow(max(c_g, vec3f(0.0)), vec3f(kernelGamma)), c_g * c_g, gammaFast > 0.5);
  let dynScanA = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(aLinear), 0.0, 1.0)));
  let dynScanB = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(bLinear), 0.0, 1.0)));
  let dynScanC = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(cLinear), 0.0, 1.0)));

  // Vertical blend: aperture-integrated ErfGausSR2 replaces point-sampled Gaus.
  // Fixes ~11% peak brightness overestimate at hardScan=-8 (SPEC-21 P3-F).
  // Vertical is intentionally un-normalised (preserves dark scanline gaps).
  let halfApertureH = apertureH * 0.5;
  let sigmaVR2_A = sqrt(-1.0 / (2.0 * min(dynScanA, -0.1) * 0.693147)) * 1.41421356;
  let sigmaVR2_B = sqrt(-1.0 / (2.0 * min(dynScanB, -0.1) * 0.693147)) * 1.41421356;
  let sigmaVR2_C = sqrt(-1.0 / (2.0 * min(dynScanC, -0.1) * 0.693147)) * 1.41421356;

  let out_g  = a_g * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH)
             + b_g * ErfGausSR2(dy +   0.0,  sigmaVR2_B, halfApertureH)
             + c_g * ErfGausSR2(dy +   1.0,  sigmaVR2_C, halfApertureH);

  // Decode back to linear light.
  return select(pow(max(out_g, vec3f(0.0)), vec3f(kernelGamma)), out_g * out_g, gammaFast > 0.5);
}

// Shared UV distortion chain: sag -> rollbar -> H-sync hook/flagging -> H-swim.
// Used identically by crtKernel, crtHorzPass, and crtHalation.
// Returns the fully distorted position p; p.y == fract(saggedY - rollbarPhase)
// (hook and swim only modify p.x after the rollbar step).
// DR-14 P3-B: swimYScale normalises uv.y before hSwimNorm so spatial frequency of H-swim
// is always in cycles/output-screen-height. Single-pass and halation pass 1.0 (unchanged);
// crtHorzPassFn passes outputSizeY / max(srcH, 1.0) to correct the two-pass mismatch.
// WGSL forward reference: hSwimNorm() is declared later in this source string (valid at module scope).
fn applyUVDistortions(pos: vec2f, swimAmt: f32, rollbarPhase: f32, sagPhase: f32, t: f32, swimYScale: f32) -> vec2f {
  // 1. Voltage sag: shrink image toward centre (max 4% at sagPhase=1.0)
  let sagMag   = sagPhase * 0.04;
  var p        = vec2f(0.5) + (pos - vec2f(0.5)) * (1.0 - sagMag);
  // 2. Rollbar scroll: fract-wrap Y so the content seam tracks the CSS dark band.
  let wrappedY = fract(p.y - rollbarPhase);
  // 3. H-sync hook / flagging: AFC recovery bow + per-scanline jitter.
  let isActive  = select(0.0, 1.0, rollbarPhase > 0.001);
  let hookFac   = clamp(1.0 - wrappedY / 0.07, 0.0, 1.0) * isActive;
  let scanHash  = fract(sin(wrappedY * 317.8 + rollbarPhase * 43.1) * 43758.54);
  let hookShift = hookFac * hookFac * 0.035
                + (scanHash * 2.0 - 1.0) * hookFac * 0.015;
  p = vec2f(p.x + hookShift, wrappedY);
  // 4. H-swim: per-scanline horizontal drift from deflection oscillator instability.
  // DR-14 P3-B: normalise y by swimYScale before computing swim displacement.
  p = vec2f(p.x + hSwimNorm(p.y * swimYScale, t) * swimAmt, p.y);
  return p;
}

// Per-scanline horizontal jitter from H-deflection oscillator instability.
// Two sine waves at incommensurate frequencies beat against each other to produce
// slow, irregular drift -- not a simple periodic wobble.
// P0-B: reduced spatial frequencies from 87.3/23.7 to 0.275/0.463 cycles/screen height
//   for physically accurate H-deflection oscillator instability (real CRT: sub-cycle drift).
//   Temporal rates also reduced to model seconds-scale oscillator drift.
// DR-5 P1-A: edgeMag(uv.x) removed -- H-sync instability shifts each full line as a unit;
//   the offset is constant within a single scan line. uv.x variation within a line is
//   non-physical (conflated S-correction geometry with oscillator instability).
// DR-14 P3-B: normalised swim variant (hSwim superseded and removed).
// y_norm = uv.y * (outputH / srcH) from crtHorzPassFn so spatial frequency is in
// cycles/output-screen-height regardless of source resolution.
// Single-pass and halation callers pass y_norm = uv.y * 1.0 (unchanged).
fn hSwimNorm(y_norm: f32, t: f32) -> f32 {
  let s1 = sin(y_norm * 1.73 + t * 0.37) * 0.00075;  // 0.275 cycles/screen (1.73 rad/screen), slow drift
  let s2 = sin(y_norm * 2.91 - t * 0.61) * 0.00040;  // 0.463 cycles/screen (2.91 rad/screen), slow drift
  return s1 + s2;
}
`;

// ---------------------------------------------------------------------------
// crtKernelFn
// Full pipeline entry: UV distortions -> TriG scanline reconstruction -> RGB split
// -> interlace -> phosphor decay.
//
// Gap A: sourceSizeX/Y resolve the virtual CRT grid (src). scale = res / src
//   converts source-pixel offsets to output pixels inside Fetch/FetchConv.
//   sourceSizeX/Y = 0 uses res (backward-compatible).
//
// Gap C: interlace/interlaceField -- params threaded in for potential sub-field use.
//   GPU-side attenuation removed; off-field fill handled by TSL buildCRTEffect.
//
// UV distortion order (applied before any texture fetch):
//   1. Sag    -- shrink image toward centre (voltage droop compresses deflection amplitude)
//   2. Roll   -- fract-wrap Y so content seam co-moves with the CSS dark band
//   3. Hook   -- H-sync AFC recovery: lines just below the band bow rightward
//   4. Swim   -- per-scanline horizontal drift (H-deflection oscillator instability)
// ---------------------------------------------------------------------------
export const crtKernelFn = wgslFn(/* wgsl */`
fn crtKernel(
  tex: texture_2d<f32>,
  pos: vec2f,
  res: vec2f,
  hardPix: f32,
  hardScan: f32,
  scrollPhase: f32,
  t: f32,
  convergence: f32,
  convStaticX: f32,
  convStaticY: f32,
  convBX: f32,
  convBY: f32,
  convAspect: f32,
  kernelGamma: f32,
  rgbSplitPx: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  defocusAmt: f32,
  defocusAniso: f32,
  flickerRate: f32,
  flickerTauR: f32,
  flickerTauG: f32,
  flickerTauB: f32,
  flickerAmt: f32,
  sourceSizeX: f32,
  sourceSizeY: f32,
  interlace: f32,
  interlaceField: f32,
  apertureW: f32,
  apertureH: f32,
  gammaFast: f32
) -> vec3f {
  // Resolve source resolution: 0 -> use output resolution (backward-compatible).
  // src is the virtual CRT pixel grid (e.g. 320x240 for a lo-res source).
  // scale converts source-pixel offsets to output pixels for Fetch().
  let src   = vec2f(
    select(res.x, sourceSizeX, sourceSizeX > 0.5),
    select(res.y, sourceSizeY, sourceSizeY > 0.5)
  );
  let scale = res / src;

  // --- UV distortions: sag -> rollbar -> hook -> swim (via shared helper) ---
  // DR-14 P3-B: swimYScale=1.0 — single-pass uses output UV directly (no normalisation needed).
  var p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, t, 1.0);

  // Edge defocus: both hardPix and hardScan soften toward screen corners.
  // DR-9 P0-B: previously only dynHardPix was reduced; dynHardScan was missing, leaving corners
  // horizontally blurred but vertically sharp -- physically incorrect for isotropic defocus.
  // defocusAniso=0: isotropic (spherical tube); =1: V-only (cylindrical tube, e.g. Trinitron).
  let dir         = p - vec2f(0.5);
  let radSq       = (dir.x * dir.x * (1.0 - defocusAniso) + dir.y * dir.y) * 4.0;
  let defocusFac  = clamp(1.0 - defocusAmt * radSq, 0.0, 1.0);
  let dynHardPix  = hardPix  * defocusFac;
  let dynHardScan = hardScan * defocusFac;

  // Gamma-domain scanline reconstruction: horizontal Gaussian blending in
  // voltage domain matches real CRT electron-optics; decoded back to linear after.
  var col = TriG(tex, p, src, scale, res, dynHardPix, dynHardScan, scrollPhase, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW, apertureH, gammaFast);

  // RGB split: re-sample shifted R and B channels in gamma domain for consistency.
  if (rgbSplitPx > 0.001) {
    let splitUv = rgbSplitPx / res.x;
    // Compute dx at the shifted positions for the Horz5G calls.
    let pR    = p + vec2f(splitUv, 0.0);
    let pB    = p - vec2f(splitUv, 0.0);
    let dxR   = -(pR.x * src.x - floor(pR.x * src.x) - 0.5);
    let dxB   = -(pB.x * src.x - floor(pB.x * src.x) - 0.5);
    // DR-13 P1-A: Beam broadening for RGB split -- match TriG's luma-dependent sigma.
    // col is post-TriG linear light; use its luma to reproduce TriG's dynHardPix so
    // R/B channels use the same beam width as the G channel at this luminance level.
    let splitLuma           = clamp(Luma(col), 0.0, 1.0);
    let splitBeamW          = sqrt(splitLuma);
    let dynHardPixBroadened = min(dynHardPix + mix(0.0, 1.5, splitBeamW), -0.1);
    let sigmaR2Split        = sqrt(-1.0 / (2.0 * dynHardPixBroadened * 0.693147)) * 1.41421356;
    let halfAperSplit        = apertureW * 0.5;
    let r_g = Horz5G(tex, pR, 0.0, scale, res, sigmaR2Split, halfAperSplit, dxR, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
    let b_g = Horz5G(tex, pB, 0.0, scale, res, sigmaR2Split, halfAperSplit, dxB, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
    col.r = select(pow(max(r_g.r, 0.0), kernelGamma), r_g.r * r_g.r, gammaFast > 0.5);
    col.b = select(pow(max(b_g.b, 0.0), kernelGamma), b_g.b * b_g.b, gammaFast > 0.5);
  }

  // Interlace field identification is handled by the TSL layer (buildCRTEffect), which
  // fills off-field rows from prevTexNode (previous frame). No GPU-side attenuation here.
  // interlace/interlaceField params retained for potential future sub-field use.

  // P1-A: Per-channel phosphor decay -- P22 R/B decay ~150uss, G ~100uss.
  // P2-A: scrollRate threaded into phosphorDecayRGB so decay phase is sync'd to grid.
  // Guard: skip all three exp() calls when flickerAmt ~= 0 (common default).
  if (flickerAmt > 0.001) {
    let decayRGB = phosphorDecayRGB(p.y, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollPhase);
    col = col * mix(vec3f(1.0), decayRGB, flickerAmt);
  }

  return col;
}
` + HELPERS);

// ---------------------------------------------------------------------------
// crtHorzPassFn
// Pass A of the two-pass kernel downsampling path.
// Runs at source resolution: for each source pixel computes the 5-tap horizontal
// Gaussian (Horz5G) and stores the gamma-encoded result in an intermediate RT.
//
// scale = vec2f(1.0): Pass A renders at source resolution so res == src and
// no source-to-output scaling is needed.
// Output remains gamma-encoded -- Pass B (crtVertPassFn) blends the three source
// rows in the gamma domain before decoding to linear, matching TriG single-pass.
// ---------------------------------------------------------------------------
export const crtHorzPassFn = wgslFn(/* wgsl */`
fn crtHorzPass(
  tex: texture_2d<f32>,
  pos: vec2f,
  srcRes: vec2f,
  hardPix: f32,
  tWrapped: f32,
  conv: f32,
  convStaticX: f32,
  convStaticY: f32,
  convBX: f32,
  convBY: f32,
  convAspect: f32,
  kernelGamma: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  defocusAmt: f32,
  defocusAniso: f32,
  apertureW: f32,
  outputSizeY: f32,
  gammaFast: f32
) -> vec3f {
  // Apply UV distortions at source resolution (sag -> rollbar -> hook -> swim).
  // tWrapped (not t) used for H-swim: consistent with the time wrapping in renderFrame.
  // DR-14 P3-B: normalise uv.y by (outputSizeY / srcRes.y) so hSwim spatial frequency
  // is in cycles/output-screen-height. Without this, at srcH=240 and outputH=1080 the
  // effective swim frequency is 1.73 * 240/1080 = 0.384 cycles/screen (4.5x too low).
  let swimYScale = outputSizeY / max(srcRes.y, 1.0);
  var p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, tWrapped, swimYScale);

  // Edge defocus: soften hardPix toward screen corners (matches crtKernel single-pass).
  // defocusAniso=0: isotropic; =1: V-only (cylindrical tube).
  let defocusDir    = p - vec2f(0.5);
  let defocusRadSq  = (defocusDir.x * defocusDir.x * (1.0 - defocusAniso) + defocusDir.y * defocusDir.y) * 4.0;
  // DR-14 P0-B: clamp to -0.1 — defocusFac=0 at corners would give dynHardPix=0 -> sigmaR2=+Inf -> NaN in ErfGausSR2.
  // Matches TriG's clamp. Applied before beam broadening below so broadening never makes it positive.
  let dynHardPixBase = min(hardPix * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0), -0.1);

  // DR-9 P1-A: luma-dependent beam broadening in Pass A -- mirrors TriG single-pass logic.
  // Without this, two-pass mode produces systematically crisper horizontals than single-pass
  // at the same settings: bright horizontal lines are too narrow because Pass A ran at the
  // minimum beam width (no broadening) while Pass B correctly broadens the vertical.
  // Power-law beam softening: sigma ~ luma^0.5 (empirical, matches TriG / crtVertPassFn).
  // scale = vec2f(1.0) at source resolution -- FetchConvGamma args match crtHorzPass context.
  let cGamma  = FetchConvGamma(tex, p, vec2f(0.0, 0.0), vec2f(1.0), srcRes,
                               conv, convStaticX, convStaticY, convBX, convBY,
                               convAspect, kernelGamma, gammaFast);
  let cLinear = select(pow(max(cGamma, vec3f(0.0)), vec3f(kernelGamma)), cGamma * cGamma, gammaFast > 0.5);
  let luma    = clamp(Luma(cLinear), 0.0, 1.0);
  let beamW   = sqrt(luma);
  // Clamp to -0.1: defocusFac=0 at corners makes dynHardPixBase=0, then beam
  // broadening can push it positive -> NaN in sigmaR2.
  let dynHardPix = min(dynHardPixBase + mix(0.0, 1.5, beamW), -0.1);

  // Horizontal-only 5-tap Gaussian in gamma domain.
  // scale = vec2f(1.0): rendered at source resolution, so res == src.
  // P1-C: compute dx once (purely spatial -- no scrollRate/t dependence).
  // DR-9 P2-A: sigmaR2/halfAper hoisted from Horz5G -- computed once per source pixel.
  // Output stays gamma-encoded; Pass B blends in gamma domain and then decodes.
  let dx       = -(p.x * srcRes.x - floor(p.x * srcRes.x) - 0.5);
  let sigmaR2  = sqrt(-1.0 / (2.0 * dynHardPix * 0.693147)) * 1.41421356;
  let halfAper = apertureW * 0.5;
  let out_g = Horz5G(tex, p, 0.0, vec2f(1.0), srcRes,
                     sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  return max(out_g, vec3f(0.0));
}
`, [crtKernelFn]);

// ---------------------------------------------------------------------------
// crtVertPassFn
// Pass B of the two-pass kernel downsampling path.
// Runs at output resolution: applies UV distortions (identical preamble to
// crtKernelFn), reads 3 source rows from the intermediate RT (gamma-encoded
// Horz5G output from Pass A), blends vertically in gamma domain, decodes to
// linear, and applies interlace / phosphor decay.
//
// Only ~3 texture reads per output pixel vs. ~38 in the single-pass path,
// giving 85-91% reduction for low-resolution sources.
//
// RGB split (glitch-driven): when rgbSplitPx > 0, R and B are fetched at
// horizontally-shifted positions from the intermediate RT.
// ---------------------------------------------------------------------------
export const crtVertPassFn = wgslFn(/* wgsl */`
fn crtVertPass(
  kernelTex: texture_2d<f32>,
  pos: vec2f,
  res: vec2f,
  hardScan: f32,
  scrollPhase: f32,
  t: f32,
  kernelGamma: f32,
  rgbSplitPx: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  defocusAmt: f32,
  defocusAniso: f32,
  flickerRate: f32,
  flickerTauR: f32,
  flickerTauG: f32,
  flickerTauB: f32,
  flickerAmt: f32,
  kernelSrcW: f32,
  kernelSrcH: f32,
  interlace: f32,
  interlaceField: f32,
  apertureH: f32,
  gammaFast: f32
) -> vec3f {
  // kernelSrcW/H are the actual kernel RT dimensions set by renderFrame.
  // These always match kernelRT (e.g. 640x360) so textureLoad coordinates
  // stay within the valid texel range regardless of output resolution.
  let src = vec2f(kernelSrcW, kernelSrcH);
  let srcDims = vec2i(i32(src.x), i32(src.y));

  // Pass B reads from the intermediate RT (kernelRT) built by Pass A.
  // Pass A already baked ALL distortions (sag, rollbar, hook, swim) into the stored texels
  // by sampling the scene at the distorted UV. Re-applying any of them here would double them.
  // DR-9 P0-A: the previous code applied rollbar again via fract(pos.y - rollbarPhase),
  // causing 2x rollbar displacement during the rollbar event window. Fixed: use pos.y directly
  // to map output UV -> RT row; the rollbar adjustment already lives inside the RT content.
  // Sag/hook/swim/rollbar are intentionally NOT applied in Pass B.

  // Edge defocus: hardScan softens toward screen corners. Use output pos (undistorted) for radius.
  // defocusAniso=0: isotropic; =1: V-only (cylindrical tube).
  let defocusDir   = pos - vec2f(0.5);
  let defocusRadSq = (defocusDir.x * defocusDir.x * (1.0 - defocusAniso) + defocusDir.y * defocusDir.y) * 4.0;
  let dynHardScan  = hardScan * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0);

  // Map output UV to integer source-row coordinates using pos.y (no rollbar re-application).
  // Horizontal distortions are already baked into the RT by Pass A.
  let straightX = clamp(i32(floor(pos.x * src.x)), 0, i32(src.x) - 1);
  let ipos = vec2i(straightX, clamp(i32(floor(pos.y * src.y)), 0, i32(src.y) - 1));

  // Load 3 source rows from intermediate RT (gamma-encoded Horz5G output).
  // One texture read per row -- no horizontal fetches at output resolution.
  let a = textureLoad(kernelTex, clamp(ipos + vec2i(0, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
  let b = textureLoad(kernelTex, ipos, 0).rgb;
  let c = textureLoad(kernelTex, clamp(ipos + vec2i(0,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;

  // dy: fractional scanline position for vertical Gaussian blend.
  // Use pos.y (not rollbar-wrapped) -- rollbar is already baked in the RT.
  let dy      = Dist(vec2f(pos.x, pos.y), src, scrollPhase).y;
  // DR-6 P1-A / DR-7 P2-C: decode rows to linear for luma computation.
  // BT.709 coefficients require linear-light inputs, so rows must be decoded before Luma().
  // The vertical blend below (a*Gaus + b*Gaus + c*Gaus) intentionally remains in
  // gamma domain -- this matches the single-pass TriG path where a_g/b_g/c_g are all
  // FetchConvGamma outputs (gamma-encoded) and the decode happens once after the sum.
  // Gamma-domain vertical blend is the physical model: CRT beam spreads in voltage
  // (gamma) domain. Do NOT decode a and c -- they are already correct for blending.
  // P2-A: per-row dynScan -- each source row may have different luminance; outer-row
  // dynScan must use its own luma, not the center row's, to correctly model vertical
  // beam width at luma transitions (bright-to-dark adjacent scanlines).
  // bLinear is also used below for RGB split's dynHardPix (horizontal uses center row -- correct).
  let aLinear  = select(pow(max(a, vec3f(0.0)), vec3f(kernelGamma)), a * a, gammaFast > 0.5);
  let bLinear  = select(pow(max(b, vec3f(0.0)), vec3f(kernelGamma)), b * b, gammaFast > 0.5);
  let cLinear  = select(pow(max(c, vec3f(0.0)), vec3f(kernelGamma)), c * c, gammaFast > 0.5);
  let dynScanA = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(aLinear), 0.0, 1.0)));
  let dynScanB = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(bLinear), 0.0, 1.0)));
  let dynScanC = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(cLinear), 0.0, 1.0)));

  // Vertical blend: aperture-integrated ErfGausSR2 replaces point-sampled Gaus (SPEC-21 P3-F).
  let halfApertureH = apertureH * 0.5;
  let sigmaVR2_A = sqrt(-1.0 / (2.0 * min(dynScanA, -0.1) * 0.693147)) * 1.41421356;
  let sigmaVR2_B = sqrt(-1.0 / (2.0 * min(dynScanB, -0.1) * 0.693147)) * 1.41421356;
  let sigmaVR2_C = sqrt(-1.0 / (2.0 * min(dynScanC, -0.1) * 0.693147)) * 1.41421356;

  let blended = a * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH)
              + b * ErfGausSR2(dy +   0.0,  sigmaVR2_B, halfApertureH)
              + c * ErfGausSR2(dy +   1.0,  sigmaVR2_C, halfApertureH);

  // Decode gamma -> linear (same final step as TriG in single-pass path).
  var col = select(pow(max(blended, vec3f(0.0)), vec3f(kernelGamma)), blended * blended, gammaFast > 0.5);

  // RGB split: glitch-driven output-space channel offset.
  // Shift R and B horizontally when reading from the intermediate RT.
  // rgbSplitPx is in output pixels; convert to source pixels via src.x/res.x.
  if (rgbSplitPx > 0.001) {
    let splitSrc = i32(round(rgbSplitPx * src.x / res.x));
    // R: shifted +splitSrc source pixels, vertical blend at same row
    let ar = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let br = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc,  0), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let cr = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let blendR = ar * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH) + br * ErfGausSR2(dy + 0.0, sigmaVR2_B, halfApertureH) + cr * ErfGausSR2(dy + 1.0, sigmaVR2_C, halfApertureH);
    col.r = select(pow(max(blendR.r, 0.0), kernelGamma), blendR.r * blendR.r, gammaFast > 0.5);
    // B: shifted -splitSrc source pixels
    let ab = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let bb = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc,  0), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let cb = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let blendB = ab * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH) + bb * ErfGausSR2(dy + 0.0, sigmaVR2_B, halfApertureH) + cb * ErfGausSR2(dy + 1.0, sigmaVR2_C, halfApertureH);
    col.b = select(pow(max(blendB.b, 0.0), kernelGamma), blendB.b * blendB.b, gammaFast > 0.5);
  }

  // Interlace field identification is handled by the TSL layer (buildCRTEffect).
  // interlace/interlaceField params retained for potential future sub-field use.

  // P1-A: Per-channel phosphor decay. P2-A: scrollRate syncs decay phase to grid.
  // Guard: skip all three exp() calls when flickerAmt ~= 0 (common default).
  if (flickerAmt > 0.001) {
    // DR-9 P0-A: use pos.y (not wrappedY) -- rollbar already baked into RT rows.
    let decayRGB = phosphorDecayRGB(pos.y, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollPhase);
    col = col * mix(vec3f(1.0), decayRGB, flickerAmt);
  }
  return col;
}
`, [crtKernelFn]);

// ---------------------------------------------------------------------------
// crtHalationFn
// Isotropic 2D halation via separable 7-tap H convolution x vertical Gaussian.
//
// Physical mechanism: near-field phosphor-layer scatter and electron backscatter.
// Secondary electrons reflected off the aluminium backing layer land on adjacent
// phosphors (~1–3 src-px spread, Gaussian profile), and the phosphor layer itself
// forward-scatters a small fraction of emitted light laterally.
// This is distinct from wide glass-bulk scatter (Mie/Rayleigh from glass impurities),
// which is modeled separately by glassBlurStr (typical 1/e radius >> 5 output px).
// CRT-Royale: halation_weight = near-field electron scatter;
//             diffusion_weight = glass-bulk scatter.
// 1/e radius = sqrt(-1 / (ln2 × halationSharp)) -- consistent with CLAUDE.md convention.
// halationSharp: -0.85 (default) → 1/e radius ≈ 1.30 src-px (near-field / electron backscatter);
//                -0.4            → 1/e radius ≈ 1.90 src-px (approaching phosphor scatter);
//                -2.5            → 1/e radius ≈ 0.76 src-px (tight inter-scanline bleed).
//
// P0-A fix: previously only applied Gaus(dy) -- zero horizontal spread, causing
// vertical comb striping at halationStr=3 without bloom. Now performs a 7-tap
// horizontal accumulation weighting by Gaus(dx +- offset, halationSharp). The result is
// then multiplied by Gaus(dy, halationSharp) for the separable 2D response:
//   halo(x,y) = [sum_h tex(x+h,y) * Gaus(h,s)] * Gaus(dy,s)
// Outer 4 taps use raw texture fetches weighted by vw = Gaus(dy, hardScan) to
// approximate the vertical scanline weight at their positions.
// Centre tap (c0) uses scannedColor -- the post-kernel reconstructed output at this
// exact pixel -- without an additional vw factor, since scannedColor already carries
// the full vertical Gaussian from TriG/crtVertPassFn. This gives consistent energy
// weighting: all taps are attenuated by the same single vertical Gaussian factor.
//
// DR-7 P3-B -- known limitation: outer H-taps sample from tex (single-pass: raw scene
// pre-kernel; two-pass: H-kernel RT). Physically, the halo should radiate from the
// post-reconstruction phosphor emission; sampling raw scene slightly overestimates
// halo width on high-frequency content in single-pass mode.
// Full correction requires an additional post-kernel RTT at full output resolution
// (significant cost -- accepted architectural trade-off, tracked separately).
//
// P2-A -- deferred RTT path: the vw = Gaus(dy, hardScan) mitigation on the outer taps
// (lines below) reduces the inter-scanline inflation from ~4× to ~1.5×. A fully accurate
// fix would add a second convertToTexture() capturing the post-kernel scanned result and
// pass it as tex here, removing the vw multiplication from the outer taps (it would then
// double-weight the vertical Gaussian on already-reconstructed data). Gate on
// opts.accurateHalation (default false). Deferred: adds 1 draw call per frame. (P2-A)
//
// Gap A: sourceSizeX/Y resolve src so that Dist() snaps to source-pixel rows,
//   keeping the halation Gaussian centred on the same grid as the scanlines.
//
// UV distortion params (swimAmt, rollbarPhase, sagPhase) are mirrored from
// crtKernelFn so that dy is computed from the same distorted UV.
// ---------------------------------------------------------------------------
export const crtHalationFn = wgslFn(/* wgsl */`
fn crtHalation(
  tex: texture_2d<f32>,
  scannedColor: vec3f,
  pos: vec2f,
  res: vec2f,
  scrollPhase: f32,
  t: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  sourceSizeX: f32,
  sourceSizeY: f32,
  halationSharp: f32,
  hardScan: f32,
  kernelGamma: f32,
  accurateHalation: f32
) -> vec4f {
  // accurateHalation: 0 = legacy mode, raw outer taps weighted by vw (scanline Gaussian);
  //                   1 = post-kernel RTT mode, tapW forced to 1 (no inter-scanline inflation).
  // Resolve source resolution (same logic as crtKernel).
  let src = vec2f(
    select(res.x, sourceSizeX, sourceSizeX > 0.5),
    select(res.y, sourceSizeY, sourceSizeY > 0.5)
  );
  let scale = res / src;

  // UV distortion: same sag -> rollbar -> hook -> swim chain as crtKernel,
  // via the shared helper. Ensures dy is computed from the same distorted p
  // that the kernel used, so halation tracks the scanline rows correctly.
  // DR-14 P3-B: swimYScale=1.0 — halation uses output UV directly (same as crtKernelFn).
  var p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, t, 1.0);

  let d   = Dist(p, src, scrollPhase);
  let dy  = d.y;
  let dx  = d.x;

  // Separable 2D halation: H-pass (7 taps from tex) x V-pass (Gaus(dy)).
  // Raw H-taps are attenuated by the scanline vertical Gaussian (Gaus(dy, hardScan))
  // to approximate the post-scanline signal at neighbouring H positions. Without this,
  // raw taps retain full luminance in inter-scanline gaps, inflating halation ~4x.
  // The centre tap (scannedColor) already has the full kernel weight embedded.
  // 7 taps (±3) vs 5 taps (±2): at halationSharp=-0.4, Gaus(±2,-0.4)≈33% of peak;
  // ±3 taps reduce truncation error and correctly represent the diffuse halo profile.
  let wh_3 = Gaus(dx - 3.0, halationSharp);
  let wh_2 = Gaus(dx - 2.0, halationSharp);
  let wh_1 = Gaus(dx - 1.0, halationSharp);
  let wh0  = Gaus(dx,        halationSharp);
  let wh1  = Gaus(dx + 1.0, halationSharp);
  let wh2  = Gaus(dx + 2.0, halationSharp);
  let wh3  = Gaus(dx + 3.0, halationSharp);
  let whSum = wh_3 + wh_2 + wh_1 + wh0 + wh1 + wh2 + wh3;

  // Vertical scanline weight for raw taps -- matches the attenuation already baked
  // into scannedColor, so all 5 taps have consistent vertical weighting.
  // In two-pass mode (sourceSizeX > 0.5), tex is kernelRT which stores gamma-encoded
  // values from Pass A. Decode to linear before halation blending to match scannedColor
  // (which is already linear from crtVertPassFn's pow(blended, kernelGamma) step).
  let vw = Gaus(dy, hardScan);
  // P1-A accurateHalation: when true, outer taps read from a post-kernel RTT (gamma-encoded
  // scanned output) where gaps are already dark. No vw correction needed — the scanline
  // Gaussian is already baked in. When false, outer taps read from raw scene (legacy path)
  // and vw corrects the inter-scanline inflation from ~4× to ~1.5×.
  let tapW = select(vw, 1.0, accurateHalation > 0.5);
  let isTwoPass = sourceSizeX > 0.5;
  // Outer taps need gamma decode when:
  //   a) two-pass: tex is Pass A H-kernel RT (gamma-encoded)
  //   b) accurateHalation: caller encoded linear col to gamma before the RTT
  // Single-pass legacy (accurateHalation=0): tex is raw scene (linear) — no decode needed.
  let needsDecode = isTwoPass || (accurateHalation > 0.5);
  let gammaVec = vec3f(select(1.0, kernelGamma, needsDecode));
  // P1-B: in two-pass mode horzRttNode is indexed by output UV (pos), not distorted UV (p).
  // Pass A baked all distortions into RT content while storing at output-space coordinates.
  // Reading the RT at p (distorted) would double-apply rollbar/sag/swim -> wrong scanline row.
  // dy still uses p (distorted space) so halation height tracks the kernel's scanline alignment.
  // In single-pass mode tex is the raw scene: p (distorted UV) is correct.
  let fetchBase = select(p, pos, isTwoPass);
  // DR-13 P2-B: outer H-taps read from tex (single-pass: raw scene pre-kernel; two-pass:
  // H-kernel RT). With accurateHalation=true (default), tex is post-kernel RTT (post-mask),
  // so all taps read physically correct emitted-light signal.
  let c_3 = pow(max(Fetch(tex, fetchBase, vec2f(-3.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;
  let c_2 = pow(max(Fetch(tex, fetchBase, vec2f(-2.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;
  let c_1 = pow(max(Fetch(tex, fetchBase, vec2f(-1.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;
  // DR-5 P2-B + DR-6 P0-A: center tap uses scannedColor (post-scanline reconstruction).
  // The halo should radiate from phosphor-emitted light (which carries scanline structure).
  // scannedColor is always linear (crtVertPassFn decodes before returning in two-pass mode).
  // No * vw -- scannedColor already has the kernel's full vertical Gaussian baked in from
  // TriG/crtVertPassFn. Multiplying by vw again would double-weight the vertical Gaussian
  // at the center relative to the outer raw taps (each of which is Fetch x vw x halation).
  let c0  = scannedColor;
  let c1  = pow(max(Fetch(tex, fetchBase, vec2f( 1.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;
  let c2  = pow(max(Fetch(tex, fetchBase, vec2f( 2.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;
  let c3  = pow(max(Fetch(tex, fetchBase, vec2f( 3.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * tapW;

  let hBlur = (c_3*wh_3 + c_2*wh_2 + c_1*wh_1 + c0*wh0 + c1*wh1 + c2*wh2 + c3*wh3) / whSum;

  let halo_rgb = hBlur * Gaus(dy, halationSharp);
  // w: normalised horizontal source-pixel offset dx mapped to [-1, 1].
  // Currently unused at all JS call sites (.rgb only) — dead code until the anisotropic
  // halo path is implemented. Do not remove: the encoding is load-bearing for that path.
  // Formula: dx in [-0.5, 0.5] src-px; clamp(dx * 2, -1, 1) = full [-1, 1].
  let grad = clamp(dx * 2.0, -1.0, 1.0);
  return vec4f(halo_rgb, grad);
}
`, [crtKernelFn]);
