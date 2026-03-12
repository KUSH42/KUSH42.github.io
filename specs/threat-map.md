# ThreatMap Component Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `ThreatMap` |
| **CSS Block** | `.s9-threatmap` |
| **Status** | `approved` |
| **Column** | `center` (full-height hero panel) |
| **Dependencies** | `three` npm package — **NOT YET INSTALLED** |
| **COMPONENTS.MD entry** | `yes` — update class API after approval |

---

## Purpose

Three.js-powered central visualization. Renders a wireframe globe with geolocated threat nodes, animated connection arcs, bloom post-processing, and a CSS overlay with corner brackets, coordinate readout, and targeting crosshair. Primary hero component of the S9-OV layout.

---

## Dependency

**Hard blocker:** `npm install three` must be run before implementation begins. `three` is a runtime dependency — add to `dependencies`, not `devDependencies`:

```bash
npm install three
```

Verify: `node_modules/three` exists and `package.json` `"dependencies"` contains `"three"`.

Three.js addons use bare-specifier paths that Vite resolves from `node_modules`:

```js
import * as THREE from 'three';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
```

No `vite.config.js` alias changes are required — `three/addons/` is a valid subpath export in `three`'s `package.json` from r152+.

---

## CSS Class API

```
.s9-threatmap                  — root container (position: relative; overflow: hidden)
.s9-threatmap__canvas          — Three.js <canvas> (class added to renderer.domElement)
.s9-threatmap__overlay         — absolute overlay atop canvas (pointer-events: none)
.s9-threatmap__bracket         — corner bracket base (4 divs)
.s9-threatmap__bracket--tl     — top-left corner bracket
.s9-threatmap__bracket--tr     — top-right corner bracket
.s9-threatmap__bracket--bl     — bottom-left corner bracket
.s9-threatmap__bracket--br     — bottom-right corner bracket
.s9-threatmap__coords          — bottom-center coordinate readout strip
.s9-threatmap__coords-lat      — latitude value span
.s9-threatmap__coords-lng      — longitude value span
.s9-threatmap__crosshair       — targeting reticle (opacity: 0 default)
.s9-threatmap__crosshair--visible — shows crosshair (opacity: 1)
.s9-threatmap__node-count      — top-right node count display
```

---

## Content Structure

Caller provides the container; canvas + overlay are injected entirely by `initThreatMap()`:

```html
<div class="s9-threatmap" role="img" aria-label="GLOBAL THREAT VISUALIZATION"
     data-s9-id="unique-id" data-threat-level="0">
  <!-- canvas + overlay injected by initThreatMap() -->
</div>
```

Injected structure:
```html
<canvas class="s9-threatmap__canvas"></canvas>
<div class="s9-threatmap__overlay">
  <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
  <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
  <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
  <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
  <div class="s9-threatmap__crosshair" aria-hidden="true"></div>
  <div class="s9-threatmap__coords" aria-live="polite">
    <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
    <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
  </div>
  <div class="s9-threatmap__node-count">NODES: 0</div>
</div>
<!-- After renderer creation: renderer.domElement.classList.add('s9-threatmap__canvas') -->
```

Note: `renderer.domElement.classList.add('s9-threatmap__canvas')` must be called after `new THREE.WebGLRenderer(...)` so the CSS sizing rules apply. Without this, the canvas uses default dimensions.

The `__coords` div has `aria-live="polite"` — when a node is selected, the coordinate update is announced by screen readers. This is the accessibility compensating mechanism for the absence of keyboard globe navigation in v1.

---

## Data Model

```js
// Node descriptor
{
  id:    string,   // unique identifier
  lat:   number,   // -90 to 90
  lng:   number,   // -180 to 180
  label: string,   // display label
  level: number    // 0–100 threat severity (affects node color)
}

// Edge descriptor
{
  id:   string,    // unique identifier
  from: string,    // source node id
  to:   string     // target node id
}
```

Node colors by threat level (read from computed CSS at init time — see CSS Color Reading):
- `0 ≤ level ≤ 40`: `--neon-green` → low threat
- `41 ≤ level ≤ 70`: `--neon-amber` → elevated
- `71 ≤ level ≤ 100`: `--neon-magenta` → critical

Boundary values use the lower category (e.g. `level=40` is green, `level=41` is amber). These thresholds are hard-coded constants: `LOW_THRESHOLD = 40`, `MID_THRESHOLD = 70`.

---

## Three.js Scene Architecture

### Renderer

```js
const renderer = new THREE.WebGLRenderer({
  canvas,              // renderer.domElement (class added after construction)
  antialias: true,
  alpha: true,         // transparent canvas — CSS --void background shows through
});
// No renderer.setClearColor() call — alpha:true default is transparent (rgba 0,0,0,0)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
```

After construction: `renderer.domElement.classList.add('s9-threatmap__canvas')`.

### Camera

```js
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
camera.position.set(0, 0, 2.8);
```

Width and height are read from `element.clientWidth` and `element.clientHeight` at init time.

### CSS Color Reading

All Three.js material colors must be read from computed CSS at `initThreatMap()` time to remain theme-aware. Method:

```js
const style = getComputedStyle(document.documentElement);
const neonCyan    = style.getPropertyValue('--neon-cyan').trim();    // e.g. '#00d4b0'
const neonGreen   = style.getPropertyValue('--neon-green').trim();
const neonAmber   = style.getPropertyValue('--neon-amber').trim();
const neonMagenta = style.getPropertyValue('--neon-magenta').trim();
const panelBorder = style.getPropertyValue('--panel-border').trim(); // for globe wireframe
```

Pass the hex string directly to `new THREE.Color(hexString)`. Note: CSS variables that resolve to `rgba(...)` cannot be passed directly — only hex values work. All neon and glow variables in the theme files use hex format, so this is safe.

### Globe

```js
const globeGeo = new THREE.SphereGeometry(1, 32, 24);
const globeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(neonCyan).multiplyScalar(0.15), // very dim teal
  wireframe: true,
  transparent: true,
  opacity: 0.25,
});
const globe = new THREE.Mesh(globeGeo, globeMat);
scene.add(globe);
```

### Lat/Lng to 3D Position

```js
function latLngToVec3(lat, lng, radius = 1.03) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  );
}
```

The negation of X is intentional: it orients the globe so that `lng = 0` (prime meridian) faces away from the camera at `(0, 0, 2.8)`, placing the Pacific (lng ≈ 180°/−180°) toward the viewer on load. This is a stylistic choice consistent with the reference material. Verify: `latLngToVec3(90, 0, 1)` → `(0, 1, 0)` (North Pole up); `latLngToVec3(0, 0, 1)` → `(0, 0, 1)` (equator prime meridian toward +Z).

### Nodes

Each node is a `THREE.Mesh` with `SphereGeometry(0.02, 8, 8)` and `MeshBasicMaterial`. The material `color` is set from computed CSS based on threat level at `addNode()` time (re-reads CSS in case theme changed). Stored in `nodeMap` as `{ mesh, material, geometry, lat, lng, label, level }` for disposal and raycasting.

### Connection Arcs

Arcs use `THREE.QuadraticBezierCurve3`:
```js
const start = latLngToVec3(fromNode.lat, fromNode.lng);
const end   = latLngToVec3(toNode.lat,   toNode.lng);
const mid   = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.4);
const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
const points = curve.getPoints(30);
const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
const arcMat = new THREE.LineBasicMaterial({ color: new THREE.Color(neonCyan), opacity: 0.3, transparent: true });
const arc = new THREE.Line(arcGeo, arcMat);
scene.add(arc);
```

Stored in `edgeMap` as `{ line, geometry, material }`.

### Post-Processing

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(element.clientWidth, element.clientHeight),
  0.4,   // strength (default; scales with setThreatLevel)
  0.4,   // radius
  0.85,  // threshold
);
composer.addPass(bloomPass);
```

Bloom pass is stored in the WeakMap state as `bloomPass` for `setThreatLevel` updates.

**Bloom strength** is a **global scene property** — it cannot vary per node. Node-level threat severity is expressed via `MeshBasicMaterial.color` only. `setThreatLevel()` clamps the input first, then adjusts bloom: `strength = 0.4 + (Math.max(0, Math.min(100, level)) / 100) * 0.8` → range 0.4–1.2. When `reducedMotion` is true, bloom strength is fixed at 0.4 regardless of level; this is a JS check, not a CSS `@media` rule — bloom is not a CSS property.

### OrbitControls

```js
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping  = true;
controls.dampingFactor  = 0.05;
controls.enablePan      = false;
controls.minDistance    = 1.8;
controls.maxDistance    = 5.0;
controls.autoRotate     = !reducedMotion;  // disabled if prefers-reduced-motion
controls.autoRotateSpeed = 0.3;
```

**Auto-rotate resume mechanism:**
```js
let resumeTimer = null;
controls.addEventListener('start', () => {
  controls.autoRotate = false;
  clearTimeout(resumeTimer);
}, { signal: ac.signal });
controls.addEventListener('end', () => {
  if (!reducedMotion) {
    resumeTimer = setTimeout(() => { controls.autoRotate = true; }, 3000);
  }
}, { signal: ac.signal });
```

`resumeTimer` is stored on WeakMap state and cleared in `destroyThreatMap()`.

### Raycasting (Node Selection)

On `click` event on `renderer.domElement`:
1. Compute normalized device coordinates (NDC): `x = (event.offsetX / width) * 2 - 1`, `y = -(event.offsetY / height) * 2 + 1`.
2. `raycaster.setFromCamera({ x, y }, camera)`.
3. Collect all node meshes from `nodeMap` values. Cast ray against them.
4. If intersects.length > 0: `setActiveNode(element, nearest.object.userData.nodeId)`.
5. If intersects.length === 0 and a node is currently active: `setActiveNode(element, null)`.
6. Each node mesh carries `mesh.userData.nodeId = id` set at `addNode()` time.

### Resize Handling

`ResizeObserver` on the container element (not `window`):
```js
const ro = new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
  bloomPass.resolution.set(width, height);
});
ro.observe(element);
```

### Animation Loop

```js
function animate() {
  const id = requestAnimationFrame(animate);
  state.animFrameId = id;
  controls.update();    // required for damping
  composer.render();    // bloom composer — replaces renderer.render()
}
animate();
```

---

## Interactivity

| Trigger | Element | Action | Visual Effect |
|---|---|---|---|
| `click` canvas | node mesh | `setActiveNode(id)` | crosshair appears at node; coords update; `s9:threatmap-node-select` fired |
| `click` canvas | empty space | `setActiveNode(null)` if node active | crosshair hidden; `s9:threatmap-node-deselect` fired |
| `click` canvas | active node mesh | `setActiveNode(null)` (toggle) | deselects; crosshair hidden; deselect event fired |
| drag | canvas | orbit | globe rotates; auto-rotate paused |
| scroll / pinch | canvas | zoom | camera distance changes (clamped 1.8–5.0) |

---

## Effects

- [x] **Bloom post-processing**: `UnrealBloomPass` global; strength 0.4–1.2 via `setThreatLevel()`
- [x] **Globe wireframe**: `MeshBasicMaterial` wireframe sphere; color from computed `--neon-cyan` × 0.15
- [x] **Node color by level**: green / amber / magenta from computed CSS; set at `addNode()` time
- [x] **Connection arcs**: `QuadraticBezierCurve3`; control point at 1.4× midpoint; `LineBasicMaterial` at 30% opacity
- [x] **Auto-rotate**: 0.3 speed; pauses on interaction; resumes after 3s idle via `start`/`end` events + `setTimeout`
- [x] **Corner brackets**: pure CSS `border-top/left`, `border-top/right`, etc. — no JS
- [x] **Coordinate readout**: `aria-live="polite"` div; updated by `setActiveNode()` only — reads `lat`/`lng` from the selected node's `nodeMap` entry. On deselect, reverts to `LAT: --.-°  LNG: --.-°`. No update during orbit/drag.
- [x] **Crosshair**: `.s9-threatmap__crosshair--visible` modifier; CSS `::before`/`::after` lines; positioned at canvas center in v1 (not screen-projected to node position, which would require per-frame update)

`prefers-reduced-motion` — JS side: `controls.autoRotate = false` at init; `bloomPass.strength` fixed at 0.4 regardless of `setThreatLevel()` calls (bloom is a Three.js scene property, not CSS-controllable). CSS side: crosshair opacity transition removed via `@media (prefers-reduced-motion: reduce)` in the aesthetic stylesheet.

---

## JavaScript Events

| Event | Fired on | Detail | When |
|---|---|---|---|
| `s9:threatmap-node-select` | `.s9-threatmap` | `{ nodeId, label, lat, lng, level }` | node activated via click or `setActiveNode(non-null)` |
| `s9:threatmap-node-deselect` | `.s9-threatmap` | `{ nodeId }` | node deselected (click empty space, click active node, or `setActiveNode(null)`) |

Both events `bubbles: true`. `setActiveNode(null)` always fires the deselect event if a node was previously active.

---

## Public JS API

```js
// Initialize Three.js scene, inject canvas + overlay, start animation loop.
// Reads reducedMotion via matchMedia at init time.
initThreatMap(element, options?)
// options: { autoRotate?: boolean = true, bloomStrength?: number = 0.4 }

// Tear down: stop animation loop, disconnect ResizeObserver, abort listeners,
// dispose all Three.js geometries + materials, remove DOM, delete WeakMap entry
destroyThreatMap(element)

// Add a threat node mesh to the globe. Re-reads CSS color vars at call time.
// After adding: increments __node-count display (e.g. "NODES: 3").
addNode(element, { id, lat, lng, label, level })

// Remove a node mesh (and any arcs connected to it) from the scene.
// If nodeId is not in nodeMap, log console.warn and return (no-op).
// Sequence: (1) if nodeId === activeNodeId, call setActiveNode(element, null) first;
// (2) scan edgeMap for edges where from === nodeId or to === nodeId — remove each via removeEdge();
// (3) dispose mesh geometry + material, scene.remove(mesh), delete nodeMap entry;
// (4) decrement __node-count display.
removeNode(element, nodeId)

// Add a connection arc between two nodes
addEdge(element, { id, from, to })

// Remove a connection arc
removeEdge(element, edgeId)

// Select a node (null to deselect).
// Fires s9:threatmap-node-select or s9:threatmap-node-deselect.
// On select: adds __crosshair--visible, sets data-active-node, updates __coords:
//   __coords-lat textContent = `LAT: ${lat.toFixed(2)}°`
//   __coords-lng textContent = `LNG: ${lng.toFixed(2)}°`
// On deselect: removes __crosshair--visible, removes data-active-node, reverts __coords:
//   __coords-lat textContent = 'LAT: --.-°'
//   __coords-lng textContent = 'LNG: --.-°'
setActiveNode(element, nodeId)

// Set global threat level (0-100). Input is clamped: level = Math.max(0, Math.min(100, level)).
// Side-effects: (1) updates data-threat-level attribute, (2) adjusts bloomPass.strength
//   = 0.4 + (level/100)*0.8 unless reducedMotion (fixed at 0.4).
// No other visual changes (globe color, bracket color, etc.)
setThreatLevel(element, level)
```

**Node immutability:** Nodes are immutable after creation. There is no `updateNode()` function. To change a node's position, label, or threat level, call `removeNode(element, nodeId)` followed by `addNode(element, { id: nodeId, ... })` with the new data.

**Mutation timing:** `addNode`, `removeNode`, `addEdge`, `removeEdge` may be called at any time. JS is single-threaded — the RAF loop cannot preempt synchronous calls. Mutations take effect on the next `composer.render()` call. No deferral mechanism is required.

---

## Listener / Resource Lifecycle

`initThreatMap()` stores the following on a WeakMap keyed by element:
```js
{
  animFrameId: number,
  renderer: WebGLRenderer,
  composer: EffectComposer,
  bloomPass: UnrealBloomPass,
  controls: OrbitControls,
  scene: Scene,
  camera: PerspectiveCamera,
  resizeObserver: ResizeObserver,
  nodeMap: Map<id, { mesh, material, geometry, lat, lng, label, level }>,
  edgeMap: Map<id, { line, geometry, material }>,
  abortController: AbortController,
  resumeTimer: number | null,
  reducedMotion: boolean,
  activeNodeId: string | null,
}
```

`destroyThreatMap()` sequence:
1. `cancelAnimationFrame(state.animFrameId)`
2. `clearTimeout(state.resumeTimer)`
3. `state.resizeObserver.disconnect()`
4. `state.abortController.abort()`
5. Dispose all geometries and materials stored in `nodeMap` and `edgeMap`:
   ```js
   for (const { mesh, material, geometry } of nodeMap.values()) {
     geometry.dispose(); material.dispose(); scene.remove(mesh);
   }
   for (const { line, material, geometry } of edgeMap.values()) {
     geometry.dispose(); material.dispose(); scene.remove(line);
   }
   globeGeo.dispose(); globeMat.dispose();
   ```
6. `state.composer.dispose()` — releases GPU render targets held by EffectComposer and its passes
7. `state.renderer.dispose()`
8. Remove `renderer.domElement` and overlay from `element`'s DOM
9. Delete WeakMap entry

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-s9-id` | `.s9-threatmap` | unique string | instance identifier |
| `data-threat-level` | `.s9-threatmap` | `0`–`100` | current threat level; synced by `setThreatLevel()` |
| `data-active-node` | `.s9-threatmap` | node id or absent | currently selected node; set by `setActiveNode()`, removed on deselect |

---

## Structure Plane

`structure/components/threat-map.css` — layout only, zero color/effect:

```css
.s9-threatmap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Sizing applied to Three.js canvas via JS classList.add */
.s9-threatmap__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.s9-threatmap__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Corner brackets — 16px L-shapes, absolutely positioned */
.s9-threatmap__bracket {
  position: absolute;
  width: 16px;
  height: 16px;
}

.s9-threatmap__bracket--tl { top: 8px;    left: 8px;    }
.s9-threatmap__bracket--tr { top: 8px;    right: 8px;   }
.s9-threatmap__bracket--bl { bottom: 8px; left: 8px;    }
.s9-threatmap__bracket--br { bottom: 8px; right: 8px;   }

/* Coordinate readout — centered bottom */
.s9-threatmap__coords {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  white-space: nowrap;
}

/* Crosshair — centered, hidden by default */
/* position: absolute establishes a containing block for absolutely positioned
   pseudo-elements — no position: relative needed or allowed (it would override
   the placement positioning). overflow: visible allows pseudo-elements to extend
   beyond the 20×20 bounds. */
.s9-threatmap__crosshair {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  overflow: visible;
}

.s9-threatmap__crosshair--visible {
  opacity: 1;
}

/* Crosshair bars — positioned relative to the crosshair element */
.s9-threatmap__crosshair::before,
.s9-threatmap__crosshair::after {
  content: '';
  position: absolute;
}

/* Vertical bar */
.s9-threatmap__crosshair::before {
  width: 1px;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

/* Horizontal bar */
.s9-threatmap__crosshair::after {
  height: 1px;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.s9-threatmap__node-count {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

---

## Aesthetic Plane

`aesthetic/components/threat-map.css` — color/animation only, zero layout:

```css
/* Corner brackets — which borders are visible per corner */
.s9-threatmap__bracket--tl {
  border-top:  1px solid var(--neon-cyan);
  border-left: 1px solid var(--neon-cyan);
}
.s9-threatmap__bracket--tr {
  border-top:   1px solid var(--neon-cyan);
  border-right: 1px solid var(--neon-cyan);
}
.s9-threatmap__bracket--bl {
  border-bottom: 1px solid var(--neon-cyan);
  border-left:   1px solid var(--neon-cyan);
}
.s9-threatmap__bracket--br {
  border-bottom: 1px solid var(--neon-cyan);
  border-right:  1px solid var(--neon-cyan);
}

/* Coordinate readout */
.s9-threatmap__coords {
  font-family: var(--font-terminal);
  font-size: 0.55rem;
  color: var(--text-dim);
}

/* Node count */
.s9-threatmap__node-count {
  font-family: var(--font-terminal);
  font-size: 0.55rem;
  color: var(--text-dim);
}

/* Crosshair bars */
.s9-threatmap__crosshair::before,
.s9-threatmap__crosshair::after {
  background: var(--neon-cyan);
}

/* Crosshair appear transition */
.s9-threatmap__crosshair--visible {
  transition: opacity 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .s9-threatmap__crosshair--visible {
    transition: none;
  }
}
```

---

## Accessibility

- [x] `.s9-threatmap` has `role="img"` + `aria-label` (set at call site)
- [x] `__overlay` has **no** `aria-hidden` — it contains live regions that must remain in the tree
- [x] Each `__bracket` div has `aria-hidden="true"` — decorative only
- [x] `__crosshair` has `aria-hidden="true"` — decorative only
- [x] `__coords` has `aria-live="polite"` — compensating mechanism for absence of keyboard globe navigation; node label and coordinates announced on selection; reverts to `LAT: --.-°  LNG: --.-°` on deselect
- [x] `__node-count` has no `aria-hidden` — informational text remains accessible
- [x] Keyboard globe orbit: not implemented in v1 (mouse/touch only). Documented known limitation.
- [x] `prefers-reduced-motion`: `controls.autoRotate = false` at init; bloom strength fixed at 0.4; crosshair transition removed

---

## Quality Gates

- [ ] **BLOCKER**: `npm install three` run before implementation; `three` in `"dependencies"` in `package.json`; `node_modules/three` exists
- [x] Spec approved before any code written
- [ ] Structure CSS in `structure/components/threat-map.css` — zero color/effect
- [ ] Aesthetic CSS in `aesthetic/components/threat-map.css` — zero layout; all four bracket variants have explicit border rules
- [ ] Combined barrel in `components/threat-map.css`
- [ ] `aesthetic/index.css` updated to import `./components/threat-map.css`
- [ ] `renderer.domElement.classList.add('s9-threatmap__canvas')` called after renderer creation
- [ ] `initThreatMap()` / `destroyThreatMap()` use WeakMap for all resource storage
- [ ] `destroyThreatMap()` disposes all geometries and materials from `nodeMap` and `edgeMap` explicitly; `composer.dispose()` called before `renderer.dispose()`; `cancelAnimationFrame` called first
- [ ] `ResizeObserver` used for canvas resize (not `window.resize`)
- [ ] `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` set at init
- [ ] Node and globe colors read from `getComputedStyle(document.documentElement)` at relevant call time
- [ ] `bloomPass` referenced from WeakMap state (not re-queried) by `setThreatLevel()`
- [ ] `setThreatLevel()` side-effects: (1) `data-threat-level` updated, (2) `bloomPass.strength` updated unless `reducedMotion`; no other visual changes
- [ ] `latLngToVec3(90, 0, 1)` returns `(0, 1, 0)` (North Pole up); `latLngToVec3(0, 0, 1)` returns `(0, 0, 1)`
- [ ] Auto-rotate: `controls.start` clears timer + sets `autoRotate=false`; `controls.end` starts 3000ms timer after which `autoRotate=true` (skipped if `reducedMotion`)
- [ ] `UnrealBloomPass` resolution updated in `ResizeObserver` callback via `bloomPass.resolution.set(w, h)`
- [ ] Bloom strength: `0.4 + (level/100) * 0.8`; fixed at `0.4` when `reducedMotion`
- [ ] Global bloom only — no per-node bloom; per-node severity shown via `MeshBasicMaterial.color`
- [ ] Raycaster uses `event.offsetX/offsetY` relative to canvas; `mesh.userData.nodeId` set at `addNode()`
- [ ] Click active node → `setActiveNode(null)` (toggle/deselect)
- [ ] Click empty canvas (no ray intersect) → `setActiveNode(null)` if node is active
- [ ] `setActiveNode(null)` fires `s9:threatmap-node-deselect` if a node was previously active
- [ ] `data-active-node` set on select, removed on deselect
- [ ] `__coords` `aria-live="polite"` — updated on select: `LAT: {lat.toFixed(2)}°` / `LNG: {lng.toFixed(2)}°`; reverts to `LAT: --.-°` / `LNG: --.-°` on deselect; no update during orbit
- [ ] `__node-count` updated by `addNode()` (increment) and `removeNode()` (decrement); format: `NODES: {n}`
- [ ] `__overlay` has no `aria-hidden`; decorative children (`__bracket` ×4, `__crosshair`) each have `aria-hidden="true"`
- [ ] `setThreatLevel()` clamps input to 0–100 before applying
- [ ] `removeNode()` calls `setActiveNode(null)` first if node is active; scans edgeMap and calls `removeEdge()` for each connected edge before removing node mesh
- [ ] `s9:threatmap-node-select` and `s9:threatmap-node-deselect` events `bubbles: true`
- [ ] `prefers-reduced-motion` checked via matchMedia at `initThreatMap()` time; stored as `reducedMotion`; `controls.autoRotate` set accordingly
- [ ] Crosshair pseudo-element positioning tested in browser — fallback to child divs if `position` conflict causes rendering issue
- [ ] Visual test page at `tests/visual/threat-map.html`
- [ ] COMPONENTS.MD entry updated with final class API
