// src/providers/RateLimiter.ts

import type { RateLimitConfig, TokenAcquirer } from './types';

/**
 * Token bucket rate limiter.
 * Satisfies the `TokenAcquirer` interface structurally.
 */
export class RateLimiter implements TokenAcquirer {
  private _tokens:      number;
  private _windowStart: number;
  private readonly _windowMs:   number;
  private readonly _maxTokens:  number;
  private readonly _weight:     number;

  // Queue-based concurrency: avoids unbounded recursion under high concurrency
  private _queue: Array<{ weight: number; resolve: () => void }> = [];
  private _draining = false;

  constructor(config: RateLimitConfig) {
    this._maxTokens  = config.requestsPerWindow;
    this._windowMs   = config.windowMs;
    this._weight     = config.weight ?? 1;
    this._tokens     = this._maxTokens;
    this._windowStart = performance.now();
  }

  private _refill(): void {
    const now     = performance.now();
    const elapsed = now - this._windowStart;
    if (elapsed >= this._windowMs) {
      this._tokens     = this._maxTokens;
      this._windowStart = now;
    }
  }

  /**
   * Acquire a token. Resolves immediately if tokens are available.
   * If the bucket is empty, waits for the window refill then re-checks —
   * using a promise queue to handle concurrent callers correctly without recursion.
   * Weight defaults to config.weight ?? 1.
   */
  acquire(weight?: number): Promise<void> {
    const w = weight ?? this._weight;
    return new Promise<void>((resolve) => {
      this._queue.push({ weight: w, resolve });
      this._drain();
    });
  }

  private _drain(): void {
    if (this._draining) return;
    this._draining = true;
    this._step();
  }

  private _step(): void {
    this._refill();
    while (this._queue.length > 0) {
      const next = this._queue[0];
      if (this._tokens >= next.weight) {
        this._tokens -= next.weight;
        this._queue.shift();
        next.resolve();
      } else {
        // Wait for the window to refill, then try again
        const waitMs = Math.max(
          0,
          this._windowMs - (performance.now() - this._windowStart) + 1,
        );
        setTimeout(() => this._step(), waitMs);
        this._draining = false;
        return;
      }
    }
    this._draining = false;
  }

  /**
   * Synchronously check whether a request can proceed without waiting.
   */
  canAcquireNow(weight?: number): boolean {
    this._refill();
    const w = weight ?? this._weight;
    return this._tokens >= w;
  }

  /** Current available tokens. */
  get availableTokens(): number {
    this._refill();
    return this._tokens;
  }

  /** Reset the bucket (e.g. after a 429 response with Retry-After header). */
  reset(waitMs?: number): void {
    this._tokens     = 0;
    this._windowStart = performance.now() + (waitMs ?? 0) - this._windowMs;
  }
}
