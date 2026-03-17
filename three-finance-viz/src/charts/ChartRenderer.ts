// src/charts/ChartRenderer.ts
import type * as THREE from 'three';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine } from '../layout/LayoutEngine';

export interface ChartRenderer {
  updateRange(start: number, end: number): void;
  append(candle: OHLCVCandle): void;
  patchLast(partial: Partial<OHLCVCandle>): void;
  onLayoutChange(layout: LayoutEngine): void;
  onThemeChange(theme: ChartTheme): void;
  setVisible(v: boolean): void;
  dispose(): void;
  onResize?(resolution: THREE.Vector2): void;
  updateLOD?(cameraDistance: number): void;
}
