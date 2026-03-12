/**
 * components/panel-shell.js
 * PanelShell JS API — mount lifecycle, alert/active state management.
 *
 * All public functions operate on a .s9-panel DOM element.
 * Import individually or destructure from default export.
 *
 * Usage:
 *   import { mountPanel, unmountPanel, panelAlert, panelClearAlert, panelSetActive }
 *     from './components/panel-shell.js';
 */

// ── Internal registry ──────────────────────────────────────────
// Maps element → AbortController so unmountPanel() can cancel the
// animationend listener even if crt-flicker has not yet fired.
const _controllers = new WeakMap();

// ── mountPanel ─────────────────────────────────────────────────

/**
 * Initialise a .s9-panel element: add the booting class and wire
 * the animationend listener that removes it and fires s9:panel-mount.
 *
 * @param {HTMLElement} element - .s9-panel root element
 */
export function mountPanel(element) {
  const ac = new AbortController();
  _controllers.set(element, ac);

  element.classList.add('s9-panel--booting');

  element.addEventListener(
    'animationend',
    (event) => {
      if (event.animationName !== 'crt-flicker') return;
      element.classList.remove('s9-panel--booting');
      element.dispatchEvent(
        new CustomEvent('s9:panel-mount', {
          bubbles: true,
          detail: { id: element.dataset.s9Id ?? null },
        })
      );
    },
    { signal: ac.signal, once: true }
  );
}

// ── unmountPanel ────────────────────────────────────────────────

/**
 * Tear down a .s9-panel element: abort the animationend listener
 * and clean up. Call when removing the element from the DOM.
 *
 * @param {HTMLElement} element - .s9-panel root element
 */
export function unmountPanel(element) {
  const ac = _controllers.get(element);
  if (ac) {
    ac.abort();
    _controllers.delete(element);
  }
}

// ── panelAlert ──────────────────────────────────────────────────

/**
 * Put a panel into alert state. Updates DOM classes, data-s9-state,
 * header status text, and fires s9:panel-alert.
 *
 * @param {HTMLElement} element  - .s9-panel root element
 * @param {'warning'|'critical'} level
 * @param {string} message
 */
export function panelAlert(element, level, message) {
  element.classList.add('s9-panel--alert');
  element.dataset.s9State = 'alert';

  const status = element.querySelector('.s9-panel__header-status');
  if (status) {
    status.dataset.s9PrevStatus = status.textContent;
    status.textContent = level === 'critical' ? '■ CRITICAL' : '▲ WARNING';
  }

  element.dispatchEvent(
    new CustomEvent('s9:panel-alert', {
      bubbles: true,
      detail: {
        id: element.dataset.s9Id ?? null,
        level,
        message,
      },
    })
  );
}

// ── panelClearAlert ─────────────────────────────────────────────

/**
 * Remove alert state from a panel. Restores previous status text
 * and resets data-s9-state to idle.
 *
 * @param {HTMLElement} element - .s9-panel root element
 */
export function panelClearAlert(element) {
  element.classList.remove('s9-panel--alert');
  element.dataset.s9State = 'idle';

  const status = element.querySelector('.s9-panel__header-status');
  if (status) {
    status.textContent = status.dataset.s9PrevStatus ?? '● ONLINE';
    delete status.dataset.s9PrevStatus;
  }
}

// ── panelSetActive ──────────────────────────────────────────────

/**
 * Set or unset the active/focused state on a panel.
 *
 * @param {HTMLElement} element - .s9-panel root element
 * @param {boolean} active
 */
export function panelSetActive(element, active) {
  element.classList.toggle('s9-panel--active', active);
  element.dataset.s9State = active ? 'active' : 'idle';
}
