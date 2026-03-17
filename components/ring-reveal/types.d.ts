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
  /** Fraction of total sweep each ring's fade occupies. Default: 0.35 */
  ringDuration?: number;

  /** Base ring colour (hex). Default: 0x00ffcc */
  lineColor?: number;
  /** material.linewidth. Default: 1.0 */
  lineWidth?: number;
  /** Base ring opacity. Default: 0.7 */
  opacity?: number;
  /** Glow ring colour (hex). Default: 0x00ffcc */
  glowColor?: number;
  /** Glow ring opacity. Default: 0.25 */
  glowOpacity?: number;
  /** Glow ring radius multiplier. Default: 1.008 */
  glowRadius?: number;
  /** Fragment colour multiplier — values >1 push above bloom threshold. Default: 1.5 */
  emissiveIntensity?: number;
  /** Radial warp: rings snap from (1-warpAmount) scale to 1.0 with easeOutBack overshoot. Default: 0.12 */
  warpAmount?: number;

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
  /** Direct reference to glow LineSegments (set renderOrder here). */
  readonly glowRings: THREE.LineSegments;

  play(onComplete?: () => void): void;
  reverse(onComplete?: () => void): void;
  stop(): void;
  reset(): void;

  morphTo(targetConfig: RingRevealOptions, durationMs?: number): void;

  tick(deltaMs: number): void;

  setColors(lineColor: number, glowColor: number): void;
  setOpacity(base: number, glow?: number): void;

  dispose(): void;
}

export declare const easings: {
  linear: EasingFn;
  easeInOutCubic: EasingFn;
  easeOutExpo: EasingFn;
  backInOut: EasingFn;
};
