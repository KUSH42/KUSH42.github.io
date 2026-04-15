/**
 * matrix-rain-2d-tsl.js — Fullscreen 2D Matrix rain, film-accurate.
 *
 * Two-stage colour ramp keyed on brightness (not distance), position-based
 * flicker rates, log-biased speed distribution — all from specs/matrix-rain-analysis.md.
 *
 * Public API:
 *   makeRain2DUniforms()                              → uniform object
 *   buildRain2DNode(uniforms, atlasTexNode)           → TSL node (composable)
 *   buildLayeredRain2DNode(layerUniforms, atlasTexNode) → TSL node (3-layer additive composite)
 *   LAYER_PRESETS                                     → default params for bg / mid / fg layers
 *   init2DRain(element, opts?)                        → Promise<handle>
 *   destroy2DRain(element)
 *
 * CHAR_SETS: Option B — local copy so this module is independently usable
 * without importing the 3D component.
 */

import {
  Fn, float, vec2, vec3, vec4,
  uniform, texture, clamp, rtt,
  floor, fract, ceil, mod,
  sin, exp, max, min, length,
  smoothstep, mix, select,
  screenUV, screenSize,
  dFdx, dFdy,
  If,
} from 'three/tsl';
import * as THREE from 'three/webgpu';
import { PRESETS } from './matrix-rain-presets.js';
import {
  CHAR_SETS,
  DEFAULT_ATLAS_PX_RANGE,
  atlasFieldModeToValue,
  resolveAtlasDescriptor,
} from './matrix-rain-glyphs.js';
import { loadMSDF } from './matrix-rain-geometry.js';

// ── WebGL2 TextureNode sampler fix (Three.js r183) ────────────────────────
// WebGL2 uses combined sampler uniforms, unlike WebGPU's separate texture +
// sampler bindings. Three's TextureNode still asks for a sampler output on the
// fallback path, which compiles to the wrong symbol name and leaves the scene
// black. Mirror the 3D module's patch here so the 2D pipeline also renders on
// the WebGL2 backend.
if (!THREE.TextureNode.prototype._matrixRainWebGLSamplerPatched) {
  const _origTextureNodeGenerate = THREE.TextureNode.prototype.generate;
  THREE.TextureNode.prototype.generate = function _patchedGenerate(builder, output) {
    if (/^sampler/.test(output) && builder.renderer?.backend?.isWebGPUBackend !== true) {
      return _origTextureNodeGenerate.call(this, builder, 'property');
    }
    return _origTextureNodeGenerate.call(this, builder, output);
  };
  THREE.TextureNode.prototype._matrixRainWebGLSamplerPatched = true;
}

const CHAR_SET_WEIGHTS = {
  matrixcode: null,
  matrix1999: [
    1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 2.5, 1.0,
    1.0, 2.5, 1.0, 1.0, 1.0,
    2.5, 1.0, 1.0, 1.0, 2.5,
    1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 2.5, 2.5, 2.5, 2.5,
    1.0, 1.0, 0.5,
    0.5, 0.5, 0.5, 0.5, 0.5,
    0.5, 0.5, 0.5, 0.5, 0.5,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
  ],
  latin: null,
  ascii: null,
  cyber: null,
  cyrillic: null,
  japanese: null,
  chinese: null,
  orbitron: null,
  iosevka: null,
  datatype: null,
  gsanscode: null,
  hebrew: null,
};

// ── Uniform factory ────────────────────────────────────────────────────────
/**
 * All uniforms for the 2D rain node, plus the internal `_time` uniform
 * that the RAF loop updates each frame with a pre-wrapped elapsed time.
 *
 * @returns {object}  mutable TSL uniform nodes
 */
export function makeRain2DUniforms() {
  return {
    // Core
    uCellW:             uniform(16.0),
    uCellH:             uniform(24.0),
    uSpeedMin:          uniform(1.2),
    uSpeedMax:          uniform(8.0),
    uTrailMin:          uniform(6.0),
    uTrailMax:          uniform(30.0),
    uDensity:           uniform(0.72),
    uNStreams:          uniform(2.0),
    uSpeedRamp:         uniform(1.0),
    uGlitchAmt:         uniform(0.0),   // organic; set via triggerGlitch
    uBrightness:        uniform(1.0),
    uGlobalAlpha:       uniform(1.0),
    uGlyphCount:        uniform(64.0),
    uAtlasGridW:        uniform(8.0),
    uAtlasGridH:        uniform(8.0),
    uAtlasFieldMode:    uniform(atlasFieldModeToValue('compat')),
    uAtlasPxRange:      uniform(DEFAULT_ATLAS_PX_RANGE),
    uAtlasTextureSize:  uniform(new THREE.Vector2(512, 512)),
    uTinyGlyphPxStart:  uniform(3.0),
    uTinyGlyphPxEnd:    uniform(6.0),
    _time:              uniform(0.0),   // internal; updated by RAF

    // Organic (SPEC-2d-organic)
    uSpeedOscillation:  uniform(1.0),   // 0=off, 1=full amplitude
    uWaveSpeed:         uniform(0.02),  // phase correlation drift speed (rad/s)
    uPhaseCorrelation:  uniform(1.0),   // 0=independent phases, 1=correlated
    uClusterWidth:      uniform(4.0),   // segment size in columns (integer)
    uClusterStrength:   uniform(1.0),   // 0=Bernoulli, 1=clustered
    uWeightedGlyphs:    uniform(1.0),   // 0=uniform sampling, 1=weighted
  };
}

// ── Hash functions ─────────────────────────────────────────────────────────

// h21: vec2 → float [0,1)
const h21 = Fn(([p]) => {
  const p3   = fract(vec3(p.x.mul(0.1031), p.y.mul(0.1030), p.x.mul(0.0973)));
  const dot_ = p3.dot(p3.yzx.add(33.33));
  return fract(p3.x.add(p3.y).mul(p3.z).add(dot_));
});

// h22: vec2 → vec2 [0,1)²
const h22 = Fn(([p]) => {
  const p3   = fract(vec3(p.x.mul(0.1031), p.y.mul(0.1030), p.x.mul(0.0973)));
  const dot_ = p3.dot(p3.yzx.add(33.33));
  return fract(vec2(p3.x.add(p3.y), p3.x.add(p3.z)).mul(p3.zy.add(dot_)));
});

// ── Weighted glyph LUT helpers ─────────────────────────────────────────────

/**
 * Build a normalised CDF DataTexture (1×N, R16F) from a weight array.
 * Used for inverse-CDF weighted glyph sampling in the shader.
 *
 * @param {number[]} weights  Per-glyph weights (any positive values)
 * @param {number}   n        Number of entries
 * @returns {THREE.DataTexture}
 */
function buildWeightLUT(weights, n) {
  let total = 0;
  for (let i = 0; i < n; i++) total += (weights[i] ?? 1.0);
  // Compute CDF directly into Uint16Array (half-float) — no intermediate Float32Array needed
  const buf = new Uint16Array(n);
  let accum = 0;
  for (let i = 0; i < n; i++) {
    accum += (weights[i] ?? 1.0);
    buf[i] = _floatToHalf(accum / total);
  }
  const tex = new THREE.DataTexture(buf, n, 1, THREE.RedFormat, THREE.HalfFloatType);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Minimal IEEE 754 float32 → float16 encoder.
 * Sufficient for CDF values in [0, 1] — no NaN/Inf edge cases needed.
 * @param {number} v  float in [0, 1]
 * @returns {number}  uint16 bit pattern
 */
function _floatToHalf(v) {
  const buf  = new ArrayBuffer(4);
  new Float32Array(buf)[0] = v;
  const bits = new Uint32Array(buf)[0];
  const sign = (bits >>> 31) & 0x1;
  let   exp  = ((bits >>> 23) & 0xff) - 127 + 15;
  let   mant = (bits >>> 13) & 0x3ff;
  if (exp <= 0)  { exp = 0; mant = 0; }
  if (exp >= 31) { exp = 31; mant = 0; }
  return (sign << 15) | (exp << 10) | mant;
}

/**
 * Return the weight array for a named charSet (or uniform weights if undefined).
 * @param {string} key    CHAR_SETS key
 * @param {number} count  Glyph count for that set
 * @returns {number[]}
 */
function _weightsForCharSet(key, count) {
  const w = CHAR_SET_WEIGHTS[key];
  if (!w || w.length !== count) return Array.from({ length: count }, () => 1.0);
  return w;
}

// ── Stream parameter helper ────────────────────────────────────────────────
/**
 * JS build-time helper — returns a plain object of TSL node expressions
 * for one stream slot. NOT a TSL Fn. Called inside the JS unroll loop in
 * buildRain2DNode; each call produces distinct TSL graph branches for that
 * slot's hash seeds.
 *
 * Organic features (SPEC-2d-organic):
 *   - Speed micro-oscillation (§1): speed declared as toVar, modulated by sin
 *   - Inter-column phase correlation (§2): sine-sum noise field on col
 *   - Column clustering (§3): segment-based activation blended with Bernoulli
 *
 * `t` is the _time uniform closed over from the buildRain2DNode scope.
 *
 * @param col       TSL float node — column index
 * @param sif       TSL float node — stream slot index (float(si))
 * @param uniforms  from makeRain2DUniforms()
 * @param t         TSL float node — time (closed-over from outer scope)
 */
function getStreamNodes(col, sif, uniforms, t) {
  const {
    uSpeedMin, uSpeedMax, uSpeedRamp,
    uTrailMin, uTrailMax, uDensity,
    uSpeedOscillation, uWaveSpeed,
    uPhaseCorrelation, uClusterWidth, uClusterStrength,
  } = uniforms;

  const h  = h22(vec2(col.mul(0.37).add(sif.mul(13.73)), sif.mul(7.31).add(col.mul(0.19))));
  const h2 = h22(vec2(col.mul(1.73).add(sif.mul(5.17)),  col.mul(0.23).add(sif)));

  // Log-biased speed: squaring h.x concentrates weight toward speedMin
  const speedT = h.x.mul(h.x);
  // §1 — speed must be declared as mutable (toVar) so oscillation can assign into it
  const speed  = mix(uSpeedMin, uSpeedMax, speedT).mul(uSpeedRamp).toVar();

  // §1 Speed micro-oscillation — fv in [0.1, 0.5] Hz seeded per (col, si)
  const fv   = h21(vec2(col.mul(3.71).add(sif.mul(19.13)), float(5.37)))
                 .mul(0.4).add(0.1);
  const phiV = h21(vec2(col.mul(11.1).add(sif.mul(7.23)), float(8.91)))
                 .mul(float(Math.PI * 2));
  // oscillation multiplier: 1 ± 0.15 * uSpeedOscillation
  const oscillation = float(1).add(
    sin(t.mul(fv).add(phiV)).mul(0.15).mul(uSpeedOscillation)
  );
  speed.assign(speed.mul(oscillation));

  const trail = mix(uTrailMin, uTrailMax, h.y);
  const gap   = trail.mul(mix(float(0.5), float(3.0), h2.x));

  // §2 — Inter-column phase correlation
  // Two-octave sine sum for smooth, non-repeating spatial wave across columns
  const noiseFreq = float(0.08);
  const noiseAmt  = float(8.0);
  const colNoise  =
    sin(col.mul(noiseFreq).add(t.mul(uWaveSpeed)).add(float(1.3)))
    .add(sin(col.mul(noiseFreq.mul(2.1)).add(t.mul(uWaveSpeed.mul(2.1))).add(float(0.7))).mul(0.5))
    .div(1.5);
  const phase = h2.y.mul(57.3).add(colNoise.mul(noiseAmt).mul(uPhaseCorrelation));

  // §3 — Column clustering: segment-based activation probability
  const seg         = floor(col.div(uClusterWidth));
  const segSeed     = h21(vec2(seg.mul(7.31), float(2.11)));
  const bucketDur   = segSeed.mul(2.0).add(2.0);                      // 2–4 s per state
  const bucketPhase = t.div(bucketDur).add(segSeed.mul(31.0));
  const bucketIdx   = floor(bucketPhase);
  const segActive   = h21(vec2(seg.mul(3.73), bucketIdx.mul(0.17)));
  const bucketFrac  = fract(bucketPhase);
  const nextIdx     = bucketIdx.add(1.0);
  const nextActive  = h21(vec2(seg.mul(3.73), nextIdx.mul(0.17)));
  // Symmetric cross-fade: fade in from prev state (first 15%), stable (70%), fade out (last 15%)
  const prevIdx     = bucketIdx.sub(1.0);
  const prevActive  = h21(vec2(seg.mul(3.73), prevIdx.mul(0.17)));
  const fadeIn      = smoothstep(float(0.0),  float(0.15), bucketFrac);
  const fadeOut     = smoothstep(float(0.85), float(1.0),  bucketFrac);
  const withFadeIn  = mix(prevActive, segActive, fadeIn);
  const smoothed    = mix(withFadeIn, nextActive, fadeOut);

  // Blend clustered vs independent (Bernoulli) activation
  const independent = h21(vec2(col.mul(7.77).add(sif.mul(3.33)), float(17.1)));
  const mixedActive = mix(independent, smoothed, uClusterStrength);
  const enabled     = select(mixedActive.lessThan(uDensity), float(1), float(0));

  return { speed, trail, gap, phase, enabled };
}

// ── Main node builder ──────────────────────────────────────────────────────
/**
 * Build the fullscreen 2D rain TSL node.
 *
 * The returned node is a composable vec4 TSL node. Wire it as:
 *   mat.colorNode = buildRain2DNode(uniforms, atlasTexNode, weightLutTexNode);
 * or wrap in rtt() for downstream passes / CRT bridge.
 *
 * @param {ReturnType<makeRain2DUniforms>} uniforms
 * @param {object}  atlasTexNode       bare TextureNode (hot-swappable via .value)
 * @param {object}  [weightLutTexNode] TextureNode for CDF weight LUT (hot-swappable via .value)
 * @returns TSL node producing vec4
 */
export function buildRain2DNode(uniforms, atlasTexNode, weightLutTexNode) {
  // sampleGlyph2D closes over atlasTexNode so .value hot-swap propagates
  const sampleGlyph2D = Fn(([cellUV, charId]) => {
    const gIdx     = floor(charId.mul(uniforms.uGlyphCount));
    const cx       = mod(gIdx, uniforms.uAtlasGridW);
    const cy       = floor(gIdx.div(uniforms.uAtlasGridW));
    const sampleUV = vec2(cx, cy).add(cellUV).div(vec2(uniforms.uAtlasGridW, uniforms.uAtlasGridH));
    const samp     = texture(atlasTexNode, sampleUV);
    const msdf     = max(min(samp.r, samp.g), min(max(samp.r, samp.g), samp.b));
    const glyphDx  = vec2(dFdx(cellUV.x), dFdx(cellUV.y));
    const glyphDy  = vec2(dFdy(cellUV.x), dFdy(cellUV.y));
    const glyphUVPerPx = max(length(glyphDx), length(glyphDy));
    const glyphScreenPx = float(1).div(max(glyphUVPerPx, float(0.0001)));
    const useSDF   = smoothstep(uniforms.uTinyGlyphPxEnd, uniforms.uTinyGlyphPxStart, glyphScreenPx);
    const mtsdfMix = select(uniforms.uAtlasFieldMode.greaterThan(float(1.5)), float(1.0), float(0.0));
    const sdf      = mix(msdf, mix(msdf, samp.a, useSDF), mtsdfMix);

    const atlasDx  = vec2(dFdx(sampleUV.x), dFdx(sampleUV.y)).mul(uniforms.uAtlasTextureSize);
    const atlasDy  = vec2(dFdy(sampleUV.x), dFdy(sampleUV.y)).mul(uniforms.uAtlasTextureSize);
    const atlasPxPerScreenPx = max(length(atlasDx), length(atlasDy));
    const screenPxRange = max(
      uniforms.uAtlasPxRange.div(max(atlasPxPerScreenPx, float(0.0001))),
      float(1.0)
    );
    const aa = float(0.5).div(screenPxRange);
    return smoothstep(float(0.5).sub(aa), float(0.5).add(aa), sdf);
  });

  // §4 — Weighted glyph sampling via inverse-CDF bisection (7 steps, covers up to 128 glyphs).
  // Only constructed when weightLutTexNode is provided; otherwise raw charId is used.
  const sampleWeightedGlyph = weightLutTexNode
    ? Fn(([rand]) => {
        // Binary search: find lowest i where CDF[i] >= rand
        const lo = float(0).toVar();
        const hi = uniforms.uGlyphCount.sub(1.0).toVar();
        // Unroll 7 bisection steps (2^7 = 128 covers all charSets up to 95 glyphs exactly)
        for (let step = 0; step < 7; step++) {
          const mid  = floor(lo.add(hi).div(2.0));
          // Texel centres: U = (i + 0.5) / glyphCount
          const cdfV = texture(weightLutTexNode, vec2(mid.add(0.5).div(uniforms.uGlyphCount), 0.5)).r;
          If(cdfV.lessThan(rand), () => { lo.assign(mid.add(1.0)); })
            .Else(() => { hi.assign(mid); });
        }
        return lo.div(uniforms.uGlyphCount);
      })
    : null;

  return Fn(() => {
    // Pixel coordinates as mutable toVar so glitch displacement can reassign px
    const px       = screenUV.mul(screenSize.xy).toVar();
    const t        = uniforms._time;
    const outColor = vec4(0, 0, 0, 0).toVar();
    const skip     = float(0).toVar();

    // §6 — Glitch: horizontal scanline displacement + brightness spike
    If(uniforms.uGlitchAmt.greaterThan(float(0.001)), () => {
      const scanline = floor(px.y.div(uniforms.uCellH));
      const bucket30 = floor(t.mul(30.0));
      const gHash    = h21(vec2(scanline, bucket30));

      // Displace a subset of scanlines horizontally
      If(gHash.lessThan(uniforms.uGlitchAmt.mul(0.30)), () => {
        const dispHash = h21(vec2(scanline.mul(3.7), t.mul(7.0)));
        const disp     = dispHash.sub(0.5)
                                 .mul(screenSize.x)
                                 .mul(0.07)
                                 .mul(uniforms.uGlitchAmt);
        px.assign(vec2(px.x.add(disp), px.y));
      });

      // Full-row brightness spike — set output and flag to skip rain pass
      const bucket5   = floor(t.mul(5.0));
      const spikeHash = h21(vec2(scanline.mul(1.3), bucket5));
      If(spikeHash.lessThan(uniforms.uGlitchAmt.mul(0.05)), () => {
        outColor.assign(vec4(
          float(0),
          float(0.4).mul(uniforms.uGlitchAmt),
          float(0.1).mul(uniforms.uGlitchAmt),
          float(1)
        ));
        skip.assign(float(1));
      });
    });

    // Rain pass — skipped when glitch spike has already set output
    If(skip.lessThan(float(0.5)), () => {
      const cellSz  = vec2(uniforms.uCellW, uniforms.uCellH);
      const cellUV  = fract(px.div(cellSz));
      const cell    = floor(px.div(cellSz));
      const col     = cell.x;
      const row     = cell.y;
      const numRows = ceil(screenSize.y.div(uniforms.uCellH)).add(4.0);

      // Mutable best-stream accumulators
      const bestBri = float(0).toVar();
      const bestCid = float(0).toVar();

      // Unrolled 4 stream slots — siActive masks slots at or beyond uNStreams
      for (let si = 0; si < 4; si++) {
        const sif      = float(si);
        const siActive = sif.lessThan(uniforms.uNStreams);
        // Pass t so getStreamNodes can use it for oscillation, phase correlation, clustering
        const sp       = getStreamNodes(col, sif, uniforms, t);

        const cycleLen = numRows.add(sp.trail).add(sp.gap);

        // pos = fmod((t + phase) * speed, cycleLen) via floor to avoid f32 loss
        const raw = t.add(sp.phase).mul(sp.speed);
        const pos = raw.sub(floor(raw.div(cycleLen)).mul(cycleLen));

        // Skip if in gap phase (pos > numRows + trail)
        const inGap  = pos.greaterThan(numRows.add(sp.trail));

        // Distance from head (0 = head cell, positive = deeper in trail)
        const d      = pos.sub(row);

        // Valid: head has passed this cell and cell is within trail length
        const dValid = d.greaterThanEqual(float(0)).and(d.lessThanEqual(sp.trail));

        // Combined active: slot enabled by uNStreams AND not in gap AND in trail range
        const active = siActive.and(inGap.not()).and(dValid);

        // Exponential brightness decay — λ ensures B(trail) ≈ 0.01
        const lambda = float(4.605).div(sp.trail);
        const bri    = exp(lambda.negate().mul(d));

        // Masked brightness (also gated by per-column density enabled flag)
        const maskedBri = select(active, bri.mul(sp.enabled), float(0));

        // Position-based flicker rates (analysis §3 Character Change Rates):
        //   d < 1.0        → 15 Hz (head)
        //   1.0 ≤ d < 4.0  → ~0.5 Hz (near-head)
        //   4.0 ≤ d < L/2  → ~0.1 Hz (mid-trail)
        //   d ≥ L/2        → static
        const cellSeed = h21(vec2(col.mul(9.73).add(sif.mul(3.17)), row.mul(7.41)));
        const charTick = select(
          d.lessThan(float(1.0)),    floor(t.mul(15.0)),
          select(
            d.lessThan(float(4.0)),  floor(t.mul(0.5).add(cellSeed.mul(31.0))),
            select(
              d.lessThan(sp.trail.div(2.0)), floor(t.mul(0.1).add(cellSeed.mul(13.0))),
              float(0)
            )
          )
        );
        const rawCid = h21(vec2(
          col.mul(73.1).add(row.mul(19.3)).add(sif.mul(11.7)),
          charTick.mul(0.13)
        ));

        // §4 — Weighted glyph: blend raw (uniform) vs weighted charId
        const cid = sampleWeightedGlyph
          ? mix(rawCid, sampleWeightedGlyph(rawCid), uniforms.uWeightedGlyphs)
          : rawCid;

        // Take the stream with highest brightness
        const takeBetter = maskedBri.greaterThan(bestBri);
        bestBri.assign(select(takeBetter, maskedBri, bestBri));
        bestCid.assign(select(takeBetter, cid,       bestCid));
      }

      // Colour pass — only when a stream illuminates this fragment
      If(bestBri.greaterThanEqual(float(0.005)), () => {
        const glyphMask = sampleGlyph2D(cellUV, bestCid);
        If(glyphMask.greaterThanEqual(float(0.01)), () => {
          // Two-stage colour ramp keyed on brightness (film-measured §2 values, 4K Blu-ray)
          const deepTrail   = vec3(0.000, 0.176, 0.039);  // #002D0A — faint green floor
          const matrixGreen = vec3(0.000, 1.000, 0.255);  // #00FF41 — P31 phosphor
          const headWhite   = vec3(0.784, 1.000, 0.824);  // #C8FFD2 — overdriven head

          const t1       = smoothstep(float(0.01), float(0.15), bestBri);  // deep → green
          const t2       = smoothstep(float(0.75), float(1.00), bestBri);  // green → white
          const rampLow  = mix(deepTrail, matrixGreen, t1);
          const rampFull = mix(rampLow, headWhite, t2);
          const rgb      = rampFull.mul(bestBri).mul(glyphMask).mul(uniforms.uBrightness);

          outColor.assign(vec4(rgb, uniforms.uGlobalAlpha));
        });
      });
    });

    return outColor;
  })();
}

// ── Layer presets ──────────────────────────────────────────────────────────
/**
 * Default per-layer parameters for the multi-layer depth mode.
 * Matches the film's three-layer compositing approach (analysis §5.5).
 * Every field is overridable via setLayerParams().
 */
export const LAYER_PRESETS = {
  background: {
    cellW:      12,  cellH:     18,
    speedMin:  0.8,  speedMax:  2.5,
    trailMin:    4,  trailMax:  20,
    density:  0.72,
    brightness: 0.35,
  },
  midground: {
    cellW:      16,  cellH:     24,
    speedMin:  1.2,  speedMax:  7.0,
    trailMin:    6,  trailMax:  30,
    density:  0.72,
    brightness: 1.0,
  },
  foreground: {
    cellW:      20,  cellH:     30,
    speedMin:  3.0,  speedMax:  8.0,
    trailMin:    6,  trailMax:  20,
    density:  0.50,
    brightness: 1.0,
  },
};

// ── Layered composite node ─────────────────────────────────────────────────
/**
 * Build a three-layer additive composite TSL node.
 *
 * Each layer gets its own uniform set (different cell sizes / speeds / etc.).
 * The atlas texture node is shared — TSL deduplicates the binding.
 *
 * @param {{ background, midground, foreground }} layerUniforms
 *   Object whose keys are layer names, values are makeRain2DUniforms() objects.
 * @param {object} atlasTexNode  Bare TextureNode — shared across all layers.
 * @returns TSL node producing vec4
 */
export function buildLayeredRain2DNode(layerUniforms, atlasTexNode) {
  const bgRtt  = rtt(buildRain2DNode(layerUniforms.background, atlasTexNode));
  const midRtt = rtt(buildRain2DNode(layerUniforms.midground,  atlasTexNode));
  const fgRtt  = rtt(buildRain2DNode(layerUniforms.foreground, atlasTexNode));

  // Additive composite, clamped to [0,1]
  return Fn(() => {
    const bgC  = texture(bgRtt,  screenUV);
    const midC = texture(midRtt, screenUV);
    const fgC  = texture(fgRtt,  screenUV);
    return vec4(
      clamp(bgC.rgb.add(midC.rgb).add(fgC.rgb), vec3(0), vec3(1)),
      float(1)
    );
  })();
}

// ── Instance registry ──────────────────────────────────────────────────────
const _instances = new WeakMap();

// ── init2DRain ─────────────────────────────────────────────────────────────
/**
 * Create and start a 2D Matrix rain effect inside `element`.
 *
 * @param {HTMLElement} element  Host element; a canvas is appended inside it
 * @param {object}      opts
 * @param {string}      [opts.charSet='matrix1999']   Named atlas
 * @param {string|null} [opts.atlasPath=null]         Explicit atlas URL; overrides charSet.
 *                                                   Without explicit atlas metadata it renders
 *                                                   through the compatibility decode path.
 * @param {number|null} [opts.atlasGlyphCount=null]   Explicit glyph count for atlasPath
 * @param {number|null} [opts.atlasGridW=null]        Explicit atlas grid width for atlasPath
 * @param {number|null} [opts.atlasGridH=null]        Explicit atlas grid height for atlasPath
 * @param {string|null} [opts.atlasFieldMode=null]    'compat' | 'msdf' | 'mtsdf'
 * @param {number|null} [opts.atlasPxRange=null]      Distance-field pixel range
 * @param {number|null} [opts.atlasWidth=null]        Atlas texture width in pixels
 * @param {number|null} [opts.atlasHeight=null]       Atlas texture height in pixels
 * @param {number[]}    [opts.cellSize=[16,24]]       Cell [w, h] in pixels
 * @param {number[]}    [opts.speedRange=[1.2,8.0]]   Speed [min, max] cells/s
 * @param {number[]}    [opts.trailRange=[6,30]]      Trail length [min, max] cells
 * @param {number}      [opts.density=0.72]           Active column fraction [0,1]
 * @param {number}      [opts.nStreams=2]             Concurrent streams per column [1–4]
 * @param {number}      [opts.brightness=1.0]         Global brightness
 * @param {number}      [opts.opacity=1.0]            Global alpha
 * @param {string|null} [opts.preset=null]            Apply named preset after init
 * @param {boolean}     [opts.headless=false]         Skip scene/renderer/RAF (CRT bridge use)
 * @param {boolean}     [opts.layers=false]           Enable three-layer depth compositing
 * @param {object}      [opts.layerParams={}]         Per-layer overrides merged with LAYER_PRESETS
 * @returns {Promise<object>}  Control handle
 */
export async function init2DRain(element, opts = {}) {
  const {
    charSet     = 'matrix1999',
    atlasPath   = null,
    atlasGlyphCount = null,
    atlasGridW = null,
    atlasGridH = null,
    atlasFieldMode = null,
    atlasPxRange = null,
    atlasWidth = null,
    atlasHeight = null,
    cellSize    = [16, 24],
    speedRange  = [1.2, 8.0],
    trailRange  = [6, 30],
    density     = 0.72,
    nStreams    = 2,
    brightness  = 1.0,
    opacity     = 1.0,
    preset      = null,
    headless    = false,
    layers      = false,
    layerParams = {},
  } = opts;

  // ── Atlas texture (shared across single and multi-layer modes) ────────────
  const csKey  = CHAR_SETS[charSet] ? charSet : 'matrixcode';
  const csDesc = resolveAtlasDescriptor({
    charSet: csKey,
    atlasPath,
    atlasGlyphCount,
    atlasGridW,
    atlasGridH,
    atlasFieldMode,
    atlasPxRange,
    atlasWidth,
    atlasHeight,
  });
  let currentTex = loadMSDF(csDesc.path);

  // Bare TextureNode — no UV baked in; hot-swappable via .value
  const atlasTexNode = texture(currentTex);

  // ── Helpers ───────────────────────────────────────────────────────────────
  /** Apply atlas descriptor to a uniforms object. */
  function applyAtlasDesc(u, desc) {
    u.uGlyphCount.value = desc.glyphCount;
    u.uAtlasGridW.value = desc.gridW;
    u.uAtlasGridH.value = desc.gridH;
    u.uAtlasFieldMode.value = atlasFieldModeToValue(desc.fieldMode);
    u.uAtlasPxRange.value = desc.pxRange;
    u.uAtlasTextureSize.value.set(desc.atlasWidth, desc.atlasHeight);
  }

  /** Map a LAYER_PRESETS field name to the corresponding uniform key. */
  const PARAM_TO_UNIFORM = {
    cellW:      'uCellW',
    cellH:      'uCellH',
    speedMin:   'uSpeedMin',
    speedMax:   'uSpeedMax',
    trailMin:   'uTrailMin',
    trailMax:   'uTrailMax',
    density:    'uDensity',
    brightness: 'uBrightness',
  };

  const LAYER_NAMES = ['background', 'midground', 'foreground'];

  // ── Single-layer mode ─────────────────────────────────────────────────────
  if (!layers) {
    const uniforms = makeRain2DUniforms();
    uniforms.uCellW.value       = cellSize[0];
    uniforms.uCellH.value       = cellSize[1];
    uniforms.uSpeedMin.value    = speedRange[0];
    uniforms.uSpeedMax.value    = speedRange[1];
    uniforms.uTrailMin.value    = trailRange[0];
    uniforms.uTrailMax.value    = trailRange[1];
    uniforms.uDensity.value     = density;
    uniforms.uNStreams.value    = Math.max(1, Math.min(4, Math.round(nStreams)));
    uniforms.uBrightness.value  = brightness;
    uniforms.uGlobalAlpha.value = opacity;
    applyAtlasDesc(uniforms, csDesc);

    // ── Weight LUT (§4 Weighted glyph sampling) ─────────────────────────────
    let currentLutTex = buildWeightLUT(
      _weightsForCharSet(csKey, csDesc.glyphCount),
      csDesc.glyphCount
    );
    const weightLutTexNode = texture(currentLutTex);

    const rainNode = buildRain2DNode(uniforms, atlasTexNode, weightLutTexNode);

    // §7 — saved defaults for reduced-motion restore
    // savedSpeedMax: snapshot at init (user doesn't change this often)
    // savedOscillation: updated right before disabling so user-set value is preserved
    const savedSpeedMax      = uniforms.uSpeedMax.value;
    let   savedOscillation   = uniforms.uSpeedOscillation.value;
    let   _reducedMotion     = false;
    let   _frozen            = false;
    // §5 — cancellation token for triggerSpeedRamp; incremented on each new call
    let   _rampGeneration    = 0;

    function makeHandle(destroyFn) {
      const handle = {
        destroy:       destroyFn,
        getOutputNode: () => rainNode,
        _uniforms:     uniforms,
        _layered:      false,
      };

      handle.setCharSet = (name) => {
        const desc   = CHAR_SETS[name] ?? CHAR_SETS.matrixcode;
        const newTex = loadMSDF(desc.path);
        atlasTexNode.value = newTex;
        const oldTex = currentTex;
        currentTex = newTex;
        applyAtlasDesc(uniforms, desc);
        // Rebuild weight LUT for new charSet
        const newLut = buildWeightLUT(_weightsForCharSet(name, desc.glyphCount), desc.glyphCount);
        weightLutTexNode.value = newLut;
        const oldLut = currentLutTex;
        currentLutTex = newLut;
        Promise.resolve().then(() => { oldTex.dispose(); oldLut.dispose(); });
      };

      handle.setCellSize   = (w, h)    => { uniforms.uCellW.value = w; uniforms.uCellH.value = h; };
      handle.setSpeedRange = (mn, mx)  => { uniforms.uSpeedMin.value = mn; uniforms.uSpeedMax.value = mx; };
      handle.setTrailRange = (mn, mx)  => { uniforms.uTrailMin.value = mn; uniforms.uTrailMax.value = mx; };
      handle.setDensity    = (v)       => { uniforms.uDensity.value = v; };
      handle.setNStreams   = (n)       => { uniforms.uNStreams.value = Math.max(1, Math.min(4, Math.round(n))); };
      handle.setBrightness = (v)       => { uniforms.uBrightness.value = v; };
      handle.setOpacity    = (v)       => { uniforms.uGlobalAlpha.value = v; };
      handle.setSpeedMul   = (v)       => { uniforms.uSpeedRamp.value = v; };

      // §1 — Speed micro-oscillation
      handle.setSpeedOscillation = (v) => { uniforms.uSpeedOscillation.value = v; };

      // §2 — Inter-column phase correlation
      handle.setWaveSpeed        = (v) => { uniforms.uWaveSpeed.value = v; };
      handle.setPhaseCorrelation = (v) => { uniforms.uPhaseCorrelation.value = v; };

      // §3 — Column clustering
      handle.setClusterStrength  = (v) => { uniforms.uClusterStrength.value = v; };
      handle.setClusterWidth     = (v) => { uniforms.uClusterWidth.value = Math.round(v); };

      // §4 — Weighted glyph sampling
      handle.setWeightedGlyphs   = (v) => { uniforms.uWeightedGlyphs.value = v; };

      // §5 — Speed ramp trigger
      // Each call bumps _rampGeneration; the previous RAF loop sees a stale generation and exits.
      handle.triggerSpeedRamp = function(targetMult = 4.0, duration = 2.0) {
        const effectiveMult = _reducedMotion ? Math.min(targetMult, 2.0) : targetMult;
        const startTime     = performance.now();
        const endTime       = startTime + duration * 1000;
        const myGen         = ++_rampGeneration;
        function step(now) {
          if (myGen !== _rampGeneration) return;  // cancelled by a newer call
          const elapsed = (now - startTime) / 1000;
          const tNorm   = Math.min(elapsed / duration, 1.0);
          const rampT   = tNorm < 0.5
            ? 2 * tNorm * tNorm
            : 1 - Math.pow(-2 * tNorm + 2, 2) / 2;
          uniforms.uSpeedRamp.value = 1.0 + (effectiveMult - 1.0) * (1.0 - rampT);
          if (now < endTime) requestAnimationFrame(step);
          else uniforms.uSpeedRamp.value = 1.0;
        }
        requestAnimationFrame(step);
      };

      // §6 — Glitch trigger
      handle.triggerGlitch = function(intensity = 0.6, duration = 0.4) {
        if (_reducedMotion) return () => {};
        uniforms.uGlitchAmt.value = intensity;
        const timerId = setTimeout(() => { uniforms.uGlitchAmt.value = 0.0; }, duration * 1000);
        return () => { clearTimeout(timerId); uniforms.uGlitchAmt.value = 0.0; };
      };

      // §7 — Freeze and reduced-motion override
      handle.setFrozen        = (bool) => { _frozen = bool; };
      handle.setReducedMotion = (bool) => { applyMotionPreference(bool); };

      handle.applyPreset = (name) => {
        const p = PRESETS[name];
        if (!p) return;
        if (p.charSet    !== undefined) handle.setCharSet(p.charSet);
        if (p.opacity    !== undefined) handle.setOpacity(p.opacity);
        if (p.brightness !== undefined) handle.setBrightness(p.brightness);
        if (p.density    !== undefined) handle.setDensity(p.density);
        if (p.nStreams   !== undefined) handle.setNStreams(p.nStreams);
        if (p.speed      !== undefined) handle.setSpeedMul(p.speed);
      };

      return handle;
    }

    // §7 — prefers-reduced-motion (must be declared before makeHandle so triggerGlitch can see it)
    function applyMotionPreference(reduced) {
      _reducedMotion = reduced;
      if (reduced) {
        // Save the current user-set oscillation value right before disabling it
        savedOscillation                 = uniforms.uSpeedOscillation.value;
        uniforms.uSpeedMax.value         = Math.min(uniforms.uSpeedMax.value, 4.0);
        uniforms.uSpeedOscillation.value = 0.0;
      } else {
        uniforms.uSpeedMax.value         = savedSpeedMax;
        uniforms.uSpeedOscillation.value = savedOscillation;
      }
    }

    if (headless) {
      const handle = makeHandle(() => { currentTex.dispose(); currentLutTex.dispose(); });
      if (preset) handle.applyPreset(preset);
      return handle;
    }

    // Renderer + scene
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    element.appendChild(canvas);

    const renderer = new THREE.WebGPURenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(element.clientWidth, element.clientHeight);
    await renderer.init();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene  = new THREE.Scene();
    const geom   = new THREE.PlaneGeometry(2, 2);
    const mat    = new THREE.MeshBasicNodeMaterial();
    if (rainNode) {
      mat.colorNode = rainNode;
    }
    mat.depthWrite  = false;
    mat.toneMapped  = false;
    mat.transparent = true;
    mat.blending    = THREE.NormalBlending;
    scene.add(new THREE.Mesh(geom, mat));

    const WRAP_S  = 3600.0;
    const animRef = { id: 0 };

    function animate(ts) {
      animRef.id = requestAnimationFrame(animate);
      if (_frozen) return;
      uniforms._time.value = (ts / 1000.0) % WRAP_S;
      renderer.render(scene, camera);
    }
    animRef.id = requestAnimationFrame(animate);

    function onResize() {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(element.clientWidth, element.clientHeight);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(element);

    // §7 — Attach media query listener; removed in destroy()
    const motionQuery    = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e) => applyMotionPreference(e.matches);
    motionQuery.addEventListener('change', onMotionChange);
    applyMotionPreference(motionQuery.matches);

    function destroy() {
      cancelAnimationFrame(animRef.id);
      ro.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      renderer.dispose();
      geom.dispose();
      try { mat.dispose(); } catch (e) { /* ignore dispose errors */ }
      currentTex.dispose();
      currentLutTex.dispose();
      canvas.remove();
      _instances.delete(element);
    }

    const handle = makeHandle(destroy);
    if (preset) handle.applyPreset(preset);
    _instances.set(element, handle);
    return handle;
  }

  // ── Multi-layer mode ──────────────────────────────────────────────────────
  // Build three uniform sets, one per layer, merging LAYER_PRESETS with layerParams overrides.

  function makeLayerUniforms(layerName) {
    const lp     = LAYER_PRESETS[layerName];
    const over   = layerParams[layerName] ?? {};
    const merged = { ...lp, ...over };
    const u = makeRain2DUniforms();
    u.uCellW.value      = merged.cellW;
    u.uCellH.value      = merged.cellH;
    u.uSpeedMin.value   = merged.speedMin;
    u.uSpeedMax.value   = merged.speedMax;
    u.uTrailMin.value   = merged.trailMin;
    u.uTrailMax.value   = merged.trailMax;
    u.uDensity.value    = merged.density;
    u.uBrightness.value = merged.brightness;
    // Shared atlas descriptor
    applyAtlasDesc(u, csDesc);
    // Per-layer alpha is always 1.0; composite handles the final output
    u.uGlobalAlpha.value = 1.0;
    return u;
  }

  const layerUniformMap = {
    background: makeLayerUniforms('background'),
    midground:  makeLayerUniforms('midground'),
    foreground: makeLayerUniforms('foreground'),
  };

  // Build the layered composite node
  const rainNode = buildLayeredRain2DNode(layerUniformMap, atlasTexNode);

  // ── Layered handle factory ─────────────────────────────────────────────────
  function makeLayeredHandle(destroyFn) {
    const handle = {
      destroy:        destroyFn,
      getOutputNode:  () => rainNode,
      _uniforms:      layerUniformMap.midground,  // midground exposed for preset sync
      _layerUniforms: layerUniformMap,
      _layered:       true,
    };

    handle.setCharSet = (name) => {
      const desc   = CHAR_SETS[name] ?? CHAR_SETS.matrixcode;
      const newTex = loadMSDF(desc.path);
      atlasTexNode.value = newTex;
      const oldTex = currentTex;
      currentTex = newTex;
      for (const ln of LAYER_NAMES) applyAtlasDesc(layerUniformMap[ln], desc);
      Promise.resolve().then(() => oldTex.dispose());
    };

    /**
     * Update a subset of layer params. Only keys present in params are touched.
     * @param {'background'|'midground'|'foreground'} layer
     * @param {object} params  Partial LAYER_PRESETS shape
     */
    handle.setLayerParams = (layer, params) => {
      const u = layerUniformMap[layer];
      if (!u) return;
      for (const key of Object.keys(params)) {
        const uKey = PARAM_TO_UNIFORM[key];
        if (uKey && u[uKey] !== undefined) u[uKey].value = params[key];
      }
    };

    /**
     * Convenience — update uBrightness for one layer.
     * @param {'background'|'midground'|'foreground'} layer
     * @param {number} v
     */
    handle.setLayerBrightness = (layer, v) => {
      const u = layerUniformMap[layer];
      if (!u) return;
      if (u.uBrightness.value !== 0.0) _savedBrightness[layer] = v;
      u.uBrightness.value = v;
    };

    // Saved brightness values per layer — initialised from uniforms, updated on every enable/setBrightness call.
    // Declared before method assignments so both setLayersEnabled and setBrightness can reference it.
    const _savedBrightness = {
      background: layerUniformMap.background.uBrightness.value,
      midground:  layerUniformMap.midground.uBrightness.value,
      foreground: layerUniformMap.foreground.uBrightness.value,
    };

    /**
     * Enable/disable individual layers by zeroing their brightness.
     * The rtt pass still executes; only the composite contribution is suppressed.
     * Restore uses the current uniform value (so user-adjusted brightness is preserved).
     * @param {boolean} bg   Background layer
     * @param {boolean} mid  Midground layer
     * @param {boolean} fg   Foreground layer
     */
    handle.setLayersEnabled = (bg, mid, fg) => {
      // Snapshot the current non-zero brightness so subsequent re-enables restore the live value.
      if (layerUniformMap.background.uBrightness.value !== 0.0)
        _savedBrightness.background = layerUniformMap.background.uBrightness.value;
      if (layerUniformMap.midground.uBrightness.value !== 0.0)
        _savedBrightness.midground  = layerUniformMap.midground.uBrightness.value;
      if (layerUniformMap.foreground.uBrightness.value !== 0.0)
        _savedBrightness.foreground = layerUniformMap.foreground.uBrightness.value;

      layerUniformMap.background.uBrightness.value = bg  ? _savedBrightness.background : 0.0;
      layerUniformMap.midground.uBrightness.value  = mid ? _savedBrightness.midground  : 0.0;
      layerUniformMap.foreground.uBrightness.value = fg  ? _savedBrightness.foreground : 0.0;
    };

    // Shared single-layer-compatible methods — broadcast to all layers
    handle.setBrightness = (v) => {
      for (const ln of LAYER_NAMES) {
        // Also update _savedBrightness for currently-enabled layers so that a
        // disable → re-enable cycle after a global setBrightness restores the
        // new value rather than snapping back to the pre-broadcast value.
        if (layerUniformMap[ln].uBrightness.value !== 0.0) _savedBrightness[ln] = v;
        layerUniformMap[ln].uBrightness.value = v;
      }
    };
    handle.setOpacity    = (v) => {
      // Opacity is not per-layer in layered mode; record on midground for preset sync
      layerUniformMap.midground.uGlobalAlpha.value = v;
    };
    handle.setSpeedMul   = (v) => {
      for (const ln of LAYER_NAMES) layerUniformMap[ln].uSpeedRamp.value = v;
    };
    handle.setDensity    = (v) => {
      for (const ln of LAYER_NAMES) layerUniformMap[ln].uDensity.value = v;
    };
    handle.setNStreams    = (n) => {
      const clamped = Math.max(1, Math.min(4, Math.round(n)));
      for (const ln of LAYER_NAMES) layerUniformMap[ln].uNStreams.value = clamped;
    };
    handle.setSpeedRange = (mn, mx) => {
      for (const ln of LAYER_NAMES) {
        layerUniformMap[ln].uSpeedMin.value = mn;
        layerUniformMap[ln].uSpeedMax.value = mx;
      }
    };
    handle.setTrailRange = (mn, mx) => {
      for (const ln of LAYER_NAMES) {
        layerUniformMap[ln].uTrailMin.value = mn;
        layerUniformMap[ln].uTrailMax.value = mx;
      }
    };
    handle.setCellSize   = (w, h) => {
      for (const ln of LAYER_NAMES) {
        layerUniformMap[ln].uCellW.value = w;
        layerUniformMap[ln].uCellH.value = h;
      }
    };

    handle.applyPreset = (name) => {
      const p = PRESETS[name];
      if (!p) return;
      // In layered mode: apply shared fields only; do NOT overwrite per-layer structural params.
      if (p.charSet !== undefined) handle.setCharSet(p.charSet);
      if (p.opacity !== undefined) handle.setOpacity(p.opacity);
      // brightness, density, nStreams, speed are structural — preserved in layered mode
    };

    return handle;
  }

  // headless is not meaningful in layered mode but we support it for completeness
  if (headless) {
    const handle = makeLayeredHandle(() => { currentTex.dispose(); });
    if (preset) handle.applyPreset(preset);
    return handle;
  }

  // ── Renderer + scene ──────────────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%;';
  element.appendChild(canvas);

  const renderer = new THREE.WebGPURenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(element.clientWidth, element.clientHeight);
  await renderer.init();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const scene  = new THREE.Scene();
  const geom   = new THREE.PlaneGeometry(2, 2);
    const mat    = new THREE.MeshBasicNodeMaterial();
    if (rainNode) {
      mat.colorNode = rainNode;
    }
    mat.depthWrite  = false;
    mat.toneMapped  = false;
    mat.transparent = true;
    mat.blending    = THREE.NormalBlending;
    scene.add(new THREE.Mesh(geom, mat));

  const WRAP_S  = 3600.0;
  const animRef = { id: 0 };

  function animate(ts) {
    animRef.id = requestAnimationFrame(animate);
    const t = (ts / 1000.0) % WRAP_S;
    for (const ln of LAYER_NAMES) layerUniformMap[ln]._time.value = t;
    renderer.render(scene, camera);
  }
  animRef.id = requestAnimationFrame(animate);

  // ResizeObserver — in layered mode, rebuild the material colorNode to force rtt reallocation.
  let rebuilding = false;
  function onLayeredResize() {
    if (rebuilding) return;
    rebuilding = true;
    cancelAnimationFrame(animRef.id);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(element.clientWidth, element.clientHeight);
    // Rebuild layered composite node so rtt targets allocate at new resolution
    mat.colorNode = buildLayeredRain2DNode(layerUniformMap, atlasTexNode);
    mat.needsUpdate = true;
    rebuilding = false;
    animRef.id = requestAnimationFrame(animate);
  }
  const ro = new ResizeObserver(onLayeredResize);
  ro.observe(element);

  function destroy() {
    cancelAnimationFrame(animRef.id);
    ro.disconnect();
    renderer.dispose();
    geom.dispose();
    try { mat.dispose(); } catch (e) { /* ignore dispose errors */ }
    currentTex.dispose();
    canvas.remove();
    _instances.delete(element);
  }

  const handle = makeLayeredHandle(destroy);
  if (preset) handle.applyPreset(preset);
  _instances.set(element, handle);
  return handle;
}

// ── destroy2DRain ──────────────────────────────────────────────────────────
/**
 * Tear down the rain instance registered on `element`.
 * @param {HTMLElement} element
 */
export function destroy2DRain(element) {
  const h = _instances.get(element);
  if (h) h.destroy();
}

// ── Spec API aliases (SPEC-2d-rain names) ─────────────────────────────────
// These thin wrappers expose the names used in specs/SPEC-2d-rain.md and the
// CRT bridge integration example. The richer `init2DRain`/`buildRain2DNode`
// API above remains the primary interface.

/**
 * Build a TSL uniform object + atlas texture for use with buildMatrix2DColorNode.
 * Accepts the same opts as init2DRain where applicable.
 *
 * @param {object} [opts]
 * @param {string} [opts.charSet='matrix1999']
 * @param {number} [opts.brightness=1.0]
 * @param {number} [opts.opacity=1.0]
 * @param {number} [opts.speedMul=1.0]
 * @returns {object}  uniforms with embedded ._atlasTexNode2d / ._weightLutTexNode2d
 */
export function makeUniforms2D(opts = {}) {
  const { charSet = 'matrix1999' } = opts;
  const csKey  = CHAR_SETS[charSet] ? charSet : 'matrix1999';
  const csDesc = resolveAtlasDescriptor({ charSet: csKey });
  const atlasTex         = loadMSDF(csDesc.path);
  const atlasTexNode_    = texture(atlasTex);
  const lutTex           = buildWeightLUT(_weightsForCharSet(csKey, csDesc.glyphCount), csDesc.glyphCount);
  const weightLutTexNode_ = texture(lutTex);
  const u = makeRain2DUniforms();
  u.uGlyphCount.value = csDesc.glyphCount;
  u.uAtlasGridW.value = csDesc.gridW;
  u.uAtlasGridH.value = csDesc.gridH;
  u.uAtlasFieldMode.value = atlasFieldModeToValue(csDesc.fieldMode);
  u.uAtlasPxRange.value = csDesc.pxRange;
  u.uAtlasTextureSize.value.set(csDesc.atlasWidth, csDesc.atlasHeight);
  if (opts.brightness !== undefined) u.uBrightness.value  = opts.brightness;
  if (opts.opacity    !== undefined) u.uGlobalAlpha.value = opts.opacity;
  if (opts.speedMul   !== undefined) u.uSpeedRamp.value   = opts.speedMul;
  // Private: consumed by buildMatrix2DColorNode
  u._atlasTexNode2d      = atlasTexNode_;
  u._weightLutTexNode2d  = weightLutTexNode_;
  return u;
}

/**
 * Build an analytical 2D rain color node from a makeUniforms2D result.
 * Returns a TSL vec4 node evaluated at screenUV — usable as a PostProcessing
 * outputNode or as colorNode on a fullscreen quad.
 *
 * @param {ReturnType<makeUniforms2D>} uniforms2d
 * @returns TSL node
 */
export function buildMatrix2DColorNode(uniforms2d) {
  return buildRain2DNode(uniforms2d, uniforms2d._atlasTexNode2d, uniforms2d._weightLutTexNode2d);
}

/** Spec API alias for init2DRain. */
export const initMatrix2DRain    = init2DRain;
/** Spec API alias for destroy2DRain. */
export const destroyMatrix2DRain = destroy2DRain;
