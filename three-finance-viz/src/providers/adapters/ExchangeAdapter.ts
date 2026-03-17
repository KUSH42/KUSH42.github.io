// src/providers/adapters/ExchangeAdapter.ts

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
   * any other method. Called once per `connect()` invocation.
   * Must not throw on network failure — log a warning and degrade gracefully.
   */
  initialize?(): Promise<void>;

  /**
   * Return all supported symbols this exchange can serve.
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
   * responsibility of HistoricalDataFetcher. Each call fetches one page.
   *
   * @param request - Fetch parameters
   * @param acquirer - Call `acquirer.acquire()` before each HTTP request.
   * @returns One page of OHLCV candles sorted ascending by time.
   * @throws ProviderError with appropriate code
   */
  fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult>;

  /**
   * Build the StreamConnectOptions (and optional lifecycle callbacks) needed
   * to connect to this exchange's live candle/trade stream.
   *
   * The returned object is passed directly to chart.connectStream().
   * The adapter must NOT call chart.connectStream() itself.
   */
  buildStreamSubscription(
    nativeSymbol: string,
    interval: Interval,
    intervalMs: number,
  ): StreamSubscription;

  /**
   * Maximum number of candles per single REST klines request.
   */
  readonly maxCandlesPerRequest: number;

  /**
   * Declares the pagination mechanism used by this adapter's REST klines endpoint.
   */
  readonly paginationStrategy: PaginationStrategy;
}
