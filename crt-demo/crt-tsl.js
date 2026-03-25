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
 *   signalProcessFn                               -- combined pre-kernel signal chain: ringing, chroma blur, cross-color, dropout (wgslFn, SPEC-analog-artifacts)
 *   tapeFlutterFn                                 -- post-gamma tape flutter brightness oscillation (wgslFn, SPEC-analog-artifacts D-1)
 *   tapeChromaFn                                  -- post-gamma coarse per-field chroma noise (wgslFn, SPEC-analog-artifacts D-2)
 *   buildTensionWireNode(posNode, sizeNode, u)     -- aperture-grille tension wire attenuation (pure TSL, SPEC-analog-artifacts E)
 *   afterglowAccumFn                              -- differential phosphor afterglow accumulation (wgslFn, SPEC-novel-crt-physics Effect 7)
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
fn grainFn(pixelCoord: vec2f, t: f32, grainAmt: f32, col: vec3f) -> vec3f {
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
  // Signal-dependent grain amplitude: Poisson shot noise gives sigma_display proportional
  // to luma^(-(gamma-1)/2) = luma^(-0.75) at gamma=2.5 (grainFn is called post-gamma).
  // Normalised by MIDGRAY_NORM = 0.5^(-0.75) so grainAmt retains its midgray meaning.
  // Shadows get ~2x more grain; highlights slightly less (physically correct).
  let luma      = dot(col, vec3f(0.2126, 0.7152, 0.0722));
  let shotScale = clamp(pow(max(luma, 0.01), -0.75) / 1.6818, 0.6, 6.0);
  return n * grainAmt * shotScale;
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
//    PC-M5 (SPEC-deep-review-22): Now applied pre-gamma (linear-light cone space) between
//    the P22 matrix and CRT gamma encode — the physically correct domain for chromatic
//    adaptation. In linear light, B' = 1.3021*B clips for B_linear > 0.748 (near-white).
//    The prior post-gamma path (P1-D) applied the matrix in gamma-encoded space, giving an
//    effective linear-light blue boost of M[B]^γ at mid-tones instead of the matrix-specified
//    M[B]=1.3021. Blue clips in both paths at near-white; pre-gamma is physically accurate.
//    Normalising the matrix to prevent all clipping would scale rows by 1/1.3369, reducing
//    white luminance by ~25% — an unacceptable brightness loss.
//    See specs/SPEC-color-temperature.md for full derivation.
// ---------------------------------------------------------------------------

/**
 * Bradford D65->9300K chromatic adaptation transform.
 * PC-M5 (SPEC-deep-review-22): Applied pre-gamma (linear-light cone space), between the P22
 * matrix and CRT gamma encode — the physically correct domain for chromatic adaptation
 * (Bradford 1985, Lam 1985). Effective linear-light boost equals the matrix element at any
 * signal level. The former post-gamma path (P1-D) yielded M[B]^γ at mid-tones, deviating
 * from the Bradford matrix value. Blue clips at B_lin > 0.748 in both paths.
 * @param {Node} colNode        -- vec3 linear-light colour (pre-gamma)
 * @param {Node} colorTempNode  -- float blend factor (0 = D65, 1 = full 9300K)
 * @returns {Node} vec3 linear-light colour with 9300K white-point shift applied
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
  // Pre-kernel position: col is linear RGB. BT.709 linear-light luma coefficients.
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

  // Edge mask: apply crawl only where luma gradient is significant.
  let edgeMask = smoothstep(0.05, 0.30, grad);
  // Luma-domain leakage: Y_leaked = Cb·cos(subPhase) + Cr·sin(subPhase).
  // Cb = B - Y (blue component offset from luma).
  // Cr = R - Y (red component offset from luma).
  // leakY is added equally to all channels → pure luminance modulation (achromatic dots).
  // Amplitude scales with local chroma sqrt(Cb²+Cr²): zero on desaturated content.
  let Cb    = col.b - Y;
  let Cr    = col.r - Y;
  let leakY = (Cb * cos(subPhase) + Cr * sin(subPhase)) * edgeMask * amt;
  return clamp(col + vec3f(leakY), vec3f(0.0), vec3f(1.0));
}
`);

// ---------------------------------------------------------------------------
// 13. Combined pre-kernel signal processing -- wgslFn (SPEC-analog-artifacts)
//     One single-pass RTT that applies up to four signal-chain impairments:
//       A. Horizontal ringing   -- two-scale Laplacian (IF filter overshoot)
//       B. Chroma blur + Y/C delay -- NTSC composite bandwidth limiting
//       G. Cross-color          -- false chroma on high-frequency luma edges
//       D-3. Tape dropout       -- line-segment replacement from previous line
//     All stages read from the same source texture (parallel model); chroma
//     blur uses luma from the ringed result for a physically reasonable cascade.
//     Early-exit when all amounts are at their zero threshold (no-op path).
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const signalProcessFn = wgslFn(/* wgsl */`
fn signalProcessFn(
  tex: texture_2d<f32>, uv: vec2f,
  svmAmt: f32,
  ringAmt: f32,
  ringDecay: f32,
  ringFreq: f32,
  chromaBlur: f32, ycDelay: f32,
  chromaAMNoise: f32, chromaPMNoise: f32,
  crossColorAmt: f32, crossColorFreq: f32,
  ntscCompositeMode: f32, ycSeparatorQ: f32,
  tapeDropoutRate: f32, fieldCount: f32,
  srcW: f32, srcH: f32,
  t: f32, flickerRate: f32,
  vchromaHetAmt: f32, vchromaFreq: f32, vchromaDrift: f32,
  vhsLumaBlur: f32,
  vhsChromaVBlend: f32,
  vhsSwitchStr: f32,
  vhsSwitchLines: f32,
  vhsSwitchOffset: f32
) -> vec3f {
  let texSize = vec2f(textureDimensions(tex, 0));
  let iy_base = clamp(i32(floor(uv.y * texSize.y)), 0, i32(texSize.y) - 1);
  var iy      = iy_base;
  let tapUV   = 1.0 / max(srcW, 1.0);

  // D-3. Tape dropout: replace scan line segment with the line above.
  // One dropout decision per 8-source-pixel segment per field.
  if (tapeDropoutRate > 0.0001) {
    let srcY   = floor(uv.y * max(srcH, 1.0));
    let srcSeg = floor(uv.x * max(srcW, 1.0) / 8.0);
    let fw     = fract(fieldCount / 9973.0) * 9973.0;
    let h      = fract(sin(srcY * 7919.0 + srcSeg * 317.3 + fw * 1.3) * 43758.5453);
    if (h < tapeDropoutRate) { iy = max(iy - 1, 0); }
  }

  // SVM: horizontal scan velocity modulation -- warp u by local luma gradient.
  var sampleU = uv.x;
  if (svmAmt > 0.0001) {
    let svmL = sigFetch(tex, texSize, iy, uv.x - tapUV);
    let svmR = sigFetch(tex, texSize, iy, uv.x + tapUV);
    let yL   = dot(svmL, vec3f(0.2126, 0.7152, 0.0722));
    let yR   = dot(svmR, vec3f(0.2126, 0.7152, 0.0722));
    sampleU  = uv.x + svmAmt * (yR - yL);
  }
  var result = sigFetch(tex, texSize, iy, sampleU);

  // D-4: VHS head switching noise.
  // Horizontal displacement of lines at bottom of frame during head changeover.
  // Power-law settling profile; strongest at switch line, zero at vhsSwitchLines below.
  // Source: ntsc-rs HeadSwitchingSettings; BAVC AV Artifact Atlas.
  // Guard srcH > 0.5: single-pass mode sets srcH = 0; skip effect.
  // Skip when ntscCompositeMode active: NTSC chain replaces the source fetch.
  if (vhsSwitchStr > 0.001 && srcH > 0.5 && ntscCompositeMode < 0.5) {
    let switchStart = 1.0 - vhsSwitchLines / srcH - vhsSwitchOffset;
    let lineZ = (uv.y - switchStart) * srcH;
    if (lineZ >= 0.0 && lineZ < vhsSwitchLines) {
      let t_sw = lineZ / vhsSwitchLines;
      let shift = vhsSwitchStr * (72.0 / 720.0) * pow(max(0.0, 1.0 - t_sw), 1.5);
      let lineNoise = fract(sin(lineZ * 127.1 + fieldCount * 73.0)
                            * 43758.5453) * 0.006 - 0.003;
      let shiftedX = uv.x - shift - lineNoise;
      result = sigFetch(tex, texSize, iy, clamp(shiftedX, 0.0, 1.0));
      if (lineZ < 1.0) {
        let spike = vhsSwitchStr * 0.15 * (1.0 - lineZ) * step(0.90, uv.x);
        result = clamp(result + vec3f(spike), vec3f(0.0), vec3f(1.0));
      }
    }
  }

  // H. NTSC composite encode/Y-C-separate/demodulate chain.
  // Replaces blocks A (ringing on RGB) and G (cross-color) with emergent physics.
  // ringAmt/ringDecay/ringFreq: IF filter. ycSeparatorQ: Y/C separator quality.
  if (ntscCompositeMode > 0.5) {
    // H-1. Fetch 8 additional taps (center already in 'result' as c0).
    let cm4 = sigFetch(tex, texSize, iy, sampleU - 4.0*tapUV);
    let cm3 = sigFetch(tex, texSize, iy, sampleU - 3.0*tapUV);
    let cm2 = sigFetch(tex, texSize, iy, sampleU - 2.0*tapUV);
    let cm1 = sigFetch(tex, texSize, iy, sampleU - 1.0*tapUV);
    let cp1 = sigFetch(tex, texSize, iy, sampleU + 1.0*tapUV);
    let cp2 = sigFetch(tex, texSize, iy, sampleU + 2.0*tapUV);
    let cp3 = sigFetch(tex, texSize, iy, sampleU + 3.0*tapUV);
    let cp4 = sigFetch(tex, texSize, iy, sampleU + 4.0*tapUV);

    // H-2. Subcarrier phase at center and offsets.
    let SC       = 6.28318 * 0.2625;
    let crawlPhi = fract(t * 0.5 * flickerRate / max(srcH, 1.0)) * 6.28318;
    let phi0     = SC * (sampleU * srcW) + crawlPhi;
    let cSC  = cos(SC);
    let sSC  = sin(SC);
    let cSC2 = cos(2.0*SC);
    let sSC2 = sin(2.0*SC);
    let cSC3 = cos(3.0*SC);
    let sSC3 = sin(3.0*SC);
    let cSC4 = cos(4.0*SC);
    let sSC4 = sin(4.0*SC);
    let c0phi = cos(phi0);
    let s0phi = sin(phi0);
    let cosM4 = c0phi*cSC4 + s0phi*sSC4;
    let sinM4 = s0phi*cSC4 - c0phi*sSC4;
    let cosM3 = c0phi*cSC3 + s0phi*sSC3;
    let sinM3 = s0phi*cSC3 - c0phi*sSC3;
    let cosM2 = c0phi*cSC2 + s0phi*sSC2;
    let sinM2 = s0phi*cSC2 - c0phi*sSC2;
    let cosM1 = c0phi*cSC  + s0phi*sSC;
    let sinM1 = s0phi*cSC  - c0phi*sSC;
    let cosP1 = c0phi*cSC  - s0phi*sSC;
    let sinP1 = s0phi*cSC  + c0phi*sSC;
    let cosP2 = c0phi*cSC2 - s0phi*sSC2;
    let sinP2 = s0phi*cSC2 + c0phi*sSC2;
    let cosP3 = c0phi*cSC3 - s0phi*sSC3;
    let sinP3 = s0phi*cSC3 + c0phi*sSC3;
    let cosP4 = c0phi*cSC4 - s0phi*sSC4;
    let sinP4 = s0phi*cSC4 + c0phi*sSC4;

    // H-3. YIQ coefficients (NTSC I/Q axes; BT.709 luma for Y consistency).
    let Icoef = vec3f( 0.5959, -0.2746, -0.3213);
    let Qcoef = vec3f( 0.2115, -0.5227,  0.3112);
    let Ycoef = vec3f(0.2126,  0.7152,  0.0722);

    // H-4. Encode 9 taps to composite scalar.
    let Sm4 = dot(cm4,Ycoef) + dot(cm4,Icoef)*cosM4 + dot(cm4,Qcoef)*sinM4;
    let Sm3 = dot(cm3,Ycoef) + dot(cm3,Icoef)*cosM3 + dot(cm3,Qcoef)*sinM3;
    let Sm2 = dot(cm2,Ycoef) + dot(cm2,Icoef)*cosM2 + dot(cm2,Qcoef)*sinM2;
    let Sm1 = dot(cm1,Ycoef) + dot(cm1,Icoef)*cosM1 + dot(cm1,Qcoef)*sinM1;
    let S0  = dot(result,Ycoef) + dot(result,Icoef)*c0phi + dot(result,Qcoef)*s0phi;
    let Sp1 = dot(cp1,Ycoef) + dot(cp1,Icoef)*cosP1 + dot(cp1,Qcoef)*sinP1;
    let Sp2 = dot(cp2,Ycoef) + dot(cp2,Icoef)*cosP2 + dot(cp2,Qcoef)*sinP2;
    let Sp3 = dot(cp3,Ycoef) + dot(cp3,Icoef)*cosP3 + dot(cp3,Qcoef)*sinP3;
    let Sp4 = dot(cp4,Ycoef) + dot(cp4,Icoef)*cosP4 + dot(cp4,Qcoef)*sinP4;

    // H-5. IF bandlimit: causal FIR on composite S (same h[n] as block A, composite domain).
    var Sf0 = S0;
    if (ringAmt > 0.001) {
      let rd = max(ringDecay, 0.05);
      let rf = ringFreq * 3.14159265;
      let w1 = exp(-1.0*rd)*sin(1.0*rf);
      let w2 = exp(-2.0*rd)*sin(2.0*rf);
      let w3 = exp(-3.0*rd)*sin(3.0*rf);
      let w4 = exp(-4.0*rd)*sin(4.0*rf);
      Sf0 += ((S0-Sm1)*w1 + (S0-Sm2)*w2 + (S0-Sm3)*w3 + (S0-Sm4)*w4) * ringAmt;
    }
    let Sf1  = Sp1;
    let Sfm1 = Sm1;
    let Sf2  = Sp2;
    let Sfm2 = Sm2;

    // H-6. Y/C separator: Gaussian lowpass on filtered composite.
    let sepSig  = max(2.5 - 1.7*ycSeparatorQ, 0.5);
    let sw1     = exp(-1.0 / (2.0*sepSig*sepSig));
    let sw2     = exp(-4.0 / (2.0*sepSig*sepSig));
    let swSum   = 1.0 + 2.0*sw1 + 2.0*sw2;
    let Ysep0   = (Sf0 + (Sfm1+Sf1)*sw1 + (Sfm2+Sf2)*sw2) / swSum;
    let Sfm2sep = (Sfm2 + (Sm3+Sm1)*sw1 + (Sm4+S0)*sw2) / swSum;
    let Sfm1sep = (Sfm1 + (Sm2+S0)*sw1  + (Sm3+Sp1)*sw2) / swSum;
    let Sf1sep  = (Sf1  + (S0+Sp2)*sw1  + (Sm1+Sp3)*sw2) / swSum;
    let Sf2sep  = (Sf2  + (Sp1+Sp3)*sw1 + (S0+Sp4)*sw2)  / swSum;
    let Cm2 = Sfm2 - Sfm2sep;
    let Cm1 = Sfm1 - Sfm1sep;
    let C0  = Sf0  - Ysep0;
    let C1  = Sf1  - Sf1sep;
    let C2  = Sf2  - Sf2sep;

    // H-7. Chroma demodulate: 5-tap Gaussian lowpass on C*cos and C*sin.
    let csig  = max(chromaBlur, 0.8);
    let cw1   = exp(-1.0 / (2.0*csig*csig));
    let cw2   = exp(-4.0 / (2.0*csig*csig));
    let cwSum = 1.0 + 2.0*cw1 + 2.0*cw2;
    let Iprime = 2.0*(C0*c0phi  + (Cm1*cosM1+C1*cosP1)*cw1 + (Cm2*cosM2+C2*cosP2)*cw2) / cwSum;
    let Qprime = 2.0*(C0*s0phi  + (Cm1*sinM1+C1*sinP1)*cw1 + (Cm2*sinM2+C2*sinP2)*cw2) / cwSum;

    // H-8. Reconstruct RGB from Y_sep, I', Q'.
    let R_out = Ysep0 + 0.9563*Iprime + 0.6210*Qprime;
    let G_out = Ysep0 - 0.2721*Iprime - 0.6474*Qprime;
    let B_out = Ysep0 - 1.1070*Iprime + 1.7046*Qprime;
    result = clamp(vec3f(R_out, G_out, B_out), vec3f(0.0), vec3f(1.0));
  }

  // A. Ringing -- causal 4-tap FIR: h[n] = exp(-n*ringDecay) * sin(n*ringFreq*PI), n=1..4.
  // Taps at left-of-centre (past samples in scan order): uv.x - n*tapUV.
  // Physically: causal impulse response of a 2nd-order IF bandpass filter.
  // ringDecay = alpha: Q-factor via alpha = PI*omega0/Q. Higher Q = smaller alpha = more rings.
  // ringFreq = omega (cycles/sample): NTSC IF ~4.2 MHz / 13.5 MHz ADC = 0.31 cycles/sample.
  if (ringAmt > 0.001 && ntscCompositeMode < 0.5) {
    let rd = max(ringDecay, 0.05);
    let rf = ringFreq * 3.14159265;
    let w1 = exp(-1.0 * rd) * sin(1.0 * rf);
    let w2 = exp(-2.0 * rd) * sin(2.0 * rf);
    let w3 = exp(-3.0 * rd) * sin(3.0 * rf);
    let w4 = exp(-4.0 * rd) * sin(4.0 * rf);
    let p1 = sigFetch(tex, texSize, iy, uv.x - 1.0 * tapUV);
    let p2 = sigFetch(tex, texSize, iy, uv.x - 2.0 * tapUV);
    let p3 = sigFetch(tex, texSize, iy, uv.x - 3.0 * tapUV);
    let p4 = sigFetch(tex, texSize, iy, uv.x - 4.0 * tapUV);
    let causalRing = (result - p1) * w1 + (result - p2) * w2
                   + (result - p3) * w3 + (result - p4) * w4;
    result = max(result + causalRing * ringAmt, vec3f(0.0));
  }

  // B. Chroma blur + Y/C delay.
  // Luma (Y) from ringed result; chroma from 5-tap Gaussian on source at delayed position.
  // Y is preserved sharp; only Cb/Cr are bandwidth-limited, matching composite demodulation.
  if (chromaBlur > 0.001 || abs(ycDelay) > 0.001) {
    let Y    = dot(result, vec3f(0.2126, 0.7152, 0.0722));
    let sig2 = max(chromaBlur, 0.1);
    let w0   = 1.0;
    let w1   = exp(-1.0 / (2.0 * sig2 * sig2));
    let w2   = exp(-4.0 / (2.0 * sig2 * sig2));
    let wSum = w0 + 2.0 * w1 + 2.0 * w2;
    let du   = uv.x + ycDelay * tapUV;
    let c0   = sigFetch(tex, texSize, iy, du);
    let cm1  = sigFetch(tex, texSize, iy, du - tapUV);
    let cm2  = sigFetch(tex, texSize, iy, du - 2.0 * tapUV);
    let cp1  = sigFetch(tex, texSize, iy, du + tapUV);
    let cp2  = sigFetch(tex, texSize, iy, du + 2.0 * tapUV);
    let Cb   = (sigCb(c0)*w0 + (sigCb(cm1)+sigCb(cp1))*w1 + (sigCb(cm2)+sigCb(cp2))*w2) / wSum;
    let Cr   = (sigCr(c0)*w0 + (sigCr(cm1)+sigCr(cp1))*w1 + (sigCr(cm2)+sigCr(cp2))*w2) / wSum;
    result   = max(vec3f(Y + Cr, Y - 0.2973*Cr - 0.1009*Cb, Y + Cb), vec3f(0.0));
  }

  // F. Chroma AM + PM noise.
  if (chromaAMNoise > 0.001 || chromaPMNoise > 0.001) {
    let Y  = dot(result, vec3f(0.2126, 0.7152, 0.0722));
    let Cb = result.b - Y;
    let Cr = result.r - Y;
    let gx = floor(uv.x * srcW * 0.5);
    let gy = floor(uv.y * srcH);
    let ft = floor(t * flickerRate);
    let n1 = fract(sin(gx * 127.1 + gy * 311.7 + ft *  74.3) * 43758.5453) * 2.0 - 1.0;
    let n2 = fract(sin(gx * 271.9 + gy * 461.3 + ft *  53.1 + 1.73) * 43758.5453) * 2.0 - 1.0;
    let amp   = 1.0 + chromaAMNoise * n1;
    let phase = chromaPMNoise * n2;
    let cosP  = cos(phase);
    let sinP  = sin(phase);
    let Cb_n  = Cb * amp * cosP - Cr * amp * sinP;
    let Cr_n  = Cb * amp * sinP + Cr * amp * cosP;
    result = max(vec3f(Y + Cr_n, Y - 0.2973*Cr_n - 0.1009*Cb_n, Y + Cb_n), vec3f(0.0));
  }

  // A-ext: VHS luma bandwidth limiting.
  // SP: ~2.4 MHz = sigma ~1.0 src-px. Blurs Y only; chroma separately limited by chromaBlur.
  // Source: ntsc-rs VHSTapeParams luma_cut: 2,400,000 Hz.
  // BT.601 luma weights (VHS standard). Normalized chroma: Cr_n=(R-Y)/1.402, Cb_n=(B-Y)/1.772.
  // Guard srcW > 0.5: single-pass mode sets srcW = 0; skip effect.
  // Skip when ntscCompositeMode active: NTSC chain replaces VHS luma processing.
  if (vhsLumaBlur > 0.001 && srcW > 0.5 && ntscCompositeMode < 0.5) {
    let dx_lb = 1.0 / srcW;
    let s2_lb = vhsLumaBlur * vhsLumaBlur;
    let w1_lb = exp(-0.5 / s2_lb);
    let w2_lb = exp(-2.0 / s2_lb);
    let wsum_lb = 1.0 + 2.0 * (w1_lb + w2_lb);
    let bt601 = vec3f(0.299, 0.587, 0.114);
    let Yl2 = dot(sigFetch(tex, texSize, iy, clamp(uv.x - 2.0*dx_lb, 0.0, 1.0)), bt601);
    let Yl1 = dot(sigFetch(tex, texSize, iy, clamp(uv.x -     dx_lb, 0.0, 1.0)), bt601);
    let Yr1 = dot(sigFetch(tex, texSize, iy, clamp(uv.x +     dx_lb, 0.0, 1.0)), bt601);
    let Yr2 = dot(sigFetch(tex, texSize, iy, clamp(uv.x + 2.0*dx_lb, 0.0, 1.0)), bt601);
    let Y_orig_lb = dot(result, bt601);
    let Y_blur = (w2_lb*Yl2 + w1_lb*Yl1 + Y_orig_lb + w1_lb*Yr1 + w2_lb*Yr2) / wsum_lb;
    let Cr_n_lb = (result.r - Y_orig_lb) / 1.402;
    let Cb_n_lb = (result.b - Y_orig_lb) / 1.772;
    result = clamp(vec3f(Y_blur + 1.402*Cr_n_lb,
                         Y_blur - 0.714136*Cr_n_lb - 0.344136*Cb_n_lb,
                         Y_blur + 1.772*Cb_n_lb), vec3f(0.0), vec3f(1.0));
  }

  // B-ext: VHS chroma 1H delay-line averaging.
  // Hardware: colour-under recovery averages chroma[y] with chroma[y-1] to suppress
  // inter-track phase error. Halves vertical chroma resolution.
  // Source: ntsc-rs chroma_vert_blend.
  // BT.601 luma weights; normalized chroma convention matches tapeChromaFn.
  // Guard srcH > 0.5: single-pass mode sets srcH = 0 (no source RT); skip effect.
  // Skip when ntscCompositeMode active: VHS-specific hardware artifact, not present in NTSC chain.
  if (vhsChromaVBlend > 0.001 && srcH > 0.5 && ntscCompositeMode < 0.5) {
    let bt601_vb = vec3f(0.299, 0.587, 0.114);
    let iy_prev = max(iy - 1, 0);
    let prevLine = sigFetch(tex, texSize, iy_prev, uv.x);
    let Y_vb      = dot(result,   bt601_vb);
    let Y_prev_vb = dot(prevLine, bt601_vb);
    let Cr_n_vb      = (result.r   - Y_vb)      / 1.402;
    let Cb_n_vb      = (result.b   - Y_vb)      / 1.772;
    let Cr_n_prev_vb = (prevLine.r - Y_prev_vb) / 1.402;
    let Cb_n_prev_vb = (prevLine.b - Y_prev_vb) / 1.772;
    let Cr_b = mix(Cr_n_vb, (Cr_n_vb + Cr_n_prev_vb) * 0.5, vhsChromaVBlend);
    let Cb_b = mix(Cb_n_vb, (Cb_n_vb + Cb_n_prev_vb) * 0.5, vhsChromaVBlend);
    result = clamp(vec3f(Y_vb + 1.402*Cr_b,
                         Y_vb - 0.714136*Cr_b - 0.344136*Cb_b,
                         Y_vb + 1.772*Cb_b), vec3f(0.0), vec3f(1.0));
  }

  // G. Cross-color -- false chroma on high-frequency luma.
  // NTSC subcarrier misread as chroma on fine horizontal patterns (stripes, checks).
  // Magnitude gated by Laplacian so only high-frequency content shows colour.
  // Phase matches dotCrawlFn convention: fsc/fs = 0.262 cycles/active-sample for NTSC
  // (3.579545 MHz / 13.5 MHz sampling rate). crossColorFreq scales as MHz: 0.0733 = 0.262/3.58.
  // Vertical phase reversal (+0.5 cycle per source line) reproduces the diagonal fringe pattern.
  if (crossColorAmt > 0.001 && ntscCompositeMode < 0.5) {
    let cm1x  = sigFetch(tex, texSize, iy, uv.x - tapUV);
    let cp1x  = sigFetch(tex, texSize, iy, uv.x + tapUV);
    let Yc    = dot(result, vec3f(0.2126, 0.7152, 0.0722));
    let Ym1   = dot(cm1x,   vec3f(0.2126, 0.7152, 0.0722));
    let Yp1   = dot(cp1x,   vec3f(0.2126, 0.7152, 0.0722));
    let hfMag = abs(2.0 * Yc - Ym1 - Yp1);
    let srcX  = uv.x * max(srcW, 1.0);
    let srcY  = uv.y * max(srcH, 1.0);
    // Spatial phase: fsc/fs = crossColorFreq * 0.0733 cycles/pixel (NTSC: 3.58*0.0733=0.262).
    // Vertical: 180 deg/line phase reversal (subcarrier alternates each source line).
    // Temporal: same 0.5-line/frame crawl as dotCrawlFn — cross-color and dot crawl are
    // the same NTSC subcarrier aliasing and must animate at the same rate.
    let crawlPhase = fract(t * 0.5 * flickerRate / max(srcH, 1.0)) * 6.28318;
    let phase = (srcX * crossColorFreq * 0.0733 + srcY * 0.5) * 6.28318 - crawlPhase;
    let PI23  = 2.094395;
    let chroma = vec3f(cos(phase), cos(phase + PI23), cos(phase - PI23));
    result    = result + chroma * hfMag * crossColorAmt;
  }

  // I. VHS chroma heterodyne noise: random saturation jitter from VHS chroma FM heterodyne.
  // Physical: VHS records chroma at a downconverted carrier (~629 kHz for VHS SP);
  // playback heterodyne mixes residual carrier noise onto chroma, causing per-line
  // random saturation and hue variation. Here modelled as a low-spatial-frequency
  // random modulation on Cb/Cr, correlated within a line and varying between lines.
  if (vchromaHetAmt > 0.001) {
    let srcY  = floor(uv.y * max(srcH, 1.0));
    let phase = fract(t * vchromaDrift + srcY * vchromaFreq * 0.0137) * 6.28318;
    let h1    = fract(sin(srcY * 3137.0 + t * 17.3) * 43758.5453);
    let h2    = fract(sin(srcY * 7919.0 + t *  8.7) * 43758.5453);
    let satMod  = 1.0 + vchromaHetAmt * (cos(phase) * 0.5 + (h1 - 0.5) * 0.5);
    let hueMod  = vchromaHetAmt * (h2 - 0.5) * 0.3;
    let luma    = dot(result, vec3f(0.2126, 0.7152, 0.0722));
    var chroma2 = result - vec3f(luma);
    let cb2     = chroma2.b - chroma2.r * 0.5 - chroma2.g * 0.5;
    let cr2     = chroma2.r - chroma2.b * 0.5 - chroma2.g * 0.5;
    let cosH    = cos(hueMod);
    let sinH    = sin(hueMod);
    let cb2r    = cb2 * cosH - cr2 * sinH;
    let cr2r    = cb2 * sinH + cr2 * cosH;
    chroma2     = vec3f(cr2r * 0.667, -(cb2r + cr2r) * 0.333, cb2r * 0.667);
    result = vec3f(luma) + chroma2 * satMod;
  }

  return result;
}

fn sigFetch(tex: texture_2d<f32>, texSize: vec2f, iy: i32, u: f32) -> vec3f {
  // Horizontal bilinear interpolation at row iy. Clamped at texture edges.
  let gx  = u * texSize.x - 0.5;
  let ix0 = clamp(i32(floor(gx)),     0, i32(texSize.x) - 1);
  let ix1 = clamp(i32(floor(gx)) + 1, 0, i32(texSize.x) - 1);
  let c0  = textureLoad(tex, vec2i(ix0, iy), 0).rgb;
  let c1  = textureLoad(tex, vec2i(ix1, iy), 0).rgb;
  return mix(c0, c1, fract(gx));
}

fn sigCb(c: vec3f) -> f32 {
  return c.b - dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

fn sigCr(c: vec3f) -> f32 {
  return c.r - dot(c, vec3f(0.2126, 0.7152, 0.0722));
}
`);

// ---------------------------------------------------------------------------
// 14. Tape flutter -- wgslFn (SPEC-analog-artifacts D-1)
//     Post-gamma gain oscillation modelling tape-transport speed variation.
//     Two incommensurate flutter rates beat to produce non-periodic variation.
//     Applied post-gamma in buildPostProcessing (like grain -- signal-domain).
// ---------------------------------------------------------------------------
export const tapeFlutterFn = wgslFn(/* wgsl */`
fn tapeFlutterFn(col: vec3f, uv: vec2f, flutterNoise: f32,
                 tapeFlutterAmt: f32, tapeFlutterRate: f32) -> vec3f {
  if (tapeFlutterAmt < 0.0001) { return col; }
  // Spatial envelope: two incommensurate Y-frequency bands give per-scanline banding.
  // Temporal variation driven by CPU-side OU process (flutterNoise in [-1, 1]),
  // producing 1/f^2 spectrum above the OU bandwidth (physically: capstan servo).
  let f1   = sin(uv.y * 1.73) * 0.6;
  let f2   = sin(uv.y * 2.91) * 0.4;
  let gain = 1.0 + (f1 + f2) * flutterNoise * tapeFlutterAmt;
  return col * max(gain, 0.0);
}
`);

// ---------------------------------------------------------------------------
// 15. Tape chroma noise -- wgslFn (SPEC-analog-artifacts D-2)
//     Coarse per-field colour noise modelling VHS chroma FM carrier instability.
//     Operates in YCbCr: adds noise only to Cb/Cr, leaving Y (luma) unchanged.
//     Spatially coarse (40x30 grid) and changes each field -- distinct from
//     electronic snow (fine, per-pixel luma) and grain (display-layer texture).
//     Applied post-gamma in buildPostProcessing alongside flutter.
// ---------------------------------------------------------------------------
export const tapeChromaFn = wgslFn(/* wgsl */`
fn tapeChromaFn(col: vec3f, uv: vec2f, fieldCount: f32, tapeChromaAmt: f32) -> vec3f {
  if (tapeChromaAmt < 0.001) { return col; }
  let gx  = floor(uv.x * 40.0);
  let gy  = floor(uv.y * 240.0); // VHS chroma varies per helical scan track (~240 lines/field)
  // Pre-wrap fieldCount to keep f32 multiplications within exact-integer range.
  let fw  = fract(fieldCount / 7919.0) * 7919.0;
  let h1  = fract(sin(gx * 317.3 + gy * 1277.7 + fw * 1.3) * 43758.5453);
  let h3  = fract(sin(gx * 911.1 + gy * 6131.3 + fw * 0.9) * 43758.5453);
  let Cb_noise = (h3 - 0.5) * tapeChromaAmt;
  let Cr_noise = (h1 - 0.5) * tapeChromaAmt;
  // BT.601 YCbCr→RGB differential: perturb Cb/Cr only, luma unchanged.
  // dR = 1.402*Cr, dG = -0.714136*Cr - 0.344136*Cb, dB = 1.772*Cb
  return max(col + vec3f(1.402*Cr_noise, -0.714136*Cr_noise - 0.344136*Cb_noise, 1.772*Cb_noise), vec3f(0.0));
}
`);

// ---------------------------------------------------------------------------
// 16. Tension wire attenuation -- pure TSL (SPEC-analog-artifacts E)
//     Simulates the two thin horizontal wires crossing Sony Trinitron and other
//     aperture-grille CRTs at ~33% and ~67% screen height. Wires block the
//     electron beam, producing faint dark horizontal lines on bright content.
//     When shimmerAmt > 0 and renderFrame drives shimmerPhase forward, both
//     wires oscillate vertically at shimmerFreq Hz with exponential decay.
//     Returns a float scalar [0..1]: 0 = fully dark (at wire centre), 1 = unattenuated.
// ---------------------------------------------------------------------------
export function buildTensionWireNode(posNode, sizeNode, uniforms) {
  return Fn(() => {
    const y   = posNode.y;
    const px  = float(1.0).div(sizeNode.y);             // 1 output pixel in UV
    const hw  = uniforms.tensionWireWidth.mul(px);       // wire half-width in UV

    // Shimmer: decaying sinusoidal vertical oscillation driven by CPU shimmerPhase.
    // exp(-shimmerPhase * 8) decays to 1/e at 125 ms, imperceptible at ~1.5 s.
    const shimmer = uniforms.shimmerAmt
      .mul(uniforms.shimmerPhase.mul(uniforms.shimmerFreq).mul(6.2832).sin())
      .mul(uniforms.shimmerPhase.negate().mul(8.0).exp());

    const w1y  = uniforms.tensionWireY1.add(shimmer);
    const w2y  = uniforms.tensionWireY2.add(shimmer);

    const d1   = y.sub(w1y).abs();
    const d2   = y.sub(w2y).abs();
    // smoothstep(0, hw, d): 0 at wire centre, 1 outside half-width.
    const att1 = smoothstep(float(0.0), hw, d1);
    const att2 = smoothstep(float(0.0), hw, d2);

    // mix(1, att, str): str=0 → no attenuation; str=1 → full darkness at centre.
    return mix(float(1.0), att1, uniforms.tensionWireStr)
          .mul(mix(float(1.0), att2, uniforms.tensionWireStr));
  })();
}

// ---------------------------------------------------------------------------
// 17. Differential phosphor afterglow accumulation -- wgslFn
//     (SPEC-novel-crt-physics Effect 7)
//
//     Per-channel inter-frame accumulation modelling P22 phosphor persistence.
//     R decays slowest (~1-6 ms), G fastest (~100-300 µs), B effectively zero
//     at 60 Hz. Result: fast-moving bright objects leave a reddish afterimage.
//
//     Output is the NEW accumulation buffer value (copy back to _afterglowRT).
//     Caller also computes: residual = max(0, newAccum - current) * afterglowStr
//     and adds it to the display output.
//
//     Formula per channel:
//       accum[t] = accum[t-1] * decay + current * (1 - decay)
//     where decay = exp(-dt / flickerTauX), computed CPU-side and passed as
//     decayR/G/B uniforms.
// ---------------------------------------------------------------------------
export const afterglowAccumFn = wgslFn(/* wgsl */`
fn afterglowAccumFn(
  prevAfterglow: vec3f,
  current: vec3f,
  decayR: f32,
  decayG: f32,
  decayB: f32
) -> vec3f {
  let decay = vec3f(decayR, decayG, decayB);
  return prevAfterglow * decay + current * (vec3f(1.0) - decay);
}
`);
