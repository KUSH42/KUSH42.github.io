/**
 * components/tactical-threatmap.js
 * Tactical ThreatMap panel — editor UI with add/remove/focus/slider controls.
 *
 * Usage:
 *   import { initTactical } from './components/tactical-threatmap.js';
 *   initTactical(el, bootCities, initialLevels, cityPool, deps);
 */

/**
 * @param {HTMLElement} el            - #threatmap-tactical
 * @param {Array}       bootCities
 * @param {Array}       initialLevels
 * @param {Array}       cityPool
 * @param {Object}      deps          - { initThreatMap, addNode, removeNode, updateNodeLevel, setThreatLevel, setActiveNode, focusNode }
 */
export function initTactical(el, bootCities, initialLevels, cityPool, deps) {
  const { initThreatMap, addNode, removeNode, updateNodeLevel,
          setThreatLevel, setActiveNode, focusNode } = deps;

  initThreatMap(el, { autoRotate: true, bloomStrength: 0.7 });

  const tactNodes = new Map();
  bootCities.forEach((city, i) => {
    setTimeout(() => {
      addNode(el, { ...city, level: initialLevels[i] });
      tactNodes.set(city.id, initialLevels[i]);
    }, i * 200 + 300);
  });
  setTimeout(() => setThreatLevel(el, 55), bootCities.length * 200 + 800);

  const infoEl   = document.getElementById('tact-node-info');
  const btnAdd   = document.getElementById('tact-btn-add');
  const btnRm    = document.getElementById('tact-btn-remove');
  const btnFocus = document.getElementById('tact-btn-focus');
  const btnDesel = document.getElementById('tact-btn-deselect');
  const slider   = document.getElementById('tact-level-slider');
  const levelVal = document.getElementById('tact-level-val');
  const levelRow = document.getElementById('tact-level-row');

  let selectedId = null;

  function updateEditorState() {
    const hasNode = selectedId !== null && tactNodes.has(selectedId);
    btnRm.disabled    = !hasNode;
    btnFocus.disabled = !hasNode;
    btnDesel.disabled = !hasNode;
    slider.disabled   = !hasNode;
    levelRow.style.opacity       = hasNode ? '1'    : '0.4';
    levelRow.style.pointerEvents = hasNode ? 'auto' : 'none';
    if (hasNode) {
      const city = cityPool.find(c => c.id === selectedId);
      const lvl  = tactNodes.get(selectedId);
      infoEl.textContent  = `${city?.label ?? selectedId} — LVL ${lvl}`;
      slider.value        = lvl;
      levelVal.textContent = lvl;
    } else {
      infoEl.textContent = 'NO NODE SELECTED';
    }
  }

  el.addEventListener('s9:threatmap-node-select', (e) => {
    selectedId = e.detail.nodeId;
    document.getElementById('tactical-threat').textContent =
      `THREAT: ${e.detail.level} — ${e.detail.label}`;
    updateEditorState();
  });

  el.addEventListener('s9:threatmap-node-deselect', () => {
    selectedId = null;
    updateEditorState();
  });

  btnAdd.addEventListener('click', () => {
    const available = cityPool.filter(c => !tactNodes.has(c.id));
    if (available.length === 0) return;
    const city = available[Math.floor(Math.random() * available.length)];
    const lvl = Math.floor(Math.random() * 60) + 10;
    addNode(el, { ...city, level: lvl });
    tactNodes.set(city.id, lvl);
    setThreatLevel(el, Math.max(...tactNodes.values()));
    setActiveNode(el, city.id);
    focusNode(el, city.id);
  });

  btnRm.addEventListener('click', () => {
    if (!selectedId) return;
    removeNode(el, selectedId);
    tactNodes.delete(selectedId);
    setThreatLevel(el, tactNodes.size > 0 ? Math.max(...tactNodes.values()) : 0);
    selectedId = null;
    updateEditorState();
  });

  btnFocus.addEventListener('click', () => {
    if (selectedId) focusNode(el, selectedId);
  });

  btnDesel.addEventListener('click', () => {
    setActiveNode(el, null);
    selectedId = null;
    updateEditorState();
  });

  slider.addEventListener('input', () => {
    if (!selectedId) return;
    const lvl = parseInt(slider.value);
    levelVal.textContent = lvl;
    updateNodeLevel(el, selectedId, lvl);
    tactNodes.set(selectedId, lvl);
    setThreatLevel(el, Math.max(...tactNodes.values()));
    const city = cityPool.find(c => c.id === selectedId);
    infoEl.textContent = `${city?.label ?? selectedId} — LVL ${lvl}`;
  });

  updateEditorState();
}
