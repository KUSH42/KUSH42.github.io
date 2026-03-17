// src/streaming/TickAggregator.ts

import type { OHLCVCandle, Tick } from '../types/market';

export class TickAggregator {
  private current: OHLCVCandle | null = null;

  constructor(private readonly intervalMs: number) {}

  /**
   * Returns the completed previous candle when a new interval starts,
   * or null when updating the current open candle.
   * Caller appends the completed candle and calls patchLast for null.
   */
  ingest(tick: Tick): OHLCVCandle | null {
    const bucketStart = Math.floor(tick.time / this.intervalMs) * this.intervalMs;

    if (!this.current || this.current.time < bucketStart) {
      const completed = this.current ? { ...this.current } : null;
      this.current = {
        time: bucketStart,
        open: tick.price,
        high: tick.price,
        low: tick.price,
        close: tick.price,
        volume: tick.volume,
      };
      return completed;
    }

    this.current.high = Math.max(this.current.high, tick.price);
    this.current.low = Math.min(this.current.low, tick.price);
    this.current.close = tick.price;
    this.current.volume += tick.volume;
    return null;
  }

  getLive(): OHLCVCandle | null {
    return this.current;
  }

  reset(): void {
    this.current = null;
  }
}
