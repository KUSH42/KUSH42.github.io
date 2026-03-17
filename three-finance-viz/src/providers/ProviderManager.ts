// src/providers/ProviderManager.ts

import { EventEmitter } from '../utils/EventEmitter';
import type { FinanceChart } from '../FinanceChart';
import type { ExchangeAdapter } from './adapters/ExchangeAdapter';
import type {
  ProviderConfig,
  ProviderEvents,
  ExchangeId,
} from './types';
import { ProviderError, INTERVAL_MS } from './types';
import { HistoricalDataFetcher } from './HistoricalDataFetcher';
import { RateLimiter } from './RateLimiter';
import { LRUCache, buildCacheKey } from './LRUCache';
import { SymbolResolver } from './SymbolResolver';

export class ProviderManager extends EventEmitter<ProviderEvents> {
  private readonly _fetcher:     HistoricalDataFetcher;
  private readonly _cache:       LRUCache;
  private readonly _resolver:    SymbolResolver;
  private readonly _rateLimiters = new Map<ExchangeId, RateLimiter>();

  private _config:  ProviderConfig | null = null;
  private _chart:   FinanceChart | null   = null;
  private _adapters: ExchangeAdapter[] = [];  // ranked by priority
  private _activeIdx  = 0;
  private _errorCount = 0;
  private _disposed   = false;
  private _streaming  = false;

  // WebSocketAdapter send handle from StreamSubscription.onConnect
  private _wsSend?:            (msg: string) => void;
  private _wsDisconnectHook?:  (send: (msg: string) => void) => void;

  // Unsubscribe function for the chart's symbolChange bus event
  private _unsubSymbolChange?: () => void;

  // All registered adapters (full set, before priority filtering)
  private readonly _registeredAdapters: ExchangeAdapter[];

  constructor(
    adapters: ExchangeAdapter[],
    options?: {
      cacheMaxEntries?: number;
      cacheMaxBytes?:   number;
    },
  ) {
    super();
    if (adapters.length === 0) {
      throw new Error('ProviderManager requires at least one ExchangeAdapter');
    }
    this._registeredAdapters = adapters;
    this._fetcher  = new HistoricalDataFetcher();
    this._cache    = new LRUCache({
      maxEntries: options?.cacheMaxEntries ?? 200,
      maxBytes:   options?.cacheMaxBytes   ?? 50 * 1024 * 1024,
    });
    this._resolver = new SymbolResolver();

    // Pre-create rate limiters for each adapter
    for (const adapter of adapters) {
      this._rateLimiters.set(
        adapter.id,
        new RateLimiter(adapter.rateLimits.restKlines),
      );
    }
  }

  /**
   * Connect a FinanceChart to a live data source.
   */
  async connect(chart: FinanceChart, config: ProviderConfig): Promise<void> {
    if (this._disposed) return;

    if (!chart.isInitialized) {
      throw new ProviderError(
        'EXCHANGE_UNAVAILABLE',
        'connectProvider() called before chart.init() completed. Await chart.init() before calling connect().',
      );
    }

    // If already connected, tear down first
    if (this._chart) {
      this.disconnect();
    }

    this._chart  = chart;
    this._config = config;

    // Normalize the symbol
    const canonical = this._resolver.normalize(config.symbol);
    if (!canonical) {
      throw new ProviderError('SYMBOL_NOT_FOUND',
        `Cannot normalize symbol '${config.symbol}'`);
    }

    // Initialize all adapters in parallel
    await Promise.all(
      this._registeredAdapters.map(a => {
        try {
          return a.initialize?.() ?? Promise.resolve();
        } catch {
          return Promise.resolve();
        }
      })
    );

    // Build adapter priority list
    if (config.exchanges && config.exchanges.length > 0) {
      this._adapters = config.exchanges
        .map(id => this._registeredAdapters.find(a => a.id === id))
        .filter((a): a is ExchangeAdapter => a !== undefined)
        .filter(a => a.resolveSymbol(canonical) !== null);
    } else {
      // Auto-select: use all adapters that support this symbol and interval
      const interval = config.interval ?? '1m';
      this._adapters = this._registeredAdapters.filter(a => {
        if (!a.supportsInterval(interval)) return false;
        return a.resolveSymbol(canonical) !== null;
      });
    }

    if (this._adapters.length === 0) {
      throw new ProviderError('SYMBOL_NOT_FOUND',
        `No registered adapter supports symbol '${config.symbol}'`);
    }

    this._activeIdx  = 0;
    this._errorCount = 0;

    await this._connectWithAdapter(this._adapters[0]);

    // Subscribe to chart symbol changes (SR-10)
    try {
      const bus = (chart as unknown as { _bus: { on: (event: string, handler: (data: unknown) => void) => () => void } })._bus;
      if (bus) {
        this._unsubSymbolChange = bus.on('symbolChange', (payload: unknown) => {
          const p = payload as { symbol: string };
          this._handleSymbolChange(p.symbol);
        });
      }
    } catch {
      // _bus may not be available; symbol change handling is optional
    }
  }

  /**
   * Disconnect the active stream and stop all activity.
   */
  disconnect(): void {
    if (this._wsSend && this._wsDisconnectHook) {
      try { this._wsDisconnectHook(this._wsSend); } catch { /* ignore */ }
    }
    this._wsSend           = undefined;
    this._wsDisconnectHook = undefined;

    this._chart?.disconnectStream();
    this._unsubSymbolChange?.();
    this._unsubSymbolChange = undefined;
    this._streaming = false;

    this._config = null;
    this._chart  = null;
  }

  /** Currently active exchange ID, or null if not connected. */
  get activeExchange(): ExchangeId | null {
    if (this._adapters.length === 0 || this._activeIdx >= this._adapters.length) {
      return null;
    }
    return this._adapters[this._activeIdx].id;
  }

  /** True if a live stream is currently active. */
  get isStreaming(): boolean {
    return this._streaming;
  }

  dispose(): void {
    this.disconnect();
    this._disposed = true;
    super.dispose();
  }

  // ── Internal methods ────────────────────────────────────────────────────────

  private async _connectWithAdapter(adapter: ExchangeAdapter): Promise<void> {
    if (!this._chart || !this._config) return;

    const config       = this._config;
    const chart        = this._chart;
    const interval     = config.interval ?? '1m';
    const canonical    = this._resolver.normalize(config.symbol)!;
    const nativeSymbol = adapter.resolveSymbol(canonical);
    const intervalMs   = INTERVAL_MS[interval];

    if (!nativeSymbol) {
      throw new ProviderError('SYMBOL_NOT_FOUND',
        `Adapter '${adapter.id}' cannot resolve symbol '${config.symbol}'`,
        adapter.id);
    }

    // Historical phase
    const histLimit = config.historicalLimit ?? 500;
    if (histLimit !== 0) {
      const endMs   = Date.now();
      const startMs = config.historicalStartMs
        ?? (endMs - histLimit * intervalMs);

      const cacheKey = buildCacheKey({
        exchange: adapter.id,
        symbol:   nativeSymbol,
        interval,
        startMs,
        endMs,
      });

      const cached = this._cache.get(cacheKey);
      if (cached) {
        const trimmed = cached.slice(-histLimit);
        chart.loadData(trimmed);
      } else {
        this.emit('historical:start', {
          exchange: adapter.id,
          symbol:   nativeSymbol,
          interval,
        });

        const t0 = performance.now();
        let candles;
        try {
          const acquirer = this._rateLimiters.get(adapter.id)!;
          candles = await this._fetcher.fetch({
            adapter,
            nativeSymbol,
            interval,
            limit:   histLimit,
            startMs: config.historicalStartMs,
            acquirer,
          });
        } catch (err) {
          const provErr = err instanceof ProviderError
            ? err
            : new ProviderError('NETWORK_ERROR',
                `Historical fetch failed: ${String(err)}`, adapter.id, err);
          this._handleError(provErr);
          return;
        }

        const cacheTtl = config.cacheTtlMs ?? 60_000;
        if (cacheTtl > 0) {
          this._cache.set(cacheKey, candles, cacheTtl);
        }

        chart.loadData(candles);

        this.emit('historical:complete', {
          exchange:    adapter.id,
          candleCount: candles.length,
          durationMs:  performance.now() - t0,
        });
      }
    }

    // Stream phase
    const subscription = adapter.buildStreamSubscription(nativeSymbol, interval, intervalMs);

    const streamOptions = {
      ...subscription.options,
      parseMessage: (ev: MessageEvent) => {
        try {
          return subscription.options.parseMessage(ev);
        } catch (err) {
          this._handleError(new ProviderError('PARSE_ERROR',
            `parseMessage threw: ${String(err)}`, adapter.id, err));
          return null;
        }
      },
      onOpen: (send: (msg: string) => void) => {
        this._wsSend           = send;
        this._wsDisconnectHook = subscription.onDisconnect;
        try {
          subscription.onConnect?.(send);
        } catch (err) {
          this._handleError(new ProviderError('EXCHANGE_UNAVAILABLE',
            `onConnect hook threw: ${String(err)}`, adapter.id, err));
        }
      },
    };

    chart.connectStream(streamOptions);
    this._streaming = true;
    this.emit('stream:connect', { exchange: adapter.id, url: streamOptions.url });
  }

  private _handleSymbolChange(newSymbol: string): void {
    if (this._disposed) return;
    // Save config and chart before disconnect() — disconnect() sets _config and _chart
    // to null, so we need local copies to reconstruct the new connect() call.
    const savedConfig = this._config;
    const savedChart  = this._chart;
    if (!savedConfig || !savedChart) return;

    const newConfig = { ...savedConfig, symbol: newSymbol };
    this.disconnect();
    this.connect(savedChart, newConfig).catch(err => {
      newConfig.onError?.(err instanceof ProviderError
        ? err
        : new ProviderError('NETWORK_ERROR', String(err)));
    });
  }

  private _handleError(error: ProviderError): void {
    this._errorCount++;
    this._config?.onError?.(error);
    this.emit('provider:error', { error, errorCount: this._errorCount });

    if (this._errorCount >= (this._config?.failoverThreshold ?? 3)) {
      this._tryFailover().catch(err => {
        this._config?.onError?.(err instanceof ProviderError
          ? err
          : new ProviderError('FAILOVER_EXHAUSTED', String(err)));
      });
    }
  }

  private async _tryFailover(): Promise<void> {
    this._activeIdx++;
    if (this._activeIdx >= this._adapters.length) {
      throw new ProviderError('FAILOVER_EXHAUSTED',
        'All configured exchanges have exceeded their error budgets');
    }

    this._chart?.disconnectStream();
    this._streaming = false;
    this._errorCount = 0;

    const prev = this._adapters[this._activeIdx - 1].id;
    const next = this._adapters[this._activeIdx].id;
    this.emit('provider:change', { from: prev, to: next });
    this._config?.onProviderChange?.(next);

    await this._connectWithAdapter(this._adapters[this._activeIdx]);
  }
}
