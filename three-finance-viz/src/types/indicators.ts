// src/types/indicators.ts

export interface MovingAverageSeries {
  type: 'SMA' | 'EMA' | 'VWAP';
  period: number;
  /** Parallel array to candle data — index i corresponds to candle i */
  values: Array<number | null>; // null = not enough data yet
  color: string; // CSS hex, e.g. '#f5a623'
  lineWidth: number;
}

export interface BollingerBandSeries {
  type: 'BollingerBands';
  period: number;
  stdDevMultiplier: number;
  upper: Array<number | null>;
  middle: Array<number | null>; // same as SMA(period)
  lower: Array<number | null>;
  fillOpacity: number; // 0–1, for the ribbon between upper/lower
  color: string;
}

export interface RSISeries {
  type: 'RSI';
  period: number;
  values: Array<number | null>; // 0–100
  /** Panel offset in world units below the main chart, e.g. -8 */
  panelOffset: number;
  overboughtLevel: number; // default 70
  oversoldLevel: number; // default 30
}

export interface MACDSeries {
  type: 'MACD';
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
  macd: Array<number | null>;
  signal: Array<number | null>;
  histogram: Array<number | null>;
  /** Panel offset in world units below the main chart, e.g. -14 */
  panelOffset: number;
}

export type IndicatorSeries =
  | MovingAverageSeries
  | BollingerBandSeries
  | RSISeries
  | MACDSeries;
