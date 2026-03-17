# Spec: Side-Menu Full Integration
**Version:** 1.0
**Scope:** `src/ui/UIController.ts`, `src/FinanceChart.ts (_initAddendum / render loop)`, `src/interaction/LegendPanel.ts`

---

## 1. Problem Statement

The `UIController` side-panel emits events (layout change, theme change, indicator add/remove/toggle/update, zoom-to-fit, symbol change, interval change, palette change) but **FinanceChart never listens to any of them**. The panel is live DOM but completely disconnected from the chart engine. Additionally:

- `AxisManager.update()` is never called — grid lines exist but tick positions and labels are static forever.
- `NavigatorBar` class exists but is never instantiated inside `UIController`.
- `LegendPanel.update()` is called with a single-item array instead of the full active-indicator list, so the legend is always wrong after two or more indicators are added.
- `_openIndicatorPicker()` uses native `prompt()` dialogs — incompatible with production and mobile.
- `setLayout()` and `setTheme()` do not propagate changes to `AxisManager`, `LegendPanel`, or `PriceTicker`.
- `addIndicatorV2()` / `removeIndicatorV2()` do not sync back into `UIController.state.indicators`, so panel and chart state diverge.

---

## 2. Scope of Changes

| File | Change type |
|---|---|
| `src/FinanceChart.ts` | Add event handlers in `_initAddendum()`; update `setLayout()`, `setTheme()`, `addIndicatorV2()`, `removeIndicatorV2()`, `toggleIndicatorV2()`, `updateIndicatorV2()`; call `AxisManager.update()` in render loop |
| `src/ui/UIController.ts` | Instantiate `NavigatorBar`; replace `_openIndicatorPicker()` with inline picker; add `addIndicatorRow()` / `removeIndicatorRow()` public helpers for external sync |
| `src/interaction/LegendPanel.ts` | No structural change — callers must pass full indicator list |

No new files. No new public API surface on `FinanceChart` beyond what already exists.

---

## 3. Integration Architecture

```
UIController (DOM events)
        │ bus.emit(...)
        ▼
FinanceChart._addendumBus handlers  ← NEW in _initAddendum()
        │
        ├─ layoutChange   → setLayout(mode)
        ├─ themeChange    → setTheme(DARK/LIGHT_THEME) + _syncThemeToPalette()
        ├─ paletteChange  → _applyPaletteOverrides(overrides)
        ├─ zoomToFit      → resetCamera()
        ├─ indicatorAdd   → addIndicatorV2(config) [already exists, now wired]
        ├─ indicatorToggle → toggleIndicatorV2(id, enabled)
        ├─ indicatorUpdate → updateIndicatorV2(id, partial)
        ├─ indicatorRemove → removeIndicatorV2(id)
        ├─ intervalChange → _axisManager.setInterval(interval)
        └─ symbolChange   → emit('symbol:change', { symbol }) [library event]

FinanceChart API mutations
        │ after state change
        └─ _syncUIState()  ← NEW helper — pushes state back to UIController + LegendPanel
```

**Rule:** UIController is source-of-truth for user inputs. FinanceChart is source-of-truth for data state. The sync is **one-way** from bus events → FinanceChart, and **one-way** from FinanceChart state mutations → `UIController.syncFromState()`.

---

## 4. Detailed Requirements

### 4.1 Event Wiring in `_initAddendum()`

After constructing `_uiController`, subscribe to all bus events that have chart-side effects:

```typescript
// Inside _initAddendum(), after UIController construction.
// `bus` is the local EventBus const already created in _initAddendum() — no need to
// store it as this._bus; the arrow-function closures capture it by reference.

bus.on('layoutChange',    (p: { mode: LayoutMode }) =>
  this.setLayout(p.mode.toLowerCase() as 'linear' | 'helix' | 'tunnel'));

bus.on('themeChange',     (p: { theme: 'dark' | 'light' }) =>
  this.setTheme(p.theme === 'dark' ? DARK_THEME : LIGHT_THEME));

bus.on('paletteChange',   (p: Partial<ThemePalette>) =>
  this._applyPaletteOverrides(p));

bus.on('zoomToFit',       () => this.resetCamera());

bus.on('indicatorAdd',    (cfg: IndicatorConfig) => this.addIndicatorV2(cfg));
bus.on('indicatorToggle', (p: { id: string; enabled: boolean }) =>
  this.toggleIndicatorV2(p.id, p.enabled));
bus.on('indicatorUpdate', (p: { id: string } & Partial<IndicatorConfig>) =>
  this.updateIndicatorV2(p.id, p));
bus.on('indicatorRemove', (p: { id: string }) => this.removeIndicatorV2(p.id));

bus.on('intervalChange',  (p: { interval: string }) =>
  this._axisManager?.setInterval(p.interval));

bus.on('symbolChange',    (p: { symbol: string }) =>
  this.emit('symbol:change' as any, p));
```

### 4.2 `_applyPaletteOverrides(overrides: Partial<ThemePalette>)`

New private method. Merges palette overrides onto the current theme and calls `setTheme()`:

```typescript
private _applyPaletteOverrides(overrides: Partial<ThemePalette>): void {
  // ThemePalette uses bullCandle/bearCandle; ChartTheme uses candle.bullBody/bearBody.
  // This is the intentional cross-interface mapping — confirmed by buildThemePalette() (§4.6)
  // which maps in the reverse direction: bullCandle ← candle.bullBody.
  const merged: ChartTheme = {
    ...this._theme,
    candle: {
      ...this._theme.candle,
      bullBody: overrides.bullCandle ?? this._theme.candle.bullBody,
      bearBody: overrides.bearCandle ?? this._theme.candle.bearBody,
    },
  };
  this.setTheme(merged);
}
```

### 4.3 AxisManager in Render Loop

`AxisManager.update()` must be called each frame (or on each OrbitControls change) to keep tick positions and labels current.
The visible range for the axis should be derived from the **camera frustum projection onto the candle plane** — specifically, the leftmost and rightmost X world-coordinates visible at Z=0.

Add to `_renderLoop()`, after `_cameraAnimator.update()`:

```typescript
if (this._axisManager && this._candleBuffer.count > 0) {
  const vr = this._computeVisibleRange();
  if (vr) {
    this._axisManager.update(vr, this._chartScene.camera);
  }
}
```

`_computeVisibleRange()` is a new private method:

```typescript
private _computeVisibleRange(): VisibleRange | null {
  if (this._candleBuffer.count === 0) return null;
  const cam = this._chartScene.camera;
  // Project frustum corners onto Z=0 plane to find visible index range
  const frustum = new THREE.Frustum();
  const pm = new THREE.Matrix4().multiplyMatrices(
    cam.projectionMatrix, cam.matrixWorldInverse);
  frustum.setFromProjectionMatrix(pm);

  // Binary-search leftmost/rightmost visible candle index
  const count  = this._candleBuffer.count;
  const posOut = { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), normal: new THREE.Vector3() };
  let si = 0, ei = count - 1;
  for (let i = 0; i < count; i++) {
    this._layout.getCandleTransform(i, this._candleBuffer, posOut);
    if (frustum.containsPoint(posOut.position)) { si = i; break; }
  }
  for (let i = count - 1; i >= si; i--) {
    this._layout.getCandleTransform(i, this._candleBuffer, posOut);
    if (frustum.containsPoint(posOut.position)) { ei = i; break; }
  }

  const { min: priceMin, max: priceMax } = this._getPriceRange();
  let volumeMax = 0;
  for (let i = si; i <= ei; i++) volumeMax = Math.max(volumeMax, this._candleBuffer.volume(i));

  return {
    startIndex: si, endIndex: ei,
    startTime:  this._candleBuffer.time[si],   // CandleBuffer.time is Float64Array
    endTime:    this._candleBuffer.time[ei],
    priceMin, priceMax,
    volumeMax: volumeMax || 1,
  };
}
```

**Performance note:** `_computeVisibleRange()` iterates O(N) worst case. For ≤2 000 candles this is negligible at 60 fps. If `N > 2 000` a binary search or cached range should be used. Defer optimisation until > 2 000 candles is a real use case.

### 4.4 NavigatorBar in `UIController`

`UIController` already renders `<canvas id="ui-navigator" height="40">`. It must instantiate `NavigatorBar` against this canvas and wire the `rangeChange` event to `bus.emit('timeRangeChange')`.

```typescript
// In UIController constructor, after _bindEvents():
// (import at top of file)
import { NavigatorBar } from '../ui/NavigatorBar';

private _navigatorBar: NavigatorBar | null = null;

// After container.appendChild(this.root):
const navCanvas = this.root.querySelector<HTMLCanvasElement>('#ui-navigator')!;
this._navigatorBar = new NavigatorBar(navCanvas, []);
// NavigatorBar.canvas is private — listen on the same DOM element we passed in:
navCanvas.addEventListener('rangeChange', (e: Event) => {
  const { startIndex, endIndex } = (e as CustomEvent).detail;
  this.bus.emit('rangeChange', { startIndex, endIndex });
});
```

`NavigatorBar` emits `rangeChange` as a CustomEvent on its canvas element. FinanceChart handles it:

```typescript
bus.on('rangeChange', (p: { startIndex: number; endIndex: number }) => {
  if (this._candleBuffer.count === 0) return;
  const si = Math.max(0, p.startIndex);
  const ei = Math.min(this._candleBuffer.count - 1, p.endIndex);
  this.emit('range:change', { startIndex: si, endIndex: ei });
  // Move camera to show [si, ei] window
  const out = { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), normal: new THREE.Vector3() };
  this._layout.getCandleTransform(si, this._candleBuffer, out);
  const startX = out.position.x;
  this._layout.getCandleTransform(ei, this._candleBuffer, out);
  const endX   = out.position.x;
  const midX   = (startX + endX) / 2;
  const halfX  = (endX - startX) / 2 + 1;
  const dist   = Math.max(halfX, 15);
  this._cameraAnimator.flyTo(
    new THREE.Vector3(midX, 7, dist),
    new THREE.Vector3(midX, 5, 0),
    600,
  );
});
```

`NavigatorBar.updateData()` must be called from `loadData()` and `appendCandle()`:

```typescript
// In loadData(), after _indicatorManager.onDataUpdate():
this._uiController?.updateNavigatorData(this._addendumData);

// In appendCandle(), after priceTicker update:
this._uiController?.updateNavigatorData(this._addendumData);
```

`updateNavigatorData()` is a new public method on UIController:

```typescript
updateNavigatorData(data: OHLCV[]): void {
  this._navigatorBar?.updateData(data);
}
```

### 4.5 LegendPanel — Full List Sync

`LegendPanel.update()` must receive the **complete** list of currently-active v2.0 indicators.
Introduce a private field `_activeIndicatorConfigs: Map<string, IndicatorConfig>` on FinanceChart, maintained by `addIndicatorV2()` / `removeIndicatorV2()` / `toggleIndicatorV2()` / `updateIndicatorV2()`.

```typescript
// Replace in addIndicatorV2():
addIndicatorV2(config: IndicatorConfig): void {
  this._indicatorManager?.add(config);
  this._activeIndicatorConfigs.set(config.id, config);
  this._syncLegend();
  this._uiController?.syncFromState({ indicators: [...this._activeIndicatorConfigs.values()] });
}

// Replace in removeIndicatorV2():
removeIndicatorV2(id: string): void {
  this._indicatorManager?.remove(id);
  this._activeIndicatorConfigs.delete(id);
  this._syncLegend();
  this._uiController?.syncFromState({ indicators: [...this._activeIndicatorConfigs.values()] });
}

// Update in toggleIndicatorV2():
toggleIndicatorV2(id: string, enabled: boolean): void {
  this._indicatorManager?.toggle(id, enabled);
  const cfg = this._activeIndicatorConfigs.get(id);
  if (cfg) { cfg.enabled = enabled; this._syncLegend(); }
}

// Update in updateIndicatorV2():
updateIndicatorV2(id: string, partial: Partial<IndicatorConfig>): void {
  this._indicatorManager?.update(id, partial);
  const cfg = this._activeIndicatorConfigs.get(id);
  if (cfg) { Object.assign(cfg, partial); this._syncLegend(); }
}

private _syncLegend(): void {
  this._legendPanel?.update([...this._activeIndicatorConfigs.values()].filter(c => c.enabled));
}
```

### 4.6 `setLayout()` and `setTheme()` Propagation

`setLayout()` must rebuild the `positionFn` used by `IndicatorManager` and `AxisManager` because those capture a closure over the old layout. This is currently impossible without refactoring those closures. **Workaround for this spec:** call `_indicatorManager.onDataUpdate(this._addendumData)` and `_axisManager.rebuild('Linear')` after the layout change so geometry is regenerated with the new position function.

Actually — the positionFn closure in `_initAddendum()` reads `this._layout` indirectly through `getCandleTransform`. Since `_layout` is a property reference that `setLayout()` replaces, the existing closure already picks up the new layout on next call. **No change needed for indicator geometry.** But AxisManager holds its own `AxisScales.indexToWorldX` closure which also reads `this._layout` → also already live. ✓

`setTheme()` must additionally call:
```typescript
this._axisManager?.setTheme(buildThemePalette(theme));
// where buildThemePalette extracts ThemePalette from ChartTheme:
function buildThemePalette(t: ChartTheme): ThemePalette {
  return {
    background:  t.background,
    gridLines:   t.grid,
    axisLabels:  t.axis,
    bullCandle:  t.candle.bullBody,
    bearCandle:  t.candle.bearBody,
    wick:        t.candle.bullWick,
    volume:      t.volume.bullBar,
    crosshair:   t.crosshair,
  };
}
```

### 4.7 Inline Indicator Picker

Replace `_openIndicatorPicker()` in `UIController` with an inline collapsed form rendered inside `#ui-indicators-section`. The form appears below the `+` button when clicked and disappears after submission.

**Form fields:**
- Type selector: `<select>` with options SMA | EMA | BB | RSI | MACD
- Period input: `<input type="number">` (hidden for MACD, shows fastPeriod/slowPeriod/signalPeriod for MACD)
- Source selector: `<select>` with options close | open | high | low | hl2 | ohlc4
- Color picker: `<input type="color">`
- Add button: `<button>Add</button>`
- Cancel button: closes form

**MACD-specific fields** (shown when type === 'MACD'):
- Fast period: `<input type="number" value="12">`
- Slow period: `<input type="number" value="26">`
- Signal period: `<input type="number" value="9">`

**Default values per type:**

| Type | period | source | color |
|---|---|---|---|
| SMA | 20 | close | #ffb74d |
| EMA | 20 | close | #4dd0e1 |
| BB  | 20 | close | #ce93d8 |
| RSI | 14 | close | #80cbc4 |
| MACD | 12/26/9 | close | #f48fb1 |

**Config construction:** On submit, build a complete `IndicatorConfig` (including `enabled: true`, `opacity: 1`, `lineWidth: 2`, and type-specific defaults for `stdDev`, `showMid`, `bandOpacity`, `overbought`, `oversold`, `subView`). Emit `indicatorAdd` on the bus.

---

## 5. ChartEvents Extension

Add `'symbol:change'` to `ChartEvents` in `src/types/events.ts`:

```typescript
'symbol:change': { symbol: string };
```

This allows host applications to react when the user changes the symbol in the panel.

---

## 6. NavigatorBar `rangeChange` Event Contract

`NavigatorBar` currently dispatches its `rangeChange` event by calling `this._canvas.dispatchEvent(new CustomEvent('rangeChange', { detail: { startIndex, endIndex } }))`. Verify this is the actual emission mechanism before wiring (§4.4). If `NavigatorBar` uses a different pattern (e.g. a registered callback), adapt accordingly.

---

## 7. Out of Scope

- `symbolChange` does not connect to a live data feed — the library has no built-in data-source concept. The event is re-emitted as `'symbol:change'` for the host to handle.
- `intervalChange` does not re-fetch or re-aggregate candle data — it only updates `AxisManager` tick formatting.
- No new indicator types beyond the existing five.
- No server-side rendering or SSR concerns.
- No accessibility (ARIA) improvements in this iteration.

---

## 8. Implementation Order

1. Add `_activeIndicatorConfigs: Map` and fix `addIndicatorV2` / `removeIndicatorV2` / `toggleIndicatorV2` / `updateIndicatorV2` + `_syncLegend()`.
2. Add all `bus.on(...)` handlers in `_initAddendum()`.
3. Add `_applyPaletteOverrides()`.
4. Add `setTheme()` → `_axisManager.setTheme()` call + `buildThemePalette()` helper.
5. Add `_computeVisibleRange()` and wire into `_renderLoop()`.
6. Add `updateNavigatorData()` to `UIController` and instantiate `NavigatorBar`.
7. Wire `rangeChange` bus event in `_initAddendum()`.
8. Call `updateNavigatorData()` from `loadData()` and `appendCandle()`.
9. Replace `_openIndicatorPicker()` with inline form.
10. Add `'symbol:change'` to `ChartEvents`.

---

## 9. Acceptance Criteria

- [ ] Clicking Layout pill in panel changes the 3D layout.
- [ ] Clicking Theme pill changes candle/background colours.
- [ ] Changing bull/bear colour pickers updates candle colours live.
- [ ] Clicking `+` in Indicators opens inline form (no `prompt()`).
- [ ] Adding SMA/EMA/BB/RSI/MACD from form renders the indicator geometry.
- [ ] Toggle switch on indicator row shows/hides geometry.
- [ ] Period input change recalculates and redraws indicator.
- [ ] Remove button (×) removes indicator from scene and legend.
- [ ] LegendPanel shows all currently-enabled indicators (not just the most-recently-added one).
- [ ] Grid lines show price and time tick labels that update on camera pan/zoom.
- [ ] NavigatorBar canvas is interactive and panning the range handle moves the camera.
- [ ] `resetCamera()` / Zoom-to-Fit button snaps the camera to the default view.
- [ ] No `prompt()` calls remain in `UIController`.
- [ ] No console errors on load.
- [ ] `chart.on('symbol:change', cb)` fires when user edits the symbol input.
