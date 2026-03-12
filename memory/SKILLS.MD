# SKILLS.md – GitS UI Coding Standards

---

## 1. Aesthetic Principles

Six non-negotiable visual properties. Every component must exhibit all six.

| Principle | Rule | Violation |
|---|---|---|
| **Holographic & Layered** | Panels must be semi-transparent (`rgba(…, 0.85)`). Depth via z-index + drop-shadow stacking. | Solid opaque backgrounds |
| **Information Density** | Every panel must carry ≥ 3 concurrent data streams. No whitespace without purpose. | Sparse layouts, single-metric panels |
| **Scanline Projection** | Scanline overlay on every holographic display via `::after` pseudo-element. | Clean, unfiltered screens |
| **Neon Phosphor Glow** | Primary: cyan `#00f0ff`. Secondary: green `#00ff9d`. Tertiary: magenta `#ff00cc`. All on `#05080f` void. | Soft pastels, white backgrounds |
| **Techno-Orientalism** | Every label carries an English + Japanese paired string. Format: `LABEL [日本語]`. | English-only labels |
| **Digital Imperfection** | Glitch effect on state transitions. Flicker on load. CRT distortion on critical alerts. | Smooth, clean transitions only |

---

## 2. Color Palette

```css
:root {
  /* Backgrounds */
  --void:           #05080f;
  --void-secondary: #080c14;
  --panel-bg:       rgba(8, 12, 20, 0.85);
  --panel-border:   rgba(0, 240, 255, 0.3);
  --panel-border-active: rgba(0, 240, 255, 0.9);

  /* Neon primaries */
  --neon-cyan:      #00f0ff;
  --neon-green:     #00ff9d;
  --neon-magenta:   #ff00cc;
  --neon-amber:     #ffb300;

  /* Interactive states */
  --row-highlight:  #1a2e1a;   /* selected row background */
  --row-hover:      rgba(0, 240, 255, 0.06); /* hover row tint */

  /* Text */
  --text-primary:   #00f0ff;
  --text-secondary: rgba(0, 240, 255, 0.65);
  --text-dim:       rgba(0, 240, 255, 0.35);
  --text-alert:     #ff00cc;

  /* Glows */
  --glow-cyan:   0 0 8px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.5);
  --glow-green:  0 0 8px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.5);
  --glow-magenta: 0 0 8px #ff00cc, 0 0 20px rgba(255, 0, 204, 0.5);
}
```

**Never** use: white, #111, #333, purple gradients, `rgba(0,0,0,0.5)` plain shadows.

---

## 3. Typography

```css
/* Structural hierarchy — two-font system only */
--font-holo: 'Orbitron', 'Rajdhani', sans-serif;      /* Headers, labels, IDs */
--font-terminal: 'Share Tech Mono', 'Courier New', monospace; /* Data values, logs, code */
```

### Rules
- Headers: `Orbitron` UPPERCASE, `letter-spacing: 0.2em`.
- Data values: `Share Tech Mono`, right-aligned, tabular-nums.
- Japanese strings: `font-family: 'Noto Sans JP', sans-serif` or inherit system CJK.
- Min font-size: `0.65rem` for sub-labels. Max for hero readouts: `4rem`.
- Line-height: `1.2` for dense panels, `1.5` for readable text.

---

## 4. Special Effects (CSS-Only)

### Scanlines
```css
.holographic::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px, transparent 2px,
    rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}
```

### Neon Glow Text
```css
.neon-text {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
}
```

### Glitch on State Change
```css
@keyframes glitch {
  0%   { clip-path: inset(10% 0 85% 0); transform: translateX(-4px); }
  25%  { clip-path: inset(60% 0 20% 0); transform: translateX(4px); }
  50%  { clip-path: inset(40% 0 50% 0); transform: translateX(-2px); }
  75%  { clip-path: inset(80% 0 5% 0);  transform: translateX(2px); }
  100% { clip-path: inset(0% 0 0% 0);   transform: translateX(0); }
}

.glitch-enter {
  animation: glitch 0.3s steps(4) forwards;
}
```

### CRT Flicker (on load)
```css
@keyframes crt-flicker {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.6; }
  97% { opacity: 1; }
  98% { opacity: 0.4; }
}
.panel-boot { animation: crt-flicker 1.2s ease-out forwards; }
```

### Vignette Overlay
```css
.vignette::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
  z-index: 2;
}
```

---

## 5. Component Structure Rules

1. **Every panel has a header bar.** Format: `COMPONENT_NAME [日本語] ···· STATUS`.
2. **Every panel has a border.** Use `border: 1px solid var(--panel-border)`.
3. **Hover state is mandatory.** Border shifts to `--panel-border-active`, box-shadow adds glow.
4. **Active/selected panels** get a left accent bar: `border-left: 3px solid var(--neon-cyan)`.
5. **Alerts** use magenta `--neon-magenta` + pulsing animation. Never red on its own.
6. **Numeric values** are always right-aligned, monospace, with unit labels in `--text-dim`.

---

## 6. Structural Plane Rules (layout/)

- Define CSS Grid/Flexbox only. Zero color/effect CSS in structure files.
- Standard layout: S9-OV (Section 9 Operative View) — 3-column, 12-column grid.
- Column assignment: Left = `grid-column: 1 / 4`, Center = `4 / 10`, Right = `10 / 13`.
- Row slots: Header bar (fixed height), content area (flex grow), status strip (fixed).
- No `px` values for column widths — use `fr` and `minmax()`.

---

## 7. Three.js Layer Rules (when 3D is used)

- Canvas must be `position: absolute; inset: 0; z-index: 0`.
- All CSS HUD panels live at `z-index: 10+` with `pointer-events: auto`.
- Shader uniforms: always include `time` (float) for animation.
- All holographic meshes: `side: THREE.DoubleSide`, `transparent: true`, `depthWrite: false`.
- Bloom post-processing is mandatory for any emissive mesh. `luminanceThreshold: 0.6`, `intensity: 1.5–2.0`.
- `imageSmoothingEnabled = false` on any 2D canvas elements.

---

## 8. Forbidden Patterns

- `background: white` or `background: #fff` anywhere
- `font-family: Arial, Helvetica, sans-serif` — use Orbitron or Share Tech Mono
- Smooth `transition: all 0.3s ease` on alerts — use `steps()` for glitch
- `border-radius > 4px` on data panels (no rounded cards)
- `opacity: 0.5` uniform dim — use `rgba` with specific alpha per context
- English-only labels (always include Japanese counterpart)
- `console.log` in production Three.js code — use `DEBUG` flag guards
