import * as THREE from 'three';

export type EasingFn = (t: number) => number;

export interface RingRevealOptions {
  /** Sphere radius. Default: 1.0 */
  radius?: number;
  /** Total latitude rings. Default: 48 */
  numRings?: number;
  /** Vertices per ring. Default: 256 */
  samplesPerRing?: number;
  /** South pole in radians. Default: -Math.PI/2 */
  latitudeMin?: number;
  /** North pole in radians. Default: Math.PI/2 */
  latitudeMax?: number;

  /** Total sweep duration in ms. Default: 1800 */
  durationMs?: number;
  /** Easing applied to global timeline. Default: easeInOutCubic */
  easingFn?: EasingFn;
  /** Sweep direction. Default: 'south-to-north' */
  direction?: 'south-to-north' | 'north-to-south' | 'equator-out';
  /** Ring onset overlap factor [0,1]. Default: 0.4 */
  stagger?: number;
  /** Fraction of the progress sweep each ring's fade window occupies [0..1]. Default: 0.35 */
  ringFade?: number;
  /** Invert the fade — rings start opaque and disappear as the sweep passes. Default: false */
  invert?: boolean;

  /** Base ring colour (hex). Default: 0x00ffcc */
  lineColor?: number;
  /** Base ring gradient endpoint colour (hex). Default: 0x00ffcc (= no gradient) */
  lineColorB?: number;
  /** material.linewidth. Default: 1.0 */
  lineWidth?: number;
  /** Base ring opacity. Default: 0.7 */
  opacity?: number;
  /** Glow ring colour (hex). Default: 0x00ffcc */
  glowColor?: number;
  /** Glow ring gradient endpoint colour (hex). Default: 0x00ffcc (= no gradient) */
  glowColorB?: number;
  /** Glow ring opacity. Default: 0.25 */
  glowOpacity?: number;
  /** Glow ring radius multiplier. Default: 1.008 */
  glowRadius?: number;
  /** Number of concentric glow layers (neon-tube stack). Default: 3 */
  glowLayers?: number;
  /** Per-layer radius increment as a multiplier delta added to glowRadius. Default: 0.004 */
  glowLayerRadiusStep?: number;
  /** Opacity multiplied by this for each successive glow layer. Default: 0.5 */
  glowLayerOpacityFalloff?: number;
  /** Fragment colour multiplier — values >1 push above bloom threshold. Default: 1.5 */
  emissiveIntensity?: number;
  /** Radial warp: rings snap from (1-warpAmount) scale to 1.0 with easeOutBack overshoot. Default: 0.12 */
  warpAmount?: number;

  /** Per-ring hue rotation range [0..1]. 0 = uniform colour, 1 = full rainbow spread. Default: 0 */
  colorSpread?: number;
  /** Per-ring brightness variation range [0..1]. Default: 0 */
  brightSpread?: number;
  /** Flicker amplitude — per-ring sinusoidal emissive modulation [0..1]. Default: 0 */
  flickerAmp?: number;
  /** Flicker oscillation speed in Hz. Default: 2.0 */
  flickerSpeed?: number;
  /** Arc hue rotation — shifts colour around each ring's circumference [0..1]. 0 = uniform, 1 = full rainbow per ring. Default: 0 */
  arcColorSpread?: number;

  /** Default morph duration in ms. Default: 800 */
  morphDurationMs?: number;

  /** World up-axis convention. Default: 'y' */
  upAxis?: 'y' | 'z';
}

export declare class RingRevealAnimator {
  constructor(scene: THREE.Object3D, options?: RingRevealOptions);

  readonly isPlaying: boolean;
  readonly progress: number;

  /** Direct reference to base LineSegments (set renderOrder here). */
  readonly baseRings: THREE.LineSegments;
  /** Innermost glow layer (layer 0) — backward-compatible alias for glowLayers[0]. */
  readonly glowRings: THREE.LineSegments;
  /** All glow layer LineSegments, ordered innermost → outermost. */
  readonly glowLayers: THREE.LineSegments[];

  play(onComplete?: () => void): void;
  reverse(onComplete?: () => void): void;
  stop(): void;
  reset(): void;

  morphTo(targetConfig: RingRevealOptions, durationMs?: number): void;

  tick(deltaMs: number): void;

  setInvert(invert: boolean): void;
  setColors(lineColor: number, glowColor: number): void;
  setOpacity(base: number, glow?: number): void;
  /** Update LineMaterial resolution for correct screen-space linewidth. Call on init and on window resize. */
  setResolution(width: number, height: number): void;

  dispose(): void;
}

export declare const easings: {
  linear: EasingFn;
  easeInOutCubic: EasingFn;
  easeOutExpo: EasingFn;
  backInOut: EasingFn;
};
