// src/scene/AxesLabels.ts
import * as THREE from 'three';
import type { ChartTheme } from '../types/theme';

// troika-three-text is an optional dependency; we import it dynamically
type TroikaText = THREE.Object3D & {
  text: string;
  fontSize: number;
  color: string;
  sync(): void;
  dispose(): void;
};

export class AxesLabels {
  private _group: THREE.Group;
  private _labels: TroikaText[] = [];
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
    _minTimeMs: number,
    _maxTimeMs: number,
  ): void {
    // Clear existing labels
    this._clearLabels();

    // Generate price ticks (5 ticks)
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const price = minPrice + (maxPrice - minPrice) * (i / tickCount);
      const y = (price - minPrice) / (maxPrice - minPrice) * 10; // scale to world units
      this._createLabel(
        price.toFixed(2),
        new THREE.Vector3(-1.5, y, 0),
        this._theme.axis,
      );
    }
  }

  private _createLabel(text: string, position: THREE.Vector3, color: string): void {
    // Create a simple sprite-based label using CanvasTexture as fallback
    // troika-three-text would be used in production for better quality
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, 128, 32);
    ctx.fillStyle = color;
    ctx.font = '14px monospace';
    ctx.fillText(text, 4, 22);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(position);
    sprite.scale.set(1.5, 0.4, 1);
    this._group.add(sprite);

    // Cast to satisfy our label type (sprite doesn't have sync/dispose of troika)
    this._labels.push(sprite as unknown as TroikaText);
  }

  private _clearLabels(): void {
    for (const label of this._labels) {
      this._group.remove(label as unknown as THREE.Object3D);
      // Cleanup sprite materials and textures
      const sprite = label as unknown as THREE.Sprite;
      if (sprite.material) {
        const mat = sprite.material as THREE.SpriteMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
    }
    this._labels = [];
  }

  onThemeChange(theme: ChartTheme): void {
    this._theme = theme;
  }

  dispose(): void {
    this._clearLabels();
    this.scene.remove(this._group);
  }
}
