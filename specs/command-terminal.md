# CommandTerminal Component Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `CommandTerminal` |
| **CSS Block** | `.s9-terminal` |
| **Status** | `approved` |
| **Column** | `any` (flexible placement) |
| **COMPONENTS.MD entry** | `yes` — update class API after approval |

---

## Purpose

CLI-style command interface panel. Scrollable output area with typed input, command history, tab completion hook, and typing-triggered glitch on nearby output lines.

---

## CSS Class API

```
.s9-terminal                  — root container (role="region")
.s9-terminal__output          — scrollable output area (role="log", aria-live="polite")
.s9-terminal__line            — single output line; all types animate in on append
.s9-terminal__line--cmd       — user-submitted command (> prefix via CSS ::before, --neon-green)
.s9-terminal__line--sys       — system response (--text-primary)
.s9-terminal__line--err       — error output (--text-alert)
.s9-terminal__line--info      — informational / dim commentary (--text-secondary)
.s9-terminal__input-row       — sticky bottom input bar
.s9-terminal__prompt          — prompt symbol `[S9]▶` (--neon-cyan, aria-hidden)
.s9-terminal__input           — text input element (transparent bg, caret-color: --neon-cyan)
```

---

## Content Structure

```html
<div class="s9-terminal" role="region" aria-label="COMMAND TERMINAL"
     data-s9-id="unique-id">
  <div class="s9-terminal__output" role="log" aria-live="polite"
       aria-label="Terminal output" tabindex="0">
    <div class="s9-terminal__line s9-terminal__line--sys">
      SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS
    </div>
  </div>
  <div class="s9-terminal__input-row">
    <span class="s9-terminal__prompt" aria-hidden="true">[S9]▶</span>
    <input class="s9-terminal__input" type="text"
           autocomplete="off" autocorrect="off" spellcheck="false"
           aria-label="Command input" />
  </div>
</div>
```

### Rules
- `role="region"` + `aria-label` on root — it is an interactive tool, not supplementary content.
- `role="log"` + `aria-live="polite"` on `__output` so screen readers announce new lines.
- `tabindex="0"` on `__output` for keyboard scroll access. Tab order: `__output` appears before `__input` in DOM. Tab from `__output` → `__input`. Tab from `__input` → next tabbable element outside the component (exits). Shift-Tab from `__input` → `__output`. Shift-Tab from `__output` → previous tabbable element outside the component.
- `aria-hidden="true"` on `__prompt` — decorative only; the input `aria-label` provides context.
- `__input` must be `type="text"` — no `type="search"` (browser clears button interferes with styling).
- `autocomplete="off"` required — browser history autocomplete must not overlay the terminal UI.
- **The `>` prefix on `--cmd` lines is CSS-only** (`::before { content: '> ' }`). The `text` argument to `printLine()` must NOT include the `>` prefix when `type === 'cmd'`. Passing `'status'` with type `'cmd'` produces `> status`.

---

## Data Requirements

- Prompt string: any non-empty string; default `[S9]▶`. `setPrompt()` must validate non-empty.
- Output lines: plain text strings; may contain spaces but no raw HTML. `printLine()` uses `textContent` — never `innerHTML`. Callers must not pass HTML strings.
- Command history: JS-managed array on WeakMap state, never persisted to localStorage.
- Tab completion: optional external hook `(partial: string) => string | null`

---

## Interactivity

| Trigger | Element | Key Filter | Action | Visual Effect |
|---|---|---|---|---|
| `keydown` Enter | `__input` | Enter | submit command | print `--cmd` line, clear input, fire `s9:terminal-submit` |
| `keydown` ↑ / ↓ | `__input` | ArrowUp / ArrowDown | history navigation | fill input with previous/next command |
| `keydown` Tab | `__input` | Tab | tab completion | call `tabComplete` hook; insert result if non-null; `e.preventDefault()` |
| `keydown` printable | `__input` | exclude Arrow*, Tab, Enter, Escape, modifier-only | typing glitch | 1% chance: pick random line from last 8 `__line` elements; apply `.glitch-enter`; remove on `animationend` where `event.animationName === 'glitch'` |
| `:focus-within` | `__input-row` | — | — | `__input-row` border-top-color → `--panel-border-active` (CSS-only) |

**History navigation rules:**
- ↑ from un-navigated state: save current `input.value` as `partialInput` in WeakMap state object, navigate to most recent history entry.
- ↑ at oldest entry: do nothing (no wrap).
- ↓ at most recent entry: restore `partialInput` from WeakMap state, set history cursor to -1 (un-navigated).
- ↓ with no prior navigation: do nothing.

**Printable key filter (glitch):** A keydown event qualifies as a printable character press if `event.key.length === 1` and `!event.ctrlKey && !event.metaKey && !event.altKey`. This excludes all named keys (Arrow*, Tab, Enter, Escape, F1-F12, Backspace, etc.) and all modifier combinations. The 1% probability is evaluated as `Math.random() < 0.01` at the time of each qualifying keydown event.

---

## Effects

- [x] **Line slide-in** (`terminal-line-in` keyframe): opacity 0→1, translateX -4px→0, 0.15s ease-out forwards. **Defined in `aesthetic/components/command-terminal.css` only — not in `aesthetic/effects/index.css`.** Do not add to the effects barrel.
- [x] **Glitch on typing**: `.glitch-enter` (from `aesthetic/effects/index.css`) applied to a randomly chosen element from the last 8 `__line` elements. 1% probability per qualifying keypress. Removed on `animationend` where `event.animationName === 'glitch'`. The keyframe in `aesthetic/effects/index.css` is named `@keyframes glitch` — this is the name matched against `event.animationName`. Disabled under `prefers-reduced-motion`.
- [x] **Caret**: browser native text caret, coloured with `caret-color: var(--neon-cyan)`.
- [x] **Input row focus glow**: CSS `:focus-within` on `__input-row` → `border-top-color: var(--panel-border-active)`. No JS required.
- [x] **Auto-scroll**: `printLine()` must set `__output.scrollTop = __output.scrollHeight` after appending a line. In v1, scrolling is always to bottom on new output; no detection of user scroll-up position is required.

`prefers-reduced-motion`: `terminal-line-in` animation suppressed (`animation: none; opacity: 1`). Glitch effect disabled entirely (the 1% branch is not entered when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`). Input-row transition removed.

Note on load order: `aesthetic/components/command-terminal.css` loads after `aesthetic/effects/index.css` via the aesthetic barrel. The global reduced-motion rule in `effects/index.css` uses `animation-duration: 0.01ms !important` — the component-level `animation: none; opacity: 1` rule in its own `@media (prefers-reduced-motion)` block overrides this correctly because it is more specific and comes later in source order.

---

## JavaScript Events

| Event | Fired on | Detail | When |
|---|---|---|---|
| `s9:terminal-submit` | `.s9-terminal` | `{ command: string, timestamp: string }` | after Enter pressed and line printed |
| `s9:terminal-clear` | `.s9-terminal` | `{}` | when `clearOutput()` removes all lines |

`timestamp` is `new Date().toISOString()` — UTC ISO 8601 string. Both events `bubbles: true`.

---

## Public JS API

```js
// Mount: attach keydown listener on __input; check reduced-motion at init
mountTerminal(element, { onSubmit?, tabComplete? })

// Teardown: call abortController.abort(); removes keydown listener
unmountTerminal(element)

// Print a line to __output; type: 'sys' | 'cmd' | 'err' | 'info'
// Uses textContent (never innerHTML). Scrolls __output to bottom after append.
// text must NOT include '>' prefix when type === 'cmd'.
printLine(element, text, type)

// Clear all __line elements from __output; fires s9:terminal-clear
clearOutput(element)

// Change the prompt text node in __prompt element.
// Validates text is non-empty string; logs console.warn and returns without updating if empty/falsy.
setPrompt(element, text)

// Focus the __input element
focusInput(element)
```

`onSubmit(command)`: optional callback invoked after the command line is printed. Return value ignored.
`tabComplete(partial)`: called on Tab with current input value; returns string to insert or `null` to do nothing.

---

## Listener Lifecycle

`mountTerminal()` stores `{ abortController, history: [], historyIndex: -1, partialInput: '' }` on a WeakMap keyed by the element. One `keydown` listener on `__input` with `{ signal: ac.signal }` handles all keyboard interactions. `unmountTerminal()` calls `abortController.abort()` which automatically removes the listener.

Glitch reduced-motion check: performed once at mount time via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`; result stored on WeakMap state as `reducedMotion: boolean`. If `true`, the glitch branch in the keydown handler is never entered.

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-s9-id` | `.s9-terminal` | unique string | instance identifier for event `detail` (future use) |

---

## Structure Plane

`structure/components/command-terminal.css` — layout only, zero color/effect:

```css
.s9-terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.s9-terminal__output {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--panel-padding);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.s9-terminal__line {
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
}

.s9-terminal__input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 var(--panel-padding);
  height: var(--header-height);
  min-height: var(--header-height);
  flex-shrink: 0;
}

.s9-terminal__prompt {
  flex-shrink: 0;
  white-space: nowrap;
}

/* font: inherit ensures input uses the same font stack as the parent;
   browser UA stylesheets often reset font-size on input elements. */
.s9-terminal__input {
  flex: 1;
  min-width: 0;
  font: inherit;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
}
```

---

## Aesthetic Plane

`aesthetic/components/command-terminal.css` — color/animation only, zero layout:

Note: `terminal-line-in` is component-local. It is defined here and must NOT be added to `aesthetic/effects/index.css`.

```css
/* Component-local keyframe — do not move to effects/index.css */
@keyframes terminal-line-in {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}

.s9-terminal__output {
  scrollbar-width: thin;
}

.s9-terminal__line {
  font-family: var(--font-terminal);
  font-size: 0.65rem;
  line-height: 1.6;
  color: var(--text-primary);
  opacity: 0;
  animation: terminal-line-in 0.15s ease-out forwards;
}

/* > prefix is CSS-only — printLine() callers must NOT include it in text */
.s9-terminal__line--cmd::before { content: '> '; }

.s9-terminal__line--cmd  { color: var(--neon-green); }
.s9-terminal__line--sys  { color: var(--text-primary); }
.s9-terminal__line--err  { color: var(--text-alert); }
.s9-terminal__line--info { color: var(--text-secondary); }

.s9-terminal__input-row {
  border-top: 1px solid var(--panel-border-dim);
  transition: border-top-color 0.15s ease;
}

.s9-terminal__input-row:focus-within {
  border-top-color: var(--panel-border-active);
}

.s9-terminal__prompt {
  font-family: var(--font-terminal);
  font-size: 0.65rem;
  color: var(--neon-cyan);
}

.s9-terminal__input {
  font-family: var(--font-terminal);
  font-size: 0.65rem;
  color: var(--text-primary);
  caret-color: var(--neon-cyan);
}

.s9-terminal__input::placeholder {
  color: var(--text-dim);
}

/* Reduced motion: suppress line animation; glitch disabled in JS via matchMedia */
@media (prefers-reduced-motion: reduce) {
  .s9-terminal__line {
    animation: none;
    opacity: 1;
  }
  .s9-terminal__input-row {
    transition: none;
  }
}
```

---

## Accessibility

- [x] `role="region"` + `aria-label` on root (interactive tool — not supplementary content; `role="complementary"` is incorrect here)
- [x] `role="log"` + `aria-live="polite"` on `__output` — announces new lines without interrupting
- [x] `tabindex="0"` on `__output` — keyboard users can scroll with Arrow/Page keys when focused
- [x] Tab order: `__output` before `__input` in DOM — Tab from `__output` reaches `__input`; Tab from `__input` exits the component; Shift-Tab from `__input` returns to `__output`
- [x] `aria-hidden="true"` on `__prompt` — decorative; input `aria-label` covers context
- [x] `aria-label="Command input"` on `__input`
- [x] `prefers-reduced-motion`: animation suppressed in CSS; glitch branch skipped in JS via matchMedia check at mount time

---

## Quality Gates

- [x] Spec approved before any code written
- [ ] Structure CSS in `structure/components/command-terminal.css` — zero color/effect
- [ ] Aesthetic CSS in `aesthetic/components/command-terminal.css` — zero layout
- [ ] Combined barrel in `components/command-terminal.css`
- [ ] `aesthetic/index.css` updated to import `./components/command-terminal.css`
- [ ] `mountTerminal()` / `unmountTerminal()` use AbortController (WeakMap-keyed)
- [ ] History state (array, index, partialInput, reducedMotion) stored on WeakMap value, not DOM
- [ ] `partialInput` saved to WeakMap state when ↑ is first pressed from un-navigated state
- [ ] Tab completion: `e.preventDefault()` always on Tab; inserts result if non-null; no-op if null
- [ ] ↑ / ↓ navigation does not wrap; ↓ at most recent restores `partialInput`
- [ ] Glitch: only fires on printable character keydowns (`event.key.length === 1`, no ctrl/meta/alt)
- [ ] Glitch: 1% probability per qualifying keypress; only last 8 `__line` elements considered
- [ ] Glitch: `.glitch-enter` removed on `animationend` where `event.animationName === 'glitch'`
- [ ] Glitch: disabled when `reducedMotion === true` (checked once at mount via matchMedia)
- [ ] `printLine()` uses `textContent` not `innerHTML` (XSS prevention)
- [ ] `printLine()` scrolls `__output` to bottom after appending (`scrollTop = scrollHeight`)
- [ ] `printLine()` text for `type === 'cmd'` must not include `>` prefix (CSS provides it)
- [ ] `setPrompt()` validates non-empty; logs `console.warn` and returns without update if falsy
- [ ] `terminal-line-in` keyframe defined in `aesthetic/components/command-terminal.css` only — NOT in `aesthetic/effects/index.css`
- [ ] `s9:terminal-submit` `timestamp` is `new Date().toISOString()` (UTC)
- [ ] `s9:terminal-submit` and `s9:terminal-clear` events `bubbles: true`
- [ ] Visual test page at `tests/visual/command-terminal.html`
- [ ] COMPONENTS.MD entry updated with final class API
