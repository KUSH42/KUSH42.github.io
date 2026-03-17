# live-data-providers

**Status:** Draft
**Priority:** P0 (next)
**Depends on:**
- `src/streaming/WebSocketAdapter.ts` — used as the underlying WebSocket transport (not replaced)
- `src/streaming/TickAggregator.ts` — used for tick → OHLCV conversion
- `src/streaming/UpdateScheduler.ts` — used to throttle chart updates to render loop
- `src/types/market.ts` — `OHLCVCandle`, `Tick`, `OrderBookDelta` types
- `src/FinanceChart.ts` — integration target; `connectStream()` and `loadData()` must be called by provider layer, never patched

---

## Problem Statement

The library ships with a low-level streaming primitive (`WebSocketAdapter`) and a mock Binance stream for demos, but no production-ready mechanism for fetching historical data or connecting to real exchange feeds. Every consumer must hand-roll exchange-specific REST pagination, WebSocket subscription handshakes, symbol normalization, rate-limit handling, and failover logic. This is 2,000–4,000 lines of duplicated infrastructure per application. The provider layer centralises this work behind a single `connectProvider()` call, handles failover automatically, and makes exchange adapters independently tree-shakeable so bundle size is not penalised when only one exchange is used.

---

## Goals

- Single `FinanceChart.connectProvider(config)` call fetches historical data and starts live streaming with no further application code required.
- Support Binance (spot), Coinbase Advanced Trade, Kraken (spot), and Bybit out of the box; Deribit as an optional adapter.
- Each exchange adapter is independently importable (`import { BinanceAdapter } from 'three-finance-viz/providers/binance'`) so unused adapters are excluded from bundles.
- Normalized symbol resolution: `BTC/USD`, `BTCUSDT`, `BTC-USD`, and `XBT/USD` all resolve to the correct exchange-specific identifier.
- Historical fetch respects per-exchange rate limits, paginates transparently, and fills gaps when a single endpoint cannot satisfy the requested range.
- Live stream normalises all exchange tick/kline formats into the existing `Tick | OHLCVCandle` union used by `WebSocketAdapter`.
- Provider failover: if the primary exchange errors or becomes unavailable, the manager automatically promotes the next ranked provider.
- LRU cache prevents redundant historical fetches for the same symbol + interval + time range within a session.
- Zero external runtime dependencies: all HTTP via native `fetch`, all WebSocket via native `WebSocket` (both already available in the DOM/Node 18+ environments this library targets).
- Full TypeScript strict-mode compatibility; no `any` in public interfaces.

## Non-Goals

- Authenticated/private endpoints (order placement, account balances, private streams). All adapters target public market data only.
- Order book depth streaming integration with `OrderBookDepth` renderer — adapters will emit `OrderBookDelta` events on the `ProviderManager` but wiring to the 3D renderer is left to the caller.
- WebSocket multiplexing / connection sharing across multiple `FinanceChart` instances sharing the same exchange connection.
- Persistent cross-session caching (IndexedDB, localStorage). The LRU cache is in-memory and clears on page reload.
- Server-side / Node.js execution. The provider layer targets browser environments where `WebSocket` and `fetch` are globals.
- Candlestick interval conversion (e.g., building 1h candles from 1m data). Callers request the interval they need.
- Full exchange API coverage (funding rates, liquidations, open interest). Only OHLCV klines and trade ticks are in scope.

---

## Architecture Diagram

```
Application code
       │
       │  chart.connectProvider(config)
       ▼
┌─────────────────────────────────────────────────────────────┐
│                       ProviderManager                        │
│                                                             │
│  ┌──────────────┐   ┌─────────────┐   ┌─────────────────┐  │
│  │SymbolResolver│   │  LRUCache   │   │  RateLimiter    │  │
│  └──────────────┘   └─────────────┘   │ (per-exchange)  │  │
│                                        └─────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            ExchangeAdapter (interface)                │   │
│  │  ┌──────────────┐  ┌────────────────┐                │   │
│  │  │ BinanceAdapt │  │ CoinbaseAdapter│  ...           │   │
│  │  └──────────────┘  └────────────────┘                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
       │                              │
       │ REST fetch (historical)      │ WebSocket (live)
       ▼                              ▼
┌─────────────────┐        ┌──────────────────────┐
│HistoricalFetcher│        │  WebSocketAdapter     │
│  (pagination,   │        │  (existing infra,     │
│   gap-filling)  │        │   NOT replaced)       │
└─────────────────┘        └──────────────────────┘
       │                              │
       ▼                              ▼
┌─────────────────────────────────────────────────┐
│                  FinanceChart                    │
│   loadData(candles)    connectStream(options)    │
└─────────────────────────────────────────────────┘
```

**Data flow — historical path:**

1. `ProviderManager.connectProvider()` receives a `ProviderConfig`.
2. `SymbolResolver` maps the user symbol to each registered adapter's native symbol.
3. `LRUCache` is checked; on hit, `chart.loadData()` is called immediately.
4. On miss: `HistoricalDataFetcher` paginates the exchange REST endpoint inside a `RateLimiter` token bucket, assembles sorted `OHLCVCandle[]`, writes to cache, then calls `chart.loadData()`.
5. After historical data is loaded, live stream setup begins (step below).

**Data flow — live streaming path:**

1. `ProviderManager` calls `adapter.buildStreamSubscription()` to produce a `StreamSubscription` object (URL + `parseMessage` function + optional `onConnect`/`onDisconnect` hooks).
2. `chart.connectStream(streamOptions)` is called; the existing `WebSocketAdapter` → `TickAggregator` → `UpdateScheduler` pipeline handles everything downstream.
3. The provider layer does not intercept or replace any streaming internals.

**Failover path:**

1. `ProviderManager` listens for `ProviderErrorEvent` from the active adapter.
2. When the error budget is exceeded (configurable threshold), the manager calls `chart.disconnectStream()`, promotes the next ranked adapter, re-executes the historical + streaming setup sequence.

---

## Directory Layout

```
src/providers/
├── index.ts                    # Public API surface — all exports
├── types.ts                    # All provider-layer TypeScript interfaces and enums
├── ProviderManager.ts          # Orchestrator: failover, caching, lifecycle
├── HistoricalDataFetcher.ts    # Pagination, parallel fetch, gap-filling
├── RateLimiter.ts              # Token bucket per endpoint group
├── LRUCache.ts                 # In-memory candle cache with TTL
├── SymbolResolver.ts           # Cross-exchange symbol normalization
└── adapters/
    ├── ExchangeAdapter.ts      # Interface definition (not a class — pure types)
    ├── BinanceAdapter.ts       # Binance spot
    ├── CoinbaseAdapter.ts      # Coinbase Advanced Trade
    ├── KrakenAdapter.ts        # Kraken spot
    ├── BybitAdapter.ts         # Bybit spot
    └── DeribitAdapter.ts       # Deribit (optional, derivatives)
```

Entry-point for tree-shaking (each adapter is its own deep import path — see Public API section).

---

## Interface Definitions

### `src/providers/types.ts`

```typescript
import type { OHLCVCandle, Tick, OrderBookDelta } from '../types/market';
import type { StreamConnectOptions } from '../streaming/WebSocketAdapter';

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
   *
   * Per-exchange limits (as of 2025):
   *   Binance:  300 connections / 5 minutes per IP (connection-creation rate)
   *   Coinbase: 8 simultaneous connections per IP
   *   Kraken:   no documented hard limit; 1 connection per symbol recommended
   *   Bybit:    500 connections per IP (no burst-rate documented)
   *   Deribit:  no documented hard limit; conservative 10 assumed
   *
   * ProviderManager enforces this as a hard cap: if the current connection
   * count for this exchange already equals wsConnections.requestsPerWindow,
   * `connect()` throws `ProviderError('EXCHANGE_UNAVAILABLE')` with a clear
   * message rather than silently opening a connection that will be rejected.
   *
   * For Coinbase the value is:
   *   { requestsPerWindow: 8, windowMs: Infinity }
   * (Infinity means "no rolling refill" — it is a hard concurrent cap, not a
   * rate window; ProviderManager checks the live connection count directly.)
   */
  wsConnections?: RateLimitConfig;
}

/**
 * Narrow interface for token acquisition.
 * Adapters accept this type in `fetchKlines()` rather than the concrete
 * `RateLimiter` class to avoid a circular import (ExchangeAdapter.ts →
 * RateLimiter.ts → types.ts → ExchangeAdapter.ts).
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
 *   parameters. `HistoricalDataFetcher` slices the requested range into
 *   fixed-width windows and issues pages in parallel (bounded by
 *   `maxParallelRequests`).
 *   Used by: Binance, Coinbase, Bybit, Deribit.
 *
 * - `'cursor'`: The endpoint uses a server-returned cursor field to identify
 *   the next page. `HistoricalDataFetcher` issues pages sequentially, using
 *   the cursor from each response to fetch the next page.
 *   Used by: Kraken (`last` field in response drives the next `since` param).
 *
 * Adapters declare their strategy via the readonly `paginationStrategy`
 * field on `ExchangeAdapter`. `HistoricalDataFetcher` reads this field and
 * selects the corresponding internal algorithm.
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
   * Cursor value for the next page, used only by cursor-based adapters
   * (paginationStrategy === 'cursor'). For Kraken, this is the `last` field
   * from the OHLC response body, in Unix seconds. Undefined for time-window
   * adapters and for the final page of a cursor-based fetch.
   */
  nextCursor?: number;
}

// ── Stream options builder ───────────────────────────────────────────────────

/**
 * How `onConnect` / `onDisconnect` are delivered to the WebSocket
 * ──────────────────────────────────────────────────────────────────
 * The existing `WebSocketAdapter` does not expose a public `send()` method.
 * Rather than patching the adapter, the provider layer delivers the `send`
 * callback via `StreamConnectOptions.onOpen`, a new optional hook that
 * `WebSocketAdapter` calls immediately after `ws.onopen` fires:
 *
 *   // Addition to StreamConnectOptions (defined in WebSocketAdapter.ts):
 *   onOpen?: (send: (msg: string) => void) => void;
 *
 * `WebSocketAdapter.connect()` implementation:
 *   this.ws.onopen = () => {
 *     ...existing logic...
 *     this.opts.onOpen?.((msg) => this.ws!.send(msg));
 *   };
 *
 * `ProviderManager._connectWithAdapter()` injects this hook when constructing
 * the final `StreamConnectOptions`:
 *
 *   streamOptions = {
 *     ...subscription.options,
 *     onOpen: (send) => {
 *       this._wsSend = send;                     // save for onDisconnect
 *       subscription.onConnect?.(send);          // fire adapter hook
 *     },
 *   };
 *
 * Per-exchange usage of `onConnect`:
 *   - Binance:  symbol+interval encoded in URL → onConnect is a no-op (omitted)
 *   - Coinbase: sends `{"type":"subscribe","product_ids":[...],"channel":"candles"}`
 *   - Kraken:   sends `{"method":"subscribe","params":{"channel":"ohlc","symbol":[...],"interval":N}}`
 *   - Bybit:    sends `{"op":"subscribe","args":["kline.{interval}.{symbol}"]}`
 *   - Deribit:  sends JSON-RPC subscribe frame (see Deribit section for ID correlation details)
 *
 * Per-exchange usage of `onDisconnect`:
 *   - Binance:  no-op (omitted)
 *   - Coinbase: sends `{"type":"unsubscribe","product_ids":[...],"channel":"candles"}`
 *   - Kraken:   sends unsubscribe message
 *   - Bybit:    sends `{"op":"unsubscribe","args":[...]}`
 *   - Deribit:  sends JSON-RPC unsubscribe frame
 */
export interface StreamSubscription {
  /** The fully-constructed StreamConnectOptions to pass to chart.connectStream() */
  options: StreamConnectOptions;
  /**
   * Called after the WebSocket opens to send subscription frames.
   * Receives a `send` function that writes directly to the underlying WebSocket.
   * `ProviderManager` injects this hook via `StreamConnectOptions.onOpen` —
   * see the block comment above for the full delivery mechanism.
   *
   * Per-exchange semantics:
   *   - Binance:  omit (URL-encoded subscription, no frame needed)
   *   - Coinbase: send subscribe JSON after connect
   *   - Kraken:   send subscribe JSON after connect
   *   - Bybit:    send subscribe JSON after connect
   *   - Deribit:  send JSON-RPC subscribe frame; track request ID for correlation
   */
  onConnect?: (send: (msg: string) => void) => void;
  /**
   * Called before the WebSocket is closed to send unsubscribe frames.
   * Receives the same `send` function saved by `ProviderManager` from `onConnect`.
   * If the socket is already closed when `disconnect()` is called, this hook
   * is skipped silently.
   */
  onDisconnect?: (send: (msg: string) => void) => void;
}

// ── Provider config (user-facing) ────────────────────────────────────────────

export interface ProviderConfig {
  /**
   * Symbol to display. Accepts multiple common formats:
   * "BTCUSDT", "BTC/USDT", "BTC-USDT", "XBT/USD", etc.
   * SymbolResolver normalizes this to CanonicalSymbol internally.
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
   * Called when a recoverable error occurs (e.g. single request failure before
   * the failover threshold is reached).
   */
  onError?: (error: ProviderError) => void;
}

// ── Error types ──────────────────────────────────────────────────────────────

export type ProviderErrorCode =
  | 'RATE_LIMITED'           // HTTP 429 or exchange-specific rate limit response
  | 'SYMBOL_NOT_FOUND'       // Exchange does not list this symbol
  | 'NETWORK_ERROR'          // fetch() or WebSocket connection failed
  | 'PARSE_ERROR'            // Response body could not be parsed into OHLCVCandle[]
  | 'AUTH_REQUIRED'          // Endpoint requires authentication (unexpected for public)
  | 'EXCHANGE_UNAVAILABLE'   // Exchange returned 5xx or WS closed abnormally
  | 'FAILOVER_EXHAUSTED'     // All configured exchanges have exceeded their error budgets
  | 'INVALID_INTERVAL'       // Requested interval is not supported by this exchange
  | 'CACHE_MISS';             // Informational: cache was checked and missed

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
```

---

## ExchangeAdapter Interface

### `src/providers/adapters/ExchangeAdapter.ts`

```typescript
import type {
  ExchangeId,
  Interval,
  HistoricalFetchRequest,
  HistoricalFetchResult,
  StreamSubscription,
  RateLimitBucket,
  ExchangeSymbol,
  TokenAcquirer,
  PaginationStrategy,
} from '../types';

/**
 * Contract every exchange adapter must implement.
 * Adapters are stateless with respect to ProviderManager lifecycle —
 * they do not store active connections. Connection state lives in
 * ProviderManager, which owns the WebSocketAdapter instance.
 */
export interface ExchangeAdapter {
  /** Stable exchange identifier */
  readonly id: ExchangeId;

  /** Human-readable name for logging and UI */
  readonly name: string;

  /** Rate limit configuration for each endpoint group */
  readonly rateLimits: RateLimitBucket;

  /**
   * Optional async initialization called by ProviderManager before
   * any other method (including `resolveSymbol()`, `fetchKlines()`, or
   * `buildStreamSubscription()`). Called once per `connect()` invocation.
   * Adapters that cache their initialization state (e.g. `_productMap` already
   * populated) should be idempotent and skip re-fetching if already initialized.
   *
   * Use cases:
   *   - CoinbaseAdapter: fetches the product list from
   *     `GET /api/v3/brokerage/market/products` and builds an in-memory
   *     `Map<CanonicalSymbol, string>` so that `resolveSymbol()` can answer
   *     synchronously. Without this, the product-based symbol lookup would
   *     require an async call in the middle of the synchronous resolve path.
   *   - KrakenAdapter: fetches `/0/public/AssetPairs` to build the dynamic
   *     symbol alias table used by `resolveSymbol()`.
   *   - BinanceAdapter / BybitAdapter / DeribitAdapter: no-op (default).
   *
   * Must not throw on network failure — log a warning and allow the adapter
   * to degrade gracefully (e.g. fall back to heuristic symbol resolution).
   *
   * ProviderManager calls `await adapter.initialize?.()` immediately after
   * selecting the adapter priority list and before calling `resolveSymbol()`.
   * If `initialize()` is absent, ProviderManager proceeds without it.
   */
  initialize?(): Promise<void>;

  /**
   * Return all supported symbols this exchange can serve.
   * ProviderManager calls this lazily (once per session, then caches) to
   * drive auto-provider selection.
   * Must not throw — return empty array on network failure.
   */
  fetchSupportedSymbols(): Promise<ExchangeSymbol[]>;

  /**
   * Return true if this exchange natively supports the given interval.
   * Called synchronously — no I/O.
   */
  supportsInterval(interval: Interval): boolean;

  /**
   * Translate a canonical symbol (e.g. "BTC/USDT") to the exchange-native
   * symbol string used in REST and WS calls.
   * Returns null if this exchange does not support the symbol.
   *
   * This method is called synchronously. Adapters that require async lookups
   * (Coinbase, Kraken) must pre-populate their symbol map in `initialize()`.
   */
  resolveSymbol(canonical: string): string | null;

  /**
   * Fetch historical OHLCV candles for the given request.
   * Implementations must NOT paginate internally — pagination is the
   * responsibility of HistoricalDataFetcher. Each call fetches one page
   * (up to the exchange's maximum per request).
   *
   * @param request - Fetch parameters
   * @param acquirer - Narrow token-bucket interface; call `acquirer.acquire()`
   *                   before each HTTP request. Accepts any object satisfying
   *                   `TokenAcquirer` — the concrete `RateLimiter` class
   *                   satisfies this structurally, as does a trivial no-op
   *                   stub used in unit tests.
   * @returns One page of OHLCV candles sorted ascending by time.
   * @throws ProviderError with appropriate code
   */
  fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult>;

  /**
   * Build the StreamConnectOptions (and optional lifecycle callbacks) needed
   * to connect to this exchange's live candle/trade stream for the given
   * symbol and interval.
   *
   * The returned object is passed directly to chart.connectStream().
   * The adapter must NOT call chart.connectStream() itself.
   *
   * @param nativeSymbol - Exchange-native symbol string from resolveSymbol()
   * @param interval - Requested candlestick interval
   * @param intervalMs - Interval in milliseconds (for TickAggregator)
   */
  buildStreamSubscription(
    nativeSymbol: string,
    interval: Interval,
    intervalMs: number,
  ): StreamSubscription;

  /**
   * Maximum number of candles per single REST klines request.
   * Used by HistoricalDataFetcher to compute page counts.
   */
  readonly maxCandlesPerRequest: number;

  /**
   * Declares the pagination mechanism used by this adapter's REST klines
   * endpoint. `HistoricalDataFetcher` selects its internal algorithm based
   * on this value.
   *
   * - `'time-window'`: Binance, Coinbase, Bybit, Deribit
   * - `'cursor'`: Kraken (uses the `last` field from each response as the
   *   `since` parameter for the next page; pages must be fetched sequentially)
   */
  readonly paginationStrategy: PaginationStrategy;
}
```

---

## ProviderManager Class

### `src/providers/ProviderManager.ts`

**Responsibilities:** orchestrate adapters, execute failover, coordinate historical fetch + stream connect, emit lifecycle events, route errors to `config.onError`.

```typescript
import { EventEmitter } from '../utils/EventEmitter';
import type { FinanceChart } from '../FinanceChart';
import type { ExchangeAdapter } from './adapters/ExchangeAdapter';
import type { ProviderConfig, ProviderEvents, ExchangeId, Interval } from './types';
import { ProviderError, INTERVAL_MS } from './types';
import { HistoricalDataFetcher } from './HistoricalDataFetcher';
import { RateLimiter } from './RateLimiter';
import { LRUCache } from './LRUCache';
import { SymbolResolver } from './SymbolResolver';
import type { OHLCVCandle } from '../types/market';

export class ProviderManager extends EventEmitter<ProviderEvents> {
  private readonly _fetcher: HistoricalDataFetcher;
  private readonly _cache: LRUCache;
  private readonly _resolver: SymbolResolver;
  private readonly _rateLimiters = new Map<ExchangeId, RateLimiter>();

  private _config: ProviderConfig | null = null;
  private _chart: FinanceChart | null = null;
  private _adapters: ExchangeAdapter[] = [];  // ranked by priority
  private _activeIdx = 0;
  private _errorCount = 0;
  private _disposed = false;

  // WebSocketAdapter send handle from StreamSubscription.onConnect
  private _wsSend?: (msg: string) => void;
  private _wsDisconnectHook?: (send: (msg: string) => void) => void;

  // Unsubscribe function for the chart's symbolChange bus event
  private _unsubSymbolChange?: () => void;

  constructor(
    adapters: ExchangeAdapter[],
    options?: {
      cacheMaxEntries?: number;  // default 200
      cacheMaxBytes?: number;    // default 50 * 1024 * 1024 (50 MB)
    },
  );

  /**
   * Connect a FinanceChart to a live data source.
   * Fetches historical data, then starts the live stream.
   * Calling connect() while already connected triggers a clean disconnection first.
   *
   * After connecting, ProviderManager subscribes to the chart's internal
   * `symbolChange` EventBus event (emitted by UIController when the user
   * changes the symbol input). On receipt, the manager automatically
   * disconnects the current stream and reconnects with the new symbol,
   * re-fetching historical data. The ProviderConfig is reused with only
   * `config.symbol` replaced.
   */
  async connect(chart: FinanceChart, config: ProviderConfig): Promise<void>;

  /**
   * Disconnect the active stream and stop all activity.
   * Unsubscribes from the chart symbolChange event.
   * Safe to call multiple times.
   */
  disconnect(): void;

  /** Currently active exchange ID, or null if not connected. */
  get activeExchange(): ExchangeId | null;

  /** True if a live stream is currently active. */
  get isStreaming(): boolean;

  dispose(): void;
}
```

**Internal algorithm for `connect()`:**

```
1. If already connected: call disconnect() to cleanly tear down the current stream.

2. Store chart reference and config:
   _chart  = chart
   _config = config

3. Resolve symbol:
   canonical = SymbolResolver.normalize(config.symbol)

4. Initialize adapters (parallel):
   await Promise.all(registeredAdapters.map(a => a.initialize?.() ?? Promise.resolve()))
   // no-op for adapters without initialize(); Coinbase/Kraken build symbol maps here
   // Errors are swallowed per-adapter (they fall back to heuristic resolution)

5. Build adapter priority list:
   If config.exchanges is set: use that order, skip exchanges where
     resolveSymbol(canonical) returns null.
   Else: call fetchSupportedSymbols() on all registered adapters in parallel,
     filter to those supporting canonical, rank by fastest response.
   If no adapter supports the symbol: throw ProviderError('SYMBOL_NOT_FOUND')

6. Set _activeIdx = 0, _errorCount = 0

7. Execute _connectWithAdapter(adapters[0])

8. Subscribe to chart symbol changes (SR-10):
   // ChartController's EventBus emits 'symbolChange' when the UI symbol input
   // changes. ProviderManager hooks into this via the chart's internal bus.
   // FinanceChart exposes a package-internal `_bus` EventBus for this purpose.
   _unsubSymbolChange = chart._bus.on('symbolChange', ({ symbol }) => {
     _handleSymbolChange(symbol)
   })

_connectWithAdapter(adapter):
  interval    = config.interval ?? '1m'
  nativeSymbol = adapter.resolveSymbol(canonical)
  intervalMs  = INTERVAL_MS[interval]

  // Historical phase
  if config.historicalLimit !== 0:
    cacheKey = buildCacheKey(...)
    cached = _cache.get(cacheKey)
    if cached:
      // Trim to historicalLimit if cache holds more candles than requested
      trimmed = cached.slice(-(config.historicalLimit ?? 500))
      chart.loadData(trimmed)
    else:
      emit('historical:start', ...)
      t0 = performance.now()
      candles = await _fetcher.fetch({
        adapter, nativeSymbol, interval,
        limit: config.historicalLimit ?? 500,
        startMs: config.historicalStartMs,
        acquirer: _rateLimiters.get(adapter.id)
      })
      _cache.set(cacheKey, candles, config.cacheTtlMs ?? 60_000)
      chart.loadData(candles)
      emit('historical:complete', { candleCount: candles.length, durationMs: ... })

  // Stream phase
  subscription = adapter.buildStreamSubscription(nativeSymbol, interval, intervalMs)

  // Wrap adapter's parseMessage to catch exceptions and route them to
  // _handleError() rather than letting them propagate uncaught through
  // WebSocketAdapter's onmessage handler. Also inject onOpen hook.
  streamOptions = {
    ...subscription.options,
    parseMessage: (ev) => {
      try {
        return subscription.options.parseMessage(ev);
      } catch (err) {
        _handleError(new ProviderError('PARSE_ERROR',
          `parseMessage threw: ${String(err)}`, adapter.id, err));
        return null;
      }
    },
    onOpen: (send) => {
      _wsSend            = send
      _wsDisconnectHook  = subscription.onDisconnect
      subscription.onConnect?.(send)
    },
  }

  chart.connectStream(streamOptions)
  emit('stream:connect', { exchange: adapter.id, url: streamOptions.url })

_handleSymbolChange(newSymbol):
  // Called when the UI symbol input changes (SR-10).
  // Disconnect the current stream, then reconnect with the new symbol.
  // The original ProviderConfig is reused with only symbol replaced.
  if _disposed: return
  savedConfig = _config   // save before disconnect() nulls it out
  savedChart  = _chart    // save before disconnect() nulls it out
  if not savedConfig or not savedChart: return
  newConfig = { ...savedConfig, symbol: newSymbol }
  disconnect()    // tears down stream, unsubscribes symbolChange, nulls _config/_chart
  connect(savedChart, newConfig).catch(err => newConfig.onError?.(err))

disconnect():
  if _wsSend and _wsDisconnectHook:
    try { _wsDisconnectHook(_wsSend) } catch { /* ignore */ }
  _wsSend            = undefined
  _wsDisconnectHook  = undefined
  _chart?.disconnectStream()
  _unsubSymbolChange?.()    // stop listening to symbol changes
  _unsubSymbolChange = undefined
  _config = null
  _chart  = null

_handleError(error):
  _errorCount++
  _config?.onError?.(error)
  emit('provider:error', { error, errorCount: _errorCount })
  if _errorCount >= (_config?.failoverThreshold ?? 3):
    _tryFailover()

_tryFailover():
  _activeIdx++
  if _activeIdx >= adapters.length:
    throw ProviderError('FAILOVER_EXHAUSTED', ...)
  _chart?.disconnectStream()
  _errorCount = 0
  prev = adapters[_activeIdx - 1].id
  next = adapters[_activeIdx].id
  emit('provider:change', { from: prev, to: next })
  _config?.onProviderChange?.(next)
  await _connectWithAdapter(adapters[_activeIdx])
```

---

## Exchange Adapter Specifications

### Binance Adapter

**File:** `src/providers/adapters/BinanceAdapter.ts`

#### REST

| Endpoint | URL | Purpose |
|---|---|---|
| Klines | `GET https://api.binance.com/api/v3/klines` | OHLCV candles |
| Exchange Info | `GET https://api.binance.com/api/v3/exchangeInfo` | Symbol list |
| Server time | `GET https://api.binance.com/api/v3/time` | Clock sync |

**Klines parameters:**

| Param | Type | Required | Notes |
|---|---|---|---|
| `symbol` | string | yes | e.g. `BTCUSDT` |
| `interval` | string | yes | `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`, `4h`, `6h`, `8h`, `12h`, `1d`, `3d`, `1w`, `1M` |
| `startTime` | number | no | Unix ms |
| `endTime` | number | no | Unix ms |
| `limit` | number | no | 1–1500, default 500 |

**Klines response shape (each element is an array):**

```
[
  [
    1499040000000,      // [0] Open time (ms)
    "0.01634790",       // [1] Open
    "0.80000000",       // [2] High
    "0.01575800",       // [3] Low
    "0.01577100",       // [4] Close
    "148976.11427815",  // [5] Volume
    1499644799999,      // [6] Close time (ms)
    "2434.19055334",    // [7] Quote asset volume
    308,                // [8] Number of trades
    "1756.87402397",    // [9] Taker buy base asset volume
    "28.46694368",      // [10] Taker buy quote asset volume
    "17928899.62484339" // [11] Ignore
  ],
  ...
]
```

**Mapping to OHLCVCandle:**

```typescript
function parseKline(row: unknown[]): OHLCVCandle {
  return {
    time:   row[0] as number,
    open:   parseFloat(row[1] as string),
    high:   parseFloat(row[2] as string),
    low:    parseFloat(row[3] as string),
    close:  parseFloat(row[4] as string),
    volume: parseFloat(row[5] as string),
    trades: row[8] as number,
  };
}
```

**Rate limits (Binance public REST, as of 2025):**

| Bucket | Limit | Window |
|---|---|---|
| `X-MBX-USED-WEIGHT-1M` | 6000 weight | 1 minute |
| `/api/v3/klines` | 2 weight per request | — |
| `/api/v3/exchangeInfo` | 20 weight per request | — |

The adapter tracks `rateLimits.restKlines = { requestsPerWindow: 3000, windowMs: 60_000 }` (conservative: 3000 / 2 weight = 1500 effective kline requests/min).

**Authentication:** None required for public endpoints.

**`maxCandlesPerRequest`:** 1500

**`paginationStrategy`:** `'time-window'`

**Supported intervals:** All 16 standard intervals listed above.

#### WebSocket

**Base URL:** `wss://stream.binance.com:9443/ws/{streamName}`

**Kline stream name pattern:** `{symbol}@kline_{interval}`
**Example:** `wss://stream.binance.com:9443/ws/btcusdt@kline_1m`

(Symbol must be **lowercase** in the stream URL.)

**No subscription message required** — the symbol and interval are encoded in the URL. `StreamSubscription.onConnect` is a no-op.

**Incoming kline message format:**

```json
{
  "e": "kline",
  "E": 1672515782136,
  "s": "BTCUSDT",
  "k": {
    "t": 1672515780000,
    "T": 1672515839999,
    "s": "BTCUSDT",
    "i": "1m",
    "o": "0.0010",
    "c": "0.0020",
    "h": "0.0025",
    "l": "0.0015",
    "v": "1000",
    "n": 100,
    "x": false,
    "q": "1.0000",
    "V": "500",
    "Q": "0.500",
    "B": "123456"
  }
}
```

**parseMessage function:**

```typescript
function parseBinanceKline(ev: MessageEvent): OHLCVCandle | null {
  const data: BinanceKlineMessage = JSON.parse(ev.data as string);
  if (data.e !== 'kline' || !data.k) return null;
  const k = data.k;
  return {
    time:   k.t,
    open:   parseFloat(k.o),
    high:   parseFloat(k.h),
    low:    parseFloat(k.l),
    close:  parseFloat(k.c),
    volume: parseFloat(k.v),
    trades: k.n,
  };
}
```

Note: `k.x === true` means the candle is closed (finalized). When `k.x === false`, the candle is in-progress. The `TickAggregator` does not need to distinguish these because `WebSocketAdapter` emits `OHLCVCandle` events directly (no `Tick` aggregation needed for kline streams). The parser returns an `OHLCVCandle` on every message; `appendCandle` vs `patchLastCandle` semantics are handled by the scheduler detecting whether the time bucket has advanced.

**Heartbeat:** Binance requires a pong response to server-sent ping frames. The native `WebSocket` in browsers handles ping/pong at the protocol level automatically. The `heartbeatIntervalMs` in `StreamConnectOptions` should be set to `0` (disabled) for Binance — the server sends pings every 3 minutes.

**Symbol resolver:**

```typescript
// Canonical "BTC/USDT" → "BTCUSDT" (concatenate, remove slash)
resolveSymbol(canonical: string): string {
  return canonical.replace('/', '').toUpperCase();
}
```

---

### Coinbase Advanced Trade Adapter

**File:** `src/providers/adapters/CoinbaseAdapter.ts`

#### REST

| Endpoint | URL | Purpose |
|---|---|---|
| Candles | `GET https://api.coinbase.com/api/v3/brokerage/market/products/{product_id}/candles` | OHLCV |
| List Products | `GET https://api.coinbase.com/api/v3/brokerage/market/products` | Symbol list |

**Candles parameters:**

| Param | Type | Required | Notes |
|---|---|---|---|
| `start` | string | yes | Unix seconds as string |
| `end` | string | yes | Unix seconds as string |
| `granularity` | string | yes | see mapping below |
| `limit` | number | no | max 350 |

**Interval → granularity mapping:**

```typescript
const COINBASE_GRANULARITY: Partial<Record<Interval, string>> = {
  '1m':  'ONE_MINUTE',
  '5m':  'FIVE_MINUTE',
  '15m': 'FIFTEEN_MINUTE',
  '30m': 'THIRTY_MINUTE',
  '1h':  'ONE_HOUR',
  '2h':  'TWO_HOUR',
  '6h':  'SIX_HOUR',
  '1d':  'ONE_DAY',
};
```

Unsupported intervals: `3m`, `8h`, `4h`, `12h`, `3d`, `1w`, `1M`.
`supportsInterval()` returns `false` for these; the manager will skip Coinbase if the requested interval is unsupported.

**Candles response shape:**

```json
{
  "candles": [
    {
      "start": "1639508050",
      "low": "46280.27",
      "high": "46280.27",
      "open": "46280.27",
      "close": "46280.27",
      "volume": "0.032"
    }
  ]
}
```

Note: Coinbase returns candles in **descending** order (newest first). The adapter must reverse the array before returning.

**Mapping to OHLCVCandle:**

```typescript
function parseCoinbaseCandle(c: CoinbaseCandle): OHLCVCandle {
  return {
    time:   parseInt(c.start, 10) * 1000, // seconds → ms
    open:   parseFloat(c.open),
    high:   parseFloat(c.high),
    low:    parseFloat(c.low),
    close:  parseFloat(c.close),
    volume: parseFloat(c.volume),
  };
}
```

**Rate limits:**

| Bucket | Limit | Window |
|---|---|---|
| Public endpoints | 10 requests/second | rolling 1s |

Adapter sets `rateLimits.restKlines = { requestsPerWindow: 10, windowMs: 1_000 }`.

**Authentication:** The Advanced Trade REST endpoints used here (`/market/products`) are public — no auth required. The candles endpoint **also** does not require auth for public market data.

**`maxCandlesPerRequest`:** 350

**`paginationStrategy`:** `'time-window'`

#### WebSocket

**URL:** `wss://advanced-trade-ws.coinbase.com`

**Subscription message** (sent after connect):

```json
{
  "type": "subscribe",
  "product_ids": ["BTC-USD"],
  "channel": "candles"
}
```

**Unsubscription message:**

```json
{
  "type": "unsubscribe",
  "product_ids": ["BTC-USD"],
  "channel": "candles"
}
```

**Incoming candles event format:**

```json
{
  "channel": "candles",
  "client_id": "",
  "timestamp": "2023-02-09T20:32:57.000726Z",
  "sequence_num": 0,
  "events": [
    {
      "type": "snapshot",
      "candles": [
        {
          "start": "1639508050",
          "high": "46280.27",
          "low": "46000.00",
          "open": "46100.00",
          "close": "46280.27",
          "volume": "0.5",
          "product_id": "BTC-USD"
        }
      ]
    }
  ]
}
```

The `type` field in each event object is `"snapshot"` (initial state) or `"update"` (incremental). Both are parsed identically into `OHLCVCandle`.

**parseMessage function:**

```typescript
function parseCoinbaseMessage(ev: MessageEvent): OHLCVCandle | null {
  const msg: CoinbaseWsMessage = JSON.parse(ev.data as string);
  if (msg.channel !== 'candles') return null;
  const events = msg.events ?? [];
  // Take only the last candle from the most recent event (live update)
  for (let i = events.length - 1; i >= 0; i--) {
    const candles = events[i].candles;
    if (candles && candles.length > 0) {
      return parseCoinbaseCandle(candles[candles.length - 1]);
    }
  }
  return null;
}
```

**Symbol resolver:**

The product map populated by `initialize()` is the authoritative source. See the `initialize()` and `resolveSymbol()` implementations below.

**`initialize()` implementation:**

```typescript
// Called once by ProviderManager before any resolveSymbol() call.
async initialize(): Promise<void> {
  try {
    const res = await this._fetch(
      'https://api.coinbase.com/api/v3/brokerage/market/products'
    );
    if (!res.ok) return;  // degrade gracefully; resolveSymbol will return null
    const { products } = await res.json() as { products: Array<{ product_id: string }> };
    this._productMap = new Map<string, string>();
    for (const p of products) {
      // "BTC-USD" → canonical "BTC/USD"
      const canonical = p.product_id.replace('-', '/');
      this._productMap.set(canonical.toUpperCase(), p.product_id);
    }
  } catch {
    // Network failure: fall back to heuristic in resolveSymbol()
  }
}
```

**`resolveSymbol()` implementation (uses pre-populated map):**

```typescript
resolveSymbol(canonical: string): string | null {
  if (this._productMap) {
    return this._productMap.get(canonical.toUpperCase()) ?? null;
  }
  // Fallback heuristic if initialize() was skipped or failed:
  // BTC/USDT → "BTC-USDT", BTC/USD → "BTC-USD"
  return canonical.replace('/', '-').toUpperCase();
}
```

Note: Coinbase primarily trades USD pairs, not USDT. `BTC/USDT` canonical will typically not resolve on Coinbase (returns `null` from the product map). The product map from `initialize()` is authoritative; the fallback heuristic is only used if initialization failed.

---

### Kraken Adapter

**File:** `src/providers/adapters/KrakenAdapter.ts`

#### REST

| Endpoint | URL | Purpose |
|---|---|---|
| OHLC | `GET https://api.kraken.com/0/public/OHLC` | OHLCV candles |
| Asset Pairs | `GET https://api.kraken.com/0/public/AssetPairs` | Symbol list |

**OHLC parameters:**

| Param | Type | Required | Notes |
|---|---|---|---|
| `pair` | string | yes | e.g. `XBTUSD`, `BTCUSDT` |
| `interval` | number | yes | minutes: 1, 5, 15, 30, 60, 240, 1440, 10080, 21600 |
| `since` | number | no | Unix seconds (returns candles **since** this time) |

**Interval → minutes mapping:**

```typescript
const KRAKEN_INTERVAL_MINUTES: Partial<Record<Interval, number>> = {
  '1m':  1,
  '5m':  5,
  '15m': 15,
  '30m': 30,
  '1h':  60,
  '4h':  240,
  '1d':  1440,
  '1w':  10080,
};
```

Unsupported: `3m`, `2h`, `6h`, `8h`, `12h`, `3d`, `1M`.

**OHLC response shape:**

```json
{
  "error": [],
  "result": {
    "XXBTZUSD": [
      [1688671200, "30306.1", "30306.2", "30305.7", "30306.1", "30306.1", "0.07484060", 4],
      ...
    ],
    "last": 1688756400
  }
}
```

Array indices: `[0]=time(s), [1]=open, [2]=high, [3]=low, [4]=close, [5]=vwap, [6]=volume, [7]=count`

**Mapping to OHLCVCandle:**

```typescript
function parseKrakenOhlc(row: unknown[]): OHLCVCandle {
  return {
    time:   (row[0] as number) * 1000,   // seconds → ms
    open:   parseFloat(row[1] as string),
    high:   parseFloat(row[2] as string),
    low:    parseFloat(row[3] as string),
    close:  parseFloat(row[4] as string),
    volume: parseFloat(row[6] as string),
    trades: row[7] as number,
  };
}
```

**Important:** Kraken always returns the **last** 720 candles. There is no `endTime` parameter. To fetch older data, use the `since` parameter with successive pages using the `last` value from each response. This pagination direction is **ascending** (oldest-first from `since`).

**`paginationStrategy`:** `'cursor'`

`KrakenAdapter.fetchKlines()` must extract the `last` field from the response and return it as `result.nextCursor` (in Unix seconds). `HistoricalDataFetcher` uses this cursor in successive pages.

```typescript
// KrakenAdapter.fetchKlines() — cursor extraction
const last: number = response.result['last'];
return {
  candles:     parsedCandles,
  truncated:   parsedCandles.length >= this.maxCandlesPerRequest,
  source:      'kraken',
  nextCursor:  last,   // Unix seconds; HistoricalDataFetcher advances `since` to this value
};
```

**Error handling:** Kraken wraps errors in the response body as `{ "error": ["EGeneral:Invalid arguments"] }`. HTTP status is often still 200. The adapter must check `response.error.length > 0` and throw `ProviderError('PARSE_ERROR' | 'SYMBOL_NOT_FOUND')` accordingly.

**Rate limits (Kraken):**

| Tier | Limit |
|---|---|
| Unauthenticated public REST | 1 request/second (rolling) |

`rateLimits.restKlines = { requestsPerWindow: 1, windowMs: 1_000 }`.

**`maxCandlesPerRequest`:** 720

**Symbol resolver:**

Kraken uses non-standard symbols: `BTC` is `XBT`, `DOGE` is `XDG`. The resolver must maintain a static alias map:

```typescript
const KRAKEN_BASE_ALIASES: Record<string, string> = {
  'BTC': 'XBT',
  'DOGE': 'XDG',
};
const KRAKEN_QUOTE_ALIASES: Record<string, string> = {
  'USD': 'USD',   // Kraken uses both ZUSD and USD in pairs
  'EUR': 'EUR',
};

// Canonical "BTC/USD" → attempts "XBTUSD", "XXBTZUSD", "XBTZUSD"
// Resolved by matching against the _symbolMap populated during initialize()
```

`KrakenAdapter.initialize()` fetches `/0/public/AssetPairs` and builds the dynamic symbol lookup table (`_symbolMap: Map<CanonicalSymbol, string>`). The static alias map handles the most common mismatches but the dynamic list is authoritative. `fetchSupportedSymbols()` may reuse the already-fetched data if `initialize()` has run; otherwise it fetches independently.

#### WebSocket

**URL:** `wss://ws.kraken.com`

**Subscription message** (sent after connect, v2 API):

```json
{
  "method": "subscribe",
  "params": {
    "channel": "ohlc",
    "symbol": ["BTC/USD"],
    "interval": 1
  }
}
```

**`interval`** is in minutes (same integers as REST).

**Unsubscription message:**

```json
{
  "method": "unsubscribe",
  "params": {
    "channel": "ohlc",
    "symbol": ["BTC/USD"],
    "interval": 1
  }
}
```

**Incoming ohlc message format (v2 WebSocket API):**

```json
{
  "channel": "ohlc",
  "type": "update",
  "data": [
    {
      "symbol": "BTC/USD",
      "open": "30000.00",
      "high": "30100.00",
      "low": "29900.00",
      "close": "30050.00",
      "vwap": "30010.00",
      "trades": 150,
      "volume": "12.345",
      "interval_begin": "2023-07-06T20:00:00.000000Z",
      "interval": 1,
      "timestamp": "2023-07-06T20:00:59.000000Z"
    }
  ]
}
```

**parseMessage function:**

```typescript
function parseKrakenMessage(ev: MessageEvent): OHLCVCandle | null {
  const msg: KrakenWsMessage = JSON.parse(ev.data as string);
  if (msg.channel !== 'ohlc' || !msg.data?.length) return null;
  const d = msg.data[0];
  return {
    time:   new Date(d.interval_begin).getTime(),
    open:   parseFloat(d.open),
    high:   parseFloat(d.high),
    low:    parseFloat(d.low),
    close:  parseFloat(d.close),
    volume: parseFloat(d.volume),
    trades: d.trades,
  };
}
```

**Note:** Kraken v2 WebSocket uses `"BTC/USD"` symbol format (with slash), while the REST API uses concatenated pairs. The adapter's `buildStreamSubscription()` must use the slash format for WebSocket calls, which is the canonical form Kraken's v2 WS API expects.

---

### Bybit Adapter

**File:** `src/providers/adapters/BybitAdapter.ts`

#### REST

| Endpoint | URL | Purpose |
|---|---|---|
| Kline | `GET https://api.bybit.com/v5/market/kline` | OHLCV candles (spot) |
| Instruments Info | `GET https://api.bybit.com/v5/market/instruments-info?category=spot` | Symbol list |

**Kline parameters:**

| Param | Type | Required | Notes |
|---|---|---|---|
| `category` | string | yes | `spot` |
| `symbol` | string | yes | e.g. `BTCUSDT` |
| `interval` | string | yes | see mapping |
| `start` | number | no | Unix ms |
| `end` | number | no | Unix ms |
| `limit` | number | no | 1–1000, default 200 |

**Interval mapping:**

```typescript
const BYBIT_INTERVAL: Partial<Record<Interval, string>> = {
  '1m':  '1',
  '3m':  '3',
  '5m':  '5',
  '15m': '15',
  '30m': '30',
  '1h':  '60',
  '2h':  '120',
  '4h':  '240',
  '6h':  '360',
  '12h': '720',
  '1d':  'D',
  '1w':  'W',
  '1M':  'M',
};
```

Unsupported: `8h`, `3d`.

**Kline response shape:**

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "symbol": "BTCUSDT",
    "category": "spot",
    "list": [
      ["1670608800000", "17071", "17073", "17027", "17058.5", "268611.286", "15.74"],
      ...
    ]
  }
}
```

Array indices: `[0]=startTime(ms), [1]=open, [2]=high, [3]=low, [4]=close, [5]=volume(base), [6]=turnover(quote)`

Note: Bybit returns candles in **descending** order. The adapter must reverse the array.

**Error handling:** Check `retCode !== 0` and map to appropriate `ProviderError`. Common codes: `10001` = parameter error, `10002` = API key invalid (should not occur for public), `10006` = rate limit.

**Rate limits (Bybit public):**

| Endpoint | Limit |
|---|---|
| `/v5/market/kline` | 120 requests / 5 seconds per IP |

`rateLimits.restKlines = { requestsPerWindow: 120, windowMs: 5_000 }`.

**`maxCandlesPerRequest`:** 1000

**`paginationStrategy`:** `'time-window'`

**Symbol resolver:**

```typescript
// Canonical "BTC/USDT" → "BTCUSDT"
resolveSymbol(canonical: string): string {
  return canonical.replace('/', '').toUpperCase();
}
```

#### WebSocket

**URL:** `wss://stream.bybit.com/v5/public/spot`

**Subscription message** (sent after connect):

```json
{
  "op": "subscribe",
  "args": ["kline.1.BTCUSDT"]
}
```

Format: `"kline.{interval}.{symbol}"` where interval is the same numeric/letter string as REST.

**Unsubscription message:**

```json
{
  "op": "unsubscribe",
  "args": ["kline.1.BTCUSDT"]
}
```

**Heartbeat:** Bybit requires the client to send a ping every 20 seconds:

```json
{"op": "ping"}
```

Expected pong response:

```json
{"op": "pong", "args": ["..."], "ret_msg": "pong", "conn_id": "...", "success": true}
```

The `WebSocketAdapter` heartbeat mechanism (`heartbeatIntervalMs: 20_000`) should be configured to send `'{"op":"ping"}'` (not the default `'ping'` string). This requires the `parseMessage` function to silently return `null` for pong frames.

**Incoming kline message format:**

```json
{
  "topic": "kline.1.BTCUSDT",
  "data": [
    {
      "start": 1672324800000,
      "end": 1672324859999,
      "interval": "1",
      "open": "16961.5",
      "close": "16987",
      "high": "16987",
      "low": "16961.5",
      "volume": "43.001",
      "turnover": "728.2577",
      "confirm": false,
      "timestamp": 1672324828074
    }
  ],
  "ts": 1672324828074,
  "type": "snapshot"
}
```

`confirm: true` = candle is closed.

**parseMessage function:**

```typescript
function parseBybitMessage(ev: MessageEvent): OHLCVCandle | null {
  const msg: BybitWsMessage = JSON.parse(ev.data as string);
  if (!msg.topic?.startsWith('kline.') || !msg.data?.length) return null;
  const d = msg.data[0];
  return {
    time:   d.start,
    open:   parseFloat(d.open),
    high:   parseFloat(d.high),
    low:    parseFloat(d.low),
    close:  parseFloat(d.close),
    volume: parseFloat(d.volume),
  };
}
```

---

### Deribit Adapter (Optional)

**File:** `src/providers/adapters/DeribitAdapter.ts`

Deribit is a derivatives exchange (options and futures). It uses a JSON-RPC 2.0 protocol over WebSocket for both subscriptions and public REST calls.

#### REST

**Base URL:** `https://www.deribit.com/api/v2`

| Endpoint | URL | Purpose |
|---|---|---|
| Get TradingView Chart Data | `GET /public/get_tradingview_chart_data` | OHLCV candles |
| Get Instruments | `GET /public/get_instruments` | Symbol list |

**Candles parameters:**

| Param | Type | Required | Notes |
|---|---|---|---|
| `instrument_name` | string | yes | e.g. `BTC-PERPETUAL` |
| `start_timestamp` | number | yes | Unix ms |
| `end_timestamp` | number | yes | Unix ms |
| `resolution` | string | yes | see mapping |

**Resolution mapping:**

```typescript
const DERIBIT_RESOLUTION: Partial<Record<Interval, string>> = {
  '1m':  '1',
  '3m':  '3',
  '5m':  '5',
  '15m': '15',
  '30m': '30',
  '1h':  '60',
  '2h':  '120',
  '4h':  '240',
  '12h': '720',
  '1d':  '1D',
};
```

**Response shape:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "ticks": [1599872400000, ...],
    "open": [11459.5, ...],
    "high": [11528.5, ...],
    "low": [11454.5, ...],
    "close": [11528.5, ...],
    "volume": [312.456, ...],
    "cost": [...]
  }
}
```

Note: The response uses parallel arrays indexed by candle number, not an array of objects. The adapter must zip these arrays into `OHLCVCandle[]`.

**`maxCandlesPerRequest`:** 5000 (Deribit allows large ranges but the request must stay within 5000 ticks).

**`paginationStrategy`:** `'time-window'`

#### WebSocket

**URL:** `wss://www.deribit.com/ws/api/v2`

**Subscription** uses JSON-RPC over WebSocket. After connect, send:

```json
{
  "jsonrpc": "2.0",
  "method": "public/subscribe",
  "id": 42,
  "params": {
    "channels": ["chart.trades.BTC-PERPETUAL.1"]
  }
}
```

Channel format: `"chart.trades.{instrument}.{resolution}"`.

**JSON-RPC request-ID correlation:**

Deribit's WebSocket protocol uses JSON-RPC 2.0. Every request sent by the client includes an `"id"` field; the server echoes this `"id"` back in a response frame to confirm the action (e.g. subscription confirmed). Separately, the server sends data frames that do NOT contain an `"id"` but do contain `"method": "subscription"`.

`DeribitAdapter` maintains an internal `Map<number, (result: unknown) => void>` of pending RPC callbacks. The subscribe frame sent via `onConnect` uses a locally generated request ID. When a response frame arrives with the same `"id"`, the stored callback is invoked and removed from the map. Data frames (which carry `"method": "subscription"` and no `"id"`) are routed to `parseMessage` for OHLCV extraction.

```typescript
// Inside DeribitAdapter (simplified):
private _pendingRpc = new Map<number, (result: unknown) => void>();
private _nextId = 1;

// Called inside onConnect:
private _sendSubscribe(send: (msg: string) => void, channel: string): void {
  const id = this._nextId++;
  const payload = JSON.stringify({
    jsonrpc: '2.0',
    method:  'public/subscribe',
    id,
    params:  { channels: [channel] },
  });
  this._pendingRpc.set(id, (result) => {
    // result is the array of successfully subscribed channels
    // Subscription confirmed — no further action needed for market data
  });
  send(payload);
}
```

**Frame routing in `parseMessage`:**

```typescript
function parseDeribitMessage(ev: MessageEvent): OHLCVCandle | null {
  const msg: DeribitWsMessage = JSON.parse(ev.data as string);

  // Subscription confirm frame (has "id", no "method: subscription"):
  if (msg.id !== undefined && msg.result !== undefined) {
    // Route to pending RPC callback if registered; otherwise ignore
    // Note: DeribitAdapter exposes a `handleRpcResponse(msg)` method called
    // from a wrapper `parseMessage` so the adapter instance can access
    // _pendingRpc. See buildStreamSubscription() for the wrapper pattern.
    return null;
  }

  // Data frame:
  if (msg.method !== 'subscription') return null;
  const channel: string = msg.params?.channel ?? '';
  if (!channel.startsWith('chart.trades.')) return null;
  const d = msg.params.data;
  return {
    time:   d.tick,
    open:   d.open,
    high:   d.high,
    low:    d.low,
    close:  d.close,
    volume: d.volume,
  };
}
```

**`buildStreamSubscription()` wrapper pattern** (giving `parseMessage` access to the adapter instance):

```typescript
buildStreamSubscription(nativeSymbol: string, interval: Interval, intervalMs: number): StreamSubscription {
  const resolution = DERIBIT_RESOLUTION[interval]!;
  const channel    = `chart.trades.${nativeSymbol}.${resolution}`;

  return {
    options: {
      url:         'wss://www.deribit.com/ws/api/v2',
      intervalMs,
      // Arrow function closes over `this` so handleRpcResponse can be called:
      parseMessage: (ev: MessageEvent) => this._parseMessage(ev, channel),
    },
    onConnect:    (send) => this._sendSubscribe(send, channel),
    onDisconnect: (send) => this._sendUnsubscribe(send, channel),
  };
}

private _parseMessage(ev: MessageEvent, channel: string): OHLCVCandle | null {
  const msg: DeribitWsMessage = JSON.parse(ev.data as string);
  if (msg.id !== undefined && msg.result !== undefined) {
    this._pendingRpc.get(msg.id as number)?.(msg.result);
    this._pendingRpc.delete(msg.id as number);
    return null;
  }
  if (msg.method !== 'subscription') return null;
  if ((msg.params?.channel ?? '') !== channel) return null;
  const d = msg.params!.data;
  return {
    time:   d.tick,
    open:   d.open,
    high:   d.high,
    low:    d.low,
    close:  d.close,
    volume: d.volume,
  };
}
```

**Incoming data frame format (unchanged):**

```json
{
  "jsonrpc": "2.0",
  "method": "subscription",
  "params": {
    "channel": "chart.trades.BTC-PERPETUAL.1",
    "data": {
      "tick": 1634217600000,
      "open": 60000.0,
      "high": 60100.0,
      "low": 59900.0,
      "close": 60050.0,
      "volume": 1.234,
      "cost": 74062.0
    }
  }
}
```

**Subscription confirm frame format:**

```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": ["chart.trades.BTC-PERPETUAL.1"]
}
```
```

---

## HistoricalDataFetcher

### `src/providers/HistoricalDataFetcher.ts`

**Responsibilities:** Paginate exchange REST endpoints across a time range; handle gap-filling; enforce maximum candle count; return a single sorted, deduplicated `OHLCVCandle[]`. Selects between `TimeWindowStrategy` and `CursorStrategy` based on `adapter.paginationStrategy`.

```typescript
export interface FetchOptions {
  adapter: ExchangeAdapter;
  nativeSymbol: string;
  interval: Interval;
  /** Token acquirer — pass a RateLimiter instance or a no-op stub in tests. */
  acquirer: TokenAcquirer;
  /** Total candles desired. Fetcher will issue multiple pages if needed. */
  limit: number;
  /**
   * Absolute start time (Unix ms). If not provided, fetcher works backwards
   * from `endMs`, computing startMs = endMs - limit * INTERVAL_MS[interval].
   */
  startMs?: number;
  /** End time (Unix ms). Defaults to Date.now(). */
  endMs?: number;
  /**
   * Maximum parallel fetch requests. Default 3.
   * Ignored when adapter.paginationStrategy === 'cursor' (cursor pagination
   * is inherently sequential).
   */
  maxParallelRequests?: number;
  /** Abort signal for cancellation. */
  signal?: AbortSignal;
}

export class HistoricalDataFetcher {
  async fetch(options: FetchOptions): Promise<OHLCVCandle[]>;
}
```

**Algorithm — TimeWindowStrategy** (`adapter.paginationStrategy === 'time-window'`):

Used by Binance, Coinbase, Bybit, Deribit.

```
1. Compute effective time range:
   endMs   = options.endMs ?? Date.now()
   startMs = options.startMs ?? (endMs - options.limit * INTERVAL_MS[interval])

2. Compute pages:
   totalMs       = endMs - startMs
   candlesNeeded = Math.ceil(totalMs / INTERVAL_MS[interval])
   pageSize      = adapter.maxCandlesPerRequest
   pages         = Math.ceil(candlesNeeded / pageSize)

3. Build page time windows:
   For page i from 0 to pages-1:
     pageStart = startMs + i * pageSize * INTERVAL_MS[interval]
     pageEnd   = min(pageStart + pageSize * INTERVAL_MS[interval], endMs)

4. Fetch pages with bounded parallelism (Promise pool of size maxParallelRequests):
   For each page window:
     await acquirer.acquire()
     result = await adapter.fetchKlines({ exchange, symbol, interval,
                startMs: pageStart, endMs: pageEnd, limit: pageSize })
     collect result.candles

5. Merge, deduplicate, and trim — see common steps below.
```

**Algorithm — CursorStrategy** (`adapter.paginationStrategy === 'cursor'`):

Used by Kraken. Pages are always fetched sequentially because each page's cursor comes from the previous response.

```
1. Compute effective time range (same as TimeWindowStrategy step 1).

2. Initialize:
   cursor    = Math.floor(startMs / 1000)   // Kraken `since` is Unix seconds
   collected = []

3. Loop (fetch forward from cursor until endMs is reached or limit is satisfied):
   while collected.length < options.limit:
     if signal?.aborted: throw DOMException('AbortError')

     await acquirer.acquire()
     result = await adapter.fetchKlines({
       exchange, symbol, interval,
       startMs: cursor * 1000,   // pass cursor as startMs; adapter maps to `since`
       endMs: undefined,          // Kraken ignores endMs — it returns up to 720 from `since`
       limit: adapter.maxCandlesPerRequest,
     })

     if result.candles.length === 0: break  // no more data

     // Kraken returns `result.cursor` (the raw `last` value from the response,
     // forwarded by the adapter via HistoricalFetchResult.nextCursor).
     // KrakenAdapter must populate `result.nextCursor` with the `last` field.
     nextCursor = result.nextCursor
     if nextCursor === undefined or nextCursor === cursor: break  // no progress

     // Filter to requested time range (Kraken may return candles outside the range)
     // startMs and endMs are the effective values computed in step 1.
     for candle of result.candles:
       if candle.time >= startMs and candle.time <= endMs:
         collected.push(candle)

     cursor = nextCursor

4. Merge, deduplicate, and trim — see common steps below.
```

**Note:** `HistoricalFetchResult.nextCursor` is defined in `types.ts` (see Interface Definitions section). `KrakenAdapter.fetchKlines()` must populate this field with the `last` value from the OHLC response body.

**Common post-fetch steps (both strategies):**

```
Merge and deduplicate:
  combined     = sort all collected candles by time ascending
  deduplicated = unique by time field (keep first occurrence)

Trim to options.limit (take last N candles — most recent):
  return combined.slice(-options.limit)
```

**Gap detection:** After merging, if any two consecutive candles have a time gap > `2 * INTERVAL_MS[interval]`, the gap is logged as a warning. No automatic gap-fill is attempted — the chart renders with the available data.

**Cancellation:** If `signal.aborted` is true when a page is about to be fetched, the fetcher throws `DOMException('AbortError')`. In-flight fetch calls are passed the same signal.

---

## RateLimiter

### `src/providers/RateLimiter.ts`

Token bucket implementation. One `RateLimiter` instance is created per adapter, per endpoint group. `ProviderManager` creates these instances and passes them to the adapter's `fetchKlines()` and the `HistoricalDataFetcher`.

```typescript
export class RateLimiter {
  constructor(config: RateLimitConfig);

  /**
   * Acquire a token. Resolves immediately if tokens are available.
   * If the bucket is empty, resolves after the wait time needed for
   * the next token to refill.
   * Weight defaults to config.weight ?? 1.
   */
  acquire(weight?: number): Promise<void>;

  /**
   * Synchronously check whether a request can proceed without waiting.
   * Used by the fetcher to skip already-saturated adapters during failover.
   */
  canAcquireNow(weight?: number): boolean;

  /** Current available tokens. */
  get availableTokens(): number;

  /** Reset the bucket (e.g. after a 429 response with Retry-After header). */
  reset(waitMs?: number): void;
}
```

**Internal state:**

```
tokens        = config.requestsPerWindow  (starts full)
windowStart   = performance.now()
windowMs      = config.windowMs
maxTokens     = config.requestsPerWindow
```

**`acquire(weight)` algorithm:**

```
refill():
  now = performance.now()
  elapsed = now - windowStart
  if elapsed >= windowMs:
    tokens = maxTokens
    windowStart = now

acquire(weight = 1):
  refill()
  if tokens >= weight:
    tokens -= weight
    return (resolved immediately)
  else:
    waitMs = windowMs - (performance.now() - windowStart) + 1
    return new Promise(resolve => setTimeout(resolve, waitMs))
    // After wait, recurse once to handle the case where multiple callers
    // woke simultaneously and exhaust the refilled bucket.
```

**HTTP 429 handling:** When an adapter receives HTTP 429, it must delay by the `Retry-After` response header value (in seconds × 1000) before retrying. If the header is absent, a default 60-second delay is used. The adapter calls `await new Promise(r => setTimeout(r, retryAfterMs))` directly — it does not call `acquirer.reset()` because `TokenAcquirer` does not expose `reset()`. After the delay, the adapter retries once. If the retry also returns 429, throw `ProviderError('RATE_LIMITED')`.

Note: `ProviderManager` may separately call `rateLimiter.reset(retryAfterMs)` on the `RateLimiter` instance it holds for this adapter to drain the bucket and prevent other concurrent pages from also firing during the backoff window.

---

## LRUCache

### `src/providers/LRUCache.ts`

In-memory LRU cache for historical candle data. Evicts by both entry count and approximate byte usage.

```typescript
export interface LRUCacheOptions {
  maxEntries?: number;  // default 200
  maxBytes?:   number;  // default 50 * 1024 * 1024 (50 MB)
}

export class LRUCache {
  constructor(options?: LRUCacheOptions);

  /**
   * Store candles under a cache key.
   * @param key   - Stringified CacheKey
   * @param value - Sorted OHLCVCandle[]
   * @param ttlMs - Time-to-live in milliseconds
   */
  set(key: string, value: OHLCVCandle[], ttlMs: number): void;

  /**
   * Retrieve candles if not expired.
   * Returns null on miss or expiry; promotes entry to MRU position on hit.
   */
  get(key: string): OHLCVCandle[] | null;

  /** Explicitly invalidate an entry. */
  delete(key: string): void;

  /** Clear all entries. */
  clear(): void;

  get size(): number;
  get byteEstimate(): number;
}
```

**Cache key construction:**

```typescript
function buildCacheKey(key: CacheKey): string {
  // Normalize endMs to interval bucket to maximize cache hits when
  // endMs is "now" and called twice within one interval.
  const bucketedEnd = Math.floor((key.endMs) / INTERVAL_MS[key.interval])
    * INTERVAL_MS[key.interval];
  return `${key.exchange}:${key.symbol}:${key.interval}:${key.startMs}:${bucketedEnd}`;
}
```

**Byte estimation:** Each `OHLCVCandle` is approximately `6 * 8 = 48 bytes` (6 number fields × 8 bytes). The `trades` field adds another 8 bytes if present. The cache tracks `entries.length * 56` bytes per array as an approximation.

**LRU eviction:** Implemented with a `Map<string, CacheEntry>` (ES6 Map preserves insertion order). On `get`, delete and re-insert to promote. Eviction removes the first (oldest) entry in the Map until under budget.

---

## SymbolResolver

### `src/providers/SymbolResolver.ts`

```typescript
export class SymbolResolver {
  /**
   * Normalize a user-provided symbol string into CanonicalSymbol form.
   * Handles:
   *   "BTCUSDT"  → "BTC/USDT"
   *   "BTC-USD"  → "BTC/USD"
   *   "BTC/USD"  → "BTC/USD" (passthrough)
   *   "XBT/USD"  → "BTC/USD" (alias normalization)
   *   "btcusdt"  → "BTC/USDT" (lowercase input)
   * Returns null if the string cannot be parsed.
   */
  normalize(symbol: string): CanonicalSymbol | null;

  /**
   * Register a canonical alias (e.g. XBT → BTC).
   * Called during initialization for known Kraken/Deribit symbol aliases.
   */
  registerAlias(from: string, to: string): void;
}
```

**Normalization algorithm:**

```
1. Uppercase and trim.
2. If contains '/': split on '/', apply aliases to each part, rejoin with '/'.
3. If contains '-': split on '-', apply aliases, rejoin with '/'.
4. If no separator: attempt known quote suffixes in order:
   ["USDT", "USD", "BTC", "ETH", "EUR", "USDC", "BNB", "BUSD"]
   If symbol ends with one of these suffixes:
     base  = symbol[0 .. -suffix.length]
     quote = suffix
     apply aliases, return base/quote
5. If none match: return null.
```

**Pre-registered aliases (initialized in constructor):**

```typescript
const DEFAULT_ALIASES: [string, string][] = [
  ['XBT',  'BTC'],
  ['XDG',  'DOGE'],
  ['XXBT', 'BTC'],
  ['ZUSD', 'USD'],
  ['ZEUR', 'EUR'],
];
```

**Edge cases:**

- `"USDT/BTC"` — inverted pair. The resolver does not reorder pairs; it normalizes format only. Inversion must be handled by the adapter's `resolveSymbol()`.
- Single-currency strings (e.g. `"BTC"`) — returns `null`; log a warning.
- Symbols with numbers (e.g. `"BTC3L"`) — treated as a base currency; no alias is applied.

---

## FinanceChart Integration

### New method: `FinanceChart.connectProvider()`

This method is added to `FinanceChart.ts`. It is a thin facade over `ProviderManager`.

```typescript
// Addition to FinanceChart class

private _providerManager?: ProviderManager;
private _initialized = false;  // set to true at the end of init()

/**
 * True after init() has resolved successfully. ProviderManager checks this
 * before calling loadData() or connectStream(). connectProvider() throws
 * immediately if false, giving callers a clear error rather than a null
 * dereference inside CandleBuffer.
 */
get isInitialized(): boolean {
  return this._initialized;
}

/**
 * Connect to a real exchange data source.
 * Fetches historical OHLCV data via REST, then connects the live WebSocket stream.
 * Requires that init() has completed and adapters have been registered via
 * registerProviders() or passed in the options object.
 *
 * Calling connectProvider() while already connected will disconnect the previous
 * provider first (including any active stream).
 *
 * @param config - Provider configuration
 * @throws ProviderError('EXCHANGE_UNAVAILABLE') if chart.isInitialized is false
 * @throws ProviderError if no adapter supports the requested symbol/interval
 */
async connectProvider(config: ProviderConfig): Promise<void>;

/**
 * Register exchange adapters for use with connectProvider().
 * Must be called before connectProvider() if adapters were not supplied
 * via FinanceChartOptions.providers.
 *
 * @param adapters - One or more exchange adapter instances
 */
registerProviders(...adapters: ExchangeAdapter[]): void;

/**
 * Disconnect the active provider (both historical fetcher and live stream).
 * Safe to call if no provider is connected.
 */
disconnectProvider(): void;
```

**Option addition to `FinanceChartOptions`:**

```typescript
export interface FinanceChartOptions {
  // ... existing fields ...

  /**
   * Pre-register exchange adapters.
   * Equivalent to calling chart.registerProviders(...adapters) after init().
   */
  providers?: ExchangeAdapter[];
}
```

**`connectProvider()` implementation sketch:**

```typescript
async connectProvider(config: ProviderConfig): Promise<void> {
  // Guard: ensure init() has completed before touching CandleBuffer
  if (!this._initialized) {
    throw new ProviderError('EXCHANGE_UNAVAILABLE',
      'connectProvider() called before chart.init() completed. ' +
      'Await chart.init() before calling connectProvider().');
  }
  // Ensure providers are available
  if (!this._providerManager) {
    throw new ProviderError('EXCHANGE_UNAVAILABLE',
      'No providers registered. Call registerProviders() first.');
  }
  // Delegate entirely — ProviderManager calls chart.loadData() and
  // chart.connectStream() at the appropriate times.
  await this._providerManager.connect(this, config);
}
```

**`init()` tail (only the addition — no other change to init()):**

```typescript
// At the very end of the existing async init() method, before returning:
this._initialized = true;
```

**No modification to `connectStream()` or `loadData()`** — these are called by `ProviderManager.connect()` from outside the class via the existing public API. The chart remains unaware of exchange details.

**`FinanceChart._bus` access for symbol-change subscription (SR-10):**

`ProviderManager` needs to subscribe to `ChartController`'s `symbolChange` bus event to react when the user changes the symbol via the UI. The EventBus is owned by `ChartController` internally. To avoid exposing it in the public API, `FinanceChart.ts` exposes it as a package-internal (non-exported) accessor:

```typescript
// Addition to FinanceChart.ts — package-internal, NOT exported from index.ts
/** @internal Used by ProviderManager to subscribe to UI-driven symbol changes. */
get _bus(): EventBus {
  return this._controller._bus;
}
```

`ProviderManager` uses `chart._bus.on('symbolChange', ...)` to register the handler. The leading underscore signals package-internal intent. Custom adapters and application code should not depend on this; they should call `connectProvider()` again with the new symbol if they manage symbol changes themselves.

---

## Error Handling

### Error hierarchy

```
Error
└── ProviderError (code: ProviderErrorCode, exchange?: ExchangeId, cause?: unknown)
```

All errors thrown across the provider layer are instances of `ProviderError`. Callers can switch on `error.code` for typed handling.

### Error propagation matrix

| Scenario | Error code | Propagation |
|---|---|---|
| HTTP 429 from exchange | `RATE_LIMITED` | RateLimiter waits then retries once; if retry fails, throws to HistoricalDataFetcher; ProviderManager increments error count |
| HTTP 5xx from exchange | `EXCHANGE_UNAVAILABLE` | Single retry with 2s delay; if retry fails, ProviderManager increments error count; triggers failover at threshold |
| Symbol not in exchange product list | `SYMBOL_NOT_FOUND` | ProviderManager skips this adapter during setup; if all adapters skip, throws `FAILOVER_EXHAUSTED` |
| JSON parse failure | `PARSE_ERROR` | Logged; single event is skipped for stream messages; fatal for REST responses |
| Unsupported interval | `INVALID_INTERVAL` | Adapter's `supportsInterval()` returns false; ProviderManager skips adapter during symbol resolution |
| WebSocket abnormal close (code ≠ 1000) | `EXCHANGE_UNAVAILABLE` | WebSocketAdapter's built-in reconnect handles first N retries; after maxRetries, ProviderManager increments error count |
| All adapters exhausted | `FAILOVER_EXHAUSTED` | Thrown from `_tryFailover()`; propagated to `connectProvider()` caller as a rejected Promise |
| `fetch()` network error | `NETWORK_ERROR` | Thrown by adapter's `fetchKlines()`; ProviderManager increments error count |
| `AbortError` from AbortController | — | Propagated as-is; ProviderManager recognizes DOMException and does NOT count it as an error |

### What the user sees

- `config.onError(error)` is called for every recoverable error.
- `config.onProviderChange(exchange)` is called on every failover.
- Rejected `connectProvider()` promise for fatal errors (`FAILOVER_EXHAUSTED`, `SYMBOL_NOT_FOUND` when no provider matches).
- `ProviderManager` events (`provider:error`, `provider:change`) for observability in advanced integrations.

### Logging

All error events should include:

```typescript
// Minimal log structure (callers use their own logger)
// ProviderManager emits these as events; it does NOT call console directly.
// Downstream integration (e.g. demo) can attach a listener and log as needed.
```

---

## Backward Compatibility

- No existing method on `FinanceChart` is modified or removed. `connectStream()`, `loadData()`, `appendCandle()`, `updateLastCandle()` remain identical.
- `StreamConnectOptions` type is not changed.
- `WebSocketAdapter`, `TickAggregator`, `UpdateScheduler` are not modified.
- Existing consumers that use `chart.connectStream()` directly continue to work without change.
- `connectProvider()` and `registerProviders()` are purely additive.
- `FinanceChartOptions.providers` is optional with no default; existing option objects without it are unaffected.
- Each adapter is separately importable. Adding `src/providers/` to the library does not add any runtime code to consumers that never import from it (tree-shaking boundary is `src/providers/index.ts`).

---

## Configuration

All configuration flows through `ProviderConfig` (user-facing) and constructor options on `ProviderManager` (internal).

| Field | Type | Default | Validation |
|---|---|---|---|
| `symbol` | `string` | — | Required; `SymbolResolver.normalize()` must not return null |
| `interval` | `Interval` | `'1m'` | Must be one of 16 defined interval strings |
| `exchanges` | `ExchangeId[]` | auto-select | Each entry must be a registered adapter id |
| `historicalLimit` | `number` | `500` | `0–20_000`; 0 disables historical fetch |
| `historicalStartMs` | `number` | computed | Must be `< Date.now()` if provided |
| `failoverThreshold` | `number` | `3` | `1–10` |
| `cacheTtlMs` | `number` | `60_000` | `0–3_600_000` (0 disables caching) |

`ProviderManager` constructor options:

| Field | Type | Default |
|---|---|---|
| `cacheMaxEntries` | `number` | `200` |
| `cacheMaxBytes` | `number` | `52_428_800` (50 MB) |

---

## Files Changed

| File | Action | Description |
|---|---|---|
| `src/providers/types.ts` | Create | All provider-layer TypeScript interfaces and enums (includes `TokenAcquirer`, `RateLimitBucket.wsConnections`) |
| `src/providers/adapters/ExchangeAdapter.ts` | Create | `ExchangeAdapter` interface (`initialize()`, `fetchKlines(TokenAcquirer)`) |
| `src/providers/adapters/BinanceAdapter.ts` | Create | Binance spot REST + WS adapter |
| `src/providers/adapters/CoinbaseAdapter.ts` | Create | Coinbase Advanced Trade REST + WS adapter (async `initialize()` fetches product list) |
| `src/providers/adapters/KrakenAdapter.ts` | Create | Kraken spot REST + WS adapter (cursor-based pagination strategy) |
| `src/providers/adapters/BybitAdapter.ts` | Create | Bybit spot REST + WS adapter |
| `src/providers/adapters/DeribitAdapter.ts` | Create | Deribit derivatives REST + WS adapter with JSON-RPC ID correlation (optional) |
| `src/providers/ProviderManager.ts` | Create | Orchestrator: failover, caching, lifecycle, symbol:change handler |
| `src/providers/HistoricalDataFetcher.ts` | Create | Pagination with `TimeWindowStrategy` and `CursorStrategy` |
| `src/providers/RateLimiter.ts` | Create | Token bucket per endpoint group (satisfies `TokenAcquirer`) |
| `src/providers/LRUCache.ts` | Create | In-memory candle cache with TTL and LRU eviction |
| `src/providers/SymbolResolver.ts` | Create | Cross-exchange symbol normalization |
| `src/providers/index.ts` | Create | Public API surface (exports `TokenAcquirer`, `PaginationStrategy` types) |
| `src/streaming/WebSocketAdapter.ts` | Modify | Add `onOpen?: (send: (msg: string) => void) => void` to `StreamConnectOptions`; call it inside `ws.onopen` handler |
| `src/FinanceChart.ts` | Modify | Add `connectProvider()`, `registerProviders()`, `disconnectProvider()`, `get isInitialized(): boolean`, `_providerManager` field, `providers` option |
| `src/index.ts` | Modify | Re-export public provider types and `ProviderManager` |

---

## Implementation Plan

### Phase 1: Foundation (no I/O)

**Step 1.1** — Create `src/providers/types.ts` with all interfaces, enums, `ProviderError`, `INTERVAL_MS`. Typecheck passes.

**Step 1.2** — Create `src/providers/adapters/ExchangeAdapter.ts` with the interface definition. No implementation.

**Step 1.3** — Create `src/providers/SymbolResolver.ts`. Write unit tests: normalize BTCUSDT, BTC-USD, BTC/USD, XBT/USD, lowercase variants, unrecognized strings returning null.

**Step 1.4** — Create `src/providers/RateLimiter.ts`. Write unit tests: token consumption, wait when empty, refill after window, reset() with delay, concurrent acquire calls serialize correctly.

**Step 1.5** — Create `src/providers/LRUCache.ts`. Write unit tests: set/get/evict by count, evict by bytes, TTL expiry, LRU promotion, delete, clear.

### Phase 2: Historical fetcher (mocked adapters)

**Step 2.1** — Create `src/providers/HistoricalDataFetcher.ts` with both `TimeWindowStrategy` and `CursorStrategy`. Write unit tests using stub adapters: single-page fetch (time-window), multi-page pagination, deduplication, limit trimming, AbortSignal cancellation; cursor strategy: sequential pages using `nextCursor`, loop termination on no-progress, cancellation.

**Step 2.2** — Create a `MockExchangeAdapter` in `tests/` that satisfies the `ExchangeAdapter` interface using local fixture data. This is the test double used throughout the test suite.

### Phase 3: Exchange adapters (real HTTP + WS, but testable via injection)

**Step 3.1** — Implement `BinanceAdapter.ts`. Tests: kline response parsing (fixture JSON), parseMessage (fixture WS message), resolveSymbol, supportsInterval. All HTTP calls use injected `fetch` (passed as constructor parameter) to avoid real network I/O in tests.

**Step 3.2** — Implement `CoinbaseAdapter.ts`. Tests: `initialize()` populates product map, `resolveSymbol()` uses map, `resolveSymbol()` falls back to heuristic when `initialize()` failed, descending-order reversal, candles-per-event extraction, `onConnect` sends correct subscribe JSON.

**Step 3.3** — Implement `KrakenAdapter.ts`. Tests: alias resolution (XBT→BTC), response body error field parsing (`"error": [...]`), interval-in-minutes mapping, `fetchKlines()` populates `nextCursor` from `last` field, `paginationStrategy === 'cursor'`.

**Step 3.4** — Implement `BybitAdapter.ts`. Tests: descending-order reversal, retCode error handling, heartbeat ping string format, `onConnect` sends correct subscribe JSON.

**Step 3.5** — Implement `DeribitAdapter.ts`. Tests: parallel-array zip into OHLCVCandle[], JSON-RPC subscribe message format with ID, `_parseMessage` correctly discriminates confirm frames vs. data frames, `_pendingRpc` callback called on confirm frame.

**Design note on fetch injection:** Each adapter constructor accepts an optional `fetchFn` parameter:

```typescript
constructor(options?: { fetchFn?: typeof fetch }) {
  this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
}
```

This enables test doubles without any mocking framework or module patching.

### Phase 4: ProviderManager

**Step 4.1** — Implement `ProviderManager.ts` against the `MockExchangeAdapter`. Test: happy-path connect (historical + stream), `onOpen` hook delivered to `streamOptions` and triggers `subscription.onConnect`, symbol-change event triggers disconnect + reconnect, failover after threshold errors, `FAILOVER_EXHAUSTED`, `SYMBOL_NOT_FOUND` when no adapter matches, `disconnect()` cleans up stream and unsubscribes from symbol change.

**Step 4.2** — Wire `ProviderManager` into `FinanceChart.ts`: add `_providerManager`, `connectProvider()`, `registerProviders()`, `disconnectProvider()`, `_initialized` flag, `isInitialized` getter, `providers` option. Tests: `connectProvider()` throws `EXCHANGE_UNAVAILABLE` if called before `init()`, `connectProvider()` calls `loadData()` then `connectStream()` in order, calling `connectProvider()` twice disconnects first stream.

### Phase 5: Public API and exports

**Step 5.1** — Create `src/providers/index.ts` with all public exports.

**Step 5.2** — Update `src/index.ts` with provider re-exports.

**Step 5.3** — Add usage examples to `demo/` showing `connectProvider()` with BinanceAdapter (using `MockWebSocket` for local dev, real URL for production).

### Phase 6: Integration testing

**Step 6.1** — Write integration test: `ProviderManager` + `FinanceChart` (with `MockWebSocket` and stub fetch) verifies full lifecycle: historical load → stream tick received → `updateLastCandle()` called.

**Step 6.2** — Write failover integration test: primary adapter throws `EXCHANGE_UNAVAILABLE` 3 times → `provider:change` event fires → secondary adapter serves data.

---

## Test Plan

### Unit tests

**SymbolResolver:**
- `normalize('BTCUSDT')` → `'BTC/USDT'`
- `normalize('BTC-USD')` → `'BTC/USD'`
- `normalize('XBT/USD')` → `'BTC/USD'` (alias)
- `normalize('btcusdt')` → `'BTC/USDT'` (lowercase)
- `normalize('BTC')` → `null`
- `normalize('ETHBTC')` → `'ETH/BTC'` (BTC as quote)
- `normalize('UNKNOWNXXX')` → `null`

**RateLimiter:**
- Two requests succeed immediately when bucket has 2 tokens
- Third request waits until window refill
- `reset(5000)` causes next acquire to wait 5 seconds
- `canAcquireNow()` returns false when bucket is empty, true otherwise
- Concurrent acquires drain the bucket sequentially, not in parallel

**LRUCache:**
- Entry returned before TTL expires
- Entry not returned after TTL expires
- Eviction of oldest entry when `maxEntries` exceeded
- Byte-budget eviction when candle arrays are large
- `get()` promotes entry to MRU position (verified by adding 3 entries, getting #1, then adding #4 which evicts #2 not #1)

**HistoricalDataFetcher:**
- Single-page request: adapter called once, result returned sorted
- Multi-page: 1000 candles needed, pageSize 100 → 10 adapter calls
- Deduplication: overlapping pages produce unique candles
- Limit trimming: 1000 candles returned for `limit: 500` → trimmed to 500 (most recent)
- AbortSignal: cancel mid-fetch stops remaining pages

**Binance parseMessage:**
- Valid kline message → correct OHLCVCandle
- Non-kline message → null
- Malformed JSON → ProviderError('PARSE_ERROR')
- `k.x === true` (closed candle) → still returned (not filtered)

**Coinbase parseMessage:**
- Snapshot event with multiple candles → last candle returned
- Update event → single candle returned
- Non-candles channel → null

**Kraken parseKlineREST:**
- Normal row array → correct OHLCVCandle (time × 1000 conversion)
- Response with `error: ["EGeneral:Invalid arguments"]` → throws PARSE_ERROR
- Response with unknown pair key → throws SYMBOL_NOT_FOUND

**Bybit parseMessage:**
- Normal kline update → correct OHLCVCandle
- Pong response `{"op":"pong",...}` → null
- `retCode: 10006` in REST response → throws RATE_LIMITED

**Deribit adapter:**
- `_parseMessage` routes confirm frame (has `id`) to pending RPC callback → returns null
- `_parseMessage` routes data frame (has `method: 'subscription'`) → returns OHLCVCandle
- `_parseMessage` returns null for unrelated data frames on a different channel
- `_sendSubscribe` increments request ID, stores callback, sends correct JSON-RPC payload
- Parallel-array REST response zipped correctly into `OHLCVCandle[]`

**CoinbaseAdapter.initialize():**
- `initialize()` called with stub fetch returning product list → `_productMap` populated
- `resolveSymbol('BTC/USD')` after `initialize()` returns `'BTC-USD'` from map
- `resolveSymbol('BTC/USDT')` after `initialize()` returns `null` (not in map)
- `initialize()` network failure → `_productMap` remains undefined → `resolveSymbol()` falls back to heuristic

**KrakenAdapter cursor pagination:**
- `fetchKlines()` returns `nextCursor` equal to `last` field from response
- `HistoricalDataFetcher` with `paginationStrategy: 'cursor'` fetches sequentially
- Second page uses `nextCursor` from first page as `startMs` (converted to ms)
- Loop terminates when `nextCursor` equals previous cursor (no progress)

### Integration tests

**ProviderManager + MockChart:**
- `connect()` calls `chart.loadData()` with the correct candles
- `connect()` then calls `chart.connectStream()` with correct URL and parseMessage
- `chart.connectStream()` is called with `streamOptions.onOpen` injected; calling `onOpen(mockSend)` triggers `subscription.onConnect(mockSend)`
- Stream tick fires → `chart.updateLastCandle()` is called
- Failover: 3 errors from primary → `provider:change` emitted → secondary connected
- `chart._bus.emit('symbolChange', { symbol: 'ETH/USDT' })` → `disconnect()` called, then `connect()` with new symbol

**ProviderManager failover:**
- Primary throws `EXCHANGE_UNAVAILABLE` × failoverThreshold → secondary promoted
- All adapters throw → `FAILOVER_EXHAUSTED` propagated from `connect()`

**HistoricalDataFetcher + BinanceAdapter (stub fetch):**
- 500 candles requested → correct paginated fetch calls with correct time windows
- Fixture response correctly parsed into `OHLCVCandle[]`

**HistoricalDataFetcher + KrakenAdapter (cursor strategy, stub fetch):**
- 1000 candles requested → first page returns 720 with `nextCursor = T1` → second page uses `since = T1` → terminates when page returns fewer than `maxCandlesPerRequest`
- Cancellation via AbortSignal stops mid-sequence

### Edge cases

- `connectProvider()` called before `init()` returns — throws `ProviderError('EXCHANGE_UNAVAILABLE', 'connectProvider() called before chart.init() completed. ...')` immediately because `chart.isInitialized` is `false`
- `historicalLimit: 0` — stream connects immediately, no REST call made
- Symbol with no matching adapter after normalization — `SYMBOL_NOT_FOUND`
- Kraken returns 720 candles but only 400 are within the requested time range — excess trimmed silently
- LRU cache hit for partial range: cache stores full 500-candle array; caller requests 200 — `ProviderManager` trims the cached array to the most recent `historicalLimit` candles (`cached.slice(-200)`) before passing to `chart.loadData()`. This ensures the caller's intent is respected and the chart is not loaded with more data than requested. The cache entry is NOT modified; it retains the full 500-candle array for future lookups.
- RateLimiter.acquire() called with weight > maxTokens — waits for full window refill repeatedly; no infinite loop

---

## Public API Surface

### `src/providers/index.ts`

```typescript
// Main orchestrator
export { ProviderManager } from './ProviderManager';

// Adapter interface (for custom adapters)
export type { ExchangeAdapter } from './adapters/ExchangeAdapter';

// Built-in adapters — each independently importable for tree-shaking
export { BinanceAdapter } from './adapters/BinanceAdapter';
export { CoinbaseAdapter } from './adapters/CoinbaseAdapter';
export { KrakenAdapter } from './adapters/KrakenAdapter';
export { BybitAdapter } from './adapters/BybitAdapter';
export { DeribitAdapter } from './adapters/DeribitAdapter';

// Utilities (for custom adapter authors)
export { RateLimiter } from './RateLimiter';
export { SymbolResolver } from './SymbolResolver';
export { LRUCache } from './LRUCache';

// Types
export type {
  ExchangeId,
  Interval,
  CanonicalSymbol,
  ExchangeSymbol,
  ProviderConfig,
  ProviderEvents,
  HistoricalFetchRequest,
  HistoricalFetchResult,
  StreamSubscription,
  RateLimitConfig,
  RateLimitBucket,
  CacheKey,
  TokenAcquirer,
  PaginationStrategy,
} from './types';
export { ProviderError, INTERVAL_MS } from './types';
export type { ProviderErrorCode } from './types';
```

### Deep import paths (tree-shaking)

Adapters should also be accessible without pulling in `ProviderManager`:

```typescript
// vite.config.ts / rollup config: add each adapter as a separate entry point
// src/providers/adapters/BinanceAdapter.ts → dist/providers/binance.js
// src/providers/adapters/CoinbaseAdapter.ts → dist/providers/coinbase.js
// etc.
```

Update `package.json` exports:

```json
{
  "exports": {
    ".": { ... },
    "./providers": {
      "types": "./dist/providers/index.d.ts",
      "import": "./dist/providers/index.js"
    },
    "./providers/binance": {
      "types": "./dist/providers/adapters/BinanceAdapter.d.ts",
      "import": "./dist/providers/adapters/BinanceAdapter.js"
    },
    "./providers/coinbase": {
      "types": "./dist/providers/adapters/CoinbaseAdapter.d.ts",
      "import": "./dist/providers/adapters/CoinbaseAdapter.js"
    },
    "./providers/kraken": {
      "types": "./dist/providers/adapters/KrakenAdapter.d.ts",
      "import": "./dist/providers/adapters/KrakenAdapter.js"
    },
    "./providers/bybit": {
      "types": "./dist/providers/adapters/BybitAdapter.d.ts",
      "import": "./dist/providers/adapters/BybitAdapter.js"
    },
    "./providers/deribit": {
      "types": "./dist/providers/adapters/DeribitAdapter.d.ts",
      "import": "./dist/providers/adapters/DeribitAdapter.js"
    }
  }
}
```

---

## Usage Examples

### Example 1: Minimum configuration (Binance, latest 500 1m candles)

```typescript
import { FinanceChart } from 'three-finance-viz';
import { BinanceAdapter } from 'three-finance-viz/providers/binance';
import { ProviderManager } from 'three-finance-viz/providers';

const chart = new FinanceChart({ container });
await chart.init();

chart.registerProviders(new BinanceAdapter());

await chart.connectProvider({
  symbol: 'BTC/USDT',
  interval: '1m',
});
```

### Example 2: Multi-exchange with failover and custom callbacks

```typescript
import { FinanceChart } from 'three-finance-viz';
import { BinanceAdapter }  from 'three-finance-viz/providers/binance';
import { CoinbaseAdapter } from 'three-finance-viz/providers/coinbase';
import { KrakenAdapter }   from 'three-finance-viz/providers/kraken';

const chart = new FinanceChart({ container });
await chart.init();

chart.registerProviders(
  new BinanceAdapter(),
  new CoinbaseAdapter(),
  new KrakenAdapter(),
);

await chart.connectProvider({
  symbol: 'BTC/USDT',
  interval: '1h',
  exchanges: ['binance', 'coinbase', 'kraken'],  // priority order
  historicalLimit: 200,
  failoverThreshold: 3,
  onProviderChange: (exchange) => {
    console.warn(`Switched to ${exchange}`);
  },
  onError: (err) => {
    console.error(`[provider] ${err.code}: ${err.message}`);
  },
});
```

### Example 3: Historical-only mode (no live stream)

```typescript
import { ProviderManager } from 'three-finance-viz/providers';
import { BinanceAdapter }  from 'three-finance-viz/providers/binance';

const manager = new ProviderManager([new BinanceAdapter()]);

await manager.connect(chart, {
  symbol: 'ETH/USDT',
  interval: '4h',
  historicalLimit: 500,
  historicalStartMs: Date.now() - 90 * 24 * 3600 * 1000,  // 90 days ago
  // historicalLimit: 0 would skip REST entirely
});

// Disconnect before live stream begins (call immediately after connect resolves)
manager.disconnect();
```

### Example 4: Kraken XBT/USD with symbol alias

```typescript
// Kraken calls BTC "XBT" — SymbolResolver handles this transparently
await chart.connectProvider({
  symbol: 'XBT/USD',   // normalized to BTC/USD → resolves to XBTUSD on Kraken
  interval: '1h',
  exchanges: ['kraken'],
});
```

### Example 5: Custom adapter (for testing or private exchange)

```typescript
import type {
  ExchangeAdapter,
  ExchangeId,
  Interval,
  PaginationStrategy,
  HistoricalFetchRequest,
  TokenAcquirer,
} from 'three-finance-viz/providers';
import { INTERVAL_MS } from 'three-finance-viz/providers';

class MyExchangeAdapter implements ExchangeAdapter {
  // Use a unique string ID — ExchangeId is extensible via `(string & {})`
  readonly id: ExchangeId = 'my-exchange';
  readonly name = 'My Exchange';
  readonly maxCandlesPerRequest = 200;
  readonly paginationStrategy: PaginationStrategy = 'time-window';
  readonly rateLimits = {
    restKlines:  { requestsPerWindow: 60,  windowMs: 60_000 },
    restPublic:  { requestsPerWindow: 120, windowMs: 60_000 },
  };

  supportsInterval(interval: Interval): boolean {
    return interval in INTERVAL_MS;
  }

  resolveSymbol(canonical: string): string | null {
    return canonical.replace('/', '');
  }

  async fetchSupportedSymbols() { return []; }

  async fetchKlines(request: HistoricalFetchRequest, acquirer: TokenAcquirer) {
    await acquirer.acquire();
    // ... fetch from private endpoint
  }

  buildStreamSubscription(symbol: string, interval: Interval, intervalMs: number) {
    return {
      options: {
        url: `wss://my-exchange.com/ws/${symbol}`,
        intervalMs,
        parseMessage: (ev: MessageEvent) => { /* ... */ return null; },
      },
    };
  }
}
```

### Example 6: Using MockWebSocket in development

```typescript
import { MockWebSocket } from '../../demo/mockWebSocket';
import { BinanceAdapter } from 'three-finance-viz/providers/binance';

// Override the WebSocket factory for local testing without a real connection
class LocalBinanceAdapter extends BinanceAdapter {
  buildStreamSubscription(symbol: string, interval: Interval, intervalMs: number) {
    const base = super.buildStreamSubscription(symbol, interval, intervalMs);
    return {
      ...base,
      options: {
        ...base.options,
        WebSocketClass: (url: string) => new MockWebSocket(url),
      },
    };
  }
}
```

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Exchange API changes (endpoint URLs, response shapes) | High | Medium | Keep adapter implementations isolated; one file per exchange. Add integration smoke-test suite that runs against live APIs on a schedule (separate from unit tests). |
| Binance websocket requiring pong response not handled by browser automatically | Low | High | Verify browser WebSocket handles ping/pong at protocol level (RFC 6455 Section 5.5). If not, add a `binaryType = 'arraybuffer'` message handler to detect binary ping frames and respond. |
| Coinbase candles endpoint requiring auth in some regions/plans | Medium | High | Document clearly that the Coinbase adapter requires public market data access. Add a pre-flight `HEAD` request in `fetchSupportedSymbols()` to detect auth errors early. |
| Kraken OHLC endpoint returning 720 candles regardless of `since` (known quirk) | High | Low | `HistoricalDataFetcher` trims by time after collection; extra candles are silently discarded. |
| Rate limit exhaustion during parallel historical fetch of long ranges | Medium | Medium | `RateLimiter.acquire()` serializes requests automatically. Warn (via event) when estimated fetch time > 30 seconds given current rate limits. |
| Bybit ping heartbeat requiring custom JSON string vs native WebSocket ping | High | Medium | `StreamConnectOptions` heartbeat sends a configurable string; BinanceAdapter sets it to `'ping'`, BybitAdapter sets it to `'{"op":"ping"}'`. Covered by test. |
| Symbol resolution failures for exotic pairs (e.g. PEPE/USDT, SOL/BTC) | Medium | Low | `SymbolResolver` falls back gracefully to `null`; `ProviderManager` skips that adapter. User receives `SYMBOL_NOT_FOUND` error. |
| `HistoricalDataFetcher` making too many parallel requests and triggering IP ban | Medium | High | Default `maxParallelRequests: 3` combined with `RateLimiter` prevents bursting. Document this parameter prominently. |
| Deribit parallel-array response shape changing | Low | Low | Deribit adapter is marked optional; breakage affects only users explicitly importing it. |

---

## Design Decisions

Key decisions made during the design of this spec, with rationale.

---

### DD-01: `onOpen` hook in `StreamConnectOptions` for post-connect subscription frames

**Decision:** Add `onOpen?: (send: (msg: string) => void) => void` to `StreamConnectOptions`. `WebSocketAdapter` calls this hook immediately after `ws.onopen` fires, providing a `send` callback that writes to the native WebSocket.

**Alternatives considered:**
- Add a public `send()` method to `WebSocketAdapter` and expose it from `FinanceChart` — leaks streaming internals into the chart's public API.
- Force all exchanges to encode the subscription in the URL (Binance pattern) — impossible for Kraken, Coinbase, Bybit, and Deribit, which require post-connect JSON frames.

**Rationale:** `onOpen` keeps the subscription delivery inside the `StreamConnectOptions` contract, requires a minimal one-line change to `WebSocketAdapter`, and introduces no public API surface on `FinanceChart`.

---

### DD-02: `TokenAcquirer` interface over `RateLimiter` class for `fetchKlines()`

**Decision:** Define `TokenAcquirer { acquire(weight?: number): Promise<void> }` in `types.ts`. `ExchangeAdapter.fetchKlines()` accepts `TokenAcquirer` rather than the concrete `RateLimiter`.

**Alternatives considered:**
- Pass the `RateLimiter` directly — causes a circular import chain (`ExchangeAdapter.ts → RateLimiter.ts → types.ts → ExchangeAdapter.ts`).
- Move `RateLimiter` to `types.ts` — conflates interface definitions with class implementation.

**Rationale:** The narrow interface breaks the import cycle, allows unit tests to pass a trivial no-op acquirer without any mocking framework, and does not expose the token-bucket internals to adapter authors.

---

### DD-03: `initialize()` optional hook on `ExchangeAdapter` for async setup

**Decision:** Add `initialize?(): Promise<void>` to `ExchangeAdapter`. `ProviderManager` calls `await adapter.initialize?.()` before the first `resolveSymbol()` call.

**Alternatives considered:**
- `resolveSymbol()` returns a `Promise<string | null>` — breaks the synchronous call contract used throughout `ProviderManager` and symbol resolution.
- A `ready: Promise<void>` property on the adapter — callers must `await adapter.ready` before any method, which is easy to forget; `initialize()` is explicit.

**Rationale:** An opt-in `initialize()` is the minimal change that allows Coinbase and Kraken to pre-populate their symbol maps before the synchronous `resolveSymbol()` is called, without changing the rest of the interface.

---

### DD-04: `RateLimitBucket.wsConnections` for WebSocket connection limits

**Decision:** Add `wsConnections?: RateLimitConfig` to `RateLimitBucket`. Each exchange adapter declares its connection limit. `ProviderManager` checks this before opening a new connection.

**Alternatives considered:**
- Rely on `WebSocketAdapter`'s reconnect backoff to self-throttle — this handles disconnections, not simultaneous connection caps; Coinbase's hard 8-connection limit requires proactive enforcement.

**Rationale:** Explicit declaration makes the constraint visible at adapter-definition time, not discovered at runtime via a 429/rejection from the exchange.

---

### DD-05: `PaginationStrategy` discriminant field on `ExchangeAdapter`

**Decision:** Add `readonly paginationStrategy: 'time-window' | 'cursor'` to `ExchangeAdapter`. `HistoricalDataFetcher` reads this field and selects between the `TimeWindowStrategy` (parallel, fixed windows) and `CursorStrategy` (sequential, server cursor) algorithms.

**Alternatives considered:**
- Kraken adapter implements pagination internally in `fetchKlines()` — violates the "one page per call" contract; the fetcher cannot control concurrency or cancellation.
- Strategy injected as a constructor parameter to `HistoricalDataFetcher` — requires callers to know which strategy each exchange needs, duplicating the knowledge.

**Rationale:** The adapter is the authoritative source of exchange-specific behavior. Declaring the strategy as a readonly field makes it inspectable and testable without executing any I/O.

---

### DD-06: `FinanceChart.isInitialized` getter for `connectProvider()` guard

**Decision:** Add `get isInitialized(): boolean` to `FinanceChart`, set to `true` at the tail of `init()`. `connectProvider()` throws `ProviderError('EXCHANGE_UNAVAILABLE')` immediately if `!this.isInitialized`.

**Alternatives considered:**
- Access `chart._candleBuffer` directly to check initialization — couples `ProviderManager` to `FinanceChart` internals.
- Return a `ready` Promise from `connectProvider()` that waits for `init()` — hides the ordering error; explicit throw gives callers an actionable message.

**Rationale:** A boolean getter is the minimal public API change that enables the guard without exposing private state.

---

### DD-07: Cache trims to `historicalLimit` before passing to `chart.loadData()`

**Decision:** When `LRUCache` returns a hit, `ProviderManager` trims the array to `cached.slice(-historicalLimit)` before calling `chart.loadData()`. The cache entry is NOT modified.

**Alternatives considered:**
- Return the full cached array — callers who request 200 candles get 500, which violates the explicit intent of `historicalLimit`.
- Cache separate entries per limit — excessive memory usage and cache fragmentation.

**Rationale:** Trim on read respects caller intent. The cache stores the maximum range fetched; any subset can be derived cheaply from the stored array.

---

### DD-08: `ExchangeId` extensible via `(string & {})` escape hatch

**Decision:** `type ExchangeId = 'binance' | 'coinbase' | 'kraken' | 'bybit' | 'deribit' | (string & {})`.

**Alternatives considered:**
- Module augmentation (`declare module ... { interface ExchangeRegistry { ... } }`) — complex for adapter authors; requires module augmentation awareness.
- Plain `string` — loses autocompletion for the five built-in names.

**Rationale:** `(string & {})` is the idiomatic TypeScript pattern for extensible literal unions. It preserves autocompletion for known values while allowing any string, which is the correct trade-off for a library extension point.

---

### DD-09: Deribit JSON-RPC ID correlation via adapter-owned `Map<number, callback>`

**Decision:** `DeribitAdapter` maintains a `Map<number, (result: unknown) => void>` of pending RPC request IDs. Subscription confirm frames (containing `"id"`) resolve their stored callback. Data frames (containing `"method": "subscription"`) are routed to candle parsing. `parseMessage` is an arrow function on the adapter instance that closes over `this`, giving it access to the map.

**Alternatives considered:**
- Fire-and-forget subscribe with no correlation — confirm frames would fall through `parseMessage` returning `null`, which works but silently loses subscription errors; the ID map makes error detection possible.
- `WebSocketAdapter` provides request-response correlation — out of scope; only Deribit needs this; adding it to `WebSocketAdapter` would leak exchange-specific concerns.

**Rationale:** The adapter-owned map is contained entirely within `DeribitAdapter.ts`. The closure pattern for `parseMessage` is already established in the spec's `buildStreamSubscription` design.

---

### DD-10: `ProviderManager` subscribes to `chart._bus.symbolChange` for automatic reconnect

**Decision:** After `connect()` succeeds, `ProviderManager` subscribes to `chart._bus.on('symbolChange', ...)`. On receipt, it calls `disconnect()` then `connect(chart, { ...config, symbol: newSymbol })`.

**Alternatives considered:**
- Document as "application responsibility" — callers must then remember to call `connectProvider()` again on every symbol change; error-prone and inconsistent with the "single call" goal.
- Expose a public `FinanceChart` event for symbol change — the current `ChartEvents` interface does not include symbol change (it is an internal bus event from `UIController`); adding it to the public event map would be a larger change with broader scope.

**Rationale:** Automatic reconnect matches the library's goal of requiring "no further application code." The `_bus` accessor is package-internal and clearly marked with a leading underscore, so external consumers are discouraged from depending on it.
