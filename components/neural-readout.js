/**
 * components/neural-readout.js
 * NeuralReadout JS API — glitch update, status bar, EKG animation, and ghost coefficient.
 *
 * Usage:
 *   import { glitchUpdate, setStatusBarValue, initEkg, stepNeural }
 *     from './components/neural-readout.js';
 */

// ── glitchUpdate ───────────────────────────────────────────────

/**
 * Execute a DOM mutation via `fn`, then apply `.glitch-enter` on `element`
 * and remove it when the animation completes.
 *
 * @param {HTMLElement} element - element to glitch (typically .s9-neural or a child)
 * @param {Function} fn - synchronous DOM mutation callback
 */
export function glitchUpdate(element, fn) {
  fn();

  // Remove any leftover glitch class before re-triggering
  element.classList.remove('glitch-enter');

  // Force reflow so the browser registers the re-add
  void element.offsetWidth;

  element.classList.add('glitch-enter');
  element.addEventListener(
    'animationend',
    () => element.classList.remove('glitch-enter'),
    { once: true }
  );
}

// ── setStatusBarValue ──────────────────────────────────────────

/**
 * Update a `.s9-neural__status-bar-fill` element to reflect a 0–100 value.
 * Adds `--critical` modifier class when value > 80.
 *
 * @param {HTMLElement} barEl - the .s9-neural__status-bar-fill element
 * @param {number} value - 0 to 100
 */
export function setStatusBarValue(barEl, value) {
  const clamped = Math.max(0, Math.min(100, value));
  barEl.style.width = `${clamped}%`;

  if (clamped < 20) {
    barEl.classList.add('s9-neural__status-bar-fill--critical');
  } else {
    barEl.classList.remove('s9-neural__status-bar-fill--critical');
  }
}

// ── EKG ──────────────────────────────────────────────────────────

const EKG_BEAT_THRESHOLD = 0.37;

// Single heartbeat waveform — returns normalised amplitude [-1, 1] for phase p ∈ [0,1)
function _ekgWave(p) {
  if (p > 0.08 && p < 0.18) return Math.sin((p - 0.08) / 0.10 * Math.PI) * 0.18;  // P wave
  if (p > 0.28 && p < 0.32) return -((p - 0.28) / 0.04) * 0.38;                    // Q dip
  if (p > 0.32 && p < 0.37) return -0.38 + ((p - 0.32) / 0.05) * 1.38;             // R rise
  if (p > 0.37 && p < 0.43) return 1.0  - ((p - 0.37) / 0.06) * 1.28;              // S fall
  if (p > 0.43 && p < 0.49) return -0.28 + ((p - 0.43) / 0.06) * 0.28;             // recovery
  if (p > 0.52 && p < 0.68) return Math.sin((p - 0.52) / 0.16 * Math.PI) * 0.30;   // T wave
  return 0;
}

/**
 * Mount the EKG canvas animation loop.
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLElement} [heartEl] - element to flash on R-peak
 * @returns {{ setBpm(bpm: number): void, destroy(): void }}
 */
export function initEkg(canvas, heartEl) {
  if (!canvas) {
    console.warn('initEkg: canvas element not found');
    return { setBpm() {}, destroy() {} };
  }

  let bpm = 62;
  let phase = 0;
  let prevPhase = 0;
  let lastTs = 0;
  let animId = 0;

  function fireHeartBeat() {
    if (!heartEl) return;
    heartEl.classList.remove('beat');
    void heartEl.offsetWidth;
    heartEl.classList.add('beat');
  }

  function draw() {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;
    const amp = H * 0.44;
    const beatsPerPx = (bpm / 60) / 80;

    ctx.clearRect(0, 0, W, H);

    const col = getComputedStyle(document.documentElement)
      .getPropertyValue('--neon-cyan').trim() || '#00d4b0';

    ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const p = ((phase - (W - 1 - x) * beatsPerPx) % 1 + 1) % 1;
      const y = cy - _ekgWave(p) * amp;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = col;
    ctx.lineWidth = 1;
    ctx.shadowColor = col;
    ctx.shadowBlur = 5;
    ctx.stroke();

    const headY = cy - _ekgWave(phase) * amp;
    ctx.beginPath();
    ctx.arc(W - 1, headY, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  function resize() {
    const w = canvas.clientWidth;
    if (w && canvas.width !== w) canvas.width = w;
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function loop(ts) {
    animId = requestAnimationFrame(loop);
    const dt = lastTs ? ts - lastTs : 16;
    lastTs = ts;
    prevPhase = phase;
    phase = (phase + (bpm / 60) * (dt / 1000)) % 1;

    if (prevPhase < EKG_BEAT_THRESHOLD && phase >= EKG_BEAT_THRESHOLD) {
      fireHeartBeat();
    } else if (prevPhase > phase && phase >= EKG_BEAT_THRESHOLD) {
      fireHeartBeat();
    }

    draw();
  }
  animId = requestAnimationFrame(loop);

  return {
    setBpm(n) { bpm = n; },
    destroy() {
      cancelAnimationFrame(animId);
      ro.disconnect();
    },
  };
}

// ── stepNeural ───────────────────────────────────────────────────

let _ghostCoeff = 98.4;

/**
 * Advance neural/ghost readout one step and update DOM elements.
 * @param {HTMLElement} neuralEl    - .s9-neural host (for glitchUpdate)
 * @param {HTMLElement} ghostValEl
 * @param {HTMLElement} cyberIdxEl
 * @param {HTMLElement} neuralSyncEl
 * @param {HTMLElement} ekgBpmEl
 * @param {{ setBpm(n: number): void }} ekgHandle
 * @returns {number} new ghostCoeff
 */
export function stepNeural(neuralEl, ghostValEl, cyberIdxEl, neuralSyncEl, ekgBpmEl, ekgHandle) {
  _ghostCoeff = Math.max(85, Math.min(100,
    _ghostCoeff + (Math.random() - 0.45) * 1.2));
  const pct = _ghostCoeff.toFixed(1);
  const bpm = Math.round(58 + (100 - _ghostCoeff) / 15 * 12);
  ekgBpmEl.textContent = bpm;
  ekgHandle.setBpm(bpm);
  glitchUpdate(neuralEl, () => {
    ghostValEl.textContent = pct;
    cyberIdxEl.textContent = `${pct}%`;
    neuralSyncEl.textContent = `${Math.round(_ghostCoeff)}%`;
  });
  return _ghostCoeff;
}
