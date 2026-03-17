// src/types/CandleBuffer.ts

/**
 * AoS (Array of Structs) layout: fields for candle i are co-located in a
 * single Float32Array with stride 5.  Favours sequential per-candle reads
 * during updateRange loops.
 *
 * time is stored separately as Float64Array to preserve ms precision.
 */
export class CandleBuffer {
  private static readonly STRIDE = 5; // open, high, low, close, volume

  private _data: Float32Array;
  /** Unix ms timestamps — Float64 to preserve full ms precision */
  readonly time: Float64Array;
  /** Packed flags: bit 0 = bullish, bit 1 = selected, bit 2 = highlighted */
  readonly flags: Uint8Array;
  readonly capacity: number;
  count = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this._data = new Float32Array(capacity * CandleBuffer.STRIDE);
    this.time = new Float64Array(capacity);
    this.flags = new Uint8Array(capacity);
  }

  open(i: number): number {
    return this._data[i * 5];
  }
  high(i: number): number {
    return this._data[i * 5 + 1];
  }
  low(i: number): number {
    return this._data[i * 5 + 2];
  }
  close(i: number): number {
    return this._data[i * 5 + 3];
  }
  volume(i: number): number {
    return this._data[i * 5 + 4];
  }

  set(i: number, o: number, h: number, l: number, c: number, v: number): void {
    if (i >= this.capacity) {
      throw new RangeError(
        `CandleBuffer.set(${i}) exceeds capacity ${this.capacity}. ` +
          `Increase maxCandles option.`,
      );
    }
    const base = i * 5;
    this._data[base] = o;
    this._data[base + 1] = h;
    this._data[base + 2] = l;
    this._data[base + 3] = c;
    this._data[base + 4] = v;
  }

  append(candle: import('./market').OHLCVCandle): number {
    const i = this.count;
    this.set(i, candle.open, candle.high, candle.low, candle.close, candle.volume);
    this.time[i] = candle.time;
    this.flags[i] = candle.close >= candle.open ? 1 : 0;
    this.count++;
    return i;
  }

  /** Non-allocating snapshot of candle at index i */
  fillCandle(i: number, out: import('./market').OHLCVCandle): void {
    out.time = this.time[i];
    out.open = this.open(i);
    out.high = this.high(i);
    out.low = this.low(i);
    out.close = this.close(i);
    out.volume = this.volume(i);
  }
}
