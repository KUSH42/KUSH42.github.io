// src/providers/adapters/KrakenAdapter.ts

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

// ── Symbol aliases ────────────────────────────────────────────────────────────

const KRAKEN_BASE_ALIASES: Record<string, string> = {
  'BTC':  'XBT',
  'DOGE': 'XDG',
};

// ── Internal response types ───────────────────────────────────────────────────

interface KrakenOHLCResponse {
  error:  string[];
  result: Record<string, unknown[][]> & { last: number };
}

interface KrakenAssetPairsResponse {
  error:  string[];
  result: Record<string, {
    altname:    string;
    wsname?:    string;
    base:       string;
    quote:      string;
    status?:    string;
  }>;
}

interface KrakenWsMessage {
  channel?: string;
  type?:    string;
  data?:    Array<{
    symbol:         string;
    open:           string;
    high:           string;
    low:            string;
    close:          string;
    vwap:           string;
    trades:         number;
    volume:         string;
    interval_begin: string;
    interval:       number;
    timestamp:      string;
  }>;
}

// ── KrakenAdapter ─────────────────────────────────────────────────────────────

export class KrakenAdapter implements ExchangeAdapter {
  readonly id: ExchangeId = 'kraken';
  readonly name = 'Kraken';
  readonly maxCandlesPerRequest = 720;
  readonly paginationStrategy: PaginationStrategy = 'cursor';

  readonly rateLimits: RateLimitBucket = {
    restKlines: { requestsPerWindow: 1, windowMs: 1_000 },
    restPublic: { requestsPerWindow: 1, windowMs: 1_000 },
  };

  private readonly _fetch: typeof fetch;
  /** Map from canonical form (e.g. "BTC/USD") to Kraken pair name (e.g. "XBTUSD") */
  private _symbolMap?: Map<string, string>;
  /** Map from canonical to Kraken WS symbol format (e.g. "BTC/USD") */
  private _wsSymbolMap?: Map<string, string>;

  constructor(options?: { fetchFn?: typeof fetch }) {
    this._fetch = options?.fetchFn ?? globalThis.fetch.bind(globalThis);
  }

  async initialize(): Promise<void> {
    try {
      const res = await this._fetch('https://api.kraken.com/0/public/AssetPairs');
      if (!res.ok) return;
      const data = await res.json() as KrakenAssetPairsResponse;
      if (data.error?.length > 0) return;

      this._symbolMap   = new Map<string, string>();
      this._wsSymbolMap = new Map<string, string>();

      for (const [pairName, info] of Object.entries(data.result)) {
        if (!info.base || !info.quote) continue;
        // Normalize base and quote: strip leading Z/X prefixes Kraken uses
        const base  = this._normalizeKrakenAsset(info.base);
        const quote = this._normalizeKrakenAsset(info.quote);
        const canonical = `${base}/${quote}`.toUpperCase();
        this._symbolMap.set(canonical, pairName);

        // Also store WS name if available
        if (info.wsname) {
          this._wsSymbolMap.set(canonical, info.wsname);
        }
      }
    } catch {
      // Degrade gracefully — resolveSymbol will fall back to heuristic
    }
  }

  private _normalizeKrakenAsset(asset: string): string {
    // Kraken uses prefixes like XXBT, ZUSD — strip them for canonical form
    // Map Kraken-specific names back to common names
    const aliases: Record<string, string> = {
      'XXBT': 'BTC', 'XBT': 'BTC',
      'XETH': 'ETH',
      'ZUSD': 'USD',
      'ZEUR': 'EUR',
      'ZGBP': 'GBP',
      'ZJPY': 'JPY',
      'ZCAD': 'CAD',
      'XLTC': 'LTC',
      'XXRP': 'XRP',
      'XDG':  'DOGE',
    };
    return aliases[asset] ?? asset;
  }

  supportsInterval(interval: Interval): boolean {
    return interval in KRAKEN_INTERVAL_MINUTES;
  }

  resolveSymbol(canonical: string): string | null {
    const upper = canonical.toUpperCase();

    if (this._symbolMap) {
      return this._symbolMap.get(upper) ?? null;
    }

    // Fallback heuristic: apply base aliases
    const parts = upper.split('/');
    if (parts.length !== 2) return null;
    const [base, quote] = parts;
    const krakenBase  = KRAKEN_BASE_ALIASES[base]  ?? base;
    const krakenQuote = quote;
    return `${krakenBase}${krakenQuote}`;
  }

  async fetchSupportedSymbols(): Promise<ExchangeSymbol[]> {
    if (this._symbolMap) {
      const result: ExchangeSymbol[] = [];
      for (const [canonical, symbol] of this._symbolMap) {
        result.push({
          exchange: this.id,
          symbol,
          canonical: canonical as CanonicalSymbol,
        });
      }
      return result;
    }
    try {
      const res = await this._fetch('https://api.kraken.com/0/public/AssetPairs');
      if (!res.ok) return [];
      const data = await res.json() as KrakenAssetPairsResponse;
      if (data.error?.length > 0) return [];
      return Object.entries(data.result).map(([pairName, info]) => {
        const base  = this._normalizeKrakenAsset(info.base ?? '');
        const quote = this._normalizeKrakenAsset(info.quote ?? '');
        return {
          exchange: this.id,
          symbol:   pairName,
          canonical: `${base}/${quote}`.toUpperCase() as CanonicalSymbol,
        };
      });
    } catch {
      return [];
    }
  }

  async fetchKlines(
    request: HistoricalFetchRequest,
    acquirer: TokenAcquirer,
  ): Promise<HistoricalFetchResult> {
    const intervalMinutes = KRAKEN_INTERVAL_MINUTES[request.interval];
    if (!intervalMinutes) {
      throw new ProviderError('INVALID_INTERVAL',
        `Kraken does not support interval '${request.interval}'`, this.id);
    }

    await acquirer.acquire();

    const params = new URLSearchParams({
      pair:     request.symbol,
      interval: String(intervalMinutes),
    });
    // Kraken uses `since` in Unix seconds
    if (request.startMs !== undefined) {
      params.set('since', String(Math.floor(request.startMs / 1000)));
    }

    const url = `https://api.kraken.com/0/public/OHLC?${params}`;
    let res: Response;
    try {
      res = await this._fetch(url);
    } catch (err) {
      throw new ProviderError('NETWORK_ERROR',
        `Kraken fetch failed: ${String(err)}`, this.id, err);
    }

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After') ?? 60) * 1000;
      await new Promise(r => setTimeout(r, retryAfter));
      try {
        res = await this._fetch(url);
      } catch (err) {
        throw new ProviderError('NETWORK_ERROR',
          `Kraken fetch retry failed: ${String(err)}`, this.id, err);
      }
      if (res.status === 429) {
        throw new ProviderError('RATE_LIMITED',
          'Kraken rate limit exceeded after retry', this.id);
      }
    }

    if (!res.ok) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        `Kraken returned HTTP ${res.status}`, this.id);
    }

    let body: KrakenOHLCResponse;
    try {
      body = await res.json() as KrakenOHLCResponse;
    } catch (err) {
      throw new ProviderError('PARSE_ERROR',
        `Kraken OHLC JSON parse failed: ${String(err)}`, this.id, err);
    }

    // Check for API-level errors
    if (body.error && body.error.length > 0) {
      const errStr = body.error[0];
      if (errStr.includes('Unknown asset pair') || errStr.includes('Invalid asset')) {
        throw new ProviderError('SYMBOL_NOT_FOUND',
          `Kraken: unknown symbol '${request.symbol}': ${errStr}`, this.id);
      }
      throw new ProviderError('PARSE_ERROR',
        `Kraken API error: ${errStr}`, this.id);
    }

    // Find the data array (result has pair name as key plus 'last')
    const resultKeys = Object.keys(body.result ?? {}).filter(k => k !== 'last');
    if (resultKeys.length === 0) {
      throw new ProviderError('SYMBOL_NOT_FOUND',
        `Kraken: no data in response for symbol '${request.symbol}'`, this.id);
    }

    const pairData = body.result[resultKeys[0]] as unknown[][];
    const last: number = (body.result as unknown as { last: number }).last;

    const candles: OHLCVCandle[] = pairData.map(row => ({
      time:   (row[0] as number) * 1000,
      open:   parseFloat(row[1] as string),
      high:   parseFloat(row[2] as string),
      low:    parseFloat(row[3] as string),
      close:  parseFloat(row[4] as string),
      volume: parseFloat(row[6] as string),
      trades: row[7] as number,
    }));

    return {
      candles,
      truncated:  candles.length >= this.maxCandlesPerRequest,
      source:     this.id,
      nextCursor: last, // Unix seconds; used for cursor-based pagination
    };
  }

  /**
   * Convert a native REST symbol (e.g. "XBTUSD") to Kraken WS format (e.g. "BTC/USD").
   * First tries the populated _wsSymbolMap (set by initialize()), then falls back to
   * heuristic conversion using known Kraken base aliases and common quote suffixes.
   */
  private _toWsSymbol(nativeRestSymbol: string): string {
    // If symbol already contains a slash, it's already in WS format
    if (nativeRestSymbol.includes('/')) return nativeRestSymbol;

    // Try reverse lookup: find canonical for this REST pair, then get WS symbol
    if (this._wsSymbolMap && this._symbolMap) {
      for (const [canonical, restPair] of this._symbolMap) {
        if (restPair === nativeRestSymbol) {
          const ws = this._wsSymbolMap.get(canonical);
          if (ws) return ws;
          // Canonical is already "BASE/QUOTE" — use it directly
          return canonical;
        }
      }
    }

    // Heuristic: map known Kraken REST prefixes to common names
    const REVERSE: Record<string, string> = {
      'XXBT': 'BTC', 'XBT': 'BTC', 'XDG': 'DOGE',
    };
    for (const [k, v] of Object.entries(REVERSE)) {
      if (nativeRestSymbol.startsWith(k)) {
        const base  = v;
        const quote = nativeRestSymbol.slice(k.length).replace(/^Z/, '');
        return `${base}/${quote}`;
      }
    }

    // Last resort: try known quote suffixes to insert slash
    const knownQuotes = ['USDT', 'USDC', 'USD', 'EUR', 'BTC', 'ETH'];
    for (const q of knownQuotes) {
      if (nativeRestSymbol.endsWith(q) && nativeRestSymbol.length > q.length) {
        return `${nativeRestSymbol.slice(0, -q.length)}/${q}`;
      }
    }

    return nativeRestSymbol; // give up — return as-is
  }

  buildStreamSubscription(
    nativeSymbol: string,
    interval: Interval,
    intervalMs: number,
  ): StreamSubscription {
    const intervalMinutes = KRAKEN_INTERVAL_MINUTES[interval] ?? 1;

    // Kraken v2 WS uses the slash format (e.g. "BTC/USD").
    // nativeSymbol is the REST pair (e.g. "XBTUSD"); _toWsSymbol converts it,
    // falling back to heuristics when _wsSymbolMap is not populated.
    const wsSymbol = this._toWsSymbol(nativeSymbol);

    const subscribeMsg = JSON.stringify({
      method: 'subscribe',
      params: {
        channel:  'ohlc',
        symbol:   [wsSymbol],
        interval: intervalMinutes,
      },
    });
    const unsubscribeMsg = JSON.stringify({
      method: 'unsubscribe',
      params: {
        channel:  'ohlc',
        symbol:   [wsSymbol],
        interval: intervalMinutes,
      },
    });

    return {
      options: {
        url:       'wss://ws.kraken.com',
        intervalMs,
        parseMessage: (ev: MessageEvent): OHLCVCandle | null => {
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
        },
      },
      onConnect:    (send) => send(subscribeMsg),
      onDisconnect: (send) => send(unsubscribeMsg),
    };
  }
}
