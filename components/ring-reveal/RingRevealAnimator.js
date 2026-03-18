/**
 * RingRevealAnimator — sweeps latitude rings over a sphere in a configurable reveal animation.
 * Drop-in Three.js module; no dependencies beyond Three.js itself.
 */

import * as THREE from 'three';
import { easeInOutCubic } from './easings.js';
import { buildRingGeometry } from './RingGeometry.js';
import { createRingMaterial } from './RingMaterial.js';

/** Scratch Color for lerp operations (avoids per-frame allocation). */
const _tmpColor = new THREE.Color();

const DEFAULTS = {
  radius:            1.0,
  numRings:          48,
  samplesPerRing:    256,
  latitudeMin:       -Math.PI / 2,
  latitudeMax:        Math.PI / 2,
  durationMs:        1800,
  easingFn:          easeInOutCubic,
  direction:         'south-to-north',
  stagger:           0.4,
  ringDuration:      0.35,
  lineColor:         0x00ffcc,
  lineWidth:         1.0,
  opacity:           0.7,
  glowColor:         0x00ffcc,
  glowOpacity:       0.25,
  glowRadius:        1.008,
  emissiveIntensity: 1.5,
  warpAmount:        0.12,
  morphDurationMs:   800,
  upAxis:            'y',
};

export class RingRevealAnimator {
  /**
   * @param {THREE.Scene|THREE.Object3D} scene
   * @param {Partial<import('./types.d.ts').RingRevealOptions>} [options]
   */
  constructor(scene, options = {}) {
    this._scene   = scene;
    this._options = { ...DEFAULTS, ...options };

    // Clamp/validate
    this._options.ringDuration = Math.max(0.001, this._options.ringDuration);
    this._options.numRings     = Math.max(2,     this._options.numRings);
    this._options.samplesPerRing = Math.max(3,   this._options.samplesPerRing);
    this._options.stagger      = Math.max(0, Math.min(1, this._options.stagger));
    this._options.radius       = Math.max(Number.EPSILON, this._options.radius);
    this._options.glowRadius   = Math.max(Number.EPSILON, this._options.glowRadius);

    this._playing   = false;
    this._reversed  = false;
    this._elapsed   = 0;
    this._progress  = 0;
    this._onComplete = null;
    this._morph     = null;

    this._build();
  }

  // ── Public state ────────────────────────────────────────────

  get isPlaying() { return this._playing; }
  get progress()  { return this._progress; }

  /** Direct reference to base LineSegments (for renderOrder etc.) */
  get baseRings() { return this._baseRings; }
  /** Direct reference to glow LineSegments (for renderOrder etc.) */
  get glowRings() { return this._glowRings; }

  // ── Lifecycle ───────────────────────────────────────────────

  /**
   * Start forward sweep from current progress.
   * @param {(() => void) | undefined} onComplete
   */
  play(onComplete) {
    this._reversed  = false;
    this._playing   = true;
    this._onComplete = onComplete ?? null;
  }

  /**
   * Sweep back toward progress 0, resuming from current visual position.
   * @param {(() => void) | undefined} onComplete
   */
  reverse(onComplete) {
    this._reversed  = true;
    const currentRawT = Math.min(this._elapsed / this._options.durationMs, 1.0);
    this._elapsed   = (1.0 - currentRawT) * this._options.durationMs;
    this._playing   = true;
    this._onComplete = onComplete ?? null;
  }

  /** Pause at current progress. */
  stop() {
    this._playing = false;
  }

  /** Reset to fully hidden state. */
  reset() {
    this._playing   = false;
    this._reversed  = false;
    this._elapsed   = 0;
    this._progress  = 0;
    this._onComplete = null;
    this._disposeCrossFade();
    this._morph     = null;
    this._setProgress(0);
  }

  // ── Per-frame ───────────────────────────────────────────────

  /**
   * Advance reveal and morph. Call once per frame with delta in milliseconds.
   * @param {number} deltaMs
   */
  tick(deltaMs) {
    // 1. Advance reveal animation
    if (this._playing) {
      this._elapsed += deltaMs;
      const rawT   = Math.min(this._elapsed / this._options.durationMs, 1.0);
      const easedT = this._options.easingFn(rawT);
      this._progress = this._reversed ? 1.0 - easedT : easedT;
      this._setProgress(this._progress);

      const done = this._reversed ? this._progress <= 0.0 : this._progress >= 1.0;
      if (done) {
        this._playing = false;
        const cb = this._onComplete;
        this._onComplete = null;
        cb?.();
      }
    }

    // 2. Advance morph (independent of _playing)
    if (this._morph) {
      this._morph.elapsed += deltaMs;
      const mt = Math.min(this._morph.elapsed / this._morph.durationMs, 1.0);
      this._applyMorphT(mt);
      if (mt >= 1.0) this._morph = null;
    }
  }

  // ── Theme ───────────────────────────────────────────────────

  /**
   * Immediately set ring colours (no morph).
   * @param {number} lineColor  - hex
   * @param {number} glowColor  - hex
   */
  setColors(lineColor, glowColor) {
    this._baseRings.material.uniforms.uColor.value.set(lineColor);
    this._glowRings.material.uniforms.uColor.value.set(glowColor);
    this._options.lineColor = lineColor;
    this._options.glowColor = glowColor;
  }

  /**
   * Immediately set opacity (no morph).
   * @param {number} base
   * @param {number | undefined} glow
   */
  setOpacity(base, glow) {
    this._baseRings.material.uniforms.uOpacity.value = base;
    this._options.opacity = base;
    if (glow !== undefined) {
      this._glowRings.material.uniforms.uOpacity.value = glow;
      this._options.glowOpacity = glow;
    }
  }

  // ── Morph ───────────────────────────────────────────────────

  /**
   * Smoothly interpolate to a new configuration.
   * @param {Partial<import('./types.d.ts').RingRevealOptions>} targetConfig
   * @param {number} [durationMs]
   */
  morphTo(targetConfig, durationMs) {
    const dur = durationMs ?? this._options.morphDurationMs;
    const opts = this._options;
    const baseMat = this._baseRings.material;
    const glowMat = this._glowRings.material;

    // Apply non-morphable props immediately
    if (targetConfig.durationMs  !== undefined) opts.durationMs  = targetConfig.durationMs;
    if (targetConfig.easingFn    !== undefined) opts.easingFn    = targetConfig.easingFn;
    if (targetConfig.direction   !== undefined) opts.direction   = targetConfig.direction;
    if (targetConfig.morphDurationMs !== undefined) opts.morphDurationMs = targetConfig.morphDurationMs;
    if (targetConfig.upAxis      !== undefined) opts.upAxis      = targetConfig.upAxis;
    if (targetConfig.latitudeMin !== undefined) opts.latitudeMin = targetConfig.latitudeMin;
    if (targetConfig.latitudeMax !== undefined) opts.latitudeMax = targetConfig.latitudeMax;
    if (targetConfig.lineWidth   !== undefined) {
      opts.lineWidth = targetConfig.lineWidth;
      baseMat.linewidth = targetConfig.lineWidth;
      glowMat.linewidth = targetConfig.lineWidth;
    }

    const fromRadius = opts.radius;
    const toRadius   = targetConfig.radius ?? opts.radius;

    // Cross-fade when ring count changes: build new geometry immediately, fade old rings out.
    const numRingsChanged   = targetConfig.numRings       !== undefined && targetConfig.numRings       !== opts.numRings;
    const samplesChanged    = targetConfig.samplesPerRing !== undefined && targetConfig.samplesPerRing !== opts.samplesPerRing;
    let crossFade = null;

    if (numRingsChanged || samplesChanged) {
      const oldBase         = this._baseRings;
      const oldGlow         = this._glowRings;
      const oldBaseOpacity  = baseMat.uniforms.uOpacity.value;
      const oldGlowOpacity  = glowMat.uniforms.uOpacity.value;

      if (numRingsChanged)  opts.numRings       = targetConfig.numRings;
      if (samplesChanged)   opts.samplesPerRing = targetConfig.samplesPerRing;

      const geomArgs = {
        radius: opts.radius, numRings: opts.numRings, samplesPerRing: opts.samplesPerRing,
        latitudeMin: opts.latitudeMin, latitudeMax: opts.latitudeMax, upAxis: opts.upAxis,
      };
      const sharedArgs = {
        lineWidth: opts.lineWidth, numRings: opts.numRings,
        stagger:      baseMat.uniforms.uStagger.value,
        ringDuration: baseMat.uniforms.uRingDuration.value,
        warpAmount:   baseMat.uniforms.uWarpAmount.value,
        emissiveIntensity: baseMat.uniforms.uEmissiveIntensity.value,
        direction: opts.direction,
      };
      const newBaseMat = createRingMaterial({ ...sharedArgs,
        lineColor: baseMat.uniforms.uColor.value.getHex(), opacity: 0,
        blending: THREE.NormalBlending });
      const newGlowMat = createRingMaterial({ ...sharedArgs,
        lineColor: glowMat.uniforms.uColor.value.getHex(), opacity: 0,
        blending: THREE.AdditiveBlending });

      this._baseRings = new THREE.LineSegments(buildRingGeometry(geomArgs), newBaseMat);
      this._glowRings = new THREE.LineSegments(
        buildRingGeometry({ ...geomArgs, radius: opts.radius * opts.glowRadius }), newGlowMat);
      this._baseRings.renderOrder = oldBase.renderOrder;
      this._glowRings.renderOrder = oldGlow.renderOrder;
      this._scene.add(this._baseRings);
      this._scene.add(this._glowRings);
      this._setProgress(this._progress);

      crossFade = { oldBase, oldGlow, oldBaseOpacity, oldGlowOpacity };
    }

    this._morph = {
      elapsed:    0,
      durationMs: dur,
      crossFade,
      from: {
        lineColor:         baseMat.uniforms.uColor.value.clone(),
        glowColor:         glowMat.uniforms.uColor.value.clone(),
        opacity:           crossFade ? 0 : baseMat.uniforms.uOpacity.value,
        glowOpacity:       crossFade ? 0 : glowMat.uniforms.uOpacity.value,
        emissiveIntensity: baseMat.uniforms.uEmissiveIntensity.value,
        stagger:           baseMat.uniforms.uStagger.value,
        warpAmount:        baseMat.uniforms.uWarpAmount.value,
        ringDuration:      baseMat.uniforms.uRingDuration.value,
        radius:            fromRadius,
      },
      to: {
        // Use live uniform values as fallback (not stale opts) so that a partial
        // morph that omits a property correctly holds that property constant.
        lineColor:         targetConfig.lineColor         !== undefined
                             ? new THREE.Color(targetConfig.lineColor)
                             : baseMat.uniforms.uColor.value.clone(),
        glowColor:         targetConfig.glowColor         !== undefined
                             ? new THREE.Color(targetConfig.glowColor)
                             : glowMat.uniforms.uColor.value.clone(),
        opacity:           targetConfig.opacity           ?? baseMat.uniforms.uOpacity.value,
        glowOpacity:       targetConfig.glowOpacity       ?? glowMat.uniforms.uOpacity.value,
        emissiveIntensity: targetConfig.emissiveIntensity ?? baseMat.uniforms.uEmissiveIntensity.value,
        stagger:           targetConfig.stagger           ?? baseMat.uniforms.uStagger.value,
        warpAmount:        targetConfig.warpAmount        ?? baseMat.uniforms.uWarpAmount.value,
        ringDuration:      targetConfig.ringDuration      ?? baseMat.uniforms.uRingDuration.value,
        radius:            toRadius,
      },
    };
  }

  // ── Cleanup ─────────────────────────────────────────────────

  /** Remove from scene and dispose GPU resources. */
  dispose() {
    this._disposeCrossFade();
    this._scene.remove(this._baseRings);
    this._scene.remove(this._glowRings);
    this._baseRings.geometry.dispose();
    this._glowRings.geometry.dispose();
    this._baseRings.material.dispose();
    this._glowRings.material.dispose();
  }

  // ── Private ─────────────────────────────────────────────────

  /** Dispose old rings from an in-progress cross-fade (if any). */
  _disposeCrossFade() {
    const cf = this._morph?.crossFade;
    if (!cf) return;
    this._scene.remove(cf.oldBase);
    this._scene.remove(cf.oldGlow);
    cf.oldBase.geometry.dispose(); cf.oldBase.material.dispose();
    cf.oldGlow.geometry.dispose(); cf.oldGlow.material.dispose();
  }

  _build() {
    const opts = this._options;

    const geomArgs = {
      radius:         opts.radius,
      numRings:       opts.numRings,
      samplesPerRing: opts.samplesPerRing,
      latitudeMin:    opts.latitudeMin,
      latitudeMax:    opts.latitudeMax,
      upAxis:         opts.upAxis,
    };

    const baseGeo  = buildRingGeometry(geomArgs);
    const glowGeo  = buildRingGeometry({ ...geomArgs, radius: opts.radius * opts.glowRadius });

    const sharedMatArgs = {
      lineWidth:         opts.lineWidth,
      emissiveIntensity: opts.emissiveIntensity,
      numRings:          opts.numRings,
      stagger:           opts.stagger,
      ringDuration:      opts.ringDuration,
      warpAmount:        opts.warpAmount,
      direction:         opts.direction,
    };

    const baseMat = createRingMaterial({
      ...sharedMatArgs,
      lineColor: opts.lineColor,
      opacity:   opts.opacity,
      blending:  THREE.NormalBlending,
    });

    const glowMat = createRingMaterial({
      ...sharedMatArgs,
      lineColor: opts.glowColor,
      opacity:   opts.glowOpacity,
      blending:  THREE.AdditiveBlending,
    });

    this._baseRings = new THREE.LineSegments(baseGeo, baseMat);
    this._glowRings = new THREE.LineSegments(glowGeo, glowMat);

    this._scene.add(this._baseRings);
    this._scene.add(this._glowRings);
  }

  /** Update uProgress uniform on both materials. */
  _setProgress(p) {
    this._baseRings.material.uniforms.uProgress.value = p;
    this._glowRings.material.uniforms.uProgress.value = p;
  }

  /** Linearly interpolate all morphable uniforms at normalised time t. */
  _applyMorphT(t) {
    const { from, to } = this._morph;
    const baseMat = this._baseRings.material;
    const glowMat = this._glowRings.material;

    // Colour lerp
    _tmpColor.lerpColors(from.lineColor, to.lineColor, t);
    baseMat.uniforms.uColor.value.copy(_tmpColor);
    _tmpColor.lerpColors(from.glowColor, to.glowColor, t);
    glowMat.uniforms.uColor.value.copy(_tmpColor);

    // Scalar lerp
    const lerp = (a, b) => a + (b - a) * t;
    baseMat.uniforms.uOpacity.value           = lerp(from.opacity,           to.opacity);
    glowMat.uniforms.uOpacity.value           = lerp(from.glowOpacity,       to.glowOpacity);
    baseMat.uniforms.uEmissiveIntensity.value = lerp(from.emissiveIntensity, to.emissiveIntensity);
    glowMat.uniforms.uEmissiveIntensity.value = lerp(from.emissiveIntensity, to.emissiveIntensity);
    baseMat.uniforms.uStagger.value           = lerp(from.stagger,           to.stagger);
    glowMat.uniforms.uStagger.value           = lerp(from.stagger,           to.stagger);
    baseMat.uniforms.uWarpAmount.value        = lerp(from.warpAmount,        to.warpAmount);
    glowMat.uniforms.uWarpAmount.value        = lerp(from.warpAmount,        to.warpAmount);
    baseMat.uniforms.uRingDuration.value      = lerp(from.ringDuration,      to.ringDuration);
    glowMat.uniforms.uRingDuration.value      = lerp(from.ringDuration,      to.ringDuration);

    // Radius via scale
    const scale = lerp(from.radius, to.radius) / this._options.radius;
    this._baseRings.scale.setScalar(scale);
    this._glowRings.scale.setScalar(scale);

    // Cross-fade: fade old rings out in parallel with new rings fading in
    if (this._morph.crossFade) {
      const { oldBase, oldGlow, oldBaseOpacity, oldGlowOpacity } = this._morph.crossFade;
      oldBase.material.uniforms.uOpacity.value  = oldBaseOpacity  * (1 - t);
      oldGlow.material.uniforms.uOpacity.value  = oldGlowOpacity  * (1 - t);
      oldBase.material.uniforms.uProgress.value = this._progress;
      oldGlow.material.uniforms.uProgress.value = this._progress;
      if (t >= 1.0) {
        this._scene.remove(oldBase);
        this._scene.remove(oldGlow);
        oldBase.geometry.dispose(); oldBase.material.dispose();
        oldGlow.geometry.dispose(); oldGlow.material.dispose();
      }
    }

    // Sync opts at completion so they match live uniform state for future morphs
    if (t >= 1.0) {
      const opts = this._options;
      opts.opacity           = to.opacity;
      opts.glowOpacity       = to.glowOpacity;
      opts.emissiveIntensity = to.emissiveIntensity;
      opts.stagger           = to.stagger;
      opts.warpAmount        = to.warpAmount;
      opts.ringDuration      = to.ringDuration;
      opts.lineColor         = to.lineColor.getHex();
      opts.glowColor         = to.glowColor.getHex();
      opts.radius            = to.radius;
    }
  }

}
