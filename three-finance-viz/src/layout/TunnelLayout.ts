// src/layout/TunnelLayout.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class TunnelLayout implements LayoutEngine {
  private frames: ReturnType<THREE.CatmullRomCurve3['computeFrenetFrames']>;
  private frameCount: number;

  // Pre-allocated scratch — NO per-call allocation
  private _negT = new THREE.Vector3();
  private _m = new THREE.Matrix4();

  constructor(
    private curve: THREE.CatmullRomCurve3,
    private opts: {
      candleWidth: number;
      /** Number of Frenet frames to pre-compute. Default 10_000. */
      frameResolution?: number;
    },
  ) {
    this.frameCount = opts.frameResolution ?? 10_000;
    this.frames = curve.computeFrenetFrames(this.frameCount, false);
  }

  /**
   * Re-compute Frenet frames after the spline control points change.
   * Throttle calls — this is O(frameResolution) work.
   */
  rebuildFrames(): void {
    this.frames = this.curve.computeFrenetFrames(this.frameCount, false);
  }

  getCandleTransform(i: number, buf: CandleBuffer, out: CandleTransform): void {
    const t = buf.count > 1 ? i / (buf.count - 1) : 0;
    const fi = Math.min(this.frameCount - 1, Math.floor(t * this.frameCount));

    this.curve.getPointAt(t, out.position);
    out.normal.copy(this.frames.normals[fi]);

    const T = this.frames.tangents[fi];
    const N = this.frames.normals[fi];
    const B = this.frames.binormals[fi];

    // Negate tangent so the candle face looks toward the approaching viewer (t=0 side)
    this._negT.set(-T.x, -T.y, -T.z);
    // Build orthonormal basis — all three frame vectors are guaranteed unit length
    this._m.makeBasis(N, B, this._negT);
    out.quaternion.setFromRotationMatrix(this._m);
  }

  getCandleWidth(_buf: CandleBuffer): number {
    return this.opts.candleWidth;
  }

  getWorldBounds(_buf: CandleBuffer): THREE.Box3 {
    const pts = this.curve.getPoints(200);
    const box = new THREE.Box3();
    pts.forEach((p) => box.expandByPoint(p));
    return box;
  }
}
