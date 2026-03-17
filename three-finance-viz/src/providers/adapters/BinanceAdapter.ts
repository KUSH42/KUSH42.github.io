// src/providers/adapters/BinanceAdapter.ts

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

// ── Internal message types ────────────────────────────────────────────────────

interface BinanceKlineData {
  t: number;   // Open time ms
  T: number;   // Close time ms
  s: string;   // Symbol
  i: string;   // Interval
  o: string;   // Open
  c: string;   // Close
  h: string;   // High
  l: string;   // Low
  v: string;   // Volume
  n: number;   // Number of trades
  x: boolean;  // Is closed
  q: string;   // Quote asset volume
  V: string;   // Taker buy base asset volume
  Q: string;   // Taker buy quote asset volume
  B: string;   // Ignore
}

interface BinanceKlineMessage {
  e: string;       // Event type
  E: number;       // Event time
  s: string;       // Symbol
  k: BinanceKlineData;
}

// ── Supported intervals ──────────────────────────────────────────────────────

const BINANCE_SUPPORTED_INTERVALS = new Set<Interval>([
  '1m', '3m', '5m', '15m', '30m',
  '1h', '2h', '4h', '6h', '8h', '12h',
  '1d', '3d', '1w', '1M',
]);

// ── BinanceAdapter ────────────────────────────────────────────────────────────

export class BinanceAdapter implements ExchangeAdapter {
  readonly id: ExchangeId = 'binance';
  readonly name = 'Binance';
  readonly maxCandlesPerRequest = 1500;
  readonly paginationStrategy: PaginationStrategy = 'time-window';

  readonly rateLimits: RateLimitBucket = {
    restKlines: { requestsPerWindow: 3000, windowMs: 60_000 },
    restPublic: { requestsPerWindow: 6000, windowMs: 60_000 },
    wsConnections: { requestsPerWindow: 300, windowMs: 300_000 },
  };

  private readonly _fetch: typeof fetch;

  constructor(options?: { fetchFn?: typeof fetch }) {
    this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
  }

  supportsInterval(interval: Interval): boolean {
    return BINANCE_SUPPORTED_INTERVALS.has(interval);
  }

  resolveSymbol(canonical: string): string {
    // "BTC/USDT" → "BTCUSDT"
    return canonical.replace('/', '').toUpperCase();
  }

  async fetchSupportedSymbols(): Promise<ExchangeSymbol[]> {
    try {
      const res = await this._fetch('https://api.binance.com/api/v3/exchangeInfo');
      if (!res.ok) return [];
      const data = await res.json() as { symbols: Array<{ symbol: string; baseAsset: string; quoteAsset: string; status: string }> };
      return data.symbols
        .filter(s => s.status === 'TRADING')
        .map(s => ({
          exchange: this.id,
          symbol: s.symbol,
          canonical: `${s.baseAsset}/${s.quoteAsset}` as CanonicalSymbol,
        }));
    } catch {
      return [];
    }
  }

  async fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult> {
    if (!this.supportsInterval(request.interval)) {
      throw new ProviderError('INVALID_INTERVAL',
        `Binance does not support interval '${request.interval}'`,
        this.id);
    }

    await acquirer.acquire();

    const params = new URLSearchParams({
      symbol:   request.symbol,
      interval: request.interval,
      limit:    String(Math.min(request.limit ?? this.maxCandlesPerRequest, this.maxCandlesPerRequest)),
    });
    if (request.startMs !== undefined) params.set('startTime', String(request.startMs));
    if (request.endMs   !== undefined) params.set('endTime',   String(request.endMs));

    const url = `https://api.binance.com/api/v3/klines?${params}`;
    let res: Response;
    try {
      res = await this._fetch(url);
    } catch (err) {
      throw new ProviderError('NETWORK_ERROR',
        `Binance fetch failed: ${String(err)}`, this.id, err);
    }

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After') ?? 60) * 1000;
      await new Promise(r => setTimeout(r, retryAfter));
      // Retry once
      try {
        res = await this._fetch(url);
      } catch (err) {
        throw new ProviderError('NETWORK_ERROR',
          `Binance fetch retry failed: ${String(err)}`, this.id, err);
      }
      if (res.status === 429) {
        throw new ProviderError('RATE_LIMITED',
          'Binance rate limit exceeded after retry', this.id);
      }
    }

    if (!res.ok) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Binance returned HTTP ${res.status}`, this.id);
    }

    let raw: unknown[][];
    try {
      raw = await res.json() as unknown[][];
    } catch (err) {
      throw new ProviderError('PARSE_ERROR',
        `Binance klines JSON parse failed: ${String(err)}`, this.id, err);
    }

    const candles: OHLCVCandle[] = raw.map(row => ({
      time:   row[0] as number,
      open:   parseFloat(row[1] as string),
      high:   parseFloat(row[2] as string),
      low:    parseFloat(row[3] as string),
      close:  parseFloat(row[4] as string),
      volume: parseFloat(row[5] as string),
      trades: row[8] as number,
    }));

    return {
      candles,
      truncated: candles.length >= this.maxCandlesPerRequest,
      source: this.id,
    };
  }

  buildStreamSubscription(
    nativeSymbol: string,
    interval: Interval,
    intervalMs: number,
  ): StreamSubscription {
    const streamName = `${nativeSymbol.toLowerCase()}@kline_${interval}`;
    const url = `wss://stream.binance.com:9443/ws/${streamName}`;

    return {
      options: {
        url,
        intervalMs,
        heartbeatIntervalMs: 0, // Binance handles ping/pong at protocol level
        parseMessage: (ev: MessageEvent): OHLCVCandle | null => {
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
        },
      },
    };
  }

}
