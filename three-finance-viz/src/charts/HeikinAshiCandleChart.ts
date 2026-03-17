// src/charts/HeikinAshiCandleChart.ts
import type * as THREE from 'three';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';
import type { ChartRenderer } from './ChartRenderer';
import { CandleBuffer } from '../types/CandleBuffer';
import { CandleChart } from './CandleChart';
import { HeikinAshiTransform } from './HeikinAshiTransform';

export class HeikinAshiCandleChart implements ChartRenderer {
  private _rawBuf: CandleBuffer;
  private _haBuf: CandleBuffer;
  private _xform: HeikinAshiTransform;
  private _candleChart: CandleChart;

  constructor(deps: {
    scene: THREE.Scene;
    buffer: CandleBuffer;
    layout: LayoutEngine;
    theme: ChartTheme;
    maxCandles: number;
    priceToWorldY: (price: number) => number;
  }) {
    this._rawBuf = deps.buffer;
    this._haBuf = new CandleBuffer(deps.maxCandles);
    this._xform = new HeikinAshiTransform(deps.maxCandles);

    this._candleChart = new CandleChart({
      scene: deps.scene,
      buffer: this._haBuf,
      layout: deps.layout,
      theme: deps.theme,
      maxCandles: deps.maxCandles,
      priceToWorldY: deps.priceToWorldY,
    });
  }

  private _syncHABuf(i: number): void {
    const haOpen  = this._xform.haOpen(i);
    const haHigh  = this._xform.haHigh(i);
    const haLow   = this._xform.haLow(i);
    const haClose = this._xform.haClose(i);
    const haVol   = this._xform.haVol(i);

    this._haBuf.set(i, haOpen, haHigh, haLow, haClose, haVol);
    this._haBuf.time[i]  = this._rawBuf.time[i];
    this._haBuf.flags[i] = haClose >= haOpen ? 1 : 0;
    this._haBuf.count    = this._rawBuf.count;
  }

  /** Delegates to the inner CandleChart so full buffer reloads start clean. */
  resetSlotMaps(): void {
    this._candleChart.resetSlotMaps();
  }

  updateRange(start: number, end: number): void {
    // Recompute HA for entire buffer, then sync the requested range
    this._xform.recompute(this._rawBuf);
    for (let i = 0; i < this._rawBuf.count; i++) {
      this._syncHABuf(i);
    }
    this._candleChart.updateRange(start, end);
  }

  append(_candle: OHLCVCandle): void {
    // The raw buffer already has this candle appended by FinanceChart
    const i = this._rawBuf.count - 1;
    this._xform.step(i, this._rawBuf);
    this._syncHABuf(i);
    this._candleChart.updateRange(i, i + 1);
  }

  patchLast(_partial: Partial<OHLCVCandle>): void {
    if (this._rawBuf.count === 0) return;
    const i = this._rawBuf.count - 1;
    this._xform.patchLast(i, this._rawBuf);
    this._syncHABuf(i);
    this._candleChart.updateRange(i, i + 1);
  }

  onLayoutChange(layout: LayoutEngine): void {
    this._candleChart.onLayoutChange(layout);
  }

  onThemeChange(theme: ChartTheme): void {
    this._candleChart.onThemeChange(theme);
  }

  setVisible(v: boolean): void {
    this._candleChart.setVisible(v);
  }

  updateLOD(cameraDistance: number): void {
    this._candleChart.updateLOD(cameraDistance);
  }

  dispose(): void {
    this._candleChart.dispose();
  }
}
