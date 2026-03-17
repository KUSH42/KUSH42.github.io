// src/ui/NavigatorBar.ts
import { throttle } from '../utils/timing';
import type { OHLCV } from '../types/addendum';

export class NavigatorBar {
  private canvas:     HTMLCanvasElement;
  private ctx:        CanvasRenderingContext2D;
  private allData:    OHLCV[];
  private rangeStart: number = 0.7;
  private rangeEnd:   number = 1.0;
  private dragging:   'start' | 'end' | 'window' | null = null;

  constructor(canvas: HTMLCanvasElement, allData: OHLCV[]) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d')!;
    this.allData = allData;
    this._bindDrag();
    this.draw();
  }

  /** Redraw the navigator minimap */
  draw(): void {
    const { width: w, height: h } = this.canvas;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, w, h);

    if (this.allData.length < 2) return;

    const n = this.allData.length;
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < n; i++) {
      const p = this.allData[i].close;
      if (p < min) min = p;
      if (p > max) max = p;
    }
    const range = max - min || 1; // Guard division by zero

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100,100,200,0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) {
      const p = this.allData[i].close;
      const x = (i / (n - 1)) * w;
      const y = h - ((p - min) / range) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    const sx = this.rangeStart * w, ex = this.rangeEnd * w;
    ctx.fillStyle = 'rgba(38,166,154,0.15)';
    ctx.fillRect(sx, 0, ex - sx, h);
    ctx.strokeStyle = '#26a69a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sx, 0, ex - sx, h);
  }

  private _bindDrag(): void {
    this.canvas.addEventListener('pointerdown', (e) => {
      const x = e.offsetX / this.canvas.width;
      if (Math.abs(x - this.rangeStart) < 0.015) this.dragging = 'start';
      else if (Math.abs(x - this.rangeEnd) < 0.015) this.dragging = 'end';
      else if (x > this.rangeStart && x < this.rangeEnd) this.dragging = 'window';
      if (this.dragging) this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', throttle((e: PointerEvent) => {
      if (!this.dragging) return;
      const dx = e.movementX / this.canvas.width;
      if (this.dragging === 'start') {
        this.rangeStart = Math.max(0, Math.min(this.rangeEnd - 0.05, this.rangeStart + dx));
      } else if (this.dragging === 'end') {
        this.rangeEnd = Math.min(1, Math.max(this.rangeStart + 0.05, this.rangeEnd + dx));
      } else {
        const span = this.rangeEnd - this.rangeStart;
        this.rangeStart = Math.max(0, Math.min(1 - span, this.rangeStart + dx));
        this.rangeEnd   = this.rangeStart + span;
      }
      this.draw();
      this._emitChange();
    }, 16));

    this.canvas.addEventListener('pointerup', () => { this.dragging = null; });
  }

  private _emitChange(): void {
    const n = this.allData.length - 1;
    // When rangeEnd=1.0: Math.floor(1.0 * (length-1)) = length-1 — correct upper bound
    const startIdx = Math.floor(this.rangeStart * n);
    const endIdx   = Math.min(n, Math.floor(this.rangeEnd * n));
    this.canvas.dispatchEvent(new CustomEvent('rangeChange', {
      detail: { startIndex: startIdx, endIndex: endIdx },
      bubbles: true,
    }));
  }

  /**
   * Resize the navigator canvas
   * @param width - New canvas width in pixels
   */
  resize(width: number): void {
    this.canvas.width = width;
    this.draw();
  }

  /**
   * Update the data and redraw
   * @param allData - New OHLCV data array
   */
  updateData(allData: OHLCV[]): void {
    this.allData = allData;
    this.draw();
  }
}
