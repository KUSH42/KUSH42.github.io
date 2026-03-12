# Spec: `pulse-radar`

**Status**: Approved
**Priority**: P1
**Depends on**: `aesthetic/variables/base.css`, `aesthetic/variables/themes/*.css`, `aesthetic/effects/index.css`, `aesthetic/components/panel-shell.css`, Three.js r168+

---

## Problem Statement

The right column (`s9-ov__right`) holds three generic text panels. It has no spatial
element — the ThreatMap globe is macro/strategic; there is no local-area tactical radar.
The column at `--sidebar-right: 346px` wastes the rightmost screen quarter on text feeds.
Adding a pulse radar gives the UI a second spatial register (local/tactical vs. global/
strategic), which is core GitS aesthetic.

---

## Goals

1. Rotating sweep arm, contact blips, concentric rings, azimuth grid — visually credible
   military/cyberpunk radar in the right column.
2. Fits inside a `.s9-panel` at `--sidebar-right: 420px` (new value); panel takes `flex: 3`.
3. Standalone exports `initRadar(element, opts)`, `destroyRadar(element)`, and
   `refreshRadarTheme(element)` match the existing `initX` / `destroyX` / `refreshX(element)`
   convention. `setRadarThreatLevel` and `injectContact` are on the returned control surface
   (no element arg needed post-init) — same hybrid used by `initMatrixRain`.
4. Exposes `setRadarThreatLevel(0–1)` and `injectContact(angle, range, type)` on the
   returned control surface for integration with existing S9 events.
5. Zero performance regression: isolated renderer + RAF, paused via `IntersectionObserver`
   when off-screen.
6. Full teardown with no memory leaks; WeakMap state registry matching existing components.
7. Respects `prefers-reduced-motion`: freezes sweep, keeps static rings and contacts.
8. Theme-responsive: reads neon CSS vars at init and on `refreshRadarTheme(element)` call.

## Non-Goals

- Not a real data source — contacts are synthetic/seeded plus `injectContact`.
- Not interactive beyond a future label-hover extension point.
- Does not share `EffectComposer` with `threat-map.js`.
- Does not replace or modify the center-column globe.
- No audio.

---

## Design

### 1. Visual Design

#### Canvas geometry

Radar disc is a circle inscribed in the panel body's square area.
`R = Math.floor(Math.min(w, h) / 2) - 8` world units (world units = px at the element's
current size, per the orthographic camera setup in §2).

#### Background

`PlaneGeometry(2R, 2R)` with `RadarBgShader` (fragment only, opaque, `NormalBlending`):

```glsl
// pseudocode
r      = length(vUv - 0.5) * 2.0          // 0 at centre, 1 at disc edge
base   = mix(uVoidColor * 1.6, uVoidColor, r*r)
noise  = fbm(vUv * 3.0 + uTime * 0.04) * 0.04
disc   = 1.0 - smoothstep(0.48, 0.50, r * 0.5)   // hard clip at circle boundary
gl_FragColor = vec4(base + noise, disc)
```

`uVoidColor` is read from `--void` CSS variable at init and on theme refresh.
Hash-based single-octave FBM — no texture dependency.

#### Range rings

Five `THREE.LineLoop`s at normalised radii [0.2, 0.4, 0.6, 0.8, 1.0] × R, 64 segments
each. Kept as separate objects (5 draw calls is negligible — merging LineLoops into
LineSegments would require vertex duplication per segment and adds no benefit at this
scale). Color: `--neon-cyan` at 18% alpha for the inner four rings, 28% for the outermost
edge ring. Inner four rings share `ringMaterialInner` (`LineBasicMaterial`, opacity 0.18);
the outer edge ring uses `ringMaterialOuter` (`LineBasicMaterial`, opacity 0.28).

Range labels ("2 km", "4 km", "6 km", "8 km", "10 km") are HTML `<span>` elements inside
`.s9-radar__overlay` (NOT inside `.s9-radar__labels` — that container is for contact
labels only). Placed at the 3 o'clock position of each ring. Recalculated on
`ResizeObserver`. Font: `--font-terminal`, 0.5rem, `--text-dim`.

#### Azimuth tick marks

32 radial ticks from `R*0.96` to `R*1.0`. Every 8th tick (45° intervals) is longer:
`R*0.92` to `R*1.0`. All 32 ticks merged into one `THREE.LineSegments` (64 vertices,
32 pairs — straightforward, no connectivity issues). Uses `ringMaterialTicks`
(`LineBasicMaterial`, `--neon-cyan`, opacity 0.22).

Cardinal + intercardinal labels ("N", "NE", "E", "SE", "S", "SW", "W", "NW") as HTML
`<span>` elements inside `.s9-radar__overlay` (same container as range labels; separate
from `.s9-radar__labels` which is for contact labels). Recalculated on resize.

#### Sweep arm

**Trail quad**: `PlaneGeometry(2R, 2R)`, `SweepShader` (fragment), `AdditiveBlending`,
`depthWrite: false`. Draws the angular arc in fragment space:

```glsl
uniform float uAngle;     // current sweep angle, radians, 0 = north, clockwise
uniform float uArcWidth;  // default PI * 0.6
uniform vec3  uColor;     // --neon-cyan

vec2  p    = vUv - 0.5;
float r    = length(p);
if (r > 0.499) discard;                        // clip to disc

float a    = atan(p.x, p.y);                  // 0 = north, CW positive
float diff = mod(uAngle - a + TWO_PI, TWO_PI);
if (diff > uArcWidth) discard;

float t    = diff / uArcWidth;                // 0 = leading, 1 = trailing
float intensity = pow(1.0 - t, 2.0)
                * max(0.0, 1.0 - r * 1.9)    // radial fade
                * smoothstep(0.0, 0.04, r);  // suppress centre pinhole
gl_FragColor = vec4(uColor * intensity * 0.9, intensity * 0.8);
```

**Leading line**: one `THREE.Line` from centre to `(sin(uAngle), cos(uAngle)) * R`.
Color: `--neon-cyan` at 90% alpha. Updated each frame by rebuilding the two-point
`BufferGeometry` positions (cheap — just two vertices).

**Timing**: default 4 s per revolution. `setRadarThreatLevel(t)` maps linearly:
`sweepSpeed = lerp(TAU/4, TAU/1.2, t)` rad/s. RAF increments `uAngle` each frame.

#### Contacts

Two `InstancedMesh` layers, both capped at 64 slots:

- **Dot layer**: `PlaneGeometry(1, 1)`, `ContactDotShader`. Renders the small core blip.
- **Ring layer**: `PlaneGeometry(1, 1)`, `ContactRingShader`. Renders the expanding ring.

Both meshes share the same three per-instance `BufferAttribute` arrays:
`a_phase` (Float32, 1), `a_type` (Float32, 1), `a_age` (Float32, 1).
All declared as `THREE.InstancedBufferAttribute` with `usage: THREE.DynamicDrawUsage`.

**Instance positioning** is via `instanceMatrix` (standard Three.js InstancedMesh API),
set each frame using a shared `THREE.Object3D` dummy:

```js
dummy.position.set(Math.sin(c.angle) * c.range * R, Math.cos(c.angle) * c.range * R, 0);
dummy.scale.setScalar(8);   // 8 world-unit (px) quad
dummy.updateMatrix();
dotMesh.setMatrixAt(c.instIdx, dummy.matrix);
```

No custom `a_pos` attribute on the GPU. `contact.angle` and `contact.range` (the stored
polar coords) are used to recompute Cartesian positions on resize — no separate x/y fields
are stored in the contact record.

**Ghost contact rendering**: ghost echoes are rendered as **additional pool entries**
(type = `'ghost'`, distinct from the three user-visible types) at 15% opacity with no
ring. When a contact transitions from `FADING` to `GHOST` state, its polar coords are
stored as `contact.ghostAngle / contact.ghostRange`, and a new ghost pool entry is
created at those coords with `a_age` pre-seeded to 0.85, a short `maxAge`, and
`a_type = 3.0` (ghost). ContactDotShader reads `a_type === 3.0` → renders at 15%
brightness. ContactRingShader reads `a_type === 3.0` → `discard` (no ring rendered for
ghost instances; their ring InstancedMesh slot is kept but produces no visible output).
This approach requires no additional GPU attributes — just an extra pool slot per ghost.

#### Contact visual states by type

| type string | a_type float | Color | Ring Hz | Notes |
|---|---|---|---|---|
| `'friendly'` | 0.0 | `--neon-green` | 0.6 | square dot |
| `'neutral'` | 1.0 | `--neon-amber` | 1.0 | single ring |
| `'hostile'` | 2.0 | `--neon-magenta` | 1.5 | double ring burst after sweep pass |
| `'ghost'` | 3.0 | `--neon-cyan` | none | 15% opacity, no ring mesh |

`--neon-amber` exists in all five theme files. ✓

#### Contact labels

HTML `<div class="s9-radar__labels">` with one `<span class="s9-radar__label">` per active
non-ghost contact. Positioned each frame:

```js
const cx = element.clientWidth / 2;
const cy = element.clientHeight / 2;
span.style.left = `${cx + Math.sin(c.angle) * c.range * R}px`;
span.style.top  = `${cy - Math.cos(c.angle) * c.range * R}px`;
span.style.opacity = String(1 - c.age);
```

Content: contact ID (e.g. `T-07`) + threat code for hostile (e.g. `⚠ HC-3`).

#### Sweep-reveal mechanic

Each frame, for every active non-ghost contact: if
`|angleDiff(state.sweepAngle, c.angle)| < 0.12 rad` and `now - c.lastSweep > 800ms`,
then `c.phase = 0` (ring burst) and `c.lastSweep = now`. Fading contacts (`age > 0.65`)
are re-illuminated: `c.age = 0.60`.

#### Secondary effects

- **Static flicker**: `uStaticAmt` uniform on the sweep quad. Roughly every 8 s, a random
  80 ms window sets `uStaticAmt = 0.5 + noise`, modulating sweep trail opacity. Idle
  value: 1.0 (no effect).
- **Radial boundary jitter**: the disc background's outer smoothstep boundary uses
  `0.48 + sin(uTime * 1.3 + hash) * 0.003` — a barely-perceptible breathing of the edge.

#### Panel chrome

Standard `.s9-panel` with header "PROXIMITY SCAN / 近接スキャン", status indicator
`#radar-status`, and a footer showing contact count and sweep period:
`CONTACTS: 0 | SWEEP: 4.0s`. The `.s9-panel__body` has `padding: 0; position: relative`.

---

### 2. Three.js Rendering Architecture

```
initRadar(element)
  │
  ├─ <canvas class="s9-radar__canvas">       → element.appendChild
  ├─ <div class="s9-radar__overlay">         → element.appendChild
  │    └─ <div class="s9-radar__labels">     (contact label spans only)
  │
  ├─ THREE.WebGLRenderer({ canvas, antialias: true, alpha: false,
  │                         premultipliedAlpha: false })
  │   renderer.setClearColor(cssVar('--void'), 1)
  │   renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  │
  ├─ THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)  ← safe default at R=0
  │   camera.position.z = 10
  │   (ResizeObserver sets real frustum: -R, R, R, -R on first measured size)
  │
  ├─ THREE.Scene (renderOrder enforced by mesh.renderOrder property)
  │   ├─ backgroundMesh   renderOrder=0  PlaneGeo(2,2)      RadarBgShader
  │   ├─ ringMesh[0..4]  renderOrder=1  LineLoop ×5         ringMaterialInner/Outer (cyan)
  │   ├─ ticksMesh        renderOrder=1  LineSegments        ringMaterialTicks (cyan)
  │   ├─ sweepTrailMesh   renderOrder=2  PlaneGeo(2,2)      SweepShader
  │   ├─ sweepArmLine     renderOrder=3  Line (2 pts)        LineBasicMaterial (cyan)
  │   ├─ contactRingsMesh renderOrder=4  InstancedMesh(64)  ContactRingShader
  │   └─ contactDotsMesh  renderOrder=5  InstancedMesh(64)  ContactDotShader
  │
  └─ RAF loop
       _updateSweep(dt)
       _updateContacts(dt)           // lifecycle, age, ghost creation
       _updateInstanceMatrices()     // dummy.setPosition + setMatrixAt; set instanceMatrix.needsUpdate=true
       _updateInstanceAttributes()   // write a_phase/a_type/a_age; set each attribute.needsUpdate=true
       _updateLabels()               // sync HTML span positions + opacity
       renderer.render(scene, camera)
```

Scene coordinate space: world units = pixels at the current element size.
`OrthographicCamera(-R, R, R, -R, 0.1, 100)` after the first `ResizeObserver` callback
measures a non-zero size.

**Blending stack** (draw order per `renderOrder`):
1. `backgroundMesh` — `NormalBlending` (opaque disc background)
2. `ringMesh[0..4]` + `ticksMesh` — `AdditiveBlending`, `depthWrite: false`
3. `sweepTrailMesh` — `AdditiveBlending`, `depthWrite: false`
4. `sweepArmLine` — `AdditiveBlending`, `depthWrite: false`
5. `contactRingsMesh` — `AdditiveBlending`, `depthWrite: false`
6. `contactDotsMesh` — `AdditiveBlending`, `depthWrite: false`

HTML overlay `div` is `position: absolute; inset: 0; pointer-events: none; z-index: 2`.

**Performance notes**:
- One `renderer.render()` call per frame; no EffectComposer.
- `instancedMesh.instanceMatrix.usage = THREE.DynamicDrawUsage`.
- Dirty-range tracking: `_dirtyMin` / `_dirtyMax` indices, only those ranges flushed.
- RAF paused when element not intersecting viewport (`IntersectionObserver`).
- Canvas: `will-change: transform` on the element promotes it to compositor layer.

**Resize handling** (`ResizeObserver` on `element`):
1. Recalculate `R = Math.floor(Math.min(w, h) / 2) - 8`. If R ≤ 0, return early.
2. Update camera frustum: `camera.left = -R` etc., `camera.updateProjectionMatrix()`.
3. Update renderer size: `renderer.setSize(w, h)`.
4. Dispose and rebuild `backgroundMesh`, `ringMesh[0..4]` / `ticksMesh`, `sweepTrailMesh`
   (these depend on R). `sweepArmLine` geometry is rebuilt each frame anyway.
5. Recompute contact Cartesian positions from stored polar (no data loss).
6. Reposition HTML labels and ring/cardinal annotations.

---

### 3. Contact System

#### Data structure (CPU-side only)

```js
{
  id:        'T-07',      // auto-generated or from injectContact
  angle:     1.24,        // radians, 0 = north, clockwise
  range:     0.62,        // normalised 0–1
  type:      'hostile',   // 'friendly' | 'neutral' | 'hostile' | 'ghost'
  age:       0.0,         // 0–1 normalised lifetime progress
  maxAge:    12000,        // ms, randomised [8000, 18000]
  bornAt:    performance.now(),
  phase:     Math.random(),
  lastSweep: -Infinity,
  ghostAngle: null,       // set when transitioning to GHOST state
  ghostRange: null,
  instIdx:   -1,          // assigned InstancedMesh slot [0..63]
}
```

No `a_pos` GPU attribute. Position is entirely managed via `instanceMatrix` on the CPU.

#### Contact pool

Fixed array of 64 slots (`Array(64).fill(null)`). Iterated each frame. `instIdx` identifies
the slot in both `contactDotsMesh` and `contactRingsMesh` (1:1 correspondence).

For ghost contacts: they use the same pool slots. When a regular contact enters `GHOST`
state, it creates a new ghost pool entry at `(ghostAngle, ghostRange)` using a free slot.
If no free slot, ghost is silently skipped (GHOST state is cosmetic).

#### Lifecycle

```
DETECT  (age 0.00–0.08)  → dot scales up from 0 to 8 world units, ring burst (phase=0)
SOLID   (age 0.08–0.65)  → normal brightness, sweep pass resets phase
FADING  (age 0.65–0.85)  → opacity lerps 1→0.15; ring freq halved; ghost entry spawned
GHOST   (age 0.85–1.00)  → dot at 0.15 opacity, no ring, label fades
GONE    (age > 1.00)     → pool slot freed, instance hidden (scale=0), label span removed
```

Ghost pool entries born with `age = 0.85`, `maxAge = 3000` ms — they expire quickly.

Age increment per frame: `c.age += dt / c.maxAge` (dt in ms).

Instance hidden by setting scale to zero via dummy: `dummy.scale.setScalar(0)` when
age > 1.0, so the slot is "invisible" even before the pool array frees it the next frame.

#### Spawn system

```js
function _scheduleNextSpawn(state) {
  const base   = lerp(3000, 600, state.threatLevel);
  const jitter = (Math.random() - 0.5) * base * 0.4;
  state.spawnTimer = setTimeout(() => {
    _spawnAutoContact(state);
    _scheduleNextSpawn(state);
  }, base + jitter);
}

function _spawnAutoContact(state) {
  const type  = _randomType(state.threatLevel);
  const existing = state.contacts.filter(Boolean);
  const cluster  = existing.length > 0 && Math.random() < 0.3;
  const base     = cluster ? existing[Math.floor(Math.random() * existing.length)] : null;
  const angle = base ? base.angle + (Math.random() - 0.5) * 0.4
                     : Math.random() * Math.PI * 2;
  const range = 0.15 + Math.random() * 0.82;
  _addContact(state, angle, range, type);
}
```

`_randomType(t)`: hostile probability `lerp(0.10, 0.85, t)`, friendly `lerp(0.30, 0.05, t)`,
remainder neutral.

---

### 4. Component API

```js
/**
 * @param {HTMLElement} element
 * @param {object}  [opts]
 * @param {number}  [opts.sweepPeriod=4000]     ms per revolution
 * @param {number}  [opts.contactDensity=0.5]   0–1 scales base spawn interval
 * @param {number}  [opts.threatLevel=0]        initial 0–1
 * @param {string}  [opts.primaryColor]         CSS color override (null = read --neon-cyan)
 * @param {number}  [opts.maxContacts=48]       pool ceiling [4, 64]
 * @returns {{ setRadarThreatLevel: Function, injectContact: Function }}
 */
export function initRadar(element, opts = {}) { … }

/** Tear down renderer, RAF, timers, observers. Removes canvas+overlay from DOM. */
export function destroyRadar(element) { … }

/** Re-read CSS vars → update material uniforms. Call after applyTheme(). */
export function refreshRadarTheme(element) { … }

// ── Returned control surface (no element arg — close over internal state) ───

/** @param {number} level - 0 (calm) to 1 (critical) */
function setRadarThreatLevel(level) { … }
// Named setRadarThreatLevel (not setThreatLevel) to avoid collision with the
// same-named import from threat-map.js at the call site.

/**
 * @param {number} angle  radians, 0 = north, clockwise
 * @param {number} range  0–1 normalised
 * @param {'friendly'|'neutral'|'hostile'} type
 * @returns {string} contact ID
 */
function injectContact(angle, range, type) { … }
```

Note: `setRadarThreatLevel` is intentionally distinct from `threat-map.js`'s
`setThreatLevel(element, 0–100)`. Integration site normalises: `setRadarThreatLevel(n/100)`.

---

### 5. Design Decisions

**Separate renderer per panel, not shared.**
Rationale: radar is in the right sidebar, not in `.s9-ov__center`. Sharing a renderer across
DOM regions is fragile and couples independent components. Isolated renderers are the
project pattern (threat-map.js has its own).

**No `UnrealBloomPass` by default; `AdditiveBlending` for glow.**
Rationale: radar canvas is small (~420 × ~300 px after header/footer). Additive blending
on a dark background is visually equivalent at this scale with zero pass overhead. A future
`addBloom()` extension is trivial to wire in.

**HTML overlay for labels, not WebGL text.**
Rationale: crisp at any DPR, inherits CSS theme variables automatically. Matches existing
threat-map.js pattern for overlay annotations.

**`InstancedMesh` for contacts (not `THREE.Points`).**
Rationale: Points cannot render per-contact expanding rings without separate draw calls.
InstancedMesh with custom per-instance attributes allows ring animation in a single draw
call per layer. Max 64 contacts keeps instanced buffers trivially small.

**Ghost contacts as extra pool entries, not a separate buffer.**
Rationale: avoids additional GPU attribute complexity (a_ghostPos, a_ghostAlpha).
Ghost entries reuse the exact same shader path with `a_type = 3.0` gating the behaviour.
Pool ceiling is 64; at most 20–25 active real contacts in practice, so capacity is not a
concern.

**Sweep arm as a shader quad, not a line fan.**
Rationale: exponential angular falloff is naturally expressed in a fragment shader. A line
fan needs geometry rebuilt every frame. CSS conic-gradient cannot blend additively with the
WebGL canvas.

**`--sidebar-right`: 346 px → 420 px.**
Rationale: square radar disc at 346 px leaves only a 330 px diameter after padding —
functional but cramped. 420 px gives a 400 px disc. The 74 px increase steals from the
centre column, which at minimum supported width (1280 px) leaves
`1280 - 372 - 420 - (3 × 5) = 473 px` — above the globe's visual minimum (~380 px).

---

### 6. Configuration

| Key | Type | Default | Validation |
|---|---|---|---|
| `sweepPeriod` | number (ms) | 4000 | clamp [600, 20000] |
| `contactDensity` | number | 0.5 | clamp [0, 1] |
| `threatLevel` | number | 0 | clamp [0, 1] |
| `primaryColor` | string\|null | null | valid CSS color or null |
| `maxContacts` | number | 48 | clamp [4, 64] |

---

### 7. Files Changed

**New source files:**

| File | Description |
|---|---|
| `components/pulse-radar.js` | Component: Three.js renderer, scene, RAF, contact system, API exports |
| `structure/components/pulse-radar.css` | Layout only: `.s9-radar`, `.s9-radar__canvas`, `.s9-radar__overlay`, `.s9-radar__labels`, `.s9-radar__label` |
| `aesthetic/components/pulse-radar.css` | Aesthetic only: colors, glows, font rules for overlay labels |
| `components/pulse-radar.css` | Combined barrel: `@import` both planes, matching `components/threat-map.css` pattern |
| `specs/pulse-radar.md` | This spec |

**Modified files:**

| File | Change |
|---|---|
| `aesthetic/variables/base.css` | `--sidebar-right: 346px → 420px` |
| `aesthetic/index.css` | Append `@import './components/pulse-radar.css'` (imports aesthetic plane) |
| `assets/index-D_mHDXxc.css` | Rebuilt CSS bundle (run `npx vite build`); or manually append both structure + aesthetic planes |
| `index.html` (HTML) | Insert radar `.s9-panel` as `nth-child(2)` in `.s9-ov__right`; remove `style="flex:..."` inline overrides from seq-log and sys-metrics |
| `index.html` (inline `<style>`) | Update the **second** right-column nth-child block (`/* ── Right column flex */`, ~line 344) from 3 children to 4; remove the two stale `.s9-ov__right` rules from the **first** block (`/* Left / right flex grow helpers */`) to eliminate the conflicting `nth-child(2): flex: 2` rule |
| `index.html` (module script) | Import `initRadar`, `destroyRadar`, `refreshRadarTheme` from `/components/pulse-radar.js`; store `radarEl`; call `initRadar`; add `refreshRadarTheme(radarEl)` to `applyTheme()`; wire `setRadarThreatLevel` |

**CSS bundle note**: `assets/index-D_mHDXxc.css` is the pre-built committed CSS served by
the project. Source file changes to `aesthetic/` and `structure/` do **not** auto-update
it. After adding CSS source files, run `npx vite build` (no `package.json` required — Vite
CLI picks up `vite.config.js`) and commit the updated `assets/index-*.css`. Alternatively,
append both planes inline in the `<style>` block of `index.html` for immediate effect.

---

### 8. Implementation Plan

**Phase 1 — Layout foundation**

1. Change `--sidebar-right` to `420px` in `aesthetic/variables/base.css`. Verify right
   column widens in the browser; existing panels reflow correctly. No JS yet.

2. Write `structure/components/pulse-radar.css`:
   - `.s9-radar { position: relative; width: 100%; height: 100%; overflow: hidden; }`
   - `.s9-radar__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; will-change: transform; }`
   - `.s9-radar__overlay { position: absolute; inset: 0; pointer-events: none; z-index: 2; }`
   - `.s9-radar__labels { position: absolute; inset: 0; }`
   - `.s9-radar__label { position: absolute; white-space: nowrap; }`

3. Write `aesthetic/components/pulse-radar.css`:
   - `.s9-radar__label { font-family: var(--font-terminal); font-size: 0.48rem; color: var(--text-dim); }`
   - Hostile label: `color: var(--neon-magenta)`
   - Friendly label: `color: var(--neon-green)`
   - Ring / cardinal annotation spans: `font-family: var(--font-terminal); font-size: 0.55rem; color: var(--text-secondary)`

4. Write `components/pulse-radar.css` barrel:
   ```css
   @import '../structure/components/pulse-radar.css';
   @import '../aesthetic/components/pulse-radar.css';
   ```

5. Add `@import './components/pulse-radar.css'` to `aesthetic/index.css`.

6. Rebuild CSS bundle: `npx vite build`. Verify `assets/index-*.css` updated (hash
   changes). Update `<link>` in `index.html` if hash changed.

7. Insert radar panel HTML into `index.html` right column as `nth-child(2)`, pushing
   seq-log to `nth-child(3)` and sys-metrics to `nth-child(4)`. Remove inline `style="flex:..."`
   overrides from seq-log and sys-metrics (CSS rules will govern them):
   ```html
   <div class="s9-panel" data-s9-id="pulse-radar-1">
     <div class="s9-panel__header">
       <span class="s9-panel__header-label">PROXIMITY SCAN</span>
       <span class="s9-panel__header-jp">近接スキャン</span>
       <span class="s9-panel__header-status" id="radar-status">● ACTIVE</span>
     </div>
     <div class="s9-panel__body" style="padding:0;position:relative;">
       <div class="s9-radar" id="proximity-radar"></div>
     </div>
     <div class="s9-panel__footer">
       <span id="radar-contacts"
             style="font-family:var(--font-terminal);font-size:0.55rem;color:var(--text-dim);">
         CONTACTS: 0 | SWEEP: 4.0s
       </span>
     </div>
   </div>
   ```

8. Update the **second** right-column nth-child CSS block in `index.html` (search for
   `/* ── Right column flex */`):
   ```css
   .s9-ov__right .s9-panel:nth-child(1) { flex: 1;    min-height: 0; }  /* intel feed */
   .s9-ov__right .s9-panel:nth-child(2) { flex: 3;    min-height: 0; }  /* radar */
   .s9-ov__right .s9-panel:nth-child(3) { flex: none; }                  /* seq log */
   .s9-ov__right .s9-panel:nth-child(4) { flex: none; }                  /* sys metrics */
   ```
   Also remove the two stale right-column rules from the **first** block (near
   `/* Left / right flex grow helpers */`) — the lines `.s9-ov__right .s9-panel:nth-child(1)`
   and `.s9-ov__right .s9-panel:nth-child(2)` — since that block's `nth-child(2): flex: 2`
   conflicts with the new `flex: 3` and the second block is the authoritative location for
   right-column rules. Left-column rules in the first block are untouched.

**Phase 2 — Renderer skeleton**

9. Scaffold `components/pulse-radar.js`:
   - WeakMap `_state`
   - `initRadar(element, opts)`: create canvas + overlay divs, append to element,
     create `THREE.WebGLRenderer`, `THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)`
     (safe default until ResizeObserver fires), `THREE.Scene`.
   - Empty RAF loop calling `renderer.render(scene, camera)`.
   - `destroyRadar(element)`: `cancelAnimationFrame`, `renderer.dispose()`, remove DOM
     elements, `clearTimeout(state.spawnTimer)`, `_state.delete(element)`.
   - Test: call `initRadar(el)` in console → canvas appears. `destroyRadar(el)` → canvas
     removed, no console errors.

10. Implement `ResizeObserver`:
    - On callback: if `w === 0 || h === 0` return early.
    - Compute `R = Math.floor(Math.min(w, h) / 2) - 8`. Store in `state.R`.
    - Update camera: `camera.left = -R; camera.right = R; camera.top = R;
      camera.bottom = -R; camera.updateProjectionMatrix()`.
    - Update renderer: `renderer.setSize(w, h)`.
    - Call `_rebuildGeometry(state)` (stub for now).
    - Test: resize window → no errors, camera updates.

**Phase 3 — Static scene elements**

11. Implement `RadarBgShader` and add `backgroundMesh` to scene. Test: dark disc visible,
    background breathes gently.

12. Implement `_buildRingsAndTicks(state)` inside `_rebuildGeometry`:
    - Create five separate `THREE.LineLoop` objects at radii `R × [0.2, 0.4, 0.6, 0.8, 1.0]`,
      each with a 64-segment circle `BufferGeometry`. Assign `ringMaterialInner` to
      `ringMesh[0..3]` and `ringMaterialOuter` to `ringMesh[4]`. No merge required.
    - Build tick `BufferGeometry` directly: 64 positions as 32 start/end pairs (no
      `BufferGeometryUtils` needed). Pass to `THREE.LineSegments` with `ringMaterialTicks`.
    - Test: five cyan rings and tick marks visible.

13. Implement HTML ring labels and cardinal labels. Positioned by
    `_repositionStaticLabels(state)` called from ResizeObserver and once at init after
    first ResizeObserver fires. Test: "N", "E", "S", "W" labels visible at disc edge;
    range labels at 3 o'clock per ring.

**Phase 4 — Sweep arm**

14. Implement `SweepShader` and add `sweepTrailMesh` + `sweepArmLine` to scene. RAF
    increments `state.sweepAngle += state.sweepSpeed * dt` and updates `uAngle` uniform
    and arm line `BufferGeometry.attributes.position`. Test: rotating sweep arm visible.

15. Implement `uStaticAmt` flicker: random ~8 s interval sets `uStaticAmt` to noise value
    for 80 ms then resets to 1.0. Test: occasional brief static shimmer on the sweep trail.

**Phase 5 — Contact system**

16. Implement contact `InstancedMesh` pool:
    - `ContactDotShader` with `a_phase`, `a_type`, `a_age` per-instance attributes
      declared as `THREE.InstancedBufferAttribute`.
    - `ContactRingShader` (same attributes on the ring mesh).
    - Both initialized with all instances at `scale(0)` (invisible).
    - After any write to `instanceMatrix` set `mesh.instanceMatrix.needsUpdate = true`;
      after any write to a custom attribute set `attribute.needsUpdate = true`.
    - Test: `injectContact(0, 0.5, 'hostile')` → a magenta blip at north mid-range.

17. Implement `_updateContacts(state, dt)`:
    - Age increment, lifecycle state machine, sweep-pass detection (angular delta < 0.12 rad).
    - FADING→GHOST transition: spawn ghost pool entry.
    - GONE: `dummy.scale.setScalar(0); mesh.setMatrixAt(idx, dummy.matrix)`.
    - Test: contacts age out, labels disappear, pool slots free up.

18. Implement `_scheduleNextSpawn` + `_spawnAutoContact`. Test: contacts spawn automatically
    at ~3 s intervals at threat 0; clustering occasionally visible.

19. Implement HTML contact label system (`_updateLabels`). Test: labels track contacts
    through resize; ghost contacts have no labels.

**Phase 6 — Control API**

20. Implement `setRadarThreatLevel(level)`: clamp [0,1], store `state.threatLevel`, update
    `state.sweepSpeed`, reschedule spawn timer. Test: `setRadarThreatLevel(0.9)` →
    sweep visibly faster; contacts spawn rapidly; magenta-dominant.

21. Implement `refreshRadarTheme(element)`: re-read `--neon-cyan`, `--neon-magenta`,
    `--neon-green`, `--neon-amber`, `--void` from `getComputedStyle(document.documentElement)`,
    update material uniforms on all six meshes. Test: switch theme → radar colors update.

22. Implement `IntersectionObserver`: pause RAF when 0% visible, resume on re-intersection.
    Test: scroll panel out of view (if column is scrollable) → RAF stops.

23. Implement `prefers-reduced-motion`: if true at init, freeze `state.sweepAngle` at
    `Math.PI * 0.15` (visually interesting position), disable spawn timer, leave static
    rings visible. Use `matchMedia.addEventListener` with `{ signal }` from
    `AbortController` for cleanup.

**Phase 7 — Integration**

24. Add to `index.html` module script:
    ```js
    import { initRadar, destroyRadar, refreshRadarTheme }
      from '/components/pulse-radar.js';
    ```
    (`setRadarThreatLevel` and `injectContact` come from the return value of `initRadar`,
    not as named imports.)

25. At init (after DOM ready):
    ```js
    const radarEl = document.getElementById('proximity-radar');
    const radar   = initRadar(radarEl, { threatLevel: 0 });
    // radar.setRadarThreatLevel and radar.injectContact are now available
    ```

26. Store `radarEl` in a variable accessible to `applyTheme`. In `applyTheme(name)`,
    add after existing `refreshThemeColors` calls:
    ```js
    refreshRadarTheme(radarEl);   // standalone export, element-first convention
    ```

27. Wire `setRadarThreatLevel` wherever `setThreatLevel(threatEl, value)` is called. Since
    threat-map uses 0–100 and radar uses 0–1:
    ```js
    // Wherever setThreatLevel(threatEl, n) appears, add:
    radar.setRadarThreatLevel(n / 100);
    ```
    Main call sites: line ~989 (broadcast handler), line ~1547, line ~1578.

28. Update footer readout each frame (optional, cosmetic):
    ```js
    // In RAF or on contact change:
    document.getElementById('radar-contacts').textContent =
      `CONTACTS: ${state.contacts.filter(Boolean).length} | SWEEP: ${(TAU / state.sweepSpeed).toFixed(1)}s`;
    ```

**Phase 8 — Polish**

29. Boot animation: `element.closest('.s9-panel').classList.add('s9-panel--booting')` in
    `initRadar`, removed on `animationend` (fires the `crt-flicker` keyframe from
    `aesthetic/effects/index.css`).

30. Integration test: verify right column layout at 1280 px breakpoint (right column
    disappears — confirm no JS errors from radar RAF, confirm `destroyRadar` is NOT called
    on resize — it is the resize breakpoint, not a panel removal).

31. Theme switch test across all five themes: `applyTheme('gits')`, `applyTheme('amber')`,
    etc. — verify radar colors update without flash.

---

### 9. Error Handling

| Scenario | Handling |
|---|---|
| `initRadar` called on already-initialised element | `console.warn('[pulse-radar] already initialised')`, return existing control surface |
| `initRadar` element not in DOM (`clientWidth === 0` permanently) | ResizeObserver will fire once it enters layout; no error at init |
| WebGL context creation fails | `console.error`, remove canvas from DOM, return no-op stub `{ setRadarThreatLevel:()=>{}, injectContact:()=>'' }` |
| `ResizeObserver` callback with `w === 0 || h === 0` | Return early; no geometry rebuild, no division by zero |
| `injectContact` with pool at 64 contacts | Find oldest GHOST pool entry, evict (`_removeContact`), insert new. If all 64 are SOLID, `console.warn` and drop |
| `injectContact` with invalid `type` string | Default to `'neutral'`, no error thrown |
| `injectContact` with out-of-range `range` | Clamped to [0, 1] |
| `destroyRadar` called twice | Second call: WeakMap returns undefined, logs warn, returns |
| `destroyRadar` while spawn timer pending | `clearTimeout(state.spawnTimer)` in destroy; no orphaned callbacks |
| RAF tick after `destroyRadar` | `state.destroyed = true` set before `cancelAnimationFrame`; RAF guard: `if (state.destroyed) return` at top of tick |

---

### 10. Backward Compatibility

- `--sidebar-right` change (346 → 420 px) narrows centre column by 74 px. Minimum centre
  width at 1280 px: `1280 - 372 - 420 - 15 = 473 px` (above globe's ~380 px minimum). ✓
- Right column panels with inline `style="flex:..."` overrides are removed in step 7;
  the CSS nth-child rules govern them from that point.
- Below 1280 px breakpoint, the right column is hidden entirely (`display: none` per
  `structure/layouts/s9-ov.css`). The radar RAF is paused by `IntersectionObserver` when
  the column is hidden.
- All existing component JS APIs untouched.
- No new `package.json` dependencies (Three.js already present).

---

### 11. Test Plan

| Step | Test | What to verify |
|---|---|---|
| Step 1 | Visual | Right column widens; no overflow or broken layout |
| Step 6 | Visual | Browser loads updated CSS; no FOUC |
| Step 9 | Console | `initRadar(el)` → canvas + overlay in DOM; `destroyRadar(el)` → removed |
| Step 11 | Visual | Dark disc visible; background breathes over ~5 s observation |
| Step 12 | Visual | Five cyan rings + tick marks at correct radii |
| Step 14 | Visual + stopwatch | Sweep arm completes rotation in ~4 s |
| Step 16 | Console | `injectContact(0, 0.5, 'hostile')` → magenta blip at north mid-range |
| Step 17 | DevTools DOM | After contact ages out: no leftover `<span>` in `.s9-radar__labels` |
| Step 17 | Visual | Fading → ghost state visible as dimmed echo |
| Step 18 | Visual | Contacts spawn ~3 s apart; occasional clustering |
| Step 19 | Visual + resize | Labels track contacts through window resize |
| Step 20 | Visual | `setRadarThreatLevel(0.9)` → sweep ~1.2 s period; rapid magenta spawns |
| Step 21 | Visual | Theme switch → radar colors update in same frame |
| Step 23 | DevTools | Emulate reduced-motion → sweep frozen; no new spawns |
| Step 27 | Visual | Threat slider → globe AND radar update together |
| Step 30 | Console | Resize to 1280 px → no errors; resize back → radar resumes |
| Step 31 | Visual | All 5 themes: sweep, rings, contacts update correctly |

**Integration scenarios**:

- Full column layout: intel (flex:1), radar (flex:3), seq-log (flex:none), sys-metrics
  (flex:none). At 900 px viewport height with ~85 px topbar+statusbar+gaps: ~815 px
  available. Fixed panels ~280 px combined. Flex container ~535 px. Radar = 401 px,
  intel = 134 px. Both above min-height. ✓
- `destroyRadar` called while spawn timer pending: `clearTimeout` in destroy; verify
  no contact appears after destruction.
- `injectContact` at pool ceiling (64 contacts): oldest ghost evicted; count stays ≤ 64.
- Element `clientWidth === 0` at `initRadar` call: no crash; ResizeObserver fires when
  element enters layout and geometry builds normally.

---

### 12. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Two Three.js renderers cause GPU memory pressure on low-end hardware | Medium | Medium | Canvas DPR capped at 2; no bloom pass; IntersectionObserver pauses RAF when hidden |
| `--sidebar-right: 420px` breaks centre column at ≤1280 px | Low | Low | Verified 473 px minimum centre width; breakpoint hides right column entirely below 1280 px |
| Contact label spans accumulate in DOM | Medium | Low | `destroyRadar` force-clears `.s9-radar__labels` innerHTML; `_removeContact` has `console.assert(span)` guard |
| Shader GLSL compile errors produce a black canvas silently | Low | High | `renderer.debug.checkShaderErrors = true` in dev; each shader isolated at steps 11/14/16 |
| CSS bundle hash change breaks the `<link>` in `index.html` | Medium | High | Step 6 explicitly checks and updates `<link href>` if hash changes after rebuild |
| `setRadarThreatLevel` / `setThreatLevel` name collision | ✓ **Resolved** | — | Exported as `setRadarThreatLevel`; integration site divides by 100 |
| Ghost contact GPU representation gap | ✓ **Resolved** | — | Ghost contacts are extra pool entries with `a_type = 3.0` |
| Two nth-child blocks causing confusion | ✓ **Resolved** | — | Implementation step 8 explicitly targets the second block |
| `OrthographicCamera(-0,0,0,-0)` at R=0 | ✓ **Resolved** | — | Camera defaults to `(-1,1,1,-1)`; ResizeObserver sets real frustum |
