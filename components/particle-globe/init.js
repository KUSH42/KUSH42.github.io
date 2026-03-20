/**
 * Scene initialisation, animation loop, and teardown for the particle-globe component.
 */

import * as THREE from 'three';
import { OrbitControls }    from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }   from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }       from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass }  from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }       from 'three/addons/postprocessing/ShaderPass.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial }     from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 }    from 'three/addons/lines/LineSegments2.js';

import { GLOBE_RADIUS }  from '../threat-map/state.js';
import { _readCSSColors } from '../threat-map/utils.js';
import { HoloShader }    from '../threat-map/shaders.js';

import { DEFAULTS }        from './config.js';
import { createParticleSystem, updateParticles, resizeParticleCount, setFormation } from './particles.js';
import { createLinesSystem, updateLines } from './lines.js';

/** @type {WeakMap<HTMLElement, object>} Module-level state registry keyed by host element */
const _pgState = new WeakMap();

// ── Theme color helpers ───────────────────────────────────────────────────────

/**
 * Parse a CSS color string (hex, e.g. '#00d4b0') into an object with r, g, b (0–1).
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number }}
 */
function _parseCSSColor(hex) {
  const c = new THREE.Color(hex || '#00d4b0');
  return { r: c.r, g: c.g, b: c.b };
}

/**
 * Push updated theme colors into all globe materials and the particle color buffer.
 *
 * @param {object} s     - PGState
 * @param {object} colors - { neonCyan, ... } from _readCSSColors()
 */
function _applyThemeColors(s, colors) {
  const c = new THREE.Color(colors.neonCyan || '#00d4b0');
  const cv = new THREE.Vector3(c.r, c.g, c.b);

  // Globe line materials
  s.globeBackMat.color.copy(c);
  s.globeFrontMat.color.copy(c);
  s.globeGlowMat.color.copy(c);

  // Fresnel rim uniform
  s.rimMesh.material.uniforms.uColor.value.copy(cv);

  // Constellation lines color
  if (s.linesMesh) {
    s.linesMesh.material.color.copy(c);
  }

  // Particle colors — rewrite color attribute
  const alpha    = DEFAULTS.particleAlpha;
  const colorArr = s.particleGeo.attributes.color.array;
  for (let i = 0; i < s.maxCount; i++) {
    const ci = i * 4;
    colorArr[ci]   = c.r;
    colorArr[ci+1] = c.g;
    colorArr[ci+2] = c.b;
    colorArr[ci+3] = i < s.activeCount ? alpha : 0;
  }
  s.particleGeo.attributes.color.needsUpdate = true;

  s.lastCyanHex = colors.neonCyan;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Initialise the particle-globe scene, globe layers, particle system, and rAF loop.
 *
 * @param {HTMLElement} element - .pg-map host element (data-pg-host)
 */
export function initParticleGlobe(element) {
  const ac = new AbortController();
  const { signal } = ac;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = _readCSSColors();

  const W = element.clientWidth  || 800;
  const H = element.clientHeight || 600;

  // ── Renderer ─────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(W, H);
  element.appendChild(renderer.domElement);

  // ── Scene + Camera ────────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    DEFAULTS.cameraFov,
    W / H,
    DEFAULTS.cameraNear,
    DEFAULTS.cameraFar
  );
  camera.position.set(0, 0, DEFAULTS.cameraZ);

  // ── Globe layers (faithful clone of threat-map lines 89–228) ─────────────
  const cyanColor = new THREE.Color(colors.neonCyan || '#00d4b0');

  const globeGeo   = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  const occluderGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 48, 48);

  const wfPositions = new THREE.WireframeGeometry(globeGeo).getAttribute('position').array;
  const wfLineGeo   = new LineSegmentsGeometry();
  wfLineGeo.setPositions(wfPositions);

  // Layer 0: ghost back wires
  const globeBackMat = new LineMaterial({
    color:       cyanColor,
    linewidth:   1,
    transparent: true,
    opacity:     0.014,
    depthTest:   true,
    depthWrite:  false,
  });
  globeBackMat.resolution.set(W, H);
  const globeBack = new LineSegments2(wfLineGeo, globeBackMat);
  globeBack.renderOrder = 0;
  scene.add(globeBack);

  // Layer 1a: back-side occluder (depth write, always-depth)
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest:  true,
    depthFunc:  THREE.AlwaysDepth,
    side:       THREE.BackSide,
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 1;
  scene.add(occluder);

  // Layer 1b: front-side depth writer
  const frontOccluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest:  true,
    side:       THREE.FrontSide,
  });
  const frontOccluder = new THREE.Mesh(globeGeo, frontOccluderMat);
  frontOccluder.renderOrder = 1;
  scene.add(frontOccluder);

  // Layer 1.5: semi-transparent dark surface
  const globeSurfaceMat = new THREE.MeshBasicMaterial({
    color:       new THREE.Color('#010e0b'),
    transparent: true,
    opacity:     0.72,
    depthTest:   true,
    depthWrite:  true,
    side:        THREE.DoubleSide,
  });
  const globeSurface = new THREE.Mesh(globeGeo, globeSurfaceMat);
  globeSurface.renderOrder = 1;
  scene.add(globeSurface);

  // Layer 2: visible front wires
  const globeFrontMat = new LineMaterial({
    color:       cyanColor,
    linewidth:   1,
    transparent: true,
    opacity:     0.05,
    depthTest:   true,
    depthWrite:  false,
  });
  globeFrontMat.resolution.set(W, H);
  const globeFront = new LineSegments2(wfLineGeo, globeFrontMat);
  globeFront.renderOrder = 2;
  scene.add(globeFront);

  // Layer 3: glow wireframe (additive)
  const globeGlowMat = new LineMaterial({
    color:       cyanColor,
    linewidth:   1,
    transparent: true,
    opacity:     0.03,
    blending:    THREE.AdditiveBlending,
    depthTest:   true,
    depthWrite:  false,
  });
  globeGlowMat.resolution.set(W, H);
  const globeGlow = new LineSegments2(wfLineGeo, globeGlowMat);
  globeGlow.renderOrder = 3;
  scene.add(globeGlow);

  // Layer 4: fresnel rim glow
  const rimGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  const rimMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Vector3(cyanColor.r, cyanColor.g, cyanColor.b) },
    },
    vertexShader: /* glsl */`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vec4 mv  = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim   = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float alpha = pow(rim, 3.5) * 0.75;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
    side:        THREE.FrontSide,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.renderOrder = 4;
  scene.add(rimMesh);

  // ── OrbitControls ─────────────────────────────────────────────────────────
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping  = true;
  controls.dampingFactor  = DEFAULTS.dampingFactor;
  controls.autoRotate     = !reducedMotion;
  controls.autoRotateSpeed = DEFAULTS.autoRotateSpeed;
  controls.enablePan      = false;
  controls.minDistance    = DEFAULTS.minDistance;
  controls.maxDistance    = DEFAULTS.maxDistance;
  // NO minPolarAngle / maxPolarAngle — full spherical rotation

  // ── Post-processing ───────────────────────────────────────────────────────
  const composer   = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(W, H),
    DEFAULTS.bloomStrength,
    DEFAULTS.bloomRadius,
    DEFAULTS.bloomThreshold
  );
  composer.addPass(bloomPass);

  const holoPass = new ShaderPass(HoloShader);
  composer.addPass(holoPass);

  // ── Particle system ───────────────────────────────────────────────────────
  const parsedColors = _parseCSSColor(colors.neonCyan);
  const particleState = createParticleSystem(
    scene,
    DEFAULTS.particleCount,
    DEFAULTS.MAX_COUNT,
    parsedColors,
    { particleSize: 1.0 }
  );

  // ── Constellation lines ───────────────────────────────────────────────────
  const { linesMesh, linesGeo } = createLinesSystem(scene, DEFAULTS.MAX_LINES);

  // ── Raycaster for mouse repulsion ─────────────────────────────────────────
  const raycaster = new THREE.Raycaster();

  // ── Mouse interaction ─────────────────────────────────────────────────────
  let mouseRay = null;

  renderer.domElement.addEventListener('mousemove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndcX =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    const ndcY = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    mouseRay = {
      origin:    raycaster.ray.origin.clone(),
      direction: raycaster.ray.direction.clone(),
    };
  }, { signal });

  renderer.domElement.addEventListener('mouseleave', () => {
    mouseRay = null;
  }, { signal });

  // ── Auto-rotate: pause on interaction, resume after 6 s ──────────────────
  let resumeTimer = null;

  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    if (resumeTimer !== null) { clearTimeout(resumeTimer); resumeTimer = null; }
  });

  controls.addEventListener('end', () => {
    if (!reducedMotion) {
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
        resumeTimer = null;
      }, DEFAULTS.autoResumeMs);
    }
  });

  // ── ResizeObserver ────────────────────────────────────────────────────────
  const resizeObserver = new ResizeObserver(() => {
    const rw = element.clientWidth;
    const rh = element.clientHeight;
    if (!rw || !rh) return;

    camera.aspect = rw / rh;
    camera.updateProjectionMatrix();
    renderer.setSize(rw, rh);
    composer.setSize(rw, rh);
    bloomPass.resolution.set(rw, rh);
    globeBackMat.resolution.set(rw, rh);
    globeFrontMat.resolution.set(rw, rh);
    globeGlowMat.resolution.set(rw, rh);
  });
  resizeObserver.observe(element);

  // ── IntersectionObserver for visibility culling ───────────────────────────
  let visible = true;
  const visObs = new IntersectionObserver(entries => {
    visible = entries[entries.length - 1].isIntersecting;
  });
  visObs.observe(element);

  // ── Assemble full state object ────────────────────────────────────────────
  const state = {
    animFrameId: null,
    renderer,
    scene,
    camera,
    controls,
    composer,
    bloomPass,
    holoPass,
    resizeObserver,
    abortController: ac,
    resumeTimer: null,
    reducedMotion,

    // Globe meshes
    globeGeo, occluderGeo, rimGeo,
    globeBack, globeBackMat,
    occluder, frontOccluder,
    globeSurface,
    globeFront, globeFrontMat,
    globeGlow, globeGlowMat,
    rimMesh,

    // Particle system (spread from particleState)
    ...particleState,
    maxCount: DEFAULTS.MAX_COUNT,

    // Constellation lines
    linesMesh,
    linesGeo,

    // Interaction
    raycaster,
    mouseRay: null,     // written by mousemove handler via closure

    // Visibility
    visible,
    visObs,

    // Theme tracking
    lastCyanHex: colors.neonCyan,

    // Per-frame bookkeeping
    frameCount:       0,
    slowFrameStreak:  0,

    // Live parameters (panel writes directly to this object)
    params: {
      particleCount:       DEFAULTS.particleCount,
      repulsionRadius:     DEFAULTS.repulsionRadius,
      repulsionStrength:   DEFAULTS.repulsionStrength,
      connectionThreshold: DEFAULTS.connectionThreshold,
      bloomStrength:       DEFAULTS.bloomStrength,
      springK:             DEFAULTS.springK,
      particleSize:        1.0,
      autoRotate:          !reducedMotion,
      linesEnabled:        false,
    },
  };

  // Store mouse ray in the state object via closure update each frame
  // (the handler updates the local var; the rAF reads state.mouseRay)
  Object.defineProperty(state, 'mouseRay', {
    get: () => mouseRay,
    set: v => { mouseRay = v; },
    enumerable: true,
    configurable: true,
  });

  _pgState.set(element, state);

  // ── rAF loop ──────────────────────────────────────────────────────────────
  let prevTime = performance.now();

  function _tick() {
    state.animFrameId = requestAnimationFrame(_tick);

    // Visibility gate — also check the view is the active tab
    if (!visible || !element.closest('.center__view--active')) return;

    const now = performance.now();
    const dt  = now - prevTime;
    prevTime  = now;

    // Theme refresh every 60 frames (~1/s)
    if (state.frameCount % 60 === 0) {
      const freshColors = _readCSSColors(true);
      if (freshColors.neonCyan !== state.lastCyanHex) {
        _applyThemeColors(state, freshColors);
      }
    }
    state.frameCount++;

    const p = state.params;

    // Update particles
    updateParticles(
      state,
      dt,
      mouseRay,
      p.repulsionRadius,
      p.repulsionStrength,
      p.springK
    );

    // Update constellation lines (with LOD auto-disable)
    if (p.linesEnabled && state.linesMesh) {
      state.linesMesh.visible = true;
      updateLines(
        { linesMesh: state.linesMesh, linesGeo: state.linesGeo, maxLines: DEFAULTS.MAX_LINES },
        state,
        p.connectionThreshold
      );

      // Performance LOD: auto-disable if 3 consecutive frames > 20 ms
      if (dt > DEFAULTS.slowFrameMs) {
        state.slowFrameStreak++;
        if (state.slowFrameStreak >= DEFAULTS.slowFrameCount) {
          p.linesEnabled = false;
          state.linesMesh.visible = false;
          state.slowFrameStreak = 0;
          // Notify panel if visible
          const warn = document.getElementById('pg-perf-warn');
          if (warn) warn.style.display = '';
          const linesChk = document.getElementById('pg-lines');
          if (linesChk) linesChk.checked = false;
        }
      } else {
        state.slowFrameStreak = 0;
      }
    } else {
      if (state.linesMesh) state.linesMesh.visible = false;
    }

    controls.update();
    holoPass.uniforms.time.value = now * 0.001;
    composer.render();
  }

  _tick();
}

/**
 * Tear down the particle-globe: cancel rAF, disconnect observers,
 * dispose GPU resources, remove canvas from DOM.
 *
 * @param {HTMLElement} element - .pg-map host element
 */
export function destroyParticleGlobe(element) {
  const s = _pgState.get(element);
  if (!s) return;

  if (s.animFrameId !== null) { cancelAnimationFrame(s.animFrameId); s.animFrameId = null; }
  if (s.resumeTimer !== null) { clearTimeout(s.resumeTimer); s.resumeTimer = null; }

  s.abortController.abort();
  s.resizeObserver.disconnect();
  s.visObs.disconnect();
  s.controls.dispose();

  // Dispose GPU resources
  s.particleGeo.dispose();
  s.particleMat.dispose();
  if (s.linesGeo)  s.linesGeo.dispose();
  if (s.linesMesh) s.linesMesh.material.dispose();
  s.globeGeo.dispose();
  s.occluderGeo.dispose();
  s.rimGeo.dispose();
  s.globeBackMat.dispose();
  s.globeFrontMat.dispose();
  s.globeGlowMat.dispose();

  s.renderer.dispose();
  if (s.renderer.domElement.parentNode) {
    s.renderer.domElement.parentNode.removeChild(s.renderer.domElement);
  }

  _pgState.delete(element);
}

/**
 * Retrieve the live PGState for an initialised element.
 *
 * @param {HTMLElement} element - .pg-map host element
 * @returns {object | undefined}
 */
export function getParticleGlobeState(element) {
  return _pgState.get(element);
}

// Re-export formation setter so panel can call it via state
export { setFormation, resizeParticleCount };
