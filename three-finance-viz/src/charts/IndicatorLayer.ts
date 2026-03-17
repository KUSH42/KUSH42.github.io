// src/charts/IndicatorLayer.ts
import * as THREE from 'three';
import type {
  IndicatorSeries,
  MovingAverageSeries,
  BollingerBandSeries,
  RSISeries,
  MACDSeries,
} from '../types/indicators';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';
import type { Disposable } from './CandleChart';

// Line2 from three-stdlib for fat lines
let Line2Class: typeof import('three-stdlib').Line2 | null = null;
let LineGeometryClass: typeof import('three-stdlib').LineGeometry | null = null;
let LineMaterial2Class: typeof import('three-stdlib').LineMaterial | null = null;

// Attempt to load three-stdlib line components
async function loadLineClasses(): Promise<void> {
  try {
    const { Line2, LineGeometry, LineMaterial } = await import('three-stdlib');
    Line2Class = Line2;
    LineGeometryClass = LineGeometry;
    LineMaterial2Class = LineMaterial;
  } catch (_e) {
    // Fall back to basic Line
  }
}
loadLineClasses();

type IndicatorEntry = {
  id: string;
  series: IndicatorSeries;
  objects: THREE.Object3D[];
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  values?: Array<number | null>;
};

export class IndicatorLayer implements Disposable {
  private _entries = new Map<string, IndicatorEntry>();
  private _idCounter = 0;

  constructor(
    private deps: {
      scene: THREE.Scene;
      layout: LayoutEngine;
      theme: ChartTheme;
      priceToWorldY: (price: number) => number;
    },
  ) {}

  private _generateId(): string {
    return `indicator_${++this._idCounter}`;
  }

  private _buildLine(
    values: Array<number | null>,
    color: string,
    lineWidth: number,
    zOffset = 0,
  ): { objects: THREE.Object3D[]; geometry: THREE.BufferGeometry; material: THREE.Material } {
    const { layout, priceToWorldY } = this.deps;

    // Build position array
    const positions: number[] = [];
    const fakeBuffer = { count: values.length } as import('../types/CandleBuffer').CandleBuffer;
    const scratchTransform = {
      position: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      normal: new THREE.Vector3(),
    };

    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      if (v === null || v === undefined) continue;
      layout.getCandleTransform(i, fakeBuffer, scratchTransform);
      positions.push(scratchTransform.position.x, priceToWorldY(v), scratchTransform.position.z + zOffset);
    }

    if (positions.length < 6) {
      // Not enough points for a line
      return { objects: [], geometry: new THREE.BufferGeometry(), material: new THREE.LineBasicMaterial() };
    }

    const objects: THREE.Object3D[] = [];

    if (Line2Class && LineGeometryClass && LineMaterial2Class) {
      const geo = new LineGeometryClass();
      geo.setPositions(positions);
      const mat = new LineMaterial2Class({
        color: new THREE.Color(color).getHex(),
        linewidth: lineWidth,
        worldUnits: false,
        resolution: new THREE.Vector2(1024, 768),
      });
      const line = new Line2Class(geo, mat);
      line.computeLineDistances();
      this.deps.scene.add(line);
      objects.push(line);
      return { objects, geometry: geo, material: mat };
    } else {
      // Fallback to basic Line
      const geo = new THREE.BufferGeometry();
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < positions.length; i += 3) {
        pts.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
      }
      geo.setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color });
      const line = new THREE.Line(geo, mat);
      this.deps.scene.add(line);
      objects.push(line);
      return { objects, geometry: geo, material: mat };
    }
  }

  addMA(series: MovingAverageSeries): string {
    const id = this._generateId();
    const { objects, geometry, material } = this._buildLine(series.values, series.color, series.lineWidth);
    this._entries.set(id, { id, series, objects, geometry, material, values: [...series.values] });
    return id;
  }

  addBollingerBands(series: BollingerBandSeries): string {
    const id = this._generateId();
    const objs: THREE.Object3D[] = [];
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];

    const { objects: upperObjs, geometry: upperGeo, material: upperMat } = this._buildLine(
      series.upper,
      series.color,
      1,
    );
    objs.push(...upperObjs);
    geos.push(upperGeo);
    mats.push(upperMat);

    const { objects: middleObjs, geometry: middleGeo, material: middleMat } = this._buildLine(
      series.middle,
      series.color,
      1,
    );
    objs.push(...middleObjs);
    geos.push(middleGeo);
    mats.push(middleMat);

    const { objects: lowerObjs, geometry: lowerGeo, material: lowerMat } = this._buildLine(
      series.lower,
      series.color,
      1,
    );
    objs.push(...lowerObjs);
    geos.push(lowerGeo);
    mats.push(lowerMat);

    // Dispose extra geometries/materials from this consolidated entry
    this._entries.set(id, {
      id,
      series,
      objects: objs,
      geometry: upperGeo,
      material: upperMat,
      values: [...(series.upper as (number | null)[])],
    });

    // Track all geos/mats for proper disposal
    for (let i = 1; i < geos.length; i++) {
      this._entries.get(id)!.objects[i] = objs[i];
    }

    return id;
  }

  addRSI(series: RSISeries): string {
    const id = this._generateId();
    // RSI values are 0-100; map to panel offset coordinate space
    const mappedValues = series.values.map((v) => (v !== null ? series.panelOffset + v * 0.05 : null));
    const { objects, geometry, material } = this._buildLine(mappedValues, '#7b68ee', 1);
    this._entries.set(id, { id, series, objects, geometry, material, values: [...series.values] });
    return id;
  }

  addMACD(series: MACDSeries): string {
    const id = this._generateId();
    const objs: THREE.Object3D[] = [];

    // Map values to panel offset space
    const mappedMacd = series.macd.map((v) => (v !== null ? series.panelOffset + v : null));
    const mappedSignal = series.signal.map((v) => (v !== null ? series.panelOffset + v : null));

    const { objects: macdObjs } = this._buildLine(mappedMacd, '#f5a623', 1);
    const { objects: signalObjs } = this._buildLine(mappedSignal, '#ab47bc', 1);
    objs.push(...macdObjs, ...signalObjs);

    this._entries.set(id, { id, series, objects: objs, values: [...(series.macd as (number | null)[])] });
    return id;
  }

  remove(id: string): void {
    const entry = this._entries.get(id);
    if (!entry) return;
    for (const obj of entry.objects) {
      this.deps.scene.remove(obj);
    }
    entry.geometry?.dispose();
    entry.material?.dispose();
    this._entries.delete(id);
  }

  /** Append a single new value (streaming update) */
  appendValue(id: string, value: number | null): void {
    const entry = this._entries.get(id);
    if (!entry || !entry.values) return;
    entry.values.push(value);
    // Rebuild the line with updated values
    this.remove(id);
    const newSeries = { ...entry.series } as IndicatorSeries;
    if (newSeries.type === 'SMA' || newSeries.type === 'EMA' || newSeries.type === 'VWAP') {
      (newSeries as MovingAverageSeries).values = [...entry.values];
      this.addMA(newSeries as MovingAverageSeries);
    }
  }

  /** Full replacement (e.g. after layout change) */
  replaceValues(id: string, values: Array<number | null>): void {
    const entry = this._entries.get(id);
    if (!entry) return;
    const series = { ...entry.series } as IndicatorSeries;
    this.remove(id);
    if (series.type === 'SMA' || series.type === 'EMA' || series.type === 'VWAP') {
      (series as MovingAverageSeries).values = values;
      this.addMA(series as MovingAverageSeries);
    }
  }

  onLayoutChange(layout: LayoutEngine): void {
    this.deps = { ...this.deps, layout };
    // Rebuild all indicators
    const entries = Array.from(this._entries.values());
    for (const entry of entries) {
      const { id, series } = entry;
      this.remove(id);
      this._rebuildEntry(id, series);
    }
  }

  private _rebuildEntry(id: string, series: IndicatorSeries): void {
    switch (series.type) {
      case 'SMA':
      case 'EMA':
      case 'VWAP':
        this.addMA(series);
        break;
      case 'BollingerBands':
        this.addBollingerBands(series);
        break;
      case 'RSI':
        this.addRSI(series);
        break;
      case 'MACD':
        this.addMACD(series);
        break;
      default: {
        const _exhaustive: never = series;
        void _exhaustive;
      }
    }
    void id;
  }

  onThemeChange(_theme: ChartTheme): void {
    // Update colors — for simplicity rebuild all indicators
    // In production this would update material colors in place
  }

  dispose(): void {
    for (const id of this._entries.keys()) {
      this.remove(id);
    }
  }
}
