// src/scene/GridFloor.ts
import * as THREE from 'three';
import type { ChartTheme } from '../types/theme';

export class GridFloor {
  private _grid: THREE.GridHelper;
  private _currentX = 500;
  private readonly _size: number;
  private readonly _divisions: number;

  constructor(
    private readonly scene: THREE.Scene,
    theme: ChartTheme,
    size = 2000,
    divisions = 200,
  ) {
    this._size      = size;
    this._divisions = divisions;
    this._grid = this._build(theme);
    scene.add(this._grid);
  }

  setCenter(x: number): void {
    this._currentX = x;
    this._grid.position.x = x;
  }

  onThemeChange(theme: ChartTheme): void {
    // GridHelper bakes colors into vertex attributes at construction time;
    // mat.color.set() has no effect once the geometry is built. Recreate.
    this.scene.remove(this._grid);
    this._grid.geometry.dispose();
    const mats = Array.isArray(this._grid.material)
      ? (this._grid.material as THREE.Material[])
      : [this._grid.material as THREE.Material];
    mats.forEach(m => m.dispose());

    this._grid = this._build(theme);
    this.scene.add(this._grid);
  }

  dispose(): void {
    this.scene.remove(this._grid);
    this._grid.geometry.dispose();
    const mats = Array.isArray(this._grid.material)
      ? (this._grid.material as THREE.Material[])
      : [this._grid.material as THREE.Material];
    mats.forEach(m => m.dispose());
  }

  // ── private ────────────────────────────────────────────────────────────────

  private _build(theme: ChartTheme): THREE.GridHelper {
    // Pass theme color for both center-line and grid-line so both are uniform.
    const g = new THREE.GridHelper(this._size, this._divisions, theme.grid, theme.grid);
    // Rotate 90° around X so the grid lies in the XY plane (vertical backdrop
    // behind the candles) instead of the XZ plane (floor).
    g.rotation.x = -Math.PI / 2;
    g.position.y = 5;    // vertically centred on the 0–10 candle Y range
    g.position.z = -1.5; // slightly behind candles at Z = 0
    g.position.x = this._currentX;
    this._applyOpacity(g, theme);
    return g;
  }

  private _applyOpacity(grid: THREE.GridHelper, theme: ChartTheme): void {
    // Use higher opacity on dark backgrounds where the grid color is closer to
    // the background and needs more presence.
    const col    = new THREE.Color(theme.grid);
    const isDark = (col.r + col.g + col.b) / 3 < 0.45;
    const opacity = isDark ? 0.75 : 0.6;

    const mats = Array.isArray(grid.material)
      ? (grid.material as THREE.LineBasicMaterial[])
      : [grid.material as THREE.LineBasicMaterial];
    for (const mat of mats) {
      mat.opacity     = opacity;
      mat.transparent = true;
    }
  }
}
