// demo/main.ts
import { FinanceChart } from '../src/index';
import { DARK_THEME, LIGHT_THEME } from '../src/types/theme';
import type { OHLCVCandle, Tick } from '../src/types/market';
import type { ProviderConfig } from '../src/providers/types';
import { ProviderError } from '../src/providers/types';
import { BinanceAdapter }  from '../src/providers/adapters/BinanceAdapter';
import { CoinbaseAdapter } from '../src/providers/adapters/CoinbaseAdapter';
import { KrakenAdapter }   from '../src/providers/adapters/KrakenAdapter';
import { BybitAdapter }    from '../src/providers/adapters/BybitAdapter';
import { MockWebSocket }   from './mockWebSocket';

// ── Mock data helpers ────────────────────────────────────────────────────────

function generateCandles(count: number, startPrice = 45000, startTime?: number): OHLCVCandle[] {
  const now = startTime ?? Date.now();
  const candles: OHLCVCandle[] = [];
  let price = startPrice;
  for (let i = count - 1; i >= 0; i--) {
    const open  = price;
    price      *= 1 + (Math.random() - 0.48) * 0.01;
    const close = price;
    const high  = Math.max(open, close) * (1 + Math.random() * 0.005);
    const low   = Math.min(open, close) * (1 - Math.random() * 0.005);
    const volume = Math.random() * 100 + 10;
    candles.push({ time: now - i * 60_000, open, high, low, close, volume });
  }
  return candles;
}

// ── 1. Mount chart ───────────────────────────────────────────────────────────

const container = document.getElementById('chart') as HTMLElement;

const chart = new FinanceChart({
  container,
  theme: DARK_THEME,
  layout: 'linear',
  maxCandles: 2000,
  enablePostProcessing: false,
  enableAddendum: true,
  onRendererFallback: (reason) => console.info('[tfv] WebGL2 fallback:', reason),
});

await chart.init();

// Register all live adapters (tree-shakeable — only the ones imported above)
chart.registerProviders(
  new BinanceAdapter(),
  new CoinbaseAdapter(),
  new KrakenAdapter(),
  new BybitAdapter(),
);

// ── 2. Connection state ──────────────────────────────────────────────────────

const providerBadge  = document.getElementById('provider-badge')  as HTMLElement;
const providerSelect = document.getElementById('provider-select')  as HTMLSelectElement;
const symbolInput    = document.getElementById('symbol-input')     as HTMLInputElement;
const connectBtn     = document.getElementById('btn-connect')      as HTMLButtonElement;
const statusEl       = document.getElementById('status')           as HTMLElement;
const fpsEl          = document.getElementById('fps')              as HTMLElement;

let usingMock = false;
let mockIntervalId: ReturnType<typeof setInterval> | null = null;

function setBadge(text: string, color: string) {
  providerBadge.textContent = text;
  providerBadge.style.background = color;
}

// ── 3. Mock streaming (offline / default) ───────────────────────────────────

function startMock() {
  usingMock = true;
  setBadge('● MOCK', '#555');

  const candles = generateCandles(500);
  chart.loadData(candles);

  chart.connectStream({
    url: 'mock://btcusdt@kline_1m',
    intervalMs: 60_000,
    parseMessage: (ev: MessageEvent): Tick | null => {
      try {
        const data = JSON.parse(ev.data as string);
        if (!data?.k) return null;
        return {
          time:   data.k.t as number,
          price:  parseFloat(data.k.c),
          volume: parseFloat(data.k.v),
          side:   parseFloat(data.k.c) >= parseFloat(data.k.o) ? 'buy' : 'sell',
        };
      } catch { return null; }
    },
    WebSocketClass: () => new MockWebSocket('mock://'),
  });

  // Drive mock price ticks
  let mockPrice = candles.at(-1)!.close;
  mockIntervalId = setInterval(() => {
    mockPrice *= 1 + (Math.random() - 0.49) * 0.003;
  }, 250);
}

function stopMock() {
  if (!usingMock) return;
  usingMock = false;
  if (mockIntervalId !== null) {
    clearInterval(mockIntervalId);
    mockIntervalId = null;
  }
  chart.disconnectStream();
}

// ── 4. Live provider connection ──────────────────────────────────────────────

async function connectLive(exchange: string, symbol: string) {
  stopMock();
  chart.disconnectProvider(); // clean up previous live connection if any

  setBadge('● CONNECTING…', '#aa8800');
  connectBtn.disabled = true;

  const config: ProviderConfig = {
    symbol,
    interval: '1m',
    exchanges: exchange === 'auto' ? undefined : [exchange],
    historicalLimit: 500,
    failoverThreshold: 3,
    cacheTtlMs: 30_000,
    onProviderChange: (ex) => {
      console.info(`[tfv] Provider changed → ${ex}`);
      setBadge(`● ${ex.toUpperCase()}`, '#2a7a4f');
    },
    onError: (err) => {
      console.warn('[tfv] Provider error:', err.code, err.message);
      if (err.code !== 'PARSE_ERROR') {
        setBadge(`⚠ ${err.code}`, '#882222');
      }
    },
  };

  try {
    await chart.connectProvider(config);
    const displayExchange = exchange === 'auto' ? 'LIVE' : exchange.toUpperCase();
    setBadge(`● ${displayExchange}`, '#2a7a4f');
    if (statusEl) statusEl.textContent = `${displayExchange} · ${symbol} · 1m`;
  } catch (err) {
    const code = err instanceof ProviderError ? err.code : 'UNKNOWN';
    const msg  = err instanceof Error ? err.message : String(err);
    setBadge(`✗ ${code}`, '#882222');
    console.error('[tfv] connectProvider failed:', msg);
    // Fall back to mock on failure
    startMock();
    if (statusEl) statusEl.textContent = `Live failed (${code}) — using mock`;
  } finally {
    connectBtn.disabled = false;
  }
}

// ── 5. Initial load — mock by default ───────────────────────────────────────

startMock();

// ── 6. HUD: connect button ───────────────────────────────────────────────────

connectBtn.addEventListener('click', () => {
  const exchange = providerSelect.value;
  const symbol   = symbolInput.value.trim() || 'BTC/USDT';

  if (exchange === 'mock') {
    chart.disconnectProvider();
    startMock();
    if (statusEl) statusEl.textContent = 'Mock data';
  } else {
    void connectLive(exchange, symbol);
  }
});

// ── 7. Events ────────────────────────────────────────────────────────────────

chart.on('candle:hover', (event) => {
  if (!usingMock && statusEl) return; // let connectLive() own the status line
  if (statusEl) {
    statusEl.textContent = event
      ? `Candle #${event.index} — close: ${event.candle.close.toFixed(2)}`
      : '';
  }
});

chart.on('render:frame', ({ fps }) => {
  if (fpsEl) fpsEl.textContent = `${fps.toFixed(0)} fps`;
});

// ── 8. Layout / theme controls ───────────────────────────────────────────────

document.getElementById('btn-linear')?.addEventListener('click', () => chart.setLayout('linear'));
document.getElementById('btn-helix')?.addEventListener('click',  () => chart.setLayout('helix'));
document.getElementById('btn-tunnel')?.addEventListener('click', () => chart.setLayout('tunnel'));
document.getElementById('btn-reset')?.addEventListener('click',  () => chart.resetCamera());

let isDark = true;
document.getElementById('btn-theme')?.addEventListener('click', () => {
  isDark = !isDark;
  chart.setTheme(isDark ? DARK_THEME : LIGHT_THEME);
  document.body.style.background = isDark ? '#0d0f14' : '#f5f5f5';
});

// ── 9. Exports ───────────────────────────────────────────────────────────────

function _download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5_000);
}

document.getElementById('btn-png')?.addEventListener('click', async () => {
  _download(await chart.takeScreenshot(), `chart-${Date.now()}.png`);
});
document.getElementById('btn-glb')?.addEventListener('click', async () => {
  _download(new Blob([await chart.exportGLB()], { type: 'model/gltf-binary' }), `chart-${Date.now()}.glb`);
});
document.getElementById('btn-csv')?.addEventListener('click', () => {
  _download(new Blob([chart.exportCSV()], { type: 'text/csv' }), `data-${Date.now()}.csv`);
});

// ── 10. Cleanup ───────────────────────────────────────────────────────────────

window.addEventListener('beforeunload', () => {
  chart.dispose();
});
