// src/streaming/WebSocketAdapter.ts

import { EventEmitter } from '../utils/EventEmitter';
import type { StreamEvents } from '../types/events';
import type { OHLCVCandle, Tick, OrderBookDelta } from '../types/market';

export interface StreamConnectOptions {
  url: string;
  /** Interval ms for the chart's candlestick aggregation window, e.g. 60_000 for 1m bars */
  intervalMs: number;
  /** Base reconnect delay in ms; doubles on each failure, capped at 30_000. Default 1000. */
  reconnectDelayMs?: number;
  /** Ping interval in ms; 0 = disabled. Default 30_000. */
  heartbeatIntervalMs?: number;
  /**
   * Transform a raw WebSocket message into a typed market event.
   * Return null to silently skip the message.
   */
  parseMessage: (raw: MessageEvent) => Tick | OHLCVCandle | OrderBookDelta | null;
  /**
   * Dependency-injection hook for testing.
   * Provide a factory that returns a WebSocket-compatible instance.
   * Example: `WebSocketClass: () => myMockSocket`
   * Defaults to `(url) => new WebSocket(url)`.
   */
  WebSocketClass?: (url: string) => Pick<
    WebSocket,
    | 'binaryType'
    | 'readyState'
    | 'onopen'
    | 'onmessage'
    | 'onerror'
    | 'onclose'
    | 'send'
    | 'close'
  >;
  /**
   * Called immediately after the WebSocket opens.
   * Receives a `send` callback that writes directly to the underlying WebSocket.
   * Used by the provider layer to deliver subscription frames after connect.
   */
  onOpen?: (send: (msg: string) => void) => void;
  /**
   * Custom heartbeat message string. Defaults to `'ping'`.
   * Bybit requires `'{"op":"ping"}'` instead of the plain `'ping'`.
   */
  heartbeatMessage?: string;
}

export class WebSocketAdapter extends EventEmitter<StreamEvents> {
  private ws: WebSocket | null = null;
  private retryDelay = 1000;
  private manualClose = false;
  private heartbeatTimer?: ReturnType<typeof setInterval>;

  constructor(private readonly opts: StreamConnectOptions) {
    super();
  }

  connect(): void {
    this.manualClose = false;
    this._open();
  }

  private _open(): void {
    // Use injected WebSocketClass if provided (enables test doubles / mock sockets)
    this.ws = this.opts.WebSocketClass
      ? (this.opts.WebSocketClass(this.opts.url) as WebSocket)
      : new WebSocket(this.opts.url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this.retryDelay = 1000; // reset backoff on successful connect
      this._startHeartbeat();
      this.emit('connect', { url: this.opts.url });
      try {
        this.opts.onOpen?.((msg) => this.ws!.send(msg));
      } catch (err) {
        this.emit('error', { error: err instanceof Error ? err : new Error(String(err)) });
      }
    };

    this.ws.onmessage = (ev) => {
      let msg: ReturnType<typeof this.opts.parseMessage>;
      try {
        msg = this.opts.parseMessage(ev);
      } catch (err) {
        this.emit('error', { error: err instanceof Error ? err : new Error(String(err)) });
        return;
      }
      if (msg !== null) this.emit('message', msg as OHLCVCandle | Tick | OrderBookDelta);
    };

    this.ws.onerror = () => {
      this.emit('error', { error: new Error('WebSocket connection error') });
    };

    this.ws.onclose = (ev) => {
      this._stopHeartbeat();
      this.emit('disconnect', { code: ev.code, reason: ev.reason });
      if (!this.manualClose) this._scheduleReconnect();
    };
  }

  disconnect(): void {
    this.manualClose = true;
    this._stopHeartbeat();
    this.ws?.close();
    this.ws = null;
  }

  private _scheduleReconnect(): void {
    const delay = this.retryDelay;
    this.retryDelay = Math.min(this.retryDelay * 1.5, 30_000);
    setTimeout(() => this._open(), delay);
  }

  private _startHeartbeat(): void {
    const interval = this.opts.heartbeatIntervalMs ?? 30_000;
    if (interval === 0) return;
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(this.opts.heartbeatMessage ?? 'ping');
      }
    }, interval);
  }

  private _stopHeartbeat(): void {
    clearInterval(this.heartbeatTimer);
  }

  get readyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}
