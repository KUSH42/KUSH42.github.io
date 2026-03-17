// demo/mockWebSocket.ts

import type { OHLCVCandle } from '../src/types/market';

/**
 * A minimal WebSocket-compatible test double.
 * Implements just enough of the WebSocket API for WebSocketAdapter to use.
 */
export class MockWebSocket
  implements
    Pick<
      WebSocket,
      | 'binaryType'
      | 'readyState'
      | 'onopen'
      | 'onmessage'
      | 'onerror'
      | 'onclose'
      | 'send'
      | 'close'
    >
{
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  binaryType: BinaryType = 'arraybuffer';
  readyState = MockWebSocket.OPEN;
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;

  constructor(readonly url: string) {
    // Simulate async open
    queueMicrotask(() => this.onopen?.(new Event('open')));
  }

  send(_data: string | ArrayBuffer): void {
    /* ignore outgoing in tests */
  }

  close(code = 1000, reason = ''): void {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.(new CloseEvent('close', { code, reason }));
  }

  /** Inject a message as if it arrived from the server */
  inject(data: string): void {
    this.onmessage?.(new MessageEvent('message', { data }));
  }
}

/**
 * Simulates a Binance kline stream using MockWebSocket.
 * Returns the mock socket instance and a stop handle.
 */
export function createMockBinanceStream(
  initialCandles: OHLCVCandle[],
  tickIntervalMs = 250,
): { socket: MockWebSocket; stop: () => void } {
  const socket = new MockWebSocket('mock://btcusdt@kline_1m');
  let price = initialCandles.at(-1)!.close;

  const timer = setInterval(() => {
    price *= 1 + (Math.random() - 0.5) * 0.003;
    const open = initialCandles.at(-1)!.close;
    socket.inject(
      JSON.stringify({
        k: {
          t: Date.now(),
          o: open.toFixed(2),
          c: price.toFixed(2),
          h: Math.max(open, price).toFixed(2),
          l: Math.min(open, price).toFixed(2),
          v: (Math.random() * 15 + 1).toFixed(4),
        },
      }),
    );
  }, tickIntervalMs);

  return { socket, stop: () => clearInterval(timer) };
}
