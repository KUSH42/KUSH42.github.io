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
// 3D simplex noise GLSL (Stefan Gustavson / Ashima Arts, public domain)
// ---------------------------------------------------------------------------
const NOISE_GLSL = /* glsl */`
vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289v4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x)  { return mod289v4(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise3(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x  = x_ * ns.x + ns.yyyy;
  vec4 y  = y_ * ns.x + ns.yyyy;
  vec4 h  = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Layered noise: two octaves for a more organic disintegration boundary.
float disintegrateNoise(vec3 p, float t, float speed) {
  float n  = snoise3(p + t * speed);
  float n2 = snoise3(p * 2.1 + t * speed * 1.3 + 17.3);
  return n * 0.65 + n2 * 0.35;  // -1..1
}
`;

// ---------------------------------------------------------------------------
// Vertex shader injection — passes model-space position to fragment
// ---------------------------------------------------------------------------
const VERT_PREAMBLE = /* glsl */`varying vec3 vDisintPos;`;
const VERT_INJECT   = /* glsl */`vDisintPos = position;`;

// ---------------------------------------------------------------------------
// Fragment shader injection — discard + edge glow
// ---------------------------------------------------------------------------
function buildFragPreamble(cfg) {
  return /* glsl */`
    varying vec3 vDisintPos;
    uniform float uDisintProgress;  // 0=intact, 1=gone
    uniform vec3  uDisintAxis;      // unit vector, disintegration direction
    uniform float uDisintBoundsMin; // dot(boundsMin, axis)
    uniform float uDisintBoundsRange;
    uniform float uDisintEdgeWidth; // normalized (0..1 range of axisPos)
    uniform float uDisintNoiseScale;
    uniform float uDisintTime;
    uniform float uDisintNoiseSpeed;
    uniform vec3  uDisintEdgeColor;
    uniform float uDisintEdgeIntensity;
    ${NOISE_GLSL}
  `;
}

// Injected at #include <clipping_planes_fragment> — runs before color is computed.
const FRAG_DISCARD = /* glsl */`
  // Normalize position along the disintegration axis to [0, 1].
  float _axisPos = (dot(vDisintPos, uDisintAxis) - uDisintBoundsMin)
                   / max(uDisintBoundsRange, 0.0001);

  // Noise in [-1, 1], remapped to [0, 1], scaled by edge softness.
  float _rawNoise = disintegrateNoise(
    vDisintPos * uDisintNoiseScale,
    uDisintTime,
    uDisintNoiseSpeed
  );
  float _noise = (_rawNoise * 0.5 + 0.5) * uDisintEdgeWidth;

  // Dissolution threshold: axisPos < (progress + noise) → discard.
  float _dissolveThreshold = uDisintProgress + _noise - uDisintEdgeWidth * 0.5;
  if (_axisPos < _dissolveThreshold) discard;
`;

// Injected at #include <dithering_fragment> — runs after base color is computed.
const FRAG_EDGE_GLOW = /* glsl */`
  {
    // Distance from the disintegration front in normalized axis units.
    float _axisPos2 = (dot(vDisintPos, uDisintAxis) - uDisintBoundsMin)
                      / max(uDisintBoundsRange, 0.0001);
    float _dissolveCenter = uDisintProgress;
    float _dist = abs(_axisPos2 - _dissolveCenter);

    // Smooth band around the front edge.
    float _edgeBand = 1.0 - smoothstep(0.0, uDisintEdgeWidth, _dist);
    _edgeBand *= _edgeBand;  // sharpen toward the center

    // Only glow on the "intact" side of the boundary.
    float _intactSide = step(_dissolveCenter, _axisPos2);
    gl_FragColor.rgb += uDisintEdgeColor * uDisintEdgeIntensity * _edgeBand * _intactSide;
  }
`;

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULTS = {
  axis:           new THREE.Vector3(0, 1, 0),
  noiseScale:     2.5,
  noiseSpeed:     0.35,
  edgeWidth:      0.12,
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
      const fragPreamble = buildFragPreamble(cfg);

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
