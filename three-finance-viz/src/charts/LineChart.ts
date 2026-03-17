// src/charts/LineChart.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine, CandleTransform } from '../layout/LayoutEngine';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { ChartRenderer } from './ChartRenderer';
import type { PriceSource } from '../types/addendum';

export interface LineChartConfig {
  source: PriceSource;
  lineWidth: number;
  color: string;
  opacity: number;
}

/** Module-level scratch position buffer — allocated on first use */
let _linePositions: Float32Array | null = null;

/** Module-level scratch CandleTransform — reused across calls */
const _scratchTransform: CandleTransform = {
  position: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
  normal: new THREE.Vector3(),
};

function getPriceValue(buf: CandleBuffer, i: number, source: PriceSource): number {
  switch (source) {
    case 'open':  return buf.open(i);
    case 'high':  return buf.high(i);
    case 'low':   return buf.low(i);
    case 'hl2':   return (buf.high(i) + buf.low(i)) / 2;
    case 'ohlc4': return (buf.open(i) + buf.high(i) + buf.low(i) + buf.close(i)) / 4;
    case 'close':
    default:      return buf.close(i);
  }
}

export class LineChart implements ChartRenderer {
  private _line: Line2;
  private _geo: LineGeometry;
  private _mat: LineMaterial;
  private _scene: THREE.Scene;
  private _buffer: CandleBuffer;
  private _layout: LayoutEngine;
  private _priceToWorldY: (price: number) => number;
  private _config: LineChartConfig;
  private _maxCandles: number;
  private _resolution: THREE.Vector2;

  constructor(deps: {
    scene: THREE.Scene;
    buffer: CandleBuffer;
    layout: LayoutEngine;
    theme: ChartTheme;
    maxCandles: number;
    priceToWorldY: (price: number) => number;
    resolution: THREE.Vector2;
    config?: Partial<LineChartConfig>;
  }) {
    this._scene = deps.scene;
    this._buffer = deps.buffer;
    this._layout = deps.layout;
    this._priceToWorldY = deps.priceToWorldY;
    this._maxCandles = deps.maxCandles;
    this._resolution = deps.resolution.clone();

    const themeColor  = deps.theme.line?.color     ?? '#26a69a';
    const themeWidth  = deps.theme.line?.lineWidth  ?? 2;

    this._config = {
      source:    deps.config?.source    ?? 'close',
      lineWidth: deps.config?.lineWidth ?? themeWidth,
      color:     deps.config?.color     ?? themeColor,
      opacity:   deps.config?.opacity   ?? 1.0,
    };

    this._geo = new LineGeometry();

    this._mat = new LineMaterial({
      color:       new THREE.Color(this._config.color),
      linewidth:   this._config.lineWidth,
      transparent: this._config.opacity < 1,
      opacity:     this._config.opacity,
      resolution:  this._resolution,
      depthTest:   true,
      depthWrite:  false,
    });

    this._line = new Line2(this._geo, this._mat);
    this._line.renderOrder = 4;
    this._line.frustumCulled = false;
    this._scene.add(this._line);
  }

  private _rebuildGeometry(): void {
    const buf = this._buffer;
    const n = buf.count;

    if (n < 2) {
      this._line.visible = false;
      return;
    }

    // Allocate module-level buffer on first use
    if (_linePositions === null || _linePositions.length < this._maxCandles * 3) {
      _linePositions = new Float32Array(this._maxCandles * 3);
    }

    const out = _scratchTransform;
    for (let i = 0; i < n; i++) {
      this._layout.getCandleTransform(i, buf, out);
      const price = getPriceValue(buf, i, this._config.source);
      const worldY = this._priceToWorldY(price);
      _linePositions[i * 3]     = out.position.x;
      _linePositions[i * 3 + 1] = worldY;
      _linePositions[i * 3 + 2] = out.position.z;
    }

    this._geo.setPositions(_linePositions.subarray(0, n * 3) as unknown as number[]);
    this._line.visible = true;
    this._line.computeLineDistances();
  }

  updateRange(_start: number, _end: number): void {
    // Full rebuild — Line2 requires contiguous positions array
    this._rebuildGeometry();
  }

  append(_candle: OHLCVCandle): void {
    this._rebuildGeometry();
  }

  patchLast(_partial: Partial<OHLCVCandle>): void {
    this._rebuildGeometry();
  }

  onLayoutChange(layout: LayoutEngine): void {
    this._layout = layout;
    this._rebuildGeometry();
  }

  onThemeChange(theme: ChartTheme): void {
    const color = theme.line?.color ?? this._config.color;
    this._mat.color.set(color);
    this._mat.needsUpdate = true;
  }

  setVisible(v: boolean): void {
    this._line.visible = v;
  }

  onResize(resolution: THREE.Vector2): void {
    this._resolution.copy(resolution);
    this._mat.resolution.copy(resolution);
    this._mat.needsUpdate = true;
  }

  dispose(): void {
    this._scene.remove(this._line);
    this._geo.dispose();
    this._mat.dispose();
  }
}
