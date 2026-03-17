/**
 * ShaderMaterial factory for ring reveal rings (base and glow layers).
 */

import * as THREE from 'three';

const vertexShader = /* glsl */`
in float ringIndex;
out float vAlpha;

uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingDuration;
uniform int   uDirection;
uniform float uWarpAmount;

void main() {
  float normRing;

  if (uDirection == 0) {
    // south → north
    normRing = ringIndex / (uNumRings - 1.0);
  } else if (uDirection == 1) {
    // north → south
    normRing = 1.0 - ringIndex / (uNumRings - 1.0);
  } else {
    // equator-out: equator (mid-index) reveals first, poles last
    normRing = abs(ringIndex / (uNumRings - 1.0) - 0.5) * 2.0;
  }

  float onset  = normRing * (1.0 - uRingDuration) * (1.0 - uStagger);
  float localT = clamp((uProgress - onset) / uRingDuration, 0.0, 1.0);

  vAlpha = smoothstep(0.0, 1.0, localT);

  // Radial warp: ring contracts from inside the sphere and snaps to its surface
  // radius with an easeOutBack curve, briefly overshooting outward before settling.
  // easeOutBack: f(0)=0, f(1)=1, overshoots ~8% around t=0.7
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  // warpScale goes from (1 - uWarpAmount) at localT=0 → brief overshoot → 1.0 at localT=1
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * warpScale, 1.0);
}
`;

const fragmentShader = /* glsl */`
in float vAlpha;
uniform vec3  uColor;
uniform float uOpacity;
uniform float uEmissiveIntensity;

out vec4 fragColor;

void main() {
  if (vAlpha < 0.001) discard;
  fragColor = vec4(uColor * uEmissiveIntensity, vAlpha * uOpacity);
}
`;

/**
 * @param {object} opts
 * @param {number}  opts.lineColor         - hex
 * @param {number}  opts.lineWidth
 * @param {number}  opts.opacity
 * @param {number}  opts.emissiveIntensity
 * @param {number}  opts.numRings
 * @param {number}  opts.stagger
 * @param {number}  opts.ringDuration
 * @param {number}  opts.warpAmount
 * @param {string}  opts.direction
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
    },
  });
}
