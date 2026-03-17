/**
 * ShaderMaterial factory for ring reveal rings (base and glow layers).
 */

import * as THREE from 'three';

const vertexShader = /* glsl */`
attribute float ringIndex;
varying float vAlpha;

uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingDuration;
uniform int   uDirection;

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

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */`
varying float vAlpha;
uniform vec3  uColor;
uniform float uOpacity;
uniform float uEmissiveIntensity;

void main() {
  if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(uColor * uEmissiveIntensity, vAlpha * uOpacity);
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
    },
  });
}
