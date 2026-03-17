// demo/main.ts
import { FinanceChart } from '../src/index';
import { DARK_THEME, LIGHT_THEME } from '../src/types/theme';
import type { OHLCVCandle, Tick } from '../src/types/market';
import { MockWebSocket } from './mockWebSocket';

// ── Generate mock historical data ────────────────────────────────────────────

function generateCandles(count: number, startPrice = 45000, startTime?: number): OHLCVCandle[] {
  const now = startTime ?? Date.now();
  const candles: OHLCVCandle[] = [];
  let price = startPrice;
  for (let i = count - 1; i >= 0; i--) {
    const open = price;
    price *= 1 + (Math.random() - 0.48) * 0.01;
    const close = price;
    const high = Math.max(open, close) * (1 + Math.random() * 0.005);
    const low = Math.min(open, close) * (1 - Math.random() * 0.005);
    const volume = Math.random() * 100 + 10;
    candles.push({
      time: now - i * 60_000,
      open,
      high,
      low,
      close,
      volume,
    });
  }
  return candles;
}

// ── 1. Mount ────────────────────────────────────────────────────────────────

const container = document.getElementById('chart') as HTMLElement;

const chart = new FinanceChart({
  container,
  theme: DARK_THEME,
  layout: 'linear',
  maxCandles: 2000,
  enablePostProcessing: false,
  onRendererFallback: (reason) => console.info('[tfv] WebGL2 fallback:', reason),
});

await chart.init();

// ── 2. Historical data ───────────────────────────────────────────────────────

const candles = generateCandles(500);
chart.loadData(candles);

// ── 3. Streaming via mock WebSocket ──────────────────────────────────────────

chart.connectStream({
  url: 'mock://btcusdt@kline_1m',
  intervalMs: 60_000,
  parseMessage: (ev: MessageEvent): Tick | null => {
    try {
      const data = JSON.parse(ev.data as string);
      if (!data?.k) return null;
      return {
        time: data.k.t as number,
        price: parseFloat(data.k.c),
        volume: parseFloat(data.k.v),
        side: parseFloat(data.k.c) >= parseFloat(data.k.o) ? 'buy' : 'sell',
      };
    } catch {
      return null;
    }
  },
  WebSocketClass: (url: string) => new MockWebSocket(url),
});

// Start mock data injection after a short delay
const mockSocket = new MockWebSocket('mock://');
let mockPrice = candles.at(-1)!.close;
setInterval(() => {
  mockPrice *= 1 + (Math.random() - 0.49) * 0.003;
}, 250);

// ── 4. Events ────────────────────────────────────────────────────────────────

const statusEl = document.getElementById('status');
const fpsEl = document.getElementById('fps');

chart.on('candle:hover', (event) => {
  if (statusEl) {
    statusEl.textContent = event
      ? `Candle #${event.index} — close: ${event.candle.close.toFixed(2)}`
      : '';
  }
});

chart.on('render:frame', ({ fps }) => {
  if (fpsEl) fpsEl.textContent = `${fps.toFixed(0)} fps`;
});

// ── 5. Layout switching ──────────────────────────────────────────────────────

document.getElementById('btn-linear')?.addEventListener('click', () => chart.setLayout('linear'));
document.getElementById('btn-helix')?.addEventListener('click', () => chart.setLayout('helix'));
document.getElementById('btn-tunnel')?.addEventListener('click', () => chart.setLayout('tunnel'));
document.getElementById('btn-reset')?.addEventListener('click', () => chart.resetCamera());

// ── 6. Theme switching ───────────────────────────────────────────────────────

let isDark = true;
document.getElementById('btn-theme')?.addEventListener('click', () => {
  isDark = !isDark;
  chart.setTheme(isDark ? DARK_THEME : LIGHT_THEME);
  document.body.style.background = isDark ? '#0d0f14' : '#f5f5f5';
});

// ── 7. Exports ───────────────────────────────────────────────────────────────

function _download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5_000);
}

document.getElementById('btn-png')?.addEventListener('click', async () => {
  const blob = await chart.takeScreenshot();
  _download(blob, `chart-${Date.now()}.png`);
});

document.getElementById('btn-glb')?.addEventListener('click', async () => {
  const buf = await chart.exportGLB();
  _download(new Blob([buf], { type: 'model/gltf-binary' }), `chart-${Date.now()}.glb`);
});

document.getElementById('btn-csv')?.addEventListener('click', () => {
  _download(new Blob([chart.exportCSV()], { type: 'text/csv' }), `data-${Date.now()}.csv`);
});

// ── 8. Cleanup ───────────────────────────────────────────────────────────────

window.addEventListener('beforeunload', () => {
  chart.dispose();
});

void mockSocket;
