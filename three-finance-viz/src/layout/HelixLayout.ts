// src/layout/HelixLayout.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class HelixLayout implements LayoutEngine {
  // Pre-allocated scratch for basis construction — not per-call allocation
  private _T = new THREE.Vector3();
  private _N = new THREE.Vector3();
  private _B = new THREE.Vector3();
  private _m = new THREE.Matrix4();

  constructor(
    private opts: {
      radius: number; // default 15
      angularStep: number; // radians per candle, default 0.025
      pitchPerCandle: number; // world-Y per candle, default 0.08
      candleWidth: number; // default 0.35
    },
  ) {}

  getCandleTransform(i: number, _buf: CandleBuffer, out: CandleTransform): void {
    const { radius: R, angularStep: dθ, pitchPerCandle: h } = this.opts;
    const angle = i * dθ;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    out.position.set(R * cosA, i * h, R * sinA);

    // Frenet inward normal (unit vector)
    this._N.set(-cosA, 0, -sinA);
    out.normal.copy(this._N);

    // Frenet tangent — derivative of position w.r.t. arc parameter, normalised
    const tLen = Math.sqrt(R * R * dθ * dθ + h * h);
    this._T.set((-R * sinA * dθ) / tLen, h / tLen, (R * cosA * dθ) / tLen);

    // Frenet binormal — cross product of unit tangent and unit normal
    this._B.crossVectors(this._T, this._N);
    // Note: _B is already unit length because T ⊥ N (see orthogonality proof in spec)

    // Three.js Matrix4.makeBasis(xAxis, yAxis, zAxis) sets the three column vectors.
    // Here: local-X = N (inward radial, candle "right"), local-Y = B (binormal,
    // candle "up"), local-Z = T (tangent, candle "depth").
    // This orients the candle face toward the inward-normal direction (viewer outside helix).
    this._m.makeBasis(this._N, this._B, this._T);
    out.quaternion.setFromRotationMatrix(this._m);
  }

  getCandleWidth(_buf: CandleBuffer): number {
    return this.opts.candleWidth;
  }

  getWorldBounds(buf: CandleBuffer): THREE.Box3 {
    const yMax = buf.count * this.opts.pitchPerCandle;
    const r = this.opts.radius;
    return new THREE.Box3(new THREE.Vector3(-r, 0, -r), new THREE.Vector3(r, yMax, r));
  }
}
