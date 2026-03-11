# COMPONENTS.md – Predefined GitS UI Component Definitions

All components are named in the `S9-OV` (Section 9 Operative View) vocabulary.
Each entry defines: purpose, CSS classes, content structure, interactivity, and effects.

---

## 1. `PanelShell` — Base Panel Container

**Status:** `implemented` · Spec: `specs/panel-shell.md`

**Purpose:** Wraps every data panel. Provides border, header bar, holographic scanline body, and unified mount/alert/active state lifecycle for all child components.

**CSS Classes:**
```
.s9-panel                — root container
.s9-panel__header        — top label bar (height: --header-height)
.s9-panel__header-label  — primary English label (Orbitron, uppercase)
.s9-panel__header-jp     — Japanese counterpart label (required)
.s9-panel__header-status — right-aligned status indicator (aria-live="polite")
.s9-panel__body          — scrollable content area (.holographic for scanlines)
.s9-panel__footer        — optional bottom status strip (height: --footer-height)

.s9-panel--active        — brighter border + left cyan accent bar on __header
.s9-panel--alert         — magenta border + alert-pulse animation (1Hz)
.s9-panel--booting       — transient: crt-flicker animation; removed on animationend
.s9-panel--collapsed     — body + footer hidden; header only (CSS-only, no animation)
```

**Required Content Structure:**
```html
<div class="s9-panel" role="region" aria-label="PANEL NAME"
     tabindex="0" data-s9-id="unique-id" data-s9-state="idle">
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

**JS API:** `components/panel-shell.js`
```js
import { mountPanel, unmountPanel, panelAlert, panelClearAlert, panelSetActive }
  from './components/panel-shell.js';
```
- `mountPanel(el)` — add `--booting`, fire `s9:panel-mount` after `crt-flicker`
- `unmountPanel(el)` — abort listener via AbortController
- `panelAlert(el, level, message)` — add `--alert`, update status, fire `s9:panel-alert`
- `panelClearAlert(el)` — remove `--alert`, restore status
- `panelSetActive(el, bool)` — toggle `--active`, sync `data-s9-state`

**Custom Events (bubbles: true):**
- `s9:panel-mount` → `{ id }`
- `s9:panel-alert` → `{ id, level: 'warning'|'critical', message }`

**Effects:** Scanline overlay (`.holographic::after`), CRT flicker on mount (`crt-flicker` keyframe via `--booting`), hover/focus-within border glow, alert-pulse animation.

---

## 2. `DataStream` — Live Scrolling Log

**Status:** `implemented` · JS API: `components/data-stream.js`

**Purpose:** Displays a continuous feed of timestamped events. Left column primary use.

**CSS Classes:**
```
.s9-stream              — container (overflow-y: hidden)
.s9-stream__body        — inner scrollable area
.s9-stream__row         — single log entry (grid: 7rem timestamp | auto source | 1fr message)
.s9-stream__timestamp   — `HH:MM:SS.mmm` left column, monospace, --text-dim
.s9-stream__source      — source tag (e.g. "NET.DIV.6"), --neon-green
.s9-stream__message     — event message, --text-primary
.s9-stream__row--alert  — row with magenta highlight for warnings
.s9-stream__row--pinned — expanded/pinned row (message wraps, background --row-highlight)
```

**Content:** Entries scroll upward. New entries append at bottom, container auto-scrolls.

**Interactivity:** Click row to pin/expand. Hover to pause scroll. Filter by source via header dropdown.

**Effect:** New row fades in with glitch-enter animation. Alert rows pulse.

**JS API:** `components/data-stream.js`
```js
import { mountStream, unmountStream, appendRow, clearRows, setFilter }
  from './components/data-stream.js';
```
- `mountStream(el)` — set up hover-pause + click-to-pin listeners via AbortController
- `unmountStream(el)` — teardown via AbortController abort
- `appendRow(el, { timestamp, source, message, alert })` — add row, glitch-enter, auto-scroll
- `clearRows(el)` — remove all rows
- `setFilter(el, source)` — filter visible rows by source (null = show all)

**Custom Events:**
- `s9:stream-row-pinned` on `.s9-stream` → `{ row, pinned }`

---

## 3. `NeuralReadout` — Personnel / Entity Profile

**Status:** `implemented` · JS API: `components/neural-readout.js`

**Purpose:** Displays biometric or entity data. Cybernetic identity card format.

**CSS Classes:**
```
.s9-neural                         — container
.s9-neural__id                     — large entity ID / designation (Orbitron, --neon-cyan, glow)
.s9-neural__ghost-line             — "GHOST COEFFICIENT: 98.7%" readout
.s9-neural__avatar                 — image container (optional, clipped hexagonal)
.s9-neural__stats                  — data rows grid (2 columns: label | value)
.s9-neural__stat-label             — left-aligned label, --text-dim
.s9-neural__stat-value             — right-aligned monospace value, --text-primary
.s9-neural__status-bar             — progress bar wrapper
.s9-neural__status-bar-track       — bar track element
.s9-neural__status-bar-fill        — colored fill (--neon-cyan default; --neon-magenta when >80%)
.s9-neural__status-bar-fill--critical — critical state (>80%)
.s9-neural__status-bar-label       — label above bar, --text-dim
```

**Required Content:** ID line + at least 4 stat rows + 1 status bar.

**Effect:** Avatar clipped with `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`. Glitch on data update.

**JS API:** `components/neural-readout.js`
```js
import { glitchUpdate, setStatusBarValue }
  from './components/neural-readout.js';
```
- `glitchUpdate(el, fn)` — run fn(), then apply `.glitch-enter` on element, remove on animationend
- `setStatusBarValue(barEl, value)` — value 0-100; sets fill width; adds `--critical` class if >80

---

## 4. `ThreatMap` — Global Visualization Panel

**Purpose:** Central area map/globe/spatial display. Primary hero visualization.

**CSS Classes:**
```
.s9-threatmap           — container (position: relative, full center column)
.s9-threatmap__canvas   — canvas or Three.js mount point
.s9-threatmap__overlay  — CSS overlays atop the visualization (z-index: 10)
.s9-threatmap__node     — interactive hotspot on the map
.s9-threatmap__node--active — currently selected node (pulsing ring)
.s9-threatmap__crosshair — targeting reticle overlay
.s9-threatmap__coords   — lat/lon or coord readout strip
```

**Content:** Full-height canvas. Overlay includes corner brackets (ASCII-style), coordinate strip at bottom, node count in header.

**Interactivity:** Click nodes to select (triggers NeuralReadout update). Drag to pan. Scroll to zoom.

**Effect:** Bloom post-processing if Three.js. CSS fallback: radial glow on `.s9-threatmap__node--active`. Grid lines via `background-image: linear-gradient`.

---

## 5. `NetworkMatrix` — Connection Graph Panel

**Purpose:** Displays network topology, communication routes, or dependency graph.

**CSS Classes:**
```
.s9-matrix              — container
.s9-matrix__canvas      — SVG or canvas element
.s9-matrix__node        — graph node circle
.s9-matrix__node--root  — primary node (larger, brighter)
.s9-matrix__edge        — connection line (SVG line or canvas path)
.s9-matrix__edge--active — highlighted active connection
.s9-matrix__label       — node annotation
```

**Content:** SVG preferred for DOM interactivity. Canvas for high node counts (1000+).

**Effect:** Edges animate with a traveling dot along the path (SVG stroke-dashoffset animation). Node pulse on data activity.

---

## 6. `SystemTelemetry` — Metric Gauges Panel

**Status:** `implemented` · JS API: `components/system-telemetry.js`

**Purpose:** System health: CPU, memory, network, threat level. Right column standard.

**CSS Classes:**
```
.s9-telemetry                    — container
.s9-telemetry__metric            — individual metric row
.s9-telemetry__label             — flex row: name + JP label
.s9-telemetry__label-name        — metric name, --text-secondary, font-holo
.s9-telemetry__label-jp          — Japanese label, --text-dim, font-jp
.s9-telemetry__bar               — bar track (full width, low bg)
.s9-telemetry__bar-fill          — colored fill (width = % value); transition: width 0.4s steps(8)
.s9-telemetry__bar-fill--ok      — 0–60%: --neon-green
.s9-telemetry__bar-fill--warning — 61–85%: --neon-amber
.s9-telemetry__bar-fill--critical — 86–100%: --neon-magenta + pulse
.s9-telemetry__threshold         — danger threshold marker (position: absolute)
.s9-telemetry__readout           — flex row: value + unit, right-aligned
.s9-telemetry__value             — numeric value, --text-primary, font-terminal
.s9-telemetry__unit              — unit label, --text-dim
```

**Color Rules:**
- 0–60%: `--neon-green`
- 61–85%: `--neon-amber`
- 86–100%: `--neon-magenta` + pulse

**Effect:** Bar fill animates on value change (`transition: width 0.4s steps(8)`). Threshold exceeded triggers panel-level alert state.

**JS API:** `components/system-telemetry.js`
```js
import { setValue } from './components/system-telemetry.js';
```
- `setValue(metricEl, value)` — 0-100; sets bar-fill width; correct modifier class; updates value text; fires `s9:telemetry-threshold` on first crossing into critical (>85)

**Custom Events:**
- `s9:telemetry-threshold` on `.s9-telemetry__metric` → `{ value }`

---

## 7. `CommandTerminal` — Interactive Input Panel

**Purpose:** CLI-style command interface. Supports typed input + structured output display.

**CSS Classes:**
```
.s9-terminal            — container
.s9-terminal__output    — scrollable output area
.s9-terminal__line      — single output line
.s9-terminal__line--cmd — user command (--neon-green prefix `>`)
.s9-terminal__line--sys — system response (--text-primary)
.s9-terminal__line--err — error output (--neon-magenta)
.s9-terminal__input-row — input line container
.s9-terminal__prompt    — prompt symbol `[S9]▶`
.s9-terminal__input     — text input element (transparent bg, neon cursor)
```

**Interactivity:** Command history (up/down arrows). Tab completion hook. Enter submits.

**Effect:** Typing triggers random 1-character glitch on nearby output lines (1% probability per keypress). Cursor blinks at 1.2s interval.

---

## 8. `AlertBanner` — Critical Notification Strip

**Status:** `implemented` · JS API: `components/alert-banner.js`

**Purpose:** Full-width or panel-width alert notification. Not a persistent component — appears on event.

**CSS Classes:**
```
.s9-alert               — container (position: absolute, top of parent)
.s9-alert--critical     — magenta border + alert-pulse animation
.s9-alert--warning      — amber border
.s9-alert--dismissing   — opacity 0 transition 0.3s before DOM removal
.s9-alert__icon         — ⚠ or ⬡ symbol, left-side
.s9-alert__body         — flex column: code + message
.s9-alert__code         — alert code ID (e.g. "ERR-9C:0x4F"), --text-alert, font-terminal
.s9-alert__message      — alert text, --text-primary
.s9-alert__timestamp    — UTC timestamp, --text-dim, right-aligned
.s9-alert__dismiss      — ✕ close button, right side
```

**Effect:** Enters with glitch animation (0.3s). Magenta border pulses at 1Hz. Auto-dismiss after 8s unless `data-persistent="true"`.

**JS API:** `components/alert-banner.js`
```js
import { showAlert, dismissAlert } from './components/alert-banner.js';
```
- `showAlert(containerEl, { level, code, message, persistent })` — creates banner, starts 8s timer, returns element
- `dismissAlert(bannerEl)` — triggers dismiss animation, removes from DOM, fires `s9:alert-dismissed`

**Custom Events:**
- `s9:alert-dismissed` on `.s9-alert` → `{ code }`

---

## 9. `SequenceLog` — Operation Timeline

**Status:** `implemented` · JS API: `components/sequence-log.js`

**Purpose:** Shows a chronological sequence of operations/steps with status indicators.

**CSS Classes:**
```
.s9-sequence                    — container
.s9-sequence__entry             — single step row (flex, left border accent)
.s9-sequence__entry--complete   — green left indicator
.s9-sequence__entry--active     — cyan + animated dot (status-blink)
.s9-sequence__entry--failed     — magenta + glitch
.s9-sequence__entry--pending    — dim, dashed left border
.s9-sequence__entry--fail-flash — transient flash animation (2x flicker before failed settles)
.s9-sequence__indicator         — colored left-border dot/line (4px wide)
.s9-sequence__content           — right side flex column
.s9-sequence__step-id           — step number/ID, --text-dim, small
.s9-sequence__step-name         — step label, --text-primary, font-holo
.s9-sequence__step-jp           — Japanese label, --text-dim, font-jp
.s9-sequence__step-meta         — flex row container for status + time
.s9-sequence__step-time         — duration or timestamp, --text-dim, right-aligned
.s9-sequence__step-status       — status text, colored per state
```

**Effect:** Active entry indicator pulses (status-blink keyframe). Step transitions 0.2s ease. Failed steps play `s9-fail-flash` (2x opacity flicker) before settling on magenta.

**JS API:** `components/sequence-log.js`
```js
import { setStepState } from './components/sequence-log.js';
```
- `setStepState(entryEl, state)` — state: `'complete'|'active'|'failed'|'pending'`; removes all state classes; adds correct modifier; if 'failed' plays flash animation; fires `s9:sequence-step-change`

**Custom Events:**
- `s9:sequence-step-change` on `.s9-sequence__entry` → `{ state }`

---

## 10. Layout: S9-OV (Section 9 Operative View)

**The standard three-column tactical configuration.**

```html
<div class="s9-ov">
  <header class="s9-ov__topbar"><!-- file/op name + tabs --></header>
  <div class="s9-ov__workspace">
    <aside class="s9-ov__left"><!-- DataStream, NeuralReadout --></aside>
    <main class="s9-ov__center"><!-- ThreatMap, NetworkMatrix --></main>
    <aside class="s9-ov__right"><!-- SystemTelemetry, SequenceLog --></aside>
  </div>
  <footer class="s9-ov__statusbar"><!-- global status, clock, user --></footer>
</div>
```

**Grid spec:**
```css
.s9-ov { display: grid; grid-template-rows: 36px 1fr 28px; height: 100vh; }
.s9-ov__workspace { display: grid; grid-template-columns: 280px 1fr 260px; gap: 4px; }
```

---

## 11. Theming System

**Status:** `implemented` · Spec: `specs/theming.md`

**Mechanism:** `[data-theme]` attribute on `<html>`. Default theme (`matrixgreen`) has no attribute — `:root` provides its values. All other themes use `[data-theme="name"]` selectors (specificity 0,1,0).

**File Structure:**
```
aesthetic/variables/
  base.css               — layout/typography/structural constants (never themed)
  themes/matrixgreen.css — :root default (dark green-black, teal accent, orange alert)
  themes/gits.css        — [data-theme="gits"] cyan/magenta GitS canon
  themes/amber.css       — [data-theme="amber"] warm amber phosphor
  themes/phosphor.css    — [data-theme="phosphor"] green CRT monochrome
  themes/blood.css       — [data-theme="blood"] red/crimson hostile mode
  index.css              — barrel import (same path as before — no consumer changes)
  theme.js               — JS API
```

**JS API:** `aesthetic/variables/theme.js`
```js
import { setTheme, getTheme, applyPersistedTheme, THEMES }
  from '/aesthetic/variables/theme.js';
```
- `THEMES` — `['matrixgreen', 'gits', 'amber', 'phosphor', 'blood']`
- `getTheme()` — returns active theme name; `'matrixgreen'` when no attribute
- `setTheme(name, persist?)` — idempotent; unknown names → console.warn + no-op; default theme removes attribute
- `applyPersistedTheme()` — call once in `<head>` after stylesheet links

**Custom Event:**
- `s9:theme-change` on `document` → `{ from: string, to: string }`

**Theme Variable Contract (28 variables per theme):**
Backgrounds: `--void`, `--void-secondary`, `--panel-bg`, `--panel-bg-solid`
Borders: `--panel-border`, `--panel-border-active`, `--panel-border-alert`, `--panel-border-dim`
Neons: `--neon-cyan`, `--neon-green`, `--neon-magenta`, `--neon-amber`
Text: `--text-primary`, `--text-secondary`, `--text-dim`, `--text-alert`, `--text-warning`, `--text-ok`
States: `--row-highlight`, `--row-hover`
Glows: `--glow-cyan`, `--glow-green`, `--glow-magenta`, `--glow-amber`, `--glow-text-cyan`, `--glow-text-green`, `--glow-text-magenta`, `--glow-text-amber`

**Usage — HTML:**
```html
<!-- Default: no attribute (matrixgreen) -->
<html lang="en">
<!-- Switch: -->
<html lang="en" data-theme="gits">
```

**Usage — Head:**
```html
<link rel="stylesheet" href="/aesthetic/index.css" />
<script type="module">
  import { applyPersistedTheme } from '/aesthetic/variables/theme.js';
  applyPersistedTheme();
</script>
```
