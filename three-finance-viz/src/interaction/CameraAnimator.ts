// src/interaction/CameraAnimator.ts
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

export class CameraAnimator {
  private active = false;
  private startPos = new THREE.Vector3();
  private endPos = new THREE.Vector3();
  private startTgt = new THREE.Vector3();
  private endTgt = new THREE.Vector3();
  private elapsed = 0;
  private duration = 1200;

  constructor(
    private readonly camera: THREE.PerspectiveCamera,
    private readonly controls: OrbitControls,
  ) {}

  /** Smoothly move camera to `position` while pivoting `lookAt` */
  flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, durationMs = 1200): void {
    this.startPos.copy(this.camera.position);
    this.startTgt.copy(this.controls.target);
    this.endPos.copy(position);
    this.endTgt.copy(lookAt);
    this.elapsed = 0;
    this.duration = durationMs;
    this.active = true;
    this.controls.enabled = false;
  }

  /** Call from animation loop with frame delta in milliseconds */
  update(deltaMs: number): void {
    if (!this.active) return;
    this.elapsed = Math.min(this.elapsed + deltaMs, this.duration);
    const t = this._easeInOutCubic(this.elapsed / this.duration);
    this.camera.position.lerpVectors(this.startPos, this.endPos, t);
    this.controls.target.lerpVectors(this.startTgt, this.endTgt, t);
    this.controls.update();
    if (this.elapsed >= this.duration) {
      this.active = false;
      this.controls.enabled = true;
    }
  }

  /**
   * Snap camera to a position on a CatmullRomCurve3 for tunnel fly-through.
   * Call each frame, advancing `t` by `speed * deltaMs`.
   * This is a one-shot placement, not an animation — use `flyTo` for transitions.
   */
  followCurve(curve: THREE.CatmullRomCurve3, t: number, lookAheadDelta = 0.002): void {
    curve.getPointAt(t, this.camera.position);
    const target = new THREE.Vector3();
    curve.getPointAt(Math.min(1, t + lookAheadDelta), target);
    this.camera.lookAt(target);
  }

  get isAnimating(): boolean {
    return this.active;
  }

  private _easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}
