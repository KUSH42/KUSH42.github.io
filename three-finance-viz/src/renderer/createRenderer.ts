// src/renderer/createRenderer.ts
import * as THREE from 'three';

export type SupportedRenderer = THREE.WebGLRenderer;

export interface RendererOptions {
  antialias?: boolean;
  alpha?: boolean;
  maxPixelRatio?: number;
  onFallback?: (reason: string) => void;
}

export async function createRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions = {},
): Promise<{ renderer: SupportedRenderer; isWebGPU: boolean }> {
  const { onFallback, maxPixelRatio = 2 } = options;

  // WebGPU path — attempt if navigator.gpu is available
  if (typeof navigator !== 'undefined' && 'gpu' in navigator && navigator.gpu) {
    try {
      const adapter = await (navigator.gpu as unknown as { requestAdapter(): Promise<unknown> }).requestAdapter();
      if (adapter) {
        // WebGPU renderer — cast through unknown as THREE.WebGPURenderer may not be available
        // in all three.js builds; we use dynamic access to avoid compile-time errors.
        const WebGPURendererClass = (THREE as unknown as Record<string, unknown>)[
          'WebGPURenderer'
        ] as (new (opts: unknown) => THREE.WebGLRenderer & { init(): Promise<void> }) | undefined;
        if (WebGPURendererClass) {
          const renderer = new WebGPURendererClass({
            canvas,
            antialias: options.antialias ?? true,
          });
          await renderer.init();
          return { renderer, isWebGPU: true };
        }
        onFallback?.('WebGPURenderer not found in this Three.js build');
      } else {
        onFallback?.('No WebGPU adapter available');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      onFallback?.(`WebGPU init failed: ${msg}`);
    }
  } else {
    onFallback?.('navigator.gpu not present');
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: options.antialias ?? true,
    alpha: options.alpha ?? false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
  return { renderer, isWebGPU: false };
}
