// src/interaction/CrosshairManager.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { TroikaLabelPool } from '../labels/TroikaLabelPool';
import type { Text as TroikaText } from 'troika-three-text';

export class CrosshairManager {
  private vLine:      Line2;
  private hLine:      Line2;
  private priceLabel: TroikaText | null;
  private timeLabel:  TroikaText | null;
  private enabled     = true;

  constructor(
    private scene: THREE.Scene,
    private labelPool: TroikaLabelPool,
    resolution: THREE.Vector2,
  ) {
    const mat = (color: number) => new LineMaterial({
      color,
      linewidth: 1,
      transparent: true,
      opacity: 0.6,
      depthTest: false,
      depthWrite: false,
      resolution,
    });

    const vGeom = new LineGeometry();
    vGeom.setPositions([0, -100, 0, 0, 100, 0]);
    this.vLine = new Line2(vGeom, mat(0xffffff));
    this.vLine.renderOrder = 20;

    const hGeom = new LineGeometry();
    hGeom.setPositions([-500, 0, 0, 500, 0, 0]);
    this.hLine = new Line2(hGeom, mat(0xffffff));
    this.hLine.renderOrder = 20;

    scene.add(this.vLine, this.hLine);

    // acquire() returns TroikaText | null — handle null gracefully
    this.priceLabel = labelPool.acquire('crosshair_price', '', new THREE.Vector3());
    this.timeLabel  = labelPool.acquire('crosshair_time',  '', new THREE.Vector3());
  }

  /**
   * Update crosshair position and label values
   * @param worldX - World X coordinate
   * @param worldY - World Y coordinate
   * @param worldZ - World Z coordinate
   * @param priceStr - Formatted price string for label
   * @param timeStr - Formatted time string for label
   */
  setPosition(
    worldX: number, worldY: number, worldZ: number,
    priceStr: string, timeStr: string,
  ): void {
    if (!this.enabled) return;

    (this.vLine.geometry as LineGeometry).setPositions([
      worldX, -500, worldZ,
      worldX,  500, worldZ,
    ]);

    (this.hLine.geometry as LineGeometry).setPositions([
      -500, worldY, worldZ,
       500, worldY, worldZ,
    ]);

    if (this.priceLabel) {
      this.priceLabel.text = priceStr;
      this.priceLabel.position.set(worldX + 1.0, worldY, worldZ);
      this.priceLabel.sync();
    }
    if (this.timeLabel) {
      this.timeLabel.text  = timeStr;
      this.timeLabel.position.set(worldX, -2.0, worldZ);
      this.timeLabel.sync();
    }
  }

  /**
   * Show or hide the crosshair
   * @param visible - Whether the crosshair should be visible
   */
  setVisible(visible: boolean): void {
    this.vLine.visible = visible;
    this.hLine.visible = visible;
    if (this.priceLabel) this.priceLabel.visible = visible;
    if (this.timeLabel)  this.timeLabel.visible  = visible;
  }

  /**
   * Update material resolutions after canvas resize
   * @param resolution - New canvas resolution
   */
  onResize(resolution: THREE.Vector2): void {
    (this.vLine.material as LineMaterial).resolution.copy(resolution);
    (this.hLine.material as LineMaterial).resolution.copy(resolution);
  }

  dispose(): void {
    this.scene.remove(this.vLine, this.hLine);
    (this.vLine.geometry as LineGeometry).dispose();
    (this.hLine.geometry as LineGeometry).dispose();
    (this.vLine.material as LineMaterial).dispose();
    (this.hLine.material as LineMaterial).dispose();
    this.labelPool.release('crosshair_price');
    this.labelPool.release('crosshair_time');
  }
}
