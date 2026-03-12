# GITS-BOOTSTRAP.md — Architecture Contract

**Highest authority. If anything in CLAUDE.md, specs/, or memory/ conflicts with this file, this file wins.**

---

## 1. What This System Builds

A specialized frontend generator for **Ghost in the Shell (攻殻機動隊)** aesthetic web interfaces. Output is clean HTML/CSS/JS — cybernetic control panels, Section 9 tactical dashboards, hacker terminals, augmented-reality mockups.

This is not a general-purpose UI library. Every decision is subordinate to the GitS aesthetic contract defined in `memory/SKILLS.MD`.

---

## 2. Structural Architecture

### Two-Plane Separation (hard boundary)

```
structure/          — CSS Grid / Flexbox layouts only. Zero color. Zero effects.
aesthetic/          — CSS variables, typography, effects only. Zero layout logic.
```

**Violation of this boundary is a build error, not a style issue.**

Components import from both planes. Neither plane imports from the other.

### File Naming

```
structure/layouts/      — full-page layout templates (e.g. s9-ov.css)
structure/components/   — individual panel structure (e.g. panel-shell.css)
aesthetic/variables/    — CSS custom property definitions
aesthetic/effects/      — scanlines, glitch, flicker, glow keyframes
aesthetic/typography/   — font imports and text style rules
components/             — complete components (structure + aesthetic combined)
specs/                  — one spec per component or layout before implementation
```

---

## 3. Implementation Constraints

### Before Writing Any Component
1. A spec must exist in `specs/`.
2. Spec must define: purpose, CSS class API, content structure, interactivity, effects.
3. Use `specs/component_template.md` or `specs/layout_template.md`.

### CSS Rules
- Custom properties from `aesthetic/variables/` only — no hardcoded hex values in components.
- `border-radius` max `4px` on data panels. No rounded cards.
- All measurements in `rem`, `fr`, `%`, or `vh/vw`. No `px` for layout widths.
- Grid gap: `4px`. Panel padding: `12px`. Header height: `32px`. Status strip: `24px`.

### JavaScript Rules
- Vanilla JS or React + Three.js only. No jQuery. No other frameworks.
- DOM event listeners removed on component unmount.
- Three.js: dispose geometry, material, texture on unmount. No memory leaks.
- `requestAnimationFrame` loops must be cancellable via returned handle.
- All `console.log` behind `if (DEBUG)` guard. No logging in production builds.

### Accessibility
- `prefers-reduced-motion`: all CSS animations off, Three.js frame loop paused.
- `aria-label` on every interactive element.
- Keyboard navigation required on terminal + map components.

---

## 4. Component Authority

Components in `memory/COMPONENTS.MD` are the canonical definitions.

- CSS class names defined there are the contract. Rename = breaking change = new spec required.
- A component may add modifier classes (`--state`). It may not remove base classes.
- New components require a spec before any implementation.

---

## 5. S9-OV Layout — The Standard Configuration

Section 9 Operative View is the default full-screen layout.

```
┌─────────────────────────────────────────────────────────────┐
│  TOPBAR: operation name · tabs · clock · user               │
├──────────────┬───────────────────────────┬──────────────────┤
│  LEFT        │  CENTER                   │  RIGHT           │
│  280px       │  1fr                      │  260px           │
│              │                           │                  │
│  DataStream  │  ThreatMap / NetworkMatrix│  SystemTelemetry │
│  NeuralReadout│  CommandTerminal         │  SequenceLog     │
│              │                           │                  │
├─────────────────────────────────────────────────────────────┤
│  STATUSBAR: global status · alert count · UTC time          │
└─────────────────────────────────────────────────────────────┘
```

Grid:
```css
.s9-ov {
  display: grid;
  grid-template-rows: 36px 1fr 28px;
  grid-template-columns: 280px 1fr 260px;
  height: 100vh;
  gap: 4px;
  background: var(--void);
}
```

---

## 6. Three.js Integration Contract

When a component uses Three.js:

1. The `<canvas>` is at `z-index: 0`, `position: absolute`, `inset: 0`.
2. CSS HUD overlays are at `z-index: 10+`, `pointer-events: auto`.
3. `EffectComposer` with `Bloom` is mandatory for any emissive material.
4. All shader materials expose a `time` uniform (float, seconds since mount).
5. On unmount: cancel animation frame, call `.dispose()` on all Three.js objects.

---

## 7. Spec Template Reference

```
specs/component_template.md    — for new components
specs/layout_template.md       — for new layouts
```

Both templates are required reading before authoring any new spec.

---

## 8. Quality Gates

A component is complete when:
- [ ] Spec exists in `specs/`
- [ ] Structure CSS in `structure/components/` (layout only)
- [ ] Aesthetic CSS in `aesthetic/` or inline custom properties
- [ ] JS behavior documented in spec, implemented without framework assumptions
- [ ] `prefers-reduced-motion` handled
- [ ] Japanese label present on every visible English label
- [ ] No hardcoded hex values — all from CSS variables
- [ ] Visual regression test page exists alongside implementation
