// src/providers/adapters/CoinbaseAdapter.ts

import type { ExchangeAdapter } from './ExchangeAdapter';
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
  CanonicalSymbol,
} from '../types';
import { ProviderError } from '../types';
import type { OHLCVCandle } from '../../types/market';

// ── Interval mapping ──────────────────────────────────────────────────────────

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

// ── Internal response types ───────────────────────────────────────────────────

interface CoinbaseCandle {
  start:  string;
  low:    string;
  high:   string;
  open:   string;
  close:  string;
  volume: string;
}

interface CoinbaseWsEvent {
  type: string;
  candles?: Array<CoinbaseCandle & { product_id: string }>;
}

interface CoinbaseWsMessage {
  channel:      string;
  client_id:    string;
  timestamp:    string;
  sequence_num: number;
  events:       CoinbaseWsEvent[];
}

// ── CoinbaseAdapter ───────────────────────────────────────────────────────────

export class CoinbaseAdapter implements ExchangeAdapter {
  readonly id: ExchangeId = 'coinbase';
  readonly name = 'Coinbase Advanced Trade';
  readonly maxCandlesPerRequest = 350;
  readonly paginationStrategy: PaginationStrategy = 'time-window';

  readonly rateLimits: RateLimitBucket = {
    restKlines: { requestsPerWindow: 10, windowMs: 1_000 },
    restPublic: { requestsPerWindow: 10, windowMs: 1_000 },
    wsConnections: { requestsPerWindow: 8, windowMs: Infinity },
  };

  private readonly _fetch: typeof fetch;
  private _productMap?: Map<string, string>;

  constructor(options?: { fetchFn?: typeof fetch }) {
    this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
  }

  async initialize(): Promise<void> {
    try {
      const res = await this._fetch(
        'https://api.coinbase.com/api/v3/brokerage/market/products'
      );
      if (!res.ok) return; // Degrade gracefully
      const { products } = await res.json() as { products: Array<{ product_id: string }> };
      this._productMap = new Map<string, string>();
      for (const p of products) {
        // "BTC-USD" → canonical "BTC/USD"
        const canonical = p.product_id.replace('-', '/');
        this._productMap.set(canonical.toUpperCase(), p.product_id);
      }
      if (this._productMap.size === 0 && process.env.NODE_ENV !== 'production') {
        console.warn('[CoinbaseAdapter] initialize() returned 0 products; resolveSymbol() will fall back to heuristic');
      }
    } catch {
      // Network failure: fall back to heuristic in resolveSymbol()
    }
  }

  supportsInterval(interval: Interval): boolean {
    return interval in COINBASE_GRANULARITY;
  }

  /**
   * Resolve a canonical symbol (e.g. "BTC/USD") to a Coinbase product ID (e.g. "BTC-USD").
   * When the product map is populated by initialize(), lookup is exact.
   * If initialize() was not called or failed, falls back to a heuristic conversion
   * (replace "/" with "-") which is unreliable for non-USD pairs and may return
   * an invalid symbol — callers should ensure initialize() succeeds before use.
   */
  resolveSymbol(canonical: string): string | null {
    if (this._productMap) {
      return this._productMap.get(canonical.toUpperCase()) ?? null;
    }
    // Fallback heuristic if initialize() was skipped or failed:
    // BTC/USDT → "BTC-USDT", BTC/USD → "BTC-USD".
    // WARNING: This is unreliable for non-USD pairs; _productMap not populated.
    return canonical.replace('/', '-').toUpperCase();
  }

  async fetchSupportedSymbols(): Promise<ExchangeSymbol[]> {
    if (this._productMap) {
      const result: ExchangeSymbol[] = [];
      for (const [canonical, symbol] of this._productMap) {
        result.push({
          exchange: this.id,
          symbol,
          canonical: canonical as CanonicalSymbol,
        });
      }
      return result;
    }
    try {
      const res = await this._fetch(
        'https://api.coinbase.com/api/v3/brokerage/market/products'
      );
      if (!res.ok) return [];
      const { products } = await res.json() as { products: Array<{ product_id: string }> };
      return products.map(p => ({
        exchange: this.id,
        symbol: p.product_id,
        canonical: p.product_id.replace('-', '/') as CanonicalSymbol,
      }));
    } catch {
      return [];
    }
  }

  async fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult> {
    const granularity = COINBASE_GRANULARITY[request.interval];
    if (!granularity) {
      throw new ProviderError('INVALID_INTERVAL',
        `Coinbase does not support interval '${request.interval}'`, this.id);
    }

    await acquirer.acquire();

    const startSec = String(Math.floor(request.startMs / 1000));
    const endSec   = String(Math.floor((request.endMs ?? Date.now()) / 1000));

    const params = new URLSearchParams({
      start:       startSec,
      end:         endSec,
      granularity,
    });
    if (request.limit) {
      params.set('limit', String(Math.min(request.limit, this.maxCandlesPerRequest)));
    }

    const url = `https://api.coinbase.com/api/v3/brokerage/market/products/${request.symbol}/candles?${params}`;
    let res: Response;
    try {
      res = await this._fetch(url);
    } catch (err) {
      throw new ProviderError('NETWORK_ERROR',
        `Coinbase fetch failed: ${String(err)}`, this.id, err);
    }

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After') ?? 60) * 1000;
      await new Promise(r => setTimeout(r, retryAfter));
      try {
        res = await this._fetch(url);
      } catch (err) {
        throw new ProviderError('NETWORK_ERROR',
          `Coinbase fetch retry failed: ${String(err)}`, this.id, err);
      }
      if (res.status === 429) {
        throw new ProviderError('RATE_LIMITED',
          'Coinbase rate limit exceeded after retry', this.id);
      }
    }

    if (!res.ok) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Coinbase returned HTTP ${res.status}`, this.id);
    }

    let body: { candles: CoinbaseCandle[] };
    try {
      body = await res.json() as { candles: CoinbaseCandle[] };
    } catch (err) {
      throw new ProviderError('PARSE_ERROR',
        `Coinbase candles JSON parse failed: ${String(err)}`, this.id, err);
    }

    // Coinbase returns candles in descending order — reverse to ascending
    const candles: OHLCVCandle[] = body.candles
      .map(c => ({
        time:   parseInt(c.start, 10) * 1000,
        open:   parseFloat(c.open),
        high:   parseFloat(c.high),
        low:    parseFloat(c.low),
        close:  parseFloat(c.close),
        volume: parseFloat(c.volume),
      }))
      .reverse();

    return {
      candles,
      truncated: candles.length >= this.maxCandlesPerRequest,
      source: this.id,
    };
  }

  buildStreamSubscription(
    nativeSymbol: string,
    _interval: Interval,
    intervalMs: number,
  ): StreamSubscription {
    const subscribeMsg = JSON.stringify({
      type:        'subscribe',
      product_ids: [nativeSymbol],
      channel:     'candles',
    });
    const unsubscribeMsg = JSON.stringify({
      type:        'unsubscribe',
      product_ids: [nativeSymbol],
      channel:     'candles',
    });

    return {
      options: {
        url:       'wss://advanced-trade-ws.coinbase.com',
        intervalMs,
        parseMessage: (ev: MessageEvent): OHLCVCandle | null => {
          const msg: CoinbaseWsMessage = JSON.parse(ev.data as string);
          if (msg.channel !== 'candles') return null;
          const events = msg.events ?? [];
          for (let i = events.length - 1; i >= 0; i--) {
            const candles = events[i].candles;
            if (candles && candles.length > 0) {
              const c = candles[candles.length - 1];
              return {
                time:   parseInt(c.start, 10) * 1000,
                open:   parseFloat(c.open),
                high:   parseFloat(c.high),
                low:    parseFloat(c.low),
                close:  parseFloat(c.close),
                volume: parseFloat(c.volume),
              };
            }
          }
          return null;
        },
      },
      onConnect:    (send) => send(subscribeMsg),
      onDisconnect: (send) => send(unsubscribeMsg),
    };
  }
}
