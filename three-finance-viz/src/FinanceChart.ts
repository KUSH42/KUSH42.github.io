// src/FinanceChart.ts

import * as THREE from 'three';
import { EventEmitter } from './utils/EventEmitter';
import type { ChartEvents } from './types/events';
import type { OHLCVCandle, Tick } from './types/market';
import type { IndicatorSeries } from './types/indicators';
import type { ChartTheme } from './types/theme';
import { DARK_THEME, LIGHT_THEME } from './types/theme';
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
import { ProviderBadge } from './ui/ProviderBadge';
import { RangeController } from './data/RangeController';
import type {
  IndicatorConfig, UIState, ScaleSet, OHLCV, VisibleRange, ThemePalette, LayoutMode,
} from './types/addendum';
// v3.0 provider layer imports
import { ProviderManager } from './providers/ProviderManager';
import type { ProviderConfig } from './providers/types';
import { ProviderError, INTERVAL_MS, INTERVAL_DEFAULT_LIMIT } from './providers/types';
import type { Interval } from './providers/types';
import type { ExchangeAdapter } from './providers/adapters/ExchangeAdapter';
// chart-types imports
import { ChartTypeManager } from './charts/ChartTypeManager';
import { MarketCapChart } from './charts/MarketCapChart';
import type { MarketCapPoint } from './charts/MarketCapChart';
import type { ChartType } from './types/chartType';

// ── Module-level helpers ────────────────────────────────────────────────────

function buildThemePalette(t: ChartTheme): ThemePalette {
  return {
    background: t.background,
    gridLines:  t.grid,
    axisLabels: t.axis,
    bullCandle: t.candle.bullBody,
    bearCandle: t.candle.bearBody,
    wick:       t.candle.bullWick,
    volume:     t.volume.bullBar,
    crosshair:  t.crosshair,
  };
}

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
  /**
   * Pre-register exchange adapters.
   * Equivalent to calling chart.registerProviders(...adapters) after init().
   */
  providers?: ExchangeAdapter[];
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
  private _initialized = false;
  private _logScale = false;

  // v3.0 provider layer
  private _providerManager?: ProviderManager;
  private _activeProviderConfig?: ProviderConfig;

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
  private _providerBadge?: ProviderBadge;
  private _rangeController?: RangeController;
  private _addendumData: OHLCV[] = [];
  private _addendumScales?: ScaleSet;
  private _activeIndicatorConfigs = new Map<string, IndicatorConfig>();
  private _lastVisibleRange: VisibleRange | null = null;

  // chart-types fields
  private _chartTypeManager?: ChartTypeManager;
  private _marketCapChart?: MarketCapChart;
  private _circulatingSupply = 0;
  private _marketCapSeries: MarketCapPoint[] = [];

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

    // Create sub-charts — CandleChart is always created directly so CrosshairController,
    // bloom setup, and LOD all have a valid reference immediately.
    // When enableAddendum is true, ChartTypeManager takes it as existingCandleChart
    // (no duplicate is created).
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
      // chart-types: propagate resize
      this._chartTypeManager?.onResize(resolution);
      this._marketCapChart?.onResize(this._rendererManager.renderer);
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
      // Create ChartTypeManager; it creates and owns the CandleChart instance
      this._chartTypeManager = new ChartTypeManager({
        scene:                this._chartScene.scene,
        buffer:               this._candleBuffer,
        layout:               this._layout,
        theme:                this._theme,
        maxCandles:           this._maxCandles,
        priceToWorldY:        (p) => this._priceToWorldY(p),
        resolution:           new THREE.Vector2(this._rendererManager.width, this._rendererManager.height),
        volumePanelOffset:    -4,
        volumePanelHeight:    3,
        existingCandleChart:  this._candleChart,  // reuse the already-created instance
      });

      this._initAddendum();
    }

    // v3.0 provider layer — register adapters passed via options
    if (this._opts.providers && this._opts.providers.length > 0) {
      this.registerProviders(...this._opts.providers);
    }

    // Start render loop
    this._lastTime = performance.now();
    this._renderLoop();

    // Mark as initialized — must be last so connectProvider() guard works
    this._initialized = true;
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
    // Build a ScaleSet backed by _priceToWorldY (respects _logScale at call time).
    this._addendumScales = {
      price: (v: number) => this._priceToWorldY(v),
      priceInverse: (worldY: number) => {
        if (this._candleBuffer.count === 0) return worldY * 1000;
        const { min, max } = this._getPriceRange();
        if (this._logScale) {
          const logMin = Math.log(Math.max(min, 1e-10));
          const logMax = Math.log(Math.max(max, 1e-10));
          return Math.exp(logMin + (worldY / 10) * (logMax - logMin));
        }
        return min + (worldY / 10) * (max - min);
      },
      priceHeight: (dataHeight: number) => {
        if (this._candleBuffer.count === 0) return dataHeight * 0.001;
        const { min, max } = this._getPriceRange();
        if (this._logScale) {
          // Derivative of the log mapping at the geometric midpoint
          const mid      = Math.sqrt(Math.max(min, 1e-10) * Math.max(max, 1e-10));
          const logRange = Math.log(Math.max(max, 1e-10)) - Math.log(Math.max(min, 1e-10));
          return logRange > 0 ? (dataHeight / (mid * logRange)) * 10 : 0;
        }
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
        timeToIndex: (timeMs: number) => {
          if (this._candleBuffer.count === 0) return 0;
          return Math.max(0, Math.min(
            this._candleBuffer.count - 1,
            lowerBound(this._candleBuffer.time, this._candleBuffer.count, timeMs),
          ));
        },
      },
      {
        gridXMin: -50,
        gridXMax:  this._maxCandles * 0.6,
        labelPool: this._labelPool,
      },
    );

    // Apply initial theme to axis grid + labels (constructor uses a hardcoded default)
    this._axisManager.setTheme(buildThemePalette(this._theme));

    // Legend and price ticker
    this._legendPanel    = new LegendPanel(this._container);
    this._priceTicker    = new PriceTicker(this._container);
    this._providerBadge  = new ProviderBadge(this._container);

    // Initial UIState
    const initialState: UIState = {
      symbol:           'BTCUSDT',
      interval:         '1h',
      layoutMode:       'Linear',
      theme:            'dark',
      scaleMode:        'linear',
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

    // ── Wire bus events ────────────────────────────────────────────────────
    bus.on('layoutChange', (p: { mode: LayoutMode }) =>
      this.setLayout(p.mode.toLowerCase() as 'linear' | 'helix' | 'tunnel'));

    bus.on('themeChange', (p: { theme: 'dark' | 'light' }) =>
      this.setTheme(p.theme === 'dark' ? DARK_THEME : LIGHT_THEME));

    bus.on('paletteChange', (p: Partial<ThemePalette>) =>
      this._applyPaletteOverrides(p));

    bus.on('zoomToFit', () => this.resetCamera());

    bus.on('indicatorAdd', (cfg: IndicatorConfig) => this.addIndicatorV2(cfg));
    bus.on('indicatorToggle', (p: { id: string; enabled: boolean }) =>
      this.toggleIndicatorV2(p.id, p.enabled));
    bus.on('indicatorUpdate', (p: { id: string } & Partial<IndicatorConfig>) =>
      this.updateIndicatorV2(p.id, p));
    bus.on('indicatorRemove', (p: { id: string }) => this.removeIndicatorV2(p.id));

    bus.on('intervalChange', (p: { interval: string }) => {
      // 'all' is a special view option: show maximum history at daily resolution
      const isAll           = p.interval === 'all';
      const effectiveInterval = isAll ? '1d' : p.interval;

      this._axisManager?.setInterval(effectiveInterval);
      const intervalMs = (INTERVAL_MS as Record<string, number>)[effectiveInterval] ?? 60_000;
      if (this._tickAggregator) {
        this._tickAggregator = new TickAggregator(intervalMs);
      }

      if (this._providerManager && this._activeProviderConfig) {
        // Use the per-interval sensible default (or 1500 for "All")
        const limit = isAll
          ? 1500
          : (INTERVAL_DEFAULT_LIMIT as Record<string, number>)[effectiveInterval] ?? 500;
        const newCfg = {
          ...this._activeProviderConfig,
          interval:       effectiveInterval as Interval,
          historicalLimit: limit,
        };
        this._activeProviderConfig = newCfg;
        void this._providerManager.connect(this, newCfg).catch((err: unknown) =>
          console.warn('[tfv] interval change reconnect failed:', err));
      } else if (isAll) {
        // No provider — just zoom to fit all currently loaded data
        this.resetCamera(0);
      }
    });

    bus.on('scaleChange', (p: { mode: 'linear' | 'log' }) => {
      this.setScaleMode(p.mode);
    });

    bus.on('symbolChange', (p: { symbol: string }) =>
      this.emit('symbol:change' as any, p));

    bus.on('dateRangeChange', (p: { startMs: number; endMs: number }) => {
      this.setTimeRange(p.startMs, p.endMs);
    });

    bus.on('rangeChange', (p: { startIndex: number; endIndex: number }) => {
      if (this._candleBuffer.count === 0) return;
      const si = Math.max(0, p.startIndex);
      const ei = Math.min(this._candleBuffer.count - 1, p.endIndex);
      this.emit('range:change', { startIndex: si, endIndex: ei });
      const out = { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), normal: new THREE.Vector3() };
      this._layout.getCandleTransform(si, this._candleBuffer, out);
      const startX = out.position.x;
      this._layout.getCandleTransform(ei, this._candleBuffer, out);
      const endX  = out.position.x;
      const midX  = (startX + endX) / 2;
      const halfX = (endX - startX) / 2 + 1;
      const dist  = Math.max(halfX, 15);
      this._cameraAnimator.flyTo(
        new THREE.Vector3(midX, 7, dist),
        new THREE.Vector3(midX, 5, 0),
        600,
      );
    });

    bus.on('chartTypeChange', (p: { type: ChartType }) => this.setChartType(p.type));
  }

  private _createLayout(mode: 'linear' | 'helix' | 'tunnel'): LayoutEngine {
    switch (mode) {
      case 'linear':
        return new LinearLayout({ candleSpacing: 0.6, candleWidth: 0.5 });
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
        return new LinearLayout({ candleSpacing: 0.45, candleWidth: 0.35 });
      }
    }
  }

  private _priceToWorldY(price: number): number {
    if (this._candleBuffer.count === 0) return price * 0.001;
    const { min, max } = this._getPriceRange();
    if (this._logScale) {
      const logMin = Math.log(Math.max(min, 1e-10));
      const logMax = Math.log(Math.max(max, 1e-10));
      const logP   = Math.log(Math.max(price, 1e-10));
      return logMax > logMin ? ((logP - logMin) / (logMax - logMin)) * 10 : 0;
    }
    return ((price - min) / (max - min)) * 10;
  }

  private _computeVisibleRange(): VisibleRange | null {
    if (this._candleBuffer.count === 0) return null;
    const cam = this._chartScene.camera;
    const frustum = new THREE.Frustum();
    const pm = new THREE.Matrix4().multiplyMatrices(
      cam.projectionMatrix, cam.matrixWorldInverse);
    frustum.setFromProjectionMatrix(pm);

    const count  = this._candleBuffer.count;
    const posOut = { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), normal: new THREE.Vector3() };
    let si = 0, ei = count - 1;
    let siFound = false;
    for (let i = 0; i < count; i++) {
      this._layout.getCandleTransform(i, this._candleBuffer, posOut);
      if (frustum.containsPoint(posOut.position)) { si = i; siFound = true; break; }
    }
    if (!siFound) return null;
    let eiFound = false;
    for (let i = count - 1; i >= si; i--) {
      this._layout.getCandleTransform(i, this._candleBuffer, posOut);
      if (frustum.containsPoint(posOut.position)) { ei = i; eiFound = true; break; }
    }
    if (!eiFound) ei = si;

    const { min: priceMin, max: priceMax } = this._getPriceRange();
    let volumeMax = 0;
    for (let i = si; i <= ei; i++) volumeMax = Math.max(volumeMax, this._candleBuffer.volume(i));

    return {
      startIndex: si, endIndex: ei,
      startTime:  this._candleBuffer.time[si],
      endTime:    this._candleBuffer.time[ei],
      priceMin, priceMax,
      volumeMax: volumeMax || 1,
    };
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

    // v2.0: AxisManager tick update + RSI sub-view sync
    if (this._axisManager && this._candleBuffer.count > 0) {
      const vr = this._computeVisibleRange();
      if (vr) {
        this._axisManager.update(vr, this._chartScene.camera);
        // Rebuild RSI sub-views when visible range changes (throttled by index delta)
        const last = this._lastVisibleRange;
        if (!last || Math.abs(vr.startIndex - last.startIndex) > 2 || Math.abs(vr.endIndex - last.endIndex) > 2) {
          this._rebuildRSISubViews(vr);
          this._lastVisibleRange = vr;
        }
      }
    }

    // LOD update
    const camDist = this._chartScene.camera.position.length();
    this._candleChart.updateLOD(camDist);
    this._chartTypeManager?.updateLOD(camDist);

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

    // chart-types: MarketCapChart sub-panel render — AFTER all other renders
    if (this._marketCapChart?.isEnabled) {
      const canvasH  = this._rendererManager.height;
      const mcFraction = 0.18;
      const mcHeight   = Math.floor(canvasH * mcFraction);
      this._marketCapChart.render(this._rendererManager.renderer, 0, mcHeight);
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

    // v3.0: Disconnect provider
    this._providerManager?.disconnect();

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
    this._providerBadge?.dispose();

    // Dispose custom layers
    for (const layer of this._customLayers.values()) {
      layer.dispose();
    }
    this._customLayers.clear();

    // Dispose charts
    this._candleChart?.dispose();
    this._volumeChart?.dispose();
    this._indicatorLayer?.dispose();
    this._chartTypeManager?.dispose();
    this._marketCapChart?.dispose();

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
    // Reset slot maps so ghost instances from any previous dataset don't persist.
    this._candleChart.resetSlotMaps();
    this._candleChart.updateRange(0, this._candleBuffer.count);
    this._volumeChart.updateRange(0, this._candleBuffer.count);

    // chart-types: rebuild ALL cached renderers (active and hidden) so switching
    // chart types after a data reload never shows stale geometry.
    if (this._chartTypeManager) {
      this._chartTypeManager.onDataLoaded();
    }
    if (this._marketCapChart) {
      if (this._circulatingSupply > 0) {
        this._marketCapChart.deriveFromSupply(this._candleBuffer, this._circulatingSupply);
      } else if (this._marketCapSeries.length > 0) {
        this._marketCapChart.setSeries(this._marketCapSeries);
      }
    }

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
      this._uiController?.updateNavigatorData(this._addendumData);
      if (this._uiController && candles.length > 0) {
        this._uiController.setDateRange(candles[0].time, candles[candles.length - 1].time);
      }
      if (this._lastVisibleRange) this._rebuildRSISubViews(this._lastVisibleRange);

      // Update price ticker with last candle
      if (this._priceTicker && candles.length > 0) {
        const last = candles[candles.length - 1];
        this._priceTicker.update(last.close, last.close >= last.open);
      }
    }

    // Reset camera to fit data
    this.resetCamera(0);

    // Keep grid floor centered under the visible candle range
    if (this._candleBuffer.count > 0) {
      const bounds = this._layout.getWorldBounds(this._candleBuffer);
      const xCenter = (bounds.min.x + bounds.max.x) / 2;
      this._chartScene.centerGridFloor(xCenter);
    }
  }

  /** Append a completed candle (e.g. closed bar from REST history). */
  appendCandle(candle: OHLCVCandle): void {
    if (this._candleBuffer.count >= this._candleBuffer.capacity) {
      console.warn('[three-finance-viz] CandleBuffer at capacity; ignoring appendCandle');
      return;
    }

    if (this._chartTypeManager) {
      // Explicitly append to buffer first; ChartTypeManager renderers expect the buffer
      // to already contain this candle before they update geometry.
      this._candleBuffer.append(candle);
      // Dispatch to the active renderer (CandleChart uses updateRange; others use append)
      this._chartTypeManager.append(candle);
      // Append market cap point if supply mode is active
      if (this._marketCapChart?.isEnabled && this._circulatingSupply > 0) {
        const count = this._candleBuffer.count;
        this._marketCapChart.appendPoint({
          time:  this._candleBuffer.time[count - 1],
          value: this._candleBuffer.close(count - 1) * this._circulatingSupply,
        });
      }
    } else {
      this._candleChart.append(candle);    // CandleChart.append() appends to buffer internally
    }
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
      this._providerBadge?.flashUpdate();
      this.emit('stream:tick', {});
      this._uiController?.updateNavigatorData(this._addendumData);
    }
  }

  /** Patch the last (in-progress) candle with streaming data. */
  updateLastCandle(partial: Partial<OHLCVCandle>): void {
    if (this._candleBuffer.count === 0) return;

    if (this._chartTypeManager) {
      this._chartTypeManager.patchLast(partial);
    } else {
      this._candleChart.patchLast(partial);
    }
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
        this._providerBadge?.flashUpdate();
        this.emit('stream:tick', {});
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
    this._activeIndicatorConfigs.set(config.id, config);
    this._syncLegend();
    this._uiController?.syncFromState({ indicators: [...this._activeIndicatorConfigs.values()] });
  }

  /**
   * Remove a v2.0 indicator by ID.
   * @param id - Indicator ID
   */
  removeIndicatorV2(id: string): void {
    this._indicatorManager?.remove(id);
    this._activeIndicatorConfigs.delete(id);
    this._syncLegend();
    this._uiController?.syncFromState({ indicators: [...this._activeIndicatorConfigs.values()] });
  }

  /**
   * Update a v2.0 indicator's config (can trigger recalculation).
   * @param id - Indicator ID
   * @param partial - Partial config with changed fields
   */
  updateIndicatorV2(id: string, partial: Partial<IndicatorConfig>): void {
    this._indicatorManager?.update(id, partial);
    const cfg = this._activeIndicatorConfigs.get(id);
    if (cfg) { Object.assign(cfg, partial); this._syncLegend(); }
  }

  /**
   * Toggle v2.0 indicator visibility.
   * @param id - Indicator ID
   * @param enabled - Whether to show the indicator
   */
  toggleIndicatorV2(id: string, enabled: boolean): void {
    this._indicatorManager?.toggle(id, enabled);
    const cfg = this._activeIndicatorConfigs.get(id);
    if (cfg) { cfg.enabled = enabled; this._syncLegend(); }
  }

  // ── Chart types (v4.0) ─────────────────────────────────────────────────────

  /**
   * Switch the primary chart type.
   * Requires `enableAddendum: true` in constructor options.
   * @param type - The chart type to switch to
   */
  /**
   * Switch between linear and logarithmic price axis.
   * Rebuilds all chart geometry so candle positions reflect the new scale.
   * @param mode - 'linear' (default) or 'log'
   */
  setScaleMode(mode: 'linear' | 'log'): void {
    if (this._logScale === (mode === 'log')) return; // no change
    this._logScale = mode === 'log';
    this._uiController?.syncScaleMode(mode);
    this._refreshChartGeometry();
  }

  setChartType(type: ChartType): void {
    if (!this._chartTypeManager) {
      console.warn('[three-finance-viz] setChartType() requires enableAddendum: true.');
      return;
    }
    this._chartTypeManager.setChartType(type);
    this._uiController?.syncChartType(type);
    // When switching to primary volume mode, hide the sub-panel to avoid duplication
    if (type === 'volume') {
      this._volumeChart.setVisible(false);
    } else {
      this._volumeChart.setVisible(true);
    }
  }

  /**
   * Provide an external market cap time-series to render as a sub-panel.
   * Clears any previously set circulating supply.
   * @param series - Array of time/value market cap points
   */
  setMarketCapSeries(series: MarketCapPoint[]): void {
    this._marketCapSeries = series;
    this._circulatingSupply = 0;
    this._ensureMarketCapChart();
    this._marketCapChart!.setSeries(series);
    this._marketCapChart!.setEnabled(true);
  }

  /**
   * Set circulating supply so market cap is derived automatically from candle close prices.
   * Clears any previously set external series.
   * @param supply - Circulating token/coin supply
   */
  setCirculatingSupply(supply: number): void {
    this._circulatingSupply = supply;
    this._marketCapSeries = [];
    this._ensureMarketCapChart();
    if (this._candleBuffer.count > 0) {
      this._marketCapChart!.deriveFromSupply(this._candleBuffer, supply);
    }
    this._marketCapChart!.setEnabled(true);
  }

  /** Rebuild all chart geometry using the current scale function (_priceToWorldY). */
  private _refreshChartGeometry(): void {
    if (this._candleBuffer.count === 0) return;
    const count = this._candleBuffer.count;
    this._volumeChart.recalculateScale();
    this._candleChart.updateRange(0, count);
    this._volumeChart.updateRange(0, count);
    // v1 indicator layer — rebuild lines so Y positions reflect new scale
    this._indicatorLayer.onLayoutChange(this._layout);
    if (this._chartTypeManager && this._chartTypeManager.activeType !== 'candlestick') {
      this._chartTypeManager.onDataLoaded();
    }
    if (this._indicatorManager && this._addendumData.length > 0) {
      this._indicatorManager.onDataUpdate(this._addendumData);
    }
  }

  private _ensureMarketCapChart(): void {
    if (!this._marketCapChart) {
      const resolution = new THREE.Vector2(
        this._rendererManager.width,
        this._rendererManager.height,
      );
      this._marketCapChart = new MarketCapChart({
        theme:      this._theme,
        resolution,
      });
    }
  }

  private _rebuildRSISubViews(vr: VisibleRange): void {
    if (!this._indicatorManager) return;
    for (const [id, cfg] of this._activeIndicatorConfigs) {
      if (cfg.type === 'RSI' && cfg.enabled) {
        this._indicatorManager.rebuildRSISubView(id, vr);
      }
    }
  }

  private _syncLegend(): void {
    this._legendPanel?.update([...this._activeIndicatorConfigs.values()].filter(c => c.enabled));
  }

  private _applyPaletteOverrides(overrides: Partial<ThemePalette>): void {
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
    this._axisManager?.setTheme(buildThemePalette(theme));
    this._chartTypeManager?.onThemeChange(theme);
    this._marketCapChart?.onThemeChange(theme);
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
    this._chartTypeManager?.onLayoutChange(this._layout);
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
    const xMin = bounds.min.x;
    const xMax = bounds.max.x;
    const xRange = xMax - xMin;

    // Focus on the most recent ~60 candles (30 world-units at default 0.5 spacing).
    // For small datasets, centre on all candles instead.
    const VIEW_HALF = 15; // world units — ~60 candles per side at default 0.5 spacing
    const xCenter = xRange > VIEW_HALF * 2
      ? xMax - VIEW_HALF       // most-recent window
      : (xMin + xMax) / 2;    // centre on all candles

    // priceToWorldY always maps the full price range to [0, 10]; midpoint = 5.
    // bounds.getCenter().y = 0 (midpoint of [-1e9, 1e9]) — use the real midpoint.
    const yCenter = 5;
    const center = new THREE.Vector3(xCenter, yCenter, 0);

    // Camera depth: enough to see the X window, with a floor so the Y range is visible.
    const halfX = xRange > VIEW_HALF * 2 ? VIEW_HALF : xRange / 2;
    const dist = Math.max(halfX, 15);
    // Small fixed vertical offset (2 units) keeps the camera nearly level with the
    // candle midpoint, avoiding foreshortening while still showing depth.
    const camPos = new THREE.Vector3(xCenter, yCenter + 2, dist);

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
        const candle = msg as OHLCVCandle;
        const buf = this._candleBuffer;
        // Same time bucket = live update of current candle; new bucket = completed candle
        if (buf.count > 0 && buf.time[buf.count - 1] === candle.time) {
          this._scheduler!.schedulePatch(candle);
        } else {
          this._scheduler!.scheduleAppend(candle);
        }
      }
      // OrderBookDelta handling would go here with OrderBookDepth
    });

    this._wsAdapter.connect();
  }

  disconnectStream(): void {
    // Disconnect WebSocket first so no new messages are enqueued
    this._wsAdapter?.disconnect();
    this._wsAdapter = undefined;
    // Flush any buffered appends/patches before disposing so the last
    // in-flight candle is committed rather than silently dropped.
    this._scheduler?.flush();
    this._scheduler?.dispose();
    this._scheduler = undefined;
    this._tickAggregator?.reset();
    this._tickAggregator = undefined;
  }

  // ── Provider layer (v3.0) ──────────────────────────────────────────────────

  /**
   * True after init() has resolved successfully.
   * connectProvider() throws immediately if false.
   */
  get isInitialized(): boolean {
    return this._initialized;
  }

  /**
   * Register exchange adapters for use with connectProvider().
   * Must be called before connectProvider() if adapters were not supplied
   * via FinanceChartOptions.providers.
   *
   * @param adapters - One or more exchange adapter instances
   */
  registerProviders(...adapters: ExchangeAdapter[]): void {
    this._providerManager = new ProviderManager(adapters);
  }

  /**
   * Connect to a real exchange data source.
   * Fetches historical OHLCV data via REST, then connects the live WebSocket stream.
   *
   * @param config - Provider configuration
   * @throws ProviderError if chart.isInitialized is false or no adapter supports the symbol
   */
  async connectProvider(config: ProviderConfig): Promise<void> {
    if (!this._initialized) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        'connectProvider() called before chart.init() completed. ' +
        'Await chart.init() before calling connectProvider().');
    }
    if (!this._providerManager) {
      throw new ProviderError('EXCHANGE_UNAVAILABLE',
        'No providers registered. Call registerProviders() first.');
    }
    this._activeProviderConfig = config;
    await this._providerManager.connect(this, config);

    // Update the badge with the resolved exchange name
    const activeEx = this._providerManager.activeExchange;
    if (activeEx && this._providerBadge) {
      this._providerBadge.setProvider(activeEx);
    }

    // Track failovers
    this._providerManager.on('provider:change', (ev) => {
      this._providerBadge?.setProvider(ev.to);
    });
  }

  /**
   * Disconnect the active provider (both historical fetcher and live stream).
   * Safe to call if no provider is connected.
   */
  disconnectProvider(): void {
    this._providerManager?.disconnect();
  }

  /**
   * @internal Used by ProviderManager to subscribe to UI-driven symbol changes.
   * Not part of the public API — do not depend on this in application code.
   *
   * The UIController emits 'symbolChange' on the internal bus; the _initAddendum
   * wiring forwards that to chart.emit('symbol:change', ...). ProviderManager
   * calls chart._bus.on('symbolChange', handler) and this adapter maps that to
   * listening for the 'symbol:change' event on the chart's own EventEmitter.
   */
  get _bus(): { on: (event: string, handler: (data: unknown) => void) => () => void } {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return {
      on(event: string, handler: (data: unknown) => void): () => void {
        // Map 'symbolChange' → 'symbol:change' (the ChartEvents key)
        const mappedEvent = event === 'symbolChange' ? 'symbol:change' : event;
        return self.on(mappedEvent as 'symbol:change', handler as (data: { symbol: string }) => void);
      },
    };
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
