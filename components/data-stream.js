/**
 * components/data-stream.js
 * DataStream JS API — live scrolling log with hover-pause, click-to-pin, and source filtering.
 *
 * Usage:
 *   import { mountStream, unmountStream, appendRow, clearRows, setFilter }
 *     from './components/data-stream.js';
 */

// ── Internal state registry ────────────────────────────────────
// Keyed by stream element; stores AbortController + runtime flags

const _state = new WeakMap();

// ── mountStream ────────────────────────────────────────────────

/**
 * Set up hover-pause and click-to-pin behaviour on a .s9-stream element.
 * Call once after the element is added to the DOM.
 *
 * @param {HTMLElement} element - .s9-stream root
 */
export function mountStream(element) {
  const ac = new AbortController();
  const { signal } = ac;

  const state = {
    ac,
    paused: false,
    filter: null,
  };
  _state.set(element, state);

  const body = element.querySelector('.s9-stream__body');
  if (!body) return;

  // ── Hover → pause auto-scroll ──────────────────────────────
  body.addEventListener(
    'mouseenter',
    () => {
      state.paused = true;
      body.dataset.paused = 'true';
    },
    { signal }
  );

  body.addEventListener(
    'mouseleave',
    () => {
      state.paused = false;
      body.dataset.paused = 'false';
      _scrollToBottom(body);
    },
    { signal }
  );

  // ── Click row → toggle pinned ───────────────────────────────
  body.addEventListener(
    'click',
    (event) => {
      const row = event.target.closest('.s9-stream__row');
      if (!row) return;

      const wasPinned = row.classList.contains('s9-stream__row--pinned');
      row.classList.toggle('s9-stream__row--pinned', !wasPinned);

      element.dispatchEvent(
        new CustomEvent('s9:stream-row-pinned', {
          bubbles: true,
          detail: { row, pinned: !wasPinned },
        })
      );
    },
    { signal }
  );
}

// ── unmountStream ──────────────────────────────────────────────

/**
 * Tear down all listeners on a .s9-stream element.
 *
 * @param {HTMLElement} element - .s9-stream root
 */
export function unmountStream(element) {
  const state = _state.get(element);
  if (state) {
    state.ac.abort();
    _state.delete(element);
  }
}

// ── appendRow ──────────────────────────────────────────────────

/**
 * Create and insert a new log row into the stream body.
 * Applies glitch-enter animation; removes it on animationend.
 * Auto-scrolls to bottom unless paused.
 *
 * @param {HTMLElement} element - .s9-stream root
 * @param {{ timestamp: string, source: string, message: string, alert?: boolean }} row
 */
export function appendRow(element, { timestamp, source, message, alert = false }) {
  const body = element.querySelector('.s9-stream__body');
  if (!body) return;

  const state = _state.get(element);
  const filter = state?.filter ?? null;

  const row = document.createElement('div');
  row.className = 's9-stream__row';
  if (alert) row.classList.add('s9-stream__row--alert');

  // Apply filter visibility
  if (filter && source !== filter) {
    row.hidden = true;
  }

  row.innerHTML =
    `<span class="s9-stream__timestamp">${_esc(timestamp)}</span>` +
    `<span class="s9-stream__source">${_esc(source)}</span>` +
    `<span class="s9-stream__message">${_esc(message)}</span>`;

  // Glitch-enter animation
  row.classList.add('glitch-enter');
  row.addEventListener(
    'animationend',
    () => row.classList.remove('glitch-enter'),
    { once: true }
  );

  body.appendChild(row);

  // Cap DOM size to prevent unbounded growth
  const MAX_ROWS = 100;
  if (body.children.length > MAX_ROWS) {
    body.removeChild(body.firstChild);
  }

  // Auto-scroll
  if (!state?.paused) {
    _scrollToBottom(body);
  }
}

// ── clearRows ──────────────────────────────────────────────────

/**
 * Remove all rows from the stream body.
 *
 * @param {HTMLElement} element - .s9-stream root
 */
export function clearRows(element) {
  const body = element.querySelector('.s9-stream__body');
  if (body) body.innerHTML = '';
}

// ── setFilter ──────────────────────────────────────────────────

/**
 * Show only rows whose source matches `source`. Pass null to show all.
 *
 * @param {HTMLElement} element - .s9-stream root
 * @param {string|null} source
 */
export function setFilter(element, source) {
  const state = _state.get(element);
  if (state) state.filter = source;

  const body = element.querySelector('.s9-stream__body');
  if (!body) return;

  body.querySelectorAll('.s9-stream__row').forEach((row) => {
    const rowSource = row.querySelector('.s9-stream__source')?.textContent ?? '';
    row.hidden = source !== null && rowSource !== source;
  });
}

// ── Internal helpers ───────────────────────────────────────────

function _scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
