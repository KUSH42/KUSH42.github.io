// src/scene/GridFloor.ts
import * as THREE from 'three';
import type { ChartTheme } from '../types/theme';

export class GridFloor {
  private _grid: THREE.GridHelper;

  constructor(
    private readonly scene: THREE.Scene,
    theme: ChartTheme,
    size = 200,
    divisions = 40,
  ) {
    this._grid = new THREE.GridHelper(size, divisions);
    this._applyTheme(theme);
    scene.add(this._grid);
  }

  private _applyTheme(theme: ChartTheme): void {
    const mat = this._grid.material as THREE.LineBasicMaterial;
    mat.color.set(theme.grid);
    mat.opacity = 0.5;
    mat.transparent = true;
  }

  onThemeChange(theme: ChartTheme): void {
    this._applyTheme(theme);
  }

  dispose(): void {
    this.scene.remove(this._grid);
    this._grid.geometry.dispose();
    (this._grid.material as THREE.Material).dispose();
  }
}
