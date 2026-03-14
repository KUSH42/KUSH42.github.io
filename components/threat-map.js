/**
 * components/threat-map.js
 * ThreatMap JS API — Three.js globe with threat node visualization and bloom post-processing.
 *
 * Usage:
 *   import { initThreatMap, destroyThreatMap, addNode, removeNode,
 *            addEdge, removeEdge, setActiveNode, setThreatLevel }
 *     from './components/threat-map.js';
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { mesh as topoMesh, feature as topoFeature } from 'topojson-client';

// ── Constants ──────────────────────────────────────────────────
const LOW_THRESHOLD = 40;
const MID_THRESHOLD = 70;
const GLOBE_RADIUS = 1.0;

// ── Internal state registry ────────────────────────────────────
const _state = new WeakMap();

// ── Shared TopoJSON cache (avoids double-fetch) ────────────────
let _topoCache = null;

// ── latLngToVec3 ──────────────────────────────────────────────

/**
 * Convert latitude/longitude to a 3D vector on the globe surface.
 *
 * @param {number} lat - Latitude in degrees (-90 to 90)
 * @param {number} lng - Longitude in degrees (-180 to 180)
 * @param {number} [radius=1.03] - Distance from globe center
 * @returns {THREE.Vector3}
 */
function latLngToVec3(lat, lng, radius = 1.03) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ── CSS color reader (cached) ──────────────────────────────────

let _colorCache = null;
let _colorCacheTime = 0;

function _readCSSColors(force = false) {
  const now = Date.now();
  if (!force && _colorCache && now - _colorCacheTime < 500) return _colorCache;
  const style = getComputedStyle(document.documentElement);
  _colorCache = {
    neonCyan:    style.getPropertyValue('--neon-cyan').trim(),
    neonGreen:   style.getPropertyValue('--neon-green').trim(),
    neonAmber:   style.getPropertyValue('--neon-amber').trim(),
    neonMagenta: style.getPropertyValue('--neon-magenta').trim(),
  };
  _colorCacheTime = now;
  return _colorCache;
}

// ── Node color by threat level ────────────────────────────────

function _levelColor(level, colors) {
  if (level <= LOW_THRESHOLD) return colors.neonGreen;
  if (level <= MID_THRESHOLD) return colors.neonAmber;
  return colors.neonMagenta;
}

// ── HoloShader ────────────────────────────────────────────────
// Combined holographic display post-process pass:
//   - Edge-weighted chromatic aberration (lens distortion aesthetic)
//   - Subtle scanlines (military CRT monitor look)
//   - Radial vignette darkening edges
// Replaces the old per-frame CSS filter which forced CPU compositing.

const HoloShader = {
  uniforms: {
    tDiffuse:         { value: null },
    time:             { value: 0.0 },
    vignetteStrength: { value: 0.50 },
    scanlineOpacity:  { value: 0.035 },
    aberrationAmt:    { value: 0.0022 },
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
      // Edge-weighted chromatic aberration — stronger at corners, zero at center
      vec2  ctr    = vUv - 0.5;
      float edgeSq = dot(ctr, ctr) * 4.0;   // 0 at center → 1 at corners
      float s      = aberrationAmt * edgeSq;

      vec2 uvR = clamp(vUv + ctr * s,       0.001, 0.999);
      vec2 uvB = clamp(vUv - ctr * s,       0.001, 0.999);

      float r = texture2D(tDiffuse, uvR).r;
      float g = texture2D(tDiffuse, vUv ).g;
      float b = texture2D(tDiffuse, uvB ).b;

      vec3 col = vec3(r, g, b);

      // Scanlines — thin horizontal bands, very low opacity
      float scan = sin(vUv.y * 640.0) * 0.5 + 0.5;
      col *= 1.0 - scanlineOpacity * (1.0 - scan);

      // Radial vignette
      float vig = 1.0 - edgeSq * vignetteStrength;
      col *= vig;

      // Preserve original alpha — critical for alpha:true renderer transparent canvas
      gl_FragColor = vec4(col, texture2D(tDiffuse, vUv).a);
    }
  `,
};

// ── initThreatMap ─────────────────────────────────────────────

/**
 * Initialise the Three.js scene, globe, orbit controls, bloom, and DOM overlay.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {{ autoRotate?: boolean, bloomStrength?: number }} [options]
 */
export function initThreatMap(element, { autoRotate = true, bloomStrength = 1.7 } = {}) {
  const ac = new AbortController();
  const { signal } = ac;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = _readCSSColors();

  // ── Renderer ─────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(element.clientWidth || 800, element.clientHeight || 600);
  renderer.domElement.classList.add('s9-threatmap__canvas');
  element.appendChild(renderer.domElement);

  // ── Scene + Camera ────────────────────────────────────────
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    (element.clientWidth || 800) / (element.clientHeight || 600),
    0.1,
    100
  );
  camera.position.set(0, 0, 3);

  // ── Globe — three-layer occlusion setup ──────────────────
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  // Occluder is fractionally smaller so its depth is strictly less than globeFront
  // on the front hemisphere (passes LEQUAL) but strictly less than globeFront on
  // the back hemisphere too — meaning back-hemisphere wireframe fragments are
  // always behind the occluder and correctly fail the depth test.
  const occluderGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 48, 48);

  // Layer 0: ghost back wires — drawn before any depth data, always faint
  const cyanColor = new THREE.Color(colors.neonCyan || '#00d4b0');

  const globeBackMat = new THREE.MeshBasicMaterial({
    color: cyanColor,
    wireframe: true,
    transparent: true,
    opacity: 0.014,
    depthTest: true,
    depthWrite: true,
    side: THREE.BackSide,
  });
  const globeBack = new THREE.Mesh(globeGeo, globeBackMat);
  globeBack.renderOrder = 0;
  scene.add(globeBack);

  // Layer 1: invisible occluder — writes back-surface depth unconditionally so that
  // globeFront wireframe fragments on the back hemisphere (which are deeper than the
  // occluder back surface) correctly fail LEQUAL, while front-hemisphere fragments
  // (which are shallower) still pass.
  // BackSide renders only the back-facing triangles (back hemisphere), and depthTest:false
  // ensures the write happens regardless of what is already in the buffer.
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest: true,
    depthFunc: THREE.AlwaysDepth,  // always passes → depth IS written (WebGL only writes depth when DEPTH_TEST is enabled)
    side: THREE.BackSide,          // renders back hemisphere → writes back-surface depth at all interior pixels
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 1;
  scene.add(occluder);

  // Layer 1.5: semi-transparent dark surface — blocks back-hemisphere wireframe via depth
  const globeSurfaceMat = new THREE.MeshBasicMaterial({
    color:       new THREE.Color('#010e0b'),
    transparent: true,
    opacity:     0.85,
    depthTest:   true,
    depthWrite:  true,
    side:        THREE.DoubleSide,
  });
  const globeSurface = new THREE.Mesh(globeGeo, globeSurfaceMat);
  globeSurface.renderOrder = 1;
  scene.add(globeSurface);

  // Layer 2: visible front wires — depth-tested against occluder
  const globeFrontMat = new THREE.MeshBasicMaterial({
    color: cyanColor,
    wireframe: true,
    transparent: true,
    opacity: 0.007,
    depthTest: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });
  const globeFront = new THREE.Mesh(globeGeo, globeFrontMat);
  globeFront.renderOrder = 2;
  scene.add(globeFront);

  // Layer 3: glow wireframe — subtle additive luminance on wireframe lines
  const globeGlowMat = new THREE.MeshBasicMaterial({
    color: cyanColor,
    wireframe:   true,
    transparent: true,
    opacity:     0.015,
    blending:    THREE.AdditiveBlending,
    depthTest:   true,
    depthWrite:  false,
  });
  const globeGlow = new THREE.Mesh(globeGeo, globeGlowMat);
  globeGlow.renderOrder = 3;
  scene.add(globeGlow);

  // Layer 4: fresnel rim glow — bright edge halo around globe silhouette
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

  // ── Orbit Controls ────────────────────────────────────────
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = autoRotate && !reducedMotion;
  controls.autoRotateSpeed = 0.4;
  controls.enablePan = false;
  controls.minDistance = 1.5;
  controls.maxDistance = 5;
  controls.minPolarAngle = Math.PI / 2 - (42.5 * Math.PI / 180);  // 42.5° above equator
  controls.maxPolarAngle = Math.PI / 2 + (42.5 * Math.PI / 180);  // 42.5° below equator

  // ── Post-processing ───────────────────────────────────────
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(element.clientWidth || 800, element.clientHeight || 600),
    bloomStrength * 2.0,  // increased multiplier for overall brightness
    1.2,                  // radius
    0.30                  // lower threshold picks up dimmer wireframe layers
  );
  composer.addPass(bloomPass);

  // Holographic display effects — vignette + scanlines + chromatic aberration
  // OutputPass intentionally omitted: renderer.outputColorSpace handles sRGB conversion,
  // and OutputPass with alpha:true renderer would overwrite alpha→1 (opaque black canvas).
  const holoPass = new ShaderPass(HoloShader);
  composer.addPass(holoPass);

  // ── Overlay DOM ───────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 's9-threatmap__overlay';
  overlay.innerHTML = `
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    <div class="s9-threatmap__crosshair" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `;
  element.appendChild(overlay);

  // ── Auto-rotate pause on user interaction ─────────────────
  let resumeTimer = null;

  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    if (resumeTimer !== null) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
    // Cancel any in-progress camera snap and record interaction time
    const s = _state.get(element);
    if (s) {
      s.cameraLerpTarget = null;
      s.lastOrbitInteraction = Date.now();
    }
  });

  controls.addEventListener('end', () => {
    if (!reducedMotion && autoRotate) {
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
        resumeTimer = null;
      }, 6000);
    }
  });

  // ── Resize observer ───────────────────────────────────────
  const resizeObserver = new ResizeObserver(() => {
    const w = element.clientWidth;
    const h = element.clientHeight;
    if (!w || !h) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
    bloomPass.resolution.set(w, h);
  });
  resizeObserver.observe(element);

  // ── Raycasting for node click ─────────────────────────────
  const raycaster = new THREE.Raycaster();

  renderer.domElement.addEventListener(
    'click',
    (event) => {
      const state = _state.get(element);
      if (!state) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const ndcX = ((event.clientX - rect.left) / w) * 2 - 1;
      const ndcY = -((event.clientY - rect.top)  / h) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

      const meshes = Array.from(state.nodeMap.values()).map((r) => r.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        setActiveNode(element, hit.userData.nodeId);
      } else if (state.activeNodeId !== null) {
        setActiveNode(element, null);
      }
    },
    { signal }
  );

  // ── Store state ───────────────────────────────────────────
  _state.set(element, {
    animFrameId: null,
    renderer,
    composer,
    bloomPass,
    controls,
    scene,
    camera,
    resizeObserver,
    nodeMap: new Map(),
    edgeMap: new Map(),
    abortController: ac,
    resumeTimer: null,
    reducedMotion,
    activeNodeId: null,
    colors,
    cyanColor,
    globeGeo,
    occluderGeo,
    globeBack,
    occluder,
    globeSurface,
    globeFront,
    globeGlow,
    rimGeo,
    rimMesh,
    geoGroup: null,
    cameraLerpTarget: null,
    lastOrbitInteraction: 0,
    arcs: [],
    satelliteMode: false,
    sunAngle: Math.random() * Math.PI * 2,
    satelliteGroup: null,
    holoPass,
    nodeGeo: new THREE.SphereGeometry(0.02, 8, 8),
  });

  const state = _state.get(element);

  function animateLoop() {
    const s = _state.get(element);
    if (!s) return;
    s.animFrameId = requestAnimationFrame(animateLoop);

    // Camera lerp to focused node — suppressed for 3 s after user orbit interaction
    if (s.cameraLerpTarget && Date.now() - s.lastOrbitInteraction >= 3000) {
      s.camera.position.lerp(s.cameraLerpTarget, 0.06);
      if (s.camera.position.distanceTo(s.cameraLerpTarget) < 0.04) {
        s.camera.position.copy(s.cameraLerpTarget);
        s.cameraLerpTarget = null;
      }
    }

    s.controls.update();

    // Tick arc particles
    for (let i = s.arcs.length - 1; i >= 0; i--) {
      const arc = s.arcs[i];
      const t = Math.min(1, (Date.now() - arc.t0) / arc.dur);
      arc.particle.position.copy(arc.curve.getPoint(t));
      if (t > 0.75) {
        const fade = 1 - (t - 0.75) / 0.25;
        arc.ptMat.opacity = 0.9 * fade;
        arc.lineMat.opacity = 0.1 * fade;
      }
      if (t >= 1) {
        s.scene.remove(arc.line);
        s.scene.remove(arc.particle);
        arc.lineGeo.dispose(); arc.lineMat.dispose();
        arc.ptGeo.dispose();   arc.ptMat.dispose();
        s.arcs.splice(i, 1);
      }
    }

    // Rotate sun direction + tick holo time when in satellite mode
    if (s.satelliteMode && s.satMat) {
      s.sunAngle += 0.00015;
      s.satMat.uniforms.sunDir.value.set(
        Math.cos(s.sunAngle), 0.22, Math.sin(s.sunAngle)
      ).normalize();
    }

    // Update holo pass time uniform for animated effects
    if (s.holoPass) s.holoPass.uniforms.time.value = performance.now() * 0.001;

    // Track crosshair to active node via 3D→2D projection
    if (s.activeNodeId !== null) {
      const nodeRecord = s.nodeMap.get(s.activeNodeId);
      const crosshair  = element.querySelector('.s9-threatmap__crosshair');
      if (nodeRecord && crosshair) {
        const w = element.clientWidth;
        const h = element.clientHeight;
        const ndc = nodeRecord.mesh.position.clone().project(s.camera);
        const x = ( ndc.x *  0.5 + 0.5) * w;
        const y = (-ndc.y *  0.5 + 0.5) * h;
        crosshair.style.left = `${x}px`;
        crosshair.style.top  = `${y}px`;
      }
    }

    s.composer.render();
  }
  state.animFrameId = requestAnimationFrame(animateLoop);

  // Load geographic outlines async — non-blocking, failure is graceful
  _loadGeoLines(element);
}

// ── destroyThreatMap ──────────────────────────────────────────

/**
 * Tear down the Three.js scene, cancel animation, dispose geometry/materials, remove DOM.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 */
export function getCamera(element) {
  return _state.get(element)?.camera ?? null;
}

export function destroyThreatMap(element) {
  const state = _state.get(element);
  if (!state) return;

  cancelAnimationFrame(state.animFrameId);

  if (state.resumeTimer !== null) {
    clearTimeout(state.resumeTimer);
  }

  state.resizeObserver.disconnect();
  state.abortController.abort();

  // Dispose nodes (geometry is shared — dispose it once below, not per-mesh)
  for (const [, record] of state.nodeMap) {
    record.mesh.material.dispose();
    state.scene.remove(record.mesh);
  }
  if (state.nodeGeo) state.nodeGeo.dispose();

  // Dispose edges
  for (const [, record] of state.edgeMap) {
    record.line.geometry.dispose();
    record.line.material.dispose();
    state.scene.remove(record.line);
  }

  // Dispose globe layers
  if (state.globeGeo)    state.globeGeo.dispose();
  if (state.occluderGeo) state.occluderGeo.dispose();
  if (state.globeBack)  { state.scene.remove(state.globeBack);  state.globeBack.material.dispose(); }
  if (state.occluder)      { state.scene.remove(state.occluder);      state.occluder.material.dispose(); }
  if (state.globeSurface)  { state.scene.remove(state.globeSurface);  state.globeSurface.material.dispose(); }
  if (state.globeFront)    { state.scene.remove(state.globeFront);    state.globeFront.material.dispose(); }
  if (state.globeGlow)  { state.scene.remove(state.globeGlow);  state.globeGlow.material.dispose(); }
  if (state.rimMesh)    { state.scene.remove(state.rimMesh);    state.rimMesh.material.dispose(); }
  if (state.rimGeo)     state.rimGeo.dispose();

  // Dispose satellite globe
  if (state.satelliteGroup) {
    state.scene.remove(state.satelliteGroup);
    if (state.satGeo)   state.satGeo.dispose();
    if (state.atmGeo)   state.atmGeo.dispose();
    if (state.satMat)   state.satMat.dispose();
    if (state.atmMat)   state.atmMat.dispose();
    if (state.dayTex)   state.dayTex.dispose();
    if (state.nightTex) state.nightTex.dispose();
  }

  // Dispose live arcs
  for (const arc of state.arcs) {
    state.scene.remove(arc.line);
    state.scene.remove(arc.particle);
    arc.lineGeo.dispose(); arc.lineMat.dispose();
    arc.ptGeo.dispose();   arc.ptMat.dispose();
  }

  // Dispose geo lines
  if (state.geoGroup) {
    const seen = new Set();
    state.geoGroup.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material && !seen.has(obj.material)) {
        obj.material.dispose();
        seen.add(obj.material);
      }
    });
    state.scene.remove(state.geoGroup);
  }

  if (state.holoPass) state.holoPass.material.dispose();
  state.composer.dispose();
  state.renderer.dispose();

  // Remove DOM children added by initThreatMap
  const canvas = element.querySelector('.s9-threatmap__canvas');
  if (canvas) element.removeChild(canvas);

  const overlay = element.querySelector('.s9-threatmap__overlay');
  if (overlay) element.removeChild(overlay);

  _state.delete(element);
}

// ── addNode ───────────────────────────────────────────────────

/**
 * Add a threat node to the globe at the given lat/lng.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {{ id: string, lat: number, lng: number, label: string, level: number }} node
 */
export function addNode(element, { id, lat, lng, label, level }) {
  const state = _state.get(element);
  if (!state) return;

  if (state.nodeMap.has(id)) {
    console.warn(`[s9-threatmap] addNode: node "${id}" already exists.`);
    return;
  }

  const colors = _readCSSColors();
  const colorHex = _levelColor(level, colors);

  // Reuse shared node geometry — all nodes are the same sphere
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex) });
  const mesh = new THREE.Mesh(state.nodeGeo, mat);

  mesh.renderOrder = 5;

  const pos = latLngToVec3(lat, lng);
  mesh.position.copy(pos);
  mesh.userData.nodeId = id;
  mesh.userData.label  = label;
  mesh.userData.lat    = lat;
  mesh.userData.lng    = lng;
  mesh.userData.level  = level;

  state.scene.add(mesh);
  state.nodeMap.set(id, { mesh, lat, lng, label, level });

  // Update node count display
  _updateNodeCount(element);
}

// ── removeNode ────────────────────────────────────────────────

/**
 * Remove a threat node from the globe.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string} nodeId
 */
export function removeNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.nodeMap.get(nodeId);
  if (!record) {
    console.warn(`[s9-threatmap] removeNode: node "${nodeId}" not found.`);
    return;
  }

  // Deselect first if active
  if (state.activeNodeId === nodeId) {
    setActiveNode(element, null);
  }

  // Remove connected edges
  for (const [edgeId, edgeRecord] of state.edgeMap) {
    if (edgeRecord.from === nodeId || edgeRecord.to === nodeId) {
      removeEdge(element, edgeId);
    }
  }

  record.mesh.material.dispose();  // geometry is shared — only dispose material
  state.scene.remove(record.mesh);
  state.nodeMap.delete(nodeId);

  _updateNodeCount(element);
}

// ── addEdge ───────────────────────────────────────────────────

/**
 * Add a QuadraticBezierCurve3 arc edge between two nodes.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {{ id: string, from: string, to: string }} edge
 */
export function addEdge(element, { id, from, to }) {
  const state = _state.get(element);
  if (!state) return;

  const fromRecord = state.nodeMap.get(from);
  const toRecord   = state.nodeMap.get(to);

  if (!fromRecord || !toRecord) {
    console.warn(`[s9-threatmap] addEdge: one or both nodes not found ("${from}", "${to}").`);
    return;
  }

  const colors = _readCSSColors();

  const p0 = latLngToVec3(fromRecord.lat, fromRecord.lng, 1.03);
  const p2 = latLngToVec3(toRecord.lat, toRecord.lng, 1.03);

  // Control point: midpoint elevated outward
  const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
  const elevation = 1.0 + mid.length() * 0.3;
  mid.normalize().multiplyScalar(elevation);

  const curve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
  const points = curve.getPoints(40);

  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colors.neonCyan || '#00d4ff'),
    transparent: true,
    opacity: 0.4,
  });

  const line = new THREE.Line(geo, mat);
  state.scene.add(line);

  state.edgeMap.set(id, { line, geometry: geo, material: mat, from, to });
}

// ── removeEdge ────────────────────────────────────────────────

/**
 * Remove an arc edge from the scene.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string} edgeId
 */
export function removeEdge(element, edgeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.edgeMap.get(edgeId);
  if (!record) return;

  record.line.geometry.dispose();
  record.line.material.dispose();
  state.scene.remove(record.line);
  state.edgeMap.delete(edgeId);
}

// ── setActiveNode ─────────────────────────────────────────────

/**
 * Select a node by id. Pass null to deselect.
 * Updates crosshair, coordinate readout, and data attributes.
 * Fires s9:threatmap-node-select / s9:threatmap-node-deselect.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string|null} nodeId
 */
export function setActiveNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  // Deselect previous
  if (state.activeNodeId !== null) {
    const prevRecord = state.nodeMap.get(state.activeNodeId);
    if (prevRecord) {
      // Restore level color
      const colors = _readCSSColors();
      prevRecord.mesh.material.color.set(_levelColor(prevRecord.level, colors));
    }

    const crosshair = element.querySelector('.s9-threatmap__crosshair');
    if (crosshair) {
      crosshair.classList.remove('s9-threatmap__crosshair--visible');
      const lbl = crosshair.querySelector('.s9-threatmap__crosshair-label');
      if (lbl) lbl.textContent = '';
    }

    element.removeAttribute('data-active-node');

    const latEl = element.querySelector('.s9-threatmap__coords-lat');
    const lngEl = element.querySelector('.s9-threatmap__coords-lng');
    if (latEl) latEl.textContent = 'LAT: --.-°';
    if (lngEl) lngEl.textContent = 'LNG: --.-°';

    element.dispatchEvent(
      new CustomEvent('s9:threatmap-node-deselect', {
        bubbles: true,
        detail: { nodeId: state.activeNodeId },
      })
    );

    state.activeNodeId = null;
  }

  if (nodeId === null) return;

  const record = state.nodeMap.get(nodeId);
  if (!record) return;

  // Highlight with the node's own threat-level color
  const colors = _readCSSColors();
  record.mesh.material.color.set(_levelColor(record.level, colors));

  const crosshair = element.querySelector('.s9-threatmap__crosshair');
  if (crosshair) {
    crosshair.classList.add('s9-threatmap__crosshair--visible');
    const lbl = crosshair.querySelector('.s9-threatmap__crosshair-label');
    if (lbl) lbl.textContent = record.label;
  }

  element.setAttribute('data-active-node', nodeId);

  const latEl = element.querySelector('.s9-threatmap__coords-lat');
  const lngEl = element.querySelector('.s9-threatmap__coords-lng');
  if (latEl) latEl.textContent = `LAT: ${record.lat.toFixed(2)}°`;
  if (lngEl) lngEl.textContent = `LNG: ${record.lng.toFixed(2)}°`;

  state.activeNodeId = nodeId;

  element.dispatchEvent(
    new CustomEvent('s9:threatmap-node-select', {
      bubbles: true,
      detail: {
        nodeId,
        label: record.label,
        lat:   record.lat,
        lng:   record.lng,
        level: record.level,
      },
    })
  );
}

// ── setThreatLevel ────────────────────────────────────────────

/**
 * Update the global threat level (0–100).
 * Adjusts bloom strength proportionally.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {number} level - 0 to 100
 */
export function setThreatLevel(element, level) {
  const state = _state.get(element);
  if (!state) return;

  const clamped = Math.max(0, Math.min(100, level));
  element.setAttribute('data-threat-level', clamped);

  // Bloom strength is fixed — threat level drives color/pulse only, not post-processing intensity
}

// ── updateNodeLevel ───────────────────────────────────────────

/**
 * Update a node's threat level and recolour its mesh.
 * Returns the previous level, or undefined if node not found.
 *
 * @param {HTMLElement} element
 * @param {string} nodeId
 * @param {number} newLevel - 0 to 100
 * @returns {number|undefined} previous level
 */
export function updateNodeLevel(element, nodeId, newLevel) {
  const state = _state.get(element);
  if (!state) return undefined;

  const record = state.nodeMap.get(nodeId);
  if (!record) return undefined;

  const oldLevel = record.level;
  record.level = newLevel;
  record.mesh.userData.level = newLevel;

  // Don't override the active-selection highlight colour
  if (state.activeNodeId !== nodeId) {
    const colors = _readCSSColors();
    record.mesh.material.color.set(_levelColor(newLevel, colors));
  }

  return oldLevel;
}

// ── focusNode ─────────────────────────────────────────────────

/**
 * Animate the camera to face the given node.
 * Stops auto-rotate; camera lerps to the node's outward direction.
 *
 * @param {HTMLElement} element
 * @param {string} nodeId
 */
export function focusNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.nodeMap.get(nodeId);
  if (!record) return;

  // Don't snap if user has interacted with orbit controls within the last 3 s
  if (Date.now() - state.lastOrbitInteraction < 3000) return;

  const camDist = state.camera.position.length();
  state.cameraLerpTarget = record.mesh.position.clone()
    .normalize()
    .multiplyScalar(camDist);

  state.controls.autoRotate = false;
  if (state.resumeTimer !== null) {
    clearTimeout(state.resumeTimer);
    state.resumeTimer = null;
  }
}

// ── Internal helpers ───────────────────────────────────────────

/**
 * Fetch countries-110m.json and draw land outline + country border lines on the globe.
 * Called async after initThreatMap — failure is non-fatal (warns to console).
 */
async function _loadGeoLines(element) {
  let topo;
  try {
    const res = await fetch('/data/countries-110m.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    topo = await res.json();
    _topoCache = topo;
  } catch (err) {
    console.warn('[s9-threatmap] geo lines: failed to load /data/countries-110m.json', err);
    return;
  }

  const state = _state.get(element);
  if (!state) return; // destroyed during fetch

  const geoGroup = new THREE.Group();
  const lineColor = state.cyanColor;

  // ── Coastlines / land outline ─────────────────────────────
  // Merged into 3 LineSegments draw calls (vs thousands of Line objects).
  const landBorders = topoMesh(topo, topo.objects.land);

  const coastMat = new THREE.LineBasicMaterial({
    color: lineColor, transparent: true, opacity: 1.0, depthWrite: true,
  });
  const coastGlowMat = new THREE.LineBasicMaterial({
    color: lineColor, transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: true,
  });
  const coastGlowWideMat = new THREE.LineBasicMaterial({
    color: lineColor, transparent: true, opacity: 0.70,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });

  const coastLine     = new THREE.LineSegments(_ringsToSegments(landBorders.coordinates, 1.002), coastMat);
  const coastGlow     = new THREE.LineSegments(_ringsToSegments(landBorders.coordinates, 1.006), coastGlowMat);
  const coastWideGlow = new THREE.LineSegments(_ringsToSegments(landBorders.coordinates, 1.011), coastGlowWideMat);
  coastLine.userData.geoType = coastGlow.userData.geoType = coastWideGlow.userData.geoType = 'coast';
  geoGroup.add(coastWideGlow, coastGlow, coastLine);

  // ── Interior country borders (dimmer) ─────────────────────
  // Merged into 2 LineSegments draw calls.
  const countryBorders = topoMesh(topo, topo.objects.countries, (a, b) => a !== b);

  const borderMat = new THREE.LineBasicMaterial({
    color: lineColor, transparent: true, opacity: 0.55, depthWrite: true,
  });
  const borderGlowMat = new THREE.LineBasicMaterial({
    color: lineColor, transparent: true, opacity: 0.30,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });

  const borderLine = new THREE.LineSegments(_ringsToSegments(countryBorders.coordinates, 1.012), borderMat);
  const borderGlow = new THREE.LineSegments(_ringsToSegments(countryBorders.coordinates, 1.022), borderGlowMat);
  borderLine.userData.geoType = borderGlow.userData.geoType = 'border';
  geoGroup.add(borderGlow, borderLine);

  state.scene.add(geoGroup);
  // If satellite mode was enabled before geo lines finished loading, keep them hidden
  if (state.satelliteMode) geoGroup.visible = false;
  state.geoGroup = geoGroup;
}

function _updateNodeCount(element) {
  const state = _state.get(element);
  if (!state) return;

  const countEl = element.querySelector('.s9-threatmap__node-count');
  if (countEl) {
    countEl.textContent = `NODES: ${state.nodeMap.size}`;
  }
}

// ── _ringsToSegments ──────────────────────────────────────────
// Convert an array of polygon rings (each a [[lng,lat]...] array) into a
// single merged LineSegments BufferGeometry. Each consecutive pair of ring
// vertices becomes one segment. This collapses N*rings draw calls into one.

function _ringsToSegments(coordsList, radius) {
  const verts = [];
  for (const coords of coordsList) {
    for (let i = 0; i < coords.length - 1; i++) {
      const [lng0, lat0] = coords[i];
      const [lng1, lat1] = coords[i + 1];
      const p0 = latLngToVec3(lat0, lng0, radius);
      const p1 = latLngToVec3(lat1, lng1, radius);
      verts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
  return geo;
}

// ── pulseNode ─────────────────────────────────────────────────

/**
 * Fire an expanding ring animation from a globe node.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string} nodeId
 */
export function pulseNode(element, nodeId) {
  const state = _state.get(element);
  if (!state || state.reducedMotion) return;
  const record = state.nodeMap.get(nodeId);
  if (!record) return;

  const colors = _readCSSColors();
  const colorHex = _levelColor(record.level, colors);
  const N = 20, R = 0.035;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colorHex),
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  const ring = new THREE.LineLoop(geo, mat);
  ring.renderOrder = 5;
  ring.position.copy(record.mesh.position);
  const outward = record.mesh.position.clone().normalize();
  ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward);
  state.scene.add(ring);

  const t0 = Date.now(), dur = 700;
  (function tick() {
    if (!_state.get(element)) { state.scene.remove(ring); geo.dispose(); mat.dispose(); return; }
    const t = Math.min(1, (Date.now() - t0) / dur);
    ring.scale.setScalar(1 + t * 6);
    mat.opacity = 0.85 * (1 - t);
    if (t < 1) { requestAnimationFrame(tick); }
    else { state.scene.remove(ring); geo.dispose(); mat.dispose(); }
  })();
}

// ── refreshThemeColors ────────────────────────────────────────

/**
 * Re-read CSS custom properties and apply updated colors to all scene objects.
 * Call this after a theme change.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 */
export function refreshThemeColors(element) {
  const state = _state.get(element);
  if (!state) return;

  const colors = _readCSSColors(true);  // force-refresh on theme change
  state.colors = colors;

  // Globe wireframe layers
  const globeColor = colors.neonCyan || '#00d48ddf';
  if (state.globeBack)  state.globeBack.material.color.set(globeColor);
  if (state.globeFront) state.globeFront.material.color.set(globeColor);

  // Geo lines (coast + border)
  if (state.geoGroup) {
    state.geoGroup.traverse((obj) => {
      if (obj.isLine) {
        obj.material.color.set(colors.neonCyan || '#008410D0');
      }
    });
  }

  // Node meshes
  for (const record of state.nodeMap.values()) {
    const hex = _levelColor(record.level, colors);
    record.mesh.material.color.set(hex);
    record.mesh.material.emissive.set(hex);
  }
}

// ── spawnArc ──────────────────────────────────────────────────

/**
 * Animate a data-packet particle along a curved arc between two globe nodes.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string} fromId - source node id
 * @param {string} toId - destination node id
 */
export function spawnArc(element, fromId, toId) {
  const state = _state.get(element);
  if (!state || state.reducedMotion) return;
  const fromRecord = state.nodeMap.get(fromId);
  const toRecord   = state.nodeMap.get(toId);
  if (!fromRecord || !toRecord) return;

  const colors = _readCSSColors();
  // Packet color: match destination node threat level
  const colorHex = _levelColor(toRecord.level, colors);

  const p0 = fromRecord.mesh.position.clone();
  const p2 = toRecord.mesh.position.clone();
  const mid = p0.clone().add(p2).multiplyScalar(0.5);
  const elevation = 0.2 + mid.length() * 0.25;
  const p1 = mid.clone().normalize().multiplyScalar(GLOBE_RADIUS + elevation);

  const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);

  // Subtle arc line
  const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
  const lineMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colorHex),
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });
  const line = new THREE.Line(lineGeo, lineMat);
  line.renderOrder = 2;

  // Packet particle
  const ptGeo = new THREE.SphereGeometry(0.009, 4, 4);
  const ptMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorHex),
    transparent: true,
    opacity: 0.9,
  });
  const particle = new THREE.Mesh(ptGeo, ptMat);
  particle.renderOrder = 3;
  particle.position.copy(p0);

  state.scene.add(line);
  state.scene.add(particle);

  state.arcs.push({
    curve, line, lineGeo, lineMat, particle, ptGeo, ptMat,
    t0: Date.now(),
    dur: 1000 + Math.random() * 700,
  });
}

// ── Satellite globe ───────────────────────────────────────────

function _llToPx(lat, lng, W, H) {
  return [(lng + 180) / 360 * W, (90 - lat) / 180 * H];
}

function _buildDayCanvas(topo = null) {
  const W = 2048, H = 1024;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // Ocean — satellite-realistic deep blue, darker at poles
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0,    '#071a2e');
  oceanGrad.addColorStop(0.15, '#082035');
  oceanGrad.addColorStop(0.5,  '#0a2a46');
  oceanGrad.addColorStop(0.85, '#082035');
  oceanGrad.addColorStop(1,    '#071a2e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  if (topo) {
    // Land polygons from TopoJSON
    const landFC = topoFeature(topo, topo.objects.land);
    const features = landFC.type === 'FeatureCollection' ? landFC.features : [landFC];
    const polygons = features.flatMap(f => {
      const g = f.geometry;
      if (!g) return [];
      return g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    });

    // Latitude-based land biome gradient (top = 90°N, bottom = 90°S)
    const landGrad = ctx.createLinearGradient(0, 0, 0, H);
    landGrad.addColorStop(0,    '#dce8dc');  // Arctic ice/snow
    landGrad.addColorStop(0.06, '#8a9c7a');  // Tundra
    landGrad.addColorStop(0.16, '#527848');  // Boreal/taiga
    landGrad.addColorStop(0.28, '#4e7040');  // Temperate
    landGrad.addColorStop(0.40, '#4a6c34');  // Subtropical
    landGrad.addColorStop(0.50, '#3a5c24');  // Tropical equator — darkest
    landGrad.addColorStop(0.60, '#4a6c34');  // Subtropical S
    landGrad.addColorStop(0.72, '#4e7040');  // Temperate S
    landGrad.addColorStop(0.84, '#7a8c6a');  // Sub-Antarctic
    landGrad.addColorStop(0.92, '#ccd8c4');  // Near Antarctica
    landGrad.addColorStop(1,    '#eaf0ea');  // Antarctic ice

    // Fill land polygons with biome gradient
    for (const polygon of polygons) {
      for (let ri = 0; ri < polygon.length; ri++) {
        const ring = polygon[ri];
        ctx.beginPath();
        for (let i = 0; i < ring.length; i++) {
          const [lng, lat] = ring[i];
          const x = (lng + 180) / 360 * W;
          const y = (90 - lat) / 180 * H;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = ri === 0 ? landGrad : '#0a2a46';
        ctx.fill();
      }
    }

    // Desert overlays — sandy/tan patches over arid regions
    // [centerLat, centerLng, latRadius, lngRadius, color]
    const deserts = [
      [22,  15,  16, 28, 'rgba(172,142, 88,0.72)'],  // Sahara
      [23,  44,   8, 12, 'rgba(178,148, 96,0.68)'],  // Arabian
      [27,  70,   5,  9, 'rgba(182,158,112,0.52)'],  // Thar
      [42, 100,   6, 16, 'rgba(152,128, 86,0.58)'],  // Gobi
      [-25, 132, 10, 17, 'rgba(168,134, 82,0.58)'],  // Australian outback
      [-22, -68,  4,  6, 'rgba(142,118, 76,0.48)'],  // Atacama
      [35, -114,  5,  8, 'rgba(158,128, 82,0.42)'],  // Mojave/SW USA
      [40,  58,   5,  8, 'rgba(158,134, 88,0.45)'],  // Central Asian steppe
    ];
    for (const [lat, lng, dlat, dlng, color] of deserts) {
      const [cx, cy] = _llToPx(lat, lng, W, H);
      const rx = dlng / 360 * W;
      const ry = dlat / 180 * H;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      const fade = color.replace(/[\d.]+\)$/, '0)');
      g.addColorStop(0,    color);
      g.addColorStop(0.55, color);
      g.addColorStop(0.88, color.replace(/[\d.]+\)$/, '0.08)'));
      g.addColorStop(1,    fade);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle coastline shimmer
    ctx.strokeStyle = 'rgba(120,175,210,0.22)';
    ctx.lineWidth = 0.8;
    for (const polygon of polygons) {
      const ring = polygon[0];
      ctx.beginPath();
      for (let i = 0; i < ring.length; i++) {
        const [lng, lat] = ring[i];
        const x = (lng + 180) / 360 * W;
        const y = (90 - lat) / 180 * H;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Barely-visible lat/lng grid
  ctx.strokeStyle = 'rgba(100,150,200,0.04)';
  ctx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 30) {
    const y = _llToPx(lat, 0, W, H)[1];
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = _llToPx(0, lng, W, H)[0];
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  return cv;
}

function _buildNightCanvas() {
  const W = 1024, H = 512;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#000810';
  ctx.fillRect(0, 0, W, H);

  // City lights: [lat, lng, intensity 1-4]
  const cities = [
    // North America
    [40.7,-74.0,4],[34.0,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],
    [19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],
    [38.9,-77.0,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],
    [37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105.0,2],[33.4,-112.1,2],
    [36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],
    // Canada corridor
    [51.0,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],
    // Central America
    [14.1,-87.2,1.5],[13.7,-89.2,1.5],
    // South America
    [-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12.0,-77.0,2],
    [4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],
    [-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30.0,-51.2,2],[-15.8,-47.9,2],
    // Europe
    [51.5,-0.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],
    [41.0,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25.0,2],
    [52.2,21.0,2.5],[50.1,14.4,2.5],[47.5,19.0,2.5],[48.2,16.4,2.5],
    [47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],
    [41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],
    [50.0,8.7,2.5],[51.0,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],
    [53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],
    [48.0,37.8,2],[46.5,30.7,2],[49.8,24.0,2],[50.4,30.5,2],
    [45.4,28.0,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],
    // Middle East / N Africa
    [30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],
    [24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],
    [32.9,13.2,2],[30.7,29.7,2],
    // Sub-Saharan Africa
    [6.5,3.4,2.5],[-26.2,28.0,3],[-33.9,18.4,2],[-1.3,36.8,2],
    [5.3,-4.0,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],
    [-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],
    // South & Central Asia
    [28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],
    [24.9,67.0,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],
    [22.6,88.4,2.5],[13.1,80.3,2.5],[23.0,72.6,2],[22.3,70.8,2],
    [26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],
    // Central Asia
    [41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],
    // Russia / Siberia
    [54.7,55.9,2],[56.8,60.6,2],[55.0,73.4,2],[56.0,92.9,2],
    [52.3,104.3,2],[53.7,87.1,2],[62.0,129.7,1.5],[43.1,131.9,2],
    [61.8,34.4,2],
    // East Asia
    [35.7,139.7,5],[37.5,127.0,4],[39.9,116.4,4.5],[31.2,121.5,4.5],
    [23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],
    [30.3,120.2,3],[36.7,117.0,2.5],[34.3,108.9,2.5],[26.0,119.3,2.5],
    [41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],
    // SE Asia
    [1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121.0,2.5],
    [3.1,101.7,2.5],[6.2,106.8,3],[21.0,105.8,2],[-6.2,106.8,2.5],
    // Australia / NZ
    [-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153.0,2],[-31.9,115.9,2],
    [-43.5,172.6,1.5],
  ];

  // Two-pass: soft halo first, sharp bright core on top
  // Pass 1 — soft halo (source-over, very low opacity)
  for (const [lat, lng, sz] of cities) {
    const [cx, cy] = _llToPx(lat, lng, W, H);
    const haloR = sz * 2.2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
    g.addColorStop(0,   `rgba(255,210,120,0.22)`);
    g.addColorStop(0.5, `rgba(255,170,60,0.08)`);
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
    ctx.fill();
  }
  // Pass 2 — tight bright core (lighter blending for natural accumulation)
  ctx.globalCompositeOperation = 'lighter';
  for (const [lat, lng, sz] of cities) {
    const [cx, cy] = _llToPx(lat, lng, W, H);
    const coreR = Math.max(1, sz * 0.9);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    g.addColorStop(0,  `rgba(255,245,200,${Math.min(0.9, 0.5 + sz * 0.1)})`);
    g.addColorStop(0.6, `rgba(255,200,100,0.15)`);
    g.addColorStop(1,  'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  return cv;
}

function _loadTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(url, resolve, undefined, reject);
  });
}

async function _createSatelliteGlobe(element) {
  const state = _state.get(element);
  if (!state || state.satelliteGroup) return;

  // Load real satellite textures; fall back to procedural on error
  let dayTex, nightTex, realTexFlag = 1.0;
  try {
    [dayTex, nightTex] = await Promise.all([
      _loadTexture('/textures/earth_day.jpg'),
      _loadTexture('/textures/earth_night.jpg'),
    ]);
    dayTex.colorSpace   = THREE.SRGBColorSpace;
    nightTex.colorSpace = THREE.SRGBColorSpace;
  } catch (e) {
    console.warn('[s9-threatmap] satellite textures not found, using procedural fallback', e);
    if (!_topoCache) {
      try {
        const res = await fetch('/data/countries-110m.json');
        if (res.ok) _topoCache = await res.json();
      } catch (_) {}
    }
    dayTex   = new THREE.CanvasTexture(_buildDayCanvas(_topoCache));
    nightTex = new THREE.CanvasTexture(_buildNightCanvas());
    realTexFlag = 0.0;
  }

  // Sphere with day/night shader
  const satMat = new THREE.ShaderMaterial({
    uniforms: {
      dayMap:    { value: dayTex },
      nightMap:  { value: nightTex },
      sunDir:    { value: new THREE.Vector3(
        Math.cos(state.sunAngle), 0.22, Math.sin(state.sunAngle)
      ).normalize() },
      realTex:   { value: realTexFlag },
    },
    vertexShader: /* glsl */`
      varying vec2  vUv;
      varying vec3  vWorldNormal;
      void main() {
        vUv          = uv;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3      sunDir;
      uniform float     realTex;
      varying vec2      vUv;
      varying vec3      vWorldNormal;
      void main() {
        float d     = dot(normalize(vWorldNormal), normalize(sunDir));
        float blend = smoothstep(-0.18, 0.22, d);
        vec4  day   = texture2D(dayMap,   vUv);
        vec4  night = texture2D(nightMap, vUv);

        // Terminator fringe — suppressed for real satellite textures
        float term   = smoothstep(-0.06, 0.0, d) * (1.0 - smoothstep(0.0, 0.07, d));
        vec3  fringe = mix(vec3(0.0), vec3(1.0, 0.65, 0.2), term * 0.28 * (1.0 - realTex));
        vec3  base   = mix(night.rgb, day.rgb, blend) + fringe;

        gl_FragColor = vec4(base, 1.0);
      }
    `,
  });

  const satGeo    = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 32);
  const satSphere = new THREE.Mesh(satGeo, satMat);
  satSphere.renderOrder = 0;

  // Atmosphere shell — rim glow via Fresnel (pronounced holo blue haze)
  const atmGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.055, 32, 16);
  const atmMat = new THREE.ShaderMaterial({
    uniforms: { glowCol: { value: new THREE.Color(0x00c8ff) } },
    vertexShader: /* glsl */`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vViewDir = normalize(-( modelViewMatrix * vec4(position,1.0) ).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowCol;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim        = 1.0 - abs(dot(vNormal, vViewDir));
        // Outer haze layer (very wide)
        float outer      = pow(rim, 2.2) * 0.55;
        // Inner sharp rim
        float inner      = pow(rim, 5.0) * 1.10;
        float intensity  = outer + inner;
        gl_FragColor     = vec4(glowCol * intensity, intensity * 0.72);
      }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const atmShell = new THREE.Mesh(atmGeo, atmMat);
  atmShell.renderOrder = 1;

  const group = new THREE.Group();
  group.add(satSphere);
  group.add(atmShell);
  group.visible = false;
  state.scene.add(group);

  Object.assign(state, { satelliteGroup: group, satGeo, satMat, atmGeo, atmMat, dayTex, nightTex });
}

// ── setSatelliteMode ──────────────────────────────────────────

/**
 * Toggle between holographic satellite view and wireframe globe.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {boolean} enabled
 */
export async function setSatelliteMode(element, enabled) {
  const state = _state.get(element);
  if (!state) return;

  if (enabled) {
    // Hide wireframe immediately; show satellite once the async build resolves
    if (state.globeBack)    state.globeBack.visible    = false;
    if (state.occluder)     state.occluder.visible     = false;
    if (state.globeFront)   state.globeFront.visible   = false;
    if (state.globeSurface) state.globeSurface.visible  = false;
    if (state.globeGlow)    state.globeGlow.visible     = false;
    if (state.rimMesh)      state.rimMesh.visible       = false;
    if (state.geoGroup)     state.geoGroup.visible      = false;
    // Tighten bloom so node halos don't bleed over the texture
    if (state.bloomPass) {
      state._bloomPrev = { strength: state.bloomPass.strength, threshold: state.bloomPass.threshold, radius: state.bloomPass.radius };
      state.bloomPass.strength  = 0.32;
      state.bloomPass.threshold = 0.85;
      state.bloomPass.radius    = 0.35;
    }
    state.satelliteMode = true;
    await _createSatelliteGlobe(element);  // no-op if already created
    if (state.satelliteGroup) state.satelliteGroup.visible = true;
  } else {
    if (state.satelliteGroup) state.satelliteGroup.visible = false;
    if (state.globeBack)    state.globeBack.visible    = true;
    if (state.occluder)     state.occluder.visible     = true;
    if (state.globeFront)   state.globeFront.visible   = true;
    if (state.globeSurface) state.globeSurface.visible  = true;
    if (state.globeGlow)    state.globeGlow.visible     = true;
    if (state.rimMesh)      state.rimMesh.visible       = true;
    if (state.geoGroup)     state.geoGroup.visible      = true;
    // Restore bloom
    if (state.bloomPass && state._bloomPrev) {
      state.bloomPass.strength  = state._bloomPrev.strength;
      state.bloomPass.threshold = state._bloomPrev.threshold;
      state.bloomPass.radius    = state._bloomPrev.radius;
    }
    state.satelliteMode = false;
  }
}
