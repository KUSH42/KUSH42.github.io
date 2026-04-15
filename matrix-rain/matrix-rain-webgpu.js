/**
 * matrix-rain-webgpu.js  —  Katakana matrix rain in true 3D space, WebGPU edition.
 *
 * Columns are scattered in a spherical shell around the origin. Each column
 * has randomised position, trail length, brightness, glyph scale, and speed.
 * Billboarded quads always face the camera; depth-scaled for consistent screen
 * presence.  Uses Three.js WebGPU renderer + TSL shaders throughout.
 *
 * Public API
 *   initMatrixRain(element, opts) → handle
 *   destroyMatrixRain(element)
 *
 * Handle methods
 *   destroy(), setColor(hex), setOpacity(v), setDepth(v),
 *   setNormalStrength(v), setSoften(on, strength), setHeat(on, amt),
 *   setStreaks(on, amt), setBurstBloom(on), setGlobeInteract(on),
 *   setGlyphChroma(on, scale), setCharSet(name),
 *   setGodRays(enabled, lightX, lightY, density, decay, weight, exposure),
 *   setBloomThreshold(v), setVignette(v), setScanlines(v), setHoloAberration(v),
 *   setFrozen(bool), setReducedMotion(bool),
 *   triggerGlitch(intensity, duration), triggerSpeedRamp(targetMult, duration),
 *   applyPreset(name)
 *
 * postProcessing modes
 *   'rain'  — default 7-stage pipeline (bloom → heat → phosphor → soften → streaks → holo → god rays → FXAA)
 *   'crt'   — rain chain + CRT (telescreen-crt-webgpu); handle.crt exposes the CRT handle
 *   'none'  — raw scene pass + FXAA only (diagnostic; no bloom, no glow)
 */

import * as THREE from 'three/webgpu';
import { pass, rtt, screenUV, texture, uniform } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';
import { makeUniforms, buildGlyphMaterial } from './matrix-rain-tsl.js';
import { PRESETS } from './matrix-rain-presets.js';
import {
  buildHeatPass,
  buildPhosphorPass,
  buildSoftenPass,
  buildStreakPass,
  buildHoloPass,
  buildGodRaysPass,
  buildFogPass,
  buildDustPass,
  buildRadialChromaPass,
} from './matrix-rain-passes-tsl.js';
import {
  CHAR_SETS,
  applyGlyphWeightLUT,
  atlasFieldModeToValue,
  charToGlyphIdx,
  resolveAtlasDescriptor,
} from './matrix-rain-glyphs.js';
import {
  N_ROWS, CELL_W, CELL_H, WORLD_H,
  configureDistanceFieldTexture, loadMSDF, buildGeometry, CameraController,
} from './matrix-rain-geometry.js';
import {
  CCP_ART, _CCP_POSES, CCP_SLOGANS,
  buildGlowTexture, buildBrailleTexture, buildFlagTexture, buildTiananmenTexture,
  MOSSAD_ART, MOSSAD_SLOGANS, _MOSSAD_POSES,
  buildMossadPortraitTexture, buildIsraeliFlag,
  toHex, ensureMossadScanStyle,
} from './matrix-rain-easter-eggs.js';

// ── WebGL2 TextureNode sampler fix (Three.js r183) ────────────────────────
// On WebGL2, TextureNode.generate('sampler2D') appends '_sampler' to the
// uniform name; WebGL2 GLSL has no separate sampler binding.
// Redirecting to 'property' returns the bare name, which is correct.
{
  const _orig = THREE.TextureNode.prototype.generate;
  THREE.TextureNode.prototype.generate = function _patchedGenerate(builder, output) {
    if (/^sampler/.test(output) && builder.renderer?.backend?.isWebGPUBackend !== true) {
      return _orig.call(this, builder, 'property');
    }
    return _orig.call(this, builder, output);
  };
}

// Fractional part — lifted to module scope so _h2js doesn't allocate a new
// closure on every call (called in O(nCols) loops during message reveal).
function _fract(x) { return x - Math.floor(x); }

// ── Instance registry ─────────────────────────────────────────────────────
const _state = new Map();

// ═════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═════════════════════════════════════════════════════════════════════════

/**
 * Initialise matrix rain on an HTML element.
 *
 * @param {HTMLElement} element   host element — canvas is appended inside it
 * @param {object}  [opts]
 * @param {string}  [opts.color='#00ff70']         glyph tint (hex)
 * @param {number}  [opts.opacity=0.82]            global alpha 0–1
 * @param {string}  [opts.charSet='matrixcode']    named glyph set; see CHAR_SETS
 * @param {string}  [opts.atlasPath=null]          explicit atlas path — overrides charSet.
 *                                                Without explicit metadata this stays on the
 *                                                compatibility decode path.
 * @param {number}  [opts.atlasGlyphCount=null]    explicit glyph count for atlasPath
 * @param {number}  [opts.atlasGridW=null]         explicit atlas grid width for atlasPath
 * @param {number}  [opts.atlasGridH=null]         explicit atlas grid height for atlasPath
 * @param {string}  [opts.atlasFieldMode=null]     'compat' | 'msdf' | 'mtsdf'
 * @param {number}  [opts.atlasPxRange=null]       distance-field pixel range for atlasPath
 * @param {number}  [opts.atlasWidth=null]         atlas texture width in pixels
 * @param {number}  [opts.atlasHeight=null]        atlas texture height in pixels
 * @param {string}  [opts.preset=null]             named preset applied after PP graph is ready
 * @param {object|null} [opts.syncCamera=null]     THREE.Camera to mirror
 * @param {string}  [opts.postProcessing='rain']   pipeline mode: 'rain' | 'crt' | 'none'
 * @param {object}  [opts.crtOpts={}]              options forwarded to buildCRTNodesFromSource; ignored unless postProcessing='crt'
 * @returns {object}  control handle
 */
export function initMatrixRain(element, opts = {}) {
  if (_state.has(element)) destroyMatrixRain(element);
  const stale = element.querySelector('canvas[data-matrix-rain]');
  if (stale) stale.remove();

  const {
    color          = '#00ff70',
    opacity        = 0.82,
    charSet        = 'matrixcode',
    atlasPath      = null,
    atlasGlyphCount = null,
    atlasGridW = null,
    atlasGridH = null,
    atlasFieldMode = null,
    atlasPxRange = null,
    atlasWidth = null,
    atlasHeight = null,
    preset         = null,
    syncCamera     = null,
    externalLoop   = false,
    postProcessing = 'rain',
    crtOpts        = {},
    speedRange     = null,
    trailRange     = null,
  } = opts;

  let _activeCharSet    = charSet;  // mutable; updated by setCharSet()
  let _charSetLoadSeq   = 0;        // incremented each setCharSet call; stale loads abort when seq mismatches

  const _geomParams = {
    speedMin:     speedRange?.[0] ?? 0.8,
    speedMax:     speedRange?.[1] ?? 4.0,
    trailMin:     trailRange?.[0] ?? 0.015,
    trailMax:     trailRange?.[1] ?? 0.050,
    nCols:        600,
    topology:     'shell',
    shellInner:   3.5,
    shellOuter:   8.0,
    rectW:        8.0,
    rectH:        8.0,
    clusterCount: 12,
    clusterSpread: 0.017,
    radialBias:   0.0,
    clusterUniform: 0.0,
    clusterSpeedJitter: 0.18,
    clusterYSpread:    3.0,
    clusterRJitter:    0.20,
    squadSize:         5,
    trailCohesion:     0.7,
    spawnReserves:     48,
    webglCompat: true,
  };
  let _webglCompat = true;

  // Resolve atlas path + grid dimensions from charSet or explicit opts
  const atlasDesc = resolveAtlasDescriptor({
    charSet,
    atlasPath,
    atlasGlyphCount,
    atlasGridW,
    atlasGridH,
    atlasFieldMode,
    atlasPxRange,
    atlasWidth,
    atlasHeight,
  });
  const resolvedPath  = atlasDesc.path;
  const resolvedCount = atlasDesc.glyphCount;
  const resolvedGridW = atlasDesc.gridW;
  const resolvedGridH = atlasDesc.gridH;

  // ── Renderer ─────────────────────────────────────────────────────────
  // Use the adapter's default supported limits. Hard-requesting maxVertexBuffers=16
  // causes device creation to fail on some browsers/drivers even when WebGPU is
  // otherwise available, which then kicks the app down into the WebGL2 fallback.
  const canvas = document.createElement('canvas');
  canvas.dataset.matrixRain = '1';
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  element.appendChild(canvas);
  const renderer = new THREE.WebGPURenderer({
    canvas,
    antialias: false,
    alpha: true,
  });
  let uAspect = null;
  let uInterlaceResY = null;
  let _renderPixelRatio = 1;

  function getRenderPixelBudget() {
    switch (postProcessing) {
      case 'crt':  return 1_250_000;
      case 'rain': return 1_750_000;
      default:     return 3_000_000;
    }
  }

  function getRenderPixelRatio(width, height) {
    const cssW = Math.max(1, width || 1);
    const cssH = Math.max(1, height || 1);
    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
    const budgetRatio = Math.sqrt(getRenderPixelBudget() / (cssW * cssH));
    return Math.max(0.5, Math.min(deviceRatio, budgetRatio));
  }

  function applyRendererResolution(width, height) {
    const cssW = Math.max(1, width || 1);
    const cssH = Math.max(1, height || 1);
    _renderPixelRatio = getRenderPixelRatio(cssW, cssH);
    renderer.setPixelRatio(_renderPixelRatio);
    renderer.setSize(cssW, cssH);
    if (uAspect) uAspect.value = cssW / cssH;
    if (uInterlaceResY) uInterlaceResY.value = cssH * _renderPixelRatio;
  }

  applyRendererResolution(element.clientWidth || 1, element.clientHeight || 1);

  // ── Scene ─────────────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    (element.clientWidth || 1) / (element.clientHeight || 1),
    0.1, 60
  );
  camera.position.set(0, 0, 6);
  camera.lookAt(0, 0, 0);

  const _columnOffset = new THREE.Vector2();
  const camCtrl       = new CameraController(camera);

  // ── Atlas & material ──────────────────────────────────────────────────
  const atlasTex = loadMSDF(resolvedPath);

  const uniforms = makeUniforms(resolvedCount, resolvedGridW, resolvedGridH);
  function applyAtlasUniforms(desc) {
    uniforms.uGlyphCount.value = desc.glyphCount;
    uniforms.uAtlasGridW.value = desc.gridW;
    uniforms.uAtlasGridH.value = desc.gridH;
    uniforms.uAtlasFieldMode.value = atlasFieldModeToValue(desc.fieldMode);
    uniforms.uAtlasPxRange.value = desc.pxRange;
    uniforms.uAtlasTextureSize.value.set(desc.atlasWidth, desc.atlasHeight);
    uniforms.uAtlasMTSDF.value = desc.fieldMode === 'mtsdf' ? 1.0 : 0.0;
  }

  // Apply opts
  const rgb = new THREE.Color(color);
  uniforms.uColor.value.set(rgb.r, rgb.g, rgb.b);
  uniforms.uGlobalAlpha.value = opacity;
  uniforms.uCellW.value       = CELL_W;
  uniforms.uCellH.value       = CELL_H;
  uniforms.uWorldH.value      = WORLD_H;
  uniforms.uNRows.value       = N_ROWS;
  applyAtlasUniforms(atlasDesc);

  let material = buildGlyphMaterial(uniforms, atlasTex, { webglCompat: _webglCompat });
  applyGlyphWeightLUT(charSet, resolvedCount, uniforms);
  let geom     = buildGeometry(_geomParams);
  const mesh     = new THREE.Mesh(geom, material);
  mesh.frustumCulled = false;
  mesh.renderOrder   = 1;
  scene.add(mesh);

  // ── Phosphor persistence ──────────────────────────────────────────────
  // prevRT is lazily created at full renderer resolution on first use.
  const phosphorDecay = uniform(0.88);
  let prevRT     = null;
  let prevW      = 0;
  let prevH      = 0;

  // Dummy 1×1 target to satisfy the texture node before the first real RT is created.
  const dummyRT        = new THREE.RenderTarget(1, 1, { type: THREE.HalfFloatType });
  const phosphorPrevTex = texture(dummyRT.texture, screenUV);

  function ensurePrevRT() {
    const w = renderer.domElement.width;
    const h = renderer.domElement.height;
    if (prevRT && prevW === w && prevH === h) return;
    if (prevRT) { try { prevRT.dispose(); } catch (_) {} }
    prevRT = new THREE.RenderTarget(w, h, { type: THREE.HalfFloatType });
    prevW  = w;
    prevH  = h;
    phosphorPrevTex.value = prevRT.texture;
  }

  // ── Aspect uniform shared between streak pass and resize ──────────────
  uAspect        = uniform((element.clientWidth || 1) / (element.clientHeight || 1));
  uInterlaceResY = uniform((element.clientHeight || 720) * _renderPixelRatio);

  // Track factory result so resize path can dispose all RTTNodes (not just phosphor RT)
  let currentRainNodes = null;

  // ── PP state mirror — survives pass-builder rebuilds (e.g. on fullscreen) ──
  // Initialised to pass-builder defaults; updated by every set*() that touches nodes.
  const _ppState = {
    bloomStrength:  1.15,
    softenStrength: 0.002,
    heatAmt:        0.004,
    streakAmt:      0.055,
    vignette:       0.42,
    scanlines:      0.045,
    aberration:     0.0025,
    godRays: {
      enabled: true,
      lightX:  0.5,
      lightY:  0.75,
      density: 0.93,
      decay:   0.96,
      weight:  0.35,
      exposure: 0.45,
    },
    radialChromaAmt: 0.0,
    interlaceAmt:    0.0,
    fogAmt:          0.0,
    fogColor:        '#00100a',
    dustAmt:         0.0,
  };

  function _restorePP(nodes) {
    const pb = nodes.passBuilders;
    if (pb._bloomNode) {
      pb._bloomNode.strength.value  = _ppState.bloomStrength;
      pb._bloomNode.threshold.value = bloomThreshold;
    }
    if (pb._softenBuild)  pb._softenBuild.uBlurStrength.value = _ppState.softenStrength;
    if (pb._heatBuild)    pb._heatBuild.uHeatAmt.value        = _ppState.heatAmt;
    if (pb._streakBuild)  pb._streakBuild.uStreakAmt.value    = _ppState.streakAmt;
    if (pb._holoBuild) {
      pb._holoBuild.uVignetteStrength.value = _ppState.vignette;
      pb._holoBuild.uScanlineOpacity.value  = _ppState.scanlines;
      pb._holoBuild.uAberrationAmt.value    = _ppState.aberration;
    }
    if (pb._godRaysBuild) {
      const g = _ppState.godRays;
      pb._godRaysBuild.uEnabled.value    = g.enabled ? 1.0 : 0.0;
      pb._godRaysBuild.uLightPos.value.x = g.lightX;
      pb._godRaysBuild.uLightPos.value.y = g.lightY;
      pb._godRaysBuild.uDensity.value    = g.density;
      pb._godRaysBuild.uDecay.value      = g.decay;
      pb._godRaysBuild.uWeight.value     = g.weight;
      pb._godRaysBuild.uExposure.value   = g.exposure;
    }
    if (pb._radialChromaBuild) {
      pb._radialChromaBuild.uRadialChromaticAmt.value = _ppState.radialChromaAmt;
    }
    if (pb._holoBuild?.uInterlaceAmt) {
      pb._holoBuild.uInterlaceAmt.value = _ppState.interlaceAmt;
      // uInterlaceResY is a scope-level uniform — value persists across rebuilds
    }
    if (pb._fogBuild) {
      pb._fogBuild.uFogAmt.value = _ppState.fogAmt;
      const fc = new THREE.Color(_ppState.fogColor);
      pb._fogBuild.uFogColor.value.set(fc.r, fc.g, fc.b);
    }
    if (pb._dustBuild) pb._dustBuild.uDustAmt.value = _ppState.dustAmt;
  }

  // ── Post-processing pipeline object (THREE.RenderPipeline) ───────────
  // Named 'pp' to avoid collision with the 'postProcessing' option string.
  let pp            = null;
  let pp_rainNodes  = null;   // rain node chain in 'crt' mode
  let crtHandle     = null;   // CRT handle in 'crt' mode
  let firstRenderDone = false;
  let bloomThreshold  = 0.20;   // static threshold; burst bloom overrides transiently

  // ── Node factory (called by buildPP and by bridge via handle.buildNodes) ──────
  function buildMatrixRainNodes(sceneColorNode) {
    const bloomNode     = bloom(sceneColorNode, 1.15, 0.45);
    bloomNode.threshold.value = 0.20;
    const afterBloomRtt = rtt(sceneColorNode.add(bloomNode));

    const heatBuild    = buildHeatPass(afterBloomRtt);
    const afterHeatRtt = rtt(heatBuild.outputNode);

    const phosphorBuild = buildPhosphorPass(afterHeatRtt, phosphorPrevTex, phosphorDecay);
    const rttPhosphor   = rtt(phosphorBuild.outputNode);

    const softenBuild    = buildSoftenPass(rttPhosphor);
    const afterSoftenRtt = rtt(softenBuild.outputNode);

    const streakBuild = buildStreakPass(afterSoftenRtt, uAspect);
    const rttPreHolo  = rtt(streakBuild.outputNode);

    const holoBuild     = buildHoloPass(rttPreHolo, uInterlaceResY);
    const rttPreGodRays = rtt(holoBuild.outputNode);

    const godRaysBuild = buildGodRaysPass(rttPreGodRays);
    godRaysBuild.uEnabled.value = 1.0;

    // B5: fog
    const rttPreFog  = rtt(godRaysBuild.outputNode);
    const fogBuild   = buildFogPass(rttPreFog);

    // B6: dust — takes raw outputNode, no custom UV sampling
    const dustBuild  = buildDustPass(fogBuild.outputNode);

    // B1: radial chroma — requires TextureNode input for custom UV sampling
    const rttPreRadialChroma = rtt(dustBuild.outputNode);
    const radialChromaBuild  = buildRadialChromaPass(rttPreRadialChroma);

    const rttPreFxaa = rtt(radialChromaBuild.outputNode);

    function postRender(rdr) {
      ensurePrevRT();
      if (rttPhosphor?.renderTarget && prevRT) {
        rdr.copyTextureToTexture(rttPhosphor.renderTarget.texture, prevRT.texture);
      }
    }

    function dispose() {
      for (const n of [afterBloomRtt, afterHeatRtt, rttPhosphor, afterSoftenRtt,
                        rttPreHolo, rttPreGodRays, rttPreFog, rttPreRadialChroma, rttPreFxaa]) {
        try { n?.renderTarget?.dispose(); } catch (_) {}
      }
    }

    return {
      outputNode: rttPreFxaa,
      rttPhosphor,
      passBuilders: {
        _bloomNode:          bloomNode,
        _heatBuild:          heatBuild,
        _softenBuild:        softenBuild,
        _streakBuild:        streakBuild,
        _holoBuild:          holoBuild,
        _godRaysBuild:       godRaysBuild,
        _fogBuild:           fogBuild,
        _dustBuild:          dustBuild,
        _radialChromaBuild:  radialChromaBuild,
      },
      postRender,
      dispose,
    };
  }

  // Stores result in currentRainNodes so tick() and resize path can access it.
  // Re-applies _ppState so rebuilds (e.g. on fullscreen resize) restore user settings.
  function buildNodesInternal(sceneColorNode) {
    const nodes = buildMatrixRainNodes(sceneColorNode);
    currentRainNodes = nodes;
    _restorePP(nodes);
    return nodes;
  }

  // Standalone post-processing: wraps factory into a THREE.RenderPipeline
  function buildPP() {
    const sceneColorNode = pass(scene, camera).getTextureNode('output');
    const nodes = buildNodesInternal(sceneColorNode);
    const pipeline    = new THREE.RenderPipeline(renderer);
    pipeline.outputNode    = fxaa(nodes.outputNode);
    pipeline._rttPhosphor  = nodes.rttPhosphor;
    pipeline._bloomNode          = nodes.passBuilders._bloomNode;
    pipeline._heatBuild          = nodes.passBuilders._heatBuild;
    pipeline._softenBuild        = nodes.passBuilders._softenBuild;
    pipeline._streakBuild        = nodes.passBuilders._streakBuild;
    pipeline._holoBuild          = nodes.passBuilders._holoBuild;
    pipeline._godRaysBuild       = nodes.passBuilders._godRaysBuild;
    pipeline._fogBuild           = nodes.passBuilders._fogBuild;
    pipeline._dustBuild          = nodes.passBuilders._dustBuild;
    pipeline._radialChromaBuild  = nodes.passBuilders._radialChromaBuild;
    pipeline._bloomNode.threshold.value = bloomThreshold;
    return pipeline;
  }

  // ── Message reveal state ──────────────────────────────────────────────
  let msgState        = 'idle';  // 'idle' | 'revealing' | 'holding' | 'fading'
  let msgHoldDuration = 0;       // hold duration in seconds
  let msgHoldEnd      = 0;       // absolute timestamp when hold ends
  let msgFadeSpeed    = 0;       // progress units per second (1/fadeDuration)
  let msgFadeStart    = 0;       // absolute timestamp when fading began (for stagger)
  let msgRevealEnd         = 0;    // absolute timestamp when reveal phase ends
  let msgRevealFallbackT   = 0;    // timestamp for fallback spawn (92% of revealDuration — last resort)
  let msgTolMultMin        = 4;    // hitbox multiplier at reveal start
  let msgTolMultMax        = 18;   // hitbox multiplier at reveal end
  let msgTolMinScale       = 1.3;  // minimum aScale floor for tolerance
  let msgRevealStart       = 0;    // absolute timestamp when reveal began

  // Per-reveal slot/column state (reset on each showMessage)
  let _msgSlots        = [];      // charSlots[]: { xCenter, xHalf, glyph, claimed, colIdx }
  let _msgClaimedCount = 0;       // how many slots are claimed (avoids O(n) .every each frame)
  let _msgWorldYs      = [];      // world Y per line (1-element for single-line messages)
  let _msgUVToLocalX   = 0;       // world units per horizontal screen UV, set at showMessage time
  let _msgUVToLocalY   = 0;       // world units per vertical screen UV, set at showMessage time
  let _msgTrackCamera  = false;   // true = per-tick camera-Y tracking (Change 4)
  let _msgCamY0        = 0;       // camera.y at showMessage call time (Change 4)
  let _msgLockedCols   = new Set(); // column indices currently locked
  let _msgSpawnCols    = new Map(); // colIdx → worldY: columns with spawnActive=1 (force-render)
  let _msgAssigned     = new Map(); // colIdx → slotIdx: columns assigned but not yet locked
  // Round 2 improvements
  let _msgAspect0         = 1;       // D1: canvas aspect at showMessage time; updated on resize during reveal
  let _msgOnHold          = null;    // C1: callback fired at revealing→holding transition
  let _msgOnComplete      = null;    // C1: callback fired after fading completes (at end of _clearAllLocks)
  let _msgExitGlitch      = false;   // B2: fire glitch at hold→fading transition
  let _msgExitGlitchIntensity = 0.8; // B2: glitch peak intensity
  let _msgExitGlitchDuration  = 0.3; // B2: glitch duration in seconds
  let _msgFadeSpread      = 0;       // B1: stagger window in seconds (0=all fade together)
  let _msgFadeDir         = 'left';  // B1: 'left'|'right'|'center-out'|'random'
  let _msgFadeDuration    = 1.0;     // B1: mirrors fadeDuration at showMessage time
  let _msgFreezeTrailDuration = 0;   // B3: seconds to hold trail after fade completes (0=off)
  let _msgQueue           = [];      // C2: queued messages [{text, opts}]
  let _msgReserveScreenXs = null;    // D3: Float32Array of pre-projected reserve-column screen Xs

  // ── CCP easter egg state ───────────────────────────────────────────────
  let _ccpActive      = false;
  let _ccpFadeT       = 0;       // 0 = hidden, 1 = fully visible
  let _ccpFadeDir     = 0;       // +1 fading in, -1 fading out, 0 stable
  let _ccpPanels      = [];      // { mesh, canvasTex, phase, yBase }
  let _ccpFlashHz     = 1.2;
  let _ccpPeakOpacity = 0.72;
  let _ccpScale       = 1.0;
  let _ccpPanelCount  = 3;
  let _ccpOrbitSpeed  = 0.0;
  let _ccpOrbitAngle  = 0.0;
  // Expansion state
  let _ccpSaved        = null;
  let _ccpRainOverride = true;
  let _currentCharSet  = charSet;  // tracks active charset name; updated in setCharSet()
  let _ccpSloganActive = true;
  let _ccpSloganTimer  = null;
  let _ccpSloganIdx    = 0;
  let _ccpExtraMeshes  = [];      // flag + Tiananmen panel meshes

  // ── Mossad easter egg state ────────────────────────────────────────────
  let _mossadActive          = false;
  let _mossadFadeT           = 0;       // 0 = hidden, 1 = fully visible
  let _mossadFadeDir         = 0;       // +1 fading in, -1 fading out, 0 stable
  let _mossadPanels          = [];      // { mesh, canvasTex, az, r, phase, yBase, type }
  let _mossadFlashHz         = 0.9;
  let _mossadPeakOpacity     = 0.68;
  let _mossadScale           = 1.0;
  let _mossadPanelCount      = 3;       // portrait count 1–3 (flag always added separately)
  let _mossadOrbitSpeed      = 0.0;
  let _mossadOrbitAngle      = 0.0;
  let _mossadRainOverride    = true;
  let _mossadSaved           = null;    // { colorR/G/B, color2R/G/B, charSet, vignette, aberration }
  let _mossadSloganIdx       = 0;
  let _mossadAudioEnabled    = false;
  let _mossadCounterInterval = null;

  // ── Animate ───────────────────────────────────────────────────────────
  const animRef = { id: 0 };
  let prevTs = 0;
  let burstBloomTimer  = 0;
  let lastBurstBucket  = -1;
  let burstBloomActive = true;
  let _bloomBreathEnabled = false;
  let _bloomBreathRate    = 0.25;   // Hz — full cycles per second
  let _bloomBreathAmp     = 0.08;   // amplitude — threshold swings ±0.08 around base

  // Animation state
  let _frozen         = false;
  let _rampGeneration = 0;
  let _glitchTimerId  = null;  // setTimeout ID from triggerGlitch; cancelled on destroy
  let _reducedMotion  = false;
  let _baseSpeedMul   = uniforms.uSpeedMul.value;
  let _baseWaveAmt    = uniforms.uWaveAmt.value;
  let _baseEntrainAmt = uniforms.uEntrainAmt.value;
  let _baseScanSyncAmt = uniforms.uScanSyncAmt.value;
  let _spawnWaveAnim  = null;  // { startTime, endTime, startFront, endFront, easing } or null
  let _scanAnim       = null;  // { state:'sweeping'|'dissolving', startTime, endTime, sweepSpeed, dissolveTime } or null

  // Scratch objects reused across ticks — avoids per-tick allocations in the message state machine
  const _msgTv    = new THREE.Vector4();
  const _msgVpMat = new THREE.Matrix4();

  // syncCamera reference — assigned to state after state object is created
  let activeSyncCamera = syncCamera;

  function _effectiveBloomThreshold(t) {
    if (!_bloomBreathEnabled) return bloomThreshold;
    return bloomThreshold + Math.sin(t * _bloomBreathRate * Math.PI * 2) * _bloomBreathAmp;
  }

  function _effectiveScanSyncAmt(v) {
    const clamped = Math.max(0, Math.min(1, v));
    return _reducedMotion ? Math.min(clamped, 0.65) : clamped;
  }

  function _applyReducedMotionTargets() {
    uniforms.uSpeedMul.value   = _reducedMotion ? Math.min(_baseSpeedMul, 2.0) : _baseSpeedMul;
    uniforms.uWaveAmt.value    = _reducedMotion ? 0.0 : _baseWaveAmt;
    uniforms.uEntrainAmt.value = _reducedMotion ? Math.min(_baseEntrainAmt, 0.06) : _baseEntrainAmt;
    if (!_scanAnim) {
      uniforms.uScanSyncAmt.value = _effectiveScanSyncAmt(_baseScanSyncAmt);
    }
  }

  // ── Per-frame state tick (called by animate() in standalone mode, or by bridge) ──
  function tick(t) {
    const dt = prevTs > 0 ? t - prevTs : 1.0 / 60.0;
    prevTs = t;

    if (!_frozen) uniforms.uTime.value = t;

    if (!activeSyncCamera) {
      camCtrl.tick(dt);
      if (camCtrl._columnFollow) {
        uniforms.uColumnOffset.value.set(camera.position.x, camera.position.z);
        _columnOffset.set(camera.position.x, camera.position.z);
      }
      if (camCtrl._mode !== 'none') {
        camCtrl.updateFrustumCull(mesh, _columnOffset, _geomParams.nCols);
      }
    }

    if (activeSyncCamera) {
      camera.position.copy(activeSyncCamera.position);
      camera.quaternion.copy(activeSyncCamera.quaternion);
      camera.fov  = activeSyncCamera.fov;
      camera.near = activeSyncCamera.near;
      camera.far  = activeSyncCamera.far;
      camera.updateProjectionMatrix();
    }

    if (camera.position.lengthSq() > 0.001) {
      const az = Math.atan2(camera.position.x, camera.position.z) + Math.PI / 3;
      uniforms.uLightDir.value.set(
        Math.sin(az) * 0.6, 0.8, Math.cos(az) * 0.6
      ).normalize();
    }

    const bloomNode = currentRainNodes?.passBuilders?._bloomNode;
    if (bloomNode) {
      if (burstBloomActive) {
        const burstBucket = Math.floor(t / 4.0);
        if (burstBucket !== lastBurstBucket) {
          lastBurstBucket = burstBucket;
          burstBloomTimer = 0.30;
        }
        if (burstBloomTimer > 0) {
          burstBloomTimer = Math.max(0, burstBloomTimer - dt);
          const surge = 1 - burstBloomTimer / 0.30;
          const burstLow = bloomThreshold * 0.5;
          bloomNode.threshold.value = surge < 0.2
            ? THREE.MathUtils.lerp(bloomThreshold, burstLow, surge / 0.2)
            : THREE.MathUtils.lerp(burstLow, bloomThreshold, (surge - 0.2) / 0.8);
        } else {
          bloomNode.threshold.value = _effectiveBloomThreshold(t);
        }
      } else {
        bloomNode.threshold.value = _effectiveBloomThreshold(t);
      }
    }

    // ── Spawn wave animation ──────────────────────────────────────────────
    if (_spawnWaveAnim) {
      const { startTime, endTime, startFront, endFront, easing } = _spawnWaveAnim;
      const elapsed  = t - startTime;
      const duration = endTime - startTime;
      let tw = Math.max(0, Math.min(1, elapsed / duration));
      if (easing === 'ease-in')  tw = tw * tw;
      if (easing === 'ease-out') tw = 1 - (1 - tw) * (1 - tw);
      if (easing === 'ease')     tw = tw < 0.5 ? 2 * tw * tw : 1 - Math.pow(-2 * tw + 2, 2) / 2;
      uniforms.uSpawnWaveFront.value = startFront + (endFront - startFront) * tw;
      if (elapsed >= duration) _spawnWaveAnim = null;
    }

    // ── Scanline sweep animation ──────────────────────────────────────────
    if (_scanAnim) {
      const { state, startTime, endTime, sweepSpeed, dissolveTime } = _scanAnim;
      const elapsed  = t - startTime;
      const duration = endTime - startTime;
      const tw = Math.max(0, Math.min(1, elapsed / duration));

      if (state === 'sweeping') {
        uniforms.uScanPhase.value   = elapsed * sweepSpeed;
        // Track scan front world Y (median column: aYOff≈0) for the scanline glow
        uniforms.uScanWorldY.value  = uniforms.uWorldH.value * 0.5 - elapsed * sweepSpeed;
        if (tw >= 1.0) {
          _scanAnim = { state: 'dissolving',
                        startTime: t, endTime: t + dissolveTime,
                        sweepSpeed, dissolveTime };
        }
      } else {
        // ease-out: slow diverge at start, rapid scatter at end
        uniforms.uScanSyncAmt.value = _effectiveScanSyncAmt(1 - tw * tw);
        if (tw >= 1.0) {
          uniforms.uScanSyncAmt.value = 0.0;
          uniforms.uScanWorldY.value  = 999.0;  // park off-screen
          _scanAnim = null;
        }
      }
    }

    // ── Message state machine ────────────────────────────────────────────
    if (msgState !== 'idle') {
      const geomNow  = mesh.geometry;
      const lockAttr = geomNow.getAttribute('aLockState');
      const colAAttr = geomNow.getAttribute('aColA');
      const colBAttr = geomNow.getAttribute('aColB');
      const nCols    = _geomParams.nCols;
      const nRows    = geomNow.instanceCount / nCols;
      const lockData = lockAttr?.array;
      const colABuf  = colAAttr?.array;
      const colBBuf  = colBAttr?.array;

      // D1: Resize resilience — recompute UV-to-world scale if canvas aspect changed.
      const currentAspect = renderer.domElement.width / renderer.domElement.height;
      if (Math.abs(currentAspect - _msgAspect0) > 1e-3) {
        const wH = uniforms.uWorldH.value;
        _msgUVToLocalX = wH * currentAspect;
        _msgAspect0    = currentAspect;
      }

      if (msgState === 'revealing') {
        let lockDirty = false;
        let colBDirty = false;

        // Reserve-column boundary — slots recruitment and spawn-below both stay below this
        const reserveStart = geomNow._reservePool?.reserveStart ?? nCols;

        // D3: Populate reserve screen-X cache once per revealing tick (avoids per-slot re-projection).
        if (_msgReserveScreenXs && colABuf) {
          camera.updateMatrixWorld();
          _msgVpMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
          const midWorldY = _msgWorldYs.length > 0
            ? (_msgWorldYs[0] + _msgWorldYs[_msgWorldYs.length - 1]) / 2
            : 0;
          for (let c = 0; c < reserveStart; c++) {
            const base = c * nRows * 4;
            const wx   = colABuf[base + 0] + uniforms.uColumnOffset.value.x;
            const wz   = colABuf[base + 1] + uniforms.uColumnOffset.value.y;
            _msgTv.set(wx, midWorldY, wz, 1.0).applyMatrix4(_msgVpMat);
            _msgReserveScreenXs[c] = _msgTv.w > 0 ? (_msgTv.x / _msgTv.w) * 0.5 + 0.5 : -999;
          }
        }

        // _msgVpMat was already updated in the D3 cache block above (or by the previous branch).
        // If _msgReserveScreenXs was null (e.g. legacy call path), rebuild VP matrix here.
        if (!_msgReserveScreenXs) {
          camera.updateMatrixWorld();
          _msgVpMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        }

        for (let si = 0; si < _msgSlots.length; si++) {
          const slot = _msgSlots[si];
          if (slot.claimed) continue;

          // A1: Skip slot if it's not yet eligible for fallback/reserve based on cascadeDir delay.
          if (t < msgRevealStart + (slot.revealDelay ?? 0)) continue;

          // ── Recruit a column for unassigned slots every tick ──────────
          // Try reserve pool first; fall back to nearest non-reserve column.
          if (slot.colIdx < 0) {
            const lineSlots = _msgSlots.filter(s => s.lineIdx === slot.lineIdx);
            const slotLineIdx = lineSlots.indexOf(slot);
            const reserveMatch = _claimReserve(geomNow._reservePool, slot.screenX, slot.worldY,
              colABuf, nRows, _msgVpMat, screenX => _slotCanUseColumnScreenX(lineSlots, slotLineIdx, screenX));
            if (reserveMatch) {
              const bestCol = reserveMatch.c;
              const newYOff = _yOffForHead(colABuf, colBBuf, nRows, bestCol, slot.worldY, t);
              for (let r = 0; r < nRows; r++) colBBuf[(bestCol * nRows + r) * 4] = newYOff;
              colBDirty = true;
              _assignMsgSlotColumn(slot, bestCol, reserveMatch.screenX);
              // spawnActive=1 keeps reserve visible regardless of density/frustum cull
              _writeLockRows(lockData, nRows, bestCol, slot.worldY, slot.glyph, 0, 1);
              lockDirty = true;
            } else {
              // Pool exhausted — fall back to nearest non-reserve column
              const bounds = _neighborAssignedBounds(lineSlots, slotLineIdx);
              let bestDist = Infinity;
              bestCol = -1;
              let bestScreenX = slot.screenX;
              const revThresh = 1.0 - uniforms.uReverseChance.value;
              for (let c = 0; c < reserveStart; c++) {
                if (_msgLockedCols.has(c) || _msgAssigned.has(c) || _msgSpawnCols.has(c)) continue;
                if (_h2js(c * 0.23, 0.69) >= revThresh) continue;  // skip reversed columns
                const base = c * nRows * 4;
                const wx   = colABuf[base + 0] + uniforms.uColumnOffset.value.x;
                const wz   = colABuf[base + 1] + uniforms.uColumnOffset.value.y;
                _msgTv.set(wx, slot.worldY, wz, 1.0).applyMatrix4(_msgVpMat);
                if (_msgTv.w <= 0) continue;
                const sx   = (_msgTv.x / _msgTv.w + 1.0) * 0.5;
                if (sx <= bounds.left + 1e-4 || sx >= bounds.right - 1e-4) continue;
                if (!_slotCanUseColumnScreenX(lineSlots, slotLineIdx, sx)) continue;
                const dist = Math.abs(sx - slot.screenX);
                if (dist < bestDist) { bestDist = dist; bestCol = c; bestScreenX = sx; }
              }
              if (bestCol >= 0) {
                _assignMsgSlotColumn(slot, bestCol, bestScreenX);
                _writeLockRows(lockData, nRows, bestCol, slot.worldY, slot.glyph, 0, 0);
                lockDirty = true;
              }
            }
          }

          // ── Force-lock assigned columns that haven't locked by fallback time ──
          // A1: Also gate on per-slot revealDelay so cascade order is respected.
          if (slot.colIdx >= 0 && t >= msgRevealFallbackT && !slot.fallbackTriggered && lockData
              && t >= msgRevealStart + (slot.revealDelay ?? 0)) {
            slot.fallbackTriggered = true;
            const tgtY      = slot.worldY;
            const base0     = slot.colIdx * nRows * 4;
            const sc0       = colBBuf[base0 + 1];
            const cs0       = uniforms.uCellH.value * sc0 * 1.85;
            const headRange = nRows * cs0;
            const cp0       = colBBuf[base0] + uniforms.uWorldH.value * 0.5 - tgtY;
            if (cp0 < 0 || cp0 >= headRange) {
              const cpW  = ((cp0 % headRange) + headRange) % headRange;
              const yOff = tgtY - uniforms.uWorldH.value * 0.5 + cpW;
              for (let r = 0; r < nRows; r++) colBBuf[(slot.colIdx * nRows + r) * 4] = yOff;
              colBDirty = true;
            }
            uniforms.uMsgRevealActive.value = 1.0;
            _writeLockRows(lockData, nRows, slot.colIdx, tgtY, slot.glyph, t, 0);
            lockDirty = true;
            slot.claimed = true;
            _msgClaimedCount++;
            _msgLockedCols.add(slot.colIdx);
            _msgAssigned.delete(slot.colIdx);
            // Clear other columns assigned to the same slot
            for (const [oc, os] of [..._msgAssigned]) {
              if (os === si) {
                _writeLockRows(lockData, nRows, oc, -9999, -1, 0, 0);
                _msgAssigned.delete(oc);
                lockDirty = true;
              }
            }
          }
        }

        // ── Check assigned columns for head lock ──────────────────────────
        // Snapshot keys to allow safe deletion during iteration
        for (const [colIdx, slotIdx] of [..._msgAssigned]) {
          const slot = _msgSlots[slotIdx];
          if (slot.claimed) { _msgAssigned.delete(colIdx); continue; }
          const headY    = _headYjs(colABuf, colBBuf, nRows, colIdx, t);
          const aScale   = colBBuf[colIdx * nRows * 4 + 1];
          const revealProgress = msgRevealEnd > msgRevealStart
            ? Math.min(1, (t - msgRevealStart) / (msgRevealEnd - msgRevealStart))
            : 1;
          const tolMult  = msgTolMultMin + (msgTolMultMax - msgTolMultMin) * revealProgress;
          const tol      = uniforms.uCellH.value * Math.max(aScale, msgTolMinScale) * 1.85 * tolMult;
          // D2: Velocity-aware tolerance — prevent fast columns from skipping over the window.
          const colSpeed = colABuf[colIdx * nRows * 4 + 2];  // aColA.z = speed
          const maxDisp  = colSpeed * uniforms.uSpeedMul.value * dt;
          const dynTol   = Math.max(tol, maxDisp * 1.5);
          if (Math.abs(headY - slot.worldY) < dynTol) {
            // _yOffForHead can produce cp ≥ nRows*cellStep (~53% chance),
            // placing the lock-head row index out of range → no bright glyph appears at lockY.
            // Wrap cp to [0, nRows*cellStep) so the lock-head row is always valid.
            // Applies to all columns (reserve and non-reserve fallback alike).
            {
              const base0    = colIdx * nRows * 4;
              const sc0      = colBBuf[base0 + 1];
              const cs0      = uniforms.uCellH.value * sc0 * 1.85;
              const headRange = nRows * cs0;
              const aYOff0   = colBBuf[base0];
              const cp0      = aYOff0 + uniforms.uWorldH.value * 0.5 - slot.worldY;
              if (cp0 < 0 || cp0 >= headRange) {
                const cpW  = ((cp0 % headRange) + headRange) % headRange;
                const yOff = slot.worldY - uniforms.uWorldH.value * 0.5 + cpW;
                for (let r = 0; r < nRows; r++) colBBuf[(colIdx * nRows + r) * 4] = yOff;
                colBDirty = true;
              }
            }
            // Activate band suppression on first actual glyph lock (not on trigger, to avoid
            // a blank black bar during the approach phase before any glyphs have locked).
            uniforms.uMsgRevealActive.value = 1.0;
            // Lock this column
            _writeLockRows(lockData, nRows, colIdx, slot.worldY, slot.glyph, t, 0);
            lockDirty = true;
            slot.claimed = true;
            _msgClaimedCount++;
            _msgLockedCols.add(colIdx);
            _msgAssigned.delete(colIdx);

            // Clear other columns assigned to this same slot
            for (const [oc, os] of [..._msgAssigned]) {
              if (os === slotIdx) {
                _writeLockRows(lockData, nRows, oc, -9999, -1, 0, 0);
                _msgAssigned.delete(oc);
                lockDirty = true;
              }
            }

            // Spawn-below: saturating scan — spawn up to SPAWN_CAP columns within slot X range
            if (lockData) {
              const wx0          = colABuf[colIdx * nRows * 4 + 0] + uniforms.uColumnOffset.value.x;
              const aScl         = colBBuf[colIdx * nRows * 4 + 1];
              const cs           = uniforms.uCellH.value * aScl * 1.85;
              const tgt          = slot.worldY - 1.5 * cs;
              const SPAWN_CAP    = 4;
              const slotHalf     = slot.halfUV * _msgUVToLocalX;
              const revThresh    = 1.0 - uniforms.uReverseChance.value;
              const spawnCandidates = [];
              for (let sc = 0; sc < reserveStart; sc++) {
                if (_msgLockedCols.has(sc) || _msgAssigned.has(sc) || _msgSpawnCols.has(sc)) continue;
                if (_h2js(sc * 0.23, 0.69) >= revThresh) continue;
                const scWx = colABuf[sc * nRows * 4 + 0] + uniforms.uColumnOffset.value.x;
                if (Math.abs(scWx - wx0) > slotHalf + 0.1) continue;
                const isDensityCulled = _h2js(sc * 0.137 + 0.5, 42.7) > uniforms.uDensity.value;
                spawnCandidates.push({ sc, dist: Math.abs(scWx - wx0), isDensityCulled });
              }
              spawnCandidates.sort((a, b) => {
                if (a.isDensityCulled !== b.isDensityCulled) return a.isDensityCulled ? -1 : 1;
                return a.dist - b.dist;
              });
              let spawned = 0;
              for (const { sc } of spawnCandidates) {
                if (spawned >= SPAWN_CAP) break;
                const newY = _yOffForHead(colABuf, colBBuf, nRows, sc, tgt, t);
                for (let r = 0; r < nRows; r++) colBBuf[(sc * nRows + r) * 4] = newY;
                colBDirty = true;
                _writeLockRows(lockData, nRows, sc, -9999, -1, 0, 1);  // spawnActive=1
                _msgSpawnCols.set(sc, slot.worldY);
                lockDirty = true;
                spawned++;
              }
            }
          }
        }

        // Expire spawn-below columns that have completed one cycle (snapshot for safe deletion)
        for (const [c, spawnWorldY] of [..._msgSpawnCols]) {
          const headY = _headYjs(colABuf, colBBuf, nRows, c, t);
          if (headY < spawnWorldY - uniforms.uWorldH.value) {
            _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
            _msgSpawnCols.delete(c);
            lockDirty = true;
          }
        }

        if (lockDirty && lockAttr) lockAttr.needsUpdate = true;
        if (colBDirty && colBAttr) colBAttr.needsUpdate = true;

        // Transition to holding when all slots claimed or timer expired
        if (_msgClaimedCount >= _msgSlots.length || t >= msgRevealEnd) {
          // Force-lock any slots that slipped through (e.g. assigned after fallback tick,
          // or fallback fired but slot was claimed concurrently).
          if (_msgAssigned.size > 0 && lockData) {
            let lkDirty = false, cbDirty = false;
            for (const [colIdx, slotIdx] of [..._msgAssigned]) {
              const slt = _msgSlots[slotIdx];
              if (slt.claimed) { _msgAssigned.delete(colIdx); continue; }
              const tgtY      = slt.worldY;
              const base0     = colIdx * nRows * 4;
              const sc0       = colBBuf[base0 + 1];
              const cs0       = uniforms.uCellH.value * sc0 * 1.85;
              const headRange = nRows * cs0;
              const cp0       = colBBuf[base0] + uniforms.uWorldH.value * 0.5 - tgtY;
              if (cp0 < 0 || cp0 >= headRange) {
                const cpW  = ((cp0 % headRange) + headRange) % headRange;
                const yOff = tgtY - uniforms.uWorldH.value * 0.5 + cpW;
                for (let r = 0; r < nRows; r++) colBBuf[(colIdx * nRows + r) * 4] = yOff;
                cbDirty = true;
              }
              uniforms.uMsgRevealActive.value = 1.0;
              _writeLockRows(lockData, nRows, colIdx, tgtY, slt.glyph, t, 0);
              lkDirty = true;
              slt.claimed = true;
              _msgClaimedCount++;
              _msgLockedCols.add(colIdx);
              _msgAssigned.delete(colIdx);
            }
            if (lkDirty && lockAttr) lockAttr.needsUpdate = true;
            if (cbDirty && colBAttr) colBAttr.needsUpdate = true;
          }
          msgState  = 'holding';
          msgHoldEnd = t + msgHoldDuration;
          // C1: onHold callback — fires once at revealing→holding
          if (_msgOnHold) { const cb = _msgOnHold; _msgOnHold = null; cb(); }
        }

      } else if (msgState === 'holding') {
        // Expire any spawn-below columns
        if (_msgSpawnCols.size && lockData) {
          let dirty = false;
          for (const [c, spawnWorldY] of [..._msgSpawnCols]) {
            const headY = _headYjs(colABuf, colBBuf, nRows, c, t);
            if (headY < spawnWorldY - uniforms.uWorldH.value) {
              _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
              _msgSpawnCols.delete(c);
              dirty = true;
            }
          }
          if (dirty && lockAttr) lockAttr.needsUpdate = true;
        }
        if (t >= msgHoldEnd) {
          msgState = 'fading';
          msgFadeStart = t;
          uniforms.uMsgRevealActive.value = 0;

          // B2: Exit glitch at hold→fading transition
          if (_msgExitGlitch) _doGlitch(_msgExitGlitchIntensity, _msgExitGlitchDuration);

          // B1: Write per-column fade offsets into aLockState.w for staggered fade.
          if (_msgFadeSpread > 0 && lockData) {
            const fadeable = _msgSlots.filter(s => s.claimed && s.colIdx >= 0);
            const fxs   = fadeable.map(s => s.screenX);
            const xMin_ = Math.min(...fxs);
            const xMax_ = Math.max(...fxs);
            for (const slot of fadeable) {
              const xFrac = (slot.screenX - xMin_) / (xMax_ - xMin_ || 1);
              let orderT = 0;
              switch (_msgFadeDir) {
                case 'left':       orderT = xFrac; break;
                case 'right':      orderT = 1 - xFrac; break;
                case 'center-out': orderT = Math.abs(xFrac - 0.5) * 2; break;
                case 'random':     orderT = Math.random(); break;
                default:           orderT = 0;
              }
              const offset = orderT * Math.min(_msgFadeSpread, _msgFadeDuration * 0.9);
              const c = slot.colIdx;
              for (let r = 0; r < nRows; r++) lockData[(c * nRows + r) * 4 + 3] = offset;
            }
            if (lockAttr) lockAttr.needsUpdate = true;
          }
          // B1: set fade uniforms
          uniforms.uMsgFadeStart.value    = t;
          uniforms.uMsgFadeDuration.value = _msgFadeDuration;
          uniforms.uMsgFading.value       = 1.0;
        }

      } else if (msgState === 'fading') {
        const fadeT = Math.min(1.0, (t - msgFadeStart) * msgFadeSpeed);

        // B1: per-column fade is driven by uMsgFadeStart/uMsgFadeDuration in the shader.
        // Keep uMsgRevealProgress=1.0 during staggered fade (shader ignores it when uMsgFading=1).
        // For legacy (no stagger), still drive the global uniform so the original path works.
        if (uniforms.uMsgFading.value < 0.5) {
          uniforms.uMsgRevealProgress.value = 1.0 - fadeT;
        }

        // Expire any lingering spawn-below columns
        let lockDirty = false;
        for (const [c, spawnWorldY] of [..._msgSpawnCols]) {
          const headY = _headYjs(colABuf, colBBuf, nRows, c, t);
          if (headY < spawnWorldY - uniforms.uWorldH.value) {
            _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
            _msgSpawnCols.delete(c);
            lockDirty = true;
          }
        }
        if (lockDirty && lockAttr) lockAttr.needsUpdate = true;

        // Release all locks once glyphs are fully invisible
        if (fadeT >= 1.0) _clearAllLocks(true);
      }

      // ── Camera-Y tracking (runs for all active states when trackCamera=true) ──
      if (_msgTrackCamera && lockData) {
        const camDeltaY = camera.position.y - _msgCamY0;
        if (Math.abs(camDeltaY) > 1e-5) {
          for (let li = 0; li < _msgWorldYs.length; li++) _msgWorldYs[li] += camDeltaY;
          for (const slot of _msgSlots) slot.worldY += camDeltaY;
          _msgCamY0 = camera.position.y;

          let trackDirty = false;
          for (const slot of _msgSlots) {
            if (!slot.claimed || slot.colIdx < 0) continue;
            const lockY = slot.worldY;
            for (let r = 0; r < nRows; r++) lockData[(slot.colIdx * nRows + r) * 4 + 0] = lockY;
            trackDirty = true;
          }
          if (trackDirty && lockAttr) lockAttr.needsUpdate = true;

          const topY = _msgWorldYs[0];
          const botY = _msgWorldYs[_msgWorldYs.length - 1];
          uniforms.uMsgRevealY.value = (topY + botY) / 2;
        }
      }
    }

    // ── CCP mode panel animation ──────────────────────────────────────────
    if (_ccpFadeDir !== 0 || _ccpPanels.length > 0 || _ccpExtraMeshes.length > 0) {
      if (_ccpFadeDir !== 0) {
        const speed = _ccpFadeDir > 0 ? (1 / 0.8) : (1 / 0.5);
        _ccpFadeT = Math.max(0, Math.min(1, _ccpFadeT + _ccpFadeDir * dt * speed));
        if (_ccpFadeT <= 0 && _ccpFadeDir < 0) {
          _destroyCCPPanels();
          _destroyCCPExtras();
          _ccpFadeDir = 0;
        }
        if (_ccpFadeT >= 1) _ccpFadeDir = 0;
      }
      _ccpOrbitAngle += _ccpOrbitSpeed * dt;
      for (let i = 0; i < _ccpPanels.length; i++) {
        const p   = _ccpPanels[i];
        const az  = _CCP_POSES[i].az + _ccpOrbitAngle;
        const r   = _CCP_POSES[i].r + p.zJitter;
        const px  = Math.sin(az) * r;
        const py  = p.yBase + Math.sin(t * p.floatSpeed + p.phase) * 0.4;
        const pz  = -Math.cos(az) * r;
        // Sprites auto-billboard — no quaternion copy needed
        p.sprite.position.set(px, py, pz);
        const flash = 0.5 + 0.5 * Math.sin(t * _ccpFlashHz * Math.PI * 2 + p.phase);
        p.sprite.material.opacity = _ccpPeakOpacity * flash * _ccpFadeT;

        // Glow halo: slightly further from origin than portrait, slower pulse
        const gr = r + 0.3;
        p.glowSprite.position.set(Math.sin(az) * gr, py, -Math.cos(az) * gr);
        const glowFlash = 0.5 + 0.5 * Math.sin(t * _ccpFlashHz * 0.65 * Math.PI * 2 + p.phase);
        p.glowSprite.material.opacity = _ccpPeakOpacity * 0.85 * glowFlash * _ccpFadeT;
      }
      for (const m of _ccpExtraMeshes) {
        // Extras (flag, Tiananmen) have fixed world orientation set at init — no billboard
        m.mesh.material.opacity = m.opacityFn(t, _ccpFadeT);
      }
    }

    // ── Mossad mode panel animation ───────────────────────────────────────
    if (_mossadFadeDir !== 0 || _mossadPanels.length > 0) {
      if (_mossadFadeDir !== 0) {
        const speed = _mossadFadeDir > 0 ? (1 / 0.8) : (1 / 0.5);
        _mossadFadeT = Math.max(0, Math.min(1, _mossadFadeT + _mossadFadeDir * dt * speed));
        if (_mossadFadeT <= 0 && _mossadFadeDir < 0) {
          _destroyMossadPanels();
          _mossadFadeDir = 0;
        }
        if (_mossadFadeT >= 1) _mossadFadeDir = 0;
      }
      _mossadOrbitAngle += _mossadOrbitSpeed * dt;
      for (let i = 0; i < _mossadPanels.length; i++) {
        const p = _mossadPanels[i];
        if (p.type === 'portrait') {
          // Portraits orbit and billboard
          const az = p.az + _mossadOrbitAngle;
          const y  = p.yBase + Math.sin(t * 0.35 + p.phase) * 0.4;
          p.mesh.position.set(Math.sin(az) * p.r, y, -Math.cos(az) * p.r);
          const flash = 0.5 + 0.5 * Math.sin(t * _mossadFlashHz * Math.PI * 2 + p.phase);
          p.mesh.material.opacity = _mossadPeakOpacity * flash * _mossadFadeT;
        } else {
          // Flag: fixed azimuth (no orbit), faces scene centre (no camera tracking)
          const y = p.yBase + Math.sin(t * 0.35 + p.phase) * 0.4;
          p.mesh.position.set(Math.sin(p.az) * p.r, y, -Math.cos(p.az) * p.r);
          p.mesh.lookAt(0, y, 0);
          p.mesh.material.opacity = _mossadPeakOpacity * _mossadFadeT;
        }
      }
    }
  }

  async function animate(ts) {
    animRef.id = requestAnimationFrame(animate);
    tick(ts * 0.001);

    if (!pp) return;

    const rdrW = renderer.domElement.width;
    const rdrH = renderer.domElement.height;

    // 'rain' mode RTT resize detection (telescreen pattern) — unchanged
    const rttRT = pp._rttPhosphor?.renderTarget;
    if (firstRenderDone && rttRT && (rttRT.width !== rdrW || rttRT.height !== rdrH)) {
      currentRainNodes?.dispose();
      if (prevRT) { try { prevRT.dispose(); } catch (_) {} prevRT = null; prevW = 0; prevH = 0; }
      pp = buildPP();
      firstRenderDone = false;
      return;
    }

    // 'crt' mode RTT resize detection
    if (postProcessing === 'crt' && firstRenderDone && crtHandle) {
      const rttRainRT = pp_rainNodes?.rttPhosphor?.renderTarget;
      if (rttRainRT && (rttRainRT.width !== rdrW || rttRainRT.height !== rdrH)) {
        pp_rainNodes.dispose();
        const sceneColor = pass(scene, camera).getTextureNode('output');
        pp_rainNodes = buildNodesInternal(sceneColor);
        crtHandle.setSourceNode(pp_rainNodes.outputNode);
        firstRenderDone = false;
        return;
      }
    }

    // 'crt' mode: drive CRT tick and handle its rebuild signal
    if (postProcessing === 'crt' && crtHandle) {
      const signal = crtHandle.tick(ts);
      if (signal.skipRender) {
        if (signal.newOutputNode) {
          pp.outputNode = fxaa(rtt(signal.newOutputNode));
        }
        return;
      }
    }

    ensurePrevRT();

    try {
      await pp.render();
      firstRenderDone = true;

      // Phosphor feedback copy — rain and crt both have the rain node chain
      if (postProcessing === 'rain') currentRainNodes?.postRender(renderer);
      if (postProcessing === 'crt')  pp_rainNodes?.postRender(renderer);

      // CRT postRender hook
      if (postProcessing === 'crt')  crtHandle?.postRender?.(renderer);
    } catch (e) {
      console.warn('matrix-rain-webgpu: render threw:', e);
    }
  }

  // ── Forward declaration — used by renderer.init callback and applyPreset closure
  let handle;

  // Init renderer then kick off animation
  renderer.init().then(async () => {
    try {
      const _isWebGPU = renderer.backend?.isWebGPUBackend === true;
      const maxVertexBuffers = renderer.backend?.device?.limits?.maxVertexBuffers ?? Infinity;
      const canUseFullVertexLayout = maxVertexBuffers >= 11;
      if (_isWebGPU && _webglCompat && canUseFullVertexLayout) {
        _webglCompat = false;
        _geomParams.webglCompat = false;
        const fullMaterial = buildGlyphMaterial(uniforms, atlasTex, { webglCompat: false });
        mesh.material.dispose();
        mesh.material = fullMaterial;
        material = fullMaterial;
        s.material = fullMaterial;
        rebuildGeom();
      } else if (_isWebGPU && _webglCompat && !canUseFullVertexLayout) {
        console.warn(
          `matrix-rain-webgpu: keeping webglCompat geometry on this WebGPU adapter ` +
          `(maxVertexBuffers=${maxVertexBuffers}) to avoid pipeline creation failure.`
        );
      }
      switch (postProcessing) {

        case 'rain':
          pp = buildPP();
          break;

        case 'crt': {
          const { buildCRTNodesFromSource } =
            await import('../telescreen-crt-webgpu/telescreen-crt-webgpu.js');
          const sceneColor = pass(scene, camera).getTextureNode('output');
          pp_rainNodes = buildNodesInternal(sceneColor);
          crtHandle    = buildCRTNodesFromSource(renderer, pp_rainNodes.outputNode, crtOpts);
          pp           = new THREE.RenderPipeline(renderer);
          pp.outputNode = fxaa(rtt(crtHandle.outputNode));
          break;
        }

        case 'none': {
          pp = new THREE.RenderPipeline(renderer);
          pp.outputNode = fxaa(pass(scene, camera).getTextureNode('output'));
          break;
        }

        default:
          console.warn(`[matrix-rain] unknown postProcessing mode '${postProcessing}', falling back to 'rain'`);
          pp = buildPP();
          break;
      }

      if (!externalLoop) ro.observe(element);
      if (preset) handle.applyPreset(preset);
      if (opts.bootSweep) {
        handle.triggerScanlineSweep(
          typeof opts.bootSweep === 'object' ? opts.bootSweep : {}
        );
      }
      handle.backend  = _isWebGPU ? 'webgpu' : 'webgl2';
      element.dispatchEvent(
        new CustomEvent('matrixrain:ready', { bubbles: false, detail: { backend: handle.backend } })
      );
      if (!externalLoop) animRef.id = requestAnimationFrame(animate);
    } catch (err) {
      console.error('[matrix-rain] init failed:', err);
    }
  });

  // ── Resize ────────────────────────────────────────────────────────────
  let resizePending = false;
  const ro = new ResizeObserver(() => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      const w = element.clientWidth  || 1;
      const h = element.clientHeight || 1;
      applyRendererResolution(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // PostProcessing RTT resize is handled in the render loop
    });
  });

  // ── Message lock-state helpers ────────────────────────────────────────
  // JS-side replication of the GPU h2 hash (used for density culling check).
  function _h2js(vx, vy) {
    let sx = _fract(vx * 0.1031);
    let sy = _fract(vy * 0.1030);
    const d = sx * (sy + 33.33) + sy * (sx + 33.33);
    sx += d; sy += d;
    return _fract((sx + sy) * sx);
  }

  // Write lock data to all N_ROWS entries of column c in the aLockState buffer.
  function _writeLockRows(lockData, nRows, c, lockY, lockGlyph, lockTime, spawnActive) {
    for (let r = 0; r < nRows; r++) {
      const i4 = (c * nRows + r) * 4;
      lockData[i4 + 0] = lockY;
      lockData[i4 + 1] = lockGlyph;
      lockData[i4 + 2] = lockTime;
      lockData[i4 + 3] = spawnActive;
    }
  }

  // B3: Write freeze-until timestamp to all nRows entries of column c in an aFreezeUntil buffer.
  function _writeFreezeUntilRows(buf, nRows, c, val) {
    for (let r = 0; r < nRows; r++) buf[c * nRows + r] = val;
  }

  function _assignMsgSlotColumn(slot, colIdx, screenX) {
    slot.colIdx = colIdx;
    slot.assignedScreenX = screenX;
    _msgAssigned.set(colIdx, slot.slotIdx);
  }

  function _projectVisibleColumnsAtWorldY(worldY, colABuf, nRows, reserveStart, vpMat) {
    const colScreen = [];
    for (let c = 0; c < reserveStart; c++) {
      const base = c * nRows * 4;
      const wx   = colABuf[base + 0] + uniforms.uColumnOffset.value.x;
      const wz   = colABuf[base + 1] + uniforms.uColumnOffset.value.y;
      const revHash = _h2js(c * 0.23, 0.69);
      if (revHash >= 1.0 - uniforms.uReverseChance.value) continue;
      const densHash = _h2js(c * 0.137 + 0.5, 42.7);
      if (densHash > uniforms.uDensity.value) continue;
      _msgTv.set(wx, worldY, wz, 1.0).applyMatrix4(vpMat);
      if (_msgTv.w <= 0) continue;
      const ndcX = _msgTv.x / _msgTv.w;
      if (ndcX < -1.2 || ndcX > 1.2) continue;
      colScreen.push({ c, screenX: (ndcX + 1.0) * 0.5 });
    }
    colScreen.sort((a, b) => a.screenX - b.screenX);
    return colScreen;
  }

  // Compute the aYOff value that places column c's head at targetWorldY at time t.
  // Mirrors the JS-side head-Y approximation used throughout the message reveal system.
  function _yOffForHead(colABuf, colBBuf, nRows, c, targetWorldY, t) {
    const base = c * nRows * 4;
    const spd  = colABuf[base + 2];
    const seed = colABuf[base + 3];
    const sc   = colBBuf[base + 1];
    const cs   = uniforms.uCellH.value * sc * 1.85;
    const ch   = uniforms.uWorldH.value + nRows * cs;
    const cp   = ((t * spd * Math.max(0.01, uniforms.uSpeedMul.value) + seed * ch) % ch + ch) % ch;
    return targetWorldY - uniforms.uWorldH.value / 2 + cp;
  }

  // Claim the best-matching free reserve column for a message slot.
  // "Best" = closest by screen X projection to slotScreenX. Returns colIdx or -1 if pool empty.
  // Caller must call _writeLockRows to set spawnActive=1.
  function _claimReserve(pool, slotScreenX, worldY, colABuf, nRows, vpMat, acceptScreenX = null) {
    if (!pool || pool.free.length === 0) return null;
    let bestDist = Infinity, bestFreeIdx = -1;
    let bestScreenX = 0;
    for (let fi = 0; fi < pool.free.length; fi++) {
      const c    = pool.free[fi];
      const base = c * nRows * 4;
      const wx   = colABuf[base];
      const wz   = colABuf[base + 1];
      _msgTv.set(wx, worldY, wz, 1.0).applyMatrix4(vpMat);
      if (_msgTv.w <= 0) continue;
      const sx   = (_msgTv.x / _msgTv.w + 1.0) * 0.5;
      if (acceptScreenX && !acceptScreenX(sx)) continue;
      const dist = Math.abs(sx - slotScreenX);
      if (dist < bestDist) {
        bestDist = dist;
        bestFreeIdx = fi;
        bestScreenX = sx;
      }
    }
    if (bestFreeIdx < 0) return null;
    const c = pool.free.splice(bestFreeIdx, 1)[0];
    pool.used.add(c);
    // spawnActive=1 is written by the caller's _writeLockRows — no need to write here
    return { c, screenX: bestScreenX };
  }

  // Assign columns to message slots while preserving left-to-right order.
  // Use a monotonic greedy pass rather than a strict global matcher so sparse
  // coverage still assigns most letters instead of dropping the whole line.
  function _assignOrderedLineSlots(lineSlots, usedCols, colScreen, maxDist = 0.18) {
    if (lineSlots.length === 0) return;
    let prevScreenX = -Infinity;
    for (let slotIdx = 0; slotIdx < lineSlots.length; slotIdx++) {
      const slot = lineSlots[slotIdx];
      const candidates = [];
      for (const cs of colScreen) {
        if (usedCols.has(cs.c)) continue;
        if (cs.screenX <= prevScreenX + 1e-4) continue;
        const d = Math.abs(cs.screenX - slot.screenX);
        if (d > maxDist) continue;
        if (!_slotCanUseColumnScreenX(lineSlots, slotIdx, cs.screenX)) continue;
        candidates.push({ cs, d });
      }
      candidates.sort((a, b) => a.d - b.d);
      const pickSpan = Math.min(candidates.length, 3);
      const pickIdx = pickSpan > 1 ? Math.min(pickSpan - 1, Math.floor((slot.pickBias ?? 0) * pickSpan)) : 0;
      const best = candidates[pickIdx]?.cs ?? null;
      if (best) {
        _assignMsgSlotColumn(slot, best.c, best.screenX);
        usedCols.add(best.c);
        prevScreenX = best.screenX;
      }
    }
  }

  function _slotCanUseColumnScreenX(lineSlots, slotIdx, screenX) {
    const slot = lineSlots[slotIdx];
    const minGapSelf = Math.max(0.012, slot.halfUV * 0.55);

    for (let i = slotIdx - 1; i >= 0; i--) {
      const other = lineSlots[i];
      if (other.colIdx < 0 || other.assignedScreenX === undefined) continue;
      const minGap = Math.max(minGapSelf, other.halfUV * 0.55, (slot.halfUV + other.halfUV) * 0.45);
      if (screenX <= other.assignedScreenX + minGap) return false;
      break;
    }

    for (let i = slotIdx + 1; i < lineSlots.length; i++) {
      const other = lineSlots[i];
      if (other.colIdx < 0 || other.assignedScreenX === undefined) continue;
      const minGap = Math.max(minGapSelf, other.halfUV * 0.55, (slot.halfUV + other.halfUV) * 0.45);
      if (screenX >= other.assignedScreenX - minGap) return false;
      break;
    }

    return true;
  }

  function _neighborAssignedBounds(slots, slotIdx) {
    let left = -Infinity;
    let right = Infinity;
    for (let i = slotIdx - 1; i >= 0; i--) {
      const sx = slots[i].assignedScreenX;
      if (slots[i].colIdx >= 0 && Number.isFinite(sx)) { left = sx; break; }
    }
    for (let i = slotIdx + 1; i < slots.length; i++) {
      const sx = slots[i].assignedScreenX;
      if (slots[i].colIdx >= 0 && Number.isFinite(sx)) { right = sx; break; }
    }
    return { left, right };
  }

  // Release a reserve column: restore its aYOff and clear lock state.
  function _releaseReserve(pool, colIdx, colBBuf, lockData, colBAttr, lockAttr, nRows) {
    if (!pool) return;
    const origIdx  = colIdx - pool.reserveStart;
    const origYOff = pool.origYOff[origIdx];
    const base     = colIdx * nRows;
    for (let r = 0; r < nRows; r++) {
      colBBuf[(base + r) * 4]      = origYOff;
      lockData[(base + r) * 4 + 0] = -9999;
      lockData[(base + r) * 4 + 1] = -1;
      lockData[(base + r) * 4 + 2] = 0;
      lockData[(base + r) * 4 + 3] = 0;
    }
    colBAttr.needsUpdate  = true;
    lockAttr.needsUpdate  = true;
    pool.used.delete(colIdx);
    pool.free.push(colIdx);
  }

  // Clear all active locks and spawn-active flags; optionally reset state machine to idle.
  function _clearAllLocks(resetState = false) {
    const geomNow  = mesh.geometry;
    const lockAttr = geomNow.getAttribute('aLockState');
    const lockData = lockAttr?.array;
    const nRows    = geomNow.instanceCount / _geomParams.nCols;

    // B3: Write freeze expiry to locked columns BEFORE clearing lock data.
    // aFreezeUntil is a separate attribute; fetch fresh to survive rebuildGeom().
    if (_msgFreezeTrailDuration > 0) {
      const freezeAttr     = geomNow.getAttribute('aFreezeUntil');
      const freezeUntilBuf = freezeAttr?.array;
      if (freezeUntilBuf && freezeAttr) {
        const expiry = uniforms.uTime.value + _msgFreezeTrailDuration;
        for (const c of _msgLockedCols) _writeFreezeUntilRows(freezeUntilBuf, nRows, c, expiry);
        freezeAttr.needsUpdate = true;
      }
    }

    if (lockData) {
      for (const c of _msgLockedCols) _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
      for (const c of _msgSpawnCols.keys())  _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
      for (const c of _msgAssigned.keys()) _writeLockRows(lockData, nRows, c, -9999, -1, 0, 0);
      // Release any reserve columns back to pool
      const colBAttr2 = geomNow.getAttribute('aColB');
      const colBBuf2  = colBAttr2?.array;
      const pool = geomNow._reservePool;
      if (pool && colBBuf2) {
        for (const c of [...pool.used]) {
          _releaseReserve(pool, c, colBBuf2, lockData, colBAttr2, lockAttr, nRows);
        }
      }
      if ((_msgLockedCols.size || _msgSpawnCols.size || _msgAssigned.size) && lockAttr) {
        lockAttr.needsUpdate = true;
      }
    }
    _msgLockedCols.clear();
    _msgSpawnCols.clear();
    _msgAssigned.clear();
    _msgSlots = [];
    _msgClaimedCount = 0;
    // Always stop band suppression regardless of resetState.
    uniforms.uMsgRevealActive.value = 0;
    uniforms.uMsgXMin.value = 0.0;
    uniforms.uMsgXMax.value = 1.0;
    uniforms.uMsgRevealProgress.value = 0.0;
    // B1: reset per-column fade uniforms
    uniforms.uMsgFading.value    = 0.0;
    uniforms.uMsgFadeStart.value = 0.0;
    // D3: clear reserve screen X cache
    _msgReserveScreenXs = null;
    if (resetState) {
      msgState = 'idle';
      _msgWorldYs = [];
      _msgTrackCamera = false;
      _msgCamY0 = 0;
      // Round 2 state resets
      _msgAspect0         = 1;
      _msgExitGlitch      = false;
      _msgFadeSpread      = 0;
      _msgFadeDir         = 'left';
      _msgFadeDuration    = 1.0;
      _msgFreezeTrailDuration = 0;
      // C1: fire onComplete before dequeue so re-entrant queueMessage sees msgState=idle
      if (_msgOnComplete) { const cb = _msgOnComplete; _msgOnComplete = null; cb(); }
      // C2: auto-dequeue next message
      if (_msgQueue.length > 0) {
        const next = _msgQueue.shift();
        setTimeout(() => _doShowMessage(next.text, next.opts), 0);
      }
    }
    // Always clear callbacks to prevent stale fires
    _msgOnHold     = null;
    _msgOnComplete = null;
  }

  // Compute JS-side head Y for column c (approximation — ignores burst/breath/zone).
  // Matches shader: cyclePos = mod(uTime * aSpeed * speedMul + aSeed * cycleH, cycleH)
  function _headYjs(colABuf, colBBuf, nRows, c, t) {
    const base     = c * nRows * 4;
    const aSpeed   = colABuf[base + 2];
    const aSeed    = colABuf[base + 3];
    const aYOff    = colBBuf[base + 0];
    const aScale   = colBBuf[base + 1];
    const cellStep = uniforms.uCellH.value * aScale * 1.85;
    const cycleH   = uniforms.uWorldH.value + nRows * cellStep;
    const spdMul   = Math.max(0.01, uniforms.uSpeedMul.value);
    const cp       = ((t * aSpeed * spdMul + aSeed * cycleH) % cycleH + cycleH) % cycleH;
    return aYOff + uniforms.uWorldH.value / 2 - cp;
  }

  // B2: Shared glitch implementation callable from tick and triggerGlitch handle method.
  // triggerGlitch is a handle-object method, not in scope from the tick closure.
  function _doGlitch(intensity, duration) {
    if (_reducedMotion) return;
    const b = pp?._holoBuild
      ?? currentRainNodes?.passBuilders?._holoBuild
      ?? pp_rainNodes?.passBuilders?._holoBuild;
    if (!b?.uGlitchAmt) return;
    if (_glitchTimerId !== null) clearTimeout(_glitchTimerId);
    b.uGlitchAmt.value = intensity;
    _glitchTimerId = setTimeout(() => { _glitchTimerId = null; b.uGlitchAmt.value = 0.0; }, duration * 1000);
  }

  // ── State object ──────────────────────────────────────────────────────
  // _cleanup captures closure vars for destroyMatrixRain
  function _cleanup() {
    // Abort any in-flight speed ramp RAF chain and glitch timer before tearing down.
    ++_rampGeneration;
    if (_glitchTimerId !== null) { clearTimeout(_glitchTimerId); _glitchTimerId = null; }
    currentRainNodes?.dispose();
    crtHandle?.destroy?.();
    _clearAllLocks(true);
    clearTimeout(_ccpSloganTimer);
    _destroyCCPPanels();
    _destroyCCPExtras();
    // Mossad cleanup
    _destroyMossadPanels();
    clearInterval(_mossadCounterInterval);
    _mossadCounterInterval = null;
    clearTimeout(_mossadSloganTimer);
    _mossadSloganTimer = null;
    // Remove Mossad DOM nodes if present
    for (const id of ['mossad-hud', 'mossad-tint', 'mossad-scan-a', 'mossad-scan-b']) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }
  }
  const s = { renderer, ro, animRef, geom, material, atlasTex, dummyRT, uniforms, mesh, _cleanup };
  _state.set(element, s);

  function rebuildGeom() {
    const newGeom = buildGeometry(_geomParams);
    // Re-attach lock state attribute (reset all locks on geometry rebuild)
    const newLockData = new Float32Array(newGeom.instanceCount * 4);
    for (let i = 0; i < newGeom.instanceCount; i++) {
      newLockData[i * 4 + 0] = -9999;
      newLockData[i * 4 + 1] = -1;
    }
    newGeom.setAttribute('aLockState', new THREE.InstancedBufferAttribute(newLockData, 4));
    if (!_webglCompat) {
      newGeom.setAttribute('aFreezeUntil', new THREE.InstancedBufferAttribute(new Float32Array(newGeom.instanceCount), 1)); // B3
    }
    mesh.geometry.dispose();
    mesh.geometry = newGeom;
    s.geom = newGeom;
    // Clear any active message — geometry rebuild invalidates all lock state
    if (msgState !== 'idle') _clearAllLocks(true);
  }

  function _resetFrustumVis() {
    const attr = mesh.geometry.getAttribute('aFrustumVis');
    if (!attr) return;
    if (attr.isInterleavedBufferAttribute) {
      const arr = attr.data.array;
      const stride = attr.data.stride;
      for (let i = 0; i < attr.count; i++) arr[i * stride + attr.offset] = 1;
      attr.data.needsUpdate = true;
      return;
    }
    attr.array.fill(1);
    attr.needsUpdate = true;
  }

  // ── CCP panel helpers ─────────────────────────────────────────────────
  // THREE.Sprite is used instead of Mesh+PlaneGeometry to stay within WebGPU's
  // maxVertexBuffers=8 limit. MeshBasicNodeMaterial compiles a pipeline with ~12
  // vertex buffer slots (instanceMatrix, tangent, color, extra UV sets even for
  // non-instanced meshes). SpriteMaterial compiles to a 2-slot shader (position+uv).
  // Sprites auto-billboard, so no quaternion.copy is needed in tick().
  function _initCCPPanels() {
    if (_ccpPanels.length > 0) return;
    const count = Math.min(_ccpPanelCount, _CCP_POSES.length);
    for (let i = 0; i < count; i++) {
      const artStr    = CCP_ART[i % CCP_ART.length];
      const canvasTex = buildBrailleTexture(artStr);
      const panelW    = 16 * _ccpScale;
      const panelH    = panelW * (512 / 768);

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map:        canvasTex,
        transparent: true,
        opacity:     0,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      }));
      sprite.scale.set(panelW, panelH, 1);
      scene.add(sprite);

      // Glow halo — 1.8× larger, radial gradient, slightly further from origin
      const glowTex = buildGlowTexture();
      const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map:        glowTex,
        transparent: true,
        opacity:     0,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      }));
      glowSprite.scale.set(panelW * 1.8, panelH * 1.8, 1);
      scene.add(glowSprite);

      // Per-panel variation: float speed and radial offset
      const floatSpeed = 0.25 + Math.random() * 0.35;
      const zJitter    = (Math.random() - 0.5) * 4;

      _ccpPanels.push({
        sprite, canvasTex,
        glowSprite, glowTex,
        phase: _CCP_POSES[i].phase, yBase: _CCP_POSES[i].y,
        floatSpeed, zJitter,
      });
    }
  }

  function _destroyCCPPanels() {
    for (const p of _ccpPanels) {
      scene.remove(p.sprite);
      p.sprite.material.dispose();
      p.canvasTex.dispose();
      scene.remove(p.glowSprite);
      p.glowSprite.material.dispose();
      p.glowTex.dispose();
    }
    _ccpPanels = [];
  }

  // ── CCP extras helpers (flag + Tiananmen) ─────────────────────────────
  // Extras also use THREE.Sprite to avoid the MeshBasicNodeMaterial vertex-buffer
  // overflow (PlaneGeometry + MeshBasicMaterial compiles a WGSL pipeline with ~12
  // vertex buffer slots due to node-builder attribute contamination from the main
  // instanced geometry, exceeding WebGPU's hard limit of 8).
  function _initCCPExtras() {
    if (_ccpExtraMeshes.length > 0) return;

    // Five-star flag
    const flagTex    = buildFlagTexture();
    const flagW      = 14 * _ccpScale;
    const flagH      = flagW * (341 / 512);
    const flagSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map:        flagTex,
      transparent: true,
      opacity:     0,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    }));
    flagSprite.scale.set(flagW, flagH, 1);
    const flagAz = 0.52;
    flagSprite.position.set(Math.sin(flagAz) * 15, 4.0, -Math.cos(flagAz) * 15);
    scene.add(flagSprite);
    _ccpExtraMeshes.push({
      mesh:      flagSprite,
      canvasTex: flagTex,
      opacityFn: (t, fadeT) => (0.4 + 0.15 * Math.sin(t * 0.6)) * fadeT,
    });

    // Tiananmen gate
    const tTex    = buildTiananmenTexture();
    const tW      = 13 * _ccpScale;
    const tH      = tW * (480 / 768);
    const tSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map:        tTex,
      transparent: true,
      opacity:     0,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    }));
    tSprite.scale.set(tW, tH, 1);
    tSprite.position.set(Math.sin(Math.PI) * 20, -3.0, -Math.cos(Math.PI) * 20);
    scene.add(tSprite);
    _ccpExtraMeshes.push({
      mesh:      tSprite,
      canvasTex: tTex,
      opacityFn: (_t, fadeT) => 0.45 * fadeT,
    });
  }

  function _destroyCCPExtras() {
    for (const m of _ccpExtraMeshes) {
      scene.remove(m.mesh);
      m.mesh.material.dispose();
      m.canvasTex.dispose();
    }
    _ccpExtraMeshes = [];
  }

  // ── Mossad panel helpers ──────────────────────────────────────────────
  // Uses THREE.Sprite (like CCP panels) to stay within WebGPU's vertex buffer limits.
  function _initMossadPanels() {
    if (_mossadPanels.length > 0) return;
    const count = Math.min(_mossadPanelCount, 3);
    for (let i = 0; i < count; i++) {
      const pose      = _MOSSAD_POSES[i];
      const artStr    = MOSSAD_ART[i % MOSSAD_ART.length];
      const canvasTex = buildMossadPortraitTexture(artStr);
      const panelW    = 16 * _mossadScale;
      const panelH    = panelW * (512 / 768);
      const sprite    = new THREE.Sprite(new THREE.SpriteMaterial({
        map:         canvasTex,
        transparent: true,
        opacity:     0,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      }));
      sprite.scale.set(panelW, panelH, 1);
      scene.add(sprite);
      _mossadPanels.push({
        mesh: sprite, canvasTex,
        az:    pose.az,
        r:     pose.r,
        phase: pose.phase,
        yBase: pose.yOffset,
        type:  'portrait',
      });
    }
    // Flag panel — always added, always uses _MOSSAD_POSES[3]
    // Uses Mesh (not Sprite) so it stays fixed in world space without billboarding.
    {
      const pose      = _MOSSAD_POSES[3];
      const canvasTex = buildIsraeliFlag();
      const panelW    = 14 * _mossadScale;
      const panelH    = panelW * (427 / 640);
      const mesh      = new THREE.Mesh(
        new THREE.PlaneGeometry(panelW, panelH),
        new THREE.MeshBasicMaterial({
          map:         canvasTex,
          transparent: true,
          opacity:     0,
          depthWrite:  false,
          side:        THREE.DoubleSide,
          blending:    THREE.NormalBlending,
        })
      );
      // Orient to face scene centre from its fixed azimuth
      const px = Math.sin(pose.az) * pose.r;
      const pz = -Math.cos(pose.az) * pose.r;
      mesh.position.set(px, pose.yOffset, pz);
      mesh.lookAt(0, pose.yOffset, 0);
      scene.add(mesh);
      _mossadPanels.push({
        mesh, canvasTex,
        az:    pose.az,
        r:     pose.r,
        phase: pose.phase,
        yBase: pose.yOffset,
        type:  'flag',
      });
    }
  }

  function _destroyMossadPanels() {
    for (const p of _mossadPanels) {
      scene.remove(p.mesh);
      p.mesh.material.dispose();
      p.canvasTex.dispose();
    }
    _mossadPanels = [];
  }

  // ── Mossad slogan cycling ─────────────────────────────────────────────
  let _mossadSloganTimer = null;

  function _startMossadSlogans(msgOpts = {}) {
    // Cancel any in-flight cycle before starting a new one; prevents parallel timers
    // if setMossadMode(true) is called while a cycle is already running.
    clearTimeout(_mossadSloganTimer);
    _mossadSloganTimer = null;
    const rv = msgOpts.revealDuration ?? 1.2;
    const hd = msgOpts.holdDuration   ?? 3.0;
    const fd = msgOpts.fadeDuration   ?? 0.8;
    _mossadSloganIdx = 0;
    function showNext() {
      if (!_mossadActive) return;
      handle.showMessage(MOSSAD_SLOGANS[_mossadSloganIdx % MOSSAD_SLOGANS.length], {
        revealDuration: rv,
        holdDuration:   hd,
        fadeDuration:   fd,
        boost:          msgOpts.boost       ?? 4.0,
        tolMultMin:     msgOpts.tolMultMin  ?? undefined,
        tolMultMax:     msgOpts.tolMultMax  ?? undefined,
        tolMinScale:    msgOpts.tolMinScale ?? undefined,
      });
      _mossadSloganIdx++;
      _mossadSloganTimer = setTimeout(showNext, (rv + hd + fd + 1.5) * 1000);
    }
    _mossadSloganTimer = setTimeout(showNext, 2500);
  }

  // ── CCP slogan cycling ────────────────────────────────────────────────
  function _startSlogans(msgOpts = {}) {
    if (!_ccpSloganActive) return;
    // Cancel any in-flight cycle before starting a new one; prevents parallel timers
    // if setCCPMode(true) is called while a cycle is already running.
    clearTimeout(_ccpSloganTimer);
    _ccpSloganTimer = null;
    const rv = msgOpts.revealDuration ?? 1.2;
    const hd = msgOpts.holdDuration   ?? 3.0;
    const fd = msgOpts.fadeDuration   ?? 0.8;
    _ccpSloganIdx = 0;
    function showNext() {
      if (!_ccpActive || !_ccpSloganActive) return;
      handle.showMessage(CCP_SLOGANS[_ccpSloganIdx % CCP_SLOGANS.length], {
        revealDuration: rv,
        holdDuration:   hd,
        fadeDuration:   fd,
        boost:          msgOpts.boost       ?? 4.0,
        tolMultMin:     msgOpts.tolMultMin  ?? undefined,
        tolMultMax:     msgOpts.tolMultMax  ?? undefined,
        tolMinScale:    msgOpts.tolMinScale ?? undefined,
      });
      _ccpSloganIdx++;
      _ccpSloganTimer = setTimeout(showNext, (rv + hd + fd + 1.5) * 1000);
    }
    _ccpSloganTimer = setTimeout(showNext, 2500);
  }

  function _normalizeMessageLineForDisplay(line) {
    if (_activeCharSet !== 'hebrew' && _activeCharSet !== 'arabic') return line;
    if (!/[\u0590-\u05FF\u0600-\u06FF]/.test(line)) return line;
    return [...line].reverse().join('');
  }

  // C2: Inner closure for showMessage — accessible from tick/_clearAllLocks.
  // (showMessage handle method is a thin wrapper so C2's queueMessage can call this directly.)
  function _doShowMessage(text, opts = {}) {
    if (typeof text === 'string') text = [text];
    text = text.map(_normalizeMessageLineForDisplay);
    const {
      yFrac                = 0.5,
      lineSpacing          = 0.12,
      revealDuration       = 2.0,
      holdDuration         = 4.0,
      fadeDuration         = 1.0,
      boost                = 2.0,
      trackCamera          = false,
      tolMultMin           = 4,
      tolMultMax           = 18,
      tolMinScale          = 1.3,
      // Round 2 additions
      cascadeDir           = undefined,  // A1: 'left'|'right'|'center-out'|'rain'|undefined
      fadeSpread           = 0,          // B1: stagger window in seconds (0 = simultaneous)
      fadeDir              = 'left',     // B1: 'left'|'right'|'center-out'|'random'
      exitGlitch           = false,      // B2: fire glitch at hold→fading
      exitGlitchIntensity  = 0.8,        // B2: glitch peak intensity
      exitGlitchDuration   = 0.3,        // B2: glitch duration in seconds
      freezeTrailDuration  = 0,          // B3: seconds to hold trail after fade completes (0=off)
      onHold               = null,       // C1: fired at revealing→holding
      onComplete           = null,       // C1: fired at end of fade
    } = opts;

    // ── Auto-size reserve pool from total non-space chars ─────────────
    const _totalNonSpace = text.reduce(
      (acc, line) => acc + [...line].filter(c => c !== ' ').length, 0);
    const _requiredReserves = Math.min(
      Math.floor(_geomParams.nCols / 4),
      Math.max(48, _totalNonSpace * 3)
    );
    if (_requiredReserves > _geomParams.spawnReserves) {
      _geomParams.spawnReserves = _requiredReserves;
      rebuildGeom();
    }

    // Clear any active message before starting a new one
    if (msgState !== 'idle') _clearAllLocks(true);

    const geomNow  = mesh.geometry;
    const lockAttr = geomNow.getAttribute('aLockState');
    const colAAttr = geomNow.getAttribute('aColA');
    const colBAttr = geomNow.getAttribute('aColB');
    if (!lockAttr || !colAAttr || !colBAttr) return;
    const lockData = lockAttr.array;
    const colABuf  = colAAttr.array;
    const colBBuf  = colBAttr.array;
    const nCols    = _geomParams.nCols;
    const nRows    = geomNow.instanceCount / nCols;

    // ── Compute world Y for each line ─────────────────────────────────
    const wH     = uniforms.uWorldH.value;
    _msgUVToLocalX = wH * camera.aspect;
    _msgUVToLocalY = wH;
    _msgAspect0    = camera.aspect;  // D1: snapshot for resize detection

    const nLines   = text.length;
    const blockTop = yFrac - ((nLines - 1) / 2) * lineSpacing;
    _msgWorldYs = text.map((_, i) => {
      const uvY = blockTop + i * lineSpacing;
      return (0.5 - uvY) * _msgUVToLocalY;
    });

    // ── Project column world positions to screen X via camera VP ──────
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    const vpMat = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix, camera.matrixWorldInverse
    );
    const tmpV = new THREE.Vector4();

    const reserveStart = geomNow._reservePool?.reserveStart ?? nCols;

    // D3: Pre-allocate reserve screen-X cache (populated at start of each revealing tick)
    _msgReserveScreenXs = new Float32Array(reserveStart);

    // ── Build slot array ──────────────────────────────────────────────
    const w = renderer.domElement.width  || element.clientWidth  || 512;
    const h = renderer.domElement.height || element.clientHeight || 512;
    const font = `bold ${Math.max(24, Math.round(h * 0.07))}px monospace`;
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = w; tmpCanvas.height = 16;
    const tCtx = tmpCanvas.getContext('2d');
    if (!tCtx) { console.warn('matrix-rain: showMessage — 2D canvas context unavailable'); return; }
    tCtx.font  = font;

    _msgSlots = [];
    _msgClaimedCount = 0;
    let overallStartUV = 1, overallEndUV = 0;

    for (let li = 0; li < nLines; li++) {
      const lineText  = text[li];
      const lineWorldY = _msgWorldYs[li];
      const chars    = [...lineText];
      const advances = chars.map(ch => tCtx.measureText(ch).width);
      const totalPx  = advances.reduce((a, b) => a + b, 0);
      if (totalPx === 0) continue;

      const startUV = 0.5 - (totalPx / w) * 0.5;
      if (startUV < overallStartUV) overallStartUV = startUV;
      if (startUV + totalPx / w > overallEndUV) overallEndUV = startUV + totalPx / w;

      let curPx = 0;
      for (let i = 0; i < chars.length; i++) {
        const centerUV = startUV + (curPx + advances[i] * 0.5) / w;
        const halfUV   = (advances[i] * 0.5) / w;
        const glyph    = charToGlyphIdx(chars[i], _activeCharSet);
        const isSpace  = chars[i] === ' ';
        const jitterHash = _h2js(li * 17.13 + i * 0.71 + glyph * 0.031, 9.17);
        const pickBias   = _h2js(li * 3.1 + i * 7.3 + glyph * 0.017, 0.91);
        const yJitter    = isSpace ? 0 : (jitterHash - 0.5) * uniforms.uCellH.value * 1.35;
        _msgSlots.push({
          screenX: centerUV,
          halfUV:  Math.max(halfUV, 0.01),
          glyph,
          claimed: isSpace,
          colIdx:  -1,
          lineIdx: li,
          worldY:  lineWorldY + yJitter,
          yJitter,
          pickBias,
          fallbackTriggered: false,
          revealDelay: 0,  // A1: seconds after msgRevealStart before fallback is eligible
        });
        if (isSpace) _msgClaimedCount++;
        curPx += advances[i];
      }
    }

    if (_msgSlots.length === 0) return;

    // ── Assign columns to character slots ─────────────────────────────
    // Use an order-preserving matcher per line. This keeps the reveal legible
    // even when screen-space column density is irregular.
    const usedCols = new Set();
    for (let li = 0; li < nLines; li++) {
      const lineSlots = [];
      for (let si = 0; si < _msgSlots.length; si++) {
        const slot = _msgSlots[si];
        if (slot.claimed || slot.lineIdx !== li) continue;
        slot.slotIdx = si;
        lineSlots.push(slot);
      }
      const lineColScreen = _projectVisibleColumnsAtWorldY(_msgWorldYs[li], colABuf, nRows, reserveStart, vpMat);
      _assignOrderedLineSlots(lineSlots, usedCols, lineColScreen);
      for (const slot of lineSlots) {
        delete slot.slotIdx;
        if (slot.colIdx >= 0) {
          _writeLockRows(lockData, nRows, slot.colIdx, slot.worldY, slot.glyph, 0, 0);
        }
      }
    }

    // A1: Compute per-slot revealDelay based on cascadeDir.
    // Spreads the fallback eligibility across 60% of the reveal window.
    if (cascadeDir) {
      const nonSpaceSlots = _msgSlots.filter(s => !s.claimed);
      const xs   = nonSpaceSlots.map(s => s.screenX);
      const xMin = Math.min(...xs);
      const xMax = Math.max(...xs);
      for (const slot of nonSpaceSlots) {
        const xFrac = (slot.screenX - xMin) / (xMax - xMin || 1);
        let t = 0;
        switch (cascadeDir) {
          case 'left':       t = xFrac; break;
          case 'right':      t = 1 - xFrac; break;
          case 'center-out': t = Math.abs(xFrac - 0.5) * 2; break;
          case 'rain':       slot._rainSpeed = slot.colIdx >= 0 ? colABuf[slot.colIdx * nRows * 4 + 2] : 0; break;
          default:           t = 0;
        }
        if (cascadeDir !== 'rain') slot.revealDelay = t * revealDuration * 0.6;
      }
      if (cascadeDir === 'rain') {
        const assigned = nonSpaceSlots.filter(s => s.colIdx >= 0);
        assigned.sort((a, b) => (b._rainSpeed ?? 0) - (a._rainSpeed ?? 0));
        assigned.forEach((slot, i) => {
          slot.revealDelay = (i / (assigned.length || 1)) * revealDuration * 0.6;
        });
        nonSpaceSlots.forEach(s => { if (s.revealDelay === undefined) s.revealDelay = 0; });
      }
    }

    lockAttr.needsUpdate = true;

    // ── Band suppression setup ─────────────────────────────────────────
    const topWorldY = _msgWorldYs[0];
    const botWorldY = _msgWorldYs[nLines - 1];
    uniforms.uMsgBoost.value      = boost;
    uniforms.uMsgRevealY.value    = (topWorldY + botWorldY) / 2;
    uniforms.uMsgRevealBand.value = Math.abs(botWorldY - topWorldY) / 2 + 2 * uniforms.uCellH.value;
    uniforms.uMsgRevealActive.value = 0.0;
    const margin = (_msgSlots.length > 0 ? _msgSlots[0].halfUV : 0.01);
    uniforms.uMsgXMin.value = Math.max(0.0, overallStartUV - margin);
    uniforms.uMsgXMax.value = Math.min(1.0, overallEndUV   + margin);
    msgTolMultMin     = tolMultMin;
    msgTolMultMax     = tolMultMax;
    msgTolMinScale    = tolMinScale;

    // Store Round 2 state
    _msgFadeDuration         = fadeDuration;   // B1
    _msgFadeSpread           = fadeSpread;     // B1
    _msgFadeDir              = fadeDir;        // B1
    _msgExitGlitch           = exitGlitch;     // B2
    _msgExitGlitchIntensity  = exitGlitchIntensity; // B2
    _msgExitGlitchDuration   = exitGlitchDuration;  // B2
    _msgFreezeTrailDuration  = freezeTrailDuration; // B3
    _msgOnHold               = onHold  ?? null;  // C1
    _msgOnComplete           = onComplete ?? null; // C1

    const now = prevTs || performance.now() * 0.001;
    msgRevealStart    = now;
    msgHoldDuration   = holdDuration;
    msgFadeSpeed      = fadeDuration > 0 ? 1.0 / fadeDuration : Infinity;
    msgRevealEnd       = now + revealDuration;
    msgRevealFallbackT = now + revealDuration * 0.92;
    uniforms.uMsgRevealProgress.value = 1.0;
    _msgTrackCamera   = trackCamera;
    _msgCamY0         = camera.position.y;
    msgState          = 'revealing';
  }

  // ── Control handle ────────────────────────────────────────────────────
  handle = {
    destroy() { destroyMatrixRain(element); },

    setColor(hex) {
      const c = new THREE.Color(hex);
      uniforms.uColor.value.set(c.r, c.g, c.b);
    },
    setColor2(hex) {
      const c = new THREE.Color(hex);
      uniforms.uColor2.value.set(c.r, c.g, c.b);
    },
    setOpacity(v)          { uniforms.uGlobalAlpha.value = v; },
    setDepth(v)            { uniforms.uDepth.value = v; },
    setNormalStrength(v)   { uniforms.uNormalStrength.value = v; },
    setSway(v)             { uniforms.uSwayAmt.value = v; },

    setSoften(on, strength) {
      if (postProcessing !== 'rain') return;
      const b = pp?._softenBuild ?? currentRainNodes?.passBuilders?._softenBuild;
      const v = on ? (strength ?? _ppState.softenStrength) : 0;
      _ppState.softenStrength = on ? (strength ?? _ppState.softenStrength) : _ppState.softenStrength;
      if (b) b.uBlurStrength.value = v;
    },
    setHeat(on, amt) {
      if (postProcessing !== 'rain') return;
      const b = pp?._heatBuild ?? currentRainNodes?.passBuilders?._heatBuild;
      _ppState.heatAmt = on ? (amt ?? _ppState.heatAmt) : 0;
      if (b) b.uHeatAmt.value = _ppState.heatAmt;
    },
    setStreaks(on, amt) {
      if (postProcessing !== 'rain') return;
      const b = pp?._streakBuild ?? currentRainNodes?.passBuilders?._streakBuild;
      _ppState.streakAmt = on ? (amt ?? _ppState.streakAmt) : 0;
      if (b) b.uStreakAmt.value = _ppState.streakAmt;
    },
    setBurstBloom(on) {
      if (postProcessing !== 'rain') return;
      burstBloomActive = on;
    },
    setGlobeInteract(on)   { uniforms.uGlobeInteract.value = on ? 1.0 : 0.0; },

    setGlyphChroma(on, scale) {
      uniforms.uGlyphChroma.value = on ? (scale ?? 1.0) : 0.0;
    },

    /**
     * @param {boolean} enabled
     * @param {number}  [lightX]    0–1 screen UV X of light source
     * @param {number}  [lightY]    0–1 screen UV Y of light source
     * @param {number}  [density]   0–1 ray spacing scalar
     * @param {number}  [decay]     0–1 per-sample decay
     * @param {number}  [weight]    0–1 per-sample weight
     * @param {number}  [exposure]  0–2 final exposure
     */
    setGodRays(enabled, lightX, lightY, density, decay, weight, exposure) {
      if (postProcessing !== 'rain') return;
      const gr = _ppState.godRays;
      gr.enabled = enabled;
      if (lightX   !== undefined) gr.lightX   = lightX;
      if (lightY   !== undefined) gr.lightY   = lightY;
      if (density  !== undefined) gr.density  = density;
      if (decay    !== undefined) gr.decay    = decay;
      if (weight   !== undefined) gr.weight   = weight;
      if (exposure !== undefined) gr.exposure = exposure;
      const g = pp?._godRaysBuild ?? currentRainNodes?.passBuilders?._godRaysBuild;
      if (!g) return;
      g.uEnabled.value    = enabled ? 1.0 : 0.0;
      g.uLightPos.value.x = gr.lightX;
      g.uLightPos.value.y = gr.lightY;
      g.uDensity.value    = gr.density;
      g.uDecay.value      = gr.decay;
      g.uWeight.value     = gr.weight;
      g.uExposure.value   = gr.exposure;
    },

    setPhosphorDecay(v) {
      if (postProcessing !== 'rain') return;
      phosphorDecay.value = v;
    },

    setSpeed(v)        {
      _baseSpeedMul = v;
      uniforms.uSpeedMul.value = _reducedMotion ? Math.min(v, 2.0) : v;
    },

    setBrightness(v)     { uniforms.uBrightness.value = v; },
    setBreathAmt(v)      { uniforms.uBreathAmt.value = v; },
    setWaveSpeed(v)      { uniforms.uWaveSpeed.value = v; },
    setWaveAmt(v)        {
      _baseWaveAmt = v;
      uniforms.uWaveAmt.value = _reducedMotion ? 0.0 : v;
    },
    setWaveCrests(n)     { uniforms.uWaveCrests.value = Math.max(1, Math.round(n)); },
    setHeadWaveSpeed(v)  { this.setWaveSpeed(v); },
    setHeadWaveAmt(v)    { this.setWaveAmt(v); },
    setHeadWaveCrests(n) { this.setWaveCrests(n); },
    setWeightedGlyphs(v) { uniforms.uWeightedGlyphs.value = v; },
    setCellSize(w, h)    { uniforms.uCellW.value = w; uniforms.uCellH.value = h; },
    setReverseChance(v)  { uniforms.uReverseChance.value = v; },

    setSpeedRange(min, max) {
      _geomParams.speedMin = min;
      _geomParams.speedMax = max;
      const sMin = Math.min(min, max);
      const sMax = Math.max(min, max);
      const g   = mesh.geometry;
      const arr = g.getAttribute('aColA').array;
      for (let c = 0; c < _geomParams.nCols; c++) {
        const sr    = g._rawSpeed[c];
        const speed = sMin + sr * sr * (sMax - sMin);
        for (let row = 0; row < N_ROWS; row++) arr[(c * N_ROWS + row) * 4 + 2] = speed;
      }
      g.getAttribute('aColA').needsUpdate = true;
    },
    setTrailRange(min, max) {
      _geomParams.trailMin = min;
      _geomParams.trailMax = max;
      const tMin = Math.max(0.001, Math.min(min, max));  // floor > 0 — shader divides by vTrail
      const tMax = Math.max(tMin,  Math.max(min, max));
      const g   = mesh.geometry;
      const arr = g.getAttribute('aColB').array;
      for (let c = 0; c < _geomParams.nCols; c++) {
        const tr    = g._biasedTrail[c];
        const trail = tMin + tr * (tMax - tMin);
        for (let row = 0; row < N_ROWS; row++) arr[(c * N_ROWS + row) * 4 + 3] = trail;
      }
      g.getAttribute('aColB').needsUpdate = true;
    },
    setColumnCount(n) {
      _geomParams.nCols = Math.max(50, Math.min(1200, Math.round(n)));
      rebuildGeom();
    },
    setTopology(name) {
      _geomParams.topology = name;
      rebuildGeom();
    },
    setShellRadii(inner, outer) {
      if (outer <= inner) outer = inner + 0.1;
      _geomParams.shellInner = inner;
      _geomParams.shellOuter = outer;
      rebuildGeom();
    },
    setClusterParams(count, spread) {
      _geomParams.clusterCount  = Math.max(1, Math.round(count));
      _geomParams.clusterSpread = spread;
      rebuildGeom();
    },
    setRadialBias(v) {
      _geomParams.radialBias = Math.max(-1, Math.min(1, v));
      rebuildGeom();
    },
    setRectExtent(w, h) {
      _geomParams.rectW = Math.max(0.1, w);
      _geomParams.rectH = Math.max(0.1, h);
      rebuildGeom();
    },
    setRadialDensityTaper(inner, outer) {
      uniforms.uDensityInner.value = inner;
      uniforms.uDensityOuter.value = outer;
    },
    setClusterUniform(v) { _geomParams.clusterUniform = Math.max(0, Math.min(1, v)); rebuildGeom(); },
    setClusterHueRange(v)    { uniforms.uClusterHueRange.value    = Math.max(0, Math.min(45, v)); },
    setClusterBrightRange(v) { uniforms.uClusterBrightRange.value = Math.max(0, Math.min(1, v)); },
    setClusterSpeedRange(v)  { uniforms.uClusterSpeedRange.value  = Math.max(0, Math.min(1, v)); },
    setClusterSpeedJitter(v) { _geomParams.clusterSpeedJitter = Math.max(0, Math.min(0.5, v)); rebuildGeom(); },
    setClusterYSpread(v)     { _geomParams.clusterYSpread     = Math.max(0, v);                rebuildGeom(); },
    setClusterRJitter(v)     { _geomParams.clusterRJitter     = Math.max(0, Math.min(0.5, v)); rebuildGeom(); },
    setSectorCenter(deg)  { uniforms.uSectorCenter.value   = deg * Math.PI / 180; },
    setSectorWidth(deg)   { uniforms.uSectorWidth.value    = Math.max(1, deg) * Math.PI / 180; },
    setSectorStrength(v)  { uniforms.uSectorStrength.value = Math.max(0, Math.min(1, v)); },
    setHeightFade(v)      { uniforms.uHeightFade.value     = Math.max(0, Math.min(1, v)); },
    setDensity(v) { uniforms.uDensity.value = v; },
    setZoneSpeed(inner, outer) {
      uniforms.uZoneSpeedInner.value = inner;
      uniforms.uZoneSpeedOuter.value = outer;
    },
    setZoneBrightness(inner, outer) {
      uniforms.uZoneBrightInner.value = inner;
      uniforms.uZoneBrightOuter.value = outer;
    },

    // ── Glyph FX controls ─────────────────────────────────────────────────
    setDrip(v)            { uniforms.uDripAmt.value       = v; },
    setEdgeGlow(v)        { uniforms.uEdgeGlow.value       = v; },
    setZRotation(deg)     { uniforms.uZRotRange.value      = deg * Math.PI / 180; },
    setFilmGrain(v)       { uniforms.uGrainAmt.value       = v; },
    setDepthTint(v)       { uniforms.uDepthTintAmt.value   = v; },
    setStartupCascade(on) {
      uniforms.uBootEnabled.value = on ? 1.0 : 0.0;
      if (on) uniforms.uBootStart.value = uniforms.uTime.value;
    },
    setDeepTrailDark(v)   { uniforms.uDeepTrailDark.value  = Math.max(0, Math.min(1, v)); },
    setStability(v)       { uniforms.uStability.value      = v; },
    setHoldMult(v)        { uniforms.uHoldMult.value       = v; },
    setBurstGlyphRate(v)  { uniforms.uBurstGlyphRate.value = v; },
    setPomSteps(v)        { uniforms.uPomSteps.value       = Math.max(3, Math.round(v)); },
    setColorBlend(v)      { uniforms.uHueRange.value       = Math.max(0, Math.min(1, v)); },
    setHueRange(v)        { this.setColorBlend(v); }, // backwards compat
    setBurstProb(v)       { uniforms.uBurstProb.value      = Math.max(0, Math.min(1, v)); },
    setEolFlash(v)        { uniforms.uEolFlash.value       = Math.max(0, Math.min(2, v)); },
    setEolFreezeStart(v)  { uniforms.uEolFreezeStart.value = Math.max(0, Math.min(1, v)); },
    setEolFadeStart(v)    { uniforms.uEolFadeStart.value   = Math.max(0.5, Math.min(1, v)); },
    // NOTE (future): current "contagion" is cluster-simultaneous burst (all columns in a
    // cluster's window fire with probability uContagionStrength). True neighbor-propagation
    // contagion — where a burst spreads column-by-column based on angular proximity — would
    // require storing per-column burst state in a GPU texture or compute buffer and
    // propagating it each frame. Planned as a future feature.
    setContagion(v)       { uniforms.uContagionStrength.value = Math.max(0, Math.min(1, v)); },
    setClusterBurstParticipation(v) { this.setContagion(v); },
    setRadialChroma(v) {
      if (postProcessing !== 'rain') return;
      _ppState.radialChromaAmt = v;
      const b = pp?._radialChromaBuild ?? currentRainNodes?.passBuilders?._radialChromaBuild;
      if (b) b.uRadialChromaticAmt.value = v;
    },
    setInterlace(v) {
      if (postProcessing !== 'rain') return;
      _ppState.interlaceAmt = v;
      const b = pp?._holoBuild ?? currentRainNodes?.passBuilders?._holoBuild;
      if (b?.uInterlaceAmt) b.uInterlaceAmt.value = v;
    },
    setAtmosphericFog(amt, color) {
      if (postProcessing !== 'rain') return;
      _ppState.fogAmt = amt;
      if (color !== undefined) _ppState.fogColor = color;
      const b = pp?._fogBuild ?? currentRainNodes?.passBuilders?._fogBuild;
      if (!b) return;
      b.uFogAmt.value = amt;
      if (color !== undefined) {
        const c = new THREE.Color(color);
        b.uFogColor.value.set(c.r, c.g, c.b);
      }
    },
    setDust(v) {
      if (postProcessing !== 'rain') return;
      _ppState.dustAmt = v;
      const b = pp?._dustBuild ?? currentRainNodes?.passBuilders?._dustBuild;
      if (b) b.uDustAmt.value = v;
    },
    setBloomBreath(enabled, rate = 0.25, amplitude = 0.08) {
      if (postProcessing !== 'rain') return;
      _bloomBreathEnabled = enabled;
      _bloomBreathRate    = rate;
      _bloomBreathAmp     = amplitude;
      if (!enabled) {
        const bloomNode = currentRainNodes?.passBuilders?._bloomNode ?? pp?._bloomNode;
        if (bloomNode) bloomNode.threshold.value = bloomThreshold;
      }
    },
    setShimmerAmt(v)      { uniforms.uShimmerAmt.value       = Math.max(0, Math.min(0.15, v)); },
    setShimmerFreq(v)     { uniforms.uShimmerFreq.value      = Math.max(0.5, Math.min(8.0, v)); },
    setInversionChance(v) { uniforms.uInversionChance.value  = Math.max(0, Math.min(1, v)); },
    setGlyphSpinAmt(v)    { uniforms.uGlyphSpinAmt.value     = Math.max(0, Math.min(1, v)); },
    setGlyphSpinSpeed(v)  { uniforms.uGlyphSpinSpeed.value   = Math.max(0, Math.min(2, v)); },
    setHueDriftRate(v)    { uniforms.uHueDriftRate.value     = Math.max(0, Math.min(0.5, v)); },
    setHueDriftAmt(v)     { uniforms.uHueDriftAmt.value      = Math.max(0, Math.min(45, v)); },
    setHeadOvershootAmt(v){ uniforms.uHeadOvershootAmt.value = Math.max(0, Math.min(3, v)); },
    // Category C column behaviour effects
    setGravityStrength(v) { uniforms.uGravityStrength.value = Math.max(0, Math.min(1.5, v)); },
    // Rate minimum is 0.1 Hz; use setGravityStrength(0) to turn the effect off (amplitude-gated).
    setGravityRate(v)     { uniforms.uGravityRate.value = Math.max(0.1, Math.min(0.5, v)); },
    setGravity(strength, rate) {
      this.setGravityStrength(strength);
      if (rate !== undefined) this.setGravityRate(rate);
    },
    // NOTE: uPerspectiveWorldX is computed from camera.position.x at call time.
    // If column-follow mode (uColumnOffset) is later engaged, the visual rain center
    // shifts but uPerspectiveWorldX stays fixed — recall setPerspective() to re-center.
    setPerspective(strength, cx = 0.5, cy = 0.5) {
      const depth      = 5.75;   // mean shell radius; approximate mid-range
      const halfFovTan = Math.tan((camera.fov * Math.PI / 180) / 2);
      const fullW      = 2 * halfFovTan * camera.aspect * depth;
      uniforms.uPerspectiveWorldX.value   = (cx - 0.5) * fullW + camera.position.x;
      uniforms.uPerspectiveStrength.value = Math.max(0, Math.min(1, strength));
    },
    setMorseAmt(v)  { uniforms.uMorseAmt.value  = Math.max(0, Math.min(1, v)); },
    setMorseRate(v) { uniforms.uMorseRate.value = Math.max(0.5, Math.min(4.0, v)); },
    /** @deprecated Use setMorseAmt(v) and setMorseRate(v) instead. */
    setMorseFlicker(enabled, rate, amt) {
      if (amt !== undefined)       uniforms.uMorseAmt.value  = enabled ? Math.max(0, Math.min(1, amt)) : 0;
      else if (enabled === false)  uniforms.uMorseAmt.value  = 0;
      if (rate !== undefined)      uniforms.uMorseRate.value = Math.max(0.5, Math.min(4.0, rate));
    },
    setSpiral(amt, rate, pitch) {
      uniforms.uSpiralAmt.value = Math.max(0, Math.min(1, amt));
      if (rate  !== undefined) uniforms.uSpiralRate.value  = Math.max(0, Math.min(0.5, rate));
      if (pitch !== undefined) uniforms.uSpiralPitch.value = Math.max(0, Math.min(Math.PI * 2, pitch));
    },
    setEntrainment(amt, speed = 0.25, crests = 3) {
      _baseEntrainAmt = Math.max(0, Math.min(0.8, amt));
      uniforms.uEntrainAmt.value    = _reducedMotion ? Math.min(_baseEntrainAmt, 0.06) : _baseEntrainAmt;
      uniforms.uEntrainSpeed.value  = speed;
      uniforms.uEntrainCrests.value = Math.round(Math.max(1, Math.min(12, crests)));
    },
    setSpeedEntrainment(amt, speed, crests) { this.setEntrainment(amt, speed, crests); },
    setEntrainSpeed(v)  { uniforms.uEntrainSpeed.value  = Math.max(0, v); },
    setEntrainCrests(n) { uniforms.uEntrainCrests.value = Math.round(Math.max(1, Math.min(12, n))); },
    setSquadCoherence(v)  { uniforms.uSquadCoherence.value = Math.max(0, Math.min(1, v)); },
    setSquadIndependence(v) { this.setSquadCoherence(v); },
    setSquadSize(n) {
      _geomParams.squadSize = Math.max(2, Math.min(20, Math.round(n)));
      rebuildGeom();
    },
    setTrailCohesion(v) {
      _geomParams.trailCohesion = Math.max(0, Math.min(1, v));
      rebuildGeom();
    },
    spawnWave({ duration = 2.0, easing = 'ease', startAngle = 0 } = {}) {
      const now = performance.now() / 1000;
      uniforms.uSpawnWaveFront.value = startAngle;
      _spawnWaveAnim = { startTime: now, endTime: now + duration,
        startFront: startAngle, endFront: startAngle + 1.0, easing };
    },
    despawnWave({ duration = 1.5, easing = 'ease' } = {}) {
      const now     = performance.now() / 1000;
      const current = uniforms.uSpawnWaveFront.value;
      _spawnWaveAnim = { startTime: now, endTime: now + duration,
        startFront: current, endFront: -1.0, easing };
    },
    setSpawnWaveFront(v) {
      _spawnWaveAnim = null;
      uniforms.uSpawnWaveFront.value = v;
    },

    /**
     * Trigger an animated scanline boot sweep — a horizontal bright band scans from
     * top to bottom, then dissolves into natural per-column movement.
     * @param {object} [opts]
     * @param {number} [opts.speed=4.0]        - cyclePos units/s for the sweep
     * @param {number} [opts.dissolveTime=1.5] - seconds for sync→natural ease-out blend
     */
    triggerScanlineSweep({ speed = 4.0, dissolveTime = 1.5 } = {}) {
      const cycleHApprox = uniforms.uWorldH.value
                         + uniforms.uNRows.value * uniforms.uCellH.value * 1.9;
      const now       = performance.now() / 1000;
      const requestedSpeed = Math.max(0.01, speed);
      const requestedSweepTime = cycleHApprox / requestedSpeed;
      const effectiveSweepTime = _reducedMotion
        ? Math.min(requestedSweepTime, 0.9)
        : requestedSweepTime;
      const effectiveSpeed = cycleHApprox / effectiveSweepTime;
      const effectiveDissolveTime = _reducedMotion
        ? Math.min(Math.max(0, dissolveTime), 0.6)
        : Math.max(0, dissolveTime);
      uniforms.uScanPhase.value   = 0.0;
      uniforms.uScanSyncAmt.value = _effectiveScanSyncAmt(1.0);
      _scanAnim = { state: 'sweeping',
                    startTime: now, endTime: now + effectiveSweepTime,
                    sweepSpeed: effectiveSpeed, dissolveTime: effectiveDissolveTime };
    },

    /**
     * Set scanline sync amount manually [0=off, 1=full sync]. Cancels any animation.
     * Call setScanlineSync(0) to return to full IDLE (sync off, animation stopped).
     */
    setScanlineSync(v) {
      _scanAnim = null;
      _baseScanSyncAmt = Math.max(0, Math.min(1, v));
      uniforms.uScanSyncAmt.value = _effectiveScanSyncAmt(_baseScanSyncAmt);
    },

    /**
     * Set scanline phase manually (0→cycleH≈34). Cancels animation but preserves
     * current uScanSyncAmt — use for scrubbing. Call setScanlineSync(0) to turn sync off.
     */
    setScanlinePhase(v) {
      _scanAnim = null;
      uniforms.uScanPhase.value = v;
    },

    /** Pause / resume time advancement. Rain freezes mid-frame when true. */
    setFrozen(bool)    { _frozen = bool; },

    /**
     * Enable / disable reduced-motion mode.
     * When enabled: speed is capped, head wave is removed, entrainment is softened,
     * scanline sync is capped, and scanline sweeps use shorter lower-intensity timings.
     * When disabled: requested motion settings are restored.
     */
    setReducedMotion(bool) {
      _reducedMotion = bool;
      _applyReducedMotionTargets();
    },

    /**
     * Briefly spike the glitch displacement, then auto-clear.
     * Returns a cancel function.
     * No-op in 'none' mode (no holo pass) and when reducedMotion is enabled.
     *
     * @param {number} [intensity=0.6]  uGlitchAmt peak value
     * @param {number} [duration=0.4]   seconds before auto-clear
     * @returns {Function} cancel — clears glitch immediately
     */
    triggerGlitch(intensity = 0.6, duration = 0.4) {
      _doGlitch(intensity, duration);
      // Cancel function: clears the glitch immediately.
      const b = pp?._holoBuild
        ?? currentRainNodes?.passBuilders?._holoBuild
        ?? pp_rainNodes?.passBuilders?._holoBuild;
      return () => {
        if (_glitchTimerId !== null) { clearTimeout(_glitchTimerId); _glitchTimerId = null; }
        if (b?.uGlitchAmt) b.uGlitchAmt.value = 0.0;
      };
    },

    /**
     * Ease speed up to targetMult then back to 1× over `duration` seconds.
     * Each call cancels any in-flight ramp.
     * Clamps to 2× when reducedMotion is enabled.
     *
     * @param {number} [targetMult=4.0]  peak speed multiplier
     * @param {number} [duration=2.0]    total ramp duration in seconds
     */
    triggerSpeedRamp(targetMult = 4.0, duration = 2.0) {
      const effectiveMult = _reducedMotion ? Math.min(targetMult, 2.0) : targetMult;
      const startTime     = performance.now();
      const endTime       = startTime + duration * 1000;
      const myGen         = ++_rampGeneration;
      function step(now) {
        if (myGen !== _rampGeneration) return;
        const elapsed  = (now - startTime) / 1000;
        const tNorm    = Math.min(elapsed / duration, 1.0);
        // Triangle envelope 0→1→0: ramp up first half, ramp down second half.
        // Smoothstep applied to each half for ease-in / ease-out feel.
        const halfT    = tNorm < 0.5 ? tNorm * 2 : (1.0 - tNorm) * 2;
        const envelope = halfT * halfT * (3 - 2 * halfT);
        uniforms.uSpeedMul.value = 1.0 + (effectiveMult - 1.0) * envelope;
        if (now < endTime) requestAnimationFrame(step);
        else uniforms.uSpeedMul.value = 1.0;
      }
      requestAnimationFrame(step);
    },

    setMaxYaw(deg)       { uniforms.uMaxYaw.value = deg * (Math.PI / 180); },
    setFacingJitter(v)   { uniforms.uFacingJitter.value = v; },
    setFlatZ(on)         { uniforms.uFlatZ.value = on ? 1.0 : 0.0; },
    setForwardFacing(on) { uniforms.uForwardFacing.value = on ? 1.0 : 0.0; },

    setBloomStrength(v) {
      if (postProcessing !== 'rain') return;
      _ppState.bloomStrength = v;
      if (pp?._bloomNode) pp._bloomNode.strength.value = v;
      if (currentRainNodes?.passBuilders?._bloomNode)
        currentRainNodes.passBuilders._bloomNode.strength.value = v;
    },

    /**
     * Hot-swap the glyph atlas at runtime.
     * The new atlas PNG is loaded asynchronously; the current set remains
     * active until the load completes.
     *
     * @param {string} name  Key from CHAR_SETS: 'matrixcode'|'matrix1999'|'latin'|'ascii'
     */
    setCharSet(name) {
      _currentCharSet = name;  // track for CCP save/restore (set synchronously)
      const descriptor = CHAR_SETS[name];
      if (!descriptor) {
        console.warn(`matrix-rain: unknown charSet '${name}'. Valid keys: ${Object.keys(CHAR_SETS).join(', ')}`);
        return;
      }
      // Increment sequence counter so any previously-in-flight load is ignored when
      // it completes — prevents both out-of-order atlas swaps and double-dispose.
      const seq = ++_charSetLoadSeq;
      new THREE.TextureLoader().load(descriptor.path, (newTex) => {
        if (seq !== _charSetLoadSeq) { newTex.dispose(); return; }  // stale load

        configureDistanceFieldTexture(newTex);
        newTex.needsUpdate     = true;

        // Apply LUT before building material so the new material sees the correct LUT.
        applyAtlasUniforms(descriptor);
        applyGlyphWeightLUT(name, descriptor.glyphCount, uniforms);

        // Rebuild the glyph material with the new texture and update state
        const newMaterial = buildGlyphMaterial(uniforms, newTex, { webglCompat: _webglCompat });
        s.mesh.material.dispose();
        s.mesh.material = newMaterial;
        s.atlasTex.dispose();
        s.atlasTex  = newTex;
        s.material  = newMaterial;

        _activeCharSet = name;
      });
    },

    /** Sets the static bloom threshold. Range 0–1, default 0.20. */
    setBloomThreshold(v) {
      if (postProcessing !== 'rain') return;
      bloomThreshold = v;
      if (pp?._bloomNode) pp._bloomNode.threshold.value = v;
      if (currentRainNodes?.passBuilders?._bloomNode)
        currentRainNodes.passBuilders._bloomNode.threshold.value = v;
    },

    /** Sets vignette strength. Range 0–1, default 0.42. */
    setVignette(v) {
      _ppState.vignette = v;
      const b = pp?._holoBuild ?? currentRainNodes?.passBuilders?._holoBuild;
      if (b) b.uVignetteStrength.value = v;
    },

    /** Sets scrolling scanline opacity. Range 0–0.2, default 0.045. */
    setScanlines(v) {
      _ppState.scanlines = v;
      const b = pp?._holoBuild ?? currentRainNodes?.passBuilders?._holoBuild;
      if (b) b.uScanlineOpacity.value = v;
    },

    /** Sets screen-space chromatic aberration in the holo pass. Range 0–0.015, default 0.0025. */
    setHoloAberration(v) {
      if (postProcessing !== 'rain') return;
      _ppState.aberration = v;
      const b = pp?._holoBuild ?? currentRainNodes?.passBuilders?._holoBuild;
      if (b) b.uAberrationAmt.value = v;
    },

    /**
     * Apply a named preset, calling handle methods for every field present.
     * Fields absent from the preset are not changed.
     *
     * @param {string} name  Key from PRESETS: 'default'|'matrix1999'|'ghost'|'overdrive'
     */
    applyPreset(name) {
      const p = PRESETS[name];
      if (!p) {
        console.warn(`matrix-rain: unknown preset '${name}'. Valid: ${Object.keys(PRESETS).join(', ')}`);
        return;
      }
      if (p.color           !== undefined) handle.setColor(p.color);
      if (p.opacity         !== undefined) handle.setOpacity(p.opacity);
      if (p.depth           !== undefined) handle.setDepth(p.depth);
      if (p.normalStrength  !== undefined) handle.setNormalStrength(p.normalStrength);
      if (p.glyphChromaScale !== undefined) handle.setGlyphChroma(p.glyphChromaScale > 0, p.glyphChromaScale);
      if (p.speed           !== undefined) handle.setSpeed(p.speed);
      if (p.bloomStrength   !== undefined) handle.setBloomStrength(p.bloomStrength);
      if (p.bloomThreshold  !== undefined) handle.setBloomThreshold(p.bloomThreshold);
      if (p.phosphorDecay   !== undefined) handle.setPhosphorDecay(p.phosphorDecay);
      if (p.heat            !== undefined) handle.setHeat(p.heat > 0, p.heat);
      if (p.soften          !== undefined) handle.setSoften(p.soften > 0, p.soften);
      if (p.streaks         !== undefined) handle.setStreaks(p.streaks > 0, p.streaks);
      if (p.burstBloom      !== undefined) handle.setBurstBloom(p.burstBloom);
      if (p.vignette        !== undefined) handle.setVignette(p.vignette);
      if (p.scanlines       !== undefined) handle.setScanlines(p.scanlines);
      if (p.holoAberration  !== undefined) handle.setHoloAberration(p.holoAberration);
      if (p.godRays) {
        const g = p.godRays;
        handle.setGodRays(
          g.enabled, g.lightX, g.lightY,
          g.density, g.decay, g.weight, g.exposure,
        );
      }
      if (p.charSet         !== undefined) handle.setCharSet(p.charSet);
    },

    // ── Preset save / load (localStorage) ────────────────────────────────
    /**
     * Snapshot current settings to localStorage under `matrix-rain-preset-{name}`.
     * @param {string} name  Arbitrary label (e.g. 'myPreset')
     */
    savePreset(name) {
      if (!name) { console.warn('matrix-rain: savePreset() requires a name'); return; }
      const u = uniforms;
      const snap = {
        // Color / opacity
        color:            '#' + new THREE.Color(...u.uColor.value.toArray()).getHexString(),
        opacity:          u.uGlobalAlpha.value,
        brightness:       u.uBrightness.value,
        deepTrailDark:    u.uDeepTrailDark.value,
        // Glyph geometry
        depth:            u.uDepth.value,
        normalStrength:   u.uNormalStrength.value,
        cellW:            u.uCellW.value,
        cellH:            u.uCellH.value,
        // Speed / density
        speedMin:         _geomParams.speedMin,
        speedMax:         _geomParams.speedMax,
        trailMin:         _geomParams.trailMin,
        trailMax:         _geomParams.trailMax,
        density:          u.uDensity.value,
        reverseChance:    u.uReverseChance?.value ?? 0,
        breathAmt:        u.uBreathAmt.value,
        waveEnabled:      _baseWaveAmt > 0,
        waveAmt:          _baseWaveAmt,
        waveSpeed:        u.uWaveSpeed.value,
        waveCrests:       u.uWaveCrests.value,
        entrainAmt:       _baseEntrainAmt,
        entrainSpeed:     u.uEntrainSpeed.value,
        entrainCrests:    u.uEntrainCrests.value,
        drip:             u.uDripAmt.value,
        edgeGlow:         u.uEdgeGlow.value,
        zRotation:        u.uZRotRange.value * (180 / Math.PI),
        // FX
        filmGrain:        u.uGrainAmt.value,
        depthTint:        u.uDepthTintAmt.value,
        stability:        u.uStability.value,
        holdMult:         u.uHoldMult.value,
        burstGlyphRate:   u.uBurstGlyphRate.value,
        weightedGlyphs:   u.uWeightedGlyphs.value,
        hueRange:         u.uHueRange.value,
        burstProb:        u.uBurstProb.value,
        clusters:         _geomParams.clusterCount,
        clusterSpread:    _geomParams.clusterSpread,
        clusterUniform:   _geomParams.clusterUniform,
        clusterHueRange:  u.uClusterHueRange.value,
        clusterBrightRange: u.uClusterBrightRange.value,
        clusterSpeedRange:  u.uClusterSpeedRange.value,
        clusterSpeedJitter: _geomParams.clusterSpeedJitter,
        clusterYSpread:     _geomParams.clusterYSpread,
        clusterRJitter:     _geomParams.clusterRJitter,
        contagion:        u.uContagionStrength.value,
        squadCoherence:   u.uSquadCoherence.value,
        squadSize:        _geomParams.squadSize,
        trailCohesion:    _geomParams.trailCohesion,
        densityIn:        u.uDensityInner.value,
        densityOut:       u.uDensityOuter.value,
        heightFade:       u.uHeightFade.value,
        spawnFront:       u.uSpawnWaveFront.value,
        scanSync:         _baseScanSyncAmt,
        scanPhase:        u.uScanPhase.value,
        // Post-processing (rain mode only — no-ops in other modes)
        bloomThreshold:   bloomThreshold,
        bloomStrength:    _ppState.bloomStrength,
        phosphorDecay:    phosphorDecay.value,
        heat:             _ppState.heatAmt,
        soften:           _ppState.softenStrength,
        streaks:          _ppState.streakAmt,
        holoAberration:   _ppState.aberration,
        vignette:         _ppState.vignette,
        scanlines:        _ppState.scanlines,
        // Zone biasing
        zoneSpeedInner:   u.uZoneSpeedInner.value,
        zoneSpeedOuter:   u.uZoneSpeedOuter.value,
        zoneBrightInner:  u.uZoneBrightInner.value,
        zoneBrightOuter:  u.uZoneBrightOuter.value,
        // Charset
        charSet:          _activeCharSet,
      };
      try {
        localStorage.setItem(`matrix-rain-preset-${name}`, JSON.stringify(snap));
      } catch (e) {
        console.warn('matrix-rain: savePreset() localStorage write failed:', e);
      }
    },

    /**
     * Restore a previously saved preset from localStorage.
     * @param {string} name
     */
    loadPreset(name) {
      let snap;
      try {
        const raw = localStorage.getItem(`matrix-rain-preset-${name}`);
        if (!raw) { console.warn(`matrix-rain: no saved preset '${name}'`); return; }
        snap = JSON.parse(raw);
      } catch (e) {
        console.warn('matrix-rain: loadPreset() failed:', e);
        return;
      }
      const read = (...keys) => {
        for (const key of keys) {
          if (snap[key] !== undefined) return snap[key];
        }
        return undefined;
      };
      const waveAmt = read('waveAmt');
      const waveEnabled = snap.waveEnabled !== undefined
        ? !!snap.waveEnabled
        : (waveAmt !== undefined ? waveAmt > 0 : undefined);

      if (snap.color           !== undefined) handle.setColor(snap.color);
      if (snap.opacity         !== undefined) handle.setOpacity(snap.opacity);
      if (snap.brightness      !== undefined) handle.setBrightness(snap.brightness);
      if (snap.deepTrailDark   !== undefined) handle.setDeepTrailDark(snap.deepTrailDark);
      if (snap.depth           !== undefined) handle.setDepth(snap.depth);
      if (snap.normalStrength  !== undefined) handle.setNormalStrength(snap.normalStrength);
      if (snap.cellW           !== undefined) handle.setCellSize(snap.cellW, snap.cellH ?? uniforms.uCellH.value);
      if (snap.speedMin        !== undefined) handle.setSpeedRange(snap.speedMin, snap.speedMax ?? _geomParams.speedMax);
      if (snap.trailMin        !== undefined) handle.setTrailRange(snap.trailMin, snap.trailMax ?? _geomParams.trailMax);
      if (snap.density         !== undefined) handle.setDensity(snap.density);
      if (snap.reverseChance   !== undefined) handle.setReverseChance(snap.reverseChance);
      if (snap.drip            !== undefined) handle.setDrip(snap.drip);
      if (snap.edgeGlow        !== undefined) handle.setEdgeGlow(snap.edgeGlow);
      if (snap.zRotation       !== undefined) handle.setZRotation(snap.zRotation);
      if (snap.filmGrain       !== undefined) handle.setFilmGrain(snap.filmGrain);
      if (snap.depthTint       !== undefined) handle.setDepthTint(snap.depthTint);
      if (snap.stability       !== undefined) handle.setStability(snap.stability);
      if (snap.holdMult        !== undefined) handle.setHoldMult(snap.holdMult);
      if (snap.burstGlyphRate  !== undefined) handle.setBurstGlyphRate(snap.burstGlyphRate);
      if (snap.weightedGlyphs  !== undefined) handle.setWeightedGlyphs(snap.weightedGlyphs);
      if (snap.hueRange        !== undefined) handle.setColorBlend(snap.hueRange);
      if (snap.burstProb       !== undefined) handle.setBurstProb(snap.burstProb);
      if (snap.bloomThreshold  !== undefined) handle.setBloomThreshold(snap.bloomThreshold);
      if (snap.bloomStrength   !== undefined) handle.setBloomStrength(snap.bloomStrength);
      if (snap.phosphorDecay   !== undefined) handle.setPhosphorDecay(snap.phosphorDecay);
      if (snap.heat            !== undefined) handle.setHeat(snap.heat > 0, snap.heat);
      if (snap.soften          !== undefined) handle.setSoften(snap.soften > 0, snap.soften);
      if (snap.streaks         !== undefined) handle.setStreaks(snap.streaks > 0, snap.streaks);
      if (snap.holoAberration  !== undefined) handle.setHoloAberration(snap.holoAberration);
      if (snap.vignette        !== undefined) handle.setVignette(snap.vignette);
      if (snap.scanlines       !== undefined) handle.setScanlines(snap.scanlines);
      if (snap.zoneSpeedInner  !== undefined) handle.setZoneSpeed(snap.zoneSpeedInner, snap.zoneSpeedOuter ?? 1.0);
      if (snap.zoneBrightInner !== undefined) handle.setZoneBrightness(snap.zoneBrightInner, snap.zoneBrightOuter ?? 1.0);
      if (snap.charSet         !== undefined) handle.setCharSet(snap.charSet);

      // Canonical cluster/squad rebuild-time state. Apply in one rebuild pass.
      const clusters = read('clusters');
      const clusterSpread = read('clusterSpread');
      const clusterUniform = read('clusterUniform');
      const clusterSpeedJitter = read('clusterSpeedJitter');
      const clusterYSpread = read('clusterYSpread');
      const clusterRJitter = read('clusterRJitter');
      const squadSize = read('squadSize');
      const trailCohesion = read('trailCohesion');
      const needsClusterRebuild =
        clusters !== undefined ||
        clusterSpread !== undefined ||
        clusterUniform !== undefined ||
        clusterSpeedJitter !== undefined ||
        clusterYSpread !== undefined ||
        clusterRJitter !== undefined ||
        squadSize !== undefined ||
        trailCohesion !== undefined;
      if (needsClusterRebuild) {
        if (clusters !== undefined) _geomParams.clusterCount = Math.max(1, Math.round(clusters));
        if (clusterSpread !== undefined) _geomParams.clusterSpread = clusterSpread;
        if (clusterUniform !== undefined) _geomParams.clusterUniform = Math.max(0, Math.min(1, clusterUniform));
        if (clusterSpeedJitter !== undefined) _geomParams.clusterSpeedJitter = Math.max(0, Math.min(0.5, clusterSpeedJitter));
        if (clusterYSpread !== undefined) _geomParams.clusterYSpread = Math.max(0, clusterYSpread);
        if (clusterRJitter !== undefined) _geomParams.clusterRJitter = Math.max(0, Math.min(0.5, clusterRJitter));
        if (squadSize !== undefined) _geomParams.squadSize = Math.max(2, Math.min(20, Math.round(squadSize)));
        if (trailCohesion !== undefined) _geomParams.trailCohesion = Math.max(0, Math.min(1, trailCohesion));
        rebuildGeom();
      }

      // Runtime cluster uniforms.
      if (read('clusterHueRange') !== undefined) handle.setClusterHueRange(read('clusterHueRange'));
      if (read('clusterBrightRange') !== undefined) handle.setClusterBrightRange(read('clusterBrightRange'));
      if (read('clusterSpeedRange') !== undefined) handle.setClusterSpeedRange(read('clusterSpeedRange'));
      if (read('contagion') !== undefined) handle.setContagion(read('contagion'));
      if (read('squadCoherence') !== undefined) handle.setSquadCoherence(read('squadCoherence'));
      if (read('densityIn') !== undefined || read('densityOut') !== undefined) {
        handle.setRadialDensityTaper(
          read('densityIn') ?? uniforms.uDensityInner.value,
          read('densityOut') ?? uniforms.uDensityOuter.value,
        );
      }
      if (read('heightFade') !== undefined) handle.setHeightFade(read('heightFade'));

      // Motion layers.
      if (read('breathAmt') !== undefined) handle.setBreathAmt(read('breathAmt'));
      if (read('waveSpeed') !== undefined) handle.setWaveSpeed(read('waveSpeed'));
      if (read('waveCrests') !== undefined) handle.setWaveCrests(read('waveCrests'));
      if (waveEnabled === false) handle.setWaveAmt(0);
      else if (waveAmt !== undefined) handle.setWaveAmt(waveAmt);
      if (read('entrainAmt') !== undefined || read('entrainSpeed') !== undefined || read('entrainCrests') !== undefined) {
        handle.setEntrainment(
          read('entrainAmt') ?? uniforms.uEntrainAmt.value,
          read('entrainSpeed') ?? uniforms.uEntrainSpeed.value,
          read('entrainCrests') ?? uniforms.uEntrainCrests.value,
        );
      }
      if (read('spawnFront') !== undefined) handle.setSpawnWaveFront(read('spawnFront'));

      // Scanline runtime state.
      if (read('scanSync') !== undefined) handle.setScanlineSync(read('scanSync'));
      if (read('scanPhase') !== undefined) handle.setScanlinePhase(read('scanPhase'));
    },

    /** @returns {string[]} Names of all localStorage presets saved for this page */
    listSavedPresets() {
      const prefix = 'matrix-rain-preset-';
      const names = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(prefix)) names.push(k.slice(prefix.length));
        }
      } catch (e) { /* localStorage unavailable */ }
      return names.sort();
    },

    /** @param {string} name  Remove a saved preset */
    deleteSavedPreset(name) {
      try { localStorage.removeItem(`matrix-rain-preset-${name}`); }
      catch (e) { console.warn('matrix-rain: deleteSavedPreset() failed:', e); }
    },

    // ── Message reveal API ────────────────────────────────────────────────
    /**
     * Display a message by locking rain column heads to target characters.
     *
     * @param {string|string[]} text
     * @param {object} [opts]
     * @param {number}  [opts.yFrac=0.5]            vertical centre 0–1
     * @param {number}  [opts.lineSpacing=0.12]      UV gap between lines
     * @param {number}  [opts.revealDuration=2.0]    seconds for organic reveal
     * @param {number}  [opts.holdDuration=4.0]      seconds to hold
     * @param {number}  [opts.fadeDuration=1.0]      seconds to fade out
     * @param {number}  [opts.boost=2.0]             brightness multiplier for locked heads
     * @param {boolean} [opts.trackCamera=false]     track camera.y during hold
     * @param {string}  [opts.cascadeDir]            A1: reveal order 'left'|'right'|'center-out'|'rain'
     * @param {number}  [opts.fadeSpread=0]          B1: stagger window in seconds (0=simultaneous)
     * @param {string}  [opts.fadeDir='left']        B1: 'left'|'right'|'center-out'|'random'
     * @param {boolean} [opts.exitGlitch=false]      B2: fire glitch at hold→fading transition
     * @param {number}  [opts.exitGlitchIntensity]   B2: glitch peak intensity (default 0.8)
     * @param {number}  [opts.exitGlitchDuration]    B2: glitch duration seconds (default 0.3)
     * @param {number}  [opts.freezeTrailDuration=0] B3: seconds to hold trail after fade (0=off)
     * @param {Function} [opts.onHold]               C1: callback at revealing→holding
     * @param {Function} [opts.onComplete]           C1: callback after fade completes
     */
    showMessage(text, opts = {}) { _doShowMessage(text, opts); },

    /**
     * Interrupt the current message and fade it out immediately.
     * @param {object} [opts]
     * @param {number} [opts.fadeDuration]  seconds to fade (default: 0.8)
     */
    clearMessage(opts = {}) {
      const { fadeDuration = 0.8 } = opts;
      if (msgState === 'idle') return;
      uniforms.uMsgRevealActive.value = 0;  // stop band suppression immediately
      uniforms.uMsgRevealProgress.value = 1.0; // ensure we fade from full brightness
      uniforms.uMsgXMin.value = 0.0;
      uniforms.uMsgXMax.value = 1.0;
      msgFadeSpeed = fadeDuration > 0 ? 1.0 / fadeDuration : Infinity;
      msgFadeStart = prevTs || performance.now() * 0.001;
      msgState     = 'fading';
    },

    setMessageReserves(n) {
      if (msgState !== 'idle') {
        console.warn('setMessageReserves: ignored while message is active');
        return;
      }
      const capped = Math.max(1, Math.min(Math.floor(_geomParams.nCols / 4), Math.round(n)));
      if (capped !== _geomParams.spawnReserves) {
        _geomParams.spawnReserves = capped;
        rebuildGeom();
      }
    },

    setMsgBandSuppress(on) { uniforms.uMsgBandSuppress.value = on ? 1.0 : 0.0; },
    setMsgSettleSharpness(v) { uniforms.uMsgSettleSharpness.value = Math.max(0.5, Math.min(20, v)); },

    // ── Round 2 message handle methods ────────────────────────────────────
    /** A2: Boost locked-column trail brightness near the head during reveal (0=off). */
    setMsgTrailBoost(boost, decay) {
      uniforms.uMsgTrailBoost.value = Math.max(0, Math.min(3, boost));
      if (decay !== undefined) uniforms.uMsgTrailDecay.value = Math.max(1, Math.min(20, decay));
    },

    /** A3: Blend scramble candidates from full-atlas (0) to same atlas row as target (1). */
    setSettleSetBlend(v) { uniforms.uSettleSetBlend.value = Math.max(0, Math.min(1, v)); },

    /** B1: Set stagger window for per-column fade (0 = all fade together). */
    setMsgFadeSpread(v) { _msgFadeSpread = Math.max(0, v); },

    /** C2: Enqueue a message; fires immediately if idle, otherwise appended to queue. */
    queueMessage(text, opts = {}) {
      if (msgState === 'idle') {
        _doShowMessage(text, opts);
      } else {
        _msgQueue.push({ text, opts });
      }
    },

    /** C2: Clear pending message queue without cancelling the active message. */
    clearQueue() { _msgQueue = []; },

    /**
     * C3: Display a single word vertically along one column.
     * Characters lock immediately (no organic arrive-and-lock wait).
     *
     * @param {string} text  The word to display (max ~10 chars)
     * @param {object} [opts]
     * @param {number} [opts.xFrac=0.5]          Screen UV X of the target column (0–1)
     * @param {number} [opts.yFrac=0.5]          Screen UV Y of the text block centre (0–1)
     * @param {number} [opts.holdDuration=4.0]   Seconds to hold
     * @param {number} [opts.fadeDuration=1.0]   Seconds to fade out
     * @param {Function} [opts.onHold]           C1: callback at lock→holding
     * @param {Function} [opts.onComplete]       C1: callback after fade
     */
    showVerticalMessage(text, opts = {}) {
      if (typeof text !== 'string') return;
      const chars = [...text];
      if (chars.length === 0) return;

      const {
        xFrac         = 0.5,
        yFrac         = 0.5,
        holdDuration  = 4.0,
        fadeDuration  = 1.0,
        boost         = 2.0,
        exitGlitch    = false,
        exitGlitchIntensity = 0.8,
        exitGlitchDuration  = 0.3,
        freezeTrailDuration = 0,
        onHold        = null,
        onComplete    = null,
      } = opts;

      if (msgState !== 'idle') _clearAllLocks(true);

      const geomNow  = mesh.geometry;
      const lockAttr = geomNow.getAttribute('aLockState');
      const colAAttr = geomNow.getAttribute('aColA');
      const colBAttr = geomNow.getAttribute('aColB');
      if (!lockAttr || !colAAttr || !colBAttr) return;
      const lockData = lockAttr.array;
      const colABuf  = colAAttr.array;
      const colBBuf  = colBAttr.array;
      const nCols    = _geomParams.nCols;
      const nRows    = geomNow.instanceCount / nCols;
      const reserveStart = geomNow._reservePool?.reserveStart ?? nCols;

      // Project column world positions; find closest to xFrac.
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();
      _msgVpMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      const wH    = uniforms.uWorldH.value;
      const wY0   = (0.5 - yFrac) * wH;  // world Y of vertical block centre

      let bestCol = -1, bestDist = Infinity;
      for (let c = 0; c < reserveStart; c++) {
        const base = c * nRows * 4;
        const wx   = colABuf[base + 0] + uniforms.uColumnOffset.value.x;
        const wz   = colABuf[base + 1] + uniforms.uColumnOffset.value.y;
        _msgTv.set(wx, wY0, wz, 1.0).applyMatrix4(_msgVpMat);
        if (_msgTv.w <= 0) continue;
        const sx   = (_msgTv.x / _msgTv.w) * 0.5 + 0.5;
        const dist = Math.abs(sx - xFrac);
        if (dist < bestDist) { bestDist = dist; bestCol = c; }
      }
      if (bestCol < 0) return;

      // Lock each character immediately at the appropriate world Y.
      const n        = chars.length;
      const aScale   = colBBuf[bestCol * nRows * 4 + 1];
      const cellStep = uniforms.uCellH.value * aScale * 1.85;
      const now      = prevTs || performance.now() * 0.001;

      _msgSlots = [];
      _msgLockedCols.add(bestCol);
      for (let i = 0; i < n; i++) {
        const lockY = wY0 + (i - (n - 1) / 2) * cellStep;
        const glyph = charToGlyphIdx(chars[i], _activeCharSet);
        _writeLockRows(lockData, nRows, bestCol, lockY, glyph, now, 0);
        _msgSlots.push({ screenX: 0, halfUV: 0.01, glyph, claimed: true,
                         colIdx: bestCol, lineIdx: 0, worldY: lockY,
                         fallbackTriggered: true, revealDelay: 0 });
      }
      lockAttr.needsUpdate = true;
      _msgClaimedCount = _msgSlots.length;
      _msgWorldYs      = [wY0];

      uniforms.uMsgBoost.value            = boost;
      uniforms.uMsgRevealProgress.value   = 1.0;
      uniforms.uMsgRevealActive.value     = 0.0;
      _msgFadeDuration         = fadeDuration;
      _msgFadeSpread           = 0;
      _msgExitGlitch           = exitGlitch;
      _msgExitGlitchIntensity  = exitGlitchIntensity;
      _msgExitGlitchDuration   = exitGlitchDuration;
      _msgFreezeTrailDuration  = freezeTrailDuration;
      _msgOnHold               = onHold ?? null;
      _msgOnComplete           = onComplete ?? null;
      _msgAspect0              = camera.aspect;

      msgHoldDuration   = holdDuration;
      msgFadeSpeed      = fadeDuration > 0 ? 1.0 / fadeDuration : Infinity;
      msgRevealStart    = now;
      msgRevealEnd      = now;  // skip reveal phase — go directly to holding
      msgRevealFallbackT = now;
      msgHoldEnd        = now + holdDuration;
      msgState          = 'holding';
      if (_msgOnHold) { const cb = _msgOnHold; _msgOnHold = null; cb(); }
    },

    // ── externalLoop API ──────────────────────────────────────────────────
    /**
     * Build the rain PP node chain on top of an external scene colour node.
     * Returns { outputNode, rttPhosphor, passBuilders, postRender(rdr), dispose() }.
     * May only be called after renderer.init() has resolved.
     */
    buildNodes(sceneColorNode) { return buildNodesInternal(sceneColorNode); },

    /**
     * Frame tick: update uniforms and burst bloom. Call with t in seconds.
     * @param {number} t  elapsed seconds (ts * 0.001 from RAF timestamp)
     */
    tick(t) { tick(t); },

    /**
     * Notify of a resize. Sets uAspect.value = w / h.
     * Call before rebuildPP() whenever the host element resizes.
     * @param {number} w  new width in pixels
     * @param {number} h  new height in pixels
     */
    onResize(w, h) {
      applyRendererResolution(w, h);
    },

    // ── Camera controls ───────────────────────────────────────────────────
    /**
     * Set camera field of view. No-op when syncCamera is active.
     * @param {number} deg  15–120 degrees
     */
    setFov(deg) {
      if (activeSyncCamera) return;
      camera.fov = Math.max(15, Math.min(120, deg));
      camera.updateProjectionMatrix();
    },

    /**
     * Enable/disable automatic orbit animation. No-op when syncCamera is active.
     * @param {boolean} enabled
     * @param {number}  [speed=0.015]   orbits per second
     * @param {number}  [radius=6]      orbit radius in world units
     */
    setAutoOrbit(enabled, speed, radius) {
      if (activeSyncCamera) return;
      if (enabled) {
        if (speed  !== undefined) camCtrl._orbitSpeed  = speed;
        if (radius !== undefined) camCtrl._orbitRadius = radius;
        camCtrl.setMode('orbit');
      } else {
        if (camCtrl._mode === 'orbit') camCtrl.setMode('none');
        _resetFrustumVis();
      }
    },

    /**
     * Enable/disable Lissajous flythrough. No-op when syncCamera is active.
     * @param {boolean} enabled
     * @param {number}  [speed=0.008]   phase advance per second
     */
    setFlythrough(enabled, speed) {
      if (activeSyncCamera) return;
      if (speed  !== undefined) camCtrl._flySpeed  = Math.max(0.001, Math.min(0.2, speed));
      if (enabled) {
        // Start from current camera position with neutral heading
        camCtrl._flyPos.copy(camera.position);
        camCtrl._flyYaw   = 0;
        camCtrl._flyPitch = 0;
        camCtrl._flyPhase = 0;
        camCtrl.setMode('fly');
        // Auto-enable column follow so rain stays centred on camera
        camCtrl._columnFollow = true;
        uniforms.uColumnOffset.value.set(camera.position.x, camera.position.z);
        _columnOffset.set(camera.position.x, camera.position.z);
      } else {
        if (camCtrl._mode === 'fly') {
          camCtrl.setMode('none');
          _resetFrustumVis();
        }
        // Auto-disable column follow
        camCtrl._columnFollow = false;
        uniforms.uColumnOffset.value.set(0, 0);
        _columnOffset.set(0, 0);
      }
    },

    /**
     * Set orbit elevation angle. Clamped to ±60° to avoid gimbal collapse.
     * @param {number} deg  −60 to 60
     */
    setOrbitElevation(deg) {
      camCtrl._orbitElevDeg = Math.max(-60, Math.min(60, deg));
    },

    /**
     * Enable/disable column-follow (infinite rain illusion).
     * When enabled, the column field XZ offset tracks camera XZ position.
     * @param {boolean} enabled
     */
    setColumnFollow(enabled) {
      camCtrl._columnFollow = !!enabled;
      if (!enabled) {
        uniforms.uColumnOffset.value.set(0, 0);
        _columnOffset.set(0, 0);
      }
    },

    /**
     * Stop auto-camera, disable column follow, reset camera to default pose.
     */
    resetCamera() {
      camCtrl.setMode('none');
      camCtrl._columnFollow = false;
      camCtrl._flyPos.set(0, 0, 0);
      camCtrl._flyYaw   = 0;
      camCtrl._flyPitch = 0;
      camCtrl._flyPhase = 0;
      uniforms.uColumnOffset.value.set(0, 0);
      _columnOffset.set(0, 0);
      _resetFrustumVis();
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      camera.fov = 45;
      camera.updateProjectionMatrix();
    },

    // ── Scene/camera/renderer getters (for bridge use) ────────────────────
    get scene()    { return scene; },
    get camera()   { return camera; },
    get renderer() { return renderer; },

    /**
     * Active rendering backend. null until renderer.init() resolves, then
     * 'webgpu' or 'webgl2'. Listen for 'matrixrain:ready' on the host element
     * to know when this is set.
     * @type {'webgpu'|'webgl2'|null}
     */
    backend: null,

    /**
     * Returns the CRT handle after renderer.init() resolves; null before that
     * and in non-CRT modes.
     */
    get crt() { return crtHandle; },

    // ── CCP easter egg handle methods ──────────────────────────────────────

    /** Activate (true) or deactivate (false) CCP mode. */
    setCCPMode(on, msgOpts = {}) {
      _ccpActive = on;
      if (on) {
        _initCCPPanels();
        _initCCPExtras();
        _ccpFadeDir = 1;
        // Reset camera to (0, 0, 9) and enable auto-orbit
        camera.position.set(0, 0, 9);
        camera.lookAt(0, 0, 0);
        camCtrl._orbitRadius = 9;
        camCtrl.setMode('orbit');
        // Save current rain state
        _ccpSaved = {
          colorR:        uniforms.uColor.value.x,
          colorG:        uniforms.uColor.value.y,
          colorB:        uniforms.uColor.value.z,
          color2R:       uniforms.uColor2.value.x,
          color2G:       uniforms.uColor2.value.y,
          color2B:       uniforms.uColor2.value.z,
          charSet:       _currentCharSet,
          reverseChance: uniforms.uReverseChance.value,
          vignette:      _ppState.vignette,
          aberration:    _ppState.aberration,
        };
        if (_ccpRainOverride) {
          handle.setColor('#DE2910');
          handle.setColor2('#FFDE00');
          handle.setCharSet('chinese');
          handle.setReverseChance(1.0);
          handle.setVignette(0.85);
          handle.setHoloAberration(0.012);
          handle.triggerSpeedRamp(3.0, 1.2);
        }
        _startSlogans(msgOpts);
      } else {
        _ccpFadeDir = -1;
        clearTimeout(_ccpSloganTimer);
        _ccpSloganTimer = null;
        if (_ccpSaved) {
          handle.setColor(toHex(_ccpSaved.colorR, _ccpSaved.colorG, _ccpSaved.colorB));
          handle.setColor2(toHex(_ccpSaved.color2R, _ccpSaved.color2G, _ccpSaved.color2B));
          handle.setCharSet(_ccpSaved.charSet);
          handle.setReverseChance(_ccpSaved.reverseChance);
          handle.setVignette(_ccpSaved.vignette);
          handle.setHoloAberration(_ccpSaved.aberration);
          _ccpSaved = null;
        }
      }
    },

    /** Flash frequency 0.1–4 Hz (default 1.2). */
    setCCPFlashRate(hz) { _ccpFlashHz = Math.max(0.1, Math.min(4, hz)); },

    /** Peak opacity 0–1 (default 0.72). */
    setCCPOpacity(v) { _ccpPeakOpacity = Math.max(0, Math.min(1, v)); },

    /** Panel size multiplier 0.5–3. Recreates panels if active. */
    setCCPScale(v) {
      _ccpScale = Math.max(0.5, Math.min(3, v));
      if (_ccpActive) { _destroyCCPPanels(); _initCCPPanels(); _destroyCCPExtras(); _initCCPExtras(); }
    },

    /** Active panels 1–3 (default 3). Recreates panels if active. */
    setCCPPanelCount(n) {
      _ccpPanelCount = Math.max(1, Math.min(3, Math.round(n)));
      if (_ccpActive) { _destroyCCPPanels(); _initCCPPanels(); }
    },

    /** Azimuthal orbit speed rad/s (default 0). */
    setCCPOrbitSpeed(v) { _ccpOrbitSpeed = v; },

    /** Whether rain overrides are applied on next activation. */
    setCCPRainOverride(on) { _ccpRainOverride = !!on; },

    /** Whether CCP slogans cycle while active. */
    setCCPSlogans(on) {
      _ccpSloganActive = !!on;
      if (!on) { clearTimeout(_ccpSloganTimer); _ccpSloganTimer = null; }
    },

    // ── Mossad easter egg handle methods ───────────────────────────────────

    /** Activate (true) or deactivate (false) Mossad mode. */
    setMossadMode(on, msgOpts = {}) {
      _mossadActive = on;
      if (on) {
        _initMossadPanels();
        _mossadFadeDir = 1;
        // Save current rain state and apply override
        if (_mossadRainOverride && !_mossadSaved) {
          _mossadSaved = {
            colorR:     uniforms.uColor.value.x,
            colorG:     uniforms.uColor.value.y,
            colorB:     uniforms.uColor.value.z,
            color2R:    uniforms.uColor2.value.x,
            color2G:    uniforms.uColor2.value.y,
            color2B:    uniforms.uColor2.value.z,
            charSet:    _currentCharSet,
            vignette:   _ppState.vignette,
            aberration: _ppState.aberration,
          };
          handle.setColor('#0038B8');
          handle.setColor2('#FFFFFF');
          handle.setCharSet('hebrew');
          handle.setVignette(0.75);
          handle.setHoloAberration(0.008);
        }
        _startMossadSlogans(msgOpts);
        ensureMossadScanStyle();
      } else {
        _mossadFadeDir = -1;
        clearTimeout(_mossadSloganTimer);
        _mossadSloganTimer = null;
        clearInterval(_mossadCounterInterval);
        _mossadCounterInterval = null;
        if (_mossadSaved) {
          handle.setColor(toHex(_mossadSaved.colorR, _mossadSaved.colorG, _mossadSaved.colorB));
          handle.setColor2(toHex(_mossadSaved.color2R, _mossadSaved.color2G, _mossadSaved.color2B));
          handle.setCharSet(_mossadSaved.charSet);
          handle.setVignette(_mossadSaved.vignette);
          handle.setHoloAberration(_mossadSaved.aberration);
          _mossadSaved = null;
        }
      }
    },

    /** Portrait flash frequency 0.1–4 Hz (default 0.9). */
    setMossadFlashRate(hz) { _mossadFlashHz = Math.max(0.1, Math.min(4, hz)); },

    /** Peak opacity 0–1 (default 0.68). */
    setMossadOpacity(v) { _mossadPeakOpacity = Math.max(0, Math.min(1, v)); },

    /** Panel size multiplier 0.5–3 (default 1.0). Recreates panels if active. */
    setMossadScale(v) {
      _mossadScale = Math.max(0.5, Math.min(3, v));
      if (_mossadActive) { _destroyMossadPanels(); _initMossadPanels(); }
    },

    /** Portrait count 1–3 (default 3); flag always added separately. Recreates panels if active. */
    setMossadPanelCount(n) {
      _mossadPanelCount = Math.max(1, Math.min(3, Math.round(n)));
      if (_mossadActive) { _destroyMossadPanels(); _initMossadPanels(); }
    },

    /** Azimuthal orbit speed rad/s (default 0). */
    setMossadOrbitSpeed(v) { _mossadOrbitSpeed = v; },

    /** Enable (true) or disable (false) Hava Nagila audio. Actual playback managed by the host page. */
    setMossadAudioEnabled(on) { _mossadAudioEnabled = !!on; },

    /**
     * Toggle rain colour/charset override.
     * If true and mode is active, applies immediately.
     * If false and mode is active, restores saved rain state.
     */
    setMossadRainOverride(v) {
      _mossadRainOverride = !!v;
      if (_mossadActive) {
        if (_mossadRainOverride && !_mossadSaved) {
          _mossadSaved = {
            colorR:     uniforms.uColor.value.x,
            colorG:     uniforms.uColor.value.y,
            colorB:     uniforms.uColor.value.z,
            color2R:    uniforms.uColor2.value.x,
            color2G:    uniforms.uColor2.value.y,
            color2B:    uniforms.uColor2.value.z,
            charSet:    _currentCharSet,
            vignette:   _ppState.vignette,
            aberration: _ppState.aberration,
          };
          handle.setColor('#0038B8');
          handle.setColor2('#FFFFFF');
          handle.setCharSet('hebrew');
          handle.setVignette(0.75);
          handle.setHoloAberration(0.008);
        } else if (!_mossadRainOverride && _mossadSaved) {
          handle.setColor(toHex(_mossadSaved.colorR, _mossadSaved.colorG, _mossadSaved.colorB));
          handle.setColor2(toHex(_mossadSaved.color2R, _mossadSaved.color2G, _mossadSaved.color2B));
          handle.setCharSet(_mossadSaved.charSet);
          handle.setVignette(_mossadSaved.vignette);
          handle.setHoloAberration(_mossadSaved.aberration);
          _mossadSaved = null;
        }
      }
    },
  };
  return handle;
}

/**
 * Tear down matrix rain on an element.
 * @param {HTMLElement} element
 */
export function destroyMatrixRain(element) {
  const s = _state.get(element);
  if (!s) return;
  cancelAnimationFrame(s.animRef.id);
  s.ro.disconnect();
  s.material.dispose();
  s.geom.dispose();
  s.atlasTex.dispose();
  s.dummyRT.dispose();
  s._cleanup?.();
  s.renderer.dispose();
  s.renderer.domElement.remove();
  _state.delete(element);
}
