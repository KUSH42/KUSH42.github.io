// src/charts/ChartTypeManager.ts
import * as THREE from 'three';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';
import type { ChartType } from '../types/chartType';
import type { ChartRenderer } from './ChartRenderer';
import { CandleChart } from './CandleChart';
import { HeikinAshiCandleChart } from './HeikinAshiCandleChart';
import { LineChart } from './LineChart';
import type { LineChartConfig } from './LineChart';
import { AreaChart } from './AreaChart';
import type { AreaChartConfig } from './AreaChart';
import { VolumeChart } from './VolumeChart';

export interface ChartTypeManagerDeps {
  scene: THREE.Scene;
  buffer: CandleBuffer;
  layout: LayoutEngine;
  theme: ChartTheme;
  maxCandles: number;
  priceToWorldY: (price: number) => number;
  resolution: THREE.Vector2;
  volumePanelOffset: number;
  volumePanelHeight: number;
  /** If provided, this existing CandleChart is registered as the 'candlestick' renderer
   *  without creating a new instance. The chart must already be added to the scene. */
  existingCandleChart?: CandleChart;
}

function defaultLineConfig(theme: ChartTheme): LineChartConfig {
  return {
    source: 'close',
    lineWidth: 2,
    color: theme.line?.color ?? '#26a69a',
    opacity: 1,
  };
}

function defaultAreaConfig(theme: ChartTheme): AreaChartConfig {
  return {
    source: 'close',
    lineColor: theme.area?.lineColor ?? '#26a69a',
    fillColor: theme.area?.fillColor ?? '#26a69a',
    floorAlpha: theme.area?.floorAlpha ?? 0.08,
    lineWidth: 2,
    opacity: 1,
  };
}

export class ChartTypeManager {
  private _scene: THREE.Scene;
  private _buffer: CandleBuffer;
  private _layout: LayoutEngine;
  private _theme: ChartTheme;
  private _maxCandles: number;
  private _priceToWorldY: (price: number) => number;
  private _resolution: THREE.Vector2;
  private _volumePanelOffset: number;
  private _volumePanelHeight: number;

  private _active: ChartType = 'candlestick';
  private _cache = new Map<ChartType, ChartRenderer>();

  constructor(deps: ChartTypeManagerDeps) {
    this._scene            = deps.scene;
    this._buffer           = deps.buffer;
    this._layout           = deps.layout;
    this._theme            = deps.theme;
    this._maxCandles       = deps.maxCandles;
    this._priceToWorldY    = deps.priceToWorldY;
    this._resolution       = deps.resolution.clone();
    this._volumePanelOffset = deps.volumePanelOffset;
    this._volumePanelHeight = deps.volumePanelHeight;

    // Register the candlestick renderer — use the externally-created instance if provided,
    // otherwise create a new one. The external instance is already added to the scene.
    const candleChart = deps.existingCandleChart ?? new CandleChart({
      scene:         this._scene,
      buffer:        this._buffer,
      layout:        this._layout,
      theme:         this._theme,
      maxCandles:    this._maxCandles,
      priceToWorldY: this._priceToWorldY,
    });
    this._cache.set('candlestick', candleChart);
    this._active = 'candlestick';
  }

  /**
   * Returns the CandleChart instance used for candlestick mode, regardless of the currently
   * active chart type. Falls back to the cached 'candlestick' renderer when another type is active.
   */
  getCandleChart(): CandleChart | null {
    const renderer = this._cache.get('candlestick');
    if (renderer instanceof CandleChart) return renderer;
    return null;
  }

  /** The currently active chart type. */
  get activeType(): ChartType {
    return this._active;
  }

  private _createRenderer(type: ChartType): ChartRenderer {
    switch (type) {
      case 'candlestick':
        return new CandleChart({
          scene:         this._scene,
          buffer:        this._buffer,
          layout:        this._layout,
          theme:         this._theme,
          maxCandles:    this._maxCandles,
          priceToWorldY: this._priceToWorldY,
        });

      case 'heikin-ashi':
        return new HeikinAshiCandleChart({
          scene:         this._scene,
          buffer:        this._buffer,
          layout:        this._layout,
          theme:         this._theme,
          maxCandles:    this._maxCandles,
          priceToWorldY: this._priceToWorldY,
        });

      case 'line':
        return new LineChart({
          scene:         this._scene,
          buffer:        this._buffer,
          layout:        this._layout,
          theme:         this._theme,
          maxCandles:    this._maxCandles,
          priceToWorldY: this._priceToWorldY,
          resolution:    this._resolution,
          config:        defaultLineConfig(this._theme),
        });

      case 'area':
        return new AreaChart({
          scene:         this._scene,
          buffer:        this._buffer,
          layout:        this._layout,
          theme:         this._theme,
          maxCandles:    this._maxCandles,
          priceToWorldY: this._priceToWorldY,
          resolution:    this._resolution,
          floorWorldY:   0,
          config:        defaultAreaConfig(this._theme),
        });

      case 'volume':
        return new VolumeChart({
          scene:       this._scene,
          buffer:      this._buffer,
          layout:      this._layout,
          theme:       this._theme,
          maxCandles:  this._maxCandles,
          panelOffset: this._volumePanelOffset,
          panelHeight: this._volumePanelHeight,
          primaryMode: true,
        });

      default:
        throw new Error(`ChartTypeManager: unsupported chart type '${type}'`);
    }
  }

  /**
   * Switch the active chart type.
   * 'market-cap' is not managed by ChartTypeManager; warns and returns early.
   */
  setChartType(type: ChartType): void {
    if (type === 'market-cap') {
      console.warn(
        'ChartTypeManager: market-cap is not managed here; use MarketCapChart directly.',
      );
      return;
    }

    if (type === this._active) return;

    // Hide current renderer
    this._cache.get(this._active)?.setVisible(false);

    // Get or create the target renderer
    let newRenderer = this._cache.get(type);
    if (!newRenderer) {
      newRenderer = this._createRenderer(type);
      this._cache.set(type, newRenderer);
    }

    newRenderer.setVisible(true);
    this._active = type;
    newRenderer.updateRange(0, this._buffer.count);
  }

  /**
   * Called when the full data buffer has been loaded (or replaced).
   * Resets slot maps on all candle-type renderers and rebuilds every cached
   * renderer so hidden types don't serve stale geometry on the next switch.
   */
  onDataLoaded(): void {
    const count = this._buffer.count;
    for (const [, renderer] of this._cache) {
      // Reset candle slot maps before a full rebuild to prevent ghost instances
      // from a previous dataset leaking into the new one.
      if (renderer instanceof CandleChart) {
        renderer.resetSlotMaps();
      } else if (renderer instanceof HeikinAshiCandleChart) {
        renderer.resetSlotMaps();
      }
      renderer.updateRange(0, count);
    }
  }

  /**
   * Append a new candle. The buffer must already contain this candle before calling.
   * CandleChart does not call buffer.append() itself in this context; updateRange is used.
   */
  append(candle: OHLCVCandle): void {
    const renderer = this._cache.get(this._active);
    if (!renderer) return;

    if (this._active === 'candlestick') {
      // CandleChart.append() calls buffer.append() internally; avoid double-appending
      // by using updateRange for the last slot only.
      const count = this._buffer.count;
      renderer.updateRange(count - 1, count);
    } else {
      renderer.append(candle);
    }
  }

  /**
   * Patch the last candle with updated OHLCV values.
   */
  patchLast(partial: Partial<OHLCVCandle>): void {
    this._cache.get(this._active)?.patchLast(partial);
  }

  /**
   * Propagate a layout change to ALL cached renderers so that hidden ones
   * are still up-to-date when switched to.
   */
  onLayoutChange(layout: LayoutEngine): void {
    this._layout = layout;
    for (const renderer of this._cache.values()) {
      renderer.onLayoutChange(layout);
    }
  }

  /**
   * Propagate a theme change to ALL cached renderers.
   */
  onThemeChange(theme: ChartTheme): void {
    this._theme = theme;
    for (const renderer of this._cache.values()) {
      renderer.onThemeChange(theme);
    }
  }

  /**
   * Propagate a resize event to all cached renderers that support it.
   */
  onResize(resolution: THREE.Vector2): void {
    this._resolution.copy(resolution);
    for (const renderer of this._cache.values()) {
      renderer.onResize?.(resolution);
    }
  }

  /**
   * Update the LOD for the active renderer only (performance-sensitive).
   */
  updateLOD(dist: number): void {
    this._cache.get(this._active)?.updateLOD?.(dist);
  }

  /**
   * Dispose all cached renderers and clear the cache.
   */
  dispose(): void {
    for (const renderer of this._cache.values()) {
      renderer.dispose();
    }
    this._cache.clear();
  }
}
