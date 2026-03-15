/**
 * components/pulse-radar/contacts.js
 * Contact pool management and auto-spawn system.
 */

import {
  TAU, POOL_SIZE, _lerp, _angleDiff,
  _randomType, _typeFloat, _ringHz, _playSonarPing, nextContactId,
} from './utils.js';

// ── Contact pool management ───────────────────────────────────────

export function _freeSlot(state, idx) {
  const c = state.contacts[idx];
  if (!c) return;
  if (c.labelEl) { c.labelEl.remove(); c.labelEl = null; }
  if (state.contactDotsMesh && state.contactRingsMesh) {
    state.dummy.scale.setScalar(0);
    state.dummy.position.set(0, 0, 0);
    state.dummy.updateMatrix();
    state.contactDotsMesh.setMatrixAt(idx, state.dummy.matrix);
    state.contactRingsMesh.setMatrixAt(idx, state.dummy.matrix);
    state.contactDotsMesh.instanceMatrix.needsUpdate  = true;
    state.contactRingsMesh.instanceMatrix.needsUpdate = true;
  }
  state.contacts[idx] = null;
}

export function _addContact(state, angle, range, type, id) {
  const maxC   = state.opts.maxContacts;
  const active = state.contacts.filter(Boolean).length;

  if (active >= maxC) {
    // Evict oldest ghost
    let oldest = -1, oldestAge = -1;
    for (let i = 0; i < POOL_SIZE; i++) {
      if (state.contacts[i]?.type === 'ghost' && state.contacts[i].age > oldestAge) {
        oldest = i; oldestAge = state.contacts[i].age;
      }
    }
    if (oldest >= 0) _freeSlot(state, oldest);
    else { console.warn('[pulse-radar] contact pool full'); return null; }
  }

  let slot = -1;
  for (let i = 0; i < POOL_SIZE; i++) { if (!state.contacts[i]) { slot = i; break; } }
  if (slot < 0) return null;

  const isGhost   = type === 'ghost';
  const normAngle = ((angle % TAU) + TAU) % TAU;
  const normRange = Math.max(0, Math.min(1, range));

  // World-space position (radius=1 unit = radar edge)
  const wx = Math.sin(normAngle) * normRange;
  const wy = Math.cos(normAngle) * normRange;

  // Slow drift velocity for real targets; ghosts are static echoes
  const speed = isGhost ? 0 : (0.010 + Math.random() * 0.025);
  const hdg   = Math.random() * TAU;

  const contact = {
    id:           id || nextContactId(),
    // Displayed position — only updated when sweep arm passes over world pos
    angle:        normAngle,
    range:        normRange,
    // World position: updates every frame
    wx, wy,
    wvx: isGhost ? 0 : Math.sin(hdg) * speed,
    wvy: isGhost ? 0 : Math.cos(hdg) * speed,
    type,
    age:          isGhost ? 0.85 : 0.0,
    maxAge:       isGhost ? 3000 : 8000 + Math.random() * 10000,
    bornAt:       performance.now(),
    phase:        isGhost ? Math.random() * 0.3 : 1.0,
    lastSweep:    -Infinity,
    ghostAngle:   null,
    ghostRange:   null,
    ghostSpawned: false,
    instIdx:      slot,
    labelEl:      null,
    sweepAlpha:   isGhost ? 0.15 : 1.0,
    fadeTimeMs:   4200 * (0.88 + Math.random() * 0.24),
    revealed:     isGhost,
    revealTime:   isGhost ? performance.now() : null,
  };

  if (!isGhost) {
    const span = document.createElement('span');
    span.className = `s9-radar__label s9-radar__label--${type}`;
    span.textContent = type === 'hostile'
      ? `${contact.id} ⚠HC`
      : contact.id;
    state.labelsDiv.appendChild(span);
    contact.labelEl = span;
  }

  state.contacts[slot] = contact;
  return contact;
}

// ── Spawn system ──────────────────────────────────────────────────

export function _scheduleNextSpawn(state) {
  if (state.destroyed || state.reducedMotion) return;
  const density  = Math.max(0.05, state.opts.contactDensity);
  const base     = _lerp(3000, 600, state.threatLevel) / density;
  const jitter   = (Math.random() - 0.5) * base * 0.4;
  const delay    = Math.max(200, base + jitter);
  state.spawnTimer = setTimeout(() => {
    if (!state.destroyed && !state.reducedMotion) {
      _spawnAutoContact(state);
      _scheduleNextSpawn(state);
    }
  }, delay);
}

function _spawnAutoContact(state) {
  const existing = state.contacts.filter(c => c && c.type !== 'ghost');
  const cluster  = existing.length > 0 && Math.random() < 0.3;

  // Always spawn at the current sweep position so the arm paints the
  // contact immediately — no waiting up to a full revolution to appear.
  const angle = state.sweepAngle;
  let range;
  if (cluster) {
    const base = existing[Math.floor(Math.random() * existing.length)];
    range = Math.max(0.15, Math.min(0.97, base.range + (Math.random() - 0.5) * 0.3));
  } else {
    range = 0.15 + Math.random() * 0.82;
  }
  _addContact(state, angle, range, _randomType(state.threatLevel));
}
