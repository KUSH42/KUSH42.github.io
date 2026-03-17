// src/data/RangeController.ts
import type { OHLCV, UIState, VisibleRange, ScaleSet } from '../types/addendum';

export class RangeController {
  constructor(private allData: OHLCV[], _state: UIState) {}

  /**
   * Compute a VisibleRange from normalized 0–1 start/end positions
   * @param start - Normalized start position (0 = beginning of data)
   * @param end - Normalized end position (1 = end of data)
   * @returns Computed VisibleRange
   */
  fromNormalized(start: number, end: number): VisibleRange {
    const n = this.allData.length;
    if (n === 0) throw new Error('RangeController: allData is empty');
    const si = Math.max(0, Math.min(n - 1, Math.floor(start * (n - 1))));
    const ei = Math.max(si, Math.min(n - 1, Math.floor(end * (n - 1))));

    let priceMin = Infinity, priceMax = -Infinity, volumeMax = 0;
    for (let i = si; i <= ei; i++) {
      const c = this.allData[i];
      if (c.low  < priceMin)  priceMin  = c.low;
      if (c.high > priceMax)  priceMax  = c.high;
      if (c.volume > volumeMax) volumeMax = c.volume;
    }

    return {
      startIndex: si,
      endIndex:   ei,
      startTime:  this.allData[si].timestamp,
      endTime:    this.allData[ei].timestamp,
      priceMin,
      priceMax,
      volumeMax,
    };
  }

  /** Compute a VisibleRange covering all data */
  fitAll(): VisibleRange {
    return this.fromNormalized(0, 1);
  }

  /**
   * Compute a VisibleRange covering the last N candles
   * @param n - Number of candles to include
   * @returns Computed VisibleRange
   */
  fitLast(n: number): VisibleRange {
    const total = this.allData.length;
    const start = Math.max(0, total - n) / Math.max(1, total - 1);
    return this.fromNormalized(start, 1);
  }

  /**
   * Apply a VisibleRange to a ScaleSet's domains
   * @param range - Visible range to apply
   * @param scales - Scale set to update
   */
  applyToScales(range: VisibleRange, scales: ScaleSet): void {
    if (scales.time) scales.time.domain([range.startIndex, range.endIndex]);
    if (scales.volume) scales.volume.domain([0, range.volumeMax]);
  }

  /**
   * Update the data reference
   * @param allData - New full data array
   */
  updateData(allData: OHLCV[]): void {
    this.allData = allData;
  }
}
