/**
 * Shared state registry and constants for the threat-map component.
 */

export const LOW_THRESHOLD = 40;
export const MID_THRESHOLD = 70;
export const GLOBE_RADIUS = 1.0;

/** @type {WeakMap<HTMLElement, object>} */
export const _state = new WeakMap();

// TopoJSON cache — shared between geo-lines and satellite modules.
// Wrapped in accessors because ES module `export let` re-assignment
// is only visible via live bindings, which can be confusing.
let _topoCache = null;
export function getTopoCache() { return _topoCache; }
export function setTopoCache(val) { _topoCache = val; }
