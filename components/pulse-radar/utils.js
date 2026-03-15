/**
 * components/pulse-radar/utils.js
 * Constants, math helpers, theme reading, sonar audio, and state registry.
 */

import * as THREE from 'three';

export const TAU       = Math.PI * 2;
export const POOL_SIZE = 32;

// ── State registry ───────────────────────────────────────────────
export const _state = new WeakMap();

// ── Contact ID counter ───────────────────────────────────────────
let _contactCounter = 0;
export function nextContactId() {
  return `T-${String(++_contactCounter).padStart(2, '0')}`;
}

// ── Math helpers ─────────────────────────────────────────────────
export function _css(prop) {
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}

export function _c3(cssColor) {
  const c = new THREE.Color().setStyle(cssColor || '#000000');
  return [c.r, c.g, c.b];
}

export function _lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export function _angleDiff(a, b) {
  const d = ((a - b) % TAU + TAU) % TAU;
  return d > Math.PI ? d - TAU : d;
}

// ── Theme reading ────────────────────────────────────────────────
export function _readTheme() {
  return {
    neonCyan:    _css('--neon-cyan')    || '#00f0ff',
    neonGreen:   _css('--neon-green')   || '#00ff9d',
    neonAlert:   _css('--neon-alert')   || '#ff00cc',
    neonWarn:    _css('--neon-warn')    || '#ffb300',
    voidColor:   _css('--void')         || '#05080f',
  };
}

// Ring pop duration = sweepPeriod − 0.50s.  ringHzBase is stored per-state.
export function _ringHz(state, type) {
  const base = state.ringHzBase;
  if (type === 'friendly') return base * 0.6;
  if (type === 'hostile')  return base * 1.5;
  return base;
}

export function _randomType(t) {
  const hp = _lerp(0.10, 0.85, t);
  const fp = _lerp(0.30, 0.05, t);
  const r  = Math.random();
  if (r < hp) return 'hostile';
  if (r < hp + fp) return 'friendly';
  return 'neutral';
}

export function _typeFloat(type) {
  if (type === 'friendly') return 0.0;
  if (type === 'neutral')  return 1.0;
  if (type === 'hostile')  return 2.0;
  return 3.0;
}

// ── Sonar ping (MP3 sample) ──────────────────────────────────────
let _sonarAudio = null;
let _sonarMuted = false;

export function _playSonarPing(volume = 0.08) {
  if (_sonarMuted) return;
  try {
    if (!_sonarAudio) {
      _sonarAudio = new Audio('/sonar-ping.mp3');
    }
    _sonarAudio.volume = Math.min(1, Math.max(0, volume));
    _sonarAudio.currentTime = 0;
    _sonarAudio.play().catch(() => {});
  } catch (_) { /* audio not available */ }
}

export function toggleSonarMute() {
  _sonarMuted = !_sonarMuted;
}
