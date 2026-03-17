# Spec: RingRevealAnimator — Modular Sphere Ring-Sweep Animation for Three.js (WebGL)

## Overview

A standalone ES module (no dependencies beyond Three.js) that renders a configurable array of latitude rings over a sphere and animates them in a sweeping reveal pattern. Inspired by the venus.js BVH-projection technique but re-architected for standard WebGL (`ShaderMaterial`, `BufferGeometry`, `LineSegments`) — no WebGPU, no TSL, no `makio-meshline`.

Designed to be dropped into any Three.js scene as a single import. Works with the existing `EffectComposer` bloom pipeline.

---

## Use Cases

1. **Threat-map globe load-in animation** — rings sweep from south pole to north pole on page load, resolving into the static globe.
2. **Threat-level transition** — morph ring density/colour from calm (sparse, dim) to alert (dense, bright) as incoming arc rate increases.
3. **Any Three.js project** — generic "object materialises from rings" reveal for meshes, planets, abstract shapes.

---

## Public API

```typescript
import { RingRevealAnimator } from './RingRevealAnimator.js';

const anim = new RingRevealAnimator(scene, options);

// Lifecycle
anim.play(onComplete?: () => void): void;
  // Starts forward sweep from current progress. Sets _playing = true,
  // _reversed = false. onComplete fires once when progress reaches 1.0.

anim.reverse(onComplete?: () => void): void;
  // Sweeps back toward progress 0. Continues from current progress value;
  // elapsed is set to (1 - currentRawT) * durationMs so the reverse begins
  // at the same visual position rather than snapping to 1.0.
  // onComplete fires once when progress reaches 0.0.

anim.stop(): void;
  // Pauses playback at current progress. _playing = false. Progress is preserved.
  // Does not reset elapsed. A subsequent play() or reverse() resumes from here.

anim.reset(): void;
  // Stops playback. Sets progress = 0, elapsed = 0, _reversed = false,
  // cancels any active morph (_morph = null). Rings become fully hidden.

// Morphing between ring configs
anim.morphTo(targetConfig: Partial<RingRevealOptions>, durationMs?: number): void;
  // Smoothly interpolates from the current config to targetConfig.
  // durationMs defaults to options.morphDurationMs.
  // Morph progress is tracked independently from reveal progress and is always
  // ticked by tick() regardless of _playing state — so morphTo() works even
  // after play() has completed.

// Per-frame (call in your RAF loop)
anim.tick(deltaMs: number): void;
  // Advances both reveal animation (if _playing) and any active morph.

// Theme / dynamic updates (immediate, no morph interpolation)
anim.setColors(lineColor: number, glowColor: number): void;
  // Sets uColor uniform on the base rings material to lineColor,
  // and uColor uniform on the glow rings material to glowColor.
  // (Each material is a separate ShaderMaterial instance sharing the same
  //  uColor uniform name but with independent values.)

anim.setOpacity(base: number, glow?: number): void;
  // Sets uOpacity on the base rings material to base.
  // If glow is provided, sets uOpacity on the glow rings material to glow.
  // If glow is omitted, the glow material's uOpacity is left unchanged.

// Cleanup
anim.dispose(): void;
  // Removes both LineSegments from scene, disposes geometry and both materials.

// Read state (readonly)
anim.isPlaying: boolean;
anim.progress: number;     // 0–1 current reveal progress
```

---

## Configuration Interface

```typescript
interface RingRevealOptions {
  // Geometry
  radius: number;              // Default: 1.0 — sphere radius
  numRings: number;            // Default: 48 — total latitude rings
  samplesPerRing: number;      // Default: 256 — vertices per ring circle
  latitudeMin: number;         // Default: -Math.PI/2 — south pole (radians)
  latitudeMax: number;         // Default:  Math.PI/2 — north pole (radians)

  // Animation
  durationMs: number;          // Default: 1800 — total sweep duration (ms)
  easingFn: EasingFn;          // Default: easeInOutCubic — applied to global timeline t
  direction: 'south-to-north' | 'north-to-south' | 'equator-out'; // Default: 'south-to-north'
  stagger: number;             // Default: 0.4 — ring onset overlap (0=fully sequential, 1=all start at t=0)
  ringDuration: number;        // Default: 0.35 — fraction of total sweep each ring's fade occupies (must be > 0)

  // Appearance
  lineColor: number;           // Default: 0x00ffcc — base ring colour (hex)
  lineWidth: number;           // Default: 1.0 — material.linewidth; capped to 1 by the GPU on most platforms
                               //   (see Line Width Limitation section for how perceived thickness is achieved)
  opacity: number;             // Default: 0.7 — base ring opacity
  glowColor: number;           // Default: 0x00ffcc — glow ring colour (additive layer)
  glowOpacity: number;         // Default: 0.25
  glowRadius: number;          // Default: 1.008 — glow ring radius multiplier (avoids Z-fighting with base rings)
  emissiveIntensity: number;   // Default: 1.5 — multiplies uColor in fragment shader; values > 1 push
                               //   brightness above the bloom threshold of UnrealBloomPass, causing bloom
                               //   without any Three.js MeshStandardMaterial involvement

  // Morph
  morphDurationMs: number;     // Default: 800 — fallback duration used by morphTo() when no durationMs is passed

  // Coordinate frame
  upAxis: 'y' | 'z';          // Default: 'y' — maps the latitudeMin/Max poles to the Y or Z world axis.
                               //   'y': standard Three.js convention (Y-up sphere).
                               //   'z': Z-up convention (rotates ring geometry by -π/2 around X after build).
                               //   Arbitrary THREE.Vector3 up is out of scope; use Object3D.rotation if needed.
}

type EasingFn = (t: number) => number;
```

**Note on `easingFn`:** The easing function is applied to the **global timeline** (`rawT` 0→1). Per-ring fade-in always uses `smoothstep` inside the vertex shader. This differs from venus.js which applied `backInOut` per ring's individual `localT`. To reproduce the venus.js snap-into-place feel, use `backInOut` as the global `easingFn`; it is not identical but produces a similar perceptual effect.

---

## Architecture

### Module Files

```
RingRevealAnimator/
  index.js               ← public entry, re-exports RingRevealAnimator
  RingRevealAnimator.js  ← main class
  RingGeometry.js        ← static geometry builder
  RingMaterial.js        ← ShaderMaterial factory
  easings.js             ← built-in easing functions
  types.d.ts             ← TypeScript type declarations (JSDoc-compatible)
```

No build step required — pure ES modules, importable directly.

---

## Geometry

### Ring Construction (`RingGeometry.js`)

Each ring is a great circle at a given latitude `φ`:

```
x = r·cos(φ)·cos(λ)
y = r·sin(φ)
z = r·cos(φ)·sin(λ)
```

where `λ` steps `0 → 2π` in `samplesPerRing` steps, and `φ` is linearly distributed across `[latitudeMin, latitudeMax]` for `numRings` rings.

When `upAxis = 'z'`, both the base and glow `BufferGeometry` objects are rotated `-Math.PI / 2` around the X axis after construction (i.e., `geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))`).

All rings are packed into a **single** `BufferGeometry` as one `LineSegments` draw call:

- **position** buffer: `numRings × samplesPerRing × 3` floats
- **index** buffer: `numRings × samplesPerRing × 2` indices (element pairs for `LineSegments`) — each ring forms a closed loop of `samplesPerRing` segments. Segment `i` of ring `r` connects vertex `(r × samplesPerRing + i)` to `(r × samplesPerRing + (i+1) % samplesPerRing)`. Use `Uint32Array` (requires WebGL2, which Three.js r136+ targets by default); `Uint16Array` is only safe when `numRings × samplesPerRing ≤ 65535`.
- **ringIndex** attribute (float): per-vertex ring index `0..numRings-1`, used in the vertex shader for stagger timing

This means **one draw call** for all rings, regardless of `numRings`.

The glow layer is a second `BufferGeometry` at `radius × glowRadius`, same topology, same `ringIndex` attribute. Two draw calls total per animator instance.

---

## Shader Design (`RingMaterial.js`)

### Uniforms

```glsl
uniform float uProgress;          // 0.0 → 1.0, driven by tick()
uniform float uNumRings;          // float cast of numRings
uniform float uStagger;           // 0.0 → 1.0
uniform float uRingDuration;      // fraction of total sweep each ring takes (> 0)
uniform float uOpacity;
uniform float uEmissiveIntensity; // colour multiplier; push > 1 to exceed bloom threshold
uniform vec3  uColor;
uniform int   uDirection;         // 0=south-to-north, 1=north-to-south, 2=equator-out
```

**WebGL version note:** `uniform int` and integer comparison (`if (uDirection == 0)`) are valid in GLSL ES 3.0 (WebGL2), which Three.js r136+ targets by default. The `ShaderMaterial` should include `glslVersion: THREE.GLSL3` to be explicit. If WebGL1 support is required, replace `uniform int uDirection` with `uniform float uDirection` and compare with `uDirection < 0.5`, `uDirection < 1.5`, etc.

### Vertex Shader

```glsl
attribute float ringIndex;

varying float vAlpha;

void main() {
  float normRing;  // 0.0 at first ring to reveal, 1.0 at last

  if (uDirection == 0) {
    normRing = ringIndex / (uNumRings - 1.0);             // south→north
  } else if (uDirection == 1) {
    normRing = 1.0 - ringIndex / (uNumRings - 1.0);       // north→south
  } else {
    // equator-out: equator (mid-index) gets normRing=0 → reveals first;
    // poles get normRing=1 → reveals last.
    normRing = abs(ringIndex / (uNumRings - 1.0) - 0.5) * 2.0;
  }

  // Each ring has its own onset window within [0, 1].
  // stagger=1 → all onsets=0 (all rings start simultaneously).
  // stagger=0 → fully sequential (no overlap between ring fades).
  float onset  = normRing * (1.0 - uRingDuration) * (1.0 - uStagger);
  float localT = clamp((uProgress - onset) / uRingDuration, 0.0, 1.0);

  vAlpha = smoothstep(0.0, 1.0, localT);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shader

```glsl
varying float vAlpha;
uniform vec3  uColor;
uniform float uOpacity;
uniform float uEmissiveIntensity;

void main() {
  if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(uColor * uEmissiveIntensity, vAlpha * uOpacity);
}
```

### Material Settings

| Property | Base rings | Glow rings |
|---|---|---|
| `transparent` | `true` | `true` |
| `depthWrite` | `false` | `false` |
| `blending` | `THREE.NormalBlending` | `THREE.AdditiveBlending` |
| `side` | `THREE.FrontSide` | `THREE.FrontSide` |
| `linewidth` | `options.lineWidth` | `options.lineWidth` |

---

## Line Width Limitation & Workaround

WebGL `lineWidth > 1` is silently clamped to 1 on most desktop GPUs (Chrome/Firefox on Metal, ANGLE, Mesa). To achieve visible thick glowing rings without `lineWidth`:

1. **Base layer**: `LineSegments` at `lineWidth: 1` (standard, always works)
2. **Glow layer**: second `LineSegments` at `radius × glowRadius` with `AdditiveBlending` — cheap soft halo without shader tricks
3. **Bloom synergy**: `emissiveIntensity > 1` in the fragment shader pushes the per-pixel brightness above the `UnrealBloomPass` threshold, causing the bloom pass to spread light around the lines, giving perceived thickness

If the project needs thick lines without bloom, `Line2 / LineMaterial` from `three/addons` is an optional upgrade path (swap `LineSegments` + `BufferGeometry` for `Line2` + `LineGeometry`).

---

## Animation Driver

### `tick(deltaMs)`

```javascript
tick(deltaMs) {
  // 1. Advance reveal animation
  if (this._playing) {
    this._elapsed += deltaMs;
    const rawT = Math.min(this._elapsed / this._options.durationMs, 1.0);
    const easedT = this._options.easingFn(rawT);
    this._progress = this._reversed ? 1.0 - easedT : easedT;
    this._baseRings.material.uniforms.uProgress.value = this._progress;
    this._glowRings.material.uniforms.uProgress.value = this._progress;
    const done = this._reversed ? this._progress <= 0.0 : this._progress >= 1.0;
    if (done) {
      this._playing = false;
      this._onComplete?.();
    }
  }

  // 2. Advance morph (tracked independently; runs regardless of _playing state)
  if (this._morph) {
    this._morph.elapsed += deltaMs;
    const mt = Math.min(this._morph.elapsed / this._morph.durationMs, 1.0);
    this._applyMorphT(mt);
    if (mt >= 1.0) this._morph = null;
  }
}
```

No internal RAF — caller owns the animation loop. This keeps the module passive and composable with any existing render loop.

### `_morph` Object Shape

```javascript
// Internal structure created by morphTo():
this._morph = {
  elapsed:    0,          // ms elapsed since morph started
  durationMs: number,     // total morph duration
  from: {                 // snapshot of current uniform-morphable values at morph start
    lineColor:         THREE.Color,
    glowColor:         THREE.Color,
    opacity:           number,
    glowOpacity:       number,
    emissiveIntensity: number,
    stagger:           number,
    radius:            number,
  },
  to: {                   // target values from targetConfig (same shape as from)
    ...
  },
  deferredGeom: boolean,  // true if numRings or samplesPerRing changed (rebuild on complete)
  toNumRings:   number | null,
  toSamples:    number | null,
};
```

### `_applyMorphT(t)`

Linearly interpolates all uniform-morphable properties between `_morph.from` and `_morph.to` at normalised time `t` (0→1):

```javascript
_applyMorphT(t) {
  const { from, to } = this._morph;
  // Colour lerp
  _tmpColor.lerpColors(from.lineColor, to.lineColor, t);
  this._baseRings.material.uniforms.uColor.value.copy(_tmpColor);
  _tmpColor.lerpColors(from.glowColor, to.glowColor, t);
  this._glowRings.material.uniforms.uColor.value.copy(_tmpColor);
  // Scalar lerp
  const lerp = (a, b) => a + (b - a) * t;
  this._baseRings.material.uniforms.uOpacity.value          = lerp(from.opacity, to.opacity);
  this._glowRings.material.uniforms.uOpacity.value          = lerp(from.glowOpacity, to.glowOpacity);
  this._baseRings.material.uniforms.uEmissiveIntensity.value = lerp(from.emissiveIntensity, to.emissiveIntensity);
  this._baseRings.material.uniforms.uStagger.value          = lerp(from.stagger, to.stagger);
  this._glowRings.material.uniforms.uStagger.value          = lerp(from.stagger, to.stagger);
  // Radius via scale (applied to both layers)
  const scale = lerp(from.radius, to.radius) / this._options.radius;
  this._baseRings.scale.setScalar(scale);
  this._glowRings.scale.setScalar(scale);
  // Deferred geometry rebuild on completion
  if (t >= 1.0 && this._morph.deferredGeom) {
    if (this._morph.toNumRings  !== null) this._options.numRings      = this._morph.toNumRings;
    if (this._morph.toSamples   !== null) this._options.samplesPerRing = this._morph.toSamples;
    this._rebuildGeometry();  // disposes old geometry, builds new, reattaches to both meshes
    // After rebuild, reset scale to 1 (new geometry is built at the morph target radius)
    this._options.radius = to.radius;
    this._baseRings.scale.setScalar(1);
    this._glowRings.scale.setScalar(1);
  }
}
```

### `reverse()` Continuity

When `reverse()` is called, `_elapsed` is set to `(1.0 - currentRawT) * durationMs` so the reverse sweep begins from the current visual position rather than snapping to fully visible (1.0) and sweeping back from there.

```javascript
reverse(onComplete) {
  this._reversed = true;
  const currentRawT = this._elapsed / this._options.durationMs;
  this._elapsed = (1.0 - Math.min(currentRawT, 1.0)) * this._options.durationMs;
  this._playing = true;
  this._onComplete = onComplete;
}
```

### Built-in Easings (`easings.js`)

```javascript
export const linear         = t => t;

export const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutExpo    = t =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const backInOut = t => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2;
};
```

`backInOut` produces an overshoot-then-settle curve that gives a "snap into place" feel comparable to the venus.js per-ring experience, applied here to the global timeline.

---

## Morph System

`morphTo(targetConfig, durationMs?)` interpolates from the current live config to `targetConfig`. The `durationMs` argument defaults to `options.morphDurationMs` (default: 800 ms). Morph state is stored in `this._morph` and is advanced by `tick()` independently of `_playing`, so fade-out morphs work correctly after `play()` has completed.

When `morphTo()` is called, `_morph.from` is snapshotted from current live uniform/options values, and `_morph.to` is built by copying those same current values then overriding only the properties present in `targetConfig`. Unspecified properties remain equal to their current values, so they are unchanged over the morph duration. Calling `morphTo()` while a morph is already active discards the in-progress morph and starts a new one from current live values.

### Morphable Properties

| Property | Mechanism |
|---|---|
| `lineColor` | Linear RGB lerp via `uColor` uniform on base rings material |
| `glowColor` | Linear RGB lerp via `uColor` uniform on glow rings material |
| `opacity` | Linear lerp via `uOpacity` uniform |
| `glowOpacity` | Linear lerp via `uOpacity` uniform on glow material |
| `emissiveIntensity` | Linear lerp via `uEmissiveIntensity` uniform |
| `stagger` | Linear lerp via `uStagger` uniform |
| `numRings` | Deferred: geometry rebuilt at morph completion (avoids per-frame buffer churn) |
| `samplesPerRing` | Deferred: geometry rebuilt at morph completion |
| `radius` | Interpolated each tick; applied via `scale.setScalar(lerpedRadius / options.radius)` on both base and glow rings. At deferred-geom rebuild completion, geometry is rebuilt at the new radius and scale is reset to 1. |

Properties not in this table (e.g. `durationMs`, `easingFn`) are applied immediately to `this._options` without interpolation.

---

## Threat-Map Integration

### Load-in Sequence

```javascript
import { RingRevealAnimator } from '../ring-reveal/index.js';
import { easeOutExpo } from '../ring-reveal/easings.js';

// In init.js, after globe mesh is added to scene:
const revealAnim = new RingRevealAnimator(scene, {
  radius: GLOBE_RADIUS * 1.003,   // just outside globe surface
  numRings: 56,
  durationMs: 2000,
  easingFn: easeOutExpo,
  direction: 'south-to-north',
  stagger: 0.55,
  lineColor: 0x00ffcc,
  glowColor: 0x00ffcc,
  emissiveIntensity: 2.0,         // exceeds UnrealBloomPass threshold → bloom
});

// Set renderOrder to sit below node dots (renderOrder 5) and above globe layers
revealAnim.baseRings.renderOrder = 4;
revealAnim.glowRings.renderOrder = 4;

revealAnim.play(() => {
  // Fade out rings after reveal completes (morph runs independently of _playing)
  revealAnim.morphTo({ opacity: 0, glowOpacity: 0 }, 600);
});
```

### Threat-Level Pulse

```javascript
function onThreatLevelChange(level) {
  if (level >= MID_THRESHOLD) {
    revealAnim.morphTo({
      lineColor: 0xff6600,
      glowColor: 0xff4400,
      stagger: 0.8,
      numRings: 72,
    }, 1200);
  } else {
    revealAnim.morphTo({
      lineColor: 0x00ffcc,
      glowColor: 0x00ffcc,
      stagger: 0.55,
      numRings: 56,
    }, 800);
  }
}
```

### RAF Hook

In `init.js` `animate()`, add one line:

```javascript
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta() * 1000;   // THREE.Clock → ms
  revealAnim.tick(delta);
  controls.update();
  composer.render();
}
```

---

## Improvements Over Venus.js Concept

| venus.js | RingRevealAnimator |
|---|---|
| BVH raycasting onto arbitrary mesh surface | Analytic sphere rings — zero BVH cost |
| TSL node graph (WebGPU only) | GLSL `ShaderMaterial` — any WebGL 1/2 device |
| `makio-meshline` MeshLine dependency | Built-in `LineSegments`; optional `Line2` upgrade path |
| Per-ring geometry objects (N draw calls) | Single `BufferGeometry` — one draw call for all rings |
| `DataTexture` packed positions | Vertex attribute packing — no texture sampler overhead |
| Fixed directional sweep | `direction`: south-to-north, north-to-south, equator-out |
| No morph system | `morphTo()` for runtime density/colour transitions |
| Tightly coupled to demo scaffold | Caller owns RAF; module only needs `tick(delta)` |
| No TypeScript types | Full `types.d.ts` declarations |
| `backInOut` per-ring `localT` | Global `easingFn` (configurable); per-ring uses `smoothstep` |

---

## Constraints and Validation

- `ringDuration` must be `> 0`; the implementation should clamp it to `Math.max(0.001, ringDuration)` to prevent division by zero in the vertex shader.
- `numRings` must be `>= 2` (need at least two rings for `uNumRings - 1.0` to be non-zero).
- `samplesPerRing` must be `>= 3`.
- `stagger` is clamped to `[0, 1]`.
- `radius` and `glowRadius` must be `> 0`.

---

## File Checklist

- [ ] `RingRevealAnimator/index.js`
- [ ] `RingRevealAnimator/RingRevealAnimator.js`
- [ ] `RingRevealAnimator/RingGeometry.js`
- [ ] `RingRevealAnimator/RingMaterial.js`
- [ ] `RingRevealAnimator/easings.js`
- [ ] `RingRevealAnimator/types.d.ts`
- [ ] Integration patch in `threat-map/init.js` (~10 lines)

---

## Out of Scope

- Arbitrary mesh surface projection (BVH/raycasting) — this is a sphere-specific module
- Three.js `r3f` / React wrapper — pure imperative API
- Node.js / SSR compatibility — requires `WebGLRenderer`
- Audio-reactive ring amplitude — can be driven externally by calling `morphTo({ stagger })` each frame
- Arbitrary `THREE.Vector3` up axis — use `Object3D.rotation` on the parent if custom orientation is needed
