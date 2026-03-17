// src/export/ScreenshotExporter.ts
import type { SupportedRenderer } from '../renderer/createRenderer';

export class ScreenshotExporter {
  constructor(private readonly renderer: SupportedRenderer) {}

  async capture(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.renderer.domElement.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to capture screenshot: canvas.toBlob returned null'));
        },
        'image/png',
      );
    });
  }
}
