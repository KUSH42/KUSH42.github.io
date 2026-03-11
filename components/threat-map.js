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

// ── Constants ──────────────────────────────────────────────────
const LOW_THRESHOLD = 40;
const MID_THRESHOLD = 70;
const GLOBE_RADIUS = 1.0;

// ── Internal state registry ────────────────────────────────────
const _state = new WeakMap();

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

// ── CSS color reader ───────────────────────────────────────────

function _readCSSColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    neonCyan:    style.getPropertyValue('--neon-cyan').trim(),
    neonGreen:   style.getPropertyValue('--neon-green').trim(),
    neonAmber:   style.getPropertyValue('--neon-amber').trim(),
    neonMagenta: style.getPropertyValue('--neon-magenta').trim(),
    panelBorder: style.getPropertyValue('--panel-border').trim(),
  };
}

// ── Node color by threat level ────────────────────────────────

function _levelColor(level, colors) {
  if (level <= LOW_THRESHOLD) return colors.neonGreen;
  if (level <= MID_THRESHOLD) return colors.neonAmber;
  return colors.neonMagenta;
}

// ── initThreatMap ─────────────────────────────────────────────

/**
 * Initialise the Three.js scene, globe, orbit controls, bloom, and DOM overlay.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {{ autoRotate?: boolean, bloomStrength?: number }} [options]
 */
export function initThreatMap(element, { autoRotate = true, bloomStrength = 0.4 } = {}) {
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

  // ── Globe ─────────────────────────────────────────────────
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
  const globeMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colors.panelBorder || '#1a2a2a'),
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // ── Orbit Controls ────────────────────────────────────────
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = autoRotate && !reducedMotion;
  controls.autoRotateSpeed = 0.4;
  controls.enablePan = false;
  controls.minDistance = 1.5;
  controls.maxDistance = 5;

  // ── Post-processing ───────────────────────────────────────
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(element.clientWidth || 800, element.clientHeight || 600),
    bloomStrength,
    0.4,
    0.85
  );
  composer.addPass(bloomPass);

  // ── Overlay DOM ───────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 's9-threatmap__overlay';
  overlay.innerHTML = `
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    <div class="s9-threatmap__crosshair" aria-hidden="true"></div>
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `;
  element.appendChild(overlay);

  // ── Animation loop ────────────────────────────────────────
  let animFrameId = null;

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    controls.update();
    composer.render();
  }
  animate();

  // ── Auto-rotate pause on user interaction ─────────────────
  let resumeTimer = null;

  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    if (resumeTimer !== null) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  });

  controls.addEventListener('end', () => {
    if (!reducedMotion && autoRotate) {
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
        resumeTimer = null;
      }, 3000);
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
    animFrameId,
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
    globe,
  });

  // Store animFrameId after initial call
  const state = _state.get(element);
  state.animFrameId = animFrameId;

  // Patch: keep animFrameId updated in the closure
  // Re-assign the animate fn to capture live state
  cancelAnimationFrame(animFrameId);

  function animateLoop() {
    const s = _state.get(element);
    if (!s) return;
    s.animFrameId = requestAnimationFrame(animateLoop);
    s.controls.update();
    s.composer.render();
  }
  state.animFrameId = requestAnimationFrame(animateLoop);
}

// ── destroyThreatMap ──────────────────────────────────────────

/**
 * Tear down the Three.js scene, cancel animation, dispose geometry/materials, remove DOM.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 */
export function destroyThreatMap(element) {
  const state = _state.get(element);
  if (!state) return;

  cancelAnimationFrame(state.animFrameId);

  if (state.resumeTimer !== null) {
    clearTimeout(state.resumeTimer);
  }

  state.resizeObserver.disconnect();
  state.abortController.abort();

  // Dispose nodes
  for (const [, record] of state.nodeMap) {
    record.mesh.geometry.dispose();
    record.mesh.material.dispose();
    state.scene.remove(record.mesh);
  }

  // Dispose edges
  for (const [, record] of state.edgeMap) {
    record.line.geometry.dispose();
    record.line.material.dispose();
    state.scene.remove(record.line);
  }

  // Dispose globe
  if (state.globe) {
    state.globe.geometry.dispose();
    state.globe.material.dispose();
  }

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

  const geo = new THREE.SphereGeometry(0.02, 8, 8);
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex) });
  const mesh = new THREE.Mesh(geo, mat);

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

  record.mesh.geometry.dispose();
  record.mesh.material.dispose();
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
    if (crosshair) crosshair.classList.remove('s9-threatmap__crosshair--visible');

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

  // Highlight with white/cyan
  const colors = _readCSSColors();
  record.mesh.material.color.set(colors.neonCyan || '#00d4ff');

  const crosshair = element.querySelector('.s9-threatmap__crosshair');
  if (crosshair) crosshair.classList.add('s9-threatmap__crosshair--visible');

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

  if (!state.reducedMotion) {
    state.bloomPass.strength = 0.4 + (clamped / 100) * 0.8;
  }
}

// ── Internal helpers ───────────────────────────────────────────

function _updateNodeCount(element) {
  const state = _state.get(element);
  if (!state) return;

  const countEl = element.querySelector('.s9-threatmap__node-count');
  if (countEl) {
    countEl.textContent = `NODES: ${state.nodeMap.size}`;
  }
}
