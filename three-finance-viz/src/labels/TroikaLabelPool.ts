// src/labels/TroikaLabelPool.ts
import * as THREE from 'three';
import { Text as TroikaText, preloadFont } from 'troika-three-text';

export class TroikaLabelPool {
  private pool:   TroikaText[] = [];
  private active: Map<string, TroikaText> = new Map();
  // Track which active labels have pending text changes (dirty flag)
  private dirty:  Set<string> = new Set();
  private scene:  THREE.Scene;

  constructor(scene: THREE.Scene, maxLabels: number) {
    this.scene = scene;
    // Pre-create all instances
    for (let i = 0; i < maxLabels; i++) {
      const t = new TroikaText();
      // Use troika-three-text's built-in default font to avoid a hard dependency
      // on a font file being served at a specific path.
      t.fontSize   = 0.4;
      t.color      = 0xaaaaaa;
      t.anchorX    = 'center';
      t.anchorY    = 'middle';
      t.visible    = false;
      t.depthOffset = -1;   // Prevent z-fighting with grid
      t.renderOrder = 10;
      scene.add(t);
      this.pool.push(t);
    }
  }

  /**
   * Acquire a label from the pool or reuse existing one with given id.
   * Returns null if pool is exhausted.
   * @param id - Unique label identifier
   * @param text - Text to display
   * @param position - World position for the label
   */
  acquire(id: string, text: string, position: THREE.Vector3): TroikaText | null {
    let label = this.active.get(id);
    if (!label) {
      if (this.pool.length === 0) {
        console.warn('TroikaLabelPool: pool exhausted — increase maxLabels');
        return null;
      }
      label = this.pool.pop()!;
      this.active.set(id, label);
    }
    if (label.text !== text) {
      label.text = text;
      this.dirty.add(id); // Mark dirty — sync deferred to syncAll()
    }
    label.position.copy(position);
    label.visible = true;
    return label;
  }

  /**
   * Return a label to the pool
   * @param id - Label identifier to release
   */
  release(id: string): void {
    const label = this.active.get(id);
    if (label) {
      label.visible = false;
      this.pool.push(label);
      this.active.delete(id);
      this.dirty.delete(id);
    }
  }

  /** Release all active labels back to the pool */
  releaseAll(): void {
    for (const id of [...this.active.keys()]) {
      this.release(id);
    }
  }

  /**
   * Call once per frame — batch sync all dirty labels only.
   * Uses an explicit dirty flag rather than accessing Troika private internals.
   */
  syncAll(): void {
    for (const id of this.dirty) {
      const label = this.active.get(id);
      if (label) label.sync();
    }
    this.dirty.clear();
  }

  /**
   * Camera-facing sync — call each frame for billboard labels
   * @param camera - Current camera
   */
  syncBillboards(camera: THREE.Camera): void {
    for (const [, label] of this.active) {
      if (label.visible) label.quaternion.copy(camera.quaternion);
    }
  }

  /**
   * Change the font for all labels in the pool
   * @param fontUrl - URL to the font file
   */
  setFont(fontUrl: string): void {
    for (const label of [...this.pool, ...this.active.values()]) {
      label.font = fontUrl;
    }
  }

  dispose(): void {
    for (const label of [...this.pool, ...this.active.values()]) {
      this.scene.remove(label);
      label.dispose();
    }
    this.pool.length = 0;
    this.active.clear();
    this.dirty.clear();
  }

  /**
   * Preload font to prevent frame stutter on first render.
   * Call once at app init.
   * @param fontUrl - URL to the font file
   * @param callback - Optional callback when font is ready
   */
  static preloadFont(fontUrl: string, callback?: () => void): void {
    preloadFont(
      { font: fontUrl, characters: '0123456789.,+-KMBGTSMAEOD %:/' },
      callback ?? (() => {}),
    );
  }
}
