// src/interaction/CrosshairController.ts
import * as THREE from 'three';
import type { EventEmitter } from '../utils/EventEmitter';
import type { ChartEvents } from '../types/events';
import type { CandleChart } from '../charts/CandleChart';

export class CrosshairController {
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private lastHit: { mesh: THREE.InstancedMesh; instanceId: number } | null = null;
  private targets: THREE.InstancedMesh[] = [];

  constructor(
    private readonly camera: THREE.Camera,
    private readonly domElement: HTMLElement,
    private readonly events: EventEmitter<ChartEvents>,
    private readonly candleChart: CandleChart,
  ) {
    this.raycaster.params.Line = { threshold: 0.2 };
    domElement.addEventListener('pointermove', this._onMove, { passive: true });
    domElement.addEventListener('click', this._onClick);
  }

  registerTarget(mesh: THREE.InstancedMesh): void {
    this.targets.push(mesh);
  }

  private _onMove = (e: PointerEvent): void => {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.targets, false);

    if (hits.length > 0 && hits[0].instanceId !== undefined) {
      const mesh = hits[0].object as THREE.InstancedMesh;
      const instanceId = hits[0].instanceId;
      if (instanceId !== this.lastHit?.instanceId || mesh !== this.lastHit?.mesh) {
        this.lastHit = { mesh, instanceId };
        const idx = this.candleChart.slotToCandleIndex(mesh, instanceId);
        const candle = this.candleChart.getCandle(idx);
        this.events.emit('candle:hover', { index: idx, candle, worldPos: hits[0].point });
      }
    } else if (this.lastHit !== null) {
      this.lastHit = null;
      this.events.emit('candle:hover', null);
    }
  };

  private _onClick = (): void => {
    if (this.lastHit === null) return;
    const idx = this.candleChart.slotToCandleIndex(this.lastHit.mesh, this.lastHit.instanceId);
    const candle = this.candleChart.getCandle(idx);
    this.events.emit('candle:click', { index: idx, candle });
  };

  dispose(): void {
    this.domElement.removeEventListener('pointermove', this._onMove);
    this.domElement.removeEventListener('click', this._onClick);
    this.targets.length = 0;
  }
}
