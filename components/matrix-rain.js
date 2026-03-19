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
import { FXAAShader }      from 'three/addons/shaders/FXAAShader.js';
import {
  VERT, FRAG,
  RainPhosphorShader, RainHoloShader, RainHeatShader,
  RainStreakShader, RainSoftenShader, RainGodRaysShader,
} from './matrix-rain-shaders.js';

// ── Glyph set (Matrix-Code.ttf — Rezmason/matrix, MIT license) ──
const GLYPHS = [
  ...'アウエオカキケコサシスセソタツテナニヌネ',
  ...'ハヒホマミムメモヤヨラリワー',
  ...'012345789z',
  ...':."*+<>|¦╌▪꞊',
];
const ATLAS_COLS = 8;   // columns in the MSDF grid atlas
const ATLAS_GRID = 8;   // 8×8 cell grid (512×512px, 64px per cell)

// ── Scene constants ───────────────────────────────────────────
const N_COLS     = 600;
const N_ROWS     = 120;   // max trail length — long fading tails
const CELL_W     = 0.12;  // base world-unit glyph width
const CELL_H     = 0.08;  // base world-unit glyph height
const WORLD_H    = 16;    // vertical sweep range per column

// Spherical shell around globe (radius 1.0)
// Camera orbits at ~3.0, columns must extend well past that
const R_MIN      = 3.5;
const R_MAX      = 8.0;

// ── Pre-baked MSDF glyph atlas (8×8 grid, 64px per cell, RGB channels) ──
function loadMSDF(path) {
  const tex = new THREE.TextureLoader().load(path);
  tex.flipY        = false;
  tex.minFilter    = THREE.LinearMipMapLinearFilter;
  tex.magFilter    = THREE.LinearFilter;
  tex.colorSpace   = THREE.LinearSRGBColorSpace; // distance data, not colour
  tex.generateMipmaps = true;
  return { tex, count: GLYPHS.length };
}

// ── InstancedBufferGeometry ───────────────────────────────────
// Packed attributes: aColA = (wx, wz, speed, seed), aColB = (yOff, scale, alpha, trail)
function buildGeometry() {
  const geom = new THREE.InstancedBufferGeometry();
  const base = new THREE.PlaneGeometry(1, 1);
  geom.index = base.index.clone();
  geom.setAttribute('position', base.getAttribute('position').clone());
  geom.setAttribute('uv',       base.getAttribute('uv').clone());
  base.dispose();

  const total    = N_COLS * N_ROWS;
  const colBuf   = new Float32Array(total);
  const rowBuf   = new Float32Array(total);
  const colABuf  = new Float32Array(total * 4);  // vec4(wx, wz, speed, seed)
  const colBBuf  = new Float32Array(total * 4);  // vec4(yOff, scale, alpha, trail)

  for (let c = 0; c < N_COLS; c++) {
    const theta = Math.random() * Math.PI * 2;
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
    const alpha  = 0.18 + Math.random() * 0.72;          // 0.18 – 0.90 brightness
    const trail  = 0.015 + Math.random() * 0.035;          // 0.015 – 0.05 decay rate

    for (let r = 0; r < N_ROWS; r++) {
      const idx = c * N_ROWS + r;
      colBuf[idx] = c;
      rowBuf[idx] = r;
      const i4 = idx * 4;
      colABuf[i4]     = wx;
      colABuf[i4 + 1] = wz;
      colABuf[i4 + 2] = speed;
      colABuf[i4 + 3] = seed;
      colBBuf[i4]     = yOff;
      colBBuf[i4 + 1] = scale;
      colBBuf[i4 + 2] = alpha;
      colBBuf[i4 + 3] = trail;
    }
  }

  geom.setAttribute('aColIdx',  new THREE.InstancedBufferAttribute(colBuf, 1));
  geom.setAttribute('aRowIdx',  new THREE.InstancedBufferAttribute(rowBuf, 1));
  geom.setAttribute('aColA',    new THREE.InstancedBufferAttribute(colABuf, 4));
  geom.setAttribute('aColB',    new THREE.InstancedBufferAttribute(colBBuf, 4));
  geom.instanceCount = total;
  return geom;
}

// ── Post-processing pipeline ──────────────────────────────────
function buildPostProcessingPipeline(renderer, scene, camera, element) {
  const w = element.clientWidth  || 1;
  const h = element.clientHeight || 1;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    1.15,  // strength — amplify glyph glow
    0.45,  // radius — tight halos, not diffuse smear
    0.20   // threshold — focused on head glyphs and flashes
  );
  composer.addPass(bloomPass);

  // Heat distortion — UV warp driven by brightness, after bloom
  const heatPass = new ShaderPass(RainHeatShader);
  heatPass.enabled = true;
  composer.addPass(heatPass);

  // Phosphor persistence — temporal feedback for ghost trails
  // Placed before soften so ghost trails receive exactly one soften pass per frame
  // (avoids compounding blur from soften → phosphor retain → soften again)
  const drawSize = renderer.getDrawingBufferSize(new THREE.Vector2());
  let phosphorTex = new THREE.FramebufferTexture(drawSize.x, drawSize.y);
  const phosphorPass = new ShaderPass(RainPhosphorShader);
  phosphorPass.uniforms.tPrev.value = phosphorTex;

  // Override render to capture output into feedback texture for next frame
  const _phosphorRender = phosphorPass.render.bind(phosphorPass);
  phosphorPass.render = function(rdr, writeBuffer, readBuffer, dt, mask) {
    this.uniforms.tPrev.value = phosphorTex;
    _phosphorRender(rdr, writeBuffer, readBuffer, dt, mask);
    // writeBuffer is still the active render target after super.render()
    rdr.copyFramebufferToTexture(phosphorTex);
  };
  composer.addPass(phosphorPass);

  const softenPass = new ShaderPass(RainSoftenShader);
  softenPass.enabled = true;
  softenPass.uniforms.uBlurStrength.value = 0.002;
  composer.addPass(softenPass);

  // Lens rain streaks — before holo so vignette applies to streaks too
  const streakPass = new ShaderPass(RainStreakShader);
  streakPass.enabled = true;
  streakPass.uniforms.uAspect.value = w / h;
  composer.addPass(streakPass);

  const holoPass = new ShaderPass(RainHoloShader);
  composer.addPass(holoPass);

  // God rays — screen-space crepuscular rays from configurable light position
  const godRaysPass = new ShaderPass(RainGodRaysShader);
  godRaysPass.uniforms.uLightPos.value = new THREE.Vector2(0.5, 0.75);
  godRaysPass.enabled = true;
  composer.addPass(godRaysPass);

  // FXAA — resolves sub-pixel edge jitter on distant glyph strokes
  const fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = renderer.getPixelRatio();
  fxaaPass.uniforms.resolution.value.set(1 / (w * pixelRatio), 1 / (h * pixelRatio));
  composer.addPass(fxaaPass);
  // OutputPass intentionally omitted: it forces alpha=1 on every pixel, which would
  // make the transparent canvas opaque and occlude the globe behind it.

  return { composer, bloomPass, heatPass, phosphorPass, phosphorTex, softenPass, streakPass, holoPass, godRaysPass, fxaaPass };
}

// ── State registry ────────────────────────────────────────────
const _state = new Map();

// ── Public API ────────────────────────────────────────────────

/**
 * @param {HTMLElement} element
 * @param {object}      opts
 * @param {string}  [opts.color='#00ff70']
 * @param {number}  [opts.opacity=0.82]
 */
export function initMatrixRain(element, opts = {}) {
  // Guard against double-init from both normal calls and HMR re-evaluation
  // (module-scoped _state is reset on hot reload, so also check the DOM).
  if (_state.has(element)) destroyMatrixRain(element);
  const staleCanvas = element.querySelector('canvas[data-matrix-rain]');
  if (staleCanvas) staleCanvas.remove();

  const { color = '#00ff70', opacity = 0.82, syncCamera = null } = opts;
  const rgb = new THREE.Color(color);

  const atlas = loadMSDF('/data/matrixcode_msdf.png');
  // alpha:true preserves transparent background — mix-blend-mode:screen on the canvas
  // composites glyphs additively over the globe while background stays transparent.
  // (alpha:false + screen blend would work mathematically but OutputPass/EffectComposer
  // intermediate passes force alpha=1, making the canvas opaque and occluding the globe.)
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(element.clientWidth || 1, element.clientHeight || 1);

  const canvas = renderer.domElement;
  // No CSS filter — bloom + holo pass handle all glow/aberration GPU-side
  canvas.dataset.matrixRain = '1';
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:0;';
  element.appendChild(canvas);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    (element.clientWidth || 1) / (element.clientHeight || 1),
    0.1, 60
  );
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  const geom = buildGeometry();

  const uniforms = {
    uGlyphTex:    { value: atlas.tex },
    uGlyphCount:  { value: atlas.count },
    uAtlasCols:   { value: ATLAS_COLS },
    uAtlasGrid:   { value: ATLAS_GRID },
    uTime:        { value: 0 },
    uCellW:       { value: CELL_W },
    uCellH:       { value: CELL_H },
    uWorldH:      { value: WORLD_H },
    uNRows:       { value: N_ROWS },
    uColor:       { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
    uGlobalAlpha: { value: opacity },
    uDepth:          { value: 0.04 },
    uPomSteps:       { value: 6.0 },
    uNormalStrength: { value: 6.0 },
    uLightDir:       { value: new THREE.Vector3(-0.4, 0.8, 0.5).normalize() },
    uGlobeInteract:  { value: 1.0 },
    uGlyphChroma:    { value: 1.0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent:        true,
    depthWrite:         false,
    // Additive RGB — order-independent, no z-sort artifacts on unsorted instanced quads.
    // OneMinusSrcAlpha caused hard-edged cutouts where overlapping quads rendered in
    // wrong draw order. Additive simply sums glyph light contributions naturally.
    // MaxEquation for alpha prevents accumulation that corrupts the globe composite.
    blending:           THREE.CustomBlending,
    blendEquation:      THREE.AddEquation,
    blendSrc:           THREE.OneFactor,
    blendDst:           THREE.OneFactor,
    blendEquationAlpha: THREE.MaxEquation,
    blendSrcAlpha:      THREE.OneFactor,
    blendDstAlpha:      THREE.OneFactor,
    side:               THREE.DoubleSide,
    extensions:         { derivatives: true },
  });

  const mesh = new THREE.Mesh(geom, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  scene.add(mesh);

  let { composer, bloomPass, heatPass, phosphorPass, phosphorTex,
        softenPass, streakPass, holoPass, godRaysPass, fxaaPass } =
    buildPostProcessingPipeline(renderer, scene, camera, element);

  const s = {
    renderer, composer, bloomPass, heatPass, softenPass, phosphorPass, phosphorTex,
    holoPass, streakPass, godRaysPass, fxaaPass, material, geom, atlas, ro: null, animId: 0,
    syncCamera, burstBloomEnabled: true,
  };
  _state.set(element, s);

  let prevTs = 0;
  let burstBloomTimer = 0.0;
  let lastBurstBucket = -1;

  function animate(ts) {
    s.animId = requestAnimationFrame(animate);
    const t  = ts * 0.001;
    const dt = t - prevTs;
    prevTs   = t;

    uniforms.uTime.value            = t;
    holoPass.uniforms.time.value    = t;
    heatPass.uniforms.uTime.value   = t;
    streakPass.uniforms.uTime.value = t;

    // ── Depth-adaptive bloom threshold — pulse during burst cycles ──
    if (s.burstBloomEnabled) {
      const burstBucket = Math.floor(t / 4.0);
      if (burstBucket !== lastBurstBucket) {
        lastBurstBucket = burstBucket;
        burstBloomTimer = 0.30;
      }
      if (burstBloomTimer > 0.0) {
        burstBloomTimer = Math.max(0.0, burstBloomTimer - dt);
        const surgePhase = 1.0 - burstBloomTimer / 0.30;
        bloomPass.threshold = surgePhase < 0.2
          ? THREE.MathUtils.lerp(0.20, 0.10, surgePhase / 0.2)
          : THREE.MathUtils.lerp(0.10, 0.20, (surgePhase - 0.2) / 0.8);
      } else {
        bloomPass.threshold = 0.20;
      }
    } else {
      bloomPass.threshold = 0.20;
    }

    if (s.syncCamera) {
      camera.position.copy(s.syncCamera.position);
      camera.quaternion.copy(s.syncCamera.quaternion);
      camera.fov  = s.syncCamera.fov;
      camera.near = s.syncCamera.near;
      camera.far  = s.syncCamera.far;
      camera.updateProjectionMatrix();
    }
    // Rotate light to track camera azimuth + 60° offset
    if (camera.position.lengthSq() > 0.001) {
      const az = Math.atan2(camera.position.x, camera.position.z) + Math.PI / 3;
      uniforms.uLightDir.value.set(
        Math.sin(az) * 0.6, 0.8, Math.cos(az) * 0.6
      ).normalize();
    }
    s.composer.render();
  }
  s.animId = requestAnimationFrame(animate);

  // RAF-debounced resize — prevents redundant setSize calls during drag-resize
  let resizePending = false;
  s.ro = new ResizeObserver(() => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      const w = element.clientWidth  || 1;
      const h = element.clientHeight || 1;
      renderer.setSize(w, h);
      s.composer.setSize(w, h);
      s.bloomPass.resolution.set(w, h);
      const pr = renderer.getPixelRatio();
      s.fxaaPass.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
      s.streakPass.uniforms.uAspect.value = w / h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Recreate phosphor feedback texture at new size
      const ds = renderer.getDrawingBufferSize(new THREE.Vector2());
      s.phosphorTex.dispose();
      phosphorTex = new THREE.FramebufferTexture(ds.x, ds.y);
      s.phosphorTex = phosphorTex;
    });
  });
  s.ro.observe(element);

  return {
    destroy()     { destroyMatrixRain(element); },
    setColor(hex) {
      const c = new THREE.Color(hex);
      uniforms.uColor.value.set(c.r, c.g, c.b);
    },
    setOpacity(v) { uniforms.uGlobalAlpha.value = v; },
    setDepth(v) { uniforms.uDepth.value = v; },
    setNormalStrength(v) { uniforms.uNormalStrength.value = v; },
    setSoften(on, strength) {
      softenPass.enabled = on;
      if (strength !== undefined) softenPass.uniforms.uBlurStrength.value = strength;
    },
    setHeat(on, amt) {
      heatPass.enabled = on;
      if (amt !== undefined) heatPass.uniforms.uHeatAmt.value = amt;
    },
    setStreaks(on, amt) {
      streakPass.enabled = on;
      if (amt !== undefined) streakPass.uniforms.uStreakAmt.value = amt;
    },
    setBurstBloom(on) { s.burstBloomEnabled = on; },
    setGlobeInteract(on) { uniforms.uGlobeInteract.value = on ? 1.0 : 0.0; },
    setGlyphChroma(on, scale) { uniforms.uGlyphChroma.value = on ? (scale ?? 1.0) : 0.0; },
    /**
     * @param {boolean} enabled
     * @param {number}  [lightX]   0–1 screen UV X of light source
     * @param {number}  [lightY]   0–1 screen UV Y of light source
     * @param {number}  [density]  0–1 ray spacing scalar
     * @param {number}  [decay]    0–1 per-sample decay
     * @param {number}  [weight]   0–1 per-sample weight
     * @param {number}  [exposure] 0–2 final exposure
     */
    setGodRays(enabled, lightX, lightY, density, decay, weight, exposure) {
      godRaysPass.uniforms.uEnabled.value = enabled ? 1.0 : 0.0;
      if (lightX    !== undefined) godRaysPass.uniforms.uLightPos.value.x = lightX;
      if (lightY    !== undefined) godRaysPass.uniforms.uLightPos.value.y = lightY;
      if (density   !== undefined) godRaysPass.uniforms.uDensity.value  = density;
      if (decay     !== undefined) godRaysPass.uniforms.uDecay.value    = decay;
      if (weight    !== undefined) godRaysPass.uniforms.uWeight.value   = weight;
      if (exposure  !== undefined) godRaysPass.uniforms.uExposure.value = exposure;
    },
  };
}

export function destroyMatrixRain(element) {
  const s = _state.get(element);
  if (!s) return;
  cancelAnimationFrame(s.animId);
  s.ro.disconnect();
  if (s.holoPass) s.holoPass.material.dispose();
  if (s.phosphorPass) s.phosphorPass.material.dispose();
  if (s.phosphorTex) s.phosphorTex.dispose();
  s.composer.dispose();
  s.material.dispose();
  s.geom.dispose();
  s.atlas.tex.dispose();
  s.renderer.dispose();
  s.renderer.domElement.remove();
  _state.delete(element);
}
