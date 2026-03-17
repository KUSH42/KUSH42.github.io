// src/scene/AxesLabels.ts
import * as THREE from 'three';
import { Text } from 'troika-three-text';
import type { ChartTheme } from '../types/theme';

export class AxesLabels {
  private readonly _group: THREE.Group;
  private _labels: Text[] = [];
  private _theme: ChartTheme;

  constructor(
    private readonly scene: THREE.Scene,
    theme: ChartTheme,
  ) {
    this._theme = theme;
    this._group = new THREE.Group();
    scene.add(this._group);
  }

  /** Recompute tick positions when price range or camera changes */
  setRange(
    minPrice: number,
    maxPrice: number,
    minTimeMs: number,
    maxTimeMs: number,
  ): void {
    this._clearLabels();

    // Price Y-axis labels — 6 evenly spaced ticks
    const priceTickCount = 5;
    for (let i = 0; i <= priceTickCount; i++) {
      const t = i / priceTickCount;
      const price = minPrice + (maxPrice - minPrice) * t;
      const worldY = t * 10; // price range mapped to 0–10 world units
      this._addLabel(
        price.toFixed(2),
        new THREE.Vector3(-1.8, worldY, 0),
        'right',
        'middle',
      );
    }

    // Time X-axis labels — 5 evenly spaced ticks
    const timeTickCount = 4;
    for (let i = 0; i <= timeTickCount; i++) {
      const t = i / timeTickCount;
      const timeMs = minTimeMs + (maxTimeMs - minTimeMs) * t;
      const worldX = t * 10; // time range mapped to 0–10 world units
      const label = new Date(timeMs).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      this._addLabel(
        label,
        new THREE.Vector3(worldX, -0.6, 0),
        'center',
        'top',
      );
    }
  }

  private _addLabel(
    text: string,
    position: THREE.Vector3,
    anchorX: 'left' | 'center' | 'right',
    anchorY: 'top' | 'middle' | 'bottom',
  ): void {
    const label = new Text();
    label.text = text;
    label.fontSize = 0.28;
    label.color = this._theme.axis;
    label.anchorX = anchorX;
    label.anchorY = anchorY;
    label.position.copy(position);
    // Render on top of geometry — no depth write
    label.depthOffset = -1;
    this._group.add(label);
    label.sync();
    this._labels.push(label);
  }

  onThemeChange(theme: ChartTheme): void {
    this._theme = theme;
    for (const label of this._labels) {
      label.color = theme.axis;
      label.sync();
    }
  }

  dispose(): void {
    this._clearLabels();
    this.scene.remove(this._group);
  }

  private _clearLabels(): void {
    for (const label of this._labels) {
      this._group.remove(label);
      label.dispose();
    }
    this._labels = [];
  }
}
