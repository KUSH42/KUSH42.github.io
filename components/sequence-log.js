/**
 * components/sequence-log.js
 * SequenceLog JS API — step state transitions with flash animation for failures.
 *
 * Usage:
 *   import { setStepState } from './components/sequence-log.js';
 */

const STATES = ['complete', 'active', 'failed', 'pending'];

// ── setStepState ───────────────────────────────────────────────

/**
 * Update a `.s9-sequence__entry` element to reflect the given state.
 * - Removes all state modifier classes
 * - Adds correct modifier
 * - If 'failed': plays 2x opacity flash animation before settling
 * - Fires `s9:sequence-step-change` on the entry element
 *
 * @param {HTMLElement} entryEl - .s9-sequence__entry element
 * @param {'complete'|'active'|'failed'|'pending'} state
 */
export function setStepState(entryEl, state) {
  if (!STATES.includes(state)) {
    console.warn(`[s9-sequence] Unknown state: "${state}". Expected one of: ${STATES.join(', ')}.`);
    return;
  }

  // Remove all state classes
  STATES.forEach((s) => entryEl.classList.remove(`s9-sequence__entry--${s}`));

  if (state === 'failed') {
    // Flash twice, then settle on failed
    entryEl.classList.add('s9-sequence__entry--fail-flash');
    entryEl.addEventListener(
      'animationend',
      () => {
        entryEl.classList.remove('s9-sequence__entry--fail-flash');
        entryEl.classList.add('s9-sequence__entry--failed');
        _dispatchChange(entryEl, state);
      },
      { once: true }
    );
  } else {
    entryEl.classList.add(`s9-sequence__entry--${state}`);
    _dispatchChange(entryEl, state);
  }
}

// ── Internal helpers ───────────────────────────────────────────

function _dispatchChange(entryEl, state) {
  entryEl.dispatchEvent(
    new CustomEvent('s9:sequence-step-change', {
      bubbles: true,
      detail: { state },
    })
  );
}
