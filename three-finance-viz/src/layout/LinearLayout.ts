// src/layout/LinearLayout.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class LinearLayout implements LayoutEngine {
  // Module-level static scratch objects for the output — callers reuse these
  private static readonly _idQuat = new THREE.Quaternion();
  private static readonly _fwdNorm = new THREE.Vector3(0, 0, 1);

  constructor(
    public readonly opts: {
      candleSpacing: number; // world units between candle centres, e.g. 0.5
      candleWidth: number; // default candleSpacing × 0.8
    },
  ) {}

  getCandleTransform(i: number, _buffer: CandleBuffer, out: CandleTransform): void {
    out.position.set(i * this.opts.candleSpacing, 0, 0);
    out.quaternion.copy(LinearLayout._idQuat);
    out.normal.copy(LinearLayout._fwdNorm);
  }

  getCandleWidth(_buffer: CandleBuffer): number {
    return this.opts.candleWidth;
  }

  getWorldBounds(buffer: CandleBuffer): THREE.Box3 {
    const xMax = (buffer.count - 1) * this.opts.candleSpacing;
    return new THREE.Box3(
      new THREE.Vector3(0, -1e9, -1),
      new THREE.Vector3(xMax, 1e9, 1),
    );
  }
}
