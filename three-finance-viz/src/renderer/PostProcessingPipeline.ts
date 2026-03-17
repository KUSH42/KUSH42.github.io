// src/renderer/PostProcessingPipeline.ts
import * as THREE from 'three';
import type { SupportedRenderer } from './createRenderer';

// Dynamic import to handle missing postprocessing package gracefully
type EffectComposer = import('postprocessing').EffectComposer;
type SelectiveBloomEffect = import('postprocessing').SelectiveBloomEffect;
type DepthOfFieldEffect = import('postprocessing').DepthOfFieldEffect;
type EffectInstance = import('postprocessing').Effect;

export interface Disposable {
  dispose(): void;
}

// ---------------------------------------------------------------------------
// Custom MotionBlurEffect — velocity-based screen-space blur using camera
// reprojection (prev vs current ViewProjection matrix).
// postprocessing 6.36.x does not ship MotionBlurEffect; we implement it via
// the Effect base class with a GLSL velocity-reconstruct + blur shader.
// ---------------------------------------------------------------------------
const MOTION_BLUR_FRAG = /* glsl */`
  uniform mat4 reprojectionMatrix;
  uniform float strength;
  uniform int   samples;

  void mainImage(
    const in vec4  inputColor,
    const in vec2  uv,
    const in float depth,
    out    vec4    outputColor
  ) {
    // Reconstruct current clip-space position from uv + depth
    vec4 clipPos = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);

    // Reproject into the previous frame's clip space
    vec4 prevClip = reprojectionMatrix * clipPos;
    prevClip /= prevClip.w;

    // Screen-space velocity (UV delta)
    vec2 velocity = (clipPos.xy - prevClip.xy) * 0.5 * strength;

    // Clamp to prevent extreme blur on first frames / teleports
    float maxLen = 0.05;
    float len = length(velocity);
    if (len > maxLen) velocity *= maxLen / len;

    // Accumulate samples along velocity vector
    vec4  color       = inputColor;
    float totalWeight = 1.0;

    for (int i = 1; i < 16; i++) {
      if (i >= samples) break;
      float t = float(i) / float(max(samples - 1, 1));
      vec2  sampleUV = clamp(uv - velocity * t, vec2(0.0), vec2(1.0));
      color       += texture2D(inputBuffer, sampleUV);
      totalWeight += 1.0;
    }

    outputColor = color / totalWeight;
  }
`;

function createMotionBlurEffect(
  EffectClass: typeof import('postprocessing').Effect,
  EffectAttribute: typeof import('postprocessing').EffectAttribute,
  BlendFunction: typeof import('postprocessing').BlendFunction,
  samples: number,
): EffectInstance {
  return new EffectClass('MotionBlurEffect', MOTION_BLUR_FRAG, {
    blendFunction: BlendFunction.NORMAL,
    attributes:    EffectAttribute.DEPTH,
    uniforms: new Map<string, THREE.Uniform<unknown>>([
      ['reprojectionMatrix', new THREE.Uniform(new THREE.Matrix4())],
      ['strength',           new THREE.Uniform(0.5)],
      ['samples',            new THREE.Uniform(samples)],
    ]),
  });
}

// ---------------------------------------------------------------------------

export class PostProcessingPipeline implements Disposable {
  private composer?: EffectComposer;
  private bloom?: SelectiveBloomEffect;
  private dof?: DepthOfFieldEffect;
  private _motionBlur?: EffectInstance;
  private _webGPUOutput?: object;
  private _initialized = false;

  /** Previous frame's ViewProjection — used for velocity reconstruction */
  private readonly _prevViewProj = new THREE.Matrix4();
  private readonly _currViewProj = new THREE.Matrix4();

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
          Effect,
          EffectAttribute,
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

        const motionBlur = createMotionBlurEffect(Effect, EffectAttribute, BlendFunction, 8);

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

        composer.addPass(new EffectPass(this.opts.camera, bloom, dof, motionBlur, chromAb, godRays));

        this.composer = composer;
        this.bloom = bloom;
        this.dof = dof;
        this._motionBlur = motionBlur;

        // Seed previous frame matrix so first frame has zero velocity
        this._prevViewProj
          .copy(this.opts.camera.projectionMatrix)
          .multiply(this.opts.camera.matrixWorldInverse);
      } catch (_e) {
        // postprocessing not available — render without effects
      }
    }
  }

  /** Call each frame in place of renderer.render() */
  render(deltaTime: number): void {
    if (this.composer) {
      // Update reprojection matrix for motion blur before composing
      if (this._motionBlur) {
        this._currViewProj
          .copy(this.opts.camera.projectionMatrix)
          .multiply(this.opts.camera.matrixWorldInverse);

        // reprojectionMatrix = prevViewProj * inv(currViewProj)
        // Maps current clip coords → previous clip coords
        const reprojection = this._currViewProj.clone().invert().premultiply(this._prevViewProj);
        const uniforms = this._motionBlur.uniforms as Map<string, THREE.Uniform<unknown>>;
        (uniforms.get('reprojectionMatrix')!.value as THREE.Matrix4).copy(reprojection);

        this._prevViewProj.copy(this._currViewProj);
      }

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

  /** Adjust motion blur intensity (0 = off, 1 = full spec default) */
  setMotionBlurStrength(v: number): void {
    if (!this._motionBlur) return;
    const uniforms = this._motionBlur.uniforms as Map<string, THREE.Uniform<unknown>>;
    uniforms.get('strength')!.value = v;
  }

  resize(width: number, height: number): void {
    this.composer?.setSize(width, height);
  }

  dispose(): void {
    this.composer?.dispose();
  }
}
