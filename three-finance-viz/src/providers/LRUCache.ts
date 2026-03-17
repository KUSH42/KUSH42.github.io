// src/providers/LRUCache.ts

import type { OHLCVCandle } from '../types/market';
import type { CacheKey, Interval } from './types';
import { INTERVAL_MS } from './types';

export interface LRUCacheOptions {
  maxEntries?: number;  // default 200
  maxBytes?:   number;  // default 50 * 1024 * 1024 (50 MB)
}

interface CacheEntry {
  value:     OHLCVCandle[];
  expiresAt: number;
  bytes:     number;
}

/**
 * In-memory LRU cache for historical candle data.
 * Evicts by both entry count and approximate byte usage.
 */
export class LRUCache {
  private readonly _maxEntries: number;
  private readonly _maxBytes:   number;
  private _entries = new Map<string, CacheEntry>();
  private _totalBytes = 0;

  constructor(options?: LRUCacheOptions) {
    this._maxEntries = options?.maxEntries ?? 200;
    this._maxBytes   = options?.maxBytes   ?? 50 * 1024 * 1024;
  }

  /**
   * Store candles under a cache key.
   * @param key   - Stringified CacheKey
   * @param value - Sorted OHLCVCandle[]
   * @param ttlMs - Time-to-live in milliseconds
   *
   * Note: expiry is lazy — expired entries are only removed on the next `get()` call
   * for that key. They do not automatically free memory between get() calls.
   */
  set(key: string, value: OHLCVCandle[], ttlMs: number): void {
    // Remove existing entry first to update byte count
    this.delete(key);

    // Each OHLCVCandle: 6 required number fields × 8 bytes + optional trades (8 bytes) ≈ 56 bytes
    const bytes = value.length * 56;
    const entry: CacheEntry = {
      value,
      expiresAt: Date.now() + ttlMs,
      bytes,
    };

    this._entries.set(key, entry);
    this._totalBytes += bytes;

    // Evict until under budgets
    this._evict();
  }

  /**
   * Retrieve candles if not expired.
   * Returns null on miss or expiry; promotes entry to MRU position on hit.
   */
  get(key: string): OHLCVCandle[] | null {
    const entry = this._entries.get(key);
    if (!entry) return null;

    // Check TTL expiry
    if (Date.now() > entry.expiresAt) {
      this.delete(key);
      return null;
    }

    // Promote to MRU: delete and re-insert at end of Map
    this._entries.delete(key);
    this._entries.set(key, entry);

    return entry.value;
  }

  /** Explicitly invalidate an entry. */
  delete(key: string): void {
    const entry = this._entries.get(key);
    if (entry) {
      this._totalBytes -= entry.bytes;
      this._entries.delete(key);
    }
  }

  /** Clear all entries. */
  clear(): void {
    this._entries.clear();
    this._totalBytes = 0;
  }

  get size(): number {
    return this._entries.size;
  }

  get byteEstimate(): number {
    return this._totalBytes;
  }

  private _evict(): void {
    // Evict oldest entries (first in Map) until under budget
    while (
      this._entries.size > this._maxEntries ||
      this._totalBytes > this._maxBytes
    ) {
      const firstKey = this._entries.keys().next().value;
      if (firstKey === undefined) break;
      this.delete(firstKey);
    }
  }
}

/**
 * Build a cache key string from a CacheKey object.
 * Normalizes endMs to the interval bucket to maximize cache hits.
 */
export function buildCacheKey(key: CacheKey): string {
  const intervalMs  = INTERVAL_MS[key.interval as Interval] ?? 60_000;
  const bucketedEnd = Math.floor(key.endMs / intervalMs) * intervalMs;
  return `${key.exchange}:${key.symbol}:${key.interval}:${key.startMs}:${bucketedEnd}`;
}
