/**
 * ShaderMaterial factory for ring reveal rings (base and glow layers).
 */

import * as THREE from 'three';

const vertexShader = /* glsl */`
in float ringIndex;
out float vAlpha;
out vec3  vRingColor;
out float vFlickerMult;

uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingDuration;
uniform int   uDirection;
uniform float uWarpAmount;
uniform vec3  uColor;
uniform float uColorSpread;
uniform float uBrightSpread;
uniform float uFlickerAmp;
uniform float uFlickerSpeed;
uniform float uTime;

// ── colour helpers ───────────────────────────────────────────────────────────

float _hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

vec3 _hue2rgb(float h) {
  vec3 k = mod(vec3(0.0, 4.0, 2.0) + h * 6.0, 6.0);
  return clamp(min(k, 4.0 - k), 0.0, 1.0);
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

// ────────────────────────────────────────────────────────────────────────────

void main() {
  // ── reveal ──────────────────────────────────────────────────────────────
  float normRing;
  if (uDirection == 0) {
    normRing = ringIndex / (uNumRings - 1.0);
  } else if (uDirection == 1) {
    normRing = 1.0 - ringIndex / (uNumRings - 1.0);
  } else {
    normRing = abs(ringIndex / (uNumRings - 1.0) - 0.5) * 2.0;
  }

  float onset  = normRing * (1.0 - uRingDuration) * (1.0 - uStagger);
  float localT = clamp((uProgress - onset) / uRingDuration, 0.0, 1.0);
  vAlpha = smoothstep(0.0, 1.0, localT);

  // ── warp ────────────────────────────────────────────────────────────────
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * warpScale, 1.0);

  // ── per-ring colour variation ────────────────────────────────────────────
  float rng1 = _hash(ringIndex);           // hue offset seed
  float rng2 = _hash(ringIndex + 71.3);    // brightness offset seed
  float rng3 = _hash(ringIndex + 37.9);    // flicker phase seed

  vec3 hsl = _rgb2hsl(uColor);
  hsl.x = fract(hsl.x + (rng1 - 0.5) * uColorSpread);
  hsl.z = clamp(hsl.z + (rng2 - 0.5) * uBrightSpread, 0.02, 0.98);
  vRingColor = _hsl2rgb(hsl.x, hsl.y, hsl.z);

  // ── per-ring flicker ─────────────────────────────────────────────────────
  vFlickerMult = 1.0 + uFlickerAmp * sin(uTime * uFlickerSpeed + rng3 * 6.2832);
}
`;

const fragmentShader = /* glsl */`
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

/**
 * @param {object} opts
 * @param {number}  opts.lineColor
 * @param {number}  opts.lineWidth
 * @param {number}  opts.opacity
 * @param {number}  opts.emissiveIntensity
 * @param {number}  opts.numRings
 * @param {number}  opts.stagger
 * @param {number}  opts.ringDuration
 * @param {number}  opts.warpAmount
 * @param {string}  opts.direction
 * @param {number}  opts.colorSpread
 * @param {number}  opts.brightSpread
 * @param {number}  opts.flickerAmp
 * @param {number}  opts.flickerSpeed
 * @param {THREE.Blending} opts.blending
 * @returns {THREE.ShaderMaterial}
 */
export function createRingMaterial({
  lineColor,
  lineWidth,
  opacity,
  emissiveIntensity,
  numRings,
  stagger,
  ringDuration,
  warpAmount,
  direction,
  colorSpread,
  brightSpread,
  flickerAmp,
  flickerSpeed,
  blending,
}) {
  const directionIndex = direction === 'north-to-south' ? 1
                       : direction === 'equator-out'    ? 2
                       : 0;

  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite:  false,
    blending,
    side: THREE.FrontSide,
    linewidth: lineWidth,
    uniforms: {
      uProgress:          { value: 0.0 },
      uNumRings:          { value: numRings },
      uStagger:           { value: stagger },
      uRingDuration:      { value: ringDuration },
      uOpacity:           { value: opacity },
      uEmissiveIntensity: { value: emissiveIntensity },
      uColor:             { value: new THREE.Color(lineColor) },
      uDirection:         { value: directionIndex },
      uWarpAmount:        { value: warpAmount },
      uColorSpread:       { value: colorSpread },
      uBrightSpread:      { value: brightSpread },
      uFlickerAmp:        { value: flickerAmp },
      uFlickerSpeed:      { value: flickerSpeed },
      uTime:              { value: 0.0 },
    },
  });
}
