/**
 * components/alert-banner.js
 * AlertBanner JS API — create, auto-dismiss, and remove alert banners.
 *
 * Usage:
 *   import { showAlert, dismissAlert }
 *     from './components/alert-banner.js';
 */

const AUTO_DISMISS_MS = 8000;

// ── showAlert ──────────────────────────────────────────────────

/**
 * Create and insert an .s9-alert element into `containerEl`.
 * Starts an 8-second auto-dismiss timer unless `persistent` is true.
 *
 * @param {HTMLElement} containerEl - parent element to insert the banner into
 * @param {{ level: 'critical'|'warning', code: string, message: string, persistent?: boolean }} opts
 * @returns {HTMLElement} the created banner element
 */
export function showAlert(containerEl, { level = 'critical', code, message, persistent = false }) {
  const banner = document.createElement('div');
  banner.className = `s9-alert s9-alert--${level}`;

  if (persistent) {
    banner.dataset.persistent = 'true';
  }

  const icon = level === 'critical' ? '⬡' : '⚠';
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  banner.innerHTML =
    `<span class="s9-alert__icon" aria-hidden="true">${icon}</span>` +
    `<div class="s9-alert__body">` +
      `<span class="s9-alert__code">${_esc(code)}</span>` +
      `<span class="s9-alert__message">${_esc(message)}</span>` +
    `</div>` +
    `<span class="s9-alert__timestamp">${_esc(timestamp)}</span>` +
    `<button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`;

  // Glitch-enter animation on insert
  banner.classList.add('glitch-enter');
  banner.addEventListener(
    'animationend',
    () => banner.classList.remove('glitch-enter'),
    { once: true }
  );

  // Dismiss button
  banner.querySelector('.s9-alert__dismiss').addEventListener('click', () => {
    dismissAlert(banner);
  });

  containerEl.appendChild(banner);

  // Auto-dismiss
  if (!persistent) {
    setTimeout(() => {
      if (banner.isConnected) dismissAlert(banner);
    }, AUTO_DISMISS_MS);
  }

  return banner;
}

// ── dismissAlert ──────────────────────────────────────────────

/**
 * Trigger the dismiss animation then remove the banner from the DOM.
 * Fires `s9:alert-dismissed` with `{ code }`.
 *
 * @param {HTMLElement} bannerEl - .s9-alert element
 */
export function dismissAlert(bannerEl) {
  if (!bannerEl.isConnected) return;

  const code = bannerEl.querySelector('.s9-alert__code')?.textContent ?? '';

  bannerEl.classList.add('s9-alert--dismissing');

  bannerEl.addEventListener(
    'transitionend',
    () => {
      bannerEl.dispatchEvent(
        new CustomEvent('s9:alert-dismissed', {
          bubbles: true,
          detail: { code },
        })
      );
      bannerEl.remove();
    },
    { once: true }
  );

  // Fallback in case transitionend never fires (e.g. reduced-motion)
  setTimeout(() => {
    if (bannerEl.isConnected) {
      bannerEl.dispatchEvent(
        new CustomEvent('s9:alert-dismissed', {
          bubbles: true,
          detail: { code },
        })
      );
      bannerEl.remove();
    }
  }, 400);
}

// ── Internal helpers ───────────────────────────────────────────

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
