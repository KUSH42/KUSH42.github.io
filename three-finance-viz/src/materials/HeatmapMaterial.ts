// src/materials/HeatmapMaterial.ts
import * as THREE from 'three';

export function createHeatmapMaterial(colorLow: string, colorHigh: string): THREE.ShaderMaterial {
  const low = new THREE.Color(colorLow);
  const high = new THREE.Color(colorHigh);

  return new THREE.ShaderMaterial({
    uniforms: {
      uColorLow: { value: low },
      uColorHigh: { value: high },
    },
    vertexShader: `
      attribute float normValue;
      varying float vNormValue;
      void main() {
        vNormValue = normValue;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorLow;
      uniform vec3 uColorHigh;
      varying float vNormValue;
      void main() {
        vec3 color = mix(uColorLow, uColorHigh, vNormValue);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
    transparent: true,
  });
}
