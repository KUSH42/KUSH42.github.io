/**
 * RingRevealAnimator — sweeps latitude rings over a sphere in a configurable reveal animation.
 * Drop-in Three.js module; no dependencies beyond Three.js itself.
 */

import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { easeInOutCubic } from './easings.js';
import { buildLine2RingGeometry } from './RingGeometry.js';
import { createLine2RingMaterial } from './RingMaterial.js';

/** Scratch Colors for lerp operations (avoids per-frame allocation). */
const _tmpColor  = new THREE.Color();
const _tmpColor2 = new THREE.Color();

const DEFAULTS = {
  radius:                  1.0,
  numRings:                48,
  samplesPerRing:          256,
  latitudeMin:             -Math.PI / 2,
  latitudeMax:              Math.PI / 2,
  durationMs:              1800,
  easingFn:                easeInOutCubic,
  direction:               'south-to-north',
  stagger:                 0.4,
  ringDuration:            0.35,
  lineColor:               0x00ffcc,
  lineColorB:              0x00ffcc,
  lineWidth:               1.0,
  opacity:                 0.7,
  glowColor:               0x00ffcc,
  glowColorB:              0x00ffcc,
  glowOpacity:             0.25,
  glowRadius:              1.008,
  glowLayers:              3,
  glowLayerRadiusStep:     0.004,
  glowLayerOpacityFalloff: 0.5,
  emissiveIntensity:       1.5,
  warpAmount:              0.12,
  morphDurationMs:         800,
  upAxis:                  'y',
  colorSpread:             0.0,
  brightSpread:            0.0,
  flickerAmp:              0.0,
  flickerSpeed:            2.0,
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
    this._options.ringDuration   = Math.max(0.001, this._options.ringDuration);
    this._options.numRings       = Math.max(2,     this._options.numRings);
    this._options.samplesPerRing = Math.max(3,     this._options.samplesPerRing);
    this._options.stagger        = Math.max(0, Math.min(1, this._options.stagger));
    this._options.radius         = Math.max(Number.EPSILON, this._options.radius);
    this._options.glowRadius     = Math.max(Number.EPSILON, this._options.glowRadius);
    this._options.glowLayers     = Math.max(1, Math.round(this._options.glowLayers));

    this._playing    = false;
    this._reversed   = false;
    this._elapsed    = 0;
    this._progress   = 0;
    this._onComplete = null;
    this._morph      = null;
    this._time       = 0;
    this._resolution = new THREE.Vector2(
      typeof window !== 'undefined' ? window.innerWidth  : 1920,
      typeof window !== 'undefined' ? window.innerHeight : 1080,
    );

    this._build();
  }

  // ── Public state ────────────────────────────────────────────

  get isPlaying() { return this._playing; }
  get progress()  { return this._progress; }

  /** Direct reference to base LineSegments2 (for renderOrder etc.) */
  get baseRings() { return this._baseRings; }
  /** Innermost glow layer (layer 0) — backward-compatible alias for glowLayers[0]. */
  get glowRings() { return this._glowLayers[0]; }
  /** All glow layer LineSegments2 objects, ordered from innermost to outermost. */
  get glowLayers() { return this._glowLayers; }

  // ── Lifecycle ───────────────────────────────────────────────

  /**
   * Start forward sweep from current progress.
   * @param {(() => void) | undefined} onComplete
   */
  play(onComplete) {
    this._reversed   = false;
    this._playing    = true;
    this._onComplete = onComplete ?? null;
  }

  /**
   * Sweep back toward progress 0, resuming from current visual position.
   * @param {(() => void) | undefined} onComplete
   */
  reverse(onComplete) {
    this._reversed   = true;
    this._playing    = true;
    this._onComplete = onComplete ?? null;
    // Find the rawT where easingFn(rawT) === 1 - currentProgress so the visual
    // position is continuous when direction flips.  Simple rawT mirroring is only
    // correct for symmetric easing functions; binary search works for all.
    const target = 1.0 - this._progress;
    let lo = 0.0, hi = 1.0;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) * 0.5;
      if (this._options.easingFn(mid) < target) lo = mid; else hi = mid;
    }
    this._elapsed = lo * this._options.durationMs;
  }

  /** Pause at current progress. */
  stop() {
    this._playing = false;
  }

  /** Reset to fully hidden state. */
  reset() {
    this._playing    = false;
    this._reversed   = false;
    this._elapsed    = 0;
    this._progress   = 0;
    this._onComplete = null;
    this._disposeCrossFade();
    this._morph      = null;
    this._setProgress(0);
  }

  // ── Per-frame ───────────────────────────────────────────────

  /**
   * Advance reveal and morph. Call once per frame with delta in milliseconds.
   * @param {number} deltaMs
   */
  tick(deltaMs) {
    // 0. Advance time for per-ring flicker
    this._time += deltaMs / 1000;
    this._baseRings.material.uniforms.uTime.value = this._time;
    this._glowLayers.forEach(l => { l.material.uniforms.uTime.value = this._time; });
    const cf = this._morph?.crossFade;
    if (cf) {
      cf.oldBase.material.uniforms.uTime.value = this._time;
      cf.oldGlowLayers.forEach(l => { l.material.uniforms.uTime.value = this._time; });
    }

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
    this._glowLayers.forEach(l => l.material.uniforms.uColor.value.set(glowColor));
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
      this._glowLayers.forEach((l, i) => {
        l.material.uniforms.uOpacity.value =
          glow * Math.pow(this._options.glowLayerOpacityFalloff, i);
      });
      this._options.glowOpacity = glow;
    }
  }

  /**
   * Update the LineMaterial resolution uniform (must be called on canvas resize).
   * @param {number} width
   * @param {number} height
   */
  setResolution(width, height) {
    this._resolution.set(width, height);
    this._allMaterials().forEach(m => m.resolution?.set(width, height));
  }

  // ── Morph ───────────────────────────────────────────────────

  /**
   * Smoothly interpolate to a new configuration.
   * @param {Partial<import('./types.d.ts').RingRevealOptions>} targetConfig
   * @param {number} [durationMs]
   */
  morphTo(targetConfig, durationMs) {
    const dur  = durationMs ?? this._options.morphDurationMs;
    const opts = this._options;
    const baseMat  = this._baseRings.material;
    const glowMat0 = this._glowLayers[0].material;

    // Apply non-morphable props immediately
    if (targetConfig.durationMs      !== undefined) opts.durationMs      = targetConfig.durationMs;
    if (targetConfig.easingFn        !== undefined) opts.easingFn        = targetConfig.easingFn;
    if (targetConfig.direction       !== undefined) opts.direction       = targetConfig.direction;
    if (targetConfig.morphDurationMs !== undefined) opts.morphDurationMs = targetConfig.morphDurationMs;
    if (targetConfig.upAxis          !== undefined) opts.upAxis          = targetConfig.upAxis;
    if (targetConfig.latitudeMin     !== undefined) opts.latitudeMin     = targetConfig.latitudeMin;
    if (targetConfig.latitudeMax     !== undefined) opts.latitudeMax     = targetConfig.latitudeMax;
    if (targetConfig.lineWidth       !== undefined) {
      opts.lineWidth = targetConfig.lineWidth;
      this._allMaterials().forEach(m => { m.linewidth = targetConfig.lineWidth; });
    }

    // Apply glow layer falloff immediately (no rebuild needed)
    if (targetConfig.glowLayerOpacityFalloff !== undefined &&
        targetConfig.glowLayerOpacityFalloff !== opts.glowLayerOpacityFalloff) {
      opts.glowLayerOpacityFalloff = targetConfig.glowLayerOpacityFalloff;
      this._glowLayers.forEach((l, i) => {
        l.material.uniforms.uOpacity.value =
          opts.glowOpacity * Math.pow(opts.glowLayerOpacityFalloff, i);
      });
    }

    // Rebuild glow layers when count or radius step changes
    const glowLayersChanged = targetConfig.glowLayers           !== undefined
                           && targetConfig.glowLayers           !== opts.glowLayers;
    const glowStepChanged   = targetConfig.glowLayerRadiusStep  !== undefined
                           && targetConfig.glowLayerRadiusStep  !== opts.glowLayerRadiusStep;
    if (glowLayersChanged)  opts.glowLayers          = Math.max(1, Math.round(targetConfig.glowLayers));
    if (glowStepChanged)    opts.glowLayerRadiusStep = targetConfig.glowLayerRadiusStep;
    if (glowLayersChanged || glowStepChanged) this._rebuildGlowLayers();

    const fromRadius = opts.radius;
    const toRadius   = targetConfig.radius ?? opts.radius;

    // Cross-fade when ring count changes: build new geometry immediately, fade old rings out.
    const numRingsChanged = targetConfig.numRings       !== undefined
                         && targetConfig.numRings       !== opts.numRings;
    const samplesChanged  = targetConfig.samplesPerRing !== undefined
                         && targetConfig.samplesPerRing !== opts.samplesPerRing;
    let crossFade = null;

    if (numRingsChanged || samplesChanged) {
      const oldBase             = this._baseRings;
      const oldGlowLayers       = this._glowLayers.slice();
      const oldBaseOpacity      = baseMat.uniforms.uOpacity.value;
      const oldGlowLayerOpacities = oldGlowLayers.map(l => l.material.uniforms.uOpacity.value);

      if (numRingsChanged) opts.numRings       = targetConfig.numRings;
      if (samplesChanged)  opts.samplesPerRing = targetConfig.samplesPerRing;

      const geomArgs = {
        radius: opts.radius, numRings: opts.numRings, samplesPerRing: opts.samplesPerRing,
        latitudeMin: opts.latitudeMin, latitudeMax: opts.latitudeMax, upAxis: opts.upAxis,
      };
      const sharedArgs = {
        lineWidth: opts.lineWidth, numRings: opts.numRings,
        stagger:           baseMat.uniforms.uStagger.value,
        ringDuration:      baseMat.uniforms.uRingDuration.value,
        warpAmount:        baseMat.uniforms.uWarpAmount.value,
        emissiveIntensity: baseMat.uniforms.uEmissiveIntensity.value,
        direction:         opts.direction,
        colorSpread:       baseMat.uniforms.uColorSpread.value,
        brightSpread:      baseMat.uniforms.uBrightSpread.value,
        flickerAmp:        baseMat.uniforms.uFlickerAmp.value,
        flickerSpeed:      baseMat.uniforms.uFlickerSpeed.value,
        resolution:        this._resolution,
      };
      const newBaseMat = createLine2RingMaterial({ ...sharedArgs,
        lineColor:  baseMat.uniforms.uColor.value.getHex(),
        lineColorB: baseMat.uniforms.uColorB.value.getHex(),
        opacity: 0, blending: THREE.NormalBlending });

      this._baseRings = new LineSegments2(buildLine2RingGeometry(geomArgs), newBaseMat);
      this._baseRings.renderOrder = oldBase.renderOrder;
      this._scene.add(this._baseRings);

      this._glowLayers = [];
      for (let i = 0; i < opts.glowLayers; i++) {
        const layerRadius = opts.radius * opts.glowRadius * (1 + i * opts.glowLayerRadiusStep);
        const layerMat = createLine2RingMaterial({ ...sharedArgs,
          lineColor:  glowMat0.uniforms.uColor.value.getHex(),
          lineColorB: glowMat0.uniforms.uColorB.value.getHex(),
          opacity: 0, blending: THREE.AdditiveBlending });
        const layer = new LineSegments2(
          buildLine2RingGeometry({ ...geomArgs, radius: layerRadius }), layerMat);
        layer.renderOrder = oldGlowLayers[0]?.renderOrder ?? 0;
        this._scene.add(layer);
        this._glowLayers.push(layer);
      }

      this._setProgress(this._progress);
      this._baseRings.material.uniforms.uTime.value = this._time;
      this._glowLayers.forEach(l => { l.material.uniforms.uTime.value = this._time; });

      crossFade = { oldBase, oldGlowLayers, oldBaseOpacity, oldGlowLayerOpacities };
    }

    // Snapshot from/to. glowOpacity = layer-0 opacity (= base glow opacity before falloff scaling).
    const glowMat = this._glowLayers[0].material; // may be new after cross-fade rebuild
    this._morph = {
      elapsed:    0,
      durationMs: Math.max(dur, 0),
      crossFade,
      from: {
        lineColor:         baseMat.uniforms.uColor.value.clone(),
        lineColorB:        baseMat.uniforms.uColorB.value.clone(),
        glowColor:         glowMat0.uniforms.uColor.value.clone(),
        glowColorB:        glowMat0.uniforms.uColorB.value.clone(),
        opacity:           crossFade ? 0 : baseMat.uniforms.uOpacity.value,
        glowOpacity:       crossFade ? 0 : glowMat0.uniforms.uOpacity.value,
        emissiveIntensity: baseMat.uniforms.uEmissiveIntensity.value,
        stagger:           baseMat.uniforms.uStagger.value,
        warpAmount:        baseMat.uniforms.uWarpAmount.value,
        ringDuration:      baseMat.uniforms.uRingDuration.value,
        colorSpread:       baseMat.uniforms.uColorSpread.value,
        brightSpread:      baseMat.uniforms.uBrightSpread.value,
        flickerAmp:        baseMat.uniforms.uFlickerAmp.value,
        flickerSpeed:      baseMat.uniforms.uFlickerSpeed.value,
        radius:            fromRadius,
      },
      to: {
        // Use live uniform values as fallback (not stale opts) so that a partial
        // morph that omits a property correctly holds that property constant.
        lineColor:         targetConfig.lineColor  !== undefined
                             ? new THREE.Color(targetConfig.lineColor)
                             : baseMat.uniforms.uColor.value.clone(),
        lineColorB:        targetConfig.lineColorB !== undefined
                             ? new THREE.Color(targetConfig.lineColorB)
                             : baseMat.uniforms.uColorB.value.clone(),
        glowColor:         targetConfig.glowColor  !== undefined
                             ? new THREE.Color(targetConfig.glowColor)
                             : glowMat.uniforms.uColor.value.clone(),
        glowColorB:        targetConfig.glowColorB !== undefined
                             ? new THREE.Color(targetConfig.glowColorB)
                             : glowMat.uniforms.uColorB.value.clone(),
        opacity:           targetConfig.opacity           ?? baseMat.uniforms.uOpacity.value,
        glowOpacity:       targetConfig.glowOpacity       ?? glowMat.uniforms.uOpacity.value,
        emissiveIntensity: targetConfig.emissiveIntensity ?? baseMat.uniforms.uEmissiveIntensity.value,
        stagger:           targetConfig.stagger           ?? baseMat.uniforms.uStagger.value,
        warpAmount:        targetConfig.warpAmount        ?? baseMat.uniforms.uWarpAmount.value,
        ringDuration:      targetConfig.ringDuration      ?? baseMat.uniforms.uRingDuration.value,
        colorSpread:       targetConfig.colorSpread       ?? baseMat.uniforms.uColorSpread.value,
        brightSpread:      targetConfig.brightSpread      ?? baseMat.uniforms.uBrightSpread.value,
        flickerAmp:        targetConfig.flickerAmp        ?? baseMat.uniforms.uFlickerAmp.value,
        flickerSpeed:      targetConfig.flickerSpeed      ?? baseMat.uniforms.uFlickerSpeed.value,
        radius:            toRadius,
      },
    };

    // Apply instantly when duration is zero — avoids a one-frame flash and ensures
    // uniforms are in their final state synchronously (important before syncUI runs).
    if (dur <= 0) {
      this._applyMorphT(1.0);
      this._morph = null;
    }
  }

  // ── Cleanup ─────────────────────────────────────────────────

  /** Remove from scene and dispose GPU resources. */
  dispose() {
    this._disposeCrossFade();
    this._scene.remove(this._baseRings);
    this._baseRings.geometry.dispose();
    this._baseRings.material.dispose();
    this._glowLayers.forEach(l => {
      this._scene.remove(l);
      l.geometry.dispose();
      l.material.dispose();
    });
  }

  // ── Private ─────────────────────────────────────────────────

  /** All currently active materials (base + all glow layers). */
  _allMaterials() {
    return [this._baseRings.material, ...this._glowLayers.map(l => l.material)];
  }

  /** Dispose old rings from an in-progress cross-fade (if any). */
  _disposeCrossFade() {
    const cf = this._morph?.crossFade;
    if (!cf) return;
    this._scene.remove(cf.oldBase);
    cf.oldBase.geometry.dispose(); cf.oldBase.material.dispose();
    cf.oldGlowLayers.forEach(l => {
      this._scene.remove(l);
      l.geometry.dispose(); l.material.dispose();
    });
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

    const sharedMatArgs = {
      lineWidth:         opts.lineWidth,
      emissiveIntensity: opts.emissiveIntensity,
      numRings:          opts.numRings,
      stagger:           opts.stagger,
      ringDuration:      opts.ringDuration,
      warpAmount:        opts.warpAmount,
      direction:         opts.direction,
      colorSpread:       opts.colorSpread,
      brightSpread:      opts.brightSpread,
      flickerAmp:        opts.flickerAmp,
      flickerSpeed:      opts.flickerSpeed,
      resolution:        this._resolution,
    };

    const baseMat = createLine2RingMaterial({
      ...sharedMatArgs,
      lineColor:  opts.lineColor,
      lineColorB: opts.lineColorB,
      opacity:    opts.opacity,
      blending:   THREE.NormalBlending,
    });

    this._baseRings = new LineSegments2(buildLine2RingGeometry(geomArgs), baseMat);
    this._scene.add(this._baseRings);

    this._glowLayers = [];
    for (let i = 0; i < opts.glowLayers; i++) {
      const layerRadius  = opts.radius * opts.glowRadius * (1 + i * opts.glowLayerRadiusStep);
      const layerOpacity = opts.glowOpacity * Math.pow(opts.glowLayerOpacityFalloff, i);
      const layerMat = createLine2RingMaterial({
        ...sharedMatArgs,
        lineColor:  opts.glowColor,
        lineColorB: opts.glowColorB,
        opacity:    layerOpacity,
        blending:   THREE.AdditiveBlending,
      });
      const layer = new LineSegments2(
        buildLine2RingGeometry({ ...geomArgs, radius: layerRadius }), layerMat);
      this._scene.add(layer);
      this._glowLayers.push(layer);
    }
  }

  /** Rebuild glow layers in place (used when glowLayers count or radius step changes). */
  _rebuildGlowLayers() {
    const opts = this._options;
    const mat0 = this._glowLayers[0]?.material;
    const currentColor   = mat0 ? mat0.uniforms.uColor.value.getHex()  : opts.glowColor;
    const currentColorB  = mat0 ? mat0.uniforms.uColorB.value.getHex() : opts.glowColorB;
    const renderOrder    = this._glowLayers[0]?.renderOrder ?? 0;

    this._glowLayers.forEach(l => {
      this._scene.remove(l);
      l.geometry.dispose(); l.material.dispose();
    });

    const baseMat = this._baseRings.material;
    const geomArgs = {
      radius: opts.radius, numRings: opts.numRings, samplesPerRing: opts.samplesPerRing,
      latitudeMin: opts.latitudeMin, latitudeMax: opts.latitudeMax, upAxis: opts.upAxis,
    };
    const sharedArgs = {
      lineWidth: opts.lineWidth, numRings: opts.numRings,
      stagger:           baseMat.uniforms.uStagger.value,
      ringDuration:      baseMat.uniforms.uRingDuration.value,
      warpAmount:        baseMat.uniforms.uWarpAmount.value,
      emissiveIntensity: baseMat.uniforms.uEmissiveIntensity.value,
      direction:         opts.direction,
      colorSpread:       baseMat.uniforms.uColorSpread.value,
      brightSpread:      baseMat.uniforms.uBrightSpread.value,
      flickerAmp:        baseMat.uniforms.uFlickerAmp.value,
      flickerSpeed:      baseMat.uniforms.uFlickerSpeed.value,
      resolution:        this._resolution,
    };

    this._glowLayers = [];
    for (let i = 0; i < opts.glowLayers; i++) {
      const layerRadius  = opts.radius * opts.glowRadius * (1 + i * opts.glowLayerRadiusStep);
      const layerOpacity = opts.glowOpacity * Math.pow(opts.glowLayerOpacityFalloff, i);
      const layerMat = createLine2RingMaterial({
        ...sharedArgs,
        lineColor: currentColor, lineColorB: currentColorB,
        opacity: layerOpacity, blending: THREE.AdditiveBlending,
      });
      const layer = new LineSegments2(
        buildLine2RingGeometry({ ...geomArgs, radius: layerRadius }), layerMat);
      layer.renderOrder = renderOrder;
      layer.material.uniforms.uProgress.value = this._progress;
      layer.material.uniforms.uTime.value = this._time;
      this._scene.add(layer);
      this._glowLayers.push(layer);
    }
  }

  /** Update uProgress uniform on base and all glow layers. */
  _setProgress(p) {
    this._baseRings.material.uniforms.uProgress.value = p;
    this._glowLayers.forEach(l => { l.material.uniforms.uProgress.value = p; });
  }

  /** Linearly interpolate all morphable uniforms at normalised time t. */
  _applyMorphT(t) {
    const { from, to } = this._morph;
    const baseMat = this._baseRings.material;
    const lerp = (a, b) => a + (b - a) * t;

    // Base ring: colour lerp
    _tmpColor.lerpColors(from.lineColor, to.lineColor, t);
    baseMat.uniforms.uColor.value.copy(_tmpColor);
    _tmpColor2.lerpColors(from.lineColorB, to.lineColorB, t);
    baseMat.uniforms.uColorB.value.copy(_tmpColor2);

    // Base ring: scalar lerp
    baseMat.uniforms.uOpacity.value           = lerp(from.opacity,           to.opacity);
    baseMat.uniforms.uEmissiveIntensity.value = lerp(from.emissiveIntensity, to.emissiveIntensity);
    baseMat.uniforms.uStagger.value           = lerp(from.stagger,           to.stagger);
    baseMat.uniforms.uWarpAmount.value        = lerp(from.warpAmount,        to.warpAmount);
    baseMat.uniforms.uRingDuration.value      = lerp(from.ringDuration,      to.ringDuration);
    baseMat.uniforms.uColorSpread.value       = lerp(from.colorSpread,       to.colorSpread);
    baseMat.uniforms.uBrightSpread.value      = lerp(from.brightSpread,      to.brightSpread);
    baseMat.uniforms.uFlickerAmp.value        = lerp(from.flickerAmp,        to.flickerAmp);
    baseMat.uniforms.uFlickerSpeed.value      = lerp(from.flickerSpeed,      to.flickerSpeed);

    // Glow layers: colour and shared uniforms
    _tmpColor.lerpColors(from.glowColor, to.glowColor, t);
    _tmpColor2.lerpColors(from.glowColorB, to.glowColorB, t);
    const baseGlowOpacity = lerp(from.glowOpacity, to.glowOpacity, t);
    const falloff = this._options.glowLayerOpacityFalloff;

    this._glowLayers.forEach((l, i) => {
      const m = l.material;
      m.uniforms.uColor.value.copy(_tmpColor);
      m.uniforms.uColorB.value.copy(_tmpColor2);
      m.uniforms.uOpacity.value           = baseGlowOpacity * Math.pow(falloff, i);
      m.uniforms.uEmissiveIntensity.value = lerp(from.emissiveIntensity, to.emissiveIntensity);
      m.uniforms.uStagger.value           = lerp(from.stagger,           to.stagger);
      m.uniforms.uWarpAmount.value        = lerp(from.warpAmount,        to.warpAmount);
      m.uniforms.uRingDuration.value      = lerp(from.ringDuration,      to.ringDuration);
      m.uniforms.uColorSpread.value       = lerp(from.colorSpread,       to.colorSpread);
      m.uniforms.uBrightSpread.value      = lerp(from.brightSpread,      to.brightSpread);
      m.uniforms.uFlickerAmp.value        = lerp(from.flickerAmp,        to.flickerAmp);
      m.uniforms.uFlickerSpeed.value      = lerp(from.flickerSpeed,      to.flickerSpeed);
    });

    // Radius via scale
    const scale = lerp(from.radius, to.radius) / this._options.radius;
    this._baseRings.scale.setScalar(scale);
    this._glowLayers.forEach(l => l.scale.setScalar(scale));

    // Cross-fade: fade old rings out in parallel with new rings fading in
    if (this._morph.crossFade) {
      const { oldBase, oldGlowLayers, oldBaseOpacity, oldGlowLayerOpacities } = this._morph.crossFade;
      oldBase.material.uniforms.uOpacity.value  = oldBaseOpacity * (1 - t);
      oldBase.material.uniforms.uProgress.value = this._progress;
      oldGlowLayers.forEach((l, i) => {
        l.material.uniforms.uOpacity.value  = oldGlowLayerOpacities[i] * (1 - t);
        l.material.uniforms.uProgress.value = this._progress;
      });
      if (t >= 1.0) {
        this._scene.remove(oldBase);
        oldBase.geometry.dispose(); oldBase.material.dispose();
        oldGlowLayers.forEach(l => {
          this._scene.remove(l);
          l.geometry.dispose(); l.material.dispose();
        });
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
      opts.colorSpread       = to.colorSpread;
      opts.brightSpread      = to.brightSpread;
      opts.flickerAmp        = to.flickerAmp;
      opts.flickerSpeed      = to.flickerSpeed;
      opts.lineColor         = to.lineColor.getHex();
      opts.lineColorB        = to.lineColorB.getHex();
      opts.glowColor         = to.glowColor.getHex();
      opts.glowColorB        = to.glowColorB.getHex();
      opts.radius            = to.radius;
    }
  }

}
