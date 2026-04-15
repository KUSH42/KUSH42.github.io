/**
 * matrix-rain-passes-tsl.js  —  TSL post-processing pass builders.
 * Each builder returns { outputNode, ...controllable uniforms }.
 *
 * Ported from the GLSL ShaderPass objects in matrix-rain-shaders.js.
 *
 * Exports (one builder per effect):
 *   buildHeatPass(inputTexNode)
 *   buildPhosphorPass(inputTexNode, prevTexNode, decayUniform)
 *   buildSoftenPass(inputTexNode)
 *   buildStreakPass(inputNode, uAspect?)
 *   buildHoloPass(inputTexNode, uInterlaceResY?)
 *   buildGodRaysPass(inputTexNode)
 *   buildFogPass(inputTexNode)
 *   buildDustPass(inputNode)
 *   buildRadialChromaPass(inputTexNode)
 *
 * NOTE: buildMsgOverlayPass has been removed. Message text is now rendered by a
 * dedicated instanced mesh (buildMsgColumnMaterial in matrix-rain-tsl.js) added
 * directly to the scene with NormalBlending — the only correct way to occlude rain
 * columns behind message glyphs.
 */

import {
  Fn, float, int, vec2, vec3, vec4,
  uniform,
  sin, dot, abs, max, min, exp, fract, floor, mod, sqrt, clamp, mix,
  smoothstep, step, normalize, length,
  screenUV, texture,
  If, Loop,
  select, time,
} from 'three/tsl';
import * as THREE from 'three/webgpu';

// Rec. 709 luminance weights — shared by heat and fog passes.
const LUMA_REC709 = vec3(0.2126, 0.7152, 0.0722);

// ── Heat distortion ───────────────────────────────────────────────────────
// UV warp driven by pixel brightness — heat shimmer around bright glyph heads.
// Inserted after bloom. Requires inputTexNode to be a sampleable TextureNode
// (wrap upstream output in rtt() before passing here).

/**
 * @param {TextureNode} inputTexNode  sampleable texture of the previous pass
 * @returns {{ outputNode, uHeatAmt, uHeatFreq, uHeatSpeed }}
 */
export function buildHeatPass(inputTexNode) {
  const uHeatAmt   = uniform(0.004);
  const uHeatFreq  = uniform(60.0);
  const uHeatSpeed = uniform(3.5);

  const outputNode = Fn(() => {
    const original = texture(inputTexNode, screenUV);
    const bright   = dot(original.rgb, LUMA_REC709);
    const warpU    = sin(screenUV.y.mul(uHeatFreq).add(time.mul(uHeatSpeed)))
      .mul(bright).mul(uHeatAmt);
    const warpV    = sin(screenUV.x.mul(uHeatFreq.mul(1.3)).add(time.mul(uHeatSpeed.mul(0.7))))
      .mul(bright).mul(uHeatAmt).mul(0.5);
    const warpedUv = clamp(screenUV.add(vec2(warpU, warpV)), 0.001, 0.999);
    const warped   = texture(inputTexNode, warpedUv);
    // Protect bright bloom peaks from being warped to darker neighbors
    const protect  = smoothstep(0.3, 0.8, bright);
    return mix(warped, original, protect);
  })();

  return { outputNode, uHeatAmt, uHeatFreq, uHeatSpeed };
}

// ── Phosphor persistence ──────────────────────────────────────────────────
// Temporal feedback: current frame max-blended with decayed previous frame.
// prevTexNode must be texture(prevRT.texture, screenUV); caller is responsible
// for calling renderer.copyTextureToTexture each frame to update prevRT.

/**
 * @param {Node}        inputNode    upstream post-processing node (auto-samples at screenUV)
 * @param {TextureNode} prevTexNode  texture(prevRT.texture, screenUV) — decayed previous frame
 * @param {UniformNode} decayUniform  uniform(0.88)
 * @returns {{ outputNode }}
 */
export function buildPhosphorPass(inputNode, prevTexNode, decayUniform) {
  const outputNode = Fn(() => {
    const current = inputNode;
    const prev    = prevTexNode.mul(decayUniform);
    return max(current, prev);
  })();

  return { outputNode };
}

// ── Screen-space radial soften ────────────────────────────────────────────
// Peripheral columns soften; centre stays sharp.
// Approximates depth-of-field without a depth buffer.
// Requires inputTexNode to be a sampleable TextureNode.

/**
 * @param {TextureNode} inputTexNode
 * @returns {{ outputNode, uBlurStrength }}
 */
export function buildSoftenPass(inputTexNode) {
  const uBlurStrength = uniform(0.002);

  const outputNode = Fn(() => {
    const ctr  = screenUV.sub(0.5);
    const edge = dot(ctr, ctr).mul(4.0);
    const r    = uBlurStrength.mul(edge);
    const col  = texture(inputTexNode, screenUV).toVar('sc');
    const origAlpha = col.a;
    col.addAssign(texture(inputTexNode, clamp(screenUV.add(vec2(r,         r.mul(0.5))), 0.001, 0.999)));
    col.addAssign(texture(inputTexNode, clamp(screenUV.add(vec2(r.negate(), r.mul(0.5))), 0.001, 0.999)));
    col.addAssign(texture(inputTexNode, clamp(screenUV.add(vec2(0.0,       r.negate())), 0.001, 0.999)));
    col.mulAssign(0.25);
    col.a.assign(origAlpha); // preserve original alpha — prevent bleed into transparent bg
    return col;
  })();

  return { outputNode, uBlurStrength };
}

// ── Lens rain streaks ─────────────────────────────────────────────────────
// 3 vertical streaks drifting horizontally — rain on a camera lens.
// Pure additive, no custom UV sampling needed.

/**
 * @param {Node}        inputNode  upstream node (auto-samples at screenUV)
 * @param {UniformNode} uAspect    uniform(w / h) — must be updated on resize
 * @returns {{ outputNode, uStreakAmt, uAspect }}
 */
export function buildStreakPass(inputNode, uAspect) {
  const uStreakAmt = uniform(0.055);
  if (!uAspect) uAspect = uniform(1.78);

  const outputNode = Fn(() => {
    const col       = inputNode.toVar('str');
    const streakAdd = float(0).toVar('sadd');

    Loop({ start: int(0), end: int(3), type: 'int' }, ({ i }) => {
      const fi     = i.toFloat();
      const cx     = fract(fi.mul(0.3183).add(0.17).add(time.mul(float(0.004).add(fi.mul(0.003)))));
      const dist_  = min(abs(screenUV.x.sub(cx)), float(1).sub(abs(screenUV.x.sub(cx))));
      const width_ = float(0.0018).add(fi.mul(0.0007)).div(uAspect);
      const streak = exp(dist_.mul(dist_).negate().div(width_.mul(width_).mul(2)));
      const vertFade = smoothstep(0.0, 0.15, screenUV.y).mul(smoothstep(1.0, 0.85, screenUV.y));
      const shimmer  = float(0.7).add(float(0.3).mul(
        sin(screenUV.y.mul(120).add(time.mul(2.5)).add(fi.mul(2.094)))
      ));
      const alpha_ = float(0.4).add(fi.mul(0.2));
      streakAdd.addAssign(streak.mul(vertFade).mul(shimmer).mul(alpha_));
    });

    col.rgb.addAssign(vec3(0.55, 1.0, 0.65).mul(streakAdd).mul(uStreakAmt));
    col.rgb.assign(min(col.rgb, vec3(3.0)));
    return col;
  })();

  return { outputNode, uStreakAmt, uAspect };
}

// ── Holographic overlay ───────────────────────────────────────────────────
// Chromatic aberration (edge-weighted) + scrolling scanlines + vignette.
// Requires inputTexNode to be a sampleable TextureNode.

/**
 * @param {TextureNode} inputTexNode
 * @param {UniformNode}  [uInterlaceResY]  uniform(screenHeight) — must be updated on resize
 * @returns {{ outputNode, uVignetteStrength, uScanlineOpacity, uAberrationAmt, uGlitchAmt,
 *             uInterlaceAmt, uInterlaceResY }}
 */
export function buildHoloPass(inputTexNode, uInterlaceResY) {
  const uVignetteStrength = uniform(0.42);
  const uScanlineOpacity  = uniform(0.045);
  const uAberrationAmt    = uniform(0.0025);
  const uGlitchAmt        = uniform(0.0);
  const uInterlaceAmt     = uniform(0.0);
  if (!uInterlaceResY) uInterlaceResY = uniform(720.0);

  const outputNode = Fn(() => {
    // Glitch — horizontal scanline-band displacement
    const glitchX = float(0.0).toVar();
    If(uGlitchAmt.greaterThan(float(0.001)), () => {
      const band = floor(screenUV.y.mul(24.0));
      const h    = fract(sin(band.mul(137.1).add(time.mul(93.7))).mul(43758.5453));
      glitchX.assign(h.sub(0.5).mul(uGlitchAmt).mul(0.08));
    });

    const ctr    = screenUV.sub(0.5);
    const edgeSq = dot(ctr, ctr).mul(4.0);
    const s      = uAberrationAmt.mul(edgeSq);
    const gUV    = vec2(clamp(screenUV.x.add(glitchX), float(0.001), float(0.999)), screenUV.y);
    const uvR    = clamp(gUV.add(ctr.mul(s)), 0.001, 0.999);
    const uvB    = clamp(gUV.sub(ctr.mul(s)), 0.001, 0.999);
    const r      = texture(inputTexNode, uvR).r;
    const g      = texture(inputTexNode, gUV).g;
    const b      = texture(inputTexNode, uvB).b;
    const col    = vec3(r, g, b).toVar();

    // Scrolling scanlines
    const scan  = sin(screenUV.y.mul(640).add(time.mul(0.5))).mul(0.5).add(0.5);
    col.mulAssign(float(1).sub(uScanlineOpacity.mul(float(1).sub(scan))));

    // Vignette
    col.mulAssign(float(1).sub(edgeSq.mul(uVignetteStrength)));

    // Interlace flicker (B3)
    If(uInterlaceAmt.greaterThan(float(0.001)), () => {
      const frameOdd = step(float(0.5), fract(time.mul(30.0)));
      const lineOdd  = mod(floor(screenUV.y.mul(uInterlaceResY)), float(2.0));
      const dimFactor = float(1.0).sub(uInterlaceAmt.mul(float(0.3)));
      const isDimmed  = abs(lineOdd.sub(frameOdd)).lessThan(float(0.5));
      col.mulAssign(select(isDimmed, dimFactor, float(1.0)));
    });

    // Preserve alpha for transparent canvas compositing
    return vec4(col, texture(inputTexNode, gUV).a);
  })();

  return { outputNode, uVignetteStrength, uScanlineOpacity, uAberrationAmt, uGlitchAmt,
           uInterlaceAmt, uInterlaceResY };
}

// ── God rays ──────────────────────────────────────────────────────────────
// Screen-space crepuscular rays (GPU Gems 3 radial blur).
// 80 samples back toward a configurable light position.
// Requires inputTexNode to be a sampleable TextureNode.

/**
 * @param {TextureNode} inputTexNode
 * @returns {{ outputNode, uLightPos, uDensity, uDecay, uWeight, uExposure, uEnabled }}
 */
export function buildGodRaysPass(inputTexNode) {
  const uLightPos = uniform(new THREE.Vector2(0.5, 0.75));
  const uDensity  = uniform(0.93);
  const uDecay    = uniform(0.96);
  const uWeight   = uniform(0.35);
  const uExposure = uniform(0.45);
  const uClampMax = uniform(1.0);
  const uEnabled  = uniform(1.0);

  const outputNode = Fn(() => {
    const base   = texture(inputTexNode, screenUV);
    const result = base.toVar('grResult');

    If(uEnabled.greaterThanEqual(0.5), () => {
      const delta  = screenUV.sub(uLightPos).mul(uDensity.div(float(80)));
      const uv_    = screenUV.toVar('gruv');
      const decay_ = float(1.0).toVar('grd');
      const rays   = vec4(0).toVar('gr');

      Loop(80, () => {
        uv_.subAssign(delta);
        const s = texture(inputTexNode, uv_).mul(decay_).mul(uWeight);
        rays.addAssign(s);
        decay_.mulAssign(uDecay);
      });

      rays.mulAssign(uExposure);
      rays.assign(min(rays, vec4(uClampMax)));
      result.assign(base.add(rays));
    });

    return result;
  })();

  return { outputNode, uLightPos, uDensity, uDecay, uWeight, uExposure, uEnabled };
}

// ── Atmospheric depth fog ─────────────────────────────────────────────────
// Blends a fog colour into dark (low-luminance) regions.
// Requires inputTexNode to be a sampleable TextureNode.

/**
 * Atmospheric depth fog — blends a fog colour into dark (low-luminance) regions.
 * Dark areas (inverse luminance) receive maximum fog; bright areas receive none.
 * Requires inputTexNode to be a sampleable TextureNode (wrap upstream in rtt()).
 *
 * @param {TextureNode} inputTexNode
 * @returns {{ outputNode, uFogAmt, uFogColor }}
 */
export function buildFogPass(inputTexNode) {
  const uFogAmt   = uniform(0.0);
  const uFogColor = uniform(new THREE.Vector3(0.0, 0.06, 0.02));

  const outputNode = Fn(() => {
    const col      = texture(inputTexNode, screenUV).toVar('fog');
    const luma     = clamp(dot(col.rgb, LUMA_REC709), float(0.0), float(1.0));
    // Fog strength = uFogAmt * (1 - luma): dark pixels get full fog, bright pixels get none.
    const fogBlend = clamp(uFogAmt.mul(float(1.0).sub(luma)), float(0.0), float(1.0));
    col.rgb.assign(mix(col.rgb, uFogColor, fogBlend));
    return col;
  })();

  return { outputNode, uFogAmt, uFogColor };
}

// ── Volumetric dust motes ─────────────────────────────────────────────────
// 32 procedural light particles drifting across the screen.
// Additive blend; does not sample input at custom UVs.

/**
 * Volumetric dust motes — 32 procedural light particles drifting across the screen.
 * Additive blend; does not sample input at custom UVs — takes raw inputNode.
 *
 * @param {Node} inputNode  upstream post-processing node
 * @returns {{ outputNode, uDustAmt }}
 */
export function buildDustPass(inputNode) {
  const uDustAmt = uniform(0.0);

  const outputNode = Fn(() => {
    const col      = inputNode.toVar('dstCol');
    const dustAcc  = vec3(0.0).toVar('dstAcc');

    If(uDustAmt.greaterThan(float(0.001)), () => {
      Loop({ start: int(0), end: int(32), type: 'int' }, ({ i }) => {
        const fi = i.toFloat();

        // Deterministic per-mote parameters derived from index via fract-sin hash
        const baseX  = fract(sin(fi.mul(float(47.3213))).mul(float(43758.5453)));
        const baseY  = fract(sin(fi.mul(float(31.7891))).mul(float(12345.6789)));
        const spdX   = float(0.012).add(fract(sin(fi.mul(float(17.1111))).mul(float(9876.5432))).mul(float(0.018)));
        const spdY   = float(0.008).add(fract(sin(fi.mul(float(23.3333))).mul(float(5432.1098))).mul(float(0.012)));
        const phase  = fi.mul(float(2.3998));
        const radius = float(0.0025).add(fract(sin(fi.mul(float(13.7777))).mul(float(8765.4321))).mul(float(0.007)));

        // Smoothly drifting position, wrapping in [0,1] via fract
        const mx = fract(baseX.add(time.mul(spdX)));
        const my = fract(baseY.add(time.mul(spdY).add(sin(time.mul(float(0.31)).add(phase)).mul(float(0.018)))));

        const dist       = length(screenUV.sub(vec2(mx, my)));
        const mote       = exp(dist.mul(dist).negate().div(radius.mul(radius).mul(float(2.0))));
        const brightness = max(float(0.0), float(0.45).add(float(0.55).mul(sin(time.mul(float(1.1)).add(phase)))));

        dustAcc.addAssign(vec3(0.55, 1.0, 0.65).mul(mote).mul(brightness));
      });
    });

    col.rgb.addAssign(dustAcc.mul(uDustAmt));
    // Soft clamp to avoid bloom overflow
    col.rgb.assign(min(col.rgb, vec3(3.0)));
    return col;
  })();

  return { outputNode, uDustAmt };
}

// ── Radial chromatic aberration ───────────────────────────────────────────
// R/G/B channels sampled at UV offsets pointing radially from screen centre.
// Requires inputTexNode to be a sampleable TextureNode.

/**
 * Radial chromatic aberration — R/G/B channels sampled at UV offsets pointing
 * radially away from the screen centre. G channel is unshifted.
 * Requires inputTexNode to be a sampleable TextureNode (wrap upstream in rtt()).
 *
 * @param {TextureNode} inputTexNode
 * @returns {{ outputNode, uRadialChromaticAmt }}
 */
export function buildRadialChromaPass(inputTexNode) {
  const uRadialChromaticAmt = uniform(0.0);

  const outputNode = Fn(() => {
    const base = texture(inputTexNode, screenUV);
    const ctr  = screenUV.sub(vec2(0.5, 0.5));

    // R channel pushed outward from centre, B pushed inward
    const shift = ctr.mul(uRadialChromaticAmt);
    const uvR   = clamp(screenUV.add(shift),         float(0.001), float(0.999));
    const uvB   = clamp(screenUV.sub(shift),         float(0.001), float(0.999));

    const r = texture(inputTexNode, uvR).r;
    const g = base.g;                                  // G unchanged
    const b = texture(inputTexNode, uvB).b;

    return vec4(r, g, b, base.a);
  })();

  return { outputNode, uRadialChromaticAmt };
}

