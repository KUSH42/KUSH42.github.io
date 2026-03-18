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
uniform float uRingDuration;
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
`;

/** HSL colour helpers shared between both factories. */
const RING_HELPER_FUNCTIONS = /* glsl */`
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
`;

/**
 * Ring reveal vertex prelude — computes normRing, localT, vAlpha, warpScale, vRingColor, vFlickerMult.
 * Injected into the vertex main() body before the position transform.
 * Requires: ringIndex (attribute), all uXxx uniforms, vAlpha/vRingColor/vFlickerMult (varyings).
 */
const RING_REVEAL_VERTEX_PRELUDE = /* glsl */`
  // ── reveal ────────────────────────────────────────────────────────────────
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

  // ── warp ──────────────────────────────────────────────────────────────────
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);

  // ── per-ring colour variation ──────────────────────────────────────────────
  float rng1 = _hash(ringIndex);
  float rng2 = _hash(ringIndex + 71.3);
  float rng3 = _hash(ringIndex + 37.9);
  vec3 gradientBase = mix(uColor, uColorB, normRing);
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
${RING_REVEAL_VERTEX_PRELUDE}
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * warpScale, 1.0);
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
                          ringDuration, warpAmount, direction, colorSpread, brightSpread,
                          flickerAmp, flickerSpeed, arcColorSpread }) {
  return {
    uProgress:          { value: 0.0 },
    uNumRings:          { value: numRings },
    uStagger:           { value: stagger },
    uRingDuration:      { value: ringDuration },
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

  // 2. Inject ring reveal prelude + apply warp to instanceStart/instanceEnd
  shader.vertexShader = shader.vertexShader.replace(
    'vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );',
    `${RING_REVEAL_VERTEX_PRELUDE}
    vec4 start = modelViewMatrix * vec4( instanceStart * warpScale, 1.0 );`
  );
  shader.vertexShader = shader.vertexShader.replace(
    'vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );',
    'vec4 end = modelViewMatrix * vec4( instanceEnd * warpScale, 1.0 );'
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
 * @param {number}  opts.ringDuration
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
