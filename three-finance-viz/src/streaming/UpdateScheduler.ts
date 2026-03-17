// src/streaming/UpdateScheduler.ts

import type { OHLCVCandle } from '../types/market';

export class UpdateScheduler {
  private pendingPatches: Partial<OHLCVCandle> | null = null;
  private pendingAppends: OHLCVCandle[] = [];
  private rafId: number | null = null;

  constructor(
    private onAppend: (candles: OHLCVCandle[]) => void,
    private onPatch: (partial: Partial<OHLCVCandle>) => void,
  ) {}

  scheduleAppend(candle: OHLCVCandle): void {
    this.pendingAppends.push(candle);
    this._scheduleFlush();
  }

  schedulePatch(partial: Partial<OHLCVCandle>): void {
    // Merge: last-write-wins per field — correct semantics for price/volume streaming
    this.pendingPatches = { ...this.pendingPatches, ...partial };
    this._scheduleFlush();
  }

  private _scheduleFlush(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.pendingAppends.length > 0) {
        // Swap array before calling onAppend to avoid re-entrancy issues
        const batch = this.pendingAppends;
        this.pendingAppends = [];
        this.onAppend(batch);
      }
      if (this.pendingPatches !== null) {
        const patch = this.pendingPatches;
        this.pendingPatches = null;
        this.onPatch(patch);
      }
    });
  }

  /** Synchronously drain any pending appends/patches and cancel the scheduled RAF. */
  flush(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.pendingAppends.length > 0) {
      const batch = this.pendingAppends;
      this.pendingAppends = [];
      this.onAppend(batch);
    }
    if (this.pendingPatches !== null) {
      const patch = this.pendingPatches;
      this.pendingPatches = null;
      this.onPatch(patch);
    }
  }

  dispose(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.pendingAppends = [];
    this.pendingPatches = null;
  }
}
