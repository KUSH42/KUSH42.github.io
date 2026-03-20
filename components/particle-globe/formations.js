/**
 * Formation target generators for the particle-globe component.
 *
 * All functions write into pre-allocated Float32Arrays — no heap allocations.
 * Signature: fn(count, baseR, target) where baseR and target are parallel
 * Float32Arrays from the particle state object.
 */

import { GLOBE_RADIUS } from '../threat-map/state.js';

// ── Lat/lon wireframe segment cache ──────────────────────────────────────────
// Built once on first call to globeTargets and reused.
let _wfSegments = null;
let _wfSegCount  = 0;

function _buildWireframeSegments() {
  const R        = GLOBE_RADIUS;
  const LAT_RINGS = 18;   // horizontal circles
  const LON_SEGS  = 36;   // vertical lines
  const segs = [];

  // Latitude circles (constant-y rings)
  for (let j = 1; j < LAT_RINGS; j++) {
    const phi = Math.PI * j / LAT_RINGS;
    const y   = R * Math.cos(phi);
    const r   = R * Math.sin(phi);
    for (let i = 0; i < LON_SEGS; i++) {
      const t1 = 2 * Math.PI * i       / LON_SEGS;
      const t2 = 2 * Math.PI * (i + 1) / LON_SEGS;
      segs.push(r * Math.cos(t1), y, r * Math.sin(t1),
                r * Math.cos(t2), y, r * Math.sin(t2));
    }
  }

  // Longitude lines (meridians)
  for (let i = 0; i < LON_SEGS; i++) {
    const theta = 2 * Math.PI * i / LON_SEGS;
    const cosT  = Math.cos(theta);
    const sinT  = Math.sin(theta);
    for (let j = 0; j < LAT_RINGS; j++) {
      const phi1 = Math.PI * j       / LAT_RINGS;
      const phi2 = Math.PI * (j + 1) / LAT_RINGS;
      segs.push(R * Math.sin(phi1) * cosT, R * Math.cos(phi1), R * Math.sin(phi1) * sinT,
                R * Math.sin(phi2) * cosT, R * Math.cos(phi2), R * Math.sin(phi2) * sinT);
    }
  }

  _wfSegments = new Float32Array(segs);
  _wfSegCount  = Math.floor(_wfSegments.length / 6);
}

/**
 * SHELL mode — uniform spherical distribution using the Fibonacci lattice.
 * Produces no clustering at poles. Each particle is placed at baseR[i] * unitVec.
 *
 * @param {number}       count  - Number of active particles to position
 * @param {Float32Array} baseR  - Per-particle shell radius (parallel to target)
 * @param {Float32Array} target - Output: target positions (count * 3 floats, xyz)
 */
export function shellTargets(count, baseR, target) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y     = 1 - (i / (count - 1)) * 2;               // -1 → +1
    const r     = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const scale = baseR[i];
    const ix    = i * 3;
    target[ix]   = r * Math.cos(theta) * scale;
    target[ix+1] = y * scale;
    target[ix+2] = r * Math.sin(theta) * scale;
  }
}

/**
 * VORTEX mode — spiraling helical bands around the Y-axis.
 * Band count is 6; each particle's index mod 6 selects its band.
 *
 * @param {number}       count  - Number of active particles to position
 * @param {Float32Array} baseR  - Per-particle shell radius (parallel to target)
 * @param {Float32Array} target - Output: target positions (count * 3 floats, xyz)
 */
export function vortexTargets(count, baseR, target) {
  const BANDS = 6;
  for (let i = 0; i < count; i++) {
    const band = i % BANDS;
    const t    = i / count;                                  // 0 → 1
    const phi  = t * Math.PI * 12 + band * (Math.PI * 2 / BANDS);
    const y    = (t * 2 - 1) * 1.2;                         // -1.2 → +1.2
    const r    = baseR[i] * (0.85 + 0.15 * Math.sin(phi * 3));
    const ix   = i * 3;
    target[ix]   = r * Math.cos(phi);
    target[ix+1] = y;
    target[ix+2] = r * Math.sin(phi);
  }
}

/**
 * CLOUD mode — random volumetric scatter within a spherical shell (r 1.15–2.0).
 * Uses acos-uniform distribution to avoid pole clustering.
 * The baseR array is intentionally unused — cloud radius is independently
 * randomised per particle on every mode switch.
 *
 * @param {number}       count  - Number of active particles to position
 * @param {Float32Array} target - Output: target positions (count * 3 floats, xyz)
 */
export function cloudTargets(count, target) {
  for (let i = 0; i < count; i++) {
    const r   = 1.15 + Math.random() * 0.85;
    const phi = Math.acos(2 * Math.random() - 1);           // uniform on sphere
    const th  = Math.random() * Math.PI * 2;
    const ix  = i * 3;
    target[ix]   = r * Math.sin(phi) * Math.cos(th);
    target[ix+1] = r * Math.cos(phi);
    target[ix+2] = r * Math.sin(phi) * Math.sin(th);
  }
}

/**
 * GLOBE mode — particles distributed along the lat/lon wireframe grid of the
 * globe sphere. Particles cluster along meridians and latitude circles,
 * forming a visible wireframe pattern when viewed through bloom.
 *
 * @param {number}       count  - Number of active particles to position
 * @param {Float32Array} target - Output: target positions (count * 3 floats, xyz)
 */
export function globeTargets(count, target) {
  if (!_wfSegments) _buildWireframeSegments();

  for (let i = 0; i < count; i++) {
    const s  = Math.floor(Math.random() * _wfSegCount) * 6;
    const t  = Math.random();
    const ix = i * 3;
    target[ix]   = _wfSegments[s]   + (_wfSegments[s+3] - _wfSegments[s])   * t;
    target[ix+1] = _wfSegments[s+1] + (_wfSegments[s+4] - _wfSegments[s+1]) * t;
    target[ix+2] = _wfSegments[s+2] + (_wfSegments[s+5] - _wfSegments[s+2]) * t;
  }
}
