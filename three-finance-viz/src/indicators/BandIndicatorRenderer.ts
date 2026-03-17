// src/indicators/BandIndicatorRenderer.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { BollingerConfig, BBResult, ScaleSet } from '../types/addendum';

export class BandIndicatorRenderer {
  private upperLine: Line2;
  private lowerLine: Line2;
  private midLine:   Line2 | null = null;
  private bandMesh:  THREE.Mesh;
  private bandGeom:  THREE.BufferGeometry;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, config: BollingerConfig, resolution: THREE.Vector2) {
    this.scene = scene;

    const lineMat = (color: string) => new LineMaterial({
      color: new THREE.Color(color),
      linewidth: config.lineWidth,
      transparent: true,
      opacity: config.opacity,
      resolution,
      depthWrite: false,
    });

    this.upperLine = new Line2(new LineGeometry(), lineMat(config.color));
    this.lowerLine = new Line2(new LineGeometry(), lineMat(config.color));
    if (config.showMid) {
      this.midLine = new Line2(new LineGeometry(), lineMat('#888888'));
    }

    // Filled ribbon between upper and lower bands.
    // renderOrder=1 (below candles at 2), depthWrite=false (ribbon never
    // occludes candle bodies in the depth buffer), DoubleSide ensures
    // visibility from any camera angle.
    this.bandGeom = new THREE.BufferGeometry();
    const bandMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(config.color),
      transparent: true,
      opacity: config.bandOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.bandMesh = new THREE.Mesh(this.bandGeom, bandMat);
    this.bandMesh.renderOrder = 1; // Before candles (renderOrder 2) — transparency sort

    scene.add(this.upperLine, this.lowerLine, this.bandMesh);
    if (this.midLine) scene.add(this.midLine);
  }

  /**
   * Full rebuild of Bollinger Band geometry
   * @param bbResult - Calculated BB values
   * @param scales - Scale set for price mapping
   * @param positionFn - Function mapping candle index to world position
   */
  rebuild(bbResult: BBResult, scales: ScaleSet, positionFn: (i: number) => THREE.Vector3): void {
    const upperPos: number[] = [];
    const lowerPos: number[] = [];
    const midPos:   number[] = [];
    const ribbonVerts: number[] = [];
    const ribbonIdx:   number[] = [];
    let vtxCount = 0;

    for (let i = 0; i < bbResult.upper.length; i++) {
      if (bbResult.upper[i] === null) continue;
      const base  = positionFn(i);
      const uy    = scales.price(bbResult.upper[i] as number);
      const ly    = scales.price(bbResult.lower[i] as number);
      const my    = scales.price(bbResult.mid[i]   as number);

      upperPos.push(base.x, uy, base.z);
      lowerPos.push(base.x, ly, base.z);
      midPos.push(  base.x, my, base.z);

      // Two vertices per column for ribbon quad strip
      ribbonVerts.push(base.x, uy, base.z); // vtxCount
      ribbonVerts.push(base.x, ly, base.z); // vtxCount + 1

      if (vtxCount >= 2) {
        const b = vtxCount;
        // Quad between column (b-2,b-1) and column (b, b+1).
        // Winding: counter-clockwise when viewed from +Z (front face).
        // DoubleSide makes winding order irrelevant for visibility.
        ribbonIdx.push(b-2, b-1, b,   b-1, b+1, b);
      }
      vtxCount += 2;
    }

    (this.upperLine.geometry as LineGeometry).setPositions(upperPos);
    (this.lowerLine.geometry as LineGeometry).setPositions(lowerPos);
    if (this.midLine) (this.midLine.geometry as LineGeometry).setPositions(midPos);

    this.bandGeom.setAttribute(
      'position', new THREE.Float32BufferAttribute(ribbonVerts, 3),
    );
    this.bandGeom.setIndex(ribbonIdx);
    this.bandGeom.computeVertexNormals();
  }

  /**
   * Update visual properties without rebuilding geometry
   * @param partialConfig - Partial Bollinger config with changed properties
   */
  update(partialConfig: Partial<BollingerConfig>): void {
    if (partialConfig.color !== undefined) {
      (this.upperLine.material as LineMaterial).color.set(partialConfig.color);
      (this.lowerLine.material as LineMaterial).color.set(partialConfig.color);
      (this.bandMesh.material as THREE.MeshBasicMaterial).color.set(partialConfig.color);
    }
    if (partialConfig.bandOpacity !== undefined) {
      (this.bandMesh.material as THREE.MeshBasicMaterial).opacity = partialConfig.bandOpacity;
    }
    if (partialConfig.opacity !== undefined) {
      (this.upperLine.material as LineMaterial).opacity = partialConfig.opacity;
      (this.lowerLine.material as LineMaterial).opacity = partialConfig.opacity;
    }
    if (partialConfig.enabled !== undefined) {
      this.upperLine.visible = partialConfig.enabled;
      this.lowerLine.visible = partialConfig.enabled;
      this.bandMesh.visible  = partialConfig.enabled;
      if (this.midLine) this.midLine.visible = partialConfig.enabled;
    }
  }

  /**
   * Update material resolutions after canvas resize
   * @param resolution - New canvas resolution
   */
  onResize(resolution: THREE.Vector2): void {
    (this.upperLine.material as LineMaterial).resolution.copy(resolution);
    (this.lowerLine.material as LineMaterial).resolution.copy(resolution);
    if (this.midLine) (this.midLine.material as LineMaterial).resolution.copy(resolution);
  }

  dispose(): void {
    [this.upperLine, this.lowerLine, this.midLine, this.bandMesh]
      .filter(Boolean).forEach(obj => {
        this.scene.remove(obj!);
        (obj as any).geometry?.dispose();
        (obj as any).material?.dispose();
      });
    this.bandGeom.dispose();
  }
}
