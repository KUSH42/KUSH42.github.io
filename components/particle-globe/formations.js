/**
 * Formation target generators for the particle-globe component.
 *
 * All functions write into pre-allocated Float32Arrays — no heap allocations.
 * Signature: fn(count, baseR, target) where baseR and target are parallel
 * Float32Arrays from the particle state object.
 */

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
