import { easeInOutCubic, easeOutExpo, backInOut, linear } from '../../components/ring-reveal/easings.js';
import * as THREE from 'three';

const RR_EASINGS = { easeInOutCubic, easeOutExpo, backInOut, linear };

const RR_PRESETS = {
  default:  { label: 'Default',  lineColor: 0x00ffcc, glowColor: 0x00ffcc, opacity: 0.72, glowOpacity: 0.28, emissiveIntensity: 1.8, stagger: 0.55, ringFade: 0.35, warpAmount: 0.12, direction: 'south-to-north', easingKey: 'easeInOutCubic', durationMs: 2200 },
  pulse:    { label: 'Pulse',    lineColor: 0xff0066, lineColorB: 0xff6600, glowColor: 0xff0044, glowColorB: 0xff4400, opacity: 0.95, glowOpacity: 0.55, emissiveIntensity: 6.0, stagger: 1.00, ringFade: 0.10, warpAmount: 0.20, direction: 'equator-out', easingKey: 'easeOutExpo', durationMs: 1400, glowLayers: 5 },
  scanner:  { label: 'Scanner',  lineColor: 0x00ff66, glowColor: 0x00bb44, opacity: 0.90, glowOpacity: 0.35, emissiveIntensity: 3.0, stagger: 0.96, ringFade: 0.07, warpAmount: 0.03, direction: 'south-to-north', easingKey: 'linear', durationMs: 2200 },
  cosmic:   { label: 'Cosmic',   lineColor: 0x9944ff, lineColorB: 0x00eeff, glowColor: 0x5522cc, glowColorB: 0x0099bb, opacity: 0.75, glowOpacity: 0.38, emissiveIntensity: 2.8, stagger: 0.48, ringFade: 0.38, warpAmount: 0.24, direction: 'equator-out', easingKey: 'easeInOutCubic', durationMs: 3200 },
  ignition: { label: 'Ignition', lineColor: 0xffee00, lineColorB: 0xff2200, glowColor: 0xff9900, glowColorB: 0xff1100, opacity: 0.95, glowOpacity: 0.55, emissiveIntensity: 5.5, stagger: 0.88, ringFade: 0.20, warpAmount: 0.50, direction: 'south-to-north', easingKey: 'backInOut', durationMs: 1600, glowLayers: 4 },
  ghost:    { label: 'Ghost',    lineColor: 0x88aaff, lineColorB: 0x4488ff, glowColor: 0x4499ff, glowColorB: 0x2244cc, opacity: 0.28, glowOpacity: 0.07, emissiveIntensity: 0.8, stagger: 0.68, ringFade: 0.58, warpAmount: 0.42, direction: 'north-to-south', easingKey: 'easeOutExpo', durationMs: 4500 },
  neon:     { label: 'Neon',     lineColor: 0xff00ff, lineColorB: 0x00ffff, glowColor: 0xcc00ff, glowColorB: 0x00ffcc, opacity: 0.85, glowOpacity: 0.45, emissiveIntensity: 4.5, stagger: 0.62, ringFade: 0.28, warpAmount: 0.16, direction: 'south-to-north', easingKey: 'easeOutExpo', durationMs: 2000, glowLayers: 5 },
  solar:    { label: 'Solar',    lineColor: 0xffffff, lineColorB: 0xff7700, glowColor: 0xffdd00, glowColorB: 0xff3300, opacity: 0.80, glowOpacity: 0.50, emissiveIntensity: 6.0, stagger: 1.00, ringFade: 0.18, warpAmount: 0.10, direction: 'equator-out', easingKey: 'easeOutExpo', durationMs: 1600, glowLayers: 4 },
  arctic:   { label: 'Arctic',   lineColor: 0x00eeff, lineColorB: 0xeeffff, glowColor: 0x88ffff, glowColorB: 0xccffff, opacity: 0.62, glowOpacity: 0.22, emissiveIntensity: 2.0, stagger: 0.42, ringFade: 0.42, warpAmount: 0.10, direction: 'north-to-south', easingKey: 'easeInOutCubic', durationMs: 3000 },
  alert:    { label: 'Alert',    lineColor: 0xff8800, lineColorB: 0xff0000, glowColor: 0xff5500, glowColorB: 0xcc0000, opacity: 0.92, glowOpacity: 0.48, emissiveIntensity: 4.5, stagger: 0.78, ringFade: 0.22, warpAmount: 0.22, direction: 'equator-out', easingKey: 'backInOut', durationMs: 1600 },
  ember:    { label: 'Ember',    lineColor: 0xffcc00, lineColorB: 0xff3300, glowColor: 0xff9900, glowColorB: 0xff1100, opacity: 0.68, glowOpacity: 0.32, emissiveIntensity: 3.5, stagger: 0.62, ringFade: 0.52, warpAmount: 0.38, direction: 'south-to-north', easingKey: 'backInOut', durationMs: 3800, glowLayers: 3 },
};

// ── Single source of truth — module-level so rrApplyPreset can update it ──
// Edit values here to change defaults; all controls initialise from this object.
const state = {
  enabled:    false,
  // Animation
  dir:        'south-to-north',
  easing:     'easeInOutCubic',
  dur:        2200,
  stagger:    0.55,
  ringFade:   0.35,
  invert:     false,
  // Appearance — colours stored as CSS hex strings
  lineColor:  '#00ffcc',
  lineColorB: '#00ffcc',
  glowColor:  '#00ffcc',
  glowColorB: '#00ffcc',
  gradMode:   '0',
  opacity:    0.72,
  glowOp:     0.28,
  emissive:   1.8,
  warp:       0.12,
  // Glow
  glowRad:     1.008,
  glowLayers:  3,
  glowStep:    0.004,
  glowFalloff: 0.50,
  // Ring variation
  colorSpread:  0,
  brightSpread: 0,
  flickerAmp:   0,
  flickerSpeed: 2.0,
  arcSpread:    0,
  // Playback
  loopMode: 'play',
  pause:    0,
  morphDur: 800,
};

// Module-level animation instance + loop state
let rrAnim = null;
let rrLooping = false;
let rrLoopTimer = null;

function rrClearTimer() {
  if (rrLoopTimer !== null) { clearTimeout(rrLoopTimer); rrLoopTimer = null; }
}

function rrPauseThen(ms, fn) {
  rrClearTimer();
  if (ms <= 0) fn(); else rrLoopTimer = setTimeout(fn, ms);
}

function rrStopLoop() {
  rrLooping = false;
  rrClearTimer();
  if (rrAnim) rrAnim.stop();
  document.getElementById('rr-loop').classList.remove('active');
}

function rrRunCycle(done) {
  if (!rrAnim) return;
  if (state.loopMode === 'play-reverse') {
    rrAnim.reset();
    rrAnim.play(() => rrPauseThen(state.pause, () => {
      if (!rrLooping) return;
      rrAnim.reverse(() => rrPauseThen(state.pause, done));
    }));
  } else {
    rrAnim.reset();
    rrAnim.play(() => rrPauseThen(state.pause, done));
  }
}

function rrStartLoop() {
  if (!rrLooping) return;
  rrRunCycle(() => { if (rrLooping) rrStartLoop(); });
}

// Helper: set a uniform on base rings + all glow layers
function setUniform(name, v) {
  rrAnim._baseRings.material.uniforms[name].value = v;
  rrAnim._glowLayers.forEach(l => { l.material.uniforms[name].value = v; });
}

// Helper: hex int (0x00ffcc) → CSS string ('#00ffcc')
function hexToCSS(hex) { return '#' + hex.toString(16).padStart(6, '0'); }
// Helper: CSS string → hex int
function cssToHex(s)   { return parseInt(s.slice(1), 16); }

function rrApplyPreset(key, withMorph = true) {
  const p = RR_PRESETS[key];
  if (!p || !rrAnim) return;
  document.querySelectorAll('#rr-presets button').forEach(b => b.classList.remove('active'));
  document.getElementById(`rr-pre-${key}`)?.classList.add('active');

  // Update direction
  if (p.direction) {
    state.dir = p.direction;
    const dirMap = { 'south-to-north': 0, 'north-to-south': 1, 'equator-out': 2 };
    const d = dirMap[p.direction] ?? 0;
    rrAnim._baseRings.material.uniforms.uDirection.value = d;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uDirection.value = d; });
    rrAnim._options.direction = p.direction;
    document.getElementById('rr-dir').value = p.direction;
  }
  if (p.easingKey) {
    state.easing = p.easingKey;
    rrAnim._options.easingFn = RR_EASINGS[p.easingKey];
    document.getElementById('rr-easing').value = p.easingKey;
  }

  // Sync numeric state + sliders
  function syncRange(key, sliderVal, vid, fmt) {
    if (sliderVal === undefined) return;
    state[key] = typeof sliderVal === 'number' ? sliderVal : sliderVal;
    const el = document.getElementById(vid.replace('rr-v', 'rr-'));
    const vEl = document.getElementById(vid);
    if (el) el.value = sliderVal;
    if (vEl && fmt) vEl.textContent = fmt(sliderVal);
  }

  if (p.durationMs !== undefined) {
    state.dur = p.durationMs;
    const el = document.getElementById('rr-dur');
    if (el) el.value = p.durationMs;
    document.getElementById('rr-vDur').textContent = p.durationMs;
    rrAnim._options.durationMs = p.durationMs;
  }
  if (p.opacity !== undefined) {
    state.opacity = p.opacity;
    document.getElementById('rr-opacity').value = Math.round(p.opacity * 100);
    document.getElementById('rr-vOpacity').textContent = p.opacity.toFixed(2);
  }
  if (p.glowOpacity !== undefined) {
    state.glowOp = p.glowOpacity;
    document.getElementById('rr-glowOp').value = Math.round(p.glowOpacity * 100);
    document.getElementById('rr-vGlowOp').textContent = p.glowOpacity.toFixed(2);
  }
  if (p.emissiveIntensity !== undefined) {
    state.emissive = p.emissiveIntensity;
    document.getElementById('rr-emissive').value = Math.round(p.emissiveIntensity * 100);
    document.getElementById('rr-vEmissive').textContent = p.emissiveIntensity.toFixed(2);
  }
  if (p.stagger !== undefined) {
    state.stagger = p.stagger;
    document.getElementById('rr-stagger').value = Math.round(p.stagger * 100);
    document.getElementById('rr-vStagger').textContent = p.stagger.toFixed(2);
  }
  if (p.warpAmount !== undefined) {
    state.warp = p.warpAmount;
    document.getElementById('rr-warp').value = Math.round(p.warpAmount * 100);
    document.getElementById('rr-vWarp').textContent = p.warpAmount.toFixed(2);
  }
  if (p.ringFade !== undefined) {
    const rv = Math.max(0.001, p.ringFade);
    state.ringFade = rv;
    document.getElementById('rr-ringFade').value = Math.round(rv * 100);
    document.getElementById('rr-vRingFade').textContent = rv.toFixed(2);
  }

  // Sync colour pickers + state
  if (p.lineColor  !== undefined) { state.lineColor  = hexToCSS(p.lineColor);  document.getElementById('rr-colLine').value  = state.lineColor; }
  if (p.lineColorB !== undefined) { state.lineColorB = hexToCSS(p.lineColorB); document.getElementById('rr-colLineB').value = state.lineColorB; }
  else if (p.lineColor !== undefined) { state.lineColorB = hexToCSS(p.lineColor); document.getElementById('rr-colLineB').value = state.lineColorB; }
  if (p.glowColor  !== undefined) { state.glowColor  = hexToCSS(p.glowColor);  document.getElementById('rr-colGlow').value  = state.glowColor; }
  if (p.glowColorB !== undefined) { state.glowColorB = hexToCSS(p.glowColorB); document.getElementById('rr-colGlowB').value = state.glowColorB; }
  else if (p.glowColor !== undefined) { state.glowColorB = hexToCSS(p.glowColor); document.getElementById('rr-colGlowB').value = state.glowColorB; }

  // Apply to animation
  const dur = withMorph ? state.morphDur : 0;
  rrAnim.morphTo({
    lineColor:               cssToHex(state.lineColor),
    lineColorB:              cssToHex(state.lineColorB),
    glowColor:               cssToHex(state.glowColor),
    glowColorB:              cssToHex(state.glowColorB),
    opacity:                 p.opacity              ?? state.opacity,
    glowOpacity:             p.glowOpacity          ?? state.glowOp,
    emissiveIntensity:       p.emissiveIntensity    ?? state.emissive,
    stagger:                 p.stagger              ?? state.stagger,
    warpAmount:              p.warpAmount           ?? state.warp,
    ringFade:                p.ringFade             ?? state.ringFade,
    glowLayers:              p.glowLayers           ?? 3,
    glowLayerRadiusStep:     p.glowLayerRadiusStep  ?? 0.004,
    glowLayerOpacityFalloff: p.glowLayerOpacityFalloff ?? 0.5,
  }, dur);
}

function rrInitPanel() {
  if (!rrAnim) return;

  // Build preset buttons
  const grid = document.getElementById('rr-presets');
  Object.entries(RR_PRESETS).forEach(([key, p]) => {
    const btn = document.createElement('button');
    btn.id = `rr-pre-${key}`;
    btn.textContent = p.label;
    btn.addEventListener('click', () => rrApplyPreset(key, true));
    grid.appendChild(btn);
  });
  document.getElementById('rr-pre-default')?.classList.add('active');

  // ── Binding table ───────────────────────────────────────────────
  const BINDINGS = [
    // ── Animation ──
    { type: 'select', id: 'rr-dir', key: 'dir',
      set: v => {
        const dirMap = { 'south-to-north': 0, 'north-to-south': 1, 'equator-out': 2 };
        rrAnim._options.direction = v;
        setUniform('uDirection', dirMap[v] ?? 0);
      },
    },
    { type: 'select', id: 'rr-easing', key: 'easing',
      set: v => { rrAnim._options.easingFn = RR_EASINGS[v]; },
    },
    { id: 'rr-dur', valId: 'rr-vDur', key: 'dur',
      toSlider: v => v, fromSlider: v => +v,
      fmt: v => String(v), set: v => { rrAnim._options.durationMs = v; } },
    { id: 'rr-stagger', valId: 'rr-vStagger', key: 'stagger',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uStagger', v); rrAnim._options.stagger = v; } },
    { id: 'rr-ringFade', valId: 'rr-vRingFade', key: 'ringFade',
      toSlider: v => Math.round(v * 100), fromSlider: v => Math.max(0.001, v / 100),
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uRingFade', v); rrAnim._options.ringFade = v; } },
    { type: 'checkbox', id: 'rr-invert', key: 'invert',
      set: v => rrAnim.setInvert(v) },

    // ── Appearance — colours ──
    { type: 'color', id: 'rr-colLine', key: 'lineColor',
      set: v => { const hex = cssToHex(v); rrAnim._baseRings.material.uniforms.uColor.value.set(hex); rrAnim._options.lineColor = hex; } },
    { type: 'color', id: 'rr-colLineB', key: 'lineColorB',
      set: v => { const hex = cssToHex(v); rrAnim._baseRings.material.uniforms.uColorB.value.set(hex); rrAnim._options.lineColorB = hex; } },
    { type: 'color', id: 'rr-colGlow', key: 'glowColor',
      set: v => { const hex = cssToHex(v); rrAnim._glowLayers.forEach(l => l.material.uniforms.uColor.value.set(hex)); rrAnim._options.glowColor = hex; } },
    { type: 'color', id: 'rr-colGlowB', key: 'glowColorB',
      set: v => { const hex = cssToHex(v); rrAnim._glowLayers.forEach(l => l.material.uniforms.uColorB.value.set(hex)); rrAnim._options.glowColorB = hex; } },
    { type: 'select', id: 'rr-gradMode', key: 'gradMode',
      set: v => rrAnim.setGradientMode(+v) },

    // Opacity only applied when enabled (ring starts hidden until play)
    { id: 'rr-opacity', valId: 'rr-vOpacity', key: 'opacity',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.enabled) { rrAnim._baseRings.material.uniforms.uOpacity.value = v; rrAnim._options.opacity = v; } } },
    { id: 'rr-glowOp', valId: 'rr-vGlowOp', key: 'glowOp',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { if (state.enabled) { rrAnim._glowLayers.forEach((l, i) => { l.material.uniforms.uOpacity.value = v * Math.pow(rrAnim._options.glowLayerOpacityFalloff, i); }); rrAnim._options.glowOpacity = v; } } },
    { id: 'rr-emissive', valId: 'rr-vEmissive', key: 'emissive',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uEmissiveIntensity', v); rrAnim._options.emissiveIntensity = v; } },
    { id: 'rr-warp', valId: 'rr-vWarp', key: 'warp',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uWarpAmount', v); rrAnim._options.warpAmount = v; } },

    // ── Glow ──
    { id: 'rr-glowRad', valId: 'rr-vGlowRad', key: 'glowRad',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3),
      set: v => { const old = rrAnim._options.glowRadius ?? v; if (old !== v) rrAnim._glowLayers.forEach(l => l.scale.multiplyScalar(v / old)); rrAnim._options.glowRadius = v; } },
    { id: 'rr-glowLayers', valId: 'rr-vGlowLayers', key: 'glowLayers',
      toSlider: v => v, fromSlider: v => Math.round(+v),
      fmt: v => String(v), set: v => rrAnim.morphTo({ glowLayers: v }, 0) },
    { id: 'rr-glowStep', valId: 'rr-vGlowStep', key: 'glowStep',
      toSlider: v => Math.round(v * 1000), fromSlider: v => v / 1000,
      fmt: v => v.toFixed(3), set: v => rrAnim.morphTo({ glowLayerRadiusStep: v }, 0) },
    { id: 'rr-glowFalloff', valId: 'rr-vGlowFalloff', key: 'glowFalloff',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2), set: v => rrAnim.morphTo({ glowLayerOpacityFalloff: v }, 0) },

    // ── Ring Variation ──
    { id: 'rr-colorSpread', valId: 'rr-vColorSpread', key: 'colorSpread',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uColorSpread', v); rrAnim._options.colorSpread = v; } },
    { id: 'rr-brightSpread', valId: 'rr-vBrightSpread', key: 'brightSpread',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uBrightSpread', v); rrAnim._options.brightSpread = v; } },
    { id: 'rr-flickerAmp', valId: 'rr-vFlickerAmp', key: 'flickerAmp',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uFlickerAmp', v); rrAnim._options.flickerAmp = v; } },
    { id: 'rr-flickerSpeed', valId: 'rr-vFlickerSpeed', key: 'flickerSpeed',
      toSlider: v => Math.round(v * 10), fromSlider: v => v / 10,
      fmt: v => v.toFixed(1),
      set: v => { setUniform('uFlickerSpeed', v); rrAnim._options.flickerSpeed = v; } },
    { id: 'rr-arcSpread', valId: 'rr-vArcSpread', key: 'arcSpread',
      toSlider: v => Math.round(v * 100), fromSlider: v => v / 100,
      fmt: v => v.toFixed(2),
      set: v => { setUniform('uArcColorSpread', v); rrAnim._options.arcColorSpread = v; } },

    // ── Playback timing (display only, read from state when used) ──
    { type: 'select', id: 'rr-loopMode', key: 'loopMode', set: () => {} },
    { id: 'rr-pause',    valId: 'rr-vPause',    key: 'pause',
      toSlider: v => v, fromSlider: v => +v, fmt: v => String(v), set: () => {} },
    { id: 'rr-morphDur', valId: 'rr-vMorphDur', key: 'morphDur',
      toSlider: v => v, fromSlider: v => +v, fmt: v => String(v), set: () => {} },
  ];

  // ── Bind: init control from state, apply to target, wire event ─
  for (const b of BINDINGS) {
    const el = document.getElementById(b.id);
    if (!el) continue;
    const type  = b.type ?? 'range';
    const valEl = b.valId ? document.getElementById(b.valId) : null;

    if (type === 'checkbox') {
      el.checked = state[b.key];
    } else if (type === 'color' || type === 'select') {
      el.value = state[b.key];
    } else {
      el.value = b.toSlider(state[b.key]);
      if (valEl) valEl.textContent = b.fmt(state[b.key]);
    }
    b.set(state[b.key]);

    const evtName = (type === 'checkbox' || type === 'select') ? 'change' : 'input';
    el.addEventListener(evtName, e => {
      if (type === 'checkbox') state[b.key] = e.target.checked;
      else if (type === 'color' || type === 'select') state[b.key] = e.target.value;
      else {
        state[b.key] = b.fromSlider(+e.target.value);
        if (valEl) valEl.textContent = b.fmt(state[b.key]);
      }
      b.set(state[b.key]);
    });
  }

  // ── Enable checkbox (special: triggers morphTo + play) ─────────
  document.getElementById('rr-enable').addEventListener('change', e => {
    if (!rrAnim) return;
    state.enabled = e.target.checked;
    if (state.enabled) {
      rrAnim.morphTo({ opacity: state.opacity, glowOpacity: state.glowOp }, 400);
      rrAnim.play();
    } else {
      rrStopLoop();
      rrAnim.morphTo({ opacity: 0, glowOpacity: 0 }, 400);
    }
  });

  // ── Playback buttons ───────────────────────────────────────────
  document.getElementById('rr-play').addEventListener('click',  () => { rrStopLoop(); rrAnim.play(); });
  document.getElementById('rr-rev').addEventListener('click',   () => { rrStopLoop(); rrAnim.reverse(); });
  document.getElementById('rr-stop').addEventListener('click',  () => { rrStopLoop(); rrAnim.stop(); });
  document.getElementById('rr-reset').addEventListener('click', () => { rrStopLoop(); rrAnim.reset(); });
  document.getElementById('rr-loop').addEventListener('click',  () => {
    rrLooping = !rrLooping;
    document.getElementById('rr-loop').classList.toggle('active', rrLooping);
    if (rrLooping) rrStartLoop(); else rrStopLoop();
  });
  document.getElementById('rr-once').addEventListener('click', () => {
    rrStopLoop();
    rrLooping = true;
    rrRunCycle(() => { rrLooping = false; });
  });
}

// ── Randomize gradient color buttons ──────────────────────────
function rrRandomNeon() {
  const c = new THREE.Color().setHSL(Math.random(), 0.7 + Math.random() * 0.3, 0.45 + Math.random() * 0.2);
  return (Math.round(c.r * 255) << 16) | (Math.round(c.g * 255) << 8) | Math.round(c.b * 255);
}
function rrMutateColor(hex) {
  const c = new THREE.Color(hex), hsl = {};
  c.getHSL(hsl);
  const h = (hsl.h + (Math.random() - 0.5) * 0.25 + 1) % 1;
  const s = Math.max(0.5, Math.min(1, hsl.s + (Math.random() - 0.5) * 0.3));
  const l = Math.max(0.3, Math.min(0.75, hsl.l + (Math.random() - 0.5) * 0.25));
  const out = new THREE.Color().setHSL(h, s, l);
  return (Math.round(out.r * 255) << 16) | (Math.round(out.g * 255) << 8) | Math.round(out.b * 255);
}

export function initRRPanel(animInstance) {
  rrAnim = animInstance;
  rrInitPanel();

  document.getElementById('rr-randLine').addEventListener('click', () => {
    if (!rrAnim) return;
    const lc = rrRandomNeon(), lcB = rrMutateColor(lc);
    rrAnim.morphTo({ lineColor: lc, lineColorB: lcB }, state.morphDur);
    state.lineColor  = hexToCSS(lc);
    state.lineColorB = hexToCSS(lcB);
    document.getElementById('rr-colLine').value  = state.lineColor;
    document.getElementById('rr-colLineB').value = state.lineColorB;
  });

  document.getElementById('rr-randGlow').addEventListener('click', () => {
    if (!rrAnim) return;
    const gc = rrRandomNeon(), gcB = rrMutateColor(gc);
    rrAnim.morphTo({ glowColor: gc, glowColorB: gcB }, state.morphDur);
    state.glowColor  = hexToCSS(gc);
    state.glowColorB = hexToCSS(gcB);
    document.getElementById('rr-colGlow').value  = state.glowColor;
    document.getElementById('rr-colGlowB').value = state.glowColorB;
  });
}
