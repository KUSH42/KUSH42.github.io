export function initTelescreenControls(teleCRT) {
  // ── Collapsible section toggles ───────────────────────────────
  document.querySelectorAll('#rr-panel .rr-collapsible').forEach(sec => {
    sec.addEventListener('click', () => {
      const body = document.getElementById(sec.dataset.target);
      sec.classList.toggle('rr-open');
      body.classList.toggle('rr-open');
    });
  });

  // ── DOM refs for CSS-only surface effects ─────────────────────
  const tsVignetteEl  = document.querySelector('.s9-telescreen__vignette');
  const tsScanlinesEl = document.querySelector('.s9-telescreen__scanlines');
  const tsPhaseEls    = [
    document.querySelector('.s9-telescreen__phase-a'),
    document.querySelector('.s9-telescreen__phase-b'),
    document.querySelector('.s9-telescreen__phase-c'),
  ];
  const tsGlowEl = document.querySelector('.s9-telescreen__glow');

  // ── Single source of truth for all UI defaults ────────────────
  // Edit values here to change defaults; sliders initialise from this object.
  const state = {
    // Glitch
    glitchEnabled:  true,
    glitchStrength: 0.01,
    glitchSpeed:    24.0,
    glitchCols:     50,
    glitchRgb:      0.85,
    glitchFreq:     0.3,   // maxDelay between bursts (seconds)
    glitchBurst:    0.01,   // max burst duration (seconds)
    // Surface (CSS)
    scratchEnabled:  true,
    scratchOpacity:  0.13,
    vignetteEnabled: true,
    vignetteOpacity: 1.0,
    scanlinesEnabled: true,
    phaseEnabled:    true,
    glowEnabled:     true,
    glowOpacity:     0.55,
    // CRT shader
    warpMult:    2.0,
    hardPix:     1.2,   // stored positive; negated on send
    maskStr:     1.0,
    grainAmt:    0.04,
    halationStr: 3.0,
    convergence: 0.07,
  };

  // ── Glitch apply helper (reads full state) ────────────────────
  function applyGlitch() {
    teleCRT.setGlitch(
      state.glitchEnabled,
      state.glitchStrength,
      state.glitchSpeed,
      state.glitchCols,
      state.glitchRgb,
      state.glitchFreq,
      state.glitchBurst,
    );
  }

  // ── Binding table ─────────────────────────────────────────────
  // type 'range'    : { id, valId, key, toSlider, fromSlider, fmt, set }
  // type 'checkbox' : { id, key, set }
  const BINDINGS = [
    // ── Glitch ──
    { type: 'checkbox', id: 'ts-glitchEnabled', key: 'glitchEnabled',
      set: () => applyGlitch() },
    { id: 'ts-glitchStrength', valId: 'ts-vGlitchStrength', key: 'glitchStrength',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3), set: () => applyGlitch() },
    { id: 'ts-glitchSpeed', valId: 'ts-vGlitchSpeed', key: 'glitchSpeed',
      toSlider: v => v * 10, fromSlider: v => v / 10,
      fmt: v => v.toFixed(1), set: () => applyGlitch() },
    { id: 'ts-glitchCols', valId: 'ts-vGlitchCols', key: 'glitchCols',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => String(v), set: () => applyGlitch() },
    { id: 'ts-glitchRgb', valId: 'ts-vGlitchRgb', key: 'glitchRgb',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2), set: () => applyGlitch() },
    { id: 'ts-glitchFreq', valId: 'ts-vGlitchFreq', key: 'glitchFreq',
      // slider 1–100 → maxDelay 8s–0.01s (inverted: higher = more frequent)
      toSlider: v => ((8.0 - v) / 7.99) * 100,
      fromSlider: v => 8.0 - (v / 100) * 7.99,
      fmt: v => v < 0.1 ? v.toFixed(3) + 's' : v.toFixed(2) + 's', set: () => applyGlitch() },
    { id: 'ts-glitchBurst', valId: 'ts-vGlitchBurst', key: 'glitchBurst',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + 's', set: () => applyGlitch() },

    // ── Surface — scratches (shader) ──
    { type: 'checkbox', id: 'ts-scratchEnabled', key: 'scratchEnabled',
      set: v => teleCRT.setShader({ scratchStr: v ? state.scratchOpacity : 0 }) },
    { id: 'ts-scratchOpacity', valId: 'ts-vScratchOpacity', key: 'scratchOpacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.scratchEnabled) teleCRT.setShader({ scratchStr: v }); } },

    // ── Surface — CSS ──
    { type: 'checkbox', id: 'ts-vignetteEnabled', key: 'vignetteEnabled',
      set: v => { tsVignetteEl.style.display = v ? '' : 'none'; } },
    { id: 'ts-vignetteOpacity', valId: 'ts-vVignetteOpacity', key: 'vignetteOpacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { tsVignetteEl.style.opacity = v; } },
    { type: 'checkbox', id: 'ts-scanlinesEnabled', key: 'scanlinesEnabled',
      set: v => { tsScanlinesEl.style.display = v ? 'block' : 'none'; } },
    { type: 'checkbox', id: 'ts-phaseEnabled', key: 'phaseEnabled',
      set: v => { tsPhaseEls.forEach(el => { el.style.display = v ? '' : 'none'; }); } },
    { type: 'checkbox', id: 'ts-glowEnabled', key: 'glowEnabled',
      set: v => { tsGlowEl.style.display = v ? '' : 'none'; } },
    { id: 'ts-glowOpacity', valId: 'ts-vGlowOpacity', key: 'glowOpacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { tsGlowEl.style.opacity = v; } },

    // ── CRT shader ──
    { id: 'ts-warp', valId: 'ts-vWarp', key: 'warpMult',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => teleCRT.setShader({ warpMult: v }) },
    { id: 'ts-hardPix', valId: 'ts-vHardPix', key: 'hardPix',
      toSlider: v => v * 10, fromSlider: v => v / 10,
      fmt: v => v.toFixed(1),
      set: v => teleCRT.setShader({ hardPix: -v }) },
    { id: 'ts-maskStr', valId: 'ts-vMaskStr', key: 'maskStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => teleCRT.setShader({ maskStr: v }) },
    { id: 'ts-grain', valId: 'ts-vGrain', key: 'grainAmt',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => teleCRT.setShader({ grainAmt: v }) },
    { id: 'ts-halation', valId: 'ts-vHalation', key: 'halationStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => teleCRT.setShader({ halationStr: v }) },
    { id: 'ts-convergence', valId: 'ts-vConvergence', key: 'convergence',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => teleCRT.setShader({ convergence: v }) },
  ];

  // ── Wire bindings: init slider from state, attach event ───────
  for (const b of BINDINGS) {
    const el = document.getElementById(b.id);
    if (!el) continue;
    const isCheck = b.type === 'checkbox';
    const valEl   = b.valId ? document.getElementById(b.valId) : null;

    // Initialise control from state
    if (isCheck) {
      el.checked = state[b.key];
    } else {
      el.value = b.toSlider(state[b.key]);
      if (valEl) valEl.textContent = b.fmt(state[b.key]);
    }

    // Apply initial state to target (shader / CSS)
    b.set(state[b.key]);

    // Wire event
    el.addEventListener(isCheck ? 'change' : 'input', e => {
      const raw = isCheck ? e.target.checked : +e.target.value;
      state[b.key] = isCheck ? raw : b.fromSlider(raw);
      if (!isCheck && valEl) valEl.textContent = b.fmt(state[b.key]);
      b.set(state[b.key]);
    });
  }
}
