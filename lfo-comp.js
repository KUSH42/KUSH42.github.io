/**
 * lfo-comp.js — Public API for the LFO modulation component.
 *
 * Quick start:
 *
 *   import { createLFO } from './lfo-comp.js';
 *
 *   // 1. Create an LFO panel in a container element:
 *   const { widget } = createLFO(document.querySelector('#lfo-panel'));
 *
 *   // 2. Drag the "⊕ drag to assign" handle onto any <input type=range>
 *   //    or <input type=number> to wire up modulation.
 *
 *   // 3. Programmatic connection (optional):
 *   widget.connect(document.querySelector('#my-slider'), { depth: 0.7 });
 *
 *   // 4. Chain LFOs — drag LFO 2's handle onto LFO 1's Rate slider,
 *   //    or call:
 *   engine.addRoute(lfo2Id, 'lfo', lfo1Id, 'rate', { depth: 0.4 });
 *
 * Re-exports the engine singleton and UI classes for advanced use.
 */

import { engine, SHAPES, seededRand, smoothRand } from './lfo-engine.js';
import { LFOWidget, ModIndicator, injectStyles, LFO_COLORS } from './lfo-ui.js';

export { engine, SHAPES, seededRand, smoothRand };
export { LFOWidget, ModIndicator, injectStyles, LFO_COLORS };

// Registry so disconnect() can clean up the ModIndicator badge.
// Maps routeId → LFOWidget that owns it.
const _widgetByRoute = new Map();

let _count = 0;

/**
 * Create a fully wired LFO widget.
 *
 * @param {HTMLElement|object} containerOrOpts
 *   If an HTMLElement, the widget is appended to it and opts is the second arg.
 *   If an object, treated as opts — caller is responsible for appending widget.element.
 * @param {object} [opts]
 * @param {string}   [opts.shape='sine']   Initial waveform shape.
 * @param {number}   [opts.rate=1]         Initial rate in Hz.
 * @param {number}   [opts.depth=1]        Initial depth 0–1.
 * @param {number}   [opts.phase=0]        Initial phase offset 0–1.
 * @param {number}   [opts.offset=0]       DC offset -1–1.
 * @param {string}   [opts.color]          Accent color. Auto-assigned if omitted.
 * @param {string}   [opts.label]          Widget label. Auto-assigned if omitted.
 * @param {function} [opts.onConnect]      Called when a connection is made.
 * @param {function} [opts.onDisconnect]   Called when a connection is removed.
 *
 * @returns {{ lfoId: string, widget: LFOWidget }}
 */
export function createLFO(containerOrOpts = {}, opts = {}) {
  let container, engineOpts, uiOpts;

  if (containerOrOpts instanceof Element) {
    container  = containerOrOpts;
    engineOpts = opts;
    uiOpts     = opts;
  } else {
    container  = null;
    engineOpts = containerOrOpts;
    uiOpts     = containerOrOpts;
  }

  if (!uiOpts.label) {
    uiOpts = { ...uiOpts, label: `LFO ${++_count}` };
  }
  if (!uiOpts.color) {
    uiOpts = { ...uiOpts, color: LFO_COLORS[(_count - 1) % LFO_COLORS.length] };
  }

  // Wrap caller callbacks to maintain _widgetByRoute registry.
  const callerOnConnect    = uiOpts.onConnect;
  const callerOnDisconnect = uiOpts.onDisconnect;

  uiOpts = {
    ...uiOpts,
    onConnect: (lfoId, el, routeId) => {
      _widgetByRoute.set(routeId, widget); // eslint-disable-line no-use-before-define
      callerOnConnect?.(lfoId, el, routeId);
    },
    onDisconnect: (routeId) => {
      _widgetByRoute.delete(routeId);
      callerOnDisconnect?.(routeId);
    },
  };

  const lfoId = engine.createLFO(engineOpts);
  const div   = container ?? document.createElement('div');
  const widget = new LFOWidget(div, lfoId, uiOpts);

  return { lfoId, widget };
}

/**
 * Programmatically connect an LFO to an HTML element.
 * Equivalent to calling widget.connect(element, opts).
 *
 * @param {LFOWidget}   widget
 * @param {HTMLElement} element
 * @param {object}      [opts]
 * @param {number}      [opts.depth=0.5]
 * @returns {string|null} routeId, or null if connection was rejected.
 */
export function connect(widget, element, opts = {}) {
  return widget.connect(element, opts);
}

/**
 * Remove a modulation route and its UI indicator.
 * Prefer calling widget.disconnectRoute(routeId) directly when you have the widget.
 * This function handles programmatic routes created via connect() or drag-to-assign.
 *
 * @param {string} routeId
 */
export function disconnect(routeId) {
  const widget = _widgetByRoute.get(routeId);
  if (widget) {
    // Goes through the widget so the ModIndicator badge is also removed.
    widget.disconnectRoute(routeId);
  } else {
    // Fallback for engine-only routes (e.g. direct engine.addRoute calls).
    engine.removeRoute(routeId);
  }
}

/**
 * Get all currently active modulation routes.
 * @returns {object[]}
 */
export function getRoutes() {
  return engine.getAllRoutes();
}
