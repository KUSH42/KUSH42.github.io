// src/interaction/TooltipSystem.ts
import * as THREE from 'three';
import { CrosshairManager } from './CrosshairManager';
import type { TroikaLabelPool } from '../labels/TroikaLabelPool';
import type { OHLCV, ScaleSet } from '../types/addendum';

export class TooltipSystem {
  private raycaster   = new THREE.Raycaster();
  private mouse       = new THREE.Vector2();
  private tooltipEl:  HTMLElement;
  private crosshair:  CrosshairManager;
  private hitPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private hitPoint    = new THREE.Vector3();
  private enabled     = true;

  // Bound event handler refs for cleanup
  private _onMouseMove: (e: MouseEvent) => void;
  private _onMouseLeave: () => void;

  constructor(
    private renderer:   THREE.WebGLRenderer,
    scene:              THREE.Scene,
    private camera:     THREE.Camera,
    private data:       OHLCV[],
    labelPool:          TroikaLabelPool,
    private scales:     ScaleSet,
    private positionFn: (i: number) => THREE.Vector3,
  ) {
    this.tooltipEl = this._createTooltipDOM();
    document.body.appendChild(this.tooltipEl);
    this.crosshair = new CrosshairManager(
      scene, labelPool,
      new THREE.Vector2(renderer.domElement.clientWidth, renderer.domElement.clientHeight),
    );

    this._onMouseMove  = this.onMouseMove.bind(this);
    this._onMouseLeave = () => this._hide();
    renderer.domElement.addEventListener('mousemove',  this._onMouseMove);
    renderer.domElement.addEventListener('mouseleave', this._onMouseLeave);
  }

  /** Process mouse move event — update crosshair and tooltip */
  onMouseMove(event: MouseEvent): void {
    if (!this.enabled) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width)  *  2 - 1;
    this.mouse.y = ((event.clientY - rect.top)  / rect.height) * -2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // intersectPlane returns THREE.Vector3 | null
    const intersected = this.raycaster.ray.intersectPlane(this.hitPlane, this.hitPoint);
    if (!intersected) return;

    const index = this._worldXToIndex(this.hitPoint.x);
    if (index < 0 || index >= this.data.length) return;

    const price = this.scales.priceInverse(this.hitPoint.y);

    this._updateCrosshair(index, this.hitPoint.y, price);
    this._updateTooltip(event.clientX, event.clientY, index, price);
  }

  /**
   * Programmatically set crosshair to a specific candle index
   * @param index - Candle index
   */
  setCrosshairIndex(index: number): void {
    if (index < 0 || index >= this.data.length) return;
    const candle = this.data[index];
    const worldY = this.scales.price(candle.close);
    this._updateCrosshair(index, worldY, candle.close);
  }

  /**
   * Enable or disable tooltip and crosshair
   * @param enabled - Whether to enable
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) this._hide();
  }

  dispose(): void {
    this.tooltipEl.remove();
    this.crosshair.dispose();
    this.renderer.domElement.removeEventListener('mousemove',  this._onMouseMove);
    this.renderer.domElement.removeEventListener('mouseleave', this._onMouseLeave);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private _worldXToIndex(worldX: number): number {
    let lo = 0, hi = this.data.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.positionFn(mid).x < worldX) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0) {
      const dLo   = Math.abs(this.positionFn(lo).x - worldX);
      const dPrev = Math.abs(this.positionFn(lo - 1).x - worldX);
      return dPrev < dLo ? lo - 1 : lo;
    }
    return lo;
  }

  private _updateCrosshair(index: number, worldY: number, _price: number): void {
    const pos    = this.positionFn(index);
    const candle = this.data[index];
    const price  = this.scales.priceInverse(worldY);
    this.crosshair.setPosition(
      pos.x, worldY, pos.z,
      price.toFixed(2),
      new Date(candle.timestamp).toLocaleString(),
    );
    this.crosshair.setVisible(true);
  }

  private _updateTooltip(px: number, py: number, index: number, _price: number): void {
    const candle = this.data[index];
    const isBull = candle.close >= candle.open;

    this.tooltipEl.innerHTML = `
      <div class="tt-header">${new Date(candle.timestamp).toLocaleString()}</div>
      <table class="tt-table">
        <tr><td>O</td><td class="tt-val">${candle.open.toFixed(2)}</td></tr>
        <tr><td>H</td><td class="tt-val">${candle.high.toFixed(2)}</td></tr>
        <tr><td>L</td><td class="tt-val">${candle.low.toFixed(2)}</td></tr>
        <tr class="${isBull ? 'tt-bull' : 'tt-bear'}">
          <td>C</td><td class="tt-val">${candle.close.toFixed(2)}</td>
        </tr>
        <tr><td>V</td><td class="tt-val">${this._fmtVolume(candle.volume)}</td></tr>
      </table>
    `;

    const W = window.innerWidth, H = window.innerHeight;
    const tw = 180, th = 160;
    const left = px + 16 + tw > W ? px - tw - 8 : px + 16;
    const top  = py + th > H      ? py - th - 8  : py + 8;

    this.tooltipEl.style.transform = `translate(${left}px, ${top}px)`;
    this.tooltipEl.style.opacity   = '1';
    this.tooltipEl.style.display   = 'block';
  }

  private _hide(): void {
    this.tooltipEl.style.opacity = '0';
    this.crosshair.setVisible(false);
  }

  private _createTooltipDOM(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 200;
      background: rgba(10,12,16,0.9); backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      padding: 8px 10px; color: #ccc; font-size: 11px;
      font-family: 'Roboto Mono', monospace; pointer-events: none;
      width: 170px; display: none; opacity: 0;
      transition: opacity 0.1s;
    `;
    return el;
  }

  private _fmtVolume(v: number): string {
    if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
    return v.toFixed(0);
  }
}
