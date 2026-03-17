// src/types/market.ts

/** Raw OHLCV candle — the fundamental unit of all chart data */
export interface OHLCVCandle {
  /** Unix timestamp in milliseconds (UTC) */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  /** Optional: trade count in this period */
  trades?: number;
}

/** Streaming tick — partial update for the most recent candle */
export interface Tick {
  /** Unix timestamp in milliseconds (UTC) */
  time: number;
  price: number;
  volume: number;
  side: 'buy' | 'sell';
}

/** A single level in the order book */
export interface OrderBookLevel {
  price: number;
  size: number;
  side: 'bid' | 'ask';
}

/** Full order book snapshot */
export interface OrderBookSnapshot {
  /** Unix timestamp in milliseconds (UTC) */
  time: number;
  bids: OrderBookLevel[]; // sorted descending by price
  asks: OrderBookLevel[]; // sorted ascending by price
  midPrice: number;
}

/** Incremental order book update */
export interface OrderBookDelta {
  /** Unix timestamp in milliseconds (UTC) */
  time: number;
  changes: Array<OrderBookLevel & { action: 'add' | 'update' | 'remove' }>;
}
