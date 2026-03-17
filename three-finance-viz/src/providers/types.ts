// src/providers/types.ts

import type { OHLCVCandle, Tick, OrderBookDelta } from '../types/market';
import type { StreamConnectOptions } from '../streaming/WebSocketAdapter';

// Re-export so adapters don't need a separate import
export type { OHLCVCandle, Tick, OrderBookDelta };

// ── Enumerations ─────────────────────────────────────────────────────────────

/**
 * Identifies an exchange. The five built-in values are literal strings for
 * exhaustiveness checking; `(string & {})` allows custom adapter authors to
 * pass any string ID while preserving autocompletion for the built-in names.
 */
export type ExchangeId =
  | 'binance'
  | 'coinbase'
  | 'kraken'
  | 'bybit'
  | 'deribit'
  | (string & {});

export type Interval =
  | '1m' | '3m' | '5m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '6h' | '8h' | '12h'
  | '1d' | '3d' | '1w' | '1M';

// ── Symbol handling ──────────────────────────────────────────────────────────

/**
 * Canonical symbol representation used across the provider layer.
 * base/quote with uppercase letters, e.g. "BTC/USDT", "ETH/USD".
 */
export type CanonicalSymbol = `${Uppercase<string>}/${Uppercase<string>}`;

/** Per-exchange symbol as the exchange API accepts it. */
export interface ExchangeSymbol {
  exchange: ExchangeId;
  /** Native symbol string, e.g. "BTCUSDT" for Binance, "BTC-USD" for Coinbase */
  symbol: string;
  /** Canonical form this resolves to */
  canonical: CanonicalSymbol;
}

// ── Rate limiting ────────────────────────────────────────────────────────────

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  requestsPerWindow: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Weight cost of a single request (default 1) */
  weight?: number;
}

export interface RateLimitBucket {
  restKlines: RateLimitConfig;
  restPublic: RateLimitConfig;
  /**
   * Maximum number of simultaneous WebSocket connections allowed per IP by
   * this exchange. Used by ProviderManager to guard against opening more
   * connections than the exchange permits.
   */
  wsConnections?: RateLimitConfig;
}

/**
 * Narrow interface for token acquisition.
 * Adapters accept this type in `fetchKlines()` rather than the concrete
 * `RateLimiter` class to avoid a circular import.
 * `RateLimiter` satisfies this interface structurally.
 */
export interface TokenAcquirer {
  acquire(weight?: number): Promise<void>;
}

// ── Pagination strategies ─────────────────────────────────────────────────────

/**
 * Declares how an adapter's REST endpoint handles pagination.
 *
 * - `'time-window'`: The endpoint accepts explicit `startTime` and `endTime`
 *   parameters. Used by: Binance, Coinbase, Bybit, Deribit.
 *
 * - `'cursor'`: The endpoint uses a server-returned cursor field to identify
 *   the next page. Used by: Kraken.
 */
export type PaginationStrategy = 'time-window' | 'cursor';

// ── Historical fetch ─────────────────────────────────────────────────────────

export interface HistoricalFetchRequest {
  exchange: ExchangeId;
  /** Native exchange symbol */
  symbol: string;
  interval: Interval;
  /** Start time inclusive, Unix ms UTC */
  startMs: number;
  /** End time inclusive, Unix ms UTC. If omitted, up to "now". */
  endMs?: number;
  /** Maximum total candles to return. Default 1000. */
  limit?: number;
}

export interface HistoricalFetchResult {
  candles: OHLCVCandle[];
  /** True if additional candles exist beyond the limit */
  truncated: boolean;
  /** Exchange that served the data */
  source: ExchangeId;
  /**
   * Cursor value for the next page, used only by cursor-based adapters.
   * For Kraken, this is the `last` field from the OHLC response body, in Unix seconds.
   */
  nextCursor?: number;
}

// ── Stream options builder ───────────────────────────────────────────────────

/**
 * Returned by `adapter.buildStreamSubscription()`.
 * Describes how to connect to a live feed for a given symbol+interval.
 */
export interface StreamSubscription {
  /** The fully-constructed StreamConnectOptions to pass to chart.connectStream() */
  options: StreamConnectOptions;
  /**
   * Called after the WebSocket opens to send subscription frames.
   * Receives a `send` function that writes directly to the underlying WebSocket.
   */
  onConnect?: (send: (msg: string) => void) => void;
  /**
   * Called before the WebSocket is closed to send unsubscribe frames.
   */
  onDisconnect?: (send: (msg: string) => void) => void;
}

// ── Provider config (user-facing) ────────────────────────────────────────────

export interface ProviderConfig {
  /**
   * Symbol to display. Accepts multiple common formats:
   * "BTCUSDT", "BTC/USDT", "BTC-USDT", "XBT/USD", etc.
   */
  symbol: string;
  /** Candlestick interval. Default '1m'. */
  interval?: Interval;
  /**
   * Ordered list of exchanges to try. First entry is primary; subsequent
   * entries are failover. If omitted, ProviderManager auto-selects based
   * on symbol availability.
   */
  exchanges?: ExchangeId[];
  /**
   * How many historical candles to fetch before starting the live stream.
   * Default 500. 0 disables historical fetch.
   */
  historicalLimit?: number;
  /**
   * Start of historical range (Unix ms UTC). If omitted, fetches the most
   * recent `historicalLimit` candles ending at now.
   */
  historicalStartMs?: number;
  /**
   * Number of consecutive provider errors before failover is triggered.
   * Default 3.
   */
  failoverThreshold?: number;
  /**
   * Cache TTL for historical candle data in milliseconds. Default 60_000 (1 min).
   * Set to 0 to disable caching.
   */
  cacheTtlMs?: number;
  /**
   * Called when the active provider changes (e.g. after failover).
   */
  onProviderChange?: (exchange: ExchangeId) => void;
  /**
   * Called when a recoverable error occurs.
   */
  onError?: (error: ProviderError) => void;
}

// ── Error types ──────────────────────────────────────────────────────────────

export type ProviderErrorCode =
  | 'RATE_LIMITED'
  | 'SYMBOL_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'PARSE_ERROR'
  | 'AUTH_REQUIRED'
  | 'EXCHANGE_UNAVAILABLE'
  | 'FAILOVER_EXHAUSTED'
  | 'INVALID_INTERVAL'
  | 'CACHE_MISS';

export class ProviderError extends Error {
  constructor(
    public readonly code: ProviderErrorCode,
    message: string,
    public readonly exchange?: ExchangeId,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

// ── Provider lifecycle events ────────────────────────────────────────────────

export interface ProviderEvents extends Record<string, unknown> {
  'provider:change':    { from: ExchangeId | null; to: ExchangeId };
  'provider:error':     { error: ProviderError; errorCount: number };
  'historical:start':   { exchange: ExchangeId; symbol: string; interval: Interval };
  'historical:complete':{ exchange: ExchangeId; candleCount: number; durationMs: number };
  'stream:connect':     { exchange: ExchangeId; url: string };
  'stream:disconnect':  { exchange: ExchangeId; code: number; reason: string };
}

// ── Cache key ────────────────────────────────────────────────────────────────

export interface CacheKey {
  exchange: ExchangeId;
  symbol: string;
  interval: Interval;
  startMs: number;
  endMs: number;
}

// ── Interval → milliseconds mapping ─────────────────────────────────────────

export const INTERVAL_MS: Record<Interval, number> = {
  '1m':  60_000,
  '3m':  180_000,
  '5m':  300_000,
  '15m': 900_000,
  '30m': 1_800_000,
  '1h':  3_600_000,
  '2h':  7_200_000,
  '4h':  14_400_000,
  '6h':  21_600_000,
  '8h':  28_800_000,
  '12h': 43_200_000,
  '1d':  86_400_000,
  '3d':  259_200_000,
  '1w':  604_800_000,
  '1M':  2_592_000_000,
};
