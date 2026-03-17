// src/charts/sharedGeometry.ts
// Module-level singletons — allocated once, never disposed until full teardown

import * as THREE from 'three';

export const BODY_GEO_HIGH = new THREE.BoxGeometry(1, 1, 1);
export const BODY_GEO_LOW = new THREE.PlaneGeometry(1, 1); // billboard at distance
export const WICK_GEO_HIGH = new THREE.CylinderGeometry(0.05, 0.05, 1, 6);
export const WICK_GEO_LOW = new THREE.CylinderGeometry(0.02, 0.02, 1, 4);

let _refCount = 0;

export function retainSharedGeometry(): void {
  _refCount++;
}

export function releaseSharedGeometry(): void {
  if (--_refCount <= 0) {
    BODY_GEO_HIGH.dispose();
    BODY_GEO_LOW.dispose();
    WICK_GEO_HIGH.dispose();
    WICK_GEO_LOW.dispose();
  }
}
