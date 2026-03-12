# CLAUDE.md

# GitS Web UI Designer v1.0 — Development Guide

---

## Authority Hierarchy

1. GITS-BOOTSTRAP.md — architecture contract (highest authority)
2. /specs/ — feature-level specs (required before implementation)
3. CLAUDE.md — this file (workflow and standards)
4. /memory/SKILLS.md — GitS UI coding standards (holographic, information density, special effects)
5. /memory/COMPONENTS.MD — predefined GitS UI component definitions

If anything conflicts with GITS-BOOTSTRAP.md, the bootstrap wins.

---

## What This Project Is

A specialized tool for generating modern, high-fidelity web user interfaces inspired by the **Ghost in the Shell (攻殻機動隊)** aesthetic. It focuses on cybernetic control panels, futuristic dashboards, hacker terminals, and augmented-reality mockups, aiming to make users feel like they've jacked into a Section 9 terminal.

This is a front-end oriented project. The output is clean HTML/CSS/JS (primarily CSS Grid/Flexbox) for modular and reconfigurable panels, emphasizing visual complexity and tactical efficiency rather than minimalist streamlining.

---

## Architecture Overview

Strict separation between structure and style:

**Structural Plane (structure/)** — CSS Grid and Flexbox layouts. Defines the S9-OV modular panels. No aesthetic styling.
**Aesthetic Plane (aesthetic/)** — GitS-specific CSS variables, typography, and special effects. No layout logic.

All components must respect this boundary, importing styles only from the Aesthetic Plane.
See GITS-BOOTSTRAP.md for detailed structural requirements.

---

## Core Aesthetic Principles (from memory/SKILLS.md)

| Principle | Description | Examples |
| :--- | :--- | :--- |
| **Holographic & Layered** | Semi-transparent floating panels, depth, parallax. | Tooltips, stacked data overlays. |
| **Information Density** | Overwhelming visual detail, simulating direct brain processing. | Concentric circles, 3D maps, multiple simultaneous data streams. |
| **Scanline Projection** | Subtle vertical scan lines. | Subtle overlay on holographic displays. |
| **Neon Phosphor Glow** | Cyan, green, magenta neons on deep void backgrounds. | Pulsing green text, glowing cyan buttons. |
| **Techno-Orientalism** | Mix of English + Japanese (kanji/katakana) labels. | `SECTION 9 OPS [九課オペレーション]` |
| **Digital Imperfection** | Subtle glitch effects, flickering, CRT distortion. | Error alerts, main title on load. |

---

## Key Components

### Structure (CSS Grid/Flexbox)
- **Layout: Section 9 Operative View (S9-OV)** — The standard three-column tactical configuration.
- Left Column: Tactical data streams, personnel logs.
- Center Area: Main visualization, neural readouts, global threat maps.
- Right Column: Network status, environmental telemetry, system-level alerts.

### Aesthetics (CSS Variables & Effects)
- **Official Color Palette** (void background, translucent panels, various neon glows).
- **Holo-Text & Terminal-Code** (Typography system with specialized monospace and geometric sans).
- **Special Effects** (Conceptual CSS for neon glow, scanlines, glitch, flicker, CRT distortion, vignette, chromatic aberration).

---

## Working on This Project

### Reading Order
At session start, read these files in order:
1. memory/SKILLS.MD — GitS UI coding standards (holographic, density, effects)
2. memory/COMPONENTS.MD — component role boundaries
3. CLAUDE-BOOTSTRAP.md — architecture contract

### Spec-Driven Development
Before implementing any component or layout:
1. A spec must exist in /specs/
2. Use specs/component_template.md or specs/layout_template.md
3. Spec must define: purpose, interfaces (CSS classes), inputs (content structure), expected behavior (interactivity, effects).
4. Create visual regression tests or interactive test pages ALONGSIDE implementation.

### Operating Modes
- **Layout Mode** — Define CSS Grid and Flexbox structural panels; no aesthetic styles.
- **Styling Mode** — Implement GitS-specific colors, typography, and effects; no layout logic.
- **Integration Mode** — Apply styles to structure; finalize component or full S9-OV view.

### Testing
Run all style and layout tests: npm test
Verify layout boundaries: npm run test:layouts
Verify effect implementations: npm run test:effects
Verify visual regression: npm run test:visual

---

## Common Commands

Generate component skeleton: `npm run generate:component <name>`
Apply standard GitS theme to directory: `npm run apply:theme <path>`
Create S9-OV layout template: `npm run generate:layout s9-ov`
Visual regression test: `npm run visual-test`
Start local development server: `npm start`