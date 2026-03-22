/**
 * crt-kernel.wgsl.js
 * WGSL kernel for the CRT scanline reconstruction pipeline.
 *
 * Exports two wgslFn nodes:
 *   crtKernelFn   — full TriG scanline path + convergence + optional RGB split
 *                   + UV distortions: sag (geometry squeeze), rollbar (scroll),
 *                     h-swim (per-scanline horizontal jitter)
 *                   + interlacing (field-parity attenuation via CPU-driven
 *                     interlaceField uniform, toggled each renderFrame)
 *   crtHalationFn — reads from post-scanline scannedColor; applies Gaus(dy, halationSharp)
 *                   so the halo follows the reconstructed scanline structure, not
 *                   the raw pre-filter source image. halationSharp: -0.4 = diffuse
 *                   glass scatter (default), -2.5 = original inter-scanline bleed.
 *
 * Gap A — Source resolution awareness:
 *   All internal helpers now thread src (virtual CRT grid) and scale (res/src).
 *   Dist() snaps to source-pixel boundaries, not output pixels.
 *   Fetch() converts source-pixel offsets to output pixels via scale.
 *   phosphorDecay() uses integer scanline index (floor(pos_y * src_y) / src_y).
 *   sourceSizeX/Y = 0 → backward-compatible (uses screenSize).
 *
 * Gap C — Interlacing:
 *   When interlace > 0.5, alternate-field scanlines are attenuated by
 *   exp(-1/(flickerRate * flickerTau)). interlaceField (0/1) is driven by
 *   the CPU in renderFrame — not derived from continuous time to avoid
 *   frame-rate aliasing.
 *
 * Scene render target is already linear-light (Three.js WebGPU render target).
 * No sRGB decode (ToLinear) is applied.
 *
 * Textures are sampled with textureLoad() (integer pixel coords) rather than
 * textureSampleLevel().
 */

import { wgslFn } from 'three/tsl';

// ---------------------------------------------------------------------------
// Shared WGSL helper block — appended to crtKernelFn; crtHalationFn includes
// it transitively via the [crtKernelFn] includes list.
// ---------------------------------------------------------------------------
const HELPERS = /* wgsl */`

// Sub-pixel fractional distance from the source-pixel-grid centre.
// pos is in UV space (0..1); src is the virtual CRT source resolution.
// Using src (not res) ensures the Gaussian beam width is in source-pixel units,
// matching how a real CRT electron beam spans a fixed number of phosphor cells
// regardless of output display resolution.
fn Dist(pos: vec2f, src: vec2f, scrollRate: f32, t: f32) -> vec2f {
  let dx = pos.x * src.x;
  let dy = pos.y * src.y + t * scrollRate;
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
// that passes through a rectangular slit of width `apertureW` source pixels centred at `dx`.
// Physically: the exact luminance contribution of a phosphor stripe to a given output pixel
// when the beam profile is Gaussian.  Returns a value in [0, 1].
// sigma = sqrt(-1 / (2 * sharp * ln(2))); the erf argument is (dx ± w/2) / (sigma * sqrt(2)).
fn ErfGaus(dx: f32, sharp: f32, apertureW: f32) -> f32 {
  let sigma = sqrt(-1.0 / (2.0 * sharp * 0.693147));
  let lo = (dx - apertureW * 0.5) / (sigma * 1.41421356);
  let hi = (dx + apertureW * 0.5) / (sigma * 1.41421356);
  return 0.5 * (Erf(hi) - Erf(lo));
}

// Luminance of a linear RGB colour (BT.709 coefficients; scene RT is linear-light).
fn Luma(c: vec3f) -> f32 {
  return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

// Load the scene texture at a pixel-snapped position with an integer source-pixel offset.
// off is in source-pixel units; scale = res / src converts source offsets to res-space.
// Uses textureLoad (no sampler) — every call already resolves to an integer texel.
// Returns vec3f — no ToLinear decode (scene output is already linear).
//
// The base coordinate uses textureDimensions(tex) so that pos (UV 0–1) always maps
// to the full texture extent. This is critical in two-pass mode where the texture
// (scene output or kernelRT) can differ in size from the render target resolution.
// Offsets are converted from source-pixel units to texel units via (texSize / res) * scale.
fn Fetch(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f) -> vec3f {
  if (max(abs(pos.x - 0.5), abs(pos.y - 0.5)) > 0.5) {
    return vec3f(0.0);
  }
  let texSize = vec2f(textureDimensions(tex, 0));
  let texScale = texSize / max(res, vec2f(1.0));
  let iCoord = vec2i(floor(pos * texSize + off * scale * texScale));
  return textureLoad(tex, iCoord, 0).rgb;
}

// Like Fetch but displaces R and B channels:
//   - Radially (dynamic/pincushion): scales with distance² from screen centre.
//     conv is the convergence uniform (0 = off, 0.035 = subtle, 0.1 = obvious).
//   - Statically (uniform across screen): R uses convStaticX/Y, B uses convBX/convBY.
//     Independent B offset breaks the anti-symmetric constraint — real thermal drift
//     moves both R and B in the same direction, with B ~30% larger than R.
//     Old behaviour (anti-symmetric): set convBX = -convStaticX, convBY = -convStaticY.
//   - convAspect (P1-B): 0 = radially symmetric (delta gun / shadow mask),
//     1 = H-only pincushion (inline aperture grille / Trinitron geometry).
//     Real Trinitron: R and B guns displaced horizontally → H-only misconvergence.
fn FetchConv(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f,
             conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32,
             convAspect: f32) -> vec3f {
  // Fast path: all convergence disabled — single fetch, no extra reads.
  if (abs(conv) < 0.0001 && abs(convStaticX) < 0.0001 && abs(convStaticY) < 0.0001
      && abs(convBX) < 0.0001 && abs(convBY) < 0.0001) {
    return Fetch(tex, pos, off, res, scale);
  }
  let dir = pos - vec2f(0.5);
  // P1-B: anisotropic convergence — mix between radial (dot(dir,dir)) and H-only (dir.x²).
  // convAspect=0: radial (shadow mask / delta gun).
  // convAspect=1: H-only inline (aperture grille / Trinitron).
  let mag = -conv * mix(dot(dir, dir), dir.x * dir.x, convAspect);
  // Static offset: convert source-pixel offset to UV (divide by source resolution).
  // scale = res / src, so src = res / scale → staticUv = vec2f(convStaticX, convStaticY) / (res / scale)
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

// (Tri and Horz3/Horz5 removed — replaced by TriG/Horz3G/Horz5G with dx hoisting and convAspect.
//  Horz3Lin/Horz5Lin also removed: luma estimation now uses a single FetchConvGamma center tap.)

// Phosphor decay sweep: brightness decays exponentially from the moment the
// electron beam last passed through this scanline row.
// Scanline index is snapped to the scrolling source-pixel grid (floor(pos_y*src_y + t*scrollRate))
// so the decay phase is synchronised with the Gaussian scanline position (P2-A fix).
// All output pixels that map to the same source scanline share the same phase,
// eliminating sub-pixel phase shimmer across the scanline height.
fn phosphorDecay(pos_y: f32, src_y: f32, t: f32, flickerRate: f32, tau: f32, scrollRate: f32) -> f32 {
  let scrolledY = pos_y * src_y + t * scrollRate;
  let scanline  = floor(scrolledY);
  let phase     = fract(t * flickerRate - scanline / src_y);
  return exp(-phase / max(tau * flickerRate, 0.0001));
}

// Per-channel phosphor decay (P1-A): P22 CRT phosphor taus.
// P22 red (Y₂O₂S:Eu³⁺): tau ≈ 150 µs; P22 blue (ZnS:Ag,Cl): tau ≈ 150 µs;
// P22 green (rare-earth oxysulphide, CRT era): tau ≈ 100–300 µs.
// NOTE: Zn₂SiO₄:Mn²⁺ (P1 willemite) has tau ≈ 10-15 ms but is an oscilloscope
// phosphor — NOT the green used in P22 colour television picture tubes.
// Returns vec3f decay factors (one per channel) for use with mix(vec3f(1.0), decay, flickerAmt).
fn phosphorDecayRGB(pos_y: f32, src_y: f32, t: f32, flickerRate: f32,
                    tauR: f32, tauG: f32, tauB: f32, scrollRate: f32) -> vec3f {
  let scrolledY = pos_y * src_y + t * scrollRate;
  let scanline  = floor(scrolledY);
  let phase     = fract(t * flickerRate - scanline / src_y);
  return vec3f(
    exp(-phase / max(tauR * flickerRate, 0.0001)),
    exp(-phase / max(tauG * flickerRate, 0.0001)),
    exp(-phase / max(tauB * flickerRate, 0.0001))
  );
}

// Gamma-domain fetch helpers — encode each texel to CRT gamma before
// the horizontal Gaussian weighted average.  Physical basis: the CRT beam spreads
// in voltage domain (gamma-decoded signal), not linear-light.  Interpolating in
// gamma space gives brighter, more natural-looking scanline edges (matches how
// crt-royale and Guest Advanced CRT compute horizontal reconstruction).
// After TriG() the result is decoded back to linear for the rest of the pipeline.
// P3-C: kernelGamma is user-configurable (default 2.5). 1/kernelGamma encodes to gamma space.
fn FetchConvGamma(tex: texture_2d<f32>, pos: vec2f, off: vec2f, res: vec2f, scale: vec2f, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32) -> vec3f {
  return pow(max(FetchConv(tex, pos, off, res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect), vec3f(0.0)), vec3f(1.0 / kernelGamma));
}

// P1-C + P3-B: dx is precomputed once in TriG and passed in — eliminates 4 redundant Dist().x
// evaluations per output pixel. scrollRate and t are removed from Horz3G/Horz5G because
// Dist().x is purely spatial (no time dependence): dx = -(pos.x*src.x - floor(pos.x*src.x) - 0.5).
// apertureW: phosphor stripe width in source pixels. 1.0 = aperture grille (one stripe per pixel).
// ErfGaus integrates the Gaussian beam over the physical aperture width for each tap weight,
// matching crt-royale BEAM_SHAPE_MODE=2. The normaliser (wb+wc+wd) handles total energy.
fn Horz3G(tex: texture_2d<f32>, pos: vec2f, off: f32, scale: vec2f, res: vec2f, hardPix: f32, dx: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, apertureW: f32) -> vec3f {
  let b = FetchConvGamma(tex, pos, vec2f(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let c = FetchConvGamma(tex, pos, vec2f( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let d = FetchConvGamma(tex, pos, vec2f( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let wb = ErfGaus(dx - 1.0, hardPix, apertureW);
  let wc = ErfGaus(dx + 0.0, hardPix, apertureW);
  let wd = ErfGaus(dx + 1.0, hardPix, apertureW);
  return (b * wb + c * wc + d * wd) / (wb + wc + wd);
}

fn Horz5G(tex: texture_2d<f32>, pos: vec2f, off: f32, scale: vec2f, res: vec2f, hardPix: f32, dx: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, apertureW: f32) -> vec3f {
  let a = FetchConvGamma(tex, pos, vec2f(-2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let b = FetchConvGamma(tex, pos, vec2f(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let c = FetchConvGamma(tex, pos, vec2f( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let d = FetchConvGamma(tex, pos, vec2f( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let e = FetchConvGamma(tex, pos, vec2f( 2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma);
  let wa = ErfGaus(dx - 2.0, hardPix, apertureW);
  let wb = ErfGaus(dx - 1.0, hardPix, apertureW);
  let wc = ErfGaus(dx + 0.0, hardPix, apertureW);
  let wd = ErfGaus(dx + 1.0, hardPix, apertureW);
  let we = ErfGaus(dx + 2.0, hardPix, apertureW);
  return (a * wa + b * wb + c * wc + d * wd + e * we) / (wa + wb + wc + wd + we);
}

// Gamma-domain scanline reconstruction.  Fetches in γ=kernelGamma space so the horizontal
// Gaussian blending happens in voltage domain (as on real CRT hardware), then
// decodes back to linear light for the rest of the pipeline.
// P1-C: Dist() is computed ONCE here and dx/dy passed to all Horz calls,
// eliminating 4 redundant Dist().x evaluations (saves ~32 ALU ops/px).
fn TriG(tex: texture_2d<f32>, pos: vec2f, src: vec2f, scale: vec2f, res: vec2f, hardPix: f32, hardScan: f32, scrollRate: f32, t: f32, conv: f32, convStaticX: f32, convStaticY: f32, convBX: f32, convBY: f32, convAspect: f32, kernelGamma: f32, apertureW: f32) -> vec3f {
  // P1-C: compute Dist() once — both dx and dy — before any Horz calls.
  let dist_val   = Dist(pos, src, scrollRate, t);
  let dx         = dist_val.x;
  let dy         = dist_val.y;

  // 1-tap center fetch for luma estimation — saves 4 FetchConv calls (up to 12 reads with
  // convergence). crt-royale uses equivalent 1-tap center for beam_spot_shape; perceptually
  // identical to 5-tap average (dynScan/dynHardPix shift ≤ 0.2/0.075 for typical content).
  let centerGamma = FetchConvGamma(tex, pos, vec2f(0.0, 0.0), res, scale,
                                   conv, convStaticX, convStaticY, convBX, convBY,
                                   convAspect, kernelGamma);
  let luma        = clamp(Luma(centerGamma), 0.0, 1.0);
  let dynScan    = hardScan + mix(0.0, 4.0, luma);
  let dynHardPix = hardPix  + mix(0.0, 1.5, luma);

  // Horizontal reconstruction in gamma domain with precomputed dx (P1-C).
  // Note: luma here is gamma-encoded, so dynScan modulation range (4.0) is applied
  // in gamma domain. This produces wider beams at mid-tone content.
  let a_g = Horz3G(tex, pos, -1.0, scale, res, dynHardPix, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);
  let b_g = Horz5G(tex, pos,  0.0, scale, res, dynHardPix, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);
  let c_g = Horz3G(tex, pos,  1.0, scale, res, dynHardPix, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);

  // Vertical blend is intentionally un-normalised: the sum of Gaussian weights is < 1
  // in the inter-scanline gap, producing the dark gaps that characterise CRT scanlines.
  let out_g  = a_g * Gaus(dy + (-1.0), dynScan)
             + b_g * Gaus(dy +   0.0,  dynScan)
             + c_g * Gaus(dy +   1.0,  dynScan);

  // Decode back to linear light.
  return pow(max(out_g, vec3f(0.0)), vec3f(kernelGamma));
}

// Per-scanline horizontal jitter from H-deflection oscillator instability.
// Two sine waves at incommensurate frequencies beat against each other to produce
// slow, irregular drift — not a simple periodic wobble.
// P0-B: reduced spatial frequencies from 87.3/23.7 to ~1.7/2.9 cycles/screen height
//   for physically accurate H-deflection oscillator instability (real CRT: 1-3 cycles).
//   Temporal rates also reduced to model seconds-scale oscillator drift.
// DR-5 P1-A: edgeMag(uv.x) removed — H-sync instability shifts each full line as a unit;
//   the offset is constant within a single scan line. uv.x variation within a line is
//   non-physical (conflated S-correction geometry with oscillator instability).
fn hSwim(uv: vec2f, t: f32) -> f32 {
  let s1 = sin(uv.y * 1.73 + t * 0.37) * 0.00075;  // ~1.7 cycles/screen, slow drift
  let s2 = sin(uv.y * 2.91 - t * 0.61) * 0.00040;  // ~3 cycles/screen, slow drift
  return s1 + s2;
}
`;

// ---------------------------------------------------------------------------
// crtKernelFn
// Full pipeline entry: UV distortions → TriG scanline reconstruction → RGB split
// → interlace → phosphor decay.
//
// Gap A: sourceSizeX/Y resolve the virtual CRT grid (src). scale = res / src
//   converts source-pixel offsets to output pixels inside Fetch/FetchConv.
//   sourceSizeX/Y = 0 uses res (backward-compatible).
//
// Gap C: interlace/interlaceField — when interlace > 0.5, alternate-field
//   scanlines are attenuated by exp(-1/(rate*tau)). interlaceField is toggled
//   by the CPU each frame (not derived from t) to avoid frame-rate aliasing.
//
// UV distortion order (applied before any texture fetch):
//   1. Sag    — shrink image toward centre (voltage droop compresses deflection amplitude)
//   2. Roll   — fract-wrap Y so content seam co-moves with the CSS dark band
//   3. Hook   — H-sync AFC recovery: lines just below the band bow rightward
//   4. Swim   — per-scanline horizontal drift (H-deflection oscillator instability)
// ---------------------------------------------------------------------------
export const crtKernelFn = wgslFn(/* wgsl */`
fn crtKernel(
  tex: texture_2d<f32>,
  pos: vec2f,
  res: vec2f,
  hardPix: f32,
  hardScan: f32,
  scrollRate: f32,
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
  flickerRate: f32,
  flickerTauR: f32,
  flickerTauG: f32,
  flickerTauB: f32,
  flickerAmt: f32,
  sourceSizeX: f32,
  sourceSizeY: f32,
  interlace: f32,
  interlaceField: f32,
  apertureW: f32
) -> vec3f {
  // Resolve source resolution: 0 → use output resolution (backward-compatible).
  // src is the virtual CRT pixel grid (e.g. 320×240 for a lo-res source).
  // scale converts source-pixel offsets to output pixels for Fetch().
  let src   = vec2f(
    select(res.x, sourceSizeX, sourceSizeX > 0.5),
    select(res.y, sourceSizeY, sourceSizeY > 0.5)
  );
  let scale = res / src;

  // --- UV distortions: applied once, used for all subsequent fetches ---

  // 1. Voltage sag: shrink image toward centre (max 4% at sagPhase=1.0)
  let sagMag = sagPhase * 0.04;
  var p = vec2f(0.5, 0.5) + (pos - vec2f(0.5, 0.5)) * (1.0 - sagMag);

  // 2. Rollbar scroll: fract-wrap Y so the content seam tracks the CSS dark band.
  let wrappedY = fract(p.y - rollbarPhase);

  // 3. H-sync hook / flagging: AFC recovery bow + per-scanline jitter.
  let isActive  = select(0.0, 1.0, rollbarPhase > 0.001);
  let hookZone  = 0.07;
  let hookFac   = clamp(1.0 - wrappedY / hookZone, 0.0, 1.0) * isActive;
  let scanHash  = fract(sin(wrappedY * 317.8 + rollbarPhase * 43.1) * 43758.54);
  let hookShift = hookFac * hookFac * 0.035
                + (scanHash * 2.0 - 1.0) * hookFac * 0.015;

  p = vec2f(p.x + hookShift, wrappedY);

  // 4. H-swim: per-scanline horizontal drift from deflection oscillator instability.
  let swim = hSwim(p, t) * swimAmt;
  p = vec2f(p.x + swim, p.y);

  // Edge defocus: hardPix softens toward screen corners.
  let dir        = p - vec2f(0.5);
  let radSq      = dot(dir, dir) * 4.0;
  let dynHardPix = hardPix * clamp(1.0 - defocusAmt * radSq, 0.0, 1.0);

  // Gamma-domain scanline reconstruction: horizontal Gaussian blending in
  // voltage domain matches real CRT electron-optics; decoded back to linear after.
  var col = TriG(tex, p, src, scale, res, dynHardPix, hardScan, scrollRate, t, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);

  // RGB split: re-sample shifted R and B channels in gamma domain for consistency.
  if (rgbSplitPx > 0.001) {
    let splitUv = rgbSplitPx / res.x;
    // Compute dx at the shifted positions for the Horz5G calls.
    let pR    = p + vec2f(splitUv, 0.0);
    let pB    = p - vec2f(splitUv, 0.0);
    let dxR   = -(pR.x * src.x - floor(pR.x * src.x) - 0.5);
    let dxB   = -(pB.x * src.x - floor(pB.x * src.x) - 0.5);
    let r_g = Horz5G(tex, pR, 0.0, scale, res, dynHardPix, dxR, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);
    let b_g = Horz5G(tex, pB, 0.0, scale, res, dynHardPix, dxB, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);
    col.r = pow(max(r_g.r, 0.0), kernelGamma);
    col.b = pow(max(b_g.b, 0.0), kernelGamma);
  }

  // Interlace: alternate-field scanlines get phosphor-decay attenuation.
  // Uses the mean of the per-channel taus for the inter-field decay scalar.
  // interlaceField (0 or 1) is driven by the CPU each frame to avoid frame-rate aliasing.
  if (interlace > 0.5) {
    let scanIdx    = u32(floor(p.y * src.y));
    let fieldParity = u32(interlaceField);
    if ((scanIdx & 1u) != fieldParity) {
      // Per-channel interlace decay — exp(-1/(rate*tau)) for each P22 channel.
      let decayR = exp(-1.0 / (flickerRate * flickerTauR));
      let decayG = exp(-1.0 / (flickerRate * flickerTauG));
      let decayB = exp(-1.0 / (flickerRate * flickerTauB));
      col = col * vec3f(decayR, decayG, decayB);
    }
  }

  // P1-A: Per-channel phosphor decay — P22 R/B decay ~150µs, G ~100µs.
  // P2-A: scrollRate threaded into phosphorDecayRGB so decay phase is sync'd to grid.
  // Guard: skip all three exp() calls when flickerAmt ≈ 0 (common default).
  if (flickerAmt > 0.001) {
    let decayRGB = phosphorDecayRGB(p.y, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollRate);
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
// Output remains gamma-encoded — Pass B (crtVertPassFn) blends the three source
// rows in the gamma domain before decoding to linear, matching TriG single-pass.
// ---------------------------------------------------------------------------
export const crtHorzPassFn = wgslFn(/* wgsl */`
fn crtHorzPass(
  tex: texture_2d<f32>,
  pos: vec2f,
  srcRes: vec2f,
  hardPix: f32,
  scrollRate: f32,
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
  apertureW: f32
) -> vec3f {
  // Apply UV distortions at source resolution before horizontal Gaussian.
  // This ensures the H-kernel is computed at the distorted source position,
  // matching the UV coordinate space used by crtVertPassFn (Pass B).
  let sagMag   = sagPhase * 0.04;
  var p        = vec2f(0.5) + (pos - vec2f(0.5)) * (1.0 - sagMag);
  let wrappedY = fract(p.y - rollbarPhase);
  let isActive = select(0.0, 1.0, rollbarPhase > 0.001);
  let hookZone = 0.07;
  let hookFac  = clamp(1.0 - wrappedY / hookZone, 0.0, 1.0) * isActive;
  let scanHash = fract(sin(wrappedY * 317.8 + rollbarPhase * 43.1) * 43758.54);
  let hookShift = hookFac * hookFac * 0.035
                + (scanHash * 2.0 - 1.0) * hookFac * 0.015;
  p = vec2f(p.x + hookShift, wrappedY);
  p = vec2f(p.x + hSwim(p, tWrapped) * swimAmt, p.y);

  // Edge defocus: soften hardPix toward screen corners (matches crtKernel single-pass).
  let defocusDir   = p - vec2f(0.5);
  let defocusRadSq = dot(defocusDir, defocusDir) * 4.0;
  let dynHardPix   = hardPix * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0);

  // Horizontal-only 5-tap Gaussian in gamma domain.
  // scale = vec2f(1.0): rendered at source resolution, so res == src.
  // P1-C: compute dx once (purely spatial — no scrollRate/t dependence).
  // Output stays gamma-encoded; Pass B blends in gamma domain and then decodes.
  let dx    = -(p.x * srcRes.x - floor(p.x * srcRes.x) - 0.5);
  let out_g = Horz5G(tex, p, 0.0, vec2f(1.0), srcRes,
                     dynHardPix, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, apertureW);
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
// giving 85–91% reduction for low-resolution sources.
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
  scrollRate: f32,
  t: f32,
  kernelGamma: f32,
  rgbSplitPx: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  defocusAmt: f32,
  flickerRate: f32,
  flickerTauR: f32,
  flickerTauG: f32,
  flickerTauB: f32,
  flickerAmt: f32,
  kernelSrcW: f32,
  kernelSrcH: f32,
  interlace: f32,
  interlaceField: f32
) -> vec3f {
  // kernelSrcW/H are the actual kernel RT dimensions set by renderFrame.
  // These always match kernelRT (e.g. 640×360) so textureLoad coordinates
  // stay within the valid texel range regardless of output resolution.
  let src = vec2f(kernelSrcW, kernelSrcH);
  let srcDims = vec2i(i32(src.x), i32(src.y));

  // Pass B reads from the intermediate RT (kernelRT) built by Pass A.
  // Pass A already baked sag, hook, and swim into the stored texels by sampling the scene
  // at the distorted UV. Re-applying those distortions here would compound them (~2× amplitude).
  // Only rollbar row-wrapping is needed for Y, so the rows align with what Pass A stored.
  // Sag/hook/swim are intentionally NOT applied in Pass B.
  let wrappedY = fract(pos.y - rollbarPhase);

  // Edge defocus: hardScan softens toward screen corners. Use output pos (undistorted) for radius.
  let defocusDir   = pos - vec2f(0.5);
  let defocusRadSq = dot(defocusDir, defocusDir) * 4.0;
  let dynHardScan  = hardScan * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0);

  // Map output UV to integer source-row coordinates using undistorted X + rollbar-wrapped Y.
  // Horizontal distortions are already baked into the RT by Pass A.
  let straightX = clamp(i32(floor(pos.x * src.x)), 0, i32(src.x) - 1);
  let ipos = vec2i(straightX, clamp(i32(floor(wrappedY * src.y)), 0, i32(src.y) - 1));

  // Load 3 source rows from intermediate RT (gamma-encoded Horz5G output).
  // One texture read per row — no horizontal fetches at output resolution.
  let a = textureLoad(kernelTex, clamp(ipos + vec2i(0, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
  let b = textureLoad(kernelTex, ipos, 0).rgb;
  let c = textureLoad(kernelTex, clamp(ipos + vec2i(0,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;

  // P1-G fix: b is already gamma-encoded (Horz5G output from Pass A).
  // Use Luma(b) directly — gamma-domain luma — consistent with TriG single-pass.
  // Prior code applied pow(b, 0.4) which was a 2nd gamma encode: b^0.4 = src^(0.4*0.4)=src^0.16.
  // dy: fractional scanline position for vertical Gaussian blend.
  // Use wrappedY (rollbar-wrapped output Y) for consistent scanline centring.
  let dy      = Dist(vec2f(pos.x, wrappedY), src, scrollRate, t).y;
  let luma    = clamp(Luma(b), 0.0, 1.0);
  let dynScan = dynHardScan + mix(0.0, 4.0, luma);

  let blended = a * Gaus(dy + (-1.0), dynScan)
              + b * Gaus(dy +   0.0,  dynScan)
              + c * Gaus(dy +   1.0,  dynScan);

  // Decode gamma → linear (same final step as TriG in single-pass path).
  var col = pow(max(blended, vec3f(0.0)), vec3f(kernelGamma));

  // RGB split: glitch-driven output-space channel offset.
  // Shift R and B horizontally when reading from the intermediate RT.
  // rgbSplitPx is in output pixels; convert to source pixels via src.x/res.x.
  if (rgbSplitPx > 0.001) {
    let splitSrc = i32(round(rgbSplitPx * src.x / res.x));
    // R: shifted +splitSrc source pixels, vertical blend at same row
    let ar = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let br = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc,  0), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let cr = textureLoad(kernelTex, clamp(ipos + vec2i( splitSrc,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let blendR = ar * Gaus(dy + (-1.0), dynScan) + br * Gaus(dy + 0.0, dynScan) + cr * Gaus(dy + 1.0, dynScan);
    col.r = pow(max(blendR.r, 0.0), kernelGamma);
    // B: shifted -splitSrc source pixels
    let ab = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc, -1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let bb = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc,  0), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let cb = textureLoad(kernelTex, clamp(ipos + vec2i(-splitSrc,  1), vec2i(0), srcDims - vec2i(1)), 0).rgb;
    let blendB = ab * Gaus(dy + (-1.0), dynScan) + bb * Gaus(dy + 0.0, dynScan) + cb * Gaus(dy + 1.0, dynScan);
    col.b = pow(max(blendB.b, 0.0), kernelGamma);
  }

  // Interlace: alternate-field scanlines get phosphor-decay attenuation (same as crtKernel).
  if (interlace > 0.5) {
    let scanIdx     = u32(floor(wrappedY * src.y));
    let fieldParity = u32(interlaceField);
    if ((scanIdx & 1u) != fieldParity) {
      // Per-channel interlace decay — exp(-1/(rate*tau)) for each P22 channel.
      let decayR = exp(-1.0 / (flickerRate * flickerTauR));
      let decayG = exp(-1.0 / (flickerRate * flickerTauG));
      let decayB = exp(-1.0 / (flickerRate * flickerTauB));
      col = col * vec3f(decayR, decayG, decayB);
    }
  }

  // P1-A: Per-channel phosphor decay. P2-A: scrollRate syncs decay phase to grid.
  // Guard: skip all three exp() calls when flickerAmt ≈ 0 (common default).
  if (flickerAmt > 0.001) {
    let decayRGB = phosphorDecayRGB(wrappedY, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollRate);
    col = col * mix(vec3f(1.0), decayRGB, flickerAmt);
  }
  return col;
}
`, [crtKernelFn]);

// ---------------------------------------------------------------------------
// crtHalationFn
// Isotropic 2D halation via separable 5-tap H convolution x vertical Gaussian.
//
// Physical mechanism: forward scattering through the CRT faceplate glass bulk
// (Mie/Rayleigh scattering from impurities, bubbles, and micro-inclusions).
// Light emitted by the phosphor layer enters the glass and scatters laterally
// before exiting the front surface, producing a diffuse halo around bright features.
//
// P0-A fix: previously only applied Gaus(dy) — zero horizontal spread, causing
// vertical comb striping at halationStr=3 without bloom. Now performs a 5-tap
// horizontal accumulation weighting by Gaus(dx +- offset, halationSharp). The result is
// then multiplied by Gaus(dy, halationSharp) for the separable 2D response:
//   halo(x,y) = [sum_h tex(x+h,y) * Gaus(h,s)] * Gaus(dy,s)
// All 5 taps use raw texture fetches weighted by vw = Gaus(dy, hardScan), giving
// consistent vertical weighting across the entire horizontal aperture.
// This prevents the centre-tap inconsistency that arose when scannedColor (which
// already has the kernel's vertical Gaussian baked in) was used as c0 while the
// side taps used raw fetches × vw — both paths then multiplied by Gaus(dy, halationSharp),
// double-weighting the centre relative to the intended separable response.
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
  scrollRate: f32,
  t: f32,
  swimAmt: f32,
  rollbarPhase: f32,
  sagPhase: f32,
  sourceSizeX: f32,
  sourceSizeY: f32,
  halationSharp: f32,
  hardScan: f32,
  kernelGamma: f32
) -> vec3f {
  // Resolve source resolution (same logic as crtKernel).
  let src = vec2f(
    select(res.x, sourceSizeX, sourceSizeX > 0.5),
    select(res.y, sourceSizeY, sourceSizeY > 0.5)
  );
  let scale = res / src;

  // UV distortion preamble: mirrors crtKernel steps 1-4 to compute the
  // same distorted p that the kernel used. Keep this in sync with crtKernel.
  // UV distortion preamble: mirrors crtKernel steps 1-4. This triplication (kernel,
  // vertPass, halation) costs ~27 ALU ops × 3 = ~81 ops/px. Deduplication requires
  // returning distortedPos from crtKernelFn (currently returns vec3f colour).
  // A future vec4f or struct return could pack (r,g,b,dist_packed). Until then,
  // keep all three preambles in sync when changing any distortion parameter.
  let sagMag   = sagPhase * 0.04;
  var p        = vec2f(0.5) + (pos - vec2f(0.5)) * (1.0 - sagMag);
  let wrappedY = fract(p.y - rollbarPhase);
  let isActive = select(0.0, 1.0, rollbarPhase > 0.001);
  let hookZone = 0.07;
  let hookFac  = clamp(1.0 - wrappedY / hookZone, 0.0, 1.0) * isActive;
  let scanHash = fract(sin(wrappedY * 317.8 + rollbarPhase * 43.1) * 43758.54);
  let hookShift = hookFac * hookFac * 0.035
                + (scanHash * 2.0 - 1.0) * hookFac * 0.015;
  p = vec2f(p.x + hookShift, wrappedY);
  p = vec2f(p.x + hSwim(p, t) * swimAmt, p.y);

  let d   = Dist(p, src, scrollRate, t);
  let dy  = d.y;
  let dx  = d.x;

  // Separable 2D halation: H-pass (5 taps from tex) x V-pass (Gaus(dy)).
  // Raw H-taps are attenuated by the scanline vertical Gaussian (Gaus(dy, hardScan))
  // to approximate the post-scanline signal at neighbouring H positions. Without this,
  // raw taps retain full luminance in inter-scanline gaps, inflating halation ~4x.
  // The centre tap (scannedColor) already has the full kernel weight embedded.
  let wh_2 = Gaus(dx - 2.0, halationSharp);
  let wh_1 = Gaus(dx - 1.0, halationSharp);
  let wh0  = Gaus(dx,        halationSharp);
  let wh1  = Gaus(dx + 1.0, halationSharp);
  let wh2  = Gaus(dx + 2.0, halationSharp);
  let whSum = wh_2 + wh_1 + wh0 + wh1 + wh2;

  // Vertical scanline weight for raw taps — matches the attenuation already baked
  // into scannedColor, so all 5 taps have consistent vertical weighting.
  // In two-pass mode (sourceSizeX > 0.5), tex is kernelRT which stores gamma-encoded
  // values from Pass A. Decode to linear before halation blending to match scannedColor
  // (which is already linear from crtVertPassFn's pow(blended, kernelGamma) step).
  let vw = Gaus(dy, hardScan);
  let isTwoPass = sourceSizeX > 0.5;
  let gammaVec = vec3f(select(1.0, kernelGamma, isTwoPass));
  let c_2 = pow(max(Fetch(tex, p, vec2f(-2.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * vw;
  let c_1 = pow(max(Fetch(tex, p, vec2f(-1.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * vw;
  // DR-5 P2-B: center tap uses scannedColor (post-scanline reconstruction) rather than a raw
  // source fetch. The halo should radiate from phosphor-emitted light (which carries scanline
  // structure); raw source has full bandwidth and produces sharper-edged halos than physical.
  // scannedColor is always linear (crtVertPassFn decodes before returning in two-pass mode).
  let c0  = scannedColor * vw;
  let c1  = pow(max(Fetch(tex, p, vec2f( 1.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * vw;
  let c2  = pow(max(Fetch(tex, p, vec2f( 2.0, 0.0), res, scale), vec3f(0.0)), gammaVec) * vw;

  let hBlur = (c_2 * wh_2 + c_1 * wh_1 + c0 * wh0 + c1 * wh1 + c2 * wh2) / whSum;

  return hBlur * Gaus(dy, halationSharp);
}
`, [crtKernelFn]);
