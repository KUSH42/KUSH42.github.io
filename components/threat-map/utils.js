/**
 * Shared utility functions for the threat-map component.
 */

import * as THREE from 'three';
import { LOW_THRESHOLD, MID_THRESHOLD } from './state.js';

// ── latLngToVec3 ──────────────────────────────────────────────

/**
 * Convert latitude/longitude to a 3D vector on the globe surface.
 *
 * @param {number} lat - Latitude in degrees (-90 to 90)
 * @param {number} lng - Longitude in degrees (-180 to 180)
 * @param {number} [radius=1.03] - Distance from globe center
 * @returns {THREE.Vector3}
 */
export function latLngToVec3(lat, lng, radius = 1.03) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ── CSS color reader (cached) ──────────────────────────────────

let _colorCache = null;
let _colorCacheTime = 0;

export function _readCSSColors(force = false) {
  const now = Date.now();
  if (!force && _colorCache && now - _colorCacheTime < 500) return _colorCache;
  const style = getComputedStyle(document.documentElement);
  _colorCache = {
    neonCyan:    style.getPropertyValue('--neon-cyan').trim(),
    neonGreen:   style.getPropertyValue('--neon-green').trim(),
    neonWarn:    style.getPropertyValue('--neon-warn').trim(),
    neonAlert:   style.getPropertyValue('--neon-alert').trim(),
    neonSelect:  style.getPropertyValue('--neon-select').trim() || '#00ffff',
  };
  _colorCacheTime = now;
  return _colorCache;
}

// ── Node color by threat level ────────────────────────────────

export function _levelColor(level, colors) {
  if (level <= LOW_THRESHOLD) return colors.neonGreen;
  if (level <= MID_THRESHOLD) return colors.neonWarn;
  return colors.neonAlert;
}

// ── Lat/lng to equirectangular pixel coordinate ───────────────

export function _llToPx(lat, lng, W, H) {
  return [(lng + 180) / 360 * W, (90 - lat) / 180 * H];
}
