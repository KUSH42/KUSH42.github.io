// src/charts/HeikinAshiTransform.ts
import type { CandleBuffer } from '../types/CandleBuffer';

/**
 * Heikin-Ashi formula:
 *   HA_Close[i] = (O + H + L + C) / 4
 *   HA_Open[i]  = (HA_Open[i-1] + HA_Close[i-1]) / 2
 *   HA_High[i]  = max(H, HA_Open[i], HA_Close[i])
 *   HA_Low[i]   = min(L, HA_Open[i], HA_Close[i])
 *
 * Seed (i=0):
 *   HA_Open[0]  = (O[0] + C[0]) / 2
 *   HA_Close[0] = (O[0] + H[0] + L[0] + C[0]) / 4
 */
export class HeikinAshiTransform {
  /** HA-adjusted OHLCV stored as Float32Array with stride 5 (o,h,l,c,v). */
  readonly haData: Float32Array;
  private _prevHAOpen     = 0;
  private _prevHAClose    = 0;
  private _prevPrevHAOpen  = 0;
  private _prevPrevHAClose = 0;
  private _count           = 0;

  constructor(capacity: number) {
    this.haData = new Float32Array(capacity * 5);
  }

  recompute(buf: CandleBuffer): void {
    this.reset();
    for (let i = 0; i < buf.count; i++) {
      this.step(i, buf);
    }
  }

  step(i: number, buf: CandleBuffer): [number, number, number, number] {
    const o = buf.open(i);
    const h = buf.high(i);
    const l = buf.low(i);
    const c = buf.close(i);

    const haClose = (o + h + l + c) / 4;
    let haOpen: number;
    if (i === 0 && this._count === 0) {
      haOpen = (o + c) / 2;
    } else {
      haOpen = (this._prevHAOpen + this._prevHAClose) / 2;
    }
    const haHigh = Math.max(h, haOpen, haClose);
    const haLow  = Math.min(l, haOpen, haClose);

    const base = i * 5;
    this.haData[base]     = haOpen;
    this.haData[base + 1] = haHigh;
    this.haData[base + 2] = haLow;
    this.haData[base + 3] = haClose;
    this.haData[base + 4] = buf.volume(i);

    // Save i-1 before advancing so patchLast can use them as seed for i
    this._prevPrevHAOpen  = this._prevHAOpen;
    this._prevPrevHAClose = this._prevHAClose;
    this._prevHAOpen      = haOpen;
    this._prevHAClose     = haClose;
    this._count++;

    return [haOpen, haHigh, haLow, haClose];
  }

  patchLast(i: number, buf: CandleBuffer): void {
    if (i < 0) return;
    const o = buf.open(i);
    const h = buf.high(i);
    const l = buf.low(i);
    const c = buf.close(i);

    const haClose = (o + h + l + c) / 4;
    // Use i-2's values as seed (saved in _prevPrev before step(i-1) advanced state)
    const seedOpen  = i === 0 ? (o + c) / 2 :
                      (i === 1 ? (buf.open(0) + buf.close(0)) / 2 : (this._prevPrevHAOpen + this._prevPrevHAClose) / 2);
    const seedClose = i === 0 ? haClose :
                      (i === 1 ? (buf.open(0) + buf.high(0) + buf.low(0) + buf.close(0)) / 4 : this._prevPrevHAClose);
    const haOpen = i === 0 ? (o + c) / 2 : (seedOpen + seedClose) / 2;
    const haHigh = Math.max(h, haOpen, haClose);
    const haLow  = Math.min(l, haOpen, haClose);

    const base = i * 5;
    this.haData[base]     = haOpen;
    this.haData[base + 1] = haHigh;
    this.haData[base + 2] = haLow;
    this.haData[base + 3] = haClose;
    this.haData[base + 4] = buf.volume(i);
  }

  reset(): void {
    this._prevHAOpen      = 0;
    this._prevHAClose     = 0;
    this._prevPrevHAOpen  = 0;
    this._prevPrevHAClose = 0;
    this._count           = 0;
  }

  haOpen(i: number):  number { return this.haData[i * 5]; }
  haHigh(i: number):  number { return this.haData[i * 5 + 1]; }
  haLow(i: number):   number { return this.haData[i * 5 + 2]; }
  haClose(i: number): number { return this.haData[i * 5 + 3]; }
  haVol(i: number):   number { return this.haData[i * 5 + 4]; }
}
