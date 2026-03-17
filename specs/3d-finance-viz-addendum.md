# Three.js Financial Visualization Library — Technical Specification Addendum

**Version**: 2.0-addendum | **Date**: March 2026 | **Target**: r170+ / WebGPU-enabled environments

---

## 1. Addendum Overview

This document extends the base implementation (v1.0) — which established InstancedMesh candlesticks, volume bars, multi-layout rendering, WebGPURenderer with WebGL2 fallback, basic OrbitControls, and post-processing — with the production-critical surface layer that transforms a functional 3D chart into a usable financial instrument.

**What this addendum adds**:

- A spatial axes and grid system that remains readable across all zoom levels and layout modes
- Performant text rendering for 100–500+ dynamic financial labels via Troika-three-text
- A modular technical indicators engine (SMA, EMA, Bollinger Bands, RSI, MACD) with 3D geometry representations and live parameter reactivity
- A full HTML/CSS settings panel with two-way binding to chart state
- A crosshair system with live OHLCV + indicator readouts synced to 3D raycasting
- Hover tooltips anchored to 3D world positions projected to screen space
- Data lifecycle management for interval switching and time-range navigation with streaming continuity

**Why these features are non-negotiable for production**:

Without labeled axes, users cannot read prices or timestamps — the visualization is aesthetically impressive but analytically useless. Without indicators, traders lack the computational overlays they rely on for decisions. Without interactive readouts, mouse position carries no information. Without a settings panel, the chart cannot be driven from the UI. These features collectively cross the threshold from tech demo to deployable product.

**Relationship to v1.0**: Nothing in v1.0 is removed or structurally changed. All new systems attach to the existing `ChartController` via event bus hooks and render-loop callbacks. The integration surface is minimal and explicit.

---

## 2. Updated Tech Stack Additions

| Package | Version | Purpose | CDN/NPM |
|---|---|---|---|
| `troika-three-text` | `0.52.x` | GPU-accelerated SDF text rendering in 3D | npm |
| `lil-gui` | `0.20.x` | Lightweight dat.GUI successor for debug/settings panels | npm |
| `d3-time-format` | `3.1.x` | Time tick label formatting (already in d3, use submodule) | npm (submodule) |
| `@tweenjs/tween.js` | `23.x` | Smooth camera/animation transitions on data switches | npm |
| `three` | `r170` | Base — WebGPU TSL nodes, WebGL2 fallback | npm |
| `three/addons` | `r170` | CSS3DRenderer (fallback), LineMaterial, Line2, LineGeometry | npm |

**Version pinning rationale**:
- `troika-three-text@0.52.x` supports Three.js r165–r175 material system including WebGPU NodeMaterial paths. Pin the minor; do not use `latest`.
- `lil-gui@0.20.x` drops legacy IE support and adds folder collapse persistence via `localStorage` — critical for UX continuity across reloads.
- `Line2` / `LineGeometry` from `three/addons` is required for indicators — native `THREE.Line` does not support configurable linewidth on WebGL2+ and is single-pixel only.

**Do not add**:
- React, Vue, or any framework component library — the UI panel is vanilla HTML/CSS
- `chart.js`, `plotly`, or any 2D charting library — all rendering stays in Three.js
- A full `d3` import — use only `d3-scale`, `d3-time`, `d3-time-format` as needed (already scoped in v1.0)

---

## 3. Extended Data Model

### 3.1 Existing Interfaces (reference, unchanged)

```typescript
interface OHLCV {
  timestamp: number; // Unix ms UTC
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
```

### 3.2 New: Shared Type Definitions

These types are referenced throughout this addendum. `EventBus` and `ScaleSet` are defined in v1.0; they are reproduced here for reference.

```typescript
// From v1.0 — reproduced for reference
type LayoutMode = 'Linear' | 'Helix' | 'Tunnel';

interface ScaleSet {
  price:        (value: number) => number;         // data → world Y
  priceInverse: (worldY: number) => number;        // world Y → data
  priceHeight:  (dataHeight: number) => number;    // data delta → world delta
  time:         { domain: (d: [number, number]) => void };
  volume:       { domain: (d: [number, number]) => void };
}

// EventBus from v1.0 — new events added in §10.2
interface EventBus {
  on(event: string, handler: (...args: any[]) => void): void;
  off(event: string, handler: (...args: any[]) => void): void;
  emit(event: string, payload?: any): void;
}

// Constants from v1.0 — used in geometry sections below
// GRID_X_MIN, GRID_X_MAX   — world-space X bounds of the chart grid
// CANDLE_WIDTH, CANDLE_DEPTH — InstancedMesh candle body dimensions
// BULL_COLOR, BEAR_COLOR    — THREE.Color instances for candle coloring
// REFERENCE_DISTANCE        — baseline camera distance for zoom normalization
// (All defined in src/chart/constants.ts from v1.0)
```

### 3.3 New: Indicator Configuration

```typescript
type IndicatorType = 'SMA' | 'EMA' | 'BB' | 'RSI' | 'MACD';
type PriceSource = 'close' | 'open' | 'high' | 'low' | 'hl2' | 'ohlc4';

interface BaseIndicatorConfig {
  id: string;              // Unique: 'sma_20', 'bb_20_2'
  type: IndicatorType;
  enabled: boolean;
  color: string;           // Hex: '#ff6600'
  opacity: number;         // 0–1
  lineWidth: number;       // For Line2, world-space pixels: 1–8
}

interface SMAConfig extends BaseIndicatorConfig {
  type: 'SMA';
  period: number;          // 5–500
  source: PriceSource;
}

interface EMAConfig extends BaseIndicatorConfig {
  type: 'EMA';
  period: number;
  source: PriceSource;
}

interface BollingerConfig extends BaseIndicatorConfig {
  type: 'BB';
  period: number;          // 20 default
  stdDev: number;          // 2 default
  source: PriceSource;
  showMid: boolean;        // Show SMA midline
  bandOpacity: number;     // Fill tube/ribbon opacity: 0–0.4
}

interface RSIConfig extends BaseIndicatorConfig {
  type: 'RSI';
  period: number;          // 14 default
  source: PriceSource;
  overbought: number;      // 70
  oversold: number;        // 30
  subView: boolean;        // If true, render in sub-panel; if false, overlay in main scene
}

interface MACDConfig extends BaseIndicatorConfig {
  type: 'MACD';
  fastPeriod: number;      // 12
  slowPeriod: number;      // 26
  signalPeriod: number;    // 9
  source: PriceSource;
  subView: boolean;
}

type IndicatorConfig = SMAConfig | EMAConfig | BollingerConfig | RSIConfig | MACDConfig;
```

### 3.4 New: UI State

```typescript
interface UIState {
  symbol: string;                  // 'BTCUSDT'
  interval: string;                // '1h'
  layoutMode: LayoutMode;
  theme: 'dark' | 'light';
  visibleRange: VisibleRange;
  indicators: IndicatorConfig[];
  paletteOverrides: Partial<ThemePalette>;
  crosshairEnabled: boolean;
  tooltipsEnabled: boolean;
}

interface VisibleRange {
  startIndex: number;              // Candle index into full data array
  endIndex: number;                // Inclusive
  startTime: number;               // Unix ms (derived from index)
  endTime: number;                 // Unix ms
  priceMin: number;                // Visible Y floor
  priceMax: number;                // Visible Y ceiling
  volumeMax: number;               // Visible Z max for volume scaling
}

interface ThemePalette {
  background: string;
  gridLines: string;
  axisLabels: string;
  bullCandle: string;
  bearCandle: string;
  wick: string;
  volume: string;
  crosshair: string;
}
```

### 3.5 New: Indicator Value Cache

```typescript
interface IndicatorValueMap {
  [indicatorId: string]: (number | null)[];  // Indexed aligned to OHLCV array
}

// For MACD which produces multiple series:
interface MACDValues {
  macd: (number | null)[];
  signal: (number | null)[];
  histogram: (number | null)[];
}
```

---

## 4. New Architecture Components

### 4.1 Component Responsibilities

```
ChartController (existing)
├── AxisManager          ← NEW: 3D grid + tick geometry, label sync
├── LabelSystem          ← NEW: Troika text pool, LOD, camera-facing
│   └── TroikaLabelPool  (implementation class)
├── IndicatorManager     ← NEW: Calculator + renderer per indicator
│   ├── LineIndicatorRenderer   (SMA, EMA, midline)
│   ├── BandIndicatorRenderer   (Bollinger tube/ribbon)
│   └── SubViewRenderer         (RSI, MACD panel geometry)
├── UIController         ← NEW: Settings panel, event bus bridge
│   ├── SettingsPanel    (HTML/CSS overlay)
│   └── LilGuiAdapter    (optional dev overlay)
├── TooltipSystem        ← NEW: Raycaster, CSS overlay, readout state
│   ├── CrosshairManager (line geometry + projected label)
│   └── HoverTooltip     (HTML element, 3D→2D projection)
└── DataManager (existing, extended)
    └── RangeController  ← NEW: Navigator math, interval switching
```

### 4.2 Public APIs

#### `AxisManager`

```typescript
class AxisManager {
  constructor(scene: THREE.Scene, scales: ScaleSet, config: AxisConfig): void;

  // Called after zoom/pan, updates tick positions and label values.
  // tickOptions is optional — omit to use defaults based on canvas size.
  update(
    visibleRange: VisibleRange,
    camera: THREE.Camera,
    tickOptions?: { priceTickCount?: number; timeTickCount?: number }
  ): void;

  // Rebuild everything — called on interval change or layout switch
  rebuild(layoutMode: LayoutMode): void;

  // Set theme colors without geometry rebuild
  setTheme(palette: ThemePalette): void;

  dispose(): void;
}
```

#### `LabelSystem` / `TroikaLabelPool`

The architecture references `LabelSystem` as the component name; `TroikaLabelPool` is the implementation class. They are the same thing — `LabelSystem` is the logical name used in component diagrams; `TroikaLabelPool` is the class name in source.

```typescript
// src/labels/TroikaLabelPool.ts  (exposed as LabelSystem at ChartController level)
class TroikaLabelPool {
  constructor(scene: THREE.Scene, maxLabels: number): void;

  // Acquire/release from pool — returns null if pool is exhausted
  acquire(id: string, text: string, position: THREE.Vector3): TroikaText | null;
  release(id: string): void;
  releaseAll(): void;

  // Camera-facing sync — call each frame
  syncBillboards(camera: THREE.Camera): void;

  setFont(fontUrl: string): void;
  dispose(): void;
}
```

#### `IndicatorManager`

```typescript
class IndicatorManager {
  constructor(
    scene: THREE.Scene,
    dataRef: OHLCV[],
    scales: ScaleSet,
    positionFn: (i: number) => THREE.Vector3,
    renderer: THREE.WebGLRenderer
  ): void;

  add(config: IndicatorConfig): void;
  remove(id: string): void;
  update(id: string, partialConfig: Partial<IndicatorConfig>): void;
  toggle(id: string, enabled: boolean): void;

  // Called when data array changes (new candle or rebuild)
  onDataUpdate(newData: OHLCV[], changedIndices?: number[]): void;

  // Called each frame for streaming partial updates
  onStreamTick(index: number, candle: OHLCV): void;

  getValueAt(id: string, index: number): number | null;

  // Render RSI/MACD sub-panels — call after main scene render
  renderSubViews(renderer: THREE.WebGLRenderer): void;

  onResize(resolution: THREE.Vector2): void;
  dispose(): void;
}
```

#### `UIController`

```typescript
class UIController {
  constructor(container: HTMLElement, chartState: UIState, eventBus: EventBus): void;

  // Force a UI re-render from external state change
  syncFromState(state: Partial<UIState>): void;

  // Show/hide panel (keyboard shortcut, mobile toggle)
  togglePanel(visible?: boolean): void;

  on(event: string, handler: Function): void;
  dispose(): void;
}
```

#### `TooltipSystem`

```typescript
class TooltipSystem {
  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    dataRef: OHLCV[],
    indicatorManager: IndicatorManager,
    labelPool: TroikaLabelPool,
    scales: ScaleSet,
    positionFn: (i: number) => THREE.Vector3
  ): void;

  // Self-registers mousemove/mouseleave on renderer.domElement
  onMouseMove(event: MouseEvent): void;

  // Update crosshair geometry to match current candle index
  setCrosshairIndex(index: number): void;

  setEnabled(enabled: boolean): void;
  dispose(): void;
}
```

---

## 5. Axes & Grid + Labeling System

### 5.1 Axis Architecture

The axes system has three logical axes mapped to 3D space according to layout mode:

| Axis | Data dimension | 3D direction (Linear) | Notes |
|---|---|---|---|
| X | Time / candle index | +X world | Wraps in Helix/Tunnel |
| Y | Price | +Y world | Always vertical |
| Z | Volume | +Z world | Depth in Linear, radial in Helix |

**Geometry representation**:
- Main axis lines: `THREE.Line` with `LineBasicMaterial` (these are single-pixel — acceptable for axis spine)
- Grid plane: `THREE.GridHelper` subclass with custom tick alignment, OR custom `BufferGeometry` line segments for full control
- Custom `BufferGeometry` is preferred — it allows per-tick color/opacity variation (major vs. minor ticks)

### 5.2 Tick Generation Logic

```typescript
// Price axis (Y) — generate N ticks covering visible price range
function generatePriceTicks(
  priceMin: number,
  priceMax: number,
  targetCount: number = 8  // adaptive to canvas height
): PriceTick[] {
  const range = priceMax - priceMin;
  // Nice round step using d3-scale logic
  const rawStep = range / targetCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = Math.ceil(rawStep / magnitude) * magnitude;

  const first = Math.ceil(priceMin / step) * step;
  const ticks: PriceTick[] = [];
  for (let val = first; val <= priceMax; val += step) {
    ticks.push({ value: val, world_y: priceScale(val) });
  }
  return ticks;
}

// Time axis (X) — use d3-time for human-readable intervals
function generateTimeTicks(
  startTime: number,
  endTime: number,
  interval: string,         // chart interval '1h', '1D', etc.
  maxCount: number = 12
): TimeTick[] {
  // Select appropriate d3-time interval
  const d3Interval = selectD3TimeInterval(interval, endTime - startTime);
  const ticks = d3Interval.range(new Date(startTime), new Date(endTime));
  // Thin to maxCount
  const stride = Math.ceil(ticks.length / maxCount);
  return ticks
    .filter((_, i) => i % stride === 0)
    .map(d => ({ date: d, world_x: timeScale(d.getTime()) }));
}
```

### 5.3 Grid Geometry Update

Rather than rebuilding `BufferGeometry` every frame, maintain a fixed maximum buffer and update only the `position` attribute:

```typescript
class GridGeometryManager {
  private readonly MAX_LINES = 64;
  private geometry: THREE.BufferGeometry;
  private posAttr: THREE.BufferAttribute;

  constructor() {
    // Pre-allocate: 64 lines × 2 endpoints × 3 components
    const positions = new Float32Array(this.MAX_LINES * 2 * 3);
    this.posAttr = new THREE.BufferAttribute(positions, 3);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', this.posAttr);
  }

  updateTicks(ticks: Array<{ worldPos: number; axis: 'x' | 'y' | 'z' }>): void {
    const pos = this.posAttr.array as Float32Array;
    let i = 0;

    for (const tick of ticks) {
      if (i >= this.MAX_LINES) break;
      const base = i * 6; // 2 vertices × 3 components
      // Write line segment endpoints
      if (tick.axis === 'y') {
        pos[base]     = GRID_X_MIN; pos[base+1] = tick.worldPos; pos[base+2] = 0;
        pos[base+3]   = GRID_X_MAX; pos[base+4] = tick.worldPos; pos[base+5] = 0;
      }
      // ... x and z variants
      i++;
    }

    this.posAttr.needsUpdate = true;
    this.geometry.setDrawRange(0, i * 2);
  }
}
```

**Key**: `setDrawRange` masks unused pre-allocated segments from the renderer. No garbage collection pressure.

### 5.4 Troika-three-text Integration

#### Installation and setup

```typescript
import { Text as TroikaText, preloadFont } from 'troika-three-text';

// Preload font once at app init — prevents frame stutter on first render
preloadFont(
  { font: '/fonts/RobotoMono-Regular.woff', characters: '0123456789.,+-KMBGTSMAEOD %:/' },
  () => console.log('Font preloaded')
);
```

#### Label Pool

Creating and destroying `TroikaText` objects is expensive (SDF atlas operations). Use a fixed pool:

```typescript
class TroikaLabelPool {
  private pool: TroikaText[] = [];
  private active: Map<string, TroikaText> = new Map();
  // Track which active labels have pending text changes (dirty flag)
  private dirty: Set<string> = new Set();
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, maxLabels: number) {
    this.scene = scene;
    // Pre-create all instances
    for (let i = 0; i < maxLabels; i++) {
      const t = new TroikaText();
      t.font = '/fonts/RobotoMono-Regular.woff';
      t.fontSize = 0.4;
      t.color = 0xaaaaaa;
      t.anchorX = 'center';
      t.anchorY = 'middle';
      t.visible = false;
      t.depthOffset = -1;      // Prevent z-fighting with grid
      t.renderOrder = 10;
      scene.add(t);
      this.pool.push(t);
    }
  }

  acquire(id: string, text: string, position: THREE.Vector3): TroikaText | null {
    let label = this.active.get(id);
    if (!label) {
      if (this.pool.length === 0) {
        console.warn('TroikaLabelPool: pool exhausted — increase maxLabels');
        return null;
      }
      label = this.pool.pop()!;
      this.active.set(id, label);
    }
    if (label.text !== text) {
      label.text = text;
      this.dirty.add(id);      // Mark dirty — sync deferred to syncAll()
    }
    label.position.copy(position);
    label.visible = true;
    return label;
  }

  release(id: string): void {
    const label = this.active.get(id);
    if (label) {
      label.visible = false;
      this.pool.push(label);
      this.active.delete(id);
      this.dirty.delete(id);
    }
  }

  releaseAll(): void {
    for (const id of [...this.active.keys()]) {
      this.release(id);
    }
  }

  // Call once per frame — batch sync all dirty labels only.
  // Uses an explicit dirty flag rather than accessing Troika private internals.
  syncAll(): void {
    for (const id of this.dirty) {
      const label = this.active.get(id);
      if (label) label.sync();
    }
    this.dirty.clear();
  }

  // Camera-facing sync — call each frame for billboard labels
  syncBillboards(camera: THREE.Camera): void {
    for (const [, label] of this.active) {
      if (label.visible) label.quaternion.copy(camera.quaternion);
    }
  }

  setFont(fontUrl: string): void {
    for (const label of [...this.pool, ...this.active.values()]) {
      label.font = fontUrl;
    }
  }

  dispose(): void {
    for (const label of [...this.pool, ...this.active.values()]) {
      this.scene.remove(label);
      label.dispose();
    }
    this.pool.length = 0;
    this.active.clear();
    this.dirty.clear();
  }
}
```

> **Note on `syncAll()`**: The original draft accessed `label._textNeedsUpdate`, a private Troika internal. This implementation uses an explicit `dirty: Set<string>` instead — set in `acquire()` when text changes, cleared after `sync()`. This is safe across Troika version updates.

#### Label density / LOD strategy

- **Price labels**: always show, max 10 visible simultaneously
- **Time labels**: thin dynamically — at `zoom < 0.3` show only daily labels; at `zoom > 3.0` show per-candle labels
- **Culling**: test label world position against camera frustum via `THREE.Frustum` before `acquire()` — skip off-screen labels entirely
- **Billboard rotation**: price/time axis labels are aligned to axes, not billboarded — they are tilted 90° or angled toward the camera. Only tooltip readout labels are fully billboarded.

```typescript
// Sync label rotation to face camera on non-billboard labels
function alignLabelToAxis(label: TroikaText, axis: 'x' | 'y', camera: THREE.Camera): void {
  if (axis === 'y') {
    // Price labels: face camera but stay upright
    label.quaternion.copy(camera.quaternion);
    label.rotation.z = 0; // Lock roll
  } else {
    // Time labels: tilt 45° downward, face camera yaw only
    const yaw = Math.atan2(
      camera.position.x - label.position.x,
      camera.position.z - label.position.z
    );
    label.rotation.set(-Math.PI / 6, yaw, 0);
  }
}
```

### 5.5 Adaptive Density on Zoom/Pan

Hook into `OrbitControls` `change` event:

```typescript
controls.addEventListener('change', () => {
  const distance = camera.position.distanceTo(controls.target);
  const zoomFactor = REFERENCE_DISTANCE / distance;

  // Scale target tick count with zoom
  const priceTickCount = Math.max(4, Math.min(16, Math.round(8 * zoomFactor)));
  const timeTickCount  = Math.max(4, Math.min(24, Math.round(12 * zoomFactor)));

  axisManager.update(visibleRange, camera, { priceTickCount, timeTickCount });
});
```

Throttle this callback with a 50ms debounce — `OrbitControls` fires `change` on every animation frame during interaction.

---

## 6. Indicators Extension

### 6.1 Calculator Layer (pure math, no Three.js)

```typescript
// src/indicators/calculators.ts
// All functions are pure — no side effects, no scene references

export function calcSMA(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  if (period > values.length) return result;

  let sum = 0;
  for (let i = 0; i < period - 1; i++) sum += values[i];

  for (let i = period - 1; i < values.length; i++) {
    sum += values[i];
    result[i] = sum / period;
    sum -= values[i - period + 1];
  }
  return result;
}

export function calcEMA(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  const k = 2 / (period + 1);
  let prev: number | null = null;

  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) continue;
    if (prev === null) {
      // Seed with SMA of first `period` values
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += values[j];
      prev = sum / period;
    } else {
      prev = values[i] * k + prev * (1 - k);
    }
    result[i] = prev;
  }
  return result;
}

export interface BBResult {
  mid:   (number | null)[];
  upper: (number | null)[];
  lower: (number | null)[];
}

export function calcBollingerBands(
  values: number[],
  period: number,
  stdDevMultiplier: number
): BBResult {
  const mid   = calcSMA(values, period);
  const upper = new Array(values.length).fill(null) as (number | null)[];
  const lower = new Array(values.length).fill(null) as (number | null)[];

  for (let i = period - 1; i < values.length; i++) {
    const slice = values.slice(i - period + 1, i + 1);
    const mean  = mid[i] as number;
    const variance = slice.reduce((acc, v) => acc + (v - mean) ** 2, 0) / period;
    const sd = Math.sqrt(variance);
    upper[i] = mean + stdDevMultiplier * sd;
    lower[i] = mean - stdDevMultiplier * sd;
  }
  return { mid, upper, lower };
}

export function calcRSI(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  // Need at least period+1 values: period differences to seed, then period index for first result
  if (values.length < period + 1) return result;

  // Seed: average gain/loss over the first `period` differences (indices 1..period)
  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const diff = values[i] - values[i - 1];
    if (diff > 0) avgGain += diff; else avgLoss -= diff;
  }
  avgGain /= period;
  avgLoss /= period;

  // First RSI result at index `period` uses the seeded averages directly
  // (Wilder smoothing applied from index `period+1` onward)
  for (let i = period; i < values.length; i++) {
    if (i > period) {
      const diff = values[i] - values[i - 1];
      const gain = diff > 0 ? diff : 0;
      const loss = diff < 0 ? -diff : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    result[i] = 100 - 100 / (1 + rs);
  }
  return result;
}

export interface MACDResult {
  macd:      (number | null)[];
  signal:    (number | null)[];
  histogram: (number | null)[];
}

export function calcMACD(
  values: number[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number
): MACDResult {
  const fast = calcEMA(values, fastPeriod);
  const slow = calcEMA(values, slowPeriod);

  const macd: (number | null)[] = values.map((_, i) => {
    return fast[i] !== null && slow[i] !== null
      ? (fast[i] as number) - (slow[i] as number)
      : null;
  });

  // Find first valid MACD index to avoid zero-fill distortion on the signal EMA.
  // Zero-filling nulls and seeding signal EMA from index 0 would produce a
  // distorted signal line for the first ~signalPeriod bars.
  const firstValid = macd.findIndex(v => v !== null);
  if (firstValid === -1) {
    const nullArray = macd.map(() => null);
    return { macd, signal: nullArray, histogram: nullArray };
  }

  // Pass only the valid portion to calcEMA, then re-align to original length
  const macdTrimmed = macd.slice(firstValid) as number[];
  const signalTrimmed = calcEMA(macdTrimmed, signalPeriod);
  const signal: (number | null)[] = [
    ...new Array(firstValid).fill(null),
    ...signalTrimmed,
  ];

  const histogram: (number | null)[] = macd.map((v, i) =>
    v !== null && signal[i] !== null ? v - (signal[i] as number) : null
  );

  return { macd, signal, histogram };
}

// Extract price source from OHLCV
export function extractSource(candles: OHLCV[], source: PriceSource): number[] {
  return candles.map(c => {
    switch (source) {
      case 'open':  return c.open;
      case 'high':  return c.high;
      case 'low':   return c.low;
      case 'hl2':   return (c.high + c.low) / 2;
      case 'ohlc4': return (c.open + c.high + c.low + c.close) / 4;
      default:      return c.close;
    }
  });
}
```

### 6.2 Line Indicator Renderer

Uses `Line2` / `LineGeometry` from `three/addons` for configurable width:

```typescript
// src/indicators/LineIndicatorRenderer.ts
import { Line2 }         from 'three/addons/lines/Line2.js';
import { LineGeometry }  from 'three/addons/lines/LineGeometry.js';
import { LineMaterial }  from 'three/addons/lines/LineMaterial.js';

export class LineIndicatorRenderer {
  private line: Line2;
  private geometry: LineGeometry;
  private material: LineMaterial;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, config: SMAConfig | EMAConfig, resolution: THREE.Vector2) {
    this.scene = scene;
    this.geometry = new LineGeometry();

    this.material = new LineMaterial({
      color:       new THREE.Color(config.color),
      linewidth:   config.lineWidth,  // World pixels, not CSS pixels
      transparent: config.opacity < 1,
      opacity:     config.opacity,
      resolution,  // MUST match renderer size — update on resize
      depthTest:   true,
      depthWrite:  false,
    });

    this.line = new Line2(this.geometry, this.material);
    this.line.renderOrder = 5;
    this.line.visible = config.enabled;
    this.line.name = `indicator_${config.id}`;
    scene.add(this.line);
  }

  // Full rebuild — call when data changes or period changes
  rebuild(
    values: (number | null)[],
    scales: ScaleSet,
    positionFn: (index: number) => THREE.Vector3
  ): void {
    const positions: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i] === null) continue;
      const worldPos = positionFn(i);
      const worldY   = scales.price(values[i] as number);
      positions.push(worldPos.x, worldY, worldPos.z);
    }

    if (positions.length < 6) {
      this.line.visible = false;
      return;
    }

    this.geometry.setPositions(positions);
    this.line.computeLineDistances();
    this.line.visible = true;
  }

  update(partialConfig: Partial<BaseIndicatorConfig>): void {
    if (partialConfig.color !== undefined)
      this.material.color.set(partialConfig.color);
    if (partialConfig.lineWidth !== undefined)
      this.material.linewidth = partialConfig.lineWidth;
    if (partialConfig.opacity !== undefined)
      this.material.opacity = partialConfig.opacity;
    if (partialConfig.enabled !== undefined)
      this.line.visible = partialConfig.enabled;
  }

  onResize(resolution: THREE.Vector2): void {
    this.material.resolution.copy(resolution);
  }

  dispose(): void {
    this.scene.remove(this.line);
    this.geometry.dispose();
    this.material.dispose();
  }
}
```

### 6.3 Bollinger Band Renderer

Bollinger Bands require both line edges and a filled semi-transparent ribbon:

```typescript
export class BandIndicatorRenderer {
  private upperLine: Line2;
  private lowerLine: Line2;
  private midLine:   Line2 | null = null;
  private bandMesh:  THREE.Mesh;
  private bandGeom:  THREE.BufferGeometry;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, config: BollingerConfig, resolution: THREE.Vector2) {
    this.scene = scene;

    const lineMat = (color: string) => new LineMaterial({
      color: new THREE.Color(color),
      linewidth: config.lineWidth,
      transparent: true,
      opacity: config.opacity,
      resolution,
      depthWrite: false,
    });

    this.upperLine = new Line2(new LineGeometry(), lineMat(config.color));
    this.lowerLine = new Line2(new LineGeometry(), lineMat(config.color));
    if (config.showMid) {
      this.midLine = new Line2(new LineGeometry(), lineMat('#888888'));
    }

    // Filled ribbon between upper and lower bands.
    // renderOrder=1 (below candles at 2), depthWrite=false (ribbon never
    // occludes candle bodies in the depth buffer), DoubleSide ensures
    // visibility from any camera angle.
    this.bandGeom = new THREE.BufferGeometry();
    const bandMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(config.color),
      transparent: true,
      opacity: config.bandOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.bandMesh = new THREE.Mesh(this.bandGeom, bandMat);
    this.bandMesh.renderOrder = 1;  // Before candles (renderOrder 2) — transparency sort

    scene.add(this.upperLine, this.lowerLine, this.bandMesh);
    if (this.midLine) scene.add(this.midLine);
  }

  rebuild(bbResult: BBResult, scales: ScaleSet, positionFn: (i: number) => THREE.Vector3): void {
    const upperPos: number[] = [];
    const lowerPos: number[] = [];
    const midPos:   number[] = [];
    const ribbonVerts: number[] = [];
    const ribbonIdx:   number[] = [];
    let vtxCount = 0;

    for (let i = 0; i < bbResult.upper.length; i++) {
      if (bbResult.upper[i] === null) continue;
      const base  = positionFn(i);
      const uy    = scales.price(bbResult.upper[i] as number);
      const ly    = scales.price(bbResult.lower[i] as number);
      const my    = scales.price(bbResult.mid[i]   as number);

      upperPos.push(base.x, uy, base.z);
      lowerPos.push(base.x, ly, base.z);
      midPos.push(  base.x, my, base.z);

      // Two vertices per column for ribbon quad strip
      ribbonVerts.push(base.x, uy, base.z);   // vtxCount
      ribbonVerts.push(base.x, ly, base.z);   // vtxCount + 1

      if (vtxCount >= 2) {
        const b = vtxCount;
        // Quad between column (b-2,b-1) and column (b, b+1).
        // Winding: counter-clockwise when viewed from +Z (front face).
        // DoubleSide makes winding order irrelevant for visibility.
        ribbonIdx.push(b-2, b-1, b,   b-1, b+1, b);
      }
      vtxCount += 2;
    }

    (this.upperLine.geometry as LineGeometry).setPositions(upperPos);
    (this.lowerLine.geometry as LineGeometry).setPositions(lowerPos);
    if (this.midLine) (this.midLine.geometry as LineGeometry).setPositions(midPos);

    this.bandGeom.setAttribute(
      'position', new THREE.Float32BufferAttribute(ribbonVerts, 3)
    );
    this.bandGeom.setIndex(ribbonIdx);
    this.bandGeom.computeVertexNormals();
  }

  update(partialConfig: Partial<BollingerConfig>): void {
    if (partialConfig.color !== undefined) {
      (this.upperLine.material as LineMaterial).color.set(partialConfig.color);
      (this.lowerLine.material as LineMaterial).color.set(partialConfig.color);
      (this.bandMesh.material as THREE.MeshBasicMaterial).color.set(partialConfig.color);
    }
    if (partialConfig.bandOpacity !== undefined) {
      (this.bandMesh.material as THREE.MeshBasicMaterial).opacity = partialConfig.bandOpacity;
    }
    if (partialConfig.opacity !== undefined) {
      (this.upperLine.material as LineMaterial).opacity = partialConfig.opacity;
      (this.lowerLine.material as LineMaterial).opacity = partialConfig.opacity;
    }
    if (partialConfig.enabled !== undefined) {
      this.upperLine.visible = partialConfig.enabled;
      this.lowerLine.visible = partialConfig.enabled;
      this.bandMesh.visible  = partialConfig.enabled;
      if (this.midLine) this.midLine.visible = partialConfig.enabled;
    }
  }

  onResize(resolution: THREE.Vector2): void {
    (this.upperLine.material as LineMaterial).resolution.copy(resolution);
    (this.lowerLine.material as LineMaterial).resolution.copy(resolution);
    if (this.midLine) (this.midLine.material as LineMaterial).resolution.copy(resolution);
  }

  dispose(): void {
    [this.upperLine, this.lowerLine, this.midLine, this.bandMesh]
      .filter(Boolean).forEach(obj => {
        this.scene.remove(obj!);
        (obj as any).geometry?.dispose();
        (obj as any).material?.dispose();
      });
    this.bandGeom.dispose();
  }
}
```

### 6.4 Sub-View Renderer (RSI / MACD)

RSI and MACD live in a separate 2D-projected sub-panel rendered via an orthographic camera into a scissored viewport:

```typescript
export class SubViewRenderer {
  private subCamera:   THREE.OrthographicCamera;
  private subScene:    THREE.Scene;
  private viewport:    THREE.Vector4;  // x, y, width, height in pixels
  private lines:       Map<string, Line2> = new Map();
  // Track whether reference lines have been added to avoid accumulation on rebuild
  private referenceLines: THREE.Object3D[] = [];

  constructor(renderer: THREE.WebGLRenderer, heightFraction: number = 0.2) {
    this.subScene  = new THREE.Scene();
    this.subCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.subCamera.position.z = 5;

    const h = renderer.domElement.clientHeight;
    const w = renderer.domElement.clientWidth;
    this.viewport = new THREE.Vector4(0, 0, w, Math.floor(h * heightFraction));
  }

  // Called each frame — renders sub-panel AFTER main scene render
  render(renderer: THREE.WebGLRenderer): void {
    const canvas = renderer.domElement;
    try {
      renderer.setScissorTest(true);
      renderer.setScissor(
        this.viewport.x, this.viewport.y,
        this.viewport.z, this.viewport.w
      );
      renderer.setViewport(
        this.viewport.x, this.viewport.y,
        this.viewport.z, this.viewport.w
      );
      renderer.render(this.subScene, this.subCamera);
    } finally {
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
  }

  // Clears the sub-scene content for a full rebuild.
  // Call before re-adding lines (e.g., on data update) to prevent accumulation.
  clear(): void {
    // Remove dynamically added lines and reference lines
    for (const line of this.lines.values()) {
      this.subScene.remove(line);
      (line.geometry as LineGeometry).dispose();
      (line.material as LineMaterial).dispose();
    }
    this.lines.clear();
    for (const ref of this.referenceLines) {
      this.subScene.remove(ref);
      (ref as any).geometry?.dispose();
      (ref as any).material?.dispose();
    }
    this.referenceLines = [];
  }

  addRSILine(config: RSIConfig, values: (number | null)[], visibleRange: VisibleRange): void {
    // Map RSI 0–100 to -1..+1 world space
    const positions: number[] = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      if (values[i] === null) continue;
      const nx = ((i - visibleRange.startIndex) / (visibleRange.endIndex - visibleRange.startIndex)) * 2 - 1;
      const ny = ((values[i] as number) / 100) * 2 - 1;
      positions.push(nx, ny, 0);
    }

    if (positions.length < 6) return; // Need at least 2 points for Line2

    const geom = new LineGeometry();
    geom.setPositions(positions);
    const mat = new LineMaterial({
      color: new THREE.Color(config.color),
      linewidth: 2,
      resolution: new THREE.Vector2(this.viewport.z, this.viewport.w),
    });
    const line = new Line2(geom, mat);
    this.subScene.add(line);
    this.lines.set(config.id, line);

    // Add overbought/oversold reference lines at RSI 70 and 30.
    // 70 maps to (70/100)*2-1 = 0.4, 30 maps to (30/100)*2-1 = -0.4
    this._addHorizontalReference(0.4, '#ff4444');
    this._addHorizontalReference(-0.4, '#44ff44');
  }

  private _addHorizontalReference(y: number, color: string): void {
    const geom = new LineGeometry();
    geom.setPositions([-1, y, 0, 1, y, 0]);
    const mat = new LineMaterial({
      color: new THREE.Color(color),
      linewidth: 1,
      transparent: true, opacity: 0.4,
      resolution: new THREE.Vector2(this.viewport.z, this.viewport.w),
    });
    const ref = new Line2(geom, mat);
    this.subScene.add(ref);
    this.referenceLines.push(ref);  // Track for cleanup
  }

  onResize(width: number, height: number, heightFraction: number): void {
    const subH = Math.floor(height * heightFraction);
    this.viewport.set(0, 0, width, subH);
    // Update all LineMaterial resolutions
    this.lines.forEach(line => {
      (line.material as LineMaterial).resolution.set(width, subH);
    });
    for (const ref of this.referenceLines) {
      ((ref as Line2).material as LineMaterial).resolution.set(width, subH);
    }
  }

  dispose(): void {
    this.subScene.traverse(obj => {
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) (obj as any).material.dispose();
    });
    this.lines.clear();
    this.referenceLines = [];
  }
}
```

### 6.5 IndicatorManager — Wiring It Together

```typescript
export class IndicatorManager {
  private calculatedValues: Map<string, (number | null)[]> = new Map();
  private lineRenderers:     Map<string, LineIndicatorRenderer>    = new Map();
  private bandRenderers:     Map<string, BandIndicatorRenderer>    = new Map();
  private subViewRenderer:   SubViewRenderer;
  private configs:           Map<string, IndicatorConfig>          = new Map();
  private resolution:        THREE.Vector2;

  constructor(
    private scene:    THREE.Scene,
    private data:     OHLCV[],
    private scales:   ScaleSet,
    private positionFn: (i: number) => THREE.Vector3,
    renderer: THREE.WebGLRenderer
  ) {
    this.resolution = new THREE.Vector2(
      renderer.domElement.clientWidth,
      renderer.domElement.clientHeight
    );
    this.subViewRenderer = new SubViewRenderer(renderer);
  }

  add(config: IndicatorConfig): void {
    this.configs.set(config.id, config);
    this._calculate(config);
    this._createRenderer(config);
    this._rebuild(config.id);
  }

  remove(id: string): void {
    this.lineRenderers.get(id)?.dispose();
    this.bandRenderers.get(id)?.dispose();
    this.lineRenderers.delete(id);
    this.bandRenderers.delete(id);
    this.configs.delete(id);
    // Collect keys first to avoid mutating the Map while iterating
    const keysToDelete = [...this.calculatedValues.keys()]
      .filter(key => key === id || key.startsWith(`${id}_`));
    for (const key of keysToDelete) {
      this.calculatedValues.delete(key);
    }
  }

  toggle(id: string, enabled: boolean): void {
    const config = this.configs.get(id);
    if (!config) return;
    config.enabled = enabled;
    this.lineRenderers.get(id)?.update({ enabled });
    this.bandRenderers.get(id)?.update({ enabled });
  }

  private _calculate(config: IndicatorConfig): void {
    const src = extractSource(this.data, (config as any).source ?? 'close');
    switch (config.type) {
      case 'SMA':
        this.calculatedValues.set(config.id, calcSMA(src, (config as SMAConfig).period));
        break;
      case 'EMA':
        this.calculatedValues.set(config.id, calcEMA(src, (config as EMAConfig).period));
        break;
      case 'BB': {
        const bb = config as BollingerConfig;
        const res = calcBollingerBands(src, bb.period, bb.stdDev);
        this.calculatedValues.set(`${config.id}_upper`, res.upper);
        this.calculatedValues.set(`${config.id}_lower`, res.lower);
        this.calculatedValues.set(`${config.id}_mid`,   res.mid);
        break;
      }
      case 'RSI':
        this.calculatedValues.set(config.id, calcRSI(src, (config as RSIConfig).period));
        break;
      case 'MACD': {
        const mc = config as MACDConfig;
        const res = calcMACD(src, mc.fastPeriod, mc.slowPeriod, mc.signalPeriod);
        this.calculatedValues.set(`${config.id}_macd`,      res.macd);
        this.calculatedValues.set(`${config.id}_signal`,    res.signal);
        this.calculatedValues.set(`${config.id}_histogram`, res.histogram);
        break;
      }
    }
  }

  private _createRenderer(config: IndicatorConfig): void {
    switch (config.type) {
      case 'SMA':
      case 'EMA':
        this.lineRenderers.set(
          config.id,
          new LineIndicatorRenderer(this.scene, config as SMAConfig, this.resolution)
        );
        break;
      case 'BB':
        this.bandRenderers.set(
          config.id,
          new BandIndicatorRenderer(this.scene, config as BollingerConfig, this.resolution)
        );
        break;
      // RSI and MACD renderers are managed by SubViewRenderer
    }
  }

  private _rebuild(id: string): void {
    const config = this.configs.get(id)!;
    if (config.type === 'SMA' || config.type === 'EMA') {
      const renderer = this.lineRenderers.get(id)!;
      const values   = this.calculatedValues.get(id)!;
      renderer.rebuild(values, this.scales, this.positionFn);
    } else if (config.type === 'BB') {
      const renderer = this.bandRenderers.get(id)!;
      const bb: BBResult = {
        upper: this.calculatedValues.get(`${id}_upper`) as (number|null)[],
        lower: this.calculatedValues.get(`${id}_lower`) as (number|null)[],
        mid:   this.calculatedValues.get(`${id}_mid`)   as (number|null)[],
      };
      renderer.rebuild(bb, this.scales, this.positionFn);
    }
    // RSI/MACD sub-view rebuild is handled by callers that also pass visibleRange
  }

  update(id: string, partialConfig: Partial<IndicatorConfig>): void {
    const existing = this.configs.get(id);
    if (!existing) return;
    Object.assign(existing, partialConfig);

    // If period/source changed — recalculate and rebuild geometry
    if ('period' in partialConfig || 'source' in partialConfig
      || 'fastPeriod' in partialConfig || 'slowPeriod' in partialConfig) {
      this._calculate(existing);
      this._rebuild(id);
    }

    // Visual-only changes — no rebuild needed
    this.lineRenderers.get(id)?.update(partialConfig);
    this.bandRenderers.get(id)?.update(partialConfig as Partial<BollingerConfig>);
  }

  onDataUpdate(newData: OHLCV[]): void {
    this.data = newData;
    for (const [, config] of this.configs) {
      this._calculate(config);
      this._rebuild(config.id);
    }
  }

  onStreamTick(index: number, candle: OHLCV): void {
    // NOTE: This implementation performs a full recalculation on every streaming
    // tick — O(N*M) where N = candle count, M = indicator count. This is
    // acceptable for ≤ 500 candles. For larger datasets or high-frequency
    // streaming, implement incremental EMA updates and avoid recalculating
    // SMA/BB from scratch; instead, use a sliding window approach.
    this.onDataUpdate(this.data);
  }

  onResize(resolution: THREE.Vector2): void {
    this.resolution.copy(resolution);
    this.lineRenderers.forEach(r => r.onResize(resolution));
    this.bandRenderers.forEach(r => r.onResize(resolution));
    this.subViewRenderer.onResize(resolution.x, resolution.y, 0.2);
  }

  getValueAt(id: string, index: number): number | null {
    return this.calculatedValues.get(id)?.[index] ?? null;
  }

  renderSubViews(renderer: THREE.WebGLRenderer): void {
    this.subViewRenderer.render(renderer);
  }

  dispose(): void {
    this.lineRenderers.forEach(r => r.dispose());
    this.bandRenderers.forEach(r => r.dispose());
    this.subViewRenderer.dispose();
  }
}
```

---

## 7. UI Controls & Settings Panel

### 7.1 lil-gui vs Custom HTML — Decision

| Criterion | lil-gui | Custom HTML/CSS |
|---|---|---|
| Setup speed | Very fast | Moderate |
| Visual customization | Limited (theme only) | Full control |
| Financial-grade UX | Not suitable | Yes |
| Symbol/interval dropdowns | Basic | Custom-styled |
| Mobile touch | Poor | Full |
| Two-way binding | Automatic via objects | Manual |
| **Recommendation** | Dev/debug overlay only | **Production panel** |

**Decision**: Use **custom HTML/CSS** for the production settings panel. Use `lil-gui` exclusively as a secondary dev overlay (hidden by default, toggled with backtick `` ` ``).

The main settings panel is a positioned `<div>` overlay — this gives full control over financial-specific UX (e.g., color-coded candle previews, interval pill buttons, drag-to-resize navigator).

### 7.2 HTML Structure

```html
<!-- Injected into document.body by UIController -->
<div id="chart-ui-root" class="chart-ui" data-theme="dark">

  <!-- Collapse toggle -->
  <button class="chart-ui__toggle" aria-label="Toggle settings">☰</button>

  <div class="chart-ui__panel">

    <!-- Section: Symbol & Interval -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Symbol</label>
      <div class="chart-ui__symbol-input">
        <input type="text" id="ui-symbol" value="BTCUSDT" autocomplete="off"
               list="ui-symbol-list" />
        <datalist id="ui-symbol-list">
          <option value="BTCUSDT" /><option value="ETHUSDT" />
          <!-- populated dynamically -->
        </datalist>
      </div>

      <label class="chart-ui__label">Interval</label>
      <div class="chart-ui__pill-group" id="ui-interval-group">
        <button class="chart-ui__pill" data-value="1m">1m</button>
        <button class="chart-ui__pill" data-value="5m">5m</button>
        <button class="chart-ui__pill" data-value="15m">15m</button>
        <button class="chart-ui__pill chart-ui__pill--active" data-value="1h">1h</button>
        <button class="chart-ui__pill" data-value="4h">4h</button>
        <button class="chart-ui__pill" data-value="1D">1D</button>
        <button class="chart-ui__pill" data-value="1W">1W</button>
      </div>
    </section>

    <!-- Section: Time Range -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Time Range</label>
      <div class="chart-ui__range-row">
        <input type="datetime-local" id="ui-range-start" />
        <span>→</span>
        <input type="datetime-local" id="ui-range-end" />
      </div>
      <button class="chart-ui__btn" id="ui-zoom-fit">Zoom to Fit</button>
      <!-- Navigator bar — custom canvas element -->
      <canvas id="ui-navigator" height="40"></canvas>
    </section>

    <!-- Section: Layout Mode -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Layout</label>
      <div class="chart-ui__pill-group" id="ui-layout-group">
        <button class="chart-ui__pill chart-ui__pill--active" data-value="Linear">Linear</button>
        <button class="chart-ui__pill" data-value="Helix">Helix</button>
        <button class="chart-ui__pill" data-value="Tunnel">Tunnel</button>
      </div>
    </section>

    <!-- Section: Indicators -->
    <section class="chart-ui__section" id="ui-indicators-section">
      <label class="chart-ui__label">Indicators
        <button class="chart-ui__add-btn" id="ui-add-indicator">+</button>
      </label>
      <div id="ui-indicator-list">
        <!-- Dynamically populated — see UIController._renderIndicatorRow() -->
      </div>
    </section>

    <!-- Section: Theme -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Theme</label>
      <div class="chart-ui__pill-group" id="ui-theme-group">
        <button class="chart-ui__pill chart-ui__pill--active" data-value="dark">Dark</button>
        <button class="chart-ui__pill" data-value="light">Light</button>
      </div>
      <div class="chart-ui__color-row">
        <span>Bull</span>
        <input type="color" id="ui-color-bull" value="#26a69a" />
        <span>Bear</span>
        <input type="color" id="ui-color-bear" value="#ef5350" />
      </div>
    </section>

  </div><!-- /.chart-ui__panel -->
</div><!-- /#chart-ui-root -->
```

### 7.3 CSS Positioning

```css
.chart-ui {
  position: absolute;
  top: 0; right: 0;
  width: 260px;
  height: 100%;
  z-index: 100;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  pointer-events: none;
  user-select: none;
}

.chart-ui__panel {
  position: absolute;
  top: 0; right: 0;
  width: 260px;
  height: 100%;
  background: rgba(12, 14, 18, 0.92);
  backdrop-filter: blur(8px);
  border-left: 1px solid rgba(255,255,255,0.06);
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: all;
  transform: translateX(0);
  transition: transform 0.25s ease;
}

.chart-ui__panel--collapsed {
  transform: translateX(260px);
}

.chart-ui__toggle {
  position: absolute;
  top: 12px; right: 268px;
  z-index: 101;
  pointer-events: all;
  background: rgba(12,14,18,0.85);
  border: 1px solid rgba(255,255,255,0.1);
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
}

.chart-ui__section {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.chart-ui__pill-group { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.chart-ui__pill {
  padding: 3px 8px; border-radius: 3px; cursor: pointer;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: #888; font-size: 11px; pointer-events: all;
  transition: background 0.15s, color 0.15s;
}
.chart-ui__pill--active { background: rgba(38,166,154,0.25); color: #26a69a; border-color: #26a69a; }

[data-theme="light"] .chart-ui__panel { background: rgba(248,248,248,0.95); }
[data-theme="light"] .chart-ui__pill  { color: #444; background: rgba(0,0,0,0.05); }
```

### 7.4 UIController Implementation

The `UI_TEMPLATE` constant referenced in `_createDOM()` is the HTML string from §7.2. `debounce` and `throttle` should be imported from a shared utility module (e.g., `src/utils/timing.ts`).

```typescript
export class UIController {
  private root:   HTMLElement;
  private panel:  HTMLElement;
  private state:  UIState;
  private bus:    EventBus;
  private collapsed = false;

  constructor(container: HTMLElement, initialState: UIState, bus: EventBus) {
    this.state = { ...initialState };
    this.bus   = bus;
    // _createDOM() and panel assignment happen before _bindEvents() and syncFromState()
    this.root  = this._createDOM();
    this.panel = this.root.querySelector('.chart-ui__panel') as HTMLElement;
    container.appendChild(this.root);
    this._bindEvents();
    this.syncFromState(this.state);
  }

  private _createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = UI_TEMPLATE;  // The HTML string from §7.2
    return div.firstElementChild as HTMLElement;
  }

  private _bindEvents(): void {
    // Collapse toggle
    this.root.querySelector('.chart-ui__toggle')!
      .addEventListener('click', () => this.togglePanel());

    // Symbol input — debounced
    const symbolInput = this.root.querySelector<HTMLInputElement>('#ui-symbol')!;
    symbolInput.addEventListener('change', debounce((e: Event) => {
      const symbol = (e.target as HTMLInputElement).value.toUpperCase().trim();
      if (symbol === this.state.symbol) return;
      this.state.symbol = symbol;
      this.bus.emit('symbolChange', { symbol });
    }, 400));

    // Interval pills
    this.root.querySelector('#ui-interval-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-interval-group', btn.dataset.value!);
        this.state.interval = btn.dataset.value!;
        this.bus.emit('intervalChange', { interval: this.state.interval });
      });

    // Layout pills
    this.root.querySelector('#ui-layout-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-layout-group', btn.dataset.value!);
        this.state.layoutMode = btn.dataset.value as UIState['layoutMode'];
        this.bus.emit('layoutChange', { mode: this.state.layoutMode });
      });

    // Theme
    this.root.querySelector('#ui-theme-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-theme-group', btn.dataset.value!);
        this.state.theme = btn.dataset.value as 'dark' | 'light';
        this.root.dataset.theme = this.state.theme;
        this.bus.emit('themeChange', { theme: this.state.theme });
      });

    // Color pickers — throttled
    ['bull', 'bear'].forEach(key => {
      this.root.querySelector<HTMLInputElement>(`#ui-color-${key}`)!
        .addEventListener('input', throttle((e: Event) => {
          const val = (e.target as HTMLInputElement).value;
          this.state.paletteOverrides[`${key}Candle` as keyof ThemePalette] = val;
          this.bus.emit('paletteChange', this.state.paletteOverrides);
        }, 100));
    });

    // Zoom to fit
    this.root.querySelector('#ui-zoom-fit')!
      .addEventListener('click', () => this.bus.emit('zoomToFit', {}));

    // Add indicator
    this.root.querySelector('#ui-add-indicator')!
      .addEventListener('click', () => this._openIndicatorPicker());
  }

  private _renderIndicatorRow(config: IndicatorConfig): void {
    const list = this.root.querySelector('#ui-indicator-list')!;
    const row  = document.createElement('div');
    row.className = 'chart-ui__indicator-row';
    row.dataset.id = config.id;
    row.innerHTML = `
      <label class="chart-ui__switch">
        <input type="checkbox" ${config.enabled ? 'checked' : ''} data-action="toggle" />
        <span class="chart-ui__switch-track"></span>
      </label>
      <span class="chart-ui__indicator-type">${config.type}</span>
      <input type="number" class="chart-ui__period-input"
        value="${(config as any).period ?? ''}"
        min="2" max="500" step="1" data-action="period" />
      <input type="color" class="chart-ui__indicator-color"
        value="${config.color}" data-action="color" />
      <button class="chart-ui__remove-btn" data-action="remove">×</button>
    `;

    row.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLElement;
      const action = target.dataset.action;
      if (action === 'toggle')
        this.bus.emit('indicatorToggle', { id: config.id, enabled: (target as HTMLInputElement).checked });
      if (action === 'period')
        this.bus.emit('indicatorUpdate', { id: config.id, period: Number((target as HTMLInputElement).value) });
      if (action === 'color')
        this.bus.emit('indicatorUpdate', { id: config.id, color: (target as HTMLInputElement).value });
    });

    row.querySelector('[data-action="remove"]')!.addEventListener('click', () => {
      this.bus.emit('indicatorRemove', { id: config.id });
      row.remove();
    });

    list.appendChild(row);
  }

  syncFromState(state: Partial<UIState>): void {
    if (state.symbol !== undefined)
      (this.root.querySelector<HTMLInputElement>('#ui-symbol')!).value = state.symbol;
    if (state.interval !== undefined)
      this._setActivePill('#ui-interval-group', state.interval);
    if (state.theme !== undefined) {
      this._setActivePill('#ui-theme-group', state.theme);
      this.root.dataset.theme = state.theme;
    }
    if (state.indicators !== undefined) {
      this.root.querySelector('#ui-indicator-list')!.innerHTML = '';
      state.indicators.forEach(cfg => this._renderIndicatorRow(cfg));
    }
  }

  togglePanel(visible?: boolean): void {
    this.collapsed = visible !== undefined ? !visible : !this.collapsed;
    this.panel.classList.toggle('chart-ui__panel--collapsed', this.collapsed);
  }

  private _setActivePill(groupSelector: string, value: string): void {
    this.root.querySelectorAll(`${groupSelector} .chart-ui__pill`).forEach(btn => {
      btn.classList.toggle('chart-ui__pill--active',
        (btn as HTMLElement).dataset.value === value);
    });
  }

  // NOTE: This is a placeholder implementation using native `prompt()` dialogs.
  // Production builds should replace this with a proper modal UI.
  // The config object is typed as SMAConfig for simplicity here — a full
  // implementation should construct the correct config type (EMAConfig,
  // BollingerConfig, etc.) based on the selected indicator type.
  private _openIndicatorPicker(): void {
    const type = prompt('Indicator type: SMA, EMA, BB, RSI, MACD') as IndicatorType;
    if (!type) return;
    const period = parseInt(prompt('Period:', '20') || '20', 10);
    const id = `${type.toLowerCase()}_${period}_${Date.now()}`;
    const config: SMAConfig = {
      id, type: type as 'SMA', enabled: true,
      period, source: 'close',
      color: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6,'0'),
      opacity: 1, lineWidth: 2,
    };
    this.state.indicators.push(config);
    this._renderIndicatorRow(config);
    this.bus.emit('indicatorAdd', config);
  }

  on(event: string, handler: Function): void {
    this.bus.on(event, handler);
  }

  dispose(): void {
    this.root.remove();
  }
}
```

### 7.5 Navigator Bar

```typescript
export class NavigatorBar {
  private canvas:     HTMLCanvasElement;
  private ctx:        CanvasRenderingContext2D;
  private allData:    OHLCV[];
  private rangeStart: number = 0.7;
  private rangeEnd:   number = 1.0;
  private dragging:   'start' | 'end' | 'window' | null = null;

  constructor(canvas: HTMLCanvasElement, allData: OHLCV[]) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d')!;
    this.allData = allData;
    this._bindDrag();
    this.draw();
  }

  draw(): void {
    const { width: w, height: h } = this.canvas;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, w, h);

    if (this.allData.length < 2) return;

    const prices = this.allData.map(c => c.close);
    const min = Math.min(...prices), max = Math.max(...prices);
    const range = max - min || 1; // Guard division by zero

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100,100,200,0.6)';
    ctx.lineWidth = 1;
    prices.forEach((p, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    const sx = this.rangeStart * w, ex = this.rangeEnd * w;
    ctx.fillStyle = 'rgba(38,166,154,0.15)';
    ctx.fillRect(sx, 0, ex - sx, h);
    ctx.strokeStyle = '#26a69a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sx, 0, ex - sx, h);
  }

  private _bindDrag(): void {
    this.canvas.addEventListener('pointerdown', (e) => {
      const x = e.offsetX / this.canvas.width;
      if (Math.abs(x - this.rangeStart) < 0.015) this.dragging = 'start';
      else if (Math.abs(x - this.rangeEnd) < 0.015) this.dragging = 'end';
      else if (x > this.rangeStart && x < this.rangeEnd) this.dragging = 'window';
      if (this.dragging) this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', throttle((e: PointerEvent) => {
      if (!this.dragging) return;
      const dx = e.movementX / this.canvas.width;
      if (this.dragging === 'start') {
        this.rangeStart = Math.max(0, Math.min(this.rangeEnd - 0.05, this.rangeStart + dx));
      } else if (this.dragging === 'end') {
        this.rangeEnd = Math.min(1, Math.max(this.rangeStart + 0.05, this.rangeEnd + dx));
      } else {
        const span = this.rangeEnd - this.rangeStart;
        this.rangeStart = Math.max(0, Math.min(1 - span, this.rangeStart + dx));
        this.rangeEnd   = this.rangeStart + span;
      }
      this.draw();
      this._emitChange();
    }, 16));

    this.canvas.addEventListener('pointerup', () => { this.dragging = null; });
  }

  private _emitChange(): void {
    const n = this.allData.length - 1;
    // When rangeEnd=1.0: Math.floor(1.0 * (length-1)) = length-1 — correct upper bound
    const startIdx = Math.floor(this.rangeStart * n);
    const endIdx   = Math.min(n, Math.floor(this.rangeEnd * n));
    this.canvas.dispatchEvent(new CustomEvent('rangeChange', {
      detail: { startIndex: startIdx, endIndex: endIdx },
      bubbles: true,
    }));
  }

  resize(width: number): void {
    this.canvas.width = width;
    this.draw();
  }

  updateData(allData: OHLCV[]): void {
    this.allData = allData;
    this.draw();
  }
}
```

---

## 8. Enhanced Interactivity

### 8.1 Crosshair Implementation

```typescript
export class CrosshairManager {
  private vLine: Line2;
  private hLine: Line2;
  private priceLabel: TroikaText | null;
  private timeLabel:  TroikaText | null;
  private enabled = true;

  constructor(
    private scene: THREE.Scene,
    private labelPool: TroikaLabelPool,
    resolution: THREE.Vector2
  ) {
    const mat = (color: number) => new LineMaterial({
      color,
      linewidth: 1,
      transparent: true,
      opacity: 0.6,
      depthTest: false,
      depthWrite: false,
      resolution,
    });

    const vGeom = new LineGeometry();
    vGeom.setPositions([0, -100, 0, 0, 100, 0]);
    this.vLine = new Line2(vGeom, mat(0xffffff));
    this.vLine.renderOrder = 20;

    const hGeom = new LineGeometry();
    hGeom.setPositions([-500, 0, 0, 500, 0, 0]);
    this.hLine = new Line2(hGeom, mat(0xffffff));
    this.hLine.renderOrder = 20;

    scene.add(this.vLine, this.hLine);

    // acquire() now returns TroikaText | null — handle null gracefully
    this.priceLabel = labelPool.acquire('crosshair_price', '', new THREE.Vector3());
    this.timeLabel  = labelPool.acquire('crosshair_time',  '', new THREE.Vector3());
  }

  setPosition(
    worldX: number, worldY: number, worldZ: number,
    priceStr: string, timeStr: string
  ): void {
    if (!this.enabled) return;

    (this.vLine.geometry as LineGeometry).setPositions([
      worldX, -500, worldZ,
      worldX,  500, worldZ,
    ]);

    (this.hLine.geometry as LineGeometry).setPositions([
      -500, worldY, worldZ,
       500, worldY, worldZ,
    ]);

    if (this.priceLabel) {
      this.priceLabel.text = priceStr;
      this.priceLabel.position.set(worldX + 1.0, worldY, worldZ);
      this.priceLabel.sync();
    }
    if (this.timeLabel) {
      this.timeLabel.text  = timeStr;
      this.timeLabel.position.set(worldX, -2.0, worldZ);
      this.timeLabel.sync();
    }
  }

  setVisible(visible: boolean): void {
    this.vLine.visible = visible;
    this.hLine.visible = visible;
    if (this.priceLabel) this.priceLabel.visible = visible;
    if (this.timeLabel)  this.timeLabel.visible  = visible;
  }

  onResize(resolution: THREE.Vector2): void {
    (this.vLine.material as LineMaterial).resolution.copy(resolution);
    (this.hLine.material as LineMaterial).resolution.copy(resolution);
  }

  dispose(): void {
    this.scene.remove(this.vLine, this.hLine);
    (this.vLine.geometry as LineGeometry).dispose();
    (this.hLine.geometry as LineGeometry).dispose();
    (this.vLine.material as LineMaterial).dispose();
    (this.hLine.material as LineMaterial).dispose();
    this.labelPool.release('crosshair_price');
    this.labelPool.release('crosshair_time');
  }
}
```

### 8.2 Raycaster-based Hover & Tooltip

The hit-proxy plane approach intersects a single `THREE.Plane` at the chart's Z depth rather than raycasting against `InstancedMesh` instances, deriving the candle index via binary search — O(log N) with zero GPU overhead (see §13.2 for the trade-off rationale).

```typescript
export class TooltipSystem {
  private raycaster  = new THREE.Raycaster();
  private mouse      = new THREE.Vector2();
  private tooltipEl: HTMLElement;
  private crosshair: CrosshairManager;
  private hitPlane   = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private hitPoint   = new THREE.Vector3();
  private enabled    = true;

  constructor(
    private renderer:          THREE.WebGLRenderer,
    private scene:             THREE.Scene,
    private camera:            THREE.Camera,
    private data:              OHLCV[],
    private indicatorManager:  IndicatorManager,
    private labelPool:         TroikaLabelPool,
    private scales:            ScaleSet,
    private positionFn:        (i: number) => THREE.Vector3
  ) {
    this.tooltipEl = this._createTooltipDOM();
    document.body.appendChild(this.tooltipEl);
    this.crosshair = new CrosshairManager(
      scene, labelPool,
      new THREE.Vector2(renderer.domElement.clientWidth, renderer.domElement.clientHeight)
    );
    renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    renderer.domElement.addEventListener('mouseleave', () => this._hide());
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.enabled) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width)  *  2 - 1;
    this.mouse.y = ((event.clientY - rect.top)  / rect.height) * -2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // intersectPlane returns THREE.Vector3 | null
    const intersected = this.raycaster.ray.intersectPlane(this.hitPlane, this.hitPoint);
    if (!intersected) return;

    const index = this._worldXToIndex(this.hitPoint.x);
    if (index < 0 || index >= this.data.length) return;

    const price = this.scales.priceInverse(this.hitPoint.y);

    this._updateCrosshair(index, this.hitPoint.y, price);
    this._updateTooltip(event.clientX, event.clientY, index, price);
  }

  private _worldXToIndex(worldX: number): number {
    let lo = 0, hi = this.data.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.positionFn(mid).x < worldX) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0) {
      const dLo   = Math.abs(this.positionFn(lo).x - worldX);
      const dPrev = Math.abs(this.positionFn(lo - 1).x - worldX);
      return dPrev < dLo ? lo - 1 : lo;
    }
    return lo;
  }

  private _updateCrosshair(index: number, worldY: number, price: number): void {
    const pos    = this.positionFn(index);
    const candle = this.data[index];
    this.crosshair.setPosition(
      pos.x, worldY, pos.z,
      price.toFixed(2),
      new Date(candle.timestamp).toLocaleString()
    );
    this.crosshair.setVisible(true);
  }

  private _updateTooltip(px: number, py: number, index: number, price: number): void {
    const candle = this.data[index];
    const isBull = candle.close >= candle.open;

    this.tooltipEl.innerHTML = `
      <div class="tt-header">${new Date(candle.timestamp).toLocaleString()}</div>
      <table class="tt-table">
        <tr><td>O</td><td class="tt-val">${candle.open.toFixed(2)}</td></tr>
        <tr><td>H</td><td class="tt-val">${candle.high.toFixed(2)}</td></tr>
        <tr><td>L</td><td class="tt-val">${candle.low.toFixed(2)}</td></tr>
        <tr class="${isBull ? 'tt-bull' : 'tt-bear'}">
          <td>C</td><td class="tt-val">${candle.close.toFixed(2)}</td>
        </tr>
        <tr><td>V</td><td class="tt-val">${this._fmtVolume(candle.volume)}</td></tr>
      </table>
    `;

    const W = window.innerWidth, H = window.innerHeight;
    const tw = 180, th = 160;
    const left = px + 16 + tw > W ? px - tw - 8 : px + 16;
    const top  = py + th > H      ? py - th - 8  : py + 8;

    this.tooltipEl.style.transform = `translate(${left}px, ${top}px)`;
    this.tooltipEl.style.opacity   = '1';
    this.tooltipEl.style.display   = 'block';
  }

  private _hide(): void {
    this.tooltipEl.style.opacity = '0';
    this.crosshair.setVisible(false);
  }

  private _createTooltipDOM(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 200;
      background: rgba(10,12,16,0.9); backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      padding: 8px 10px; color: #ccc; font-size: 11px;
      font-family: 'Roboto Mono', monospace; pointer-events: none;
      width: 170px; display: none; opacity: 0;
      transition: opacity 0.1s;
    `;
    return el;
  }

  private _fmtVolume(v: number): string {
    if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
    return v.toFixed(0);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) this._hide();
  }

  setCrosshairIndex(index: number): void {
    if (index < 0 || index >= this.data.length) return;
    const candle = this.data[index];
    const worldY = this.scales.price(candle.close);
    this._updateCrosshair(index, worldY, candle.close);
  }

  dispose(): void {
    this.tooltipEl.remove();
    this.crosshair.dispose();
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
  }
}
```

### 8.3 Legend Panel

```typescript
export class LegendPanel {
  private el: HTMLElement;

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'chart-legend';
    this.el.style.cssText = `
      position: absolute; top: 10px; left: 10px; z-index: 90;
      display: flex; flex-direction: column; gap: 4px;
      pointer-events: none;
    `;
    container.appendChild(this.el);
  }

  update(indicators: IndicatorConfig[]): void {
    this.el.innerHTML = indicators
      .filter(c => c.enabled)
      .map(c => `
        <div style="display:flex;align-items:center;gap:6px;
                    font:11px monospace;color:#ccc">
          <span style="display:inline-block;width:18px;height:3px;
                       background:${c.color};border-radius:2px"></span>
          <span>${c.type}${(c as any).period ? `(${(c as any).period})` : ''}</span>
        </div>
      `).join('');
  }

  dispose(): void {
    this.el.remove();
  }
}
```

### 8.4 Persistent Price Ticker

A persistent "last price" readout in the top-right of the canvas provides a live price anchor independent of hover state:

```typescript
export class PriceTicker {
  private el: HTMLElement;

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'chart-price-ticker';
    this.el.style.cssText = `
      position: absolute; top: 10px; right: 270px; z-index: 90;
      font: 700 14px 'Roboto Mono', monospace; pointer-events: none;
      padding: 4px 8px; border-radius: 3px;
      background: rgba(12,14,18,0.7);
    `;
    container.appendChild(this.el);
  }

  update(price: number, isBull: boolean): void {
    this.el.textContent = price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    this.el.style.color = isBull ? '#26a69a' : '#ef5350';
  }

  dispose(): void {
    this.el.remove();
  }
}
```

Call `priceTicker.update(lastCandle.close, lastCandle.close >= lastCandle.open)` on each streaming tick and after data loads.

### 8.5 Time-range Brushing

**Not implemented in this addendum.** Brushing — click-drag on the main 3D scene to select a time range — requires intercepting `OrbitControls` pointer events, differentiating pan intent from brush intent (typically via a modifier key), and converting the drag region to a `VisibleRange`. The recommended approach:

1. On `Shift+pointerdown`, enter brush mode: disable `OrbitControls`, record start X in NDC space.
2. On `pointermove`, project NDC X to world X via `raycaster.ray.intersectPlane`, record end X.
3. Draw a 2D selection overlay (canvas or SVG) showing the selected region.
4. On `pointerup`, compute `startIndex`/`endIndex` from world X via `_worldXToIndex()`, emit `rangeChange`, re-enable `OrbitControls`.

---

## 9. Data Switching & Time-range Handling

### 9.1 Interval Change Flow

When the user selects a new interval (e.g., from `1h` to `4h`), the following sequence executes:

```
1. UIController emits 'intervalChange' → ChartController.handleIntervalChange()
2. Pause streaming WebSocket subscription
3. DataManager.fetchHistorical(symbol, newInterval, startTime, endTime)
4. ChartController._fullRebuild(newData):
   a. IndicatorManager.onDataUpdate(newData) — recalculates all indicators
   b. AxisManager.rebuild(layoutMode) — new time scale domain
   c. Candlestick/Volume InstancedMesh: update all instance matrices (reuse geometry)
   d. LabelPool: release all time labels, regenerate
5. Resume WebSocket with new interval subscription
6. UIController.syncFromState({ interval: newInterval }) — already done, no-op
```

```typescript
async handleIntervalChange(newInterval: string): Promise<void> {
  this.streamingPaused = true;
  this._showLoadingOverlay(true);

  try {
    const data = await this.dataManager.fetchHistorical({
      symbol:   this.state.symbol,
      interval: newInterval,
      limit:    500,
    });

    this.data          = data;
    this.state.interval = newInterval;
    this.state.visibleRange = this._computeDefaultVisibleRange(data);

    await Promise.all([
      Promise.resolve(this.indicatorManager.onDataUpdate(data)),
      Promise.resolve(this.axisManager.rebuild(this.state.layoutMode)),
    ]);

    this._repositionCandles(data);
    this._fitCameraToRange(this.state.visibleRange);

  } finally {
    this._showLoadingOverlay(false);
    this.streamingPaused = false;
    this._resubscribeStream(this.state.symbol, newInterval);
  }
}
```

### 9.2 Repositioning Candles (No Geometry Rebuild)

```typescript
private _repositionCandles(data: OHLCV[]): void {
  const dummy = new THREE.Object3D();

  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    const pos    = this.positionFn(i);
    const bodyH  = Math.abs(c.close - c.open);
    const bodyY  = this.scales.price((c.open + c.close) / 2);
    const scaleY = Math.max(0.001, this.scales.priceHeight(bodyH));

    dummy.position.set(pos.x, bodyY, pos.z);
    dummy.scale.set(CANDLE_WIDTH, scaleY, CANDLE_DEPTH);
    dummy.updateMatrix();

    this.bodyMesh.setMatrixAt(i, dummy.matrix);
    this.bodyMesh.setColorAt(i, c.close >= c.open ? BULL_COLOR : BEAR_COLOR);
  }

  this.bodyMesh.count = data.length;
  this.bodyMesh.instanceMatrix.needsUpdate = true;
  if (this.bodyMesh.instanceColor) this.bodyMesh.instanceColor.needsUpdate = true;
}
```

### 9.3 Time-range Navigation Math

```typescript
export class RangeController {
  constructor(private allData: OHLCV[], private state: UIState) {}

  fromNormalized(start: number, end: number): VisibleRange {
    const n      = this.allData.length;
    if (n === 0) throw new Error('RangeController: allData is empty');
    const si     = Math.max(0, Math.min(n - 1, Math.floor(start * (n - 1))));
    const ei     = Math.max(si, Math.min(n - 1, Math.floor(end * (n - 1))));
    const slice  = this.allData.slice(si, ei + 1);

    return {
      startIndex: si,
      endIndex:   ei,
      startTime:  this.allData[si].timestamp,
      endTime:    this.allData[ei].timestamp,
      priceMin:   Math.min(...slice.map(c => c.low)),
      priceMax:   Math.max(...slice.map(c => c.high)),
      volumeMax:  Math.max(...slice.map(c => c.volume)),
    };
  }

  fitAll(): VisibleRange {
    return this.fromNormalized(0, 1);
  }

  fitLast(n: number): VisibleRange {
    const total = this.allData.length;
    const start = Math.max(0, total - n) / Math.max(1, total - 1);
    return this.fromNormalized(start, 1);
  }

  applyToScales(range: VisibleRange, scales: ScaleSet): void {
    scales.price.domain([range.priceMin, range.priceMax]);
    scales.time.domain([range.startIndex, range.endIndex]);
    scales.volume.domain([0, range.volumeMax]);
  }
}
```

### 9.4 Streaming Continuity

```typescript
private _onStreamTick(candle: OHLCV): void {
  if (this.streamingPaused) return;

  const last = this.data[this.data.length - 1];

  if (candle.timestamp === last.timestamp) {
    // Partial update — mutate in place, update only this instance
    Object.assign(last, candle);
    this._updateCandleInstance(this.data.length - 1, last);
    this.indicatorManager.onStreamTick(this.data.length - 1, last);
  } else if (candle.timestamp > last.timestamp) {
    // New candle — append and extend
    this.data.push(candle);
    const newIndex = this.data.length - 1;
    this._addCandleInstance(newIndex, candle);
    this.indicatorManager.onStreamTick(newIndex, candle);

    // Auto-scroll if user is at the live edge
    if (this.state.visibleRange.endIndex === newIndex - 1) {
      this.state.visibleRange.endIndex = newIndex;
      this.state.visibleRange.endTime  = candle.timestamp;
      this.axisManager.update(this.state.visibleRange, this.camera);
    }
  }
}
```

---

## 10. Integration & Update Flow

### 10.1 Annotated Render Loop

The render loop calls `labelPool.syncBillboards(camera)` using the `TroikaLabelPool` instance (also referred to as `labelSystem` at the `ChartController` level — these are the same object).

```typescript
private animate(): void {
  requestAnimationFrame(() => this.animate());

  const delta = this.clock.getDelta();

  // 1. Tween — smooth camera transitions
  TWEEN.update();

  // 2. OrbitControls — must update before render when damping is enabled
  this.controls.update();

  // 3. Label billboard sync — every frame (cheap quaternion copy)
  //    labelPool is the TroikaLabelPool instance (LabelSystem in component diagram)
  this.labelPool.syncBillboards(this.camera);

  // 4. Main scene render via EffectComposer (post-processing)
  this.composer.render(delta);

  // 5. Sub-view render (RSI/MACD panels) — AFTER main, uses scissor/viewport
  this.indicatorManager.renderSubViews(this.renderer);

  // NOTE: AxisManager, TooltipSystem, UIController are event-driven.
  // They do NOT need per-frame calls in animate().
}
```

### 10.2 EventBus Subscriptions

```typescript
// Add in ChartController.init() after all systems are constructed:

this.bus.on('symbolChange',    ({ symbol })   => this.handleSymbolChange(symbol));
this.bus.on('intervalChange',  ({ interval }) => this.handleIntervalChange(interval));
this.bus.on('layoutChange',    ({ mode })     => this.handleLayoutChange(mode));
this.bus.on('themeChange',     ({ theme })    => this.handleThemeChange(theme));
this.bus.on('paletteChange',   (palette)      => this.handlePaletteChange(palette));
this.bus.on('zoomToFit',       ()             => this.handleZoomToFit());
this.bus.on('rangeChange',     ({ startIndex, endIndex }) =>
                                                 this.handleRangeChange(startIndex, endIndex));
this.bus.on('indicatorAdd',    (config)       => this.indicatorManager.add(config));
this.bus.on('indicatorRemove', ({ id })       => this.indicatorManager.remove(id));
this.bus.on('indicatorToggle', ({ id, enabled }) =>
                                                 this.indicatorManager.toggle(id, enabled));
this.bus.on('indicatorUpdate', ({ id, ...rest }) =>
                                                 this.indicatorManager.update(id, rest));
```

### 10.3 Resize Handler

```typescript
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Base renderer + camera
  this.camera.aspect = w / h;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(w, h);
  this.composer.setSize(w, h);

  // New systems
  const resolution = new THREE.Vector2(w, h);
  this.indicatorManager.onResize(resolution);
  this.crosshair?.onResize(resolution);
  this.navigatorBar?.resize(w);
});
```

---

## 11. Performance & Optimization Notes

### 11.1 Label LOD and Culling

| Candle count visible | Label strategy |
|---|---|
| < 100 | All labels visible, no culling |
| 100–500 | Thin time labels: show every Nth where `N = Math.ceil(count / 12)` |
| > 500 | Show only major time boundaries (daily, weekly) |
| Any | Frustum-cull: skip `acquire()` if label world pos is off-screen |

```typescript
// Frustum cull before acquiring a label
const frustum = new THREE.Frustum();
const projMatrix = new THREE.Matrix4();
frustum.setFromProjectionMatrix(
  projMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
);

const testPos = new THREE.Vector3(tick.world_x, tick.world_y ?? 0, 0);
if (!frustum.containsPoint(testPos)) continue; // Skip off-screen label
```

### 11.2 Indicator Calculation Thresholds

| Data length | Strategy |
|---|---|
| ≤ 2000 candles | Synchronous calculation in main thread (< 10ms for 10 indicators) |
| > 2000 candles | Offload to `IndicatorWorker` (Web Worker) — post `{ type, params, values }`, receive `{ id, result }` |

### 11.3 UI Throttling

| Event | Strategy |
|---|---|
| `mousemove` → crosshair | Cap at 60fps via `requestAnimationFrame` flag |
| `OrbitControls.change` → axis update | 50ms debounce |
| Color picker `input` | 100ms throttle |
| Symbol `change` | 400ms debounce |
| Navigator drag | 16ms throttle (one per frame) |

### 11.4 Troika Text Guidelines

- Pre-allocate pool to `maxLabels = 256` at startup; never create/destroy at runtime
- Use the dirty-flag pattern from `TroikaLabelPool.syncAll()` — only call `label.sync()` when text has actually changed; do not access Troika private internals
- Do NOT call `sync()` on all 256 pool instances every frame — only on active + dirty labels via `syncAll()`
- Troika defers SDF atlas operations — calling `sync()` is safe every frame on dirty labels; it is cheap when nothing changed

### 11.5 Disposal Checklist

On symbol change or full reset:

```typescript
// Systems to dispose on full reset:
this.indicatorManager.dispose();  // Removes all Line2/Band geometry from scene
this.axisManager.dispose();       // Removes grid geometry + labels
this.labelPool.releaseAll();      // Returns all Troika instances to pool (do not dispose pool itself)
this.tooltipSystem.dispose();     // Removes DOM elements + event listeners
// UIController: keep alive, call syncFromState(newState) instead of dispose+recreate
```

---

## 12. Example Code Snippets

### 12.1 Creating Troika Labels for Price Axis

```typescript
import { Text as TroikaText, preloadFont } from 'troika-three-text';

// One-time init — call before first render
preloadFont(
  { font: '/fonts/RobotoMono-Regular.woff', characters: '0123456789.,$KMBG +-' },
  () => { /* font ready — safe to create labels */ }
);

function createPriceLabel(scene: THREE.Scene, price: number, worldY: number): TroikaText {
  const label = new TroikaText();
  label.text      = `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  label.font      = '/fonts/RobotoMono-Regular.woff';
  label.fontSize  = 0.35;
  label.color     = 0xaaaaaa;
  label.anchorX   = 'left';
  label.anchorY   = 'middle';
  label.position.set(-2.0, worldY, 0);
  label.depthOffset = -1;
  label.renderOrder = 10;
  label.sync();
  scene.add(label);
  return label;
}

function updatePriceLabel(label: TroikaText, price: number, worldY: number): void {
  const newText = `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (label.text !== newText) {
    label.text = newText;
    label.sync();
  }
  label.position.y = worldY;
}
```

### 12.2 Adding an SMA Line

```typescript
import { IndicatorManager } from './indicators/IndicatorManager.js';

const indicatorManager = new IndicatorManager(
  scene,
  candleData,
  scales,
  (i) => candlePositions[i],
  renderer
);

// Add SMA(20)
indicatorManager.add({
  id:        'sma_20',
  type:      'SMA',
  enabled:   true,
  period:    20,
  source:    'close',
  color:     '#f0b90b',
  opacity:   0.9,
  lineWidth: 2,
} as SMAConfig);

// Update period reactively
indicatorManager.update('sma_20', { period: 50, color: '#ff6600' });

// Toggle visibility
indicatorManager.toggle('sma_20', false);

// Query value at hovered candle index
const smaValue = indicatorManager.getValueAt('sma_20', hoveredCandleIndex);
```

### 12.3 lil-gui Dev Panel

```typescript
import GUI from 'lil-gui';

const devParams = {
  bloomStrength:  1.2,
  bloomThreshold: 0.85,
  dofFocus:       50.0,
  wireframe:      false,
};

const gui = new GUI({ title: 'Dev Controls' });
gui.domElement.style.cssText = 'position:absolute;top:0;left:0;z-index:999';

const bloomFolder = gui.addFolder('Bloom');
bloomFolder.add(devParams, 'bloomStrength', 0, 3)
  .onChange((v: number) => { bloomPass.strength = v; });
bloomFolder.add(devParams, 'bloomThreshold', 0, 1)
  .onChange((v: number) => { bloomPass.threshold = v; });

gui.add(devParams, 'wireframe')
  .onChange((v: boolean) => {
    scene.traverse(obj => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).wireframe = v;
      }
    });
  });

// lil-gui owns renderer/post-processing params only.
// UIController owns chart data state (symbol, interval, indicators, theme, visibleRange).
// These domains must not overlap — modifying the same state from both causes conflicts.

// Hide in production; toggle with backtick
if (import.meta.env.PROD) gui.hide();
window.addEventListener('keydown', (e) => {
  if (e.key === '`') gui._hidden ? gui.show() : gui.hide();
});
```

### 12.4 Crosshair + Tooltip Integration

```typescript
const tooltipSystem = new TooltipSystem(
  renderer,
  scene,
  camera,
  candleData,
  indicatorManager,
  labelPool,
  scales,
  (i) => computeWorldPosition(i, layoutMode)
);

// TooltipSystem self-registers its mousemove/mouseleave listeners on the canvas.
// No per-frame calls required — crosshair Line2 geometry updates are picked up
// automatically by the next renderer.render() call.

tooltipSystem.setEnabled(true);

// Programmatic crosshair positioning (e.g. keyboard arrow navigation):
tooltipSystem.setCrosshairIndex(candleIndex);
```

---

## 13. Common Pitfalls & Trade-offs

### 13.1 TroikaText Pool Exhaustion

**Pitfall**: Calling `pool.acquire()` without `pool.release()` — all 256 slots fill up, subsequent `acquire()` calls silently return `null`.

**Fix**: The `acquire()` implementation in §5.4 returns `null` on exhaustion with a console warning. All callers must handle the nullable return:
```typescript
const label = this.labelPool.acquire('my_label', text, position);
if (!label) return; // Pool exhausted — skip this label this frame
```

Increase `maxLabels` at construction if warnings appear frequently.

### 13.2 Raycast Accuracy on InstancedMesh

**Pitfall**: Raycasting directly against the candlestick `InstancedMesh` for hover detection.

**Consequence**: `raycaster.intersectObject()` must test bounding volumes for all N instances — O(N) per mousemove. At 60 mousemove/sec with 1000 candles: 60,000 tests/sec.

**Fix**: Use the hit-proxy plane approach (§8.2) — intersect a single `THREE.Plane` at the chart's Z depth, derive candle index from X via binary search. O(log N), zero GPU overhead.

### 13.3 UI Pointer-events Blocking Canvas

**Pitfall**: Settings panel intercepts `mousemove` events before they reach the Three.js canvas, breaking crosshair tracking.

**Fix**:
- Root wrapper: `pointer-events: none`
- Interactive children (inputs, buttons): `pointer-events: all`
- Tooltip element: `pointer-events: none` always
- Canvas sits at z-order 0 and receives events through the transparent overlay

### 13.4 LineMaterial Resolution Desync

**Pitfall**: `LineMaterial.resolution` is set once at construction. After resize, line widths appear wrong.

**Fix**: Every resize handler must update `material.resolution.set(w, h)` on every `LineMaterial`. `IndicatorManager.onResize()` iterates all active renderers and propagates the update. `BandIndicatorRenderer` includes `onResize()` for this purpose.

### 13.5 Sub-view Scissor State Leak

**Pitfall**: Exception inside `SubViewRenderer.render()` leaves `scissorTest` enabled, clipping the next main render frame.

**Fix**: Always use try/finally (already shown in §6.4):
```typescript
try {
  renderer.setScissorTest(true);
  // ... render
} finally {
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, fullW, fullH);
}
```

### 13.6 Bollinger Band Transparency Sorting

**Pitfall**: The semi-transparent ribbon renders inconsistently — sometimes in front of, sometimes behind candle bodies.

**Fix**:
- `ribbonMesh.renderOrder = 1` — renders before candles (`renderOrder = 2`)
- `bandMaterial.depthWrite = false` — ribbon never occludes candles in depth buffer
- `bandMaterial.side = THREE.DoubleSide` — visible from any camera angle

### 13.7 MACD Signal Line Distortion (Zero-fill)

**Pitfall**: Zero-filling null MACD values before computing the signal EMA distorts the signal line for the first `~signalPeriod` bars of the series, producing a signal that trends toward zero rather than the actual MACD values.

**Fix**: The `calcMACD` implementation in §6.1 avoids this by finding `firstValid` — the index of the first non-null MACD value — and passing only the valid slice to `calcEMA` for the signal line, then re-aligning to the original array length with leading nulls.

### 13.8 lil-gui / UIController State Conflict

**Pitfall**: Both `lil-gui` (dev) and `UIController` (production) modify overlapping state.

**Fix**: Strict domain separation — `lil-gui` owns renderer/post-processing parameters only; `UIController` owns chart data state (`symbol`, `interval`, `indicators`, `theme`, `visibleRange`). These domains never overlap.

### 13.9 SubViewRenderer Reference Line Accumulation

**Pitfall**: Calling `addRSILine()` multiple times (e.g., on each data update) without clearing first causes reference lines (overbought/oversold at ±0.4) to accumulate in the sub-scene.

**Fix**: Call `subViewRenderer.clear()` before each full rebuild. The `clear()` method (§6.4) removes both the indicator lines and the reference lines tracked in `referenceLines[]`.

---

*End of Technical Specification Addendum v2.0*

*Read alongside the v1.0 base specification (`3d-finance-viz-library.md`). All new components integrate with `ChartController` via the existing `EventBus` without modifying v1.0 internals.*
