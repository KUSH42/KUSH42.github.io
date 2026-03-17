export { FinanceChart } from './FinanceChart';
export type { FinanceChartOptions } from './FinanceChart';
export { DARK_THEME, LIGHT_THEME } from './types/theme';
export { CandleBuffer } from './types/CandleBuffer';
export type {
  OHLCVCandle,
  Tick,
  OrderBookLevel,
  OrderBookSnapshot,
  OrderBookDelta,
} from './types/market';
export type {
  IndicatorSeries,
  MovingAverageSeries,
  BollingerBandSeries,
  RSISeries,
  MACDSeries,
} from './types/indicators';
export type { ChartTheme } from './types/theme';
export type { ChartEvents, StreamEvents } from './types/events';
export type { ChartLayer } from './types/ChartLayer';
export type { LayoutEngine, CandleTransform } from './layout/LayoutEngine';
export type { StreamConnectOptions } from './streaming/WebSocketAdapter';

// ── v3.0 Provider layer exports ─────────────────────────────────────────────

export { ProviderManager } from './providers/ProviderManager';
export type { ExchangeAdapter } from './providers/adapters/ExchangeAdapter';
export { BinanceAdapter }  from './providers/adapters/BinanceAdapter';
export { CoinbaseAdapter } from './providers/adapters/CoinbaseAdapter';
export { KrakenAdapter }   from './providers/adapters/KrakenAdapter';
export { BybitAdapter }    from './providers/adapters/BybitAdapter';
export { DeribitAdapter }  from './providers/adapters/DeribitAdapter';
export { RateLimiter }    from './providers/RateLimiter';
export { SymbolResolver } from './providers/SymbolResolver';
export { LRUCache }       from './providers/LRUCache';
export { ProviderError, INTERVAL_MS } from './providers/types';
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
  ProviderErrorCode,
} from './providers/types';

// ── v2.0 Addendum exports ───────────────────────────────────────────────────

// Classes
export { IndicatorManager } from './indicators/IndicatorManager';
export { LineIndicatorRenderer } from './indicators/LineIndicatorRenderer';
export { BandIndicatorRenderer } from './indicators/BandIndicatorRenderer';
export { SubViewRenderer } from './indicators/SubViewRenderer';
export { TroikaLabelPool } from './labels/TroikaLabelPool';
export { AxisManager } from './axes/AxisManager';
export { UIController } from './ui/UIController';
export { NavigatorBar } from './ui/NavigatorBar';
export { CrosshairManager } from './interaction/CrosshairManager';
export { LegendPanel } from './interaction/LegendPanel';
export { PriceTicker } from './interaction/PriceTicker';
export { TooltipSystem } from './interaction/TooltipSystem';
export { RangeController } from './data/RangeController';

// Calculators
export {
  calcSMA, calcEMA, calcBollingerBands, calcRSI, calcMACD, extractSource,
} from './indicators/calculators';

// Utilities
export { debounce, throttle } from './utils/timing';

// Types
export type {
  IndicatorType,
  PriceSource,
  LayoutMode,
  BaseIndicatorConfig,
  SMAConfig,
  EMAConfig,
  BollingerConfig,
  RSIConfig,
  MACDConfig,
  IndicatorConfig,
  UIState,
  VisibleRange,
  ThemePalette,
  IndicatorValueMap,
  MACDValues,
  ScaleSet,
  OHLCV,
  BBResult,
  MACDResult,
  AxisConfig,
  EventBus,
} from './types/addendum';
