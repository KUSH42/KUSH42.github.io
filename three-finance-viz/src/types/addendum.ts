// src/types/addendum.ts
// v2.0 addendum type definitions — these are NEW types, not replacing v1.0 IndicatorSeries types.

// ── Indicator Configuration ─────────────────────────────────────────────────

export type IndicatorType = 'SMA' | 'EMA' | 'BB' | 'RSI' | 'MACD';
export type PriceSource = 'close' | 'open' | 'high' | 'low' | 'hl2' | 'ohlc4';
export type LayoutMode = 'Linear' | 'Helix' | 'Tunnel';

export interface BaseIndicatorConfig {
  id: string;          // Unique: 'sma_20', 'bb_20_2'
  type: IndicatorType;
  enabled: boolean;
  color: string;       // Hex: '#ff6600'
  opacity: number;     // 0–1
  lineWidth: number;   // For Line2, world-space pixels: 1–8
}

export interface SMAConfig extends BaseIndicatorConfig {
  type: 'SMA';
  period: number;      // 5–500
  source: PriceSource;
}

export interface EMAConfig extends BaseIndicatorConfig {
  type: 'EMA';
  period: number;
  source: PriceSource;
}

export interface BollingerConfig extends BaseIndicatorConfig {
  type: 'BB';
  period: number;      // 20 default
  stdDev: number;      // 2 default
  source: PriceSource;
  showMid: boolean;    // Show SMA midline
  bandOpacity: number; // Fill tube/ribbon opacity: 0–0.4
}

export interface RSIConfig extends BaseIndicatorConfig {
  type: 'RSI';
  period: number;      // 14 default
  source: PriceSource;
  overbought: number;  // 70
  oversold: number;    // 30
  subView: boolean;    // If true, render in sub-panel; if false, overlay in main scene
}

export interface MACDConfig extends BaseIndicatorConfig {
  type: 'MACD';
  fastPeriod: number;   // 12
  slowPeriod: number;   // 26
  signalPeriod: number; // 9
  source: PriceSource;
  subView: boolean;
}

export type IndicatorConfig = SMAConfig | EMAConfig | BollingerConfig | RSIConfig | MACDConfig;

// ── UI State ────────────────────────────────────────────────────────────────

export interface ThemePalette {
  background: string;
  gridLines: string;
  axisLabels: string;
  bullCandle: string;
  bearCandle: string;
  wick: string;
  volume: string;
  crosshair: string;
}

export interface VisibleRange {
  startIndex: number; // Candle index into full data array
  endIndex: number;   // Inclusive
  startTime: number;  // Unix ms (derived from index)
  endTime: number;    // Unix ms
  priceMin: number;   // Visible Y floor
  priceMax: number;   // Visible Y ceiling
  volumeMax: number;  // Visible Z max for volume scaling
}

export interface UIState {
  symbol: string;                 // 'BTCUSDT'
  interval: string;               // '1h'
  layoutMode: LayoutMode;
  theme: 'dark' | 'light';
  scaleMode: 'linear' | 'log';   // price-axis scale type
  visibleRange: VisibleRange;
  indicators: IndicatorConfig[];
  paletteOverrides: Partial<ThemePalette>;
  crosshairEnabled: boolean;
  tooltipsEnabled: boolean;
  chartType?: import('./chartType').ChartType;
}

// ── Indicator Value Cache ───────────────────────────────────────────────────

export interface IndicatorValueMap {
  [indicatorId: string]: (number | null)[];
}

export interface MACDValues {
  macd: (number | null)[];
  signal: (number | null)[];
  histogram: (number | null)[];
}

// ── Scale Set ───────────────────────────────────────────────────────────────

export interface ScaleSet {
  price: (value: number) => number;          // data → world Y
  priceInverse: (worldY: number) => number;  // world Y → data
  priceHeight: (dataHeight: number) => number; // data delta → world delta
  time?: { domain: (d: [number, number]) => void };
  volume?: { domain: (d: [number, number]) => void };
}

// ── OHLCV Interface ─────────────────────────────────────────────────────────

/** v2.0 OHLCV with timestamp field (used internally by new addendum components) */
export interface OHLCV {
  timestamp: number; // Unix ms UTC
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ── Calculator Result Types ─────────────────────────────────────────────────

export interface BBResult {
  mid:   (number | null)[];
  upper: (number | null)[];
  lower: (number | null)[];
}

export interface MACDResult {
  macd:      (number | null)[];
  signal:    (number | null)[];
  histogram: (number | null)[];
}

// ── Axis Config ─────────────────────────────────────────────────────────────

export interface AxisConfig {
  gridXMin: number;
  gridXMax: number;
  labelPool?: import('../labels/TroikaLabelPool').TroikaLabelPool;
}

// ── EventBus ────────────────────────────────────────────────────────────────

export interface EventBus {
  on(event: string, handler: (...args: any[]) => void): void;
  off(event: string, handler: (...args: any[]) => void): void;
  emit(event: string, payload?: any): void;
}
