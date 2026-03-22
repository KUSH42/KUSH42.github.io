/**
 * telescreen-controls-webgpu.js
 * Settings panel bindings for telescreen-crt-webgpu.
 *
 * Functionally identical to telescreen-controls.js from the WebGL project.
 * Only the module name, comments, and internal `teleCRT` reference rename differ.
 * All #ts-* input IDs, BINDINGS table, state defaults, and event handling are
 * copied verbatim — so the same HTML panel works with both renderer versions.
 */

export function initTelescreenCRTControls(crt, opts = {}) {
  const PRESETS = opts.presets ?? {};
  // Track all listeners so destroy() can remove them cleanly
  const _listeners = [];
  function on(el, event, handler) {
    el.addEventListener(event, handler);
    _listeners.push({ el, event, handler });
  }

  // ── Collapsible section toggles ───────────────────────────────
  document.querySelectorAll('#rr-panel .rr-collapsible').forEach(sec => {
    on(sec, 'click', () => {
      const body = document.getElementById(sec.dataset.target);
      sec.classList.toggle('rr-open');
      body.classList.toggle('rr-open');
    });
  });

  // ── DOM refs for CSS-only surface effects (all instances) ────
  const tsVignetteEls  = [...document.querySelectorAll('.s9-telescreen__vignette')];
  const tsScanlinesEls = [...document.querySelectorAll('.s9-telescreen__scanlines')];
  const tsPhaseEls     = [...document.querySelectorAll('.s9-telescreen__phase-a, .s9-telescreen__phase-b, .s9-telescreen__phase-c')];
  const tsStaticEls    = []; // CSS static removed; GPU snow (snowFn) is the sole noise layer
  const tsSagEls       = [...document.querySelectorAll('.s9-telescreen__sag')];
  const tsRollbarEls   = [...document.querySelectorAll('.s9-telescreen__rollbar')];

  // ── Single source of truth for all UI defaults ────────────────
  // Edit values here to change defaults; sliders initialise from this object.
  const state = {
    // Glitch
    glitchEnabled:  true,
    glitchStrength: 0.01,
    glitchSpeed:    24.0,
    glitchCols:     50,
    glitchRgb:      0.75,
    glitchFreq:     4.0,  // delay between bursts (seconds); slider range 0.01–8s
    glitchBurst:    0.01,   // max burst duration (seconds)
    // Surface (CSS)
    scratchEnabled:  true,
    scratchOpacity:  0.015,
    vignetteEnabled: true,
    vignetteOpacity: 0.25,
    scanlinesEnabled: true,
    phaseEnabled:    true,
    staticEnabled:   true,
    sagEnabled:      true,
    rollbarEnabled:  true,
    // CRT shader
    warpMult:    0.20,
    hardPix:     2.5, // stored positive; negated on send
    hardScan:    8.0,   // stored positive; negated on send
    scrollRate:  0.05,
    brightBoost: 0.55,
    maskStr:     0.85,
    maskType:    0,     // integer: 0=aperture grille, 1=shadow mask, 2=slot mask
    grainAmt:    0.010,
    halationStr: 2.0,
    halationSharp: -0.85,
    convergence: 0.018,
    convStaticX: 0.0,   // P1-H: reduced to near-zero (was -0.35)
    convStaticY: 0.0,   // P1-H: reduced to near-zero (was -1.24)
    convBX: 0.0,        // P1-A: independent B static H offset
    convBY: 0.0,        // P1-A: independent B static V offset
    convAspect: 1.0,    // P1-B: 0=radial convergence, 1=H-only (gun anisotropic)
    kernelGamma: 2.5,   // P3-C: kernel encode/decode gamma (CRT phosphor gamma)
    // GPU bloom (optional — controls use crt.setBloom?.() so they work
    // whether or not bloom was initialised with opts.bloom)
    bloomEnabled:   true,
    bloomStrength:  0.25,
    bloomRadius:    1.8,
    bloomThreshold: 0.05,
    // Realism pass
    swimAmt:        0.12,
    colorTempStr:   0.65,
    snowEnabled:    true,
    snowAmt:        0.02,
    // Fidelity pass
    maskScale:          3.91,
    maskSmooth:         0.12,
    defocusAmt:         0.35,
    p22Str:             0.40,
    blackLevel:         0.0001,
    bloomCoreRadius:    0.35,
    bloomCoreStrength:  0.6,
    flickerEnabled:     true,
    flickerRate:        59.94,
    flickerTau:         0.15,  // stored in ms; / 1000 when sent to setShader (shorthand — sets all three; P22 default 150 µs)
    flickerTauR:        0.15,  // stored in ms; / 1000 when sent to setShader (P22 R: 150 µs)
    flickerTauG:        0.10,  // stored in ms; / 1000 when sent to setShader (P22 G: ~100 µs)
    flickerTauB:        0.15,  // stored in ms; / 1000 when sent to setShader (P22 B: 150 µs)
    flickerAmt:         0.0,   // off — fast phosphor (τ<1ms) shows no inter-field decay at 60 Hz
    persistenceEnabled: true,
    persistence:        0.50,
    // Private state — underscore prefix; excluded from JSON export
    _preset:            'trinitron', // currently selected preset key
    // Accuracy pass
    sourceSizeX:        0,     // 0 = use output resolution (backward-compatible)
    sourceSizeY:        0,
    interlace:          false,
    halationWarm:       0.0,
    // Interference pass (SPEC-glitch-interference-v2)
    humAmt:         0.022,
    humBars:        1.0,
    humRate:        0.06,
    ghostOffset:    0.0,
    ghostStr:       0.0,
    ghostTintR:     1.0,
    ghostTintG:     0.97,
    ghostTintB:     1.04,
    dotCrawlAmt:    0.09,
    glitchBurstLoss: 0.70,
    vbiStr:         0.07,
    vbiLines:       3.0,
    agcAmt:         0.012,
    agcRate:        1.2,
  };

  // ── Glitch apply helper (reads full state) ────────────────────
  function applyGlitch() {
    crt.setGlitch(
      state.glitchEnabled,
      state.glitchStrength,
      state.glitchSpeed,
      state.glitchCols,
      state.glitchRgb,
      state.glitchFreq,
      state.glitchBurst,
    );
  }

  // ── refreshAllBindings — sync DOM controls to state ───────────
  // Re-reads state and pushes values to all bound DOM elements.
  // Called after a preset is applied to keep sliders/checkboxes in sync.
  function refreshAllBindings() {
    for (const b of BINDINGS) {
      const el = document.getElementById(b.id);
      if (!el) continue;
      const isCheck  = b.type === 'checkbox';
      const isSelect = b.type === 'select';
      const isNumber = b.type === 'number';
      const v = state[b.key];
      if (isCheck)        { el.checked = !!v; }
      else if (isSelect)  { el.value = String(v); }
      else if (isNumber)  { el.value = String(v); }
      else                { el.value = b.toSlider ? b.toSlider(v) : v; }

      // Update value display span if present.
      if (b.valId) {
        const span = document.getElementById(b.valId);
        if (span) span.textContent = b.fmt ? b.fmt(v) : String(v);
      }
    }
    // Update preset select separately (not in BINDINGS — string key, not numeric).
    const pEl = document.getElementById('ts-preset');
    if (pEl) pEl.value = state._preset;
  }

  // ── applyPreset — load a PRESETS entry into state and shader ──
  // Updates state, refreshes all slider/checkbox/select displays, and calls
  // crt.setShader(). Never touches sourceSizeX/Y (content-specific) or glitch
  // params (presets do not define glitch state).
  function applyPreset(presetKey) {
    const p = PRESETS[presetKey];
    if (!p) return;

    // Merge preset into state, converting units where controls differ from shader.
    // tau values: preset is seconds; controls state is milliseconds.
    const TAU_KEYS = ['flickerTau', 'flickerTauR', 'flickerTauG', 'flickerTauB'];

    for (const [k, v] of Object.entries(p)) {
      if (!(k in state)) continue;         // skip keys not tracked by controls
      if (TAU_KEYS.includes(k)) {
        state[k] = v * 1000;              // s → ms (controls store in ms)
      } else {
        state[k] = v;
      }
    }

    // Refresh all bound inputs.
    refreshAllBindings();

    // Apply to shader — strip sourceSizeX/Y (content-specific, not archetype-specific).
    // Do not call applyGlitch(): presets carry no glitch keys; current glitch state
    // is unchanged and does not need to be re-sent.
    const { sourceSizeX: _sx, sourceSizeY: _sy, ...shaderParams } = p;
    crt.setShader(shaderParams);
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
      set: v => crt.setShader({ scratchStr: v ? state.scratchOpacity : 0 }) },
    { id: 'ts-scratchOpacity', valId: 'ts-vScratchOpacity', key: 'scratchOpacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.scratchEnabled) crt.setShader({ scratchStr: v }); } },

    // ── Surface — CSS ──
    { type: 'checkbox', id: 'ts-vignetteEnabled', key: 'vignetteEnabled',
      set: v => { tsVignetteEls.forEach(el => { el.style.display = v ? '' : 'none'; }); } },
    { id: 'ts-vignetteOpacity', valId: 'ts-vVignetteOpacity', key: 'vignetteOpacity',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { tsVignetteEls.forEach(el => { el.style.opacity = v; }); } },
    { type: 'checkbox', id: 'ts-scanlinesEnabled', key: 'scanlinesEnabled',
      set: v => { tsScanlinesEls.forEach(el => { el.style.display = v ? 'block' : 'none'; }); } },
    { type: 'checkbox', id: 'ts-phaseEnabled', key: 'phaseEnabled',
      set: v => { tsPhaseEls.forEach(el => { el.style.display = v ? '' : 'none'; }); } },
    { type: 'checkbox', id: 'ts-staticEnabled', key: 'staticEnabled',
      set: v => { tsStaticEls.forEach(el => { el.style.display = v ? '' : 'none'; }); } },
    { type: 'checkbox', id: 'ts-sagEnabled', key: 'sagEnabled',
      set: v => {
        tsSagEls.forEach(el => { el.style.display = v ? '' : 'none'; });
        crt.setShader({ sagGeom: v });
      } },
    { type: 'checkbox', id: 'ts-rollbarEnabled', key: 'rollbarEnabled',
      set: v => {
        tsRollbarEls.forEach(el => { el.style.display = v ? '' : 'none'; });
        crt.setShader({ rollbarScroll: v });
      } },

    // ── CRT shader ──
    { id: 'ts-warp', valId: 'ts-vWarp', key: 'warpMult',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ warpMult: v }) },
    { id: 'ts-hardPix', valId: 'ts-vHardPix', key: 'hardPix',
      toSlider: v => v * 10, fromSlider: v => v / 10,
      fmt: v => v.toFixed(1),
      set: v => crt.setShader({ hardPix: -v }) },
    { id: 'ts-hardScan', valId: 'ts-vHardScan', key: 'hardScan',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => v.toFixed(1),
      set: v => crt.setShader({ hardScan: -v }) },
    { id: 'ts-scrollRate', valId: 'ts-vScrollRate', key: 'scrollRate',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ scrollRate: v }) },
    { id: 'ts-brightBoost', valId: 'ts-vBrightBoost', key: 'brightBoost',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ brightBoost: v }) },
    { id: 'ts-maskStr', valId: 'ts-vMaskStr', key: 'maskStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ maskStr: v }) },
    { type: 'select', id: 'ts-maskType', key: 'maskType',
      set: v => crt.setShader({ maskType: +v }) },
    { id: 'ts-grain', valId: 'ts-vGrain', key: 'grainAmt',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ grainAmt: v }) },
    { id: 'ts-halation', valId: 'ts-vHalation', key: 'halationStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ halationStr: v }) },
    { id: 'ts-halationSharp', valId: 'ts-vHalationSharp', key: 'halationSharp',
      toSlider: v => -v * 100, fromSlider: v => -v / 100,   // displayed as positive "softness"
      fmt: v => (-v).toFixed(2),
      set: v => crt.setShader({ halationSharp: v }) },
    { id: 'ts-convergence', valId: 'ts-vConvergence', key: 'convergence',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ convergence: v }) },
    { id: 'ts-convStaticX', valId: 'ts-vConvStaticX', key: 'convStaticX',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ convStaticX: v }) },
    { id: 'ts-convStaticY', valId: 'ts-vConvStaticY', key: 'convStaticY',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ convStaticY: v }) },
    { id: 'ts-convBX', valId: 'ts-vConvBX', key: 'convBX',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ convBX: v }) },
    { id: 'ts-convBY', valId: 'ts-vConvBY', key: 'convBY',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ convBY: v }) },
    { id: 'ts-convAspect', valId: 'ts-vConvAspect', key: 'convAspect',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ convAspect: v }) },
    { id: 'ts-kernelGamma', valId: 'ts-vKernelGamma', key: 'kernelGamma',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ kernelGamma: v }) },

    // ── GPU Bloom (optional — safe via ?. if bloom not initialised) ──
    { type: 'checkbox', id: 'ts-bloomEnabled', key: 'bloomEnabled',
      set: v => crt.setBloom?.({ enabled: v }) },
    { id: 'ts-bloomStrength', valId: 'ts-vBloomStrength', key: 'bloomStrength',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setBloom?.({ strength: v }) },
    { id: 'ts-bloomRadius', valId: 'ts-vBloomRadius', key: 'bloomRadius',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setBloom?.({ radius: v }) },
    { id: 'ts-bloomThreshold', valId: 'ts-vBloomThreshold', key: 'bloomThreshold',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setBloom?.({ threshold: v }) },

    // ── Realism pass ──
    { id: 'ts-swim', valId: 'ts-vSwim', key: 'swimAmt',
      toSlider: v => v * 50, fromSlider: v => v / 50,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ swimAmt: v }) },
    { id: 'ts-colorTemp', valId: 'ts-vColorTemp', key: 'colorTempStr',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ colorTempStr: v }) },
    { type: 'checkbox', id: 'ts-snowEnabled', key: 'snowEnabled',
      set: v => crt.setShader({ snowAmt: v ? state.snowAmt : 0 }) },
    { id: 'ts-snow', valId: 'ts-vSnow', key: 'snowAmt',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.snowEnabled) crt.setShader({ snowAmt: v }); } },

    // ── Fidelity pass — Surface: Flicker ──
    { type: 'checkbox', id: 'ts-flickerEnabled', key: 'flickerEnabled',
      set: v => crt.setShader({ flickerAmt: v ? state.flickerAmt : 0 }) },
    { id: 'ts-flickerRate', valId: 'ts-vFlickerRate', key: 'flickerRate',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => v.toFixed(1) + ' Hz',
      set: v => crt.setShader({ flickerRate: v }) },
    { id: 'ts-flickerTau', valId: 'ts-vFlickerTau', key: 'flickerTau',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + ' ms',
      set: v => crt.setShader({ flickerTau: v / 1000 }) },
    { id: 'ts-flickerTauR', valId: 'ts-vFlickerTauR', key: 'flickerTauR',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + ' ms',
      set: v => crt.setShader({ flickerTauR: v / 1000 }) },
    { id: 'ts-flickerTauG', valId: 'ts-vFlickerTauG', key: 'flickerTauG',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + ' ms',
      set: v => crt.setShader({ flickerTauG: v / 1000 }) },
    { id: 'ts-flickerTauB', valId: 'ts-vFlickerTauB', key: 'flickerTauB',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + ' ms',
      set: v => crt.setShader({ flickerTauB: v / 1000 }) },
    { id: 'ts-flickerAmt', valId: 'ts-vFlickerAmt', key: 'flickerAmt',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.flickerEnabled) crt.setShader({ flickerAmt: v }); } },

    // ── Fidelity pass — CRT Shader ──
    { id: 'ts-maskScale', valId: 'ts-vMaskScale', key: 'maskScale',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2) + '×',
      set: v => crt.setShader({ maskScale: v }) },
    { id: 'ts-maskSmooth', valId: 'ts-vMaskSmooth', key: 'maskSmooth',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ maskSmooth: v }) },
    { id: 'ts-defocus', valId: 'ts-vDefocus', key: 'defocusAmt',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ defocusAmt: v }) },
    { id: 'ts-p22', valId: 'ts-vP22', key: 'p22Str',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ p22Str: v }) },
    { id: 'ts-blackLevel', valId: 'ts-vBlackLevel', key: 'blackLevel',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ blackLevel: v }) },

    // ── Fidelity pass — GPU Bloom: core ──
    { id: 'ts-bloomCoreRadius', valId: 'ts-vBloomCoreRadius', key: 'bloomCoreRadius',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setBloom?.({ coreRadius: v }) },
    { id: 'ts-bloomCoreStrength', valId: 'ts-vBloomCoreStrength', key: 'bloomCoreStrength',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setBloom?.({ coreStrength: v }) },

    // ── Fidelity pass — Performance: Persistence ──
    { type: 'checkbox', id: 'ts-persistenceEnabled', key: 'persistenceEnabled',
      set: v => crt.setShader({ persistence: v ? state.persistence : 0 }) },
    { id: 'ts-persistence', valId: 'ts-vPersistence', key: 'persistence',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.persistenceEnabled) crt.setShader({ persistence: v }); } },

    // ── Accuracy pass ──
    { type: 'number', id: 'ts-sourceSizeX', key: 'sourceSizeX',
      set: v => crt.setShader({ sourceSizeX: v }) },
    { type: 'number', id: 'ts-sourceSizeY', key: 'sourceSizeY',
      set: v => crt.setShader({ sourceSizeY: v }) },
    { type: 'checkbox', id: 'ts-interlace', key: 'interlace',
      set: v => crt.setShader({ interlace: v }) },
    { id: 'ts-halationWarm', valId: 'ts-vHalationWarm', key: 'halationWarm',
      toSlider: v => v * 100, fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ halationWarm: v }) },

    // ── Interference pass (SPEC-glitch-interference-v2) ──
    // P0-B: Hum bar
    { id: 'ts-humAmt', valId: 'ts-vHumAmt', key: 'humAmt',
      toSlider: v => v * 1000, fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ humAmt: v }) },
    { id: 'ts-humBars', valId: 'ts-vHumBars', key: 'humBars',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => v.toFixed(0),
      set: v => crt.setShader({ humBars: v }) },
    { id: 'ts-humRate', valId: 'ts-vHumRate', key: 'humRate',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3) + ' Hz',
      set: v => crt.setShader({ humRate: v }) },
    // P0-A: Ghost / multipath echo
    { id: 'ts-ghostOffset', valId: 'ts-vGhostOffset', key: 'ghostOffset',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => v.toFixed(0) + ' px',
      set: v => crt.setShader({ ghostOffset: v }) },
    { id: 'ts-ghostStr', valId: 'ts-vGhostStr', key: 'ghostStr',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ ghostStr: v }) },
    { id: 'ts-ghostTintR', valId: 'ts-vGhostTintR', key: 'ghostTintR',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ ghostTintR: v }) },
    { id: 'ts-ghostTintG', valId: 'ts-vGhostTintG', key: 'ghostTintG',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ ghostTintG: v }) },
    { id: 'ts-ghostTintB', valId: 'ts-vGhostTintB', key: 'ghostTintB',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ ghostTintB: v }) },
    // P1-C: AGC hunting
    { id: 'ts-agcAmt', valId: 'ts-vAgcAmt', key: 'agcAmt',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ agcAmt: v }) },
    { id: 'ts-agcRate', valId: 'ts-vAgcRate', key: 'agcRate',
      toSlider: v => Math.round(v * 10), fromSlider: v => v / 10,
      fmt: v => v.toFixed(1) + ' Hz',
      set: v => crt.setShader({ agcRate: v }) },
    // P2-A: Dot crawl
    { id: 'ts-dotCrawlAmt', valId: 'ts-vDotCrawlAmt', key: 'dotCrawlAmt',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => crt.setShader({ dotCrawlAmt: v }) },
    // P2-B: Burst-loss desaturation
    { id: 'ts-glitchBurstLoss', valId: 'ts-vGlitchBurstLoss', key: 'glitchBurstLoss',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ glitchBurstLoss: v }) },
    // P2-C: VBI bleed
    { id: 'ts-vbiStr', valId: 'ts-vVbiStr', key: 'vbiStr',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => crt.setShader({ vbiStr: v }) },
    { id: 'ts-vbiLines', valId: 'ts-vVbiLines', key: 'vbiLines',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => v.toFixed(0),
      set: v => crt.setShader({ vbiLines: v }) },
  ];

  // ── applyBinding — shared helper used by init loop and import ─
  // Sets state[b.key], updates the DOM control, and calls b.set().
  // For range bindings: non-finite values leave state unchanged (bad JSON protection).
  function applyBinding(b, value) {
    const el = document.getElementById(b.id);
    if (!el) return;
    const isCheck  = b.type === 'checkbox';
    const isSelect = b.type === 'select';
    const isNumber = b.type === 'number';
    const valEl    = b.valId ? document.getElementById(b.valId) : null;

    if (isCheck) {
      state[b.key] = !!value;
      el.checked = state[b.key];
    } else if (isSelect) {
      state[b.key] = value;
      el.value = String(value);
    } else if (isNumber) {
      state[b.key] = value;
      el.value = String(value);
    } else {
      // range slider: only accept finite numbers; leave state unchanged otherwise
      if (typeof value === 'number' && isFinite(value)) {
        state[b.key] = value;
      }
      el.value = b.toSlider(state[b.key]);
      if (valEl) valEl.textContent = b.fmt(state[b.key]);
    }
    b.set(state[b.key]); // always pass the current validated state value
  }

  // ── openEdit — inline edit for .val spans (Feature B) ─────────
  // Defined before the BINDINGS loop so it can be referenced in click handlers.
  function openEdit(b, sliderEl, valEl) {
    if (valEl.querySelector('input')) return; // guard: already editing

    const prev = valEl.textContent; // save before clearing — used to restore on Escape/NaN
    valEl.textContent = '';

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'val-edit';
    // Show raw state value (no unit suffix). Note: halationSharp stores negative values
    // (state = -0.4) while the display shows positive softness (0.40). The raw sign is
    // intentional — power users editing this param type the negative value directly.
    inp.value = String(state[b.key]);
    valEl.appendChild(inp);

    // keydown and blur listeners are attached directly to inp (not via on()) because
    // inp is transient — it is removed from the DOM on commit or cancel, so its listeners
    // are garbage-collected with it. No _listeners registration is needed.
    inp.addEventListener('keydown', e => {
      e.stopPropagation(); // prevent H-key panel close and slider arrow-key interaction
      if (e.key === 'Enter') { inp.blur(); }
      if (e.key === 'Escape') {
        valEl.removeChild(inp);
        valEl.textContent = prev;
        // blur fires synchronously after removeChild; the contains() guard below
        // detects the removal and returns early without committing.
      }
    });

    inp.addEventListener('blur', () => {
      if (!valEl.contains(inp)) return; // already removed by Escape — do not commit

      const parsed = parseFloat(inp.value);
      if (isNaN(parsed)) {
        valEl.removeChild(inp);
        valEl.textContent = prev;
        return;
      }

      // Clamp to valid slider range. Math.min/max over both ends handles inverted sliders
      // (e.g. glitchFreq: fromSlider(min=1)=7.92, fromSlider(max=100)=0.01).
      const lo = Math.min(b.fromSlider(+sliderEl.min), b.fromSlider(+sliderEl.max));
      const hi = Math.max(b.fromSlider(+sliderEl.min), b.fromSlider(+sliderEl.max));
      const v  = Math.max(lo, Math.min(hi, parsed));

      state[b.key] = v;
      sliderEl.value = b.toSlider(v);

      valEl.removeChild(inp);
      valEl.textContent = b.fmt(v);

      b.set(v);
    });

    inp.focus();
    inp.select();
  }

  // ── Export / Import ────────────────────────────────────────────
  function handleExport() {
    // Exclude private state keys (underscore prefix) from exported JSON.
    const exportable = Object.fromEntries(
      Object.entries(state).filter(([k]) => !k.startsWith('_'))
    );
    const json = JSON.stringify({ version: 1, ...exportable }, null, 2);
    const url  = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'telescreen-crt-preset.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  on(fileInput, 'change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    file.text().then(text => {
      let parsed;
      try { parsed = JSON.parse(text); } catch (_) {
        alert('Invalid preset file.'); return;
      }
      if (typeof parsed !== 'object' || parsed === null) {
        alert('Invalid preset file.'); return;
      }
      // version: absent means legacy v1; any other value is rejected
      if (parsed.version !== undefined && parsed.version !== 1) {
        alert(`Unsupported preset version: ${parsed.version}`); return;
      }
      for (const b of BINDINGS) {
        if (parsed[b.key] !== undefined) applyBinding(b, parsed[b.key]);
      }
      fileInput.value = ''; // allow re-importing same file
    }).catch(() => alert('Failed to read preset file.'));
  });

  // ── Preset bar (Export / Import buttons) ──────────────────────
  const bar = document.createElement('div');
  bar.className = 'rr-preset-bar';
  bar.innerHTML =
    '<button class="rr-preset-btn" id="ts-exportPreset">Export JSON</button>' +
    '<button class="rr-preset-btn" id="ts-importPreset">Import JSON</button>';
  document.querySelector('#rr-panel .rr-hdr').insertAdjacentElement('afterend', bar);
  on(document.getElementById('ts-exportPreset'), 'click', handleExport);
  on(document.getElementById('ts-importPreset'), 'click', () => fileInput.click());

  // ── Wire bindings: init control from state, attach event ──────
  for (const b of BINDINGS) {
    applyBinding(b, state[b.key]); // init DOM + apply to shader/CSS

    const el = document.getElementById(b.id);
    if (!el) continue;
    const isCheck  = b.type === 'checkbox';
    const isSelect = b.type === 'select';
    const isNumber = b.type === 'number';
    const valEl    = b.valId ? document.getElementById(b.valId) : null;

    // Wire event — selects/checkboxes/numbers use 'change'; ranges use 'input'
    on(el, (isCheck || isSelect || isNumber) ? 'change' : 'input', e => {
      if (isCheck) {
        state[b.key] = e.target.checked;
      } else if (isSelect) {
        state[b.key] = +e.target.value;
      } else if (isNumber) {
        state[b.key] = +e.target.value;
      } else {
        state[b.key] = b.fromSlider(+e.target.value);
        if (valEl) valEl.textContent = b.fmt(state[b.key]);
      }
      b.set(state[b.key]);
    });

    // Editable label click handler (Feature B) — range bindings only
    if (valEl) {
      on(valEl, 'click', () => openEdit(b, el, valEl));
    }
  }

  // ── Preset select — wired manually (not via BINDINGS) ─────────
  // The BINDINGS framework coerces select values with +e.target.value, which
  // produces NaN for string preset keys like 'trinitron'. Wire the preset
  // select manually so the string key is preserved verbatim in state._preset.
  const presetEl = document.getElementById('ts-preset');
  if (presetEl) {
    presetEl.value = state._preset;  // initialise display to current preset
    on(presetEl, 'change', e => {
      state._preset = e.target.value; // store string key as-is (no numeric coercion)
      applyPreset(state._preset);
    });
  }

  // Apply default preset if PRESETS were supplied.
  if (PRESETS[state._preset]) {
    applyPreset(state._preset);
  }

  return {
    destroy() {
      _listeners.forEach(({ el, event, handler }) => el.removeEventListener(event, handler));
      bar.remove();
      fileInput.remove();
    },
  };
}
