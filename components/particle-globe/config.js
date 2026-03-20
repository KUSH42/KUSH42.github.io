/**
 * Default configuration constants for the particle-globe component.
 */

export const DEFAULTS = {
  /** Maximum particle count (buffer allocated once at init) */
  MAX_COUNT: 30_000,

  /** Default active particle count */
  particleCount: 20_000,

  /** Base particle size range (world px) — randomized per particle at spawn */
  sizeBase: 2.5,
  sizeVariance: 1.5,

  /** Shell radius range per particle (1.15–1.60 world units) */
  radiusMin: 1.15,
  radiusMax: 1.60,

  /** Bloom post-process parameters */
  bloomStrength:   0.6,
  bloomRadius:     0.4,
  bloomThreshold:  0.25,

  /** Spring physics */
  springK:          0.04,
  springKBoost:     0.08,    // used for 800 ms after mode change
  springBoostMs:    800,

  /** Velocity damping factor per frame */
  damping: 0.88,

  /** Mouse repulsion */
  repulsionRadius:   0.50,
  repulsionStrength: 0.006,

  /** Constellation lines */
  MAX_LINES:           8_000,
  connectionThreshold: 0.25,

  /** Auto-rotate resume delay after user interaction (ms) */
  autoResumeMs: 6_000,

  /** Performance LOD: consecutive slow frames threshold before auto-disabling lines */
  slowFrameMs:     20,
  slowFrameCount:  3,

  /** Particle alpha */
  particleAlpha: 0.85,

  /** Initial formation mode */
  defaultMode: 'globe',

  /** Camera */
  cameraFov: 45,
  cameraZ:   3,
  cameraNear: 0.1,
  cameraFar:  100,

  /** OrbitControls */
  dampingFactor:    0.05,
  autoRotateSpeed:  0.4,
  minDistance:      1.5,
  maxDistance:      5,
};
