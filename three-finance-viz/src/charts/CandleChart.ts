// src/charts/CandleChart.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine, CandleTransform } from '../layout/LayoutEngine';
import type { LinearLayout } from '../layout/LinearLayout';
import {
  BODY_GEO_HIGH,
  BODY_GEO_LOW,
  WICK_GEO_HIGH,
  WICK_GEO_LOW,
  retainSharedGeometry,
  releaseSharedGeometry,
} from './sharedGeometry';

export interface Disposable {
  dispose(): void;
}

// Module-level scratch objects — never allocate in the per-instance hot path
const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat = new THREE.Quaternion();

const BLOOM_LAYER = 1;

export class CandleChart implements Disposable {
  readonly bullBodyMesh: THREE.InstancedMesh;
  readonly bearBodyMesh: THREE.InstancedMesh;
  readonly bullWickMesh: THREE.InstancedMesh;
  readonly bearWickMesh: THREE.InstancedMesh;

  private bullSlot: Int32Array;
  private bearSlot: Int32Array;
  private bullRevMap: Int32Array;
  private bearRevMap: Int32Array;
  private bullCount = 0;
  private bearCount = 0;

  private _bullBodyColor = new THREE.Color();
  private _bearBodyColor = new THREE.Color();
  private _bullWickColor = new THREE.Color();
  private _bearWickColor = new THREE.Color();

  private _currentLOD: 'high' | 'low' = 'high';

  // Dirty slot tracking for partial buffer uploads
  dirtyBullSlots = new Map<number, number>(); // slot → count
  dirtyBearSlots = new Map<number, number>();

  // Scratch transform object reused across the update loop
  private _scratchTransform: CandleTransform = {
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    normal: new THREE.Vector3(),
  };

  constructor(
    private deps: {
      scene: THREE.Scene;
      buffer: CandleBuffer;
      layout: LayoutEngine;
      theme: ChartTheme;
      maxCandles: number;
    },
  ) {
    const { maxCandles, theme, scene } = deps;

    retainSharedGeometry();

    const bullMat = new THREE.MeshStandardMaterial({ color: theme.candle.bullBody });
    const bearMat = new THREE.MeshStandardMaterial({ color: theme.candle.bearBody });
    const bullWickMat = new THREE.MeshStandardMaterial({ color: theme.candle.bullWick });
    const bearWickMat = new THREE.MeshStandardMaterial({ color: theme.candle.bearWick });

    this.bullBodyMesh = new THREE.InstancedMesh(BODY_GEO_HIGH, bullMat, maxCandles);
    this.bearBodyMesh = new THREE.InstancedMesh(BODY_GEO_HIGH, bearMat, maxCandles);
    this.bullWickMesh = new THREE.InstancedMesh(WICK_GEO_HIGH, bullWickMat, maxCandles);
    this.bearWickMesh = new THREE.InstancedMesh(WICK_GEO_HIGH, bearWickMat, maxCandles);

    // Bloom layer setup
    this.bullBodyMesh.layers.set(BLOOM_LAYER);
    this.bearBodyMesh.layers.set(0);
    this.bullWickMesh.layers.set(BLOOM_LAYER);
    this.bearWickMesh.layers.set(0);

    // Disable frustum culling — managed manually via .count
    this.bullBodyMesh.frustumCulled = false;
    this.bearBodyMesh.frustumCulled = false;
    this.bullWickMesh.frustumCulled = false;
    this.bearWickMesh.frustumCulled = false;

    // Start with 0 visible instances
    this.bullBodyMesh.count = 0;
    this.bearBodyMesh.count = 0;
    this.bullWickMesh.count = 0;
    this.bearWickMesh.count = 0;

    scene.add(this.bullBodyMesh, this.bearBodyMesh, this.bullWickMesh, this.bearWickMesh);

    this.bullSlot = new Int32Array(maxCandles).fill(-1);
    this.bearSlot = new Int32Array(maxCandles).fill(-1);
    this.bullRevMap = new Int32Array(maxCandles).fill(-1);
    this.bearRevMap = new Int32Array(maxCandles).fill(-1);

    this.applyThemeColors(theme);
  }

  applyThemeColors(theme: ChartTheme): void {
    this._bullBodyColor.set(theme.candle.bullBody);
    this._bearBodyColor.set(theme.candle.bearBody);
    this._bullWickColor.set(theme.candle.bullWick);
    this._bearWickColor.set(theme.candle.bearWick);
  }

  /** @internal Used for hot-path color lookup without allocation */
  _colorForSlot(isBull: boolean, isBody: boolean): THREE.Color {
    if (isBull) return isBody ? this._bullBodyColor : this._bullWickColor;
    return isBody ? this._bearBodyColor : this._bearWickColor;
  }

  /** Swap candle i from bear → bull (or assign fresh on first call) */
  private _assignBull(i: number): void {
    if (this.bearSlot[i] !== -1) this._freeBear(i);
    if (this.bullSlot[i] === -1) {
      const s = this.bullCount++;
      this.bullSlot[i] = s;
      this.bullRevMap[s] = i;
    }
  }

  /** Swap candle i from bull → bear */
  private _assignBear(i: number): void {
    if (this.bullSlot[i] !== -1) this._freeBull(i);
    if (this.bearSlot[i] === -1) {
      const s = this.bearCount++;
      this.bearSlot[i] = s;
      this.bearRevMap[s] = i;
    }
  }

  private _freeBull(i: number): void {
    const slot = this.bullSlot[i];
    if (slot === -1) return;
    const lastSlot = this.bullCount - 1;
    const lastCandle = this.bullRevMap[lastSlot];
    if (slot !== lastSlot) {
      this.bullSlot[lastCandle] = slot;
      this.bullRevMap[slot] = lastCandle;
      this._copyBullSlot(lastSlot, slot);
    }
    this.bullSlot[i] = -1;
    this.bullRevMap[lastSlot] = -1;
    this.bullCount--;
  }

  private _freeBear(i: number): void {
    const slot = this.bearSlot[i];
    if (slot === -1) return;
    const lastSlot = this.bearCount - 1;
    const lastCandle = this.bearRevMap[lastSlot];
    if (slot !== lastSlot) {
      this.bearSlot[lastCandle] = slot;
      this.bearRevMap[slot] = lastCandle;
      this._copyBearSlot(lastSlot, slot);
    }
    this.bearSlot[i] = -1;
    this.bearRevMap[lastSlot] = -1;
    this.bearCount--;
  }

  private _copyBullSlot(fromSlot: number, toSlot: number): void {
    const m = new THREE.Matrix4();
    this.bullBodyMesh.getMatrixAt(fromSlot, m);
    this.bullBodyMesh.setMatrixAt(toSlot, m);
    this.bullWickMesh.getMatrixAt(fromSlot, m);
    this.bullWickMesh.setMatrixAt(toSlot, m);
  }

  private _copyBearSlot(fromSlot: number, toSlot: number): void {
    const m = new THREE.Matrix4();
    this.bearBodyMesh.getMatrixAt(fromSlot, m);
    this.bearBodyMesh.setMatrixAt(toSlot, m);
    this.bearWickMesh.getMatrixAt(fromSlot, m);
    this.bearWickMesh.setMatrixAt(toSlot, m);
  }

  private _updateInstance(i: number): void {
    const buf = this.deps.buffer;
    const layout = this.deps.layout;
    const out = this._scratchTransform;

    layout.getCandleTransform(i, buf, out);

    const open = buf.open(i);
    const high = buf.high(i);
    const low = buf.low(i);
    const close = buf.close(i);
    const isBull = close >= open;
    const candleWidth = layout.getCandleWidth(buf);

    const bodyHeight = Math.max(Math.abs(close - open), 0.001);
    const bodyY = out.position.y + (isBull ? open + bodyHeight / 2 : close + bodyHeight / 2);
    const wickHeight = Math.max(high - low, 0.001);
    const wickY = out.position.y + low + wickHeight / 2;

    if (isBull) {
      this._assignBull(i);
      const slot = this.bullSlot[i];

      _pos.set(out.position.x, bodyY, out.position.z);
      _scale.set(candleWidth, bodyHeight, candleWidth);
      _quat.copy(out.quaternion);
      _mat4.compose(_pos, _quat, _scale);
      this.bullBodyMesh.setMatrixAt(slot, _mat4);
      this.bullBodyMesh.setColorAt(slot, this._bullBodyColor);

      _pos.set(out.position.x, wickY, out.position.z);
      _scale.set(candleWidth * 0.15, wickHeight, candleWidth * 0.15);
      _mat4.compose(_pos, _quat, _scale);
      this.bullWickMesh.setMatrixAt(slot, _mat4);
      this.bullWickMesh.setColorAt(slot, this._bullWickColor);

      this.dirtyBullSlots.set(slot, 1);
    } else {
      this._assignBear(i);
      const slot = this.bearSlot[i];

      _pos.set(out.position.x, bodyY, out.position.z);
      _scale.set(candleWidth, bodyHeight, candleWidth);
      _quat.copy(out.quaternion);
      _mat4.compose(_pos, _quat, _scale);
      this.bearBodyMesh.setMatrixAt(slot, _mat4);
      this.bearBodyMesh.setColorAt(slot, this._bearBodyColor);

      _pos.set(out.position.x, wickY, out.position.z);
      _scale.set(candleWidth * 0.15, wickHeight, candleWidth * 0.15);
      _mat4.compose(_pos, _quat, _scale);
      this.bearWickMesh.setMatrixAt(slot, _mat4);
      this.bearWickMesh.setColorAt(slot, this._bearWickColor);

      this.dirtyBearSlots.set(slot, 1);
    }
  }

  private _flushDirty(): void {
    if (this.dirtyBullSlots.size > 0) {
      this.bullBodyMesh.instanceMatrix.needsUpdate = true;
      if (this.bullBodyMesh.instanceColor) this.bullBodyMesh.instanceColor.needsUpdate = true;
      this.bullWickMesh.instanceMatrix.needsUpdate = true;
      if (this.bullWickMesh.instanceColor) this.bullWickMesh.instanceColor.needsUpdate = true;
      this.dirtyBullSlots.clear();
    }
    if (this.dirtyBearSlots.size > 0) {
      this.bearBodyMesh.instanceMatrix.needsUpdate = true;
      if (this.bearBodyMesh.instanceColor) this.bearBodyMesh.instanceColor.needsUpdate = true;
      this.bearWickMesh.instanceMatrix.needsUpdate = true;
      if (this.bearWickMesh.instanceColor) this.bearWickMesh.instanceColor.needsUpdate = true;
      this.dirtyBearSlots.clear();
    }

    // Update visible counts
    this.bullBodyMesh.count = this.bullCount;
    this.bearBodyMesh.count = this.bearCount;
    this.bullWickMesh.count = this.bullCount;
    this.bearWickMesh.count = this.bearCount;
  }

  /** Rebuild instance matrices + colors for candle indices [start, end) */
  updateRange(start: number, end: number): void {
    for (let i = start; i < end; i++) {
      this._updateInstance(i);
    }
    this._flushDirty();
  }

  /** Append one candle; updates slot maps; calls updateRange for that slot */
  append(candle: OHLCVCandle): void {
    const i = this.deps.buffer.append(candle);
    this._updateInstance(i);
    this._flushDirty();
  }

  /** O(1): patch close/high/low/volume for the last slot only */
  patchLast(partial: Partial<OHLCVCandle>): void {
    const buf = this.deps.buffer;
    if (buf.count === 0) return;
    const i = buf.count - 1;
    const o = buf.open(i);
    const h = partial.high !== undefined ? Math.max(buf.high(i), partial.high) : buf.high(i);
    const l = partial.low !== undefined ? Math.min(buf.low(i), partial.low) : buf.low(i);
    const c = partial.close ?? buf.close(i);
    const v =
      partial.volume !== undefined ? buf.volume(i) + partial.volume : buf.volume(i);
    buf.set(i, o, h, l, c, v);
    buf.flags[i] = c >= o ? 1 : 0;
    this._updateInstance(i);
    this._flushDirty();
  }

  /** Map (mesh, instanceId) → candle buffer index for raycasting */
  slotToCandleIndex(mesh: THREE.InstancedMesh, instanceId: number): number {
    if (mesh === this.bullBodyMesh || mesh === this.bullWickMesh) {
      return this.bullRevMap[instanceId];
    }
    return this.bearRevMap[instanceId];
  }

  /**
   * Allocates and returns a new OHLCVCandle snapshot.
   * Use for event payloads and tooltip display (low-frequency paths only).
   */
  getCandle(index: number): OHLCVCandle {
    const c: OHLCVCandle = { time: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };
    this.deps.buffer.fillCandle(index, c);
    return c;
  }

  /** Expose bull meshes so PostProcessingPipeline can add them to bloom */
  getBullMeshes(): THREE.InstancedMesh[] {
    return [this.bullBodyMesh, this.bullWickMesh];
  }

  /** Called by FinanceChart render loop */
  updateLOD(cameraDistance: number): void {
    const next: 'high' | 'low' = cameraDistance > 200 ? 'low' : 'high';
    if (next === this._currentLOD) return;
    this._currentLOD = next;
    const bodyGeo = next === 'high' ? BODY_GEO_HIGH : BODY_GEO_LOW;
    const wickGeo = next === 'high' ? WICK_GEO_HIGH : WICK_GEO_LOW;
    this.bullBodyMesh.geometry = bodyGeo;
    this.bearBodyMesh.geometry = bodyGeo;
    this.bullWickMesh.geometry = wickGeo;
    this.bearWickMesh.geometry = wickGeo;
    // Force re-upload of geometry on next draw
    bodyGeo.attributes['position'].needsUpdate = true;
    wickGeo.attributes['position'].needsUpdate = true;
  }

  onThemeChange(theme: ChartTheme): void {
    this.applyThemeColors(theme);
    // Rebuild all instances with new colors
    this.updateRange(0, this.deps.buffer.count);
  }

  onLayoutChange(layout: LayoutEngine): void {
    this.deps = { ...this.deps, layout };
    // Rebuild all instances with new layout
    this.bullCount = 0;
    this.bearCount = 0;
    this.bullSlot.fill(-1);
    this.bearSlot.fill(-1);
    this.bullRevMap.fill(-1);
    this.bearRevMap.fill(-1);
    this.updateRange(0, this.deps.buffer.count);
  }

  /** Viewport count culling for linear layout — called externally if needed */
  updateVisibleCount(): void {
    const layout = this.deps.layout as LinearLayout & { opts?: { candleSpacing: number } };
    if (!layout.opts?.candleSpacing) return;
    // Simplified: just show all
    this.bullBodyMesh.count = this.bullCount;
    this.bearBodyMesh.count = this.bearCount;
    this.bullWickMesh.count = this.bullCount;
    this.bearWickMesh.count = this.bearCount;
  }

  dispose(): void {
    this.deps.scene.remove(
      this.bullBodyMesh,
      this.bearBodyMesh,
      this.bullWickMesh,
      this.bearWickMesh,
    );
    (this.bullBodyMesh.material as THREE.Material).dispose();
    (this.bearBodyMesh.material as THREE.Material).dispose();
    (this.bullWickMesh.material as THREE.Material).dispose();
    (this.bearWickMesh.material as THREE.Material).dispose();
    // Do NOT dispose shared geometry here — call releaseSharedGeometry() instead
    releaseSharedGeometry();
  }
}
