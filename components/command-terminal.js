/**
 * components/command-terminal.js
 * CommandTerminal JS API — interactive CLI panel with history, tab completion, and glitch effects.
 *
 * Usage:
 *   import { mountTerminal, unmountTerminal, printLine, clearOutput, setPrompt, focusInput }
 *     from './components/command-terminal.js';
 */

// ── Internal state registry ────────────────────────────────────
// Keyed by terminal root element; stores AbortController + runtime state

const _state = new WeakMap();

// ── mountTerminal ──────────────────────────────────────────────

/**
 * Set up keydown handling, history navigation, tab completion, and glitch effects
 * on a .s9-terminal element. Call once after the element is added to the DOM.
 *
 * @param {HTMLElement} element - .s9-terminal root
 * @param {{ onSubmit?: Function, tabComplete?: Function }} [options]
 */
export function mountTerminal(element, { onSubmit, tabComplete } = {}) {
  const ac = new AbortController();
  const { signal } = ac;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    abortController: ac,
    history: [],
    historyIndex: -1,
    partialInput: '',
    reducedMotion,
  };
  _state.set(element, state);

  const input = element.querySelector('.s9-terminal__input');
  if (!input) return;

  input.addEventListener(
    'keydown',
    (event) => {
      _handleKeydown(element, event, { onSubmit, tabComplete });
    },
    { signal }
  );
}

// ── unmountTerminal ────────────────────────────────────────────

/**
 * Tear down all listeners on a .s9-terminal element.
 *
 * @param {HTMLElement} element - .s9-terminal root
 */
export function unmountTerminal(element) {
  const state = _state.get(element);
  if (state) {
    state.abortController.abort();
    _state.delete(element);
  }
}

// ── printLine ──────────────────────────────────────────────────

/**
 * Append a line to the terminal output and scroll to bottom.
 * For type 'cmd', do NOT pass '>' in text — CSS adds it via ::before.
 *
 * @param {HTMLElement} element - .s9-terminal root
 * @param {string} text - Line content (no leading '>' for cmd lines)
 * @param {'sys'|'cmd'|'err'|'info'} type
 */
export function printLine(element, text, type) {
  const output = element.querySelector('.s9-terminal__output');
  if (!output) return;

  const line = document.createElement('span');
  line.className = `s9-terminal__line s9-terminal__line--${type}`;
  line.textContent = text;

  output.appendChild(line);
  _scrollOutputToBottom(output);
}

// ── clearOutput ────────────────────────────────────────────────

/**
 * Remove all output lines from the terminal.
 * Fires s9:terminal-clear on the element.
 *
 * @param {HTMLElement} element - .s9-terminal root
 */
export function clearOutput(element) {
  const output = element.querySelector('.s9-terminal__output');
  if (!output) return;

  output.querySelectorAll('.s9-terminal__line').forEach((line) => line.remove());

  element.dispatchEvent(
    new CustomEvent('s9:terminal-clear', { bubbles: true })
  );
}

// ── setPrompt ──────────────────────────────────────────────────

/**
 * Update the terminal prompt text.
 *
 * @param {HTMLElement} element - .s9-terminal root
 * @param {string} text - Non-empty prompt string
 */
export function setPrompt(element, text) {
  if (!text) {
    console.warn('[s9-terminal] setPrompt: prompt text must be a non-empty string.');
    return;
  }

  const prompt = element.querySelector('.s9-terminal__prompt');
  if (prompt) {
    prompt.textContent = text;
  }
}

// ── focusInput ─────────────────────────────────────────────────

/**
 * Focus the terminal input field.
 *
 * @param {HTMLElement} element - .s9-terminal root
 */
export function focusInput(element) {
  const input = element.querySelector('.s9-terminal__input');
  if (input) input.focus();
}

// ── Internal: keydown handler ──────────────────────────────────

function _handleKeydown(element, event, { onSubmit, tabComplete }) {
  const state = _state.get(element);
  if (!state) return;

  const input = element.querySelector('.s9-terminal__input');
  if (!input) return;

  switch (event.key) {
    case 'Enter': {
      const value = input.value;
      if (!value) return;

      printLine(element, value, 'cmd');

      if (typeof onSubmit === 'function') {
        onSubmit(value);
      }

      element.dispatchEvent(
        new CustomEvent('s9:terminal-submit', {
          bubbles: true,
          detail: { command: value, timestamp: new Date().toISOString() },
        })
      );

      state.history.unshift(value);
      state.historyIndex = -1;
      state.partialInput = '';
      input.value = '';
      break;
    }

    case 'ArrowUp': {
      event.preventDefault();
      if (state.history.length === 0) return;

      if (state.historyIndex === -1) {
        state.partialInput = input.value;
      }

      const nextIndex = state.historyIndex + 1;
      if (nextIndex < state.history.length) {
        state.historyIndex = nextIndex;
        input.value = state.history[state.historyIndex];
        // Move cursor to end
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
      break;
    }

    case 'ArrowDown': {
      event.preventDefault();
      if (state.historyIndex === -1) return;

      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        input.value = state.history[state.historyIndex];
        const len = input.value.length;
        input.setSelectionRange(len, len);
      } else {
        // historyIndex === 0: restore partial input
        state.historyIndex = -1;
        input.value = state.partialInput;
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
      break;
    }

    case 'Tab': {
      event.preventDefault();
      if (typeof tabComplete === 'function') {
        const result = tabComplete(input.value);
        if (result != null) {
          input.value = result;
        }
      }
      break;
    }

    default: {
      // Printable keydown glitch effect (1% chance, no ctrl/meta/alt)
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !state.reducedMotion &&
        Math.random() < 0.01
      ) {
        const output = element.querySelector('.s9-terminal__output');
        if (output) {
          const lines = Array.from(output.querySelectorAll('.s9-terminal__line'));
          const pool = lines.slice(-8);
          if (pool.length > 0) {
            const target = pool[Math.floor(Math.random() * pool.length)];
            target.classList.add('glitch-enter');
            target.addEventListener(
              'animationend',
              (e) => {
                if (e.animationName === 'glitch') {
                  target.classList.remove('glitch-enter');
                }
              },
              { once: true }
            );
          }
        }
      }
      break;
    }
  }
}

// ── Internal: scroll helper ────────────────────────────────────

function _scrollOutputToBottom(output) {
  output.scrollTop = output.scrollHeight;
}
