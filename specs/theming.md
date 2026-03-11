# Theming System Spec

## Meta

| Field | Value |
|---|---|
| **Name** | `Theming` |
| **Status** | `approved` |
| **Scope** | `aesthetic/variables/` — CSS variables only |
| **Mechanism** | `[data-theme]` attribute on `<html>` element |
| **Breaking change** | `no` — additive; all existing class names and layout unchanged |

---

## Purpose

Provide switchable colour palettes for the GitS UI without touching any component or layout CSS; all theme-controlled values are CSS custom properties; switching a theme is a single attribute write on `<html>`.

---

## Problem with the Current Variables File

`aesthetic/variables/index.css` currently mixes two categories of values in `:root`:

| Category | Examples | Themeable? |
|---|---|---|
| **Colour / glow** | `--void`, `--neon-cyan`, `--text-primary`, `--glow-cyan` | **Yes** |
| **Layout constants** | `--topbar-height`, `--panel-gap`, `--header-height` | No |
| **Typography** | `--font-holo`, `--letter-spacing-wide` | No |
| **Structural constants** | `--border-radius-panel`, `--border-accent-width` | No |

The refactor separates these into two files. Layout/typography/structural constants never change per theme.

---

## File Structure After Implementation

```
aesthetic/variables/
  base.css               — layout constants, typography, structural constants (never theme-controlled)
  themes/
    gits.css             — :root default (current cyan/magenta palette)
    amber.css            — [data-theme="amber"] warm amber operative
    phosphor.css         — [data-theme="phosphor"] green phosphor CRT
    blood.css            — [data-theme="blood"] red/crimson hostile mode
  index.css              — barrel: @import base + all themes (replaces old single file)
```

`aesthetic/index.css` already imports `aesthetic/variables/index.css` — no change needed there.

---

## Theme Variable Contract

These are the variables a theme **must** define. No hardcoded hex values anywhere else.

### Backgrounds

| Variable | Role |
|---|---|
| `--void` | Page / root background |
| `--void-secondary` | Slightly lighter void for nested backgrounds |
| `--panel-bg` | Panel background (semi-transparent) |
| `--panel-bg-solid` | Panel background (opaque, for contexts where transparency is wrong) |

### Borders

| Variable | Role |
|---|---|
| `--panel-border` | Default panel border (low opacity primary) |
| `--panel-border-active` | Hover / focus / active panel border (high opacity primary) |
| `--panel-border-alert` | Alert state panel border (high opacity alert colour) |
| `--panel-border-dim` | Sub-dividers within panels (very low opacity) |

### Neon primaries

These names are intentionally colour-literal in the default theme. In other themes the values are remapped — the names are conventions, not semantic contracts.

| Variable | GitS value | Role in UI |
|---|---|---|
| `--neon-cyan` | `#00f0ff` | Primary accent — borders, active states, headings |
| `--neon-green` | `#00ff9d` | OK / success states |
| `--neon-magenta` | `#ff00cc` | Alert / critical states |
| `--neon-amber` | `#ffb300` | Warning states |

### Text

| Variable | Role |
|---|---|
| `--text-primary` | Primary data text (same hue as `--neon-cyan` in most themes) |
| `--text-secondary` | Standard label text (dimmed primary) |
| `--text-dim` | Sub-labels, timestamps, JP text |
| `--text-alert` | Alert text (same hue as `--neon-magenta`) |
| `--text-warning` | Warning text (same hue as `--neon-amber`) |
| `--text-ok` | OK / success text (same hue as `--neon-green`) |

### Interactive states

| Variable | Role |
|---|---|
| `--row-highlight` | Selected row background |
| `--row-hover` | Hovered row tint |

### Glows

Each glow variable is a `box-shadow` or `text-shadow` value referencing its colour twice (tight + wide):

| Variable | Role |
|---|---|
| `--glow-cyan` | Box-shadow for primary accent elements |
| `--glow-green` | Box-shadow for OK elements |
| `--glow-magenta` | Box-shadow for alert elements |
| `--glow-amber` | Box-shadow for warning elements |
| `--glow-text-cyan` | Text-shadow for primary accent text |
| `--glow-text-green` | Text-shadow for OK text |
| `--glow-text-magenta` | Text-shadow for alert text |
| `--glow-text-amber` | Text-shadow for warning text |

---

## Bundled Themes

### `gits` (default — applied to `:root`)

Current GitS canon: holographic cyan primary, magenta alert, void black.

| Variable | Value |
|---|---|
| `--void` | `#05080f` |
| `--void-secondary` | `#080c14` |
| `--panel-bg` | `rgba(8, 12, 20, 0.85)` |
| `--panel-bg-solid` | `#080c14` |
| `--panel-border` | `rgba(0, 240, 255, 0.3)` |
| `--panel-border-active` | `rgba(0, 240, 255, 0.9)` |
| `--panel-border-alert` | `rgba(255, 0, 204, 0.9)` |
| `--panel-border-dim` | `rgba(0, 240, 255, 0.12)` |
| `--neon-cyan` | `#00f0ff` |
| `--neon-green` | `#00ff9d` |
| `--neon-magenta` | `#ff00cc` |
| `--neon-amber` | `#ffb300` |
| `--text-primary` | `#00f0ff` |
| `--text-secondary` | `rgba(0, 240, 255, 0.65)` |
| `--text-dim` | `rgba(0, 240, 255, 0.35)` |
| `--text-alert` | `#ff00cc` |
| `--text-warning` | `#ffb300` |
| `--text-ok` | `#00ff9d` |
| `--row-highlight` | `#1a2e1a` |
| `--row-hover` | `rgba(0, 240, 255, 0.06)` |
| `--glow-cyan` | `0 0 8px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.5)` |
| `--glow-green` | `0 0 8px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.5)` |
| `--glow-magenta` | `0 0 8px #ff00cc, 0 0 20px rgba(255, 0, 204, 0.5)` |
| `--glow-amber` | `0 0 8px #ffb300, 0 0 20px rgba(255, 179, 0, 0.5)` |
| `--glow-text-cyan` | `0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff` |
| `--glow-text-green` | `0 0 5px #00ff9d, 0 0 10px #00ff9d, 0 0 20px #00ff9d` |
| `--glow-text-magenta` | `0 0 5px #ff00cc, 0 0 10px #ff00cc, 0 0 20px #ff00cc` |
| `--glow-text-amber` | `0 0 5px #ffb300, 0 0 10px #ffb300, 0 0 20px #ffb300` |

---

### `amber` — warm operative terminal

Amber phosphor on deep charcoal. Warmer and more analogue-feeling than GitS cyan.

| Variable | Value |
|---|---|
| `--void` | `#090702` |
| `--void-secondary` | `#0f0d03` |
| `--panel-bg` | `rgba(15, 10, 2, 0.88)` |
| `--panel-bg-solid` | `#0f0d03` |
| `--panel-border` | `rgba(255, 179, 0, 0.28)` |
| `--panel-border-active` | `rgba(255, 179, 0, 0.9)` |
| `--panel-border-alert` | `rgba(255, 50, 30, 0.9)` |
| `--panel-border-dim` | `rgba(255, 179, 0, 0.1)` |
| `--neon-cyan` | `#ffb300` |
| `--neon-green` | `#e8ff00` |
| `--neon-magenta` | `#ff3218` |
| `--neon-amber` | `#ff7c00` |
| `--text-primary` | `#ffb300` |
| `--text-secondary` | `rgba(255, 179, 0, 0.65)` |
| `--text-dim` | `rgba(255, 179, 0, 0.35)` |
| `--text-alert` | `#ff3218` |
| `--text-warning` | `#ff7c00` |
| `--text-ok` | `#e8ff00` |
| `--row-highlight` | `#1f1800` |
| `--row-hover` | `rgba(255, 179, 0, 0.06)` |
| `--glow-cyan` | `0 0 8px #ffb300, 0 0 20px rgba(255, 179, 0, 0.5)` |
| `--glow-green` | `0 0 8px #e8ff00, 0 0 20px rgba(232, 255, 0, 0.5)` |
| `--glow-magenta` | `0 0 8px #ff3218, 0 0 20px rgba(255, 50, 24, 0.5)` |
| `--glow-amber` | `0 0 8px #ff7c00, 0 0 20px rgba(255, 124, 0, 0.5)` |
| `--glow-text-cyan` | `0 0 5px #ffb300, 0 0 10px #ffb300, 0 0 20px #ffb300` |
| `--glow-text-green` | `0 0 5px #e8ff00, 0 0 10px #e8ff00, 0 0 20px #e8ff00` |
| `--glow-text-magenta` | `0 0 5px #ff3218, 0 0 10px #ff3218, 0 0 20px #ff3218` |
| `--glow-text-amber` | `0 0 5px #ff7c00, 0 0 10px #ff7c00, 0 0 20px #ff7c00` |

---

### `phosphor` — green monochrome CRT

Single-hue green phosphor. Maximum retro-terminal authenticity.

| Variable | Value |
|---|---|
| `--void` | `#010d02` |
| `--void-secondary` | `#021204` |
| `--panel-bg` | `rgba(2, 14, 3, 0.9)` |
| `--panel-bg-solid` | `#021204` |
| `--panel-border` | `rgba(0, 255, 80, 0.28)` |
| `--panel-border-active` | `rgba(0, 255, 80, 0.9)` |
| `--panel-border-alert` | `rgba(255, 60, 0, 0.9)` |
| `--panel-border-dim` | `rgba(0, 255, 80, 0.1)` |
| `--neon-cyan` | `#00ff50` |
| `--neon-green` | `#80ffaa` |
| `--neon-magenta` | `#ff3c00` |
| `--neon-amber` | `#aaff40` |
| `--text-primary` | `#00ff50` |
| `--text-secondary` | `rgba(0, 255, 80, 0.65)` |
| `--text-dim` | `rgba(0, 255, 80, 0.35)` |
| `--text-alert` | `#ff3c00` |
| `--text-warning` | `#aaff40` |
| `--text-ok` | `#80ffaa` |
| `--row-highlight` | `#00200a` |
| `--row-hover` | `rgba(0, 255, 80, 0.06)` |
| `--glow-cyan` | `0 0 8px #00ff50, 0 0 20px rgba(0, 255, 80, 0.5)` |
| `--glow-green` | `0 0 8px #80ffaa, 0 0 20px rgba(128, 255, 170, 0.5)` |
| `--glow-magenta` | `0 0 8px #ff3c00, 0 0 20px rgba(255, 60, 0, 0.5)` |
| `--glow-amber` | `0 0 8px #aaff40, 0 0 20px rgba(170, 255, 64, 0.5)` |
| `--glow-text-cyan` | `0 0 5px #00ff50, 0 0 10px #00ff50, 0 0 20px #00ff50` |
| `--glow-text-green` | `0 0 5px #80ffaa, 0 0 10px #80ffaa, 0 0 20px #80ffaa` |
| `--glow-text-magenta` | `0 0 5px #ff3c00, 0 0 10px #ff3c00, 0 0 20px #ff3c00` |
| `--glow-text-amber` | `0 0 5px #aaff40, 0 0 10px #aaff40, 0 0 20px #aaff40` |

---

### `blood` — red/crimson hostile mode

Deep red primary. Intended for hostile-mode or antagonist-perspective interfaces.

| Variable | Value |
|---|---|
| `--void` | `#0d0101` |
| `--void-secondary` | `#140202` |
| `--panel-bg` | `rgba(16, 2, 2, 0.88)` |
| `--panel-bg-solid` | `#140202` |
| `--panel-border` | `rgba(255, 30, 30, 0.28)` |
| `--panel-border-active` | `rgba(255, 30, 30, 0.9)` |
| `--panel-border-alert` | `rgba(255, 140, 0, 0.9)` |
| `--panel-border-dim` | `rgba(255, 30, 30, 0.1)` |
| `--neon-cyan` | `#ff1e1e` |
| `--neon-green` | `#ff6600` |
| `--neon-magenta` | `#ff8c00` |
| `--neon-amber` | `#ffcc00` |
| `--text-primary` | `#ff1e1e` |
| `--text-secondary` | `rgba(255, 30, 30, 0.65)` |
| `--text-dim` | `rgba(255, 30, 30, 0.35)` |
| `--text-alert` | `#ff8c00` |
| `--text-warning` | `#ffcc00` |
| `--text-ok` | `#ff6600` |
| `--row-highlight` | `#200000` |
| `--row-hover` | `rgba(255, 30, 30, 0.06)` |
| `--glow-cyan` | `0 0 8px #ff1e1e, 0 0 20px rgba(255, 30, 30, 0.5)` |
| `--glow-green` | `0 0 8px #ff6600, 0 0 20px rgba(255, 102, 0, 0.5)` |
| `--glow-magenta` | `0 0 8px #ff8c00, 0 0 20px rgba(255, 140, 0, 0.5)` |
| `--glow-amber` | `0 0 8px #ffcc00, 0 0 20px rgba(255, 204, 0, 0.5)` |
| `--glow-text-cyan` | `0 0 5px #ff1e1e, 0 0 10px #ff1e1e, 0 0 20px #ff1e1e` |
| `--glow-text-green` | `0 0 5px #ff6600, 0 0 10px #ff6600, 0 0 20px #ff6600` |
| `--glow-text-magenta` | `0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00` |
| `--glow-text-amber` | `0 0 5px #ffcc00, 0 0 10px #ffcc00, 0 0 20px #ffcc00` |

---

## Glow Value Format

Glows cannot use `var()` references inside `box-shadow` / `text-shadow` — the entire value must be a single custom property. Each theme defines all eight glow variables as complete literal values. Pattern:

```css
--glow-cyan:         0 0 8px {primary-hex}, 0 0 20px rgba({primary-rgb}, 0.5);
--glow-green:        0 0 8px {ok-hex}, 0 0 20px rgba({ok-rgb}, 0.5);
--glow-magenta:      0 0 8px {alert-hex}, 0 0 20px rgba({alert-rgb}, 0.5);
--glow-amber:        0 0 8px {warning-hex}, 0 0 20px rgba({warning-rgb}, 0.5);
--glow-text-cyan:    0 0 5px {primary-hex}, 0 0 10px {primary-hex}, 0 0 20px {primary-hex};
--glow-text-green:   0 0 5px {ok-hex}, 0 0 10px {ok-hex}, 0 0 20px {ok-hex};
--glow-text-magenta: 0 0 5px {alert-hex}, 0 0 10px {alert-hex}, 0 0 20px {alert-hex};
--glow-text-amber:   0 0 5px {warning-hex}, 0 0 10px {warning-hex}, 0 0 20px {warning-hex};
```

All values are in the theme tables above.

---

## HTML Usage

```html
<!-- Default theme (gits) — no attribute needed -->
<html lang="en">

<!-- Switch theme -->
<html lang="en" data-theme="amber">
<html lang="en" data-theme="phosphor">
<html lang="en" data-theme="blood">
```

---

## JavaScript API

`aesthetic/variables/theme.js` — module export:

```js
// Set active theme. Writes data-theme on <html>.
// Persists to localStorage if persist=true (default: true).
setTheme(name: string, persist?: boolean): void

// Get current theme name. Reads data-theme or returns 'gits'.
getTheme(): string

// Apply persisted theme on page load. Call once at startup.
applyPersistedTheme(): void

// List of all bundled theme names.
THEMES: string[]  // ['gits', 'amber', 'phosphor', 'blood']
```

Theme switches are instant — no CSS transitions on the `[data-theme]` change itself. Individual component transitions (hover, etc.) remain active within a theme.

### Special case: `setTheme('gits')`

The default theme is applied via `:root` (no attribute). There is no `[data-theme="gits"]` selector. Therefore `setTheme('gits')` **removes** the `data-theme` attribute entirely rather than writing `data-theme="gits"`. This returns the page to the `:root` default. `getTheme()` returns `'gits'` when the attribute is absent.

### Idempotency

`setTheme(name)` is a **no-op** if the requested theme is already active (same name as current). The attribute is not rewritten and `s9:theme-change` is not fired. This prevents unnecessary DOM thrashing on repeated calls.

### `applyPersistedTheme()` usage

```html
<!-- Stylesheets must load first so selectors are active -->
<link rel="stylesheet" href="/aesthetic/index.css" />

<!-- Then apply persisted theme — runs before first paint completes -->
<script type="module">
  import { applyPersistedTheme } from '/aesthetic/variables/theme.js';
  applyPersistedTheme();
</script>
```

Place **after** the stylesheet `<link>` tags in `<head>`. The CSS selectors must be active before the theme attribute is written, otherwise the first paint uses the wrong theme. Placing the script at the end of `<head>` (after stylesheets but before `<body>`) prevents the unstyled flash.

---

## data-* Attributes

| Attribute | Element | Values | Purpose |
|---|---|---|---|
| `data-theme` | `<html>` | `gits\|amber\|phosphor\|blood` | active theme; written by `setTheme()` |

---

## Custom Event

| Event | Fired on | Detail | When |
|---|---|---|---|
| `s9:theme-change` | `document` | `{ from: string, to: string }` | after `setTheme()` writes the attribute |

---

## Migration: Refactoring `aesthetic/variables/index.css`

Current file has all values in a single `:root` block. After implementation:

1. `aesthetic/variables/base.css` contains the non-colour variables (layout constants, typography, structural constants) in `:root` — identical to current values, these never change.
2. `aesthetic/variables/themes/gits.css` contains all colour/glow variables in `:root` — identical to current values.
3. `aesthetic/variables/index.css` becomes a barrel importing `base.css` then all theme files.
4. The old `aesthetic/variables/index.css` is replaced. No other files change.

**No component CSS changes required** — all components already reference `var(--neon-cyan)` etc.

**Also required:** `aesthetic/effects/index.css` contains two hardcoded colour values that break theme-awareness. These must be updated during implementation:

1. **Scanlines** (`.holographic::after`): `rgba(0, 240, 255, 0.03)` → `color-mix(in srgb, var(--neon-cyan) 3%, transparent)`
2. **Alert-pulse insets** (`@keyframes alert-pulse`): `rgba(255, 0, 204, 0.1)` and `rgba(255, 0, 204, 0.25)` → `color-mix(in srgb, var(--neon-magenta) 10%, transparent)` and `color-mix(in srgb, var(--neon-magenta) 25%, transparent)`

`color-mix()` is supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.2+). No new theme variables are required for this change.

---

## Quality Gates

- [ ] Spec approved before any code written
- [ ] `base.css` contains zero colour/glow properties
- [ ] Every theme file defines all variables in the Theme Variable Contract (above) — no gaps
- [ ] All glow variables use literal hex values (no var() references inside glow definitions)
- [ ] `[data-theme="x"]` attribute selector used (specificity 0,1,0) — must exceed `:root` (0,0,1) to override defaults; `html[data-theme]` (0,1,1) is forbidden
- [ ] Default theme (`gits`) applied via `:root` — requires no `data-theme` attribute; no `[data-theme="gits"]` rule exists
- [ ] `setTheme('gits')` removes the `data-theme` attribute; `getTheme()` returns `'gits'` when attribute is absent
- [ ] `applyPersistedTheme()` called in `<head>` after stylesheet link tags
- [ ] `s9:theme-change` detail contains both `from` and `to` keys as exact theme name strings (e.g. `{ from: 'gits', to: 'amber' }`)
- [ ] `setTheme()` with same theme name twice is a no-op — attribute unchanged, event not fired
- [ ] `setTheme()` with unknown name is a no-op; logs `console.warn` in development
- [ ] `aesthetic/effects/index.css` scanlines (`.holographic::after`) updated to `color-mix(in srgb, var(--neon-cyan) 3%, transparent)`
- [ ] `aesthetic/effects/index.css` alert-pulse insets updated: `rgba(255, 0, 204, 0.1)` → `color-mix(in srgb, var(--neon-magenta) 10%, transparent)` and `rgba(255, 0, 204, 0.25)` → `color-mix(in srgb, var(--neon-magenta) 25%, transparent)`
- [ ] All four themes (gits, amber, phosphor, blood) define all eight glow variables (`--glow-cyan` through `--glow-text-amber`) with literal hex values — no gaps
- [ ] Visual test page exists at `tests/visual/theming.html`
- [ ] Visual test: all four themes render without unstyled flash on switch
- [ ] Visual test: scanline colour changes per theme (not fixed cyan)
- [ ] Visual test: alert-pulse inset colour changes per theme
- [ ] Visual test: text contrast ≥ 4.5:1 in all four themes (spot-check header label against panel-bg)
- [ ] `aesthetic/variables/index.css` still importable from same path — no consumer file changes required
