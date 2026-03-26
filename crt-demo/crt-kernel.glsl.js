/**
 * crt-kernel.glsl.js
 * GLSL ES 3.0 kernel for the CRT scanline reconstruction pipeline.
 * Translated from crt-kernel.wgsl.js — functionally identical.
 * Replaces wgslFn with glslFn for Three.js WebGL2 backend compatibility.
 *
 * GLSL requires helpers declared before callers (no forward references).
 * The HELPERS_GLSL string lists all 16 helper functions in topological order.
 * The entry function follows HELPERS in each glslFn call.
 * GLSLNodeFunction identifies the last function as the entry point.
 */

import { glslFn } from 'three/tsl';

// ---------------------------------------------------------------------------
// Shared GLSL helper block. Included ahead of every entry function.
// Topological order (callee before caller):
//   Gaus, Erf, ErfGaus, ErfGausSR2, Luma,
//   Fetch, FetchConv, FetchConvGamma, Horz3G, Horz5G,
//   Dist, TriG, phosphorDecay, phosphorDecayRGB,
//   hSwimNorm, applyUVDistortions
// ---------------------------------------------------------------------------
const HELPERS_GLSL = /* glsl */`

// Uses exp2(sharp * pos^2) with base-2 exponentiation convention.
// Coefficients hardPix and hardScan are tuned for base-2: exp2(x) = exp(x * ln2).
// Equivalent to exp() with sharp scaled by 1/ln(2) ~ 1.443.
// Do NOT substitute exp() without rescaling: hardPix -1.2 -> -1.73, hardScan -8 -> -11.5.
float Gaus(float pos, float sharp) {
  return exp2(sharp * pos * pos);
}

// Bi-exponential PSF: Gaussian core (electron backscatter) + exponential tail (phosphor scatter).
// PSF(dx) = coreBlend * exp2(sharp*dx^2) + (1-coreBlend) * exp(-|dx|/tailSigma).
// At coreBlend=1.0: pure Gaussian (backward compatible with halation Gaus() path).
float BiExp(float dx, float sharp, float tailSigma, float coreBlend) {
  float core = exp2(sharp * dx * dx);
  float tail = exp(-abs(dx) / max(tailSigma, 0.01));
  return coreBlend * core + (1.0 - coreBlend) * tail;
}

// Approximate error function (Abramowitz & Stegun 7.1.26, max |err| < 1.5e-7).
float Erf(float x) {
  float t = 1.0 / (1.0 + 0.3275911 * abs(x));
  float p = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  float e = 1.0 - p * exp(-x * x);
  return (x >= 0.0) ? e : -e;
}

// Aperture integral: fraction of a Gaussian beam (parameterised by sharp, base-2 convention)
// that passes through a rectangular slit of width apertureW source pixels centred at dx.
// Physically: the exact luminance contribution of a phosphor stripe to a given output pixel
// when the beam profile is Gaussian. Returns a value in [0, 1].
// sigma = sqrt(-1 / (2 * sharp * ln(2))); the erf argument is (dx +/- w/2) / (sigma * sqrt(2)).
float ErfGaus(float dx, float sharp, float apertureW) {
  float sigma = sqrt(-1.0 / (2.0 * sharp * 0.693147));
  float lo = (dx - apertureW * 0.5) / (sigma * 1.41421356);
  float hi = (dx + apertureW * 0.5) / (sigma * 1.41421356);
  return 0.5 * (Erf(hi) - Erf(lo));
}

// Pre-computed variant -- caller passes sigmaR2 = sigma * sqrt(2) once to avoid
// redundant sqrt() + divisions when called multiple times with the same sharp.
// Used by Horz3G and Horz5G to hoist sigma computation out of the per-tap loop.
float ErfGausSR2(float dx, float sigmaR2, float halfAperture) {
  return 0.5 * (Erf((dx + halfAperture) / sigmaR2)
              - Erf((dx - halfAperture) / sigmaR2));
}

// BT.709 luminance of a linear RGB colour (scene RT is linear-light).
float Luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

// Load the scene texture at a pixel-snapped position with an integer source-pixel offset.
// off is in source-pixel units; scale = res / src converts source offsets to output pixels.
// Uses texelFetch (no sampler) -- every call already resolves to an integer texel.
// Returns vec3 -- no ToLinear decode (scene output is already linear).
//
// The base coordinate uses textureSize(tex, 0) so that pos (UV 0-1) always maps
// to the full texture extent. Critical in two-pass mode where the texture
// (scene output or kernelRT) can differ in size from the render target resolution.
// Offsets are converted from source-pixel units to texel units via (texSize / res) * scale.
// Clamp to valid texel range -- prevents OOB taps from darkening the Horz normaliser
// while preserving correct reconstruction for the boundary source pixels.
vec3 Fetch(sampler2D tex, vec2 pos, vec2 off, vec2 res, vec2 scale, vec2 texSize) {
  vec2 texScale = texSize / max(res, vec2(1.0));
  vec2 iCoordF  = pos * texSize + off * scale * texScale;
  ivec2 iCoord  = clamp(ivec2(floor(iCoordF)), ivec2(0), ivec2(texSize) - ivec2(1));
  iCoord.y = int(texSize.y) - 1 - iCoord.y;  // WebGL RT: Y=0 at bottom
  return texelFetch(tex, iCoord, 0).rgb;
}

// Like Fetch but displaces R and B channels for convergence error simulation.
// DR-8 P3-B: FetchConv issues 3 texelFetch calls (center G, shifted R, shifted B).
// For Horz5G: 5 taps x 3 loads = 15 texelFetches. For TriG (Horz3G+Horz5G+Horz3G): 33 total.
// In practice this adds ~0% measured GPU cost: rPos/bPos are within ~20 px of center,
// hitting the same L1 cache lines as the center fetch on all tested hardware.
//   - Radially (dynamic/pincushion): scales with distance^2 from screen centre.
//     conv is the convergence uniform (0 = off, 0.035 = subtle, 0.1 = obvious).
//   - Statically (uniform across screen): R uses convStaticX/Y, B uses convBX/convBY.
//     Independent B offset breaks the anti-symmetric constraint -- real thermal drift
//     moves both R and B in the same direction, with B ~30% larger than R.
//     Old behaviour (anti-symmetric): set convBX = -convStaticX, convBY = -convStaticY.
//   - convAspect (P1-B): 0 = radially symmetric (delta gun / shadow mask),
//     1 = H-only pincushion (inline aperture grille / Trinitron geometry).
//     Real Trinitron: R and B guns displaced horizontally -> H-only misconvergence.
vec3 FetchConv(sampler2D tex, vec2 pos, vec2 off, vec2 res, vec2 scale,
               float conv, float convStaticX, float convStaticY, float convBX, float convBY,
               float convAspect, vec2 texSize) {
  // Fast path: all convergence disabled -- single fetch, no extra reads.
  if (abs(conv) < 0.0001 && abs(convStaticX) < 0.0001 && abs(convStaticY) < 0.0001
      && abs(convBX) < 0.0001 && abs(convBY) < 0.0001) {
    return Fetch(tex, pos, off, res, scale, texSize);
  }
  vec2 dir = pos - vec2(0.5);
  // P1-B: anisotropic convergence -- mix between radial (dot(dir,dir)) and H-only (dir.x^2).
  // convAspect=0: radial (shadow mask / delta gun). convAspect=1: H-only (aperture grille / Trinitron).
  // P1-C: normalize dir by screen aspect before dot() so radial distance is in physical
  // pixel units rather than UV units. For convAspect=1 (H-only default) this is a no-op.
  float aspect = res.x / max(res.y, 1.0);
  vec2 dirPhys = vec2(dir.x, dir.y * aspect);
  float mag = -conv * mix(dot(dirPhys, dirPhys), dir.x * dir.x, convAspect);
  // Static offset: convert source-pixel offset to UV (divide by source resolution).
  vec2 staticRUv = vec2(convStaticX, convStaticY) * scale / res;
  vec2 staticBUv = vec2(convBX, convBY) * scale / res;  // B uses its own independent static offset
  vec2 rPos = pos + dir *  mag + staticRUv;
  vec2 bPos = pos + dir * -mag + staticBUv;
  vec3 center = Fetch(tex, pos, off, res, scale, texSize);
  float r;
  float b;
  if (max(abs(rPos.x - 0.5), abs(rPos.y - 0.5)) > 0.5) {
    r = 0.0;  // Outside raster: no phosphor illumination (blanking interval).
  } else {
    r = Fetch(tex, rPos, off, res, scale, texSize).r;
  }
  if (max(abs(bPos.x - 0.5), abs(bPos.y - 0.5)) > 0.5) {
    b = 0.0;  // Outside raster: no phosphor illumination (blanking interval).
  } else {
    b = Fetch(tex, bPos, off, res, scale, texSize).b;
  }
  return vec3(r, center.g, b);
}

// Gamma-domain fetch helpers -- encode each texel to CRT gamma before
// the horizontal Gaussian weighted average. Physical basis: the CRT beam spreads
// in voltage domain (gamma-decoded signal), not linear-light. Interpolating in
// gamma space gives brighter, more natural-looking scanline edges (matches how
// crt-royale and Guest Advanced CRT compute horizontal reconstruction).
// After TriG() the result is decoded back to linear for the rest of the pipeline.
// P3-C: kernelGamma is user-configurable (default 2.5). 1/kernelGamma encodes to gamma space.
vec3 FetchConvGamma(sampler2D tex, vec2 pos, vec2 off, vec2 res, vec2 scale,
                    float conv, float convStaticX, float convStaticY, float convBX, float convBY,
                    float convAspect, float kernelGamma, float gammaFast, vec2 texSize) {
  vec3 c = max(FetchConv(tex, pos, off, res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, texSize), vec3(0.0));
  return (gammaFast > 0.5) ? sqrt(c) : pow(c, vec3(1.0 / kernelGamma));
}

// P1-C + P3-B: dx is precomputed once in TriG and passed in -- eliminates 4 redundant Dist().x
// evaluations per output pixel. scrollRate and t are removed from Horz3G/Horz5G because
// Dist().x is purely spatial (no time dependence): dx = -(pos.x*src.x - floor(pos.x*src.x) - 0.5).
// P2-A (DR-9): sigmaR2 and halfAper are hoisted to the caller (TriG / crtHorzPassFn) and passed in,
// eliminating 2 redundant sqrt() calls per output pixel in the TriG path. hardPix and apertureW
// are no longer needed in the Horz signatures -- all callers compute and own those values.
// ErfGausSR2 integrates the Gaussian beam over the physical aperture width for each tap weight,
// matching crt-royale BEAM_SHAPE_MODE=2. The normaliser (wb+wc+wd) handles total energy.
// 3-tap horizontal Gaussian with aperture-integrated weights (ErfGausSR2).
vec3 Horz3G(sampler2D tex, vec2 pos, float off, vec2 scale, vec2 res,
            float sigmaR2, float halfAper, float dx,
            float conv, float convStaticX, float convStaticY, float convBX, float convBY,
            float convAspect, float kernelGamma, float gammaFast) {
  vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: one call for all 3 taps
  vec3 b = FetchConvGamma(tex, pos, vec2(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 c = FetchConvGamma(tex, pos, vec2( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 d = FetchConvGamma(tex, pos, vec2( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  float wb = ErfGausSR2(dx - 1.0, sigmaR2, halfAper);
  float wc = ErfGausSR2(dx + 0.0, sigmaR2, halfAper);
  float wd = ErfGausSR2(dx + 1.0, sigmaR2, halfAper);
  return (b * wb + c * wc + d * wd) / (wb + wc + wd);
}

// 5-tap horizontal Gaussian with aperture-integrated weights (ErfGausSR2).
vec3 Horz5G(sampler2D tex, vec2 pos, float off, vec2 scale, vec2 res,
            float sigmaR2, float halfAper, float dx,
            float conv, float convStaticX, float convStaticY, float convBX, float convBY,
            float convAspect, float kernelGamma, float gammaFast) {
  vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: one call for all 5 taps
  vec3 a = FetchConvGamma(tex, pos, vec2(-2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 b = FetchConvGamma(tex, pos, vec2(-1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 c = FetchConvGamma(tex, pos, vec2( 0.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 d = FetchConvGamma(tex, pos, vec2( 1.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  vec3 e = FetchConvGamma(tex, pos, vec2( 2.0, off), res, scale, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast, texSize);
  float wa = ErfGausSR2(dx - 2.0, sigmaR2, halfAper);
  float wb = ErfGausSR2(dx - 1.0, sigmaR2, halfAper);
  float wc = ErfGausSR2(dx + 0.0, sigmaR2, halfAper);
  float wd = ErfGausSR2(dx + 1.0, sigmaR2, halfAper);
  float we = ErfGausSR2(dx + 2.0, sigmaR2, halfAper);
  return (a * wa + b * wb + c * wc + d * wd + e * we) / (wa + wb + wc + wd + we);
}

// Sub-pixel fractional distance from the source-pixel-grid centre.
// pos is in UV space (0..1); src is the virtual CRT source resolution.
// Using src (not res) ensures the Gaussian beam width is in source-pixel units,
// matching how a real CRT electron beam spans a fixed number of phosphor cells
// regardless of output display resolution.
// scrollPhase: pre-computed JS-side phase = (t * scrollRate) % src_y, updated each frame.
// Wraps at integer source-line boundaries so fract(dy) is continuous -- no visible seam.
// Using a JS uniform avoids the tWrapped-boundary discontinuity (t*scrollRate jumps
// many source lines when tWrapped resets to 0 every 3600 s).
vec2 Dist(vec2 pos, vec2 src, float scrollPhase) {
  float dx = pos.x * src.x;
  float dy = pos.y * src.y + scrollPhase;
  return -vec2((dx - floor(dx)) - 0.5, (dy - floor(dy)) - 0.5);
}

// Gamma-domain scanline reconstruction. Fetches in gamma=kernelGamma space so the horizontal
// Gaussian blending happens in voltage domain (as on real CRT hardware), then
// decodes back to linear light for the rest of the pipeline.
// P1-C: Dist() is computed ONCE here and dx/dy passed to all Horz calls,
// eliminating 4 redundant Dist().x evaluations (saves ~32 ALU ops/px).
vec3 TriG(sampler2D tex, vec2 pos, vec2 src, vec2 scale, vec2 res,
          float hardPix, float hardScan, float scrollPhase,
          float conv, float convStaticX, float convStaticY, float convBX, float convBY,
          float convAspect, float kernelGamma, float apertureW, float apertureH,
          float gammaFast, float beamAlpha) {
  // P1-C: compute Dist() once -- both dx and dy -- before any Horz calls.
  vec2 dist_val = Dist(pos, src, scrollPhase);
  float dx = dist_val.x;
  float dy = dist_val.y;

  // 1-tap center fetch for luma estimation -- used for dynHardPix (horizontal beam width).
  // Keeps the center-row 1-tap approach for sigmaR2/halfAper which must be known before the Horz calls.
  vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by center fetch; Horz* compute their own
  vec3 centerGamma = FetchConvGamma(tex, pos, vec2(0.0, 0.0), res, scale,
                                    conv, convStaticX, convStaticY, convBX, convBY,
                                    convAspect, kernelGamma, gammaFast, texSize);
  // DR-6 P1-A: decode to linear before computing luma (BT.709 coefficients require linear light).
  // Gamma-encoded luma overestimates mid-tone values by ~52% at gamma=2.5, causing over-wide beams.
  vec3 centerLinear = (gammaFast > 0.5) ? (centerGamma * centerGamma)
                                        : pow(max(centerGamma, vec3(0.0)), vec3(kernelGamma));
  float luma  = clamp(Luma(centerLinear), 0.0, 1.0);
  // Power-law beam softening: sigma_sc ~ I^(2/3) per Langmuir-Child space-charge law.
  // At high beam current, the electron cloud's self-repulsive space-charge force partially
  // un-focuses the beam before the focusing electrode. Because focusing voltage is fixed,
  // bright areas receive a wider spot. Beam current ∝ linear display light (not gamma voltage).
  // Using linear luma (decoded from gamma) is correct: beam current is proportional to
  // display light output in linear domain, not gamma-encoded voltage.
  // luma=1: identical to sqrt. Mid-tones: slightly less softening (sharper by ~0.08 beamW).
  // CRT-Royale uses luma^0.33; Langmuir-Child gives luma^0.667 as the upper physical bound.
  float beamW = pow(luma, beamAlpha);  // space-charge defocus: sigma_sc ~ I^alpha (Langmuir-Child at 0.667)
  // Clamp to -0.1 so beam-broadening at corners (defocusFac=0 -> hardPix->0) cannot
  // make dynHardPix zero or positive, which would produce NaN in sigmaR2.
  float dynHardPix = min(hardPix + mix(0.0, 1.5, beamW), -0.1);

  // DR-9 P2-A: hoist sigmaR2 and halfAper -- shared by all three Horz calls (same dynHardPix).
  // Saves 2 redundant sqrt() calls per output pixel vs. computing inside each Horz function.
  float sigmaR2  = sqrt(-1.0 / (2.0 * dynHardPix * 0.693147)) * 1.41421356;
  float halfAper = apertureW * 0.5;

  // Horizontal reconstruction in gamma domain with precomputed dx (P1-C).
  vec3 a_g = Horz3G(tex, pos, -1.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  vec3 b_g = Horz5G(tex, pos,  0.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  vec3 c_g = Horz3G(tex, pos,  1.0, scale, res, sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);

  // P2-B: per-row luma for vertical Gaussian weights.
  // Each source row may have different luminance; outer-row dynScan must use its own luma,
  // not the center row's, to correctly model vertical beam width at luma transitions.
  vec3 aLinear = (gammaFast > 0.5) ? (a_g * a_g) : pow(max(a_g, vec3(0.0)), vec3(kernelGamma));
  vec3 bLinear = (gammaFast > 0.5) ? (b_g * b_g) : pow(max(b_g, vec3(0.0)), vec3(kernelGamma));
  vec3 cLinear = (gammaFast > 0.5) ? (c_g * c_g) : pow(max(c_g, vec3(0.0)), vec3(kernelGamma));
  float dynScanA = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(aLinear), 0.0, 1.0)));
  float dynScanB = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(bLinear), 0.0, 1.0)));
  float dynScanC = hardScan + mix(0.0, 4.0, sqrt(clamp(Luma(cLinear), 0.0, 1.0)));

  // Vertical blend: aperture-integrated ErfGausSR2 replaces point-sampled Gaus.
  // Fixes ~11% peak brightness overestimate at hardScan=-8 (SPEC-21 P3-F).
  // Vertical is intentionally un-normalised (preserves dark scanline gaps).
  float halfApertureH = apertureH * 0.5;
  float sigmaVR2_A = sqrt(-1.0 / (2.0 * min(dynScanA, -0.1) * 0.693147)) * 1.41421356;
  float sigmaVR2_B = sqrt(-1.0 / (2.0 * min(dynScanB, -0.1) * 0.693147)) * 1.41421356;
  float sigmaVR2_C = sqrt(-1.0 / (2.0 * min(dynScanC, -0.1) * 0.693147)) * 1.41421356;

  vec3 out_g = a_g * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH)
             + b_g * ErfGausSR2(dy +   0.0,  sigmaVR2_B, halfApertureH)
             + c_g * ErfGausSR2(dy +   1.0,  sigmaVR2_C, halfApertureH);

  // Decode back to linear light.
  return (gammaFast > 0.5) ? (out_g * out_g)
                           : pow(max(out_g, vec3(0.0)), vec3(kernelGamma));
}

// Phosphor decay sweep: brightness decays exponentially from the moment the
// electron beam last passed through this scanline row.
// Scanline index is snapped to the scrolling source-pixel grid (floor(pos_y*src_y + scrollPhase))
// so the decay phase is synchronised with the Gaussian scanline position (P2-A fix).
// All output pixels that map to the same source scanline share the same phase,
// eliminating sub-pixel phase shimmer across the scanline height.
float phosphorDecay(float pos_y, float src_y, float t, float flickerRate, float tau, float scrollPhase) {
  float scrolledY = pos_y * src_y + scrollPhase;
  float scanline  = floor(scrolledY);
  float phase     = fract(t * flickerRate - scanline / src_y);
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
// Returns vec3 decay factors (one per channel) for use with mix(vec3(1.0), decay, flickerAmt).
vec3 phosphorDecayRGB(float pos_y, float src_y, float t, float flickerRate,
                      float tauR, float tauG, float tauB, float scrollPhase) {
  float scrolledY = pos_y * src_y + scrollPhase;
  float scanline  = floor(scrolledY);
  float phase     = fract(t * flickerRate - scanline / src_y);
  return vec3(
    exp(-phase / max(tauR * flickerRate, 0.0001)),
    exp(-phase / max(tauG * flickerRate, 0.0001)),
    exp(-phase / max(tauB * flickerRate, 0.0001))
  );
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
// DR-14 P3-B: normalised swim variant. y_norm = uv.y * (outputH / srcH) from crtHorzPassFn
// so spatial frequency is in cycles/output-screen-height regardless of source resolution.
// Single-pass and halation callers pass y_norm = uv.y * 1.0 (unchanged).
// hSwimNorm must be declared before applyUVDistortions which calls it.
float hSwimNorm(float y_norm, float swimNoise) {
  // Spatial envelope; temporal variation driven by CPU-side OU process (swimNoise in [-1,1]).
  float s1 = sin(y_norm * 1.73) * 0.00075;
  float s2 = sin(y_norm * 2.91) * 0.00040;
  return (s1 + s2) * swimNoise;
}

// Shared UV distortion chain: sag -> rollbar -> H-sync hook/flagging -> H-swim.
// Used identically by crtKernel, crtHorzPass, and crtHalation.
// Returns the fully distorted position p; p.y == fract(saggedY - rollbarPhase)
// (hook and swim only modify p.x after the rollbar step).
// DR-14 P3-B: swimYScale normalises uv.y before hSwimNorm so spatial frequency of H-swim
// is always in cycles/output-screen-height. Single-pass and halation pass 1.0 (unchanged);
// crtHorzPassFn passes outputSizeY / max(srcH, 1.0) to correct the two-pass mismatch.
vec2 applyUVDistortions(vec2 pos, float swimAmt, float rollbarPhase, float sagPhase, float sagStrength, float rollbarHookAmt, float swimNoise, float swimYScale) {
  // 1. Voltage sag: shrink image toward centre (max 4% at sagPhase=1.0).
  float sagMag   = sagPhase * 0.04 * sagStrength;
  vec2 p         = vec2(0.5) + (pos - vec2(0.5)) * (1.0 - sagMag);
  // 2. Rollbar scroll: fract-wrap Y so the content seam tracks the CSS dark band.
  float wrappedY = fract(p.y - rollbarPhase);
  // 3. H-sync hook / flagging: AFC recovery bow + per-scanline jitter.
  float isActive = (rollbarPhase > 0.001) ? 1.0 : 0.0;
  float hookFac  = clamp(1.0 - wrappedY / 0.07, 0.0, 1.0) * isActive;
  float scanHash = fract(sin(wrappedY * 317.8 + rollbarPhase * 43.1) * 43758.54);
  float hookShift = hookFac * hookFac * 0.035 * rollbarHookAmt
                  + (scanHash * 2.0 - 1.0) * hookFac * 0.015 * rollbarHookAmt;
  p = vec2(p.x + hookShift, wrappedY);
  // 4. H-swim: per-scanline horizontal drift from deflection oscillator instability.
  // DR-14 P3-B: normalise y by swimYScale before computing swim displacement.
  p = vec2(p.x + hSwimNorm(p.y * swimYScale, swimNoise) * swimAmt, p.y);
  return p;
}
`;

// ---------------------------------------------------------------------------
// Shared helpers include node.
// Using a single glslFn instance means Three.js deduplicates the helpers via
// builder.getCodeFromNode(this, …) — they are emitted only once in the shader
// even when multiple kernel functions appear inline in the same WebGL2 program
// (e.g. crtKernelFn + crtHalationFn both inline in single-pass mode).
// The #pragma main dummy entry satisfies GLSLNodeFunction.parse(), which
// requires the source to start with a parseable declaration after trim().
// ---------------------------------------------------------------------------
const _glslKernelHelpers = glslFn(HELPERS_GLSL + '\n#pragma main\nvec2 _glslKernelHelpersEntry() { return vec2(0.0); }');

// ---------------------------------------------------------------------------
// crtKernelFn — full pipeline entry: UV distortions -> TriG -> RGB split
//               -> phosphor decay.
// ---------------------------------------------------------------------------
export const crtKernelFn = glslFn(/* glsl */`
#pragma main
vec3 crtKernel(
  sampler2D tex,
  vec2 pos,
  vec2 res,
  float hardPix,
  float hardScan,
  float scrollPhase,
  float t,
  float convergence,
  float convStaticX,
  float convStaticY,
  float convBX,
  float convBY,
  float convAspect,
  float kernelGamma,
  float rgbSplitPx,
  float swimAmt,
  float rollbarPhase,
  float sagPhase,
  float sagStrength,
  float rollbarHookAmt,
  float defocusAmt,
  float defocusAniso,
  float flickerRate,
  float flickerTauR,
  float flickerTauG,
  float flickerTauB,
  float flickerAmt,
  float sourceSizeX,
  float sourceSizeY,
  float interlace,
  float interlaceField,
  float apertureW,
  float apertureH,
  float gammaFast,
  float beamAlpha,
  float swimNoise,
  float ehtRippleAmt,
  float ehtDecayRate,
  float astigAmt,
  float astigRadial,
  float astigTangential,
  float phosphorGrainAmt,
  float phosphorGrainScale,
  float domingAmt,
  float domingThermalTau,
  float phosphorSatAmt,
  float phosphorXtalkAmt,
  float phosphorXtalkRadius
) {
  // Resolve source resolution: 0 -> use output resolution (backward-compatible).
  // src is the virtual CRT pixel grid (e.g. 320x240 for a lo-res source).
  // scale converts source-pixel offsets to output pixels for Fetch().
  vec2 src = vec2(
    (sourceSizeX > 0.5) ? sourceSizeX : res.x,
    (sourceSizeY > 0.5) ? sourceSizeY : res.y
  );
  vec2 scale = res / src;

  // --- UV distortions: sag -> rollbar -> hook -> swim (via shared helper) ---
  // DR-14 P3-B: swimYScale=1.0 -- single-pass uses output UV directly (no normalisation needed).
  vec2 p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, sagStrength, rollbarHookAmt, swimNoise, 1.0);

  // Edge defocus: both hardPix and hardScan soften toward screen corners.
  // DR-9 P0-B: previously only dynHardPix was reduced; dynHardScan was missing, leaving corners
  // horizontally blurred but vertically sharp -- physically incorrect for isotropic defocus.
  // defocusAniso=0: isotropic (spherical tube); =1: V-only (cylindrical tube, e.g. Trinitron).
  vec2 dir       = p - vec2(0.5);
  float radSq    = (dir.x * dir.x * (1.0 - defocusAniso) + dir.y * dir.y) * 4.0;
  float defocusFac  = clamp(1.0 - defocusAmt * radSq, 0.0, 1.0);
  float dynHardPix  = hardPix  * defocusFac;
  float dynHardScan = hardScan * defocusFac;

  // Gamma-domain scanline reconstruction: horizontal Gaussian blending in
  // voltage domain matches real CRT electron-optics; decoded back to linear after.
  vec3 col = TriG(tex, p, src, scale, res, dynHardPix, dynHardScan, scrollPhase,
                  convergence, convStaticX, convStaticY, convBX, convBY, convAspect,
                  kernelGamma, apertureW, apertureH, gammaFast, beamAlpha);

  // RGB split: re-sample shifted R and B channels in gamma domain for consistency.
  if (rgbSplitPx > 0.001) {
    float splitUv = rgbSplitPx / res.x;
    // Compute dx at the shifted positions for the Horz5G calls.
    vec2 pR = p + vec2(splitUv, 0.0);
    vec2 pB = p - vec2(splitUv, 0.0);
    float dxR = -(pR.x * src.x - floor(pR.x * src.x) - 0.5);
    float dxB = -(pB.x * src.x - floor(pB.x * src.x) - 0.5);
    // DR-13 P1-A: Beam broadening for RGB split -- match TriG's luma-dependent sigma.
    // col is post-TriG linear light; use its luma to reproduce TriG's dynHardPix so
    // R/B channels use the same beam width as the G channel at this luminance level.
    float splitLuma          = clamp(Luma(col), 0.0, 1.0);
    float splitBeamW         = pow(splitLuma, beamAlpha);  // space-charge I^alpha, matches main TriG path
    float dynHardPixBroadened = min(dynHardPix + mix(0.0, 1.5, splitBeamW), -0.1);
    float sigmaR2Split       = sqrt(-1.0 / (2.0 * dynHardPixBroadened * 0.693147)) * 1.41421356;
    float halfAperSplit      = apertureW * 0.5;
    vec3 r_g = Horz5G(tex, pR, 0.0, scale, res, sigmaR2Split, halfAperSplit, dxR, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
    vec3 b_g = Horz5G(tex, pB, 0.0, scale, res, sigmaR2Split, halfAperSplit, dxB, convergence, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
    col.r = (gammaFast > 0.5) ? (r_g.r * r_g.r) : pow(max(r_g.r, 0.0), kernelGamma);
    col.b = (gammaFast > 0.5) ? (b_g.b * b_g.b) : pow(max(b_g.b, 0.0), kernelGamma);
  }

  // Interlace field identification is handled by the TSL layer (buildCRTEffect), which
  // fills off-field rows from prevTexNode (previous frame). No GPU-side attenuation here.
  // interlace/interlaceField params retained for potential future sub-field use.

  // P1-A: Per-channel phosphor decay -- P22 R/B decay ~1.5 ms, G ~100 us.
  // P2-A: scrollPhase threaded in so decay phase is sync'd to the scrolling source grid.
  // Guard: skip all three exp() calls when flickerAmt ~= 0 (common default).
  if (flickerAmt > 0.001) {
    vec3 decayRGB = phosphorDecayRGB(p.y, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollPhase);
    col = col * mix(vec3(1.0), decayRGB, flickerAmt);
  }

  // Effect 1: EHT ripple -- exponential brightness decay from left edge.
  if (ehtRippleAmt > 0.001) {
    float ehtDecay    = 1.0 - ehtRippleAmt * (1.0 - exp(-ehtDecayRate * p.x));
    float ehtLeftEdge = ehtRippleAmt * 0.3 * exp(-p.x * 20.0);
    col = col * (ehtDecay + ehtLeftEdge);
  }

  // Effect 2: position-dependent beam astigmatism.
  if (astigAmt > 0.001) {
    vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by all 4 taps
    vec2 astigDir  = p - vec2(0.5);
    float astigR2  = dot(astigDir, astigDir) * 4.0;
    float astigTangFac = 1.0 + astigAmt * astigTangential * astigR2;
    float astigRadFac  = 1.0 + astigAmt * astigRadial     * astigR2;
    vec3 astigSoftH = FetchConvGamma(tex, p, vec2(-1.0, 0.0), res, scale,
                                     convergence, convStaticX, convStaticY, convBX, convBY,
                                     convAspect, kernelGamma, gammaFast, texSize)
                    + FetchConvGamma(tex, p, vec2( 1.0, 0.0), res, scale,
                                     convergence, convStaticX, convStaticY, convBX, convBY,
                                     convAspect, kernelGamma, gammaFast, texSize);
    vec3 astigLinH = (gammaFast > 0.5) ? (astigSoftH * astigSoftH * 0.25)
                                       : pow(max(astigSoftH * 0.5, vec3(0.0)), vec3(kernelGamma));
    col = mix(col, astigLinH, clamp((astigTangFac - 1.0) * 0.5, 0.0, 0.5));

    vec3 astigSoftV0 = FetchConvGamma(tex, p, vec2(0.0, -1.0), res, scale,
                                      convergence, convStaticX, convStaticY, convBX, convBY,
                                      convAspect, kernelGamma, gammaFast, texSize);
    vec3 astigSoftV1 = FetchConvGamma(tex, p, vec2(0.0,  1.0), res, scale,
                                      convergence, convStaticX, convStaticY, convBX, convBY,
                                      convAspect, kernelGamma, gammaFast, texSize);
    vec3 astigLinV = (gammaFast > 0.5) ? ((astigSoftV0 + astigSoftV1) * (astigSoftV0 + astigSoftV1) * 0.25)
                                       : pow(max((astigSoftV0 + astigSoftV1) * 0.5, vec3(0.0)), vec3(kernelGamma));
    col = mix(col, astigLinV, clamp((astigRadFac - 1.0) * 0.5, 0.0, 0.5));
  }

  // Effect 8: shadow mask thermal doming (single-frame approximation).
  if (domingAmt > 0.001) {
    vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by both neighbor taps
    float centerLuma  = dot(col, vec3(0.2126, 0.7152, 0.0722));
    vec3 n1 = FetchConvGamma(tex, p, vec2( 4.0, 0.0), res, scale,
                              convergence, convStaticX, convStaticY, convBX, convBY,
                              convAspect, kernelGamma, gammaFast, texSize);
    vec3 n2 = FetchConvGamma(tex, p, vec2(-4.0, 0.0), res, scale,
                              convergence, convStaticX, convStaticY, convBX, convBY,
                              convAspect, kernelGamma, gammaFast, texSize);
    vec3 n1Lin = (gammaFast > 0.5) ? (n1 * n1) : pow(max(n1, vec3(0.0)), vec3(kernelGamma));
    vec3 n2Lin = (gammaFast > 0.5) ? (n2 * n2) : pow(max(n2, vec3(0.0)), vec3(kernelGamma));
    float neighborLuma = dot((n1Lin + n2Lin) * 0.5, vec3(0.2126, 0.7152, 0.0722));
    float domingBias   = domingAmt * max(0.0, centerLuma - neighborLuma);
    float luma         = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(col, vec3(luma), domingBias * 0.5);
  }

  // Effect 4: phosphor granularity -- fixed spatial hash (no time variable).
  if (phosphorGrainAmt > 0.001) {
    vec2 grainCoord  = floor(p * res * phosphorGrainScale);
    float grainHash  = fract(sin(dot(grainCoord, vec2(127.1, 311.7))) * 43758.5453);
    float grainFactor = 1.0 + phosphorGrainAmt * (grainHash * 2.0 - 1.0);
    col = col * grainFactor;
  }

  // Shrader-Leverenz phosphor saturation: η(J) = η₀ / (1 + J × k)
  // P22G/P22B (ZnS) saturate more aggressively than P22R (Y₂O₂S:Eu).
  // At high brightness: G and B compress more → highlights shift warm.
  // Source: Shrader 1946; Li & Lin 2014 low-voltage CL review.
  if (phosphorSatAmt > 0.001) {
    float kR = 0.5 * phosphorSatAmt;
    float kG = 1.0 * phosphorSatAmt;
    float kB = 0.8 * phosphorSatAmt;
    col.r = col.r / (1.0 + col.r * kR);
    col.g = col.g / (1.0 + col.g * kG);
    col.b = col.b / (1.0 + col.b * kB);
  }

  // Inter-phosphor cross-talk: secondary electrons and optical scatter cause ~1-3%
  // colour contamination from adjacent phosphor stripes/dots.
  // Modeled as a Gaussian 3-tap horizontal colour average.
  // Source: den Engelsen et al. 2015 (secondary electron range ~50-100 µm).
  if (phosphorXtalkAmt > 0.001) {
    vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by both xtalk taps
    vec3 left    = Fetch(tex, p, vec2(-phosphorXtalkRadius, 0.0), res, scale, texSize);
    vec3 right   = Fetch(tex, p, vec2( phosphorXtalkRadius, 0.0), res, scale, texSize);
    vec3 blended = left * 0.25 + col * 0.5 + right * 0.25;
    col = mix(col, blended, phosphorXtalkAmt);
  }

  return col;
}
`, [_glslKernelHelpers]);

// ---------------------------------------------------------------------------
// crtHorzPassFn
// Pass A of the two-pass kernel downsampling path.
// Runs at source resolution: for each source pixel computes the 5-tap horizontal
// Gaussian (Horz5G) and stores the gamma-encoded result in an intermediate RT.
//
// scale = vec2(1.0): Pass A renders at source resolution so res == src and
// no source-to-output scaling is needed.
// Output remains gamma-encoded -- Pass B (crtVertPassFn) blends the three source
// rows in the gamma domain before decoding to linear, matching TriG single-pass.
// ---------------------------------------------------------------------------
export const crtHorzPassFn = glslFn(/* glsl */`
#pragma main
vec3 crtHorzPass(
  sampler2D tex,
  vec2 pos,
  vec2 srcRes,
  float hardPix,
  float tWrapped,
  float conv,
  float convStaticX,
  float convStaticY,
  float convBX,
  float convBY,
  float convAspect,
  float kernelGamma,
  float swimAmt,
  float rollbarPhase,
  float sagPhase,
  float sagStrength,
  float rollbarHookAmt,
  float defocusAmt,
  float defocusAniso,
  float apertureW,
  float outputSizeY,
  float gammaFast,
  float beamAlpha,
  float swimNoise,
  float astigAmt,
  float astigRadial,
  float astigTangential
) {
  // Apply UV distortions at source resolution (sag -> rollbar -> hook -> swim).
  // DR-14 P3-B: normalise uv.y by (outputSizeY / srcRes.y) so hSwim spatial frequency
  // is in cycles/output-screen-height. Without this, at srcH=240 and outputH=1080 the
  // effective swim frequency is 1.73 * 240/1080 = 0.384 cycles/screen (4.5x too low).
  float swimYScale = outputSizeY / max(srcRes.y, 1.0);
  vec2 p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, sagStrength, rollbarHookAmt, swimNoise, swimYScale);

  // Edge defocus: soften hardPix toward screen corners (matches crtKernel single-pass).
  // defocusAniso=0: isotropic; =1: V-only (cylindrical tube).
  // DR-14 P0-B: clamp to -0.1 -- defocusFac=0 at corners would give dynHardPix=0 -> sigmaR2=+Inf -> NaN.
  // Matches TriG's clamp. Applied before beam broadening so broadening never makes it positive.
  vec2 defocusDir   = p - vec2(0.5);
  float defocusRadSq = (defocusDir.x * defocusDir.x * (1.0 - defocusAniso) + defocusDir.y * defocusDir.y) * 4.0;
  float dynHardPixBase = min(hardPix * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0), -0.1);

  // DR-9 P1-A: luma-dependent beam broadening in Pass A -- mirrors TriG single-pass logic.
  // Without this, two-pass mode produces systematically crisper horizontals than single-pass
  // at the same settings: bright lines are too narrow because Pass A ran at minimum beam width.
  // Power-law beam softening: sigma_sc ~ I^(2/3) (Langmuir-Child), matches TriG / crtVertPassFn.
  // scale = vec2(1.0) at source resolution -- FetchConvGamma args match crtHorzPass context.
  vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by center luma fetch; Horz5G computes its own
  vec3 cGamma  = FetchConvGamma(tex, p, vec2(0.0, 0.0), vec2(1.0), srcRes,
                                conv, convStaticX, convStaticY, convBX, convBY,
                                convAspect, kernelGamma, gammaFast, texSize);
  vec3 cLinear = (gammaFast > 0.5) ? (cGamma * cGamma)
                                   : pow(max(cGamma, vec3(0.0)), vec3(kernelGamma));
  float luma  = clamp(Luma(cLinear), 0.0, 1.0);
  float beamW = pow(luma, beamAlpha);  // space-charge I^alpha
  // Clamp to -0.1: defocusFac=0 at corners makes dynHardPixBase=0, then beam
  // broadening can push it positive -> NaN in sigmaR2.
  float dynHardPix = min(dynHardPixBase + mix(0.0, 1.5, beamW), -0.1);

  // Horizontal-only 5-tap Gaussian in gamma domain.
  // scale = vec2(1.0): rendered at source resolution, so res == src.
  // P1-C: compute dx once (purely spatial -- no scrollRate/t dependence).
  // DR-9 P2-A: sigmaR2/halfAper hoisted from Horz5G -- computed once per source pixel.
  // Output stays gamma-encoded; Pass B blends in gamma domain and then decodes.
  float dx       = -(p.x * srcRes.x - floor(p.x * srcRes.x) - 0.5);
  float sigmaR2  = sqrt(-1.0 / (2.0 * dynHardPix * 0.693147)) * 1.41421356;
  float halfAper = apertureW * 0.5;
  vec3 out_g = Horz5G(tex, p, 0.0, vec2(1.0), srcRes,
                      sigmaR2, halfAper, dx, conv, convStaticX, convStaticY, convBX, convBY, convAspect, kernelGamma, gammaFast);
  return max(out_g, vec3(0.0));
}
`, [_glslKernelHelpers]);

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
export const crtVertPassFn = glslFn(/* glsl */`
#pragma main

vec3 crtVertPass(
  sampler2D kernelTex,
  vec2 pos,
  vec2 res,
  float hardScan,
  float scrollPhase,
  float t,
  float kernelGamma,
  float rgbSplitPx,
  float swimAmt,
  float rollbarPhase,
  float sagPhase,
  float defocusAmt,
  float defocusAniso,
  float flickerRate,
  float flickerTauR,
  float flickerTauG,
  float flickerTauB,
  float flickerAmt,
  float kernelSrcW,
  float kernelSrcH,
  float interlace,
  float interlaceField,
  float apertureH,
  float gammaFast,
  float ehtRippleAmt,
  float ehtDecayRate,
  float astigAmt,
  float astigRadial,
  float astigTangential,
  float phosphorGrainAmt,
  float phosphorGrainScale,
  float phosphorSatAmt,
  float phosphorXtalkAmt,
  float phosphorXtalkRadius
) {
  // kernelSrcW/H are the actual kernel RT dimensions set by renderFrame.
  // These always match kernelRT (e.g. 640x360) so texelFetch coordinates
  // stay within the valid texel range regardless of output resolution.
  vec2 src     = vec2(kernelSrcW, kernelSrcH);
  ivec2 srcDims = ivec2(int(src.x), int(src.y));

  // Pass B reads from the intermediate RT (kernelRT) built by Pass A.
  // Pass A already baked ALL distortions (sag, rollbar, hook, swim) into the stored texels
  // by sampling the scene at the distorted UV. Re-applying any of them here would double them.
  // DR-9 P0-A: the previous code applied rollbar again via fract(pos.y - rollbarPhase),
  // causing 2x rollbar displacement. Fixed: use pos.y directly to map output UV -> RT row.
  // Sag/hook/swim/rollbar are intentionally NOT applied in Pass B.

  // Edge defocus: hardScan softens toward screen corners. Use output pos (undistorted) for radius.
  // defocusAniso=0: isotropic; =1: V-only (cylindrical tube).
  vec2 defocusDir   = pos - vec2(0.5);
  float defocusRadSq = (defocusDir.x * defocusDir.x * (1.0 - defocusAniso) + defocusDir.y * defocusDir.y) * 4.0;
  float dynHardScan  = hardScan * clamp(1.0 - defocusAmt * defocusRadSq, 0.0, 1.0);

  // Map output UV to integer source-row coordinates using pos.y (no rollbar re-application).
  // Horizontal distortions are already baked into the RT by Pass A.
  int straightX = clamp(int(floor(pos.x * src.x)), 0, int(src.x) - 1);
  ivec2 ipos = ivec2(straightX, clamp(int(floor(pos.y * src.y)), 0, int(src.y) - 1));
  ipos.y = int(src.y) - 1 - ipos.y;  // WebGL RT: Y=0 at bottom
  int vSign = -1;

  // Load 3 source rows from intermediate RT (gamma-encoded Horz5G output).
  // One texelFetch per row -- no horizontal fetches at output resolution.
  vec3 a = texelFetch(kernelTex, clamp(ipos + ivec2(0, -vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;
  vec3 b = texelFetch(kernelTex, ipos, 0).rgb;
  vec3 c = texelFetch(kernelTex, clamp(ipos + ivec2(0,  vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;

  // dy: fractional scanline position for vertical Gaussian blend.
  // Use pos.y (not rollbar-wrapped) -- rollbar is already baked in the RT.
  float dy = Dist(vec2(pos.x, pos.y), src, scrollPhase).y;

  // DR-6 P1-A / DR-7 P2-C: decode rows to linear for luma computation.
  // BT.709 coefficients require linear-light inputs, so rows must be decoded before Luma().
  // The vertical blend below (a*ErfGaus + b*ErfGaus + c*ErfGaus) intentionally remains in
  // gamma domain -- this matches the single-pass TriG path where a_g/b_g/c_g are all
  // FetchConvGamma outputs (gamma-encoded) and the decode happens once after the sum.
  // Gamma-domain vertical blend is the physical model: CRT beam spreads in voltage domain.
  // P2-A: per-row dynScan -- each source row may have different luminance; outer-row
  // dynScan must use its own luma, not the center row's, to correctly model vertical
  // beam width at luma transitions (bright-to-dark adjacent scanlines).
  vec3 aLinear = (gammaFast > 0.5) ? (a * a) : pow(max(a, vec3(0.0)), vec3(kernelGamma));
  vec3 bLinear = (gammaFast > 0.5) ? (b * b) : pow(max(b, vec3(0.0)), vec3(kernelGamma));
  vec3 cLinear = (gammaFast > 0.5) ? (c * c) : pow(max(c, vec3(0.0)), vec3(kernelGamma));
  float dynScanA = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(aLinear), 0.0, 1.0)));
  float dynScanB = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(bLinear), 0.0, 1.0)));
  float dynScanC = dynHardScan + mix(0.0, 4.0, sqrt(clamp(Luma(cLinear), 0.0, 1.0)));

  // Vertical blend: aperture-integrated ErfGausSR2 replaces point-sampled Gaus (SPEC-21 P3-F).
  float halfApertureH = apertureH * 0.5;
  float sigmaVR2_A = sqrt(-1.0 / (2.0 * min(dynScanA, -0.1) * 0.693147)) * 1.41421356;
  float sigmaVR2_B = sqrt(-1.0 / (2.0 * min(dynScanB, -0.1) * 0.693147)) * 1.41421356;
  float sigmaVR2_C = sqrt(-1.0 / (2.0 * min(dynScanC, -0.1) * 0.693147)) * 1.41421356;

  vec3 blended = a * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH)
               + b * ErfGausSR2(dy +   0.0,  sigmaVR2_B, halfApertureH)
               + c * ErfGausSR2(dy +   1.0,  sigmaVR2_C, halfApertureH);

  vec3 col = (gammaFast > 0.5) ? (blended * blended)
                               : pow(max(blended, vec3(0.0)), vec3(kernelGamma));

  // RGB split: glitch-driven output-space channel offset.
  // Shift R and B horizontally when reading from the intermediate RT.
  // rgbSplitPx is in output pixels; convert to source pixels via src.x/res.x.
  if (rgbSplitPx > 0.001) {
    int splitSrc = int(round(rgbSplitPx * src.x / res.x));
    // R: shifted +splitSrc source pixels, vertical blend at same row.
    vec3 ar = texelFetch(kernelTex, clamp(ipos + ivec2( splitSrc, -vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 br = texelFetch(kernelTex, clamp(ipos + ivec2( splitSrc,  0),     ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 cr = texelFetch(kernelTex, clamp(ipos + ivec2( splitSrc,  vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 blendR = ar * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH) + br * ErfGausSR2(dy + 0.0, sigmaVR2_B, halfApertureH) + cr * ErfGausSR2(dy + 1.0, sigmaVR2_C, halfApertureH);
    col.r = (gammaFast > 0.5) ? (blendR.r * blendR.r) : pow(max(blendR.r, 0.0), kernelGamma);
    vec3 ab = texelFetch(kernelTex, clamp(ipos + ivec2(-splitSrc, -vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 bb = texelFetch(kernelTex, clamp(ipos + ivec2(-splitSrc,  0),     ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 cb = texelFetch(kernelTex, clamp(ipos + ivec2(-splitSrc,  vSign), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 blendB = ab * ErfGausSR2(dy + (-1.0), sigmaVR2_A, halfApertureH) + bb * ErfGausSR2(dy + 0.0, sigmaVR2_B, halfApertureH) + cb * ErfGausSR2(dy + 1.0, sigmaVR2_C, halfApertureH);
    col.b = (gammaFast > 0.5) ? (blendB.b * blendB.b) : pow(max(blendB.b, 0.0), kernelGamma);
  }

  // Interlace field identification is handled by the TSL layer (buildCRTEffect).
  // interlace/interlaceField params retained for potential future sub-field use.

  // P1-A: Per-channel phosphor decay. P2-A: scrollPhase syncs decay phase to grid.
  // Guard: skip all three exp() calls when flickerAmt ~= 0 (common default).
  if (flickerAmt > 0.001) {
    // DR-9 P0-A: use pos.y (not wrappedY) -- rollbar already baked into RT rows.
    vec3 decayRGB = phosphorDecayRGB(pos.y, src.y, t, flickerRate, flickerTauR, flickerTauG, flickerTauB, scrollPhase);
    col = col * mix(vec3(1.0), decayRGB, flickerAmt);
  }

  // Effect 1 (EHT ripple): apply in vert pass for two-pass path using pos.x.
  if (ehtRippleAmt > 0.001) {
    float ehtDecay    = 1.0 - ehtRippleAmt * (1.0 - exp(-ehtDecayRate * pos.x));
    float ehtLeftEdge = ehtRippleAmt * 0.3 * exp(-pos.x * 20.0);
    col = col * (ehtDecay + ehtLeftEdge);
  }

  // Effect 2 (astigmatism) V-component: blend toward vertical neighbours.
  if (astigAmt > 0.001) {
    vec2 astigDir   = pos - vec2(0.5);
    float astigR2   = dot(astigDir, astigDir) * 4.0;
    float astigRadFac = 1.0 + astigAmt * astigRadial * astigR2;
    vec3 aLin = (gammaFast > 0.5) ? (a * a) : pow(max(a, vec3(0.0)), vec3(kernelGamma));
    vec3 cLin = (gammaFast > 0.5) ? (c * c) : pow(max(c, vec3(0.0)), vec3(kernelGamma));
    vec3 astigLinV = (aLin + cLin) * 0.5;
    col = mix(col, astigLinV, clamp((astigRadFac - 1.0) * 0.5, 0.0, 0.5));
  }

  // Effect 4 (phosphor granularity): fixed spatial hash on source-pixel grid.
  // ipos is the integer source coordinate — use directly for grain texturing.
  if (phosphorGrainAmt > 0.001) {
    vec2 grainCoord = floor(vec2(ipos) * phosphorGrainScale);
    float grainHash = fract(sin(dot(grainCoord, vec2(127.1, 311.7))) * 43758.5453);
    col = col * (1.0 + phosphorGrainAmt * (grainHash * 2.0 - 1.0));
  }

  // Effect A (phosphor saturation): Shrader-Leverenz efficiency roll-off.
  // P22G/P22B (ZnS) saturate more than P22R (Y₂O₂S:Eu) — highlights shift warm.
  if (phosphorSatAmt > 0.001) {
    col.r = col.r / (1.0 + col.r * 0.5 * phosphorSatAmt);
    col.g = col.g / (1.0 + col.g * 1.0 * phosphorSatAmt);
    col.b = col.b / (1.0 + col.b * 0.8 * phosphorSatAmt);
  }

  // Effect C (inter-phosphor cross-talk): secondary-electron and optical scatter.
  // kernelTex stores gamma-encoded H-pass output; decode neighbours to linear before blend.
  if (phosphorXtalkAmt > 0.001) {
    int xtalkOff = max(1, int(round(phosphorXtalkRadius)));
    vec3 leftG  = texelFetch(kernelTex, clamp(ipos + ivec2(-xtalkOff, 0), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 rightG = texelFetch(kernelTex, clamp(ipos + ivec2( xtalkOff, 0), ivec2(0), srcDims - ivec2(1)), 0).rgb;
    vec3 leftLin  = (gammaFast > 0.5) ? (leftG  * leftG)  : pow(max(leftG,  vec3(0.0)), vec3(kernelGamma));
    vec3 rightLin = (gammaFast > 0.5) ? (rightG * rightG) : pow(max(rightG, vec3(0.0)), vec3(kernelGamma));
    col = mix(col, leftLin * 0.25 + col * 0.5 + rightLin * 0.25, phosphorXtalkAmt);
  }

  return col;
}
`, [_glslKernelHelpers]);

// ---------------------------------------------------------------------------
// crtHalationFn
// Isotropic 2D halation via separable 7-tap H convolution x vertical Gaussian.
//
// Physical mechanism: near-field phosphor-layer scatter and electron backscatter.
// Secondary electrons reflected off the aluminium backing layer land on adjacent
// phosphors (~1-3 src-px spread, Gaussian profile), and the phosphor layer itself
// forward-scatters a small fraction of emitted light laterally.
// This is distinct from wide glass-bulk scatter (Mie/Rayleigh from glass impurities),
// which is modeled separately by glassBlurStr (typical 1/e radius >> 5 output px).
// CRT-Royale: halation_weight = near-field electron scatter;
//             diffusion_weight = glass-bulk scatter.
// 1/e radius = sqrt(-1 / (ln2 * halationSharp)) -- consistent with CLAUDE.md convention.
// halationSharp: -0.85 (default) -> 1/e radius ~= 1.30 src-px (near-field / electron backscatter);
//                -0.4            -> 1/e radius ~= 1.90 src-px (approaching phosphor scatter);
//                -2.5            -> 1/e radius ~= 0.76 src-px (tight inter-scanline bleed).
//
// P0-A fix: previously only applied Gaus(dy) -- zero horizontal spread, causing
// vertical comb striping at halationStr=3 without bloom. Now performs a 7-tap
// horizontal accumulation weighting by Gaus(dx +/- offset, halationSharp). The result is
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
// pre-kernel; two-pass: H-kernel RT). A fully accurate fix requires an additional
// post-kernel RTT at full output resolution (accepted architectural trade-off).
//
// P2-A -- deferred RTT path: the vw = Gaus(dy, hardScan) mitigation on the outer taps
// reduces the inter-scanline inflation from ~4x to ~1.5x. Full accuracy would add a
// second convertToTexture() capturing the post-kernel scanned result. Gate on
// opts.accurateHalation (default false). Deferred: adds 1 draw call per frame.
//
// Gap A: sourceSizeX/Y resolve src so that Dist() snaps to source-pixel rows,
//   keeping the halation Gaussian centred on the same grid as the scanlines.
//
// UV distortion params (swimAmt, rollbarPhase, sagPhase) are mirrored from
// crtKernelFn so that dy is computed from the same distorted UV.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
export const crtHalationFn = glslFn(/* glsl */`
#pragma main
vec4 crtHalation(
  sampler2D tex,
  vec3 scannedColor,
  vec2 pos,
  vec2 res,
  float scrollPhase,
  float t,
  float swimAmt,
  float rollbarPhase,
  float sagPhase,
  float sagStrength,
  float rollbarHookAmt,
  float sourceSizeX,
  float sourceSizeY,
  float halationSharp,
  float hardScan,
  float kernelGamma,
  float accurateHalation,
  float halationTailSigma,
  float halationCoreBlend,
  float swimNoise,
  float halationSpectra
) {
  // accurateHalation: 0 = legacy mode, raw outer taps weighted by vw (scanline Gaussian);
  //                   1 = post-kernel RTT mode, tapW forced to 1 (no inter-scanline inflation).
  // Resolve source resolution (same logic as crtKernel).
  vec2 src = vec2(
    (sourceSizeX > 0.5) ? sourceSizeX : res.x,
    (sourceSizeY > 0.5) ? sourceSizeY : res.y
  );
  vec2 scale = res / src;

  // UV distortion: same sag -> rollbar -> hook -> swim chain as crtKernel,
  // via the shared helper. Ensures dy is computed from the same distorted p
  // that the kernel used, so halation tracks the scanline rows correctly.
  // DR-14 P3-B: swimYScale=1.0 -- halation uses output UV directly (same as crtKernelFn).
  vec2 p = applyUVDistortions(pos, swimAmt, rollbarPhase, sagPhase, sagStrength, rollbarHookAmt, swimNoise, 1.0);

  vec2 d  = Dist(p, src, scrollPhase);
  float dy = d.y;
  float dx = d.x;

  float vw   = Gaus(dy, hardScan);
  float tapW = (accurateHalation > 0.5) ? 1.0 : vw;
  bool isTwoPass  = sourceSizeX > 0.5;
  bool needsDecode = isTwoPass || (accurateHalation > 0.5);
  vec3 gammaVec = vec3(needsDecode ? kernelGamma : 1.0);
  vec2 fetchBase = isTwoPass ? pos : p;
  vec2 texSize = vec2(textureSize(tex, 0));  // hoisted: shared by all 6 halation taps

  vec3 c_3 = pow(max(Fetch(tex, fetchBase, vec2(-3.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;
  vec3 c_2 = pow(max(Fetch(tex, fetchBase, vec2(-2.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;
  vec3 c_1 = pow(max(Fetch(tex, fetchBase, vec2(-1.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;
  vec3 c0  = scannedColor;
  vec3 c1  = pow(max(Fetch(tex, fetchBase, vec2( 1.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;
  vec3 c2  = pow(max(Fetch(tex, fetchBase, vec2( 2.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;
  vec3 c3  = pow(max(Fetch(tex, fetchBase, vec2( 3.0, 0.0), res, scale, texSize), vec3(0.0)), gammaVec) * tapW;

  // BiExp: Gaussian core + exponential tail. At halationCoreBlend=1.0: pure Gaussian.
  // Fast path: halationSpectra < 0.001 — single achromatic PSF, identical to pre-spec behaviour.
  if (halationSpectra < 0.001) {
    float wh_3 = BiExp(dx - 3.0, halationSharp, halationTailSigma, halationCoreBlend);
    float wh_2 = BiExp(dx - 2.0, halationSharp, halationTailSigma, halationCoreBlend);
    float wh_1 = BiExp(dx - 1.0, halationSharp, halationTailSigma, halationCoreBlend);
    float wh0  = BiExp(dx,       halationSharp, halationTailSigma, halationCoreBlend);
    float wh1  = BiExp(dx + 1.0, halationSharp, halationTailSigma, halationCoreBlend);
    float wh2  = BiExp(dx + 2.0, halationSharp, halationTailSigma, halationCoreBlend);
    float wh3  = BiExp(dx + 3.0, halationSharp, halationTailSigma, halationCoreBlend);
    float whSum = wh_3 + wh_2 + wh_1 + wh0 + wh1 + wh2 + wh3;
    vec3 hBlur = (c_3*wh_3 + c_2*wh_2 + c_1*wh_1 + c0*wh0 + c1*wh1 + c2*wh2 + c3*wh3) / whSum;
    vec3 halo_rgb = hBlur * BiExp(dy, halationSharp, halationTailSigma, halationCoreBlend);
    float grad = clamp(dx * 2.0, -1.0, 1.0);
    return vec4(halo_rgb, grad);
  }

  // Spectral path: per-channel PSF widths via Rayleigh lambda^-2 diffusion scaling.
  // P22 phosphor peaks: R=625nm, G=530nm (reference channel), B=450nm (JEDEC JEP-133).
  // k_R = (530/625)^2 = 0.7194;  k_B = (530/450)^2 = 1.3865
  // sharp scales as 1/k^2 (tighter for R, wider for B); tail scales as k (narrower R, wider B).
  // halationSpectra blends from achromatic (0) to full spectral separation (1).
  float KR      = 0.7194;
  float INV_KR2 = 1.9322;
  float KB      = 1.3865;
  float INV_KB2 = 0.5202;
  float sharpR = mix(halationSharp, halationSharp * INV_KR2, halationSpectra);
  float sharpB = mix(halationSharp, halationSharp * INV_KB2, halationSpectra);
  float tailR  = mix(halationTailSigma, halationTailSigma * KR, halationSpectra);
  float tailB  = mix(halationTailSigma, halationTailSigma * KB, halationSpectra);

  float wR_3 = BiExp(dx - 3.0, sharpR, tailR, halationCoreBlend);
  float wR_2 = BiExp(dx - 2.0, sharpR, tailR, halationCoreBlend);
  float wR_1 = BiExp(dx - 1.0, sharpR, tailR, halationCoreBlend);
  float wR0  = BiExp(dx,       sharpR, tailR, halationCoreBlend);
  float wR1  = BiExp(dx + 1.0, sharpR, tailR, halationCoreBlend);
  float wR2  = BiExp(dx + 2.0, sharpR, tailR, halationCoreBlend);
  float wR3  = BiExp(dx + 3.0, sharpR, tailR, halationCoreBlend);
  float wRSum = wR_3 + wR_2 + wR_1 + wR0 + wR1 + wR2 + wR3;

  float wG_3 = BiExp(dx - 3.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wG_2 = BiExp(dx - 2.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wG_1 = BiExp(dx - 1.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wG0  = BiExp(dx,       halationSharp, halationTailSigma, halationCoreBlend);
  float wG1  = BiExp(dx + 1.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wG2  = BiExp(dx + 2.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wG3  = BiExp(dx + 3.0, halationSharp, halationTailSigma, halationCoreBlend);
  float wGSum = wG_3 + wG_2 + wG_1 + wG0 + wG1 + wG2 + wG3;

  float wB_3 = BiExp(dx - 3.0, sharpB, tailB, halationCoreBlend);
  float wB_2 = BiExp(dx - 2.0, sharpB, tailB, halationCoreBlend);
  float wB_1 = BiExp(dx - 1.0, sharpB, tailB, halationCoreBlend);
  float wB0  = BiExp(dx,       sharpB, tailB, halationCoreBlend);
  float wB1  = BiExp(dx + 1.0, sharpB, tailB, halationCoreBlend);
  float wB2  = BiExp(dx + 2.0, sharpB, tailB, halationCoreBlend);
  float wB3  = BiExp(dx + 3.0, sharpB, tailB, halationCoreBlend);
  float wBSum = wB_3 + wB_2 + wB_1 + wB0 + wB1 + wB2 + wB3;

  float hBlurR = (c_3.r*wR_3 + c_2.r*wR_2 + c_1.r*wR_1 + c0.r*wR0 + c1.r*wR1 + c2.r*wR2 + c3.r*wR3) / wRSum;
  float hBlurG = (c_3.g*wG_3 + c_2.g*wG_2 + c_1.g*wG_1 + c0.g*wG0 + c1.g*wG1 + c2.g*wG2 + c3.g*wG3) / wGSum;
  float hBlurB = (c_3.b*wB_3 + c_2.b*wB_2 + c_1.b*wB_1 + c0.b*wB0 + c1.b*wB1 + c2.b*wB2 + c3.b*wB3) / wBSum;

  vec3 halo_rgb = vec3(
    hBlurR * BiExp(dy, sharpR,         tailR,             halationCoreBlend),
    hBlurG * BiExp(dy, halationSharp,  halationTailSigma, halationCoreBlend),
    hBlurB * BiExp(dy, sharpB,         tailB,             halationCoreBlend)
  );
  float grad = clamp(dx * 2.0, -1.0, 1.0);
  return vec4(halo_rgb, grad);
}
`, [_glslKernelHelpers]);
