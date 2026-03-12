/**
 * matrix-rain.js — Katakana matrix rain in true 3D space.
 *
 * Columns are scattered in a spherical shell around the globe. Each column
 * has randomized position, trail length, brightness, glyph scale, and speed.
 * Billboarded quads always face the camera; depth-scaled for consistent
 * screen presence. AdditiveBlending + CSS mix-blend-mode:screen composites
 * over the globe.
 */

import * as THREE from 'three';

// ── Glyph set ─────────────────────────────────────────────────
const GLYPHS = [
  ...'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ',
  ...'ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
  ...'012345789',
  ...':."=*+-<>¦|',
];

// ── Scene constants ───────────────────────────────────────────
const N_COLS     = 800;
const N_ROWS     = 70;    // max trail length — long fading tails
const CELL_W     = 0.12;  // base world-unit glyph width
const CELL_H     = 0.16;  // base world-unit glyph height
const WORLD_H    = 16;    // vertical sweep range per column
const ATLAS_PX   = 64;

// Spherical shell around globe (radius 1.0)
// Camera orbits at ~3.0, columns must extend well past that
const R_MIN      = 1.06;
const R_MAX      = 6.0;

// ── Glyph atlas ───────────────────────────────────────────────
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
  ctx.font = `${Math.round(px * 0.84)}px "Share Tech Mono", "Courier New", monospace`;

  GLYPHS.forEach((g, i) => ctx.fillText(g, px / 2, px * i + px / 2));

  const tex        = new THREE.CanvasTexture(c);
  tex.flipY        = false;
  tex.minFilter    = THREE.LinearMipMapLinearFilter;
  tex.magFilter    = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return { tex, count: n, canvas: c, ctx };
}

// ── InstancedBufferGeometry ───────────────────────────────────
// Per-column: position on sphere, speed, seed, Y offset, scale, brightness, trail length
function buildGeometry() {
  const geom = new THREE.InstancedBufferGeometry();
  const base = new THREE.PlaneGeometry(1, 1);
  geom.index = base.index.clone();
  geom.setAttribute('position', base.getAttribute('position').clone());
  geom.setAttribute('uv',       base.getAttribute('uv').clone());
  base.dispose();

  const total     = N_COLS * N_ROWS;
  const colBuf    = new Float32Array(total);
  const rowBuf    = new Float32Array(total);
  // Pack 3D world position per column (spherical shell placement)
  const wxBuf     = new Float32Array(total);
  const wzBuf     = new Float32Array(total);
  const spdBuf    = new Float32Array(total);
  const seedBuf   = new Float32Array(total);
  const yOffBuf   = new Float32Array(total);
  const scaleBuf  = new Float32Array(total);  // per-column glyph scale
  const alphaBuf  = new Float32Array(total);  // per-column brightness
  const trailBuf  = new Float32Array(total);  // per-column trail decay rate

  for (let c = 0; c < N_COLS; c++) {
    // Spherical shell: uniform distribution on sphere surface
    const theta = Math.random() * Math.PI * 2;           // azimuth 0..2π
    const cosP  = 1 - 2 * Math.random();                 // cos(phi) uniform -1..1
    const sinP  = Math.sqrt(1 - cosP * cosP);

    // Radius: strongly biased toward outer shell (4–6 range)
    const t      = Math.pow(Math.random(), 0.25);
    const radius = R_MIN + t * (R_MAX - R_MIN);

    const wx = sinP * Math.cos(theta) * radius;
    const wz = sinP * Math.sin(theta) * radius;

    // Y offset from sphere surface position + extra random scatter
    const yBase  = cosP * radius;
    const yOff   = yBase + (Math.random() - 0.5) * 2.0;

    const speed  = 0.6 + Math.random() * 2.8;            // 0.6 – 3.4
    const seed   = Math.random();
    const scale  = 0.5 + Math.random() * 1.0;            // 0.5 – 1.5× size
    const alpha  = 0.15 + Math.random() * 0.7;           // 0.15 – 0.85 brightness (wider variance)
    const trail  = 0.03 + Math.random() * 0.12;          // 0.03 – 0.15 decay rate (slow fade)

    for (let r = 0; r < N_ROWS; r++) {
      const idx = c * N_ROWS + r;
      colBuf[idx]   = c;
      rowBuf[idx]   = r;
      wxBuf[idx]    = wx;
      wzBuf[idx]    = wz;
      spdBuf[idx]   = speed;
      seedBuf[idx]  = seed;
      yOffBuf[idx]  = yOff;
      scaleBuf[idx] = scale;
      alphaBuf[idx] = alpha;
      trailBuf[idx] = trail;
    }
  }

  geom.setAttribute('aColIdx',  new THREE.InstancedBufferAttribute(colBuf, 1));
  geom.setAttribute('aRowIdx',  new THREE.InstancedBufferAttribute(rowBuf, 1));
  geom.setAttribute('aWX',      new THREE.InstancedBufferAttribute(wxBuf, 1));
  geom.setAttribute('aWZ',      new THREE.InstancedBufferAttribute(wzBuf, 1));
  geom.setAttribute('aSpeed',   new THREE.InstancedBufferAttribute(spdBuf, 1));
  geom.setAttribute('aSeed',    new THREE.InstancedBufferAttribute(seedBuf, 1));
  geom.setAttribute('aYOff',    new THREE.InstancedBufferAttribute(yOffBuf, 1));
  geom.setAttribute('aScale',   new THREE.InstancedBufferAttribute(scaleBuf, 1));
  geom.setAttribute('aAlpha',   new THREE.InstancedBufferAttribute(alphaBuf, 1));
  geom.setAttribute('aTrail',   new THREE.InstancedBufferAttribute(trailBuf, 1));
  geom.instanceCount = total;
  return geom;
}

// ── Vertex shader ─────────────────────────────────────────────
const VERT = /* glsl */`
precision highp float;

attribute float aColIdx;
attribute float aRowIdx;
attribute float aWX;
attribute float aWZ;
attribute float aSpeed;
attribute float aSeed;
attribute float aYOff;
attribute float aScale;
attribute float aAlpha;
attribute float aTrail;

uniform float uTime;
uniform float uCellW;
uniform float uCellH;
uniform float uWorldH;
uniform float uNRows;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;

void main() {
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;
  vAlpha  = aAlpha;
  vTrail  = aTrail;

  // Static world-Y of this cell, offset per column
  float cellY = aYOff + uWorldH * 0.5 - aRowIdx * uCellH * aScale;

  // Illumination head sweeps down
  float cycleH = uWorldH + uNRows * uCellH * aScale;
  float headY  = aYOff + uWorldH * 0.5 - mod(uTime * aSpeed + aSeed * cycleH, cycleH);

  vDist = (cellY - headY) / (uCellH * aScale);

  // Cull cells ahead of the head or far enough behind that decay is invisible
  // No hard wall — the exponential trail handles the fadeout
  if (vDist < -0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  // Conservative GPU cull: exp(-70 * 0.03) ≈ 0.12 — still let frag shader decide
  if (vDist > uNRows * 1.2) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Transform column center to view space
  vec4 viewCenter = modelViewMatrix * vec4(aWX, cellY, aWZ, 1.0);

  // Depth-scaled billboard with per-column scale
  float depthScale = clamp(-viewCenter.z / 3.0, 0.3, 3.0);
  float s = aScale * depthScale;
  viewCenter.xy += position.xy * vec2(uCellW, uCellH) * s;

  gl_Position = projectionMatrix * viewCenter;
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

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;

float h2(vec2 v) {
  return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // Per-column trail decay — smooth exponential fade, no hard cutoff
  float trail = exp(-max(vDist, 0.0) * vTrail);
  if (trail < 0.005) discard;

  // Glyph identity with flicker
  float proximity = 1.0 - clamp(vDist / 6.0, 0.0, 1.0);
  float rate      = 1.0 + proximity * 3.0 + h2(vec2(vColIdx, 0.5)) * 2.0;
  float tick      = floor(uTime * rate);
  float glyphIdx  = floor(
    h2(vec2(vColIdx * 0.37 + tick * 0.11, vRowIdx * 0.73 + tick * 0.07)) * uGlyphCount
  );

  // Sample atlas
  float atlasV = (glyphIdx + (1.0 - vUv.y)) / uGlyphCount;
  float mask   = texture2D(uGlyphTex, vec2(vUv.x, atlasV)).r;
  if (mask < 0.05) discard;

  // Color: head → white; trail → theme color
  float headFrac = 1.0 - smoothstep(0.0, 1.5, vDist);
  vec3  col      = mix(uColor * 1.4, vec3(1.0, 1.0, 1.0), headFrac);

  // Per-column brightness variation
  float alpha = trail * mask * vAlpha * 1.1;
  gl_FragColor = vec4(col * alpha, alpha);
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

  const { color = '#00ff70', opacity = 1.0, syncCamera = null } = opts;
  const rgb = new THREE.Color(color);

  const atlas    = buildAtlas();
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(element.clientWidth || 1, element.clientHeight || 1);

  const canvas = renderer.domElement;
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:0;mix-blend-mode:screen;';
  canvas.style.opacity = String(opacity);
  element.appendChild(canvas);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    (element.clientWidth || 1) / (element.clientHeight || 1),
    0.1, 60
  );
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  // Invisible occluder sphere — matches globe radius so rain behind the globe
  // is depth-tested away. Renders first (renderOrder 0), writes depth only.
  const occluderGeo = new THREE.SphereGeometry(1.0, 32, 32);
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest:  true,
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 0;
  scene.add(occluder);

  const geom = buildGeometry();

  const uniforms = {
    uGlyphTex:   { value: atlas.tex },
    uGlyphCount: { value: atlas.count },
    uTime:       { value: 0 },
    uCellW:      { value: CELL_W },
    uCellH:      { value: CELL_H },
    uWorldH:     { value: WORLD_H },
    uNRows:      { value: N_ROWS },
    uColor:      { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
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
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  scene.add(mesh);

  const s = { renderer, material, geom, atlas, occluderGeo, occluderMat, ro: null, animId: 0, syncCamera };
  _state.set(element, s);

  function animate(ts) {
    s.animId = requestAnimationFrame(animate);
    uniforms.uTime.value = ts * 0.001;
    if (s.syncCamera) {
      camera.position.copy(s.syncCamera.position);
      camera.quaternion.copy(s.syncCamera.quaternion);
      camera.fov  = s.syncCamera.fov;
      camera.near = s.syncCamera.near;
      camera.far  = s.syncCamera.far;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
  }
  s.animId = requestAnimationFrame(animate);

  s.ro = new ResizeObserver(() => {
    const w = element.clientWidth  || 1;
    const h = element.clientHeight || 1;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  s.ro.observe(element);

  document.fonts.ready.then(() => {
    const st = _state.get(element);
    if (!st) return;
    const { tex, canvas: ac, ctx } = atlas;
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
  s.occluderGeo.dispose();
  s.occluderMat.dispose();
  s.atlas.tex.dispose();
  s.renderer.dispose();
  s.renderer.domElement.remove();
  _state.delete(element);
}
