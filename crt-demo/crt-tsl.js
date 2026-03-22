/**
 * crt-tsl.js
 * Pure-TSL node builders and small wgslFn helpers for the non-kernel CRT stages.
 *
 * Exports:
 *   buildWarpNode(screenUVNode, warpMultUniform)  — barrel distortion (pure TSL)
 *   maskFn                                        — phosphor mask (wgslFn)
 *   grainFn                                       — film grain (wgslFn)
 *   buildCornerMaskNode(posNode)                  — bezel fade (pure TSL)
 *   buildGammaNode(colNode)                       — CRT gamma γ=2.5 (pure TSL)
 *   buildScratchNode(colNode, scratchTex, scratchStrUniform) — multiply blend (pure TSL)
 *   snowFn                                                  — electronic snow (wgslFn)
 *   buildP22MatrixNode(colNode, p22StrNode)       — P22 phosphor primary gamut (pure TSL)
 *   buildColorTempNode(colNode, colorTempNode)    — Bradford D65→9300K CAT (pure TSL)
 *   ghostFn                                       — multipath ghost UV offset sampler (wgslFn, P0-A)
 *   vbiFn                                         — VBI bleed top-of-frame noise (wgslFn, P2-C)
 *   dotCrawlFn                                    — NTSC dot crawl edge artifact (wgslFn, P2-A)
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
// 1. Barrel warp — pure TSL
//    Replicates the original GLSL Warp() but with aspect-correct coefficients.
//    Physical basis: an isotropic CRT glass surface curves equally in H and V.
//    The original hardcoded 1/96 (H) and 1/72 (V) encode a 4:3 aspect ratio
//    (ratio 96/72 = 4/3). For widescreen (16:9) displays this produces more
//    horizontal warp than vertical, which is physically incorrect.
//
//    Fix: set BASE = 1/72 (the V coefficient at 4:3), compute:
//      wy = warpMult * BASE           (vertical, unchanged)
//      wx = warpMult * BASE / aspect  (horizontal, scaled by aspect ratio)
//    At 4:3 (aspect=1.333): wx = BASE/1.333 = 1/96  ← backward compatible
//    At 16:9 (aspect=1.778): wx = BASE/1.778 = 1/128 ← correct for widescreen
//    At 1:1  (aspect=1.0):   wx = BASE/1.0   = 1/72  ← equal H and V
// ---------------------------------------------------------------------------

/**
 * Build an aspect-correct barrel-warp node that maps screenUV to a warped UV.
 * Warp is isotropic in physical screen space: equal curvature in H and V.
 * Note: despite the "barrel" naming in comments, this formula produces the visual
 * appearance of a convex CRT screen (content expands outward from centre relative
 * to corners). By standard CRT shader convention this is "pincushion correction"
 * (removing the pincushion distortion of the curved screen). warpMult > 0 = more curvature.
 * @param {Node} uvNode       — input UV node (e.g. screenUV)
 * @param {Node} warpMultNode — uniform float node for warp multiplier
 * @returns {Node} vec2 warped UV
 */
export function buildWarpNode(uvNode, warpMultNode, sizeNode = screenSize) {
  return Fn(() => {
    // Map 0..1 → -1..1
    const centered = uvNode.sub(0.5).mul(2.0);
    const cx = centered.x;
    const cy = centered.y;

    // Aspect-correct warp amounts.
    // BASE = 1/72 is the vertical coefficient at 4:3; horizontal is divided by
    // the current aspect ratio to maintain equal physical curvature.
    const BASE   = float(1.0 / 72.0);
    const aspect = sizeNode.x.div(sizeNode.y);
    const wx = warpMultNode.mul(BASE).div(aspect);  // = 1/96 at 4:3
    const wy = warpMultNode.mul(BASE);              // = 1/72 always

    // Barrel scale each axis by the other axis squared
    const sx = cx.mul(float(1.0).add(cy.mul(cy).mul(wx)));
    const sy = cy.mul(float(1.0).add(cx.mul(cx).mul(wy)));

    // Map -1..1 → 0..1
    return vec2(sx, sy).mul(0.5).add(0.5);
  })();
}

// ---------------------------------------------------------------------------
// 2. Phosphor mask — wgslFn
//    Eight mask types via maskType: i32 (0=aperture, 1=shadow, 2=slot, 3=grille+damper,
//    4=delta triad, 5=VGA grid, 6=hi-res grille, 7=CGWG).
//    maskStr is passed in but the final mix(vec3(1), mask, maskStr) is done
//    in the TSL caller so that the uniform node participates in the graph.
//
//    Gap A — source-pixel conversion:
//      pixelCoord is in output pixels. To compute the mask period in source-pixel
//      units (so one mask cell = one source pixel), we convert:
//        pc_src = pixelCoord * src / res
//      Then divide by maskScale to emulate a different-pitch physical mask.
//
//    All mask types use peak=1.0 (energy-conserving) and floor=0.1.
//    Energy conservation: phosphor apertures pass through at most the original
//    source brightness — they cannot amplify. mix(1, mask, maskStr) therefore
//    only darkens gaps; it never adds phantom energy above the source signal.
//    This matches crt-royale's approach (pre-computed avg constants + bloom comp)
//    and Guest Advanced's normalization via mix(1+scans, 1, c).
//    Type 0 — aperture grille (Trinitron): 3-stripe RGB, floor 0.1, peak 1.0.
//             maskSmooth=1: raised-cosine stripe profile (coeff 0.45+0.55).
//    Type 1 — shadow mask: 6px horizontal period (2px/channel), 2-row stagger.
//             maskSmooth=1: 2D raised-cosine dot (cx × cy), peak 1.0 (coeff 0.45+0.55).
//    Type 2 — slot mask: same 6px columns, alternating row brightness, peak 1.0.
//             maskSmooth=1: cosine row modulation (smoother than binary step).
//    Out-of-range maskType (clamped to 0-7 by setShader) falls back to aperture grille.
// ---------------------------------------------------------------------------
export const maskFn = wgslFn(/* wgsl */`
fn maskFn(pixelCoord: vec2f, res: vec2f, sourceSizeX: f32, sourceSizeY: f32, maskType: i32, maskScale: f32, maskSmooth: f32) -> vec3f {
  // Resolve source resolution for mask period (0 = use output res).
  let srcX = select(res.x, sourceSizeX, sourceSizeX > 0.5);
  let srcY = select(res.y, sourceSizeY, sourceSizeY > 0.5);
  // Convert to source-pixel space, then apply maskScale pitch.
  let pc = (pixelCoord * vec2f(srcX, srcY) / res) / maskScale;

  // ── Type 1: shadow mask — RGB dot triad, 2-row alternating offset ──────────
  if (maskType == 1) {
    let col_idx = i32(floor(pc.x)) % 6;  // 6px horizontal period
    let row_idx = i32(floor(pc.y)) % 2;   // 2-row alternation
    // Odd rows shift by 3px (half period) to stagger the dot columns.
    let shifted = (col_idx + row_idx * 3) % 6;
    // Peak = 1.0 (energy-conserving): phosphor apertures pass through at most the
    // original source brightness. Floor = 0.1 (mask grid between dots).
    var mask: vec3f = vec3f(0.1);
    if (maskSmooth < 0.001) {
      // Binary hard-edge dot: peak 1.0 at column centre, floor 0.1.
      // +0.5 shift centres the cos() peak at the column midpoint (not the column edge).
      let cx   = fract((pc.x + 0.5) / 2.0) * 2.0 - 1.0;
      let dotW = clamp(1.0 - abs(cx), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      // Smooth 2D raised-cosine dot: peak 1.0 (energy-conserving), floor 0.1.
      // 2D product models roughly circular phosphor dot aperture (equal H and V
      // brightness at centre). Coefficient 0.45 (not 0.5) gives floor = 0.10,
      // matching the binary hard-edge mode; coefficient 0.5 would give floor = 0.
      // +0.5 shift on both axes centres the cos() peak at the column/row midpoint.
      // Y-stagger: columns 3-5 (right half of 6-pixel H period) are offset by 1 row
      // pitch, modelling the alternating dot layout of real shadow masks.
      let PI  = 3.14159265;
      let cx  = fract((pc.x + 0.5) / 2.0) * 2.0 - 1.0;  // -1..1 within 2px column, centred
      let yShift = select(0.0, 1.0, col_idx >= 3);
      let cy  = fract((pc.y + 0.5 + yShift) / 2.0) * 2.0 - 1.0;  // Y: staggered by column group
      let dotS = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
               * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }

  // ── Type 7: CGWG — 2px alternating green/magenta ────────────────────────────
  if (maskType == 7) {
    let odd = f32(i32(floor(pc.x)) % 2);
    var mask: vec3f = vec3f(0.3);
    let peak = 1.0;
    let floor_val = 0.3;
    if (maskSmooth < 0.001) {
      mask = select(vec3f(peak, floor_val, peak), vec3f(floor_val, peak, floor_val), odd > 0.5);
    } else {
      let PI = 3.14159265;
      let t = cos(fract(pc.x / 2.0) * 2.0 * PI) * 0.5 + 0.5;
      let hi = mix(floor_val, peak, t);
      let lo = mix(peak, floor_val, t);
      let bm = select(vec3f(peak, floor_val, peak), vec3f(floor_val, peak, floor_val), odd > 0.5);
      mask = mix(bm, vec3f(hi, lo, hi), maskSmooth);
    }
    return mask;
  }

  // ── Type 6: Hi-res aperture grille — 6px period, 2px per channel ───────────
  if (maskType == 6) {
    let px6 = fract(pc.x / 6.0) * 6.0;
    var mask: vec3f = vec3f(0.1);
    if (px6 < 2.0) { mask.r = 1.0; }
    else if (px6 < 4.0) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      let PI = 3.14159265;
      let drC = min(min(abs(px6 - 1.0), 6.0 - px6 + 1.0), 1.0);
      let dgC = min(abs(px6 - 3.0), 1.0);
      let dbC = min(abs(px6 - 5.0), 1.0);
      let rw = clamp(cos(drC * PI) * 0.45 + 0.55, 0.1, 1.0);
      let gw = clamp(cos(dgC * PI) * 0.45 + 0.55, 0.1, 1.0);
      let bw = clamp(cos(dbC * PI) * 0.45 + 0.55, 0.1, 1.0);
      mask = mix(mask, vec3f(rw, gw, bw), maskSmooth);
    }
    return mask;
  }

  // ── Type 5: Lottes VGA — floor-quantized rectangular grid ──────────────────
  if (maskType == 5) {
    var qpc = vec2f(pc.x, floor(pc.y / 2.0));
    qpc.x = qpc.x + qpc.y * 3.0;
    let col_idx = i32(floor(qpc.x)) % 6;
    var mask: vec3f = vec3f(0.1);
    if (col_idx < 2) { mask.r = 1.0; }
    else if (col_idx < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      let PI = 3.14159265;
      let fy = fract(pc.y / 2.0) * 2.0 - 1.0;
      let fx = fract((pc.x + 0.5) / 2.0) * 2.0 - 1.0;
      let gridX = clamp(cos(fx * PI) * 0.3 + 0.7, 0.1, 1.0);
      let gridY = clamp(cos(fy * PI) * 0.3 + 0.7, 0.1, 1.0);
      mask = mix(vec3f(0.1), mask, gridX * gridY);
    }
    return mask;
  }

  // ── Type 4: Delta triad — 6x3, 1/3-period row stagger ─────────────────────
  if (maskType == 4) {
    let col_idx = i32(floor(pc.x)) % 6;
    let row_idx = i32(floor(pc.y)) % 3;
    let shifted = (col_idx + row_idx * 2) % 6;
    var mask: vec3f = vec3f(0.1);
    if (maskSmooth < 0.001) {
      let cx = fract((pc.x + 0.5) / 2.0) * 2.0 - 1.0;
      let dotW = clamp(1.0 - abs(cx), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      let PI = 3.14159265;
      let cx = fract((pc.x + 0.5) / 2.0) * 2.0 - 1.0;
      let yPhase = f32(col_idx / 2) / 3.0;
      let cy = fract((pc.y + 0.5) / 3.0 + yPhase) * 2.0 - 1.0;
      let dotS = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
               * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }

  // ── Type 3: Aperture grille + Trinitron damper wires ───────────────────────
  if (maskType == 3) {
    let px3t = fract(pc.x / 3.0) * 3.0;
    var binaryMaskT: vec3f = vec3f(0.1);
    if (px3t < 1.0) { binaryMaskT.r = 1.0; }
    else if (px3t < 2.0) { binaryMaskT.g = 1.0; }
    else { binaryMaskT.b = 1.0; }
    var mask: vec3f = binaryMaskT;
    if (maskSmooth >= 0.001) {
      let PI = 3.14159265;
      let drT = min(min(px3t, 3.0 - px3t), 0.5);
      let dgT = min(abs(px3t - 1.0), 0.5);
      let dbT = min(abs(px3t - 2.0), 0.5);
      let rwT = clamp(cos(drT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
      let gwT = clamp(cos(dgT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
      let bwT = clamp(cos(dbT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
      mask = mix(binaryMaskT, vec3f(rwT, gwT, bwT), maskSmooth);
    }
    let screenY = pixelCoord.y / res.y;
    let wire1 = abs(screenY - 0.3333);
    let wire2 = abs(screenY - 0.6667);
    let wireWidth = 2.0 / res.y;
    let wireFade = 4.0 / res.y;
    let w1 = 0.65 + 0.35 * smoothstep(wireWidth, wireWidth + wireFade, wire1);
    let w2 = 0.65 + 0.35 * smoothstep(wireWidth, wireWidth + wireFade, wire2);
    mask = mask * w1 * w2;
    return mask;
  }

  // ── Type 2: slot mask — 2-wide RGB columns, alternating row brightness ─────
  if (maskType == 2) {
    let col_idx = i32(floor(pc.x)) % 6;
    // Peak = 1.0 (energy-conserving), floor = 0.1.
    var mask: vec3f = vec3f(0.1);
    if (col_idx < 2) {
      mask.r = 1.0;
    } else if (col_idx < 4) {
      mask.g = 1.0;
    } else {
      mask.b = 1.0;
    }
    if (maskSmooth < 0.001) {
      // Binary row attenuation: odd rows → 0.4 (dark slot between phosphor rows).
      let row_frac = fract(pc.y / 2.0);
      let row_weight = select(1.0, 0.4, row_frac >= 0.5);
      mask = mix(vec3f(0.1), mask, row_weight);
    } else {
      // Cosine row modulation: smooth transition instead of hard step.
      // 0.7 * (cos(ry*PI)*0.5+0.5) + 0.3 → range [0.3, 1.0] (no full dark slot).
      let PI  = 3.14159265;
      let ry  = fract(pc.y / 2.0) * 2.0 - 1.0;  // -1..1 within 2-row period
      let row_weightS = 0.7 * (cos(ry * PI) * 0.5 + 0.5) + 0.3;
      mask = mix(vec3f(0.1), mask, row_weightS);
    }
    return mask;
  }

  // ── Type 0 (default): aperture grille ─────────────────────────────────────
  // Peak = 1.0 (energy-conserving): phosphor stripes pass through at most the
  // original source brightness — they cannot amplify. Floor = 0.1 (dark gap
  // between stripes). mix(1, mask, maskStr) therefore only darkens gaps;
  // it never brightens the signal beyond the original.
  // px3 is shared between the binary and smooth paths (no duplicate declaration).
  let px3 = fract(pc.x / 3.0) * 3.0;   // 0..3 over one period; used for both binary and smooth paths
  var binaryMask: vec3f = vec3f(0.1);
  if (px3 < 1.0) {
    binaryMask.r = 1.0;
  } else if (px3 < 2.0) {
    binaryMask.g = 1.0;
  } else {
    binaryMask.b = 1.0;
  }
  if (maskSmooth < 0.001) { return binaryMask; }

  // Smooth aperture-grille stripe profiles using period-1 raised cosines.
  // Each profile uses cos(dist * 2π) where dist is clamped to [0, 0.5] stripe
  // widths. This ensures the profile reaches the floor value (0.10) exactly at
  // the stripe boundary (dist=0.5) rather than at the adjacent stripe centre,
  // eliminating the cross-channel energy injection bug present in the previous
  // cos(dist*π) approach (which gave 0.55 at boundaries instead of 0.10).
  //
  // Derivation: cos(0.5 * 2π) = cos(π) → 0.45*(-1)+0.55 = 0.10 ✓
  // Peak:       cos(0.0 * 2π) = 1.0    → 0.45*1+0.55    = 1.00 ✓
  //
  // All three stripe distances are clamped at 0.5 so the profile is zero
  // outside a single stripe period — no energy bleeds across stripe boundaries.
  // px3 is reused from the binary path above (no redeclaration).
  let PI   = 3.14159265;

  // Distance from each stripe centre, clamped to [0, 0.5] stripe widths.
  // R centre at 0 (and by periodicity at 3), G at 1, B at 2.
  let dr = min(min(px3, 3.0 - px3), 0.5);   // distance to R centre (at 0)
  let dg = min(abs(px3 - 1.0),       0.5);   // distance to G centre (at 1)
  let db = min(abs(px3 - 2.0),       0.5);   // distance to B centre (at 2)

  let rw = clamp(cos(dr * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  let gw = clamp(cos(dg * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  let bw = clamp(cos(db * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  let smoothMask = vec3f(rw, gw, bw);

  return mix(binaryMask, smoothMask, maskSmooth);
}
`);

// ---------------------------------------------------------------------------
// 3. Film grain — wgslFn
//    Applied post-gamma in display space. This matches film grain aesthetic:
//    grain is proportionally larger relative to shadow values and barely visible
//    in highlights. Physical CRT shot noise behaves oppositely (proportional to
//    √signal, larger in highlights), but display-space grain is more visually
//    appealing and avoids γ=2.5 amplification (~5×) in shadows.
//    See buildPostProcessing for ordering rationale (grain must follow bloom).
//
//    Gap E — Per-channel spatial decorrelation:
//    Each R/G/B channel uses a different vec2f scale vector so they produce
//    spatially independent noise fields. Without this, all channels share the
//    same spatial structure (just time-offset), yielding achromatic monochrome
//    grain. Real film grain is spectrally coloured due to different layer
//    grain sizes in each dye layer.
//    Returns vec3f offset in [-grainAmt, +grainAmt] per channel.
// ---------------------------------------------------------------------------
export const grainFn = wgslFn(/* wgsl */`
fn grainFn(pixelCoord: vec2f, t: f32, grainAmt: f32) -> vec3f {
  // Single vec3→vec3 hash (IQ hash33 pattern): one traversal produces all three
  // independent R/G/B noise fields — ~1.3× cheaper than three separate vec2 hashes.
  // Spatial decorrelation across channels is provided by the three different scale
  // factors (0.1031, 0.1030, 0.0973) and the (q.xxy + q.yxx) × q.zyx mixing step.
  // Time enters as the third input dimension (scaled × 100 to lift it out of the
  // near-zero mantissa region where fract() loses precision at high frame counts).
  // P2-D: use 97.3× (prime-ish, beats at |97-60|=37 Hz vs 60fps — above temporal perception)
  // instead of 73.0 (which beats at |73-60|=13 Hz, producing a faint 77ms rolling structure).
  let tOff = fract(t * 97.3) * 100.0;
  var q: vec3f = fract(vec3f(pixelCoord.x, pixelCoord.y, tOff) * vec3f(0.1031, 0.1030, 0.0973));
  q = q + dot(q, q.yxz + 33.33);
  let n = fract((q.xxy + q.yxx) * q.zyx) * 2.0 - 1.0;
  return n * grainAmt;
}
`);

// ---------------------------------------------------------------------------
// 4. Corner mask — pure TSL
//    Smooth bezel fade over r=0.018 band inside each screen edge.
//    Applied to the warped pos (not screenUV) to follow the barrel distortion.
// ---------------------------------------------------------------------------

/**
 * @param {Node} posNode — vec2 warped UV (output of buildWarpNode)
 * @returns {Node} float mask in [0, 1]
 */
export function buildCornerMaskNode(posNode, sizeNode = screenSize) {
  return Fn(() => {
    // P1-D: aspect-correct corner fade radius.
    // Physical isotropy: equal physical width fade on all edges.
    // On 16:9: rx = r / aspect so H and V fade cover the same number of pixels.
    // P3-D: lower smoothstep edge is slightly negative (-0.01) to accommodate
    // barrel-warp overshoot — warped UV can go marginally below 0 at corners.
    const r      = float(0.018);
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
// 5. CRT gamma — pure TSL
//    pow(max(col, 0), 1/2.5)  — CRT phosphor gamma, slightly punchier than sRGB.
// ---------------------------------------------------------------------------

/**
 * @param {Node} colNode — vec3 linear colour
 * @returns {Node} vec3 gamma-encoded colour
 */
export function buildGammaNode(colNode) {
  return pow(max(colNode, vec3(0.0)), vec3(1.0 / 2.5));
}

// ---------------------------------------------------------------------------
// 6. Scratch multiply blend — pure TSL
//    Multiply blend: col * (1 - scratchTex * scratchStr)
//    Physical scratches attenuate (scatter/absorb) light — they darken, not brighten.
//    When scratchStr=0 this reduces to col exactly — no conditional needed.
// ---------------------------------------------------------------------------

/**
 * @param {Node} colNode        — vec3 colour before scratch
 * @param {Node} scratchTexNode — vec3 scratch texture sample
 * @param {Node} scratchStrNode — float uniform for scratch strength
 * @returns {Node} vec3 blended colour
 */
export function buildScratchNode(colNode, scratchTexNode, scratchStrNode) {
  const one = vec3(1.0);
  // Multiply blend: col * (1 - scratchTex * scratchStr)
  // Scratches attenuate the signal proportionally — bright areas lose more absolute
  // light than dark areas, matching how surface defects scatter incident photons.
  return colNode.mul(one.sub(scratchTexNode.mul(scratchStrNode)));
}

// ---------------------------------------------------------------------------
// 7. P22 phosphor primary matrix — pure TSL
//    Consumer CRT phosphors (P22 set, SMPTE C) had different chromaticity
//    primaries than modern sRGB displays. P22 red is slightly more orange,
//    P22 blue slightly more indigo. Applied pre-gamma in linear light.
//
//    3×3 sRGB→P22 matrix derived from representative P22 chromaticities
//    via sRGB→XYZ/D65→P22. str=0 = identity, str=1 = full P22 gamut shift.
// ---------------------------------------------------------------------------

/**
 * @param {Node} colNode     — vec3 linear colour (pre-gamma)
 * @param {Node} p22StrNode  — float blend factor (0 = sRGB, 1 = full P22)
 * @returns {Node} vec3 colour with P22 primary shift applied
 */
export function buildP22MatrixNode(colNode, p22StrNode) {
  // sRGB -> P22 chromaticity matrix, derived from CIE 1931 xy primaries:
  //   P22: R(0.626,0.344)  G(0.285,0.604)  B(0.151,0.067)  white D65
  //   sRGB: R(0.640,0.330) G(0.300,0.600)  B(0.150,0.060)  white D65
  // P22 primaries from Poynton (corrected). Computed via M_P22_from_XYZ * M_XYZ_from_sRGB
  // (same D65 white point, no chromatic adaptation needed).
  // All rows sum to 1.0 — white is perfectly preserved.
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
// 8. Color temperature — Bradford D65→9300K CAT — pure TSL
//    Consumer CRTs (especially Japanese monitors) used a 9300K white point
//    instead of the D65 (6504K) standard used by modern sRGB displays.
//    9300K is substantially bluer: CIE xy (0.2816, 0.2984) vs D65 (0.3127, 0.3290).
//
//    Derived via Bradford chromatic adaptation transform:
//      M_RGB_CAT = M_XYZ_to_sRGB × M_CAT_XYZ × M_sRGB_to_XYZ
//    where M_CAT_XYZ = M_A_inv × diag(LMS_9300K / LMS_D65) × M_A
//    (M_A = published Bradford cone-response matrix)
//
//    Full transform (str=1): white (1,1,1) → (0.821, 1.019, 1.337)
//      R′ =  0.9335·R − 0.0964·G − 0.0163·B
//      G′ =  0.0044·R + 1.0207·G − 0.0060·B
//      B′ =  0.0076·R + 0.0272·G + 1.3021·B
//    Luminance of white is preserved (Y = 0.2126·R + 0.7152·G + 0.0722·B ≈ 1.0).
//    Values >1 (blue channel) are physically correct and clamped by framebuffer.
//    See specs/SPEC-color-temperature.md for full derivation.
// ---------------------------------------------------------------------------

/**
 * Bradford D65→9300K chromatic adaptation transform.
 * @param {Node} colNode        — vec3 linear colour (pre-gamma)
 * @param {Node} colorTempNode  — float blend factor (0 = D65, 1 = full 9300K)
 * @returns {Node} vec3 colour with 9300K white-point shift applied
 */
export function buildColorTempNode(colNode, colorTempNode) {
  // Bradford D65→9300K chromatic adaptation matrix — unnormalised.
  // Y of white is preserved (~1.000): 0.2126×0.8208 + 0.7152×1.0191 + 0.0722×1.3369 ≈ 1.000.
  // A 9300K monitor is not dimmer than a D65 one; it has the same luminance with a blue-biased
  // chromaticity. The blue channel exceeds 1.0 for near-white content at str=1; the framebuffer
  // clamps it, producing a minor chromaticity shift only for pixels very close to pure white.
  // Do NOT re-introduce the 0.7480 normalisation — it reduces white luminance by ~25%.
  const dr = colNode.x.mul( 0.9335).add(colNode.y.mul(-0.0964)).add(colNode.z.mul(-0.0163));
  const dg = colNode.x.mul( 0.0044).add(colNode.y.mul( 1.0207)).add(colNode.z.mul(-0.0060));
  const db = colNode.x.mul( 0.0076).add(colNode.y.mul( 0.0272)).add(colNode.z.mul( 1.3021));
  return mix(colNode, vec3(dr, dg, db), colorTempNode);
}

// ---------------------------------------------------------------------------
// 9. Electronic snow — wgslFn
//    Continuous per-channel noise matching real CRT static character.
//    Physically: tuner/IF stage thermal noise hits every pixel continuously;
//    each R/G/B phosphor subpixel receives independent noise → coloured grain.
//    Returns vec3f additive offset in [-snowAmt*0.5, +snowAmt*0.5] per channel.
//    Time is quantised to fieldRate (50 Hz PAL / 60 Hz NTSC) — matches real CRT
//    field update rate rather than arbitrary 12 fps.
// ---------------------------------------------------------------------------
export const snowFn = wgslFn(/* wgsl */`
fn snowFn(pixelCoord: vec2f, t: f32, snowAmt: f32, fieldRate: f32) -> vec3f {
  if (snowAmt < 0.0001) { return vec3f(0.0); }
  // Quantise time to field rate (50 Hz PAL / 60 Hz NTSC) — noise pattern changes
  // at the same rate as CRT field updates, matching real RF-stage thermal noise.
  let tSlot = u32(floor(t * fieldRate));
  let ix = u32(pixelCoord.x);
  let iy = u32(pixelCoord.y);
  // Shared LCG base seed — one multiply per coordinate instead of three, saving
  // 6 multiplications. Per-channel offsets use incommensurate u32 constants
  // (golden-ratio and a second incommensurate prime) to break correlation between
  // channels before the finalizer avalanches the bits.
  let base = ix * 1664525u + iy * 1013904223u + tSlot * 22695477u;
  var hr = base;
  var hg = base + 0x9e3779b9u;   // golden-ratio offset (2^32 / φ)
  var hb = base + 0x27d4eb2fu;   // incommensurate second offset
  // Full MurmurHash3 u32 finalizer — avalanches all 32 bits (passes strict avalanche
  // criterion), eliminating the horizontal correlation banding present in the previous
  // 16-bit xorshift. Two extra ops per channel vs the prior finalizer.
  hr ^= hr >> 16u; hr *= 0x85ebca6bu; hr ^= hr >> 13u; hr *= 0xc2b2ae35u; hr ^= hr >> 16u;
  hg ^= hg >> 16u; hg *= 0x85ebca6bu; hg ^= hg >> 13u; hg *= 0xc2b2ae35u; hg ^= hg >> 16u;
  hb ^= hb >> 16u; hb *= 0x85ebca6bu; hb ^= hb >> 13u; hb *= 0xc2b2ae35u; hb ^= hb >> 16u;
  // Continuous uniform noise in [-0.5, 0.5] per channel — all pixels affected,
  // both brightening and darkening, matching real CRT static character.
  let scale = 1.0 / 4294967295.0;
  return vec3f(f32(hr) * scale - 0.5,
               f32(hg) * scale - 0.5,
               f32(hb) * scale - 0.5) * snowAmt;
}
`);

// ---------------------------------------------------------------------------
// 10. Ghost / multipath echo — wgslFn (P0-A)
//     Samples the source texture at a horizontal UV offset to simulate
//     CRT multipath: the TV antenna receives both the direct signal and a
//     reflection from a building/terrain/object, the delayed copy arriving
//     50–3000 ns later (~0.2–12 px at 4.2 MHz NTSC video bandwidth).
//     Ghost is sampled from the pre-kernel source so it has the same
//     scanline structure as the direct image (physically correct: both the
//     direct and reflected signals are processed by the same electron gun).
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const ghostFn = wgslFn(/* wgsl */`
fn ghostEntry(tex: texture_2d<f32>, uv: vec2f, xOffset: f32) -> vec3f {
  let texSize  = vec2f(textureDimensions(tex, 0));
  let ghostX   = clamp(uv.x + xOffset, 0.0, 1.0);
  let iCoord   = clamp(
    vec2i(floor(vec2f(ghostX, uv.y) * texSize)),
    vec2i(0),
    vec2i(texSize) - vec2i(1)
  );
  return textureLoad(tex, iCoord, 0).rgb;
}
`);

// ---------------------------------------------------------------------------
// 11. VBI bleed — wgslFn (P2-C)
//     Simulates visible Vertical Blanking Interval data lines at the very
//     top of the frame. On consumer CRTs with vertical size slightly
//     oversized, VBI lines carrying closed captions / teletext are visible
//     as thin strips of coloured horizontal pixel patterns.
//     Returns vec3f(0) for all rows below vbiLines — the TSL caller applies
//     a select() to composite this over the main signal.
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const vbiFn = wgslFn(/* wgsl */`
fn vbiEntry(uv: vec2f, res: vec2f, frameCount: f32, vbiStr: f32, vbiLines: f32) -> vec3f {
  let py = uv.y * res.y;
  // Only active in top vbiLines output rows — return black elsewhere.
  if (py >= vbiLines) { return vec3f(0.0); }
  // Hash: different pattern per 8-px column group, per VBI row, per field.
  // Uses same sin/fract approach as grainFn (large prime multipliers avoid periodicity).
  // field changes every 2 frames (at 60 fps field rate, each field = 1 frame).
  let colGroup = floor(uv.x * res.x / 8.0);
  let row      = floor(py);
  let field    = floor(frameCount * 0.5);
  // DR-5 P3-D: wrap field before multiplying to stay within f32 exact-integer range.
  // At 60 fps, field reaches ~6M after 28 h; field*1.3 ≈ 7.8e6 exceeds f32 precision
  // (max exact integer = 16,777,216), causing the % 9973 modulo to quantize and produce
  // a repeating low-period pattern. Pre-wrapping to [0, 9973) keeps sums well below 2^24.
  let fieldW   = fract(field / 9973.0) * 9973.0;
  let h1 = fract(sin(colGroup * 317.3 + row * 7919.0 + fieldW * 1.3) * 43758.5453);
  let h2 = fract(sin(colGroup * 521.7 + row * 3571.0 + fieldW * 2.7) * 43758.5453);
  let h3 = fract(sin(colGroup * 911.1 + row * 6131.0 + fieldW * 0.9) * 43758.5453);
  return vec3f(h1, h2, h3) * vbiStr;
}
`);

// ---------------------------------------------------------------------------
// 12. Dot crawl — wgslFn (P2-A)
//     NTSC composite artifact: the color subcarrier (3.579545 MHz) aliases
//     into the decoded baseband at luma/chroma spatial transitions, producing
//     colored crawling dots at sharp vertical edges.
//     Uses left-neighbor luma gradient as edge detector; applies a subcarrier-
//     frequency sinusoidal chroma modulation, animated at the NTSC crawl rate
//     (0.5 source lines / frame = upward drift).
//     Left neighbor must be pre-fetched by the caller; no extra texture fetch.
//     Entry function first per CLAUDE.md wgslFn source ordering rule.
// ---------------------------------------------------------------------------
export const dotCrawlFn = wgslFn(/* wgsl */`
fn dotCrawlEntry(
  col:         vec3f,
  left:        vec3f,
  uv:          vec2f,
  res:         vec2f,
  src_y:       f32,
  flickerRate: f32,
  t:           f32,
  amt:         f32
) -> vec3f {
  if (amt < 0.001) { return col; }
  // Detect horizontal luminance edge (gradient magnitude in luma/px units).
  // BT.709 coefficients — scene RT is linear-light.
  let Y  = dot(col,  vec3f(0.2126, 0.7152, 0.0722));
  let Yl = dot(left, vec3f(0.2126, 0.7152, 0.0722));
  let grad = abs(Y - Yl) * res.x;

  // Subcarrier phase:
  //   Horizontal: NTSC subcarrier = 3.579545 MHz at 13.5 MHz luminance rate → 227.5 cycles/
  //     720 active samples = 0.3160 cycles/pixel. Scale to current source width: res.x * 0.3160.
  //     (Previous value of 4.5 was ~45× too coarse, producing a slow chroma wash, not fine dots.)
  //   Vertical:   1 full cycle per scanline (180°/line × 2 lines gives diagonal pattern)
  //   Temporal:   crawl upward at 0.5 source lines/frame.
  // Crawl rate derivation: 0.5 lines/frame × flickerRate frames/s = 0.5*flickerRate lines/s.
  // In UV units (0..1 = src_y lines): crawlRateUV = 0.5 * flickerRate / src_y cycles/s.
  let effectiveSrcY  = select(res.y, src_y, src_y > 0.5);
  let crawlRateUV    = 0.5 * flickerRate / max(effectiveSrcY, 1.0);
  let crawlPhase     = fract(t * crawlRateUV) * 6.28318;
  let subcarrierFreq = res.x * 0.3160;   // NTSC: 227.5 cycles per 720-px line → 0.3160/px
  let subPhase       = uv.x * subcarrierFreq * 6.28318
                     + uv.y * 6.28318
                     - crawlPhase;

  // NTSC YIQ chroma modulation: I (orange-cyan) and Q (green-magenta).
  let Ic =  sin(subPhase) * 0.25;
  let Qc = -cos(subPhase) * 0.25;

  // YIQ → RGB (approximate; only chroma at edges).
  let cr =  Ic * 0.956 + Qc * 0.621;
  let cg = -Ic * 0.272 - Qc * 0.647;
  let cb = -Ic * 1.106 + Qc * 1.703;

  // Edge mask: apply crawl only where luma gradient is significant.
  let edgeMask = smoothstep(0.05, 0.30, grad);
  return clamp(col + vec3f(cr, cg, cb) * edgeMask * amt, vec3f(0.0), vec3f(1.0));
}
`);
