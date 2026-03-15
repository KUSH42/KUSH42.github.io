/**
 * components/network-flow.js
 * Cyberspace Flow Map — network-matrix visualization with animated packet traffic.
 *
 * Usage:
 *   import { initNetworkFlow } from './components/network-flow.js';
 *   initNetworkFlow(matrixEl, deps);
 */

const MATRIX_NODES = [
  { id: 'sec9',     label: 'SEC.9 HQ',     x: 50, y: 50, root: true },
  { id: 'niihama',  label: 'NIIHAMA',       x: 22, y: 22 },
  { id: 'togusa',   label: 'TOGUSA',        x: 78, y: 22 },
  { id: 'batou',    label: 'BATOU',         x: 78, y: 78 },
  { id: 'ishikawa', label: 'ISHIKAWA',      x: 22, y: 78 },
  { id: 'relay1',   label: 'RELAY ALPHA',   x: 36, y: 32 },
  { id: 'relay2',   label: 'RELAY BETA',    x: 64, y: 32 },
  { id: 'relay3',   label: 'RELAY GAMMA',   x: 36, y: 68 },
  { id: 'relay4',   label: 'RELAY DELTA',   x: 64, y: 68 },
  { id: 'ext1',     label: 'PUPPET MASTER', x: 12, y: 50 },
  { id: 'ext2',     label: 'LAUGHING MAN',  x: 88, y: 50 },
  { id: 'tachi',    label: 'TACHIKOMA U9',  x: 50, y: 12 },
];

const MATRIX_EDGES = [
  { id: 'e01', from: 'sec9',    to: 'relay1'   },
  { id: 'e02', from: 'sec9',    to: 'relay2'   },
  { id: 'e03', from: 'sec9',    to: 'relay3'   },
  { id: 'e04', from: 'sec9',    to: 'relay4'   },
  { id: 'e05', from: 'relay1',  to: 'niihama'  },
  { id: 'e06', from: 'relay2',  to: 'togusa'   },
  { id: 'e07', from: 'relay3',  to: 'ishikawa' },
  { id: 'e08', from: 'relay4',  to: 'batou'    },
  { id: 'e09', from: 'niihama', to: 'ext1'     },
  { id: 'e10', from: 'ext1',    to: 'relay3'   },
  { id: 'e11', from: 'togusa',  to: 'relay1'   },
  { id: 'e12', from: 'batou',   to: 'relay2'   },
  { id: 'e13', from: 'ext2',    to: 'relay2'   },
  { id: 'e14', from: 'ext2',    to: 'relay4'   },
  { id: 'e15', from: 'sec9',    to: 'tachi'    },
  { id: 'e16', from: 'relay1',  to: 'relay2'   },
  { id: 'e17', from: 'relay3',  to: 'relay4'   },
];

const NODE_THREATS = { relay2: 72, relay4: 88, ext1: 95, ext2: 80, niihama: 45, batou: 55 };

/**
 * @param {HTMLElement} matrixEl - #flow-matrix
 * @param {Object}      deps     - { initMatrix, activateEdge, deactivateEdge, pulseNode, setActiveNode }
 */
export function initNetworkFlow(matrixEl, deps) {
  if (!matrixEl) return;

  const { initMatrix, activateEdge, deactivateEdge, pulseNode, setActiveNode } = deps;

  initMatrix(matrixEl, { nodes: MATRIX_NODES, edges: MATRIX_EDGES });

  for (const [id, level] of Object.entries(NODE_THREATS)) {
    const el = matrixEl.querySelector(`[data-node-id="${id}"]`);
    if (!el) continue;
    if (level >= 70) el.classList.add('s9-matrix__node--threat-high');
    else if (level >= 40) el.classList.add('s9-matrix__node--threat-mid');
  }

  setActiveNode(matrixEl, 'ext1');

  const allEdgeIds = MATRIX_EDGES.map(e => e.id);
  const activeEdgeSet = new Set();

  const PKT_COLORS = [
    null, null,
    'var(--neon-warn)',
    'var(--neon-alert)',
    'var(--neon-green)',
    null,
  ];

  function tick() {
    if (activeEdgeSet.size > 0) {
      const ids = [...activeEdgeSet];
      const toRemove = ids[Math.floor(Math.random() * ids.length)];
      deactivateEdge(matrixEl, toRemove);
      activeEdgeSet.delete(toRemove);
    }
    const inactive = allEdgeIds.filter(id => !activeEdgeSet.has(id));
    const count = Math.random() < 0.4 ? 2 : 1;
    for (let i = 0; i < count && inactive.length > 0; i++) {
      const eid = inactive.splice(Math.floor(Math.random() * inactive.length), 1)[0];
      const col = PKT_COLORS[Math.floor(Math.random() * PKT_COLORS.length)];
      activateEdge(matrixEl, eid, col);
      activeEdgeSet.add(eid);
    }
    if (Math.random() < 0.35) {
      const node = MATRIX_NODES[Math.floor(Math.random() * MATRIX_NODES.length)];
      pulseNode(matrixEl, node.id);
    }
    const ol = document.getElementById('flow-overlay');
    if (ol) {
      const crit = Object.values(NODE_THREATS).filter(v => v >= 70).length;
      const warn = Object.values(NODE_THREATS).filter(v => v >= 40 && v < 70).length;
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--neon-cyan').trim() || '#00d4b0';
      ol.innerHTML = `<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${accent};opacity:0.7">NODES: ${MATRIX_NODES.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${crit}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${warn}</span></span>`;
    }
  }

  for (let i = 0; i < 4; i++) {
    const eid = allEdgeIds[Math.floor(Math.random() * allEdgeIds.length)];
    if (!activeEdgeSet.has(eid)) { activateEdge(matrixEl, eid); activeEdgeSet.add(eid); }
  }
  setInterval(tick, 700);
  tick();

  document.getElementById('matrix-status').textContent = '● LIVE';
}
