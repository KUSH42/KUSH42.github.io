// src/FinanceChart.ts

import * as THREE from 'three';
import { EventEmitter } from './utils/EventEmitter';
import type { ChartEvents } from './types/events';
import type { OHLCVCandle, Tick } from './types/market';
import type { IndicatorSeries } from './types/indicators';
import type { ChartTheme } from './types/theme';
import { DARK_THEME } from './types/theme';
import type { ChartLayer } from './types/ChartLayer';
import type { LayoutEngine } from './layout/LayoutEngine';
import { CandleBuffer } from './types/CandleBuffer';
import { RendererManager } from './renderer/RendererManager';
import { PostProcessingPipeline } from './renderer/PostProcessingPipeline';
import { ChartScene } from './scene/ChartScene';
import { CandleChart } from './charts/CandleChart';
import { VolumeChart } from './charts/VolumeChart';
import { IndicatorLayer } from './charts/IndicatorLayer';
import { LinearLayout } from './layout/LinearLayout';
import { HelixLayout } from './layout/HelixLayout';
import { TunnelLayout } from './layout/TunnelLayout';
import { CrosshairController } from './interaction/CrosshairController';
import { TooltipOverlay } from './interaction/TooltipOverlay';
import { CameraAnimator } from './interaction/CameraAnimator';
import { WebSocketAdapter, type StreamConnectOptions } from './streaming/WebSocketAdapter';
import { TickAggregator } from './streaming/TickAggregator';
import { UpdateScheduler } from './streaming/UpdateScheduler';
import { ScreenshotExporter } from './export/ScreenshotExporter';
import { GLBExporter } from './export/GLBExporter';
import { CSVExporter } from './export/CSVExporter';
import { lowerBound, upperBound } from './utils/MathUtils';
// v2.0 addendum imports
import { IndicatorManager } from './indicators/IndicatorManager';
import { TroikaLabelPool } from './labels/TroikaLabelPool';
import { AxisManager } from './axes/AxisManager';
import { UIController } from './ui/UIController';
import { TooltipSystem } from './interaction/TooltipSystem';
import { LegendPanel } from './interaction/LegendPanel';
import { PriceTicker } from './interaction/PriceTicker';
import { RangeController } from './data/RangeController';
import type {
  IndicatorConfig, UIState, ScaleSet, OHLCV,
} from './types/addendum';

export interface FinanceChartOptions {
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
  /**
   * Enable v2.0 addendum systems (IndicatorManager, AxisManager, UIController,
   * TooltipSystem, LegendPanel, PriceTicker, RangeController, TroikaLabelPool).
   * Defaults to false for backward compatibility.
   */
  enableAddendum?: boolean;
}

export class FinanceChart extends EventEmitter<ChartEvents> {
  private _container: HTMLElement;
  private _theme: ChartTheme;
  private _layoutMode: 'linear' | 'helix' | 'tunnel';
  private _maxCandles: number;
  private _enablePostProcessing: boolean;
  private _opts: FinanceChartOptions;

  private _candleBuffer!: CandleBuffer;
  private _rendererManager!: RendererManager;
  private _postProc!: PostProcessingPipeline;
  private _chartScene!: ChartScene;
  private _candleChart!: CandleChart;
  private _volumeChart!: VolumeChart;
  private _indicatorLayer!: IndicatorLayer;
  private _layout!: LayoutEngine;
  private _crosshair!: CrosshairController;
  private _tooltip!: TooltipOverlay;
  private _cameraAnimator!: CameraAnimator;
  private _scheduler?: UpdateScheduler;
  private _wsAdapter?: WebSocketAdapter;
  private _tickAggregator?: TickAggregator;
  private _screenshotExporter!: ScreenshotExporter;
  private _glbExporter!: GLBExporter;
  private _csvExporter!: CSVExporter;
  private _customLayers = new Map<string, ChartLayer>();

  private _rafId: number | null = null;
  private _lastTime = 0;
  private _fps = 0;
  private _frameCount = 0;
  private _fpsTimer = 0;
  private _disposed = false;

  // Keyboard handler
  private _onKey?: (e: KeyboardEvent) => void;

  // DOF hover unsub handle
  private _dofHoverUnsub?: () => void;

  // ── v2.0 Addendum systems (opt-in via enableAddendum option) ───────────────
  private _indicatorManager?: IndicatorManager;
  private _labelPool?: TroikaLabelPool;
  private _axisManager?: AxisManager;
  private _uiController?: UIController;
  private _tooltipSystem?: TooltipSystem;
  private _legendPanel?: LegendPanel;
  private _priceTicker?: PriceTicker;
  private _rangeController?: RangeController;
  private _addendumData: OHLCV[] = [];
  private _addendumScales?: ScaleSet;

  constructor(options: FinanceChartOptions) {
    super();
    this._opts = options;
    this._container = options.container;
    this._theme = options.theme ?? DARK_THEME;
    this._layoutMode = options.layout ?? 'linear';
    this._maxCandles = options.maxCandles ?? 20_000;
    this._enablePostProcessing = options.enablePostProcessing ?? false;
  }

  async init(): Promise<void> {
    // Allocate candle buffer
    this._candleBuffer = new CandleBuffer(this._maxCandles);

    // Set up renderer
    this._rendererManager = new RendererManager(this._container, {
      antialias: this._opts.antialias ?? true,
      alpha: this._opts.alpha ?? false,
      maxPixelRatio: this._opts.maxPixelRatio ?? 2,
      onFallback: this._opts.onRendererFallback,
    });
    await this._rendererManager.init();
    this._rendererManager.renderer.shadowMap.enabled = false;

    // Set up scene
    this._chartScene = new ChartScene(
      this._rendererManager.canvas,
      this._theme,
      this._rendererManager.width,
      this._rendererManager.height,
    );
    this._rendererManager.trackCamera(this._chartScene.camera);

    // Build layout
    this._layout = this._createLayout(this._layoutMode);

    // Create sub-charts
    this._candleChart = new CandleChart({
      scene: this._chartScene.scene,
      buffer: this._candleBuffer,
      layout: this._layout,
      theme: this._theme,
      maxCandles: this._maxCandles,
      priceToWorldY: (price: number) => this._priceToWorldY(price),
    });

    this._volumeChart = new VolumeChart({
      scene: this._chartScene.scene,
      buffer: this._candleBuffer,
      layout: this._layout,
      theme: this._theme,
      maxCandles: this._maxCandles,
      panelOffset: -4,
      panelHeight: 3,
    });

    this._indicatorLayer = new IndicatorLayer({
      scene: this._chartScene.scene,
      layout: this._layout,
      theme: this._theme,
      priceToWorldY: (price: number) => this._priceToWorldY(price),
    });

    // Post-processing pipeline
    this._postProc = new PostProcessingPipeline({
      renderer: this._rendererManager.renderer,
      scene: this._chartScene.scene,
      camera: this._chartScene.camera,
      isWebGPU: this._rendererManager.isWebGPU,
    });

    if (this._enablePostProcessing) {
      await this._postProc.init();
      // Register bull meshes with bloom
      for (const mesh of this._candleChart.getBullMeshes()) {
        this._postProc.addBloomTarget(mesh);
      }
    }

    this._rendererManager.trackPostProcessing((w, h) => {
      this._postProc.resize(w, h);
      this._chartScene.camera.aspect = w / h;
      this._chartScene.camera.updateProjectionMatrix();
      // v2.0: update resolution for all LineMaterial instances
      const resolution = new THREE.Vector2(w, h);
      this._indicatorManager?.onResize(resolution);
    });

    // Interaction
    const domEl = this._rendererManager.canvas;
    this._crosshair = new CrosshairController(
      this._chartScene.camera,
      domEl,
      this,
      this._candleChart,
    );

    // Register candle meshes as raycast targets
    this._crosshair.registerTarget(this._candleChart.bullBodyMesh);
    this._crosshair.registerTarget(this._candleChart.bearBodyMesh);

    this._tooltip = new TooltipOverlay(
      this._container,
      this._chartScene.camera,
      this._rendererManager.renderer,
    );
    this._tooltip.applyTheme(this._theme);

    // DOF hover tracking
    this._dofHoverUnsub = this.on('candle:hover', (event) => {
      if (event) {
        this._postProc.setDOFFocusPoint(event.worldPos);
        this._tooltip.show(event.candle, event.worldPos);
      } else {
        this._tooltip.hide();
      }
    });

    this._cameraAnimator = new CameraAnimator(
      this._chartScene.camera,
      this._chartScene.controls,
    );

    // Export helpers
    this._screenshotExporter = new ScreenshotExporter(this._rendererManager.renderer);
    this._glbExporter = new GLBExporter(this._chartScene.scene);
    this._csvExporter = new CSVExporter(this._candleBuffer);

    // Accessibility
    this._container.setAttribute('tabindex', '0');
    this._container.setAttribute('role', 'application');
    this._container.setAttribute('aria-label', 'Interactive 3D financial chart');
    this._onKey = this._handleKeyboard.bind(this);
    this._container.addEventListener('keydown', this._onKey);

    // v2.0 Addendum systems — opt-in via enableAddendum option
    if (this._opts.enableAddendum) {
      this._initAddendum();
    }

    // Start render loop
    this._lastTime = performance.now();
    this._renderLoop();
  }

  private _getPriceRange(): { min: number; max: number } {
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < this._candleBuffer.count; i++) {
      const l = this._candleBuffer.low(i);
      const h = this._candleBuffer.high(i);
      if (l < min) min = l;
      if (h > max) max = h;
    }
    return { min, max: max > min ? max : min + 1 };
  }

  private _initAddendum(): void {
    // Build a simple ScaleSet backed by _priceToWorldY
    this._addendumScales = {
      price:        (v: number) => this._priceToWorldY(v),
      priceInverse: (worldY: number) => {
        // Inverse of _priceToWorldY — requires buffer data
        if (this._candleBuffer.count === 0) return worldY * 1000;
        const { min, max } = this._getPriceRange();
        return min + (worldY / 10) * (max - min);
      },
      priceHeight: (dataHeight: number) => {
        if (this._candleBuffer.count === 0) return dataHeight * 0.001;
        const { min, max } = this._getPriceRange();
        return (dataHeight / (max - min)) * 10;
      },
    };

    // Reuse a single output object to avoid per-call allocations in positionFn.
    // Safe because callers always read x/z immediately before the next call.
    const _posOut = {
      position:   new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      normal:     new THREE.Vector3(),
    };
    const positionFn = (i: number): THREE.Vector3 => {
      this._layout.getCandleTransform(i, this._candleBuffer, _posOut);
      return _posOut.position;
    };

    // Label pool (pre-allocate 256 instances)
    this._labelPool = new TroikaLabelPool(this._chartScene.scene, 256);

    // Indicator manager
    this._indicatorManager = new IndicatorManager(
      this._chartScene.scene,
      this._addendumData,
      this._addendumScales,
      positionFn,
      this._rendererManager.renderer,
    );

    // Axis manager
    this._axisManager = new AxisManager(
      this._chartScene.scene,
      {
        priceToWorldY: this._addendumScales.price,
        worldYToPrice: this._addendumScales.priceInverse,
        indexToWorldX: (i: number) => positionFn(i).x,
      },
      {
        gridXMin: -50,
        gridXMax:  500,
        labelPool: this._labelPool,
      },
    );

    // Legend and price ticker
    this._legendPanel  = new LegendPanel(this._container);
    this._priceTicker  = new PriceTicker(this._container);

    // Initial UIState
    const initialState: UIState = {
      symbol:           'BTCUSDT',
      interval:         '1h',
      layoutMode:       'Linear',
      theme:            'dark',
      visibleRange:     {
        startIndex: 0, endIndex: 0,
        startTime: 0, endTime: 0,
        priceMin: 0, priceMax: 1, volumeMax: 1,
      },
      indicators:       [],
      paletteOverrides: {},
      crosshairEnabled: true,
      tooltipsEnabled:  true,
    };

    // Simple EventBus adapter using existing EventEmitter
    const bus = {
      on:   (event: string, handler: (...args: any[]) => void) => { this.on(event as any, handler as any); },
      off:  (event: string, handler: (...args: any[]) => void) => { this.off(event as any, handler as any); },
      emit: (event: string, payload?: any) => { this.emit(event as any, payload); },
    };

    this._uiController = new UIController(this._container, initialState, bus);

    // TooltipSystem — only create after data is loaded (uses data reference)
    // We create it now with an empty data array; it will be updated on loadData
    this._tooltipSystem = new TooltipSystem(
      this._rendererManager.renderer,
      this._chartScene.scene,
      this._chartScene.camera,
      this._addendumData,
      this._labelPool,
      this._addendumScales,
      positionFn,
    );

    // RangeController
    this._rangeController = new RangeController(this._addendumData, initialState);
  }

  private _createLayout(mode: 'linear' | 'helix' | 'tunnel'): LayoutEngine {
    switch (mode) {
      case 'linear':
        return new LinearLayout({ candleSpacing: 0.5, candleWidth: 0.4 });
      case 'helix':
        return new HelixLayout({
          radius: 15,
          angularStep: 0.025,
          pitchPerCandle: 0.08,
          candleWidth: 0.35,
        });
      case 'tunnel': {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(10, 2, -20),
          new THREE.Vector3(-10, 4, -40),
          new THREE.Vector3(0, 6, -60),
        ]);
        return new TunnelLayout(curve, { candleWidth: 0.4 });
      }
      default: {
        const _exhaustive: never = mode;
        void _exhaustive;
        return new LinearLayout({ candleSpacing: 0.5, candleWidth: 0.4 });
      }
    }
  }

  private _priceToWorldY(price: number): number {
    // Simple linear mapping — in production this would use a D3 scale
    // with auto-computed domain from the buffer
    if (this._candleBuffer.count === 0) return price * 0.001;
    const { min, max } = this._getPriceRange();
    return ((price - min) / (max - min)) * 10;
  }

  private _renderLoop = (): void => {
    if (this._disposed) return;
    this._rafId = requestAnimationFrame(this._renderLoop);

    const now = performance.now();
    const deltaMs = now - this._lastTime;
    this._lastTime = now;

    // FPS tracking
    this._frameCount++;
    this._fpsTimer += deltaMs;
    if (this._fpsTimer >= 1000) {
      this._fps = this._frameCount;
      this._frameCount = 0;
      this._fpsTimer -= 1000;
    }

    // Update scene controls
    this._chartScene.update();

    // Update camera animation
    this._cameraAnimator.update(deltaMs);

    // LOD update
    const camDist = this._chartScene.camera.position.length();
    this._candleChart.updateLOD(camDist);

    // Update custom layers
    for (const layer of this._customLayers.values()) {
      layer.update(deltaMs);
    }

    // Emit frame event
    this.emit('render:frame', { deltaMs, fps: this._fps });

    // v2.0: Label billboard sync (cheap quaternion copy — every frame)
    if (this._labelPool) {
      this._labelPool.syncBillboards(this._chartScene.camera);
      this._labelPool.syncAll();
    }

    // Render main scene
    this._postProc.render(deltaMs / 1000);

    // v2.0: Sub-view render (RSI/MACD panels) — AFTER main, uses scissor/viewport
    if (this._indicatorManager) {
      this._indicatorManager.renderSubViews(this._rendererManager.renderer);
    }
  };

  private _handleKeyboard(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowLeft':
        // Pan timeline left by 10 candles
        this._chartScene.controls.target.x -= 5;
        this._chartScene.controls.update();
        break;
      case 'ArrowRight':
        // Pan timeline right by 10 candles
        this._chartScene.controls.target.x += 5;
        this._chartScene.controls.update();
        break;
      case '+':
      case '=':
        this._chartScene.camera.position.multiplyScalar(0.9);
        break;
      case '-':
        this._chartScene.camera.position.multiplyScalar(1.1);
        break;
      case 'Home':
        this.resetCamera();
        break;
      case 'End':
        if (this._candleBuffer.count > 0) {
          const lastIdx = this._candleBuffer.count - 1;
          const out = {
            position: new THREE.Vector3(),
            quaternion: new THREE.Quaternion(),
            normal: new THREE.Vector3(),
          };
          this._layout.getCandleTransform(lastIdx, this._candleBuffer, out);
          this._cameraAnimator.flyTo(
            out.position.clone().add(new THREE.Vector3(0, 5, 20)),
            out.position,
          );
        }
        break;
      case 'Escape':
        this._tooltip.hide();
        break;
    }
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    // Unsubscribe event listeners
    this._dofHoverUnsub?.();

    // Remove keyboard listener
    if (this._onKey) this._container.removeEventListener('keydown', this._onKey);

    // Dispose streaming
    this._wsAdapter?.disconnect();
    this._scheduler?.dispose();

    // Dispose interaction
    this._crosshair?.dispose();
    this._tooltip?.dispose();

    // v2.0: Dispose addendum systems
    this._tooltipSystem?.dispose();
    this._indicatorManager?.dispose();
    this._axisManager?.dispose();
    this._labelPool?.dispose();
    this._uiController?.dispose();
    this._legendPanel?.dispose();
    this._priceTicker?.dispose();

    // Dispose custom layers
    for (const layer of this._customLayers.values()) {
      layer.dispose();
    }
    this._customLayers.clear();

    // Dispose charts
    this._candleChart?.dispose();
    this._volumeChart?.dispose();
    this._indicatorLayer?.dispose();

    // Dispose post-processing
    this._postProc?.dispose();

    // Dispose scene
    this._chartScene?.dispose();

    // Dispose renderer
    this._rendererManager?.dispose();

    super.dispose();
  }

  // ── Data ───────────────────────────────────────────────────────────────────

  /** Bulk-load historical candles. Replaces any existing data. */
  loadData(candles: OHLCVCandle[]): void {
    // Reset buffer
    this._candleBuffer.count = 0;

    for (const candle of candles) {
      this._candleBuffer.append(candle);
    }

    this._volumeChart.recalculateScale();
    this._candleChart.updateRange(0, this._candleBuffer.count);
    this._volumeChart.updateRange(0, this._candleBuffer.count);

    // v2.0: sync addendum data (OHLCVCandle → OHLCV conversion: time → timestamp)
    if (this._indicatorManager || this._rangeController) {
      this._addendumData.length = 0;
      for (const c of candles) {
        this._addendumData.push({
          timestamp: c.time,
          open: c.open, high: c.high, low: c.low,
          close: c.close, volume: c.volume,
        });
      }
      this._indicatorManager?.onDataUpdate(this._addendumData);
      this._rangeController?.updateData(this._addendumData);

      // Update price ticker with last candle
      if (this._priceTicker && candles.length > 0) {
        const last = candles[candles.length - 1];
        this._priceTicker.update(last.close, last.close >= last.open);
      }
    }

    // Reset camera to fit data
    this.resetCamera(0);
  }

  /** Append a completed candle (e.g. closed bar from REST history). */
  appendCandle(candle: OHLCVCandle): void {
    if (this._candleBuffer.count >= this._candleBuffer.capacity) {
      console.warn('[three-finance-viz] CandleBuffer at capacity; ignoring appendCandle');
      return;
    }
    this._candleBuffer.append(candle);
    this._candleChart.append(candle);
    this._volumeChart.append(candle);

    // v2.0: keep addendum data in sync for streaming
    if (this._indicatorManager || this._rangeController) {
      this._addendumData.push({
        timestamp: candle.time,
        open: candle.open, high: candle.high, low: candle.low,
        close: candle.close, volume: candle.volume,
      });
      const idx = this._addendumData.length - 1;
      this._indicatorManager?.onStreamTick(idx, this._addendumData[idx]);
      this._priceTicker?.update(candle.close, candle.close >= candle.open);
    }
  }

  /** Patch the last (in-progress) candle with streaming data. */
  updateLastCandle(partial: Partial<OHLCVCandle>): void {
    if (this._candleBuffer.count === 0) return;
    this._candleChart.patchLast(partial);
    this._volumeChart.patchLast(partial);

    // v2.0: keep last addendum entry in sync
    if (this._addendumData.length > 0 && (this._indicatorManager || this._rangeController)) {
      const last = this._addendumData[this._addendumData.length - 1];
      if (partial.open  !== undefined) last.open  = partial.open;
      if (partial.high  !== undefined) last.high  = partial.high;
      if (partial.low   !== undefined) last.low   = partial.low;
      if (partial.close !== undefined) last.close = partial.close;
      if (partial.volume !== undefined) last.volume = partial.volume;
      if (partial.close !== undefined) {
        this._priceTicker?.update(last.close, last.close >= last.open);
      }
    }
  }

  // ── Indicators ─────────────────────────────────────────────────────────────

  /** Returns an opaque ID used to remove the indicator later. */
  addIndicator(series: IndicatorSeries): string {
    switch (series.type) {
      case 'SMA':
      case 'EMA':
      case 'VWAP':
        return this._indicatorLayer.addMA(series);
      case 'BollingerBands':
        return this._indicatorLayer.addBollingerBands(series);
      case 'RSI':
        return this._indicatorLayer.addRSI(series);
      case 'MACD':
        return this._indicatorLayer.addMACD(series);
      default: {
        const _exhaustive: never = series;
        void _exhaustive;
        return '';
      }
    }
  }

  removeIndicator(id: string): void {
    this._indicatorLayer.remove(id);
  }

  // ── v2.0 Indicators (addendum) ─────────────────────────────────────────────

  /**
   * Add a v2.0 indicator using the new IndicatorManager system.
   * Requires `enableAddendum: true` in constructor options.
   * @param config - Indicator configuration
   */
  addIndicatorV2(config: IndicatorConfig): void {
    this._indicatorManager?.add(config);
    // Update legend with single new config entry
    if (this._legendPanel) {
      this._legendPanel.update([config]);
    }
  }

  /**
   * Remove a v2.0 indicator by ID.
   * @param id - Indicator ID
   */
  removeIndicatorV2(id: string): void {
    this._indicatorManager?.remove(id);
  }

  /**
   * Update a v2.0 indicator's config (can trigger recalculation).
   * @param id - Indicator ID
   * @param partial - Partial config with changed fields
   */
  updateIndicatorV2(id: string, partial: Partial<IndicatorConfig>): void {
    this._indicatorManager?.update(id, partial);
  }

  /**
   * Toggle v2.0 indicator visibility.
   * @param id - Indicator ID
   * @param enabled - Whether to show the indicator
   */
  toggleIndicatorV2(id: string, enabled: boolean): void {
    this._indicatorManager?.toggle(id, enabled);
  }

  // ── Presentation ───────────────────────────────────────────────────────────

  setTheme(theme: ChartTheme): void {
    this._theme = theme;
    this._chartScene.onThemeChange(theme);
    this._candleChart.onThemeChange(theme);
    this._volumeChart.onThemeChange(theme);
    this._indicatorLayer.onThemeChange(theme);
    this._tooltip.applyTheme(theme);
    for (const layer of this._customLayers.values()) {
      layer.onThemeChange(theme);
    }
  }

  setLayout(mode: 'linear' | 'helix' | 'tunnel'): void {
    this._layoutMode = mode;
    this._layout = this._createLayout(mode);
    this._candleChart.onLayoutChange(this._layout);
    this._volumeChart.onLayoutChange(this._layout);
    this._indicatorLayer.onLayoutChange(this._layout);
    for (const layer of this._customLayers.values()) {
      layer.onLayoutChange(this._layout);
    }
    this.resetCamera(800);
  }

  setTimeRange(startMs: number, endMs: number): void {
    if (startMs >= endMs) return; // guard: empty or inverted range is a no-op
    const buf = this._candleBuffer;
    const si = Math.max(0, lowerBound(buf.time, buf.count, startMs));
    const ei = Math.min(buf.count - 1, upperBound(buf.time, buf.count, endMs) - 1);
    if (si > ei) return; // no candles in range
    this.emit('range:change', { startIndex: si, endIndex: ei });
  }

  // ── Camera ─────────────────────────────────────────────────────────────────

  /** Fit-to-bounds animated camera reset. */
  resetCamera(durationMs = 800): void {
    const bounds = this._layout.getWorldBounds(this._candleBuffer);
    const center = new THREE.Vector3();
    bounds.getCenter(center);
    const size = new THREE.Vector3();
    bounds.getSize(size);
    const maxDim = Math.max(size.x, size.z, 10);
    const camPos = center.clone().add(new THREE.Vector3(0, maxDim * 0.3, maxDim * 0.8));

    if (durationMs <= 0) {
      this._chartScene.camera.position.copy(camPos);
      this._chartScene.controls.target.copy(center);
      this._chartScene.controls.update();
    } else {
      this._cameraAnimator.flyTo(camPos, center, durationMs);
    }
  }

  animateCameraTo(position: THREE.Vector3, lookAt: THREE.Vector3, durationMs = 1200): void {
    this._cameraAnimator.flyTo(position, lookAt, durationMs);
  }

  // ── Streaming ──────────────────────────────────────────────────────────────

  connectStream(options: StreamConnectOptions): void {
    this.disconnectStream(); // clean up any existing stream

    const aggregator = new TickAggregator(options.intervalMs);
    this._tickAggregator = aggregator;

    this._scheduler = new UpdateScheduler(
      (candles: OHLCVCandle[]) => {
        for (const c of candles) this.appendCandle(c);
      },
      (partial: Partial<OHLCVCandle>) => {
        this.updateLastCandle(partial);
      },
    );

    this._wsAdapter = new WebSocketAdapter(options);
    this._wsAdapter.on('message', (msg) => {
      // Detect tick vs candle vs order book delta
      if ('price' in msg && 'side' in msg) {
        // It's a Tick
        const tick = msg as Tick;
        const completed = aggregator.ingest(tick);
        if (completed) {
          this._scheduler!.scheduleAppend(completed);
        } else {
          const live = aggregator.getLive();
          if (live) {
            this._scheduler!.schedulePatch({
              close: live.close,
              high: live.high,
              low: live.low,
              volume: live.volume,
            });
          }
        }
      } else if ('open' in msg && 'close' in msg) {
        // It's an OHLCVCandle
        this._scheduler!.scheduleAppend(msg as OHLCVCandle);
      }
      // OrderBookDelta handling would go here with OrderBookDepth
    });

    this._wsAdapter.connect();
  }

  disconnectStream(): void {
    this._wsAdapter?.disconnect();
    this._wsAdapter = undefined;
    this._scheduler?.dispose();
    this._scheduler = undefined;
    this._tickAggregator?.reset();
    this._tickAggregator = undefined;
  }

  // ── Extensibility ──────────────────────────────────────────────────────────

  registerLayer(id: string, layer: ChartLayer): void {
    if (this._customLayers.has(id)) {
      this._customLayers.get(id)!.dispose();
    }
    this._customLayers.set(id, layer);
  }

  removeLayer(id: string): void {
    const layer = this._customLayers.get(id);
    if (layer) {
      layer.dispose();
      this._customLayers.delete(id);
    }
  }

  // ── Export ─────────────────────────────────────────────────────────────────

  async takeScreenshot(): Promise<Blob> {
    return this._screenshotExporter.capture();
  }

  async exportGLB(): Promise<ArrayBuffer> {
    return this._glbExporter.export();
  }

  exportCSV(timeRange?: [number, number]): string {
    return this._csvExporter.export(timeRange);
  }

  // ── Read-only accessors ────────────────────────────────────────────────────

  get scene(): THREE.Scene {
    return this._chartScene.scene;
  }

  get camera(): THREE.PerspectiveCamera {
    return this._chartScene.camera;
  }

  get layout(): LayoutEngine {
    return this._layout;
  }

  get theme(): ChartTheme {
    return this._theme;
  }
}
