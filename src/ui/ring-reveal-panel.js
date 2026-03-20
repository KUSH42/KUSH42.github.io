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

// Module-level state
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
  const mode = document.getElementById('rr-loopMode').value;
  const pause = +document.getElementById('rr-pause').value;
  if (mode === 'play-reverse') {
    rrAnim.reset();
    rrAnim.play(() => rrPauseThen(pause, () => {
      if (!rrLooping) return;
      rrAnim.reverse(() => rrPauseThen(pause, done));
    }));
  } else {
    rrAnim.reset();
    rrAnim.play(() => rrPauseThen(pause, done));
  }
}

function rrStartLoop() {
  if (!rrLooping) return;
  rrRunCycle(() => { if (rrLooping) rrStartLoop(); });
}

function rrApplyPreset(key, withMorph = true) {
  const p = RR_PRESETS[key];
  if (!p || !rrAnim) return;
  document.querySelectorAll('#rr-presets button').forEach(b => b.classList.remove('active'));
  document.getElementById(`rr-pre-${key}`)?.classList.add('active');
  rrAnim._options.durationMs = p.durationMs;
  if (p.direction) {
    document.getElementById('rr-dir').value = p.direction;
    const dirMap = { 'south-to-north': 0, 'north-to-south': 1, 'equator-out': 2 };
    const d = dirMap[p.direction] ?? 0;
    rrAnim._baseRings.material.uniforms.uDirection.value = d;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uDirection.value = d; });
    rrAnim._options.direction = p.direction;
  }
  if (p.easingKey) {
    document.getElementById('rr-easing').value = p.easingKey;
    rrAnim._options.easingFn = RR_EASINGS[p.easingKey];
  }
  document.getElementById('rr-dur').value = p.durationMs;
  document.getElementById('rr-vDur').textContent = p.durationMs;
  const dur = withMorph ? +document.getElementById('rr-morphDur').value : 0;
  rrAnim.morphTo({
    lineColor:               p.lineColor,
    lineColorB:              p.lineColorB   ?? p.lineColor,
    glowColor:               p.glowColor,
    glowColorB:              p.glowColorB   ?? p.glowColor,
    opacity:                 p.opacity,
    glowOpacity:             p.glowOpacity,
    emissiveIntensity:       p.emissiveIntensity,
    stagger:                 p.stagger,
    warpAmount:              p.warpAmount,
    ringFade:                p.ringFade,
    glowLayers:              p.glowLayers              ?? 3,
    glowLayerRadiusStep:     p.glowLayerRadiusStep     ?? 0.004,
    glowLayerOpacityFalloff: p.glowLayerOpacityFalloff ?? 0.5,
  }, dur);
  // Sync sliders
  const s = (id, v, vid, fmt) => {
    if (v === undefined) return;
    document.getElementById(id).value = v;
    if (vid) document.getElementById(vid).textContent = fmt ? fmt(v) : v;
  };
  s('rr-opacity',     p.opacity     !== undefined ? Math.round(p.opacity     * 100) : undefined, 'rr-vOpacity',     v => (v/100).toFixed(2));
  s('rr-glowOp',      p.glowOpacity !== undefined ? Math.round(p.glowOpacity * 100) : undefined, 'rr-vGlowOp',      v => (v/100).toFixed(2));
  s('rr-emissive',    p.emissiveIntensity !== undefined ? Math.round(p.emissiveIntensity * 100) : undefined, 'rr-vEmissive', v => (v/100).toFixed(2));
  s('rr-stagger',     p.stagger  !== undefined ? Math.round(p.stagger * 100)  : undefined, 'rr-vStagger',  v => (v/100).toFixed(2));
  s('rr-warp',        p.warpAmount !== undefined ? Math.round(p.warpAmount * 100) : undefined, 'rr-vWarp',   v => (v/100).toFixed(2));
  if (p.ringFade !== undefined) {
    const rv = Math.max(0.001, p.ringFade);
    s('rr-ringFade', Math.round(rv * 100), 'rr-vRingFade', x => (x/100).toFixed(2));
  }
  if (p.lineColor  !== undefined) document.getElementById('rr-colLine').value  = '#' + p.lineColor.toString(16).padStart(6,'0');
  if (p.lineColorB !== undefined) document.getElementById('rr-colLineB').value = '#' + (p.lineColorB ?? p.lineColor).toString(16).padStart(6,'0');
  if (p.glowColor  !== undefined) document.getElementById('rr-colGlow').value  = '#' + p.glowColor.toString(16).padStart(6,'0');
  if (p.glowColorB !== undefined) document.getElementById('rr-colGlowB').value = '#' + (p.glowColorB ?? p.glowColor).toString(16).padStart(6,'0');
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

  // Enable checkbox
  document.getElementById('rr-enable').addEventListener('change', e => {
    if (!rrAnim) return;
    if (e.target.checked) {
      const op  = +document.getElementById('rr-opacity').value / 100;
      const gop = +document.getElementById('rr-glowOp').value / 100;
      rrAnim.morphTo({ opacity: op, glowOpacity: gop }, 400);
      rrAnim.play();
    } else {
      rrStopLoop();
      rrAnim.morphTo({ opacity: 0, glowOpacity: 0 }, 400);
    }
  });

  // Playback
  document.getElementById('rr-play').addEventListener('click', () => { rrStopLoop(); rrAnim.play(); });
  document.getElementById('rr-rev').addEventListener('click',  () => { rrStopLoop(); rrAnim.reverse(); });
  document.getElementById('rr-stop').addEventListener('click', () => { rrStopLoop(); rrAnim.stop(); });
  document.getElementById('rr-reset').addEventListener('click',() => { rrStopLoop(); rrAnim.reset(); });
  document.getElementById('rr-loop').addEventListener('click', () => {
    rrLooping = !rrLooping;
    document.getElementById('rr-loop').classList.toggle('active', rrLooping);
    if (rrLooping) rrStartLoop(); else rrStopLoop();
  });
  document.getElementById('rr-once').addEventListener('click', () => {
    rrStopLoop();
    rrLooping = true;
    rrRunCycle(() => { rrLooping = false; });
  });

  // Animation params (live)
  document.getElementById('rr-dir').addEventListener('change', e => {
    const dirMap = { 'south-to-north': 0, 'north-to-south': 1, 'equator-out': 2 };
    const d = dirMap[e.target.value] ?? 0;
    rrAnim._options.direction = e.target.value;
    rrAnim._baseRings.material.uniforms.uDirection.value = d;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uDirection.value = d; });
  });
  document.getElementById('rr-easing').addEventListener('change', e => {
    rrAnim._options.easingFn = RR_EASINGS[e.target.value];
  });
  document.getElementById('rr-dur').addEventListener('input', e => {
    rrAnim._options.durationMs = +e.target.value;
    document.getElementById('rr-vDur').textContent = e.target.value;
  });
  document.getElementById('rr-stagger').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vStagger').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uStagger.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uStagger.value = v; });
    rrAnim._options.stagger = v;
  });
  document.getElementById('rr-ringFade').addEventListener('input', e => {
    const v = Math.max(0.001, e.target.value / 100);
    document.getElementById('rr-vRingFade').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uRingFade.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uRingFade.value = v; });
    rrAnim._options.ringFade = v;
  });
  document.getElementById('rr-invert').addEventListener('change', e => { rrAnim.setInvert(e.target.checked); });

  // Appearance
  document.getElementById('rr-colLine').addEventListener('input', e => {
    const hex = parseInt(e.target.value.slice(1), 16);
    rrAnim._baseRings.material.uniforms.uColor.value.set(hex);
    rrAnim._options.lineColor = hex;
  });
  document.getElementById('rr-colLineB').addEventListener('input', e => {
    const hex = parseInt(e.target.value.slice(1), 16);
    rrAnim._baseRings.material.uniforms.uColorB.value.set(hex);
    rrAnim._options.lineColorB = hex;
  });
  document.getElementById('rr-colGlow').addEventListener('input', e => {
    const hex = parseInt(e.target.value.slice(1), 16);
    rrAnim._glowLayers.forEach(l => l.material.uniforms.uColor.value.set(hex));
    rrAnim._options.glowColor = hex;
  });
  document.getElementById('rr-colGlowB').addEventListener('input', e => {
    const hex = parseInt(e.target.value.slice(1), 16);
    rrAnim._glowLayers.forEach(l => l.material.uniforms.uColorB.value.set(hex));
    rrAnim._options.glowColorB = hex;
  });
  document.getElementById('rr-gradMode').addEventListener('change', e => { rrAnim.setGradientMode(+e.target.value); });
  document.getElementById('rr-opacity').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vOpacity').textContent = v.toFixed(2);
    if (document.getElementById('rr-enable').checked) {
      rrAnim._baseRings.material.uniforms.uOpacity.value = v;
      rrAnim._options.opacity = v;
    }
  });
  document.getElementById('rr-glowOp').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vGlowOp').textContent = v.toFixed(2);
    if (document.getElementById('rr-enable').checked) {
      rrAnim._glowLayers.forEach((l, i) => {
        l.material.uniforms.uOpacity.value = v * Math.pow(rrAnim._options.glowLayerOpacityFalloff, i);
      });
      rrAnim._options.glowOpacity = v;
    }
  });
  document.getElementById('rr-emissive').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vEmissive').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uEmissiveIntensity.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uEmissiveIntensity.value = v; });
    rrAnim._options.emissiveIntensity = v;
  });
  document.getElementById('rr-warp').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vWarp').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uWarpAmount.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uWarpAmount.value = v; });
    rrAnim._options.warpAmount = v;
  });

  // Glow
  document.getElementById('rr-glowRad').addEventListener('input', e => {
    const v = e.target.value / 1000;
    document.getElementById('rr-vGlowRad').textContent = v.toFixed(3);
    const old = rrAnim._options.glowRadius;
    rrAnim._glowLayers.forEach(l => l.scale.setScalar(v / old));
    rrAnim._options.glowRadius = v;
  });
  document.getElementById('rr-glowLayers').addEventListener('change', e => {
    const v = +e.target.value;
    document.getElementById('rr-vGlowLayers').textContent = v;
    rrAnim.morphTo({ glowLayers: v }, 0);
  });
  document.getElementById('rr-glowStep').addEventListener('change', e => {
    const v = e.target.value / 1000;
    document.getElementById('rr-vGlowStep').textContent = v.toFixed(3);
    rrAnim.morphTo({ glowLayerRadiusStep: v }, 0);
  });
  document.getElementById('rr-glowFalloff').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vGlowFalloff').textContent = v.toFixed(2);
    rrAnim.morphTo({ glowLayerOpacityFalloff: v }, 0);
  });

  // Ring variation
  document.getElementById('rr-colorSpread').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vColorSpread').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uColorSpread.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uColorSpread.value = v; });
    rrAnim._options.colorSpread = v;
  });
  document.getElementById('rr-brightSpread').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vBrightSpread').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uBrightSpread.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uBrightSpread.value = v; });
    rrAnim._options.brightSpread = v;
  });
  document.getElementById('rr-flickerAmp').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vFlickerAmp').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uFlickerAmp.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uFlickerAmp.value = v; });
    rrAnim._options.flickerAmp = v;
  });
  document.getElementById('rr-flickerSpeed').addEventListener('input', e => {
    const v = e.target.value / 10;
    document.getElementById('rr-vFlickerSpeed').textContent = v.toFixed(1);
    rrAnim._baseRings.material.uniforms.uFlickerSpeed.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uFlickerSpeed.value = v; });
    rrAnim._options.flickerSpeed = v;
  });
  document.getElementById('rr-arcSpread').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rr-vArcSpread').textContent = v.toFixed(2);
    rrAnim._baseRings.material.uniforms.uArcColorSpread.value = v;
    rrAnim._glowLayers.forEach(l => { l.material.uniforms.uArcColorSpread.value = v; });
    rrAnim._options.arcColorSpread = v;
  });

  document.getElementById('rr-morphDur').addEventListener('input', e => {
    document.getElementById('rr-vMorphDur').textContent = e.target.value;
  });
  document.getElementById('rr-pause').addEventListener('input', e => {
    document.getElementById('rr-vPause').textContent = e.target.value;
  });
}

// ── Randomize gradient color buttons ─────────────────────────
function rrRandomNeon() {
  const h = Math.random(), s = 0.7 + Math.random() * 0.3, l = 0.45 + Math.random() * 0.2;
  const c = new THREE.Color().setHSL(h, s, l);
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
function rrSetColorPicker(id, hex) {
  document.getElementById(id).value = '#' + hex.toString(16).padStart(6, '0');
}

export function initRRPanel(animInstance) {
  rrAnim = animInstance;
  rrInitPanel();

  document.getElementById('rr-randLine').addEventListener('click', () => {
    if (!rrAnim) return;
    const lc = rrRandomNeon(), lcB = rrMutateColor(lc);
    const dur = +document.getElementById('rr-morphDur').value;
    rrAnim.morphTo({ lineColor: lc, lineColorB: lcB }, dur);
    rrSetColorPicker('rr-colLine', lc);
    rrSetColorPicker('rr-colLineB', lcB);
  });

  document.getElementById('rr-randGlow').addEventListener('click', () => {
    if (!rrAnim) return;
    const gc = rrRandomNeon(), gcB = rrMutateColor(gc);
    const dur = +document.getElementById('rr-morphDur').value;
    rrAnim.morphTo({ glowColor: gc, glowColorB: gcB }, dur);
    rrSetColorPicker('rr-colGlow', gc);
    rrSetColorPicker('rr-colGlowB', gcB);
  });
}
