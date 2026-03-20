export function initTelescreenControls(teleCRT) {
  // ── Collapsible section toggles ───────────────────────────────
  document.querySelectorAll('#rr-panel .rr-collapsible').forEach(sec => {
    sec.addEventListener('click', () => {
      const body = document.getElementById(sec.dataset.target);
      sec.classList.toggle('rr-open');
      body.classList.toggle('rr-open');
    });
  });

  // ── Telescreen Glitch controls ────────────────────────────────
  document.getElementById('ts-glitchEnabled').addEventListener('change', e => {
    const str  = document.getElementById('ts-glitchStrength').value / 1000;
    const spd  = document.getElementById('ts-glitchSpeed').value / 10;
    const cols = +document.getElementById('ts-glitchCols').value;
    teleCRT.setGlitch(e.target.checked, str, spd, cols);
  });
  document.getElementById('ts-glitchStrength').addEventListener('input', e => {
    const v = e.target.value / 1000;
    document.getElementById('ts-vGlitchStrength').textContent = v.toFixed(3);
    teleCRT.setGlitch(document.getElementById('ts-glitchEnabled').checked, v);
  });
  document.getElementById('ts-glitchSpeed').addEventListener('input', e => {
    const v = e.target.value / 10;
    document.getElementById('ts-vGlitchSpeed').textContent = v.toFixed(1);
    teleCRT.setGlitch(document.getElementById('ts-glitchEnabled').checked, undefined, v);
  });
  document.getElementById('ts-glitchCols').addEventListener('input', e => {
    const v = +e.target.value;
    document.getElementById('ts-vGlitchCols').textContent = v;
    teleCRT.setGlitch(document.getElementById('ts-glitchEnabled').checked, undefined, undefined, v);
  });

  // ── Telescreen Chromatic Aberration controls ──────────────────
  document.getElementById('ts-chromaEnabled').addEventListener('change', e => {
    const off = document.getElementById('ts-chromaOffset').value / 10000;
    teleCRT.setChroma(e.target.checked, off);
  });
  document.getElementById('ts-chromaOffset').addEventListener('input', e => {
    const v = e.target.value / 10000;
    document.getElementById('ts-vChromaOffset').textContent = v.toFixed(4);
    teleCRT.setChroma(document.getElementById('ts-chromaEnabled').checked, v);
  });

  // ── Telescreen Surface controls ───────────────────────────────
  const tsScratchEl   = document.querySelector('.s9-telescreen__scratches');
  const tsVignetteEl  = document.querySelector('.s9-telescreen__vignette');
  const tsScanlinesEl = document.querySelector('.s9-telescreen__scanlines');
  const tsPhaseEls    = [
    document.querySelector('.s9-telescreen__phase-a'),
    document.querySelector('.s9-telescreen__phase-b'),
    document.querySelector('.s9-telescreen__phase-c'),
  ];
  const tsGlowEl      = document.querySelector('.s9-telescreen__glow');

  document.getElementById('ts-scratchEnabled').addEventListener('change', e => {
    tsScratchEl.style.display = e.target.checked ? '' : 'none';
  });
  document.getElementById('ts-scratchOpacity').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vScratchOpacity').textContent = v.toFixed(2);
    tsScratchEl.style.opacity = v;
  });
  document.getElementById('ts-vignetteEnabled').addEventListener('change', e => {
    tsVignetteEl.style.display = e.target.checked ? '' : 'none';
  });
  document.getElementById('ts-vignetteOpacity').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vVignetteOpacity').textContent = v.toFixed(2);
    tsVignetteEl.style.opacity = v;
  });
  document.getElementById('ts-scanlinesEnabled').addEventListener('change', e => {
    tsScanlinesEl.style.display = e.target.checked ? 'block' : 'none';
  });

  document.getElementById('ts-phaseEnabled').addEventListener('change', e => {
    const d = e.target.checked ? '' : 'none';
    tsPhaseEls.forEach(el => { el.style.display = d; });
  });
  document.getElementById('ts-glowEnabled').addEventListener('change', e => {
    tsGlowEl.style.display = e.target.checked ? '' : 'none';
  });
  document.getElementById('ts-glowOpacity').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vGlowOpacity').textContent = v.toFixed(2);
    tsGlowEl.style.opacity = v;
  });

  // ── CRT Shader controls ───────────────────────────────────────
  document.getElementById('ts-warp').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vWarp').textContent = v.toFixed(2);
    teleCRT.setShader({ warpMult: v });
  });
  document.getElementById('ts-hardPix').addEventListener('input', e => {
    const v = e.target.value / 10;
    document.getElementById('ts-vHardPix').textContent = v.toFixed(1);
    teleCRT.setShader({ hardPix: -v });
  });
  document.getElementById('ts-maskStr').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vMaskStr').textContent = v.toFixed(2);
    teleCRT.setShader({ maskStr: v });
  });
  document.getElementById('ts-grain').addEventListener('input', e => {
    const v = e.target.value / 1000;
    document.getElementById('ts-vGrain').textContent = v.toFixed(3);
    teleCRT.setShader({ grainAmt: v });
  });
  document.getElementById('ts-halation').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('ts-vHalation').textContent = v.toFixed(2);
    teleCRT.setShader({ halationStr: v });
  });
  document.getElementById('ts-convergence').addEventListener('input', e => {
    const v = e.target.value / 10000;
    document.getElementById('ts-vConvergence').textContent = v.toFixed(4);
    teleCRT.setShader({ convergence: v });
  });

}
