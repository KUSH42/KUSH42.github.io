// src/utils/ThrottleQueue.ts

/**
 * Coalesces callbacks within a time window.
 * Used for DOM-heavy operations like tooltip repositioning on every pointermove.
 */
export class ThrottleQueue {
  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _pending: (() => void) | null = null;

  constructor(private readonly windowMs: number) {}

  /**
   * Schedule a callback. If one is already pending within the window,
   * the new callback replaces it (last-write-wins).
   */
  schedule(fn: () => void): void {
    this._pending = fn;
    if (this._timer === null) {
      this._timer = setTimeout(() => {
        this._timer = null;
        const cb = this._pending;
        this._pending = null;
        cb?.();
      }, this.windowMs);
    }
  }

  /** Cancel any pending callback */
  cancel(): void {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._pending = null;
  }

  dispose(): void {
    this.cancel();
  }
}
