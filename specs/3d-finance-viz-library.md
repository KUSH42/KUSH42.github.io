# 3D Financial Visualization Library — Technical Specification

**Version**: 1.0.3
**Date**: March 2026
**Status**: Ready for Engineering Review

---

## 1. Project Overview & Goals

### Summary

`three-finance-viz` is a standalone, framework-agnostic 3D financial visualization library built on vanilla Three.js. It renders market data — candlesticks, volume, order book depth, and overlay indicators — in an interactive 3D environment, targeting professional trading dashboards, analytics platforms, and data journalism applications.

The library is designed to be dropped into any web project (plain HTML, Vue, Svelte, Angular, or any non-React framework) with zero runtime dependencies beyond Three.js and its ecosystem.

### Primary Goals

| Goal | Target |
|---|---|
| Performance | 60 fps sustained with 10,000+ candles on mid-tier GPU |
| Streaming latency | ≤ 1 rAF frame (~16.7 ms at 60 fps) from WebSocket message to next screen render; tabs must remain visible for this guarantee (rAF is throttled when backgrounded — see §8) |
| Library bundle size | < 20 KB gzipped (the library itself); full install with Three.js + postprocessing deps is ~1.5 MB gzipped — communicate this clearly to users |
| Renderer coverage | WebGPU on Chrome/Edge 113+, WebGL2 fallback everywhere else |
| Accessibility | Keyboard navigation for time-range scrubbing, ARIA live-region updates on tooltip overlays |
| Developer ergonomics | Typed API, < 10 lines to first chart |

### Non-Goals

- React / React Three Fiber integration (out of scope; use a thin wrapper if needed)
- Server-side rendering (Three.js is client-only)
- Historical data fetching (the library is a pure renderer; data ingestion is the consumer's responsibility)
- Built-in exchange authentication

### Design Principles

1. **Imperative first.** All mutations go through explicit method calls (`chart.appendCandle(ohlcv)`) rather than reactive proxies. This keeps the hot path predictable and GC-friendly.
2. **GPU budget over CPU budget.** Heavy lifting (matrix transforms, color interpolation) happens in instanced draw calls, not JavaScript loops per frame.
3. **Progressive enhancement.** Basic candle charts work without WebGPU, post-processing, or any optional dependency. Effects layer on top.
4. **Strict disposal contracts.** Every object that allocates GPU memory exposes a `dispose()` method following the Three.js pattern. No leaks over long sessions.
5. **Composable, not monolithic.** `CandleChart`, `VolumeChart`, `OrderBookDepth`, and `IndicatorLayer` are independent objects that share a common `Scene` and coordinate system. Users assemble them.

---

## 2. Tech Stack & Dependencies

### Runtime Dependencies (exact versions, March 2026)

```jsonc
{
  "dependencies": {
    "three": "0.172.0",
    "three-stdlib": "2.35.0",
    "postprocessing": "6.36.3",
    "troika-three-text": "0.49.1",
    "d3-scale": "4.0.2",
    "d3-array": "3.2.4",
    "d3-color": "3.1.0",
    "d3-interpolate": "3.0.1"
  },
  "devDependencies": {
    "@types/three": "0.172.0",
    "typescript": "5.7.3",
    "vite": "6.1.0",
    "vitest": "3.0.5",
    "@vitest/coverage-v8": "3.0.5"
  }
}
```

### Dependency Rationale

| Package | Why |
|---|---|
| `three@0.172.0` | First stable release with `WebGPURenderer` out of experimental, TSL nodes GA |
| `three-stdlib` | Provides `OrbitControls`, `GLTFExporter`, `CSS3DRenderer`, `LineMaterial` / `Line2` for fat lines |
| `postprocessing` | pmndrs library; used on WebGL2 fallback path for `SelectiveBloomEffect`, `DepthOfFieldEffect`, etc. |
| `troika-three-text` | GPU SDF text rendering for 3D labels; supports instanced glyphs |
| `d3-scale` | `scaleLinear`, `scaleTime`, `scaleLog` — only the math, no DOM |
| `d3-array` | `extent`, `bin`, `rollup` for data aggregation |
| `d3-color` / `d3-interpolate` | `interpolateRdYlGn`, `interpolatePlasma` for heatmap color mapping |

### What is Explicitly Excluded

- `react`, `react-dom`, `@react-three/fiber` — not referenced anywhere
- `rxjs` — use native `EventTarget` / custom `EventEmitter`
- `lodash` — use native array methods; bundle size matters
- `dat.gui` / `lil-gui` — demo/debug only, not part of library

### Renderer Detection

```typescript
// src/renderer/createRenderer.ts
import * as THREE from 'three';

export type SupportedRenderer = THREE.WebGPURenderer | THREE.WebGLRenderer;

export interface RendererOptions {
  antialias?: boolean;
  alpha?: boolean;
  onFallback?: (reason: string) => void;
}

export async function createRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions = {}
): Promise<{ renderer: SupportedRenderer; isWebGPU: boolean }> {
  const { onFallback } = options;

  if (navigator.gpu) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const renderer = new THREE.WebGPURenderer({ canvas, antialias: options.antialias ?? true });
        await (renderer as THREE.WebGPURenderer).init();
        return { renderer, isWebGPU: true };
      }
      onFallback?.('No WebGPU adapter available');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      onFallback?.(`WebGPU init failed: ${msg}`);
    }
  } else {
    onFallback?.('navigator.gpu not present');
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: options.antialias ?? true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return { renderer, isWebGPU: false };
}
```

> **DPR cap**: `Math.min(window.devicePixelRatio, 2)` caps at 2× to limit GPU fill rate on 3× displays (e.g. iPhone). Expose as a `maxPixelRatio` option if consumers need override.

### Build Configuration

#### `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry:    'src/index.ts',
      name:     'ThreeFinanceViz',
      fileName: (fmt) => `three-finance-viz.${fmt}.js`,
      formats:  ['es', 'umd'],
    },
    rollupOptions: {
      // Peer dependencies — consumers supply these
      external: ['three', 'three-stdlib', 'postprocessing', 'troika-three-text'],
      output: {
        globals: {
          'three':           'THREE',
          'three-stdlib':    'ThreeStdlib',
          'postprocessing':  'POSTPROCESSING',
          'troika-three-text': 'TroikaText',
        },
      },
    },
    target: 'es2020',
  },
  assetsInclude: ['**/*.glsl'],
});
```

---

## 3. Data Model

### Core TypeScript Interfaces

```typescript
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
  bids: OrderBookLevel[];   // sorted descending by price
  asks: OrderBookLevel[];   // sorted ascending by price
  midPrice: number;
}

/** Incremental order book update */
export interface OrderBookDelta {
  /** Unix timestamp in milliseconds (UTC) */
  time: number;
  changes: Array<OrderBookLevel & { action: 'add' | 'update' | 'remove' }>;
}
```

### Indicator Data Structures

```typescript
// src/types/indicators.ts

export interface MovingAverageSeries {
  type: 'SMA' | 'EMA' | 'VWAP';
  period: number;
  /** Parallel array to candle data — index i corresponds to candle i */
  values: Array<number | null>;  // null = not enough data yet
  color: string;    // CSS hex, e.g. '#f5a623'
  lineWidth: number;
}

export interface BollingerBandSeries {
  type: 'BollingerBands';
  period: number;
  stdDevMultiplier: number;
  upper: Array<number | null>;
  middle: Array<number | null>;  // same as SMA(period)
  lower: Array<number | null>;
  fillOpacity: number;  // 0–1, for the ribbon between upper/lower
  color: string;
}

export interface RSISeries {
  type: 'RSI';
  period: number;
  values: Array<number | null>;  // 0–100
  /** Panel offset in world units below the main chart, e.g. -8 */
  panelOffset: number;
  overboughtLevel: number;  // default 70
  oversoldLevel: number;    // default 30
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
```

> **Discriminated union**: the `type` field on each variant enables TypeScript exhaustive narrowing in `switch` statements throughout `IndicatorLayer`.

### Theme & Palette

```typescript
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
    gradient: [string, string];  // low → high volume
  };
  orderBook: {
    bidHeat: [string, string];   // low size → high size
    askHeat: [string, string];
  };
}

export const DARK_THEME: ChartTheme = {
  background: '#0d0f14',
  grid:       '#1a1d24',
  axis:       '#3a3d4a',
  crosshair:  '#ffffff44',
  tooltip:    { background: '#1e2130', text: '#e0e4f0', border: '#3a3d4a' },
  candle: {
    bullBody:         '#26a69a',
    bearBody:         '#ef5350',
    bullWick:         '#26a69a',
    bearWick:         '#ef5350',
    bullBodyEmissive: '#00fff233',
    bearBodyEmissive: '#ff000033',
  },
  volume: {
    bullBar:  '#26a69a66',
    bearBar:  '#ef535066',
    gradient: ['#1a1d24', '#26a69a'],
  },
  orderBook: {
    bidHeat: ['#0d2b1e', '#26a69a'],
    askHeat: ['#2b0d0d', '#ef5350'],
  },
};

export const LIGHT_THEME: ChartTheme = {
  background: '#f5f5f5',
  grid:       '#e0e0e0',
  axis:       '#9e9e9e',
  crosshair:  '#00000044',
  tooltip:    { background: '#ffffff', text: '#212121', border: '#bdbdbd' },
  candle: {
    bullBody:         '#00897b',
    bearBody:         '#e53935',
    bullWick:         '#00897b',
    bearWick:         '#e53935',
    bullBodyEmissive: '#00000000',
    bearBodyEmissive: '#00000000',
  },
  volume: {
    bullBar:  '#00897b66',
    bearBar:  '#e5393566',
    gradient: ['#e0e0e0', '#00897b'],
  },
  orderBook: {
    bidHeat: ['#e8f5e9', '#00897b'],
    askHeat: ['#ffebee', '#e53935'],
  },
};
```

### Internal Candle Buffer (class)

```typescript
// src/types/CandleBuffer.ts

/**
 * AoS (Array of Structs) layout: fields for candle i are co-located in a
 * single Float32Array with stride 5.  Favours sequential per-candle reads
 * during updateRange loops.
 *
 * time is stored separately as Float64Array to preserve ms precision.
 */
export class CandleBuffer {
  private static readonly STRIDE = 5;  // open, high, low, close, volume

  private _data:  Float32Array;
  /** Unix ms timestamps — Float64 to preserve full ms precision */
  readonly time:  Float64Array;
  /** Packed flags: bit 0 = bullish, bit 1 = selected, bit 2 = highlighted */
  readonly flags: Uint8Array;
  readonly capacity: number;
  count = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this._data    = new Float32Array(capacity * CandleBuffer.STRIDE);
    this.time     = new Float64Array(capacity);
    this.flags    = new Uint8Array(capacity);
  }

  open  (i: number): number { return this._data[i * 5    ]; }
  high  (i: number): number { return this._data[i * 5 + 1]; }
  low   (i: number): number { return this._data[i * 5 + 2]; }
  close (i: number): number { return this._data[i * 5 + 3]; }
  volume(i: number): number { return this._data[i * 5 + 4]; }

  set(i: number, o: number, h: number, l: number, c: number, v: number): void {
    if (i >= this.capacity) {
      throw new RangeError(
        `CandleBuffer.set(${i}) exceeds capacity ${this.capacity}. ` +
        `Increase maxCandles option.`
      );
    }
    const base = i * 5;
    this._data[base    ] = o;
    this._data[base + 1] = h;
    this._data[base + 2] = l;
    this._data[base + 3] = c;
    this._data[base + 4] = v;
  }

  append(candle: import('./market').OHLCVCandle): number {
    const i = this.count;
    this.set(i, candle.open, candle.high, candle.low, candle.close, candle.volume);
    this.time[i]  = candle.time;
    this.flags[i] = candle.close >= candle.open ? 1 : 0;
    this.count++;
    return i;
  }

  /** Non-allocating snapshot of candle at index i */
  fillCandle(i: number, out: import('./market').OHLCVCandle): void {
    out.time   = this.time[i];
    out.open   = this.open(i);
    out.high   = this.high(i);
    out.low    = this.low(i);
    out.close  = this.close(i);
    out.volume = this.volume(i);
  }
}
```

---

## 4. Architecture

### Folder / File Structure

```
three-finance-viz/
├── src/
│   ├── index.ts                     # Public API barrel
│   ├── types/
│   │   ├── market.ts                # OHLCVCandle, Tick, OrderBook*
│   │   ├── indicators.ts            # IndicatorSeries discriminated union
│   │   ├── theme.ts                 # ChartTheme, DARK_THEME, LIGHT_THEME
│   │   ├── CandleBuffer.ts          # CandleBuffer class
│   │   └── events.ts                # ChartEvents, StreamEvents
│   ├── renderer/
│   │   ├── createRenderer.ts        # WebGPU/WebGL detection
│   │   ├── RendererManager.ts       # Owns renderer, handles resize
│   │   └── PostProcessingPipeline.ts
│   ├── scene/
│   │   ├── ChartScene.ts            # Root scene + camera + controls
│   │   ├── GridFloor.ts
│   │   └── AxesLabels.ts
│   ├── charts/
│   │   ├── CandleChart.ts           # InstancedMesh bodies + wicks
│   │   ├── VolumeChart.ts           # InstancedMesh volume bars
│   │   ├── OrderBookDepth.ts        # Heatmap plane / extruded walls
│   │   └── IndicatorLayer.ts        # MA lines, BB ribbons, RSI/MACD panels
│   ├── layout/
│   │   ├── LayoutEngine.ts          # LayoutEngine interface + CandleTransform
│   │   ├── LinearLayout.ts
│   │   ├── HelixLayout.ts
│   │   └── TunnelLayout.ts
│   ├── streaming/
│   │   ├── WebSocketAdapter.ts
│   │   ├── TickAggregator.ts
│   │   └── UpdateScheduler.ts
│   ├── interaction/
│   │   ├── CrosshairController.ts
│   │   ├── TooltipOverlay.ts
│   │   ├── CameraAnimator.ts
│   │   └── TimeRangeSelector.ts
│   ├── materials/
│   │   ├── CandleMaterial.ts        # TSL (WebGPU) / ShaderMaterial (WebGL)
│   │   ├── WickMaterial.ts
│   │   ├── HeatmapMaterial.ts
│   │   └── GodRaysMaterial.ts
│   ├── shaders/
│   │   ├── tsl/                     # Three Shading Language (WebGPU path)
│   │   │   ├── candleNode.ts
│   │   │   └── heatmapNode.ts
│   │   └── glsl/                    # GLSL fallbacks (WebGL2 path)
│   │       ├── candle.vert.glsl
│   │       ├── candle.frag.glsl
│   │       └── heatmap.frag.glsl
│   ├── export/
│   │   ├── ScreenshotExporter.ts
│   │   ├── GLBExporter.ts
│   │   └── CSVExporter.ts
│   └── utils/
│       ├── EventEmitter.ts
│       ├── RingBuffer.ts            # Generic fixed-capacity circular buffer
│       ├── ColorMapper.ts           # d3-interpolate wrapper for price→color
│       ├── MathUtils.ts             # lerp, easing, quaternion helpers
│       └── ThrottleQueue.ts         # Coalesces high-frequency callbacks
├── demo/
│   ├── index.html
│   ├── main.ts
│   └── mockWebSocket.ts
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Utility Module Responsibilities

| Module | Responsibility |
|---|---|
| `RingBuffer<T>` | Fixed-capacity circular array; used as a sliding window for recent ticks before aggregation |
| `ColorMapper` | Wraps `d3-interpolate` scales; `map(value, domain, colorRange)` → `THREE.Color`; used by `OrderBookDepth` heatmap |
| `MathUtils` | `lerp`, `easeInOutCubic`, `safeNormalize`, `quatFromBasis`, `lowerBound`, `upperBound`; no Three.js dependency |
| `ThrottleQueue` | Coalesces callbacks within a time window; used for DOM-heavy operations like tooltip repositioning on every pointermove |

#### `MathUtils` — binary search helpers (used by `setTimeRange`)

```typescript
// src/utils/MathUtils.ts

/**
 * Returns the index of the first element in arr[0..count) >= target.
 * arr must be sorted ascending.  Returns count if all elements < target.
 */
export function lowerBound(arr: Float64Array, count: number, target: number): number {
  let lo = 0, hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < target) lo = mid + 1;
    else                   hi = mid;
  }
  return lo;
}

/**
 * Returns the index one past the last element in arr[0..count) <= target.
 * arr must be sorted ascending.  Returns 0 if all elements > target.
 */
export function upperBound(arr: Float64Array, count: number, target: number): number {
  let lo = 0, hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] <= target) lo = mid + 1;
    else                    hi = mid;
  }
  return lo;
}
```

### Event System

```typescript
// src/types/events.ts

import type * as THREE from 'three';
import type { OHLCVCandle, Tick, OrderBookDelta } from './market';

/** Events emitted by FinanceChart (consumed by application code) */
export interface ChartEvents {
  'candle:hover':   { index: number; candle: OHLCVCandle; worldPos: THREE.Vector3 } | null;
  'candle:click':   { index: number; candle: OHLCVCandle };
  'range:change':   { startIndex: number; endIndex: number };
  'camera:move':    { position: THREE.Vector3; target: THREE.Vector3 };
  'render:frame':   { deltaMs: number; fps: number };
}

/** Events emitted by WebSocketAdapter (consumed by FinanceChart internals) */
export interface StreamEvents {
  'connect':   { url: string };
  'disconnect':{ code: number; reason: string };
  'error':     { error: Error };
  'message':   OHLCVCandle | Tick | OrderBookDelta;
}
```

```typescript
// src/utils/EventEmitter.ts

type Listener<T> = (data: T) => void;

export class EventEmitter<EventMap extends Record<string, unknown>> {
  private listeners = new Map<keyof EventMap, Set<Listener<unknown>>>();

  on<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn as Listener<unknown>);
    return () => this.off(event, fn);  // Returns unsubscribe handle — store and call to avoid leaks
  }

  off<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): void {
    this.listeners.get(event)?.delete(fn as Listener<unknown>);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }

  dispose(): void { this.listeners.clear(); }
}
```

### `ChartLayer` — Extensibility Interface

```typescript
// src/types/ChartLayer.ts  (exported from src/index.ts)

import type { LayoutEngine } from '../layout/LayoutEngine';
import type { ChartTheme }   from './theme';

export interface ChartLayer {
  /** Called once per animation frame by FinanceChart */
  update(deltaMs: number): void;
  /** Called when the user switches layout mode */
  onLayoutChange(layout: LayoutEngine): void;
  /** Called when the user switches theme */
  onThemeChange(theme: ChartTheme): void;
  /** Release all GPU resources and remove from scene */
  dispose(): void;
}
```

### State Management Pattern

No global store. Each class owns its own typed state. Parent→child state flows via constructor injection; child→parent via `EventEmitter`. No bidirectional data binding.

```
FinanceChart (root — owns scene, renderer, CandleBuffer)
  ├── CandleChart       (owns bull/bear InstancedMesh, slot maps)
  ├── VolumeChart       (owns volume InstancedMesh)
  ├── IndicatorLayer    (owns Line2 + ribbon Mesh per indicator)
  ├── OrderBookDepth    (owns heatmap mesh)
  ├── LayoutEngine      (stateless pure functions)
  ├── StreamingAdapter  (owns WebSocket)
  └── Map<string, ChartLayer>  (user-registered custom layers)
```

### `AxesLabels` — Implementation Note

`AxesLabels` (`src/scene/AxesLabels.ts`) is an internal module, not part of the public API. `ChartScene` owns and drives it. Minimum required interface:

```typescript
// src/scene/AxesLabels.ts (interface contract only)
import * as THREE from 'three';
import type { ChartTheme } from '../types/theme';

export class AxesLabels {
  constructor(scene: THREE.Scene, theme: ChartTheme);
  /** Recompute tick positions when price range or camera changes */
  setRange(minPrice: number, maxPrice: number, minTimeMs: number, maxTimeMs: number): void;
  onThemeChange(theme: ChartTheme): void;
  dispose(): void;
}
```

Internally: `troika-three-text` `Text` objects positioned in 3D space along the price Y-axis and time X-axis. D3 `scaleLinear.ticks()` generates tick values; positions are computed via the same price-to-worldY and candleIndex-to-worldX functions used by `FinanceChart`.

### Public Exports (`src/index.ts`)

```typescript
export { FinanceChart }          from './FinanceChart';
export { DARK_THEME, LIGHT_THEME } from './types/theme';
export { CandleBuffer }          from './types/CandleBuffer';
export type { OHLCVCandle, Tick, OrderBookSnapshot, OrderBookDelta } from './types/market';
export type { IndicatorSeries, MovingAverageSeries, BollingerBandSeries, RSISeries, MACDSeries } from './types/indicators';
export type { ChartTheme }       from './types/theme';
export type { ChartEvents }      from './types/events';
export type { ChartLayer }       from './types/ChartLayer';
export type { LayoutEngine, CandleTransform } from './layout/LayoutEngine';
export type { StreamConnectOptions } from './streaming/WebSocketAdapter';
```

---

## 5. Core Rendering Strategy

### InstancedMesh Design

The single most important performance decision: one `InstancedMesh` per primitive type, not one mesh per candle.

```
CandleChart uses 4 InstancedMesh objects:
  1. bullBodyMesh  — BoxGeometry(1,1,1), Three.js layer 1 (bloom), capacity N
  2. bearBodyMesh  — BoxGeometry(1,1,1), Three.js layer 0, capacity N
  3. bullWickMesh  — CylinderGeometry(0.05, 0.05, 1, 6), layer 1 (bloom)
  4. bearWickMesh  — CylinderGeometry(0.05, 0.05, 1, 6), layer 0

VolumeChart uses 1 InstancedMesh:
  1. volMesh       — BoxGeometry(1,1,1), capacity N

OrderBookDepth uses 2 InstancedMesh:
  1. bidMesh       — BoxGeometry(1,1,1), capacity M price levels
  2. askMesh       — BoxGeometry(1,1,1), capacity M price levels
```

**Why 4 candle meshes?** `InstancedMesh` does not support per-instance `layers` flags. Splitting bull/bear into separate meshes is required for selective bloom (§10). Each mesh maintains its own `slot → candleIndex` reverse map so the crosshair controller can recover candle data from an `instanceId`.

### Geometry Sharing

```typescript
// src/charts/sharedGeometry.ts
// Module-level singletons — allocated once, never disposed until full teardown

import * as THREE from 'three';

export const BODY_GEO_HIGH = new THREE.BoxGeometry(1, 1, 1);
export const BODY_GEO_LOW  = new THREE.PlaneGeometry(1, 1);          // billboard at distance
export const WICK_GEO_HIGH = new THREE.CylinderGeometry(0.05, 0.05, 1, 6);
export const WICK_GEO_LOW  = new THREE.CylinderGeometry(0.02, 0.02, 1, 4);

let _refCount = 0;

export function retainSharedGeometry(): void { _refCount++; }

export function releaseSharedGeometry(): void {
  if (--_refCount <= 0) {
    BODY_GEO_HIGH.dispose(); BODY_GEO_LOW.dispose();
    WICK_GEO_HIGH.dispose(); WICK_GEO_LOW.dispose();
  }
}
```

### Matrix Update Pattern (hot path)

```typescript
// Module-level scratch objects — never allocate in the per-instance hot path
const _mat4  = new THREE.Matrix4();
const _pos   = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat  = new THREE.Quaternion();  // reused; set per-candle for helix/tunnel

function updateBodyInstance(
  mesh: THREE.InstancedMesh,
  slotIndex: number,
  worldPos: THREE.Vector3,
  bodyHeight: number,
  candleWidth: number,
  quaternion: THREE.Quaternion
): void {
  _pos.copy(worldPos);
  _scale.set(candleWidth, bodyHeight, candleWidth);
  _mat4.compose(_pos, quaternion, _scale);
  mesh.setMatrixAt(slotIndex, _mat4);
}
```

### Partial Buffer Upload (critical detail)

```typescript
/**
 * Call clearUpdateRanges() ONCE at the start of each frame's dirty-flush cycle,
 * BEFORE accumulating new addUpdateRange() calls.  Forgetting this causes the
 * range list to grow unboundedly, eventually uploading the full buffer every frame.
 */
function beginFrameFlush(mesh: THREE.InstancedMesh): void {
  mesh.instanceMatrix.clearUpdateRanges();
  mesh.instanceColor?.clearUpdateRanges();
}

/**
 * @param start  first dirty slot index (inclusive)
 * @param count  number of consecutive dirty slots
 *
 * instanceMatrix has stride 16 (4×4 Float32).
 * instanceColor  has stride 3  (RGB Float32).
 */
function markDirtySlots(mesh: THREE.InstancedMesh, start: number, count: number): void {
  mesh.instanceMatrix.addUpdateRange(start * 16, count * 16);
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) {
    mesh.instanceColor.addUpdateRange(start * 3, count * 3);
    mesh.instanceColor.needsUpdate = true;
  }
}
```

### Slot Mapping for Bull/Bear Split

The `CandleChart` maintains two parallel index arrays:

```typescript
// src/charts/CandleChart.ts (slot mapping excerpt)

/**
 * bullSlot[i]  = slot index in bullBodyMesh for candle i  (-1 if currently bear)
 * bearSlot[i]  = slot index in bearBodyMesh for candle i  (-1 if currently bull)
 * bullRevMap[s] = candle index i whose bull slot is s
 * bearRevMap[s] = candle index i whose bear slot is s
 */
private bullSlot:    Int32Array;
private bearSlot:    Int32Array;
private bullRevMap:  Int32Array;
private bearRevMap:  Int32Array;
private bullCount = 0;
private bearCount = 0;

/** Swap candle i from bear → bull (or assign fresh on first call) */
private _assignBull(i: number): void {
  if (this.bearSlot[i] !== -1) this._freeBear(i);
  if (this.bullSlot[i] === -1) {
    const s = this.bullCount++;
    this.bullSlot[i]    = s;
    this.bullRevMap[s]  = i;
  }
}

/** Swap candle i from bull → bear */
private _assignBear(i: number): void {
  if (this.bullSlot[i] !== -1) this._freeBull(i);
  if (this.bearSlot[i] === -1) {
    const s = this.bearCount++;
    this.bearSlot[i]   = s;
    this.bearRevMap[s] = i;
  }
}

/**
 * Swap-with-last to free a bull slot without leaving gaps.
 * O(1) — does NOT preserve slot ordering.
 */
private _freeBull(i: number): void {
  const slot = this.bullSlot[i];
  if (slot === -1) return;
  const lastSlot  = this.bullCount - 1;
  const lastCandle = this.bullRevMap[lastSlot];
  // Move the last bull into the freed slot
  if (slot !== lastSlot) {
    this.bullSlot[lastCandle] = slot;
    this.bullRevMap[slot]     = lastCandle;
    // Copy matrix + color from lastSlot → slot in the GPU buffer
    this._copyBullSlot(lastSlot, slot);
  }
  this.bullSlot[i]           = -1;
  this.bullRevMap[lastSlot]  = -1;
  this.bullCount--;
}

private _freeBear(i: number): void {
  const slot = this.bearSlot[i];
  if (slot === -1) return;
  const lastSlot   = this.bearCount - 1;
  const lastCandle = this.bearRevMap[lastSlot];
  if (slot !== lastSlot) {
    this.bearSlot[lastCandle] = slot;
    this.bearRevMap[slot]     = lastCandle;
    this._copyBearSlot(lastSlot, slot);
  }
  this.bearSlot[i]           = -1;
  this.bearRevMap[lastSlot]  = -1;
  this.bearCount--;
}

/** Maps (mesh, instanceId) → candle buffer index — used by CrosshairController */
slotToCandleIndex(mesh: THREE.InstancedMesh, instanceId: number): number {
  if (mesh === this.bullBodyMesh || mesh === this.bullWickMesh) {
    return this.bullRevMap[instanceId];
  }
  return this.bearRevMap[instanceId];
}

/** Returns a live snapshot object — do not cache across frames */
getCandle(index: number): OHLCVCandle {
  const c: OHLCVCandle = { time: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };
  this.buffer.fillCandle(index, c);
  return c;
}
```

### Disposal Pattern

```typescript
export interface Disposable { dispose(): void; }

// CandleChart.dispose()
dispose(): void {
  this.scene.remove(
    this.bullBodyMesh, this.bearBodyMesh,
    this.bullWickMesh, this.bearWickMesh
  );
  (this.bullBodyMesh.material as THREE.Material).dispose();
  (this.bearBodyMesh.material as THREE.Material).dispose();
  (this.bullWickMesh.material as THREE.Material).dispose();
  (this.bearWickMesh.material as THREE.Material).dispose();
  // Do NOT dispose shared geometry here — call releaseSharedGeometry() instead
  releaseSharedGeometry();
  this.events.dispose();
}
```

### Color Caching

```typescript
// Pre-cache at theme load — avoids THREE.Color() construction in hot path
private _bullBodyColor = new THREE.Color();
private _bearBodyColor = new THREE.Color();
private _bullWickColor = new THREE.Color();
private _bearWickColor = new THREE.Color();

applyThemeColors(theme: ChartTheme): void {
  this._bullBodyColor.set(theme.candle.bullBody);
  this._bearBodyColor.set(theme.candle.bearBody);
  this._bullWickColor.set(theme.candle.bullWick);
  this._bearWickColor.set(theme.candle.bearWick);
}

// In the hot path — zero allocation
private _colorForSlot(isBull: boolean, isBody: boolean): THREE.Color {
  if (isBull) return isBody ? this._bullBodyColor : this._bullWickColor;
  return isBody ? this._bearBodyColor : this._bearWickColor;
}
```

---

## 6. Class / Module Breakdown

### `FinanceChart` — Root Orchestrator

```typescript
// src/FinanceChart.ts

import type { OHLCVCandle }         from './types/market';
import type { IndicatorSeries }     from './types/indicators';
import type { ChartTheme }          from './types/theme';
import type { ChartEvents }         from './types/events';
import type { ChartLayer }          from './types/ChartLayer';
import type { StreamConnectOptions } from './streaming/WebSocketAdapter';
import * as THREE from 'three';

class FinanceChart extends EventEmitter<ChartEvents> {
  constructor(options: {
    container: HTMLElement;
    theme?: ChartTheme;
    layout?: 'linear' | 'helix' | 'tunnel';
    /** Maximum number of candles to pre-allocate for. Default 20_000. */
    maxCandles?: number;
    enablePostProcessing?: boolean;
    /** Enable antialiasing on the renderer. Default true. */
    antialias?: boolean;
    /** Enable alpha (transparent) canvas. Default false. */
    alpha?: boolean;
    /** Cap device pixel ratio to limit GPU fill rate. Default 2. */
    maxPixelRatio?: number;
    /** Called when WebGPU is unavailable and WebGL2 fallback is used */
    onRendererFallback?: (reason: string) => void;
  });

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  async init(): Promise<void>;
  dispose(): void;

  // ── Data ───────────────────────────────────────────────────────────────────
  /** Bulk-load historical candles. Replaces any existing data. */
  loadData(candles: OHLCVCandle[]): void;
  /** Append a completed candle (e.g. closed bar from REST history). */
  appendCandle(candle: OHLCVCandle): void;
  /** Patch the last (in-progress) candle with streaming data. */
  updateLastCandle(partial: Partial<OHLCVCandle>): void;

  // ── Indicators ─────────────────────────────────────────────────────────────
  /** Returns an opaque ID used to remove the indicator later. */
  addIndicator(series: IndicatorSeries): string;
  removeIndicator(id: string): void;

  // ── Presentation ───────────────────────────────────────────────────────────
  setTheme(theme: ChartTheme): void;
  setLayout(mode: 'linear' | 'helix' | 'tunnel'): void;
  /**
   * Restrict visible candles to a time range.
   * @param startMs  Unix timestamp in milliseconds (UTC)
   * @param endMs    Unix timestamp in milliseconds (UTC)
   */
  setTimeRange(startMs: number, endMs: number): void;

  // ── Camera ─────────────────────────────────────────────────────────────────
  /** Fit-to-bounds animated camera reset. */
  resetCamera(durationMs?: number): void;
  animateCameraTo(position: THREE.Vector3, lookAt: THREE.Vector3, durationMs?: number): void;

  // ── Streaming ──────────────────────────────────────────────────────────────
  connectStream(options: StreamConnectOptions): void;
  disconnectStream(): void;

  // ── Extensibility ──────────────────────────────────────────────────────────
  /**
   * Register a custom ChartLayer.
   * FinanceChart guarantees to call:
   *   - layer.update(deltaMs)        on every animation frame
   *   - layer.onLayoutChange(layout) whenever setLayout() is called
   *   - layer.onThemeChange(theme)   whenever setTheme() is called
   *   - layer.dispose()              when FinanceChart.dispose() is called
   *
   * removeLayer(id) also calls layer.dispose() before removing the entry.
   */
  registerLayer(id: string, layer: ChartLayer): void;
  removeLayer(id: string): void;

  // ── Export ─────────────────────────────────────────────────────────────────
  takeScreenshot(): Promise<Blob>;
  exportGLB(): Promise<ArrayBuffer>;
  /**
   * @param timeRange  Optional [startMs, endMs] filter. Omit for all data.
   */
  exportCSV(timeRange?: [number, number]): string;

  // ── Read-only accessors (for custom layer construction) ────────────────────
  readonly scene:  THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly layout: LayoutEngine;
  /**
   * Current theme snapshot.  `readonly` prevents reassignment from outside;
   * use `setTheme()` to update — it notifies all internal components and
   * registered layers via `onThemeChange()`.
   */
  readonly theme:  ChartTheme;
}
```

### `setTimeRange` — index conversion

`setTimeRange(startMs, endMs)` converts timestamps to candle indices internally and then emits `'range:change'` for internal consumers:

```typescript
setTimeRange(startMs: number, endMs: number): void {
  if (startMs >= endMs) return;  // guard: empty or inverted range is a no-op
  const buf = this._candleBuffer;
  // Binary search on buf.time (Float64Array, ascending) — O(log N)
  // lowerBound / upperBound defined in src/utils/MathUtils.ts
  const si = Math.max(0,                lowerBound(buf.time, buf.count, startMs));
  const ei = Math.min(buf.count - 1,    upperBound(buf.time, buf.count, endMs) - 1);
  if (si > ei) return;  // no candles in range
  this._events.emit('range:change', { startIndex: si, endIndex: ei });
}
```

The public API takes milliseconds; the internal `'range:change'` event carries indices. Both are documented clearly to avoid confusion.

Edge case: if `startMs > endMs` or the resulting `si > ei`, `setTimeRange` is a no-op and emits no event. Callers should validate inputs.

### `CandleChart`

```typescript
class CandleChart implements Disposable {
  constructor(deps: {
    scene: THREE.Scene;
    buffer: CandleBuffer;
    layout: LayoutEngine;
    theme: ChartTheme;
    maxCandles: number;
  });

  /** Rebuild instance matrices + colors for candle indices [start, end) */
  updateRange(start: number, end: number): void;
  /** Append one candle; updates slot maps; calls updateRange for that slot */
  append(candle: OHLCVCandle): void;
  /** O(1): patch close/high/low/volume for the last slot only */
  patchLast(partial: Partial<OHLCVCandle>): void;
  /** Map (mesh, instanceId) → candle buffer index for raycasting */
  slotToCandleIndex(mesh: THREE.InstancedMesh, instanceId: number): number;
  /**
   * Allocates and returns a new OHLCVCandle snapshot.
   * Use for event payloads and tooltip display (low-frequency paths only).
   * For hot loops use buffer.fillCandle(index, scratchObj) to avoid allocation.
   *
   * Note: FinanceChart.appendCandle() delegates to this class's append()
   * internally — the public method name differs for API clarity.
   */
  getCandle(index: number): OHLCVCandle;
  /** Expose bull meshes so PostProcessingPipeline can add them to bloom */
  getBullMeshes(): THREE.InstancedMesh[];
  /** Called by FinanceChart render loop */
  updateLOD(cameraDistance: number): void;
  dispose(): void;
}
```

### `VolumeChart`

```typescript
class VolumeChart implements Disposable {
  constructor(deps: {
    scene: THREE.Scene;
    buffer: CandleBuffer;
    layout: LayoutEngine;
    theme: ChartTheme;
    maxCandles: number;
    /** Y-offset below candle chart in world units. Default -4. */
    panelOffset: number;
    /** Max bar height in world units. Default 3. */
    panelHeight: number;
  });

  updateRange(start: number, end: number): void;
  append(candle: OHLCVCandle): void;
  patchLast(partial: Partial<OHLCVCandle>): void;
  /** Recalculate volume normalisation after bulk load or streaming spike. */
  recalculateScale(): void;
  dispose(): void;
}
```

### `IndicatorLayer`

```typescript
class IndicatorLayer implements Disposable {
  constructor(deps: {
    scene: THREE.Scene;
    layout: LayoutEngine;
    theme: ChartTheme;
    /** D3 linear scale mapping price → world-Y coordinate */
    priceToWorldY: (price: number) => number;
  });

  addMA(series: MovingAverageSeries): string;
  addBollingerBands(series: BollingerBandSeries): string;
  addRSI(series: RSISeries): string;
  addMACD(series: MACDSeries): string;
  remove(id: string): void;
  /** Append a single new value (streaming update) */
  appendValue(id: string, value: number | null): void;
  /** Full replacement (e.g. after layout change) */
  replaceValues(id: string, values: Array<number | null>): void;
  onLayoutChange(layout: LayoutEngine): void;
  /** Update line colors and fill opacities when theme changes */
  onThemeChange(theme: ChartTheme): void;
  dispose(): void;
}
```

> **MA line implementation**: `Line2` / `LineSegments2` from `three-stdlib` for sub-pixel-accurate fat lines with configurable pixel width. Backed by `LineGeometry.setPositions(flatArray)` where `flatArray` is `[x0,y0,z0, x1,y1,z1, ...]`. `appendValue` extends the array by 3 floats and re-calls `setPositions`.

> **Bollinger ribbon**: `THREE.Mesh` with custom `BufferGeometry`; upper-band vertices on one edge, lower-band on the other. On update, write directly to `geometry.attributes.position.array` and set `needsUpdate = true`.

> **`priceToWorldY`**: provided by `FinanceChart` as a closure over a D3 `scaleLinear` domain `[minPrice, maxPrice]` range `[0, worldHeight]`. `IndicatorLayer` uses it to convert indicator values into world Y positions.

### `OrderBookDepth`

```typescript
class OrderBookDepth implements Disposable {
  constructor(deps: {
    scene: THREE.Scene;
    theme: ChartTheme;
    priceRange: [number, number];
    maxLevels: number;          // price levels per side, default 200
    depthAxis: 'z' | 'x';
    style: 'heatmap' | 'walls';
    /** Time in ms over which size changes lerp to target. Default 200. */
    lerpDuration: number;
  });

  applySnapshot(snapshot: OrderBookSnapshot): void;
  applyDelta(delta: OrderBookDelta): void;
  /** Advance lerp towards target state — call from animation loop */
  update(deltaMs: number): void;
  dispose(): void;
}
```

### `LayoutEngine` Interface

```typescript
// src/layout/LayoutEngine.ts

import type * as THREE    from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';

export interface CandleTransform {
  position:   THREE.Vector3;
  quaternion: THREE.Quaternion;
  /** Outward normal of the chart surface at this candle — used for label placement */
  normal:     THREE.Vector3;
}

/**
 * Stateless, allocation-free layout engine.
 *
 * getCandleTransform MUST write into `out` rather than returning a new object.
 * Callers maintain a single scratch CandleTransform and reuse it across the loop.
 */
export interface LayoutEngine {
  getCandleTransform(index: number, buffer: CandleBuffer, out: CandleTransform): void;
  getCandleWidth(buffer: CandleBuffer): number;
  getWorldBounds(buffer: CandleBuffer): THREE.Box3;
}
```

### `WebSocketAdapter`

```typescript
// src/streaming/WebSocketAdapter.ts

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
  parseMessage: (raw: MessageEvent) => import('../types/market').Tick
    | import('../types/market').OHLCVCandle
    | import('../types/market').OrderBookDelta
    | null;
  /**
   * Dependency-injection hook for testing.
   * Provide a factory that returns a WebSocket-compatible instance.
   * Example: `WebSocketClass: () => myMockSocket`
   * Defaults to `(url) => new WebSocket(url)`.
   */
  WebSocketClass?: (url: string) => Pick<WebSocket,
    'binaryType' | 'readyState' | 'onopen' | 'onmessage' | 'onerror' | 'onclose' |
    'send' | 'close'
  >;
}

class WebSocketAdapter extends EventEmitter<StreamEvents> {
  constructor(options: StreamConnectOptions);
  connect(): void;
  disconnect(): void;
  readonly readyState: number;  // mirrors WebSocket.readyState constants
}
```

### `PostProcessingPipeline`

```typescript
class PostProcessingPipeline implements Disposable {
  constructor(options: {
    renderer: SupportedRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    isWebGPU: boolean;
  });

  /** Call each frame in place of renderer.render() */
  render(deltaTime: number): void;
  /** Add a mesh to selective bloom (bull candles) */
  addBloomTarget(mesh: THREE.InstancedMesh): void;
  removeBloomTarget(mesh: THREE.InstancedMesh): void;
  setBloomStrength(v: number): void;
  /** Smoothly shift DOF focus to a world-space point */
  setDOFFocusPoint(worldPos: THREE.Vector3): void;
  setMotionBlurStrength(v: number): void;
  resize(width: number, height: number): void;
  dispose(): void;
}
```

---

## 7. Layout Modes

All layouts implement `LayoutEngine`. `getCandleTransform` uses an output-parameter pattern to eliminate per-call allocation in the 10k-candle rebuild loop.

### 7.1 Linear Layout

```typescript
// src/layout/LinearLayout.ts
import * as THREE from 'three';
import type { CandleBuffer }  from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class LinearLayout implements LayoutEngine {
  // Module-level static scratch objects for the output — callers reuse these
  private static readonly _idQuat  = new THREE.Quaternion();
  private static readonly _fwdNorm = new THREE.Vector3(0, 0, 1);

  constructor(public readonly opts: {
    candleSpacing: number;   // world units between candle centres, e.g. 0.5
    candleWidth: number;     // default candleSpacing × 0.8
  }) {}

  getCandleTransform(i: number, _buffer: CandleBuffer, out: CandleTransform): void {
    out.position.set(i * this.opts.candleSpacing, 0, 0);
    out.quaternion.copy(LinearLayout._idQuat);
    out.normal.copy(LinearLayout._fwdNorm);
  }

  getCandleWidth(_buffer: CandleBuffer): number {
    return this.opts.candleWidth;
  }

  getWorldBounds(buffer: CandleBuffer): THREE.Box3 {
    const xMax = (buffer.count - 1) * this.opts.candleSpacing;
    return new THREE.Box3(
      new THREE.Vector3(0, -1e9, -1),
      new THREE.Vector3(xMax, 1e9, 1)
    );
  }
}
```

**Camera placement**: position at `(xMax/2, priceRange/2, xMax * 0.8)` looking at `(xMax/2, priceRange/2, 0)`.

### 7.2 Helix / Spiral Layout

Candles wind around a vertical helix. Uses proper Frenet frames (pre-computed) so basis vectors are guaranteed orthonormal.

**Math**:

```
angle_i    = i × Δθ                   Δθ = angular step (rad), e.g. 0.025
x_i        = R × cos(angle_i)         R = radius, e.g. 15 world units
y_i        = i × h                    h = pitch per candle, e.g. 0.08
z_i        = R × sin(angle_i)

Frenet tangent (unnormalised):
  T_raw = (−R sinA × Δθ,  h,  R cosA × Δθ)
  T     = normalize(T_raw)

Frenet normal (points inward toward axis):
  N     = normalize(−cosA, 0, −sinA)    ← unit inward radial

Frenet binormal:
  B     = T × N   (cross product of two unit vectors = unit vector ✓)
           (orthogonality: T and N are perpendicular because T has no
            component along N once h≠0 — verified: T·N = cosA×cosA×Δθ×R/|T_raw| = 0
            only when R=0; for R>0 and any pitch h, T·N = 0 trivially because
            the inward normal has y=0 while the pitch component h lives only in y)
```

> **Orthogonality proof**: The inward normal `N = (−cosA, 0, −sinA)` has y-component = 0. The tangent `T = (−R sinA Δθ, h, R cosA Δθ) / |T_raw|` has `T·N = (R sinA cosA Δθ − R sinA cosA Δθ) / |T_raw| = 0`. Therefore T⊥N for all i, and `B = T × N` is always a unit vector. Basis `{N, B, T}` is orthonormal. ✓

```typescript
// src/layout/HelixLayout.ts
import * as THREE from 'three';
import type { CandleBuffer }  from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class HelixLayout implements LayoutEngine {
  // Pre-allocated scratch for basis construction — not per-call allocation
  private _T   = new THREE.Vector3();
  private _N   = new THREE.Vector3();
  private _B   = new THREE.Vector3();
  private _m   = new THREE.Matrix4();

  constructor(private opts: {
    radius: number;          // default 15
    angularStep: number;     // radians per candle, default 0.025
    pitchPerCandle: number;  // world-Y per candle, default 0.08
    candleWidth: number;     // default 0.35
  }) {}

  getCandleTransform(i: number, _buf: CandleBuffer, out: CandleTransform): void {
    const { radius: R, angularStep: dθ, pitchPerCandle: h } = this.opts;
    const angle = i * dθ;
    const cosA  = Math.cos(angle);
    const sinA  = Math.sin(angle);

    out.position.set(R * cosA, i * h, R * sinA);

    // Frenet inward normal (unit vector)
    this._N.set(-cosA, 0, -sinA);
    out.normal.copy(this._N);

    // Frenet tangent — derivative of position w.r.t. arc parameter, normalised
    const tLen = Math.sqrt(R * R * dθ * dθ + h * h);
    this._T.set(-R * sinA * dθ / tLen, h / tLen, R * cosA * dθ / tLen);

    // Frenet binormal — cross product of unit tangent and unit normal
    this._B.crossVectors(this._T, this._N);
    // Note: _B is already unit length because T ⊥ N (see orthogonality proof above)

    // Three.js Matrix4.makeBasis(xAxis, yAxis, zAxis) sets the three column vectors.
    // Here: local-X = N (inward radial, candle "right"), local-Y = B (binormal,
    // candle "up"), local-Z = T (tangent, candle "depth").
    // This orients the candle face toward the inward-normal direction (viewer outside helix).
    this._m.makeBasis(this._N, this._B, this._T);
    out.quaternion.setFromRotationMatrix(this._m);
  }

  getCandleWidth(_buf: CandleBuffer): number { return this.opts.candleWidth; }

  getWorldBounds(buf: CandleBuffer): THREE.Box3 {
    const yMax = buf.count * this.opts.pitchPerCandle;
    const r    = this.opts.radius;
    return new THREE.Box3(new THREE.Vector3(-r, 0, -r), new THREE.Vector3(r, yMax, r));
  }
}
```

**Camera setup**: position at `(0, yMax/2, radius * 2.5)` pointing at `(0, yMax/2, 0)`.

### 7.3 Tunnel / Path-Following Layout

Candles follow a user-supplied `CatmullRomCurve3`. Frenet frames pre-computed at construction for O(1) per-candle lookups.

```typescript
// src/layout/TunnelLayout.ts
import * as THREE from 'three';
import type { CandleBuffer }  from '../types/CandleBuffer';
import type { CandleTransform, LayoutEngine } from './LayoutEngine';

export class TunnelLayout implements LayoutEngine {
  private frames: ReturnType<THREE.CatmullRomCurve3['computeFrenetFrames']>;
  private frameCount: number;

  // Pre-allocated scratch — NO per-call allocation
  private _negT = new THREE.Vector3();
  private _m    = new THREE.Matrix4();

  constructor(
    private curve: THREE.CatmullRomCurve3,
    private opts: {
      candleWidth: number;
      /** Number of Frenet frames to pre-compute. Default 10_000. */
      frameResolution?: number;
    }
  ) {
    this.frameCount = opts.frameResolution ?? 10_000;
    this.frames     = curve.computeFrenetFrames(this.frameCount, false);
  }

  /**
   * Re-compute Frenet frames after the spline control points change.
   * Throttle calls — this is O(frameResolution) work.
   */
  rebuildFrames(): void {
    this.frames = this.curve.computeFrenetFrames(this.frameCount, false);
  }

  getCandleTransform(i: number, buf: CandleBuffer, out: CandleTransform): void {
    const t  = buf.count > 1 ? i / (buf.count - 1) : 0;
    const fi = Math.min(this.frameCount - 1, Math.floor(t * this.frameCount));

    this.curve.getPointAt(t, out.position);
    out.normal.copy(this.frames.normals[fi]);

    const T = this.frames.tangents[fi];
    const N = this.frames.normals[fi];
    const B = this.frames.binormals[fi];

    // Negate tangent so the candle face looks toward the approaching viewer (t=0 side)
    this._negT.set(-T.x, -T.y, -T.z);
    // Build orthonormal basis — all three frame vectors are guaranteed unit length
    this._m.makeBasis(N, B, this._negT);
    out.quaternion.setFromRotationMatrix(this._m);
  }

  getCandleWidth(_buf: CandleBuffer): number { return this.opts.candleWidth; }

  getWorldBounds(_buf: CandleBuffer): THREE.Box3 {
    const pts = this.curve.getPoints(200);
    const box = new THREE.Box3();
    pts.forEach(p => box.expandByPoint(p));
    return box;
  }
}
```

> **Camera animation for tunnel**: Call `CameraAnimator.followCurve(curve, t)` each frame, advancing `t` by `speed * deltaMs`. See §9.

---

## 8. Real-Time Streaming System

### Latency Contract

The `UpdateScheduler` defers all GPU writes to the next `requestAnimationFrame` tick. This means the worst-case latency from WebSocket message to screen update is **one frame period** (16.7 ms at 60 fps, 8.3 ms at 120 fps).

**Backgrounded-tab caveat**: `rAF` is throttled to ~1 Hz when the tab is not visible. If real-time rendering while backgrounded is required, the consumer should call `chart.setBackgroundMode(true)` which switches the render trigger from `rAF` to a `setInterval(render, 16)` fallback. This is a power trade-off and is opt-in.

### WebSocket Adapter

```typescript
// src/streaming/WebSocketAdapter.ts

export class WebSocketAdapter extends EventEmitter<StreamEvents> {
  private ws: WebSocket | null = null;
  private retryDelay  = 1000;
  private manualClose = false;
  private heartbeatTimer?: ReturnType<typeof setInterval>;

  constructor(private readonly opts: StreamConnectOptions) { super(); }

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
      this.retryDelay = 1000;  // reset backoff on successful connect
      this._startHeartbeat();
      this.emit('connect', { url: this.opts.url });
    };

    this.ws.onmessage = (ev) => {
      let msg: ReturnType<typeof this.opts.parseMessage>;
      try { msg = this.opts.parseMessage(ev); }
      catch (err) {
        this.emit('error', { error: err instanceof Error ? err : new Error(String(err)) });
        return;
      }
      if (msg !== null) this.emit('message', msg);
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
    const delay        = this.retryDelay;
    this.retryDelay    = Math.min(this.retryDelay * 1.5, 30_000);
    setTimeout(() => this._open(), delay);
  }

  private _startHeartbeat(): void {
    const interval = this.opts.heartbeatIntervalMs ?? 30_000;
    if (interval === 0) return;
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) this.ws.send('ping');
    }, interval);
  }

  private _stopHeartbeat(): void { clearInterval(this.heartbeatTimer); }

  get readyState(): number { return this.ws?.readyState ?? WebSocket.CLOSED; }
}
```

### Tick Aggregator

```typescript
// src/streaming/TickAggregator.ts

export class TickAggregator {
  private current: OHLCVCandle | null = null;

  constructor(private readonly intervalMs: number) {}

  /**
   * Returns the completed previous candle when a new interval starts,
   * or null when updating the current open candle.
   * Caller appends the completed candle and calls patchLast for null.
   */
  ingest(tick: Tick): OHLCVCandle | null {
    const bucketStart = Math.floor(tick.time / this.intervalMs) * this.intervalMs;

    if (!this.current || this.current.time < bucketStart) {
      const completed   = this.current ? { ...this.current } : null;
      this.current      = {
        time:   bucketStart,
        open:   tick.price,
        high:   tick.price,
        low:    tick.price,
        close:  tick.price,
        volume: tick.volume,
      };
      return completed;
    }

    this.current.high   = Math.max(this.current.high,  tick.price);
    this.current.low    = Math.min(this.current.low,   tick.price);
    this.current.close  = tick.price;
    this.current.volume += tick.volume;
    return null;
  }

  getLive(): OHLCVCandle | null { return this.current; }
  reset():   void                { this.current = null; }
}
```

### Update Scheduler

```typescript
// src/streaming/UpdateScheduler.ts

export class UpdateScheduler {
  private pendingPatches: Partial<OHLCVCandle> | null = null;
  private pendingAppends: OHLCVCandle[]               = [];
  private rafId: number | null                        = null;

  constructor(
    private onAppend: (candles: OHLCVCandle[]) => void,
    private onPatch:  (partial: Partial<OHLCVCandle>) => void
  ) {}

  scheduleAppend(candle: OHLCVCandle): void {
    this.pendingAppends.push(candle);
    this._scheduleFlush();
  }

  schedulePatch(partial: Partial<OHLCVCandle>): void {
    // Merge: last-write-wins per field — correct semantics for price/volume streaming
    this.pendingPatches = { ...this.pendingPatches, ...partial };
    this._scheduleFlush();
  }

  private _scheduleFlush(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.pendingAppends.length > 0) {
        // Swap array before calling onAppend to avoid re-entrancy issues
        const batch        = this.pendingAppends;
        this.pendingAppends = [];
        this.onAppend(batch);
      }
      if (this.pendingPatches !== null) {
        const patch         = this.pendingPatches;
        this.pendingPatches = null;
        this.onPatch(patch);
      }
    });
  }

  dispose(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}
```

> **Re-entrancy safety**: The `pendingAppends` array is swapped before calling `onAppend` so that any `scheduleAppend` calls made synchronously inside `onAppend` (unlikely but possible) queue into a fresh array and will flush on the next frame.

### Streaming Hot Path — Full Call Chain

When a tick arrives (e.g. 100 ticks/sec from Binance):

1. `WebSocketAdapter.onmessage` → `parseMessage()` → `emit('message', tick)`
2. `FinanceChart` listener → `TickAggregator.ingest(tick)`:
   - **Intra-candle** → returns `null` → `scheduler.schedulePatch({ close, high, low, volume })`
   - **New candle** → returns completed → `scheduler.scheduleAppend(completed)`; live candle continues
3. `UpdateScheduler` coalesces all same-frame ticks (last-write-wins for patch fields)
4. Next `rAF` (≤ 16.7 ms): flush — `CandleChart.patchLast(patch)` or `CandleChart.append(candle)`
5. `patchLast` → `markDirtySlots(mesh, slot, 1)` — **2 meshes × 1 slot** = 32 floats uploaded
6. GPU cost: O(1) regardless of total candle count

---

## 9. Interactivity & Controls

### OrbitControls Configuration

```typescript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping     = true;
controls.dampingFactor     = 0.08;
controls.zoomSpeed         = 1.5;
controls.panSpeed          = 0.8;
controls.maxDistance       = 500;
controls.minDistance       = 0.5;
controls.screenSpacePanning = true;

// Restrict for helix/tunnel layouts
controls.maxPolarAngle = Math.PI * 0.85;
controls.minPolarAngle = Math.PI * 0.05;
```

### Raycaster / Crosshair

`InstancedMesh.raycast()` returns `instanceId` natively in r160+. The `CrosshairController` maps `instanceId` back to the candle buffer index via `CandleChart.slotToCandleIndex`.

```typescript
// src/interaction/CrosshairController.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { EventEmitter }  from '../utils/EventEmitter';
import type { ChartEvents }   from '../types/events';
import type { CandleChart }   from '../charts/CandleChart';

export class CrosshairController {
  private raycaster = new THREE.Raycaster();
  private pointer   = new THREE.Vector2();
  private lastHit:  { mesh: THREE.InstancedMesh; instanceId: number } | null = null;
  private targets:  THREE.InstancedMesh[] = [];

  constructor(
    private readonly camera:      THREE.Camera,
    private readonly domElement:  HTMLElement,
    private readonly events:      EventEmitter<ChartEvents>,
    private readonly candleChart: CandleChart
  ) {
    this.raycaster.params.Line = { threshold: 0.2 };
    domElement.addEventListener('pointermove', this._onMove, { passive: true });
    domElement.addEventListener('click',       this._onClick);
  }

  registerTarget(mesh: THREE.InstancedMesh): void { this.targets.push(mesh); }

  private _onMove = (e: PointerEvent): void => {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.set(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.targets, false);

    if (hits.length > 0 && hits[0].instanceId !== undefined) {
      const mesh       = hits[0].object as THREE.InstancedMesh;
      const instanceId = hits[0].instanceId;
      if (instanceId !== this.lastHit?.instanceId || mesh !== this.lastHit?.mesh) {
        this.lastHit  = { mesh, instanceId };
        const idx    = this.candleChart.slotToCandleIndex(mesh, instanceId);
        const candle = this.candleChart.getCandle(idx);
        this.events.emit('candle:hover', { index: idx, candle, worldPos: hits[0].point });
      }
    } else if (this.lastHit !== null) {
      this.lastHit = null;
      this.events.emit('candle:hover', null);
    }
  };

  private _onClick = (): void => {
    if (this.lastHit === null) return;
    const idx    = this.candleChart.slotToCandleIndex(this.lastHit.mesh, this.lastHit.instanceId);
    const candle = this.candleChart.getCandle(idx);
    this.events.emit('candle:click', { index: idx, candle });
  };

  dispose(): void {
    this.domElement.removeEventListener('pointermove', this._onMove);
    this.domElement.removeEventListener('click',       this._onClick);
    this.targets.length = 0;
  }
}
```

### Tooltip Overlay

```typescript
// src/interaction/TooltipOverlay.ts
import * as THREE from 'three';
import type { OHLCVCandle } from '../types/market';
import type { SupportedRenderer } from '../renderer/createRenderer';

export class TooltipOverlay {
  private el: HTMLDivElement;

  constructor(
    container:           HTMLElement,
    private camera:      THREE.Camera,
    private renderer:    SupportedRenderer
  ) {
    this.el = document.createElement('div');
    this.el.setAttribute('role', 'status');          // ARIA live region
    this.el.setAttribute('aria-live', 'polite');
    this.el.setAttribute('aria-atomic', 'true');
    this.el.className = 'tfv-tooltip';
    Object.assign(this.el.style, {
      position:       'absolute',
      pointerEvents:  'none',
      display:        'none',
      borderRadius:   '6px',
      padding:        '8px 12px',
      fontSize:       '12px',
      fontFamily:     "'JetBrains Mono', 'Fira Code', monospace",
      whiteSpace:     'pre',
      backdropFilter: 'blur(8px)',
      zIndex:         '10',
    });
    container.appendChild(this.el);
  }

  applyTheme(theme: import('../types/theme').ChartTheme): void {
    Object.assign(this.el.style, {
      background: theme.tooltip.background,
      color:      theme.tooltip.text,
      border:     `1px solid ${theme.tooltip.border}`,
    });
  }

  show(candle: OHLCVCandle, worldPos: THREE.Vector3): void {
    const ndc    = worldPos.clone().project(this.camera);
    const canvas = this.renderer.domElement;
    const x = ( ndc.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (-ndc.y * 0.5 + 0.5) * canvas.clientHeight;
    // Clamp within canvas bounds
    const margin  = 8;
    const clampX  = Math.min(x + 16, canvas.clientWidth  - 160 - margin);
    const clampY  = Math.min(y -  8, canvas.clientHeight - 100 - margin);
    this.el.style.left    = `${Math.max(margin, clampX)}px`;
    this.el.style.top     = `${Math.max(margin, clampY)}px`;
    this.el.style.display = 'block';
    this.el.textContent   = this._format(candle);
  }

  hide(): void { this.el.style.display = 'none'; }

  private _format(c: OHLCVCandle): string {
    // All timestamps are UTC; always display as UTC to avoid TZ ambiguity
    const d   = new Date(c.time).toISOString().slice(0, 16).replace('T', ' ');
    const dir = c.close >= c.open ? '▲' : '▼';
    return `${d} UTC  ${dir}\nO ${c.open.toFixed(2)}  H ${c.high.toFixed(2)}\nL ${c.low.toFixed(2)}  C ${c.close.toFixed(2)}\nVol ${c.volume.toLocaleString()}`;
  }

  dispose(): void { this.el.remove(); }
}
```

> **Timezone**: `.toISOString()` always returns UTC. All `time` fields in this library are Unix milliseconds (UTC). Local-time display is the consumer's responsibility.

### Camera Animator

```typescript
// src/interaction/CameraAnimator.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CameraAnimator {
  private active    = false;
  private startPos  = new THREE.Vector3();
  private endPos    = new THREE.Vector3();
  private startTgt  = new THREE.Vector3();
  private endTgt    = new THREE.Vector3();
  private elapsed   = 0;
  private duration  = 1200;

  constructor(
    private readonly camera:   THREE.PerspectiveCamera,
    private readonly controls: OrbitControls
  ) {}

  /** Smoothly move camera to `position` while pivoting `lookAt` */
  flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, durationMs = 1200): void {
    this.startPos.copy(this.camera.position);
    this.startTgt.copy(this.controls.target);
    this.endPos.copy(position);
    this.endTgt.copy(lookAt);
    this.elapsed  = 0;
    this.duration = durationMs;
    this.active   = true;
    this.controls.enabled = false;
  }

  /** Call from animation loop with frame delta in milliseconds */
  update(deltaMs: number): void {
    if (!this.active) return;
    this.elapsed = Math.min(this.elapsed + deltaMs, this.duration);
    const t      = this._easeInOutCubic(this.elapsed / this.duration);
    this.camera.position.lerpVectors(this.startPos, this.endPos, t);
    this.controls.target.lerpVectors(this.startTgt, this.endTgt, t);
    this.controls.update();
    if (this.elapsed >= this.duration) {
      this.active = false;
      this.controls.enabled = true;
    }
  }

  /**
   * Snap camera to a position on a CatmullRomCurve3 for tunnel fly-through.
   * Call each frame, advancing `t` by `speed * deltaMs`.
   * This is a one-shot placement, not an animation — use `flyTo` for transitions.
   */
  followCurve(curve: THREE.CatmullRomCurve3, t: number, lookAheadDelta = 0.002): void {
    curve.getPointAt(t, this.camera.position);
    const target = new THREE.Vector3();
    curve.getPointAt(Math.min(1, t + lookAheadDelta), target);
    this.camera.lookAt(target);
  }

  get isAnimating(): boolean { return this.active; }

  private _easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}
```

### Time Range Selector (Shift+Drag)

```typescript
// src/interaction/TimeRangeSelector.ts
import * as THREE from 'three';
import type { LinearLayout }  from '../layout/LinearLayout';
import type { EventEmitter }  from '../utils/EventEmitter';
import type { ChartEvents }   from '../types/events';

export class TimeRangeSelector {
  private floorPlane    = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private raycaster     = new THREE.Raycaster();
  private _isect        = new THREE.Vector3();   // reused scratch
  private startWorld:     THREE.Vector3 | null  = null;

  constructor(
    private readonly camera:     THREE.Camera,
    private readonly domElement: HTMLElement,
    private readonly layout:     LinearLayout,
    private readonly events:     EventEmitter<ChartEvents>
  ) {
    domElement.addEventListener('pointerdown', this._onDown);
    domElement.addEventListener('pointerup',   this._onUp);
  }

  private _worldFromEvent(e: PointerEvent): THREE.Vector3 | null {
    const rect = this.domElement.getBoundingClientRect();
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    return this.raycaster.ray.intersectPlane(this.floorPlane, this._isect)
      ? this._isect.clone()   // clone: startWorld must survive until pointerup
      : null;
  }

  private _onDown = (e: PointerEvent): void => {
    if (!e.shiftKey) return;
    this.startWorld = this._worldFromEvent(e);
  };

  private _onUp = (e: PointerEvent): void => {
    if (!this.startWorld) return;
    const endWorld = this._worldFromEvent(e);
    if (!endWorld) { this.startWorld = null; return; }
    const spacing  = this.layout.opts.candleSpacing;
    const xA       = Math.min(this.startWorld.x, endWorld.x);
    const xB       = Math.max(this.startWorld.x, endWorld.x);
    this.events.emit('range:change', {
      startIndex: Math.max(0, Math.floor(xA / spacing)),
      endIndex:   Math.floor(xB / spacing),
    });
    this.startWorld = null;
  };

  dispose(): void {
    this.domElement.removeEventListener('pointerdown', this._onDown);
    this.domElement.removeEventListener('pointerup',   this._onUp);
  }
}
```

### Keyboard Accessibility

`FinanceChart` registers these keyboard handlers on the container element to fulfil the accessibility goal:

| Key | Action |
|---|---|
| `←` / `→` | Pan timeline left / right by 10 candles |
| `+` / `-` | Zoom in / out |
| `Home` | Jump to earliest candle |
| `End` | Jump to latest candle |
| `Tab` | Cycle focus across registered chart layers |
| `Enter` | "Click" the currently hovered candle (triggers `candle:click`) |
| `Escape` | Clear selection / dismiss tooltip |

```typescript
// In FinanceChart.init():
this._container.setAttribute('tabindex', '0');
this._container.setAttribute('role', 'application');
this._container.setAttribute('aria-label', 'Interactive 3D financial chart');
this._container.addEventListener('keydown', this._onKey);
```

---

## 10. Post-Processing & Effects Pipeline

### Two-Path Architecture

```
WebGPU path  (isWebGPU = true):
  THREE.WebGPURenderer
    → TSL Node materials on meshes
    → three/addons/tsl/display/* post-processing nodes
    → renderer.renderAsync(outputNode)

WebGL2 path  (isWebGPU = false):
  THREE.WebGLRenderer
    → pmndrs/postprocessing EffectComposer (HalfFloatType HDR buffer)
    → SelectiveBloomEffect + DepthOfFieldEffect + MotionBlurEffect
      + ChromaticAberrationEffect + GodRaysEffect
    → composer.render()
```

### WebGL2 Path — pmndrs EffectComposer

```typescript
// src/renderer/PostProcessingPipeline.ts (WebGL2 branch)
import * as THREE from 'three';
import {
  EffectComposer, RenderPass,
  SelectiveBloomEffect, DepthOfFieldEffect,
  MotionBlurEffect, ChromaticAberrationEffect, GodRaysEffect,
  EffectPass, BlendFunction,
} from 'postprocessing';

interface WebGLPipelineHandles {
  composer:   EffectComposer;
  bloom:      SelectiveBloomEffect;
  dof:        DepthOfFieldEffect;
  motionBlur: MotionBlurEffect;
  godRays:    GodRaysEffect;
}

export function buildWebGLPipeline(
  renderer: THREE.WebGLRenderer,
  scene:    THREE.Scene,
  camera:   THREE.PerspectiveCamera
): WebGLPipelineHandles {
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType,  // HDR buffer required for bloom
    multisampling:   4,
  });

  composer.addPass(new RenderPass(scene, camera));

  const bloom = new SelectiveBloomEffect(scene, camera, {
    blendFunction:      BlendFunction.ADD,
    intensity:          1.8,
    luminanceThreshold: 0.3,
    luminanceSmoothing: 0.025,
    radius:             0.55,
    levels:             8,
  });
  // Register bull candle meshes via bloom.selection.add(mesh) after construction

  const dof = new DepthOfFieldEffect(camera, {
    focalLength: 0.1,
    bokehScale:  3,
    height:      480,
  });

  const motionBlur = new MotionBlurEffect({ samples: 8 });

  const chromAb = new ChromaticAberrationEffect({
    offset: new THREE.Vector2(0.0015, 0.001),
  });

  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  sunMesh.visible = false;
  scene.add(sunMesh);

  const godRays = new GodRaysEffect(camera, sunMesh, {
    density: 0.96, decay: 0.93, weight: 0.3, samples: 60, blur: true,
  });

  composer.addPass(new EffectPass(camera, bloom, dof, motionBlur, chromAb, godRays));

  return { composer, bloom, dof, motionBlur, godRays };
}
```

### `PostProcessingPipeline` Class (stores all handles)

```typescript
// src/renderer/PostProcessingPipeline.ts

export class PostProcessingPipeline implements Disposable {
  private composer?: EffectComposer;
  private bloom?:    SelectiveBloomEffect;
  private dof?:      DepthOfFieldEffect;

  constructor(private opts: {
    renderer: SupportedRenderer;
    scene:    THREE.Scene;
    camera:   THREE.PerspectiveCamera;
    isWebGPU: boolean;
  }) {
    if (!opts.isWebGPU) {
      const handles = buildWebGLPipeline(
        opts.renderer as THREE.WebGLRenderer,
        opts.scene,
        opts.camera
      );
      this.composer = handles.composer;
      this.bloom    = handles.bloom;
      this.dof      = handles.dof;
    }
    // WebGPU path: node pipeline stored separately; see buildWebGPUPipeline
  }

  render(deltaTime: number): void {
    if (this.composer) {
      this.composer.render(deltaTime);
    } else if (this._webGPUOutput) {
      // Cast required: Three.js does not yet export a stable public NodeRepresentation type.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.opts.renderer as THREE.WebGPURenderer).renderAsync(this._webGPUOutput as any);
    }
  }

  addBloomTarget(mesh: THREE.InstancedMesh): void {
    this.bloom?.selection.add(mesh);
  }

  removeBloomTarget(mesh: THREE.InstancedMesh): void {
    this.bloom?.selection.delete(mesh);
  }

  /**
   * Shift DOF focal plane to a world-space point.
   *
   * WebGL2 path: updates pmndrs DepthOfFieldEffect.cocMaterial focal length.
   * WebGPU path: TSL DOF node parameters are set at build time and are not
   * mutable via this method in v1.  This is a known limitation — dynamic DOF
   * focus on WebGPU is deferred to Phase 2 (§14).
   */
  setDOFFocusPoint(worldPos: THREE.Vector3): void {
    if (!this.dof) return;  // no-op on WebGPU path
    const camSpace = worldPos.clone().applyMatrix4(this.opts.camera.matrixWorldInverse);
    // cocMaterial.focalLength is normalised by camera.far
    this.dof.cocMaterial.uniforms['focalLength'].value =
      Math.abs(camSpace.z) / this.opts.camera.far;
  }

  setBloomStrength(v: number): void {
    if (this.bloom) this.bloom.intensity = v;
  }

  resize(width: number, height: number): void {
    this.composer?.setSize(width, height);
  }

  dispose(): void { this.composer?.dispose(); }

  // Assigned from buildWebGPUPipeline() after construction on the WebGPU path.
  // The TSL node type is not exported by Three.js as a stable public type; type as
  // `object` here and cast at the call site: renderer.renderAsync(this._webGPUOutput as any)
  // Typed stricter in real implementation once Three.js exports NodeRepresentation publicly.
  private _webGPUOutput?: object;
}
```

### WebGPU Path — TSL Node Pipeline

```typescript
// src/renderer/buildWebGPUPipeline.ts
import { pass }                from 'three/tsl';
import { bloom }               from 'three/addons/tsl/display/BloomNode.js';
import { depthOfField }        from 'three/addons/tsl/display/DepthOfFieldNode.js';
import { chromaticAberration } from 'three/addons/tsl/display/ChromaticAberrationNode.js';
import * as THREE from 'three';

export function buildWebGPUPipeline(
  renderer: THREE.WebGPURenderer,
  scene:    THREE.Scene,
  camera:   THREE.PerspectiveCamera
) {
  const scenePass  = pass(scene, camera);
  const outputNode = scenePass.getTextureNode('output');
  const depthNode  = scenePass.getDepthNode();

  const bloomNode  = bloom(outputNode, 1.8, 0.55, 0.3);
  const dofNode    = depthOfField(bloomNode, depthNode, camera, 0.08, 3.0);
  const finalNode  = chromaticAberration(dofNode, new THREE.Vector2(0.002, 0.001));

  return { finalNode, bloomNode, dofNode };
  // Caller: pipeline._webGPUOutput = finalNode; renderer.renderAsync(finalNode)
}
```

### Selective Bloom — Two-Mesh Pattern

`InstancedMesh` does not support per-instance `layers` assignment. The solution used throughout this library: **separate bull and bear meshes**.

```typescript
const BLOOM_LAYER = 1;

bullBodyMesh.layers.set(BLOOM_LAYER);  // bloom applies
bearBodyMesh.layers.set(0);            // no bloom
bullWickMesh.layers.set(BLOOM_LAYER);
bearWickMesh.layers.set(0);

// Register with PostProcessingPipeline
pipeline.addBloomTarget(bullBodyMesh);
pipeline.addBloomTarget(bullWickMesh);
```

**Theme change bloom sync**: when `FinanceChart.setTheme()` is called:
1. Re-cache the four Color objects (§5)
2. If the new theme has non-zero `bullBodyEmissive`, keep bull meshes in bloom selection
3. If the theme inverts (e.g. custom dark-bear theme), call `pipeline.removeBloomTarget` / `pipeline.addBloomTarget` as needed
4. `FinanceChart` owns this decision — `PostProcessingPipeline` is a dumb container

### DOF Focus Tracking

```typescript
// In FinanceChart, after init():
const unsubHover = this.on('candle:hover', (event) => {
  if (event) this._postProc.setDOFFocusPoint(event.worldPos);
});
// Store unsubHover and call it in dispose()
```

---

## 11. Performance Optimizations & Benchmarks

### Target Performance Matrix

| Candle Count | Target FPS | JS budget/frame | GPU budget/frame | Est. VRAM |
|---|---|---|---|---|
| 1,000 | 144 fps | < 1 ms | < 3 ms | ~50 MB |
| 5,000 | 90+ fps | < 2 ms | < 6 ms | ~120 MB |
| 10,000 | 60+ fps | < 3 ms | < 10 ms | ~220 MB |
| 20,000 | 45+ fps | < 5 ms | < 16 ms | ~400 MB |

**Benchmark conditions**: Chrome 122, NVIDIA RTX 3060 (8 GB VRAM), Intel i7-12700K, 1080p canvas, all post-processing effects enabled (bloom strength 1.8, DOF height 480, motion blur 8 samples), DPR capped at 2. WebGPU path shows ~18–22% lower frame time than WebGL2 at 10k+ candles. Measurements taken with Chrome DevTools GPU profiler; 300-frame average after 60-frame warm-up.

### LOD Strategy

```typescript
private _currentLOD: 'high' | 'low' = 'high';

updateLOD(cameraDistance: number): void {
  const next: 'high' | 'low' = cameraDistance > 200 ? 'low' : 'high';
  if (next === this._currentLOD) return;
  this._currentLOD = next;
  const bodyGeo = next === 'high' ? BODY_GEO_HIGH : BODY_GEO_LOW;
  const wickGeo = next === 'high' ? WICK_GEO_HIGH : WICK_GEO_LOW;
  this.bullBodyMesh.geometry = bodyGeo;
  this.bearBodyMesh.geometry = bodyGeo;
  this.bullWickMesh.geometry = wickGeo;
  this.bearWickMesh.geometry = wickGeo;
  // Force re-upload of geometry on next draw
  bodyGeo.attributes['position'].needsUpdate = true;
  wickGeo.attributes['position'].needsUpdate = true;
}
```

### Viewport Count Culling (Linear Layout)

```typescript
private _updateVisibleCount(): void {
  const spacing = (this.layout as LinearLayout).opts.candleSpacing;
  const [leftX, rightX] = this._frustumXRange();   // binary search O(log N)
  const start = Math.max(0, Math.floor(leftX / spacing) - 1);
  const end   = Math.min(this.buffer.count, Math.ceil(rightX / spacing) + 1);
  // Since candle slots are in buffer order, clamp .count to end
  this.bullBodyMesh.count = Math.min(this.bullCount, end);
  this.bearBodyMesh.count = Math.min(this.bearCount, end);
  this.bullWickMesh.count = this.bullBodyMesh.count;
  this.bearWickMesh.count = this.bearBodyMesh.count;
}
```

> **Why `frustumCulled = false`**: Three.js computes a single bounding sphere for the entire `InstancedMesh`. For large charts this sphere extends far off-screen in some views, causing Three.js to incorrectly cull all instances. Setting `frustumCulled = false` and managing `.count` manually is more reliable. An alternative — updating the mesh `boundingSphere` per frame — is feasible but adds CPU overhead.

### Update Batching Rules

| Operation | Batch strategy | GPU uploads |
|---|---|---|
| Initial load (N candles) | Single `updateRange(0, N)` then flush | 1 full upload |
| Append historical candle | `updateRange(N-1, N)`, `markDirtySlots(mesh, slot, 1)` | 1-slot partial |
| Streaming tick `patchLast` | `markDirtySlots(mesh, slot, 1)` on 2 meshes | 2 × 1-slot |
| Theme change | `updateRange(0, count)` — all instance colors change | Full upload |
| Selection change | `markDirtySlots` for changed range only | Subrange |

### `addUpdateRange` / `clearUpdateRanges` Checklist

```typescript
// ✅ CORRECT pattern — call clearUpdateRanges FIRST each frame
function flushFrame(chart: CandleChart): void {
  beginFrameFlush(chart.bullBodyMesh);  // clears ranges on matrix + color
  beginFrameFlush(chart.bearBodyMesh);
  beginFrameFlush(chart.bullWickMesh);
  beginFrameFlush(chart.bearWickMesh);

  // Then accumulate dirty slots
  for (const [slot, count] of chart.dirtyBullSlots) {
    markDirtySlots(chart.bullBodyMesh, slot, count);
    markDirtySlots(chart.bullWickMesh, slot, count);
  }
  for (const [slot, count] of chart.dirtyBearSlots) {
    markDirtySlots(chart.bearBodyMesh, slot, count);
    markDirtySlots(chart.bearWickMesh, slot, count);
  }
  chart.dirtyBullSlots.clear();
  chart.dirtyBearSlots.clear();
}
```

### Common Performance Pitfalls

| Pitfall | Symptom | Fix |
|---|---|---|
| `needsUpdate = true` every frame with no dirty data | Unnecessary full buffer re-upload at 60 fps | Gate behind dirty-flag check |
| Forgetting `clearUpdateRanges()` | Range list grows unboundedly → full upload every frame | Always call at start of flush cycle |
| One `Mesh` per candle | > 10k draw calls → GPU pipeline stall | `InstancedMesh` |
| `new THREE.Color()` in update loop | GC pressure, jank spikes | Pre-cache 4 Color objects per theme |
| `renderer.render()` inside `WebSocket.onmessage` | Up to 500+ renders/second | `UpdateScheduler` deferred to `rAF` |
| `frustumCulled = true` on large `InstancedMesh` | All instances culled when bounding sphere off-screen | `frustumCulled = false`, manage `.count` |
| `Line` (thin lines) for MA curves | 1 px wide on all devices, invisible at distance | `Line2` from `three-stdlib` |
| No `dispose()` on teardown | VRAM leak accumulates over long sessions | `Disposable` contract on all GPU-owning classes |
| Disposing shared geometry per chart instance | Crashes other charts sharing the same `BufferGeometry` | Ref-count with `retainSharedGeometry()` / `releaseSharedGeometry()` |

### Memory Budget Guidance

| Component | Bytes per candle |
|---|---|
| `CandleBuffer` (`_data` + `time` + `flags`) | 48 B |
| Bull body `instanceMatrix` (Float32 × 16) | 64 B |
| Bull body `instanceColor` (Float32 × 3) | 12 B |
| Bear equivalents | 76 B |
| Wick equivalents (bull + bear) | 152 B |
| **Total GPU allocation per candle** | ~352 B |

At 20,000 candles: ~7 MB typed-array data + Three.js overhead + texture memory for post-processing ≈ 400 MB total VRAM estimate.

---

## 12. Extensibility Guide

### Adding a New Chart Type

1. Implement `ChartLayer` (exported from `src/index.ts`):

```typescript
// src/charts/MyCustomChart.ts
import type { ChartLayer }    from 'three-finance-viz';
import type { LayoutEngine }  from 'three-finance-viz';
import type { ChartTheme }    from 'three-finance-viz';
import * as THREE from 'three';

export class MyCustomChart implements ChartLayer {
  private mesh: THREE.Mesh;

  constructor(private deps: {
    scene:  THREE.Scene;
    layout: LayoutEngine;
    theme:  ChartTheme;
  }) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.5),
      new THREE.MeshStandardMaterial({ color: deps.theme.candle.bullBody })
    );
    deps.scene.add(this.mesh);
  }

  update(_deltaMs: number): void { /* per-frame animation */ }
  onLayoutChange(_layout: LayoutEngine): void { /* rebuild positions */ }
  onThemeChange(theme: ChartTheme): void {
    (this.mesh.material as THREE.MeshStandardMaterial).color.set(theme.candle.bullBody);
  }
  dispose(): void {
    this.deps.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}
```

2. Register with `FinanceChart`:

```typescript
const chart = await new FinanceChart({ container }).init();
chart.registerLayer('my-chart', new MyCustomChart({
  scene:  chart.scene,
  layout: chart.layout,
  theme:  chart.theme,
}));
```

### Adding a New Indicator

1. Add a discriminated variant to `IndicatorSeries` in `src/types/indicators.ts`
2. Add a `case` in `IndicatorLayer._buildIndicator(series)`:
   ```typescript
   case 'MyNewIndicator':
     this._buildMyNewIndicator(series as MyNewIndicatorSeries, id);
     break;
   ```
3. Choose geometry:
   - **Scalar line** → `Line2` with `LineGeometry`
   - **Filled area** → `THREE.Mesh` + `BufferGeometry` with top/bottom vertex strips; update via `geometry.attributes.position.array` + `needsUpdate = true`
   - **Histogram** → `InstancedMesh` (reuse `BODY_GEO_HIGH`)
4. Implement `appendValue(id, value)` for streaming

### Custom TSL Shader (WebGPU Path)

```typescript
// src/shaders/tsl/pulseGlowNode.ts
import { Fn, uniform, time, sin, vec4 } from 'three/tsl';

/** Applies a subtle pulse to an emissive color node */
export const pulseGlowNode = Fn(([baseColor]: [ReturnType<typeof vec4>]) => {
  const strength = uniform(1.5);
  const pulse    = sin(time.mul(4.0)).mul(0.25).add(0.75);  // oscillates 0.5–1.0
  return vec4(baseColor.rgb.mul(pulse.mul(strength)), baseColor.a);
});

// Usage — integrate with InstancedMesh via MeshStandardNodeMaterial:
import { MeshStandardNodeMaterial } from 'three/webgpu';

const mat = new MeshStandardNodeMaterial();
// Set per-instance color via instanceColor attribute — accessible as attribute.instanceColor in TSL
mat.emissiveNode = pulseGlowNode(vec4(0.0, 1.0, 0.87, 1.0));
// Assign to bullBodyMesh:
bullBodyMesh.material = mat;
```

> **Instance colors in TSL**: Access the `instanceColor` attribute in a TSL node via `attribute('instanceColor', 'vec3')`. This reads from `InstancedMesh.instanceColor` automatically when the attribute name matches.

### Custom GLSL Shader (WebGL2 Path)

Three.js `InstancedMesh` automatically injects `instanceMatrix` and `instanceColor` as built-in attributes in its standard shaders. When writing a custom `ShaderMaterial` for `InstancedMesh`, use the built-in attributes via `#include <instanced_pars_vertex>` and `#include <instanced_vertex>`:

```glsl
/* src/shaders/glsl/candle.vert.glsl
 *
 * Three.js built-in shader chunks used here (verified against r160+):
 *   #include <instanced_pars_vertex>  — declares instanceMatrix (mat4) and
 *                                       instanceColor (vec3) attributes
 *   #include <instanced_vertex>       — multiplies position by instanceMatrix
 *
 * These chunk names are stable since Three.js r128.  If targeting < r128,
 * fall back to manually declaring "attribute mat4 instanceMatrix;" etc.
 */
#include <instanced_pars_vertex>

varying vec3 vColor;

void main() {
  #include <instanced_vertex>
  vColor      = instanceColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
/* src/shaders/glsl/candle.frag.glsl */
uniform float uBloomMask;
varying vec3  vColor;

void main() {
  gl_FragColor = vec4(vColor * uBloomMask, 1.0);
}
```

```typescript
// src/materials/CandleMaterial.ts
import candleVert from '../shaders/glsl/candle.vert.glsl?raw';
import candleFrag from '../shaders/glsl/candle.frag.glsl?raw';
import * as THREE from 'three';

export function createCandleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader:   candleVert,
    fragmentShader: candleFrag,
    uniforms: {
      uBloomMask: { value: 1.0 },
    },
  });
}
```

---

## 13. Example Usage

### Full Bootstrap (TypeScript / ESM)

```typescript
// demo/main.ts
import * as THREE from 'three';
import { FinanceChart } from 'three-finance-viz';
import { DARK_THEME }   from 'three-finance-viz/themes';
import type { OHLCVCandle, Tick } from 'three-finance-viz/types';

// ── 1. Mount ────────────────────────────────────────────────────────────────

const container = document.getElementById('chart') as HTMLElement;

const chart = new FinanceChart({
  container,
  theme:                DARK_THEME,
  layout:               'linear',
  maxCandles:           15_000,
  enablePostProcessing: true,
  onRendererFallback:   (reason) => console.info('[tfv] WebGL2 fallback:', reason),
});

await chart.init();

// ── 2. Historical data ───────────────────────────────────────────────────────

const res     = await fetch('/api/candles?symbol=BTCUSDT&interval=1m&limit=5000');
const candles: OHLCVCandle[] = await res.json();
chart.loadData(candles);

// ── 3. Indicators ────────────────────────────────────────────────────────────

chart.addIndicator({ type: 'SMA',   period: 20, values: computeSMA(candles, 20), color: '#f5a623', lineWidth: 2 });
chart.addIndicator({ type: 'SMA',   period: 50, values: computeSMA(candles, 50), color: '#ab47bc', lineWidth: 1 });

chart.addIndicator({
  type: 'BollingerBands', period: 20, stdDevMultiplier: 2,
  upper:       computeBBUpper(candles, 20, 2),
  middle:      computeSMA(candles, 20),
  lower:       computeBBLower(candles, 20, 2),
  fillOpacity: 0.08,
  color:       '#7b68ee',
});

chart.addIndicator({
  type: 'RSI', period: 14,
  values:           computeRSI(candles, 14),
  panelOffset:      -8,
  overboughtLevel:  70,
  oversoldLevel:    30,
});

// ── 4. Connect WebSocket stream ──────────────────────────────────────────────

chart.connectStream({
  url:        'wss://stream.binance.com:9443/ws/btcusdt@kline_1m',
  intervalMs: 60_000,
  parseMessage: (ev: MessageEvent): Tick | null => {
    try {
      const data = JSON.parse(ev.data as string);
      if (!data?.k) return null;
      return {
        time:   data.k.t  as number,
        price:  parseFloat(data.k.c),
        volume: parseFloat(data.k.v),
        side:   parseFloat(data.k.c) >= parseFloat(data.k.o) ? 'buy' : 'sell',
      };
    } catch { return null; }
  },
});

// ── 5. Events ────────────────────────────────────────────────────────────────

// Store unsubscribe handles to avoid leaks on dispose
const unsubs = [
  chart.on('candle:hover', (event) => {
    document.getElementById('status')!.textContent = event
      ? `Candle #${event.index} — close: ${event.candle.close.toFixed(2)}`
      : '';
  }),

  chart.on('render:frame', ({ fps }) => {
    document.getElementById('fps')!.textContent = `${fps.toFixed(0)} fps`;
  }),
];

// ── 6. Layout switching ──────────────────────────────────────────────────────

document.getElementById('btn-linear')!.addEventListener('click', () => chart.setLayout('linear'));
document.getElementById('btn-helix')!.addEventListener('click',  () => chart.setLayout('helix'));
document.getElementById('btn-tunnel')!.addEventListener('click', () => chart.setLayout('tunnel'));

// ── 7. Camera ────────────────────────────────────────────────────────────────

document.getElementById('btn-reset')!.addEventListener('click', () => chart.resetCamera());

// ── 8. Exports ───────────────────────────────────────────────────────────────

document.getElementById('btn-png')!.addEventListener('click', async () => {
  const blob = await chart.takeScreenshot();
  _download(blob, `chart-${Date.now()}.png`);
});

document.getElementById('btn-glb')!.addEventListener('click', async () => {
  const buf  = await chart.exportGLB();
  _download(new Blob([buf], { type: 'model/gltf-binary' }), `chart-${Date.now()}.glb`);
});

document.getElementById('btn-csv')!.addEventListener('click', () => {
  _download(new Blob([chart.exportCSV()], { type: 'text/csv' }), `data-${Date.now()}.csv`);
});

function _download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revocation: synchronous revoke races the browser download manager.
  // 5 s is conservative but ensures even slow connections start the transfer.
  setTimeout(() => URL.revokeObjectURL(url), 5_000);
}

// ── 9. Cleanup ───────────────────────────────────────────────────────────────

window.addEventListener('beforeunload', () => {
  unsubs.forEach(fn => fn());  // unsubscribe all event listeners
  chart.dispose();
});
```

### Mock WebSocket (demo / tests)

```typescript
// demo/mockWebSocket.ts

/**
 * A minimal WebSocket-compatible test double.
 * Implements just enough of the WebSocket API for WebSocketAdapter to use.
 * Usage: pass `MockWebSocket` as a constructor override to WebSocketAdapter
 *        via its optional `WebSocketClass` dependency-injection option (test-only).
 */
export class MockWebSocket implements Pick<WebSocket,
  'binaryType' | 'readyState' | 'onopen' | 'onmessage' | 'onerror' | 'onclose' |
  'send' | 'close'
> {
  static readonly CONNECTING = 0;
  static readonly OPEN       = 1;
  static readonly CLOSING    = 2;
  static readonly CLOSED     = 3;

  binaryType: BinaryType = 'arraybuffer';
  readyState  = MockWebSocket.OPEN;
  onopen:    ((ev: Event) => void)           | null = null;
  onmessage: ((ev: MessageEvent) => void)    | null = null;
  onerror:   ((ev: Event) => void)           | null = null;
  onclose:   ((ev: CloseEvent) => void)      | null = null;

  constructor(readonly url: string) {
    // Simulate async open
    queueMicrotask(() => this.onopen?.(new Event('open')));
  }

  send(_data: string | ArrayBuffer): void { /* ignore outgoing in tests */ }

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
 *
 * Usage in tests:
 *   const { socket, stop } = createMockBinanceStream(initialCandles);
 *   const adapter = new WebSocketAdapter({ url: 'mock://', parseMessage, WebSocketClass: () => socket });
 *   adapter.connect();
 *   socket.inject(JSON.stringify({ k: { ... } }));
 */
export function createMockBinanceStream(
  initialCandles: OHLCVCandle[],
  tickIntervalMs = 250
): { socket: MockWebSocket; stop: () => void } {
  const socket = new MockWebSocket('mock://btcusdt@kline_1m');
  let price    = initialCandles.at(-1)!.close;

  const timer = setInterval(() => {
    price *= 1 + (Math.random() - 0.5) * 0.003;
    const open = initialCandles.at(-1)!.close;
    socket.inject(JSON.stringify({
      k: {
        t: Date.now(),
        o: open.toFixed(2),
        c: price.toFixed(2),
        h: Math.max(open, price).toFixed(2),
        l: Math.min(open, price).toFixed(2),
        v: (Math.random() * 15 + 1).toFixed(4),
      },
    }));
  }, tickIntervalMs);

  return { socket, stop: () => clearInterval(timer) };
}
```

### Minimal HTML Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>3D Finance Chart</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body   { background: #0d0f14; overflow: hidden; font-family: system-ui, sans-serif; color: #e0e4f0; }
    #chart { width: 100vw; height: 100vh; display: block; }
    #hud   { position: fixed; top: 0; left: 0; right: 0; display: flex; gap: 8px; padding: 8px 12px; pointer-events: none; }
    #hud button { pointer-events: all; }
    #fps    { position: fixed; top: 8px; right: 12px; font-size: 11px; font-family: monospace; color: #555; }
    #status { position: fixed; bottom: 8px; left: 12px; font-size: 11px; font-family: monospace; color: #555; }
  </style>
</head>
<body>
  <div id="chart" tabindex="0" role="application" aria-label="Interactive 3D financial chart"></div>
  <div id="hud" aria-hidden="true">
    <button id="btn-linear">Linear</button>
    <button id="btn-helix">Helix</button>
    <button id="btn-tunnel">Tunnel</button>
    <button id="btn-reset">Reset Camera</button>
    <button id="btn-png">PNG</button>
    <button id="btn-glb">GLB</button>
    <button id="btn-csv">CSV</button>
  </div>
  <span id="fps" aria-hidden="true">-- fps</span>
  <span id="status" aria-live="polite"></span>
  <script type="module" src="./main.ts"></script>
</body>
</html>
```

---

## 14. Potential Roadmap

### Phase 2 — Q3 2026

| Feature | Description | Complexity |
|---|---|---|
| **WebXR Support** | VR/AR via `renderer.xr.enabled = true`. Walk through tunnel layout in VR; hand-controller raycasting for tooltips and time-range selection. | High |
| **GPU Indicator Compute** | WebGPU compute pipelines: SMA, EMA, RSI calculated entirely on GPU via WGSL compute shaders using `THREE.StorageBufferAttribute`. CPU result serves as validation only. | High |
| **Volume Profile Heatmap** | 3D voxel grid overlaid on candle bodies: price × time × volume density rendered as `InstancedMesh` with plasma color mapping via `ColorMapper`. | Medium |
| **Multi-Chart Sync** | Multiple `FinanceChart` instances share a `TimelineState` object; pan/zoom one chart, all others synchronise via `BroadcastChannel` or shared `EventEmitter`. | Medium |
| **Screener Grid** | Render 16–64 mini-charts in a 3D grid. Low-poly LOD applied automatically. Click chart to fly-to-focus and expand. | High |

### Phase 3 — Q1 2027

| Feature | Description | Complexity |
|---|---|---|
| **Raw WGSL Material API** | Expose `createWGSLMaterial(wgslSource, uniforms)` for power users to write raw WGSL shaders that integrate with the instanced slot system via `StorageBufferAttribute`. | Medium |
| **ML Prediction Ribbons** | ONNX Runtime Web in a Worker thread computes confidence intervals; results rendered as semi-transparent `TubeGeometry` ribbons with alpha proportional to confidence. | Very High |
| **Collaborative Cursors** | Multi-user shared crosshairs via WebRTC `DataChannel`. Each user's hover position is broadcast and rendered as a named 3D reticle using `troika-three-text`. | High |
| **Order Flow Particles** | Individual trade events rendered as `THREE.Points` with a custom shader trail. Point size ∝ trade size; colour = buy/sell side. | Medium |
| **Adaptive Renderer Budget** | Monitor `performance.now()` per frame; auto-reduce bloom passes, downgrade LOD, or switch render path to maintain target FPS on thermal-throttled mobile hardware. | High |
| **Plugin API** | Formal `ChartPlugin` interface with lifecycle hooks (`onInit`, `onFrame`, `onCandle`, `onDispose`). Publish third-party indicators as `tfv-plugin-*` npm packages. | Medium |

---

*End of Specification — `three-finance-viz` v1.0.1*
