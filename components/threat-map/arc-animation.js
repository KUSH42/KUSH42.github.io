/**
 * Animated arc particles between globe nodes.
 */

import * as THREE from 'three';
import { _state, GLOBE_RADIUS } from './state.js';
import { _readCSSColors, _levelColor } from './utils.js';

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
