// src/types/theme.ts

export interface ChartTheme {
  background: string;
  grid: string;
  axis: string;
  crosshair: string;
  tooltip: { background: string; text: string; border: string };
  candle: {
    bullBody: string;
    bearBody: string;
    bullWick: string;
    bearWick: string;
    /** Emissive color for bloom pass on bullish candles */
    bullBodyEmissive: string;
    bearBodyEmissive: string;
  };
  volume: {
    bullBar: string;
    bearBar: string;
    gradient: [string, string]; // low → high volume
  };
  orderBook: {
    bidHeat: [string, string]; // low size → high size
    askHeat: [string, string];
  };
  line?: {
    color: string;
    lineWidth: number;
  };
  area?: {
    lineColor: string;
    fillColor: string;
    floorAlpha: number;
  };
  marketCap?: {
    lineColor: string;
    fillColor: string;
    floorAlpha: number;
  };
}

export const DARK_THEME: ChartTheme = {
  background: '#0d0f14',
  grid: '#1a1d24',
  axis: '#3a3d4a',
  crosshair: '#ffffff44',
  tooltip: { background: '#1e2130', text: '#e0e4f0', border: '#3a3d4a' },
  candle: {
    bullBody: '#26a69a',
    bearBody: '#ef5350',
    bullWick: '#26a69a',
    bearWick: '#ef5350',
    bullBodyEmissive: '#00fff233',
    bearBodyEmissive: '#ff000033',
  },
  volume: {
    bullBar: '#26a69a66',
    bearBar: '#ef535066',
    gradient: ['#1a1d24', '#26a69a'],
  },
  orderBook: {
    bidHeat: ['#0d2b1e', '#26a69a'],
    askHeat: ['#2b0d0d', '#ef5350'],
  },
  line: { color: '#26a69a', lineWidth: 2 },
  area: { lineColor: '#26a69a', fillColor: '#26a69a', floorAlpha: 0.08 },
  marketCap: { lineColor: '#7c4dff', fillColor: '#7c4dff', floorAlpha: 0.08 },
};

export const LIGHT_THEME: ChartTheme = {
  background: '#f5f5f5',
  grid: '#e0e0e0',
  axis: '#9e9e9e',
  crosshair: '#00000044',
  tooltip: { background: '#ffffff', text: '#212121', border: '#bdbdbd' },
  candle: {
    bullBody: '#00897b',
    bearBody: '#e53935',
    bullWick: '#00897b',
    bearWick: '#e53935',
    bullBodyEmissive: '#00000000',
    bearBodyEmissive: '#00000000',
  },
  volume: {
    bullBar: '#00897b66',
    bearBar: '#e5393566',
    gradient: ['#e0e0e0', '#00897b'],
  },
  orderBook: {
    bidHeat: ['#e8f5e9', '#00897b'],
    askHeat: ['#ffebee', '#e53935'],
  },
  line: { color: '#00897b', lineWidth: 2 },
  area: { lineColor: '#00897b', fillColor: '#00897b', floorAlpha: 0.10 },
  marketCap: { lineColor: '#5e35b1', fillColor: '#5e35b1', floorAlpha: 0.10 },
};
