/**
 * crt-math.js
 * Pure-JS math utilities for telescreen-crt-webgpu.
 *
 * Zero Three.js / WebGPU dependencies — safe to import in Node.js test environments.
 * Used by telescreen-crt-webgpu.js for compensation calculations that are expensive
 * to verify visually but trivial to unit-test numerically.
 */

// ---------------------------------------------------------------------------
// Flicker brightness compensation
// ---------------------------------------------------------------------------

/**
 * Compute the phosphor-decay flicker brightness compensation factor.
 *
 * Mean of exp(-phase/(τ·f)) over phase ~ U[0,1]:
 *   chanMu(τ) = τ·f · (1 − exp(−1/(τ·f)))
 *
 * P1-A: per-channel BT.709-luminance-weighted mean:
 *   muLuma = 0.2126·muR + 0.7152·muG + 0.0722·muB
 *
 * Returns flickerBoost = 1 / blend(muLuma, 1.0, flickerAmt).
 * When flickerAmt = 0 the result is always 1.0 (no flicker → no compensation needed).
 *
 * Note: interlace does not contribute here — off-field rows are filled from the
 * previous frame (prevTexNode), so the mean brightness is ~1.0, not 0.5.
 *
 * @param {number} tauR       Red-channel phosphor decay time constant (seconds).
 * @param {number} tauG       Green-channel phosphor decay time constant (seconds).
 * @param {number} tauB       Blue-channel phosphor decay time constant (seconds).
 * @param {number} flickerAmt Flicker modulation depth [0, 1].
 * @param {number} flickerRate Frame rate in Hz (e.g. 50, 60).
 * @returns {number} Multiplicative brightness boost factor (≥ 1.0).
 */
export function computeFlickerBoost(tauR, tauG, tauB, flickerAmt, flickerRate) {
  function chanMu(tau) {
    const tf = tau * flickerRate;
    return tf < 1e-9 ? 0 : tf * (1 - Math.exp(-1 / tf));
  }
  const muR    = chanMu(tauR);
  const muG    = chanMu(tauG);
  const muB    = chanMu(tauB);
  const muLuma = 0.2126 * muR + 0.7152 * muG + 0.0722 * muB;
  const eff    = muLuma * flickerAmt + (1 - flickerAmt);
  return 1 / Math.max(eff, 1e-6);
}

// ---------------------------------------------------------------------------
// Mask energy compensation
// ---------------------------------------------------------------------------

/**
 * Compute the mask energy compensation (boost) factor.
 *
 * The phosphor mask attenuates the image by absorbing light in the inter-aperture
 * gaps. mix(1, mask, maskStr) produces a pipeline average transmittance of:
 *   pipelineAvg = 1 − maskStr + maskStr · avg
 *
 * The boost factor (1 / pipelineAvg) restores perceptual brightness regardless
 * of maskStr or mask type.
 *
 * Scale adjustment (DR-6 P2-B): at maskScale > 1 the dark gap occupies a larger
 * fraction of output pixels, lowering the average transmittance:
 *   avg(scale) ≈ floor + (avgBase − floor) / max(scale, 1)
 *
 * @param {number} maskType   Mask type index [0, 7] (float accepted; rounded internally).
 *   0 = Aperture Grille  1 = Shadow Mask  2 = Slot Mask  3 = AG+DotWhite
 *   4 = Delta            5 = VGA          6 = Hi-Aperture Grille  7 = CGWG
 * @param {number} maskSmooth Smooth blend factor [0, 1]. 0 = binary; 1 = soft edges.
 * @param {number} maskStr    Mask strength [0, 1].
 * @param {number} [maskScale=1.0] Effective scale: output pixels per mask cell.
 * @returns {number} Multiplicative boost factor (≥ 1.0).
 */
export function computeMaskBoost(maskType, maskSmooth, maskStr, maskScale = 1.0) {
  if (maskStr < 0.001) return 1.0;

  //                        [AG    SM    Slot  AG+DW Delta VGA   HiAG  CGWG]
  const avgBinaryBase = [0.40, 0.25, 0.31, 0.40, 0.25, 0.40, 0.40, 0.65];
  const avgSmoothBase = [0.25, 0.17, 0.20, 0.25, 0.17, 0.32, 0.25, 0.65];
  const floorMap      = [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.30];

  const idx = Math.max(0, Math.min(7, Math.round(maskType)));
  const s   = Math.max(maskScale, 1.0);

  const scaledBinary = floorMap[idx] + (avgBinaryBase[idx] - floorMap[idx]) / s;
  const scaledSmooth = floorMap[idx] + (avgSmoothBase[idx] - floorMap[idx]) / s;
  const avg          = scaledBinary * (1 - maskSmooth) + scaledSmooth * maskSmooth;

  const pipelineAvg = 1.0 - maskStr + maskStr * avg;
  return 1.0 / Math.max(pipelineAvg, 0.001);
}
