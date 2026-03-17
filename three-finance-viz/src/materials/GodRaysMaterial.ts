// src/materials/GodRaysMaterial.ts
import * as THREE from 'three';

export function createGodRaysMaterial(color: string): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
