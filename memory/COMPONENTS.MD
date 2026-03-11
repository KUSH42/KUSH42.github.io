# COMPONENTS.md – Predefined GitS UI Component Definitions

All components are named in the `S9-OV` (Section 9 Operative View) vocabulary.
Each entry defines: purpose, CSS classes, content structure, interactivity, and effects.

---

## 1. `PanelShell` — Base Panel Container

**Purpose:** Wraps every data panel. Provides border, header bar, holographic background, scanlines.

**CSS Classes:**
```
.s9-panel               — base container
.s9-panel--active       — selected/focused state (brighter border, left accent)
.s9-panel--alert        — critical state (magenta border pulse)
.s9-panel__header       — top label bar
.s9-panel__header-label — primary English label
.s9-panel__header-jp    — Japanese counterpart label
.s9-panel__header-status — right-aligned status indicator
.s9-panel__body         — content area
.s9-panel__footer       — optional status strip
```

**Required Content Structure:**
```html
<div class="s9-panel">
  <div class="s9-panel__header">
    <span class="s9-panel__header-label">PANEL NAME</span>
    <span class="s9-panel__header-jp">[日本語]</span>
    <span class="s9-panel__header-status">● ONLINE</span>
  </div>
  <div class="s9-panel__body holographic">
    <!-- data content -->
  </div>
</div>
```

**Effects:** Scanline overlay (`.holographic::after`), CRT flicker on mount (`.panel-boot`), hover border glow.

---

## 2. `DataStream` — Live Scrolling Log

**Purpose:** Displays a continuous feed of timestamped events. Left column primary use.

**CSS Classes:**
```
.s9-stream              — container (overflow-y: hidden)
.s9-stream__row         — single log entry
.s9-stream__timestamp   — `HH:MM:SS.mmm` left column, monospace, --text-dim
.s9-stream__source      — source tag (e.g. "NET.DIV.6"), --neon-green
.s9-stream__message     — event message, --text-primary
.s9-stream__row--alert  — row with magenta highlight for warnings
```

**Content:** Entries scroll upward. New entries append at bottom, container auto-scrolls.

**Interactivity:** Click row to pin/expand. Hover to pause scroll. Filter by source via header dropdown.

**Effect:** New row fades in with glitch-enter animation. Alert rows pulse.

---

## 3. `NeuralReadout` — Personnel / Entity Profile

**Purpose:** Displays biometric or entity data. Cybernetic identity card format.

**CSS Classes:**
```
.s9-neural              — container
.s9-neural__id          — large entity ID / designation
.s9-neural__ghost-line  — "GHOST COEFFICIENT: 98.7%" readout
.s9-neural__avatar      — image container (optional, clipped hexagonal)
.s9-neural__stats       — data rows grid
.s9-neural__stat-label  — left-aligned label
.s9-neural__stat-value  — right-aligned monospace value
.s9-neural__status-bar  — horizontal progress bar (neon fill)
```

**Required Content:** ID line + at least 4 stat rows + 1 status bar.

**Effect:** Avatar clipped with `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`. Glitch on data update.

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

**Purpose:** System health: CPU, memory, network, threat level. Right column standard.

**CSS Classes:**
```
.s9-telemetry           — container
.s9-telemetry__metric   — individual metric row
.s9-telemetry__label    — metric name + Japanese label
.s9-telemetry__bar      — horizontal bar fill
.s9-telemetry__bar-fill — colored fill element (width = % value)
.s9-telemetry__value    — numeric readout right-aligned
.s9-telemetry__unit     — unit label (--text-dim)
.s9-telemetry__threshold — danger threshold marker line
```

**Color Rules:**
- 0–60%: `--neon-green`
- 61–85%: `--neon-amber`
- 86–100%: `--neon-magenta` + pulse

**Effect:** Bar fill animates on value change (`transition: width 0.4s steps(8)`). Threshold exceeded triggers panel-level alert state.

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

**Purpose:** Full-width or panel-width alert notification. Not a persistent component — appears on event.

**CSS Classes:**
```
.s9-alert               — container (position: fixed or absolute top)
.s9-alert--critical     — magenta border + pulse
.s9-alert--warning      — amber border
.s9-alert__icon         — ⚠ or ⬡ symbol
.s9-alert__code         — alert code ID (e.g. "ERR-9C:0x4F")
.s9-alert__message      — alert text
.s9-alert__timestamp    — UTC timestamp
.s9-alert__dismiss      — click to close
```

**Effect:** Enters with glitch animation (0.3s). Magenta border pulses at 1Hz. Auto-dismiss after 8s unless `data-persistent="true"`.

---

## 9. `SequenceLog` — Operation Timeline

**Purpose:** Shows a chronological sequence of operations/steps with status indicators.

**CSS Classes:**
```
.s9-sequence            — container
.s9-sequence__entry     — single step row
.s9-sequence__entry--complete  — green left indicator
.s9-sequence__entry--active    — cyan + animated dot
.s9-sequence__entry--failed    — magenta + glitch
.s9-sequence__entry--pending   — dim, dashed left border
.s9-sequence__step-id   — step number/ID
.s9-sequence__step-name — step label
.s9-sequence__step-jp   — Japanese label
.s9-sequence__step-time — duration or timestamp
.s9-sequence__step-status — status text
```

**Effect:** Active entry pulses. Step transitions animate with a 0.2s sweep. Failed steps flash twice before settling.

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
