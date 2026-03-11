# NetworkMatrix Component Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `NetworkMatrix` |
| **CSS Block** | `.s9-matrix` |
| **Status** | `approved` |
| **Column** | `center` |
| **Dependencies** | None — inline SVG only |
| **COMPONENTS.MD entry** | `yes` — update class API after approval |

---

## Purpose

SVG-based network topology visualization. Displays nodes and directed edges with animated traveling-dot effects on active connections. Supports click-to-select nodes, programmatic pulsing, and dynamic graph updates.

---

## CSS Class API

```
.s9-matrix                    — root container (position: relative)
.s9-matrix__canvas            — <svg> element filling the container
.s9-matrix__node              — <g> grouping: ring + core + label for one node
.s9-matrix__node--root        — primary/hub node (larger core stroke, brighter)
.s9-matrix__node--active      — currently selected node (pulsing ring visible)
.s9-matrix__node--pulsing     — transient data-activity pulse (1 ring cycle, then removed)
.s9-matrix__node-core         — filled <circle> (the node body)
.s9-matrix__node-ring         — outer pulse <circle> (animated via CSS transform scale)
.s9-matrix__node-label        — <text> annotation below node
.s9-matrix__edge              — <line> (idle) or <path> (active) connection between nodes
.s9-matrix__edge--active      — highlighted active connection with traveling dot
.s9-matrix__edge-dot          — animated traveling <circle> child of active edge <path>
```

---

## Content Structure

The SVG is created entirely by JS (`initMatrix`). Caller provides only the root container:

```html
<div class="s9-matrix" role="region" aria-label="NETWORK TOPOLOGY"
     data-s9-id="unique-id">
  <!-- SVG injected by initMatrix() -->
</div>
```

SVG internal structure (injected by JS):
```html
<svg class="s9-matrix__canvas" viewBox="0 0 100 100"
     preserveAspectRatio="xMidYMid meet">
  <defs>
    <!-- path id declarations for mpath references on active edges -->
  </defs>
  <g class="s9-matrix__edges">
    <!-- idle edge: <line> -->
    <line class="s9-matrix__edge" data-edge-id="e1"
          x1="20" y1="50" x2="80" y2="50" />
    <!-- active edge: <path> with id for mpath + dot child -->
    <path class="s9-matrix__edge s9-matrix__edge--active"
          id="s9-edge-e2" data-edge-id="e2"
          d="M 20 30 L 80 70" />
    <circle class="s9-matrix__edge-dot" r="1.2">
      <animateMotion dur="2s" repeatCount="indefinite">
        <mpath href="#s9-edge-e2" />
      </animateMotion>
    </circle>
  </g>
  <g class="s9-matrix__nodes">
    <g class="s9-matrix__node" data-node-id="n1" tabindex="0"
       role="button" aria-label="NODE LABEL" aria-pressed="false">
      <circle class="s9-matrix__node-ring" cx="20" cy="50" r="5" />
      <circle class="s9-matrix__node-core" cx="20" cy="50" r="3" />
      <text class="s9-matrix__node-label" x="20" y="58">NODE</text>
    </g>
  </g>
</svg>
```

### Coordinate System

Nodes are positioned in a **100×100 viewBox**. Caller supplies `x` and `y` in 0–100 range; JS maps them directly to SVG coordinates. `preserveAspectRatio="xMidYMid meet"` letterboxes the graph inside the container — the visible graph area may not fill the full container dimensions if the aspect ratio differs.

### Rules
- `<g class="s9-matrix__edges">` is rendered **before** `<g class="s9-matrix__nodes">` — edges draw below nodes.
- Idle edges are `<line>` elements. Active edges are promoted to `<path>` so `<mpath href>` can reference them; the path `id` is `"s9-edge-{edgeId}"` and must be unique per page.
- `<animateMotion>` + `<mpath>` is created only for active edges. `edge-dot` elements have no `data-edge-id` attribute; they are always direct siblings of their active `<path>` and identified via DOM traversal, not by their own attribute.
- Node `<g>` must carry `role="button"`, `tabindex="0"`, `aria-label` (the node label), `aria-pressed` (`"false"` idle / `"true"` active) — these must be kept in sync by JS.
- The SVG element has **no** `aria-hidden` attribute — the interactive nodes inside must remain in the accessibility tree.
- `.s9-matrix` uses `role="region"` (not `role="img"`) because it contains interactive descendants.

---

## Data Model

```js
// Node descriptor (passed to initMatrix / updateMatrix)
{
  id:    string,       // unique node identifier — reconciliation key for updateMatrix
  label: string,       // display label (uppercase ASCII recommended)
  x:     number,       // 0–100 SVG viewBox X coordinate
  y:     number,       // 0–100 SVG viewBox Y coordinate
  root?: boolean       // true → .s9-matrix__node--root modifier
}

// Edge descriptor
{
  id:     string,      // unique edge identifier
  from:   string,      // source node id
  to:     string,      // target node id
  active?: boolean     // true → traveling dot animation; false/absent → idle line
}
```

---

## Interactivity

| Trigger | Element | Action | Visual Effect |
|---|---|---|---|
| `click` | `.s9-matrix__node` | call `setActiveNode()` | `--active` added to clicked node; removed from previous |
| `keydown` Enter/Space | `.s9-matrix__node` | same as click | same |
| `click` active node | `.s9-matrix__node--active` | deselect — call `setActiveNode(element, null)` | `--active` removed; `s9:matrix-node-deselect` fired |

Hover effects (ring opacity, core glow) are **CSS-only** — no JS listeners required. See Aesthetic Plane.

---

## Effects

- [x] **Traveling dot on active edges**: `<animateMotion dur="2s" repeatCount="indefinite">` with `<mpath href="#s9-edge-{edgeId}">` on the `edge-dot` circle. Requires the active edge to be a `<path>` with `id="s9-edge-{edgeId}"`. Not created when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- [x] **Node pulse ring**: `.s9-matrix__node--active .s9-matrix__node-ring` — CSS animation `matrix-ring-pulse` using `transform: scale()` with `transform-box: fill-box` and `transform-origin: center`. Not `r` property animation (not cross-browser).
- [x] **Data pulse**: `pulseNode()` adds `.s9-matrix__node--pulsing` for 1 ring animation cycle; removed on `animationend` where `event.animationName === 'matrix-ring-pulse'`. If the target node already has `.s9-matrix__node--active` (which runs the infinite `matrix-ring-pulse` animation), `pulseNode()` is a no-op — the `animationend` event would be indistinguishable and the `--pulsing` modifier cannot be reliably removed.
- [x] **Hover glow**: CSS `:hover`/`:focus` on `__node` — core fill changes, `filter: drop-shadow(0 0 3px var(--neon-cyan))`. Note: `filter: drop-shadow()` is a CSS filter, not `box-shadow` — `var()` inside is valid.
- [x] **Hover ring**: CSS `.s9-matrix__node:hover .s9-matrix__node-ring, .s9-matrix__node:focus .s9-matrix__node-ring { opacity: 0.3; }`. CSS-only — no JS.
- [x] **Edge idle**: dashed stroke, low opacity. Active: solid stroke, full opacity.

`prefers-reduced-motion`: `<animateMotion>` elements are not created (checked at `initMatrix` time and on each `activateEdge` call via `window.matchMedia`). Ring pulse CSS animations are suppressed via `@media` block in aesthetic CSS.

---

## JavaScript Events

| Event | Fired on | Detail | When |
|---|---|---|---|
| `s9:matrix-node-click` | `.s9-matrix` | `{ nodeId: string, label: string }` | node activated (click, Enter, Space, or `setActiveNode` with non-null id) |
| `s9:matrix-node-deselect` | `.s9-matrix` | `{ nodeId: string }` | active node deselected (click on active node, or `setActiveNode(element, null)`) |

**Event sequence on switching nodes:** Whenever `setActiveNode(element, newNodeId)` is called (whether from a click interaction or directly by the caller) and a different node is currently active, fire `s9:matrix-node-deselect` for the previous node first, then `s9:matrix-node-click` for the new node. This sequence applies consistently regardless of the trigger source.

Both events `bubbles: true`.

---

## Public JS API

```js
// Create SVG, render nodes+edges, attach listeners
// reducedMotion checked once at init via matchMedia
initMatrix(element, { nodes, edges })

// Re-render with new data using id-keyed reconciliation (see Reconciliation section)
updateMatrix(element, { nodes, edges })

// Trigger one data-activity pulse on a node; removes --pulsing on animationend
pulseNode(element, nodeId)

// Make one edge active (traveling dot + --active); pass null to deactivate all edges
activateEdge(element, edgeId)

// Deactivate one specific edge: remove <animateMotion>, convert <path> back to <line>,
// remove --active and edge-dot sibling element
deactivateEdge(element, edgeId)

// Select a node: add --active, update aria-pressed, fire s9:matrix-node-click
// null → deselect current node, fire s9:matrix-node-deselect
setActiveNode(element, nodeId)

// Remove SVG and all listeners; delete WeakMap entry
destroyMatrix(element)
```

---

## Reconciliation in `updateMatrix`

`updateMatrix` diffs the incoming data against the current DOM state using `id` as the key:

1. **Removed nodes**: nodes in the current DOM whose `id` is absent from the new data are removed. If the removed node was active, `setActiveNode(element, null)` is called first.
2. **Added nodes**: nodes in the new data whose `id` is not in the current DOM are created and appended.
3. **Updated nodes**: nodes present in both old and new data have their `cx`, `cy`, `x`, `y`, `aria-label` (on `<g>`), `textContent` (on `__node-label` `<text>`), and `root` modifier (`.s9-matrix__node--root` added/removed based on `node.root`) updated in place. Active state (`.s9-matrix__node--active`) and `aria-pressed` are preserved.
4. **Edge geometry after node position change**: after updating node positions, any edge whose `from` or `to` node was repositioned must have its geometry recomputed. For idle `<line>` edges: update `x1`, `y1`, `x2`, `y2` attributes. For active `<path>` edges: update the `d` attribute (e.g. `M x1 y1 L x2 y2`).
5. Same three-step logic applies to edges. For edges present in both old and new data, the incoming `active` field is applied: if `active === true`, the edge becomes/stays active (traveling dot added if not already present); if `active` is `false` or absent, the edge becomes/stays idle (traveling dot removed if present). The previous active state is **not** preserved — the incoming data is the source of truth.

---

## Listener Lifecycle

`initMatrix()` stores `{ abortController, nodeMap: Map<id, DOMElement>, edgeMap: Map<id, DOMElement>, activeNodeId: string|null, reducedMotion: boolean }` on a WeakMap keyed by element.

All event listeners use `{ signal: ac.signal }`. `destroyMatrix()` calls `ac.abort()` and removes the injected SVG from the DOM, then deletes the WeakMap entry.

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-s9-id` | `.s9-matrix` | unique string | instance identifier |
| `data-node-id` | `.s9-matrix__node <g>` | node `id` value | JS lookup key |
| `data-edge-id` | `.s9-matrix__edge` only | edge `id` value | JS lookup key; edge-dot has no `data-edge-id` — identified via DOM sibling of its parent `<path>` |

Active `<path>` edges also carry an `id` attribute (`id="s9-edge-{edgeId}"`) for `<mpath href>` reference, distinct from `data-edge-id`.

---

## Structure Plane

`structure/components/network-matrix.css` — layout only, zero color/effect:

```css
.s9-matrix {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.s9-matrix__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* SVG text baseline and centering */
.s9-matrix__node-label {
  dominant-baseline: hanging;
  text-anchor: middle;
}
```

---

## Aesthetic Plane

`aesthetic/components/network-matrix.css` — color/animation only, zero layout:

Note on `r` animation: CSS `@keyframes` animating the SVG `r` attribute is not supported in Firefox. Use `transform: scale()` with `transform-box: fill-box` and `transform-origin: center` instead.

```css
@keyframes matrix-ring-pulse {
  0%   { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0;   transform: scale(1.8); }
}

/* Edges */
.s9-matrix__edge {
  stroke: var(--panel-border);
  stroke-width: 0.4;
  stroke-dasharray: 2 3;
  fill: none;
  transition: stroke 0.2s ease, opacity 0.2s ease;
}

.s9-matrix__edge--active {
  stroke: var(--neon-cyan);
  stroke-dasharray: unset;
  opacity: 0.8;
}

/* Traveling dot */
.s9-matrix__edge-dot {
  fill: var(--neon-cyan);
  opacity: 0.9;
  filter: drop-shadow(0 0 2px var(--neon-cyan));
}

/* Node ring */
.s9-matrix__node-ring {
  fill: none;
  stroke: var(--neon-cyan);
  stroke-width: 0.3;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

.s9-matrix__node--active .s9-matrix__node-ring {
  animation: matrix-ring-pulse 1.5s ease-out infinite;
}

.s9-matrix__node--pulsing .s9-matrix__node-ring {
  animation: matrix-ring-pulse 0.6s ease-out 1 forwards;
}

/* Hover ring (CSS-only, no JS) */
.s9-matrix__node:hover .s9-matrix__node-ring,
.s9-matrix__node:focus .s9-matrix__node-ring {
  opacity: 0.3;
}

/* Node core */
.s9-matrix__node-core {
  fill: var(--panel-bg-solid);
  stroke: var(--panel-border);
  stroke-width: 0.4;
  transition: fill 0.15s ease, stroke 0.15s ease;
}

.s9-matrix__node--root .s9-matrix__node-core {
  stroke: var(--neon-cyan);
  stroke-width: 0.6;
}

.s9-matrix__node:hover .s9-matrix__node-core,
.s9-matrix__node:focus .s9-matrix__node-core {
  fill: var(--row-highlight);
  stroke: var(--neon-cyan);
  filter: drop-shadow(0 0 3px var(--neon-cyan));
}

.s9-matrix__node--active .s9-matrix__node-core {
  fill: var(--row-highlight);
  stroke: var(--panel-border-active);
}

/* Node label */
.s9-matrix__node-label {
  font-family: var(--font-terminal);
  font-size: 3px;
  fill: var(--text-dim);
  pointer-events: none;
  transition: fill 0.15s ease;
}

.s9-matrix__node--active .s9-matrix__node-label,
.s9-matrix__node:hover .s9-matrix__node-label {
  fill: var(--text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .s9-matrix__node--active .s9-matrix__node-ring,
  .s9-matrix__node--pulsing .s9-matrix__node-ring {
    animation: none;
  }
  .s9-matrix__node-core,
  .s9-matrix__edge {
    transition: none;
  }
  /* <animateMotion> suppression is handled in JS via matchMedia */
}
```

---

## Accessibility

- [x] `.s9-matrix` has `role="region"` + `aria-label` (set at call site). Not `role="img"` — the component contains interactive nodes.
- [x] SVG has **no** `aria-hidden` attribute — interactive `role="button"` nodes inside must remain in the accessibility tree.
- [x] Each `.s9-matrix__node` `<g>` has `role="button"`, `tabindex="0"`, `aria-label` (node label), `aria-pressed` (synced by JS)
- [x] Keyboard: Enter/Space activates node (same as click); clicking active node again deselects
- [x] `prefers-reduced-motion`: `<animateMotion>` not created at JS level; CSS ring pulse suppressed

---

## Quality Gates

- [x] Spec approved before any code written
- [ ] Structure CSS in `structure/components/network-matrix.css` — zero color/effect
- [ ] Aesthetic CSS in `aesthetic/components/network-matrix.css` — zero layout
- [ ] Combined barrel in `components/network-matrix.css`
- [ ] `aesthetic/index.css` updated to import `./components/network-matrix.css`
- [ ] SVG injected entirely by `initMatrix()` — no SVG markup required from caller
- [ ] `<g class="s9-matrix__edges">` rendered before `<g class="s9-matrix__nodes">`
- [ ] Idle edges are `<line>`; active edges are promoted to `<path>` with `id="s9-edge-{edgeId}"`
- [ ] `<animateMotion>` + `<mpath href="#s9-edge-{id}">` created only for active edges
- [ ] `edge-dot` has no `data-edge-id` attribute; identified via DOM sibling of its `<path>`
- [ ] `matrix-ring-pulse` uses `transform: scale()` with `transform-box: fill-box` — not `r` property
- [ ] `pulseNode()` removes `--pulsing` on `animationend` where `animationName === 'matrix-ring-pulse'`
- [ ] `deactivateEdge()` implemented: removes `<animateMotion>`, converts `<path>` back to `<line>`, removes dot sibling
- [ ] `activateEdge(element, null)` deactivates all currently active edges
- [ ] `updateMatrix()` uses `id`-keyed reconciliation; preserves active state for surviving nodes/edges
- [ ] `updateMatrix()` in-place node update includes: `cx`, `cy`, `x`, `y`, `aria-label`, `__node-label` `textContent`, and `root` modifier
- [ ] `updateMatrix()` recomputes edge geometry (`x1/y1/x2/y2` or `d` attribute) for any edge connected to a repositioned node
- [ ] `setActiveNode(null)` fires `s9:matrix-node-deselect` for the previously active node (if any)
- [ ] Clicking an active node fires `setActiveNode(element, null)` → deselects and fires deselect event
- [ ] Switching nodes fires `s9:matrix-node-deselect` before `s9:matrix-node-click`
- [ ] `aria-pressed` updated by JS on activate/deactivate
- [ ] `initMatrix()` / `destroyMatrix()` use AbortController (WeakMap-keyed)
- [ ] `prefers-reduced-motion` checked at `initMatrix` time; `<animateMotion>` not created if true
- [ ] `s9:matrix-node-click` and `s9:matrix-node-deselect` events `bubbles: true`
- [ ] Visual test page at `tests/visual/network-matrix.html`
- [ ] COMPONENTS.MD entry updated with final class API
