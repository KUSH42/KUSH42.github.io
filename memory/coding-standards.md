# SKILLS.md – Coding & Governance Rules

---

## 1. File & Directory Naming

- Directories: `kebab-case`
- CSS files: `kebab-case.css`
- JS/TS files: `kebab-case.js` / `kebab-case.ts`
- Component directories: match component name in `memory/COMPONENTS.MD`
- Spec files: `specs/<component-or-layout-name>.md`

---

## 2. CSS Standards

### Custom Properties Only
No hardcoded hex values in component files. All values from `aesthetic/variables/`:

```css
/* correct */
color: var(--neon-cyan);
border: 1px solid var(--panel-border);

/* wrong */
color: #00f0ff;
border: 1px solid rgba(0, 240, 255, 0.3);
```

### Class Naming — BEM variant
```
.s9-{component}                   — block
.s9-{component}__{element}        — element
.s9-{component}--{modifier}       — modifier
```

All blocks prefixed `s9-` (Section 9 namespace). No generic class names like `.panel`, `.card`, `.btn`.

### Structure / Aesthetic Separation
- `structure/` files: `display`, `grid-template-*`, `flex-*`, `gap`, `padding`, `margin`, `width`, `height`, `position`, `inset`, `overflow`, `z-index` only.
- `aesthetic/` files: `color`, `background`, `border-color`, `box-shadow`, `text-shadow`, `font-*`, `letter-spacing`, `opacity`, `animation`, `transition`, `filter` only.

### Forbidden CSS
```css
border-radius: > 4px;         /* no rounded cards */
font-family: Arial, Helvetica; /* use Orbitron or Share Tech Mono */
background: white;
background: #fff;
background: #111;
transition: all 0.3s ease;    /* use specific properties + steps() for glitch */
```

---

## 3. JavaScript Standards

### No Direct DOM Manipulation in Components
Use data attributes and CSS class toggles. Logic in JS, appearance in CSS.

```js
// correct
element.classList.add('s9-panel--alert');

// wrong
element.style.borderColor = '#ff00cc';
```

### Event Listener Cleanup
Every `addEventListener` must have a corresponding `removeEventListener` path on destroy/unmount.

```js
function mount(el) {
  const handler = (e) => handleClick(e);
  el.addEventListener('click', handler);
  return () => el.removeEventListener('click', handler); // teardown
}
```

### Animation Frame Loops
```js
let rafId;
function loop() {
  // ...
  rafId = requestAnimationFrame(loop);
}
rafId = requestAnimationFrame(loop);

// teardown
cancelAnimationFrame(rafId);
```

### Debug Logging
```js
const DEBUG = window.__S9_DEBUG__ ?? false;
if (DEBUG) console.log('[s9-component]', data);
```

---

## 4. Three.js Standards

### Disposal on Unmount (mandatory)
```js
function dispose(mesh) {
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(m => m.dispose());
  } else {
    mesh.material.dispose();
  }
  mesh.parent?.remove(mesh);
}
```

### Shader Uniforms
Every `ShaderMaterial` must expose at minimum:
```glsl
uniform float time;   // seconds since mount, updated each frame
uniform vec3 color;   // from CSS variable equivalent
uniform float opacity;
```

### Holographic Mesh Defaults
```js
{
  side: THREE.DoubleSide,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
}
```

### EffectComposer
Required for any scene with emissive / neon meshes:
```js
// minimum config
new Bloom({ luminanceThreshold: 0.6, intensity: 1.5, kernelSize: 5 })
```

---

## 5. Accessibility Rules

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Three.js: pause `requestAnimationFrame` loop when `prefers-reduced-motion` matches.

All interactive elements:
- `role` attribute if not a native interactive element
- `aria-label` in English (Japanese label is decorative, not ARIA)
- Keyboard accessible: `tabindex="0"` + `keydown` handler where click is handled

---

## 6. Spec-Driven Workflow

1. New component or layout → write spec in `specs/` first.
2. Spec approved → implement structure CSS.
3. Structure done → implement aesthetic CSS + effects.
4. Aesthetic done → implement JS behavior.
5. Behavior done → create test page in `tests/` or `visual/`.
6. All quality gates in `GITS-BOOTSTRAP.md §8` checked → component complete.

**No implementation without a spec. No exceptions.**

---

## 7. Error Taxonomy

| Type | Meaning | Resolution |
|---|---|---|
| `structure_violation` | Layout CSS in aesthetic file, or vice versa | Move to correct plane |
| `hardcode_violation` | Hex value outside `aesthetic/variables/` | Extract to CSS variable |
| `naming_violation` | Class name not following BEM or missing `s9-` prefix | Rename + update usages |
| `spec_missing` | Component implemented without spec | Write spec retroactively, then validate |
| `leak_violation` | Three.js object not disposed on unmount | Add disposal call |
| `motion_violation` | Animation not respecting `prefers-reduced-motion` | Add media query guard |
