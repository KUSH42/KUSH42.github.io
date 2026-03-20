export function initMatrixControls(matrixRain) {
  // ── Single source of truth for all UI defaults ────────────────
  const state = {
    // Matrix Rain
    color:        '#00ff70',
    opacity:      0.45,
    burstBloom:   true,
    globeInteract: true,
    debugGlobeCols: false,
    chroma:       true,
    chromaScale:  1.0,
    heat:         true,
    heatAmt:      0.004,
    streaks:      true,
    streakAmt:    0.055,
    soften:       true,
    softenStr:    0.002,
    depth:        0.04,
    normalStr:    6.0,
    // God Rays
    grEnabled:   false,
    grLightX:    0.50,
    grLightY:    0.75,
    grDensity:   0.93,
    grDecay:     0.96,
    grWeight:    0.35,
    grExposure:  0.45,
  };

  function applyGodRays() {
    matrixRain.setGodRays(
      state.grEnabled, state.grLightX, state.grLightY,
      state.grDensity, state.grDecay, state.grWeight, state.grExposure,
    );
  }

  // ── Binding table ─────────────────────────────────────────────
  // type defaults to 'range'. Also supports 'checkbox' and 'color'.
  const BINDINGS = [
    // ── Matrix Rain ──
    { type: 'color', id: 'rain-color', key: 'color',
      set: v => matrixRain.setColor(v) },
    { id: 'rain-opacity', valId: 'rain-vOpacity', key: 'opacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2), set: v => matrixRain.setOpacity(v) },
    { type: 'checkbox', id: 'rain-burstBloom',    key: 'burstBloom',
      set: v => matrixRain.setBurstBloom(v) },
    { type: 'checkbox', id: 'rain-globeInteract', key: 'globeInteract',
      set: v => matrixRain.setGlobeInteract(v) },
    { type: 'checkbox', id: 'rain-debugGlobeCols', key: 'debugGlobeCols',
      set: v => matrixRain.setDebugGlobeColumn(v) },

    // chroma checkbox + scale
    { type: 'checkbox', id: 'rain-chroma', key: 'chroma',
      set: v => matrixRain.setGlyphChroma(v, state.chromaScale) },
    { id: 'rain-chromaScale', valId: 'rain-vChromaScale', key: 'chromaScale',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(1),
      set: v => { if (state.chroma) matrixRain.setGlyphChroma(true, v); } },

    // heat
    { type: 'checkbox', id: 'rain-heat', key: 'heat',
      set: v => matrixRain.setHeat(v, state.heatAmt) },
    { id: 'rain-heatAmt', valId: 'rain-vHeatAmt', key: 'heatAmt',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3), set: v => matrixRain.setHeat(state.heat, v) },

    // streaks
    { type: 'checkbox', id: 'rain-streaks', key: 'streaks',
      set: v => matrixRain.setStreaks(v, state.streakAmt) },
    { id: 'rain-streakAmt', valId: 'rain-vStreakAmt', key: 'streakAmt',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3), set: v => matrixRain.setStreaks(state.streaks, v) },

    // soften
    { type: 'checkbox', id: 'rain-soften', key: 'soften',
      set: v => matrixRain.setSoften(v, state.softenStr) },
    { id: 'rain-softenStr', valId: 'rain-vSoftenStr', key: 'softenStr',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3), set: v => matrixRain.setSoften(state.soften, v) },

    { id: 'rain-depth', valId: 'rain-vDepth', key: 'depth',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2), set: v => matrixRain.setDepth(v) },
    { id: 'rain-normalStr', valId: 'rain-vNormalStr', key: 'normalStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(1), set: v => matrixRain.setNormalStrength(v) },

    // ── God Rays ──
    { type: 'checkbox', id: 'rain-grEnabled', key: 'grEnabled', set: () => applyGodRays() },
    { id: 'rain-grLightX',   valId: 'rain-vGrLightX',   key: 'grLightX',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
    { id: 'rain-grLightY',   valId: 'rain-vGrLightY',   key: 'grLightY',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
    { id: 'rain-grDensity',  valId: 'rain-vGrDensity',  key: 'grDensity',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
    { id: 'rain-grDecay',    valId: 'rain-vGrDecay',    key: 'grDecay',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
    { id: 'rain-grWeight',   valId: 'rain-vGrWeight',   key: 'grWeight',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
    { id: 'rain-grExposure', valId: 'rain-vGrExposure', key: 'grExposure',
      toSlider: v => v * 100, fromSlider: v => v / 100, fmt: v => v.toFixed(2), set: () => applyGodRays() },
  ];

  // ── Bind: init control from state, apply to target, wire event ─
  for (const b of BINDINGS) {
    const el = document.getElementById(b.id);
    if (!el) continue;
    const type  = b.type ?? 'range';
    const valEl = b.valId ? document.getElementById(b.valId) : null;

    if (type === 'checkbox') {
      el.checked = state[b.key];
    } else if (type === 'color') {
      el.value = state[b.key];
    } else {
      el.value = b.toSlider(state[b.key]);
      if (valEl) valEl.textContent = b.fmt(state[b.key]);
    }
    b.set(state[b.key]);

    const evtName = (type === 'checkbox') ? 'change' : 'input';
    el.addEventListener(evtName, e => {
      if (type === 'checkbox') state[b.key] = e.target.checked;
      else if (type === 'color') state[b.key] = e.target.value;
      else {
        state[b.key] = b.fromSlider(+e.target.value);
        if (valEl) valEl.textContent = b.fmt(state[b.key]);
      }
      b.set(state[b.key]);
    });
  }
}
