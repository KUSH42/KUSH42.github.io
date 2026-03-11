/**
 * aesthetic/variables/theme.js
 * GitS UI — Theme switcher JS API
 *
 * Usage:
 *   import { setTheme, getTheme, applyPersistedTheme, THEMES } from '/aesthetic/variables/theme.js';
 *
 * Call applyPersistedTheme() in <head> after stylesheet <link> tags.
 */

const DEFAULT_THEME = 'matrixgreen';
const STORAGE_KEY   = 's9-theme';

/** All bundled theme names. */
export const THEMES = ['matrixgreen', 'gits', 'amber', 'phosphor', 'blood'];

/**
 * Get the currently active theme name.
 * Returns DEFAULT_THEME when no data-theme attribute is present.
 * @returns {string}
 */
export function getTheme() {
  return document.documentElement.dataset.theme ?? DEFAULT_THEME;
}

/**
 * Set the active theme.
 * - Writing the default theme removes the data-theme attribute.
 * - No-op if the requested theme is already active.
 * - Unknown names log a console.warn and do nothing.
 * - Persists to localStorage unless persist=false.
 * @param {string} name
 * @param {boolean} [persist=true]
 */
export function setTheme(name, persist = true) {
  if (!THEMES.includes(name)) {
    console.warn(`[s9-theme] Unknown theme "${name}". Valid: ${THEMES.join(', ')}`);
    return;
  }

  const current = getTheme();
  if (current === name) return; // idempotent — no DOM thrash, no event

  const from = current;

  if (name === DEFAULT_THEME) {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = name;
  }

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // localStorage unavailable (private browsing, storage full, etc.) — silently ignore
    }
  }

  document.dispatchEvent(new CustomEvent('s9:theme-change', {
    bubbles: false,
    detail: { from, to: name },
  }));
}

/**
 * Apply the persisted theme from localStorage.
 * Call once in <head> after stylesheet link tags.
 * Falls back to the default theme if no value is stored or the stored value is invalid.
 */
export function applyPersistedTheme() {
  let stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    return; // localStorage unavailable — use CSS default
  }

  if (stored && THEMES.includes(stored) && stored !== DEFAULT_THEME) {
    document.documentElement.dataset.theme = stored;
  }
}
