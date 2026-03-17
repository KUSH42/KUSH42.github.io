// src/providers/adapters/DeribitAdapter.ts

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

// ── Resolution mapping ────────────────────────────────────────────────────────

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

// ── Internal response types ───────────────────────────────────────────────────

interface DeribitChartResult {
  ticks:  number[];
  open:   number[];
  high:   number[];
  low:    number[];
  close:  number[];
  volume: number[];
  cost:   number[];
}

interface DeribitRestResponse {
  jsonrpc: string;
  result:  DeribitChartResult;
  error?:  { code: number; message: string };
}

interface DeribitWsMessage {
  jsonrpc: string;
  id?:     number;
  result?: unknown;
  method?: string;
  params?: {
    channel: string;
    data:    {
      tick:    number;
      open:    number;
      high:    number;
      low:     number;
      close:   number;
      volume:  number;
      cost:    number;
    };
  };
}

// ── DeribitAdapter ────────────────────────────────────────────────────────────

export class DeribitAdapter implements ExchangeAdapter {
  readonly id: ExchangeId = 'deribit';
  readonly name = 'Deribit';
  readonly maxCandlesPerRequest = 5000;
  readonly paginationStrategy: PaginationStrategy = 'time-window';

  readonly rateLimits: RateLimitBucket = {
    restKlines: { requestsPerWindow: 20, windowMs: 1_000 },
    restPublic: { requestsPerWindow: 20, windowMs: 1_000 },
    wsConnections: { requestsPerWindow: 10, windowMs: Infinity },
  };

  private readonly _fetch: typeof fetch;
  private _pendingRpc = new Map<number, (result: unknown) => void>();
  private _nextId = 1;

  constructor(options?: { fetchFn?: typeof fetch }) {
    this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
  }

  supportsInterval(interval: Interval): boolean {
    return interval in DERIBIT_RESOLUTION;
  }

  resolveSymbol(canonical: string): string | null {
    // Deribit uses instrument names like "BTC-PERPETUAL", "ETH-PERPETUAL",
    // "BTC-31DEC21", etc. For perpetuals, we do a simple mapping.
    const parts = canonical.toUpperCase().split('/');
    if (parts.length !== 2) return null;
    const [base] = parts;
    // Default to PERPETUAL contract for spot-like symbols
    return `${base}-PERPETUAL`;
  }

  async fetchSupportedSymbols(): Promise<ExchangeSymbol[]> {
    try {
      const res = await this._fetch(
        'https://www.deribit.com/api/v2/public/get_instruments?currency=BTC&kind=future'
      );
      if (!res.ok) return [];
      const data = await res.json() as {
        result: Array<{ instrument_name: string; base_currency: string; quote_currency: string }>;
      };
      return (data.result ?? []).map(inst => ({
        exchange: this.id,
        symbol:   inst.instrument_name,
        canonical: `${inst.base_currency}/${inst.quote_currency}` as CanonicalSymbol,
      }));
    } catch {
      return [];
    }
  }

  async fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult> {
    const resolution = DERIBIT_RESOLUTION[request.interval];
    if (!resolution) {
      throw new ProviderError('INVALID_INTERVAL',
        `Deribit does not support interval '${request.interval}'`, this.id);
    }

    await acquirer.acquire();

    const params = new URLSearchParams({
      instrument_name:  request.symbol,
      start_timestamp:  String(request.startMs),
      end_timestamp:    String(request.endMs ?? Date.now()),
      resolution,
    });

    const url = `https://www.deribit.com/api/v2/public/get_tradingview_chart_data?${params}`;
    let res: Response;
    try {
      res = await this._fetch(url);
    } catch (err) {
      throw new ProviderError('NETWORK_ERROR',
        `Deribit fetch failed: ${String(err)}`, this.id, err);
    }

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After') ?? 60) * 1000;
      await new Promise(r => setTimeout(r, retryAfter));
      try {
        res = await this._fetch(url);
      } catch (err) {
        throw new ProviderError('NETWORK_ERROR',
          `Deribit fetch retry failed: ${String(err)}`, this.id, err);
      }
      if (res.status === 429) {
        throw new ProviderError('RATE_LIMITED',
          'Deribit rate limit exceeded after retry', this.id);
      }
    }

    if (!res.ok) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Deribit returned HTTP ${res.status}`, this.id);
    }

    let body: DeribitRestResponse;
    try {
      body = await res.json() as DeribitRestResponse;
    } catch (err) {
      throw new ProviderError('PARSE_ERROR',
        `Deribit chart data JSON parse failed: ${String(err)}`, this.id, err);
    }

    if (body.error) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Deribit API error ${body.error.code}: ${body.error.message}`, this.id);
    }

    const r = body.result;
    // Zip parallel arrays into OHLCVCandle[]
    const candles: OHLCVCandle[] = r.ticks.map((tick, i) => ({
      time:   tick,
      open:   r.open[i],
      high:   r.high[i],
      low:    r.low[i],
      close:  r.close[i],
      volume: r.volume[i],
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
    const resolution = DERIBIT_RESOLUTION[interval] ?? '1';
    const channel    = `chart.trades.${nativeSymbol}.${resolution}`;

    return {
      options: {
        url:       'wss://www.deribit.com/ws/api/v2',
        intervalMs,
        // Arrow function closes over `this` so _parseMessage can access _pendingRpc
        parseMessage: (ev: MessageEvent) => this._parseMessage(ev, channel),
      },
      onConnect:    (send) => this._sendSubscribe(send, channel),
      onDisconnect: (send) => this._sendUnsubscribe(send, channel),
    };
  }

  private _parseMessage(ev: MessageEvent, channel: string): OHLCVCandle | null {
    const msg: DeribitWsMessage = JSON.parse(ev.data as string);

    // Subscription confirm frame (has "id", result present, and is NOT a subscription push)
    if (msg.id !== undefined && msg.result !== undefined && msg.method !== 'subscription') {
      this._pendingRpc.get(msg.id)?.(msg.result);
      this._pendingRpc.delete(msg.id);
      return null;
    }

    // Data frame
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

  private _sendSubscribe(send: (msg: string) => void, channel: string): void {
    const id = this._nextId++;
    // Auto-cleanup after 30 s to prevent memory leaks if the server never confirms
    const timeoutId = setTimeout(() => {
      this._pendingRpc.delete(id);
    }, 30_000);
    this._pendingRpc.set(id, (_result) => {
      clearTimeout(timeoutId);
      this._pendingRpc.delete(id);
    });
    send(JSON.stringify({
      jsonrpc: '2.0',
      method:  'public/subscribe',
      id,
      params:  { channels: [channel] },
    }));
  }

  private _sendUnsubscribe(send: (msg: string) => void, channel: string): void {
    const id = this._nextId++;
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      method:  'public/unsubscribe',
      id,
      params:  { channels: [channel] },
    });
    send(payload);
  }
}
