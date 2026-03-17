/**
 * DisintegrationEffect
 *
 * Applies a noise-driven disintegration (dissolve) effect to any THREE.Mesh
 * via onBeforeCompile shader injection. Works with all standard Three.js
 * materials (MeshStandard, MeshPhysical, MeshMatcap, MeshBasic, etc.).
 *
 * Usage:
 *   const fx = new DisintegrationEffect(mesh, options);
 *   fx.progress = 0;      // 0 = fully intact, 1 = fully gone
 *   // animate fx.progress however you like
 *   fx.dispose();         // removes effect, restores material
 *
 * Call fx.tick(deltaMs) each frame if you want built-in time-animated noise.
 */

import * as THREE from 'three';


// ---------------------------------------------------------------------------
// Vertex shader injection — passes model-space position to fragment
// ---------------------------------------------------------------------------
const VERT_PREAMBLE = /* glsl */`varying vec3 vDisintPos;`;
const VERT_INJECT   = /* glsl */`vDisintPos = position;`;

// ---------------------------------------------------------------------------
// Fragment shader injection — discard + edge glow
// ---------------------------------------------------------------------------

// Shared helper: computes cell ID and per-cell random threshold.
// All pixels inside the same cell share one _cellRand value, so entire
// rectangular blocks pop off together rather than dissolving smoothly.
const FRAG_CELL_HELPERS = /* glsl */`
  // Hash a vec3 cell index to a single float in [0, 1].
  float _cellHash(vec3 c) {
    float h1 = fract(sin(dot(c,          vec3(127.1, 311.7,  74.7))) * 43758.5453);
    float h2 = fract(sin(dot(c + 17.31,  vec3(269.5, 183.3, 246.1))) * 35793.4219);
    float h3 = fract(sin(dot(c - 31.17,  vec3( 93.7, 421.9, 152.3))) * 58329.7341);
    return fract(h1 * 0.5 + h2 * 0.3 + h3 * 0.2);
  }

  // Returns per-cell random [0,1] and axis-normalized position [0,1].
  // uDisintNoiseScale controls cell grid density — higher = smaller blocks.
  void _disintegrateVals(out float cellRand, out float axisPos) {
    vec3 _cellID = floor(vDisintPos * uDisintNoiseScale);
    cellRand = _cellHash(_cellID);
    axisPos  = (dot(vDisintPos, uDisintAxis) - uDisintBoundsMin)
               / max(uDisintBoundsRange, 0.0001);
  }
`;

function buildFragPreamble() {
  return /* glsl */`
    varying vec3 vDisintPos;
    uniform float uDisintProgress;    // 0=intact, 1=gone
    uniform vec3  uDisintAxis;        // unit vector, disintegration direction
    uniform float uDisintBoundsMin;   // dot(boundsMin, axis)
    uniform float uDisintBoundsRange;
    uniform float uDisintEdgeWidth;   // scatter band width in normalized axis units
    uniform float uDisintNoiseScale;  // cell grid density (higher = smaller blocks)
    uniform float uDisintTime;
    uniform float uDisintNoiseSpeed;  // edge shimmer speed
    uniform vec3  uDisintEdgeColor;
    uniform float uDisintEdgeIntensity;
    ${FRAG_CELL_HELPERS}
  `;
}

// Injected at #include <clipping_planes_fragment> — runs before color is computed.
// Each cell gets a random offset from the sweep front — those with a lower
// random value dissolve before the main front, those with higher survive longer.
// The result is a ragged band of rectangular blocks popping off.
const FRAG_DISCARD = /* glsl */`
  {
    float _cr, _ap;
    _disintegrateVals(_cr, _ap);
    // Cell dissolves when progress sweeps past its individual threshold.
    // edgeWidth controls the scatter band width (how ragged the boundary is).
    float _cellThreshold = _ap + (_cr - 0.5) * uDisintEdgeWidth * 2.0;
    if (_cellThreshold < uDisintProgress) discard;
  }
`;

// Injected at #include <dithering_fragment> — runs after base color is computed.
// Glows intact cells that are near the dissolution front.
const FRAG_EDGE_GLOW = /* glsl */`
  {
    float _cr2, _ap2;
    _disintegrateVals(_cr2, _ap2);
    float _cellThreshold2 = _ap2 + (_cr2 - 0.5) * uDisintEdgeWidth * 2.0;
    float _distToFront = _cellThreshold2 - uDisintProgress;  // > 0 = intact

    // Glow band on surviving cells close to the front.
    float _edgeBand = 1.0 - smoothstep(0.0, uDisintEdgeWidth, _distToFront);
    _edgeBand = _edgeBand * _edgeBand;

    // Pulse with time so the edge shimmers slightly.
    float _pulse = 0.75 + 0.25 * sin(uDisintTime * uDisintNoiseSpeed * 6.0 + _cr2 * 12.0);

    gl_FragColor.rgb += uDisintEdgeColor * uDisintEdgeIntensity * _edgeBand * _pulse;
  }
`;

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULTS = {
  axis:           new THREE.Vector3(0, 1, 0),
  noiseScale:     10.0,  // cell grid density — tune to object size for visible blocks
  noiseSpeed:     1.5,   // edge shimmer speed
  edgeWidth:      0.15,  // scatter band width (0=sharp line, 1=full range)
  edgeColor:      new THREE.Color(0x00ffcc),
  edgeIntensity:  6.0,
};

// ---------------------------------------------------------------------------
// Main class
// ---------------------------------------------------------------------------
export class DisintegrationEffect {
  /**
   * @param {THREE.Mesh} mesh
   * @param {object} [options]
   * @param {THREE.Vector3} [options.axis]          Direction of disintegration (default: +Y)
   * @param {number}        [options.noiseScale]    Noise frequency (default: 2.5)
   * @param {number}        [options.noiseSpeed]    Noise animation speed (default: 0.35)
   * @param {number}        [options.edgeWidth]     Soft edge width in normalized units (default: 0.12)
   * @param {THREE.Color}   [options.edgeColor]     Glow color at dissolution boundary
   * @param {number}        [options.edgeIntensity] Glow brightness multiplier (>1 feeds bloom)
   */
  constructor(mesh, options = {}) {
    this._mesh = mesh;
    this._originalMaterial = mesh.material;
    this._elapsed = 0;

    const cfg = { ...DEFAULTS, ...options };
    cfg.axis = cfg.axis.clone().normalize();

    // Compute bounding box projected onto the disintegration axis
    const box = new THREE.Box3().setFromObject(mesh);
    const boundsMin = box.min.dot(cfg.axis);
    const boundsMax = box.max.dot(cfg.axis);

    this._uniforms = {
      uDisintProgress:    { value: 0.0 },
      uDisintAxis:        { value: cfg.axis },
      uDisintBoundsMin:   { value: boundsMin },
      uDisintBoundsRange: { value: boundsMax - boundsMin },
      uDisintEdgeWidth:   { value: cfg.edgeWidth },
      uDisintNoiseScale:  { value: cfg.noiseScale },
      uDisintTime:        { value: 0.0 },
      uDisintNoiseSpeed:  { value: cfg.noiseSpeed },
      uDisintEdgeColor:   { value: cfg.edgeColor instanceof THREE.Color
                              ? cfg.edgeColor
                              : new THREE.Color(cfg.edgeColor) },
      uDisintEdgeIntensity: { value: cfg.edgeIntensity },
    };

    this._cfg = cfg;
    this._patchMaterial(mesh.material);
  }

  // -------------------------------------------------------------------------
  // Public properties
  // -------------------------------------------------------------------------

  /** Progress of disintegration: 0 = fully intact, 1 = fully gone. */
  get progress() { return this._uniforms.uDisintProgress.value; }
  set progress(v) { this._uniforms.uDisintProgress.value = Math.max(0, Math.min(1, v)); }

  get edgeColor() { return this._uniforms.uDisintEdgeColor.value; }
  set edgeColor(c) { this._uniforms.uDisintEdgeColor.value.set(c); }

  get edgeIntensity() { return this._uniforms.uDisintEdgeIntensity.value; }
  set edgeIntensity(v) { this._uniforms.uDisintEdgeIntensity.value = v; }

  get edgeWidth() { return this._uniforms.uDisintEdgeWidth.value; }
  set edgeWidth(v) { this._uniforms.uDisintEdgeWidth.value = v; }

  // -------------------------------------------------------------------------
  // Per-frame update — advances internal time for animated noise.
  // Call this in your RAF/animation loop.
  // -------------------------------------------------------------------------
  tick(deltaMs) {
    this._elapsed += deltaMs;
    this._uniforms.uDisintTime.value = this._elapsed * 0.001;
  }

  // -------------------------------------------------------------------------
  // Recalculate bounds — call if the mesh is transformed after construction.
  // -------------------------------------------------------------------------
  updateBounds() {
    const box = new THREE.Box3().setFromObject(this._mesh);
    this._uniforms.uDisintBoundsMin.value   = box.min.dot(this._cfg.axis);
    const bmax = box.max.dot(this._cfg.axis);
    this._uniforms.uDisintBoundsRange.value = bmax - this._uniforms.uDisintBoundsMin.value;
  }

  // -------------------------------------------------------------------------
  // Remove the effect and restore the original material.
  // -------------------------------------------------------------------------
  dispose() {
    this._mesh.material = this._originalMaterial;
  }

  // -------------------------------------------------------------------------
  // Internal — patches the material via onBeforeCompile
  // -------------------------------------------------------------------------
  _patchMaterial(material) {
    // Clone so we don't mutate a shared material instance.
    const mat = material.clone();
    const uniforms = this._uniforms;
    const cfg = this._cfg;

    // MeshBasicMaterial has no normals chunk; use USE_UV define to ensure vUv
    // is available in case the material needs it, but our effect only uses
    // custom vDisintPos so no special handling is required beyond the clone.

    mat.onBeforeCompile = (shader) => {
      // Inject uniforms
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
      const fragPreamble = buildFragPreamble();

      // Prepend uniforms + noise functions at the top of the fragment shader.
      // (Three.js adds 'precision highp float' at runtime, after onBeforeCompile,
      //  so the raw shader.fragmentShader does not start with a precision statement.)
      shader.fragmentShader = fragPreamble + '\n' + shader.fragmentShader;

      // Discard — at clipping planes fragment (early, before any color)
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>\n${FRAG_DISCARD}`
      );

      // Edge glow — at dithering fragment (after all color is computed)
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `#include <dithering_fragment>\n${FRAG_EDGE_GLOW}`
      );
    };

    // Mark as needing recompile
    mat.needsUpdate = true;

    this._mesh.material = mat;
    this._patchedMaterial = mat;
  }
}
