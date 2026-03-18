/**
 * Theme color refresh for the threat-map globe.
 */

import { _state } from './state.js';
import { _readCSSColors, _levelColor } from './utils.js';

// ── refreshThemeColors ────────────────────────────────────────

/**
 * Re-read CSS custom properties and apply updated colors to all scene objects.
 * Call this after a theme change.
 *
 * @param {HTMLElement} element - .s9-threatmap root
 */
export function refreshThemeColors(element) {
  const state = _state.get(element);
  if (!state) return;

  const colors = _readCSSColors(true);  // force-refresh on theme change
  state.colors = colors;

  // Globe wireframe layers
  const globeColor = colors.neonCyan || '#00d48ddf';
  if (state.globeBack)  state.globeBack.material.color.set(globeColor);
  if (state.globeFront) state.globeFront.material.color.set(globeColor);

  // Geo lines (coast + border)
  if (state.geoLineMats) {
    const geoColor = colors.neonCyan || '#008410D0';
    for (const mat of state.geoLineMats) mat.color.set(geoColor);
  }

  // Node meshes
  for (const record of state.nodeMap.values()) {
    const hex = _levelColor(record.level, colors);
    record.mesh.material.color.set(hex);
    record.mesh.material.emissive.set(hex);
  }
}
