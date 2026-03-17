/**
 * DisintegrationEffect
 *
 * Applies a cell-hash disintegration effect to any THREE.Mesh via
 * onBeforeCompile shader injection. Works with all standard Three.js
 * materials (MeshStandard, MeshPhysical, MeshMatcap, MeshBasic, etc.).
 *
 * Usage:
 *   const fx = new DisintegrationEffect(mesh, options);
 *
 *   // Manual control:
 *   fx.progress = 0.5;
 *
 *   // Built-in animation (requires fx.tick(deltaMs) in your RAF loop):
 *   fx.disintegrate(2000, () => console.log('gone'));
 *   fx.reconstruct(2000, () => console.log('back'));
 *   fx.stopAnimation();
 *
 *   // Vertex glitch (also driven by tick):
 *   fx.glitch.enabled    = true;
 *   fx.glitch.intensity  = 0.3;   // displacement in model units
 *   fx.glitch.frequency  = 20;    // flips per second
 *   fx.glitch.threshold  = 0.08;  // fraction of vertices affected at once
 *
 *   // Cleanup:
 *   fx.dispose();
 */

import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------
const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ---------------------------------------------------------------------------
// Vertex shader — preamble and position capture
// ---------------------------------------------------------------------------
const VERT_PREAMBLE = /* glsl */`varying vec3 vDisintPos;`;
const VERT_INJECT   = /* glsl */`vDisintPos = position;`;

// ---------------------------------------------------------------------------
// Fragment shader — shared cell helpers
// ---------------------------------------------------------------------------
const FRAG_CELL_HELPERS = /* glsl */`
  // Hash a vec3 cell index to a single float in [0, 1].
  // All fragments in the same floor()-cell return identical values,
  // which is what causes entire rectangular blocks to pop off together.
  float _cellHash(vec3 c) {
    float h1 = fract(sin(dot(c,         vec3(127.1, 311.7,  74.7))) * 43758.5453);
    float h2 = fract(sin(dot(c + 17.31, vec3(269.5, 183.3, 246.1))) * 35793.4219);
    float h3 = fract(sin(dot(c - 31.17, vec3( 93.7, 421.9, 152.3))) * 58329.7341);
    return fract(h1 * 0.5 + h2 * 0.3 + h3 * 0.2);
  }

  // Outputs:
  //   cellRand — per-cell random value [0, 1]
  //   axisPos  — fragment's normalised position along the disintegration axis [0, 1]
  void _disintegrateVals(out float cellRand, out float axisPos) {
    vec3 _cellID = floor(vDisintPos * uDisintNoiseScale);
    cellRand = _cellHash(_cellID);
    axisPos  = (dot(vDisintPos, uDisintAxis) - uDisintBoundsMin)
               / max(uDisintBoundsRange, 0.0001);
  }
`;

// Fragment preamble — uniforms + cell helpers prepended to the shader source.
function buildFragPreamble() {
  return /* glsl */`
    varying vec3 vDisintPos;
    uniform float uDisintProgress;    // 0 = intact, 1 = fully gone
    uniform vec3  uDisintAxis;        // unit vector along disintegration direction
    uniform float uDisintBoundsMin;   // dot(aabb.min, axis)
    uniform float uDisintBoundsRange; // dot(aabb.max, axis) - uDisintBoundsMin
    uniform float uDisintEdgeWidth;   // scatter band width in normalised axis units
    uniform float uDisintNoiseScale;  // cell grid density (higher = smaller blocks)
    uniform float uDisintTime;        // seconds since construction
    uniform float uDisintNoiseSpeed;  // edge shimmer speed multiplier
    uniform vec3  uDisintEdgeColor;
    uniform float uDisintEdgeIntensity;
    // Glitch
    uniform float uGlitchEnabled;
    uniform float uGlitchFrequency;   // re-randomise rate (Hz)
    uniform float uGlitchThreshold;   // fraction of cells discarded at once [0..1]
    uniform float uGlitchNoiseScale;  // glitch cell size (independent of disintegration)
    ${FRAG_CELL_HELPERS}
  `;
}

// ---------------------------------------------------------------------------
// Fragment discard — injected at #include <clipping_planes_fragment>
// Runs before any lighting / color — discarded fragments cost nothing.
// ---------------------------------------------------------------------------
const FRAG_DISCARD = /* glsl */`
  {
    float _cr, _ap;
    _disintegrateVals(_cr, _ap);
    // Each cell has its own threshold = its axis position ± a random offset.
    // Cells with a low random value dissolve ahead of the front (edginess);
    // cells with a high value survive a little past it.
    float _cellThreshold = _ap + (_cr - 0.5) * uDisintEdgeWidth * 2.0;
    if (_cellThreshold < uDisintProgress) discard;
  }
`;

// ---------------------------------------------------------------------------
// Glitch discard — injected immediately after FRAG_DISCARD (same chunk).
// Uses time-slotted cell hash: every 1/frequency seconds the entire pattern
// re-randomises, making different rectangular blocks blink out each frame.
// ---------------------------------------------------------------------------
const FRAG_GLITCH_DISCARD = /* glsl */`
  if (uGlitchEnabled > 0.5) {
    vec3  _gCellID  = floor(vDisintPos * uGlitchNoiseScale);
    // Quantise time — all cells flip simultaneously at uGlitchFrequency Hz.
    float _gSlot    = floor(uDisintTime * uGlitchFrequency);
    // Stir cell ID with time slot so each slot gives a completely new pattern.
    float _gHash    = _cellHash(_gCellID + vec3(0.0, _gSlot * 17.31, _gSlot * 5.71));
    if (_gHash < uGlitchThreshold) discard;
  }
`;

// ---------------------------------------------------------------------------
// Edge glow — injected at #include <dithering_fragment>
// Runs after all color is computed; adds overbright glow for bloom.
// ---------------------------------------------------------------------------
const FRAG_EDGE_GLOW = /* glsl */`
  {
    float _cr2, _ap2;
    _disintegrateVals(_cr2, _ap2);
    float _cellThreshold2 = _ap2 + (_cr2 - 0.5) * uDisintEdgeWidth * 2.0;
    float _distToFront    = _cellThreshold2 - uDisintProgress; // > 0 means intact

    // Smooth glow band on surviving cells closest to the boundary.
    float _edgeBand = 1.0 - smoothstep(0.0, uDisintEdgeWidth, _distToFront);
    _edgeBand *= _edgeBand;

    // Per-cell phase offset makes each block shimmer independently.
    float _pulse = 0.75 + 0.25 * sin(uDisintTime * uDisintNoiseSpeed * 6.0 + _cr2 * 12.0);

    gl_FragColor.rgb += uDisintEdgeColor * uDisintEdgeIntensity * _edgeBand * _pulse;
  }
`;

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULTS = {
  axis:           new THREE.Vector3(0, 1, 0),
  noiseScale:     10.0,
  noiseSpeed:     1.5,
  edgeWidth:      0.15,
  edgeColor:      new THREE.Color(0x00ffcc),
  edgeIntensity:  6.0,
};

// ---------------------------------------------------------------------------
// Main class
// ---------------------------------------------------------------------------
export class DisintegrationEffect {
  /**
   * @param {THREE.Mesh} mesh
   * @param {object}     [options]
   * @param {THREE.Vector3} [options.axis]           Disintegration direction (default +Y)
   * @param {number}        [options.noiseScale]     Cell grid density — higher = smaller blocks
   * @param {number}        [options.noiseSpeed]     Edge shimmer speed
   * @param {number}        [options.edgeWidth]      Scatter band width [0..1]
   * @param {THREE.Color|number} [options.edgeColor] Glow colour at boundary
   * @param {number}        [options.edgeIntensity]  Glow brightness (>1 drives bloom)
   */
  constructor(mesh, options = {}) {
    this._mesh             = mesh;
    this._originalMaterial = mesh.material;
    this._elapsed          = 0;
    this._anim             = null; // internal progress tween

    const cfg  = { ...DEFAULTS, ...options };
    cfg.axis   = cfg.axis.clone().normalize();
    this._cfg  = cfg;

    const box      = new THREE.Box3().setFromObject(mesh);
    const bMin     = box.min.dot(cfg.axis);
    const bMax     = box.max.dot(cfg.axis);

    this._uniforms = {
      // Disintegration
      uDisintProgress:      { value: 0.0 },
      uDisintAxis:          { value: cfg.axis },
      uDisintBoundsMin:     { value: bMin },
      uDisintBoundsRange:   { value: bMax - bMin },
      uDisintEdgeWidth:     { value: cfg.edgeWidth },
      uDisintNoiseScale:    { value: cfg.noiseScale },
      uDisintTime:          { value: 0.0 },
      uDisintNoiseSpeed:    { value: cfg.noiseSpeed },
      uDisintEdgeColor:     { value: cfg.edgeColor instanceof THREE.Color
                                ? cfg.edgeColor.clone()
                                : new THREE.Color(cfg.edgeColor) },
      uDisintEdgeIntensity: { value: cfg.edgeIntensity },
      // Glitch (all driven by uDisintTime — no separate time uniform needed)
      uGlitchEnabled:   { value: 0.0 },
      uGlitchFrequency: { value: 15.0 },
      uGlitchThreshold: { value: 0.08 },
      uGlitchNoiseScale:{ value: 10.0 },
    };

    // Glitch control object — properties write directly to uniforms.
    const u = this._uniforms;
    this.glitch = {
      get enabled()    { return u.uGlitchEnabled.value > 0.5; },
      set enabled(v)   { u.uGlitchEnabled.value = v ? 1.0 : 0.0; },
      /** How many times per second the cell pattern re-randomises. */
      get frequency()  { return u.uGlitchFrequency.value; },
      set frequency(v) { u.uGlitchFrequency.value = v; },
      /** Fraction of cells discarded at any one time [0..1]. */
      get threshold()  { return u.uGlitchThreshold.value; },
      set threshold(v) { u.uGlitchThreshold.value = Math.max(0, Math.min(1, v)); },
      /** Cell grid density — higher = smaller glitch blocks. */
      get noiseScale()  { return u.uGlitchNoiseScale.value; },
      set noiseScale(v) { u.uGlitchNoiseScale.value = v; },
    };

    this._patchMaterial(mesh.material);
  }

  // ── Progress ──────────────────────────────────────────────────────────────

  /** 0 = fully intact, 1 = fully gone. */
  get progress() { return this._uniforms.uDisintProgress.value; }
  set progress(v) { this._uniforms.uDisintProgress.value = Math.max(0, Math.min(1, v)); }

  // ── Appearance ────────────────────────────────────────────────────────────

  get edgeColor()      { return this._uniforms.uDisintEdgeColor.value; }
  set edgeColor(c)     { this._uniforms.uDisintEdgeColor.value.set(c); }

  get edgeIntensity()  { return this._uniforms.uDisintEdgeIntensity.value; }
  set edgeIntensity(v) { this._uniforms.uDisintEdgeIntensity.value = v; }

  get edgeWidth()      { return this._uniforms.uDisintEdgeWidth.value; }
  set edgeWidth(v)     { this._uniforms.uDisintEdgeWidth.value = v; }

  // ── Built-in animation (driven by tick) ───────────────────────────────────

  /**
   * Animate progress from its current value to 1 (fully gone).
   * @param {number}   [durationMs=2000]
   * @param {Function} [onComplete]
   */
  disintegrate(durationMs = 2000, onComplete) {
    this._anim = {
      from: this.progress, to: 1.0,
      elapsed: 0, duration: durationMs,
      onComplete,
    };
  }

  /**
   * Animate progress from its current value back to 0 (fully intact).
   * The disintegration plays in reverse — blocks reappear in the same
   * cell order they left, sweeping back along the axis.
   * @param {number}   [durationMs=2000]
   * @param {Function} [onComplete]
   */
  reconstruct(durationMs = 2000, onComplete) {
    this._anim = {
      from: this.progress, to: 0.0,
      elapsed: 0, duration: durationMs,
      onComplete,
    };
  }

  /** Cancel any running disintegrate() / reconstruct() animation. */
  stopAnimation() { this._anim = null; }

  // ── Per-frame update ──────────────────────────────────────────────────────

  /**
   * Advance internal timers and any running animation.
   * Must be called every frame for glitch and built-in animations to work.
   * @param {number} deltaMs  Milliseconds since the last frame.
   */
  tick(deltaMs) {
    this._elapsed += deltaMs;
    this._uniforms.uDisintTime.value = this._elapsed * 0.001;

    if (this._anim) {
      this._anim.elapsed += deltaMs;
      const rawT   = Math.min(this._anim.elapsed / this._anim.duration, 1.0);
      const easedT = easeInOutCubic(rawT);
      this.progress = this._anim.from + (this._anim.to - this._anim.from) * easedT;
      if (rawT >= 1.0) {
        const cb   = this._anim.onComplete;
        this._anim = null;
        cb?.();
      }
    }
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  /**
   * Recompute bounding box bounds.
   * Call this if the mesh is moved/scaled after construction.
   */
  updateBounds() {
    const box = new THREE.Box3().setFromObject(this._mesh);
    this._uniforms.uDisintBoundsMin.value   = box.min.dot(this._cfg.axis);
    this._uniforms.uDisintBoundsRange.value = box.max.dot(this._cfg.axis)
                                              - this._uniforms.uDisintBoundsMin.value;
  }

  /**
   * Remove the effect and restore the mesh's original material.
   * The DisintegrationEffect instance should not be used after dispose().
   */
  dispose() {
    if (this._patchedMaterial) {
      this._patchedMaterial.dispose();
    }
    this._mesh.material = this._originalMaterial;
  }

  // ── Internal ──────────────────────────────────────────────────────────────

  _patchMaterial(material) {
    const mat      = material.clone();
    const uniforms = this._uniforms;

    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);

      // --- Vertex shader ---
      shader.vertexShader = shader.vertexShader
        .replace(
          `void main() {`,
          `${VERT_PREAMBLE}\nvoid main() {`
        )
        .replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>\n${VERT_INJECT}`
        );

      // --- Fragment shader ---
      // Prepend before the shader body (precision line is added by the renderer
      // after onBeforeCompile, so the raw source doesn't start with it).
      shader.fragmentShader =
        buildFragPreamble() + '\n' + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader
        .replace(
          `#include <clipping_planes_fragment>`,
          `#include <clipping_planes_fragment>\n${FRAG_DISCARD}\n${FRAG_GLITCH_DISCARD}`
        )
        .replace(
          `#include <dithering_fragment>`,
          `#include <dithering_fragment>\n${FRAG_EDGE_GLOW}`
        );
    };

    mat.needsUpdate = true;
    this._mesh.material    = mat;
    this._patchedMaterial  = mat;
  }
}
