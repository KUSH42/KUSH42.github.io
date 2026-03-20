import { mountStream, appendRow }   from '../components/data-stream.js';
import { glitchUpdate, initEkg, stepNeural } from '../components/neural-readout.js';
import { setValue as setTelemetryValue } from '../components/system-telemetry.js';
import { showAlert } from '../components/alert-banner.js';
import { initMatrix, activateEdge, deactivateEdge, pulseNode,
         setActiveNode as setMatrixActiveNode } from '../components/network-matrix.js';
import { initThreatMap, addNode, removeNode, setActiveNode,
         setThreatLevel, updateNodeLevel, focusNode, getCamera as getThreatCamera,
         pulseNode as pulseGlobeNode, spawnArc,
         setSatelliteMode, refreshThemeColors, getRevealAnim, getScene } from '../components/threat-map/index.js';
import { mountPanel }               from '../components/panel-shell.js';
import { setStepState }             from '../components/sequence-log.js';
import { initMatrixRain }           from '../components/matrix-rain.js';
import { initRadar, destroyRadar, refreshRadarTheme } from '../components/pulse-radar/index.js';
import { initTelescreenCRT }        from '../components/telescreen-crt.js';
import { initSigintFeed }           from '../components/sigint-feed.js';
import { initIntelFeed }            from '../components/intel-feed.js';
import { startDynamicStream }       from '../components/data-stream-content.js';
import { initGlobeSimulation, CITY_POOL, CITY_DATA, BOOT_CITIES, INITIAL_LEVELS, citySkyline }
                                     from '../components/globe-simulation.js';
import { initTactical }             from '../components/tactical-threatmap.js';
import { initNetworkFlow }          from '../components/network-flow.js';
import { printLine }                from '../components/command-terminal.js';

import { THEMES, applyTheme, initTheme } from './ui/theme.js';
import { startClock }                    from './ui/clock.js';
import { setupTerminal }                 from './ui/terminal-setup.js';
import { initRRPanel }                   from './ui/ring-reveal-panel.js';
import { buildGlobeOverlay }             from './ui/globe-overlay.js';
import { initMatrixControls }            from './ui/matrix-controls.js';
import { initTelescreenControls }        from './ui/telescreen-controls.js';
import { initParticleGlobe, getParticleGlobeState } from '../components/particle-globe/index.js';
import { initPGPanel }                   from './ui/particle-globe-panel.js';

// ── UTC clock ────────────────────────────────────────────────
startClock();

// ── Mount panels ─────────────────────────────────────────────
document.querySelectorAll('.s9-panel').forEach(mountPanel);

// ── Tab switching ─────────────────────────────────────────────
const tabs  = document.querySelectorAll('.topbar__tab[data-tab]');
const views = document.querySelectorAll('.center__view[data-view]');
let matrixInited = false;
let tacticalInited = false;
let particleGlobeInited = false;

const termEl = document.querySelector('.s9-terminal');

function switchTab(name) {
  tabs.forEach(t => {
    const active = t.dataset.tab === name;
    t.classList.toggle('topbar__tab--active', active);
    t.setAttribute('aria-selected', active);
  });
  views.forEach(v => {
    v.classList.toggle('center__view--active', v.dataset.view === name);
  });

  if (name === 'network' && !matrixInited) {
    matrixInited = true;
    _initNetworkView();
  }
  if (name === 'tactical' && !tacticalInited) {
    tacticalInited = true;
    _initTacticalView();
  }
  if (name === 'particle-globe' && !particleGlobeInited) {
    particleGlobeInited = true;
    _initParticleGlobeView();
  }

  printLine(termEl, `VIEW: ${name.toUpperCase()} ACTIVATED`, 'sys');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  tab.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTab(tab.dataset.tab); }
  });
});

// ── Sequence log simulation (Mission Timeline only now) ────────

function runSequence(steps, intervalMs, loop) {
  let idx = 0;
  function tick() {
    if (idx >= steps.length) {
      if (loop) { idx = 0; setTimeout(tick, intervalMs * 3); }
      return;
    }
    const { id, state } = steps[idx++];
    const el = document.getElementById(id);
    if (el) setStepState(el, state);
    setTimeout(tick, idx < steps.length ? intervalMs : intervalMs * 2);
  }
  tick();
}

// ── Feeds ────────────────────────────────────────────────────
initSigintFeed(document.getElementById('sigint-feed'));
initIntelFeed(document.getElementById('intel-feed'));

// Mission timeline: starts active at NETWORK BREACH, advances through the rest
setTimeout(() => {
  runSequence([
    { id: 'seq-breach',    state: 'complete' },
    { id: 'seq-extract',   state: 'active'   },
  ], 3000, false);
  setTimeout(() => {
    runSequence([
      { id: 'seq-extract', state: 'complete' },
      { id: 'seq-cover',   state: 'active'   },
    ], 3500, false);
    setTimeout(() => {
      runSequence([
        { id: 'seq-cover',   state: 'complete' },
        { id: 'seq-exfil',   state: 'active'   },
      ], 3000, false);
    }, 9000);
  }, 8000);
}, 5000);

// ── DataStream ────────────────────────────────────────────────
const streamEl = document.querySelector('.s9-stream');
mountStream(streamEl);
startDynamicStream(streamEl, appendRow);

// ── Telescreen Feed ──────────────────────────────────────────
const teleCRT = initTelescreenCRT(
  document.getElementById('ts-feed-src'),
  document.getElementById('ts-feed-canvas'),
  document.getElementById('ts-glow-canvas'),
);

// ── Telemetry metrics ──────────────────────────────────────────
const metrics = { cpu: 42, mem: 61, net: 12, ghost: 77, enc: 96 };
const teleCpu = document.getElementById('tele-cpu');
const teleMem = document.getElementById('tele-mem');
const teleNet = document.getElementById('tele-net');
const teleEnc = document.getElementById('tele-enc');

setInterval(() => {
  for (const k of Object.keys(metrics)) {
    metrics[k] = Math.max(5, Math.min(100, metrics[k] + (Math.random() - 0.5) * 6));
    metrics[k] = Math.round(metrics[k]);
  }
  setTelemetryValue(teleCpu, metrics.cpu);
  setTelemetryValue(teleMem, metrics.mem);
  setTelemetryValue(teleNet, metrics.net);
  setTelemetryValue(teleEnc, metrics.enc);
}, 2000);

// ── NeuralReadout + EKG ───────────────────────────────────────
const neuralEl   = document.getElementById('neural-01');
const ghostValEl = document.getElementById('ghost-val');
const cyberIdxEl = document.getElementById('cyber-index');
const neuralSyncEl = document.getElementById('neural-sync');
const ekgBpmEl   = document.getElementById('ekg-bpm');
const ekgHandle  = initEkg(document.getElementById('ekg-canvas'), document.getElementById('ekg-heart'));
let ghostCoeff   = 98.4;
for (let i = 0; i < 3; i++) ghostCoeff = stepNeural(neuralEl, ghostValEl, cyberIdxEl, neuralSyncEl, ekgBpmEl, ekgHandle);
setInterval(() => { ghostCoeff = stepNeural(neuralEl, ghostValEl, cyberIdxEl, neuralSyncEl, ekgBpmEl, ekgHandle); }, 3000);

// ── ThreatMap ─────────────────────────────────────────────────
const threatEl = document.querySelector('.s9-threatmap');
initThreatMap(threatEl, { autoRotate: true, bloomStrength: 0.4 });

// ── Proximity Radar ───────────────────────────────────────────
const radarEl = document.getElementById('proximity-radar');
const radar   = initRadar(radarEl, { threatLevel: 0 });

// ── Matrix Rain (after globe so canvas stacking is correct) ───
const rainColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--neon-green').trim() || '#00ff70';
const matrixRain = initMatrixRain(document.getElementById('matrix-rain-host'), {
  color:      rainColor,
  opacity:    0.45,
  syncCamera: getThreatCamera(threatEl),
});

document.getElementById('sat-toggle').addEventListener('change', (e) => {
  setSatelliteMode(threatEl, e.target.checked);
});

// ── Globe simulation ──────────────────────────────────────────
const { globeNodes } = initGlobeSimulation(threatEl, streamEl, termEl, {
  addNode, removeNode, updateNodeLevel, setThreatLevel,
  setActiveNode, focusNode, pulseGlobeNode, spawnArc,
  appendRow, printLine,
  setRadarThreatLevel: (v) => radar.setRadarThreatLevel(v),
});

// ── Theme system ──────────────────────────────────────────────
initTheme({
  threatEl,
  radarEl,
  getTacticalInited: () => tacticalInited,
  termEl,
  printLine,
});

// ── Alert listener ────────────────────────────────────────────
const alertHost = document.getElementById('alert-host');
document.addEventListener('s9:alert', (e) => {
  if (e.detail?.level === 'critical') {
    const src = e.detail.source ?? 'UNKNOWN';
    printLine(termEl, `⚠ CRITICAL ALERT: ${src}`, 'err');
    showAlert(alertHost, { level: 'critical', code: 'CRITICAL THREAT', message: src });
  }
});

// ── Node popup elements ───────────────────────────────────────
const nodePopup  = document.getElementById('node-popup');
const npCity     = document.getElementById('np-city');
const npSkyline  = document.getElementById('np-skyline');
const npCountry  = document.getElementById('np-country');
const npPop      = document.getElementById('np-pop');
const npCoords   = document.getElementById('np-coords');
const npThreat   = document.getElementById('np-threat');
const npStatus   = document.getElementById('np-status');

// ── Threat level → stream echo + node popup ───────────────────
threatEl.addEventListener('s9:threatmap-node-select', (e) => {
  const { nodeId, label, level, lat, lng } = e.detail;
  printLine(termEl,
    `NODE SELECT: ${label} — LEVEL ${level} — ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
    level >= 71 ? 'err' : level >= 41 ? 'warn' : 'info'
  );
  appendRow(streamEl, {
    timestamp: new Date().toISOString(),
    source: 'TGT',
    message: `TARGET LOCKED: ${label} THREAT=${level}`,
    alert: level >= 41,
  });

  // Update popup
  const info = CITY_DATA[nodeId] ?? { country: '—', pop: '—', status: 'UNKNOWN' };
  npCity.textContent = label;
  npSkyline.innerHTML = citySkyline(nodeId);
  npCountry.textContent = info.country;
  npPop.textContent = info.pop;
  npCoords.textContent = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  const threatLabel = level >= 70 ? 'CRITICAL' : level >= 40 ? 'ELEVATED' : 'LOW';
  npThreat.textContent = `${level} — ${threatLabel}`;
  npThreat.style.color = level >= 70 ? 'var(--text-alert)' : level >= 40 ? 'var(--neon-warn)' : 'var(--neon-green)';
  npStatus.textContent = info.status;
  // Show popup on the less-crowded side based on longitude
  nodePopup.classList.toggle('node-popup--left', lng > 60);
  nodePopup.setAttribute('aria-hidden', 'false');
  nodePopup.classList.add('node-popup--visible');
});

threatEl.addEventListener('s9:threatmap-node-deselect', () => {
  nodePopup.classList.remove('node-popup--visible');
  setTimeout(() => nodePopup.setAttribute('aria-hidden', 'true'), 260);
});

// ── CommandTerminal ───────────────────────────────────────────
setupTerminal({
  termEl,
  applyTheme,
  globeNodes,
  metrics: { ...metrics, get ghostCoeff() { return ghostCoeff; } },
  radar,
  threatEl,
  updateNodeLevel,
  setThreatLevel,
  setActiveNode,
  focusNode,
  CITY_POOL,
  CITY_DATA,
  citySkyline,
  npCity, npSkyline, npCountry, npPop, npCoords, npThreat, npStatus, nodePopup,
});

// ── Particle Globe panel ──────────────────────────────────────
const pgPanel = document.getElementById('pg-panel');

// ── Ring Reveal panel ─────────────────────────────────────────
const rrPanel = document.getElementById('rr-panel');

// ── Lazy-init views (called from switchTab) ───────────────────
function _initParticleGlobeView() {
  const pgEl = document.querySelector('[data-pg-host]');
  initParticleGlobe(pgEl);
  const pgState = getParticleGlobeState(pgEl);
  if (pgState) initPGPanel(pgState);
  setTimeout(() => pgPanel.classList.add('pg-visible'), 200);
}
function _initTacticalView() {
  initTactical(
    document.getElementById('threatmap-tactical'),
    BOOT_CITIES, INITIAL_LEVELS, CITY_POOL,
    { initThreatMap, addNode, removeNode, updateNodeLevel, setThreatLevel, setActiveNode, focusNode },
  );
}
function _initNetworkView() {
  initNetworkFlow(document.getElementById('flow-matrix'), {
    initMatrix, activateEdge, deactivateEdge, pulseNode,
    setActiveNode: setMatrixActiveNode,
  });
}
const rrAnim = getRevealAnim(threatEl);
initRRPanel(rrAnim);

// ── Globe overlay (lat/lon + geodesic wireframe) ──────────────
buildGlobeOverlay(threatEl);

// ── Matrix Rain controls ──────────────────────────────────────
initMatrixControls(matrixRain);

// ── Telescreen controls ───────────────────────────────────────
initTelescreenControls(teleCRT);

// ── H key toggles the ring reveal panel ──────────────────────
// ── I key toggles visibility of info/content panels ──────────
const INFO_PANEL_IDS = [
  'intel-feed-1', 'sys-metrics', 'seq-log-right',
  'neural-readout-1', 'operative-log', 'data-stream-1',
  'terminal-1', 'telescreen-1', 'pulse-radar-1',
];
const infoPanels = INFO_PANEL_IDS.map(id => document.querySelector(`[data-s9-id="${id}"]`));
const sOv = document.querySelector('.s9-ov');
let infoPanelsHidden = false;

window.addEventListener('keydown', e => {
  if (e.key === 'h' || e.key === 'H') {
    rrPanel.classList.toggle('rr-visible');
  } else if (e.key === 'p' || e.key === 'P') {
    pgPanel.classList.toggle('pg-visible');
  } else if (e.key === 'i' || e.key === 'I') {
    infoPanelsHidden = !infoPanelsHidden;
    infoPanels.forEach(el => el?.classList.toggle('s9-panel--i-hidden', infoPanelsHidden));
    sOv.classList.toggle('s9-ov--i-hidden', infoPanelsHidden);
  }
});
