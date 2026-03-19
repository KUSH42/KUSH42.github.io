/**
 * components/globe-simulation.js
 * Globe simulation — city nodes, boot sequence, threat escalation, arc traffic.
 *
 * Usage:
 *   import { initGlobeSimulation } from './components/globe-simulation.js';
 *   const { globeNodes, CITY_POOL, CITY_DATA, BOOT_CITIES, INITIAL_LEVELS }
 *     = initGlobeSimulation(threatEl, streamEl, termEl, deps);
 */

function _rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const CITY_POOL = [
  { id: 'n-tokyo',     lat:  35.68, lng:  139.69, label: 'TOKYO'      },
  { id: 'n-moscow',    lat:  55.75, lng:   37.62, label: 'MOSCOW'     },
  { id: 'n-beijing',   lat:  39.91, lng:  116.39, label: 'BEIJING'    },
  { id: 'n-london',    lat:  51.51, lng:   -0.13, label: 'LONDON'     },
  { id: 'n-nyc',       lat:  40.71, lng:  -74.00, label: 'NEW YORK'   },
  { id: 'n-sydney',    lat: -33.87, lng:  151.21, label: 'SYDNEY'     },
  { id: 'n-dubai',     lat:  25.20, lng:   55.27, label: 'DUBAI'      },
  { id: 'n-saopaulo',  lat: -23.55, lng:  -46.63, label: 'SÃO PAULO'  },
  { id: 'n-paris',     lat:  48.86, lng:    2.35, label: 'PARIS'      },
  { id: 'n-seoul',     lat:  37.57, lng:  126.98, label: 'SEOUL'      },
  { id: 'n-cairo',     lat:  30.05, lng:   31.24, label: 'CAIRO'      },
  { id: 'n-berlin',    lat:  52.52, lng:   13.41, label: 'BERLIN'     },
  { id: 'n-mumbai',    lat:  19.08, lng:   72.88, label: 'MUMBAI'     },
  { id: 'n-toronto',   lat:  43.65, lng:  -79.38, label: 'TORONTO'    },
  { id: 'n-singapore', lat:   1.35, lng:  103.82, label: 'SINGAPORE'  },
  { id: 'n-nairobi',   lat:  -1.29, lng:   36.82, label: 'NAIROBI'    },
  { id: 'n-istanbul',  lat:  41.01, lng:   28.97, label: 'ISTANBUL'   },
  { id: 'n-lagos',     lat:   6.52, lng:    3.38, label: 'LAGOS'      },
];

export const CITY_DATA = {
  'n-tokyo':     { country: 'JAPAN',      pop: '13.96M', status: 'FINANCIAL HUB'  },
  'n-moscow':    { country: 'RUSSIA',     pop: '12.51M', status: 'RESTRICTED'     },
  'n-beijing':   { country: 'CHINA',      pop: '21.54M', status: 'RESTRICTED'     },
  'n-london':    { country: 'UK',         pop: '8.98M',  status: 'ALLIED NODE'    },
  'n-nyc':       { country: 'USA',        pop: '8.34M',  status: 'ALLIED NODE'    },
  'n-sydney':    { country: 'AUSTRALIA',  pop: '5.31M',  status: 'ALLIED NODE'    },
  'n-dubai':     { country: 'UAE',        pop: '3.33M',  status: 'NEUTRAL ZONE'   },
  'n-saopaulo':  { country: 'BRAZIL',     pop: '12.33M', status: 'MONITORED'      },
  'n-paris':     { country: 'FRANCE',     pop: '2.15M',  status: 'ALLIED NODE'    },
  'n-seoul':     { country: 'S.KOREA',    pop: '9.78M',  status: 'ALLIED NODE'    },
  'n-cairo':     { country: 'EGYPT',      pop: '10.08M', status: 'MONITORED'      },
  'n-berlin':    { country: 'GERMANY',    pop: '3.66M',  status: 'ALLIED NODE'    },
  'n-mumbai':    { country: 'INDIA',      pop: '20.67M', status: 'MONITORED'      },
  'n-toronto':   { country: 'CANADA',     pop: '2.93M',  status: 'ALLIED NODE'    },
  'n-singapore': { country: 'SINGAPORE',  pop: '5.45M',  status: 'NEUTRAL ZONE'   },
  'n-nairobi':   { country: 'KENYA',      pop: '4.40M',  status: 'MONITORED'      },
  'n-istanbul':  { country: 'TURKEY',     pop: '15.46M', status: 'NEUTRAL ZONE'   },
  'n-lagos':     { country: 'NIGERIA',    pop: '14.86M', status: 'MONITORED'      },
};

export const BOOT_CITIES = CITY_POOL.slice(0, 8);
export const INITIAL_LEVELS = [15, 72, 55, 18, 28, 10, 45, 33];

export function citySkyline(id) {
  let s = id.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s >>> 16) / 65535; };
  const B = 9, W = 140, H = 34;
  const bw = W / B;
  let out = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;
  out += '<g fill="currentColor">';
  for (let i = 0; i < B; i++) {
    const h = 8 + rng() * 24;
    const w = bw * (0.48 + rng() * 0.44);
    const x = i * bw + (bw - w) * 0.5;
    out += `<rect x="${x.toFixed(1)}" y="${(H - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/>`;
  }
  out += '</g></svg>';
  return out;
}

/**
 * @typedef {Object} GlobeDeps
 * @property {Function} addNode
 * @property {Function} removeNode
 * @property {Function} updateNodeLevel
 * @property {Function} setThreatLevel
 * @property {Function} setActiveNode
 * @property {Function} focusNode
 * @property {Function} pulseGlobeNode
 * @property {Function} spawnArc
 * @property {Function} appendRow
 * @property {Function} printLine
 * @property {Function} setRadarThreatLevel
 */

/**
 * Boot the globe simulation.
 * @param {HTMLElement} threatEl
 * @param {HTMLElement} streamEl
 * @param {HTMLElement} termEl
 * @param {GlobeDeps}   deps
 * @returns {{ globeNodes: Map<string, number> }}
 */
export function initGlobeSimulation(threatEl, streamEl, termEl, deps) {
  const { addNode, removeNode, updateNodeLevel, setThreatLevel,
          setActiveNode, focusNode, pulseGlobeNode, spawnArc,
          appendRow, printLine, setRadarThreatLevel } = deps;

  const globeNodes = new Map();

  function _globeAlert(label, level) {
    threatEl.dispatchEvent(new CustomEvent('s9:alert', {
      bubbles: true,
      detail: { level: level >= 70 ? 'critical' : 'warning', source: label },
    }));
  }

  function _addCityNode(city, level) {
    addNode(threatEl, { ...city, level });
    globeNodes.set(city.id, level);
    appendRow(streamEl, {
      timestamp: new Date().toISOString(),
      source: 'NET',
      message: `NODE ONLINE: ${city.label} — LVL ${level}`,
      alert: level >= 70,
    });
    if (level >= 70) {
      _globeAlert(city.label, level);
      setActiveNode(threatEl, city.id);
      focusNode(threatEl, city.id);
    }
  }

  // Boot sequence — stagger initial 8 cities
  BOOT_CITIES.forEach((city, i) => {
    setTimeout(() => {
      _addCityNode(city, INITIAL_LEVELS[i]);
      if (i === BOOT_CITIES.length - 1) {
        setTimeout(() => { setThreatLevel(threatEl, 55); setRadarThreatLevel(0.55); }, 800);
      }
    }, i * 300 + 500);
  });

  // Dynamic globe simulation
  let _simDestroyed = false;
  function runSimStep() {
    if (_simDestroyed) return;
    const onGlobe = [...globeNodes.keys()];
    const offGlobe = CITY_POOL.filter(c => !globeNodes.has(c.id));
    const roll = Math.random();

    if (roll < 0.28 && offGlobe.length > 0) {
      const city = offGlobe[_rnd(0, offGlobe.length - 1)];
      const lvl = _rnd(5, 65);
      _addCityNode(city, lvl);
      printLine(termEl, `SIGNAL ACQUIRED: ${city.label}`, 'sys');

    } else if (roll < 0.42 && onGlobe.length > 5) {
      const id = onGlobe[_rnd(0, onGlobe.length - 1)];
      const city = CITY_POOL.find(c => c.id === id);
      removeNode(threatEl, id);
      globeNodes.delete(id);
      printLine(termEl, `SIGNAL LOST: ${city?.label ?? id}`, 'info');
      appendRow(streamEl, {
        timestamp: new Date().toISOString(),
        source: 'NET',
        message: `NODE OFFLINE: ${city?.label ?? id}`,
        alert: false,
      });

    } else if (roll < 0.72 && onGlobe.length > 0) {
      const id = onGlobe[_rnd(0, onGlobe.length - 1)];
      const city = CITY_POOL.find(c => c.id === id);
      const oldLvl = globeNodes.get(id) ?? 0;
      const delta = _rnd(8, 28);
      const newLvl = Math.min(100, oldLvl + delta);
      updateNodeLevel(threatEl, id, newLvl);
      globeNodes.set(id, newLvl);
      setThreatLevel(threatEl, Math.max(...Array.from(globeNodes.values())));
      setRadarThreatLevel(Math.max(...Array.from(globeNodes.values())) / 100);

      printLine(termEl,
        `THREAT ESCALATION: ${city?.label ?? id} ${oldLvl}→${newLvl}`,
        newLvl >= 70 ? 'err' : 'sys');
      appendRow(streamEl, {
        timestamp: new Date().toISOString(),
        source: 'CRIT',
        message: `THREAT UP: ${city?.label ?? id} LVL=${newLvl}`,
        alert: newLvl >= 70,
      });

      if (newLvl >= 70 && oldLvl < 70) {
        _globeAlert(city?.label ?? id, newLvl);
        setActiveNode(threatEl, id);
        focusNode(threatEl, id);
      }
      const escOldBand = oldLvl >= 70 ? 2 : oldLvl >= 40 ? 1 : 0;
      const escNewBand = newLvl >= 70 ? 2 : newLvl >= 40 ? 1 : 0;
      if (escOldBand !== escNewBand) pulseGlobeNode(threatEl, id);

    } else if (onGlobe.length > 0) {
      const id = onGlobe[_rnd(0, onGlobe.length - 1)];
      const city = CITY_POOL.find(c => c.id === id);
      const oldLvl = globeNodes.get(id) ?? 50;
      const newLvl = Math.max(0, oldLvl - _rnd(5, 18));
      updateNodeLevel(threatEl, id, newLvl);
      globeNodes.set(id, newLvl);
      setThreatLevel(threatEl, Math.max(0, ...Array.from(globeNodes.values())));
      setRadarThreatLevel(Math.max(0, ...Array.from(globeNodes.values())) / 100);
      printLine(termEl, `THREAT REDUCED: ${city?.label ?? id} LVL=${newLvl}`, 'info');
      const deEscOldBand = oldLvl >= 70 ? 2 : oldLvl >= 40 ? 1 : 0;
      const deEscNewBand = newLvl >= 70 ? 2 : newLvl >= 40 ? 1 : 0;
      if (deEscOldBand !== deEscNewBand) pulseGlobeNode(threatEl, id);
    }

    // Fire 1–3 data-packet arcs per sim step
    if (onGlobe.length >= 2) {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let _i = 0; _i < count; _i++) {
        const a = onGlobe[Math.floor(Math.random() * onGlobe.length)];
        let b = onGlobe[Math.floor(Math.random() * onGlobe.length)];
        if (b === a) b = onGlobe[(onGlobe.indexOf(a) + 1) % onGlobe.length];
        if (b !== a) spawnArc(threatEl, a, b);
      }
    }

    setTimeout(runSimStep, _rnd(4000, 9000));
  }

  // Start simulation after boot sequence finishes
  setTimeout(runSimStep, BOOT_CITIES.length * 300 + 2500);

  // Continuous arc background traffic
  const _arcIntervalId = setInterval(() => {
    const ids = [...globeNodes.keys()];
    if (ids.length < 2) return;
    const count = Math.random() < 0.4 ? 2 : 1;
    for (let _i = 0; _i < count; _i++) {
      const a = ids[Math.floor(Math.random() * ids.length)];
      let b = ids[Math.floor(Math.random() * ids.length)];
      if (b === a) b = ids[(ids.indexOf(a) + 1) % ids.length];
      if (b !== a) spawnArc(threatEl, a, b);
    }
  }, 1200);

  // Auto-cycle through critical nodes
  const _cycleIntervalId = setInterval(() => {
    const criticals = [...globeNodes.entries()].filter(([, v]) => v >= 70);
    if (criticals.length === 0) return;
    const currentId = threatEl.getAttribute('data-active-node');
    const others = criticals.filter(([id]) => id !== currentId);
    const pool = others.length > 0 ? others : criticals;
    const [id] = pool[Math.floor(Math.random() * pool.length)];
    setActiveNode(threatEl, id);
    focusNode(threatEl, id);
  }, 8000);

  return {
    globeNodes,
    destroy() {
      _simDestroyed = true;
      clearInterval(_arcIntervalId);
      clearInterval(_cycleIntervalId);
    },
  };
}
