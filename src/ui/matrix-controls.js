export function initMatrixControls(matrixRain) {
  document.getElementById('rain-color').addEventListener('input', e => {
    matrixRain.setColor(e.target.value);
  });
  document.getElementById('rain-opacity').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rain-vOpacity').textContent = v.toFixed(2);
    matrixRain.setOpacity(v);
  });
  document.getElementById('rain-burstBloom').addEventListener('change', e => {
    matrixRain.setBurstBloom(e.target.checked);
  });
  document.getElementById('rain-globeInteract').addEventListener('change', e => {
    matrixRain.setGlobeInteract(e.target.checked);
  });
  document.getElementById('rain-chroma').addEventListener('change', e => {
    const scale = +document.getElementById('rain-chromaScale').value / 100;
    matrixRain.setGlyphChroma(e.target.checked, scale);
  });
  document.getElementById('rain-chromaScale').addEventListener('input', e => {
    const scale = e.target.value / 100;
    document.getElementById('rain-vChromaScale').textContent = scale.toFixed(1);
    if (document.getElementById('rain-chroma').checked) matrixRain.setGlyphChroma(true, scale);
  });
  document.getElementById('rain-heat').addEventListener('change', e => {
    const amt = +document.getElementById('rain-heatAmt').value / 1000;
    matrixRain.setHeat(e.target.checked, amt);
  });
  document.getElementById('rain-heatAmt').addEventListener('input', e => {
    const amt = e.target.value / 1000;
    document.getElementById('rain-vHeatAmt').textContent = amt.toFixed(3);
    matrixRain.setHeat(document.getElementById('rain-heat').checked, amt);
  });
  document.getElementById('rain-streaks').addEventListener('change', e => {
    const amt = +document.getElementById('rain-streakAmt').value / 1000;
    matrixRain.setStreaks(e.target.checked, amt);
  });
  document.getElementById('rain-streakAmt').addEventListener('input', e => {
    const amt = e.target.value / 1000;
    document.getElementById('rain-vStreakAmt').textContent = amt.toFixed(3);
    matrixRain.setStreaks(document.getElementById('rain-streaks').checked, amt);
  });
  document.getElementById('rain-soften').addEventListener('change', e => {
    const str = +document.getElementById('rain-softenStr').value / 1000;
    matrixRain.setSoften(e.target.checked, str);
  });
  document.getElementById('rain-softenStr').addEventListener('input', e => {
    const str = e.target.value / 1000;
    document.getElementById('rain-vSoftenStr').textContent = str.toFixed(3);
    matrixRain.setSoften(document.getElementById('rain-soften').checked, str);
  });
  document.getElementById('rain-depth').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rain-vDepth').textContent = v.toFixed(2);
    matrixRain.setDepth(v);
  });
  document.getElementById('rain-normalStr').addEventListener('input', e => {
    const v = e.target.value / 100;
    document.getElementById('rain-vNormalStr').textContent = v.toFixed(1);
    matrixRain.setNormalStrength(v);
  });

  // ── God Rays controls ─────────────────────────────────────────
  function applyGodRays() {
    const enabled  = document.getElementById('rain-grEnabled').checked;
    const lightX   = document.getElementById('rain-grLightX').value / 100;
    const lightY   = document.getElementById('rain-grLightY').value / 100;
    const density  = document.getElementById('rain-grDensity').value / 100;
    const decay    = document.getElementById('rain-grDecay').value / 100;
    const weight   = document.getElementById('rain-grWeight').value / 100;
    const exposure = document.getElementById('rain-grExposure').value / 100;
    matrixRain.setGodRays(enabled, lightX, lightY, density, decay, weight, exposure);
  }
  document.getElementById('rain-grEnabled').addEventListener('change', applyGodRays);
  [
    ['rain-grLightX',  'rain-vGrLightX',  100, 2],
    ['rain-grLightY',  'rain-vGrLightY',  100, 2],
    ['rain-grDensity', 'rain-vGrDensity', 100, 2],
    ['rain-grDecay',   'rain-vGrDecay',   100, 2],
    ['rain-grWeight',  'rain-vGrWeight',  100, 2],
    ['rain-grExposure','rain-vGrExposure',100, 2],
  ].forEach(([id, vid, div, dec]) => {
    document.getElementById(id).addEventListener('input', e => {
      document.getElementById(vid).textContent = (e.target.value / div).toFixed(dec);
      applyGodRays();
    });
  });
}
