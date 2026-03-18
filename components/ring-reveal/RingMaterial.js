/**
 * ShaderMaterial / LineMaterial factories for ring reveal rings (base and glow layers).
 */

import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

// ── Shared GLSL fragments used by both material factories ─────────────────────

/** Uniform declarations injected into both the GLSL3 vertex shader and Line2's onBeforeCompile. */
const RING_UNIFORM_DECLARATIONS = /* glsl */`
uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingFade;
uniform float uInvert;
uniform int   uDirection;
uniform float uWarpAmount;
uniform vec3  uColor;
uniform vec3  uColorB;
uniform float uColorSpread;
uniform float uBrightSpread;
uniform float uFlickerAmp;
uniform float uFlickerSpeed;
uniform float uTime;
uniform float uArcColorSpread;
uniform float uScrollSpeed;
uniform int   uScrollAxis;
uniform int   uGradientMode;
uniform float uJitter;
`;

/** HSL colour helpers shared between both factories. */
const RING_HELPER_FUNCTIONS = /* glsl */`
float _hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

vec3 _hue2rgb(float h) {
  return clamp(abs(fract(h + vec3(1.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
}

vec3 _hsl2rgb(float h, float s, float l) {
  return l + s * (_hue2rgb(h) - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

vec3 _rgb2hsl(vec3 c) {
  float cmax = max(c.r, max(c.g, c.b));
  float cmin = min(c.r, min(c.g, c.b));
  float d    = cmax - cmin;
  float l    = (cmax + cmin) * 0.5;
  float s    = d < 1e-4 ? 0.0 : d / (1.0 - abs(2.0 * l - 1.0));
  float h;
  if (d < 1e-4) {
    h = 0.0;
  } else if (c.r >= cmax) {
    h = fract((c.g - c.b) / d / 6.0);
  } else if (c.g >= cmax) {
    h = fract(((c.b - c.r) / d + 2.0) / 6.0);
  } else {
    h = fract(((c.r - c.g) / d + 4.0) / 6.0);
  }
  return vec3(h, s, l);
}

/**
 * Interpolate two colours using the selected gradient mode.
 * Modes: 0=RGB linear, 1=HSL short arc, 2=HSL long arc, 3=HSL CW, 4=HSL CCW
 */
vec3 _gradientColor(vec3 ca, vec3 cb, float t, int mode) {
  if (mode == 0) {
    return mix(ca, cb, t);
  }
  vec3 ha = _rgb2hsl(ca);
  vec3 hb = _rgb2hsl(cb);
  float dh = hb.x - ha.x;
  if (mode == 1) {
    if (dh >  0.5) dh -= 1.0;
    if (dh < -0.5) dh += 1.0;
  } else if (mode == 2) {
    if (dh >= 0.0 && dh < 0.5) dh -= 1.0;
    if (dh <  0.0 && dh > -0.5) dh += 1.0;
  } else if (mode == 3) {
    if (dh < 0.0) dh += 1.0;
  } else {
    if (dh > 0.0) dh -= 1.0;
  }
  return _hsl2rgb(fract(ha.x + dh * t), mix(ha.y, hb.y, t), mix(ha.z, hb.z, t));
}
`;

/**
 * Ring reveal vertex prelude — computes normRing, localT, vAlpha, warpScale, vRingColor, vFlickerMult.
 * Injected into the vertex main() body before the position transform.
 * Requires: _normPos (float 0..1, ring's current visual position along the scroll axis),
 *           ringIndex (attribute), all uXxx uniforms, vAlpha/vRingColor/vFlickerMult (varyings).
 */
const RING_REVEAL_VERTEX_PRELUDE = /* glsl */`
  // ── reveal — onset uses stable per-ring index so scroll can't flip a ring
  //    back to hidden mid-reveal. Direction applied to normalised index order.
  float stableNorm = ringIndex / uNumRings;
  float normRing;
  if (uDirection == 0) {
    normRing = stableNorm;
  } else if (uDirection == 1) {
    normRing = 1.0 - stableNorm;
  } else {
    normRing = abs(stableNorm - 0.5) * 2.0;
  }
  float maxOnset     = (1.0 - uRingFade) * (1.0 - uStagger);
  float baseOnset    = normRing * maxOnset;
  float jitterOffset = (_hash(ringIndex + 53.7) - 0.5) * uJitter * ((1.0 - uRingFade) / uNumRings);
  float onset  = clamp(baseOnset + jitterOffset, 0.0, 1.0 - uRingFade);
  float localT  = clamp((uProgress - onset) / uRingFade, 0.0, 1.0);
  float fadeIn  = smoothstep(0.0, 1.0, localT);
  vAlpha = mix(fadeIn, 1.0 - fadeIn, uInvert);

  // ── warp ──────────────────────────────────────────────────────────────────
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);

  // ── per-ring colour variation — uses index for stable per-ring identity ────
  float rng1 = _hash(ringIndex);
  float rng2 = _hash(ringIndex + 71.3);
  float rng3 = _hash(ringIndex + 37.9);
  vec3 gradientBase = _gradientColor(uColor, uColorB, ringIndex / uNumRings, uGradientMode);
  vec3 hsl = _rgb2hsl(gradientBase);
  hsl.x = fract(hsl.x + (rng1 - 0.5) * uColorSpread);
  hsl.z = clamp(hsl.z + (rng2 - 0.5) * uBrightSpread, 0.02, 0.98);
  hsl.x = fract(hsl.x + arcPosition * uArcColorSpread);
  vRingColor = _hsl2rgb(hsl.x, hsl.y, hsl.z);

  // ── per-ring flicker ───────────────────────────────────────────────────────
  vFlickerMult = 1.0 + uFlickerAmp * sin(uTime * uFlickerSpeed + rng3 * 6.2832);
`;

// ── GLSL3 ShaderMaterial (legacy LineSegments path, kept for reference) ──────

const _vertexShader = /* glsl */`
in float ringIndex;
in float arcPosition;
out float vAlpha;
out vec3  vRingColor;
out float vFlickerMult;

${RING_UNIFORM_DECLARATIONS}
${RING_HELPER_FUNCTIONS}

void main() {
  float _scrollOff = uTime * uScrollSpeed;
  float _R = length(position);
  float _normPos;
  if (uScrollAxis == 1) {
    _normPos = mod(position.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
  } else {
    _normPos = mod(position.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
  }
${RING_REVEAL_VERTEX_PRELUDE}
  vec3 _rPos;
  if (uScrollAxis == 1) {
    // Latitude: translate rings up/down on sphere surface
    float _sy = position.y / _R;
    float _sc = sqrt(max(1e-6, 1.0 - _sy*_sy));
    float _ny = mod(_sy + _scrollOff + 1.0, 2.0) - 1.0;
    float _nc = sqrt(max(1e-6, 1.0 - _ny*_ny));
    _rPos = vec3(position.x * (_nc/_sc), _ny * _R, position.z * (_nc/_sc));
  } else {
    // Longitude: translate parallel vertical rings left/right on sphere surface
    float _sx = position.x / _R;
    float _sc = sqrt(max(1e-6, 1.0 - _sx*_sx));
    float _nx = mod(_sx + _scrollOff + 1.0, 2.0) - 1.0;
    float _nc = sqrt(max(1e-6, 1.0 - _nx*_nx));
    _rPos = vec3(_nx * _R, position.y * (_nc/_sc), position.z * (_nc/_sc));
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(_rPos * warpScale, 1.0);
}
`;

const _fragmentShader = /* glsl */`
in float vAlpha;
in vec3  vRingColor;
in float vFlickerMult;

uniform float uOpacity;
uniform float uEmissiveIntensity;

out vec4 fragColor;

void main() {
  if (vAlpha < 0.001) discard;
  fragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);
}
`;

// ── Shared uniform builder ────────────────────────────────────────────────────

function _directionIndex(direction) {
  return direction === 'north-to-south' ? 1
       : direction === 'equator-out'    ? 2
       : 0;
}

function _buildUniforms({ lineColor, lineColorB, opacity, emissiveIntensity, numRings, stagger,
                          ringFade, invert, warpAmount, direction, colorSpread, brightSpread,
                          flickerAmp, flickerSpeed, arcColorSpread, scrollSpeed, scrollAxis,
                          gradientMode, jitter }) {
  return {
    uProgress:          { value: 0.0 },
    uNumRings:          { value: numRings },
    uStagger:           { value: stagger },
    uRingFade:          { value: ringFade },
    uInvert:            { value: invert ?? 0.0 },
    uOpacity:           { value: opacity },
    uEmissiveIntensity: { value: emissiveIntensity },
    uColor:             { value: new THREE.Color(lineColor) },
    uColorB:            { value: new THREE.Color(lineColorB ?? lineColor) },
    uDirection:         { value: _directionIndex(direction) },
    uWarpAmount:        { value: warpAmount },
    uColorSpread:       { value: colorSpread },
    uBrightSpread:      { value: brightSpread },
    uFlickerAmp:        { value: flickerAmp },
    uFlickerSpeed:      { value: flickerSpeed },
    uTime:              { value: 0.0 },
    uArcColorSpread:    { value: arcColorSpread ?? 0.0 },
    uScrollSpeed:       { value: scrollSpeed ?? 0.0 },
    uScrollAxis:        { value: scrollAxis ?? 0 },
    uGradientMode:      { value: gradientMode ?? 0 },
    uJitter:            { value: jitter ?? 0.0 },
  };
}

// ── Factory: GLSL3 ShaderMaterial (legacy, for THREE.LineSegments) ────────────

/**
 * @param {object} opts
 * @param {number}  opts.lineColor
 * @param {number}  [opts.lineColorB]
 * @param {number}  opts.lineWidth
 * @param {number}  opts.opacity
 * @param {number}  opts.emissiveIntensity
 * @param {number}  opts.numRings
 * @param {number}  opts.stagger
 * @param {number}  opts.ringFade
 * @param {number}  opts.warpAmount
 * @param {string}  opts.direction
 * @param {number}  opts.colorSpread
 * @param {number}  opts.brightSpread
 * @param {number}  opts.flickerAmp
 * @param {number}  opts.flickerSpeed
 * @param {THREE.Blending} opts.blending
 * @returns {THREE.ShaderMaterial}
 */
export function createRingMaterial(opts) {
  const { lineWidth, blending } = opts;
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader:   _vertexShader,
    fragmentShader: _fragmentShader,
    transparent: true,
    depthWrite:  false,
    blending,
    side:      THREE.FrontSide,
    linewidth:  lineWidth,
    uniforms:   _buildUniforms(opts),
  });
}

// ── Factory: LineMaterial (Line2 path) ────────────────────────────────────────

/**
 * Injects ring reveal logic into a compiled LineMaterial shader via onBeforeCompile.
 * @param {{ vertexShader: string, fragmentShader: string, uniforms: object }} shader
 */
function _injectRingRevealShader(shader) {
  // Guard: warn if Three.js changed the injection point strings
  if (!shader.vertexShader.includes('vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )')) {
    console.warn('[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version.');
  }

  // 1. Global scope: declare per-instance attribute, varyings, uniforms, helpers
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${RING_UNIFORM_DECLARATIONS}
${RING_HELPER_FUNCTIONS}`
  );

  // 2. Inject ring reveal prelude + scroll rotation + warp into instanceStart/instanceEnd
  shader.vertexShader = shader.vertexShader.replace(
    'vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );',
    `float _scrollOff = uTime * uScrollSpeed;
    float _R = length(instanceStart);
    float _normPos;
    if (uScrollAxis == 1) {
      _normPos = mod(instanceStart.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
    } else {
      _normPos = mod(instanceStart.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
    }
    ${RING_REVEAL_VERTEX_PRELUDE}
    vec3 _rStart, _rEnd;
    if (uScrollAxis == 1) {
      // Latitude: translate rings up/down — all verts on a ring share the same Y
      float _sy = instanceStart.y / _R;
      float _sc = sqrt(max(1e-6, 1.0 - _sy*_sy));
      float _ny = mod(_sy + _scrollOff + 1.0, 2.0) - 1.0;
      float _ys = sqrt(max(1e-6, 1.0 - _ny*_ny)) / _sc;
      _rStart = vec3(instanceStart.x * _ys, _ny * _R, instanceStart.z * _ys);
      _rEnd   = vec3(instanceEnd.x   * _ys, _ny * _R, instanceEnd.z   * _ys);
    } else {
      // Longitude: translate parallel vertical rings left/right — all verts share the same X
      float _sx = instanceStart.x / _R;
      float _sc = sqrt(max(1e-6, 1.0 - _sx*_sx));
      float _nx = mod(_sx + _scrollOff + 1.0, 2.0) - 1.0;
      float _xs = sqrt(max(1e-6, 1.0 - _nx*_nx)) / _sc;
      _rStart = vec3(_nx * _R, instanceStart.y * _xs, instanceStart.z * _xs);
      _rEnd   = vec3(_nx * _R, instanceEnd.y   * _xs, instanceEnd.z   * _xs);
    }
    vec4 start = modelViewMatrix * vec4( _rStart * warpScale, 1.0 );`
  );
  shader.vertexShader = shader.vertexShader.replace(
    'vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );',
    `vec4 end = modelViewMatrix * vec4( _rEnd * warpScale, 1.0 );`
  );

  // 3. Fragment: declare varyings and custom uniforms in global scope
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `#include <common>
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
uniform float uOpacity;
uniform float uEmissiveIntensity;`
  );

  // 4. Fragment: replace colour output with our reveal colour
  shader.fragmentShader = shader.fragmentShader.replace(
    'gl_FragColor = vec4( diffuseColor.rgb, alpha );',
    `if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`
  );
}

/**
 * @param {object} opts
 * @param {number}  opts.lineColor
 * @param {number}  [opts.lineColorB]
 * @param {number}  opts.lineWidth       - actual CSS pixels (works on all platforms)
 * @param {number}  opts.opacity
 * @param {number}  opts.emissiveIntensity
 * @param {number}  opts.numRings
 * @param {number}  opts.stagger
 * @param {number}  opts.ringFade
 * @param {number}  opts.warpAmount
 * @param {string}  opts.direction
 * @param {number}  opts.colorSpread
 * @param {number}  opts.brightSpread
 * @param {number}  opts.flickerAmp
 * @param {number}  opts.flickerSpeed
 * @param {THREE.Blending} opts.blending
 * @param {THREE.Vector2} opts.resolution - canvas size for screen-space linewidth
 * @returns {LineMaterial}
 */
export function createLine2RingMaterial(opts) {
  const { lineWidth, blending, resolution } = opts;
  const mat = new LineMaterial({
    color:       0xffffff,   // white — our shader owns all colour output
    linewidth:   lineWidth,  // true pixel width, not capped at 1
    transparent: true,
    depthWrite:  false,
    blending,
    worldUnits:  false,      // screen-space pixels
    resolution:  resolution ?? new THREE.Vector2(
      typeof window !== 'undefined' ? window.innerWidth  : 1920,
      typeof window !== 'undefined' ? window.innerHeight : 1080,
    ),
  });

  // Add our custom uniforms before compilation
  Object.assign(mat.uniforms, _buildUniforms(opts));

  mat.onBeforeCompile = (shader) => {
    // Forward our custom uniforms into the compiled program
    Object.assign(shader.uniforms, mat.uniforms);
    _injectRingRevealShader(shader);
  };

  return mat;
}
