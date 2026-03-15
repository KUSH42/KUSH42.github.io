/**
 * components/pulse-radar/update.js
 * Per-frame update functions and the RAF tick loop.
 */

import { TAU, _angleDiff, _ringHz, _playSonarPing, _typeFloat, _lerp } from './utils.js';
import { _freeSlot, _addContact, _scheduleNextSpawn } from './contacts.js';

// ── Per-frame update functions ────────────────────────────────────

export function _updateSweep(state, dt) {
  if (state.reducedMotion) return;
  const prevAngle = state.sweepAngle;
  state.sweepAngle = (state.sweepAngle + state.sweepSpeed * dt / 1000) % TAU;

  // Detect full revolution (angle wraps past TAU)
  if (state.sweepAngle < prevAngle) {
    _playSonarPing(0.06);
    state.centerGlowIntensity = 1.0;
  }
  // Decay center glow
  if (state.centerGlowIntensity > 0) {
    state.centerGlowIntensity *= Math.pow(0.001, dt / 600);  // fade over ~600ms
    if (state.centerGlowIntensity < 0.005) state.centerGlowIntensity = 0;
    if (state.centerGlowMesh) {
      state.centerGlowMesh.material.uniforms.uIntensity.value = state.centerGlowIntensity;
    }
  }

  const now = performance.now();
  if (state.staticNextAt === null) state.staticNextAt = now + 7000 + Math.random() * 5000;
  if (now >= state.staticNextAt && !state.staticActive) {
    state.staticActive  = true;
    state.staticEndAt   = now + 60 + Math.random() * 40;
    state.staticNextAt  = state.staticEndAt + 6000 + Math.random() * 4000;
  }
  if (state.staticActive) {
    state.sweepTrailMesh.material.uniforms.uStaticAmt.value = 0.5 + Math.random() * 0.5;
    if (now >= state.staticEndAt) {
      state.staticActive = false;
      state.sweepTrailMesh.material.uniforms.uStaticAmt.value = 1.0;
    }
  }

  if (state.sweepTrailMesh) state.sweepTrailMesh.material.uniforms.uAngle.value = state.sweepAngle;

  if (state.sweepArmLine) {
    const { R } = state;
    const pos = state.sweepArmLine.geometry.attributes.position;
    pos.setXYZ(0, 0, 0, 0);
    pos.setXYZ(1, Math.sin(state.sweepAngle) * R, Math.cos(state.sweepAngle) * R, 0);
    pos.needsUpdate = true;
  }
}

export function _updateContacts(state, dt) {
  const { contacts, sweepAngle } = state;
  const now = state.now;

  contacts.forEach((c, i) => {
    if (!c) return;

    // ── World-space movement (real targets only; ghosts are static echoes) ──
    if (c.type !== 'ghost') {
      c.wx += c.wvx * dt / 1000;
      c.wy += c.wvy * dt / 1000;
      // Target drifted outside radar coverage — release the slot
      if (Math.hypot(c.wx, c.wy) > 1.02) { _freeSlot(state, i); return; }
    }

    c.age += dt / c.maxAge;

    // ── Sweep detection: use real-time world position, not stale display ──
    if (c.type !== 'ghost' && !state.reducedMotion) {
      const worldAngle = ((Math.atan2(c.wx, c.wy) % TAU) + TAU) % TAU;
      const diff = Math.abs(_angleDiff(sweepAngle, worldAngle));
      if (diff < 0.12 && now - c.lastSweep > 800) {
        // Snap displayed position to where target actually is right now
        c.angle      = worldAngle;
        c.range      = Math.hypot(c.wx, c.wy);
        c.phase      = 0;        // fire one-shot ring pulse
        c.lastSweep  = now;
        c.sweepAlpha = 1.0;
        if (!c.revealed) { c.revealed = true; c.revealTime = now; }
      }
    }

    // ── Ring pulse: one-shot per sweep pass — stops at 1.0 until next hit ──
    if (c.type !== 'ghost') {
      if (c.phase < 1.0) {
        const inFading = c.age > 0.65 && c.age < 0.85;
        c.phase = Math.min(1.0, c.phase + _ringHz(state, c.type) * (inFading ? 0.5 : 1.0) * dt / 1000);
      }
    } else {
      c.phase += _ringHz(state, 'neutral') * dt / 1000;
    }

    // ── Phosphor fade between sweep passes ──
    if (c.type !== 'ghost' && c.revealed) {
      const floor   = 0.05 + 0.10 * c.range;
      const elapsed = now - c.lastSweep;
      const t       = Math.min(1, elapsed / c.fadeTimeMs);
      c.sweepAlpha  = floor + (1.0 - floor) * Math.pow(1.0 - t, 1.025);
    }

    // ── Ghost echo at fading transition ──
    if (c.type !== 'ghost' && !c.ghostSpawned && c.age >= 0.65 && c.revealed) {
      c.ghostAngle   = c.angle;
      c.ghostRange   = c.range;
      c.ghostSpawned = true;
      _addContact(state, c.ghostAngle, c.ghostRange, 'ghost');
    }

    if (c.age >= 1.0) _freeSlot(state, i);
  });
}

export function _updateInstances(state) {
  const { contacts, dummy, contactDotsMesh, contactRingsMesh, R } = state;
  if (!contactDotsMesh || !contactRingsMesh) return;
  let dirty = false;

  contacts.forEach((c, i) => {
    if (!c) return;
    dirty = true;
    // Unrevealed contacts stay invisible; revealed contacts scale up over 300ms
    let scale;
    if (!c.revealed) {
      scale = 0;
    } else {
      const revealProgress = Math.min(1, (state.now - c.revealTime) / 300);
      scale = revealProgress * 8;
    }
    const px = Math.sin(c.angle) * c.range * R;
    const py = Math.cos(c.angle) * c.range * R;
    dummy.position.set(px, py, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    contactDotsMesh.setMatrixAt(i, dummy.matrix);
    // Ring mesh: scale to 75% of radar radius so flash covers most of the circle
    dummy.scale.setScalar(scale > 0 ? R * 1.5 : 0);
    dummy.updateMatrix();
    contactRingsMesh.setMatrixAt(i, dummy.matrix);

    const tf = _typeFloat(c.type);
    contactDotsMesh.geometry.attributes.a_type.setX(i, tf);
    contactDotsMesh.geometry.attributes.a_age.setX(i, c.age);
    contactDotsMesh.geometry.attributes.a_phase.setX(i, c.phase);
    contactDotsMesh.geometry.attributes.a_sweepFade.setX(i, c.sweepAlpha);
    contactRingsMesh.geometry.attributes.a_type.setX(i, tf);
    contactRingsMesh.geometry.attributes.a_age.setX(i, c.age);
    contactRingsMesh.geometry.attributes.a_phase.setX(i, c.phase);
    contactRingsMesh.geometry.attributes.a_sweepFade.setX(i, c.sweepAlpha);
  });

  if (dirty) {
    contactDotsMesh.instanceMatrix.needsUpdate                   = true;
    contactRingsMesh.instanceMatrix.needsUpdate                  = true;
    contactDotsMesh.geometry.attributes.a_type.needsUpdate       = true;
    contactDotsMesh.geometry.attributes.a_age.needsUpdate        = true;
    contactDotsMesh.geometry.attributes.a_phase.needsUpdate      = true;
    contactDotsMesh.geometry.attributes.a_sweepFade.needsUpdate  = true;
    contactRingsMesh.geometry.attributes.a_type.needsUpdate      = true;
    contactRingsMesh.geometry.attributes.a_age.needsUpdate       = true;
    contactRingsMesh.geometry.attributes.a_phase.needsUpdate     = true;
    contactRingsMesh.geometry.attributes.a_sweepFade.needsUpdate = true;
  }
}

export function _updateLabels(state) {
  const { contacts, element, R } = state;
  const cx = element.clientWidth  / 2;
  const cy = element.clientHeight / 2;
  contacts.forEach(c => {
    if (!c?.labelEl) return;
    if (!c.revealed) { c.labelEl.style.opacity = '0'; return; }
    const x = cx + Math.sin(c.angle) * c.range * R;
    const y = cy - Math.cos(c.angle) * c.range * R;
    c.labelEl.style.left    = `${x + 7}px`;
    c.labelEl.style.top     = `${y - 6}px`;
    c.labelEl.style.opacity = String(c.sweepAlpha);
  });
}

export function _updateFooter(state) {
  if (!state.footerEl) return;
  const count  = state.contacts.filter(c => c && c.type !== 'ghost').length;
  const period = (TAU / state.sweepSpeed).toFixed(1);
  state.footerEl.textContent = `CONTACTS: ${count} | SWEEP: ${period}s`;
}

// ── RAF tick ──────────────────────────────────────────────────────

export function _tick(state, ts) {
  if (state.destroyed || !state.rafRunning) {
    state.rafId = null;
    return;
  }
  const dt    = Math.min(ts - (state.lastTs ?? ts), 100);
  state.lastTs = ts;
  state.now    = ts;

  if (state.R > 0) {
    if (state.backgroundMesh) state.backgroundMesh.material.uniforms.uTime.value = ts / 1000;
    if (state.holoPass) state.holoPass.uniforms.time.value = ts / 1000;
    _updateSweep(state, dt);
    _updateContacts(state, dt);
    _updateInstances(state);
    _updateLabels(state);
    _updateFooter(state);
    state.composer.render();
  }

  state.rafId = requestAnimationFrame(ts2 => _tick(state, ts2));
}
