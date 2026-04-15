/**
 * matrix-rain-presets.js — named parameter sets for initMatrixRain.
 *
 * Each preset is a plain object whose fields map 1:1 to handle method calls.
 * Absent fields are not changed, so presets are partial by default.
 *
 * Usage:
 *   import { PRESETS, applyPreset } from './matrix-rain-presets.js';
 *   rain.applyPreset('matrix1999');
 *   // or directly:
 *   applyPreset('matrix1999', rain);
 */

export const PRESETS = {

  /** Restores every parameter to its out-of-the-box value. */
  default: {
    color:           '#00ff70',
    opacity:          0.82,
    depth:            0.04,
    normalStrength:   6.0,
    glyphChromaScale: 1.0,
    speed:            1.0,
    bloomStrength:    1.15,
    bloomThreshold:   0.20,
    phosphorDecay:    0.88,
    heat:             0.004,
    soften:           0.002,
    streaks:          0.055,
    burstBloom:       true,
    vignette:         0.42,
    scanlines:        0.045,
    holoAberration:   0.0025,
    godRays: { enabled: true,  lightX: 0.5, lightY: 0.75,
               density: 0.93,  decay: 0.96,  weight: 0.35, exposure: 0.45 },
  },

  /**
   * Film-accurate 1999 appearance.
   * Colour: P31 phosphor green #00FF41 (H=135°, slightly cyan-shifted).
   * No heat shimmer, no lens streaks, no scanlines — the film was
   * composited from pre-rendered layers, not displayed on a CRT.
   */
  matrix1999: {
    color:           '#00FF41',
    opacity:          0.90,
    depth:            0.04,
    normalStrength:   4.0,
    glyphChroma:      true,
    glyphChromaScale: 0.4,
    speed:            1.0,
    bloomStrength:    1.4,
    bloomThreshold:   0.15,
    phosphorDecay:    0.92,
    heat:             0.0,
    soften:           0.0015,
    streaks:          0.0,
    burstBloom:       true,
    vignette:         0.55,
    scanlines:        0.0,
    holoAberration:   0.003,
    godRays: { enabled: true,  lightX: 0.5, lightY: 0.30,
               density: 0.90,  decay: 0.94,  weight: 0.20, exposure: 0.22 },
    charSet:          'matrix1999',
  },

  /**
   * Slow, ethereal — "reading the Matrix" at reduced density and pace.
   * Evokes Cypher's monitor: heavy phosphor smear, peripheral softening, dim.
   */
  ghost: {
    color:           '#00CC44',
    opacity:          0.55,
    depth:            0.02,
    normalStrength:   2.0,
    glyphChromaScale: 0.0,
    speed:            0.45,
    bloomStrength:    0.65,
    bloomThreshold:   0.28,
    phosphorDecay:    0.96,
    heat:             0.0,
    soften:           0.007,
    streaks:          0.0,
    burstBloom:       false,
    vignette:         0.70,
    scanlines:        0.0,
    holoAberration:   0.001,
    godRays: { enabled: false, lightX: 0.5, lightY: 0.75,
               density: 0.93,  decay: 0.96,  weight: 0.35, exposure: 0.0 },
  },

  /**
   * Maximum intensity — lobby fight / rooftop sequences.
   * High speed, heavy bloom, lens rain, streaks.
   */
  overdrive: {
    color:           '#00FF70',
    opacity:          1.0,
    depth:            0.06,
    normalStrength:   8.0,
    glyphChroma:      true,
    glyphChromaScale: 1.8,
    speed:            2.8,
    bloomStrength:    2.2,
    bloomThreshold:   0.10,
    phosphorDecay:    0.80,
    heat:             0.009,
    soften:           0.001,
    streaks:          0.12,
    burstBloom:       true,
    vignette:         0.28,
    scanlines:        0.03,
    holoAberration:   0.004,
    godRays: { enabled: true,  lightX: 0.5, lightY: 0.65,
               density: 0.95,  decay: 0.97,  weight: 0.45, exposure: 0.70 },
  },
};

/**
 * Apply a named preset to a rain handle.
 * Convenience wrapper — callers can also call handle.applyPreset(name) directly.
 *
 * @param {string} name    Key from PRESETS
 * @param {object} handle  Control handle returned by initMatrixRain
 */
export function applyPreset(name, handle) {
  handle.applyPreset(name);
}
