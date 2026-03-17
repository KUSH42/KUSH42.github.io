// src/renderer/RendererManager.ts
import * as THREE from 'three';
import { createRenderer, type RendererOptions, type SupportedRenderer } from './createRenderer';

export class RendererManager {
  renderer!: SupportedRenderer;
  isWebGPU = false;
  private _canvas: HTMLCanvasElement;
  private _resizeObserver: ResizeObserver;

  constructor(
    private readonly container: HTMLElement,
    private readonly opts: RendererOptions = {},
  ) {
    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'block';
    this._canvas.style.width = '100%';
    this._canvas.style.height = '100%';
    container.appendChild(this._canvas);

    this._resizeObserver = new ResizeObserver(() => this._onResize());
  }

  async init(): Promise<void> {
    const result = await createRenderer(this._canvas, this.opts);
    this.renderer = result.renderer;
    this.isWebGPU = result.isWebGPU;

    const { width, height } = this.container.getBoundingClientRect();
    this.renderer.setSize(width, height, false);
    this._resizeObserver.observe(this.container);
  }

  private _onResize(): void {
    const { width, height } = this.container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    this.renderer.setSize(width, height, false);
    if (this._camera) {
      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();
    }
    if (this._postProc) {
      this._postProc(width, height);
    }
  }

  private _camera?: THREE.PerspectiveCamera;
  private _postProc?: (w: number, h: number) => void;

  /** Register a camera to auto-update aspect ratio on resize */
  trackCamera(camera: THREE.PerspectiveCamera): void {
    this._camera = camera;
  }

  /** Register a callback for post-processing resize */
  trackPostProcessing(fn: (w: number, h: number) => void): void {
    this._postProc = fn;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get width(): number {
    return this._canvas.clientWidth;
  }

  get height(): number {
    return this._canvas.clientHeight;
  }

  dispose(): void {
    this._resizeObserver.disconnect();
    this.renderer.dispose();
    this._canvas.remove();
  }
}
