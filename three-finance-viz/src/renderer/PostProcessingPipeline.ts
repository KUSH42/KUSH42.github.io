// src/renderer/PostProcessingPipeline.ts
import * as THREE from 'three';
import type { SupportedRenderer } from './createRenderer';

// Dynamic import to handle missing postprocessing package gracefully
type EffectComposer = import('postprocessing').EffectComposer;
type SelectiveBloomEffect = import('postprocessing').SelectiveBloomEffect;
type DepthOfFieldEffect = import('postprocessing').DepthOfFieldEffect;

export interface Disposable {
  dispose(): void;
}

export class PostProcessingPipeline implements Disposable {
  private composer?: EffectComposer;
  private bloom?: SelectiveBloomEffect;
  private dof?: DepthOfFieldEffect;
  private _webGPUOutput?: object;
  private _initialized = false;

  constructor(
    private opts: {
      renderer: SupportedRenderer;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      isWebGPU: boolean;
    },
  ) {}

  async init(): Promise<void> {
    if (this._initialized) return;
    this._initialized = true;

    if (this.opts.isWebGPU) {
      try {
        const { buildWebGPUPipeline } = await import('./buildWebGPUPipeline');
        const result = buildWebGPUPipeline(
          this.opts.renderer as unknown as Parameters<typeof buildWebGPUPipeline>[0],
          this.opts.scene,
          this.opts.camera,
        );
        this._webGPUOutput = result.finalNode as object;
      } catch (_e) {
        // WebGPU pipeline failed, fall through to WebGL path
      }
    } else {
      try {
        const {
          EffectComposer,
          RenderPass,
          SelectiveBloomEffect,
          DepthOfFieldEffect,
          ChromaticAberrationEffect,
          GodRaysEffect,
          EffectPass,
          BlendFunction,
        } = await import('postprocessing');

        const composer = new EffectComposer(this.opts.renderer as THREE.WebGLRenderer, {
          frameBufferType: THREE.HalfFloatType,
          multisampling: 4,
        });

        composer.addPass(new RenderPass(this.opts.scene, this.opts.camera));

        const bloom = new SelectiveBloomEffect(this.opts.scene, this.opts.camera, {
          blendFunction: BlendFunction.ADD,
          intensity: 1.8,
          luminanceThreshold: 0.3,
          luminanceSmoothing: 0.025,
          radius: 0.55,
          levels: 8,
        });

        const dof = new DepthOfFieldEffect(this.opts.camera, {
          focalLength: 0.1,
          bokehScale: 3,
          height: 480,
        });

        const chromAb = new ChromaticAberrationEffect({
          offset: new THREE.Vector2(0.0015, 0.001),
          radialModulation: false,
          modulationOffset: 0.15,
        });

        const sunMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.5),
          new THREE.MeshBasicMaterial({ color: 0xffffff }),
        );
        sunMesh.visible = false;
        this.opts.scene.add(sunMesh);

        const godRays = new GodRaysEffect(this.opts.camera, sunMesh, {
          density: 0.96,
          decay: 0.93,
          weight: 0.3,
          samples: 60,
          blur: true,
        });

        composer.addPass(new EffectPass(this.opts.camera, bloom, dof, chromAb, godRays));

        this.composer = composer;
        this.bloom = bloom;
        this.dof = dof;
      } catch (_e) {
        // postprocessing not available — render without effects
      }
    }
  }

  /** Call each frame in place of renderer.render() */
  render(deltaTime: number): void {
    if (this.composer) {
      this.composer.render(deltaTime);
    } else if (this._webGPUOutput) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.opts.renderer as unknown as { renderAsync(node: unknown): void }).renderAsync(
        this._webGPUOutput,
      );
    } else {
      this.opts.renderer.render(this.opts.scene, this.opts.camera);
    }
  }

  /** Add a mesh to selective bloom (bull candles) */
  addBloomTarget(mesh: THREE.InstancedMesh): void {
    this.bloom?.selection.add(mesh);
  }

  removeBloomTarget(mesh: THREE.InstancedMesh): void {
    this.bloom?.selection.delete(mesh);
  }

  setBloomStrength(v: number): void {
    if (this.bloom) this.bloom.intensity = v;
  }

  /** Smoothly shift DOF focus to a world-space point */
  setDOFFocusPoint(worldPos: THREE.Vector3): void {
    if (!this.dof) return; // no-op on WebGPU path
    const camSpace = worldPos.clone().applyMatrix4(this.opts.camera.matrixWorldInverse);
    // Access cocMaterial uniforms dynamically
    const cocMaterial = (this.dof as unknown as Record<string, unknown>).cocMaterial as
      | { uniforms: Record<string, { value: number }> }
      | undefined;
    if (cocMaterial?.uniforms['focalLength']) {
      cocMaterial.uniforms['focalLength'].value = Math.abs(camSpace.z) / this.opts.camera.far;
    }
  }

  setMotionBlurStrength(_v: number): void {
    // MotionBlur not available in postprocessing 6.x — no-op
  }

  resize(width: number, height: number): void {
    this.composer?.setSize(width, height);
  }

  dispose(): void {
    this.composer?.dispose();
  }

}
