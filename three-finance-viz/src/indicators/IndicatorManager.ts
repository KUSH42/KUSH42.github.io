// src/indicators/IndicatorManager.ts
import * as THREE from 'three';
import {
  calcSMA, calcEMA, calcBollingerBands, calcRSI, calcMACD, extractSource,
} from './calculators';
import { LineIndicatorRenderer } from './LineIndicatorRenderer';
import { BandIndicatorRenderer } from './BandIndicatorRenderer';
import { SubViewRenderer } from './SubViewRenderer';
import type {
  OHLCV, IndicatorConfig, SMAConfig, EMAConfig, BollingerConfig, RSIConfig, MACDConfig,
  BBResult, ScaleSet, VisibleRange,
} from '../types/addendum';

export class IndicatorManager {
  private calculatedValues: Map<string, (number | null)[]> = new Map();
  private lineRenderers:    Map<string, LineIndicatorRenderer> = new Map();
  private bandRenderers:    Map<string, BandIndicatorRenderer> = new Map();
  private subViewRenderer:  SubViewRenderer;
  private configs:          Map<string, IndicatorConfig> = new Map();
  private resolution:       THREE.Vector2;

  constructor(
    private scene:      THREE.Scene,
    private data:       OHLCV[],
    private scales:     ScaleSet,
    private positionFn: (i: number) => THREE.Vector3,
    renderer: THREE.WebGLRenderer,
  ) {
    this.resolution = new THREE.Vector2(
      renderer.domElement.clientWidth,
      renderer.domElement.clientHeight,
    );
    this.subViewRenderer = new SubViewRenderer(renderer);
  }

  /**
   * Add an indicator configuration and create its renderer
   * @param config - Indicator configuration
   */
  add(config: IndicatorConfig): void {
    this.configs.set(config.id, config);
    this._calculate(config);
    this._createRenderer(config);
    this._rebuild(config.id);
  }

  /**
   * Remove an indicator and dispose its renderer
   * @param id - Indicator ID
   */
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

  /**
   * Update indicator config and optionally recalculate
   * @param id - Indicator ID
   * @param partialConfig - Partial config with changed properties
   */
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

  /**
   * Toggle indicator visibility
   * @param id - Indicator ID
   * @param enabled - Whether the indicator should be visible
   */
  toggle(id: string, enabled: boolean): void {
    const config = this.configs.get(id);
    if (!config) return;
    config.enabled = enabled;
    this.lineRenderers.get(id)?.update({ enabled });
    this.bandRenderers.get(id)?.update({ enabled });
  }

  /**
   * Called when data array changes (new candle or rebuild)
   * @param newData - New OHLCV data array
   */
  onDataUpdate(newData: OHLCV[]): void {
    this.data = newData;
    for (const [, config] of this.configs) {
      this._calculate(config);
      this._rebuild(config.id);
    }
  }

  /**
   * Called each frame for streaming partial updates.
   * NOTE: This performs a full recalculation on every streaming tick — O(N*M).
   * Acceptable for ≤ 500 candles. For larger datasets, use incremental updates.
   * @param index - Index of the updated candle
   * @param candle - Updated candle data
   */
  onStreamTick(_index: number, _candle: OHLCV): void {
    this.onDataUpdate(this.data);
  }

  /**
   * Get the calculated indicator value at a candle index
   * @param id - Indicator ID
   * @param index - Candle index
   * @returns Indicator value or null if not calculated
   */
  getValueAt(id: string, index: number): number | null {
    return this.calculatedValues.get(id)?.[index] ?? null;
  }

  /**
   * Render RSI/MACD sub-panels — call after main scene render
   * @param renderer - The WebGL renderer
   */
  renderSubViews(renderer: THREE.WebGLRenderer): void {
    this.subViewRenderer.render(renderer);
  }

  /**
   * Update resolutions for all LineMaterial instances after canvas resize
   * @param resolution - New canvas resolution
   */
  onResize(resolution: THREE.Vector2): void {
    this.resolution.copy(resolution);
    this.lineRenderers.forEach(r => r.onResize(resolution));
    this.bandRenderers.forEach(r => r.onResize(resolution));
    this.subViewRenderer.onResize(resolution.x, resolution.y, 0.2);
  }

  dispose(): void {
    this.lineRenderers.forEach(r => r.dispose());
    this.bandRenderers.forEach(r => r.dispose());
    this.subViewRenderer.dispose();
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private _calculate(config: IndicatorConfig): void {
    // All IndicatorConfig variants define 'source' — narrowed from the union
    const source = (config as SMAConfig | EMAConfig | BollingerConfig | RSIConfig | MACDConfig).source;
    const src = extractSource(this.data, source);
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
          new LineIndicatorRenderer(this.scene, config as SMAConfig, this.resolution),
        );
        break;
      case 'BB':
        this.bandRenderers.set(
          config.id,
          new BandIndicatorRenderer(this.scene, config as BollingerConfig, this.resolution),
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

  /**
   * Rebuild RSI sub-view with current visible range
   * @param id - RSI indicator ID
   * @param visibleRange - Current visible candle range
   */
  rebuildRSISubView(id: string, visibleRange: VisibleRange): void {
    const config = this.configs.get(id) as RSIConfig | undefined;
    if (!config || config.type !== 'RSI') return;
    const values = this.calculatedValues.get(id);
    if (!values) return;
    this.subViewRenderer.clear();
    this.subViewRenderer.addRSILine(config, values, visibleRange);
  }
}
