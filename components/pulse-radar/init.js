/**
 * components/pulse-radar/init.js
 * Public API: initRadar, destroyRadar, refreshRadarTheme.
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }     from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass }     from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { RadarHoloShader } from './shaders.js';
import { _state, _readTheme, _c3, TAU, POOL_SIZE, toggleSonarMute } from './utils.js';
import { _rebuildGeometry } from './geometry.js';
import { _freeSlot, _scheduleNextSpawn, _addContact } from './contacts.js';
import { _tick } from './update.js';

/**
 * Initialise a pulse-radar inside `element`.
 * @param {HTMLElement} element            - Host element (sized by CSS)
 * @param {Object}      [opts={}]
 * @param {number}  [opts.sweepPeriod=2690]     full-revolution time in ms
 * @param {number}  [opts.contactDensity=0.5]   spawn rate multiplier [0, 1]
 * @param {number}  [opts.threatLevel=0]         hostile probability    [0, 1]
 * @param {string}  [opts.primaryColor=null]     override neon-cyan colour
 * @param {number}  [opts.maxContacts=16]        pool ceiling [4, 32]
 * @returns {{ setRadarThreatLevel: Function, injectContact: Function }}
 */
export function initRadar(element, opts = {}) {
  if (_state.has(element)) {
    console.warn('[pulse-radar] already initialised');
    const s = _state.get(element);
    return { setRadarThreatLevel: s.setRadarThreatLevel, injectContact: s.injectContact };
  }

  const options = {
    sweepPeriod:    2690,
    contactDensity: Math.max(0,    Math.min(1,     opts.contactDensity ?? 0.5)),
    threatLevel:    Math.max(0,    Math.min(1,     opts.threatLevel    ?? 0)),
    primaryColor:   opts.primaryColor ?? null,
    maxContacts:    Math.max(4,    Math.min(POOL_SIZE, opts.maxContacts ?? 16)),
  };

  const theme = _readTheme();

  // ── DOM ──
  const canvas    = document.createElement('canvas');
  canvas.className = 's9-radar__canvas';
  const overlay   = document.createElement('div');
  overlay.className = 's9-radar__overlay';
  const labelsDiv = document.createElement('div');
  labelsDiv.className = 's9-radar__labels';
  overlay.appendChild(labelsDiv);
  element.appendChild(canvas);
  element.appendChild(overlay);

  // ── Click to toggle sonar mute ──
  element.style.cursor = 'pointer';
  element.addEventListener('click', () => { toggleSonarMute(); });

  // ── Renderer ──
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, premultipliedAlpha: false });
  } catch (e) {
    console.error('[pulse-radar] WebGL context creation failed', e);
    canvas.remove(); overlay.remove();
    const noop = () => {};
    return { setRadarThreatLevel: noop, injectContact: () => '' };
  }
  renderer.setClearColor(new THREE.Color(theme.voidColor), 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  // ── Post-processing ──
  const composer  = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(element.clientWidth || 200, element.clientHeight || 200),
    0.80,  // strength
    0.65,  // radius
    0.25,  // threshold
  );
  composer.addPass(bloomPass);
  const holoPass = new ShaderPass(RadarHoloShader);
  composer.addPass(holoPass);

  const state = {
    element,  canvas,  overlay,  labelsDiv,
    renderer, scene,   camera,
    opts:            options,
    theme,
    R:               0,
    sweepAngle:      Math.random() * TAU,
    sweepSpeed:      TAU / (options.sweepPeriod / 1000),
    ringPopDuration: (options.sweepPeriod / 1000) - 0.50,
    threatLevel:     options.threatLevel,
    contacts:        new Array(POOL_SIZE).fill(null),
    dummy:           new THREE.Object3D(),
    footerEl:        document.getElementById('radar-contacts'),
    staticLabelEls:  [],
    staticActive:    false,
    staticNextAt:    null,
    staticEndAt:     null,
    rafId:           null,
    rafRunning:      false,
    destroyed:       false,
    reducedMotion:   matchMedia('(prefers-reduced-motion: reduce)').matches,
    centerGlowIntensity: 0,
    centerGlowMesh:  null,
    composer,  bloomPass,  holoPass,
    backgroundMesh:  null,  ringMeshes:      null,  ticksMesh:       null,
    sweepTrailMesh:  null,  sweepArmLine:    null,
    contactDotsMesh: null,  contactRingsMesh: null,
    matRingInner:    null,  matRingOuter:    null,  matRingTicks: null,
    spawnTimer:      null,
    lastTs:          null,
    now:             performance.now(),
    resizeObserver:  null,  intersectionObserver: null,
    _motionMq:       null,  _motionHandler:  null,
    setRadarThreatLevel: null,
    injectContact:       null,
  };

  state.ringHzBase = 1.0 / state.ringPopDuration;
  _state.set(element, state);

  // ── Boot animation ──
  const panel = element.closest('.s9-panel');
  if (panel) {
    panel.classList.add('s9-panel--booting');
    panel.addEventListener('animationend', () => panel.classList.remove('s9-panel--booting'), { once: true });
  }

  // ── ResizeObserver ──
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width: w, height: h } = entry.contentRect;
      if (w === 0 || h === 0) return;
      const R = Math.floor(Math.min(w, h) / 2) - 8;
      if (R <= 0) return;
      state.R = R;
      camera.left   = -R; camera.right  =  R;
      camera.top    =  R; camera.bottom = -R;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      state.composer.setSize(w, h);
      if (state.bloomPass) state.bloomPass.resolution.set(w, h);
      _rebuildGeometry(state);
    }
  });
  ro.observe(element);
  state.resizeObserver = ro;

  // ── IntersectionObserver (pause RAF when off-screen) ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      state.rafRunning = entry.isIntersecting;
      if (state.rafRunning && !state.rafId) {
        state.rafId = requestAnimationFrame(ts => _tick(state, ts));
      }
    });
  }, { threshold: 0 });
  io.observe(element);
  state.intersectionObserver = io;

  // ── prefers-reduced-motion ──
  const motionMq      = matchMedia('(prefers-reduced-motion: reduce)');
  const motionHandler = () => {
    state.reducedMotion = motionMq.matches;
    if (state.reducedMotion) {
      state.sweepAngle = Math.PI * 0.15;
      clearTimeout(state.spawnTimer);
    } else {
      _scheduleNextSpawn(state);
    }
  };
  motionMq.addEventListener('change', motionHandler);
  state._motionMq      = motionMq;
  state._motionHandler = motionHandler;

  // ── Start ──
  state.rafRunning = true;
  state.rafId = requestAnimationFrame(ts => _tick(state, ts));
  if (!state.reducedMotion) _scheduleNextSpawn(state);

  // ── Control surface ──
  function setRadarThreatLevel(level) {
    const t = Math.max(0, Math.min(1, level));
    state.threatLevel = t;
    // Sweep speed is fixed — only spawn rate responds to threat level
    clearTimeout(state.spawnTimer);
    _scheduleNextSpawn(state);
  }

  function injectContact(angle, range, type) {
    const validType = ['friendly', 'neutral', 'hostile'].includes(type) ? type : 'neutral';
    const c = _addContact(state, angle, Math.max(0, Math.min(1, range)), validType);
    return c ? c.id : '';
  }

  state.setRadarThreatLevel = setRadarThreatLevel;
  state.injectContact       = injectContact;

  return { setRadarThreatLevel, injectContact };
}

/** Tear down renderer, RAF, timers, observers. Removes canvas + overlay from DOM. */
export function destroyRadar(element) {
  const state = _state.get(element);
  if (!state) { console.warn('[pulse-radar] not initialised or already destroyed'); return; }

  state.destroyed = true;
  if (state.rafId) cancelAnimationFrame(state.rafId);
  clearTimeout(state.spawnTimer);
  state.resizeObserver?.disconnect();
  state.intersectionObserver?.disconnect();
  state._motionMq?.removeEventListener('change', state._motionHandler);

  // Free all contacts (removes label spans)
  for (let i = 0; i < POOL_SIZE; i++) { if (state.contacts[i]) _freeSlot(state, i); }
  state.staticLabelEls.forEach(el => el.remove());

  // Dispose Three.js scene
  state.scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  });
  if (state.holoPass) state.holoPass.material.dispose();
  if (state.composer) state.composer.dispose();
  state.renderer.dispose();
  state.canvas.remove();
  state.overlay.remove();
  _state.delete(element);
}

/** Re-read CSS vars → update material uniforms. Call after applyTheme(). */
export function refreshRadarTheme(element) {
  const state = _state.get(element);
  if (!state) return;
  const theme = _readTheme();
  state.theme = theme;

  const c0 = _c3(theme.neonGreen);
  const c1 = _c3(theme.neonWarn);
  const c2 = _c3(theme.neonAlert);
  const c3 = _c3(theme.neonCyan);
  const cc = new THREE.Color(theme.neonCyan);

  if (state.backgroundMesh) {
    const vc = new THREE.Color(theme.voidColor);
    state.backgroundMesh.material.uniforms.uVoidColor.value.set(vc.r, vc.g, vc.b);
    state.renderer.setClearColor(new THREE.Color(theme.voidColor), 1);
  }
  if (state.matRingInner) state.matRingInner.color.set(theme.neonCyan);
  if (state.matRingOuter) state.matRingOuter.color.set(theme.neonCyan);
  if (state.matRingTicks) state.matRingTicks.color.set(theme.neonCyan);
  if (state.sweepTrailMesh) {
    const u = state.sweepTrailMesh.material.uniforms.uColor.value;
    u.set(cc.r, cc.g, cc.b);
  }
  if (state.sweepArmLine) state.sweepArmLine.material.color.set(theme.neonCyan);
  if (state.contactDotsMesh) {
    const u = state.contactDotsMesh.material.uniforms;
    u.uC0.value.set(...c0); u.uC1.value.set(...c1);
    u.uC2.value.set(...c2); u.uC3.value.set(...c3);
  }
  if (state.contactRingsMesh) {
    const u = state.contactRingsMesh.material.uniforms;
    u.uC0.value.set(...c0); u.uC1.value.set(...c1); u.uC2.value.set(...c2);
  }
}
