// src/materials/CandleMaterial.ts
import * as THREE from 'three';

// Inline GLSL since we can't import .glsl files in TypeScript without vite
const candleVert = `
#include <instanced_pars_vertex>

varying vec3 vColor;

void main() {
  #include <instanced_vertex>
  vColor      = instanceColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const candleFrag = `
uniform float uBloomMask;
varying vec3  vColor;

void main() {
  gl_FragColor = vec4(vColor * uBloomMask, 1.0);
}
`;

export function createCandleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: candleVert,
    fragmentShader: candleFrag,
    uniforms: {
      uBloomMask: { value: 1.0 },
    },
  });
}
