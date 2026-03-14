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
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';

// ── Glyph set (Matrix-Code.ttf — Rezmason/matrix, MIT license) ──
const GLYPHS = [
  ...'アウエオカキケコサシスセソタツテナニヌネ',
  ...'ハヒホマミムメモヤヨラリワー',
  ...'012345789z',
  ...':."*+<>|¦╌▪꞊',
];
const ATLAS_PX = 96;  // canvas pixels per glyph cell

// ── RainHoloShader ────────────────────────────────────────────
// Post-process pass mirroring the threat-map HoloShader:
//   chromatic aberration (edge-weighted) + scanlines + vignette.
// mix-blend-mode:screen on the canvas makes the black background invisible,
// so bloom and holo effects work cleanly without alpha compositing issues.

const RainHoloShader = {
  uniforms: {
    tDiffuse:         { value: null },
    time:             { value: 0.0 },
    vignetteStrength: { value: 0.42 },
    scanlineOpacity:  { value: 0.045 },
    aberrationAmt:    { value: 0.0025 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float     time;
    uniform float     vignetteStrength;
    uniform float     scanlineOpacity;
    uniform float     aberrationAmt;
    varying vec2      vUv;
    void main() {
      vec2  ctr    = vUv - 0.5;
      float edgeSq = dot(ctr, ctr) * 4.0;
      float s      = aberrationAmt * edgeSq;
      vec2 uvR = clamp(vUv + ctr * s, 0.001, 0.999);
      vec2 uvB = clamp(vUv - ctr * s, 0.001, 0.999);
      float r = texture2D(tDiffuse, uvR).r;
      float g = texture2D(tDiffuse, vUv ).g;
      float b = texture2D(tDiffuse, uvB ).b;
      vec3 col = vec3(r, g, b);
      float scan = sin(vUv.y * 640.0) * 0.5 + 0.5;
      col *= 1.0 - scanlineOpacity * (1.0 - scan);
      float vig = 1.0 - edgeSq * vignetteStrength;
      col *= vig;
      // Preserve alpha from render target — transparent background stays transparent
      // so mix-blend-mode:screen on the canvas correctly composites over the globe.
      gl_FragColor = vec4(col, texture2D(tDiffuse, vUv).a);
    }
  `,
};

// ── Scene constants ───────────────────────────────────────────
const N_COLS     = 2400;
const N_ROWS     = 70;    // max trail length — long fading tails
const CELL_W     = 0.12;  // base world-unit glyph width
const CELL_H     = 0.08;  // base world-unit glyph height
const WORLD_H    = 16;    // vertical sweep range per column

// Spherical shell around globe (radius 1.0)
// Camera orbits at ~3.0, columns must extend well past that
const R_MIN      = 3.5;
const R_MAX      = 8.0;

// ── Canvas glyph atlas (vertical strip, one glyph per row) ──
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
  ctx.font = `${Math.round(px * 0.78)}px "Matrix-Code", "Share Tech Mono", monospace`;

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

    // Radius: heavily biased toward outer shell (5–6 range)
    const t      = Math.pow(Math.random(), 0.12);
    const radius = R_MIN + t * (R_MAX - R_MIN);

    const wx = sinP * Math.cos(theta) * radius;
    const wz = sinP * Math.sin(theta) * radius;

    // Y offset from sphere surface position + extra random scatter
    const yBase  = cosP * radius;
    const yOff   = yBase + (Math.random() - 0.5) * 2.0;

    const speed  = 0.4 + Math.random() * 1.87;            // 0.4 – 2.27
    const seed   = Math.random();
    const scale  = 0.5 + Math.random() * 1.0;            // 0.5 – 1.5× size
    const alpha  = 0.18 + Math.random() * 0.72;          // 0.18 – 0.90 brightness (higher floor, more visible)
    const trail  = 0.004 + Math.random() * 0.03;           // 0.004 – 0.034 decay rate (ultra long trails)

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
varying float vDepthDim;

float hash(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}

void main() {
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;
  vTrail  = aTrail;

  // Per-column spacing compression: 0–33% tighter
  float spacingFactor = 1.0 - 0.33 * hash(vec2(aColIdx * 0.61, 0.29));
  float cellStep = uCellH * aScale * spacingFactor;

  // Per-glyph Y jitter: nudge upward only (decreases spacing)
  float yJitter = hash(vec2(aColIdx * 0.43, aRowIdx * 0.89)) * 0.16 * cellStep;

  // Per-glyph alpha variation: ±12% of column alpha
  float alphaJitter = 1.0 + (hash(vec2(aColIdx * 0.67, aRowIdx * 0.31)) - 0.5) * 0.24;
  vAlpha = aAlpha * alphaJitter;

  // Static world-Y of this cell, offset per column
  float cellY = aYOff + uWorldH * 0.5 - aRowIdx * cellStep + yJitter;

  // Illumination head sweeps down
  float cycleH = uWorldH + uNRows * cellStep;
  float headY  = aYOff + uWorldH * 0.5 - mod(uTime * aSpeed + aSeed * cycleH, cycleH);

  vDist = (cellY - headY) / cellStep;

  // Cull cells ahead of the head or far enough behind that decay is invisible
  if (vDist < -0.5 || vDist > uNRows * 1.2) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Transform column center to view space
  vec4 viewCenter = modelViewMatrix * vec4(aWX, cellY, aWZ, 1.0);

  // Camera proximity — cull within 1.0 of camera
  float viewDist = -viewCenter.z;  // depth in front of camera
  float sideDist = length(viewCenter.xy);  // lateral distance
  float camDist3D = length(viewCenter.xyz);
  if (camDist3D < 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Proximity fade: sides within 0.8, front (toward globe) within 3.0
  float sideFade  = smoothstep(0.0, 0.8, sideDist);
  float frontFade = (viewDist > 0.0) ? smoothstep(0.0, 3.0, viewDist) : 1.0;
  float proxFade  = sideFade * frontFade;

  // Depth-based brightness: closer = brighter, far = dim
  vDepthDim = clamp(viewDist / 6.0, 0.0, 1.0);
  vDepthDim = (1.0 - vDepthDim * vDepthDim) * proxFade;  // quadratic falloff + proximity fade

  // Per-glyph scale variation: ±10%
  float scaleJitter = 1.0 + (hash(vec2(aColIdx * 0.53, aRowIdx * 0.17)) - 0.5) * 0.20;

  // Depth-scaled billboard with per-column scale + per-glyph variation
  float depthScale = clamp(viewDist / 3.0, 0.3, 3.0);
  float s = aScale * scaleJitter * depthScale;
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
uniform float     uGlobalAlpha;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;
varying float vDepthDim;

// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}

void main() {
  // Per-column trail decay — smooth exponential fade, no hard cutoff
  float trail = exp(-max(vDist, 0.0) * vTrail);
  if (trail < 0.005) discard;

  // Snap to integer — varyings can have interpolation noise across the quad
  vec2 cellId = vec2(floor(vColIdx + 0.5), floor(vRowIdx + 0.5));

  float cellPhase = h2(cellId * 0.37);
  float stability = h2(cellId * 0.91);

  // Hold period in seconds (refresh-rate independent) — 3.3–11.7s, median ~7.5s
  float holdSec    = 20.0 + h2(cellId * 0.29) * 40.0;
  float changeTick = floor((cellPhase * holdSec + uTime) / holdSec);

  // ~55% of cells are stable — keep base glyph, never change
  float baseGlyph = floor(h2(cellId * 0.47 + 0.5) * uGlyphCount);
  float glyphIdx  = floor(
    h2(cellId * 0.37 + changeTick * vec2(0.11, 0.07)) * uGlyphCount
  );
  glyphIdx = stability < 0.9325 ? baseGlyph : glyphIdx;

  // Vertical strip atlas
  float atlasV = (glyphIdx + (1.0 - vUv.y)) / uGlyphCount;
  float mask   = texture2D(uGlyphTex, vec2(vUv.x, atlasV)).r;
  if (mask < 0.06) discard;

  // Film grain — UV-based so it moves with the geometry, not screen-fixed
  float grain = h2(vec2(
    vUv.x * 47.3 + vUv.y * 31.7 + vColIdx * 0.53,
    uTime * 7.3 + vRowIdx * 0.19
  ));
  grain = (grain - 0.5) * 0.08;

  // High-contrast color: head burns white, trail is deep saturated green
  // baseBrightness equivalent: trail already decays to near-zero,
  // plus depth dimming kills distant cells → dark grid with bright heads
  float headFrac = 1.0 - smoothstep(0.0, 0.8, vDist);
  vec3  col2     = mix(uColor * 1.6, uColor * 3.0 + vec3(0.3), headFrac);
  col2          += grain;

  // Moderate contrast: pow curve adds depth without killing trails
  float rawBright = trail * mask * vAlpha * vDepthDim;
  float contrast  = pow(rawBright, 1.05);
  float alpha     = contrast * uGlobalAlpha;
  gl_FragColor    = vec4(col2 * alpha, alpha);
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

  const { color = '#00ff70', opacity = 0.82, syncCamera = null } = opts;
  const rgb = new THREE.Color(color);

  const atlas = buildAtlas();
  // alpha:true preserves transparent background — mix-blend-mode:screen on the canvas
  // composites glyphs additively over the globe while background stays transparent.
  // (alpha:false + screen blend would work mathematically but OutputPass/EffectComposer
  // intermediate passes force alpha=1, making the canvas opaque and occluding the globe.)
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(element.clientWidth || 1, element.clientHeight || 1);

  const canvas = renderer.domElement;
  // No CSS filter — bloom + holo pass handle all glow/aberration GPU-side
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:0;mix-blend-mode:screen;';
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
    uGlyphTex:    { value: atlas.tex },
    uGlyphCount:  { value: atlas.count },
    uTime:        { value: 0 },
    uCellW:       { value: CELL_W },
    uCellH:       { value: CELL_H },
    uWorldH:      { value: WORLD_H },
    uNRows:       { value: N_ROWS },
    uColor:       { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
    uGlobalAlpha: { value: opacity },
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

  // ── Post-processing pipeline ─────────────────────────────
  const w0 = element.clientWidth  || 1;
  const h0 = element.clientHeight || 1;

  const composer  = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w0, h0),
    1.15,  // strength — amplify glyph glow
    0.45,  // radius — tight halos, not diffuse smear
    0.08   // low threshold — catch dim trail glyphs too
  );
  composer.addPass(bloomPass);

  const holoPass = new ShaderPass(RainHoloShader);
  composer.addPass(holoPass);
  // OutputPass intentionally omitted: it forces alpha=1 on every pixel, which would
  // make the transparent canvas opaque and occlude the globe behind it.

  const s = { renderer, composer, bloomPass, holoPass, material, geom, atlas, occluderGeo, occluderMat, ro: null, animId: 0, syncCamera };
  _state.set(element, s);

  function animate(ts) {
    s.animId = requestAnimationFrame(animate);
    const t = ts * 0.001;
    uniforms.uTime.value       = t;
    holoPass.uniforms.time.value = t;
    if (s.syncCamera) {
      camera.position.copy(s.syncCamera.position);
      camera.quaternion.copy(s.syncCamera.quaternion);
      camera.fov  = s.syncCamera.fov;
      camera.near = s.syncCamera.near;
      camera.far  = s.syncCamera.far;
      camera.updateProjectionMatrix();
    }
    s.composer.render();
  }
  s.animId = requestAnimationFrame(animate);

  s.ro = new ResizeObserver(() => {
    const w = element.clientWidth  || 1;
    const h = element.clientHeight || 1;
    renderer.setSize(w, h);
    s.composer.setSize(w, h);
    s.bloomPass.resolution.set(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  s.ro.observe(element);

  // Rebuild atlas once Matrix-Code font loads for authentic glyphs
  document.fonts.ready.then(() => {
    if (!_state.get(element)) return;
    const { tex, canvas: ac, ctx } = atlas;
    ctx.clearRect(0, 0, ac.width, ac.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ac.width, ac.height);
    ctx.fillStyle    = '#fff';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(ATLAS_PX * 0.78)}px "Matrix-Code", "Share Tech Mono", monospace`;
    GLYPHS.forEach((g, i) => ctx.fillText(g, ATLAS_PX / 2, ATLAS_PX * i + ATLAS_PX / 2));
    tex.needsUpdate = true;
  });

  return {
    destroy()     { destroyMatrixRain(element); },
    setColor(hex) {
      const c = new THREE.Color(hex);
      uniforms.uColor.value.set(c.r, c.g, c.b);
    },
    setOpacity(v) { uniforms.uGlobalAlpha.value = v; },
  };
}

export function destroyMatrixRain(element) {
  const s = _state.get(element);
  if (!s) return;
  cancelAnimationFrame(s.animId);
  s.ro.disconnect();
  if (s.holoPass) s.holoPass.material.dispose();
  s.composer.dispose();
  s.material.dispose();
  s.geom.dispose();
  s.occluderGeo.dispose();
  s.occluderMat.dispose();
  s.atlas.tex.dispose();
  s.renderer.dispose();
  s.renderer.domElement.remove();
  _state.delete(element);
}
