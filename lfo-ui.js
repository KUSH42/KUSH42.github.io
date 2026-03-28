/**
 * lfo-ui.js — LFO widget, modulation indicators, and drag-to-assign wiring.
 *
 * Provides:
 *   LFOWidget    — Canvas-based LFO panel with controls and a drag handle.
 *   ModIndicator — Floating badge anchored to a connected element showing
 *                  depth and a remove button. Also draws a range arc on range inputs.
 *
 * No external dependencies. Requires lfo-engine.js.
 */

import { engine, SHAPES, smoothRand, seededRand, SHAPE_FN, applySkew } from './lfo-engine.js';

// ─── Constants ────────────────────────────────────────────────────────────────

export const LFO_COLORS = [
  '#00d4ff', // cyan
  '#ff3aaa', // magenta
  '#39ff14', // neon green
  '#ff9500', // orange
  '#bf80ff', // lavender
  '#ffd700', // gold
  '#00ffcc', // teal
  '#ff4466', // red-pink
];

let _colorIndex = 0;
let _labelIndex = 0;

const SHAPE_LABELS = {
  sine:     'SIN',
  triangle: 'TRI',
  saw:      'SAW',
  rsaw:     'RSW',
  square:   'SQR',
  random:   'S&H',
  smooth:   'SMO',
};

// ─── CSS injection ────────────────────────────────────────────────────────────

const CSS = `
/* ── Widget container ──────────────────────────────────────────── */
.lfo-widget {
  display: inline-flex;
  flex-direction: column;
  background: #0a0a12;
  border: 1px solid #222233;
  border-radius: 8px;
  padding: 10px;
  min-width: 216px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 11px;
  color: #888;
  user-select: none;
  gap: 7px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.5);
}

.lfo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.lfo-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.lfo-led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  transition: opacity 0.05s;
}

/* ── Canvas + shapes row ───────────────────────────────────────── */
.lfo-canvas-row {
  display: flex;
  gap: 4px;
  align-items: stretch;
}

/* ── Waveform canvas ───────────────────────────────────────────── */
.lfo-canvas {
  border-radius: 4px;
  background: #050509;
  display: block;
  cursor: crosshair;
  flex: 1;
  min-width: 0;
  width: 140px;
  height: 72px;
}

/* ── Shape buttons — side panel (2 col × 4 row) ────────────────── */
.lfo-shapes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  width: 52px;
  flex-shrink: 0;
}

.lfo-shape-btn {
  background: #111120;
  border: 1px solid #1e1e30;
  color: #555;
  padding: 1px 0;
  border-radius: 3px;
  cursor: pointer;
  font-size: 9px;
  font-family: inherit;
  text-align: center;
  transition: color 0.1s, border-color 0.1s, background 0.1s;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lfo-shape-btn:hover {
  border-color: #333;
  color: #999;
}

.lfo-shape-btn.active {
  border-color: var(--lfo-color, #00d4ff);
  color: var(--lfo-color, #00d4ff);
  background: #08080f;
}

/* ── Param rows ─────────────────────────────────────────────────── */
.lfo-params {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.lfo-param-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lfo-param-group label {
  font-size: 9px;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.lfo-param-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.lfo-param-group input[type=range] {
  flex: 1;
  min-width: 0;
  appearance: none;
  -webkit-appearance: none;
  height: 3px;
  border-radius: 2px;
  background: #1a1a28;
  outline: none;
  cursor: pointer;
}

.lfo-param-group input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--lfo-color, #00d4ff);
  cursor: pointer;
  box-shadow: 0 0 4px var(--lfo-color, #00d4ff);
}

.lfo-param-group input[type=range]::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--lfo-color, #00d4ff);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 4px var(--lfo-color, #00d4ff);
}

.lfo-param-val {
  font-size: 9px;
  color: var(--lfo-color, #00d4ff);
  min-width: 28px;
  text-align: right;
  flex-shrink: 0;
}

/* ── Connect handle ─────────────────────────────────────────────── */
.lfo-connect-handle {
  background: #0d0d1c;
  border: 1px dashed var(--lfo-color, #00d4ff);
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
  color: var(--lfo-color, #00d4ff);
  font-size: 10px;
  cursor: grab;
  transition: opacity 0.15s, background 0.15s;
  opacity: 0.65;
  letter-spacing: 0.04em;
}

.lfo-connect-handle:hover {
  opacity: 1;
  background: #060610;
}

.lfo-connect-handle.dragging {
  cursor: grabbing;
  opacity: 1;
}

.lfo-connect-handle.armed {
  opacity: 1;
  background: #060610;
  border-style: solid;
}

/* ── Drag wire SVG ──────────────────────────────────────────────── */
#lfo-drag-wire-svg {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
  overflow: visible;
}

/* ── Target highlight during drag ───────────────────────────────── */
.lfo-drag-target {
  outline: 2px solid var(--lfo-drag-color, #00d4ff) !important;
  outline-offset: 3px;
  border-radius: 2px;
}

/* ── Mod indicator badge ─────────────────────────────────────────── */
.lfo-mod-badge {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #0a0a14;
  border: 1px solid #222233;
  border-radius: 4px;
  padding: 3px 6px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 10px;
  color: #888;
  z-index: 10000;
  pointer-events: auto;
  cursor: default;
  white-space: nowrap;
  box-shadow: 0 1px 8px rgba(0,0,0,0.6);
  transition: opacity 0.1s;
}

.lfo-mod-badge:hover {
  opacity: 1 !important;
}

.lfo-mod-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lfo-mod-depth-label {
  cursor: ew-resize;
  color: var(--badge-color, #00d4ff);
  font-weight: bold;
  min-width: 32px;
  text-align: right;
  user-select: none;
}

.lfo-mod-depth-label:hover::after {
  content: ' ↔';
  opacity: 0.5;
  font-size: 9px;
}

.lfo-mod-remove {
  background: none;
  border: none;
  color: #444;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 0 1px;
  font-family: inherit;
  transition: color 0.1s;
}

.lfo-mod-remove:hover {
  color: #ff4466;
}

/* ── Range arc canvas overlay ────────────────────────────────────── */
.lfo-range-arc {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}
`;

let _stylesInjected = false;

export function injectStyles() {
  if (_stylesInjected || typeof document === 'undefined') return;
  _stylesInjected = true;
  const style = document.createElement('style');
  style.id = 'lfo-ui-styles';
  style.textContent = CSS;
  document.head.appendChild(style);
}

// ─── Drag wire helper ─────────────────────────────────────────────────────────

/**
 * Creates a full-screen SVG overlay showing the drag-assign wire.
 * @param {string} color
 */
function createDragWire(color) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'lfo-drag-wire-svg';
  document.body.appendChild(svg);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '1.5');
  path.setAttribute('stroke-dasharray', '5 4');
  path.setAttribute('opacity', '0.75');
  svg.appendChild(path);

  const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  endDot.setAttribute('r', '5');
  endDot.setAttribute('fill', color);
  endDot.setAttribute('opacity', '0.9');
  svg.appendChild(endDot);

  let sx = 0, sy = 0;

  return {
    setStart(x, y) { sx = x; sy = y; },
    setEnd(x, y) {
      const midX = (sx + x) / 2;
      path.setAttribute('d',
        `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${y}, ${x} ${y}`
      );
      endDot.setAttribute('cx', x);
      endDot.setAttribute('cy', y);
    },
    setValid(valid) {
      const c = valid ? color : '#555';
      path.setAttribute('stroke', c);
      endDot.setAttribute('fill', c);
    },
    remove() { svg.remove(); },
  };
}

// ─── Target detection ─────────────────────────────────────────────────────────

/** Elements that are valid LFO modulation targets. */
function isModTarget(el) {
  if (!el || el.tagName === 'BUTTON') return false;
  if (el.tagName === 'INPUT' &&
      (el.type === 'range' || el.type === 'number')) return true;
  if (el.dataset.lfoTarget !== undefined) return true;
  return false;
}

/** Find the best modulation target element under (cx, cy), ignoring skip. */
function getModTarget(cx, cy, skip) {
  const elems = document.elementsFromPoint(cx, cy);
  for (const el of elems) {
    if (el === skip || el.closest('#lfo-drag-wire-svg')) continue;
    if (isModTarget(el)) return el;
  }
  return null;
}

// ─── ModIndicator ─────────────────────────────────────────────────────────────

/**
 * Floating badge anchored to a connected input element.
 * Shows depth, allows drag-to-adjust, and a remove button.
 */
export class ModIndicator {
  /**
   * @param {HTMLElement} element   Connected input.
   * @param {string}      routeId
   * @param {string}      lfoId
   * @param {string}      color
   * @param {string}      lfoLabel
   * @param {function}    onRemove  Called when the user removes this connection.
   */
  constructor(element, routeId, lfoId, color, lfoLabel, onRemove) {
    this._element  = element;
    this._routeId  = routeId;
    this._lfoId    = lfoId;
    this._color    = color;
    this._onRemove = onRemove;
    this._badge    = null;
    this._arcCanvas = null;
    this._rafId    = null;

    injectStyles();
    this._buildBadge(lfoLabel);
    this._buildArcCanvas();
    this._startPositioning();
  }

  _buildBadge(label) {
    const badge = this._badge = document.createElement('div');
    badge.className = 'lfo-mod-badge';
    badge.style.setProperty('--badge-color', this._color);
    badge.style.opacity = '0.85';

    const dot = document.createElement('div');
    dot.className = 'lfo-mod-dot';
    dot.style.background = this._color;
    dot.style.boxShadow = `0 0 4px ${this._color}`;

    const lbl = document.createElement('span');
    lbl.textContent = label;
    lbl.style.color = '#666';
    lbl.style.fontSize = '9px';

    const depthLabel = this._depthLabel = document.createElement('span');
    depthLabel.className = 'lfo-mod-depth-label';
    depthLabel.title = 'Drag left/right to adjust modulation depth';
    this._updateDepthLabel();

    const removeBtn = document.createElement('button');
    removeBtn.className = 'lfo-mod-remove';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove modulation';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._onRemove?.(this._routeId);
    });

    // Drag depth label to adjust depth
    let dragStartX = 0;
    let dragStartDepth = 0;

    depthLabel.addEventListener('pointerdown', (e) => {
      dragStartX = e.clientX;
      dragStartDepth = engine.getRoute(this._routeId)?.depth ?? 0.5;
      depthLabel.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    depthLabel.addEventListener('pointermove', (e) => {
      if (!depthLabel.hasPointerCapture(e.pointerId)) return;
      const delta = (e.clientX - dragStartX) / 120;
      const newDepth = Math.max(0, Math.min(1, dragStartDepth + delta));
      engine.setRouteDepth(this._routeId, newDepth);
      this._updateDepthLabel();
    });

    badge.appendChild(dot);
    badge.appendChild(lbl);
    badge.appendChild(depthLabel);
    badge.appendChild(removeBtn);
    document.body.appendChild(badge);
  }

  _buildArcCanvas() {
    // Small arc overlay on range inputs showing the mod sweep range
    if (this._element.type !== 'range') return;

    const canvas = this._arcCanvas = document.createElement('canvas');
    canvas.className = 'lfo-range-arc';
    canvas.width = 0;
    canvas.height = 6;
    document.body.appendChild(canvas);
  }

  _updateDepthLabel() {
    const depth = engine.getRoute(this._routeId)?.depth ?? 0;
    if (this._depthLabel) {
      this._depthLabel.textContent = `${Math.round(depth * 100)}%`;
    }
  }

  _startPositioning() {
    const update = () => {
      this._rafId = requestAnimationFrame(update);
      this._reposition();
      this._updateArc();
      this._updateDepthLabel();
    };
    this._rafId = requestAnimationFrame(update);
  }

  _reposition() {
    const r = this._element.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const badge = this._badge;
    const bw = badge.offsetWidth;
    const bh = badge.offsetHeight;

    let bx = r.right - bw;
    let by = r.top - bh - 4;

    // Keep badge on screen
    if (bx < 4) bx = 4;
    if (by < 4) by = r.bottom + 4;

    badge.style.left = `${bx}px`;
    badge.style.top  = `${by}px`;
  }

  _updateArc() {
    const canvas = this._arcCanvas;
    if (!canvas) return;

    const r = this._element.getBoundingClientRect();
    canvas.style.left = `${r.left}px`;
    canvas.style.top  = `${r.bottom + 1}px`;
    // Only reset canvas width when it actually changes — resizing clears the
    // canvas and is relatively expensive to do unconditionally at 60fps.
    const newW = Math.round(r.width);
    if (canvas.width !== newW) {
      canvas.width = newW;
      canvas.style.width = `${r.width}px`;
    }
    if (canvas.height !== 5) {
      canvas.height = 5;
      canvas.style.height = '5px';
    }

    const route  = engine.getRoute(this._routeId);
    if (!route) return;
    const lfoVal = engine.getValue(this._lfoId);
    const depth  = route.depth;

    let centerNorm, swingNorm, curNorm;

    if (route.targetType === 'lfo') {
      // Chain route — synthesize arc params from target LFO state.
      const tgt = engine.getLFO(route.target);
      if (!tgt) return;
      if (route.targetParam === 'rate') {
        const min = 0.01, max = 20, range = max - min;
        const base = tgt.baseRate;
        centerNorm = (base - min) / range;
        // Rate mod is multiplicative: effectiveRate = base × (1 + src × depth).
        // Swing expressed in normalised units.
        swingNorm  = (base * depth) / range;
        curNorm    = Math.max(0, Math.min(1, (base * (1 + lfoVal * depth) - min) / range));
      } else if (route.targetParam === 'depth') {
        const base = tgt.baseDepth;
        centerNorm = base;
        swingNorm  = depth * 0.5;
        curNorm    = Math.max(0, Math.min(1, base + lfoVal * depth * 0.5));
      } else {
        return;
      }
    } else {
      // Element route — use registered element metadata.
      const meta = engine.getElementMeta(this._element);
      if (!meta) return;
      const range = meta.max - meta.min;
      if (range === 0) return;
      centerNorm = (meta.baseValue - meta.min) / range;
      swingNorm  = depth * 0.5;
      curNorm    = Math.max(0, Math.min(1, (meta.baseValue + lfoVal * depth * range * 0.5 - meta.min) / range));
    }

    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    // Draw sweep range bar
    const xCenter = centerNorm * w;
    const xMin    = Math.max(0, (centerNorm - swingNorm) * w);
    const xMax    = Math.min(w, (centerNorm + swingNorm) * w);

    ctx.fillStyle = `${this._color}30`;
    ctx.fillRect(xMin, 1, xMax - xMin, h - 2);

    // Draw center tick
    ctx.fillStyle = `${this._color}80`;
    ctx.fillRect(xCenter - 0.5, 0, 1, h);

    // Draw current position dot
    ctx.fillStyle = this._color;
    ctx.beginPath();
    ctx.arc(curNorm * w, h / 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  destroy() {
    if (this._rafId != null) cancelAnimationFrame(this._rafId);
    this._badge?.remove();
    this._arcCanvas?.remove();
  }

  get routeId() { return this._routeId; }
}

// ─── LFOWidget ────────────────────────────────────────────────────────────────

/**
 * Canvas-based LFO panel with waveform display, shape selector, parameter
 * sliders, and a drag handle for wiring to any modulation target.
 */
export class LFOWidget {
  /**
   * @param {HTMLElement} container  Where the widget is appended.
   * @param {string}      lfoId     Engine LFO id.
   * @param {object}      [opts]
   * @param {string}      [opts.color]    Accent color hex.
   * @param {string}      [opts.label]    Display label.
   * @param {function}    [opts.onConnect]    (lfoId, element, routeId) => void
   * @param {function}    [opts.onDisconnect] (routeId) => void
   */
  constructor(container, lfoId, opts = {}) {
    injectStyles();
    this._lfoId   = lfoId;
    this._color   = opts.color ?? LFO_COLORS[_colorIndex++ % LFO_COLORS.length];
    this._label   = opts.label ?? `LFO ${++_labelIndex}`;
    this._onConnect    = opts.onConnect;
    this._onDisconnect = opts.onDisconnect;

    /** @type {Map<string, ModIndicator>} routeId → indicator */
    this._indicators = new Map();

    this._build(container);
    this._latestValue = 0;
    this._unsub = engine.subscribe((id, value) => {
      if (id === this._lfoId) {
        this._recordSample(value);
        this._updateLed(value);
        this._syncChainedSliders();
      }
    });
    this._rafHandle = null;
    this._destroyed = false;
    const rafLoop = () => {
      if (this._destroyed) return;
      this._rafDraw();
      this._rafHandle = requestAnimationFrame(rafLoop);
    };
    this._rafHandle = requestAnimationFrame(rafLoop);
  }

  // ── Build DOM ────────────────────────────────────────────────────────────

  _build(container) {
    const root = this._root = document.createElement('div');
    root.className = 'lfo-widget';
    root.style.setProperty('--lfo-color', this._color);

    // Header
    const header = document.createElement('div');
    header.className = 'lfo-header';

    const label = document.createElement('span');
    label.className = 'lfo-label';
    label.textContent = this._label;
    label.style.color = this._color;

    this._led = document.createElement('div');
    this._led.className = 'lfo-led';
    this._led.style.color = this._color;

    header.appendChild(label);
    header.appendChild(this._led);
    root.appendChild(header);

    // Canvas + shape buttons row
    const canvasRow = document.createElement('div');
    canvasRow.className = 'lfo-canvas-row';

    const canvas = this._canvas = document.createElement('canvas');
    canvas.className = 'lfo-canvas';
    canvas.width  = 140;
    canvas.height = 72;
    canvasRow.appendChild(canvas);

    // Shape buttons — 2 col × 4 row side panel (7 shapes + 1 filler = 8 slots)
    const shapesEl = this._shapesEl = document.createElement('div');
    shapesEl.className = 'lfo-shapes';
    const shapeList = [...SHAPES, null]; // null = filler to complete the 4×2 grid
    for (const shape of shapeList) {
      const btn = document.createElement('button');
      btn.className = 'lfo-shape-btn';
      if (!shape) {
        btn.style.visibility = 'hidden';
      } else {
        btn.textContent   = SHAPE_LABELS[shape] ?? shape.toUpperCase().slice(0, 3);
        btn.title         = shape;
        btn.dataset.shape = shape;
        btn.addEventListener('click', () => {
          engine.setParam(this._lfoId, 'shape', shape);
          this._refreshShapeButtons();
        });
      }
      shapesEl.appendChild(btn);
    }
    canvasRow.appendChild(shapesEl);
    root.appendChild(canvasRow);

    // Param sliders — 3-row × 2-col grid (rate, depth, phase, offset, jitter, skew)
    const params = document.createElement('div');
    params.className = 'lfo-params';

    this._rateInput   = this._addParam(params, 'Rate',   0.01, 20, 1,   0.01, 'baseRate',  v => `${v.toFixed(2)}Hz`);
    this._depthInput  = this._addParam(params, 'Depth',  0,    1,  1,   0.01, 'baseDepth', v => `${Math.round(v * 100)}%`);
    this._phaseInput  = this._addParam(params, 'Phase',  0,    1,  0,   0.01, 'phase',     v => `${Math.round(v * 360)}°`);
    this._offsetInput = this._addParam(params, 'Offs.',  -1,   1,  0,   0.01, 'offset',    v => v.toFixed(2));
    this._jitterInput = this._addParam(params, 'Jitter', 0,    1,  0,   0.01, 'jitter',    v => `${Math.round(v * 100)}%`);
    this._skewInput   = this._addParam(params, 'Skew',   0,    1,  0.5, 0.01, 'skew',      v => `${Math.round((v - 0.5) * 200)}%`);

    root.appendChild(params);

    // Connect handle
    const handle = this._handle = document.createElement('div');
    handle.className = 'lfo-connect-handle';
    handle.innerHTML = '⊕&nbsp; drag to assign';
    handle.title = 'Drag onto any slider or number input to modulate it.\nDrag onto another LFO\'s Rate/Depth slider to chain.';
    this._attachDragHandlers(handle);
    root.appendChild(handle);

    container.appendChild(root);
    this._refreshShapeButtons();
  }

  _addParam(container, labelText, min, max, defaultVal, step, param, fmt) {
    const group = document.createElement('div');
    group.className = 'lfo-param-group';

    const lbl = document.createElement('label');
    lbl.textContent = labelText;
    group.appendChild(lbl);

    const row = document.createElement('div');
    row.className = 'lfo-param-row';

    const input = document.createElement('input');
    input.type  = 'range';
    input.min   = min;
    input.max   = max;
    input.step  = step;
    input.value = defaultVal;
    // Mark as LFO param so drag-to-assign auto-promotes to chain route
    input.dataset.lfoId    = this._lfoId;
    input.dataset.lfoParam = param;

    const valEl = document.createElement('span');
    valEl.className = 'lfo-param-val';
    valEl.textContent = fmt(defaultVal);

    input.addEventListener('input', () => {
      const v = parseFloat(input.value);
      engine.setParam(this._lfoId, param, v);
      valEl.textContent = fmt(v);
    });

    // Also update display when LFO engine writes to this slider (chain modulation)
    input.addEventListener('lfo-update', () => {
      valEl.textContent = fmt(parseFloat(input.value));
    });

    row.appendChild(input);
    row.appendChild(valEl);
    group.appendChild(row);
    container.appendChild(group);
    return input;
  }

  _refreshShapeButtons() {
    const current = engine.getParam(this._lfoId, 'shape');
    for (const btn of this._shapesEl.querySelectorAll('.lfo-shape-btn')) {
      btn.classList.toggle('active', btn.dataset.shape === current);
    }
  }

  // ── Waveform drawing ─────────────────────────────────────────────────────
  //
  // _wfHistory: Float32Array(W) of actual LFO output samples — real history,
  // no formula extrapolation.  Each frame, intShift new samples are appended
  // (linearly interpolated from _wfPrevValue → currentValue) and the array
  // shifts left.  The pixel buffer scrolls in lock-step via getImageData /
  // putImageData, so only intShift columns are repainted.  Cursor + dot at
  // the right edge (px = W-1) — always the most-recent sample.

  /**
   * Reflect effective (post-chain-modulation) rate and depth onto the param
   * sliders so they visually track the modulated position.  Only touches the
   * DOM when the effective value actually differs from the displayed value to
   * avoid unnecessary repaints.
   */
  _syncChainedSliders() {
    const lfo = engine.getLFO(this._lfoId);
    if (!lfo) return;
    const pairs = [
      [this._rateInput,  lfo.rate],
      [this._depthInput, lfo.depth],
    ];
    for (const [input, eff] of pairs) {
      if (Math.abs(parseFloat(input.value) - eff) > 1e-6) {
        input.value = eff;
        input.dispatchEvent(new Event('lfo-update'));
      }
    }
  }

  _recordSample(currentValue) {
    this._latestValue = currentValue;
    const canvas = this._canvas;
    const W = canvas.width;
    const H = canvas.height;
    // Canvas shows a fixed 4-second time window regardless of LFO rate.
    const pxPerSec = W / 4;
    const now = performance.now();

    // ── Init on first call ────────────────────────────────────────────────
    if (!this._wfBuf) {
      const buf      = document.createElement('canvas');
      buf.width      = W;
      buf.height     = H;
      this._wfBuf    = buf;
      this._wfBufCtx = buf.getContext('2d', { willReadFrequently: true });
      this._wfHistory   = new Float32Array(W).fill(currentValue);
      this._wfSubpx     = 0;
      this._wfLastTime  = now;
      this._wfPrevValue = currentValue;
      this._wfNeedsFullRedraw = true;
    }

    // ── Compute how many new pixels to append ─────────────────────────────
    const dt = (now - this._wfLastTime) / 1000;
    this._wfLastTime = now;

    const totalPx  = dt * pxPerSec + this._wfSubpx;
    const intShift = Math.min(Math.floor(totalPx), W);
    this._wfSubpx  = totalPx - intShift;

    if (intShift > 0) {
      // Shift history left and append interpolated new samples on the right
      this._wfHistory.copyWithin(0, intShift);
      const prev = this._wfPrevValue;
      const cur  = currentValue;
      for (let i = 0; i < intShift; i++) {
        const t = (i + 1) / intShift;
        this._wfHistory[W - intShift + i] = prev + (cur - prev) * t;
      }
    }
    this._wfPrevValue = currentValue;

    // ── Paint offscreen pixel buffer ──────────────────────────────────────
    const bCtx = this._wfBufCtx;

    if (this._wfNeedsFullRedraw || intShift >= W) {
      this._wfNeedsFullRedraw = false;
      this._wfPaintFull(bCtx, W, H);
    } else if (intShift > 0) {
      this._wfPaintIncremental(bCtx, W, H, intShift);
    }
  }

  /** Composite _wfBuf → visible canvas + cursor dot. Called from RAF. */
  _rafDraw() {
    if (!this._wfBuf) return;
    const canvas = this._canvas;
    const W = canvas.width;
    const H = canvas.height;
    const currentValue = this._latestValue;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(this._wfBuf, 0, 0);

    const cursorX = W - 1;
    const color   = this._color;
    ctx.strokeStyle = `${color}50`;
    ctx.lineWidth   = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(cursorX, 0);
    ctx.lineTo(cursorX, H);
    ctx.stroke();
    ctx.setLineDash([]);

    const dotY = (1 - (currentValue + 1) / 2) * (H - 6) + 3;
    ctx.fillStyle   = color;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.arc(cursorX, dotY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  /** Full repaint of _wfBuf from _wfHistory. */
  _wfPaintFull(bCtx, W, H) {
    bCtx.fillStyle = '#050509';
    bCtx.fillRect(0, 0, W, H);
    this._wfDrawGrid(bCtx, W, H, 0, W);
    this._wfDrawHistoryStroke(bCtx, W, H, 0, W - 1);
  }

  /**
   * Scroll _wfBuf left by intShift, fill background+grid in new strip, then
   * draw only the new right-edge stroke from _wfHistory.
   */
  _wfPaintIncremental(bCtx, W, H, intShift) {
    const newX = W - intShift;

    const imgData = bCtx.getImageData(intShift, 0, newX, H);
    bCtx.putImageData(imgData, 0, 0);

    bCtx.fillStyle = '#050509';
    bCtx.fillRect(newX, 0, intShift, H);
    this._wfDrawGrid(bCtx, W, H, newX, W);

    // Extend stroke 1px into the already-painted region for a seamless join
    this._wfDrawHistoryStroke(bCtx, W, H, Math.max(0, newX - 1), W - 1);
  }

  _wfDrawGrid(bCtx, W, H, x0, x1) {
    bCtx.strokeStyle = '#111120';
    bCtx.lineWidth   = 1;
    bCtx.setLineDash([]);
    for (const gy of [H * 0.25, H * 0.5, H * 0.75]) {
      bCtx.beginPath();
      bCtx.moveTo(x0, gy);
      bCtx.lineTo(x1, gy);
      bCtx.stroke();
    }
  }

  /** Stroke _wfHistory[xFrom..xTo] onto bCtx. */
  _wfDrawHistoryStroke(bCtx, W, H, xFrom, xTo) {
    const color = this._color;
    bCtx.beginPath();
    bCtx.strokeStyle = color;
    bCtx.lineWidth   = 1.5;
    bCtx.shadowBlur  = 4;
    bCtx.shadowColor = color;
    for (let px = xFrom; px <= xTo; px++) {
      const val = this._wfHistory[px];
      const py  = (1 - (val + 1) / 2) * (H - 6) + 3;
      if (px === xFrom) bCtx.moveTo(px, py);
      else              bCtx.lineTo(px, py);
    }
    bCtx.stroke();
    bCtx.shadowBlur = 0;
  }

  _updateLed(value) {
    const brightness = Math.abs(value);
    this._led.style.opacity = 0.2 + brightness * 0.8;
    this._led.style.boxShadow = `0 0 ${4 + brightness * 8}px ${this._color}`;
  }

  // ── Drag-to-assign ───────────────────────────────────────────────────────

  _attachDragHandlers(handle) {
    let wire = null;
    let currentHighlight = null;
    let startRect = null;

    const start = (e) => {
      handle.setPointerCapture(e.pointerId);
      handle.classList.add('dragging');
      startRect = handle.getBoundingClientRect();
      wire = createDragWire(this._color);
      wire.setStart(startRect.left + startRect.width / 2, startRect.top + startRect.height / 2);
      wire.setEnd(e.clientX, e.clientY);
      e.preventDefault();
    };

    const move = (e) => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      wire.setEnd(e.clientX, e.clientY);

      const target = getModTarget(e.clientX, e.clientY, handle);
      if (target !== currentHighlight) {
        if (currentHighlight) {
          currentHighlight.classList.remove('lfo-drag-target');
          currentHighlight.style.removeProperty('--lfo-drag-color');
        }
        currentHighlight = target;
        if (target) {
          target.classList.add('lfo-drag-target');
          target.style.setProperty('--lfo-drag-color', this._color);
          wire.setValid(true);
        } else {
          wire.setValid(false);
        }
      }
    };

    const end = (e) => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      handle.releasePointerCapture(e.pointerId);
      handle.classList.remove('dragging');
      wire.remove();
      wire = null;

      if (currentHighlight) {
        currentHighlight.classList.remove('lfo-drag-target');
        currentHighlight.style.removeProperty('--lfo-drag-color');
        this._connectTo(currentHighlight);
        currentHighlight = null;
      }
    };

    handle.addEventListener('pointerdown', start);
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup',   end);
    handle.addEventListener('pointercancel', end);
  }

  // ── Connection management ────────────────────────────────────────────────

  _connectTo(element) {
    // Avoid duplicate element routes to the same element.
    for (const ind of this._indicators.values()) {
      if (engine.getRoute(ind.routeId)?.target === element) return;
    }

    // Avoid duplicate chain routes: check if a route from this LFO to the
    // same target LFO param already exists (element sliders carry data-lfo-id).
    if (element instanceof Element && element.dataset.lfoId) {
      const linkedId    = element.dataset.lfoId;
      const rawParam    = element.dataset.lfoParam ?? '';
      const mappedParam = rawParam === 'baseRate'  ? 'rate'  :
                          rawParam === 'baseDepth' ? 'depth' : rawParam;
      for (const route of engine.getAllRoutes()) {
        if (route.sourceId === this._lfoId &&
            route.targetType === 'lfo' &&
            route.target === linkedId &&
            route.targetParam === mappedParam) return;
      }
    }

    const routeId = engine.addRoute(this._lfoId, 'element', element, null, { depth: 0.5 });
    // addRoute returns null for self-modulation rejection.
    if (!routeId) return;

    // Check if the route was auto-promoted to a chain route.
    const route = engine.getRoute(routeId);
    if (!route) return;

    // For both element and chain routes, create a ModIndicator anchored to
    // the actual DOM element (for chain routes this is the param slider).
    const indicator = new ModIndicator(
      element, routeId, this._lfoId, this._color, this._label,
      (rid) => this.disconnectRoute(rid)
    );
    this._indicators.set(routeId, indicator);
    this._onConnect?.(this._lfoId, element, routeId);
  }

  /**
   * Programmatically connect this LFO to an element.
   * @param {HTMLElement} element
   * @param {object}      [opts]
   * @param {number}      [opts.depth=0.5]
   * @returns {string} routeId
   */
  connect(element, opts = {}) {
    const routeId = engine.addRoute(this._lfoId, 'element', element, null, opts);
    if (!routeId) return null;
    const route = engine.getRoute(routeId);
    if (!route || route.targetType === 'lfo') return routeId;

    const indicator = new ModIndicator(
      element, routeId, this._lfoId, this._color, this._label,
      (rid) => this.disconnectRoute(rid)
    );
    this._indicators.set(routeId, indicator);
    this._onConnect?.(this._lfoId, element, routeId);
    return routeId;
  }

  /**
   * Remove a specific modulation route.
   * @param {string} routeId
   */
  disconnectRoute(routeId) {
    engine.removeRoute(routeId);
    const ind = this._indicators.get(routeId);
    if (ind) {
      ind.destroy();
      this._indicators.delete(routeId);
    }
    this._onDisconnect?.(routeId);
  }

  /** Disconnect all routes from this widget. */
  disconnectAll() {
    for (const routeId of [...this._indicators.keys()]) {
      this.disconnectRoute(routeId);
    }
  }

  /** Tear down the widget and all its connections. */
  destroy() {
    this._destroyed = true;
    if (this._rafHandle != null) cancelAnimationFrame(this._rafHandle);
    this._unsub?.();
    this.disconnectAll();
    engine.destroyLFO(this._lfoId);
    this._root.remove();
  }

  get element()  { return this._root; }
  get lfoId()    { return this._lfoId; }
  get color()    { return this._color; }
  get label()    { return this._label; }
}
