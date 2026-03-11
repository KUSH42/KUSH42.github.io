# PanelShell Component Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `PanelShell` |
| **CSS Block** | `.s9-panel` |
| **Status** | `approved` |
| **Column** | `left` \| `right` \| `center` (all columns) |
| **COMPONENTS.MD entry** | `yes` — entry already exists; update class API after approval |

---

## Purpose

Base container wrapping every data panel in the S9-OV layout; provides the border, header bar, holographic scanline body, and unified mount/alert/active state lifecycle for all child components.

---

## CSS Class API

```
.s9-panel                       — root container
.s9-panel__header               — top label bar (fixed height --header-height)
.s9-panel__header-label         — primary English label (Orbitron, uppercase)
.s9-panel__header-jp            — Japanese counterpart label (Noto Sans JP, dim)
.s9-panel__header-status        — right-aligned status indicator (● ONLINE / ● ALERT)
.s9-panel__body                 — scrollable content area; add .holographic for scanlines
.s9-panel__footer               — optional bottom status strip (fixed height)

.s9-panel--active               — focused/selected state: brighter border + left cyan accent bar
.s9-panel--alert                — critical state: magenta border + 1Hz pulse animation
.s9-panel--booting              — transient class added on mount, removed after crt-flicker completes
.s9-panel--collapsed            — body hidden, header only visible (v1: CSS-only, no animation)
```

---

## Content Structure

Minimal valid HTML:

```html
<div class="s9-panel" role="region" aria-label="PANEL NAME" tabindex="0" data-s9-id="unique-id" data-s9-state="idle">
  <div class="s9-panel__header">
    <span class="s9-panel__header-label">PANEL NAME</span>
    <span class="s9-panel__header-jp">[日本語]</span>
    <span class="s9-panel__header-status" aria-live="polite">● ONLINE</span>
  </div>
  <div class="s9-panel__body holographic">
    <!-- child component content -->
  </div>
</div>
```

With optional footer:

```html
<div class="s9-panel" role="region" aria-label="PANEL NAME" tabindex="0" data-s9-id="unique-id" data-s9-state="idle">
  <div class="s9-panel__header">
    <span class="s9-panel__header-label">PANEL NAME</span>
    <span class="s9-panel__header-jp">[日本語]</span>
    <span class="s9-panel__header-status" aria-live="polite">● ONLINE</span>
  </div>
  <div class="s9-panel__body holographic">
    <!-- child component content -->
  </div>
  <div class="s9-panel__footer">
    <!-- sub-status strip -->
  </div>
</div>
```

### Rules
- `__header-jp` is **required** — omitting it violates the Techno-Orientalism principle.
- `__header-status` is **required** — must always show a state indicator.
- `.holographic` on `__body` is **recommended** (scanlines); omit only if the child component manages its own scanline overlay.
- `data-s9-id` must be unique per page instance.

---

## Data Requirements

PanelShell is a structural wrapper — it carries no application data itself. Requirements are on child content:

- Header label string: ≥ 1 word, uppercase ASCII
- Japanese label string: ≥ 1 kanji/katakana token
- Status indicator: one of `● ONLINE`, `● ALERT`, `● STANDBY`, `● OFFLINE`
- Body content: provided by child component — PanelShell imposes no constraint

---

## Interactivity

| Trigger | Target | Action | Visual Effect |
|---|---|---|---|
| `mouseenter` | `.s9-panel` | — | border → `--panel-border-active`; `box-shadow: var(--glow-cyan)` |
| `mouseleave` | `.s9-panel` | — | border → `--panel-border`; box-shadow removed |
| `focus` (keyboard) | `.s9-panel` | — | same as hover |
| `blur` | `.s9-panel` | — | same as mouseleave |
| add `.s9-panel--active` | `.s9-panel` | programmatic | root `border-color` → `--panel-border-active`; `__header` `border-left-color` → `--neon-cyan` (accent bar) |
| add `.s9-panel--alert` | `.s9-panel` | programmatic | magenta border + 1Hz pulse; `__header-status` text → `■ ALERT` |
| DOM mount | `.s9-panel` | JS adds `.s9-panel--booting` | `crt-flicker` keyframe (1.2s); class removed on `animationend` where `animationName === 'crt-flicker'` |

Hover and focus are **CSS-only** — no JS required. Active and alert states are toggled by parent layout or child component JS.

---

## Effects

- [x] Scanlines (`.holographic::after`) — applied to `.s9-panel__body.holographic`
- [x] CRT flicker on mount (`crt-flicker` keyframe) — applied to `.s9-panel` via `.s9-panel--booting`
- [ ] Glitch on data update — N/A at shell level; child components own this
- [x] Neon glow text — `__header-label` receives `color: var(--neon-cyan); text-shadow: var(--glow-text-cyan)` in `--active` state via direct property (not `.neon-text` utility class)
- [x] Alert pulse (magenta, 1Hz) — applied to `.s9-panel--alert` border
- [x] Hover glow (cyan box-shadow) — CSS `:hover` + `:focus-within`

`prefers-reduced-motion`: all animations off; `panel-boot` skipped; hover box-shadow applied instantly (no transition).

---

## JavaScript Events

| Event name | Fired on | Detail payload | When |
|---|---|---|---|
| `s9:panel-mount` | `.s9-panel` | `{ id: string }` | after mount animation completes (`animationend`) |
| `s9:panel-alert` | `.s9-panel` | `{ id: string, level: 'warning'\|'critical', message: string }` | when `--alert` modifier is added programmatically via `panelAlert()` |

Event emission pattern:
```js
element.dispatchEvent(new CustomEvent('s9:panel-mount', {
  bubbles: true,
  detail: { id: element.dataset.s9Id }
}));
```

### Public JS API (module export)

```js
// Mount: add booting class, fire s9:panel-mount after animation
mountPanel(element)

// Set alert state: add --alert, update status text, update data-s9-state, fire s9:panel-alert
panelAlert(element, level, message)

// Clear alert state: remove --alert, restore status text, update data-s9-state → 'idle'
panelClearAlert(element)

// Toggle active: add/remove --active, update data-s9-state
panelSetActive(element, bool)

// Teardown: remove all event listeners added by mountPanel()
unmountPanel(element)
```

### Listener Lifecycle

`mountPanel()` adds exactly one listener, removed by `unmountPanel()`:

```
'animationend' on element
  → filter: event.animationName === 'crt-flicker'   (ignore other animations)
  → action: element.classList.remove('s9-panel--booting')
  →         dispatchEvent s9:panel-mount
  → teardown: listener is { once: true } — auto-removed after first fire
              unmountPanel() uses AbortController to cancel if element unmounts before animation ends
```

`unmountPanel()` calls `abortController.abort()` to remove the listener if it has not yet fired.

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-s9-id` | `.s9-panel` | unique string | instance identifier; used in event `detail.id` |
| `data-s9-state` | `.s9-panel` | `idle\|active\|alert\|offline` | current operational state; **JS API owns sync** — `panelSetActive()`, `panelAlert()`, `panelClearAlert()` are the only writers; never set this attribute directly from outside the API |

---

## Structure Plane

`structure/components/panel-shell.css` — layout only, zero color/effect:

```css
.s9-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;          /* flex child — allows shrink below content size */
  overflow: hidden;
  position: relative;     /* stacking context for scanline ::after overlay */
}

.s9-panel__header {
  display: flex;
  align-items: center;
  gap: var(--header-gap);
  height: var(--header-height);
  min-height: var(--header-height);
  padding: 0 var(--panel-padding);
  overflow: hidden;
  flex-shrink: 0;
}

.s9-panel__header-jp {
  flex-shrink: 0;
}

.s9-panel__header-status {
  margin-left: auto;
  flex-shrink: 0;
}

.s9-panel__body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--panel-padding);
  position: relative;     /* stacking context for .holographic ::after */
}

.s9-panel__footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-height: var(--footer-height);
  padding: 0 var(--panel-padding);
  overflow: hidden;
}

/* Collapsed: body and footer hidden */
.s9-panel--collapsed .s9-panel__body,
.s9-panel--collapsed .s9-panel__footer {
  display: none;
}
```

---

## Aesthetic Plane

`aesthetic/components/panel-shell.css` — color, border, shadow, animation only, zero layout:

```css
.s9-panel {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: var(--border-radius-panel);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

/* Hover / focus */
.s9-panel:hover,
.s9-panel:focus-within {
  border-color: var(--panel-border-active);
  box-shadow: var(--glow-cyan);
}

/* Active modifier — border-color only; left accent lives on __header to avoid double-border */
.s9-panel--active {
  border-color: var(--panel-border-active);
}

.s9-panel--active .s9-panel__header-label {
  color: var(--neon-cyan);
  text-shadow: var(--glow-text-cyan);
}

/* Alert modifier */
.s9-panel--alert {
  border-color: var(--panel-border-alert);
  animation: alert-pulse 1s steps(2) infinite;
}

@keyframes alert-pulse {
  0%, 100% { box-shadow: var(--glow-magenta); }
  50%       { box-shadow: none; }
}

/* Suppress alert animation on reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .s9-panel,
  .s9-panel:hover,
  .s9-panel:focus-within {
    transition: none;
  }
  .s9-panel--booting { animation: none; }
  .s9-panel--alert   { animation: none; }
}

/* Header */
.s9-panel__header {
  border-bottom: 1px solid var(--panel-border-dim);
  border-left: var(--border-accent-width) solid transparent; /* reserved slot — prevents layout shift on --active */
}

.s9-panel--active .s9-panel__header {
  border-left-color: var(--neon-cyan);
}

.s9-panel__header-label {
  font-family: var(--font-holo);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.s9-panel__header-jp {
  font-family: var(--font-jp);
  font-size: 0.6rem;
  color: var(--text-dim);
  white-space: nowrap;
}

.s9-panel__header-status {
  font-family: var(--font-terminal);
  font-size: 0.6rem;
  color: var(--text-ok);
  white-space: nowrap;
}

.s9-panel--alert .s9-panel__header-status {
  color: var(--text-alert);
}

/* Footer */
.s9-panel__footer {
  border-top: 1px solid var(--panel-border-dim);
  font-family: var(--font-terminal);
  font-size: 0.6rem;
  color: var(--text-dim);
}

/* Mount animation — keyframe defined in aesthetic/effects/index.css */
.s9-panel--booting {
  animation: crt-flicker 1.2s ease-out forwards;
}
```

Note: `.holographic` and `.panel-boot` keyframes are defined in `aesthetic/effects/index.css` — PanelShell references them but does not define them.

---

## Accessibility

- [x] `role="region"` + `aria-label` on root element (required at call site)
- [x] `aria-live="polite"` on `__header-status` so status changes are announced
- [x] Keyboard: `tabindex="0"` on `.s9-panel` (shown in Content Structure examples); `:focus-within` drives the same visual styles as `:hover`
- [x] `prefers-reduced-motion`: all `transition` and `animation` suppressed via media query in aesthetic CSS
- [x] Contrast: `--text-secondary` on `--panel-bg` ≥ 4.5:1 (verified: ~6.8:1)

---

## Quality Gates

- [ ] Spec approved before any code written
- [ ] Structure CSS in `structure/components/panel-shell.css` — zero color/effect properties
- [ ] Aesthetic CSS in `aesthetic/components/panel-shell.css` — zero layout properties
- [ ] Combined component in `components/panel-shell.css` imports both planes
- [ ] Japanese label on every visible English label (enforced at call site; spec documents requirement)
- [ ] `__header-status` element present in every instance
- [ ] Hover and focus-within visual states implemented in CSS
- [ ] `--active` and `--alert` modifier classes implemented
- [ ] `mountPanel()` / `unmountPanel()` JS API implemented with matched add/remove listeners
- [ ] `s9:panel-mount` and `s9:panel-alert` custom events implemented and bubble
- [ ] `data-s9-id` and `data-s9-state` wired in JS API
- [ ] `.s9-panel--booting` removed after `animationend` where `event.animationName === 'crt-flicker'`
- [ ] `prefers-reduced-motion` handled — all animations suppressed
- [ ] Visual test page exists at `tests/visual/panel-shell.html`
- [ ] COMPONENTS.MD entry updated with final class API
