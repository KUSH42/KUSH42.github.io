// src/charts/OrderBookDepth.ts
import * as THREE from 'three';
import type { OrderBookSnapshot, OrderBookDelta } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { Disposable } from './CandleChart';
import { ColorMapper } from '../utils/ColorMapper';

const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat = new THREE.Quaternion(); // identity

export class OrderBookDepth implements Disposable {
  private bidMesh: THREE.InstancedMesh;
  private askMesh: THREE.InstancedMesh;

  private bids = new Map<number, number>(); // price → size
  private asks = new Map<number, number>();

  private bidTargetSizes: number[] = [];
  private askTargetSizes: number[] = [];
  private bidCurrentSizes: number[] = [];
  private askCurrentSizes: number[] = [];
  private sortedBidPrices: number[] = [];
  private sortedAskPrices: number[] = [];

  private _colorMapper = new ColorMapper();
  private _bidColor = new THREE.Color();
  private _askColor = new THREE.Color();

  constructor(
    private deps: {
      scene: THREE.Scene;
      theme: ChartTheme;
      priceRange: [number, number];
      maxLevels: number;
      depthAxis: 'z' | 'x';
      style: 'heatmap' | 'walls';
      lerpDuration: number;
    },
  ) {
    const { maxLevels, scene } = deps;

    const bidMat = new THREE.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: 0.8 });
    const askMat = new THREE.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: 0.8 });
    const geo = new THREE.BoxGeometry(1, 1, 1);

    this.bidMesh = new THREE.InstancedMesh(geo, bidMat, maxLevels);
    this.askMesh = new THREE.InstancedMesh(geo, askMat, maxLevels);

    this.bidMesh.frustumCulled = false;
    this.askMesh.frustumCulled = false;
    this.bidMesh.count = 0;
    this.askMesh.count = 0;

    scene.add(this.bidMesh, this.askMesh);
  }

  applySnapshot(snapshot: OrderBookSnapshot): void {
    this.bids.clear();
    this.asks.clear();

    for (const level of snapshot.bids) {
      this.bids.set(level.price, level.size);
    }
    for (const level of snapshot.asks) {
      this.asks.set(level.price, level.size);
    }

    this._rebuildArrays();
    this._uploadToGPU(1);
  }

  applyDelta(delta: OrderBookDelta): void {
    for (const change of delta.changes) {
      const map = change.side === 'bid' ? this.bids : this.asks;
      if (change.action === 'remove') {
        map.delete(change.price);
      } else {
        map.set(change.price, change.size);
      }
    }
    this._rebuildArrays();
  }

  private _rebuildArrays(): void {
    const { maxLevels, priceRange } = this.deps;
    const [minP, maxP] = priceRange;

    // Filter to price range and sort
    this.sortedBidPrices = Array.from(this.bids.keys())
      .filter((p) => p >= minP && p <= maxP)
      .sort((a, b) => b - a) // descending
      .slice(0, maxLevels);

    this.sortedAskPrices = Array.from(this.asks.keys())
      .filter((p) => p >= minP && p <= maxP)
      .sort((a, b) => a - b) // ascending
      .slice(0, maxLevels);

    this.bidTargetSizes = this.sortedBidPrices.map((p) => this.bids.get(p) ?? 0);
    this.askTargetSizes = this.sortedAskPrices.map((p) => this.asks.get(p) ?? 0);

    // Initialize current sizes if needed
    if (this.bidCurrentSizes.length !== this.bidTargetSizes.length) {
      this.bidCurrentSizes = [...this.bidTargetSizes];
    }
    if (this.askCurrentSizes.length !== this.askTargetSizes.length) {
      this.askCurrentSizes = [...this.askTargetSizes];
    }
  }

  /** Advance lerp towards target state — call from animation loop */
  update(deltaMs: number): void {
    const alpha = Math.min(1, deltaMs / this.deps.lerpDuration);
    let dirty = false;

    for (let i = 0; i < this.bidCurrentSizes.length; i++) {
      const diff = this.bidTargetSizes[i] - this.bidCurrentSizes[i];
      if (Math.abs(diff) > 0.0001) {
        this.bidCurrentSizes[i] += diff * alpha;
        dirty = true;
      }
    }
    for (let i = 0; i < this.askCurrentSizes.length; i++) {
      const diff = this.askTargetSizes[i] - this.askCurrentSizes[i];
      if (Math.abs(diff) > 0.0001) {
        this.askCurrentSizes[i] += diff * alpha;
        dirty = true;
      }
    }

    if (dirty) this._uploadToGPU(alpha);
  }

  private _uploadToGPU(_alpha: number): void {
    const { priceRange, depthAxis, theme } = this.deps;
    const [minP, maxP] = priceRange;
    const priceToY = (p: number) => ((p - minP) / (maxP - minP)) * 10;

    const maxBidSize = Math.max(...this.bidCurrentSizes, 1);
    const maxAskSize = Math.max(...this.askCurrentSizes, 1);

    for (let i = 0; i < this.sortedBidPrices.length; i++) {
      const price = this.sortedBidPrices[i];
      const size = this.bidCurrentSizes[i] ?? 0;
      const normSize = size / maxBidSize;
      const depthWidth = normSize * 3;
      const y = priceToY(price);

      const dz = depthAxis === 'z' ? depthWidth / 2 : 0;
      const dx = depthAxis === 'x' ? depthWidth / 2 : 0;

      _pos.set(-2 - dx, y, -dz);
      _scale.set(depthAxis === 'x' ? depthWidth : 0.3, 0.1, depthAxis === 'z' ? depthWidth : 0.3);
      _mat4.compose(_pos, _quat, _scale);
      this.bidMesh.setMatrixAt(i, _mat4);

      this._colorMapper.map(normSize, [0, 1], theme.orderBook.bidHeat, this._bidColor);
      this.bidMesh.setColorAt(i, this._bidColor);
    }

    for (let i = 0; i < this.sortedAskPrices.length; i++) {
      const price = this.sortedAskPrices[i];
      const size = this.askCurrentSizes[i] ?? 0;
      const normSize = size / maxAskSize;
      const depthWidth = normSize * 3;
      const y = priceToY(price);

      const dz = depthAxis === 'z' ? depthWidth / 2 : 0;
      const dx = depthAxis === 'x' ? depthWidth / 2 : 0;

      _pos.set(2 + dx, y, -dz);
      _scale.set(depthAxis === 'x' ? depthWidth : 0.3, 0.1, depthAxis === 'z' ? depthWidth : 0.3);
      _mat4.compose(_pos, _quat, _scale);
      this.askMesh.setMatrixAt(i, _mat4);

      this._colorMapper.map(normSize, [0, 1], theme.orderBook.askHeat, this._askColor);
      this.askMesh.setColorAt(i, this._askColor);
    }

    this.bidMesh.count = this.sortedBidPrices.length;
    this.askMesh.count = this.sortedAskPrices.length;

    this.bidMesh.instanceMatrix.needsUpdate = true;
    if (this.bidMesh.instanceColor) this.bidMesh.instanceColor.needsUpdate = true;
    this.askMesh.instanceMatrix.needsUpdate = true;
    if (this.askMesh.instanceColor) this.askMesh.instanceColor.needsUpdate = true;
  }

  dispose(): void {
    this.deps.scene.remove(this.bidMesh, this.askMesh);
    (this.bidMesh.geometry as THREE.BufferGeometry).dispose();
    (this.bidMesh.material as THREE.Material).dispose();
    (this.askMesh.material as THREE.Material).dispose();
  }
}
