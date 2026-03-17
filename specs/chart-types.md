# chart-types

**Status**: Ready for Implementation
**Priority**: P1
**Depends on**: `src/charts/CandleChart.ts`, `src/charts/VolumeChart.ts`, `src/FinanceChart.ts`, `src/ui/UIController.ts`, `src/types/addendum.ts`, `src/types/theme.ts`, `src/layout/LayoutEngine.ts`, `src/indicators/LineIndicatorRenderer.ts`, `src/indicators/SubViewRenderer.ts`

---

## Problem Statement

The library currently hard-codes a single chart presentation: candlestick bodies + wicks overlaid with a volume sub-panel. Traders routinely switch between candlestick, Heikin-Ashi, line, area (mountain), volume-primary, and market-cap views without reloading data. Today there is no mechanism to switch chart type at runtime — callers would have to dispose and recreate the entire `FinanceChart` instance, losing camera state, indicators, streaming connections, and provider configuration.

Additionally, the UIController has no chart-type selector, and the `ChartTheme` has no color fields for the new line/area/market-cap chart types.

---

## Goals

- Introduce a `ChartType` union type covering all six chart modes.
- Define a `ChartRenderer` interface that every chart type implements so `ChartTypeManager` can hold them polymorphically.
- Implement `ChartTypeManager` that instantiates, caches, shows, and hides chart renderers and orchestrates runtime switching.
- Implement `HeikinAshiTransform` with full and incremental (streaming) HA formula.
- Implement `LineChart` using `Line2` with `THREE.Line` fallback, configurable price source.
- Implement `AreaChart` with vertex-painted gradient fill using a `THREE.Mesh` ribbon and configurable floor Y.
- Extend `VolumeChart` with a "primary mode" flag so it can serve as the sole chart type (not just a sub-panel).
- Implement `MarketCapChart` as a sub-panel analogous to the existing RSI sub-panel, with dual data intake (external series or price × supply).
- Expose `setChartType(type)`, `setMarketCapSeries(series)`, and `setCirculatingSupply(supply)` on `FinanceChart`.
- Add a chart-type pill selector to `UIController` that fires a `chartTypeChange` bus event.
- Add new color fields to `ChartTheme` and both theme constants (`DARK_THEME`, `LIGHT_THEME`).
- Preserve backward compatibility: default chart type is `'candlestick'`; existing public API is unchanged.
- All hot paths remain allocation-free; new chart types follow the scratch-object pattern.
- All chart types support Linear, Helix, and Tunnel layouts.
- All chart types are streaming-compatible (`append` / `patchLast` / `updateRange`).
- All chart types are theme-reactive (`onThemeChange`) and layout-reactive (`onLayoutChange`).

## Non-Goals

- Multi-pane layouts (showing, say, a candlestick main panel and a line chart simultaneously as peers) — this spec covers one primary chart type at a time plus the market-cap sub-panel.
- Renko, Point-and-Figure, or Kagi chart types.
- Custom color per candle (e.g. paint-bar coloring) — that is a separate indicator concern.
- Persisting chart type across page reloads (no localStorage integration here).
- WebGPU TSL material variants for the new chart types — existing `MeshStandardMaterial` and `LineMaterial` are sufficient.
- Changing `CandleBuffer` schema or layout engine contracts.

---

## Design

### 2. ChartType Union

```typescript
// src/types/chartType.ts  (new file)

export type ChartType =
  | 'candlestick'   // existing CandleChart (default)
  | 'heikin-ashi'   // HA-transformed data fed into CandleChart
  | 'line'          // close-price (or configurable source) fat line
  | 'area'          // filled mountain chart under price line
  | 'volume'        // standalone volume bars as primary chart
  | 'market-cap';   // secondary sub-panel only; not a primary replacement
```

`'market-cap'` is a sub-panel type, not a primary chart type. When it is set, the primary chart type reverts to the previous primary type (or `'candlestick'` if none). Callers enable the market-cap panel independently via `setMarketCapSeries()` / `setCirculatingSupply()`.

Practical implication: `setChartType('market-cap')` is rejected with a console warning; market cap is always an additive panel.

### 3. ChartRenderer Interface

All primary chart renderers implement this interface. It intentionally mirrors the existing `CandleChart` and `VolumeChart` public method shapes so `ChartTypeManager` can call them uniformly.

```typescript
// src/charts/ChartRenderer.ts  (new file)

import type * as THREE from 'three';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';

export interface ChartRenderer {
  /**
   * Rebuild all instance transforms and colors for the range [start, end).
   * Called after loadData, setLayout, setTheme, and setChartType.
   */
  updateRange(start: number, end: number): void;

  /**
   * Append one completed candle.
   * Implementations must NOT re-append to CandleBuffer — the buffer has
   * already been written by the time this is called.
   */
  append(candle: OHLCVCandle): void;

  /**
   * Patch the live (last) candle in-place. O(1).
   */
  patchLast(partial: Partial<OHLCVCandle>): void;

  /** Swap to a new LayoutEngine and rebuild all instances. */
  onLayoutChange(layout: LayoutEngine): void;

  /** Recolor all instances for the new theme. */
  onThemeChange(theme: ChartTheme): void;

  /** Update LineMaterial resolution on canvas resize. No-op for mesh-based renderers. */
  onResize?(resolution: THREE.Vector2): void;

  /** LOD update driven by camera distance. No-op for line-based renderers. */
  updateLOD?(cameraDistance: number): void;

  /** Show or hide all scene objects owned by this renderer. */
  setVisible(v: boolean): void;

  /** Remove all scene objects and release GPU memory. */
  dispose(): void;
}
```

`CandleChart` and `VolumeChart` already satisfy this interface structurally except for the optional `onResize` and `updateLOD` methods. No changes to those files are needed; `ChartTypeManager` calls the optional methods only when present.

### 4. ChartTypeManager

`ChartTypeManager` owns the lifecycle of all primary chart renderer instances. It creates them lazily on first use, caches them so a second `setChartType('line')` does not reallocate geometry, and hides/shows them by toggling `THREE.Object3D.visible` on all owned scene objects.

```typescript
// src/charts/ChartTypeManager.ts  (new file)

import type * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';
import type { ChartType } from '../types/chartType';
import type { ChartRenderer } from './ChartRenderer';
import type { LineChartConfig } from './LineChart';
import type { AreaChartConfig } from './AreaChart';

export interface ChartTypeManagerDeps {
  scene: THREE.Scene;
  buffer: CandleBuffer;
  layout: LayoutEngine;
  theme: ChartTheme;
  maxCandles: number;
  priceToWorldY: (price: number) => number;
  /** Renderer resolution — needed by LineMaterial */
  resolution: THREE.Vector2;
  /** Injected from FinanceChart; these are the VolumeChart panel coords */
  volumePanelOffset: number;
  volumePanelHeight: number;
}

export class ChartTypeManager {
  private _deps:    ChartTypeManagerDeps;
  private _active:  ChartType = 'candlestick';
  private _cache:   Map<ChartType, ChartRenderer> = new Map();
  private _haXform: HeikinAshiTransform | null = null;
  private _mcPanel: MarketCapChart | null = null;

  constructor(deps: ChartTypeManagerDeps) { ... }

  get activeType(): ChartType { return this._active; }

  /**
   * Switch to a new chart type. Hides current renderer, creates (or unhides)
   * the new one, then runs updateRange(0, buffer.count) on the new renderer.
   * Safe to call with the same type as the current type (no-op after guard).
   */
  setChartType(type: ChartType): void { ... }

  /**
   * Forward streaming append to the active renderer.
   *
   * **CandleChart compatibility**: `CandleChart.append(candle)` internally calls
   * `buffer.append(candle)`. When `CandleChart` is the active renderer (i.e. type is
   * `'candlestick'`), the manager MUST NOT call `renderer.append(candle)` (it would
   * double-write the buffer). Instead it calls `renderer.updateRange(buffer.count - 1,
   * buffer.count)` after `FinanceChart` has already appended to the buffer.
   * `ChartTypeManager.append()` checks `renderer instanceof CandleChart` and dispatches
   * `updateRange(count-1, count)` only for that case. `HeikinAshiCandleChart` does NOT
   * extend `CandleChart` and does NOT write to the raw buffer, so it receives
   * `renderer.append(candle)` like all other renderer types.
   */
  append(candle: OHLCVCandle): void { ... }

  /** Forward patch to active renderer only. */
  patchLast(partial: Partial<OHLCVCandle>): void { ... }

  /** Return the CandleChart instance managed by this manager, or null if not yet created. */
  getCandleChart(): CandleChart | null { ... }

  /** Propagate to ALL cached renderers and to the market-cap panel. */
  onLayoutChange(layout: LayoutEngine): void { ... }

  /** Propagate to ALL cached renderers and to the market-cap panel. */
  onThemeChange(theme: ChartTheme): void { ... }

  /** Propagate to ALL cached renderers that implement onResize. */
  onResize(resolution: THREE.Vector2): void { ... }

  /** Forward to active renderer only (perf — only visible renderer needs LOD). */
  updateLOD(cameraDistance: number): void { ... }

  /**
   * Call after loadData fills the buffer. Calls updateRange(0, buffer.count) on the active renderer.
   * Implementation body: `this._cache.get(this._active)?.updateRange(0, this._deps.buffer.count);`
   */
  onDataLoaded(): void { ... }

  /** Enable/disable the market-cap sub-panel independently of primary type. */
  setMarketCapPanel(panel: MarketCapChart | null): void { ... }

  /** Dispose ALL cached renderers and market-cap panel. */
  dispose(): void { ... }
}
```

#### Visibility management

Each `ChartRenderer` implementation owns a set of `THREE.Object3D` instances. `ChartTypeManager` calls `renderer.setVisible(false)` / `renderer.setVisible(true)` when hiding/showing a renderer, rather than removing/adding from the scene, to avoid repeated scene-graph mutations and retain GPU buffer state between type switches.

`setVisible(v: boolean): void` is a required method on the `ChartRenderer` interface. Every implementation sets `.visible` on all of its owned scene objects. `ChartTypeManager` calls it directly with no casting required:

```typescript
renderer.setVisible(false);
renderer.setVisible(true);
```

#### Switching during live streaming

A switch while a stream is active is handled as follows:

1. `ChartTypeManager.setChartType(newType)` hides the current renderer and shows/creates the new one.
2. The new renderer's `updateRange(0, buffer.count)` is called to populate from the existing buffer.
3. From this point, `append` and `patchLast` go to the new renderer.
4. The old renderer remains cached and visible=false; its buffer reference is still valid (shared), so a subsequent switch back requires only `renderer.setVisible(true)` + `updateRange`.

For `'heikin-ashi'`: `HeikinAshiTransform` maintains running state (`prevHAOpen`, `prevHAClose`). When switching away from HA and back, `HeikinAshiTransform.reset()` is called and then `recompute(buffer)` rebuilds the full HA buffer from the raw `CandleBuffer`. This is O(n) but only happens on explicit user type switch, not on every tick.

### 5. HeikinAshiTransform

Heikin-Ashi reuses `CandleChart` for rendering — the transform operates at the data layer, producing a secondary buffer of HA-adjusted OHLCV values that are fed into the same `CandleChart.updateRange` machinery.

```typescript
// src/charts/HeikinAshiTransform.ts  (new file)

import type { CandleBuffer } from '../types/CandleBuffer';

/**
 * Heikin-Ashi formulas:
 *   HA_Close[i] = (O + H + L + C) / 4
 *   HA_Open[i]  = (HA_Open[i-1] + HA_Close[i-1]) / 2
 *   HA_High[i]  = max(H, HA_Open[i], HA_Close[i])
 *   HA_Low[i]   = min(L, HA_Open[i], HA_Close[i])
 *
 * For i=0 (seed):
 *   HA_Open[0]  = (O[0] + C[0]) / 2
 *   HA_Close[0] = (O + H + L + C) / 4
 */
export class HeikinAshiTransform {
  /** HA-adjusted OHLCV stored as Float32Array with stride 5 (o,h,l,c,v). */
  readonly haData: Float32Array;
  private _prevHAOpen      = 0;
  private _prevHAClose     = 0;
  private _prevPrevHAOpen  = 0;  // i-2 HA open; used by patchLast for live-candle seed
  private _prevPrevHAClose = 0;  // i-2 HA close; used by patchLast for live-candle seed
  private _count           = 0;

  constructor(capacity: number) {
    this.haData = new Float32Array(capacity * 5);
  }

  /**
   * Full recompute from raw CandleBuffer.
   * O(n). Call after loadData or after switching back to this type.
   */
  recompute(buf: CandleBuffer): void { ... }

  /**
   * Incremental: compute HA values for index `i` using running state.
   * Call in order for i = 0, 1, 2, ...
   * Returns [haOpen, haHigh, haLow, haClose].
   */
  step(i: number, buf: CandleBuffer): [number, number, number, number] { ... }

  /**
   * Patch the last HA candle using new raw OHLCV (streaming tick).
   * Does NOT advance the running state — the last HA candle is recalculated
   * from scratch using the previous candle's HA values.
   *
   * To correctly recalculate HA_Open for the live candle, `patchLast` needs the
   * HA values of the PREVIOUS completed candle (i-1). A private field `_prevPrevHAOpen`
   * and `_prevPrevHAClose` are saved before each `step()` call:
   * `_prevPrevHAOpen = _prevHAOpen; _prevPrevHAClose = _prevHAClose` (saving i-2's values).
   * `patchLast` uses `_prevPrevHAOpen` and `_prevPrevHAClose` as the seed for
   * HA_Open recalculation of the live candle.
   */
  patchLast(i: number, buf: CandleBuffer): void { ... }

  /** Reset running state (call before recompute after a type switch). */
  reset(): void {
    this._prevHAOpen      = 0;
    this._prevHAClose     = 0;
    this._prevPrevHAOpen  = 0;
    this._prevPrevHAClose = 0;
    this._count           = 0;
  }

  // Accessors into haData (same naming convention as CandleBuffer)
  haOpen(i: number):  number { return this.haData[i * 5]; }
  haHigh(i: number):  number { return this.haData[i * 5 + 1]; }
  haLow(i: number):   number { return this.haData[i * 5 + 2]; }
  haClose(i: number): number { return this.haData[i * 5 + 3]; }
  haVol(i: number):   number { return this.haData[i * 5 + 4]; }
}
```

#### HeikinAshiCandleChart

`HeikinAshiCandleChart` wraps `CandleChart` and substitutes HA prices for raw prices when calling `_updateInstance`. Because `CandleChart._updateInstance` is private, `HeikinAshiCandleChart` cannot subclass it directly. Instead it:

1. Holds a `CandleChart` instance.
2. Overrides `updateRange`, `append`, and `patchLast` to first write HA values into a synthetic `OHLCVCandle` scratch object, then delegates to `CandleChart`'s internal path via a custom subclass `_HACandleChart extends CandleChart` that overrides `_readOHLCV(i)` to read from `haData` instead of the raw buffer.

Simpler alternative (chosen): create a **shadow `CandleBuffer`** (`_haBuf: CandleBuffer`) that is kept in sync with the HA transform, then pass `_haBuf` to `CandleChart` instead of the raw buffer. The raw `CandleBuffer` is never written to by `HeikinAshiCandleChart` (the main buffer is written upstream by `FinanceChart`). This avoids any need to subclass `CandleChart`.

```
Raw CandleBuffer  →  HeikinAshiTransform  →  _haBuf (CandleBuffer)  →  CandleChart
```

`_haBuf` is a `CandleBuffer(maxCandles)` whose cells are filled from `haData` during `recompute` / `step` / `patchLast`. `CandleChart` receives `_haBuf` in its `deps.buffer`. Volume is copied verbatim from the raw buffer (HA does not transform volume).

```typescript
// src/charts/HeikinAshiCandleChart.ts  (new file)

export class HeikinAshiCandleChart implements ChartRenderer {
  private _candleChart: CandleChart;
  private _haBuf:       CandleBuffer;
  private _xform:       HeikinAshiTransform;
  private _rawBuf:      CandleBuffer; // reference to the authoritative buffer

  // Scratch OHLCVCandle for _syncHABuf — never escapes this class
  private _scratch: OHLCVCandle = { time: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

  constructor(deps: { ..., rawBuffer: CandleBuffer }) { ... }

  updateRange(start: number, end: number): void {
    for (let i = start; i < end; i++) {
      this._syncHABuf(i);
    }
    this._candleChart.updateRange(start, end);
  }

  append(candle: OHLCVCandle): void {
    const i = this._rawBuf.count - 1; // already appended to raw buf by FinanceChart
    const [o, h, l, c] = this._xform.step(i, this._rawBuf);
    this._haBuf.set(i, o, h, l, c, candle.volume);
    this._haBuf.time[i]  = candle.time;
    this._haBuf.flags[i] = c >= o ? 1 : 0;
    this._haBuf.count    = this._rawBuf.count;
    this._candleChart.updateRange(i, i + 1);
    // CandleChart.updateRange() is self-flushing
  }

  patchLast(partial: Partial<OHLCVCandle>): void {
    const i = this._rawBuf.count - 1;
    if (i < 0) return;
    this._xform.patchLast(i, this._rawBuf);
    const o = this._xform.haOpen(i);
    const h = this._xform.haHigh(i);
    const l = this._xform.haLow(i);
    const c = this._xform.haClose(i);
    this._haBuf.set(i, o, h, l, c, this._rawBuf.volume(i));
    this._haBuf.flags[i] = c >= o ? 1 : 0;
    this._candleChart.updateRange(i, i + 1);
    // CandleChart.updateRange() is self-flushing
  }

  onLayoutChange(layout: LayoutEngine): void { this._candleChart.onLayoutChange(layout); }
  onThemeChange(theme: ChartTheme):    void { this._candleChart.onThemeChange(theme); }
  updateLOD(dist: number):             void { this._candleChart.updateLOD(dist); }
  setVisible(v: boolean):              void { this._candleChart.setVisible(v); }
  dispose():                           void { this._candleChart.dispose(); }

  private _syncHABuf(i: number): void { ... } // fills _haBuf[i] from _xform; must also set _haBuf.time[i] = _rawBuf.time[i] to preserve timestamp alignment for axis labels and tooltips
}
```

Note: `CandleChart.append(candle)` internally calls `this.deps.buffer.append(candle)`. For HA mode we must NOT call `CandleChart.append` — we call `CandleChart.updateRange(i, i+1)` after syncing `_haBuf` directly. `CandleChart.updateRange()` is self-flushing.

### 6. LineChart

`LineChart` renders the price line as a `Line2` (fat line using `LineGeometry` / `LineMaterial`) with a `THREE.Line` fallback for environments where `Line2` is unavailable (though Three.js r158+ always has it).

```typescript
// src/charts/LineChart.ts  (new file)

import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { CandleBuffer }   from '../types/CandleBuffer';
import type { OHLCVCandle }    from '../types/market';
import type { ChartTheme }     from '../types/theme';
import type { LayoutEngine }   from '../layout/LayoutEngine';
import type { ChartRenderer }  from './ChartRenderer';
import type { PriceSource }    from '../types/addendum';  // existing union
import type { CandleTransform } from '../layout/LayoutEngine';  // { position: THREE.Vector3; quaternion: THREE.Quaternion; normal: THREE.Vector3 }

export interface LineChartConfig {
  source:    PriceSource;        // default: 'close'
  lineWidth: number;             // world pixels, 1–8; default: 2
  color:     string;             // hex; default: theme.line.color
  opacity:   number;             // 0–1; default: 1
}

export class LineChart implements ChartRenderer {
  private _line:     Line2 | THREE.Line;
  private _geo:      LineGeometry | THREE.BufferGeometry;
  private _mat:      LineMaterial | THREE.LineBasicMaterial;
  private _scene:    THREE.Scene;
  private _deps:     LineChartDeps;
  private _config:   LineChartConfig;
  private _useLine2: boolean;

  // Module-level scratch — each chart class maintains its own instance
  private static _scratchTransform: CandleTransform = {
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    normal: new THREE.Vector3(),
  };

  constructor(deps: LineChartDeps, config: LineChartConfig) { ... } // LineChartDeps: see § 13 Type Definitions

  updateRange(start: number, end: number): void {
    // Full geometry rebuild — Line2 does not support partial updates.
    // Positions array is pre-allocated at maxCandles*3 to avoid GC churn.
    // The array is reused across calls (module-level Float32Array).
    this._rebuildGeometry();
  }

  append(candle: OHLCVCandle): void {
    // Line geometry must be rebuilt in full — Line2 does not support append.
    this._rebuildGeometry();
  }

  patchLast(partial: Partial<OHLCVCandle>): void {
    // Patch is visible only for the last point — still requires full rebuild
    // because LineGeometry.setPositions replaces the whole buffer.
    this._rebuildGeometry();
  }

  onLayoutChange(layout: LayoutEngine): void {
    this._deps = { ...this._deps, layout };
    this._rebuildGeometry();
  }

  onThemeChange(theme: ChartTheme): void {
    const color = theme.line?.color ?? '#26a69a';
    (this._mat as LineMaterial).color?.set(color) ?? (this._mat as THREE.LineBasicMaterial).color.set(color);
  }

  onResize(resolution: THREE.Vector2): void {
    if (this._useLine2) (this._mat as LineMaterial).resolution.copy(resolution);
  }

  setVisible(v: boolean): void {
    this._line.visible = v;
  }

  dispose(): void {
    this._scene.remove(this._line);
    this._geo.dispose();
    this._mat.dispose();
  }

  private _rebuildGeometry(): void { ... }
  private _priceSource(i: number): number { ... } // reads open/high/low/close/hl2/ohlc4 from buffer
}
```

#### Geometry strategy

`_rebuildGeometry` iterates `[0, buffer.count)` once, calling `layout.getCandleTransform(i, buf, scratch)` and `_priceToWorldY(source(i))`, writing `[x, y, z]` into a module-level `Float32Array _linePositions` of size `maxCandles * 3`. On completion it calls `(geo as LineGeometry).setPositions(_linePositions.subarray(0, count*3))`. This avoids any intermediate JS array allocation.

**Minimum vertex guard**: if `count < 2`, the line is hidden (`this._line.visible = false`) because `Line2` requires at least two points.

**LOD**: Line chart has no LOD. The line is always rendered at full resolution.

#### PriceSource lookup

```typescript
private _priceSource(i: number): number {
  const buf = this._deps.buffer;
  switch (this._config.source) {
    case 'open':   return buf.open(i);
    case 'high':   return buf.high(i);
    case 'low':    return buf.low(i);
    case 'close':  return buf.close(i);
    case 'hl2':    return (buf.high(i) + buf.low(i)) / 2;
    case 'ohlc4':  return (buf.open(i) + buf.high(i) + buf.low(i) + buf.close(i)) / 4;
  }
}
```

### 7. AreaChart

`AreaChart` renders a filled "mountain" beneath the price line. The fill is achieved with a `THREE.Mesh` using `THREE.BufferGeometry` with vertex colors for gradient: the price-line vertices carry the line color, the floor vertices carry a near-transparent version of the same color.

```typescript
// src/charts/AreaChart.ts  (new file)

export interface AreaChartConfig {
  source:     PriceSource;  // default: 'close'
  lineColor:  string;       // hex; default: theme.area.lineColor
  fillColor:  string;       // hex; default: theme.area.fillColor
  floorAlpha: number;       // opacity at the floor; 0–0.5; default: 0.08
  lineWidth:  number;       // Line2 width for the price-line stroke; default: 2
}
```

#### Geometry strategy

The area fill is a triangle strip where even-indexed vertices are on the price line and odd-indexed vertices are at the floor (world Y = 0, or a configurable `floorY` offset, default 0). Vertex count = `count * 2`. Index buffer = triangle strip pattern. Vertex color array carries the gradient.

```
vertex 2i   : (x_i, priceY_i, z_i)  aT = 0.0  (price-line vertex — top of gradient)
vertex 2i+1 : (x_i, floorY,   z_i)  aT = 1.0  (floor vertex — bottom of gradient)
```

The geometry is rebuilt in full on every `updateRange` / `append` / `patchLast` call (same rationale as `LineChart` — Three.js `BufferGeometry.setAttribute` requires replacing the typed array). A pre-allocated module-level `Float32Array _areaPositions` of size `maxCandles * 6` (2 verts × 3 floats) and `_aTBuffer` of size `maxCandles * 2` (one float per vertex: `0.0` for price-line vertex, `1.0` for floor vertex) avoid per-call allocation. Price vertices and floor vertices alternate in the position array (vertex `2i` = price, vertex `2i+1` = floor); no color attribute is needed because the gradient is encoded via the `aT` attribute and a `ShaderMaterial`.

The `_fillMat` is a `THREE.ShaderMaterial` with the following uniforms and shaders:

```glsl
// uniforms: topColor (vec3), bottomColor (vec3), bottomAlpha (float)

// vertexShader:
attribute float aT;
varying float vT;
void main() {
  vT = aT;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// fragmentShader:
varying float vT;
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float bottomAlpha;
void main() {
  float alpha = mix(1.0, bottomAlpha, vT);
  gl_FragColor = vec4(mix(topColor, bottomColor, vT), alpha);
}
```

`aT` is supplied from `_aTBuffer`: `0.0` for price-line vertices (top), `1.0` for floor vertices (bottom).

A second `Line2` object renders the stroke on top of the fill (same geometry positions as the price-line pass only). This reuses `LineChart` geometry building logic via a shared private `_buildLinePositions` helper.

```typescript
export class AreaChart implements ChartRenderer {
  private _fillMesh:   THREE.Mesh;
  private _fillGeo:    THREE.BufferGeometry;
  private _fillMat:    THREE.ShaderMaterial; // custom gradient: uniform topColor, uniform bottomColor, uniform bottomAlpha
  private _strokeLine: Line2 | THREE.Line;
  private _strokeGeo:  LineGeometry | THREE.BufferGeometry;
  private _strokeMat:  LineMaterial | THREE.LineBasicMaterial;
  private _scene:      THREE.Scene;
  private _config:     AreaChartConfig;
  private _deps:       AreaChartDeps;
  private _useLine2:   boolean;

  constructor(deps: AreaChartDeps, config: AreaChartConfig) { ... }

  updateRange(start: number, end: number): void { this._rebuild(); }
  append(_: OHLCVCandle):              void { this._rebuild(); }
  patchLast(_: Partial<OHLCVCandle>):  void { this._rebuild(); }
  onLayoutChange(layout: LayoutEngine): void { this._deps = {...this._deps, layout}; this._rebuild(); }
  onThemeChange(theme: ChartTheme):    void { this._applyTheme(theme); this._rebuild(); }
  onResize(res: THREE.Vector2):        void { if (this._useLine2) (this._strokeMat as LineMaterial).resolution.copy(res); }

  setVisible(v: boolean): void {
    this._fillMesh.visible   = v;
    this._strokeLine.visible = v;
  }

  dispose(): void {
    this._scene.remove(this._fillMesh, this._strokeLine);
    this._fillGeo.dispose();   this._fillMat.dispose();
    this._strokeGeo.dispose(); this._strokeMat.dispose();
  }

  private _rebuild(): void { ... }
  private _applyTheme(theme: ChartTheme): void { ... }
}
```

**renderOrder**: `_fillMesh.renderOrder = 2`, `_strokeLine.renderOrder = 3`. Candle/volume are at `renderOrder = 0` (default), indicators at `5`. Area fill sits between them.

**Helix / Tunnel layouts**: the floor Y is fixed at world Y = 0 regardless of layout. For Helix and Tunnel layouts the floor strip will appear at Y=0 in world space, which may visually diverge from the chart curve — this is intentional and acceptable for v1 of the spec. A future improvement could project the floor onto the layout surface normal.

### 8. Enhanced VolumeChart (Primary Mode)

When `VolumeChart` is used as the primary chart type (not the sub-panel), it should fill the full Y range [0, 10] rather than the sub-panel height/offset. A `primaryMode: boolean` flag controls this.

```typescript
// Modification to src/charts/VolumeChart.ts

export interface VolumeChartDeps {
  scene:          THREE.Scene;
  buffer:         CandleBuffer;
  layout:         LayoutEngine;
  theme:          ChartTheme;
  maxCandles:     number;
  panelOffset:    number;  // world Y of the bottom of the bar (default -4 for sub-panel)
  panelHeight:    number;  // max bar height in world units (default 3 for sub-panel)
  primaryMode?:   boolean; // if true, panelOffset=0, panelHeight=10, axis Y-label shows volume
}
```

In `FinanceChart.init()`, the existing `VolumeChart` is created with `primaryMode: false` (unchanged). `ChartTypeManager` creates a separate `VolumeChart` instance with `primaryMode: true, panelOffset: 0, panelHeight: 10` when the 'volume' type is active. The two instances do not coexist in the scene — visibility is toggled via `renderer.setVisible(false/true)` as described above.

`VolumeChart` implements `ChartRenderer` already structurally. The required code changes to `src/charts/VolumeChart.ts` are:
1. Add the `primaryMode` field to `VolumeChartDeps` and adjust the Y mapping in `_updateInstance`.
2. Add `setVisible(v: boolean): void` as a public method. It sets `.visible` on all `InstancedMesh` objects owned by the chart.

### 9. MarketCapChart

`MarketCapChart` is a sub-panel rendered via scissor/viewport after the main scene render, analogous to `SubViewRenderer` used by RSI/MACD. It has its own `THREE.OrthographicCamera` and `THREE.Scene`.

```typescript
// src/charts/MarketCapChart.ts  (new file)

import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { ChartTheme } from '../types/theme';

export interface MarketCapPoint {
  time:  number; // Unix ms UTC
  value: number; // market cap in USD (or derived units)
}

export interface MarketCapChartConfig {
  heightFraction: number;  // fraction of canvas height; default 0.18
  color:          string;  // hex; default: theme.marketCap.lineColor
  fillColor:      string;  // hex; default: theme.marketCap.fillColor
  floorAlpha:     number;  // default 0.08
  lineWidth:      number;  // default 1.5
  /** Y-axis label prefix, e.g. '$' */
  labelPrefix:    string;  // default '$'
}

export class MarketCapChart {
  private _subScene:  THREE.Scene;
  private _subCam:    THREE.OrthographicCamera;
  private _viewport:  THREE.Vector4;
  private _line:      Line2;
  private _geo:       LineGeometry;
  private _mat:       LineMaterial;
  private _fillMesh:  THREE.Mesh;
  private _fillGeo:   THREE.BufferGeometry;
  /** ShaderMaterial using the same aT-attribute gradient approach as AreaChart:
   *  uniforms topColor (vec3), bottomColor (vec3), bottomAlpha (float);
   *  vertex attribute aT: 0.0 for line vertices, 1.0 for floor vertices. */
  private _fillMat:   THREE.ShaderMaterial;
  private _aTBuffer:  Float32Array;
  private _series:    MarketCapPoint[] = [];
  private _config:    MarketCapChartConfig;
  private _enabled:   boolean = false;

  constructor(
    renderer: THREE.WebGLRenderer,
    config: Partial<MarketCapChartConfig>,
    theme: ChartTheme,
  ) { ... }

  /**
   * Replace the series data with an externally-provided market cap series.
   * Triggers a full geometry rebuild.
   */
  setSeries(series: MarketCapPoint[]): void { ... }

  /**
   * Derive market cap from price series × circulating supply.
   * `priceBuffer` is the raw CandleBuffer; supply is coins in circulation.
   */
  deriveFromSupply(buffer: CandleBuffer, supply: number): void { ... }

  /**
   * Append one new data point (streaming). Time must be >= last point time.
   * If time matches last point, patches in-place.
   */
  appendPoint(point: MarketCapPoint): void { ... }

  /** Render the sub-panel. Call after main scene render each frame. `yOffsetPx` is the bottom-edge Y pixel offset from canvas bottom. */
  render(renderer: THREE.WebGLRenderer, yOffsetPx: number): void { ... }

  /** Show or hide the panel. */
  setEnabled(enabled: boolean): void { this._enabled = enabled; }

  /** Whether the panel is currently enabled. */
  get isEnabled(): boolean { return this._enabled; }

  onThemeChange(theme: ChartTheme): void { ... }

  onResize(renderer: THREE.WebGLRenderer): void { ... }

  dispose(): void { ... }

  private _rebuild(): void { ... }
  private _computeDomain(): { min: number; max: number } { ... }
}
```

#### Viewport arbitration

**`MarketCapChart.render(renderer, yOffsetPx: number): void`** takes a second parameter for the bottom-edge Y pixel offset (measured from canvas bottom). `FinanceChart._renderLoop()` computes the stack: the RSI panel (if visible) takes the bottom `heightFraction * canvas.height` pixels; the MarketCapChart panel is placed immediately above it. `FinanceChart` is responsible for computing `yOffsetPx` before calling `render()`.

#### Data intake

`MarketCapChart` operates on `MarketCapPoint[]` independently of the primary `CandleBuffer`. When derived from supply, `deriveFromSupply(buffer, supply)` iterates `[0, buffer.count)` and builds a `MarketCapPoint[]` where `value = buffer.close(i) * supply`. This is O(n) and only called on `loadData` or when supply changes.

#### Y-axis

`MarketCapChart` computes its own Y domain from `_series` (min/max values) and maps to `[-1, 1]` in the orthographic sub-camera space. It does not share the main `AxisManager`. A simple set of 3–5 reference tick labels is rendered using `THREE.Sprite` with canvas texture (consistent with the existing `SubViewRenderer` pattern which does not use TroikaLabelPool for sub-panels).

#### Time alignment

The market cap panel's X axis is aligned to the same candle index space as the main chart. When using `deriveFromSupply`, indices align perfectly. When using an external `MarketCapPoint[]` series, `MarketCapChart` performs a binary search (`lowerBound`) to find the closest time match for each visible X position. Line breaks for missing time points are implemented by creating separate `Line2` objects per contiguous segment, rather than using NaN sentinels (which `LineGeometry` does not support natively).

### 10. FinanceChart Integration

#### New private fields

```typescript
// src/FinanceChart.ts additions

private _chartTypeManager?: ChartTypeManager;
private _marketCapChart?:   MarketCapChart;
private _circulatingSupply = 0;
private _marketCapSeries:  MarketCapPoint[] = [];
```

#### init() changes

After creating `_candleChart` and `_volumeChart`, when `enableAddendum` is true (or unconditionally — see decision below), instantiate `ChartTypeManager`:

```typescript
// in FinanceChart.init(), after existing chart construction:

this._chartTypeManager = new ChartTypeManager({
  scene:             this._chartScene.scene,
  buffer:            this._candleBuffer,
  layout:            this._layout,
  theme:             this._theme,
  maxCandles:        this._maxCandles,
  priceToWorldY:     (p) => this._priceToWorldY(p),
  resolution:        new THREE.Vector2(
    this._rendererManager.width,
    this._rendererManager.height,
  ),
  volumePanelOffset: -4,
  volumePanelHeight: 3,
});
```

**The existing `this._candleChart = new CandleChart(...)` construction block is REMOVED from `FinanceChart.init()` and moved into the `ChartTypeManager` constructor as the initial `'candlestick'` renderer.** `this._candleChart` is reassigned via `this._candleChart = this._chartTypeManager.getCandleChart()` after `ChartTypeManager` construction. `CrosshairController` and other consumers that reference `this._candleChart` continue to work because the field is updated before they are initialized. `ChartTypeManager` exposes a `getCandleChart(): CandleChart | null` accessor for this purpose.

#### loadData() changes

After the existing buffer fill loop:

```typescript
this._chartTypeManager?.onDataLoaded();  // triggers updateRange(0, count) on active renderer

if (this._circulatingSupply > 0) {
  this._marketCapChart?.deriveFromSupply(this._candleBuffer, this._circulatingSupply);
}
if (this._marketCapSeries.length > 0) {
  this._marketCapChart?.setSeries(this._marketCapSeries);
}
```

#### appendCandle() / updateLastCandle() changes

```typescript
// appendCandle:
this._chartTypeManager?.append(candle);

// updateLastCandle:
this._chartTypeManager?.patchLast(partial);
```

The existing direct calls to `this._candleChart.append` / `this._volumeChart.append` are replaced by the `ChartTypeManager` dispatch. The VolumeChart sub-panel (the existing instance with `primaryMode: false`) is still updated unconditionally — it is not managed by `ChartTypeManager` because it is always visible as a secondary element regardless of primary chart type. Exception: when `setChartType('volume')` is active, the volume sub-panel is hidden (it would be redundant with the primary volume chart).

#### New public methods

```typescript
/**
 * Switch the primary chart rendering mode.
 * Safe to call at any time after init(), including during live streaming.
 * 'market-cap' is not a valid primary type — logs a warning and returns.
 */
setChartType(type: ChartType): void {
  if (type === 'market-cap') {
    console.warn('[three-finance-viz] setChartType("market-cap") is not supported. ' +
      'Use setMarketCapSeries() or setCirculatingSupply() to control the market cap panel.');
    return;
  }
  if (!this._chartTypeManager) {
    console.warn('[three-finance-viz] setChartType() requires enableAddendum: true. Chart type not changed.');
    return;
  }
  this._chartTypeManager?.setChartType(type);
  this._uiController?.syncChartType(type);
  // Hide volume sub-panel when primary type is 'volume'
  this._volumeChart?.setVisible(type !== 'volume');
}

/**
 * Provide an external market cap time series.
 * Creates and shows the MarketCapChart sub-panel if not already present.
 * Overrides any derived supply data.
 */
setMarketCapSeries(series: MarketCapPoint[]): void {
  this._marketCapSeries   = series;
  this._circulatingSupply = 0;
  this._ensureMarketCapChart();
  this._marketCapChart!.setSeries(series);
  this._marketCapChart!.setEnabled(true);
}

/**
 * Derive market cap from price * circulatingSupply.
 * Creates and shows the MarketCapChart sub-panel if not already present.
 * Overrides any external series data.
 */
setCirculatingSupply(supply: number): void {
  this._circulatingSupply = supply;
  this._marketCapSeries   = [];
  this._ensureMarketCapChart();
  if (this._candleBuffer.count > 0) {
    this._marketCapChart!.deriveFromSupply(this._candleBuffer, supply);
  }
  this._marketCapChart!.setEnabled(true);
}

private _ensureMarketCapChart(): void {
  if (!this._marketCapChart) {
    this._marketCapChart = new MarketCapChart(
      this._rendererManager.renderer,
      {},  // uses theme defaults
      this._theme,
    );
  }
}
```

#### setTheme() / setLayout() changes

```typescript
// setTheme additions:
this._chartTypeManager?.onThemeChange(theme);
this._marketCapChart?.onThemeChange(theme);

// setLayout additions:
this._chartTypeManager?.onLayoutChange(this._layout);
// marketCapChart does not depend on layout engine — no change needed
```

#### _renderLoop() changes

After the existing sub-view render call:

```typescript
if (this._marketCapChart?.isEnabled) {
  // Compute yOffsetPx: RSI panel (if visible) sits at the bottom; market cap sits above it.
  const rsiHeight = this._subViewRenderer?.isVisible
    ? this._subViewRenderer.heightFraction * this._rendererManager.height
    : 0;
  this._marketCapChart.render(this._rendererManager.renderer, rsiHeight);
}
```

#### dispose() changes

```typescript
this._chartTypeManager?.dispose();
this._marketCapChart?.dispose();
```

#### Data flow summary

```
FinanceChart.loadData(candles)
  └─ CandleBuffer.append × N
  └─ ChartTypeManager.onDataLoaded()
       └─ activeRenderer.updateRange(0, N)
            ├─ CandleChart (candlestick / heikin-ashi)
            ├─ LineChart
            ├─ AreaChart
            └─ VolumeChart (primary)
  └─ VolumeChart(sub-panel).recalculateScale() + updateRange(0, N)
  └─ MarketCapChart.setSeries() or .deriveFromSupply()  [if enabled]

FinanceChart.appendCandle(candle)
  └─ CandleBuffer.append(candle)
  └─ ChartTypeManager.append(candle)
       ├─ CandleChart ('candlestick' only): calls updateRange(count-1, count)  [NOT append — buffer already written; instanceof CandleChart check does NOT catch HeikinAshiCandleChart]
       └─ HeikinAshiCandleChart / LineChart / AreaChart / VolumeChart(primary): calls renderer.append(candle)
  └─ VolumeChart(sub-panel).append(candle)  [if visible]
  └─ MarketCapChart.appendPoint(derived)    [if enabled + supply mode]

FinanceChart.updateLastCandle(partial)
  └─ CandleBuffer.set(last, ...)
  └─ ChartTypeManager.patchLast(partial)
  └─ VolumeChart(sub-panel).patchLast(partial)  [if visible]
```

### 11. UIController Integration

#### New section: Chart Type

A new section is inserted in `UI_TEMPLATE` between the "Layout" section and the "Indicators" section:

```html
<!-- Section: Chart Type -->
<section class="chart-ui__section">
  <label class="chart-ui__label">Chart Type</label>
  <div class="chart-ui__pill-group" id="ui-chart-type-group">
    <button class="chart-ui__pill chart-ui__pill--active" data-value="candlestick">Candles</button>
    <button class="chart-ui__pill" data-value="heikin-ashi">HA</button>
    <button class="chart-ui__pill" data-value="line">Line</button>
    <button class="chart-ui__pill" data-value="area">Area</button>
    <button class="chart-ui__pill" data-value="volume">Volume</button>
  </div>
</section>
```

`'market-cap'` is intentionally absent — it is controlled programmatically via `setMarketCapSeries` / `setCirculatingSupply`, not via a pill.

#### `_bindEvents` addition

```typescript
this.root.querySelector('#ui-chart-type-group')!
  .addEventListener('click', (e: Event) => {
    const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
    if (!btn) return;
    this._setActivePill('#ui-chart-type-group', btn.dataset.value!);
    this.state.chartType = btn.dataset.value as ChartType;
    this.bus.emit('chartTypeChange', { type: this.state.chartType });
  });
```

#### `syncFromState` addition

```typescript
if (state.chartType !== undefined)
  this._setActivePill('#ui-chart-type-group', state.chartType);
```

#### `syncChartType` (new method)

```typescript
syncChartType(type: ChartType): void {
  this._setActivePill('#ui-chart-type-group', type);
  this.state.chartType = type;
}
```

#### `UIState` extension

```typescript
// src/types/addendum.ts addition

export interface UIState {
  // ... existing fields ...
  chartType?: ChartType;   // optional; default 'candlestick' applied internally by UIController
}
```

#### Bus event wiring in `_initAddendum`

```typescript
bus.on('chartTypeChange', (p: { type: ChartType }) => this.setChartType(p.type));
```

### 12. Theme Integration

#### New theme fields

```typescript
// src/types/theme.ts — extend ChartTheme interface

export interface ChartTheme {
  // ... existing fields ...
  line?: {
    color:     string;  // price line stroke color
    lineWidth: number;  // default world pixels; 1–8
  };
  area?: {
    lineColor:  string;  // stroke on top of fill
    fillColor:  string;  // fill gradient top color (floor fades to transparent)
    floorAlpha: number;  // 0–0.5
  };
  marketCap?: {
    lineColor:  string;
    fillColor:  string;
    floorAlpha: number;
  };
}
```

#### DARK_THEME additions

```typescript
line: {
  color:     '#26a69a',
  lineWidth: 2,
},
area: {
  lineColor:  '#26a69a',
  fillColor:  '#26a69a',
  floorAlpha: 0.08,
},
marketCap: {
  lineColor:  '#7c4dff',
  fillColor:  '#7c4dff',
  floorAlpha: 0.08,
},
```

#### LIGHT_THEME additions

```typescript
line: {
  color:     '#00897b',
  lineWidth: 2,
},
area: {
  lineColor:  '#00897b',
  fillColor:  '#00897b',
  floorAlpha: 0.10,
},
marketCap: {
  lineColor:  '#5e35b1',
  fillColor:  '#5e35b1',
  floorAlpha: 0.10,
},
```

### 13. Type Definitions

All new TypeScript types collected:

```typescript
// src/types/chartType.ts
export type ChartType = 'candlestick' | 'heikin-ashi' | 'line' | 'area' | 'volume' | 'market-cap';

// src/charts/ChartRenderer.ts
export interface ChartRenderer { ... }  // full definition above

// src/charts/LineChart.ts
export interface LineChartConfig {
  source:    PriceSource;
  lineWidth: number;
  color:     string;
  opacity:   number;
}
export interface LineChartDeps {
  scene:         THREE.Scene;
  buffer:        CandleBuffer;
  layout:        LayoutEngine;
  theme:         ChartTheme;
  maxCandles:    number;
  priceToWorldY: (price: number) => number;
  resolution:    THREE.Vector2;
}

// src/charts/AreaChart.ts
export interface AreaChartConfig {
  source:     PriceSource;
  lineColor:  string;
  fillColor:  string;
  floorAlpha: number;
  lineWidth:  number;
}
export interface AreaChartDeps {
  scene:         THREE.Scene;
  buffer:        CandleBuffer;
  layout:        LayoutEngine;
  theme:         ChartTheme;
  maxCandles:    number;
  priceToWorldY: (price: number) => number;
  resolution?:   THREE.Vector2; // only needed when Line2 stroke is used
  floorY:        number;  // world Y for fill floor; default 0
}

// src/charts/MarketCapChart.ts
export interface MarketCapPoint { time: number; value: number; }
export interface MarketCapChartConfig {
  heightFraction: number;
  color:          string;
  fillColor:      string;
  floorAlpha:     number;
  lineWidth:      number;
  labelPrefix:    string;
}

// src/charts/ChartTypeManager.ts
export interface ChartTypeManagerDeps { ... }  // full definition above

// src/types/addendum.ts — UIState extension
// chartType?: ChartType field added to UIState (optional; default 'candlestick' applied by UIController)
```

---

## Design Decisions

**Decision**: `HeikinAshiCandleChart` uses a shadow `CandleBuffer` (`_haBuf`) rather than subclassing `CandleChart` or patching `_updateInstance`.
**Alternatives considered**: (a) subclass `CandleChart` and override `_updateInstance` — rejected because `_updateInstance` is private and TypeScript does not allow overriding private members; (b) make `_updateInstance` protected — rejected because it would widen the API surface of `CandleChart` for a single consumer; (c) fork `CandleChart` into `HACandleChart` — rejected because it creates a maintenance burden duplicating 398 lines.
**Rationale**: The shadow buffer pattern is the minimal, zero-subclassing approach. It adds one `CandleBuffer` allocation (same size as the main buffer) but requires no changes to `CandleChart`.

**Decision**: `ChartTypeManager` is opt-in when `enableAddendum: true`.
**Alternatives considered**: Always create `ChartTypeManager` regardless of `enableAddendum`.
**Rationale**: Callers who do not set `enableAddendum: true` have zero additional allocations. `setChartType()` is guarded with `this._chartTypeManager?.setChartType(type)`, so calling it without the manager is a safe no-op. This maintains full backward compatibility.

**Decision**: `LineChart` and `AreaChart` rebuild geometry in full on every `updateRange`, `append`, and `patchLast` call.
**Alternatives considered**: Incremental append for `Line2` by tracking the last built count and appending new positions only.
**Rationale**: `LineGeometry.setPositions(array)` replaces the entire position buffer; there is no `appendPositions` API. Partial updates would require maintaining a full-size typed array anyway. Full rebuilds from a pre-allocated typed array have predictable O(n) cost and no GC pressure — consistent with the codebase pattern.

**Decision**: Market cap is a sub-panel only, never a primary chart type.
**Alternatives considered**: Making market cap a primary chart type that replaces the candle chart.
**Rationale**: Market cap data is structurally different (single time series vs OHLCV) and its Y-axis scale (billions of dollars) is incommensurable with price Y. Mixing them in one Y axis would be misleading. Sub-panel rendering is the established pattern for non-price series (RSI, MACD use it).

**Decision**: The VolumeChart sub-panel instance is kept alive and separately managed even when the 'volume' primary type is active.
**Alternatives considered**: Dispose the sub-panel and only use the primary-mode instance.
**Rationale**: The sub-panel was created in `init()` and its reference is used by `CrosshairController` and other systems. Disposing it on type switch would require audit of all consumers. Visibility toggling is cheaper and safer.

**Decision**: `AreaChart` uses a `THREE.ShaderMaterial` with a `aT` gradient attribute rather than `THREE.MeshBasicMaterial` with `vertexColors`.
**Alternatives considered**: `MeshBasicMaterial` with `vertexColors` and per-vertex alpha encoded in a `Float32Array` of RGBA values.
**Rationale**: `ShaderMaterial` with a `aT` gradient attribute is used instead of `MeshBasicMaterial` vertexColors, because `MeshBasicMaterial` does not support per-vertex alpha. The `ShaderMaterial` approach uses `uniform topColor`, `uniform bottomColor`, and `uniform bottomAlpha` to achieve the gradient, with a `aT` float attribute (0.0 = price vertex, 1.0 = floor vertex) encoding gradient position.

**Decision**: `ChartType = 'market-cap'` is defined in the union but `setChartType('market-cap')` is a guarded no-op with a console warning.
**Alternatives considered**: Remove 'market-cap' from the `ChartType` union entirely.
**Rationale**: Including it in the union makes the exhaustive switch pattern (`never` assertion) correct — a future developer who adds market-cap as a real primary type will be forced to handle all branches. The runtime guard provides a clear error message in the meantime.

---

## Configuration

All config values live in `FinanceChartOptions` or chart-type-specific config objects. No new environment or build-time config is introduced.

| Value | Type | Default | Validation |
|---|---|---|---|
| `LineChartConfig.source` | `PriceSource` | `'close'` | must be one of the six `PriceSource` values |
| `LineChartConfig.lineWidth` | `number` | `2` | 1–8; clamped silently |
| `LineChartConfig.opacity` | `number` | `1` | 0–1; clamped silently |
| `AreaChartConfig.floorAlpha` | `number` | `0.08` | 0–0.5; clamped silently |
| `MarketCapChartConfig.heightFraction` | `number` | `0.18` | 0.05–0.40; clamped silently |
| `VolumeChartDeps.primaryMode` | `boolean` | `false` | n/a |

---

## Files Changed

| File | Action | Description |
|---|---|---|
| `src/types/chartType.ts` | Create | `ChartType` union type |
| `src/charts/ChartRenderer.ts` | Create | `ChartRenderer` interface |
| `src/charts/HeikinAshiTransform.ts` | Create | HA formula + streaming state + shadow buffer sync |
| `src/charts/HeikinAshiCandleChart.ts` | Create | `ChartRenderer` impl wrapping `CandleChart` with shadow `CandleBuffer` |
| `src/charts/LineChart.ts` | Create | Fat-line chart with `Line2` + fallback, configurable source |
| `src/charts/AreaChart.ts` | Create | Mountain chart with gradient fill mesh + stroke line |
| `src/charts/MarketCapChart.ts` | Create | Sub-panel area chart for market cap data |
| `src/charts/ChartTypeManager.ts` | Create | Orchestrates renderer switching, caching, visibility |
| `src/charts/VolumeChart.ts` | Modify | Add `primaryMode` field to `VolumeChartDeps`; adjust Y mapping; add `setVisible()` |
| `src/types/addendum.ts` | Modify | Add `chartType?: ChartType` to `UIState` |
| `src/types/theme.ts` | Modify | Add `line`, `area`, `marketCap` sections to `ChartTheme`; update `DARK_THEME` and `LIGHT_THEME` |
| `src/ui/UIController.ts` | Modify | Add chart-type pills section to `UI_TEMPLATE`; bind `chartTypeChange` event; add `syncChartType()` method |
| `src/FinanceChart.ts` | Modify | Add `_chartTypeManager`, `_marketCapChart`, `_circulatingSupply`, `_marketCapSeries` fields; wire into `init()`, `loadData()`, `appendCandle()`, `updateLastCandle()`, `setTheme()`, `setLayout()`, `_renderLoop()`, `dispose()`; add `setChartType()`, `setMarketCapSeries()`, `setCirculatingSupply()` public methods |
| `src/index.ts` | Modify | Re-export new public types: `ChartType`, `ChartRenderer`, `MarketCapPoint`, `LineChartConfig`, `AreaChartConfig` |

---

## Implementation Plan

### Phase 1 — Foundation types and interfaces

1. Create `src/types/chartType.ts` with the `ChartType` union.
2. Create `src/charts/ChartRenderer.ts` with the `ChartRenderer` interface.
3. Extend `src/types/theme.ts`: add `line`, `area`, `marketCap` fields to `ChartTheme` interface and fill values into `DARK_THEME` / `LIGHT_THEME`.
4. Extend `src/types/addendum.ts`: add `chartType?: ChartType` to `UIState`; default `'candlestick'` is applied internally by `UIController`.
5. **Verify**: `tsc --noEmit` passes with no errors.

### Phase 2 — HeikinAshi

6. Create `src/charts/HeikinAshiTransform.ts`: implement `recompute`, `step`, `patchLast`, `reset`, and accessors. Write unit tests against the HA formula with a known 5-candle dataset (see Test Plan).
7. Create `src/charts/HeikinAshiCandleChart.ts`: implement `updateRange`, `append`, `patchLast`, `onLayoutChange`, `onThemeChange`, `updateLOD`, `setVisible`, `dispose`. Unit test the HA sync path.
8. **Verify**: manual smoke test — load 200 candles, switch to `'heikin-ashi'`, confirm all candles render with smoothed bodies.

### Phase 3 — LineChart

9. Create `src/charts/LineChart.ts`: implement module-level `Float32Array _linePositions`, `_rebuildGeometry`, `_priceSource`, all `ChartRenderer` methods. Test with Line2 present; verify fallback path compiles.
10. **Verify**: load 500 candles, instantiate `LineChart` directly, call `updateRange(0, 500)`, confirm no allocations in `_rebuildGeometry` (use Chrome DevTools allocation profiler).

### Phase 4 — AreaChart

11. Create `src/charts/AreaChart.ts`: implement fill mesh + stroke line, module-level `_areaPositions` / `_aTBuffer` typed arrays, `ShaderMaterial` with gradient uniforms and `aT` attribute, `_rebuild`, `_applyTheme`, all `ChartRenderer` methods.
12. **Verify**: render area chart with 500 candles under all three layouts. Confirm fill is visible and gradient is correct.

### Phase 5 — MarketCapChart

13. Create `src/charts/MarketCapChart.ts`: implement `setSeries`, `deriveFromSupply`, `appendPoint`, `render`, `onThemeChange`, `onResize`, `dispose`, `_rebuild`, `_computeDomain`.
14. Test `deriveFromSupply` with a 500-candle buffer and a known supply. Confirm rendered Y range maps supply×close correctly.
15. Test `setSeries` with an external series that has gaps (some candle times have no market cap data). Confirm line breaks at gaps.

### Phase 6 — VolumeChart primary mode

16. Modify `src/charts/VolumeChart.ts`: add `primaryMode` to `VolumeChartDeps`; when `primaryMode === true`, use `panelOffset: 0, panelHeight: 10` regardless of passed values; add `setVisible(v: boolean): void` as a public method that sets `.visible` on all owned `InstancedMesh` objects.
17. **Verify**: instantiate `VolumeChart` with `primaryMode: true`, load 500 candles, confirm bars span full [0, 10] world-Y range.

### Phase 7 — ChartTypeManager

18. Create `src/charts/ChartTypeManager.ts`: implement `setChartType` (create-or-show renderer, hide previous via `renderer.setVisible(false/true)`, call `updateRange`), `append` (with CandleChart `updateRange(count-1, count)` dispatch), `patchLast`, `onDataLoaded`, `onLayoutChange`, `onThemeChange`, `onResize`, `updateLOD`, `getCandleChart`, `dispose`.
19. Integration test: load 200 candles, cycle through all five primary types, confirm each renders without artifacts and previous renderer is hidden.
20. Integration test: switch type mid-stream (append 50 candles after switch), confirm new renderer updates correctly.

### Phase 8 — FinanceChart wiring

21. Modify `src/FinanceChart.ts`: add new private fields; modify `init()` to create `ChartTypeManager`; update `loadData`, `appendCandle`, `updateLastCandle`, `setTheme`, `setLayout`, `_renderLoop`, `dispose`; add `setChartType`, `setMarketCapSeries`, `setCirculatingSupply` public methods.
22. **Verify**: `tsc --noEmit` passes. Existing demo (`demo.ts` or equivalent) still works with default options.

### Phase 9 — UIController

23. Modify `src/ui/UIController.ts`: add chart-type section to `UI_TEMPLATE`, bind `chartTypeChange` event in `_bindEvents`, add `syncChartType` method, extend `syncFromState` to handle `state.chartType`.
24. In `FinanceChart._initAddendum`: wire `chartTypeChange` bus event to `setChartType`.

### Phase 10 — Exports and cleanup

25. Update `src/index.ts` to re-export all new public types.
26. Run full `tsc --noEmit` and fix any remaining type errors.
27. Run existing tests; confirm no regressions.

---

## Error Handling

| Scenario | Behavior |
|---|---|
| `setChartType('market-cap')` | `console.warn(...)` and early return; no state change |
| `setChartType(type)` called before `init()` resolves | `_chartTypeManager` is undefined; optional chaining silently no-ops |
| `CandleBuffer` at capacity during `append` in HA mode | `HeikinAshiCandleChart.append` checks `rawBuf.count - 1 >= 0` before indexing; the capacity check is upstream in `FinanceChart.appendCandle` (existing behavior unchanged) |
| `LineChart`/`AreaChart` called with `buffer.count < 2` | `_rebuildGeometry` sets `_line.visible = false` and returns; no geometry is uploaded |
| `MarketCapChart.setSeries([])` | Clears geometry and hides the panel |
| `MarketCapChart.deriveFromSupply(buf, 0)` | Treated as supply=0: all values = 0; line renders as flat at floor |
| `setMarketCapSeries` called before `init()` | `_ensureMarketCapChart` is guarded by checking `_rendererManager` existence; the series is stored in `_marketCapSeries` and applied in `loadData` |
| `onLayoutChange` propagated to `MarketCapChart` | No-op: market cap panel does not use `LayoutEngine`; `onLayoutChange` is not defined on `MarketCapChart` |
| Theme missing new fields (e.g. legacy `ChartTheme` without `line`) | Optional chaining: `theme.line?.color ?? '#26a69a'` in `LineChart.onThemeChange`; provides graceful fallback for callers with pre-existing theme objects |

---

## Backward Compatibility

- **Default chart type is `'candlestick'`**: callers who never call `setChartType` see zero behavioral change.
- **`ChartTypeManager` is not created when `enableAddendum: false`** (default): `setChartType` is a guarded no-op, and the `_candleChart` / `_volumeChart` flow remains unchanged.
- **`ChartTheme` additions are additive**: the interface gains new optional sections (`line?`, `area?`, `marketCap?`). Existing `ChartTheme` objects created by callers will not have these fields; all consumers use optional chaining with fallback colors (e.g. `theme.line?.color ?? '#26a69a'`). `DARK_THEME` and `LIGHT_THEME` are updated to include the new fields, so callers using the exported constants get correct defaults.
- **`UIState.chartType`** is a new optional field (`chartType?: ChartType`); it defaults to `'candlestick'` applied internally by `UIController`. Callers who hold a reference to `UIState` will see the new field; they are not required to set it.
- **`VolumeChart` constructor signature** gains an optional `primaryMode` field; existing callers pass `panelOffset` and `panelHeight` as before and are unaffected.

---

## Test Plan

### Unit tests

**`HeikinAshiTransform`**
- Given seed candle `{o:10, h:12, l:9, c:11}`: `haClose = (10+12+9+11)/4 = 10.5`, `haOpen = (10+11)/2 = 10.5`. Verify.
- Given 5 known candles, verify full `recompute` output matches manually calculated HA values for all 5.
- Verify `patchLast` with a changed close does not advance running state (i.e., the *next* `step` still uses the pre-patch HA close, not the patched one).
- Edge case: single candle. `recompute` on buffer with count=1 must not throw.
- Edge case: `reset()` then `recompute` produces the same results as a fresh instance.

**`LineChart._priceSource`**
- Verify each of the six `PriceSource` values returns the correct derived price.
- `hl2` = (high + low) / 2, `ohlc4` = (o+h+l+c) / 4.

**`LineChart._rebuildGeometry`**
- Empty buffer (count=0): `_line.visible === false`, no throw.
- Single candle (count=1): `_line.visible === false` (Line2 requires ≥ 2 points).
- 500 candles: `_line.visible === true`, no new `Float32Array` allocated during the call (verify via snapshot before/after).

**`HeikinAshiCandleChart`**
- After `append`, `_haBuf` values at the new index match `HeikinAshiTransform.step` output.
- After `patchLast` with a changed close price, `_haBuf` values at last index reflect patched HA close.

**`MarketCapChart.deriveFromSupply`**
- 3-candle buffer with closes [100, 200, 150] and supply 1000: `_series` = `[{time, value: 100000}, {time, value: 200000}, {time, value: 150000}]`.
- `_computeDomain` returns `{min: 100000, max: 200000}`.

**`MarketCapChart.setSeries` with gaps**
- Series has entries for candle times 0, 2, 4 (skipping odd indices). `_rebuild` must produce three separate `Line2` objects (one per contiguous segment — NaN sentinels are NOT used because `LineGeometry` does not support them natively). The line must render as two disconnected segments (indices 0→2 and 2→4, with no segment crossing the gap at index 1 and 3). All points must have finite position values.

**`ChartTypeManager.setChartType`**
- Switch from `'candlestick'` to `'line'`: old renderer `setVisible(false)` called, new renderer created, `updateRange(0, N)` called.
- Switch from `'line'` back to `'candlestick'`: `setVisible(true)` on cached candlestick, no new construction.
- Guard: `setChartType('market-cap')` calls `console.warn`, returns early, `_active` unchanged.
- Streaming: after switch to `'area'`, `append` dispatches to `AreaChart._rebuild`, not `CandleChart`.

### Integration tests

- Load 500 candles, cycle all five primary types, render one frame each, confirm no Three.js errors in console and all `_line.visible` / mesh `visible` flags are correct.
- Load 500 candles, connect mock stream, switch chart type after 10 appends, append 10 more, verify new renderer count matches expected buffer count.
- `setCirculatingSupply(1e6)` then `loadData(500 candles)`: `MarketCapChart._series` length === 500.
- `setMarketCapSeries(externalSeries)` before `loadData`: series is stored and applied after load.
- `setTheme(LIGHT_THEME)` while chart type is `'line'`: `LineMaterial.color` updated; no geometry rebuild triggered.
- `setLayout('helix')` while chart type is `'area'`: `AreaChart.onLayoutChange` called, geometry rebuilt for new positions.

### Edge cases

- `setChartType` before `init()`: no throw, returns immediately.
- `setChartType('volume')` with empty buffer: renders fine (volume bars with count=0 are invisible).
- `loadData([])` with active `'line'` chart: `_line.visible === false`.
- `setCirculatingSupply(0)`: panel shows flat line at floor (all zeros), no division-by-zero.
- Rapid type switching (5 switches in one frame): only the final switch's renderer is visible; intermediate renderers are hidden.
- `dispose()` after `setChartType('area')`: all cached renderers disposed, no WebGL resource leaks.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `LineGeometry.setPositions` called with array shorter than previous causes stale trailing vertices | Medium | Visual — stale line segments at the end | Always call `setPositions` with an exact-length subarray `_linePositions.subarray(0, count*3)` so `Line2` does not see stale trailing vertices from previous larger buffers. `computeLineDistances()` is NOT needed for solid `Line2` and should not be called. |
| `_haBuf.count` desyncs from `_rawBuf.count` during concurrent streaming | Low | Incorrect HA rendering | `HeikinAshiCandleChart.append` sets `_haBuf.count = rawBuf.count` at the end of every call; single-threaded JS makes true concurrency impossible |
| `ChartTypeManager` caching holds refs to disposed GPU objects after `setLayout` rebuilds CandleChart | Low | WebGL errors | `onLayoutChange` is propagated to ALL cached renderers, including non-active ones; renderers rebuild their own geometry in-place rather than allocating new buffers |
| `AreaChart` fill mesh behind Line2 stroke causes Z-fighting | Low | Visual artifacts | Explicit `renderOrder` separation (fill=2, stroke=3) and `fillMat.depthWrite = false` eliminate Z-fighting |
| `MarketCapChart` binary search for time alignment is O(n) per rebuild | Low | Performance on large series | `lowerBound` is a simple integer binary search; for 20,000 points this is ~15 iterations — negligible |
| Theme objects created before this spec do not have `line` / `area` / `marketCap` fields | Medium | Missing colors; optional chaining fallbacks apply | Fields are defined as optional (`line?`, `area?`, `marketCap?`) in `ChartTheme`; all read sites use `theme.line?.color ?? '#26a69a'` etc.; existing callers using `DARK_THEME` / `LIGHT_THEME` get correct values from the updated constants |
