/**
 * crt-tsl.js
 * Pure-TSL node builders and small wgslFn helpers for the non-kernel CRT stages.
 *
 * Exports:
 *   buildWarpNode(screenUVNode, warpMultUniform)  -- barrel distortion (pure TSL)
 *   buildMaskLutFn                                -- Lanczos-resampled mask LUT (wgslFn, F-8)
 *   grainFn                                       -- film grain (wgslFn)
 *   buildCornerMaskNode(posNode)                  -- bezel fade (pure TSL)
 *   buildGammaNode(colNode, gammaNode)             -- CRT gamma encode via kernelGamma uniform (pure TSL)
 *   buildScratchNode(colNode, scratchTex, scratchStrUniform) -- multiply blend (pure TSL)
 *   snowFn                                                  -- electronic snow (wgslFn)
 *   buildP22MatrixNode(colNode, p22StrNode)       -- P22 phosphor primary gamut (pure TSL)
 *   buildColorTempNode(colNode, colorTempNode)    -- Bradford D65->9300K CAT (pure TSL)
 *   ghostFn                                       -- multipath ghost UV offset sampler (wgslFn, P0-A)
 *   vbiFn                                         -- VBI bleed top-of-frame noise (wgslFn, P2-C)
 *   dotCrawlFn                                    -- NTSC dot crawl edge artifact (wgslFn, P2-A)
 */

import {
  Fn, vec2, vec3, vec4,
  float,
  mul, sub, add, div,
  pow, max, min,
  mix,
  smoothstep,
  wgslFn,
  screenSize,
} from 'three/tsl';

// ---------------------------------------------------------------------------
// 1. Barrel warp -- pure TSL
//    Replicates the original GLSL Warp() but with aspect-correct coefficients.
//    Physical basis: an isotropic CRT glass surface curves equally in H and V.
//    The original hardcoded 1/96 (H) and 1/72 (V) encode a 4:3 aspect ratio
//    (ratio 96/72 = 4/3). For widescreen (16:9) displays this produces more
//    horizontal warp than vertical, which is physically incorrect.
//
//    Fix: set BASE = 1/72 (the V coefficient at 4:3), compute:
//      wy = warpMult * BASE           (vertical, unchanged)
//      wx = warpMult * BASE / aspect  (horizontal, scaled by aspect ratio)
//    At 4:3 (aspect=1.333): wx = BASE/1.333 = 1/96  <- backward compatible
//    At 16:9 (aspect=1.778): wx = BASE/1.778 = 1/128 <- correct for widescreen
//    At 1:1  (aspect=1.0):   wx = BASE/1.0   = 1/72  <- equal H and V
// ---------------------------------------------------------------------------

/**
 * Build an aspect-correct barrel-warp node that maps screenUV to a warped UV.
 * Warp is isotropic in physical screen space: equal curvature in H and V.
 * Note: despite the "barrel" naming in comments, this formula produces the visual
 * appearance of a convex CRT screen (content expands outward from centre relative
 * to corners). By standard CRT shader convention this is "pincushion correction"
 * (removing the pincushion distortion of the curved screen). warpMult > 0 = more curvature.
 * @param {Node} uvNode       -- input UV node (e.g. screenUV)
 * @param {Node} warpMultNode -- uniform float node for warp multiplier
 * @returns {Node} vec2 warped UV
 */
export function buildWarpNode(uvNode, warpMultNode, sizeNode = screenSize, warpAnisoNode = float(0.0)) {
  return Fn(() => {
    // Map 0..1 -> -1..1
    const centered = uvNode.sub(0.5).mul(2.0);
    const cx = centered.x;
    const cy = centered.y;

    // Aspect-correct warp amounts.
    // BASE = 1/72 is the vertical coefficient at 4:3; horizontal is divided by
    // the current aspect ratio to maintain equal physical curvature.
    const BASE   = float(1.0 / 72.0);
    const aspect = sizeNode.x.div(sizeNode.y);
    const wx = warpMultNode.mul(BASE).div(aspect).mul(float(1.0).sub(warpAnisoNode));  // = 1/96 at 4:3; 0 at warpAniso=1
    const wy = warpMultNode.mul(BASE);              // = 1/72 always

    // Barrel scale each axis by the other axis squared
    const sx = cx.mul(float(1.0).add(cy.mul(cy).mul(wx)));
    const sy = cy.mul(float(1.0).add(cx.mul(cx).mul(wy)));

    // Map -1..1 -> 0..1
    return vec2(sx, sy).mul(0.5).add(0.5);
  })();
}

// ---------------------------------------------------------------------------
// 2. Lanczos-resampled phosphor mask LUT -- wgslFn (F-8 Moiré elimination)
//     Replaces the per-pixel maskFn call with a pre-resampled outputW × 4 LUT
//     rendered via rtt() each frame (~7 680 texels at 1920 px — negligible).
//     Lanczos-3 bandlimits the mask to the output Nyquist, eliminating Moiré
//     beats at non-integer maskScale / effectiveMaskScale values.
//     DR-15 P0-A: 12 LUT rows = LCM(1,2,3,4) — covers all mask type vertical periods:
//     1 (types 0,3,6,7), 2 (types 1,2), 3 (type 4 delta triad), 4 (type 5 VGA grid).
//     Previous height 4 caused type-4 row phase to cycle 0,1,2,0 (LCM(3,4)=12 misalign).
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const buildMaskLutFn = wgslFn(/* wgsl */`
fn buildMaskLutFn(uv: vec2f, effectiveMaskScale: f32, maskType: i32,
                  maskSmooth: f32, outputW: f32) -> vec4f {
  let cx    = uv.x * outputW - 0.5;
  // DR-15 P0-A: 12-row LUT, r cycles 0..11. Each mask type uses r % period internally.
  let r     = min(i32(uv.y * 12.0), 11);
  let x_src = cx / max(effectiveMaskScale, 0.01);
  var acc = vec3f(0.0);
  for (var dk: i32 = -2; dk <= 3; dk++) {
    let k  = i32(floor(x_src)) + dk;
    let dx = x_src - f32(k);
    let w  = lanczos3(dx);
    acc += analyticalMaskTap(k, r, maskType, maskSmooth) * w;
  }
  let floorVal = select(0.1, 0.3, maskType == 7);
  return vec4f(clamp(acc, vec3f(floorVal), vec3f(1.0)), 1.0);
}

fn lanczos3(x: f32) -> f32 {
  let ax = abs(x);
  if (ax >= 3.0) { return 0.0; }
  if (ax < 0.0001) { return 1.0; }
  let PI = 3.14159265358979;
  let px = PI * ax;
  return (sin(px) / px) * (sin(px / 3.0) / (px / 3.0));
}

fn analyticalMaskTap(k: i32, r: i32, maskType: i32, maskSmooth: f32) -> vec3f {
  let PI = 3.14159265;
  if (maskType == 1) {
    let col_idx    = ((k % 6) + 6) % 6;
    let row_idx    = r % 2;
    let rowShifted = row_idx + select(0, 1, col_idx >= 3);
    let shifted    = (col_idx + (rowShifted % 2) * 3) % 6;
    let yShift     = select(0.0, 1.0, col_idx >= 3);
    var mask: vec3f = vec3f(0.1);
    let k_mod2 = ((k % 2) + 2) % 2;
    let cx     = select(-0.5, 0.5, k_mod2 == 1);
    let cy     = fract((f32(r % 2) + 0.5 + yShift) / 2.0) * 2.0 - 1.0;
    if (maskSmooth < 0.001) {
      let dotW = clamp(1.0 - abs(cx), 0.0, 1.0) * clamp(1.0 - abs(cy), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      let dotS = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
               * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }
  if (maskType == 7) {
    let odd = ((k % 2) + 2) % 2;
    let fk2 = select(0.0, 0.5, odd == 1);
    let t   = cos(fk2 * 2.0 * PI) * 0.5 + 0.5;
    let hi  = mix(0.3, 1.0, t);
    let lo  = mix(1.0, 0.3, t);
    let bm  = select(vec3f(0.3, 1.0, 0.3), vec3f(1.0, 0.3, 1.0), odd == 0);
    return mix(bm, vec3f(hi, lo, hi), maskSmooth);
  }
  if (maskType == 6) {
    let px6  = ((k % 6) + 6) % 6;
    let fpx6 = f32(px6);
    var mask: vec3f = vec3f(0.1);
    if (px6 < 2) { mask.r = 1.0; }
    else if (px6 < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      let drC = min(min(abs(fpx6 - 1.0), 6.0 - fpx6 + 1.0), 1.0);
      let dgC = min(abs(fpx6 - 3.0), 1.0);
      let dbC = min(abs(fpx6 - 5.0), 1.0);
      let rw  = clamp(cos(drC * PI) * 0.45 + 0.55, 0.1, 1.0);
      let gw  = clamp(cos(dgC * PI) * 0.45 + 0.55, 0.1, 1.0);
      let bw  = clamp(cos(dbC * PI) * 0.45 + 0.55, 0.1, 1.0);
      mask = mix(mask, vec3f(rw, gw, bw), maskSmooth);
    }
    return mask;
  }
  if (maskType == 5) {
    let stagger = (r / 2) * 3;
    let qk      = k + stagger;
    let col_idx = ((qk % 6) + 6) % 6;
    var mask: vec3f = vec3f(0.1);
    if (col_idx < 2) { mask.r = 1.0; }
    else if (col_idx < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      let k_mod2 = ((k % 2) + 2) % 2;
      let fx     = select(-0.5, 0.5, k_mod2 == 1);
      let fy     = f32(r % 2) - 1.0;
      let gridX  = clamp(cos(fx * PI) * 0.3 + 0.7, 0.1, 1.0);
      let gridY  = clamp(cos(fy * PI) * 0.3 + 0.7, 0.1, 1.0);
      mask = mix(vec3f(0.1), mask, gridX * gridY);
    }
    return mask;
  }
  if (maskType == 4) {
    let col_idx = ((k % 6) + 6) % 6;
    let row_idx = r % 3;
    let shifted = (col_idx + row_idx * 2) % 6;
    var mask: vec3f = vec3f(0.1);
    if (maskSmooth < 0.001) {
      let k_mod2 = ((k % 2) + 2) % 2;
      let cx     = select(-0.5, 0.5, k_mod2 == 1);
      let dotW   = clamp(1.0 - abs(cx), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      let k_mod2 = ((k % 2) + 2) % 2;
      let cx     = select(-0.5, 0.5, k_mod2 == 1);
      let yPhase = f32(col_idx / 2) / 3.0;
      let cy     = fract((f32(r % 3) + 0.5) / 3.0 + yPhase) * 2.0 - 1.0;
      let dotS   = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
                 * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }
  if (maskType == 3) {
    let px3  = ((k % 3) + 3) % 3;
    let fpx3 = f32(px3);
    // DR-14 P3-A: aperture overlap integral for binary path.
    // Aperture for channel c centred at c: unit cell [fpx3-0.5, fpx3+0.5] vs aperture [c-0.5, c+0.5].
    var binaryMask: vec3f = vec3f(0.1);
    let aper_r = clamp(min(0.5, fpx3 + 0.5) - max(-0.5, fpx3 - 0.5), 0.0, 1.0);
    let aper_g = clamp(min(1.5, fpx3 + 0.5) - max(0.5,  fpx3 - 0.5), 0.0, 1.0);
    let aper_b = clamp(min(2.5, fpx3 + 0.5) - max(1.5,  fpx3 - 0.5), 0.0, 1.0);
    if (px3 == 0) { binaryMask.r = mix(0.1, 1.0, aper_r); }
    else if (px3 == 1) { binaryMask.g = mix(0.1, 1.0, aper_g); }
    else { binaryMask.b = mix(0.1, 1.0, aper_b); }
    if (maskSmooth < 0.001) { return binaryMask; }
    let drT = min(min(fpx3, 3.0 - fpx3), 0.5);
    let dgT = min(abs(fpx3 - 1.0), 0.5);
    let dbT = min(abs(fpx3 - 2.0), 0.5);
    let rwT = clamp(cos(drT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    let gwT = clamp(cos(dgT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    let bwT = clamp(cos(dbT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    return mix(binaryMask, vec3f(rwT, gwT, bwT), maskSmooth);
  }
  if (maskType == 2) {
    let col_idx  = ((k % 6) + 6) % 6;
    var mask: vec3f = vec3f(0.1);
    if (col_idx < 2) { mask.r = 1.0; }
    else if (col_idx < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    let row_frac = f32(r % 2) / 2.0;
    if (maskSmooth < 0.001) {
      let row_weight = select(1.0, 0.4, row_frac >= 0.5);
      mask = mix(vec3f(0.1), mask, row_weight);
    } else {
      let ry          = row_frac * 2.0 - 1.0;
      let row_weightS = 0.7 * (cos(ry * PI) * 0.5 + 0.5) + 0.3;
      mask = mix(vec3f(0.1), mask, row_weightS);
    }
    return mask;
  }
  // Type 0 (default): aperture grille (3px period, 1px aperture per channel).
  let px3  = ((k % 3) + 3) % 3;
  let fpx3 = f32(px3);
  // DR-14 P3-A: aperture overlap integral for binary path.
  // Aperture for channel c centred at c: unit cell [fpx3-0.5, fpx3+0.5] vs aperture [c-0.5, c+0.5].
  var binaryMask: vec3f = vec3f(0.1);
  let aper0_r = clamp(min(0.5, fpx3 + 0.5) - max(-0.5, fpx3 - 0.5), 0.0, 1.0);
  let aper0_g = clamp(min(1.5, fpx3 + 0.5) - max(0.5,  fpx3 - 0.5), 0.0, 1.0);
  let aper0_b = clamp(min(2.5, fpx3 + 0.5) - max(1.5,  fpx3 - 0.5), 0.0, 1.0);
  if (px3 == 0) { binaryMask.r = mix(0.1, 1.0, aper0_r); }
  else if (px3 == 1) { binaryMask.g = mix(0.1, 1.0, aper0_g); }
  else { binaryMask.b = mix(0.1, 1.0, aper0_b); }
  if (maskSmooth < 0.001) { return binaryMask; }
  let dr = min(min(fpx3, 3.0 - fpx3), 0.5);
  let dg = min(abs(fpx3 - 1.0), 0.5);
  let db = min(abs(fpx3 - 2.0), 0.5);
  let rw = clamp(cos(dr * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  let gw = clamp(cos(dg * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  let bw = clamp(cos(db * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  return mix(binaryMask, vec3f(rw, gw, bw), maskSmooth);
}
`);

// ---------------------------------------------------------------------------
// 3. Film grain -- wgslFn
//    Applied post-gamma in display space. This matches film grain aesthetic:
//    grain is proportionally larger relative to shadow values and barely visible
//    in highlights. Physical CRT shot noise behaves oppositely (proportional to
//    sqrtsignal, larger in highlights), but display-space grain is more visually
//    appealing and avoids gamma=2.5 amplification (~5x) in shadows.
//    See buildPostProcessing for ordering rationale (grain must follow bloom).
//
//    Gap E -- Per-channel spatial decorrelation:
//    Each R/G/B channel uses a different vec2f scale vector so they produce
//    spatially independent noise fields. Without this, all channels share the
//    same spatial structure (just time-offset), yielding achromatic monochrome
//    grain. Real film grain is spectrally coloured due to different layer
//    grain sizes in each dye layer.
//    Returns vec3f offset in [-grainAmt, +grainAmt] per channel.
// ---------------------------------------------------------------------------
export const grainFn = wgslFn(/* wgsl */`
fn grainFn(pixelCoord: vec2f, t: f32, grainAmt: f32) -> vec3f {
  // Single vec3->vec3 hash (IQ hash33 pattern): one traversal produces all three
  // independent R/G/B noise fields -- ~1.3x cheaper than three separate vec2 hashes.
  // Spatial decorrelation across channels is provided by the three different scale
  // factors (0.1031, 0.1030, 0.0973) and the (q.xxy + q.yxx) x q.zyx mixing step.
  // Time enters as the third input dimension (scaled x 100 to lift it out of the
  // near-zero mantissa region where fract() loses precision at high frame counts).
  // DR-7 P1-B: 97.0 (integer, exactly representable in f32). 97.0x3600=349200 < 2^2^3=8388608 ->
  // fract(349200.0f)=0.0 exactly, so tWrapped's 3600 s wrap causes no discontinuity in tOff.
  // Beat frequency |97-60|=37 Hz > 25 Hz temporal fusion threshold (same rationale as 97.3).
  // instead of 73.0 (which beats at |73-60|=13 Hz, producing a faint 77ms rolling structure).
  let tOff = fract(t * 97.0) * 100.0;
  var q: vec3f = fract(vec3f(pixelCoord.x, pixelCoord.y, tOff) * vec3f(0.1031, 0.1030, 0.0973));
  q = q + dot(q, q.yxz + 33.33);
  let n = fract((q.xxy + q.yxx) * q.zyx) * 2.0 - 1.0;
  return n * grainAmt;
}
`);

// ---------------------------------------------------------------------------
// 4. Corner mask -- pure TSL
//    Smooth bezel fade over r=0.018 band inside each screen edge.
//    Applied to the warped pos (not screenUV) to follow the barrel distortion.
// ---------------------------------------------------------------------------

/**
 * @param {Node} posNode -- vec2 warped UV (output of buildWarpNode)
 * @returns {Node} float mask in [0, 1]
 */
export function buildCornerMaskNode(posNode, sizeNode = screenSize, rNode = float(0.022)) {
  return Fn(() => {
    // P1-D: aspect-correct corner fade radius.
    // Physical isotropy: equal physical width fade on all edges.
    // On 16:9: rx = r / aspect so H and V fade cover the same number of pixels.
    // P3-D: lower smoothstep edge is slightly negative (-0.01) to accommodate
    // barrel-warp overshoot -- warped UV can go marginally below 0 at corners.
    const r      = rNode;
    const lo     = float(-0.01);  // P3-D: small negative margin for warp overshoot
    const one    = float(1.0);
    const aspect = sizeNode.x.div(sizeNode.y);
    const rx     = r.div(aspect);   // H radius scaled by aspect (equal physical width)
    const ry     = r;               // V radius always 1.8%
    const px = posNode.x;
    const py = posNode.y;
    const bx = smoothstep(lo, rx, px).mul(smoothstep(lo, rx, one.sub(px)));
    const by = smoothstep(lo, ry, py).mul(smoothstep(lo, ry, one.sub(py)));
    return bx.mul(by);
  })();
}

// ---------------------------------------------------------------------------
// 5. CRT gamma -- pure TSL
//    pow(max(col, 0), 1/2.5)  -- CRT phosphor gamma, slightly punchier than sRGB.
// ---------------------------------------------------------------------------

/**
 * DR-9 P1-B: gammaNode parameter added -- was hardcoded 2.5, now uses the kernelGamma uniform.
 * Mismatch between this encode and the persistence decode path (which already used
 * uniforms.kernelGamma) caused ~7% brightness error per channel when kernelGamma != 2.5.
 * @param {Node} colNode   -- vec3 linear colour
 * @param {Node} gammaNode -- float kernelGamma uniform (default 2.5)
 * @returns {Node} vec3 gamma-encoded colour
 */
export function buildGammaNode(colNode, gammaNode) {
  return pow(max(colNode, vec3(0.0)), vec3(float(1.0).div(gammaNode)));
}

// ---------------------------------------------------------------------------
// 6. Scratch multiply blend -- pure TSL
//    Multiply blend: col * (1 - scratchTex * scratchStr)
//    Physical scratches attenuate (scatter/absorb) light -- they darken, not brighten.
//    When scratchStr=0 this reduces to col exactly -- no conditional needed.
// ---------------------------------------------------------------------------

/**
 * @param {Node} colNode        -- vec3 colour before scratch
 * @param {Node} scratchTexNode -- vec3 scratch texture sample
 * @param {Node} scratchStrNode -- float uniform for scratch strength
 * @returns {Node} vec3 blended colour
 */
export function buildScratchNode(colNode, scratchTexNode, scratchStrNode) {
  const one = vec3(1.0);
  // Multiply blend: col * (1 - scratchTex * scratchStr)
  // Scratches attenuate the signal proportionally -- bright areas lose more absolute
  // light than dark areas, matching how surface defects scatter incident photons.
  return colNode.mul(one.sub(scratchTexNode.mul(scratchStrNode)));
}

// ---------------------------------------------------------------------------
// 7. P22 phosphor primary matrix -- pure TSL
//    Consumer CRT phosphors (P22 set, SMPTE C) had different chromaticity
//    primaries than modern sRGB displays. P22 red is slightly more orange,
//    P22 blue slightly more indigo. Applied pre-gamma in linear light.
//
//    3x3 sRGB->P22 matrix derived from representative P22 chromaticities
//    via sRGB->XYZ/D65->P22. str=0 = identity, str=1 = full P22 gamut shift.
// ---------------------------------------------------------------------------

/**
 * @param {Node} colNode     -- vec3 linear colour (pre-gamma)
 * @param {Node} p22StrNode  -- float blend factor (0 = sRGB, 1 = full P22)
 * @returns {Node} vec3 colour with P22 primary shift applied
 */
export function buildP22MatrixNode(colNode, p22StrNode) {
  // sRGB -> P22 chromaticity matrix, derived from CIE 1931 xy primaries:
  //   P22: R(0.626,0.344)  G(0.285,0.604)  B(0.151,0.067)  white D65
  //   sRGB: R(0.640,0.330) G(0.300,0.600)  B(0.150,0.060)  white D65
  //
  // Consumer CRT (Poynton 2012 "typical P22"): R(0.626,0.344) G(0.285,0.604) B(0.151,0.067)
  //   Suitable for: home CRTs, consumer TV sets (Trinitron consumer, Mitsubishi Diamondtron).
  //   Matrix below is derived from these primaries.
  //
  // Broadcast CRT (SMPTE 170M / SMPTE C): R(0.630,0.340) G(0.310,0.595) B(0.155,0.070)
  //   Suitable for: studio monitors (Sony BVM-series, Ikegami HL-series, JVC production).
  //   SMPTE C green (G_x=0.310) is significantly less cyan than Poynton (G_x=0.285).
  //   SMPTE C matrix (for reference, not implemented by default):
  //   Maps linear BT.709/sRGB input → linear SMPTE C output (same direction as P22 matrix).
  //     R' =  0.9406*R + 0.0581*G + 0.0013*B
  //     G' = -0.0172*R + 1.0346*G - 0.0174*B
  //     B' =  0.0020*R - 0.0078*G + 1.0058*B
  //   To use SMPTE C: replace the three matrix coefficient lines below.
  //
  // P22 chromaticity source: Poynton (2012), "Digital Video and HDTV: Algorithms and
  // Interfaces", 2nd ed., Chapter 8, Table 8-2 p.165 -- "Typical P22 phosphor chromaticities".
  // The "corrected" note refers to the 1st-edition (2003) typo: P22G y was listed as 0.610;
  // correct value is 0.604. These primaries represent a generic late-period consumer P22
  // (mid-1990s) -- individual manufacturers (Sony/Mitsubishi/NEC) varied by +/-0.015 CIE xy.
  // Computed via M_P22_from_XYZ * M_XYZ_from_sRGB (same D65 white point, no CAT needed).
  // All rows sum to 1.0 -- white is perfectly preserved.
  //   R' = +0.9318*R +0.0651*G +0.0031*B
  //   G' = -0.0280*R +1.0432*G -0.0151*B
  //   B' = +0.0028*R -0.0115*G +1.0087*B
  // Out-of-gamut negatives are naturally clamped by buildGammaNode's max(col,0).
  const dr = colNode.x.mul(0.9318).add(colNode.y.mul(0.0651)).add(colNode.z.mul(0.0031));
  const dg = colNode.x.mul(-0.0280).add(colNode.y.mul(1.0432)).add(colNode.z.mul(-0.0151));
  const db = colNode.x.mul(0.0028).add(colNode.y.mul(-0.0115)).add(colNode.z.mul(1.0087));
  const p22 = vec3(dr, dg, db);
  return mix(colNode, p22, p22StrNode);
}

// ---------------------------------------------------------------------------
// 8. Color temperature -- Bradford D65->9300K CAT -- pure TSL
//    Consumer CRTs (especially Japanese monitors) used a 9300K white point
//    instead of the D65 (6504K) standard used by modern sRGB displays.
//    9300K is substantially bluer: CIE xy (0.2816, 0.2984) vs D65 (0.3127, 0.3290).
//
//    Derived via Bradford chromatic adaptation transform:
//      M_RGB_CAT = M_XYZ_to_sRGB x M_CAT_XYZ x M_sRGB_to_XYZ
//    where M_CAT_XYZ = M_A_inv x diag(LMS_9300K / LMS_D65) x M_A
//    (M_A = published Bradford cone-response matrix)
//
//    Full transform (str=1): white (1,1,1) -> (0.821, 1.019, 1.337)
//      R' =  0.9335*R - 0.0964*G - 0.0163*B
//      G' =  0.0044*R + 1.0207*G - 0.0060*B
//      B' =  0.0076*R + 0.0272*G + 1.3021*B
//    Luminance of white is preserved (Y = 0.2126*R + 0.7152*G + 0.0722*B ~= 1.0).
//
//    P1-D: Applied post-gamma (display/gamma-encoded space) to reduce blue-channel
//    clipping artifacts. In linear light, B' = 1.3021*B exceeds 1.0 for B_linear > 0.748.
//    Post-gamma application shifts the clip threshold to B_gamma > 0.748 (B_linear > 0.484
//    at γ=2.5; DR-15 P1-D corrects prior comment that used γ=2.2 yielding 0.419),
//    which clips more mid-tone values in linear terms but produces perceptually less objectionable
//    results: compressed mid-tones retain visible colour, whereas linear-space clips yield flat
//    hard-white regions in near-white content. White clips in both paths.
//    Normalising the matrix to prevent all clipping would scale rows by 1/1.3369, reducing
//    white luminance by ~25% — an unacceptable brightness loss.
//    Matches the Guest Advanced CRT-NTSC approach; physical accuracy cost is applying the
//    CAT in gamma space (< 5% colour rotation, imperceptible in practice).
//    See specs/SPEC-color-temperature.md for full derivation.
// ---------------------------------------------------------------------------

/**
 * Bradford D65->9300K chromatic adaptation transform.
 * P1-D: Applied post-gamma (display space) to reduce blue-channel clipping for mid-tones
 * (white clips in both pre- and post-gamma paths; see section comment above for analysis).
 * @param {Node} colNode        -- vec3 gamma-encoded colour (post-gamma, display space)
 * @param {Node} colorTempNode  -- float blend factor (0 = D65, 1 = full 9300K)
 * @returns {Node} vec3 colour with 9300K white-point shift applied
 * @note The blend `mix(col, col_9300K, colorTempStr)` is linear in display-encoded space.
 * Because Bradford is applied post-gamma (P1-D), the blue channel boost is amplified by γ
 * in the first half of the slider range, giving a non-linear perceptual response. The
 * first ~50% of the range shifts dramatically toward blue; the second 50% is compressed.
 * This is an aesthetic property of the control — no code change is needed.
 */
export function buildColorTempNode(colNode, colorTempNode) {
  // Bradford D65->9300K chromatic adaptation matrix -- unnormalised.
  // Y of white is preserved (~1.000): 0.2126x0.8208 + 0.7152x1.0191 + 0.0722x1.3369 ~= 1.000.
  // A 9300K monitor is not dimmer than a D65 one; it has the same luminance with a blue-biased
  // chromaticity. Applied post-gamma (P1-D) -- see section comment above for clipping analysis.
  // Do NOT re-introduce the 0.7480 normalisation -- it reduces white luminance by ~25%.
  const dr = colNode.x.mul( 0.9335).add(colNode.y.mul(-0.0964)).add(colNode.z.mul(-0.0163));
  const dg = colNode.x.mul( 0.0044).add(colNode.y.mul( 1.0207)).add(colNode.z.mul(-0.0060));
  const db = colNode.x.mul( 0.0076).add(colNode.y.mul( 0.0272)).add(colNode.z.mul( 1.3021));
  return mix(colNode, vec3(dr, dg, db), colorTempNode);
}

// ---------------------------------------------------------------------------
// 9. Electronic snow -- wgslFn
//    Continuous per-channel noise matching real CRT static character.
//    Physically: tuner/IF stage thermal noise hits every pixel continuously;
//    each R/G/B phosphor subpixel receives independent noise -> coloured grain.
//    Returns vec3f additive offset in [-snowAmt*0.5, +snowAmt*0.5] per channel.
//    Time is quantised to fieldRate (50 Hz PAL / 60 Hz NTSC) -- matches real CRT
//    field update rate rather than arbitrary 12 fps.
// ---------------------------------------------------------------------------
export const snowFn = wgslFn(/* wgsl */`
fn snowFn(pixelCoord: vec2f, t: f32, snowAmt: f32, fieldRate: f32) -> vec3f {
  if (snowAmt < 0.0001) { return vec3f(0.0); }
  // Quantise time to field rate (50 Hz PAL / 60 Hz NTSC) -- noise pattern changes
  // at the same rate as CRT field updates, matching real RF-stage thermal noise.
  let tSlot = u32(floor(t * fieldRate));
  let ix = u32(pixelCoord.x);
  let iy = u32(pixelCoord.y);
  // Shared LCG base seed -- one multiply per coordinate instead of three, saving
  // 6 multiplications. Per-channel offsets use incommensurate u32 constants
  // (golden-ratio and a second incommensurate prime) to break correlation between
  // channels before the finalizer avalanches the bits.
  let base = ix * 1664525u + iy * 1013904223u + tSlot * 22695477u;
  var hr = base;
  var hg = base + 0x9e3779b9u;   // golden-ratio offset (2^32 / phi)
  var hb = base + 0x27d4eb2fu;   // incommensurate second offset
  // Full MurmurHash3 u32 finalizer -- avalanches all 32 bits (passes strict avalanche
  // criterion), eliminating the horizontal correlation banding present in the previous
  // 16-bit xorshift. Two extra ops per channel vs the prior finalizer.
  hr ^= hr >> 16u; hr *= 0x85ebca6bu; hr ^= hr >> 13u; hr *= 0xc2b2ae35u; hr ^= hr >> 16u;
  hg ^= hg >> 16u; hg *= 0x85ebca6bu; hg ^= hg >> 13u; hg *= 0xc2b2ae35u; hg ^= hg >> 16u;
  hb ^= hb >> 16u; hb *= 0x85ebca6bu; hb ^= hb >> 13u; hb *= 0xc2b2ae35u; hb ^= hb >> 16u;
  // DR-14 P2-C: partial horizontal correlation models RF bandwidth limiting.
  // One left-neighbor tap at weight 0.25 gives a 1-tap FIR: y[n] = 0.75x[n] + 0.25x[n-1].
  // Transfer function H(z) = 0.75 + 0.25z^-1.
  // |H(0)| = 1.0 (DC pass); |H(Nyquist)| = 0.5 (-6 dB at Nyquist).
  // -3 dB at w = arccos(-1/3) ~= 109.5 deg ~= 0.61 Nyquist.
  // This is nearly an all-pass with mild HF roll-off, not a low-pass; it adds
  // slight correlation between adjacent noise samples without heavy smoothing.
  // Real NTSC IF-stage noise bandwidth (~4.2 MHz / ~13.7 MHz source-px rate ~= 0.61 Nyquist)
  // happens to match the FIR -3 dB point; PAL (~5.5 MHz / ~13.8 MHz ~= 0.80 Nyquist) is
  // slightly less correlated than the FIR. Overall the FIR is a reasonable practical
  // approximation for a subtle aesthetic effect.
  let base_l = (ix - 1u) * 1664525u + iy * 1013904223u + tSlot * 22695477u;
  var hrl = base_l;
  var hgl = base_l + 0x9e3779b9u;
  var hbl = base_l + 0x27d4eb2fu;
  hrl ^= hrl >> 16u; hrl *= 0x85ebca6bu; hrl ^= hrl >> 13u; hrl *= 0xc2b2ae35u; hrl ^= hrl >> 16u;
  hgl ^= hgl >> 16u; hgl *= 0x85ebca6bu; hgl ^= hgl >> 13u; hgl *= 0xc2b2ae35u; hgl ^= hgl >> 16u;
  hbl ^= hbl >> 16u; hbl *= 0x85ebca6bu; hbl ^= hbl >> 13u; hbl *= 0xc2b2ae35u; hbl ^= hbl >> 16u;
  let sc = 1.0 / 4294967295.0;
  return vec3f(
    (f32(hr)  * sc - 0.5) * 0.75 + (f32(hrl) * sc - 0.5) * 0.25,
    (f32(hg)  * sc - 0.5) * 0.75 + (f32(hgl) * sc - 0.5) * 0.25,
    (f32(hb)  * sc - 0.5) * 0.75 + (f32(hbl) * sc - 0.5) * 0.25
  ) * snowAmt;
}
`);

// ---------------------------------------------------------------------------
// 10. Ghost / multipath echo -- wgslFn (P0-A)
//     Samples the source texture at a horizontal UV offset to simulate
//     CRT multipath: the TV antenna receives both the direct signal and a
//     reflection from a building/terrain/object, the delayed copy arriving
//     50-3000 ns later (~0.2-12 px at 4.2 MHz NTSC video bandwidth).
//     Ghost is sampled from the pre-kernel source so it has the same
//     scanline structure as the direct image (physically correct: both the
//     direct and reflected signals are processed by the same electron gun).
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const ghostFn = wgslFn(/* wgsl */`
fn ghostEntry(tex: texture_2d<f32>, uv: vec2f, xOffset: f32) -> vec3f {
  let ghostX = uv.x + xOffset;
  // DR-6 P3-B: out-of-bounds ghost returns black (horizontal blanking interval on a real CRT).
  // Real multipath ghost signal outside the visible raster is the blanking interval -- black.
  // Clamping to 1.0 previously smeared the rightmost column across all OOB ghost positions.
  if (ghostX < 0.0 || ghostX > 1.0) { return vec3f(0.0); }
  let texSize = vec2f(textureDimensions(tex, 0));
  // DR-15 P1-B: manual horizontal bilinear interpolation via two textureLoad calls.
  // The prior floor() + textureLoad snapped sub-pixel xOffset to an integer texel,
  // making offsets < 1/texW invisible. Real CRT multipath delay is fractional in pixels.
  // Vertical bilinear omitted: ghost offset is purely horizontal (multipath = H delay only).
  let gx  = ghostX * texSize.x - 0.5;
  let gy  = clamp(i32(floor(uv.y * texSize.y)), 0, i32(texSize.y) - 1);
  let ix0 = clamp(i32(floor(gx)),     0, i32(texSize.x) - 1);
  let ix1 = clamp(i32(floor(gx)) + 1, 0, i32(texSize.x) - 1);
  let fx  = fract(gx);
  let c0  = textureLoad(tex, vec2i(ix0, gy), 0).rgb;
  let c1  = textureLoad(tex, vec2i(ix1, gy), 0).rgb;
  return mix(c0, c1, fx);
}
`);

// ---------------------------------------------------------------------------
// 11. VBI bleed -- wgslFn (P2-C)
//     Simulates visible Vertical Blanking Interval data lines at the very
//     top of the frame. On consumer CRTs with vertical size slightly
//     oversized, VBI lines carrying closed captions / teletext are visible
//     as thin strips of coloured horizontal pixel patterns.
//     Returns vec3f(0) for all rows below vbiLines -- the TSL caller applies
//     a select() to composite this over the main signal.
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const vbiFn = wgslFn(/* wgsl */`
fn vbiEntry(uv: vec2f, res: vec2f, src_y: f32, frameCount: f32, vbiStr: f32, vbiLines: f32) -> vec3f {
  // Use source-pixel Y so VBI covers the same source lines regardless of output upscale.
  let effectiveSrcY = select(res.y, src_y, src_y > 0.5);
  let py = uv.y * effectiveSrcY;
  // Only active in top vbiLines source rows -- return black elsewhere.
  if (py >= vbiLines) { return vec3f(0.0); }
  // Hash: different pattern per 8-px column group, per VBI row, per field.
  // Uses same sin/fract approach as grainFn (large prime multipliers avoid periodicity).
  // field advances once per rendered frame (= once per field at 60 Hz, matching NTSC RS-170A).
  let colGroup = floor(uv.x * res.x / 8.0);
  let row      = floor(py);
  let field    = floor(frameCount);
  // DR-5 P3-D: wrap field before multiplying to stay within f32 exact-integer range.
  // At 60 fps, field reaches ~6M after 28 h; field*1.3 ~= 7.8e6 exceeds f32 precision
  // (max exact integer = 16,777,216), causing the % 9973 modulo to quantize and produce
  // a repeating low-period pattern. Pre-wrapping to [0, 9973) keeps sums well below 2^24.
  let fieldW   = fract(field / 9973.0) * 9973.0;
  // DR-15 P2-C: Murmur3 integer mixing step before the trig hash breaks the smooth
  // continuity of sin() for closely-spaced inputs (adjacent rows differ by ~7919 in n;
  // sin(7919 mod 2pi) is strongly correlated with sin(0), producing visible row banding).
  // Integer avalanche (Murmur3 first step) makes adjacent-row outputs statistically independent.
  // The 2pi reduction (DR-13 P2-A) is subsumed: u32 truncation handles large-n precision.
  let h1 = vbiHash(colGroup * 317.3 + row * 7919.0 + fieldW * 1.3);
  let h2 = vbiHash(colGroup * 521.7 + row * 3571.0 + fieldW * 2.7);
  let h3 = vbiHash(colGroup * 911.1 + row * 6131.0 + fieldW * 0.9);
  return vec3f(h1, h2, h3) * vbiStr;
}

fn vbiHash(n: f32) -> f32 {
  // Murmur3 first mixing step: integer avalanche before trig hash.
  // Eliminates adjacent-row correlation that plain sin(n) cannot break.
  // abs(n) guard: WGSL u32 cast of negative f32 is implementation-defined.
  // n is always non-negative in practice (colGroup >= 0, row >= 0, fieldW >= 0).
  let k = u32(abs(n)) * 2246822519u;
  let m = f32(k) * (1.0 / 4294967296.0);
  return fract(sin(m * 127.1) * 43758.5453);
}
`);

// ---------------------------------------------------------------------------
// 12. Dot crawl -- wgslFn (P2-A)
//     NTSC composite artifact: the color subcarrier (3.579545 MHz) aliases
//     into the decoded baseband at luma/chroma spatial transitions, producing
//     colored crawling dots at sharp vertical edges.
//     Uses left-neighbor luma gradient as edge detector; applies a subcarrier-
//     frequency sinusoidal chroma modulation, animated at the NTSC crawl rate
//     (0.5 source lines / frame = upward drift).
//     Left neighbor is fetched internally via textureLoad (integer coords, no bilinear smearing).
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const dotCrawlFn = wgslFn(/* wgsl */`
fn dotCrawlEntry(
  col:         vec3f,
  uv:          vec2f,
  res:         vec2f,
  src_x:       f32,      // effective source width; 0 falls back to res.x
  src_y:       f32,
  flickerRate: f32,
  t:           f32,
  amt:         f32,
  tex:         texture_2d<f32>
) -> vec3f {
  if (amt < 0.001) { return col; }
  // Sample the pixel one texel to the left using textureLoad (integer coords, no bilinear smearing).
  // uv * texSize gives source-texture coordinates; -1 in X is one source pixel left.
  // Correct in both single-pass (texSize = outputSize) and two-pass (texSize = kernelRT size).
  let texSize = vec2f(textureDimensions(tex, 0));
  let iCoord  = clamp(
    vec2i(floor(uv * texSize)) + vec2i(-1, 0),
    vec2i(0),
    vec2i(texSize) - vec2i(1)
  );
  let left = textureLoad(tex, iCoord, 0).rgb;
  // Detect horizontal luminance edge (gradient magnitude in luma/source-pixel units).
  // DR-7 P3-A: input is post-buildGammaNode (gamma-encoded), so these are Y' coefficients
  // operating on gamma-encoded R', G', B' -- correct for NTSC composite signal simulation.
  // Intentionally different from bloom threshold, which decodes to linear (photon domain).
  let Y  = dot(col,  vec3f(0.2126, 0.7152, 0.0722));
  let Yl = dot(left, vec3f(0.2126, 0.7152, 0.0722));

  // DR-7 P1-A: effective source dimensions. src_x=0 (single-pass) -> use res.x unchanged.
  let effectiveSrcX  = select(res.x, src_x, src_x > 0.5);
  let effectiveSrcY  = select(res.y, src_y, src_y > 0.5);

  // Gradient in source-pixel units: |deltaY_uv| x effectiveSrcX.
  // In two-pass mode res.x >> effectiveSrcX, so multiplying by res.x would fire on
  // sub-source-pixel gradients and make dot crawl bleed far beyond real edges.
  let grad = abs(Y - Yl) * effectiveSrcX;

  // Subcarrier phase:
  //   Horizontal: NTSC fsc = 3.579545 MHz over 52.7 µs active window = 188.6 active cycles;
  //     188.6 / 720 active samples = 0.262 cycles/active sample. (P2-C; was 0.3160 which used
  //     227.5 cycles/full line period, incorrectly dividing by 720 as if spanning the full H.)
  //     DR-7 P1-A: use effectiveSrcX so the spatial frequency is correct regardless of upscale.
  //   Vertical:   NTSC 180deg/line phase reversal -> 1 cycle per 2 source lines
  //     = effectiveSrcY/2 cycles per screen height. DR-7 P1-A fix: was 1 cycle/screen (180x off
  //     at 360-line source), producing colour stripes instead of the diagonal dot pattern.
  //   Temporal:   crawl upward at 0.5 source lines/frame.
  // Crawl rate derivation: 0.5 lines/frame x flickerRate frames/s = 0.5*flickerRate lines/s.
  // In UV units (0..1 = src_y lines): crawlRateUV = 0.5 * flickerRate / src_y cycles/s.
  let crawlRateUV    = 0.5 * flickerRate / max(effectiveSrcY, 1.0);
  let crawlPhase     = fract(t * crawlRateUV) * 6.28318;
  let subcarrierFreq = effectiveSrcX * 0.262;   // NTSC: fsc * t_active / n_active = 3.5795e6 * 52.7e-6 / 720 = 0.262 cycles/active sample
  let subPhase       = uv.x * subcarrierFreq * 6.28318
                     + uv.y * effectiveSrcY * 0.5 * 6.28318
                     - crawlPhase;

  // NTSC YIQ chroma modulation: I (orange-cyan) and Q (green-magenta).
  // DR-9 P3-A: Q was -cos(subPhase) -- 90deg offset from standard NTSC demodulation convention
  // (I = A*cos(phi), Q = A*sin(phi)). The minus sign shifted dominant crawl colour from orange-cyan
  // (I-axis, correct for sharp vertical edges) to green-magenta (Q-axis). Fixed: Q = +cos(subPhase).
  // NTSC bandwidth: I-axis 1.3 MHz (orange/cyan), Q-axis 0.5 MHz (green/magenta).
  // Ratio I/Q = 2.6. Normalised so sqrt(I^2+Q^2) peak ~= 0.25: k_I ~= 0.228, k_Q ~= 0.088.
  let Ic =  sin(subPhase) * 0.228;   // I-axis: orange/cyan dominant
  let Qc =  cos(subPhase) * 0.088;   // Q-axis: green/magenta subdominant

  // YIQ -> RGB (approximate; only chroma at edges).
  let cr =  Ic * 0.956 + Qc * 0.621;
  let cg = -Ic * 0.272 - Qc * 0.647;
  let cb = -Ic * 1.106 + Qc * 1.703;

  // Edge mask: apply crawl only where luma gradient is significant.
  let edgeMask = smoothstep(0.05, 0.30, grad);
  return clamp(col + vec3f(cr, cg, cb) * edgeMask * amt, vec3f(0.0), vec3f(1.0));
}
`);
