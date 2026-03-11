/**
 * components/neural-readout.js
 * NeuralReadout JS API — glitch update helper and status bar fill controller.
 *
 * Usage:
 *   import { glitchUpdate, setStatusBarValue }
 *     from './components/neural-readout.js';
 */

// ── glitchUpdate ───────────────────────────────────────────────

/**
 * Execute a DOM mutation via `fn`, then apply `.glitch-enter` on `element`
 * and remove it when the animation completes.
 *
 * @param {HTMLElement} element - element to glitch (typically .s9-neural or a child)
 * @param {Function} fn - synchronous DOM mutation callback
 */
export function glitchUpdate(element, fn) {
  fn();

  // Remove any leftover glitch class before re-triggering
  element.classList.remove('glitch-enter');

  // Force reflow so the browser registers the re-add
  void element.offsetWidth;

  element.classList.add('glitch-enter');
  element.addEventListener(
    'animationend',
    () => element.classList.remove('glitch-enter'),
    { once: true }
  );
}

// ── setStatusBarValue ──────────────────────────────────────────

/**
 * Update a `.s9-neural__status-bar-fill` element to reflect a 0–100 value.
 * Adds `--critical` modifier class when value > 80.
 *
 * @param {HTMLElement} barEl - the .s9-neural__status-bar-fill element
 * @param {number} value - 0 to 100
 */
export function setStatusBarValue(barEl, value) {
  const clamped = Math.max(0, Math.min(100, value));
  barEl.style.width = `${clamped}%`;

  if (clamped > 80) {
    barEl.classList.add('s9-neural__status-bar-fill--critical');
  } else {
    barEl.classList.remove('s9-neural__status-bar-fill--critical');
  }
}
