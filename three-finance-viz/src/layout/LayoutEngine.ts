// src/layout/LayoutEngine.ts

import type * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';

export interface CandleTransform {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  /** Outward normal of the chart surface at this candle — used for label placement */
  normal: THREE.Vector3;
}

/**
 * Stateless, allocation-free layout engine.
 *
 * getCandleTransform MUST write into `out` rather than returning a new object.
 * Callers maintain a single scratch CandleTransform and reuse it across the loop.
 */
export interface LayoutEngine {
  getCandleTransform(index: number, buffer: CandleBuffer, out: CandleTransform): void;
  getCandleWidth(buffer: CandleBuffer): number;
  getWorldBounds(buffer: CandleBuffer): THREE.Box3;
}
