/**
 * matrix-rain.js — Katakana matrix rain in true 3D space.
 *
 * Architecture (same insight as rezmason/matrix):
 *   Glyphs are stationary in a grid. Illumination waves sweep DOWN through
 *   each column — the characters don't move, the light does.
 *
 * Rendering:
 *   - Canvas glyph atlas  → CanvasTexture (katakana + symbols)
 *   - InstancedBufferGeometry: one quad per character cell (col × row)
 *   - PerspectiveCamera: columns scattered in XZ space give true depth parallax
 *   - Per-column state (x, z, speed, seed) in a DataTexture — zero CPU per frame
 *   - Vertex shader positions each quad; fragment shader samples atlas + applies
 *     illumination gradient
 *   - AdditiveBlending + CSS mix-blend-mode:screen → glows over globe, invisible
 *     where black (no overhead)
 *
 * Usage:
 *   import { initMatrixRain, destroyMatrixRain } from './components/matrix-rain.js';
 *   const rain = initMatrixRain(element, { color: '#00ff70' });
 *   rain.destroy();
 */

import * as THREE from 'three';

// ── Glyph set ─────────────────────────────────────────────────
// Half-width katakana + numerals + symbols — authentic matrix palette
const GLYPHS = [
  ...'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ',
  ...'ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
  ...'012345789',
  ...':."=*+-<>¦|',
];

// ── Scene constants ───────────────────────────────────────────
const N_COLS     = 110;   // rain columns scattered in XZ
const N_ROWS     = 55;    // character rows per column (sets max trail length)
const CELL_W     = 0.28;  // world-unit width of one glyph
const CELL_H     = 0.36;  // world-unit height of one glyph
const WORLD_H    = 22;    // cycle range in Y (must exceed max visible height)
const X_RANGE    = 16;    // columns scattered ±X_RANGE in X
const Z_NEAR     = -0.6;  // closest column Z
const Z_FAR      = -9.0;  // farthest column Z
const ATLAS_PX   = 52;    // canvas pixels per glyph cell

// ── Glyph atlas ───────────────────────────────────────────────
/**
 * Render all glyphs into a vertical strip canvas → THREE.CanvasTexture.
 * One glyph per row: glyph[i] occupies canvas y=[i*PX, (i+1)*PX].
 */
function buildAtlas() {
  const n   = GLYPHS.length;
  const px  = ATLAS_PX;
  const c   = document.createElement('canvas');
  c.width   = px;
  c.height  = px * n;

  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle    = '#fff';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  // Share Tech Mono may not be loaded yet; a monospace fallback still looks fine.
  // The texture is rebuilt after fonts.ready (see initMatrixRain).
  ctx.font = `${Math.round(px * 0.84)}px "Share Tech Mono", "Courier New", monospace`;

  GLYPHS.forEach((g, i) => ctx.fillText(g, px / 2, px * i + px / 2));

  const tex        = new THREE.CanvasTexture(c);
  tex.flipY        = false;   // keep atlas orientation predictable in shader
  tex.minFilter    = THREE.LinearMipMapLinearFilter;
  tex.magFilter    = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return { tex, count: n, canvas: c, ctx };
}

// ── Per-column DataTexture ────────────────────────────────────
// RGBA Float32: [ x, z, speed (world-units/sec), seed (0..1) ]
function buildColData() {
  const data = new Float32Array(N_COLS * 4);
  for (let i = 0; i < N_COLS; i++) {
    data[i * 4 + 0] = (Math.random() - 0.5) * 2 * X_RANGE;
    data[i * 4 + 1] = Z_NEAR + Math.random() * (Z_FAR - Z_NEAR);
    data[i * 4 + 2] = 1.8 + Math.random() * 3.2;   // world-units / sec
    data[i * 4 + 3] = Math.random();
  }
  const tex       = new THREE.DataTexture(data, N_COLS, 1, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

// ── InstancedBufferGeometry ───────────────────────────────────
// One PlaneGeometry quad per cell, instanced N_COLS × N_ROWS times.
// aColIdx and aRowIdx identify which cell each instance represents.
function buildGeometry() {
  const geom = new THREE.InstancedBufferGeometry();
  const base = new THREE.PlaneGeometry(1, 1);
  // Clone attributes — do NOT dispose base before cloning or buffers are freed
  geom.index = base.index.clone();
  geom.setAttribute('position', base.getAttribute('position').clone());
  geom.setAttribute('uv',       base.getAttribute('uv').clone());
  base.dispose();

  const total  = N_COLS * N_ROWS;
  const colBuf = new Float32Array(total);
  const rowBuf = new Float32Array(total);

  for (let c = 0; c < N_COLS; c++) {
    for (let r = 0; r < N_ROWS; r++) {
      colBuf[c * N_ROWS + r] = c;
      rowBuf[c * N_ROWS + r] = r;
    }
  }

  geom.setAttribute('aColIdx', new THREE.InstancedBufferAttribute(colBuf, 1));
  geom.setAttribute('aRowIdx', new THREE.InstancedBufferAttribute(rowBuf, 1));
  geom.instanceCount = total;
  return geom;
}

// ── Vertex shader ─────────────────────────────────────────────
const VERT = /* glsl */`
precision highp float;

attribute float aColIdx;
attribute float aRowIdx;

uniform sampler2D uColData;
uniform float     uNCols;
uniform float     uTime;
uniform float     uCellW;
uniform float     uCellH;
uniform float     uWorldH;
uniform float     uNRows;

varying vec2  vUv;
varying float vDist;   // distance from illumination head in row-units (0=head, +ve=trail)
varying float vColIdx;
varying float vRowIdx;
varying float vColZ;   // world-space Z of the column (for occlusion depth test)

void main() {
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;

  // Fetch column config from DataTexture
  vec4  col  = texture2D(uColData, vec2((aColIdx + 0.5) / uNCols, 0.5));
  float colX = col.r;
  float colZ = col.g;
  vColZ = colZ;
  float spd  = col.b;
  float seed = col.a;

  // Static world-Y of this character cell (top → bottom as rowIdx increases)
  float cellY = uWorldH * 0.5 - aRowIdx * uCellH;

  // Illumination head sweeps from top to bottom, cycling continuously.
  // headY decreases from +WORLD_H/2 toward -WORLD_H/2, then wraps.
  float cycleH = uWorldH + uNRows * uCellH;
  float headY  = uWorldH * 0.5 - mod(uTime * spd + seed * cycleH, cycleH);

  // Distance from head in row-units:
  //   < 0  → cell is below head  (not yet lit, invisible)
  //   0    → head position       (brightest, white)
  //   > 0  → above head          (trail, exponential fade)
  vDist = (cellY - headY) / uCellH;

  // Cull cells that are not in the visible trail window
  if (vDist < -0.5 || vDist > float(uNRows)) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);  // outside NDC cube → clipped
    return;
  }

  // Place quad in world space.
  // position is the base PlaneGeometry vertex in [-0.5, 0.5] unit space.
  vec3 worldPos = vec3(
    position.x * uCellW + colX,
    position.y * uCellH + cellY,
    colZ
  );

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
}
`;

// ── Fragment shader ───────────────────────────────────────────
const FRAG = /* glsl */`
precision highp float;

uniform sampler2D uGlyphTex;
uniform float     uGlyphCount;
uniform float     uTime;
uniform vec3      uColor;
uniform float     uNRows;
uniform vec2      uResolution;   // canvas size in pixels
uniform float     uGlobeRadius;  // globe disc radius as fraction of screen half-height

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vColZ;

float h2(vec2 v) {
  return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // Globe occlusion — columns deeper than the foremost 20% are hidden
  // behind the globe's screen-space disc.
  // Z range: Z_NEAR=-0.6 (close) .. Z_FAR=-9.0 (far).
  // Foremost 20% threshold: -0.6 + 0.2*(-9.0-(-0.6)) = -2.28
  const float Z_NEAR      = -0.6;
  const float Z_FAR       = -9.0;
  const float FORE_FRAC   = 0.2;
  float zThreshold = Z_NEAR + FORE_FRAC * (Z_FAR - Z_NEAR); // -2.28
  if (vColZ < zThreshold) {
    // Column is in the occluded 80% — test against globe disc
    vec2  sc   = uResolution * 0.5;                   // screen centre (pixels)
    float dist = length(gl_FragCoord.xy - sc);
    float r    = uGlobeRadius * uResolution.y * 0.5;  // globe pixel radius
    if (dist < r) discard;
  }

  // Trail brightness: max at head (vDist≈0), exponential falloff into trail
  float trail = exp(-max(vDist, 0.0) * 0.14);
  if (trail < 0.012) discard;

  // Glyph identity: each cell has a stable character that flickers occasionally.
  // Cells near the head flicker faster (higher rate).
  float proximity = 1.0 - clamp(vDist / 8.0, 0.0, 1.0);
  float rate      = 2.0 + proximity * 14.0 + h2(vec2(vColIdx, 0.5)) * 6.0;
  float tick      = floor(uTime * rate);
  float glyphIdx  = floor(
    h2(vec2(vColIdx * 0.37 + tick * 0.11, vRowIdx * 0.73 + tick * 0.07)) * uGlyphCount
  );

  // Sample atlas.
  // flipY=false: UV.v=0 → canvas top, UV.v=1 → canvas bottom.
  // PlaneGeometry: vUv.y=0 → quad bottom, vUv.y=1 → quad top.
  // Glyph i canvas range: v=[i/n, (i+1)/n] top-to-bottom.
  // Map quad top→glyph top, quad bottom→glyph bottom:
  float atlasV = (glyphIdx + (1.0 - vUv.y)) / uGlyphCount;
  float mask   = texture2D(uGlyphTex, vec2(vUv.x, atlasV)).r;

  if (mask < 0.07) discard;

  // Color: head → bright white; trail → theme color, fading
  float headFrac = 1.0 - smoothstep(0.0, 1.8, vDist);
  vec3  col      = mix(uColor * 1.3, vec3(0.82, 1.0, 0.88), headFrac);

  // Second-brightest row: slightly elevated (classic matrix look)
  float subHead  = 1.0 - smoothstep(1.0, 3.0, vDist);
  col            = mix(col, uColor * 1.8, subHead * 0.35);

  float alpha    = trail * mask;
  gl_FragColor   = vec4(col * alpha, alpha);
}
`;

// ── State registry ────────────────────────────────────────────
const _state = new Map();

// ── Public API ────────────────────────────────────────────────

/**
 * @param {HTMLElement} element
 * @param {object}      opts
 * @param {string}  [opts.color='#00ff70']
 * @param {number}  [opts.opacity=0.9]
 */
export function initMatrixRain(element, opts = {}) {
  if (_state.has(element)) destroyMatrixRain(element);

  const { color = '#00ff70', opacity = 0.9 } = opts;
  const rgb = new THREE.Color(color);

  // ── Atlas
  const atlas = buildAtlas();

  // ── Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(element.clientWidth || 1, element.clientHeight || 1);

  const canvas = renderer.domElement;
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:0;mix-blend-mode:screen;';
  canvas.style.opacity = String(opacity);
  element.appendChild(canvas);

  // ── Scene + Camera
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    (element.clientWidth || 1) / (element.clientHeight || 1),
    0.1,
    60
  );
  camera.position.set(0, 0, 4);
  camera.lookAt(0, 0, 0);

  // ── Column data + geometry
  const colData = buildColData();
  const geom    = buildGeometry();

  const w0 = element.clientWidth  || 1;
  const h0 = element.clientHeight || 1;

  // uGlobeRadius: globe disc radius as a fraction of screen half-height.
  // Derived from globe camera (FOV=45°, z=3, R=1.0):
  //   NDC_r = (R/sqrt(d²-R²)) / tan(halfFov) = (1/√8) / tan(22.5°) ≈ 0.854
  // Use 0.82 to leave a small margin and account for typical orbit distance.
  const GLOBE_NDC_R = 0.82;

  const uniforms = {
    uGlyphTex:    { value: atlas.tex },
    uGlyphCount:  { value: atlas.count },
    uColData:     { value: colData },
    uNCols:       { value: N_COLS },
    uTime:        { value: 0 },
    uCellW:       { value: CELL_W },
    uCellH:       { value: CELL_H },
    uWorldH:      { value: WORLD_H },
    uNRows:       { value: N_ROWS },
    uColor:       { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
    uResolution:  { value: new THREE.Vector2(w0, h0) },
    uGlobeRadius: { value: GLOBE_NDC_R },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent:    true,
    depthWrite:     false,
    blending:       THREE.AdditiveBlending,
    side:           THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geom, material);
  scene.add(mesh);

  // ── Animation loop
  const s = { renderer, material, geom, atlas, colData, ro: null, animId: 0 };
  _state.set(element, s);

  function animate(ts) {
    s.animId = requestAnimationFrame(animate);
    uniforms.uTime.value = ts * 0.001;
    renderer.render(scene, camera);
  }
  s.animId = requestAnimationFrame(animate);

  // ── Resize
  s.ro = new ResizeObserver(() => {
    const w = element.clientWidth  || 1;
    const h = element.clientHeight || 1;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uResolution.value.set(w, h);
  });
  s.ro.observe(element);

  // ── Rebuild atlas once custom font is loaded (for crisp katakana)
  document.fonts.ready.then(() => {
    const st = _state.get(element);
    if (!st) return;
    const { tex, count, canvas: ac, ctx } = atlas;
    ctx.clearRect(0, 0, ac.width, ac.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ac.width, ac.height);
    ctx.fillStyle    = '#fff';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(ATLAS_PX * 0.84)}px "Share Tech Mono", monospace`;
    GLYPHS.forEach((g, i) => ctx.fillText(g, ATLAS_PX / 2, ATLAS_PX * i + ATLAS_PX / 2));
    tex.needsUpdate = true;
  });

  return {
    destroy()     { destroyMatrixRain(element); },
    setColor(hex) {
      const c = new THREE.Color(hex);
      uniforms.uColor.value.set(c.r, c.g, c.b);
    },
    setOpacity(v) { canvas.style.opacity = String(v); },
  };
}

export function destroyMatrixRain(element) {
  const s = _state.get(element);
  if (!s) return;
  cancelAnimationFrame(s.animId);
  s.ro.disconnect();
  s.material.dispose();
  s.geom.dispose();
  s.atlas.tex.dispose();
  s.colData.dispose();
  s.renderer.dispose();
  s.renderer.domElement.remove();
  _state.delete(element);
}
