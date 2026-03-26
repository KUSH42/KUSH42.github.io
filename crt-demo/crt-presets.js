/**
 * crt-presets.js
 * Research-derived settings for five reference CRT archetypes + six signal source presets.
 *
 * UNIT CONVENTION
 * ───────────────
 * All tau values in CRT archetype presets are in seconds (shader convention).
 * applyPreset() converts flickerTau* from seconds → ms for controls state;
 * persistenceTau is in seconds in both preset and state.
 *
 * SIGNAL_PRESETS use the same seconds convention for any tau values.
 * WARNING: Exported JSON from the controls panel stores flickerTau* in ms
 * (controls-state convention), not seconds — exported files are NOT directly
 * interchangeable with entries here for those keys.
 *
 * USAGE
 * ─────
 * Direct API:   crt.setShader(PRESETS.trinitron)   — no conversion needed
 * Via controls: initTelescreenCRTControls(crt, { presets: PRESETS, signalPresets: SIGNAL_PRESETS })
 *               — TAU conversion and unit handling done automatically
 *
 * CRT presets zero all interference params; use a SIGNAL_PRESET on top to set them.
 * sourceSizeX / sourceSizeY are stripped by applyPreset() (content-specific, not CRT-specific).
 */

export const PRESETS = {

  /**
   * Sony Trinitron KV-27XBR (1996 NTSC) — canonical home CRT.
   * Aperture grille, 0.52 mm pitch, 9300K factory calibration, 59.94 Hz NTSC.
   * Reference: Sony KV-27XBR service manual.
   */
  trinitron: {
    maskType: 0, maskStr: 0.85, maskScale: 3.91, maskSmooth: 0.12, apertureW: 1.0,
    warpMult: 0.20, hardPix: -2.5, hardScan: -8.0,
    brightBoost: 0.55, colorTempStr: 0.65,
    halationStr: 2.0, halationSharp: -0.85, halationWarm: 0.40, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.018, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 1.0,
    grainAmt: 0.010, snowAmt: 0.02, swimAmt: 0.12,
    defocusAmt: 0.22, defocusAniso: 0.85, scratchStr: 0.015, scrollRate: 0.05,
    blackLevel: 0.0001, p22Str: 0.40, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 59.94,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Flat Trinitron panel, late-model AR coating — low scatter.
    glassBlurEnabled: true, glassBlurStr: 0.008, glassBlurRadius: 0.002,
    warpAniso: 0.90,
    interlace: false,  // 240p progressive (console/retro game source); toggle true for 480i broadcast
    // Interference — zeroed; signal source preset sets these
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.08, phosphorAge: 0.00, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 320, sourceSizeY: 240,
  },

  /**
   * Commodore 1084S (1987, shadow mask) — retro computer / console.
   * 0.42 mm dot pitch, ~8500K, 50 Hz PAL field rate.
   * Reference: Commodore 1084S service manual.
   */
  commodore1084: {
    maskType: 1, maskStr: 0.55, maskScale: 3.16, maskSmooth: 0.05, apertureW: 0.67,
    warpMult: 0.45, hardPix: -2.0, hardScan: -7.0,
    brightBoost: 0.60, colorTempStr: 0.45,
    halationStr: 2.5, halationSharp: -0.65, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.028, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.80,
    grainAmt: 0.020, snowAmt: 0.05, swimAmt: 0.25,
    defocusAmt: 0.38, defocusAniso: 0.0, scratchStr: 0.025, scrollRate: 0.06,
    blackLevel: 0.0003, p22Str: 0.40, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 50.0,
    flickerTauR: 0.0004, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // 14" consumer, no AR coating — moderate scatter.
    glassBlurEnabled: true, glassBlurStr: 0.010, glassBlurRadius: 0.002,
    warpAniso: 0.0,
    interlace: false,
    humAmt: 0.0, humBars: 1.0, humRate: 0.05,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.08, phosphorAge: 0.00, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 384, sourceSizeY: 272,
  },

  /**
   * Sony PVM-14L2 (2002, broadcast monitor) — professional studio monitor.
   * Aperture grille 0.25 mm (Sony Trinitron M34KBE11X tube), D65 factory calibration, minimal warp.
   * Same Trinitron technology as KV-27XBR: cylindrical screen, H-only convergence errors.
   * Reference: CRT Database / crtdatabase.com, Sony PVM-14L2 specifications.
   */
  pvm14: {
    maskType: 0, maskStr: 0.30, maskScale: 1.88, maskSmooth: 0.0, apertureW: 1.0,
    warpMult: 0.05, hardPix: -3.0, hardScan: -9.0,
    brightBoost: 0.65, colorTempStr: 0.0,
    halationStr: 1.0, halationSharp: -1.5, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.006, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 1.0,
    grainAmt: 0.005, snowAmt: 0.0, swimAmt: 0.05,
    defocusAmt: 0.15, defocusAniso: 0.85, scratchStr: 0.005, scrollRate: 0.02,
    blackLevel: 0.0001, p22Str: 0.0, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 59.94,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Professional AR coating, 14" — minimal scatter.
    glassBlurEnabled: true, glassBlurStr: 0.002, glassBlurRadius: 0.001,
    warpAniso: 0.90,
    interlace: false,
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.05, phosphorAge: 0.00, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 0, sourceSizeY: 0,
  },

  /**
   * Wells-Gardner U3000 (1982, arcade, 240p / 15.75 kHz).
   * Coarse shadow mask 0.60 mm, high brightness, 15 kHz horizontal deflection.
   * Reference: Wells-Gardner U3000 chassis documentation.
   * Note: Street Fighter II (384×224) → adjust sourceSizeX to 384.
   */
  arcade240p: {
    maskType: 1, maskStr: 0.70, maskScale: 4.51, maskSmooth: 0.0, apertureW: 0.67,
    warpMult: 0.35, hardPix: -2.0, hardScan: -6.0,
    brightBoost: 0.80, colorTempStr: 0.50,
    halationStr: 3.0, halationSharp: -0.55, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.040, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.75,
    grainAmt: 0.008, snowAmt: 0.01, swimAmt: 0.40,
    defocusAmt: 0.41, defocusAniso: 0.0, scratchStr: 0.04, scrollRate: 0.08,
    blackLevel: 0.0002, p22Str: 0.45, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 59.94,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Thick uncoated glass, high-brightness arcade tube — strong scatter.
    glassBlurEnabled: true, glassBlurStr: 0.018, glassBlurRadius: 0.003,
    warpAniso: 0.0,
    interlace: false,
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.10, phosphorAge: 0.20, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 256, sourceSizeY: 224,
  },

  /**
   * Grundig ST 63-751 TOP (1992 PAL, 25″) — European home television.
   * Shadow mask 0.52 mm, D65 / EBU Tech 3273, 576i interlaced.
   * Reference: Grundig 25″ chassis; PAL standard EBU Tech 3273.
   */
  palTv: {
    maskType: 1, maskStr: 0.60, maskScale: 3.91, maskSmooth: 0.08, apertureW: 0.67,
    warpMult: 0.55, hardPix: -1.5, hardScan: -7.0,
    brightBoost: 0.58, colorTempStr: 0.0,
    halationStr: 2.8, halationSharp: -0.55, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.030, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.80,
    grainAmt: 0.030, snowAmt: 0.07, swimAmt: 0.30,
    defocusAmt: 0.41, defocusAniso: 0.0, scratchStr: 0.030, scrollRate: 0.05,
    blackLevel: 0.0003, p22Str: 0.40, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 50.0,
    flickerTauR: 0.0004, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Large 25" tube, thick curved glass, light AR — noticeable scatter.
    glassBlurEnabled: true, glassBlurStr: 0.012, glassBlurRadius: 0.002,
    warpAniso: 0.0,
    interlace: true,
    humAmt: 0.0, humBars: 1.0, humRate: 0.05,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.10, phosphorAge: 0.30, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 720, sourceSizeY: 576,
  },

  /**
   * RCA XL-100 CTC-74 (1975 NTSC) — early solid-state color television.
   * Delta-gun shadow mask 0.70 mm pitch, non-calibrated warm color temp,
   * significant convergence error (manual adjustment), 59.94 Hz NTSC.
   * Reference: RCA XL-100 service data; SMPTE RP-37 P22 phosphor spec.
   * maskScale = 0.70 mm × 7.52 = 5.26. convAspect near 0 — delta gun has
   * radial (not H-only) convergence errors at screen periphery.
   * Configured for 240p game/console source; set interlace: true for 480i broadcast.
   */
  rca1975: {
    maskType: 1, maskStr: 0.78, maskScale: 5.26, maskSmooth: 0.15, apertureW: 0.67,
    warpMult: 0.65, hardPix: -1.4, hardScan: -6.5,
    brightBoost: 0.65, colorTempStr: 0.20,
    halationStr: 3.8, halationSharp: -0.40, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.055, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.15,
    grainAmt: 0.022, snowAmt: 0.03, swimAmt: 0.55,
    defocusAmt: 0.38, defocusAniso: 0.0, scratchStr: 0.040, scrollRate: 0.08,
    blackLevel: 0.0005, p22Str: 0.45, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 59.94,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Old thick borosilicate, no AR coating — heavy scatter.
    glassBlurEnabled: true, glassBlurStr: 0.022, glassBlurRadius: 0.003,
    warpAniso: 0.0,
    interlace: false,  // 240p game source; toggle true for 480i broadcast
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.12, phosphorAge: 0.40, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 320, sourceSizeY: 240,
  },

  /**
   * Emerson MS250R (1988 NTSC) — budget 13″ consumer portable.
   * Coarse PIL shadow mask 0.62 mm pitch, uncalibrated warm-pushed color,
   * heavy barrel warp, 59.94 Hz NTSC. Represents the cheap dorm-room /
   * kitchen TV that was the dominant NTSC viewing device in the late 1980s.
   * maskScale = 0.62 mm × 7.52 = 4.66.
   * Configured for 240p game/console source; set interlace: true for 480i broadcast.
   */
  emerson88: {
    maskType: 1, maskStr: 0.68, maskScale: 4.66, maskSmooth: 0.10, apertureW: 0.67,
    warpMult: 0.65, hardPix: -1.7, hardScan: -7.0,
    brightBoost: 0.62, colorTempStr: 0.30,
    halationStr: 3.3, halationSharp: -0.50, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.050, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.78,
    grainAmt: 0.020, snowAmt: 0.03, swimAmt: 0.42,
    defocusAmt: 0.45, defocusAniso: 0.0, scratchStr: 0.030, scrollRate: 0.07,
    blackLevel: 0.0004, p22Str: 0.40, kernelGamma: 2.5,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 59.94,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Budget 13" consumer, no AR coating — moderate scatter.
    glassBlurEnabled: true, glassBlurStr: 0.014, glassBlurRadius: 0.002,
    warpAniso: 0.0,
    interlace: false,  // 240p game source; toggle true for 480i broadcast
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.10, phosphorAge: 0.35, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 320, sourceSizeY: 240,
  },

  /**
   * NEC MultiSync XP17 (1997 SVGA) — PC desktop monitor.
   * Fine shadow mask 0.25 mm pitch, D6500 factory calibration, 85 Hz progressive,
   * digital convergence, minimal geometry error. Represents the late-90s PC CRT
   * used for Windows 95/98 games at 640×480–1024×768.
   * Set sourceSizeX/Y to your game's native resolution to see scanlines;
   * leave at 0 to use output resolution (scanlines invisible at full HD).
   * maskScale = 0.25 mm × 7.52 = 1.88. kernelGamma = 2.2 (sRGB / PC convention).
   */
  necMultisync: {
    maskType: 1, maskStr: 0.15, maskScale: 1.88, maskSmooth: 0.0, apertureW: 0.67,
    warpMult: 0.04, hardPix: -4.0, hardScan: -10.0,
    brightBoost: 0.75, colorTempStr: 0.0,
    halationStr: 0.30, halationSharp: -2.0, halationWarm: 0.0, halationSpectra: 0.0,
    haloRadius: 0.0, haloStr: 0.0,
    convergence: 0.003, convStaticX: 0.0, convStaticY: 0.0,
    convBX: 0.0, convBY: 0.0, convAspect: 0.5,
    grainAmt: 0.002, snowAmt: 0.0, swimAmt: 0.01,
    defocusAmt: 0.05, defocusAniso: 0.0, scratchStr: 0.002, scrollRate: 0.01,
    blackLevel: 0.0001, p22Str: 0.0, kernelGamma: 2.2,
    bloomCoreRadius: 0.35, bloomCoreStrength: 0.6,
    flickerRate: 85.0,
    flickerTauR: 0.0005, flickerTauG: 0.0001, flickerTauB: 0.00005,
    flickerAmt: 0.0, persistence: 0.0, persistenceTau: 0.0,
    // Good AR coating, flat/thin glass PC monitor — near-negligible scatter.
    glassBlurEnabled: true, glassBlurStr: 0.004, glassBlurRadius: 0.001,
    warpAniso: 0.0,
    interlace: false,
    humAmt: 0.0, humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0, ghostStr: 0.0,
    ghostTintR: 1.0, ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    agcAmt: 0.0, agcRate: 1.2,
    dotCrawlAmt: 0.0, glitchBurstLoss: 0.70, vbiStr: 0.0, vbiLines: 3.0,
    // Novel CRT physics — zeroed per preset; enable individually via setShader
    ehtRippleAmt: 0.0, ehtDecayRate: 4.0, astigAmt: 0.0, astigRadial: 0.5, astigTangential: 0.15,
    glassTintStr: 0.0, glassTintProfile: 0.0, phosphorGrainAmt: 0.0, phosphorGrainScale: 0.5,
    afterglowStr: 0.0, domingAmt: 0.0, domingThermalTau: 3.0,
    phosphorSatAmt: 0.05, phosphorAge: 0.00, phosphorXtalkAmt: 0.0, phosphorXtalkRadius: 0.5,
    sourceSizeX: 0, sourceSizeY: 0,
  },

};

/** Canonical default — Sony Trinitron KV-27XBR (1996 NTSC). */
export const DEFAULT_PRESET = PRESETS.trinitron;

/**
 * Signal source presets — define interference/transmission params.
 * Apply on top of a CRT archetype preset for the full look.
 *
 * Keys are a subset of controls state:
 *   - snowEnabled (bool): controls the snowAmt enable gate in the controls panel
 *   - All other keys are shader params passed directly to crt.setShader()
 *
 * flickerTau* and flickerRate are intentionally absent — those are phosphor properties
 * of the CRT display, defined in PRESETS above. Including them here would cause a unit
 * mismatch (applyBinding expects ms for flickerTau*; these presets use shader seconds).
 *
 * Applied via initTelescreenCRTControls opts.signalPresets, using the same applyBinding
 * loop as JSON import — enable flags are applied before their paired amounts.
 */
export const SIGNAL_PRESETS = {

  /**
   * cleanRgb — Direct RGB or S-Video input.
   * No composite artifacts; all interference zeroed.
   */
  cleanRgb: {
    snowEnabled: false, snowAmt: 0.0,
    humAmt: 0.0,   humBars: 1.0, humRate: 0.06,
    ghostOffset: 0.0,  ghostStr: 0.0,
    ghostTintR: 1.0,   ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.0,
    glitchBurstLoss: 0.70,
    vbiStr: 0.0,   vbiLines: 3.0,
    agcAmt: 0.0,   agcRate: 1.2,
    ringAmt: 0.0, chromaBlur: 0.0, ycDelay: 0.0, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.0,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    tapeDropoutRate: 0.0, tapeFlutterAmt: 0.0, tapeChromaAmt: 0.0,
    vchromaHetAmt: 0.0, vchromaFreq: 4.0, vchromaDrift: 0.3,
    vhsLumaBlur: 0.0, vhsChromaVBlend: 0.0, vhsSwitchStr: 0.0, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.03,
  },

  /**
   * compositeNtsc — Consumer composite NTSC (RCA phono / BNC).
   * Dot-crawl luma/chroma beating. Light ghost from cable reflections.
   */
  compositeNtsc: {
    snowEnabled: true,  snowAmt: 0.008,
    humAmt: 0.003, humBars: 1.0, humRate: 0.06,
    ghostOffset: 4.0,  ghostStr: 0.06,
    ghostTintR: 1.0,   ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.05,
    glitchBurstLoss: 0.60,
    vbiStr: 0.04,  vbiLines: 2.0,
    agcAmt: 0.005, agcRate: 0.8,
    // IF ringing and mild chroma bandwidth limiting (NTSC composite demodulation)
    ringAmt: 0.08, chromaBlur: 1.2, ycDelay: 0.5, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.08,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    tapeDropoutRate: 0.0, tapeFlutterAmt: 0.0, tapeChromaAmt: 0.0,
    vchromaHetAmt: 0.0, vchromaFreq: 4.0, vchromaDrift: 0.3,
    vhsLumaBlur: 0.0, vhsChromaVBlend: 0.0, vhsSwitchStr: 0.0, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.03,
  },

  /**
   * compositeVhs — VHS LP tape playback.
   * Heavy head-switching ghost, colour bleeding, strong AGC, burst-loss desaturation.
   * Reference: JVC BR-S600 at LP tracking noise (~3 Hz).
   */
  compositeVhs: {
    snowEnabled: true,  snowAmt: 0.025,
    humAmt: 0.008, humBars: 1.0, humRate: 0.06,
    ghostOffset: 8.0,  ghostStr: 0.18,
    ghostTintR: 1.0,   ghostTintG: 0.94, ghostTintB: 0.90,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.12,
    glitchBurstLoss: 0.40,
    vbiStr: 0.07,  vbiLines: 3.0,
    agcAmt: 0.022, agcRate: 1.2,
    // VHS tape signal degradation: IF ringing, heavy chroma blur + Y/C delay, cross-color
    ringAmt: 0.18, chromaBlur: 2.5, ycDelay: 1.2, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.18,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    // Tape transport artifacts: flutter, FM chroma noise, occasional dropout
    tapeDropoutRate: 0.004, tapeFlutterAmt: 0.08, tapeFlutterRate: 2.3, tapeChromaAmt: 0.12,
    // VHS 629kHz heterodyne beat: slowly-sweeping iridescent colour mottling from capstan wow
    vchromaHetAmt: 0.08, vchromaFreq: 4.0, vchromaDrift: 0.3,
    // VHS signal processing (SPEC-vhs-signal-artifacts)
    vhsLumaBlur: 1.0, vhsChromaVBlend: 1.0, vhsSwitchStr: 0.6, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.02,
  },

  /**
   * offAirNtsc — Off-air NTSC, rooftop antenna, US terrestrial broadcast.
   * 60 Hz hum bar, multipath ghost, snow, AGC hunting on weak signal.
   * Reference: NTSC-M at ~40 dBµV (suburban fringe).
   */
  offAirNtsc: {
    snowEnabled: true,  snowAmt: 0.035,
    humAmt: 0.022, humBars: 1.0, humRate: 0.06,
    ghostOffset: 12.0, ghostStr: 0.12,
    ghostTintR: 1.0,   ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.09,
    glitchBurstLoss: 0.55,
    vbiStr: 0.05,  vbiLines: 3.0,
    agcAmt: 0.012, agcRate: 1.2,
    // Fringe-signal ringing and chroma degradation (weaker than VHS)
    ringAmt: 0.12, chromaBlur: 1.5, ycDelay: 0.8, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.12,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    tapeDropoutRate: 0.0, tapeFlutterAmt: 0.0, tapeChromaAmt: 0.0,
    vchromaHetAmt: 0.0, vchromaFreq: 4.0, vchromaDrift: 0.3,
    vhsLumaBlur: 0.0, vhsChromaVBlend: 0.0, vhsSwitchStr: 0.0, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.03,
  },

  /**
   * offAirPal — Off-air PAL, rooftop antenna, European terrestrial broadcast.
   * 50 Hz hum rate. PAL phase-alternation suppresses dot crawl vs NTSC.
   * Reference: PAL B/G at ~40 dBµV fringe.
   */
  offAirPal: {
    snowEnabled: true,  snowAmt: 0.06,
    humAmt: 0.025, humBars: 1.0, humRate: 0.05,
    ghostOffset: 8.0,  ghostStr: 0.132,
    ghostTintR: 1.0,   ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.03,
    glitchBurstLoss: 0.50,
    vbiStr: 0.06,  vbiLines: 3.0,
    agcAmt: 0.015, agcRate: 1.0,
    // PAL: slightly wider chroma bandwidth than NTSC, mild ringing, very low cross-color
    // (PAL phase alternation largely cancels cross-color vs NTSC)
    ringAmt: 0.10, chromaBlur: 1.0, ycDelay: 0.6, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.04,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    tapeDropoutRate: 0.0, tapeFlutterAmt: 0.0, tapeChromaAmt: 0.0,
    vchromaHetAmt: 0.0, vchromaFreq: 4.0, vchromaDrift: 0.3,
    vhsLumaBlur: 0.0, vhsChromaVBlend: 0.0, vhsSwitchStr: 0.0, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.03,
  },

  /**
   * betacam — Betacam SP broadcast component video.
   * Near-clean: very faint AGC, minimal ghost on long cable runs. No dot crawl.
   */
  betacam: {
    snowEnabled: true,  snowAmt: 0.002,
    humAmt: 0.001, humBars: 1.0, humRate: 0.06,
    ghostOffset: 3.0,  ghostStr: 0.02,
    ghostTintR: 1.0,   ghostTintG: 0.97, ghostTintB: 0.97,
    ghost2Offset: 0.0, ghost2Str: 0.0, ghost2TintR: 1.0, ghost2TintG: 0.97, ghost2TintB: 0.97,
    dotCrawlAmt: 0.0,
    glitchBurstLoss: 0.70,
    vbiStr: 0.01,  vbiLines: 2.0,
    agcAmt: 0.002, agcRate: 0.6,
    // Component video: no composite ringing or chroma smearing; trace Y/C delay on long cable
    ringAmt: 0.0, chromaBlur: 0.0, ycDelay: 0.2, chromaAMNoise: 0.0, chromaPMNoise: 0.0, crossColorAmt: 0.0,
    ntscCompositeMode: 0.0, ycSeparatorQ: 0.4,
    tapeDropoutRate: 0.0, tapeFlutterAmt: 0.0, tapeChromaAmt: 0.0,
    vchromaHetAmt: 0.0, vchromaFreq: 4.0, vchromaDrift: 0.3,
    vhsLumaBlur: 0.0, vhsChromaVBlend: 0.0, vhsSwitchStr: 0.0, vhsSwitchLines: 8.0, vhsSwitchOffset: 0.03,
  },

};
