/**
 * crt-presets.js
 * Research-derived settings for five reference CRT archetypes.
 *
 * All tau values are in seconds (shader convention).
 * The controls panel stores tau values in milliseconds internally and divides by 1000
 * before calling setShader — the preset selector handles that conversion automatically.
 *
 * Direct API use: crt.setShader(PRESETS.trinitron)   — no conversion needed.
 * Via controls:   initTelescreenCRTControls(crt, { presets: PRESETS }) — converted automatically.
 *
 * sourceSizeX / sourceSizeY are included as documentation of the archetype's typical
 * source resolution. They are content-specific, not CRT-specific — applyPreset() strips
 * them before calling setShader().
 */

export const PRESETS = {

  /**
   * Sony Trinitron KV-27XBR (1996 NTSC) — canonical home CRT.
   * Aperture grille, 0.52 mm pitch, 9300K factory calibration, 59.94 Hz NTSC.
   * Reference: Sony KV-27XBR service manual.
   */
  trinitron: {
    maskType: 0, maskStr: 0.85, maskScale: 3.91, maskSmooth: 0.12,
    warpMult: 0.20, hardPix: -2.5, hardScan: -8.0,
    brightBoost: 0.55, colorTempStr: 0.65,
    halationStr: 2.0, halationSharp: -0.85,
    convergence: 0.018, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 1.0,
    grainAmt: 0.010, snowAmt: 0.02, swimAmt: 0.12,
    defocusAmt: 0.35, scratchStr: 0.015, scrollRate: 0.05,
    blackLevel: 0.0001, p22Str: 0.40,
    flickerRate: 59.94,
    flickerTauR: 0.00015, flickerTauG: 0.0001, flickerTauB: 0.00015,
    flickerAmt: 0.0, persistence: 0.0,
    interlace: false, halationWarm: 0.0,
    sourceSizeX: 320, sourceSizeY: 240,
  },

  /**
   * Commodore 1084S (1987, shadow mask) — retro computer / console.
   * 0.42 mm dot pitch, ~8500K, 50 Hz PAL field rate.
   * Reference: Commodore 1084S service manual.
   */
  commodore1084: {
    maskType: 1, maskStr: 0.55, maskScale: 3.16, maskSmooth: 0.05,
    warpMult: 0.45, hardPix: -2.0, hardScan: -7.0,
    brightBoost: 0.60, colorTempStr: 0.45,
    halationStr: 2.5, halationSharp: -0.65,
    convergence: 0.028, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.5,
    grainAmt: 0.020, snowAmt: 0.05, swimAmt: 0.25,
    defocusAmt: 0.50, scratchStr: 0.025, scrollRate: 0.06,
    blackLevel: 0.0003, p22Str: 0.40,
    flickerRate: 50.0,
    flickerTauR: 0.0004, flickerTauG: 0.006, flickerTauB: 0.00008,
    flickerAmt: 0.0, persistence: 0.0,
    interlace: false, halationWarm: 0.0,
    sourceSizeX: 384, sourceSizeY: 272,
  },

  /**
   * Sony PVM-14L2 (1991, broadcast monitor) — professional studio monitor.
   * Fine slot mask 0.35 mm, D65 factory calibration, minimal warp.
   * Reference: Sony PVM-14L2 service manual.
   */
  pvm14: {
    maskType: 2, maskStr: 0.30, maskScale: 2.63, maskSmooth: 0.0,
    warpMult: 0.05, hardPix: -3.0, hardScan: -9.0,
    brightBoost: 0.65, colorTempStr: 0.0,
    halationStr: 1.0, halationSharp: -1.5,
    convergence: 0.006, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.5,
    grainAmt: 0.005, snowAmt: 0.0, swimAmt: 0.05,
    defocusAmt: 0.15, scratchStr: 0.005, scrollRate: 0.02,
    blackLevel: 0.0001, p22Str: 0.0,
    flickerRate: 59.94,
    flickerTauR: 0.00015, flickerTauG: 0.0001, flickerTauB: 0.00015,
    flickerAmt: 0.0, persistence: 0.0,
    interlace: false, halationWarm: 0.0,
    sourceSizeX: 0.0, sourceSizeY: 0.0,
  },

  /**
   * Wells-Gardner U3000 (1982, arcade, 240p / 15.75 kHz).
   * Coarse shadow mask 0.60 mm, high brightness, 15 kHz horizontal deflection.
   * Reference: Wells-Gardner U3000 chassis documentation.
   * Note: Street Fighter II (384×224) → adjust sourceSizeX to 384.
   */
  arcade240p: {
    maskType: 1, maskStr: 0.70, maskScale: 4.51, maskSmooth: 0.0,
    warpMult: 0.35, hardPix: -2.0, hardScan: -6.0,
    brightBoost: 0.80, colorTempStr: 0.50,
    halationStr: 3.0, halationSharp: -0.55,
    convergence: 0.040, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.5,
    grainAmt: 0.008, snowAmt: 0.01, swimAmt: 0.40,
    defocusAmt: 0.55, scratchStr: 0.04, scrollRate: 0.08,
    blackLevel: 0.0002, p22Str: 0.45,
    flickerRate: 59.94,
    flickerTauR: 0.00015, flickerTauG: 0.0001, flickerTauB: 0.00015,
    flickerAmt: 0.0, persistence: 0.0,
    interlace: false, halationWarm: 0.0,
    sourceSizeX: 256, sourceSizeY: 224,
  },

  /**
   * Grundig ST 63-751 TOP (1992 PAL, 25″) — European home television.
   * Shadow mask 0.52 mm, D65 / EBU Tech 3273, 576i interlaced.
   * Reference: Grundig 25″ chassis; PAL standard EBU Tech 3273.
   */
  palTv: {
    maskType: 1, maskStr: 0.60, maskScale: 3.91, maskSmooth: 0.08,
    warpMult: 0.55, hardPix: -1.5, hardScan: -7.0,
    brightBoost: 0.58, colorTempStr: 0.0,
    halationStr: 2.8, halationSharp: -0.55,
    convergence: 0.030, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.5,
    grainAmt: 0.030, snowAmt: 0.07, swimAmt: 0.30,
    defocusAmt: 0.55, scratchStr: 0.030, scrollRate: 0.05,
    blackLevel: 0.0003, p22Str: 0.40,
    flickerRate: 50.0,
    flickerTauR: 0.0004, flickerTauG: 0.006, flickerTauB: 0.00008,
    flickerAmt: 0.0, persistence: 0.0,
    interlace: true, halationWarm: 0.0,
    sourceSizeX: 720, sourceSizeY: 576,
  },

};

/** Canonical default — Sony Trinitron KV-27XBR (1996 NTSC). */
export const DEFAULT_PRESET = PRESETS.trinitron;
