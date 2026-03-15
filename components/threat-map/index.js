/**
 * components/threat-map/index.js
 * ThreatMap JS API — Three.js globe with threat node visualization and bloom post-processing.
 *
 * Usage:
 *   import { initThreatMap, destroyThreatMap, addNode, removeNode,
 *            addEdge, removeEdge, setActiveNode, setThreatLevel }
 *     from './components/threat-map/index.js';
 */

export { initThreatMap, destroyThreatMap, getCamera } from './init.js';
export { addNode, removeNode, pulseNode } from './nodes.js';
export { addEdge, removeEdge } from './edges.js';
export { setActiveNode, setThreatLevel, updateNodeLevel, focusNode } from './selection.js';
export { spawnArc } from './arc-animation.js';
export { setSatelliteMode } from './satellite.js';
export { refreshThemeColors } from './theme.js';
