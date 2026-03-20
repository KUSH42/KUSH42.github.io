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
}
