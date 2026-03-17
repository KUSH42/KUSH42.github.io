// src/materials/WickMaterial.ts
import * as THREE from 'three';

export function createWickMaterial(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.1,
  });
}
