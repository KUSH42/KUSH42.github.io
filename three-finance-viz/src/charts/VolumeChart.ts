// src/charts/VolumeChart.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine, CandleTransform } from '../layout/LayoutEngine';
import type { Disposable } from './CandleChart';
import { BODY_GEO_HIGH, retainSharedGeometry, releaseSharedGeometry } from './sharedGeometry';
import { parseThemeColor } from '../utils/MathUtils';

const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat = new THREE.Quaternion();

export class VolumeChart implements Disposable {
  private volMesh: THREE.InstancedMesh;
  private _maxVolume = 0;
  private _bullColor = new THREE.Color();
  private _bearColor = new THREE.Color();

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
      panelOffset: number;
      panelHeight: number;
    },
  ) {
    retainSharedGeometry();

    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: 0.7 });
    this.volMesh = new THREE.InstancedMesh(BODY_GEO_HIGH, mat, deps.maxCandles);
    this.volMesh.frustumCulled = false;
    this.volMesh.count = 0;
    deps.scene.add(this.volMesh);

    this._applyThemeColors(deps.theme);
  }

  private _applyThemeColors(theme: ChartTheme): void {
    const bull = parseThemeColor(theme.volume.bullBar);
    const bear = parseThemeColor(theme.volume.bearBar);
    this._bullColor.set(bull.hex);
    this._bearColor.set(bear.hex);
    // Apply averaged alpha to the shared material
    const mat = this.volMesh.material as THREE.MeshStandardMaterial;
    mat.opacity = (bull.alpha + bear.alpha) / 2;
  }

  recalculateScale(): void {
    const buf = this.deps.buffer;
    this._maxVolume = 0;
    for (let i = 0; i < buf.count; i++) {
      if (buf.volume(i) > this._maxVolume) this._maxVolume = buf.volume(i);
    }
  }

  private _updateInstance(i: number): void {
    const buf = this.deps.buffer;
    const layout = this.deps.layout;
    const out = this._scratchTransform;
    const { panelOffset, panelHeight } = this.deps;

    layout.getCandleTransform(i, buf, out);

    const vol = buf.volume(i);
    const normalizedH = this._maxVolume > 0 ? (vol / this._maxVolume) * panelHeight : 0.01;
    const candleWidth = layout.getCandleWidth(buf);
    const isBull = buf.close(i) >= buf.open(i);

    _pos.set(out.position.x, panelOffset + normalizedH / 2, out.position.z);
    _scale.set(candleWidth * 0.9, normalizedH, candleWidth * 0.9);
    _quat.copy(out.quaternion);
    _mat4.compose(_pos, _quat, _scale);
    this.volMesh.setMatrixAt(i, _mat4);
    this.volMesh.setColorAt(i, isBull ? this._bullColor : this._bearColor);
  }

  updateRange(start: number, end: number): void {
    for (let i = start; i < end; i++) {
      this._updateInstance(i);
    }
    this.volMesh.instanceMatrix.needsUpdate = true;
    if (this.volMesh.instanceColor) this.volMesh.instanceColor.needsUpdate = true;
    this.volMesh.count = this.deps.buffer.count;
  }

  append(candle: OHLCVCandle): void {
    const buf = this.deps.buffer;
    if (candle.volume > this._maxVolume) this._maxVolume = candle.volume;
    const i = buf.count - 1; // already appended to buffer by CandleChart.append
    this._updateInstance(i);
    this.volMesh.instanceMatrix.needsUpdate = true;
    if (this.volMesh.instanceColor) this.volMesh.instanceColor.needsUpdate = true;
    this.volMesh.count = buf.count;
  }

  patchLast(partial: Partial<OHLCVCandle>): void {
    const buf = this.deps.buffer;
    if (buf.count === 0) return;
    if (partial.volume !== undefined && partial.volume > this._maxVolume) {
      this._maxVolume = partial.volume;
    }
    const i = buf.count - 1;
    this._updateInstance(i);
    this.volMesh.instanceMatrix.needsUpdate = true;
    if (this.volMesh.instanceColor) this.volMesh.instanceColor.needsUpdate = true;
  }

  onThemeChange(theme: ChartTheme): void {
    this._applyThemeColors(theme);
    this.updateRange(0, this.deps.buffer.count);
  }

  onLayoutChange(layout: LayoutEngine): void {
    this.deps = { ...this.deps, layout };
    this.updateRange(0, this.deps.buffer.count);
  }

  dispose(): void {
    this.deps.scene.remove(this.volMesh);
    (this.volMesh.material as THREE.Material).dispose();
    releaseSharedGeometry();
  }
}
