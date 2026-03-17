// src/providers/adapters/BybitAdapter.ts

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

// Bybit v5 spot supported intervals. Note: '1M' (monthly) is NOT supported by the v5 API.
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
};

// ── Internal response types ───────────────────────────────────────────────────

interface BybitKlineResponse {
  retCode: number;
  retMsg:  string;
  result: {
    symbol:   string;
    category: string;
    list:     string[][];
  };
}

interface BybitWsMessage {
  topic?:  string;
  data?:   Array<{
    start:     number;
    end:       number;
    interval:  string;
    open:      string;
    close:     string;
    high:      string;
    low:       string;
    volume:    string;
    turnover:  string;
    confirm:   boolean;
    timestamp: number;
  }>;
  ts?:   number;
  type?: string;
  op?:   string;
}

// ── BybitAdapter ──────────────────────────────────────────────────────────────

export class BybitAdapter implements ExchangeAdapter {
  readonly id: ExchangeId = 'bybit';
  readonly name = 'Bybit';
  readonly maxCandlesPerRequest = 1000;
  readonly paginationStrategy: PaginationStrategy = 'time-window';

  readonly rateLimits: RateLimitBucket = {
    restKlines: { requestsPerWindow: 120, windowMs: 5_000 },
    restPublic: { requestsPerWindow: 120, windowMs: 5_000 },
    wsConnections: { requestsPerWindow: 500, windowMs: Infinity },
  };

  private readonly _fetch: typeof fetch;

  constructor(options?: { fetchFn?: typeof fetch }) {
    this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
  }

  supportsInterval(interval: Interval): boolean {
    return interval in BYBIT_INTERVAL;
  }

  resolveSymbol(canonical: string): string {
    // "BTC/USDT" → "BTCUSDT"
    return canonical.replace('/', '').toUpperCase();
  }

  async fetchSupportedSymbols(): Promise<ExchangeSymbol[]> {
    try {
      const res = await this._fetch(
        'https://api.bybit.com/v5/market/instruments-info?category=spot'
      );
      if (!res.ok) return [];
      const data = await res.json() as {
        result: {
          list: Array<{ symbol: string; baseCoin: string; quoteCoin: string; status: string }>;
        };
      };
      return (data.result?.list ?? [])
        .filter(s => s.status === 'Trading')
        .map(s => ({
          exchange: this.id,
          symbol: s.symbol,
          canonical: `${s.baseCoin}/${s.quoteCoin}` as CanonicalSymbol,
        }));
    } catch {
      return [];
    }
  }

  async fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult> {
    const bybitInterval = BYBIT_INTERVAL[request.interval];
    if (!bybitInterval) {
      throw new ProviderError('INVALID_INTERVAL',
        `Bybit does not support interval '${request.interval}'`, this.id);
    }

    await acquirer.acquire();

    const params = new URLSearchParams({
      category: 'spot',
      symbol:   request.symbol,
      interval: bybitInterval,
      limit:    String(Math.min(request.limit ?? this.maxCandlesPerRequest, this.maxCandlesPerRequest)),
    });
    if (request.startMs !== undefined) params.set('start', String(request.startMs));
    if (request.endMs   !== undefined) params.set('end',   String(request.endMs));

    const url = `https://api.bybit.com/v5/market/kline?${params}`;
    let res: Response;
    try {
      res = await this._fetch(url);
    } catch (err) {
      throw new ProviderError('NETWORK_ERROR',
        `Bybit fetch failed: ${String(err)}`, this.id, err);
    }

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After') ?? 60) * 1000;
      await new Promise(r => setTimeout(r, retryAfter));
      try {
        res = await this._fetch(url);
      } catch (err) {
        throw new ProviderError('NETWORK_ERROR',
          `Bybit fetch retry failed: ${String(err)}`, this.id, err);
      }
      if (res.status === 429) {
        throw new ProviderError('RATE_LIMITED',
          'Bybit rate limit exceeded after retry', this.id);
      }
    }

    if (!res.ok) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Bybit returned HTTP ${res.status}`, this.id);
    }

    let body: BybitKlineResponse;
    try {
      body = await res.json() as BybitKlineResponse;
    } catch (err) {
      throw new ProviderError('PARSE_ERROR',
        `Bybit kline JSON parse failed: ${String(err)}`, this.id, err);
    }

    // Check Bybit-specific error codes
    if (body.retCode !== 0) {
      if (body.retCode === 10006) {
        throw new ProviderError('RATE_LIMITED',
          `Bybit rate limited: ${body.retMsg}`, this.id);
      }
      if (body.retCode === 10001) {
        throw new ProviderError('SYMBOL_NOT_FOUND',
          `Bybit invalid parameter: ${body.retMsg}`, this.id);
      }
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Bybit error ${body.retCode}: ${body.retMsg}`, this.id);
    }

    // Bybit returns candles in descending order — reverse to ascending
    const candles: OHLCVCandle[] = (body.result?.list ?? [])
      .map(row => ({
        time:   parseInt(row[0], 10),
        open:   parseFloat(row[1]),
        high:   parseFloat(row[2]),
        low:    parseFloat(row[3]),
        close:  parseFloat(row[4]),
        volume: parseFloat(row[5]),
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
    interval: Interval,
    intervalMs: number,
  ): StreamSubscription {
    const bybitInterval = BYBIT_INTERVAL[interval] ?? '1';
    const topicArg = `kline.${bybitInterval}.${nativeSymbol}`;

    const subscribeMsg = JSON.stringify({
      op:   'subscribe',
      args: [topicArg],
    });
    const unsubscribeMsg = JSON.stringify({
      op:   'unsubscribe',
      args: [topicArg],
    });

    return {
      options: {
        url:                 'wss://stream.bybit.com/v5/public/spot',
        intervalMs,
        heartbeatIntervalMs: 20_000,
        heartbeatMessage:    '{"op":"ping"}',
        parseMessage: (ev: MessageEvent): OHLCVCandle | null => {
          const msg: BybitWsMessage = JSON.parse(ev.data as string);
          // Silently ignore pong frames
          if (msg.op === 'pong') return null;
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
        },
      },
      onConnect:    (send) => send(subscribeMsg),
      onDisconnect: (send) => send(unsubscribeMsg),
    };
  }
}
