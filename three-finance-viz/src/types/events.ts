// src/types/events.ts

import type * as THREE from 'three';
import type { OHLCVCandle, Tick, OrderBookDelta } from './market';

/** Events emitted by FinanceChart (consumed by application code) */
export interface ChartEvents extends Record<string, unknown> {
  'candle:hover': { index: number; candle: OHLCVCandle; worldPos: THREE.Vector3 } | null;
  'candle:click': { index: number; candle: OHLCVCandle };
  'range:change': { startIndex: number; endIndex: number };
  'camera:move': { position: THREE.Vector3; target: THREE.Vector3 };
  'render:frame': { deltaMs: number; fps: number };
  'symbol:change': { symbol: string };
}

/** Events emitted by WebSocketAdapter (consumed by FinanceChart internals) */
export interface StreamEvents extends Record<string, unknown> {
  connect: { url: string };
  disconnect: { code: number; reason: string };
  error: { error: Error };
  message: OHLCVCandle | Tick | OrderBookDelta;
}
