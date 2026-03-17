// src/interaction/TimeRangeSelector.ts
import * as THREE from 'three';
import type { LinearLayout } from '../layout/LinearLayout';
import type { EventEmitter } from '../utils/EventEmitter';
import type { ChartEvents } from '../types/events';

export class TimeRangeSelector {
  private floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private raycaster = new THREE.Raycaster();
  private _isect = new THREE.Vector3(); // reused scratch
  private startWorld: THREE.Vector3 | null = null;

  constructor(
    private readonly camera: THREE.Camera,
    private readonly domElement: HTMLElement,
    private readonly layout: LinearLayout,
    private readonly events: EventEmitter<ChartEvents>,
  ) {
    domElement.addEventListener('pointerdown', this._onDown);
    domElement.addEventListener('pointerup', this._onUp);
  }

  private _worldFromEvent(e: PointerEvent): THREE.Vector3 | null {
    const rect = this.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    return this.raycaster.ray.intersectPlane(this.floorPlane, this._isect)
      ? this._isect.clone() // clone: startWorld must survive until pointerup
      : null;
  }

  private _onDown = (e: PointerEvent): void => {
    if (!e.shiftKey) return;
    this.startWorld = this._worldFromEvent(e);
  };

  private _onUp = (e: PointerEvent): void => {
    if (!this.startWorld) return;
    const endWorld = this._worldFromEvent(e);
    if (!endWorld) {
      this.startWorld = null;
      return;
    }
    const spacing = this.layout.opts.candleSpacing;
    const xA = Math.min(this.startWorld.x, endWorld.x);
    const xB = Math.max(this.startWorld.x, endWorld.x);
    this.events.emit('range:change', {
      startIndex: Math.max(0, Math.floor(xA / spacing)),
      endIndex: Math.floor(xB / spacing),
    });
    this.startWorld = null;
  };

  dispose(): void {
    this.domElement.removeEventListener('pointerdown', this._onDown);
    this.domElement.removeEventListener('pointerup', this._onUp);
  }
}
