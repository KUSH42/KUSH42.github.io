/**
 * Particle system creation and per-frame CPU update for the particle-globe component.
 */

import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from './shaders.js';
import { DEFAULTS } from './config.js';
import { shellTargets, vortexTargets, cloudTargets } from './formations.js';

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Allocate all typed arrays and GPU buffers for the particle system, then add
 * the Points mesh to the scene.
 *
 * @param {THREE.Scene}  scene         - Scene to add the Points mesh to
 * @param {number}       particleCount - Initial active particle count
 * @param {number}       maxCount      - Maximum particle count (buffer size)
 * @param {{ r: number, g: number, b: number }} colors - Parsed neon-cyan RGB (0–1)
 * @param {{ particleSize?: number, particleAlpha?: number }} params - Particle parameters
 * @returns {object} pState - Particle sub-state (merged into the full PGState)
 */
export function createParticleSystem(scene, particleCount, maxCount, colors, params = {}) {
  const sizeMultiplier = params.particleSize ?? 1.0;
  const alpha          = params.particleAlpha ?? DEFAULTS.particleAlpha;

  // ── CPU-side typed arrays ────────────────────────────────────────────────
  const pos    = new Float32Array(maxCount * 3);
  const vel    = new Float32Array(maxCount * 3);
  const target = new Float32Array(maxCount * 3);
  const baseR  = new Float32Array(maxCount);

  // Randomise per-particle shell radius and initial positions
  for (let i = 0; i < maxCount; i++) {
    baseR[i] = DEFAULTS.radiusMin + Math.random() * (DEFAULTS.radiusMax - DEFAULTS.radiusMin);
    // Start on the shell surface (avoids a jarring first frame)
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = baseR[i];
    const ix    = i * 3;
    pos[ix]   = r * Math.sin(phi) * Math.cos(theta);
    pos[ix+1] = r * Math.cos(phi);
    pos[ix+2] = r * Math.sin(phi) * Math.sin(theta);
  }

  // ── Geometry ─────────────────────────────────────────────────────────────
  const particleGeo = new THREE.BufferGeometry();

  const posArr   = new Float32Array(maxCount * 3);
  const colorArr = new Float32Array(maxCount * 4);
  const sizeArr  = new Float32Array(maxCount);

  posArr.set(pos);

  const cr = colors.r, cg = colors.g, cb = colors.b;

  for (let i = 0; i < maxCount; i++) {
    const ca = i < particleCount ? alpha : 0;   // hide inactive particles
    const ci = i * 4;
    colorArr[ci]   = cr;
    colorArr[ci+1] = cg;
    colorArr[ci+2] = cb;
    colorArr[ci+3] = ca;
    // Base size 2.5 ± 1.5 px * multiplier
    sizeArr[i] = (DEFAULTS.sizeBase + (Math.random() * 2 - 1) * DEFAULTS.sizeVariance)
               * sizeMultiplier;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr,   3));
  particleGeo.setAttribute('color',    new THREE.BufferAttribute(colorArr, 4));
  particleGeo.setAttribute('size',     new THREE.BufferAttribute(sizeArr,  1));
  particleGeo.setDrawRange(0, particleCount);

  // ── Material ─────────────────────────────────────────────────────────────
  const particleMat = new THREE.ShaderMaterial({
    vertexShader:   particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent:    true,
    blending:       THREE.AdditiveBlending,
    depthWrite:     false,
    vertexColors:   true,
  });

  // ── Points mesh ──────────────────────────────────────────────────────────
  const points = new THREE.Points(particleGeo, particleMat);
  points.renderOrder = 5;
  scene.add(points);

  // Compute initial shell targets
  shellTargets(particleCount, baseR, target);
  // Seed CPU pos to match geometry
  pos.set(posArr.subarray(0, maxCount * 3));

  return {
    points,
    particleGeo,
    particleMat,
    pos,
    vel,
    target,
    baseR,
    activeCount:    particleCount,
    maxCount,
    mode:           DEFAULTS.defaultMode,
    modeChangeTime: null,
  };
}

/**
 * Per-frame CPU spring + repulsion update. Must not allocate inside the loop.
 *
 * @param {object}                                pState          - Particle sub-state
 * @param {number}                                dt              - Frame delta ms
 * @param {{ origin: THREE.Vector3, direction: THREE.Vector3 } | null} mouseRay
 * @param {number}                                repulsionRadius
 * @param {number}                                repulsionStrength
 * @param {number}                                springK
 */
export function updateParticles(pState, dt, mouseRay, repulsionRadius, repulsionStrength, springK) {
  const dtCapped = Math.min(dt, 33);    // cap at 33 ms — prevents spiral of death
  const { pos, vel, target, activeCount, particleGeo, modeChangeTime } = pState;

  // Boost spring stiffness briefly after a mode change for snappier morph
  let k = springK;
  if (modeChangeTime !== null) {
    const elapsed = performance.now() - modeChangeTime;
    if (elapsed < DEFAULTS.springBoostMs) {
      k = DEFAULTS.springKBoost;
    } else {
      pState.modeChangeTime = null;   // boost expired
    }
  }

  // Extract ray components once to avoid property accesses inside loop
  let ox = 0, oy = 0, oz = 0;
  let dx = 0, dy = 0, dz = 0;
  if (mouseRay) {
    ox = mouseRay.origin.x;    oy = mouseRay.origin.y;    oz = mouseRay.origin.z;
    dx = mouseRay.direction.x; dy = mouseRay.direction.y; dz = mouseRay.direction.z;
  }

  const repR2 = repulsionRadius * repulsionRadius;

  for (let i = 0; i < activeCount; i++) {
    const ix = i * 3;

    // Spring toward target
    vel[ix]   += (target[ix]   - pos[ix])   * k;
    vel[ix+1] += (target[ix+1] - pos[ix+1]) * k;
    vel[ix+2] += (target[ix+2] - pos[ix+2]) * k;

    // Mouse repulsion — only when mouseRay is valid
    if (mouseRay) {
      // Project (particle - rayOrigin) onto ray direction → closest point on ray
      const px   = pos[ix]   - ox;
      const py   = pos[ix+1] - oy;
      const pz   = pos[ix+2] - oz;
      const tRay = Math.max(px * dx + py * dy + pz * dz, 0);
      // repDir = particlePos - closestPoint (push AWAY from ray)
      const repX = pos[ix]   - (ox + dx * tRay);
      const repY = pos[ix+1] - (oy + dy * tRay);
      const repZ = pos[ix+2] - (oz + dz * tRay);
      const dist2 = repX * repX + repY * repY + repZ * repZ;
      if (dist2 < repR2 && dist2 > 1e-6) {
        const dist = Math.sqrt(dist2);
        const mag  = repulsionStrength * (1 - dist / repulsionRadius) / dist;
        vel[ix]   += repX * mag;
        vel[ix+1] += repY * mag;
        vel[ix+2] += repZ * mag;
      }
    }

    // Damping — 0.88 at 60 fps decays an impulse to ~0.06% after 1 s
    vel[ix]   *= DEFAULTS.damping;
    vel[ix+1] *= DEFAULTS.damping;
    vel[ix+2] *= DEFAULTS.damping;

    // Integrate
    pos[ix]   += vel[ix]   * dtCapped * 0.001;
    pos[ix+1] += vel[ix+1] * dtCapped * 0.001;
    pos[ix+2] += vel[ix+2] * dtCapped * 0.001;
  }

  // Write back to geometry (only the active subarray)
  particleGeo.attributes.position.array.set(pos.subarray(0, activeCount * 3));
  particleGeo.attributes.position.needsUpdate = true;
}

/**
 * Update the active particle count: adjusts the draw range and
 * shows/hides the alpha of newly-visible/hidden particles.
 *
 * @param {object} pState    - Particle sub-state
 * @param {number} newCount  - New active particle count (clamped to maxCount)
 * @param {number} [alpha]   - Alpha for visible particles (default DEFAULTS.particleAlpha)
 */
export function resizeParticleCount(pState, newCount, alpha = DEFAULTS.particleAlpha) {
  const { particleGeo, maxCount } = pState;
  const clamped = Math.max(1, Math.min(newCount, maxCount));
  const prev    = pState.activeCount;

  pState.activeCount = clamped;
  particleGeo.setDrawRange(0, clamped);

  // Update alpha for particles that crossed the active/inactive boundary
  const colorArr = particleGeo.attributes.color.array;
  const lo = Math.min(prev, clamped);
  const hi = Math.max(prev, clamped);
  for (let i = lo; i < hi; i++) {
    colorArr[i * 4 + 3] = i < clamped ? alpha : 0;
  }
  particleGeo.attributes.color.needsUpdate = true;
}

/**
 * Compute and apply formation targets for the given mode, then record the
 * mode-change timestamp so the spring boost activates.
 *
 * @param {object} pState - Particle sub-state (mutated in place)
 * @param {'shell'|'vortex'|'cloud'} mode
 */
export function setFormation(pState, mode) {
  const { activeCount, baseR, target } = pState;
  if (mode === 'shell') {
    shellTargets(activeCount, baseR, target);
  } else if (mode === 'vortex') {
    vortexTargets(activeCount, baseR, target);
  } else if (mode === 'cloud') {
    cloudTargets(activeCount, target);
  }
  pState.mode           = mode;
  pState.modeChangeTime = performance.now();
}
