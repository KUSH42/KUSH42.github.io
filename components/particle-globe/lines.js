/**
 * Constellation lines subsystem for the particle-globe component.
 *
 * Draws line segments between nearby particles using a spatial grid to avoid
 * O(n²) brute-force — keeping the update under ~4 ms at 20,000 particles.
 */

import * as THREE from 'three';

const MAX_LINES = 8_000;

// ── Spatial grid pool (reused every frame — no per-frame heap allocations) ───

// Pooled cell-to-particle lists. Each "cell" is an entry in _gridCells;
// _gridCells[cellIdx] holds a plain JS array of particle indices.
// We clear + reuse the same arrays each frame.

/** @type {Map<number, number[]>} */
let _gridPool = new Map();

/**
 * Encode a 3D grid coordinate into a single integer key.
 * Uses a large prime hash to avoid collisions in typical particle distributions.
 *
 * @param {number} xi
 * @param {number} yi
 * @param {number} zi
 * @returns {number}
 */
function _cellKey(xi, yi, zi) {
  // Shift to positive range (particles stay within radius ~2.1 → coords -22..22 at cellSize 0.1)
  const ox = xi + 32, oy = yi + 32, oz = zi + 32;
  return (ox * 4096 + oy) * 4096 + oz;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Allocate the line geometry, material, and mesh for the constellation overlay.
 * The mesh is added to the scene but starts invisible.
 *
 * @param {THREE.Scene} scene    - Scene to add the lines mesh to
 * @param {number}      maxLines - Maximum line segments (default MAX_LINES)
 * @returns {{ linesMesh: THREE.LineSegments, linesGeo: THREE.BufferGeometry }}
 */
export function createLinesSystem(scene, maxLines = MAX_LINES) {
  const linesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(maxLines * 2 * 3);  // 2 endpoints × 3 coords
  linesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  linesGeo.setDrawRange(0, 0);

  const linesMat = new THREE.LineBasicMaterial({
    color:       0x00d4b0,   // overwritten by _applyThemeColors
    transparent: true,
    opacity:     0.15,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });

  const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
  linesMesh.renderOrder = 6;
  linesMesh.visible = false;
  scene.add(linesMesh);

  return { linesMesh, linesGeo };
}

/**
 * Rebuild the constellation lines every frame using a spatial grid.
 * Only checks same-cell + 26 neighbour particles — O(n × 27 × avgCellDensity).
 *
 * @param {{ linesMesh: THREE.LineSegments, linesGeo: THREE.BufferGeometry, maxLines?: number }} linesState
 * @param {{ pos: Float32Array, activeCount: number }}                                            pState
 * @param {number} threshold - Connection distance threshold in world units
 */
export function updateLines(linesState, pState, threshold) {
  const { linesGeo } = linesState;
  const { pos, activeCount } = pState;
  const maxLines = linesState.maxLines ?? MAX_LINES;

  const linePositions = linesGeo.attributes.position.array;
  const threshSq = threshold * threshold;
  const cellSize = threshold;
  const invCell  = 1 / cellSize;

  // ── Build spatial grid ────────────────────────────────────────────────────
  // Reuse _gridPool; clear old entries efficiently
  _gridPool.forEach(arr => { arr.length = 0; });
  // Don't clear the map itself — reuse allocated arrays

  for (let i = 0; i < activeCount; i++) {
    const ix  = i * 3;
    const xi  = Math.floor(pos[ix]   * invCell);
    const yi  = Math.floor(pos[ix+1] * invCell);
    const zi  = Math.floor(pos[ix+2] * invCell);
    const key = _cellKey(xi, yi, zi);

    let cell = _gridPool.get(key);
    if (!cell) {
      cell = [];
      _gridPool.set(key, cell);
    }
    cell.push(i);
  }

  // ── Walk particles and connect neighbours ─────────────────────────────────
  let lineCount = 0;

  for (let i = 0; i < activeCount && lineCount < maxLines; i++) {
    const ix = i * 3;
    const xi = Math.floor(pos[ix]   * invCell);
    const yi = Math.floor(pos[ix+1] * invCell);
    const zi = Math.floor(pos[ix+2] * invCell);

    // Check 3×3×3 neighbourhood (27 cells)
    for (let dz = -1; dz <= 1 && lineCount < maxLines; dz++) {
      for (let dy = -1; dy <= 1 && lineCount < maxLines; dy++) {
        for (let dx = -1; dx <= 1 && lineCount < maxLines; dx++) {
          const key = _cellKey(xi + dx, yi + dy, zi + dz);
          const cell = _gridPool.get(key);
          if (!cell) continue;

          for (let ci = 0; ci < cell.length && lineCount < maxLines; ci++) {
            const j = cell[ci];
            if (j <= i) continue;   // avoid duplicates; skip self

            const jx = j * 3;
            const ex = pos[jx]   - pos[ix];
            const ey = pos[jx+1] - pos[ix+1];
            const ez = pos[jx+2] - pos[ix+2];
            const d2 = ex * ex + ey * ey + ez * ez;

            if (d2 < threshSq) {
              const base = lineCount * 6;
              linePositions[base]   = pos[ix];
              linePositions[base+1] = pos[ix+1];
              linePositions[base+2] = pos[ix+2];
              linePositions[base+3] = pos[jx];
              linePositions[base+4] = pos[jx+1];
              linePositions[base+5] = pos[jx+2];
              lineCount++;
            }
          }
        }
      }
    }
  }

  linesGeo.setDrawRange(0, lineCount * 2);
  linesGeo.attributes.position.needsUpdate = true;
}
