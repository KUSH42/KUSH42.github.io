/**
 * Node selection, focus, and threat level for the threat-map globe.
 */

import * as THREE from 'three';
import { _state } from './state.js';
import { _readCSSColors, _levelColor } from './utils.js';
import { ANIM } from './anim-constants.js';

// ── _cancelAllAnimations ───────────────────────────────────────

/**
 * Cancel all in-flight animations for the given element.
 * Must be called at the top of setActiveNode before any new animation begins.
 * Also exported so destroyThreatMap can cancel timers before mesh disposal.
 *
 * @param {HTMLElement} element
 */
export function _cancelAllAnimations(element) {
  const s = _state.get(element);
  if (!s) return;

  // Reset mesh scale for any tween that was mid-flight before nulling
  if (s.nodeTween) {
    s.nodeTween.mesh.scale.setScalar(1.0);
    // Color is left as-is; caller sets it immediately after _cancelAllAnimations
  }
  if (s.deselectTween) {
    s.deselectTween.mesh.scale.setScalar(1.0);
  }

  // Stop JS tweens
  s.nodeTween     = null;
  s.deselectTween = null;
  s.tweenGeneration++;

  // Cancel pending delay timers
  for (const id of s.pendingTimers) clearTimeout(id);
  s.pendingTimers = [];

  // Cancel typewriter
  if (s.labelTypewriter) { s.labelTypewriter.cancel(); s.labelTypewriter = null; }

  // Cancel coordinate scrambles
  if (s.coordScrambleLat) { s.coordScrambleLat.cancel(); s.coordScrambleLat = null; }
  if (s.coordScrambleLng) { s.coordScrambleLng.cancel(); s.coordScrambleLng = null; }

  // Remove all animation classes from crosshair and force style flush
  const crosshair = element.querySelector('.s9-threatmap__crosshair');
  if (crosshair) {
    crosshair.classList.remove(
      's9-threatmap__crosshair--animating-in',
      's9-threatmap__crosshair--animating-out',
    );
    // Force a style recalculation flush so the next classList.add starts a fresh animation
    void crosshair.offsetWidth;
  }
}

// ── _startTypewriter ──────────────────────────────────────────

/**
 * Type text character-by-character into an element with a blinking cursor.
 *
 * @param {HTMLElement} labelEl
 * @param {string} text
 * @param {number} charRate - ms per character
 * @param {number} cursorBlinkMs - ms per blink half-cycle
 * @param {Function} [onDone]
 * @returns {{ cancel: Function }}
 */
function _startTypewriter(labelEl, text, charRate, cursorBlinkMs, onDone) {
  if (text.length === 0) {
    labelEl.textContent = '';
    if (onDone) onDone();
    return { cancel: () => {} };
  }

  let charIndex     = 0;
  let cursorVisible = true;
  let cursorTimer   = null;
  let charTimer     = null;
  let cancelled     = false;

  function cancel() {
    cancelled = true;
    clearTimeout(charTimer);
    clearInterval(cursorTimer);
  }

  function render() {
    labelEl.textContent = text.slice(0, charIndex) + (cursorVisible ? '_' : ' ');
  }

  // Initial render — shows just the cursor at t=0
  render();

  cursorTimer = setInterval(() => {
    if (cancelled) return;
    cursorVisible = !cursorVisible;
    render();
  }, cursorBlinkMs);

  function nextChar() {
    if (cancelled) return;
    charIndex++;
    render();
    if (charIndex < text.length) {
      charTimer = setTimeout(nextChar, charRate);
    } else {
      // Typing done — let cursor blink once more, then write final text
      charTimer = setTimeout(() => {
        if (!cancelled) {
          clearInterval(cursorTimer);
          labelEl.textContent = text;
          if (onDone) onDone();
        }
      }, cursorBlinkMs);
    }
  }

  charTimer = setTimeout(nextChar, charRate);

  return { cancel };
}

// ── _startCoordScramble ───────────────────────────────────────

/**
 * Roll through random digits before landing on the real coordinate value.
 *
 * @param {HTMLElement} el
 * @param {string} prefix - e.g. 'LAT: '
 * @param {number} realVal - e.g. 35.6762
 * @param {number} decimals - decimal places
 * @param {number} duration - total scramble duration in ms
 * @param {Function} [onDone]
 * @returns {{ cancel: Function }}
 */
function _startCoordScramble(el, prefix, realVal, decimals, duration, onDone) {
  const t0        = Date.now();
  const mag       = Math.abs(realVal);
  const intDigits = Math.max(1, Math.floor(Math.log10(mag || 1)) + 1);
  let timer       = null;
  let cancelled   = false;

  function cancel() {
    cancelled = true;
    clearTimeout(timer);
  }

  function tick() {
    if (cancelled) return;
    const elapsed = Date.now() - t0;
    if (elapsed >= duration) {
      el.textContent = `${prefix}${realVal.toFixed(decimals)}°`;
      if (onDone) onDone();
      return;
    }
    const rnd  = (Math.random() * Math.pow(10, intDigits)).toFixed(decimals);
    const sign = realVal < 0 ? '-' : '';
    el.textContent = `${prefix}${sign}${rnd}°`;
    timer = setTimeout(tick, 40);
  }

  tick();
  return { cancel };
}

// ── setActiveNode ─────────────────────────────────────────────

/**
 * Select a node by id. Pass null to deselect.
 * Updates crosshair, coordinate readout, and data attributes.
 * Fires s9:threatmap-node-select / s9:threatmap-node-deselect.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {string|null} nodeId
 */
export function setActiveNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  // Always cancel any in-flight animations first
  _cancelAllAnimations(element);

  const colors      = _readCSSColors();
  const prevNodeId  = state.activeNodeId;

  // ── Clear previous selection state ───────────────────────────
  if (prevNodeId !== null) {
    state.activeNodeId = null;
    element.removeAttribute('data-active-node');

    element.dispatchEvent(
      new CustomEvent('s9:threatmap-node-deselect', {
        bubbles: true,
        detail: { nodeId: prevNodeId },
      })
    );

    const prevRecord = state.nodeMap.get(prevNodeId);

    if (nodeId === null) {
      // ── Pure deselect: animated collapse ───────────────────
      if (prevRecord) {
        // Snap to neonSelect so deselectTween always lerps from a consistent start
        prevRecord.mesh.material.color.set(colors.neonSelect || '#00ffff');

        const selectColor = new THREE.Color(colors.neonSelect || '#00ffff');
        const levelColor  = new THREE.Color(_levelColor(prevRecord.level, colors));

        // 1. Fade label
        const lbl = element.querySelector('.s9-threatmap__crosshair-label');
        if (lbl) lbl.classList.add('s9-threatmap__crosshair-label--fading');

        const labelClearId = setTimeout(() => {
          if (lbl) {
            lbl.textContent = '';
            lbl.classList.remove('s9-threatmap__crosshair-label--fading');
          }
        }, ANIM.DESELECT_LABEL_DUR);
        state.pendingTimers.push(labelClearId);

        // 2. Collapse crosshair after DESELECT_CROSSHAIR_DELAY
        const crosshairOutId = setTimeout(() => {
          const crosshair = element.querySelector('.s9-threatmap__crosshair');
          if (!crosshair) return;
          crosshair.classList.remove(
            's9-threatmap__crosshair--animating-in',
            's9-threatmap__crosshair--visible',
          );
          void crosshair.offsetWidth;
          crosshair.classList.add('s9-threatmap__crosshair--animating-out');
        }, ANIM.DESELECT_CROSSHAIR_DELAY);
        state.pendingTimers.push(crosshairOutId);

        // 3. Node deselect tween after DESELECT_NODE_DELAY
        // (animateLoop removes --animating-out when tween completes)
        const deselectTweenId = setTimeout(() => {
          state.deselectTween = {
            generation:  state.tweenGeneration,
            t0:          Date.now(),
            dur:         ANIM.DESELECT_NODE_DUR,
            troughScale: ANIM.NODE_DESELECT_SCALE_TROUGH,
            selectColor,
            levelColor,
            mesh:        prevRecord.mesh,
            element,
          };
        }, ANIM.DESELECT_NODE_DELAY);
        state.pendingTimers.push(deselectTweenId);
      } else {
        const crosshair = element.querySelector('.s9-threatmap__crosshair');
        if (crosshair) crosshair.classList.remove('s9-threatmap__crosshair--visible');
        const lbl = element.querySelector('.s9-threatmap__crosshair-label');
        if (lbl) lbl.textContent = '';
      }

      // Reset coord display
      const latEl = element.querySelector('.s9-threatmap__coords-lat');
      const lngEl = element.querySelector('.s9-threatmap__coords-lng');
      if (latEl) latEl.textContent = 'LAT: --.-°';
      if (lngEl) lngEl.textContent = 'LNG: --.-°';

      return;
    }

    // ── Switching to new node: sync-reset previous immediately ─
    if (prevRecord) {
      prevRecord.mesh.scale.setScalar(1.0);
      prevRecord.mesh.material.color.set(_levelColor(prevRecord.level, colors));
    }
    // Hide crosshair; it will animate in for the new node
    const crosshair = element.querySelector('.s9-threatmap__crosshair');
    if (crosshair) crosshair.classList.remove('s9-threatmap__crosshair--visible');
    const lbl = element.querySelector('.s9-threatmap__crosshair-label');
    if (lbl) lbl.textContent = '';
  }

  if (nodeId === null) return;

  // ── Select new node ───────────────────────────────────────────
  const record = state.nodeMap.get(nodeId);
  if (!record) return;

  state.activeNodeId = nodeId;
  element.setAttribute('data-active-node', nodeId);

  element.dispatchEvent(
    new CustomEvent('s9:threatmap-node-select', {
      bubbles: true,
      detail: {
        nodeId,
        label: record.label,
        lat:   record.lat,
        lng:   record.lng,
        level: record.level,
      },
    })
  );

  // ── Reduced-motion: instant state, no tweens ───────────────
  if (state.reducedMotion) {
    record.mesh.material.color.set(colors.neonSelect || '#00ffff');
    record.mesh.scale.setScalar(1.0);

    const crosshair = element.querySelector('.s9-threatmap__crosshair');
    if (crosshair) crosshair.classList.add('s9-threatmap__crosshair--visible');
    const lbl = element.querySelector('.s9-threatmap__crosshair-label');
    if (lbl) lbl.textContent = record.label;

    const latEl = element.querySelector('.s9-threatmap__coords-lat');
    const lngEl = element.querySelector('.s9-threatmap__coords-lng');
    if (latEl) latEl.textContent = `LAT: ${record.lat.toFixed(2)}°`;
    if (lngEl) lngEl.textContent = `LNG: ${record.lng.toFixed(2)}°`;

    return;
  }

  // ── Animated select ────────────────────────────────────────

  // 1. Start node scale/color tween: immediate white flash
  const flashColor  = new THREE.Color('#ffffff');
  const selectColor = new THREE.Color(colors.neonSelect || '#00ffff');

  record.mesh.material.color.copy(flashColor);
  record.mesh.scale.setScalar(1.0);

  state.nodeTween = {
    generation: state.tweenGeneration,
    t0:         Date.now(),
    dur:        ANIM.NODE_SCALE_DUR,
    riseFrac:   ANIM.NODE_SCALE_RISE,
    peakScale:  ANIM.NODE_SCALE_PEAK,
    flashDur:   ANIM.NODE_FLASH_DUR,
    settleDur:  ANIM.NODE_SETTLE_DUR,
    flashColor,
    selectColor,
    mesh:       record.mesh,
  };

  // 2. Crosshair: add --animating-in after CROSSHAIR_IN_DELAY
  const crosshairTimerId = setTimeout(() => {
    const crosshair = element.querySelector('.s9-threatmap__crosshair');
    if (!crosshair) return;
    crosshair.classList.add(
      's9-threatmap__crosshair--visible',
      's9-threatmap__crosshair--animating-in',
    );
  }, ANIM.CROSSHAIR_IN_DELAY);
  state.pendingTimers.push(crosshairTimerId);

  // 3. Coord scrambles: lat and lng start from one shared timer
  const coordTimerId = setTimeout(() => {
    const latEl = element.querySelector('.s9-threatmap__coords-lat');
    const lngEl = element.querySelector('.s9-threatmap__coords-lng');
    if (latEl) {
      state.coordScrambleLat = _startCoordScramble(
        latEl, 'LAT: ', record.lat, 2, ANIM.COORD_SCRAMBLE_DUR
      );
    }
    if (lngEl) {
      state.coordScrambleLng = _startCoordScramble(
        lngEl, 'LNG: ', record.lng, 2, ANIM.COORD_SCRAMBLE_DUR
      );
    }
  }, ANIM.COORD_SCRAMBLE_DELAY);
  state.pendingTimers.push(coordTimerId);

  // 4. Label typewriter: starts after crosshair clip completes
  const labelTimerId = setTimeout(() => {
    const lbl = element.querySelector('.s9-threatmap__crosshair-label');
    if (!lbl) return;
    state.labelTypewriter = _startTypewriter(
      lbl,
      record.label,
      ANIM.LABEL_CHAR_RATE,
      ANIM.LABEL_CURSOR_BLINK,
    );
  }, ANIM.LABEL_START_DELAY);
  state.pendingTimers.push(labelTimerId);
}

// ── setThreatLevel ────────────────────────────────────────────

/**
 * Update the global threat level (0–100).
 *
 * @param {HTMLElement} element - .s9-threatmap root
 * @param {number} level - 0 to 100
 */
export function setThreatLevel(element, level) {
  const state = _state.get(element);
  if (!state) return;

  const clamped = Math.max(0, Math.min(100, level));
  element.setAttribute('data-threat-level', clamped);
}

// ── updateNodeLevel ───────────────────────────────────────────

/**
 * Update a node's threat level and recolour its mesh.
 * Returns the previous level, or undefined if node not found.
 *
 * @param {HTMLElement} element
 * @param {string} nodeId
 * @param {number} newLevel - 0 to 100
 * @returns {number|undefined} previous level
 */
export function updateNodeLevel(element, nodeId, newLevel) {
  const state = _state.get(element);
  if (!state) return undefined;

  const record = state.nodeMap.get(nodeId);
  if (!record) return undefined;

  const oldLevel = record.level;
  record.level = newLevel;
  record.mesh.userData.level = newLevel;

  // Don't override the active-selection highlight colour
  if (state.activeNodeId !== nodeId) {
    const colors = _readCSSColors();
    record.mesh.material.color.set(_levelColor(newLevel, colors));
  }

  return oldLevel;
}

// ── focusNode ─────────────────────────────────────────────────

/**
 * Animate the camera to face the given node.
 * Stops auto-rotate; camera lerps to the node's outward direction.
 *
 * @param {HTMLElement} element
 * @param {string} nodeId
 */
export function focusNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.nodeMap.get(nodeId);
  if (!record) return;

  // Don't snap if user has interacted with orbit controls within the last 3 s
  if (Date.now() - state.lastOrbitInteraction < 3000) return;

  const camDist = state.camera.position.length();
  state.cameraLerpTarget = record.mesh.position.clone()
    .normalize()
    .multiplyScalar(camDist);

  state.controls.autoRotate = false;
  if (state.resumeTimer !== null) {
    clearTimeout(state.resumeTimer);
    state.resumeTimer = null;
  }
}
