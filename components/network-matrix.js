/**
 * components/network-matrix.js
 * NetworkMatrix JS API — SVG network topology graph with animated edges and node selection.
 *
 * Usage:
 *   import { initMatrix, updateMatrix, pulseNode, activateEdge, deactivateEdge,
 *            setActiveNode, destroyMatrix }
 *     from './components/network-matrix.js';
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

// ── Internal state registry ────────────────────────────────────
const _state = new WeakMap();

// ── initMatrix ────────────────────────────────────────────────

/**
 * Create the SVG canvas, render nodes and edges, and attach interaction listeners.
 * Call once after the .s9-matrix element is in the DOM.
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {{ nodes: Array, edges: Array }} data
 *   nodes: [{ id, x, y, label, root? }]
 *   edges: [{ id, from, to, active? }]
 */
export function initMatrix(element, { nodes = [], edges = [] } = {}) {
  const ac = new AbortController();
  const { signal } = ac;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    abortController: ac,
    nodeMap: new Map(),
    edgeMap: new Map(),
    activeNodeId: null,
    reducedMotion,
  };
  _state.set(element, state);

  // Build SVG
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 's9-matrix__canvas');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Network topology matrix');

  const defs = document.createElementNS(SVG_NS, 'defs');

  const edgeGroup = document.createElementNS(SVG_NS, 'g');
  edgeGroup.setAttribute('class', 's9-matrix__edges');

  const nodeGroup = document.createElementNS(SVG_NS, 'g');
  nodeGroup.setAttribute('class', 's9-matrix__nodes');

  svg.appendChild(defs);
  svg.appendChild(edgeGroup);
  svg.appendChild(nodeGroup);
  element.appendChild(svg);

  // Render initial data
  edges.forEach((edge) => _addEdge(element, edge));
  nodes.forEach((node) => _addNode(element, node));

  // Apply initial active states
  edges.forEach((edge) => {
    if (edge.active) activateEdge(element, edge.id);
  });

  // ── Click / keyboard listener on SVG ──────────────────────
  svg.addEventListener(
    'click',
    (event) => {
      const nodeGroup = event.target.closest('[data-node-id]');
      if (nodeGroup) {
        setActiveNode(element, nodeGroup.dataset.nodeId);
      } else {
        // Click on empty space — deselect
        if (state.activeNodeId !== null) {
          setActiveNode(element, null);
        }
      }
    },
    { signal }
  );

  svg.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const nodeGroup = event.target.closest('[data-node-id]');
        if (nodeGroup) {
          event.preventDefault();
          setActiveNode(element, nodeGroup.dataset.nodeId);
        }
      }
    },
    { signal }
  );
}

// ── updateMatrix ──────────────────────────────────────────────

/**
 * Reconcile nodes and edges with new data using id-keyed diffing.
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {{ nodes: Array, edges: Array }} data
 */
export function updateMatrix(element, { nodes = [], edges = [] } = {}) {
  const state = _state.get(element);
  if (!state) return;

  const newNodeIds = new Set(nodes.map((n) => n.id));
  const newEdgeIds = new Set(edges.map((e) => e.id));

  // Remove nodes not in new data
  for (const [id] of state.nodeMap) {
    if (!newNodeIds.has(id)) {
      if (state.activeNodeId === id) {
        setActiveNode(element, null);
      }
      _removeNode(element, id);
    }
  }

  // Remove edges not in new data
  for (const [id] of state.edgeMap) {
    if (!newEdgeIds.has(id)) {
      _removeEdge(element, id);
    }
  }

  // Track repositioned nodes for edge geometry updates
  const repositionedNodeIds = new Set();

  // Update or add nodes
  nodes.forEach((nodeData) => {
    if (state.nodeMap.has(nodeData.id)) {
      _updateNodePosition(element, nodeData, repositionedNodeIds);
    } else {
      _addNode(element, nodeData);
    }
  });

  // Update or add edges
  edges.forEach((edgeData) => {
    if (state.edgeMap.has(edgeData.id)) {
      _updateEdge(element, edgeData, repositionedNodeIds);
    } else {
      _addEdge(element, edgeData);
      if (edgeData.active) activateEdge(element, edgeData.id);
    }
  });
}

// ── pulseNode ─────────────────────────────────────────────────

/**
 * Play a single ring-pulse animation on a node.
 * No-op if the node has --active (already animating infinitely).
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {string} nodeId
 */
export function pulseNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  const nodeEl = state.nodeMap.get(nodeId);
  if (!nodeEl) return;

  if (nodeEl.classList.contains('s9-matrix__node--active')) return;

  nodeEl.classList.add('s9-matrix__node--pulsing');

  const ring = nodeEl.querySelector('.s9-matrix__node-ring');
  if (ring) {
    ring.addEventListener(
      'animationend',
      (e) => {
        if (e.animationName === 'matrix-ring-pulse') {
          nodeEl.classList.remove('s9-matrix__node--pulsing');
        }
      },
      { once: true }
    );
  }
}

// ── activateEdge ──────────────────────────────────────────────

/**
 * Activate an edge — promotes it to a <path> and adds a traveling dot.
 * Pass null to deactivate all edges.
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {string|null} edgeId
 */
export function activateEdge(element, edgeId) {
  const state = _state.get(element);
  if (!state) return;

  if (edgeId === null) {
    for (const [id] of state.edgeMap) {
      deactivateEdge(element, id);
    }
    return;
  }

  const record = state.edgeMap.get(edgeId);
  if (!record) return;
  if (record.active) return; // already active

  const svg = element.querySelector('.s9-matrix__canvas');
  if (!svg) return;

  const edgeGroup = svg.querySelector('.s9-matrix__edges');
  if (!edgeGroup) return;

  const { line, x1, y1, x2, y2 } = record;

  // Remove idle line, replace with path
  if (line && line.parentNode) {
    line.parentNode.removeChild(line);
  }

  const pathId = `s9-edge-${edgeId}`;
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('class', 's9-matrix__edge s9-matrix__edge--active');
  path.setAttribute('id', pathId);
  path.setAttribute('data-edge-id', edgeId);
  path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
  edgeGroup.appendChild(path);

  // Traveling dot with animateMotion (skip if reducedMotion)
  let dot = null;
  if (!state.reducedMotion) {
    dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('class', 's9-matrix__edge-dot');
    dot.setAttribute('r', '1.2');

    const animateMotion = document.createElementNS(SVG_NS, 'animateMotion');
    animateMotion.setAttribute('dur', '2s');
    animateMotion.setAttribute('repeatCount', 'indefinite');

    const mpath = document.createElementNS(SVG_NS, 'mpath');
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);

    animateMotion.appendChild(mpath);
    dot.appendChild(animateMotion);
    edgeGroup.appendChild(dot);
  }

  record.line = path;
  record.dot = dot;
  record.active = true;
}

// ── deactivateEdge ────────────────────────────────────────────

/**
 * Deactivate an edge — removes the dot, converts path back to line.
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {string} edgeId
 */
export function deactivateEdge(element, edgeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.edgeMap.get(edgeId);
  if (!record || !record.active) return;

  const svg = element.querySelector('.s9-matrix__canvas');
  if (!svg) return;

  const edgeGroup = svg.querySelector('.s9-matrix__edges');
  if (!edgeGroup) return;

  const { line: path, dot, x1, y1, x2, y2 } = record;

  // Remove traveling dot
  if (dot && dot.parentNode) {
    dot.parentNode.removeChild(dot);
  }

  // Remove old path id to avoid collisions
  if (path && path.parentNode) {
    path.parentNode.removeChild(path);
  }

  // Replace with idle line
  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('class', 's9-matrix__edge');
  line.setAttribute('data-edge-id', edgeId);
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  edgeGroup.appendChild(line);

  record.line = line;
  record.dot = null;
  record.active = false;
}

// ── setActiveNode ─────────────────────────────────────────────

/**
 * Select a node by id. Pass null to deselect.
 * Fires s9:matrix-node-deselect before s9:matrix-node-click when switching.
 *
 * @param {HTMLElement} element - .s9-matrix root
 * @param {string|null} nodeId
 */
export function setActiveNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  // Deselect current
  if (state.activeNodeId !== null) {
    const prevEl = state.nodeMap.get(state.activeNodeId);
    if (prevEl) {
      prevEl.classList.remove('s9-matrix__node--active');
      prevEl.setAttribute('aria-pressed', 'false');
    }

    element.dispatchEvent(
      new CustomEvent('s9:matrix-node-deselect', {
        bubbles: true,
        detail: { nodeId: state.activeNodeId },
      })
    );

    state.activeNodeId = null;
  }

  if (nodeId === null) return;

  const nodeEl = state.nodeMap.get(nodeId);
  if (!nodeEl) return;

  nodeEl.classList.add('s9-matrix__node--active');
  nodeEl.setAttribute('aria-pressed', 'true');
  state.activeNodeId = nodeId;

  element.dispatchEvent(
    new CustomEvent('s9:matrix-node-click', {
      bubbles: true,
      detail: {
        nodeId,
        label: nodeEl.getAttribute('aria-label') ?? nodeId,
      },
    })
  );
}

// ── destroyMatrix ─────────────────────────────────────────────

/**
 * Tear down all listeners, remove the SVG, and clean up state.
 *
 * @param {HTMLElement} element - .s9-matrix root
 */
export function destroyMatrix(element) {
  const state = _state.get(element);
  if (!state) return;

  state.abortController.abort();

  const svg = element.querySelector('.s9-matrix__canvas');
  if (svg) element.removeChild(svg);

  _state.delete(element);
}

// ── Internal: node creation ────────────────────────────────────

function _addNode(element, { id, x, y, label, root = false }) {
  const state = _state.get(element);
  if (!state) return;

  const svg = element.querySelector('.s9-matrix__canvas');
  if (!svg) return;

  const nodeGroup = svg.querySelector('.s9-matrix__nodes');
  if (!nodeGroup) return;

  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', `s9-matrix__node${root ? ' s9-matrix__node--root' : ''}`);
  g.setAttribute('data-node-id', id);
  g.setAttribute('tabindex', '0');
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', label);
  g.setAttribute('aria-pressed', 'false');

  const ring = document.createElementNS(SVG_NS, 'circle');
  ring.setAttribute('class', 's9-matrix__node-ring');
  ring.setAttribute('cx', x);
  ring.setAttribute('cy', y);
  ring.setAttribute('r', '5');

  const core = document.createElementNS(SVG_NS, 'circle');
  core.setAttribute('class', 's9-matrix__node-core');
  core.setAttribute('cx', x);
  core.setAttribute('cy', y);
  core.setAttribute('r', '3');

  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('class', 's9-matrix__node-label');
  text.setAttribute('x', x);
  text.setAttribute('y', y + 4);
  text.textContent = label;

  g.appendChild(ring);
  g.appendChild(core);
  g.appendChild(text);
  nodeGroup.appendChild(g);

  state.nodeMap.set(id, g);
}

function _removeNode(element, nodeId) {
  const state = _state.get(element);
  if (!state) return;

  const nodeEl = state.nodeMap.get(nodeId);
  if (!nodeEl) return;

  if (nodeEl.parentNode) nodeEl.parentNode.removeChild(nodeEl);
  state.nodeMap.delete(nodeId);
}

function _updateNodePosition(element, { id, x, y, label, root = false }, repositionedNodeIds) {
  const state = _state.get(element);
  if (!state) return;

  const nodeEl = state.nodeMap.get(id);
  if (!nodeEl) return;

  // Update root modifier
  if (root) {
    nodeEl.classList.add('s9-matrix__node--root');
  } else {
    nodeEl.classList.remove('s9-matrix__node--root');
  }

  nodeEl.setAttribute('aria-label', label);

  const ring = nodeEl.querySelector('.s9-matrix__node-ring');
  const core = nodeEl.querySelector('.s9-matrix__node-core');
  const text = nodeEl.querySelector('.s9-matrix__node-label');

  const oldX = ring ? parseFloat(ring.getAttribute('cx')) : null;
  const oldY = ring ? parseFloat(ring.getAttribute('cy')) : null;

  if (ring) { ring.setAttribute('cx', x); ring.setAttribute('cy', y); }
  if (core) { core.setAttribute('cx', x); core.setAttribute('cy', y); }
  if (text) { text.setAttribute('x', x); text.setAttribute('y', y + 4); text.textContent = label; }

  if (oldX !== x || oldY !== y) {
    repositionedNodeIds.add(id);
  }
}

// ── Internal: edge creation ────────────────────────────────────

function _addEdge(element, { id, from, to }) {
  const state = _state.get(element);
  if (!state) return;

  const svg = element.querySelector('.s9-matrix__canvas');
  if (!svg) return;

  const edgeGroup = svg.querySelector('.s9-matrix__edges');
  if (!edgeGroup) return;

  // Resolve node positions
  const fromEl = state.nodeMap.get(from);
  const toEl = state.nodeMap.get(to);

  const x1 = fromEl
    ? parseFloat(fromEl.querySelector('.s9-matrix__node-core').getAttribute('cx'))
    : 50;
  const y1 = fromEl
    ? parseFloat(fromEl.querySelector('.s9-matrix__node-core').getAttribute('cy'))
    : 50;
  const x2 = toEl
    ? parseFloat(toEl.querySelector('.s9-matrix__node-core').getAttribute('cx'))
    : 50;
  const y2 = toEl
    ? parseFloat(toEl.querySelector('.s9-matrix__node-core').getAttribute('cy'))
    : 50;

  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('class', 's9-matrix__edge');
  line.setAttribute('data-edge-id', id);
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  edgeGroup.appendChild(line);

  state.edgeMap.set(id, { line, dot: null, active: false, from, to, x1, y1, x2, y2 });
}

function _removeEdge(element, edgeId) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.edgeMap.get(edgeId);
  if (!record) return;

  if (record.active) {
    deactivateEdge(element, edgeId);
  }

  const { line, dot } = state.edgeMap.get(edgeId);
  if (line && line.parentNode) line.parentNode.removeChild(line);
  if (dot && dot.parentNode) dot.parentNode.removeChild(dot);

  state.edgeMap.delete(edgeId);
}

function _updateEdge(element, { id, from, to, active }, repositionedNodeIds) {
  const state = _state.get(element);
  if (!state) return;

  const record = state.edgeMap.get(id);
  if (!record) return;

  const fromChanged = from !== record.from;
  const toChanged = to !== record.to;
  const endpointRepos =
    repositionedNodeIds.has(from) || repositionedNodeIds.has(to);

  if (fromChanged || toChanged || endpointRepos) {
    // Recompute geometry
    const fromEl = state.nodeMap.get(from);
    const toEl = state.nodeMap.get(to);

    const x1 = fromEl
      ? parseFloat(fromEl.querySelector('.s9-matrix__node-core').getAttribute('cx'))
      : record.x1;
    const y1 = fromEl
      ? parseFloat(fromEl.querySelector('.s9-matrix__node-core').getAttribute('cy'))
      : record.y1;
    const x2 = toEl
      ? parseFloat(toEl.querySelector('.s9-matrix__node-core').getAttribute('cx'))
      : record.x2;
    const y2 = toEl
      ? parseFloat(toEl.querySelector('.s9-matrix__node-core').getAttribute('cy'))
      : record.y2;

    record.from = from;
    record.to = to;
    record.x1 = x1;
    record.y1 = y1;
    record.x2 = x2;
    record.y2 = y2;

    if (record.active) {
      // Update active path geometry
      record.line.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    } else {
      record.line.setAttribute('x1', x1);
      record.line.setAttribute('y1', y1);
      record.line.setAttribute('x2', x2);
      record.line.setAttribute('y2', y2);
    }
  }

  // Apply active field as source of truth
  if (active && !record.active) {
    activateEdge(element, id);
  } else if (!active && record.active) {
    deactivateEdge(element, id);
  }
}
