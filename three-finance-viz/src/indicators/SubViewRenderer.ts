// src/indicators/SubViewRenderer.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { RSIConfig, VisibleRange } from '../types/addendum';

export class SubViewRenderer {
  private subCamera:   THREE.OrthographicCamera;
  private subScene:    THREE.Scene;
  private viewport:    THREE.Vector4; // x, y, width, height in pixels
  private lines:       Map<string, Line2> = new Map();
  // Track whether reference lines have been added to avoid accumulation on rebuild
  private referenceLines: THREE.Object3D[] = [];

  constructor(renderer: THREE.WebGLRenderer, heightFraction: number = 0.2) {
    this.subScene  = new THREE.Scene();
    this.subCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.subCamera.position.z = 5;

    const h = renderer.domElement.clientHeight;
    const w = renderer.domElement.clientWidth;
    this.viewport = new THREE.Vector4(0, 0, w, Math.floor(h * heightFraction));
  }

  /**
   * Called each frame — renders sub-panel AFTER main scene render
   * @param renderer - The WebGL renderer to use
   */
  render(renderer: THREE.WebGLRenderer): void {
    const canvas = renderer.domElement;
    try {
      renderer.setScissorTest(true);
      renderer.setScissor(
        this.viewport.x, this.viewport.y,
        this.viewport.z, this.viewport.w,
      );
      renderer.setViewport(
        this.viewport.x, this.viewport.y,
        this.viewport.z, this.viewport.w,
      );
      renderer.render(this.subScene, this.subCamera);
    } finally {
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
  }

  /**
   * Clears the sub-scene content for a full rebuild.
   * Call before re-adding lines (e.g., on data update) to prevent accumulation.
   */
  clear(): void {
    // Remove dynamically added lines and reference lines
    for (const line of this.lines.values()) {
      this.subScene.remove(line);
      (line.geometry as LineGeometry).dispose();
      (line.material as LineMaterial).dispose();
    }
    this.lines.clear();
    for (const ref of this.referenceLines) {
      this.subScene.remove(ref);
      (ref as any).geometry?.dispose();
      (ref as any).material?.dispose();
    }
    this.referenceLines = [];
  }

  /**
   * Add RSI line to sub-view
   * @param config - RSI indicator configuration
   * @param values - Calculated RSI values
   * @param visibleRange - Current visible candle range
   */
  addRSILine(config: RSIConfig, values: (number | null)[], visibleRange: VisibleRange): void {
    // Map RSI 0–100 to -1..+1 world space
    const positions: number[] = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      if (values[i] === null) continue;
      const nx = ((i - visibleRange.startIndex) / (visibleRange.endIndex - visibleRange.startIndex)) * 2 - 1;
      const ny = ((values[i] as number) / 100) * 2 - 1;
      positions.push(nx, ny, 0);
    }

    if (positions.length < 6) return; // Need at least 2 points for Line2

    const geom = new LineGeometry();
    geom.setPositions(positions);
    const mat = new LineMaterial({
      color: new THREE.Color(config.color),
      linewidth: 2,
      resolution: new THREE.Vector2(this.viewport.z, this.viewport.w),
    });
    const line = new Line2(geom, mat);
    this.subScene.add(line);
    this.lines.set(config.id, line);

    // Add overbought/oversold reference lines at RSI 70 and 30.
    // 70 maps to (70/100)*2-1 = 0.4, 30 maps to (30/100)*2-1 = -0.4
    this._addHorizontalReference(0.4, '#ff4444');
    this._addHorizontalReference(-0.4, '#44ff44');
  }

  private _addHorizontalReference(y: number, color: string): void {
    const geom = new LineGeometry();
    geom.setPositions([-1, y, 0, 1, y, 0]);
    const mat = new LineMaterial({
      color: new THREE.Color(color),
      linewidth: 1,
      transparent: true, opacity: 0.4,
      resolution: new THREE.Vector2(this.viewport.z, this.viewport.w),
    });
    const ref = new Line2(geom, mat);
    this.subScene.add(ref);
    this.referenceLines.push(ref); // Track for cleanup
  }

  /**
   * Update viewport and material resolutions after resize
   * @param width - New canvas width
   * @param height - New canvas height
   * @param heightFraction - Fraction of canvas height for sub-view
   */
  onResize(width: number, height: number, heightFraction: number): void {
    const subH = Math.floor(height * heightFraction);
    this.viewport.set(0, 0, width, subH);
    // Update all LineMaterial resolutions
    this.lines.forEach(line => {
      (line.material as LineMaterial).resolution.set(width, subH);
    });
    for (const ref of this.referenceLines) {
      ((ref as Line2).material as LineMaterial).resolution.set(width, subH);
    }
  }

  dispose(): void {
    this.clear(); // dispose lines and reference lines first via tracked references
  }
}
