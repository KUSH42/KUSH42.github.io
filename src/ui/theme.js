import { refreshThemeColors } from '../../components/threat-map/index.js';
import { refreshRadarTheme } from '../../components/pulse-radar/index.js';

export const THEMES = { '': 'MATRIX GREEN', gits: 'GHOST IN THE SHELL', amber: 'AMBER', phosphor: 'PHOSPHOR', blood: 'BLOOD' };

// References set by initTheme so applyTheme can use them
let _threatEl = null;
let _radarEl = null;
let _getTacticalInited = null;
let _termEl = null;
let _printLine = null;

export function applyTheme(name) {
  const html = document.documentElement;
  if (name === '' || name === 'matrixgreen') {
    delete html.dataset.theme;
  } else {
    html.dataset.theme = name;
  }
  document.querySelectorAll('.topbar__theme-btn').forEach(btn => {
    btn.classList.toggle('topbar__theme-btn--active', (btn.dataset.themeSet ?? '') === (name === 'matrixgreen' ? '' : name));
  });
  // Refresh Three.js material colors to match new CSS variables
  refreshThemeColors(_threatEl);
  if (_getTacticalInited && _getTacticalInited()) refreshThemeColors(document.getElementById('threatmap-tactical'));
  refreshRadarTheme(_radarEl);
}

export function initTheme({ threatEl, radarEl, getTacticalInited, termEl, printLine }) {
  _threatEl = threatEl;
  _radarEl = radarEl;
  _getTacticalInited = getTacticalInited;
  _termEl = termEl;
  _printLine = printLine;

  document.querySelectorAll('.topbar__theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.themeSet ?? '';
      applyTheme(t);
      _printLine(_termEl, `THEME: ${THEMES[t] ?? t.toUpperCase()}`, 'sys');
    });
  });
}
