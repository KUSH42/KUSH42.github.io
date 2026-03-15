/**
 * Node CRUD and pulse animation for the threat-map globe.
 */

import * as THREE from 'three';
import { _state } from './state.js';
import { latLngToVec3, _readCSSColors, _levelColor } from './utils.js';
import { setActiveNode } from './selection.js';
import { removeEdge } from './edges.js';

// ── _updateNodeCount ──────────────────────────────────────────

function _updateNodeCount(element) {
  const state = _state.get(element);
  if (!state) return;

  const countEl = element.querySelector('.s9-threatmap__node-count');
  if (countEl) {
    countEl.textContent = `NODES: ${state.nodeMap.size}`;
  }
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
