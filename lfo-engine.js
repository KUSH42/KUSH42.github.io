/**
 * lfo-engine.js — Core LFO math engine, no DOM dependencies.
 *
 * Manages LFO instances, a global RAF tick loop, and a modulation routing
 * graph. Routes can target HTML elements (range/number inputs) or other
 * LFO parameters (for chaining).
 *
 * Usage:
 *   import { engine, SHAPES } from './lfo-engine.js';
 *   const id = engine.createLFO({ shape: 'sine', rate: 2 });
 *   const routeId = engine.addRoute(id, 'element', sliderEl, null, { depth: 0.5 });
 */

export const SHAPES = ['sine', 'triangle', 'saw', 'rsaw', 'square', 'random', 'smooth'];

// ─── Waveform math ───────────────────────────────────────────────────────────

/** Deterministic pseudo-random in [-1, 1] for a given integer seed. */
export function seededRand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/** Smoothly interpolated random (cubic Hermite) for non-integer phase. */
export function smoothRand(seed, phase) {
  const i0 = Math.floor(phase);
  const t = phase - i0;
  const v0 = seededRand(seed + i0);
  const v1 = seededRand(seed + i0 + 1);
  const st = t * t * (3 - 2 * t); // smoothstep
  return v0 + (v1 - v0) * st;
}

/**
 * Piecewise-linear phase skew — repositions the midpoint of a 0–1 fractional phase.
 * skew = 0.5 → symmetric (no change).
 * skew < 0.5 → ascending flank compressed (peak shifts left).
 * skew > 0.5 → descending flank compressed (peak shifts right).
 * @param {number} frac  Fractional phase in [0, 1).
 * @param {number} skew  Skew amount in [0, 1].
 * @returns {number} Skewed fractional phase in [0, 1).
 */
export function applySkew(frac, skew) {
  if (skew === 0.5) return frac;
  const s = Math.max(0.001, Math.min(0.999, skew));
  return frac < s ? frac / s * 0.5 : 0.5 + (frac - s) / (1 - s) * 0.5;
}

export const SHAPE_FN = {
  sine:     p => Math.sin(p * Math.PI * 2),
  triangle: p => 1 - 4 * Math.abs(((p + 0.25) % 1 + 1) % 1 - 0.5),
  saw:      p => 2 * ((p % 1 + 1) % 1) - 1,
  rsaw:     p => 1 - 2 * ((p % 1 + 1) % 1),
  square:   p => (Math.sin(p * Math.PI * 2) >= 0 ? 1 : -1),
};

// ─── LFOEngine ───────────────────────────────────────────────────────────────

let _nextId = 0;

export class LFOEngine {
  constructor() {
    /** @type {Map<string, LFOState>} */
    this._lfos = new Map();
    /** @type {Map<string, RouteState>} */
    this._routes = new Map();
    /** @type {Map<HTMLElement, ElementState>} */
    this._elementStates = new Map();
    /** @type {Set<function>} */
    this._subscribers = new Set();

    this._lastTs = null;
    this._rafId = null;
    this._running = false;
    this._tick = this._tick.bind(this);
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTs = null;
    this._rafId = requestAnimationFrame(this._tick);
  }

  stop() {
    this._running = false;
    if (this._rafId != null) cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }

  // ── LFO management ────────────────────────────────────────────────────────

  /**
   * Create a new LFO instance.
   * @param {object} opts
   * @param {string}  [opts.shape='sine']     Waveform shape. One of SHAPES.
   * @param {number}  [opts.rate=1]           Frequency in Hz.
   * @param {number}  [opts.depth=1]          Modulation depth multiplier 0–1.
   * @param {number}  [opts.phase=0]          Initial phase offset 0–1.
   * @param {number}  [opts.offset=0]         DC offset added to output, -1–1.
   * @param {boolean} [opts.bipolar=true]     If false, output is remapped 0–1.
   * @returns {string} LFO id.
   */
  createLFO(opts = {}) {
    const id = `lfo_${_nextId++}`;
    /** @type {LFOState} */
    const state = {
      id,
      shape:        opts.shape   ?? 'sine',
      baseRate:     opts.rate    ?? 1.0,
      baseDepth:    opts.depth   ?? 1.0,
      phase:        opts.phase   ?? 0.0,
      offset:       opts.offset  ?? 0.0,
      bipolar:      opts.bipolar ?? true,
      jitter:       opts.jitter  ?? 0.0,   // 0=steady, 1=max timing randomness
      skew:         opts.skew    ?? 0.5,   // 0.5=symmetric; 0–1 shifts the waveform midpoint
      // Effective params (may differ when being modulated by another LFO)
      rate:         opts.rate    ?? 1.0,
      depth:        opts.depth   ?? 1.0,
      // Running state
      currentPhase: opts.phase   ?? 0.0,
      currentValue: 0,
      // Random shape state
      seed:         Math.floor(Math.random() * 9999),
      shValue:      0,
      shLastCycle:  -1,
      // Jitter state: per-cycle rate multiplier for timing randomness
      jitterRateMult:  1.0,
      jitterLastCycle: -1,
    };
    this._lfos.set(id, state);
    this.start();
    return id;
  }

  /**
   * Remove an LFO and all its routes.
   * @param {string} id
   */
  destroyLFO(id) {
    // Collect first — mutating _routes while iterating it skips entries.
    const toRemove = [];
    for (const [routeId, route] of this._routes) {
      if (route.sourceId === id) toRemove.push(routeId);
    }
    for (const routeId of toRemove) this.removeRoute(routeId);
    this._lfos.delete(id);
  }

  // ── Route management ──────────────────────────────────────────────────────

  /**
   * Add a modulation route.
   *
   * For element routes: LFO modulates an HTML input element.
   *   engine.addRoute(lfoId, 'element', inputEl, null, { depth: 0.5 });
   *
   * For LFO-chain routes: LFO modulates another LFO's rate or depth.
   *   engine.addRoute(lfoId, 'lfo', targetLfoId, 'rate', { depth: 0.3 });
   *
   * @param {string}                sourceId
   * @param {'element'|'lfo'}       targetType
   * @param {HTMLElement|string}    target      Element or target LFO id.
   * @param {string|null}           targetParam 'rate'|'depth' for lfo, null for element.
   * @param {object}                opts
   * @param {number}  [opts.depth=0.5]  Modulation depth 0–1.
   * @param {number}  [opts.min]        Override element min.
   * @param {number}  [opts.max]        Override element max.
   * @param {number}  [opts.step]       Override element step.
   * @returns {string|null} Route id, or null if the route was rejected (e.g. self-modulation).
   */
  addRoute(sourceId, targetType, target, targetParam, opts = {}) {
    // If the element has data-lfo-id/data-lfo-param, auto-promote to lfo route
    if (targetType === 'element' && target instanceof Element) {
      const linkedLfoId = target.dataset.lfoId;
      const linkedParam = target.dataset.lfoParam;
      if (linkedLfoId && linkedParam && this._lfos.has(linkedLfoId)) {
        targetType  = 'lfo';
        target      = linkedLfoId;
        targetParam = linkedParam === 'baseRate'  ? 'rate'  :
                      linkedParam === 'baseDepth' ? 'depth' : linkedParam;
      }
    }

    // Prevent self-modulation (LFO modulating its own rate/depth).
    if (targetType === 'lfo' && target === sourceId) return null;

    const routeId = `route_${_nextId++}`;

    /** @type {RouteState} */
    const route = {
      id: routeId,
      sourceId,
      targetType,
      target,
      targetParam,
      depth:   opts.depth ?? 0.5,
      enabled: true,
    };
    this._routes.set(routeId, route);

    if (targetType === 'element') {
      this._initElementState(target, opts);
      this._elementStates.get(target).routeIds.add(routeId);
    }

    return routeId;
  }

  /**
   * Remove a modulation route.
   * @param {string} routeId
   */
  removeRoute(routeId) {
    const route = this._routes.get(routeId);
    if (!route) return;
    if (route.targetType === 'element') {
      const state = this._elementStates.get(route.target);
      if (state) {
        state.routeIds.delete(routeId);
        if (state.routeIds.size === 0) {
          this._cleanupElementState(route.target);
        }
      }
    }
    this._routes.delete(routeId);
  }

  /**
   * Set the depth of an existing route.
   * @param {string} routeId
   * @param {number} depth  0–1
   */
  setRouteDepth(routeId, depth) {
    const route = this._routes.get(routeId);
    if (route) route.depth = Math.max(0, Math.min(1, depth));
  }

  /**
   * Enable or disable a route without removing it.
   * @param {string}  routeId
   * @param {boolean} enabled
   */
  setRouteEnabled(routeId, enabled) {
    const route = this._routes.get(routeId);
    if (route) route.enabled = enabled;
  }

  // ── LFO parameter access ──────────────────────────────────────────────────

  /**
   * Set a parameter on an LFO.
   * @param {string} lfoId
   * @param {string} param   'shape'|'rate'|'depth'|'phase'|'offset'|'bipolar'
   * @param {*}      value
   */
  setParam(lfoId, param, value) {
    const lfo = this._lfos.get(lfoId);
    if (!lfo) return;
    lfo[param] = value;
    // Keep base params in sync when set directly
    if (param === 'rate')  lfo.baseRate  = value;
    if (param === 'depth') lfo.baseDepth = value;
  }

  /**
   * Get a parameter from an LFO.
   * @param {string} lfoId
   * @param {string} param
   * @returns {*}
   */
  getParam(lfoId, param) {
    return this._lfos.get(lfoId)?.[param];
  }

  /** Get the current output value of an LFO. @param {string} lfoId @returns {number} */
  getValue(lfoId) {
    return this._lfos.get(lfoId)?.currentValue ?? 0;
  }

  // ── Observation ───────────────────────────────────────────────────────────

  /**
   * Subscribe to tick notifications. Called each frame for every LFO.
   * @param {function(lfoId: string, value: number): void} fn
   * @returns {function} Unsubscribe callback.
   */
  subscribe(fn) {
    this._subscribers.add(fn);
    return () => this._subscribers.delete(fn);
  }

  // ── Inspection ────────────────────────────────────────────────────────────

  getLFOs() { return [...this._lfos.values()]; }
  getLFO(id) { return this._lfos.get(id); }
  getAllRoutes() { return [...this._routes.values()]; }
  getRoute(id) { return this._routes.get(id); }

  getRoutesByElement(element) {
    return [...(this._elementStates.get(element)?.routeIds ?? [])]
      .map(id => this._routes.get(id))
      .filter(Boolean);
  }

  getElementMeta(element) {
    return this._elementStates.get(element);
  }

  // ── Internal ──────────────────────────────────────────────────────────────

  _initElementState(element, opts) {
    if (this._elementStates.has(element)) return;
    const min  = opts.min  ?? parseFloat(element.getAttribute('min')  ?? '0');
    const max  = opts.max  ?? parseFloat(element.getAttribute('max')  ?? '1');
    const step = opts.step ?? parseFloat(element.getAttribute('step') ?? '0');
    const parsed = parseFloat(element.value);
    const baseValue = isNaN(parsed) ? (min + max) / 2 : parsed;

    const onUserInput = () => {
      const state = this._elementStates.get(element);
      if (!state) return;
      const v = parseFloat(element.value);
      // Keep previous baseValue if the input contains invalid text (NaN).
      if (!isNaN(v)) state.baseValue = v;
    };
    element.addEventListener('input',  onUserInput);
    element.addEventListener('change', onUserInput);

    this._elementStates.set(element, {
      min, max, step,
      baseValue,
      onUserInput,
      routeIds: new Set(),
    });
  }

  _cleanupElementState(element) {
    const state = this._elementStates.get(element);
    if (!state) return;
    element.removeEventListener('input',  state.onUserInput);
    element.removeEventListener('change', state.onUserInput);
    this._elementStates.delete(element);
  }

  _computeValue(lfo, dt) {
    const rate = Math.max(0.001, lfo.rate);
    // Jitter: at each new cycle, pick a random rate multiplier so different
    // cycles visibly run faster or slower (per-cycle timing randomness).
    if (lfo.jitter > 0) {
      const evalCycle = Math.floor(((lfo.currentPhase + lfo.phase) % 1e7 + 1e7) % 1e7) & 0xFFFF;
      if (evalCycle !== lfo.jitterLastCycle) {
        lfo.jitterLastCycle = evalCycle;
        lfo.jitterRateMult = Math.max(0.2, 1 + (Math.random() * 2 - 1) * lfo.jitter * 0.8);
      }
    }
    const jitterMult = lfo.jitter > 0 ? lfo.jitterRateMult : 1;
    lfo.currentPhase += rate * dt * jitterMult;
    // Prevent float accumulation over long sessions
    if (lfo.currentPhase > 1e7) lfo.currentPhase -= 1e7;

    const phaseOff = ((lfo.currentPhase + lfo.phase) % 1e7 + 1e7) % 1e7;
    // Skew: warp fractional phase before evaluating the shape.
    const intPart    = Math.floor(phaseOff);
    const skewedFrac = applySkew(phaseOff - intPart, lfo.skew);
    const p          = intPart + skewedFrac;
    let raw;

    if (lfo.shape === 'random') {
      // Reduce cycle index to 16-bit range so seededRand never receives an
      // argument large enough to lose sin() precision (>~1e8 degrades quality).
      const cycle = intPart & 0xFFFF;
      if (cycle !== lfo.shLastCycle) {
        lfo.shValue = seededRand(lfo.seed + cycle);
        lfo.shLastCycle = cycle;
      }
      raw = lfo.shValue;
    } else if (lfo.shape === 'smooth') {
      raw = smoothRand(lfo.seed, (intPart & 0xFFFF) + skewedFrac);
    } else {
      raw = (SHAPE_FN[lfo.shape] ?? SHAPE_FN.sine)(p);
    }

    let value = lfo.offset + lfo.depth * raw;
    if (!lfo.bipolar) value = (value + 1) * 0.5; // remap to 0–1

    lfo.currentValue = value;
    return value;
  }

  _tick(ts) {
    if (!this._running) return;
    this._rafId = requestAnimationFrame(this._tick);

    const dt = this._lastTs === null ? 0 : Math.min((ts - this._lastTs) / 1000, 0.1);
    this._lastTs = ts;

    // Reset effective params before chain modulation so chains compose cleanly
    for (const lfo of this._lfos.values()) {
      lfo.rate  = lfo.baseRate;
      lfo.depth = lfo.baseDepth;
    }

    // Pass 1: apply LFO→LFO chain routes using previous frame values
    for (const route of this._routes.values()) {
      if (!route.enabled || route.targetType !== 'lfo') continue;
      const src = this._lfos.get(route.sourceId);
      const tgt = this._lfos.get(route.target);
      if (!src || !tgt) continue;
      if (route.targetParam === 'rate') {
        tgt.rate = Math.max(0.001, tgt.baseRate * (1 + src.currentValue * route.depth));
      } else if (route.targetParam === 'depth') {
        tgt.depth = Math.max(0, Math.min(1, tgt.baseDepth + src.currentValue * route.depth * 0.5));
      }
    }

    // Pass 2: advance all LFOs and compute new values
    if (dt > 0) {
      for (const lfo of this._lfos.values()) {
        this._computeValue(lfo, dt);
      }
    }

    // Notify UI subscribers
    for (const fn of this._subscribers) {
      for (const lfo of this._lfos.values()) fn(lfo.id, lfo.currentValue);
    }

    // Pass 3: apply element routes
    for (const route of this._routes.values()) {
      if (!route.enabled || route.targetType !== 'element') continue;
      const src  = this._lfos.get(route.sourceId);
      const el   = route.target;
      const meta = this._elementStates.get(el);
      if (!src || !meta) continue;

      const range     = meta.max - meta.min;
      const modAmount = src.currentValue * route.depth * range * 0.5;
      let newVal = meta.baseValue + modAmount;
      newVal = Math.max(meta.min, Math.min(meta.max, newVal));
      if (meta.step > 0) {
        newVal = Math.round(newVal / meta.step) * meta.step;
        // Re-clamp: rounding can push value fractionally outside [min, max].
        newVal = Math.max(meta.min, Math.min(meta.max, newVal));
      }

      // Only update if value actually changed (avoid unnecessary repaints)
      if (parseFloat(el.value) !== newVal) {
        el.value = newVal;
        el.dispatchEvent(new Event('lfo-update', { bubbles: false }));
      }
    }
  }
}

/** Global engine singleton — import and use directly. */
export const engine = new LFOEngine();
