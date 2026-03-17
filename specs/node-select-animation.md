# Spec: node-select-animation

**Status:** Ready for implementation
**Priority:** P1
**Depends on:** existing `selection.js`, `init.js`, `nodes.js`, `state.js`, `theme.css` (threat-map component)

---

## Problem Statement

Selecting a city node currently has zero visual distinction from the unselected state: the mesh color does not change, the crosshair box snaps in instantly, and the label appears as a static string. The user has no feedback that a click registered, no sense of which node is "locked on", and no GITS tactical-UI feel. The deselect path is equally abrupt — the crosshair blinks out with a 200 ms opacity fade and that is all.

---

## Goals

- Node sphere provides unambiguous selected vs. unselected visual state (distinct color + scale pulse on select, matching return pulse on deselect).
- Crosshair box animates in (scale + border draw) so it reads as a lock-on targeting event, not a visibility toggle.
- Crosshair hairlines (`:before` / `:after`) draw out from centre on select, collapse back on deselect.
- City label types in character-by-character with a blinking cursor while typing is in progress.
- Coordinate readout rolls through random digits before landing on the real value.
- Deselect is sequenced (label first, then crosshair, then node dim) and faster than select.
- Interrupting an in-progress select or deselect animation always leaves the system in a consistent state with no leaked timers or orphaned Three.js scale values.
- Reduced-motion: all JS-driven tweens are skipped (instant state change); CSS animations are already suppressed by the existing `prefers-reduced-motion` media query.

## Non-Goals

- No audio cues.
- No animation on `updateNodeLevel` — that is a data update, not a selection event.
- No changes to `pulseNode` (the existing expanding-ring animation is independent).
- No new post-processing passes triggered by selection.
- No changes to orbit controls or camera lerp behaviour during select/deselect.
- No accessibility role changes beyond what the existing `aria-live` region already provides.
- No runtime shape switching after `initThreatMap` (shape is fixed at init time).

---

## Crosshair Shape Variants

Three shapes are defined. The shape is set once at `initThreatMap` time via the `crosshairShape` option and stored as `state.crosshairShape`. Changing shape at runtime is not supported.

### Shape identifiers

| Value | Description |
|---|---|
| `'box'` | Default. Full square border + full cross hairlines. Current implementation. |
| `'bracket'` | Four L-shaped corner brackets. No full border. Short central tick hairlines. |
| `'diamond'` | Box rotated 45°. Full diamond border + NESW tick hairlines (appear as × in screen space). |

### Init option

```js
// components/threat-map/init.js — initThreatMap signature extended (full signature):
export function initThreatMap(element, {
  autoRotate     = true,          // existing
  bloomStrength  = 1.7,           // existing
  crosshairShape = 'box',         // NEW: 'box' | 'bracket' | 'diamond'
} = {})
```

`crosshairShape` is stored on the state object and used both in HTML generation and in CSS class application.

### HTML structure per shape

The crosshair HTML block in `init.js` currently contains:

```html
<div class="s9-threatmap__crosshair" aria-hidden="true">
  <span class="s9-threatmap__crosshair-label"></span>
</div>
```

This becomes a helper `_buildCrosshairHTML(shape)`:

**`box`** (shape modifier class added; inner markup unchanged):

```html
<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
  <span class="s9-threatmap__crosshair-label"></span>
</div>
```

**`bracket`** (four corner `<span>` elements added; container has no `border`):

```html
<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
  <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
  <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
  <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
  <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
  <span class="s9-threatmap__crosshair-label"></span>
</div>
```

**`diamond`** (shape modifier class only; same inner markup as `box`):

```html
<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
  <span class="s9-threatmap__crosshair-label"></span>
</div>
```

### CSS per shape

#### `box` (unchanged)

The existing CSS rules apply: `border: 2px solid`, `box-shadow`, `:before` as 2px×200% vertical hairline, `:after` as 200%×2px horizontal hairline.

#### `bracket`

```css
/*
 * CSS cascade ordering requirement: all bracket and diamond shape rules must appear
 * AFTER the base `.s9-threatmap__crosshair` rule block in theme.css. Both selectors
 * have specificity 0,1,0 (one class each), so the later rule wins. Placing these rules
 * before the base rules would mean the base border/box-shadow overrides the bracket
 * overrides. The implementation plan (Step 1.3) adds these rules after existing rules.
 */

/* Container: no border, no box-shadow (corners carry the glow) */
.s9-threatmap__crosshair--shape-bracket {
  border: none;
  box-shadow: none;
}

/* Corner elements — 12×12px, two-sided border per corner */
.s9-threatmap__crosshair-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--crosshair-color);
  border-style: solid;
  box-shadow: 0 0 6px var(--crosshair-color), 0 0 14px var(--crosshair-color);
  opacity: 0.9;
}
.s9-threatmap__crosshair-corner--tl { top: 0;    left: 0;   border-width: 2px 0 0 2px; }
.s9-threatmap__crosshair-corner--tr { top: 0;    right: 0;  border-width: 2px 2px 0 0; }
.s9-threatmap__crosshair-corner--bl { bottom: 0; left: 0;   border-width: 0 0 2px 2px; }
.s9-threatmap__crosshair-corner--br { bottom: 0; right: 0;  border-width: 0 2px 2px 0; }

/* Hairlines for bracket: short centre ticks (30% of container, not 200%) */
.s9-threatmap__crosshair--shape-bracket:before {
  height: 30%;
  top: 35%;
}
.s9-threatmap__crosshair--shape-bracket:after {
  width: 30%;
  left: 35%;
}
```

#### `diamond`

```css
/* Container rotated 45° — all children (border, :before, :after) rotate with it */
.s9-threatmap__crosshair--shape-diamond {
  transform: translate(-50%, -50%) rotate(45deg);
}

/*
 * Label positioning for diamond:
 * The label is inside the rotated container. CSS top/left offsets are resolved
 * in the container's local (rotated) coordinate space. To place the label
 * directly below the diamond tip in screen space, the local offset must be
 * (40px, 40px) from the container centre — after the parent's rotate(45deg)
 * this maps to screen-space (0, 40√2 ≈ 57px) directly below centre.
 * (Container is 44×44px; transform-origin is centre at 22px,22px)
 *
 * Derivation: screen-space (0, d) from container centre after rotate(45deg)
 * requires local (x,y) such that x*cos45−y*sin45=0 (i.e. x=y) and
 * x*sin45+y*cos45=d → x=y=d/√2. For d=57px (tip at 31px + 26px gap): x=y≈40px.
 *
 * Centering the label horizontally:
 * The derivation above positions the label's top-left ANCHOR (the CSS top/left point)
 * at screen (0, 57px) relative to the diamond centre. To horizontally centre a
 * variable-width label around that anchor, transform-origin is set to 0 0 (the anchor
 * itself), so all transforms are relative to it:
 *   rotate(-45deg) — counter-rotates around the anchor; combined with parent's +45deg
 *                    the label is upright in screen space.
 *   translate(-50%, 0) — applied AFTER rotate (in the now-upright local frame),
 *                        shifts the label left by 50% of its own width → centred
 *                        horizontally around the anchor point.
 *
 * IMPORTANT: the translate MUST come after rotate in the CSS declaration so it
 * executes in the upright (screen-space) coordinate frame. If translate were listed
 * first it would apply in the parent's 45deg-tilted frame and produce a diagonal offset.
 */
.s9-threatmap__crosshair--shape-diamond .s9-threatmap__crosshair-label {
  top:              calc(50% + 40px);   /* 22px centre + 40px = 62px from container top in local space */
  left:             calc(50% + 40px);   /* 22px centre + 40px = 62px from container left in local space */
  transform-origin: 0 0;               /* transforms relative to the top-left anchor point */
  transform:        rotate(-45deg) translate(-50%, 0);
}
```

The border and hairlines are identical to `box` in CSS — they just appear rotated in screen space (hairlines become a × rather than a +). No additional CSS rules needed beyond the two above.

### Animation compatibility per shape

#### `box` — fully compatible with existing spec

All animations apply as specced. No changes.

#### `bracket` — compatible; container animation unchanged, hairlines and corners adapted

**Container draw-in** (`clip-path: inset(50%→0%)` on `.s9-threatmap__crosshair`): Works unchanged. The inset clip covers the entire container including all four corner `<span>` elements simultaneously. The visual reads as the bracket "opening outward" from a centre point, which is correct for this shape.

**Hairline animations** (`hairline-v-in`, `hairline-v-out`, `hairline-h-in`, `hairline-h-out`): Work as-is. The bracket's `:before`/`:after` are 30% height/width centre ticks instead of 200% full-cross hairlines; the same `clip-path: inset(50% 0)→inset(0% 0)` keyframes still correctly grow them from zero to their defined size.

**Corner elements**: The four `.s9-threatmap__crosshair-corner` spans are **not animated separately** — they are clipped by the container's `clip-path` animation alongside everything else. This produces the correct lock-on effect without additional CSS.

#### `diamond` — compatible; crosshair keyframes require diamond-specific variants

**Container draw-in**: The `crosshair-in` and `crosshair-out` keyframes must include `rotate(45deg)` in the `transform` value. Omitting it would cause the diamond to briefly de-rotate during the animation. Two additional keyframes are defined:

```css
@keyframes crosshair-in-diamond {
  from {
    clip-path: inset(50% 50% 50% 50%);
    transform: translate(-50%, -50%) rotate(45deg) scale(0.6);
    opacity: 0;
  }
  to {
    clip-path: inset(0% 0% 0% 0%);
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
    opacity: 1;
  }
}

@keyframes crosshair-out-diamond {
  from {
    clip-path: inset(0% 0% 0% 0%);
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
    opacity: 1;
  }
  to {
    clip-path: inset(50% 50% 50% 50%);
    transform: translate(-50%, -50%) rotate(45deg) scale(0.6);
    opacity: 0;
  }
}
```

The shape modifier class selects the correct keyframe:

```css
.s9-threatmap__crosshair--shape-diamond.s9-threatmap__crosshair--animating-in {
  animation: crosshair-in-diamond var(--crosshair-in-dur, 200ms) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.s9-threatmap__crosshair--shape-diamond.s9-threatmap__crosshair--animating-out {
  animation: crosshair-out-diamond var(--crosshair-out-dur, 180ms) cubic-bezier(0.64, 0, 0.78, 0) forwards;
}
```

`clip-path` operates in the element's local coordinate space, before `transform` is applied. `inset(50%)` collapses to the element's own centre point regardless of the CSS `rotate` — the collapse-to-centre visual is correct for diamond.

**Hairlines**: No change. The `:before`/`:after` hairlines are part of the rotated container, so `clip-path: inset(50% 0)→inset(0%)` animates them in local (rotated) coordinate space correctly. They appear as a × in screen space while animating, which is the intended diamond hairline behaviour.

**Label counter-rotation**: The label's `rotate(-45deg)` is a static CSS rule on the child element. It is not part of any animation keyframe and does not interact with the container animation.

### `_cancelAllAnimations` — shape-agnostic

`_cancelAllAnimations` removes `--animating-in` and `--animating-out` classes from the crosshair container. This is sufficient for all three shapes: the `--animating-in`/`--animating-out` classes are shape-agnostic; the shape modifier class selects the correct keyframe at the CSS layer.

The corner elements in `bracket` have no JS animation state to cancel — they are driven entirely by the container's clip-path CSS animation, which stops when the class is removed.

### Shape selection in JS

In `setActiveNode` and `_cancelAllAnimations`, no code paths branch on `state.crosshairShape`. The shape differentiation is handled entirely in CSS via the modifier class combinations. The single exception is that `init.js` must generate different HTML at init time (the `_buildCrosshairHTML` helper).

### New CSS added to `theme.css`

In addition to the rules already specced:

| Addition | Description |
|---|---|
| `.s9-threatmap__crosshair--shape-bracket` rule block | Removes border + box-shadow |
| `.s9-threatmap__crosshair-corner` + four position variants | Corner bracket elements |
| `.s9-threatmap__crosshair--shape-bracket:before/after` overrides | Short 30% tick hairlines |
| `.s9-threatmap__crosshair--shape-diamond` | `rotate(45deg)` transform |
| `.s9-threatmap__crosshair--shape-diamond .s9-threatmap__crosshair-label` | Counter-rotation |
| `@keyframes crosshair-in-diamond` | Diamond draw-in |
| `@keyframes crosshair-out-diamond` | Diamond collapse |
| `.s9-threatmap__crosshair--shape-diamond.--animating-in/out` | Selects diamond keyframes |
| `prefers-reduced-motion` additions | Suppress diamond keyframes |

---

## Design

### Constants (all durations in milliseconds)

```js
// components/threat-map/anim-constants.js  (new file)

export const ANIM = {
  // ── Select phase timings ────────────────────────────────
  NODE_FLASH_DUR:        80,   // ms: flash color holds before settling
  NODE_SETTLE_DUR:      140,   // ms: lerp from flash color → selected highlight color
  // NOTE: NODE_FLASH_DUR + NODE_SETTLE_DUR must equal NODE_SCALE_DUR (80+140=220 ✓)
  NODE_SCALE_PEAK:      1.9,   // multiplier: peak scale during select pulse
  NODE_SCALE_DUR:       220,   // ms: total duration of select scale pulse (rise+fall)
  NODE_SCALE_RISE:      0.35,  // fraction of NODE_SCALE_DUR spent rising (0→peak)

  CROSSHAIR_IN_DUR:     200,   // ms: crosshair scale 60%→100% + border clip draw
  CROSSHAIR_IN_DELAY:    40,   // ms: delay after setActiveNode call before crosshair starts
  HAIRLINE_IN_DUR:      180,   // ms: hairlines extend from centre outward
  HAIRLINE_IN_DELAY:     60,   // ms: hairlines start after crosshair begin

  LABEL_CHAR_RATE:       38,   // ms per character
  LABEL_CURSOR_BLINK:   530,   // ms per blink half-cycle
  LABEL_START_DELAY:    250,   // ms: label starts after crosshair clip completes (CROSSHAIR_IN_DELAY+CROSSHAIR_IN_DUR=240ms + 10ms buffer)
  // NOTE: LABEL_START_DELAY must be > CROSSHAIR_IN_DELAY + CROSSHAIR_IN_DUR to avoid label being clipped during draw-in animation

  COORD_SCRAMBLE_DUR:   320,   // ms: coordinate roll effect total duration
  COORD_SCRAMBLE_DELAY:  80,   // ms: delay from setActiveNode call before coord scrambles start

  // ── Deselect phase timings ──────────────────────────────
  DESELECT_LABEL_DUR:   100,   // ms: label fades out
  DESELECT_CROSSHAIR_DELAY: 80,// ms: crosshair starts collapsing after label fade begins
  DESELECT_CROSSHAIR_DUR:  180, // ms: crosshair scale 100%→60% + opacity fade
  DESELECT_HAIRLINE_DUR:   160, // ms: hairlines collapse back
  DESELECT_NODE_DELAY:  120,   // ms: delay from setActiveNode(null) call before deselectTween starts
  DESELECT_NODE_DUR:    180,   // ms: node scale-down pulse + return to level color

  // ── Shared ─────────────────────────────────────────────
  NODE_DESELECT_SCALE_TROUGH: 0.65, // multiplier: how far down the node dips on deselect
};
```

### Selected-node highlight color

A new CSS custom property `--neon-select` is added to the theme. It is a bright white-cyan used exclusively for the selected-node mesh color after the flash settles. It must be visually distinct from all three threat-level colors (`--neon-green`, `--neon-warn`, `--neon-alert`) in every theme variant.

```css
/* Default theme (and per-theme overrides) */
--neon-select: #00ffff;   /* bright cyan — distinct from flash (#ffffff) and all threat-level colors */
```

The flash color (`flashColor`) is hardcoded `#ffffff` (pure white) and is distinct from `--neon-select`. This ensures the initial white flash is visually different from the final settled cyan, giving the animation a two-stage feel: white burst → cyan lock. Using cyan for the settled state exploits the UnrealBloom pass: at bloom threshold 0.30, a fully-saturated cyan mesh emits a strong bloom halo that makes the selected node noticeably brighter than its neighbours without requiring an emissive property (`MeshBasicMaterial` uses color directly; bloom amplifies it).

### Three.js node scale tween

Node meshes use `THREE.SphereGeometry` shared across all instances. Scale is applied per-mesh via `mesh.scale.setScalar(v)`. The tween runs inside `animateLoop` — **no separate `requestAnimationFrame` loop is spawned for node animation**.

State stored per-element in the existing `_state` WeakMap entry:

```js
// Fields added to the state object in initThreatMap:
nodeTween: null,   // { t0, dur, riseFrac, peakScale, flashDur, settleDur, flashColor, selectColor, mesh } | null
deselectTween: null,  // { t0, dur, troughScale, selectColor, levelColor, mesh, element } | null
```

Only one `nodeTween` and one `deselectTween` exist at a time. A tween is cancelled by setting the reference to `null`; the animateLoop null-checks before ticking.

### Tween shapes

**Select node tween** — runs in two sub-phases driven by a single `t` value [0, 1] over `NODE_SCALE_DUR`:

```
t ∈ [0, NODE_SCALE_RISE]:  scale lerps 1.0 → NODE_SCALE_PEAK  (ease-out cubic)
t ∈ [NODE_SCALE_RISE, 1]:  scale lerps NODE_SCALE_PEAK → 1.0  (ease-in cubic)
```

Color:
- At t=0: set mesh color to flash color (`#ffffff`)
- Over t ∈ [0, NODE_FLASH_DUR/NODE_SCALE_DUR]: flash color holds
- Over t ∈ [NODE_FLASH_DUR/NODE_SCALE_DUR, (NODE_FLASH_DUR+NODE_SETTLE_DUR)/NODE_SCALE_DUR]: lerp color from flash → `--neon-select`
- After that sub-range: color stays at `--neon-select`

**Deselect node tween** — runs over `DESELECT_NODE_DUR` after `DESELECT_NODE_DELAY`:

```
t ∈ [0, 0.4]:  scale lerps 1.0 → NODE_DESELECT_SCALE_TROUGH  (ease-in cubic)
t ∈ [0.4, 1]:  scale lerps NODE_DESELECT_SCALE_TROUGH → 1.0  (ease-out cubic)
color: lerp from --neon-select → level color over full duration
```

### Easing functions (JS)

```js
// components/threat-map/anim-constants.js

/** Ease-out cubic: fast start, decelerates */
export function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/** Ease-in cubic: slow start, accelerates */
export function easeInCubic(t) { return t * t * t; }

/** Ease-in-out cubic */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

### CSS crosshair animation

The border draw-in effect uses `clip-path`. The `crosshair-in` keyframe starts from `clip-path: inset(50% 50% 50% 50%)` — a collapsed point at the element's own centre — and expands to `inset(0%)` (fully visible). The `--animating-in` class triggers this animation; `--visible` is added simultaneously but controls only `opacity` (kept for the reduced-motion path where no keyframe runs). The `--visible` class does **not** trigger the clip-path animation.

Scale is driven simultaneously: the crosshair box starts at `scale(0.6)` and animates to `scale(1.0)`.

Two modifier classes govern crosshair state:

| Class | Meaning |
|---|---|
| `s9-threatmap__crosshair--visible` | Already exists; triggers opacity fade (kept for reduced-motion path) |
| `s9-threatmap__crosshair--animating-in` | Applied on select; triggers `crosshair-in` keyframe animation |
| `s9-threatmap__crosshair--animating-out` | Applied on deselect; triggers `crosshair-out` keyframe animation |

The `--visible` class is still required for the reduced-motion path (where only `opacity: 0 → 1` with `transition: none` fires). The `--animating-in/out` classes are added/removed **in addition to** `--visible` by JavaScript.

```css
/* SELECT */
@keyframes crosshair-in {
  from {
    clip-path: inset(50% 50% 50% 50%);   /* collapsed to centre point */
    transform:  translate(-50%, -50%) scale(0.6);
    opacity: 0;
  }
  to {
    clip-path: inset(0% 0% 0% 0%);
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.s9-threatmap__crosshair--animating-in {
  animation: crosshair-in var(--crosshair-in-dur, 200ms) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* DESELECT */
@keyframes crosshair-out {
  from {
    clip-path: inset(0% 0% 0% 0%);
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  to {
    clip-path: inset(50% 50% 50% 50%);
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
  }
}

.s9-threatmap__crosshair--animating-out {
  animation: crosshair-out var(--crosshair-out-dur, 180ms) cubic-bezier(0.64, 0, 0.78, 0) forwards;
}
```

> Note: The base `.s9-threatmap__crosshair` already has `transform: translate(-50%, -50%)`. The animation keyframes must include the translate to avoid fighting the base rule. This is the only place `transform` is specified in keyframes — it overrides the static rule while the animation is active.

### CSS hairline animation

The `:before` (vertical) and `:after` (horizontal) pseudo-elements draw outward from centre using `clip-path`:

```css
/*
 * No permanent clip-path on :before/:after base rules.
 * When the crosshair is invisible (opacity:0), hairlines are invisible too.
 * When visible with no animation class, hairlines are fully visible (no clip-path).
 * The collapsed start state is held by animation-fill-mode: both (applies FROM
 * keyframe during animation-delay, TO keyframe after animation ends).
 */

@keyframes hairline-v-in {
  from { clip-path: inset(50% 0); }
  to   { clip-path: inset(0% 0); }
}
@keyframes hairline-h-in {
  from { clip-path: inset(0 50%); }
  to   { clip-path: inset(0 0%); }
}
@keyframes hairline-v-out {
  from { clip-path: inset(0% 0); }
  to   { clip-path: inset(50% 0); }
}
@keyframes hairline-h-out {
  from { clip-path: inset(0 0%); }
  to   { clip-path: inset(0 50%); }
}

.s9-threatmap__crosshair--animating-in:before {
  /* fill-mode: both → FROM state applies during animation-delay (hairline collapsed while waiting),
     TO state holds after animation completes (hairline remains open) */
  animation: hairline-v-in var(--hairline-in-dur, 180ms) cubic-bezier(0.22, 1, 0.36, 1)
             var(--hairline-in-delay, 60ms) both;
}
.s9-threatmap__crosshair--animating-in:after {
  animation: hairline-h-in var(--hairline-in-dur, 180ms) cubic-bezier(0.22, 1, 0.36, 1)
             var(--hairline-in-delay, 60ms) both;
}
.s9-threatmap__crosshair--animating-out:before {
  animation: hairline-v-out var(--hairline-out-dur, 160ms) cubic-bezier(0.64, 0, 0.78, 0) both;
}
.s9-threatmap__crosshair--animating-out:after {
  animation: hairline-h-out var(--hairline-out-dur, 160ms) cubic-bezier(0.64, 0, 0.78, 0) both;
}
```

> Note: `fill-mode: both` (not `forwards`) is critical for the hairlines. `backwards` applies the `from` keyframe during `animation-delay`, ensuring hairlines are collapsed during the 60 ms delay before they begin extending — with no permanent base `clip-path` rule needed. `forwards` holds the `to` keyframe after completion. `both` combines both effects.

CSS custom properties (`--crosshair-in-dur`, `--hairline-in-dur`, etc.) are set to match `ANIM` constants. They are declared on `:root` alongside the rest of the theme custom properties. This means if `ANIM` constants change, the CSS values must be updated in sync; the spec treats the JS constants as the single source of truth and the CSS custom properties as derived values that the developer must keep aligned.

### Label typewriter

Implemented in JS, not CSS. The label element's `textContent` is built up character by character. A blinking `_` cursor character is appended while typing is in progress, removed when done.

```js
// Pseudocode — lives in _startTypewriter(labelEl, text, charRate, cursorBlinkMs, onDone)

function _startTypewriter(labelEl, text, charRate, cursorBlinkMs, onDone) {
  // Empty string: no typewriter needed
  if (text.length === 0) {
    labelEl.textContent = '';
    if (onDone) onDone();
    return { cancel: () => {} };
  }

  let charIndex = 0;
  let cursorVisible = true;
  let cursorTimer = null;
  let charTimer = null;
  let cancelled = false;

  function cancel() {
    cancelled = true;
    clearTimeout(charTimer);
    clearInterval(cursorTimer);
  }

  function render() {
    labelEl.textContent = text.slice(0, charIndex) + (cursorVisible ? '_' : ' ');
  }

  // Initial render so the cursor is visible immediately (before first char or interval fires)
  render();  // shows '' + '_' — label displays just the cursor at t=0

  // Cursor blink — toggles every cursorBlinkMs
  cursorTimer = setInterval(() => {
    if (cancelled) return;
    cursorVisible = !cursorVisible;
    render();
  }, cursorBlinkMs);

  function nextChar() {
    if (cancelled) return;
    charIndex++;
    render();
    if (charIndex < text.length) {
      charTimer = setTimeout(nextChar, charRate);
    } else {
      // Typing done — cursor keeps blinking for one more cycle, then set final text
      // Do NOT clearInterval here; let the cursor blink once more during the wait
      charTimer = setTimeout(() => {
        if (!cancelled) {
          clearInterval(cursorTimer);
          labelEl.textContent = text;
          if (onDone) onDone();
        }
        // If cancelled, onDone is NOT called — caller already cleaned up state
      }, cursorBlinkMs);
      // charTimer now holds the final cleanup timeout — cancel() will clear it
    }
  }

  // First character after one charRate delay
  charTimer = setTimeout(nextChar, charRate);

  return { cancel };
}
```

The returned `{ cancel }` handle is stored on the state object as `state.labelTypewriter`. Calling `cancel()` stops all timers and leaves the label in whatever partial state it is in; `setActiveNode` clears it immediately before removing the label's `textContent`.

### Coordinate scramble

Implemented in JS. The displayed string is held in a format like `LAT: 35.68°`. During the scramble period, the numeric portion is replaced every 40 ms with a random number of the same magnitude, then at `t = 1` the real value is written.

```js
// Pseudocode — _startCoordScramble(el, prefix, realVal, decimals, duration, onDone)
// prefix: 'LAT: ', realVal: 35.6762 (number), decimals: 2
// Note: the '°' suffix is hardcoded in the function body — it is not a separate parameter

function _startCoordScramble(el, prefix, realVal, decimals, duration, onDone) {
  const t0 = Date.now();
  const mag = Math.abs(realVal);
  const intDigits = Math.max(1, Math.floor(Math.log10(mag || 1)) + 1);
  let timer = null;
  let cancelled = false;

  function cancel() {
    cancelled = true;
    clearTimeout(timer);
  }

  function tick() {
    if (cancelled) return;
    const elapsed = Date.now() - t0;
    if (elapsed >= duration) {
      el.textContent = `${prefix}${realVal.toFixed(decimals)}°`;
      if (onDone) onDone();
      return;
    }
    // Generate random number with the same order of magnitude (at most intDigits integer digits)
    const rnd = (Math.random() * Math.pow(10, intDigits)).toFixed(decimals);
    const sign = realVal < 0 ? '-' : '';
    el.textContent = `${prefix}${sign}${rnd}°`;
    timer = setTimeout(tick, 40);
  }

  tick();
  return { cancel };
}
```

Handles for both lat and lng scrambles are stored as `state.coordScrambleLat` and `state.coordScrambleLng`.

---

## Animation Sequence

### Select sequence

```
t=0          setActiveNode(el, nodeId) called
             ├── _cancelAllAnimations() → clears timers, nulls tweens, resets mid-pulse mesh scale/color
             ├── [if prev node] prev.mesh.scale.setScalar(1.0) + prev.mesh.material.color.set(levelColor)
             ├── set mesh color to #ffffff (flash)         [immediate]
             ├── set mesh.scale to 1.0                     [immediate]
             ├── start nodeTween (NODE_SCALE_DUR=220ms)    [immediate, pushed to state]
             ├── setTimeout +40ms  → add --animating-in + --visible to crosshair [ID pushed to pendingTimers]
             ├── setTimeout +80ms  → start coord scrambles lat+lng               [ID pushed to pendingTimers]
             └── setTimeout +250ms → start label typewriter                      [ID pushed to pendingTimers]

t=40ms       --animating-in + --visible added → crosshair CSS animation runs 200ms
             hairlines: fill-mode:both applies FROM (collapsed) during 60ms delay
t=80ms       coord scrambles begin (320ms each)
t=100ms      hairlines begin extending (40ms + 60ms hairline-delay = 100ms from t=0)
t=220ms      nodeTween completes → mesh scale=1.0, color=--neon-select (#00ffff)
t=240ms      crosshair clip-path animation completes (40ms + 200ms)
t=250ms      label typewriter begins (clip-path is now fully open; label no longer clipped)
t=280ms      hairlines animation completes (100ms start + 180ms duration)
t=400ms      coord scrambles complete → real values displayed
t=250ms+     label types at 38ms/char (e.g. "TOKYO" = 5 chars = 190ms → done at ~440ms)
```

### Deselect sequence

```
t=0          setActiveNode(el, null) called
             ├── _cancelAllAnimations() → clears all pending timers (select AND deselect phase)
             ├── sync-reset departing mesh: mesh.material.color.set(neonSelect) [snap to selected color in case
             │    select tween was mid-flash; deselectTween will lerp from neonSelect → levelColor]
             ├── add --fading class to label element (opacity:0 transition, DESELECT_LABEL_DUR=100ms)
             ├── setTimeout +100ms → labelEl.textContent = ''; remove --fading class [ID → pendingTimers]
             ├── setTimeout +80ms  → add --animating-out; remove --visible; remove --animating-in if present [ID → pendingTimers]
             └── setTimeout +120ms → create deselectTween (DESELECT_NODE_DUR=180ms) [ID → pendingTimers]

t=80ms       --animating-out added → crosshair CSS animates out (180ms)
             hairlines: fill-mode:both applies FROM (fully open) → collapses over 160ms
t=120ms      deselectTween starts: scale dips to 0.65 then returns to 1.0
             color lerps from --neon-select (#00ffff) → level color
t=240ms      hairlines fully collapsed (80ms + 160ms)
t=260ms      crosshair out CSS animation completes → opacity 0, clip-path collapsed
             (--animating-out class is still present; animation is frozen at its `to` state via `forwards` fill)
t=300ms      deselectTween complete → mesh at scale 1.0, level color restored
             → animateLoop removes --animating-out class from crosshair

> **Note (L-4 — intentional):** `--animating-out` is removed at t=300ms (deselectTween completion) rather than t=260ms
> (CSS animation completion). Tying the class removal to the deselect tween completion rather than adding
> a separate timer simplifies bookkeeping. The extra 40ms has no visible effect: the CSS animation has
> already reached its `to` state (`opacity: 0`, clip-path fully collapsed) and is frozen there by
> `animation-fill-mode: forwards`. The crosshair is indistinguishable from hidden at t=260ms.
```

---

## Interruption Handling

### State to track

```js
// Added to state object:
nodeTween:          null,  // { t0, dur, riseFrac, peakScale, flashDur, settleDur, flashColor, selectColor, mesh } | null
deselectTween:      null,  // { t0, dur, troughScale, selectColor, levelColor, mesh, element } | null
labelTypewriter:    null,  // { cancel } | null
coordScrambleLat:   null,  // { cancel } | null
coordScrambleLng:   null,  // { cancel } | null
tweenGeneration:    0,     // incremented on every _cancelAllAnimations call; useful for debugging and testing
pendingTimers:      [],    // all pending setTimeout IDs (select AND deselect phase timers)
crosshairShape:     'box', // 'box' | 'bracket' | 'diamond' — set at init, never changed
```

### `_cancelAllAnimations(element)` — internal function

Called at the top of `setActiveNode` before any new animation begins:

```js
function _cancelAllAnimations(element) {
  const s = _state.get(element);
  if (!s) return;

  // Reset mesh state for any tween that was mid-flight before nulling
  if (s.nodeTween) {
    s.nodeTween.mesh.scale.setScalar(1.0);
    // Color is left as-is; caller sets it immediately after _cancelAllAnimations
  }
  if (s.deselectTween) {
    s.deselectTween.mesh.scale.setScalar(1.0);
  }

  // Stop JS tweens
  s.nodeTween = null;
  s.deselectTween = null;
  s.tweenGeneration++;  // incremented for debugging/testing; not used as a staleness guard in the loop

  // Cancel pending delay timers
  for (const id of s.pendingTimers) clearTimeout(id);
  s.pendingTimers = [];

  // Cancel typewriter
  if (s.labelTypewriter) { s.labelTypewriter.cancel(); s.labelTypewriter = null; }

  // Cancel coordinate scrambles
  if (s.coordScrambleLat) { s.coordScrambleLat.cancel(); s.coordScrambleLat = null; }
  if (s.coordScrambleLng) { s.coordScrambleLng.cancel(); s.coordScrambleLng = null; }

  // Remove all animation classes from crosshair
  const crosshair = element.querySelector('.s9-threatmap__crosshair');
  if (crosshair) {
    crosshair.classList.remove(
      's9-threatmap__crosshair--animating-in',
      's9-threatmap__crosshair--animating-out',
    );
    // Force a style recalculation flush so the next classList.add starts a fresh animation
    void crosshair.offsetWidth;
  }
}
```

### Click B while A is animating in

1. `_cancelAllAnimations` runs: A's `nodeTween` is nulled (loop skips it next RAF), A's typewriter/coord timers cancelled.
2. A's mesh: scale may be mid-pulse. The deselect path for A runs `_cancelAllAnimations` and then immediately sets A's mesh back to level color at scale 1.0 before starting B's animation.
3. B's select animation starts fresh from t=0.

### Deselect during select animation

`setActiveNode(el, null)` is called while select is running:

1. `_cancelAllAnimations` runs.
2. The currently-active node's mesh scale is reset to 1.0 and color reset to `--neon-select` (it was in the middle of being set to selected; snapping to selected color before deselecting is cleaner than mid-pulse color).
3. Deselect sequence starts immediately.

The deselect tween then lerps from `--neon-select` → level color as normal.

### Clicking the same node again while it is already selected

`setActiveNode(el, nodeId)` where `nodeId === state.activeNodeId`:

- `state.activeNodeId` is already set, so the "deselect previous" block runs for the same node.
- `_cancelAllAnimations` cleans up.
- The select animation reruns from the top (re-triggers the lock-on visual).

This is intentional and acceptable — it provides confirmation feedback on repeated clicks.

---

## animateLoop Integration

The existing `animateLoop` in `init.js` gains a tween-tick section. This is appended after the crosshair position update block and before `s.composer.render()`:

```js
// Tick node select tween
if (s.nodeTween) {
  const tw = s.nodeTween;
  const elapsed = Date.now() - tw.t0;
  const t = Math.min(1, elapsed / tw.dur);

  // Scale
  const scaledT = t < tw.riseFrac
    ? easeOutCubic(t / tw.riseFrac)
    : easeInCubic((t - tw.riseFrac) / (1 - tw.riseFrac));
  const scale = t < tw.riseFrac
    ? 1.0 + (tw.peakScale - 1.0) * scaledT
    : tw.peakScale - (tw.peakScale - 1.0) * scaledT;
  tw.mesh.scale.setScalar(scale);

  // Color
  // lerpColors is an INSTANCE method: color.lerpColors(colorA, colorB, alpha)
  const flashFrac  = tw.flashDur  / tw.dur;   // e.g. 80/220 = 0.364
  const settleFrac = tw.settleDur / tw.dur;   // e.g. 140/220 = 0.636  (flash+settle = 1.0 ✓)
  if (t < flashFrac) {
    tw.mesh.material.color.copy(tw.flashColor);
  } else if (t < flashFrac + settleFrac) {
    const ct = (t - flashFrac) / settleFrac;
    tw.mesh.material.color.lerpColors(tw.flashColor, tw.selectColor, easeInOutCubic(ct));
  } else {
    tw.mesh.material.color.copy(tw.selectColor);
  }

  if (t >= 1) {
    tw.mesh.material.color.copy(tw.selectColor); // explicit snap on completion
    s.nodeTween = null;
  }
}

// Tick node deselect tween
if (s.deselectTween) {
  const tw = s.deselectTween;
  const elapsed = Date.now() - tw.t0;
  const t = Math.min(1, elapsed / tw.dur);

  const trough = 0.4;
  const scaledT = t < trough
    ? easeInCubic(t / trough)
    : easeOutCubic((t - trough) / (1 - trough));
  const scale = t < trough
    ? 1.0 - (1.0 - tw.troughScale) * scaledT
    : tw.troughScale + (1.0 - tw.troughScale) * scaledT;
  tw.mesh.scale.setScalar(scale);

  // Color lerp back to level color
  tw.mesh.material.color.lerpColors(tw.selectColor, tw.levelColor, easeInOutCubic(t));

  if (t >= 1) {
    tw.mesh.scale.setScalar(1.0);
    tw.mesh.material.color.copy(tw.levelColor);
    const crosshair = tw.element.querySelector('.s9-threatmap__crosshair');
    if (crosshair) crosshair.classList.remove('s9-threatmap__crosshair--animating-out');
    s.deselectTween = null;
  }
}
```

Both tween objects stored on state contain all data needed by the loop (`mesh`, `t0`, `dur`, colors as `THREE.Color` instances) so the loop does not call into `_state` for data lookups per-frame.

---

## Reduced-Motion Fallback

When `state.reducedMotion === true`:

- `_cancelAllAnimations` is still called (no-op since nothing starts).
- `setActiveNode` sets mesh color to `--neon-select` / level color **directly** (no tween).
- Mesh scale is set to `1.0` immediately; no `nodeTween` or `deselectTween` is created.
- No `setTimeout` delays are scheduled for crosshair, label, or coords.
- Crosshair: only `--visible` class is toggled (no `--animating-in` / `--animating-out`). The existing CSS `transition: none` under `prefers-reduced-motion` handles the opacity change.
- Label: `labelEl.textContent = text` set immediately (no typewriter).
- Coords: `latEl.textContent` / `lngEl.textContent` set immediately (no scramble).
- On deselect: label `.textContent = ''`, coords reset, `--visible` removed — all instant.

The `reducedMotion` flag is read once at `initThreatMap` time and stored on the state object, matching the existing pattern.

---

## Data Structures

### `nodeTween` shape

```js
{
  generation:  number,        // snapshot of s.tweenGeneration when created
  t0:          number,        // Date.now() at tween start
  dur:         number,        // ANIM.NODE_SCALE_DUR
  riseFrac:    number,        // ANIM.NODE_SCALE_RISE
  peakScale:   number,        // ANIM.NODE_SCALE_PEAK
  flashDur:    number,        // ANIM.NODE_FLASH_DUR
  settleDur:   number,        // ANIM.NODE_SETTLE_DUR
  flashColor:  THREE.Color,   // new THREE.Color('#ffffff')
  selectColor: THREE.Color,   // new THREE.Color(CSS --neon-select)
  mesh:        THREE.Mesh,
}
```

### `deselectTween` shape

```js
{
  generation:   number,
  t0:           number,
  dur:          number,       // ANIM.DESELECT_NODE_DUR
  troughScale:  number,       // ANIM.NODE_DESELECT_SCALE_TROUGH
  selectColor:  THREE.Color,  // snapshot of --neon-select at deselect time
  levelColor:   THREE.Color,  // level color for the departing node
  mesh:         THREE.Mesh,
  element:      HTMLElement,  // needed to remove --animating-out class on completion
}
```

> **Note (L-5 — intentional redundancy):** `tw.element` is technically redundant because `animateLoop`
> already captures `element` in its closure (the loop is per-element). It is kept on the tween object
> so the tween is self-contained — the animateLoop tick block reads exclusively from `tw.*` and `s.*`
> without relying on closure variables. This makes the tween object independently inspectable
> (e.g. in tests or DevTools) and eliminates an implicit coupling between the tween data and the
> closure scope.

---

## Design Decisions

**Decision:** Run node scale/color tweens inside `animateLoop` rather than a separate `requestAnimationFrame` closure.
**Alternatives considered:** Spawn a per-tween RAF loop (as `pulseNode` does for rings); use a third-party tweening library (GSAP, tween.js).
**Rationale:** The existing RAF loop already runs every frame; a second RAF loop would fight for frame budget and complicate teardown. `pulseNode` uses its own RAF because ring meshes are self-contained and auto-dispose — node scale tweens must be cancellable and mutate persistent mesh state, so centralised control is safer. No third-party tween library is warranted for two concurrent tweens.

**Decision:** CSS animations for crosshair + hairlines; JS for label typewriter and coord scramble.
**Alternatives considered:** Full JS animation for crosshair (manual style updates each RAF); CSS only for typewriter (CSS `steps()` on a fixed-width element).
**Rationale:** `clip-path` morphing and `scale` are GPU-composited CSS properties — hardware-accelerated and no JS overhead per frame. The typewriter and coord scramble need dynamic string content that cannot be driven by pure CSS without known-length markup tricks; JS `setTimeout` is the cleanest approach.

**Decision:** `--neon-select: #00ffff` (bright cyan) as selected-node color; `flashColor` hardcoded `#ffffff` (white).
**Alternatives considered:** White for both flash and settled state; per-node color brightened by saturation; `color-mix` with theme cyan.
**Rationale:** Flash (#ffffff) and settled state (#00ffff) must be visually distinct — lerping from white to white produces no visible animation. Cyan is maximally distinct from all three threat-level colors (green, amber, red) and from white, in all five theme variants. The UnrealBloom pass amplifies the fully-saturated cyan mesh into a strong bloom halo. `MeshBasicMaterial` uses color directly (no lights, no emissive property needed). Note: bloom produces a bloom halo in the source mesh color — any apparent hue shift comes from the subsequent HoloShader pass, not from bloom itself.

**Decision:** Store `nodeTween` / `deselectTween` on the existing `_state` WeakMap entry rather than a new module-level Map.
**Alternatives considered:** Module-level `Map<HTMLElement, TweenState>`.
**Rationale:** The WeakMap already owns the lifecycle of all per-element state; adding more fields to the existing entry is consistent, avoids a new module, and ensures tween state is automatically garbage-collected when the element is removed.

**Decision:** `clip-path: inset(50% 50% 50% 50%)` for crosshair collapse instead of `scale(0)` or `clip-path: polygon(50% 50%, 50% 50%, 50% 50%)`.
**Alternatives considered:** `scale(0)` on the crosshair element; `stroke-dashoffset` on an SVG border; CSS `clip-path: polygon` with multiple points.
**Rationale:** `inset()` collapses the visible area to a point at the element centre — visually reads as the box "closing inward" from all edges simultaneously. Scale to zero would just shrink it. SVG would require replacing the CSS border with an SVG element. Polygon clip-path with enough points would work but `inset()` is simpler syntax for a rectangle.

**Decision:** Three crosshair shapes (`box`, `bracket`, `diamond`); shape fixed at init time; shape differentiation handled in CSS only; JS animation code is shape-agnostic.
**Alternatives considered:** Runtime shape switching via `setCrosshairShape(el, shape)`; shape-specific JS code paths in `setActiveNode`; using SVG for all three shapes (unified animation via `stroke-dashoffset`).
**Rationale:** Shape is a display configuration, not interactive state — fixing it at init is sufficient and avoids the complexity of teardown/rebuild of the crosshair DOM mid-use. Keeping JS shape-agnostic (no branching in `setActiveNode` or `_cancelAllAnimations`) ensures the animation logic stays maintainable as shapes are added. CSS modifier class combinations (`--shape-diamond.--animating-in`) select the correct keyframes cleanly without JS switches. SVG unification was rejected: it would require replacing existing CSS border + pseudo-element structure and break the `--crosshair-color` CSS custom property cascade that the rest of theme.css depends on.

**Decision:** `bracket` corners are clipped by the container's `clip-path` animation rather than animated separately.
**Alternatives considered:** Each corner `<span>` translates from the centre to its corner position on select; corners fade in independently with staggered delays.
**Rationale:** Separate corner translation requires four `@keyframes` definitions and four `animation` declarations with individual delays. The container `clip-path: inset()` achieves the same "expanding outward" read for no additional CSS, since the clip reveals all four corners simultaneously from the centre. The visual result is equivalent for a 44×44px element at this size.

**Decision:** `diamond` requires separate `crosshair-in-diamond` / `crosshair-out-diamond` keyframes rather than relying on the base `crosshair-in/out` keyframes.
**Alternatives considered:** Wrapping the rotated diamond in a non-rotated container div and animating the wrapper; using a CSS variable for the rotation value in the base keyframe; applying `rotate(45deg)` only to the base CSS `transform` and relying on the animation overriding it.
**Rationale:** CSS `animation` keyframes override the element's base `transform` for the duration of the animation — the animation's `from` value becomes the initial state, not the static rule. If the base keyframe does not include `rotate(45deg)`, the diamond briefly snaps to un-rotated at animation start, then snaps back at animation end. Separate diamond keyframes are the least-surprising fix. A wrapper div would change the DOM structure and break the existing crosshair position tracking in `animateLoop`. A CSS variable for rotation in keyframes is not valid syntax.

**Decision:** Use per-character `setTimeout` chain (not `setInterval`) for typewriter.
**Alternatives considered:** `setInterval` advancing an index.
**Rationale:** `setInterval` at 38ms drifts relative to actual elapsed time and can fire multiple characters if the tab is backgrounded and then foregrounded. A `setTimeout` chain schedules exactly one character per call, and can be cancelled with a single `clearTimeout` on the pending timer.

---

## Configuration

| Property | Location | Type | Default | Validation |
|---|---|---|---|---|
| `ANIM.NODE_FLASH_DUR` | `anim-constants.js` | `number` (ms) | `80` | > 0 |
| `ANIM.NODE_SETTLE_DUR` | `anim-constants.js` | `number` (ms) | `140` | > 0, and NODE_FLASH_DUR + NODE_SETTLE_DUR = NODE_SCALE_DUR |
| `ANIM.NODE_SCALE_PEAK` | `anim-constants.js` | `number` | `1.9` | > 1.0 |
| `ANIM.NODE_SCALE_DUR` | `anim-constants.js` | `number` (ms) | `220` | > 0 |
| `ANIM.NODE_SCALE_RISE` | `anim-constants.js` | `number` (fraction) | `0.35` | 0 < x < 1 |
| `ANIM.CROSSHAIR_IN_DUR` | `anim-constants.js` | `number` (ms) | `200` | > 0 |
| `ANIM.CROSSHAIR_IN_DELAY` | `anim-constants.js` | `number` (ms) | `40` | ≥ 0 |
| `ANIM.HAIRLINE_IN_DUR` | `anim-constants.js` | `number` (ms) | `180` | > 0 |
| `ANIM.HAIRLINE_IN_DELAY` | `anim-constants.js` | `number` (ms) | `60` | ≥ 0 |
| `ANIM.LABEL_CHAR_RATE` | `anim-constants.js` | `number` (ms) | `38` | > 0 |
| `ANIM.LABEL_CURSOR_BLINK` | `anim-constants.js` | `number` (ms) | `530` | > 0 |
| `ANIM.LABEL_START_DELAY` | `anim-constants.js` | `number` (ms) | `250` | > CROSSHAIR_IN_DELAY + CROSSHAIR_IN_DUR |
| `ANIM.COORD_SCRAMBLE_DUR` | `anim-constants.js` | `number` (ms) | `320` | > 0 |
| `ANIM.COORD_SCRAMBLE_DELAY` | `anim-constants.js` | `number` (ms) | `80` | ≥ 0 |
| `ANIM.DESELECT_LABEL_DUR` | `anim-constants.js` | `number` (ms) | `100` | > 0 |
| `ANIM.DESELECT_CROSSHAIR_DELAY` | `anim-constants.js` | `number` (ms) | `80` | ≥ 0 |
| `ANIM.DESELECT_CROSSHAIR_DUR` | `anim-constants.js` | `number` (ms) | `180` | > 0 |
| `ANIM.DESELECT_HAIRLINE_DUR` | `anim-constants.js` | `number` (ms) | `160` | > 0 |
| `ANIM.DESELECT_NODE_DELAY` | `anim-constants.js` | `number` (ms) | `120` | ≥ 0 |
| `ANIM.DESELECT_NODE_DUR` | `anim-constants.js` | `number` (ms) | `180` | > 0 |
| `ANIM.NODE_DESELECT_SCALE_TROUGH` | `anim-constants.js` | `number` | `0.65` | 0 < x < 1 |
| `--neon-select` | `theme.css` | CSS color | `#00ffff` | valid CSS color, must differ from `flashColor` (`#ffffff`) |
| `--deselect-label-dur` | `theme.css` `:root` | CSS `<time>` | `100ms` | matches `ANIM.DESELECT_LABEL_DUR` |
| `crosshairShape` | `initThreatMap` option | `string` | `'box'` | `'box'` \| `'bracket'` \| `'diamond'` |
| `--crosshair-in-dur` | `theme.css` `:root` | CSS `<time>` | `200ms` | matches `ANIM.CROSSHAIR_IN_DUR` |
| `--crosshair-out-dur` | `theme.css` `:root` | CSS `<time>` | `180ms` | matches `ANIM.DESELECT_CROSSHAIR_DUR` |
| `--hairline-in-dur` | `theme.css` `:root` | CSS `<time>` | `180ms` | matches `ANIM.HAIRLINE_IN_DUR` |
| `--hairline-in-delay` | `theme.css` `:root` | CSS `<time>` | `60ms` | matches `ANIM.HAIRLINE_IN_DELAY` |
| `--hairline-out-dur` | `theme.css` `:root` | CSS `<time>` | `160ms` | matches `ANIM.DESELECT_HAIRLINE_DUR` |

---

## Files Changed

| File | Action | Description |
|---|---|---|
| `components/threat-map/anim-constants.js` | **Create** | All `ANIM` constants and easing functions |
| `components/threat-map/selection.js` | **Modify** | Replace `setActiveNode` body; add `_cancelAllAnimations`, `_startTypewriter`, `_startCoordScramble` private functions; import `ANIM` |
| `components/threat-map/init.js` | **Modify** | Add `_buildCrosshairHTML(shape)` helper; pass `crosshairShape` option through to state; add tween-tick block in `animateLoop`; add `nodeTween`, `deselectTween`, `labelTypewriter`, `coordScrambleLat`, `coordScrambleLng`, `pendingTimers`, `tweenGeneration`, `crosshairShape` fields to initial state object; import easing functions from `anim-constants.js` |
| `components/threat-map/utils.js` | **Modify** | Extend `_readCSSColors()` to read `--neon-select` and return it as `neonSelect`; update colour-cache invalidation accordingly |
| `components/threat-map/state.js` | **No change** | State shape is documented here but the object literal lives in `init.js`; no changes to `state.js` itself |
| `src/theme.css` | **Modify** | Add `--neon-select` to each theme block (`:root` default + all 5 theme overrides); add `--crosshair-in-dur`, `--crosshair-out-dur`, `--hairline-*-dur/delay` custom properties to `:root`; add `crosshair-in`, `crosshair-out`, `crosshair-in-diamond`, `crosshair-out-diamond`, `hairline-v-in`, `hairline-h-in`, `hairline-v-out`, `hairline-h-out` keyframes; add `--animating-in` / `--animating-out` modifier class rules and shape-specific overrides; add `.s9-threatmap__crosshair--shape-bracket` rules, corner element rules, `.s9-threatmap__crosshair--shape-diamond` rules; add `s9-threatmap__crosshair-label--fading` transition rule; update `prefers-reduced-motion` block to suppress all new keyframe animations |

---

## Implementation Plan

### Phase 1 — Constants and CSS (no behaviour change)

**Step 1.1** — Create `components/threat-map/anim-constants.js`.
Export `ANIM` object and three easing functions. No imports needed.
Verifiable: module imports without error; values are readable from browser console.

**Step 1.2** — Add CSS custom properties to `src/theme.css`.
Add `--neon-select`, `--crosshair-in-dur`, `--crosshair-out-dur`, `--hairline-*` to the `:root` block and each theme block. Add `--neon-select` only to theme blocks where the default `#ffffff` may need to differ (check contrast against each theme's neon palette — if white works for all themes, only add to `:root`).
Verifiable: `getComputedStyle(document.documentElement).getPropertyValue('--neon-select')` returns a non-empty string.

**Step 1.3** — Add all keyframe animations and new modifier classes to `src/theme.css` (crosshair, hairlines). Do not yet touch the existing `--visible` class rules.

> **Note (L-10):** Before adding the new `@media (prefers-reduced-motion: reduce)` rules, audit the
> existing `prefers-reduced-motion` block in `theme.css` for overlap. Specifically check whether
> the existing block already applies `animation: none` or `transition: none` to any of the selectors
> being added (`.s9-threatmap__crosshair`, `:before`, `:after`, `--visible`). Any existing rule that
> would already suppress a new animation makes the corresponding new rule dead code and should either
> be merged or left as-is with a comment noting the redundancy. The existing `--visible` opacity
> transition suppression must not be removed — the new rules are additive.

Add the `prefers-reduced-motion` suppressions for the new animations at the same time:
```css
@media (prefers-reduced-motion: reduce) {
  /* Base selectors (1 class each) — also catch box/bracket shapes */
  .s9-threatmap__crosshair--animating-in,
  .s9-threatmap__crosshair--animating-out,
  /* Diamond compound selectors (2 classes each, higher specificity — must be explicit) */
  .s9-threatmap__crosshair--shape-diamond.s9-threatmap__crosshair--animating-in,
  .s9-threatmap__crosshair--shape-diamond.s9-threatmap__crosshair--animating-out {
    animation: none;
  }
  .s9-threatmap__crosshair--animating-in:before,
  .s9-threatmap__crosshair--animating-in:after,
  .s9-threatmap__crosshair--animating-out:before,
  .s9-threatmap__crosshair--animating-out:after {
    animation: none;
  }
}
```
> The diamond compound selectors are required because `.s9-threatmap__crosshair--shape-diamond.s9-threatmap__crosshair--animating-in` has specificity 0,2,0 — higher than the base `--animating-in` rule (0,1,0). Without the explicit diamond entries, `animation: none` would not override the diamond keyframe rules.
Verifiable: Manually add `s9-threatmap__crosshair--animating-in` class in DevTools and confirm the crosshair animates in; remove and add `--animating-out` to confirm collapse.

**Step 1.4** — Add the label fade class rule to `src/theme.css`:
```css
.s9-threatmap__crosshair-label--fading {
  opacity: 0;
  transition: opacity var(--deselect-label-dur, 100ms) ease;
}
```
Also add `--deselect-label-dur: 100ms` to `:root`.

### Phase 2 — JS animation helpers

**Step 2.1** — Add `_startTypewriter` and `_startCoordScramble` as non-exported functions at the bottom of `selection.js`. Both accept parameters and return `{ cancel }`. No DOM changes yet.
Verifiable: Import the functions in a browser console scratch script; call them on a test element and observe correct output.

**Step 2.2** — Add `_cancelAllAnimations(element)` to `selection.js`. Add the `void crosshair.offsetWidth` flush. Test with a simple call after adding the function — verify no console errors, class manipulation works.

### Phase 3 — Wire up select animation

**Step 3.0** — Replace the hardcoded crosshair HTML in `initThreatMap` with `_buildCrosshairHTML(shape)`. Add `crosshairShape` option to the `initThreatMap` parameter destructure with default `'box'`. Add `import` of `ANIM`, `easeOutCubic`, `easeInCubic`, `easeInOutCubic` from `./anim-constants.js` at the top of `init.js`.
Verifiable: `initThreatMap(el, { crosshairShape: 'bracket' })` generates four corner spans in the DOM; `initThreatMap(el, { crosshairShape: 'diamond' })` generates the `--shape-diamond` class.

**Step 3.1** — Extend the state object in `initThreatMap` (`init.js`) with the new fields:
```js
nodeTween:       null,
deselectTween:   null,
labelTypewriter: null,
coordScrambleLat: null,
coordScrambleLng: null,
pendingTimers:   [],
tweenGeneration: 0,
crosshairShape:  crosshairShape,  // from destructured options
```

**Step 3.2** — Add the tween-tick block to `animateLoop` in `init.js`. Easing functions are already imported in Step 3.0.
Verifiable: No visible change yet (tweens are `null`); no console errors.

**Step 3.3** — Rewrite the select path in `setActiveNode` (`selection.js`):
1. Call `_cancelAllAnimations`.
2. If deselecting a previous node: **immediately** sync-reset previous node's mesh scale to 1.0 and color to level color. Do **not** start a `deselectTween` for the previous node — there is one shared crosshair element per threat-map container, and the crosshair will immediately begin animating in for the new node. Running simultaneous `--animating-out` and `--animating-in` on the same element is not supported.
3. Set up `nodeTween` for new node (flash color immediate, tween object onto state).
4. Schedule crosshair `--animating-in` via `setTimeout`; push ID onto `pendingTimers`.
5. Schedule typewriter via `setTimeout`; push ID onto `pendingTimers`.
6. Schedule coord scrambles via `setTimeout`; push IDs.

Verifiable: Select a node → node flashes white, pulses in scale, crosshair animates in, label types out, coords roll.

### Phase 4 — Wire up deselect animation

**Step 4.1** — Rewrite the deselect path in `setActiveNode`:
1. Call `_cancelAllAnimations` (cancels select mid-animation if needed).
2. Immediately add `--fading` class to label; schedule `textContent = ''` after `DESELECT_LABEL_DUR`.
3. Schedule crosshair class swap after `DESELECT_CROSSHAIR_DELAY`.
4. Schedule `deselectTween` creation after `DESELECT_NODE_DELAY`.

Verifiable: Deselect a node → label fades, crosshair collapses, node dims briefly and returns to level color.

### Phase 5 — Interruption and reduced-motion

**Step 5.1** — Verify interruption: click A, immediately click B — confirm A's mesh resets cleanly, B animates in fresh. Click A, immediately click empty space — confirm A deselects cleanly from mid-animation.

**Step 5.2** — Verify reduced-motion path: set `state.reducedMotion = true` in console (or use `prefers-reduced-motion` OS setting) and confirm all animations are skipped; state is still correct.

**Step 5.3** — Verify teardown: call `destroyThreatMap` mid-animation; confirm no errors, no lingering RAF callbacks, no lingering `setInterval` from the typewriter cursor. Add `_cancelAllAnimations(element)` as the first statement inside `destroyThreatMap`, before the existing RAF cancellation. This clears all pending timers, typewriter intervals, and coord scramble timeouts.

**Step 5.4** — Harden `utils.js`: extend `_readCSSColors()` to also read `--neon-select` and return it as `neonSelect`. This is required by both the animated path (to populate `nodeTween.selectColor`) and the reduced-motion path (to set mesh color directly). The existing colour-cache pattern applies unchanged.

---

## Error Handling

- If `state.nodeMap.get(nodeId)` returns `undefined` in `setActiveNode`: early return (existing behaviour preserved).
- If `element.querySelector('.s9-threatmap__crosshair')` returns `null` (overlay not yet attached or already removed): all crosshair manipulations are guarded by null checks — existing pattern followed.
- If a `nodeTween` or `deselectTween` references a mesh that no longer exists: `removeNode` must call `_cancelAllAnimations(element)` **before** disposing the mesh or material, not just `setActiveNode(element, null)`. Reason: `setActiveNode(null)` now schedules deselect timers asynchronously; `deselectTween` is not created until `DESELECT_NODE_DELAY` ms later. Without `_cancelAllAnimations`, the tween would be created with a reference to the disposed mesh. `removeNode` must: (1) call `_cancelAllAnimations(element)`, (2) sync-reset mesh scale and color, (3) then proceed to `scene.remove` and `dispose`. A defensive null-parent guard can also be added to the loop: `if (tw.mesh.parent === null) { s.nodeTween = null; return; }`.
- **Label fadeout CSS class** (referenced in deselect path as `--fading`): add to `theme.css`:
  ```css
  .s9-threatmap__crosshair-label--fading {
    opacity: 0;
    transition: opacity var(--deselect-label-dur, 100ms) ease;
  }
  @media (prefers-reduced-motion: reduce) {
    .s9-threatmap__crosshair-label--fading {
      transition: none;
    }
  }
  ```
  The JS deselect path adds this class to `labelEl`, then removes it (and clears `textContent`) in the 100ms `setTimeout`.
- TypeWriter `cancel()` is safe to call multiple times (sets `cancelled = true` and calls `clearTimeout`/`clearInterval` on already-cleared IDs — harmless).
- Coord scramble `cancel()` same pattern.

---

## Backward Compatibility

- `setActiveNode(element, nodeId)` signature is unchanged. External callers continue to work.
- The `s9:threatmap-node-select` and `s9:threatmap-node-deselect` custom events fire at the same point in the call (after state mutation, before animations). Timing of the events relative to visual change shifts: events fire at t=0 while visual completion is at ~400ms. This was already the case (events always fired immediately). No change to event detail shape.
- `--visible` class is still added/removed as before; the new animation classes are added on top. Existing CSS rules for `--visible` are not removed.
- `refreshThemeColors` in `theme.js` updates node colors. If a node is currently selected (showing `--neon-select`), `refreshThemeColors` will overwrite it with the level color (existing behaviour for the active node was already broken in the same way — it set level color for the active node too). This spec does not fix that pre-existing issue; the active node check in `refreshThemeColors` should be handled in a separate fix.

---

## Test Plan

### Unit tests (no Three.js renderer)

All tests mock `_state` with a minimal state object. Three.js types can be stubbed with plain objects exposing the methods called (`mesh.scale.setScalar`, `mesh.material.color.set`, `mesh.material.color.lerpColors`).

**`_startTypewriter`:**
- Character-by-character output at the correct rate using fake timers (`jest.useFakeTimers()`).
- Cursor `_` is appended during typing; cursor continues blinking during the final `cursorBlinkMs` wait after last char; absent (text only) after `onDone` fires.
- `cancel()` stops all timers; `textContent` is not modified after cancellation.
- Zero-length string: `onDone` fires synchronously (no timers scheduled); `textContent` set to `''` immediately.
- Single character: types one character, cursor blinks for `cursorBlinkMs`, then `textContent` is the bare character.

**`_startCoordScramble`:**
- Before duration elapses: textContent contains scrambled digits with correct prefix/suffix format.
- At duration: textContent equals the formatted real value.
- `cancel()` stops updates; final value is whatever was last set (not necessarily the real value).
- Negative real values: sign is preserved in scrambled output.

**`_cancelAllAnimations`:**
- Clears all timer IDs from `pendingTimers`.
- Sets `nodeTween` and `deselectTween` to `null`.
- Increments `tweenGeneration`.
- Removes both animation classes from crosshair element.

**`easeOutCubic` / `easeInCubic` / `easeInOutCubic`:**
- At t=0: returns 0.
- At t=1: returns 1.
- Monotonic over [0, 1].

### Integration tests (jsdom, no WebGL)

**Select then verify state:**
- `setActiveNode(el, 'nyc')` → `state.nodeTween` is non-null with correct `t0`, `dur`.
- `state.pendingTimers.length` is 3: one `setTimeout` for crosshair+visible (40ms), one for coord scrambles lat+lng together (80ms), one for label (250ms). Lat and lng scrambles are started from a single shared `setTimeout` callback — not two separate IDs.
- `state.tweenGeneration` is 1.

**Select A then select B:**
- After selecting A: `state.tweenGeneration` is 1.
- After selecting B: `state.tweenGeneration` is 2, `state.pendingTimers` contains only B's timers.

**Deselect during select:**
- Select A, then immediately call `setActiveNode(el, null)`.
- `state.nodeTween` is `null`.
- `state.deselectTween` is `null` immediately (it is created async at +120ms via `setTimeout`).
- Advance fake timers past 120ms: `state.deselectTween` is now non-null.
- A's mesh scale is 1.0 (reset by `_cancelAllAnimations`).

**Reduced-motion path:**
- Set `state.reducedMotion = true`.
- `setActiveNode(el, 'nyc')` → `state.nodeTween` is `null`, `state.pendingTimers` is empty.
- Label `textContent` is set to the node label immediately.
- Coord elements contain formatted real values immediately.

### Manual / visual tests

- Select a node: confirm white flash on mesh is visible, bloom halo is noticeably larger than an unselected node.
- Crosshair: border appears to draw in from centre simultaneously on all four sides.
- Hairlines: extend outward from centre after crosshair starts.
- Label: characters appear one by one; cursor `_` blinks; cursor disappears when done.
- Coords: digits scramble then snap to real values.
- Deselect: label fades, crosshair collapses, node dims briefly.
- Rapid click between nodes: no orphaned scale values, no overlapping typewriters (verify in DevTools — only one `setInterval` active at a time).
- OS reduced-motion: all animations instant; label and coords set synchronously.
- Theme switch while node selected: node reverts to level color (pre-existing; note in test that this is a known limitation, not a regression).
- **Shape: `bracket`** — init with `crosshairShape: 'bracket'`; confirm no border on container; four L-corners visible; short centre tick hairlines; container clip-path animation still collapses all corners to centre on deselect.
- **Shape: `diamond`** — init with `crosshairShape: 'diamond'`; confirm box appears as a rotated diamond in screen space; hairlines appear as ×; label text remains upright; confirm no de-rotation flash at animation start/end.
- **Shape + reduced-motion** — both `bracket` and `diamond` with OS reduced-motion; confirm instant show/hide, no animation artifacts.
- **Shape + interruption** — rapid clicks in `bracket` and `diamond` modes; confirm no orphaned corner states or rotation glitches.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `clip-path: inset()` animation not hardware-composited on all browsers | Low | Medium (janky crosshair) | `clip-path` is composited in Chrome/Firefox/Safari; if performance is measured to be poor, fall back to `opacity` + `scale` only |
| `void crosshair.offsetWidth` flush causing layout thrash on rapid clicks | Low | Low (imperceptible) | Each click triggers at most one reflow; the crosshair element is small and detached from main layout flow (`position: absolute`, `pointer-events: none`) |
| `setInterval` for cursor blink not cancelled on Safari if tab is backgrounded | Low | Low (cursor stuck on one state) | `cancel()` is called before any new typewriter starts; even if interval fires while cancelled, the `if (cancelled) return` guard prevents DOM mutation |
| `lerpColors` is an instance method (`color.lerpColors(a, b, t)`); a static call would throw | Low | High (TypeError) | Animateloop code uses instance form; add inline comment to prevent regression |
| `removeNode` + async deselect race: `deselectTween` created 120ms after `setActiveNode(null)`, mesh may be disposed by then | Medium | High (crash on disposed material) | `removeNode` must call `_cancelAllAnimations(element)` before `dispose`; specced in Error Handling |
| CSS animation classes conflict when `--animating-in` is removed and `--animating-out` added in the same frame | Low | Low (frame of uncollapsed hairlines) | The `void crosshair.offsetWidth` flush in `_cancelAllAnimations` separates the remove and add into distinct style recalculations |
| NODE_FLASH_DUR + NODE_SETTLE_DUR drifts out of sync with NODE_SCALE_DUR when constants are tuned | Medium | Medium (color never fully reaches selectColor) | Enforced by validation constraint in Configuration table; add assertion in tests |
