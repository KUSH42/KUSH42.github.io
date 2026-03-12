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
import { mesh as topoMesh } from 'topojson-client';

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

  // ── Globe — three-layer occlusion setup ──────────────────
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);

  // Layer 0: ghost back wires — drawn before any depth data, always faint
  const globeBackMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colors.neonCyan || '#00d4b0'),
    wireframe: true,
    transparent: true,
    opacity: 0.009,
    depthTest: false,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const globeBack = new THREE.Mesh(globeGeo, globeBackMat);
  globeBack.renderOrder = 0;
  scene.add(globeBack);

  // Layer 1: invisible occluder — writes depth so front wires occlude correctly
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    side: THREE.FrontSide,
  });
  const occluder = new THREE.Mesh(globeGeo, occluderMat);
  occluder.renderOrder = 1;
  scene.add(occluder);

  // Layer 2: visible front wires — depth-tested against occluder
  const globeFrontMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colors.neonCyan || '#00d4b0'),
    wireframe: true,
    transparent: true,
    opacity: 0.015,
    depthTest: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });
  const globeFront = new THREE.Mesh(globeGeo, globeFrontMat);
  globeFront.renderOrder = 2;
  scene.add(globeFront);

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
    globeGeo,
    globeBack,
    occluder,
    globeFront,
    geoGroup: null,
    cameraLerpTarget: null,
    arcs: [],
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

    // Camera lerp to focused node
    if (s.cameraLerpTarget) {
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

  // Dispose globe layers (shared geometry disposed once)
  if (state.globeGeo) state.globeGeo.dispose();
  if (state.globeBack)  { state.scene.remove(state.globeBack);  state.globeBack.material.dispose(); }
  if (state.occluder)   { state.scene.remove(state.occluder);   state.occluder.material.dispose(); }
  if (state.globeFront) { state.scene.remove(state.globeFront); state.globeFront.material.dispose(); }

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

  // Highlight with white/cyan
  const colors = _readCSSColors();
  record.mesh.material.color.set(colors.neonCyan || '#00d4ff');

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

  if (!state.reducedMotion) {
    state.bloomPass.strength = 0.4 + (clamped / 100) * 0.8;
  }
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
  } catch (err) {
    console.warn('[s9-threatmap] geo lines: failed to load /data/countries-110m.json', err);
    return;
  }

  const state = _state.get(element);
  if (!state) return; // destroyed during fetch

  const colors = _readCSSColors();
  const geoGroup = new THREE.Group();

  // ── Coastlines / land outline (brighter) ──────────────────
  const landBorders = topoMesh(topo, topo.objects.land);
  const coastMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colors.neonCyan || '#00d4b0'),
    transparent: true,
    opacity: 0.35,
  });
  for (const coords of landBorders.coordinates) {
    const points = coords.map(([lng, lat]) => latLngToVec3(lat, lng, 1.002));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geoGroup.add(new THREE.Line(geo, coastMat));
  }

  // ── Interior country borders (dimmer) ─────────────────────
  const countryBorders = topoMesh(topo, topo.objects.countries, (a, b) => a !== b);
  const borderMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(colors.neonCyan || '#00d4b0'),
    transparent: true,
    opacity: 0.15,
  });
  for (const coords of countryBorders.coordinates) {
    const points = coords.map(([lng, lat]) => latLngToVec3(lat, lng, 1.002));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geoGroup.add(new THREE.Line(geo, borderMat));
  }

  state.scene.add(geoGroup);
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
    opacity: 0.9,
    depthWrite: false,
  });
  const ring = new THREE.LineLoop(geo, mat);
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

  const colors = _readCSSColors();
  state.colors = colors;

  // Globe wireframe layers
  const globeColor = colors.neonCyan || '#00d4b0';
  if (state.globeBack)  state.globeBack.material.color.set(globeColor);
  if (state.globeFront) state.globeFront.material.color.set(globeColor);

  // Geo lines (coast + border)
  if (state.geoGroup) {
    state.geoGroup.traverse((obj) => {
      if (obj.isLine) {
        const hex = obj.userData.geoType === 'coast' ? colors.neonCyan : colors.panelBorder;
        obj.material.color.set(hex || '#ffffff');
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
