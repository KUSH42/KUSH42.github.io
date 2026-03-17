// src/providers/HistoricalDataFetcher.ts

import type { ExchangeAdapter } from './adapters/ExchangeAdapter';
import type { Interval, TokenAcquirer } from './types';
import { INTERVAL_MS } from './types';
import type { OHLCVCandle } from '../types/market';

export interface FetchOptions {
  adapter:          ExchangeAdapter;
  nativeSymbol:     string;
  interval:         Interval;
  /** Token acquirer — pass a RateLimiter instance or a no-op stub in tests. */
  acquirer:         TokenAcquirer;
  /** Total candles desired. Fetcher will issue multiple pages if needed. */
  limit:            number;
  /**
   * Absolute start time (Unix ms). If not provided, fetcher works backwards
   * from `endMs`, computing startMs = endMs - limit * INTERVAL_MS[interval].
   */
  startMs?:         number;
  /** End time (Unix ms). Defaults to Date.now(). */
  endMs?:           number;
  /**
   * Maximum parallel fetch requests. Default 3.
   * Ignored when adapter.paginationStrategy === 'cursor'.
   */
  maxParallelRequests?: number;
  /** Abort signal for cancellation. */
  signal?:          AbortSignal;
}

export class HistoricalDataFetcher {

  async fetch(options: FetchOptions): Promise<OHLCVCandle[]> {
    if (options.adapter.paginationStrategy === 'cursor') {
      return this._fetchCursor(options);
    }
    return this._fetchTimeWindow(options);
  }

  private async _fetchTimeWindow(options: FetchOptions): Promise<OHLCVCandle[]> {
    const { adapter, nativeSymbol, interval, acquirer, limit, signal } = options;
    const intervalMs = INTERVAL_MS[interval];

    const endMs   = options.endMs ?? Date.now();
    const startMs = options.startMs ?? (endMs - limit * intervalMs);

    const totalMs       = endMs - startMs;
    const candlesNeeded = Math.ceil(totalMs / intervalMs);
    const pageSize      = adapter.maxCandlesPerRequest;
    const pages         = Math.ceil(candlesNeeded / pageSize);
    const maxParallel   = options.maxParallelRequests ?? 3;

    const collected: OHLCVCandle[] = [];

    // Build page windows
    const windows: Array<{ pageStart: number; pageEnd: number }> = [];
    for (let i = 0; i < pages; i++) {
      const pageStart = startMs + i * pageSize * intervalMs;
      const pageEnd   = Math.min(pageStart + pageSize * intervalMs, endMs);
      windows.push({ pageStart, pageEnd });
    }

    // Fetch with bounded parallelism
    let idx = 0;
    while (idx < windows.length) {
      if (signal?.aborted) {
        throw new DOMException('Fetch aborted', 'AbortError');
      }

      const batch = windows.slice(idx, idx + maxParallel);
      idx += maxParallel;

      const results = await Promise.all(batch.map(async ({ pageStart, pageEnd }) => {
        if (signal?.aborted) throw new DOMException('Fetch aborted', 'AbortError');
        const result = await adapter.fetchKlines(
          {
            exchange: adapter.id,
            symbol:   nativeSymbol,
            interval,
            startMs:  pageStart,
            endMs:    pageEnd,
            limit:    pageSize,
          },
          acquirer,
        );
        return result.candles;
      }));

      for (const candles of results) {
        collected.push(...candles);
      }
    }

    return this._mergeAndTrim(collected, limit, intervalMs);
  }

  private async _fetchCursor(options: FetchOptions): Promise<OHLCVCandle[]> {
    const { adapter, nativeSymbol, interval, acquirer, limit, signal } = options;
    const intervalMs = INTERVAL_MS[interval];

    const endMs   = options.endMs ?? Date.now();
    const startMs = options.startMs ?? (endMs - limit * intervalMs);

    let cursor    = Math.floor(startMs / 1000); // Kraken `since` is Unix seconds
    const collected: OHLCVCandle[] = [];

    while (collected.length < limit) {
      if (signal?.aborted) {
        throw new DOMException('Fetch aborted', 'AbortError');
      }

      const result = await adapter.fetchKlines(
        {
          exchange: adapter.id,
          symbol:   nativeSymbol,
          interval,
          startMs:  cursor * 1000,
          endMs:    undefined, // Cursor adapters (Kraken) ignore endMs
          limit:    adapter.maxCandlesPerRequest,
        },
        acquirer,
      );

      if (result.candles.length === 0) break;

      const nextCursor = result.nextCursor;
      if (nextCursor === undefined || nextCursor === cursor) break; // No progress

      // Filter to requested time range
      for (const candle of result.candles) {
        if (candle.time >= startMs && candle.time <= endMs) {
          collected.push(candle);
        }
      }

      // Early termination: the most recent candle already covers the full range
      const lastCandle = result.candles[result.candles.length - 1];
      if (lastCandle && lastCandle.time >= endMs) break;

      cursor = nextCursor;
    }

    return this._mergeAndTrim(collected, limit, intervalMs);
  }

  private _mergeAndTrim(
    candles: OHLCVCandle[],
    limit:   number,
    intervalMs: number,
  ): OHLCVCandle[] {
    // Sort ascending by time
    candles.sort((a, b) => a.time - b.time);

    // Deduplicate by time (keep first occurrence)
    const seen  = new Set<number>();
    const dedup: OHLCVCandle[] = [];
    for (const c of candles) {
      if (!seen.has(c.time)) {
        seen.add(c.time);
        dedup.push(c);
      }
    }

    // Gap detection warning
    for (let i = 1; i < dedup.length; i++) {
      const gap = dedup[i].time - dedup[i - 1].time;
      if (gap > 2 * intervalMs) {
        console.warn(
          `[HistoricalDataFetcher] Gap detected: ${gap}ms > 2 × ${intervalMs}ms ` +
          `between candles at ${dedup[i - 1].time} and ${dedup[i].time}`
        );
      }
    }

    // Trim to limit — take last N candles (most recent)
    return dedup.slice(-limit);
  }
}
