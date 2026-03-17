// src/providers/index.ts
// Public API surface for the live-data-provider layer.

// Main orchestrator
export { ProviderManager } from './ProviderManager';

// Adapter interface (for custom adapters)
export type { ExchangeAdapter } from './adapters/ExchangeAdapter';

// Built-in adapters — each independently importable for tree-shaking
export { BinanceAdapter }  from './adapters/BinanceAdapter';
export { CoinbaseAdapter } from './adapters/CoinbaseAdapter';
export { KrakenAdapter }   from './adapters/KrakenAdapter';
export { BybitAdapter }    from './adapters/BybitAdapter';
export { DeribitAdapter }  from './adapters/DeribitAdapter';

// Utilities (for custom adapter authors)
export { RateLimiter }           from './RateLimiter';
export { SymbolResolver }        from './SymbolResolver';
export { LRUCache }              from './LRUCache';
export { HistoricalDataFetcher } from './HistoricalDataFetcher';
export type { FetchOptions }     from './HistoricalDataFetcher';

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
