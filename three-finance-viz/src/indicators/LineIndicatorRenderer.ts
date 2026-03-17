// src/indicators/LineIndicatorRenderer.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { SMAConfig, EMAConfig, BaseIndicatorConfig, ScaleSet } from '../types/addendum';

export class LineIndicatorRenderer {
  private line: Line2;
  private geometry: LineGeometry;
  private material: LineMaterial;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, config: SMAConfig | EMAConfig, resolution: THREE.Vector2) {
    this.scene = scene;
    this.geometry = new LineGeometry();

    this.material = new LineMaterial({
      color:       new THREE.Color(config.color),
      linewidth:   config.lineWidth, // World pixels, not CSS pixels
      transparent: config.opacity < 1,
      opacity:     config.opacity,
      resolution,  // MUST match renderer size — update on resize
      depthTest:   true,
      depthWrite:  false,
    });

    this.line = new Line2(this.geometry, this.material);
    this.line.renderOrder = 5;
    this.line.visible = config.enabled;
    this.line.name = `indicator_${config.id}`;
    scene.add(this.line);
  }

  /**
   * Full rebuild — call when data changes or period changes
   * @param values - Array of calculated indicator values (null for insufficient data)
   * @param scales - Scale set for price mapping
   * @param positionFn - Function mapping candle index to world position
   */
  rebuild(
    values: (number | null)[],
    scales: ScaleSet,
    positionFn: (index: number) => THREE.Vector3,
  ): void {
    const positions: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i] === null) continue;
      const worldPos = positionFn(i);
      const worldY   = scales.price(values[i] as number);
      positions.push(worldPos.x, worldY, worldPos.z);
    }

    if (positions.length < 6) {
      this.line.visible = false;
      return;
    }

    this.geometry.setPositions(positions);
    this.line.computeLineDistances();
    this.line.visible = true;
  }

  /**
   * Update visual properties without rebuilding geometry
   * @param partialConfig - Partial config with only changed properties
   */
  update(partialConfig: Partial<BaseIndicatorConfig>): void {
    if (partialConfig.color !== undefined)
      this.material.color.set(partialConfig.color);
    if (partialConfig.lineWidth !== undefined)
      this.material.linewidth = partialConfig.lineWidth;
    if (partialConfig.opacity !== undefined)
      this.material.opacity = partialConfig.opacity;
    if (partialConfig.enabled !== undefined)
      this.line.visible = partialConfig.enabled;
  }

  /**
   * Update material resolution after canvas resize
   * @param resolution - New canvas resolution
   */
  onResize(resolution: THREE.Vector2): void {
    this.material.resolution.copy(resolution);
  }

  dispose(): void {
    this.scene.remove(this.line);
    this.geometry.dispose();
    this.material.dispose();
  }
}
