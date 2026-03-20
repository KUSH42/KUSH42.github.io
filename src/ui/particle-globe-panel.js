/**
 * Control panel bindings for the particle-globe component.
 * Wires all DOM controls in #pg-panel to the live PGState object.
 */

import { setFormation, resizeParticleCount } from '../../components/particle-globe/init.js';
import { DEFAULTS } from '../../components/particle-globe/config.js';

/**
 * Wire all #pg-panel controls to the given particle-globe state object.
 * Safe to call before the panel is visible.
 *
 * @param {object} state - PGState returned by getParticleGlobeState()
 */
export function initPGPanel(state) {
  if (!state) return;

  // ── Formation buttons ─────────────────────────────────────────────────────
  const modeButtons = {
    shell:  document.getElementById('pg-mode-shell'),
    vortex: document.getElementById('pg-mode-vortex'),
    cloud:  document.getElementById('pg-mode-cloud'),
  };

  function _setActiveMode(mode) {
    setFormation(state, mode);
    state.params.particleCount; // no change needed — formation uses activeCount
    for (const [key, btn] of Object.entries(modeButtons)) {
      if (btn) btn.classList.toggle('active', key === mode);
    }
  }

  for (const [key, btn] of Object.entries(modeButtons)) {
    if (btn) btn.addEventListener('click', () => _setActiveMode(key));
  }

  // Mark default active
  if (modeButtons.shell) modeButtons.shell.classList.add('active');

  // ── Particle count slider ─────────────────────────────────────────────────
  const pgCount  = document.getElementById('pg-count');
  const pgVCount = document.getElementById('pg-vCount');
  if (pgCount && pgVCount) {
    pgCount.value = state.params.particleCount;
    pgVCount.textContent = state.params.particleCount;
    pgCount.addEventListener('input', () => {
      const v = parseInt(pgCount.value, 10);
      state.params.particleCount = v;
      resizeParticleCount(state, v);
      // Also recompute formation targets for the new count
      setFormation(state, state.mode);
      pgVCount.textContent = v;
    });
  }

  // ── Particle size slider ──────────────────────────────────────────────────
  const pgSize  = document.getElementById('pg-size');
  const pgVSize = document.getElementById('pg-vSize');
  if (pgSize && pgVSize) {
    pgSize.value = 100;
    pgVSize.textContent = '1.0';
    pgSize.addEventListener('input', () => {
      const multiplier = parseInt(pgSize.value, 10) / 100;
      state.params.particleSize = multiplier;
      pgVSize.textContent = multiplier.toFixed(1);

      // Rewrite size attribute
      const sizeArr = state.particleGeo.attributes.size.array;
      for (let i = 0; i < state.maxCount; i++) {
        sizeArr[i] = (DEFAULTS.sizeBase + (Math.random() * 2 - 1) * DEFAULTS.sizeVariance)
                   * multiplier;
      }
      state.particleGeo.attributes.size.needsUpdate = true;
    });
  }

  // ── Repulsion radius slider (slider 10–150, value /100) ───────────────────
  const pgRepelR  = document.getElementById('pg-repelR');
  const pgVRepelR = document.getElementById('pg-vRepelR');
  if (pgRepelR && pgVRepelR) {
    pgRepelR.value = Math.round(state.params.repulsionRadius * 100);
    pgVRepelR.textContent = state.params.repulsionRadius.toFixed(2);
    pgRepelR.addEventListener('input', () => {
      const v = parseInt(pgRepelR.value, 10) / 100;
      state.params.repulsionRadius = v;
      pgVRepelR.textContent = v.toFixed(2);
    });
  }

  // ── Repulsion strength slider (slider 0–200, value /10000) ───────────────
  const pgRepelS  = document.getElementById('pg-repelS');
  const pgVRepelS = document.getElementById('pg-vRepelS');
  if (pgRepelS && pgVRepelS) {
    pgRepelS.value = Math.round(state.params.repulsionStrength * 10000);
    pgVRepelS.textContent = state.params.repulsionStrength.toFixed(4);
    pgRepelS.addEventListener('input', () => {
      const v = parseInt(pgRepelS.value, 10) / 10000;
      state.params.repulsionStrength = v;
      pgVRepelS.textContent = v.toFixed(4);
    });
  }

  // ── Spring stiffness slider (slider 10–120, value /1000) ─────────────────
  const pgSpring  = document.getElementById('pg-spring');
  const pgVSpring = document.getElementById('pg-vSpring');
  if (pgSpring && pgVSpring) {
    pgSpring.value = Math.round(state.params.springK * 1000);
    pgVSpring.textContent = state.params.springK.toFixed(3);
    pgSpring.addEventListener('input', () => {
      const v = parseInt(pgSpring.value, 10) / 1000;
      state.params.springK = v;
      pgVSpring.textContent = v.toFixed(3);
    });
  }

  // ── Lines enable checkbox ─────────────────────────────────────────────────
  const pgLines = document.getElementById('pg-lines');
  if (pgLines) {
    pgLines.checked = state.params.linesEnabled;
    pgLines.addEventListener('change', () => {
      state.params.linesEnabled = pgLines.checked;
      if (state.linesMesh) {
        state.linesMesh.visible = pgLines.checked;
      }
      // Clear perf warning when user manually re-enables
      if (pgLines.checked) {
        const warn = document.getElementById('pg-perf-warn');
        if (warn) warn.style.display = 'none';
        state.slowFrameStreak = 0;
      }
    });
  }

  // ── Connection threshold slider (slider 10–60, value /100) ───────────────
  const pgThresh  = document.getElementById('pg-thresh');
  const pgVThresh = document.getElementById('pg-vThresh');
  if (pgThresh && pgVThresh) {
    pgThresh.value = Math.round(state.params.connectionThreshold * 100);
    pgVThresh.textContent = state.params.connectionThreshold.toFixed(2);
    pgThresh.addEventListener('input', () => {
      const v = parseInt(pgThresh.value, 10) / 100;
      state.params.connectionThreshold = v;
      pgVThresh.textContent = v.toFixed(2);
    });
  }

  // ── Bloom strength slider (slider 0–200, value /100) ─────────────────────
  const pgBloom  = document.getElementById('pg-bloom');
  const pgVBloom = document.getElementById('pg-vBloom');
  if (pgBloom && pgVBloom) {
    pgBloom.value = Math.round(state.params.bloomStrength * 100);
    pgVBloom.textContent = state.params.bloomStrength.toFixed(2);
    pgBloom.addEventListener('input', () => {
      const v = parseInt(pgBloom.value, 10) / 100;
      state.params.bloomStrength = v;
      state.bloomPass.strength   = v;
      pgVBloom.textContent = v.toFixed(2);
    });
  }

  // ── Auto-rotate checkbox ──────────────────────────────────────────────────
  const pgAutoRotate = document.getElementById('pg-autoRotate');
  if (pgAutoRotate) {
    pgAutoRotate.checked = state.params.autoRotate;
    pgAutoRotate.addEventListener('change', () => {
      state.params.autoRotate = pgAutoRotate.checked;
      state.controls.autoRotate = pgAutoRotate.checked;
    });
  }
}
