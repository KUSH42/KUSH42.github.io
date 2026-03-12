# Layout Spec Template

> Copy this file to `specs/<layout-name>.md` before implementing any new layout.
> All fields are required unless marked optional.

---

## Meta

| Field | Value |
|---|---|
| **Name** | `LayoutName` |
| **CSS Root** | `.s9-layoutname` |
| **Status** | `draft` \| `approved` \| `implemented` |
| **Dimensions** | `fullscreen` \| `panel` \| `modal` |
| **Based on S9-OV** | `yes` (variant) \| `no` (new layout) |

---

## Purpose

One sentence. What operational context does this layout represent?

---

## Visual Diagram

ASCII sketch of the grid structure. Required.

```
┌──────────────────────────────────────────────────────┐
│  TOPBAR                                              │
├─────────────┬──────────────────────┬─────────────────┤
│  LEFT       │  CENTER              │  RIGHT          │
│  ???px      │  1fr                 │  ???px          │
│             │                      │                 │
├──────────────────────────────────────────────────────┤
│  STATUSBAR                                           │
└──────────────────────────────────────────────────────┘
```

---

## Grid Specification

```css
.s9-{name} {
  display: grid;
  grid-template-rows: ???px 1fr ???px;    /* topbar height | workspace | statusbar height */
  grid-template-columns: ???px 1fr ???px; /* left | center | right — omit if no sidebar */
  height: 100vh;
  gap: 4px;
  background: var(--void);
}

/* REQUIRED: topbar and statusbar must always span all columns */
.s9-{name}__topbar,
.s9-{name}__statusbar {
  grid-column: 1 / -1;
}
```

Justify every deviation from S9-OV defaults (`280px 1fr 260px`, `36px`, `28px`).

**No-sidebar variant** (center-only): `grid-template-columns: 1fr` — drop left/right zone definitions.

---

## Zone Definitions

For each zone in the grid:

### TOPBAR
- Fixed height: `??px`
- Contents: operation name, tabs, clock, user status
- Required component: `PanelShell` header bar or custom

### LEFT column (optional — omit if layout has no left column)
- Width: `??px` or `??fr`
- Default components: list from `memory/COMPONENTS.MD`
- Can be collapsed: `yes` \| `no`

### CENTER
- Width: `1fr` (required — center always grows)
- Primary visualization: which component(s)

### RIGHT column (optional)
- Width: `??px` or `??fr`
- Default components: list from `memory/COMPONENTS.MD`

### STATUSBAR
- Fixed height: `??px`
- Contents: global status, alert count, UTC clock, connection indicator

---

## Responsive Behaviour

Describe breakpoint handling. Default: desktop-first (no mobile requirement).

**Replace the examples below with actual breakpoints for this layout. Mark N/A if not required.**

| Breakpoint | Change |
|---|---|
| (e.g. `< 1200px`) | (e.g. collapse right column) |
| (e.g. `< 900px`) | (e.g. collapse left column) |
| (e.g. `< 600px`) | (e.g. stack to single column) |

---

## Component Slots

Map each zone to allowed components from `memory/COMPONENTS.MD`.
**Replace the examples below with actual choices for this layout.**

| Zone | Allowed Components | Max Count |
|---|---|---|
| LEFT | (e.g. DataStream, NeuralReadout) | (e.g. 3) |
| CENTER | (e.g. ThreatMap, CommandTerminal) | (e.g. 1 primary + 1 secondary) |
| RIGHT | (e.g. SystemTelemetry, SequenceLog) | (e.g. 3) |

---

## JavaScript Requirements

Describe any JS modules this layout needs (beyond individual component JS).

- **Resize handler**: `yes` | `no` — if yes, describe what updates on resize
- **Column collapse**: `yes` | `no` — if yes, describe trigger and state
- **Global event bus**: list any layout-level `s9:*` events this layout listens for
- **Initialization order**: which components must mount before others

---

## Three.js Integration (optional)

If this layout includes a WebGL layer:

- Canvas position: `position: absolute; inset: 0; z-index: 0`
- CSS HUD z-index floor: `10`
- Shared EffectComposer: `yes` \| `no` (per-component)

---

## CSS Files Required

```
structure/layouts/s9-{name}.css      — grid, zone sizing, gap only
aesthetic/layouts/s9-{name}.css      — layout-level overrides only (omit if none needed)
```

The aesthetic layout file is often empty or minimal. Valid contents: topbar/statusbar `background`, `border-bottom`/`border-top` only. If there are no layout-level aesthetic overrides beyond the component defaults, omit this file entirely and mark it N/A here.

`grid-template-areas` is an acceptable alternative to numeric column/row assignments for named zone clarity:
```css
.s9-{name} {
  grid-template-areas:
    "topbar    topbar    topbar"
    "left      center    right"
    "statusbar statusbar statusbar";
}
```

---

## Quality Gates

- [ ] Spec approved before any code written
- [ ] ASCII diagram matches final grid implementation
- [ ] Structure CSS contains zero color/effect properties
- [ ] All zone widths use `fr`, `%`, `vh/vw`, or named `px` constants — no magic numbers
- [ ] TOPBAR and STATUSBAR have `grid-column: 1 / -1` (verified in browser)
- [ ] Component slot table filled with actual choices (no placeholder text remaining)
- [ ] Component slot mapping enforced (no unlisted components placed in zones)
- [ ] JavaScript Requirements section completed or explicitly marked N/A
- [ ] `prefers-reduced-motion` handled at layout level (no layout-level animations)
- [ ] Visual test page exists in `tests/visual/`
- [ ] Responsive breakpoints implemented or explicitly marked N/A
