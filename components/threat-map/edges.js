/**
 * Edge (arc line) CRUD for the threat-map globe.
 */

import * as THREE from 'three';
import { _state } from './state.js';
import { latLngToVec3, _readCSSColors } from './utils.js';

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
