// src/export/GLBExporter.ts
import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';

export class GLBExporter {
  constructor(private readonly scene: THREE.Scene) {}

  async export(): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const exporter = new GLTFExporter();
      exporter.parse(
        this.scene,
        (result) => {
          if (result instanceof ArrayBuffer) {
            resolve(result);
          } else {
            // JSON result — encode to binary
            const json = JSON.stringify(result);
            const enc = new TextEncoder();
            const bytes = enc.encode(json);
            resolve(bytes.buffer);
          }
        },
        (error) => reject(error),
        { binary: true },
      );
    });
  }
}
