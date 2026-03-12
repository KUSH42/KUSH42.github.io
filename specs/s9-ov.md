# S9-OV Layout Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `S9OV` |
| **CSS Root** | `.s9-ov` |
| **Status** | `approved` |
| **Dimensions** | `fullscreen` |
| **Based on S9-OV** | `no` — this IS the canonical S9-OV |

---

## Purpose

The standard three-column fullscreen tactical layout for Section 9 operative interfaces; all other layouts are variants of this one.

---

## Visual Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  TOPBAR  [operation name · tabs · UTC clock · user status]  36px│
├──────────────┬───────────────────────────────┬──────────────────┤
│  LEFT        │  CENTER                       │  RIGHT           │
│  280px       │  1fr                          │  260px           │
│              │                               │                  │
│  DataStream  │  ThreatMap / NetworkMatrix /  │  SystemTelemetry │
│  NeuralReadout│  CommandTerminal             │  SequenceLog     │
│  SequenceLog │                               │  AlertBanner     │
│              │                               │                  │
├──────────────┴───────────────────────────────┴──────────────────┤
│  STATUSBAR  [global status · alert count · UTC · connection] 28px│
└─────────────────────────────────────────────────────────────────┘
```

---

## Grid Specification

```css
.s9-ov {
  display: grid;
  grid-template-rows: var(--topbar-height) 1fr var(--statusbar-height);
  grid-template-columns: var(--sidebar-left) 1fr var(--sidebar-right);
  grid-template-areas:
    "topbar    topbar    topbar"
    "left      center    right"
    "statusbar statusbar statusbar";
  height: 100vh;
  gap: var(--panel-gap);
  background: var(--void);
  overflow: hidden;
}

/* Zone placement — topbar and statusbar span all columns via grid-area */
.s9-ov__topbar    { grid-area: topbar; }
.s9-ov__statusbar { grid-area: statusbar; }

/* Sidebars: flex column so PanelShell instances stack with gap */
.s9-ov__left  {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: var(--panel-gap);
  overflow-y: auto;
  /* scrollbar styling: aesthetic/components/s9-ov-scrollbar.css */
}
.s9-ov__right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: var(--panel-gap);
  overflow-y: auto;
  /* scrollbar styling: aesthetic/components/s9-ov-scrollbar.css */
}

/* Center: relative anchor for Three.js absolute canvas */
.s9-ov__center {
  grid-area: center;
  overflow: hidden;
  position: relative;
}
```

No deviations from S9-OV defaults — this spec defines those defaults.

---

## Zone Definitions

### TOPBAR
- Fixed height: `36px` (`--topbar-height`)
- Contents (left → right): operation name, tab bar, flex spacer, UTC clock, user status indicator
- No PanelShell — custom topbar element with its own structure
- Border-bottom: `1px solid var(--panel-border)`

### LEFT column
- Width: `280px` (`--sidebar-left`)
- Default components: `DataStream`, `NeuralReadout`, `SequenceLog`
- Can be collapsed: `no` (v1 — static width)
- Overflow: `auto` with styled scrollbar (scrollbar CSS in aesthetic plane: `aesthetic/components/s9-ov-scrollbar.css`)
- Internal layout: stacked `PanelShell` instances with `gap: var(--panel-gap)` — driven by `display: flex; flex-direction: column` on `.s9-ov__left`

### CENTER
- Width: `1fr` (always fills remaining space)
- Primary visualization: `ThreatMap` or `NetworkMatrix`
- Secondary (below or overlay): `CommandTerminal`
- Overflow: `hidden` — individual components manage their own scroll
- `position: relative` — required anchor for absolute Three.js canvas children

### RIGHT column
- Width: `260px` (`--sidebar-right`)
- Default components: `SystemTelemetry`, `SequenceLog`, `AlertBanner`
- Can be collapsed: `no` (v1 — static width)
- Overflow: `auto` with styled scrollbar (scrollbar CSS in aesthetic plane: `aesthetic/components/s9-ov-scrollbar.css`)
- Internal layout: stacked `PanelShell` instances with `gap: var(--panel-gap)` — driven by `display: flex; flex-direction: column` on `.s9-ov__right`

### STATUSBAR
- Fixed height: `28px` (`--statusbar-height`)
- Contents (left → right): global status badge, alert count, flex spacer, UTC time, connection indicator dot
- No PanelShell — custom strip element
- Top border: `1px solid var(--panel-border)`

---

## Responsive Behaviour

Desktop-first. Minimum supported viewport: `1280px × 720px`.

| Breakpoint | Change |
|---|---|
| `< 1280px` | Right column hidden; `grid-template-columns` → `var(--sidebar-left) 1fr`; `grid-template-areas` → 2-column variant |
| `< 960px` | Left column also hidden; `grid-template-columns` → `1fr`; `grid-template-areas` → 1-column variant |
| `< 600px` | N/A — layout not designed for mobile |

Breakpoint changes are CSS-only (`@media` queries on `.s9-ov`). No JS required.

**`grid-template-areas` must be updated at every breakpoint to match the new column count** — a mismatch is an invalid grid.

```css
/* < 1280px — right column removed */
@media (max-width: 1279px) {
  .s9-ov {
    grid-template-columns: var(--sidebar-left) 1fr;
    grid-template-areas:
      "topbar    topbar"
      "left      center"
      "statusbar statusbar";
  }
  .s9-ov__right { display: none; }
}

/* < 960px — left column also removed */
@media (max-width: 959px) {
  .s9-ov {
    grid-template-columns: 1fr;
    grid-template-areas:
      "topbar"
      "center"
      "statusbar";
  }
  .s9-ov__left { display: none; }
}
```

---

## Component Slots

| Zone | Allowed Components | Max Count |
|---|---|---|
| TOPBAR | custom — no PanelShell | 1 |
| LEFT | DataStream, NeuralReadout, SequenceLog | 3 |
| CENTER | ThreatMap, NetworkMatrix, CommandTerminal | 1 primary + 1 secondary |
| RIGHT | SystemTelemetry, SequenceLog, AlertBanner | 3 |
| STATUSBAR | custom — no PanelShell | 1 |

---

## JavaScript Requirements

- **Resize handler**: `no` — layout is pure CSS grid + media queries
- **Column collapse**: `no` (v1) — CSS-only responsive via `@media`
- **Global event bus**: layout listens for `s9:alert` on `document` → adds `.s9-ov--alert` modifier to root, drives statusbar alert count badge
- **Initialization order**: no constraint; all zones are independent

`s9:alert` listener pattern:
```js
document.addEventListener('s9:alert', (e) => {
  const root = document.querySelector('.s9-ov');
  root.dataset.alertCount = (parseInt(root.dataset.alertCount ?? '0') + 1).toString();
  if (e.detail.level === 'critical') root.classList.add('s9-ov--alert');
});
```

Teardown: listener removed on layout unmount.

---

## Three.js Integration

The center zone is the designated WebGL mount point.

- Canvas: `position: absolute; inset: 0; z-index: 0` — child of `.s9-ov__center`
- CSS HUD overlays within center: `position: absolute; z-index: 10`
- Shared EffectComposer: `yes` — one composer per center zone, shared by all Three.js components mounted there
- `.s9-ov__center` must remain `position: relative` for canvas anchoring

---

## CSS Files Required

```
structure/layouts/s9-ov.css          — grid, zone sizing, flex stacking, overflow, position only
aesthetic/components/s9-ov-scrollbar.css  — ::-webkit-scrollbar styling for left/right sidebars
```

Topbar and statusbar border styling belongs to their own component CSS, not the layout file.

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-alert-count` | `.s9-ov` | integer string | current unread alert count; drives statusbar badge |
| `data-s9-state` | `.s9-ov` | `active\|degraded` | layout-level operational state |

---

## Quality Gates

- [ ] Spec approved before any code written
- [ ] ASCII diagram matches final grid implementation
- [ ] Structure CSS contains zero color/effect properties
- [ ] All zone widths reference CSS variables — no magic numbers
- [ ] TOPBAR and STATUSBAR span all columns via `grid-area` (verified in browser)
- [ ] Component slot table has no placeholder text
- [ ] Component slot mapping enforced
- [ ] JavaScript Requirements completed — `s9:alert` listener documented
- [ ] `prefers-reduced-motion` N/A at layout level (no layout-level animations)
- [ ] Visual test page exists in `tests/visual/s9-ov.html`
- [ ] Responsive `grid-template-areas` updated at `< 1280px` (2-col) and `< 960px` (1-col) — column count matches areas
- [ ] Responsive breakpoints implemented: `< 1280px`, `< 960px`
- [ ] Scrollbar aesthetic file (`aesthetic/components/s9-ov-scrollbar.css`) contains zero layout properties
