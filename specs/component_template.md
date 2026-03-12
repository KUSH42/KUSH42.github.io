# Component Spec Template

> Copy this file to `specs/<component-name>.md` before implementing any new component.
> All fields are required unless marked optional.

---

## Meta

| Field | Value |
|---|---|
| **Name** | `ComponentName` |
| **CSS Block** | `.s9-componentname` |
| **Status** | `draft` \| `approved` \| `implemented` |
| **Column** | `left` \| `center` \| `right` \| `full-width` |
| **COMPONENTS.MD entry** | `yes` (add after approval) \| `no` |

---

## Purpose

One sentence. What problem does this component solve? What data does it display?

---

## CSS Class API

List every class this component defines. This is the public contract — renaming any class is a breaking change.

```
.s9-{name}                   — root container
.s9-{name}__header           — header bar (if applicable)
.s9-{name}__header-label     — English label
.s9-{name}__header-jp        — Japanese label
.s9-{name}__header-status    — right-aligned status indicator (● ONLINE / ● ALERT)
.s9-{name}__body             — content area
.s9-{name}--active           — selected/focused state
.s9-{name}--alert            — critical state (magenta border pulse)
.s9-{name}--{modifier}       — additional state modifiers as needed
```

---

## Content Structure

Minimal valid HTML for the component. All required elements present.

```html
<div class="s9-{name}" role="region" aria-label="LABEL">
  <div class="s9-{name}__header">
    <span class="s9-{name}__header-label">LABEL</span>
    <span class="s9-{name}__header-jp">[日本語]</span>
    <span class="s9-{name}__header-status">● ONLINE</span>
  </div>
  <div class="s9-{name}__body holographic">
    <!-- content -->
  </div>
</div>
```

---

## Data Requirements

What content must be present for the component to render correctly?

- Minimum N items / rows / data points
- Required fields per item: `field1`, `field2`, ...
- Optional fields: `field3`

---

## Interactivity

Describe every user interaction:

| Trigger | Action | Effect |
|---|---|---|
| hover | — | border brightens to `--panel-border-active`, `box-shadow: var(--glow-cyan)` |
| click row | select row | row background `var(--row-highlight)`, emit `s9:select` custom event |
| (add more) | | |

---

## Effects

List which effects from `memory/SKILLS.MD §4` apply:

- [ ] Scanlines (`.holographic::after`)
- [ ] CRT flicker on mount (`.panel-boot`)
- [ ] Glitch on data update (`.glitch-enter`)
- [ ] Neon glow text (`.neon-text`)
- [ ] Alert pulse (magenta, 1Hz)
- [ ] Other: _____

---

## JavaScript Events

List every custom DOM event this component emits. Required if any interaction emits an event.

| Event name | Fired on | Detail payload | When |
|---|---|---|---|
| `s9:select` | root element | `{ id, data }` | row/item selected |
| `s9:alert` | root element | `{ level, message }` | threshold exceeded |
| (add more) | | | |

Event emission pattern (required — see coding-standards.md §3):
```js
element.dispatchEvent(new CustomEvent('s9:select', {
  bubbles: true,
  detail: { id, data }
}));
```

---

## data-* Attributes

List every `data-*` attribute used as JS hooks. No JS must select by class for logic.

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-s9-id` | root | string | unique instance ID |
| `data-s9-state` | root | `active\|idle\|alert` | current component state |
| (add more) | | | |

---

## Structure Plane (layout)

Which CSS properties belong in `structure/components/s9-{name}.css`:

```css
.s9-{name} {
  display: grid;
  /* grid-template-*, flex-*, gap, padding, margin, overflow, position, inset, z-index */
}
```

---

## Aesthetic Plane (styling)

Which CSS properties belong in `aesthetic/` files:

```css
.s9-{name} {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  /* color, background, border-color, box-shadow, text-shadow, font-*, animation */
}
```

---

## Three.js (optional)

If this component uses a canvas / Three.js scene:

- Canvas selector: `#s9-{name}-canvas`
- Scene contents: _____
- Required uniforms: `time`, `color`, ...
- Post-processing: Bloom `luminanceThreshold: X`, `intensity: Y`
- Disposal: list all objects to `.dispose()` on unmount

---

## Accessibility

- [ ] `aria-label` on root element
- [ ] Keyboard navigation: describe tab order and key bindings
- [ ] `prefers-reduced-motion`: animations disabled, Three.js loop paused
- [ ] Minimum contrast ratio met for all text

---

## Quality Gates (check before marking `implemented`)

- [ ] Spec approved before any code written
- [ ] Structure CSS in `structure/components/` — zero color/effect properties
- [ ] Aesthetic CSS uses only CSS variables (no hardcoded hex)
- [ ] Japanese label on every visible English label
- [ ] `__header-status` element present in header
- [ ] All interactivity events documented in Interactivity table are implemented
- [ ] All custom DOM events in JavaScript Events section are implemented
- [ ] All `data-*` attributes in data-* section are wired in JS
- [ ] Every `addEventListener` has a corresponding `removeEventListener` path
- [ ] All effects checked in Effects section are implemented
- [ ] `prefers-reduced-motion` handled (animations off, Three.js loop paused if applicable)
- [ ] Visual test page exists in `tests/visual/`
- [ ] Entry added to `memory/COMPONENTS.MD`
