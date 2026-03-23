/**
 * telescreen-crt-webgpu.js
 * WebGPU CRT post-processing effect for Three.js r183+.
 *
 * Usage:
 *   import { initTelescreenCRTWebGPU } from './telescreen-crt-webgpu.js';
 *
 *   await renderer.init();
 *   const crt = initTelescreenCRTWebGPU(renderer, scene, camera);
 *   crt.setGlitch(true, 0.01, 24, 50, 0.85, 3.15, 0.01);
 *   crt.setShader({ warpMult: 0.5, halationStr: 3.0 });
 *   // render loop driven internally (autoRender: true default)
 *   // or:
 *   const crt = initTelescreenCRTWebGPU(renderer, scene, camera, { autoRender: false });
 *   function myLoop(ts) { requestAnimationFrame(myLoop); crt.renderFrame(ts); }
 *   requestAnimationFrame(myLoop);
 */

import * as THREE from 'three/webgpu';
import {
  Fn, vec2, vec3, vec4,
  float,
  mix, max, pow,
  rtt,
  uniform,
  smoothstep,
  screenUV, screenSize,
  pass,
  texture,
  convertToTexture,
  nodeObject,
} from 'three/tsl';

import { computeFlickerBoost, computeMaskBoost } from './crt-math.js';
import { crtKernelFn, crtHalationFn, crtHorzPassFn, crtVertPassFn } from './crt-kernel.wgsl.js';
import { crtGlitchFallbackFn } from './crt-glitch.wgsl.js';
import {
  buildMaskLutFn,
  grainFn,
  snowFn,
  buildWarpNode,
  buildCornerMaskNode,
  buildGammaNode,
  buildScratchNode,
  buildP22MatrixNode,
  buildColorTempNode,
  ghostFn,
  vbiFn,
  dotCrawlFn,
} from './crt-tsl.js';

// ---------------------------------------------------------------------------
// Struct-return version gate
// ---------------------------------------------------------------------------

/**
 * First Three.js revision confirmed to support wgslFn struct return via .element().
 * If the runtime revision is below this, the vec3f fallback encoding is used instead.
 * Update downward if a regression is discovered in a newer revision.
 */
const STRUCT_RETURN_MIN_REV = 9999;
// r171 WGSLNodeFunction cannot parse user-defined struct types inside wgslFn source:
// the source must begin with `fn` (regexp anchored at ^fn). Custom struct definitions
// (e.g. `struct GlitchResult { ... }`) break parsing.
// WGSL built-in types (vec4f, vec3f, vec2f, f32, etc.) work correctly as return types.
// All current multi-value returns use vec3f or vec4f packing — no custom struct is needed.
// Lower STRUCT_RETURN_MIN_REV if a future Three.js revision supports struct defs in wgslFn.

// ---------------------------------------------------------------------------
// GPU bloom — optional GaussianBlurNode addon
// ---------------------------------------------------------------------------

/** Module-level handles to GaussianBlurNode once loadBloomDependencies() resolves. */
let _gaussianBlur = null;
let _GaussianBlurNode = null;

/**
 * Attempt to load the Three.js GaussianBlurNode addon.
 * Call this once before initTelescreenCRTWebGPU() when using opts.bloom.
 * Safe to call even when bloom is not used — it is a no-op if already loaded.
 * @returns {Promise<void>}
 */
export async function loadBloomDependencies() {
  if (_gaussianBlur) return;
  try {
    const mod = await import('three/addons/tsl/display/GaussianBlurNode.js');
    _gaussianBlur = mod.gaussianBlur;
    _GaussianBlurNode = mod.default;
  } catch (_) {
    console.warn(
      'telescreen-crt-webgpu: GaussianBlurNode not available — ' +
      'bloom will use unblurred threshold composite as fallback.'
    );
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Mount the WebGPU CRT post-processing effect.
 *
 * @param {THREE.WebGPURenderer} renderer  - Initialised WebGPURenderer (await renderer.init() first)
 * @param {THREE.Scene}          scene     - Scene to render through the effect
 * @param {THREE.Camera}         camera    - Camera for the scene pass
 * @param {Object}               [opts]
 * @param {string}  [opts.scratchUrl='./data/scratches.png']  Scratch texture URL (same-origin or CORS)
 * @param {boolean} [opts.autoRender=true]  Start the internal render loop.
 *                  Pass false to drive manually via crt.renderFrame(timestamp).
 * @param {boolean|Object} [opts.bloom]  Enable GPU bloom. Pass true for defaults or an object:
 *                  { enabled: true, strength: 0.8, radius: 1.5, threshold: 0.75 }
 *                  Call loadBloomDependencies() before init for full Gaussian blur support.
 *                  { threshold: 0.75 }  Brightpass threshold in linear light (default 0.75 = 75% white).
 *                  CRT-Royale reference: bloom_underestimate_levels = 0.8.
 *                  Values below 0.3 apply bloom to mid-tones, producing a non-physical low-level veil.
 * @param {Function} [opts.onError]  Optional error callback invoked with an Error when a
 *                  recoverable init failure occurs (e.g. scratch texture load failure).
 *                  Does not fire for device-loss — that triggers automatic recovery.
 *
 * @param {HTMLVideoElement} [opts.videoSource]  Optional video element to route through the CRT
 *                  effect. The library creates a VideoTexture, PlaneGeometry, and MeshBasicMaterial
 *                  and adds them to the scene. The caller must call video.play() inside a user
 *                  gesture handler (or set video.muted = true for autoplay without a gesture).
 *                  Use crt.setVideoSource() to swap or clear the video at runtime.
 * @note The renderer must be configured with `outputColorSpace = THREE.LinearSRGBColorSpace`
 *       before calling this function. With SRGBColorSpace (Three.js default) the pipeline
 *       double-encodes: buildGammaNode applies γ=2.5, then Three.js applies sRGB (γ=2.2),
 *       producing a net γ=0.4 on the display instead of the intended CRT curve.
 *
 * @returns {{
 *   postProcessing: THREE.RenderPipeline,
 *   setGlitch(enabled, strength?, speed?, cols?, rgb?, delay?, burst?): void,
 *   setShader(params): void,
 *   setBloom(params): void,
 *   setVideoSource(videoEl: HTMLVideoElement | null): void,
 *   renderFrame(timestamp: number): Promise<void>,
 *   destroy(): void
 * }}
 */
export function initTelescreenCRTWebGPU(renderer, scene, camera, opts = {}) {
  // Quality-tiered auto source width for two-pass mode.
  // Returns 0 (single-pass) when outputW ≤ 640 (= first-tier srcW).
  // Two-pass only engages when outputW > srcW (true upscale); at outputW ≤ 640 the
  // virtual source would be downscaled → sub-pixel scanlines, invisible. Any output
  // ≥ 641 px benefits from a 640 px virtual source (1.0–3× scale; scanlines visible
  // from ~1.1× upward). Old threshold 1024 left small viewports scanline-free.
  function computeAutoSourceWidth(outputW) {
    if (outputW <= 640) return 0;    // single-pass: outputW ≤ srcW → downscale, no scanlines
    if (outputW <= 1920) return 640;
    if (outputW <= 2560) return 800;
    return 960;
  }

  // P3-A: Capture antialias flag from the original renderer so device-loss recovery
  // recreates the renderer with the same MSAA setting. WebGPU's getContextAttributes()
  // may not be available; default to false (conservative — avoids unintended MSAA on CRT sim).
  const _ctx = renderer.getContext?.();
  const _antialiasFlag = (typeof _ctx?.getContextAttributes === 'function')
    ? (_ctx.getContextAttributes()?.antialias ?? false)
    : false;

  // wgslFn() shaders are WGSL-only and require the WebGPU backend.
  // The WebGL2 fallback uses a GLSL compiler that cannot parse WGSL strings.
  if (renderer.backend && !renderer.backend.isWebGPUBackend) {
    throw new Error(
      'telescreen-crt-webgpu: WebGPU backend required. ' +
      'The current renderer is using the WebGL2 fallback, which cannot compile wgslFn() WGSL shaders. ' +
      'Use Chrome 113+ / Edge 113+ with WebGPU enabled.'
    );
  }

  const {
    scratchUrl   = './data/scratches.png',
    autoRender   = true,
    autoTwoPass  = true,
    bloom:       bloomOpt    = undefined,
    videoSource: videoOpt   = undefined,
    onError,
    accurateHalation = true,
  } = opts;

  // P1-A: post-kernel RTT for accurate outer halation taps (+1 draw call per frame when true).
  // Default true — outer taps read post-scanline gamma-encoded RT, eliminating ~4× inter-scanline inflation.
  const _accurateHalation = !!accurateHalation;

  // ── Bloom setup ───────────────────────────────────────────────────────────
  const BLOOM_DEFAULTS = { enabled: true, strength: 0.25, radius: 1.8, threshold: 0.75, coreRadius: 0.35, coreStrength: 0.6 };
  const resolvedBloom  = bloomOpt
    ? (bloomOpt === true ? BLOOM_DEFAULTS : { ...BLOOM_DEFAULTS, ...bloomOpt })
    : null;

  const bloomEnabled = !!resolvedBloom;

  // bloomState and bloomUniforms only allocated when bloomEnabled
  const bloomState = bloomEnabled ? {
    active:       resolvedBloom.enabled,
    strength:     resolvedBloom.strength,
    coreStrength: resolvedBloom.coreStrength ?? 0.6,
  } : null;

  const bloomUniforms = bloomEnabled ? {
    bloomStrength:      uniform(bloomState.active ? bloomState.strength : 0),
    bloomRadius:        uniform(resolvedBloom.radius),
    bloomThreshold:     uniform(resolvedBloom.threshold),
    bloomCoreRadius:    uniform(resolvedBloom.coreRadius ?? 0.35),
    bloomCoreStrength:  uniform(bloomState.active ? bloomState.coreStrength : 0),
  } : null;

  let _fallbackBlurWarned = false;     // per-instance (was incorrectly at module scope)
  let _bloomBlurNodes = [];            // GaussianBlurNode refs for dispose + resolution control
  let _bloomRttNodes  = [];            // convertToTexture RTTNode refs — dispose their RTs on rebuild
  let _maskLutRttNode = null;          // RTTNode for Lanczos mask LUT (outputW × 4); rebuilt on PP rebuild
  let _ghostRttNode = null;           // DR-14 P1-B: pre-kernel ghost RTT (null when ghostStr <= 0.001)
  let _lastGhostActive = false;       // DR-14 P1-B: ghost active flag at last buildPostProcessing
  let _accurateHalationRtt = null;    // P1-A: post-kernel RTT for accurate outer halation taps
  // DR-14 P1-A: mask LUT dirty-flag — skip re-render when governing params unchanged.
  let _maskLutNeedsRender = true;
  let _maskLutCachedType   = -1;
  let _maskLutCachedSmooth = -1;
  let _maskLutCachedScale  = -1;
  // DR-14 P2-A: readback flag — set when LUT was just (re-)rendered, cleared after readback.
  let _maskLutNeedsBoostReadback = false;
  let _glassBlurNodes = [];            // glass scatter GaussianBlurNode refs (independent of bloom)
  let _glassBlurRttNodes = [];         // glass scatter RTTNode refs
  let _haloBlurNodes  = [];            // P0-A: 2D isotropic halation GaussianBlurNode refs
  let _haloRttNodes   = [];            // P0-A: 2D isotropic halation convertToTexture RTT refs
  let _lastHaloActive = false;         // P0-A: halo enabled flag at last buildPostProcessing
  let _haloMissingWarned = false;      // P0-A: one-time warning flag when haloStr set without GaussianBlurNode
  let _dotCrawlRttNode = null;         // pre-kernel dot crawl RTT (null when dotCrawlAmt <= 0.001)
  let _lastDotCrawlActive = false;     // dot crawl active flag at last buildPostProcessing
  // One-frame gap between dispose and rebuild prevents Vulkan OOM from dispose-then-allocate
  // in the same JS turn (GPU memory release is async; new allocs would overlap with old ones).
  let _rebuildPending = false;
  let _rebuildArgs    = null;  // [srcW, srcH, usePrevTex] — stored params for deferred build

  // ── Video source state (populated only when opts.videoSource is provided) ─
  // VideoTexture → copyExternalImageToTexture(videoElement) is rejected by Chrome
  // WebGPU when the bind group is built before the GPU validates the video frame.
  // Instead we proxy through an OffscreenCanvas: draw the video to the canvas each
  // frame and use CanvasTexture, which copyExternalImageToTexture always accepts.
  let videoTexture      = null;   // THREE.CanvasTexture or DataTexture placeholder
  let videoMesh         = null;   // THREE.Mesh added to scene
  let currentVideoEl    = null;   // current HTMLVideoElement reference
  let loadedMetaHandler = null;   // bound listener for removal
  let _videoCanvas      = null;   // OffscreenCanvas proxy for video frames
  let _videoCtx         = null;   // 2D context for _videoCanvas

  let destroyed        = false;
  let rafId            = null;
  let startTime        = null;
  let deviceLost       = false;
  let firstRenderDone  = false;
  let _renderInFlight  = false;  // guards against concurrent renderAsync() calls
  let _lastVideoTime   = -1;     // tracks last drawn video currentTime; avoids redundant drawImage

  // ── Phosphor persistence render targets (created lazily on first use) ─────
  // prevTexNode: TSL texture node for prevRT.texture. Initialised to a 1×1 dummy
  // RT so the node graph compiles without a real RT. Hot-swapped to the real
  // prevRT.texture in ensurePersistenceTargets() on first use.
  let prevRT      = null;    // full-res HalfFloat RT: previous frame (accumulator)
  let prevTexNode = null;    // TSL texture node for prevRT.texture
  let _persistW   = 0;       // RT width at last build (for resize detection)
  let _persistH   = 0;       // RT height at last build

  // ── Mode-transition tracking for two-pass RTTNode rebuild ────────────────
  // _lastSrcW/H: source resolution of the current horzRttNode (0 = single-pass).
  // Rebuild is triggered when mode changes (single↔two-pass) or source dims change.
  let _lastSrcW = 0;              // source width of current PostProcessing build (0 = single-pass)
  let _lastSrcH = 0;              // source height of current PostProcessing build
  let _lastUsePrevTex = false;    // DR-7 P2-A: usePrevTex flag of the current pipeline build
  let _lastGlassBlurActive = false; // DR-8 P2-D: glass blur enabled flag of current pipeline build
  let _userSetSourceSize = false;  // true when setShader({ sourceSizeX }) was called by user
  let _lastCanvasW = 0;           // canvas pixel width at last render (resize detection)
  let _lastCanvasH = 0;           // canvas pixel height at last render
  let _lastMaskScale = 0;         // P1-A: effective mask scale at last updateMaskBoost() call

  // ── Frame-rate-independent persistence ──────────────────────────────────
  // When _persistenceTau > 0, the per-frame blend factor is computed from the
  // measured inter-frame interval: blend = exp(-dt / tau).
  // This makes the phosphor afterglow time constant independent of display
  // refresh rate. Set via setShader({ persistenceTau: seconds }).
  // 0 = disabled; falls back to direct uniforms.persistence.value (legacy path).
  let _persistenceTau = 0;
  // Timestamp of the previous renderFrame call. Null on first call — a fallback
  // of 1/60 s (≈ steady-state 60 Hz value) is used once without visible artifact.
  let lastTs = null;
  // vec3f fallback is the only path — struct return from wgslFn is not supported in r171.
  // STRUCT_RETURN_MIN_REV = 9999 ensures this. The struct export was removed in DR-5 P3-A.
  // If a future Three.js version adds struct-return support, re-introduce crtGlitchFn
  // in crt-glitch.wgsl.js and restore the version-gate logic here.
  const glitchFn = crtGlitchFallbackFn;

  // ── Uniforms ─────────────────────────────────────────────────────────────
  const uniforms = {
    glitchEnabled:  uniform(0),
    glitchActive:   uniform(0),
    glitchStrength: uniform(0.01),
    glitchSpeed:    uniform(24.0),
    glitchCols:     uniform(50.0),
    glitchRgb:      uniform(0.85),
    hardPix:        uniform(-2.5),    // controls-calibrated: controls store +2.5 and send hardPix=-2.5
    hardScan:       uniform(-8.0),
    warpMult:       uniform(0.20),    // controls-calibrated: matches state.warpMult = 0.20
    maskStr:        uniform(0.85),    // controls-calibrated: matches state.maskStr = 0.85
    maskType:       uniform(0),  // integer stored as f32; .toInt() casts to i32 in WGSL.
                               // Always set via setShader({ maskType }) which calls Math.round().
                               // Do NOT write .value directly — use setShader to preserve the round().
    grainAmt:       uniform(0.010),
    halationStr:    uniform(2.0),
    halationSharp:  uniform(-0.85), // vertical Gaussian sharpness for halation scatter.
                                    // -2.5 = inter-scanline bleed; -0.4 = diffuse scatter (~4 src-px σ)
    convergence:    uniform(0.018),
    convStaticX:    uniform(0.0),    // static H misconvergence in source pixels: R shifts +X (P1-H: reduced to near-zero)
    convStaticY:    uniform(0.0),    // static V misconvergence in source pixels: R shifts +Y (P1-H: reduced to near-zero)
    convBX:         uniform(0.0),    // independent B static H offset in source pixels (P1-A: breaks anti-symmetric constraint)
    convBY:         uniform(0.0),    // independent B static V offset in source pixels
    scratchStr:     uniform(0.015),
    scrollRate:     uniform(0.05),
    scrollPhase:    uniform(0.0),    // pre-computed JS-side scroll phase = (t * scrollRate) % srcY.
                                     // Passed to WGSL Dist() and phosphorDecay() instead of t*scrollRate
                                     // to avoid the tWrapped-boundary discontinuity (once per 3600 s).
    brightBoost:    uniform(0.55),    // controls-calibrated: matches state.brightBoost = 0.55
    cornerFade:     uniform(0.022),  // bezel edge fade radius (UV fraction); heavier presets use larger values
    // Realism pass uniforms
    swimAmt:        uniform(0.12),   // H-deflection jitter amplitude (0=off, 1=full, 2=strong)
    colorTempStr:   uniform(0.65),   // 9300K white point correction (0=D65, 1=full 9300K)
    rollbarPhase:   uniform(0.0),    // driven by renderFrame: 0=no scroll, 0→1 during rollbar sweep
    sagPhase:       uniform(0.0),    // driven by renderFrame: 0=none, bell-curve during sag event
    snowAmt:        uniform(0.02),   // electronic snow density (0=off)
    // Fidelity pass uniforms
    maskScale:      uniform(4.0),    // phosphor mask pitch scale (manual override; auto-scale computes from sourceSizeX)
                                     // Choose maskScale so (outputW / srcX / maskScale) is integer to avoid moiré.
                                     // At 1920 output / 640 source: maskScale=4.0 → 480 exact periods, no beat.
    // P1-B: Convergence anisotropy — 0=radial (delta gun/shadow mask), 1=H-only (inline/Trinitron).
    convAspect:     uniform(1.0),    // default H-only for aperture grille (maskType=0, the default)
    // P3-C: CRT electron-gun gamma (typically 2.2–2.5). Affects kernel horizontal blending domain.
    kernelGamma:    uniform(2.5),    // default 2.5 (CRT display gamma)
    // DR-5 P2-A: phosphor aperture width in source pixels for ErfGaus beam-profile integration.
    // 1.0 = aperture grille (one stripe per source pixel). 0.67 = shadow mask (2/3 px per channel).
    apertureW:      uniform(1.0),
    // P2-C: Auto mask energy compensation — 1/avg_aperture_efficiency to maintain perceptual brightness.
    maskBoostFactor: uniform(1.0),   // auto-computed in updateMaskBoost(); not user-settable directly
    // NOTE: scalar boost normalises mean aperture transmittance but not per-channel balance.
    // Shadow mask (type 1) has green aperture ~10% larger than blue → ~2% G lift at maskStr=1.
    // CRT-Royale computes per-channel efficiencies; we use scalar for simplicity.
    // Effect: < 1% at default maskStr=0.85. Acceptable for current use cases.
    glassBlurStr:    uniform(0.0),    // glass-bulk faceplate scatter: 0=off, 0.15=subtle, 0.4=strong
    glassBlurRadius: uniform(0.002),  // scatter radius as fraction of output width; physical range 0.001–0.003
    // Physical basis: far-field Mie/Rayleigh scatter through CRT faceplate glass bulk
    // produces halos 5–30+ source pixels wide (σ ≈ 3–15 px), independent of bloom.
    // Distinct from halationStr (near-field phosphor scatter, σ ≈ 0.9–1.3 px).
    // Changing glassBlurStr across the 0/non-zero boundary triggers a pipeline rebuild.
    maskSmooth:     uniform(0.12),   // phosphor stripe profile: 0=binary (default), 1=cosine smooth
    defocusAmt:     uniform(0.35),   // edge beam defocus: 0=off, 0.5=subtle, 1=strong
    defocusAniso:   uniform(0.0),    // defocus anisotropy: 0=isotropic, 1=V-only (cylindrical tube)
    warpAniso:      uniform(0.0),    // warp anisotropy: 0=isotropic, 1=V-only (cylindrical screen)
    p22Str:         uniform(0.40),   // P22 phosphor primary shift: 0=sRGB, 1=full P22
    // NOTE: flickerRate must satisfy floor(3600 * flickerRate) % 1 == 0 for clean tWrapped
    // wrap (no brightness flash). Safe values: 50, 59.4, 60, 75, 100, 120 Hz.
    // Unsafe: 59.94 (NTSC exact) — produces a brightness flash every 3600 s at the wrap boundary.
    flickerRate:    uniform(60.0),   // emulated CRT field rate Hz (50=EU, 60=US NTSC≈60)
    // P3-C: flickerTau shorthand scalar moved to _cpuState.flickerTau (not a GPU uniform)
    // P1-A: Per-channel phosphor decay taus. P22 colour CRT physical values at broadcast luminance:
    //   R: Y₂O₂S:Eu³⁺  τ ≈ 1–3 ms = 0.001–0.003 s  (JEDEC JEP-133; Blasse & Grabmaier 1994)
    //      150 µs is the low-excitation emission lifetime, not the TV-loading persistence.
    //   G: rare-earth oxysulphide (CRT era)  τ ≈ 100–300 µs = 0.0001–0.0003 s
    //      Still sub-frame at 60 Hz; no perceptual persistence. 0.0001 s retained.
    //      (NOT Zn₂SiO₄:Mn²⁺ / P1 willemite — that is an oscilloscope phosphor with τ ≈ 12 ms)
    //   B: ZnS:Ag,Cl    τ physical ≈ 57 ns; any value < ~2 ms gives identical output at 60 Hz
    //      since the phosphor fully decays within a fraction of a frame regardless.
    //      1.5 ms = same practical behaviour; avoids misleading sub-µs number in JSDoc.
    flickerTauR:    uniform(0.0015), // R channel: Y₂O₂S:Eu³⁺, 1.5 ms (conservative JEDEC centre)
    flickerTauG:    uniform(0.0001), // G channel: rare-earth oxysulphide, ~100 µs
    flickerTauB:    uniform(0.0015), // B channel: ZnS:Ag,Cl — any value < 2 ms gives identical result
    flickerAmt:     uniform(0.0),    // phosphor flicker blend [0, 1].
                                     // WARNING: usable range at 60 Hz P22 is ~[0, 0.03].
                                     // At flickerAmt=0.03: ~3% peak brightness modulation.
                                     // At flickerAmt=1.0: ~36× flickerBoost causes white-out.
                                     // flickerAmt=0 disables all flicker (default, safe).
    blackLevel:     uniform(0.0001), // phosphor dark emission floor (linear light, pre-gamma): 0=perfect black, 0.0001=P22 dark emission
    persistence:    uniform(0.0),    // phosphor afterimage blend: 0=off, 0.25=P22@30fps.
                                     // WARNING: frame-rate-dependent — use persistenceTau instead.
    flickerBoost:   uniform(1.0),    // auto-computed: 1/E[phosphorDecay] — not user-settable
    // Accuracy pass uniforms (Gap A/B/C/F)
    sourceSizeX:    uniform(0.0),    // virtual CRT source width  (0 = use output res)
    sourceSizeY:    uniform(0.0),    // virtual CRT source height (0 = use output res)
    kernelSrcW:     uniform(1.0),    // actual kernel RT width  — set each frame in renderFrame (two-pass only)
    kernelSrcH:     uniform(1.0),    // actual kernel RT height — set each frame in renderFrame (two-pass only)
    outputSizeX:    uniform(1.0),    // canvas output width  — set each frame in renderFrame
    outputSizeY:    uniform(1.0),    // canvas output height — set each frame in renderFrame
    interlace:      uniform(0.0),    // 0 = off, 1 = interlaced (field-parity via interlaceField)
    interlaceField: uniform(0.0),    // 0 or 1 — toggled each frame by renderFrame
    halationWarm:   uniform(0.0),    // halation tint: 0 = neutral/achromatic (default — matches all SOTA
                                     //   implementations), 1 = Trinitron neodymium glass (slightly cool/purple)
    haloRadius:     uniform(0.0),    // P0-A: 2D isotropic halation Gaussian sigma in output pixels. 0 = off.
                                     // Models photon TIR scatter in CRT glass faceplate. Requires loadBloomDependencies().
    haloStr:        uniform(0.0),    // P0-A: 2D isotropic halation additive intensity. 0 = off.
                                     // Requires loadBloomDependencies(). Typical: 0.3–1.0.
    tWrapped:       uniform(0.0),    // elapsed seconds mod 3600 — wrap period chosen so
                                     //   fract(tWrapped × 73) = 0 exactly at wrap boundary
                                     //   (3600 × 73 = 262800, exactly representable in f32)
    // Interference pass uniforms (SPEC-glitch-interference-v2)
    humAmt:         uniform(0.022),  // DR-9 P1-C: full-wave rectified sine modulation amplitude.
                                    // DR-15 P1-E: abs(sin) waveform [0,1] — capacitive DC-rail coupling.
                                    // Positive humAmt = bright bands (+beam current); negative = dark.
                                    // 0.022 ≈ 2.2% peak brightening (barely perceptible, physical).
    humBars:        uniform(1.0),    // P0-B hum bar frequency; abs(sin) produces 2 bright bands per humBars unit (1→2 bands/screen, 2→4 bands)
    humPhase:       uniform(0.0),    // P0-B scrolling phase [0,1] — driven each frame by renderFrame
    agcGain:        uniform(1.0),    // P1-C AGC hunting gain factor (1.0=neutral) — driven by JS oscillator
    ghostOffset:    uniform(0.0),    // P0-A ghost H offset in UV (positive = right); 0=off
    ghostStr:       uniform(0.0),    // P0-A ghost strength: 0=off, 0.15=subtle, negative=polarity-inverted
    ghostTintR:     uniform(1.0),    // P0-A ghost tint R channel (1.0=neutral)
    ghostTintG:     uniform(0.97),   // P0-A ghost tint G channel — mild cable HF roll-off
    ghostTintB:     uniform(0.97),   // P0-A ghost tint B channel — mild cable HF roll-off (not a blue lift; UHF has no blue boost)
    dotCrawlAmt:    uniform(0.09),   // P2-A dot crawl amplitude: 0=off, 0.15=NTSC-like, 0.5=strong
    glitchBurstLoss: uniform(0.70), // P2-B burst-loss desaturation depth: 0=off, 1=full greyscale
    vbiStr:         uniform(0.07),   // P2-C VBI bleed amplitude: 0=off, 0.3=subtle
    vbiLines:       uniform(8.0),    // P2-C NTSC visible VBI ≈ 6–10 lines at typical overscan; 8 = centre [1,21]
    frameCount:     uniform(0.0),    // P2-C frame counter (incremented each frame, mod 1e7)
    osdEnabled:     uniform(0.0),    // OSD mode: 0 = signal mode, 1 = OSD mode (O key in demo)
  };

  // P3-C: CPU-side scalar state — not GPU uniforms, just JS bookkeeping.
  // flickerTau: shorthand scalar for setting all three per-channel taus simultaneously.
  //   Read by setShader({ flickerTau }) to write the three per-channel uniform values.
  //   Never passed to WGSL; not GPU-resident.
  // interlaceDecay: cached scalar = exp(-1/(flickerRate*flickerTau)) for _computeNeedsPrevTex
  //   and the renderFrame copy-guard. Used for JS early-exit decisions only (no GPU binding).
  const _cpuState = {
    flickerTau:     0.0015,    // shorthand scalar — not a GPU uniform; P22 default 1.5 ms
    interlaceDecay: 0.0,       // cached scalar — not a GPU uniform; updated each frame in renderFrame
  };

  // Prime flickerBoost from initial uniform values so callers that skip
  // initTelescreenCRTControls get the correct compensation factor immediately.
  // updateFlickerCompensation() is declared as a function statement below and is
  // therefore hoisted within initTelescreenCRTWebGPU — this call is safe here.
  updateFlickerCompensation();   // prime flickerBoost from initial uniform values

  // ── Glitch burst scheduler state ─────────────────────────────────────────
  // cfg mirrors the original telescreen-crt.js cfg object
  const cfg = {
    glitchEnabled: true,
    delay: 3.15,            // max seconds between bursts
    burst: 0.01,            // max burst duration (seconds)
    rollbarScrollEnabled: true,  // GPU UV scroll synced to CSS rollbar animation
    sagGeomEnabled: true,        // GPU UV squeeze synced to CSS voltage sag animation
    // Interference pass config (SPEC-glitch-interference-v2)
    humRate: 0.06,          // P0-B hum bar scroll rate (NTSC beat: |60.000−59.94|=0.06 Hz)
    agcAmt:  0.012,         // P1-C AGC hunting oscillation amplitude (0=off, 0.05=subtle)
    agcRate: 1.2,           // P1-C AGC hunting primary oscillation rate (Hz)
  };
  let glitchNextFire = 0;
  let glitchEndTime  = 0;

  // ── prefers-reduced-motion ────────────────────────────────────────────────
  // Zero all animated GPU effects when reduced motion is preferred.
  // swimAmt/snowAmt are cached so they restore correctly when preference reverts.
  // Phase drivers (rollbar/sag) also guard on prefersReduced.matches each frame.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let _savedSwimAmt = uniforms.swimAmt.value;
  let _savedSnowAmt = uniforms.snowAmt.value;
  function syncReducedMotion() {
    if (prefersReduced.matches) {
      uniforms.glitchEnabled.value = 0;
      _savedSwimAmt = uniforms.swimAmt.value;
      _savedSnowAmt = uniforms.snowAmt.value;
      uniforms.swimAmt.value = 0;
      uniforms.snowAmt.value = 0;
    } else {
      // glitch: scheduler restores on next renderFrame
      uniforms.swimAmt.value = _savedSwimAmt;
      uniforms.snowAmt.value = _savedSnowAmt;
    }
  }
  prefersReduced.addEventListener('change', syncReducedMotion);
  syncReducedMotion();

  // ── Scratch texture — 1×1 black placeholder; replaced when real image loads ──
  // RepeatWrapping is set here so the WebGPU sampler is compiled in repeat mode
  // from the very first frame. If the placeholder used ClampToEdgeWrapping (default),
  // the sampler state could be cached for clamping and then not update reliably when
  // the real texture hot-swaps in — causing the "top-left quadrant only" and
  // "too strong at minimum" bugs (scratches concentrated in one un-tiled tile).
  const placeholderData = new Uint8Array([0, 0, 0, 255]);
  const placeholderTex  = new THREE.DataTexture(placeholderData, 1, 1);
  placeholderTex.wrapS = placeholderTex.wrapT = THREE.RepeatWrapping;
  placeholderTex.needsUpdate = true;

  let scratchTexture = placeholderTex;
  // texture() creates a TSL TextureNode. Setting .value on it hot-swaps the underlying
  // THREE.Texture without rebuilding the node graph.
  // let (not const) so destroy() can null it to aid GC.
  //
  // Aspect-correct UV: show the texture at ~1:1 pixel scale (no tiling) so the
  // fine 1-3px scratch lines don't alias from downscaling. The horizontal UV factor
  // accounts for the texture's own 2:1 aspect and the screen's aspect ratio.
  // scratches.png is 2048×1024 → texAspect = 2.0.
  const SCRATCH_TEX_ASPECT = 2048 / 1024; // update if texture changes
  // Direct node arithmetic — no Fn() wrapper needed; TSL evaluates lazily at compile time.
  const scratchTileX = screenSize.x.div(screenSize.y).mul(1.0 / SCRATCH_TEX_ASPECT);
  const scratchUV    = screenUV.mul(vec2(scratchTileX, 1.0));
  let scratchTexNode = texture(scratchTexture, scratchUV);

  // OSD texture node — 1×1 transparent placeholder. Hot-swap via osdTexNode.value = canvasTexture.
  // Must use RGBAFormat so .a reads 0 when OSD is disabled, preventing a spurious blend.
  // screenUV (not the Fn-local outputUV) is used so the node can be constructed outside the Fn
  // body — same pattern as prevTexNode and scratchTexNode.
  const osdPlaceholderData = new Uint8Array([0, 0, 0, 0]);
  const osdPlaceholderTex  = new THREE.DataTexture(osdPlaceholderData, 1, 1, THREE.RGBAFormat);
  osdPlaceholderTex.needsUpdate = true;
  let osdTexNode = texture(osdPlaceholderTex, screenUV);

  const texLoader = new THREE.TextureLoader();
  texLoader.load(
    scratchUrl,
    (tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.needsUpdate = true;
      // Hot-swap: update the node's value so the node graph sees the new texture
      scratchTexture = tex;
      // Hot-swap the texture on the existing node — no graph rebuild needed
      scratchTexNode.value = tex;
    },
    undefined,
    () => {
      const msg = `telescreen-crt-webgpu: scratch texture failed to load from "${scratchUrl}" — scratch effect disabled`;
      console.warn(msg);
      uniforms.scratchStr.value = 0;
      if (typeof onError === 'function') onError(new Error(msg));
    }
  );

  // ── Video source setup ────────────────────────────────────────────────────
  /**
   * Scale `mesh` so its height is 1 unit and its width matches the video's
   * native aspect ratio. No-op if dimensions are not yet known.
   * @param {THREE.Mesh}         mesh
   * @param {HTMLVideoElement}   videoEl
   */
  function fitPlane(mesh, videoEl) {
    if (videoEl.videoWidth === 0 || videoEl.videoHeight === 0) return;
    const aspect = videoEl.videoWidth / videoEl.videoHeight;
    mesh.scale.set(aspect, 1, 1);
  }

  if (videoOpt) {
    const isVideoEl = videoOpt instanceof HTMLVideoElement ||
      (typeof videoOpt.videoWidth === 'number');
    if (!isVideoEl) {
      console.warn('telescreen-crt-webgpu: opts.videoSource is not an HTMLVideoElement — video init skipped.');
    } else {
      currentVideoEl = videoOpt;
      const _initVw = videoOpt.videoWidth  || 1;
      const _initVh = videoOpt.videoHeight || 1;
      _videoCanvas = new OffscreenCanvas(_initVw, _initVh);
      _videoCtx    = _videoCanvas.getContext('2d');
      _videoCtx.drawImage(videoOpt, 0, 0, _initVw, _initVh);
      videoTexture = new THREE.CanvasTexture(_videoCanvas);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.needsUpdate = true;
      const videoGeometry = new THREE.PlaneGeometry(1, 1);
      const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
      videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
      scene.add(videoMesh);
      if (videoOpt.readyState >= HTMLMediaElement.HAVE_METADATA) {
        fitPlane(videoMesh, videoOpt);
      } else {
        loadedMetaHandler = () => {
          fitPlane(videoMesh, videoOpt);
          videoOpt.removeEventListener('loadedmetadata', loadedMetaHandler);
          loadedMetaHandler = null;
        };
        videoOpt.addEventListener('loadedmetadata', loadedMetaHandler);
      }
    }
  }

  // ── Persistence prevTexNode placeholder ──────────────────────────────────
  // A 1×1 dummy RT provides a valid texture for the node graph before the real
  // prevRT is created. ensurePersistenceTargets() hot-swaps to prevRT.texture.
  // _dummyPrevRT is 1×1 black. On the first frame with persistence > 0, the blend
  // produces crtFinal * (1-persistence) — a visible flash. Fix: call
  // ensurePersistenceTargets() immediately after renderer.init() if persistence > 0,
  // or initialize prevRT to match the output resolution at construction time.
  const _dummyPrevRT = new THREE.RenderTarget(1, 1, { type: THREE.HalfFloatType });
  prevTexNode = texture(_dummyPrevRT.texture, screenUV);

  // ── PostProcessing ────────────────────────────────────────────────────────
  // Lazy init: postProcessing is built on first use rather than at init.
  // When the window starts large enough for auto-two-pass, building the single-pass
  // pipeline eagerly wastes GPU resources (PassNode RT, bloom RTTs) that are never
  // rendered and can interfere with the two-pass pipeline on some drivers.
  let postProcessing = null;

  // Pre-allocate full-res persistence RT immediately if persistence starts > 0,
  // avoiding the 1×1 black flash on the first frame that reads from the dummy RT.
  if (uniforms.persistence.value > 0.001 || _persistenceTau > 0) {
    ensurePersistenceTargets();
  }

  /**
   * Build stages 1–10 of the CRT node chain (warp → gamma). Returns a vec3 TSL
   * node in gamma-encoded display space, WITHOUT grain, snow, or scratches.
   *
   * Color temperature (Bradford D65→9300K) is applied post-gamma in buildPostProcessing
   * after this function returns — see buildColorTempNode in crt-tsl.js (P1-D) for the
   * clipping analysis that motivated post-gamma placement.
   *
   * Grain, snow, and scratches are applied post-gamma in buildPostProcessing:
   * - Grain pre-gamma would be amplified ~5× in dark areas by the γ=2.5 curve.
   * - Scratches pre-gamma produce opaque white marks instead of subtle highlights,
   *   because 0.025 linear → 0.22 encoded (gamma amplification).
   * - All three must be post-bloom to avoid threshold-boundary flicker each frame.
   *
   * Halation (stage 6) reads from the post-scanline reconstructed col rather than
   * the raw source texture, so the halo follows the reconstructed scanline structure
   * (bright on lit scanlines, attenuated in the dark gap between rows).
   * Horizontal spread of the halo is handled by GPU bloom at threshold=0.
   *
   * @param {TSLNode} inputNode    - scene texture (single-pass) or horzRttNode texture (two-pass)
   * @param {boolean} [useVertPass=false] - true: use crtVertPassFn (two-pass Path B)
   * @returns {TSLNode} vec3 gamma-encoded colour, pre-snow, pre-bloom, pre-scratch, pre-grain
   */
  function buildCRTEffect(inputNode, useVertPass = false, humBarNode = null) {
    return Fn(() => {
      // Pixel-space coordinates — equivalent to gl_FragCoord.xy.
      const pixelCoord = screenUV.mul(screenSize);

      // Explicit canvas-size uniform — always the output canvas dimensions (set each
      // frame from renderer.domElement.width/height). Used instead of screenSize so
      // warp, corner mask, and scanline UV are always in canvas space.
      const outputSizeVec = vec2(uniforms.outputSizeX, uniforms.outputSizeY);
      // Correct output UV: fragCoord / outputCanvas — stays in [0,1] for all canvas pixels.
      const outputUV = pixelCoord.div(outputSizeVec);

      // 1. Barrel warp — uses outputUV and outputSizeVec so the warp and corner mask
      // are always computed in canvas-relative space, even when screenSize is wrong.
      const pos = buildWarpNode(outputUV, uniforms.warpMult, outputSizeVec, uniforms.warpAniso);

      // 2. Glitch displacement + RGB split output
      const glitchResult = glitchFn(
        pos,
        uniforms.glitchEnabled,
        uniforms.glitchActive,
        uniforms.glitchStrength,
        uniforms.glitchSpeed,
        uniforms.glitchCols,
        uniforms.glitchRgb,
        uniforms.tWrapped
      );
      // vec3f fallback encoding: .xy = vec2 pos, .z = float rgbSplitPx
      const glitchedPos = glitchResult.xy;
      const rgbSplitPx  = glitchResult.z;

      // P2-B: Clamp rgbSplitPx for kernel use — sentinel -999 must not cause a
      // -999px RGB split. Kernel receives clamped value; sentinel is checked post-kernel.
      const clampedRgbSplit = rgbSplitPx.max(float(0.0));

      // 3+4. Scanline reconstruction + convergence error + optional RGB split.
      // Two-pass: crtVertPassFn reads from the intermediate H-kernel RT (source-resolution,
      //           gamma-encoded). UV distortions applied inside the WGSL function.
      // Single-pass: crtKernelFn reads from the scene texture directly (existing path).
      let col;
      if (useVertPass) {
        col = crtVertPassFn(
          inputNode,
          glitchedPos,
          outputSizeVec,
          uniforms.hardScan,
          uniforms.scrollPhase,
          uniforms.tWrapped,
          uniforms.kernelGamma,
          clampedRgbSplit,
          uniforms.swimAmt,
          uniforms.rollbarPhase,
          uniforms.sagPhase,
          uniforms.defocusAmt,
          uniforms.defocusAniso,
          uniforms.flickerRate,
          uniforms.flickerTauR,
          uniforms.flickerTauG,
          uniforms.flickerTauB,
          uniforms.flickerAmt,
          uniforms.kernelSrcW,
          uniforms.kernelSrcH,
          uniforms.interlace,
          uniforms.interlaceField,
        );
      } else {
        col = crtKernelFn(
          inputNode,
          glitchedPos,
          outputSizeVec,
          uniforms.hardPix,
          uniforms.hardScan,
          uniforms.scrollPhase,
          uniforms.tWrapped,
          uniforms.convergence,
          uniforms.convStaticX,
          uniforms.convStaticY,
          uniforms.convBX,
          uniforms.convBY,
          uniforms.convAspect,
          uniforms.kernelGamma,
          clampedRgbSplit,
          uniforms.swimAmt,
          uniforms.rollbarPhase,
          uniforms.sagPhase,
          uniforms.defocusAmt,
          uniforms.defocusAniso,
          uniforms.flickerRate,
          uniforms.flickerTauR,
          uniforms.flickerTauG,
          uniforms.flickerTauB,
          uniforms.flickerAmt,
          uniforms.sourceSizeX,
          uniforms.sourceSizeY,
          uniforms.interlace,
          uniforms.interlaceField,
          uniforms.apertureW,
        );
      }

      // P1-B: Interlace inter-frame field blending.
      // Off-field rows show the previous frame's content (field-rate persistence).
      // Simulates the human-visible interlaced CRT appearance: each field is filled by
      // the complementary field from the prior frame rather than going dark.
      // rowParity: fract(row/2)*2 floored → 0 for even source rows, 1 for odd.
      // XOR with interlaceField: abs(rowParity - field) > 0.5 → true for off-field rows.
      // blend weight: interlace * offField → 0 when inactive or on-field, 1 when off-field.
      // P2-B: prevTexNode stores gamma-encoded output (blended^(1/kernelGamma)).
      // col here is pre-gamma linear light — decode prevTexNode to linear before mixing.
      {
        const srcY       = mix(outputSizeVec.y, uniforms.sourceSizeY,
                               uniforms.sourceSizeY.greaterThan(0.5).toFloat());
        const scanRow    = outputUV.y.mul(srcY).floor();
        const rowParity  = scanRow.div(2.0).fract().mul(2.0).floor();   // 0=even row, 1=odd row
        const fieldDiff  = rowParity.sub(uniforms.interlaceField).abs(); // 0 = on-field, 1 = off-field
        const offField   = fieldDiff.greaterThan(0.5).toFloat(); // 1 when off-field, 0 when on-field
        const interlaceW = uniforms.interlace.greaterThan(0.5).toFloat().mul(offField);
        const prevLinear = prevTexNode.rgb.max(vec3(0.0)).pow(vec3(uniforms.kernelGamma));
        col = mix(col, prevLinear, interlaceW);
      }

      // P2-B: Burst-loss desaturation — sentinel rgbSplitPx === -999 from glitch type 5.
      // When active, desaturate the pixel using BT.709 luma (composite video burst phase loss
      // causes the decoder to lose chroma lock, rendering a grey/desaturated image).
      // glitchBurstLoss=0 → isBurstLoss * 0 = no effect; =1 → full greyscale in burst bands.
      {
        const isBurstLoss  = rgbSplitPx.lessThan(float(-900.0)).toFloat();
        const burstLuma    = col.dot(vec3(0.2126, 0.7152, 0.0722));
        const desaturated  = vec3(burstLuma);
        col = mix(col, desaturated, isBurstLoss.mul(uniforms.glitchBurstLoss));
      }

      // 5. Phosphor mask — Lanczos-resampled LUT (F-8 Moiré elimination).
      // P0-A: Auto mask scale — when sourceSizeX > 0, the effective mask scale is
      // outW/srcW (one triad per source pixel); else falls back to uniforms.maskScale.
      // This makes the mask visible at 640→1920 upscale: 9 output pixels per triad.
      const autoScale = outputSizeVec.x.div(uniforms.sourceSizeX.max(1.0));
      const effectiveMaskScale = uniforms.sourceSizeX.greaterThan(0.5)
        .select(autoScale, uniforms.maskScale);
      // Build Lanczos-resampled mask LUT: outputW × 4 texels, one row per vertical phase.
      // All parameters are TSL uniforms — changes take effect next frame without rebuild.
      // Matches the _horzRttNode rtt() pattern; NearestFilter prevents row-phase bleeding.
      const maskLutOutW = renderer.domElement.width;
      // FloatType ensures readRenderTargetPixelsAsync returns Float32Array (HalfFloat default
      // returns Uint16Array, making the P2-A readback path unreachable with Float32Array).
      // DR-15 P0-A: height 12 = LCM(1,2,3,4) -- correct period for all mask types including
      // type 4 (delta triad, period 3). Previous height 4 gave LCM(3,4)=12 row misalignment.
      _maskLutRttNode = rtt(buildMaskLutFn(
        screenUV,
        effectiveMaskScale,
        uniforms.maskType.toInt(),
        uniforms.maskSmooth,
        float(maskLutOutW),
      ), maskLutOutW, 12, { type: THREE.FloatType });
      _maskLutRttNode.renderTarget.texture.minFilter = THREE.NearestFilter;
      _maskLutRttNode.renderTarget.texture.magFilter = THREE.NearestFilter;
      _maskLutRttNode.renderTarget.texture.needsUpdate = true;
      // DR-14 P1-A: monkey-patch updateBefore to skip re-renders when params unchanged.
      // _maskLutNeedsRender is set by the dirty-flag check in renderFrame().
      {
        const _origMaskUpdate = _maskLutRttNode.updateBefore.bind(_maskLutRttNode);
        _maskLutRttNode.updateBefore = function(frame) {
          if (!_maskLutNeedsRender) return;
          _maskLutNeedsRender = false;
          _origMaskUpdate(frame);
        };
      }
      // Row-phase UV: pc_y = source-pixel row / effectiveMaskScale — same metric as maskFn.
      // DR-15 P0-A: mod(12) matches the 12-row LUT height (LCM of all mask type periods).
      const srcYNode = uniforms.sourceSizeY.greaterThan(0.5)
        .select(uniforms.sourceSizeY, outputSizeVec.y);
      const pc_y = pixelCoord.y.mul(srcYNode).div(outputSizeVec.y).div(effectiveMaskScale.max(0.01));
      const rowPhase = pc_y.floor().mod(12.0).div(12.0).add(1.0 / 24.0);
      _maskLutRttNode.uvNode = vec2(screenUV.x, rowPhase);
      const maskBase = _maskLutRttNode.rgb;
      // Type 3 (aperture grille + Trinitron damper wires): apply wire overlay post-LUT.
      // Wires are screen-relative and cannot be pre-baked per output column.
      const screenYNorm = pixelCoord.y.div(outputSizeVec.y);
      const wireWidth   = float(2.0).div(outputSizeVec.y);
      const wireFade    = float(4.0).div(outputSizeVec.y);
      const wire1dist   = screenYNorm.sub(0.3333).abs();
      const wire2dist   = screenYNorm.sub(0.6667).abs();
      const w1 = float(0.65).add(float(0.35).mul(smoothstep(wireWidth, wireWidth.add(wireFade), wire1dist)));
      const w2 = float(0.65).add(float(0.35).mul(smoothstep(wireWidth, wireWidth.add(wireFade), wire2dist)));
      const wireAttenuation = uniforms.maskType.toInt().equal(3).select(w1.mul(w2), float(1.0));
      const maskPattern = maskBase.mul(wireAttenuation);
      // P2-C: maskBoostFactor compensates for aperture transmittance loss (auto-computed in JS).
      const masked = col.mul(mix(vec3(1.0), maskPattern, uniforms.maskStr)).mul(uniforms.maskBoostFactor);

      // OSD overlay blend — after mask, before halation (SPEC-osd-overlay).
      // osdTexNode is sampled at screenUV (straight, unglitched UV) — not affected by glitchedPos.
      // maskMultiplier: reuses maskPattern (above) — applies phosphor stripe modulation to OSD.
      // vWeight: vertical Gaussian beam profile mirroring kernel Gaus(v, hardScan).
      //   srcYNode (above) = effective source height (sourceSizeY or outputSizeY).
      //   vPhase = fractional position within source row, centred at 0.
      //   At beam centre vPhase=0: vWeight=1. Between scanlines |vPhase|→0.5: vWeight→0.
      // When osdEnabled=0, osdTexNode.a=0 → maskedWithOSD == masked (zero-cost blend).
      const maskMultiplier = mix(vec3(1.0), maskPattern, uniforms.maskStr).mul(uniforms.maskBoostFactor);
      const vPhase         = screenUV.y.mul(srcYNode).fract().sub(0.5);
      const vWeight        = float(2.0).pow(vPhase.mul(vPhase).mul(uniforms.hardScan));
      const osdModulated   = osdTexNode.rgb.mul(maskMultiplier).mul(vWeight);
      const maskedWithOSD  = mix(masked, osdModulated, osdTexNode.a.mul(uniforms.osdEnabled));

      // 6. Halation — reads from post-mask 'masked' (physically correct: the phosphor
      // halo radiates from emitted light, which already has the mask structure).
      // UV distortion params mirrored so dy tracks the same scanline rows as the kernel.
      // Horizontal spread is handled by GPU bloom (threshold=0). Vertical spread is
      // controlled by halationSharp: -0.85 (default) = near-field electron backscatter
      // (~1.30 src-px σ), -0.4 = phosphor-layer scatter (~1.90 src-px σ),
      // -2.5 = inter-scanline bleed (~0.76 src-px σ).
      // DR-7 P3-B: inputNode is the halation H-tap source. Single-pass: raw sceneOutput
      // (pre-kernel, full bandwidth); two-pass: horzRttNode (H-kernel RT, more accurate).
      // Outer taps sample pre-reconstruction — slightly overestimates halo width on fine
      // detail in single-pass. Full fix requires a post-kernel RTT (accepted trade-off).
      //
      // P0-A: accurateHalation — post-mask 'masked' as outer tap source, encoded to gamma
      // space to match scannedColor domain. Both center tap and outer taps then read the
      // same mask-modulated signal (dark inter-stripe gaps correctly attenuate the halo).
      // masked is linear light; encode to gamma before RTT.
      //
      // DR-9 P3-F: UV distortion chain — both kernel and halation receive the same glitchedPos:
      //   1. buildWarpNode(outputUV)                → barrel warp
      //   2. crtGlitchFallbackFn(warped).xy         → warp + glitch H-shift
      //   3. crtKernelFn / crtHalationFn → applyUVDistortions(glitchedPos, …)
      //                                   → warp + glitch + sag + rollbar + hook + swim
      // glitchedPos does NOT include swim; swim is applied inside applyUVDistortions.
      // Kernel and halation sample identical final UV positions — no double-distortion.
      let halationTex = inputNode;  // default: raw scene / kernelRT
      if (_accurateHalation) {
        // P0-A fix: outer taps must read post-mask signal to match center tap (scannedColor).
        // CRT halation / near-field scatter originates from phosphor emission, which is
        // attenuated by the aperture mask. Using pre-mask col makes inter-stripe dark gaps
        // contribute the same halo energy as lit stripes — physically wrong.
        // Using masked ensures all 7 H-taps read the same mask-modulated, post-kernel signal.
        _accurateHalationRtt = convertToTexture(
          maskedWithOSD.max(vec3(0.0)).pow(vec3(float(1.0).div(uniforms.kernelGamma)))
        );
        halationTex = _accurateHalationRtt;
      }
      const halo = crtHalationFn(
        halationTex,  // P1-A: post-kernel RTT when _accurateHalation; else raw scene / kernelRT
        maskedWithOSD, glitchedPos, outputSizeVec, uniforms.scrollPhase, uniforms.tWrapped,
        uniforms.swimAmt, uniforms.rollbarPhase, uniforms.sagPhase,
        uniforms.sourceSizeX, uniforms.sourceSizeY,
        uniforms.halationSharp,
        uniforms.hardScan,
        uniforms.kernelGamma,
        float(_accurateHalation ? 1.0 : 0.0),  // P1-A: accurateHalation flag
      );
      // halationWarm tint: 0 = neutral/achromatic (default — matches crt-royale, Guest Advanced,
      // crt-aperture, all of which apply no color tint to halation).
      // 1 = Trinitron neodymium glass (very slightly cool/purple): Nd³⁺ dopant selectively
      // absorbs yellow-green (~570–590 nm) and transmits red+blue, producing a faint cool bias.
      // Previous warm amber (0.18,0.12,0.08) was a film-emulsion mechanism (not applicable to
      // CRT glass) and is physically incorrect for CRT halation simulation.
      // DR-5 P2-D: Nd³⁺ absorbs yellow-green (~580 nm) and transmits red+blue → purple/cool R=B>G.
      // Previous warm (0.14,0.12,0.10) was amber/film-emulsion, not CRT Trinitron glass.
      const haloTint = mix(vec3(0.12, 0.12, 0.12), vec3(0.13, 0.10, 0.13), uniforms.halationWarm);
      // P1-A: Soft threshold: halo fades to zero for dark content.
      // Physically: near-field phosphor scatter is negligible below ~8% of nominal white.
      // haloLow=0.04, haloHigh=0.12 -- same order as the haloTint scaling (×0.12×3 = ×0.36).
      // smoothstep avoids the hard-cutoff artifact that triggered the removal of the previous
      // 0.35 threshold (SPEC-critical-review-fixes Issue 3 / P1-B).
      // halo.w (horizontal gradient) is reserved for future anisotropic 2D halo weighting.
      const haloLuma = halo.rgb.dot(vec3(0.2126, 0.7152, 0.0722));
      const haloGate = smoothstep(float(0.04), float(0.12), haloLuma);
      const halation = halo.rgb
        .mul(haloTint)
        .mul(uniforms.halationStr)
        .mul(haloGate);
      const withHalo = maskedWithOSD.add(halation);

      // 7. Corner mask (bezel/overscan fade) — applied to warped pos.
      // Pass outputSizeVec for aspect so the fade radius is always correct (canvas space).
      const corner     = buildCornerMaskNode(pos, outputSizeVec, uniforms.cornerFade);
      const withCorner = withHalo.mul(corner);

      // 8. Brightness boost (pre-gamma so it interacts naturally with the curve).
      // flickerBoost is auto-computed to compensate for phosphor decay mean darkening.
      const boosted = withCorner.mul(uniforms.brightBoost).mul(uniforms.flickerBoost);

      // 9. P22 phosphor primary shift — applied in linear light (physically correct:
      // the phosphors emit at their native chromaticities; the matrix models gamut shift
      // from sRGB/D65 to P22/D65 primaries in linear light).
      // NOTE: The Bradford (white point) and P22 (phosphor gamut) matrices are applied
      // sequentially with D65 as the implied connecting white point, and in different domains
      // (P22 pre-gamma linear, Bradford post-gamma). A single pre-composed sRGB/D65 -> P22/9300K
      // matrix would be exact and halve the per-pixel dot-product count, but requires fixed
      // blend factors (str = 1.0 for both). Variable p22Str and colorTempStr blend factors
      // prevent this optimisation at the API level. Perceptual error at canonical defaults
      // (p22Str=0.40, colorTempStr=0.65) is < 3% ΔE₂₀₀₀ for typical video content. (P3-B)
      // P1-D: Bradford has been moved to buildPostProcessing (post-gamma) to prevent blue
      // channel clipping. Only P22 remains here in linear light.
      // str=0 = sRGB identity; str=1 = full P22 gamut shift.
      const p22Adjusted = buildP22MatrixNode(boosted, uniforms.p22Str);

      // 9.6. Black level lift — phosphor dark emission floor (linear light, pre-gamma).
      // Physically: electrons emit a residual flux even when beam current is zero.
      // Adding in linear light before gamma gives the correct lift curve (linear
      // addition, not the compressive post-gamma lift). Default 0 = perfect black.
      const withBlackLevel = p22Adjusted.add(uniforms.blackLevel);

      // 9.7. Hum bar modulation — applied in linear light before gamma encode.
      // Physically: beam current varies with the mains cycle (capacitive coupling onto
      // the DC rail), which is a linear-light multiplicative brightness effect.
      // humBarNode is null when called without hum (e.g. device-loss rebuild path).
      const preGamma = humBarNode !== null
        ? withBlackLevel.mul(float(1.0).add(humBarNode.mul(uniforms.humAmt)))
        : withBlackLevel;

      // P1-C: Snow — additive IF-stage thermal noise added pre-gamma (linear light).
      // Physical CRT thermal noise (from the IF amplifier / video amp chain) is additive
      // in linear light. Adding post-gamma amplifies shadow noise 28× relative to highlights
      // (derivative of V^2.5 at V=0.05 vs V=0.9). Pre-gamma placement is physically correct.
      // Film grain is correctly post-gamma (it is a display/print artifact, not video signal noise).
      // DR-15 P0-B: snow at source pixel coordinates.
      // Real IF-stage thermal noise occurs at source (signal) resolution and is later
      // smeared by the electron beam spot. Using output pixel coords at 4.5× upscale
      // makes noise ~20× finer than source pixels -- too fine to be visible or physical.
      const snowSrcW = uniforms.sourceSizeX.greaterThan(0.5).select(uniforms.sourceSizeX, uniforms.outputSizeX);
      const snowSrcH = uniforms.sourceSizeY.greaterThan(0.5).select(uniforms.sourceSizeY, uniforms.outputSizeY);
      const snow     = snowFn(
        screenUV.mul(vec2(snowSrcW, snowSrcH)),
        uniforms.tWrapped,
        uniforms.snowAmt,
        uniforms.flickerRate
      );
      const withSnow = preGamma.add(snow);

      // 10. CRT gamma encode — uses kernelGamma uniform (default 2.5).
      // DR-9 P1-B: was hardcoded 1/2.5; now uses kernelGamma via buildGammaNode(col, gamma).
      // Grain and scratch are NOT added here — see buildPostProcessing.
      return buildGammaNode(withSnow, uniforms.kernelGamma);
    })();
  }

  // ── Bloom helpers (only constructed/called when bloomEnabled) ─────────────

  /**
   * Luminance threshold node — zeroes out pixels below the bloom threshold
   * using a smoothstep over a 0.1-wide band to avoid hard aliased edges.
   * @param {TSLNode} linearColNode  vec3 pre-decoded linear colour (caller provides baseSigLinear)
   * @param {TSLNode} thresholdNode  float threshold uniform
   * @returns {TSLNode} vec3 thresholded linear colour
   */
  function buildBloomThresholdNode(linearColNode, thresholdNode) {
    // DR-15 P1-C: accepts pre-decoded linear input (caller provides baseSigLinear).
    // Threshold based on linear luma; return linear values so Gaussian blur stays in linear.
    // Composite path adds linear bloom to linear baseSigLinear then re-encodes once at the end.
    return Fn(() => {
      const luma   = linearColNode.dot(vec3(0.2126, 0.7152, 0.0722));
      const weight = smoothstep(thresholdNode, thresholdNode.add(0.1), luma);
      return linearColNode.mul(weight);  // output LINEAR
    })();
  }

  /**
   * Fallback blur — returns the input node unchanged.
   * Used when GaussianBlurNode is not available and a proper two-pass separable
   * blur cannot be constructed inside a single TSL PostProcessing node without
   * an intermediate render target.
   * The unblurred thresholded contribution still produces an additive glow.
   */
  function buildFallbackBlur(inputNode) {
    if (!_fallbackBlurWarned) {
      _fallbackBlurWarned = true;
      console.warn(
        'telescreen-crt-webgpu: GaussianBlurNode not available — ' +
        'bloom uses unblurred threshold composite. ' +
        'Call loadBloomDependencies() before initTelescreenCRTWebGPU() for full Gaussian bloom.'
      );
    }
    return inputNode;
  }

  /**
   * Build the main PostProcessing pipeline.
   * Single-pass (srcW=0): scene pass → crtKernelFn → full pipeline.
   * Two-pass (srcW>0): horzPass embedded as RTTNode → crtVertPassFn → full pipeline.
   * RTTNode has its own QuadMesh — no singleton conflict with PostProcessing.
   */
  function buildPostProcessing(rdr, scn, cam, srcW = 0, srcH = 0, usePrevTex = false) {
    // DR-8 P2-D: build-time flag — must match the _lastGlassBlurActive check in renderFrame.
    const glassBlurActive = uniforms.glassBlurStr.value > 0.001;
    // P0-A: 2D isotropic halation — requires GaussianBlurNode (loaded via loadBloomDependencies()).
    const haloActive = uniforms.haloStr.value > 0.001 &&
                       uniforms.haloRadius.value > 0.1 &&
                       _GaussianBlurNode !== null;
    const pp = new THREE.RenderPipeline(rdr);

    // Scene pass — always created. In single-pass, sceneOutput feeds crtKernelFn
    // directly. In two-pass, sceneOutput feeds crtHorzPassFn inside the RTTNode.
    // PassNode fires once per frame (FRAME priority) at canvas resolution
    // regardless of any active render target — renderer.getSize() is unaffected
    // by setRenderTarget(). Having a single pass() avoids duplicate scene renders.
    const scenePass   = pass(scn, cam);
    const sceneOutput = scenePass.getTextureNode('output');
    if (!sceneOutput) {
      throw new Error(
        'telescreen-crt-webgpu: scenePass.getTextureNode("output") returned null. ' +
        'Check Three.js version (r183+ required).'
      );
    }

    // DR-14 P1-B: Pre-kernel ghost mixing — ghost must traverse the same scanline
    // reconstruction as the direct signal (physically correct: multipath reflected
    // signal arrives at the electron gun before display). ghostStr=0 at build time
    // → no RTT, no cost. Crossing the 0.001 threshold triggers buildPostProcessing
    // rebuild (tracked via _lastGhostActive).
    const ghostActive = uniforms.ghostStr.value > 0.001;
    let ghostedScene = sceneOutput;
    if (ghostActive) {
      const ghostSample  = ghostFn(
        sceneOutput,
        screenUV,
        uniforms.ghostOffset.div(uniforms.outputSizeX.max(float(1.0)))
      );
      const ghostTint    = vec3(uniforms.ghostTintR, uniforms.ghostTintG, uniforms.ghostTintB);
      const ghostMixedRgb = sceneOutput.rgb
        .add(ghostSample.mul(ghostTint).mul(uniforms.ghostStr))
        .max(vec3(0));
      _ghostRttNode  = rtt(vec4(ghostMixedRgb, 1.0),
                            renderer.domElement.width, renderer.domElement.height);
      ghostedScene   = _ghostRttNode;
    }

    // Pre-kernel dot crawl — NTSC subcarrier aliasing at luma/chroma spatial transitions.
    // Placed here (before the kernel) so the crawl pattern receives the same scanline
    // reconstruction and beam broadening as the rest of the image (physically correct).
    // In post-kernel placement the YIQ chroma terms are gamma-amplified in shadows (~5×).
    // Always use ghostedScene as the left-neighbour source — horzRttNode is built below.
    // dotCrawlAmt=0 → dotCrawlFn early-exits, but we skip the RTT entirely via the flag.
    const dotCrawlActive = uniforms.dotCrawlAmt.value > 0.001;
    let kernelInputScene = ghostedScene;
    if (dotCrawlActive) {
      const withDotCrawl = dotCrawlFn(
        ghostedScene.rgb, screenUV,
        vec2(uniforms.outputSizeX, uniforms.outputSizeY),
        uniforms.sourceSizeX, uniforms.sourceSizeY,
        uniforms.flickerRate, uniforms.tWrapped,
        uniforms.dotCrawlAmt,
        ghostedScene   // left-neighbour source (pre-kernel; horzRttNode not yet available)
      );
      _dotCrawlRttNode = rtt(vec4(withDotCrawl, 1.0),
                              renderer.domElement.width, renderer.domElement.height);
      kernelInputScene = _dotCrawlRttNode;
    }

    const useTwoPass = srcW > 0 && srcH > 0;
    let inputNode;
    let horzRttNode = null;

    if (useTwoPass) {
      // Horizontal kernel at source resolution via RTTNode.
      // RTTNode has its own QuadMesh — no singleton conflict with PostProcessing.
      // Inside the RTT's updateBefore(), renderer.setRenderTarget(rtt.renderTarget)
      // makes screenSize = srcW × srcH. The sceneOutput texture retains its full
      // canvas-resolution dimensions (textureDimensions reports the actual texture
      // size, not the active viewport). Fetch() maps UV → texels correctly.
      const horzResult = crtHorzPassFn(
        kernelInputScene, screenUV, screenSize,
        uniforms.hardPix, uniforms.tWrapped,
        uniforms.convergence, uniforms.convStaticX, uniforms.convStaticY,
        uniforms.convBX, uniforms.convBY, uniforms.convAspect,
        uniforms.kernelGamma, uniforms.swimAmt, uniforms.rollbarPhase,
        uniforms.sagPhase, uniforms.defocusAmt, uniforms.defocusAniso, uniforms.apertureW,
        uniforms.outputSizeY,
      );
      horzRttNode = rtt(vec4(horzResult, 1.0), srcW, srcH);
      inputNode   = horzRttNode;
    } else {
      inputNode = kernelInputScene;
    }

    // Post-processing composite order (physical signal chain):
    //   1. CRT base  — full pipeline including snow (pre-gamma, P1-C), up to gamma
    //   1b. Bradford — color temperature (post-gamma, P1-D): applied here to prevent blue clipping
    //   2. Bloom     — phosphor scatter (operates on gamma-encoded CRT+snow signal)
    //   3. Scratch   — glass surface overlay; after phosphor, not bloomed
    //   4. Grain     — aesthetic texture; additive at the very end
    // Snow is added pre-gamma inside buildCRTEffect (P1-C; linear light = physically correct).
    // Bradford 9300K is applied here post-gamma (P1-D) so blue values are already <=1.
    // Hum bar — computed before buildCRTEffect so it can be applied pre-gamma (linear light).
    // DR-9 P1-C: physical model corrected to capacitive coupling onto the DC bias rail.
    // Mechanism: mains-frequency (~50/60 Hz) interference on the CRT's electron-gun bias supply
    // sinusoidally modulates beam current across ALL rows — not a narrow bright spike.
    // (A narrow spike is inductive coupling onto the video signal — a distinct failure mode.)
    // Full-wave rectified sinusoidal modulation: humBar ∈ [0, +1] (DR-15 P1-E);
    // applied as col × (1 + humBar × humAmt). humAmt > 0 = bright bands (capacitive),
    // humAmt < 0 = dark bands (inductive). Default: humAmt=0.022 = ±2.2% brightening.
    // DR-14 P3-C: fract() ensures the pattern always tiles at the screen boundary
    // regardless of humBars value, eliminating the seam at non-integer bar counts.
    const barPhase = screenUV.y.add(uniforms.humPhase).mul(uniforms.humBars).fract();
    // DR-15 P1-E: abs(sin) = full-wave rectification. Real capacitive coupling onto the
    // DC rail adds to beam current (always brightens); sin() alone produced dark bands
    // on the negative half-cycle, which is only correct for inductive coupling (a different
    // failure mode). Use abs() so waveform never dips below signal level.
    // Direction (brighten vs darken) is controlled by the sign of humAmt uniform.
    const humBar   = barPhase.mul(6.28318).sin().abs();

    const crtBase     = buildCRTEffect(inputNode, useTwoPass, humBar);

    // P0-A Gap B: 2D isotropic halation — GaussianBlurNode on post-gamma crtBase.
    // Physical mechanism: total-internal-reflection scatter inside the CRT glass faceplate
    // produces an approximately isotropic glow around bright phosphor centres.
    // Threshold 0.35 (gamma space ≈ 0.073 linear at γ=2.5, i.e. upper ~65% of gamma range).
    // Clips deep shadows to keep the Gaussian pass GPU-efficient; all visually significant
    // phosphor centres contribute. Not configurable — 2D halo is purely additive and never
    // brightens below-threshold areas, so hard-coding 0.35 is safe. Tinted by halationWarm
    // so 1D and 2D halos match. Operates at BLOOM_RES_SCALE (0.5×) for performance.
    // haloActive is evaluated at build time — crossing the 0.001/0.1 thresholds triggers rebuild.
    // Blur resolution scale — shared by halo, bloom, and glass scatter (DR-8 P2-B + P2-D).
    // r180+ fixes the WebGPU CopyTextureToBuffer buffer-size calculation (PR #31765).
    const BLOOM_RES_SCALE = 0.5;

    let crtWithHalo = crtBase;
    if (haloActive) {
      const haloThresh = crtBase.sub(0.35).max(vec3(0.0));
      const haloRtt    = convertToTexture(haloThresh);
      const haloBlur   = new _GaussianBlurNode(haloRtt, uniforms.haloRadius, 2);
      haloBlur.resolutionScale = BLOOM_RES_SCALE;
      _haloBlurNodes.push(haloBlur);
      _haloRttNodes.push(haloRtt);
      const NEUTRAL_TINT = vec3(0.12, 0.12, 0.12);
      const WARM_TINT    = vec3(0.13, 0.10, 0.13);  // Nd³⁺ glass: R=B>G (purple/cool), matches 1D tint
      const tint = mix(NEUTRAL_TINT, WARM_TINT, uniforms.halationWarm);
      crtWithHalo = crtBase.add(nodeObject(haloBlur).rgb.mul(tint).mul(uniforms.haloStr));
    }

    // P1-D: Bradford D65→9300K applied post-gamma (display space) to reduce blue clipping for
    // mid-tones. See buildColorTempNode comment in crt-tsl.js for full clipping analysis.
    const tempAdjusted = buildColorTempNode(crtWithHalo, uniforms.colorTempStr);

    const grain       = grainFn(screenUV.mul(screenSize), uniforms.tWrapped, uniforms.grainAmt);
    const scratchLuma = scratchTexNode.rgb.dot(vec3(0.2126, 0.7152, 0.0722));  // BT.709 (consistent with pipeline)

    // P1-C: AGC hunting — multiply by CPU-driven gain oscillator (uniform updated in renderFrame).
    // agcGain=1.0 when disabled (cfg.agcAmt=0) — no-op.
    const withAGC = tempAdjusted.mul(uniforms.agcGain);

    // P2-C: VBI bleed — coloured noise in the top N scan lines (vertical blanking interval).
    // vbiFn returns vec3(0) for rows below vbiLines; select() composites over withAGC.
    // vbiStr=0 → vbiFn returns black → select() result == withAGC (no visible effect).
    // Dot crawl is now applied pre-kernel (see kernelInputScene above) so withAGC is used directly.
    const outputSizeVecPP = vec2(uniforms.outputSizeX, uniforms.outputSizeY);
    // vbiFn uses source-pixel Y so VBI covers the correct source lines in two-pass mode.
    // Pass sourceSizeY (0 in single-pass → vbiFn falls back to res.y).
    const vbiColor = vbiFn(screenUV, outputSizeVecPP, uniforms.sourceSizeY, uniforms.frameCount, uniforms.vbiStr, uniforms.vbiLines);
    // isVBI: compare source UV fraction so the TSL guard matches vbiFn's internal check.
    const effectiveSrcH = uniforms.sourceSizeY.greaterThan(0.5)
      .select(uniforms.sourceSizeY, uniforms.outputSizeY);
    const isVBI    = screenUV.y.lessThan(uniforms.vbiLines.div(effectiveSrcH.max(float(1.0))));
    const baseSig  = isVBI.select(vbiColor, withAGC);

    // DR-15 P1-C / DR-16: bloom and glass scatter both operate in linear light.
    // baseSig is gamma-encoded; decode once when at least one linear-domain operation is active.
    // When neither is active, baseSig is forwarded directly as finalComposite with no round-trip
    // (decode then re-encode = identity but adds two needless pow(vec3) calls per pixel).
    const needsLinearComposite = bloomEnabled || glassBlurActive;
    let finalComposite;
    if (needsLinearComposite) {
      // Decode once — shared by both bloom threshold and glass scatter.
      const baseSigLinear = pow(max(baseSig, vec3(0.0)), vec3(uniforms.kernelGamma));

      // linearComposite starts at baseSigLinear; additive effects accumulate here in linear space.
      // A single gamma encode at the end converts back to display space.
      let linearComposite;
      if (bloomEnabled) {
        // 2. Dual-scale bloom: tight beam-spot core + wide phosphor scatter halo.
        // Both blurs and the composite operate entirely in linear light (DR-15 P1-C).
        // buildBloomThresholdNode accepts pre-decoded linear input (baseSigLinear).
        const threshold = buildBloomThresholdNode(baseSigLinear, bloomUniforms.bloomThreshold);
        if (_GaussianBlurNode) {
          // DR-14 P2-B: single threshold RTT shared by both blur nodes.
          const threshRtt       = convertToTexture(threshold);
          const coreBlurNode    = new _GaussianBlurNode(threshRtt, bloomUniforms.bloomCoreRadius, 2);
          const scatterBlurNode = new _GaussianBlurNode(threshRtt, bloomUniforms.bloomRadius, 2);
          coreBlurNode.resolutionScale = BLOOM_RES_SCALE;
          scatterBlurNode.resolutionScale = BLOOM_RES_SCALE;
          _bloomBlurNodes = [coreBlurNode, scatterBlurNode];
          _bloomRttNodes  = [threshRtt];

          const coreBlur    = nodeObject(coreBlurNode);
          const scatterBlur = nodeObject(scatterBlurNode);

          // Add linear bloom to linear baseSig (no gamma distortion of the spread).
          linearComposite = baseSigLinear
            .add(coreBlur.rgb.mul(bloomUniforms.bloomCoreStrength))
            .add(scatterBlur.rgb.mul(bloomUniforms.bloomStrength));
        } else {
          // Fallback: single unblurred contribution (no Gaussian available)
          const unblurred = buildFallbackBlur(threshold);
          linearComposite = baseSigLinear.add(unblurred.rgb.mul(bloomUniforms.bloomStrength));
        }
        // Glass scatter (DR-8 P2-D) is handled below, independent of bloom.
      } else {
        linearComposite = baseSigLinear;
      }

      // Glass-bulk faceplate scatter (DR-8 P2-D): wide low-level glow around all emissive areas.
      // Physical mechanism: Mie/Rayleigh scattering through the CRT glass bulk produces halos
      // 5–30+ source px wide (σ ≈ 3–15 px) — distinct from halationStr (phosphor-layer, ≤ 1.3 px).
      // Independent of bloom: disabling bloom does not disable glass scatter.
      // Build-time guard: glassBlurActive (= glassBlurStr > 0.001) is evaluated in renderFrame
      // before each buildPostProcessing call. Node wiring only changes when the flag toggles.
      // Uses baseSigLinear (linear) so scatter spreads in the correct photon-flux domain.
      if (glassBlurActive) {
        // Glass-bulk faceplate scatter — 3×3 Gaussian grid on a full-res RTT.
        //
        // Kernel: [1,2,1; 2,4,2; 1,2,1]/16 — centre weight 25%, edges 12.5%, corners 6.25%.
        // No equal-distance ring (avoids the 8 identical discrete ghost copies of a uniform
        // disk). Y radius is aspect-corrected so the spread is circular in pixel space.
        //
        // glassBlurRadius ≤ 0.004 UV (2–8 output pixels at 1080p) — kept deliberately small
        // so discrete tap spacing stays below the perceptual ghost threshold at any str value.
        // Physical reference: CRT-Royale diffusion_weight=0.075, σ≈3–15 output px.
        //
        // Full-res RTT is required. A reduced-resolution rtt() would change the TSL
        // screenSize built-in to (W/k, H/k), making pixelCoord = screenUV.mul(screenSize)
        // wrong inside the CRT kernel (all pixel-coordinate-based CRT effects computed at
        // wrong scale) → phantom colours and coverage artifacts. screenSize only matches
        // uniforms.outputSizeX/Y at full canvas dimensions.
        const glassRtt = rtt(baseSigLinear, rdr.domElement.width, rdr.domElement.height);

        const rx = uniforms.glassBlurRadius;
        const ry = rx.mul(uniforms.outputSizeX).div(uniforms.outputSizeY);
        const scattered =
          texture(glassRtt, screenUV.add(vec2(rx.negate(), ry.negate()))).mul(1.0 / 16)
          .add(texture(glassRtt, screenUV.add(vec2(float(0),   ry.negate()))).mul(2.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(rx,         ry.negate()))).mul(1.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(rx.negate(), float(0)))).mul(2.0 / 16))
          .add(texture(glassRtt, screenUV).mul(4.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(rx,          float(0)))).mul(2.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(rx.negate(), ry))).mul(1.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(float(0),    ry))).mul(2.0 / 16))
          .add(texture(glassRtt, screenUV.add(vec2(rx,          ry))).mul(1.0 / 16));

        _glassBlurRttNodes.push(glassRtt);
        linearComposite = linearComposite.add(scattered.rgb.mul(uniforms.glassBlurStr));
      }

      // Single gamma encode after all linear-light compositing is complete.
      finalComposite = pow(max(linearComposite, vec3(0.0)), vec3(float(1.0).div(uniforms.kernelGamma)));
    } else {
      // Fast path: bloom and glass scatter both inactive — no linear round-trip needed.
      finalComposite = baseSig;
    }

    {
      // 4. Scratch — glass surface, after bloom and glass scatter
      const withScratch = buildScratchNode(finalComposite, vec3(scratchLuma), uniforms.scratchStr);
      // 5. Grain — post-bloom, post-scratch (blackLevel applied pre-gamma in buildCRTEffect)
      finalComposite = withScratch.add(grain);
    }

    // Phosphor persistence: blend current frame with previous frame in linear light.
    // DR-7 P2-A: bypass the gamma round-trip and rtt() entirely when persistence/interlace
    // are inactive at build time. Two pow(vec3) calls + rtt() = ~2% GPU cost per frame even
    // when persistence=0 — the GPU does not simplify mix(a,b,0)=a algebraically.
    // usePrevTex is determined by _computeNeedsPrevTex() before each buildPostProcessing call.
    if (usePrevTex) {
      // Physical decay: L(t) = L₀·exp(−t/τ) is linear-light. Blending in display (gamma)
      // space distorts the decay — dark areas decay slower relative to photon flux.
      // Decode both frames to linear, blend, then re-encode.
      // rtt() renders blended result to its own texture each frame; renderFrame copies to
      // prevRT after each render so the next frame reads the accumulated result.
      // max(…, 0) guards against negative values before the pow() decode.
      // finalComposite can go slightly negative on low-G channels (e.g. magenta bar)
      // because grain is added additively post-gamma and can underflow 0.
      // pow(negative, 2.5) = NaN in WGSL → black pixels that persist in prevRT.
      // prevTexNode can also contain NaN/negative from a previously poisoned frame.
      const currLinear    = max(finalComposite,   vec3(0.0)).pow(vec3(uniforms.kernelGamma));
      const prevLinear    = max(prevTexNode.rgb,   vec3(0.0)).pow(vec3(uniforms.kernelGamma));
      const blendedLinear = mix(currLinear, prevLinear, uniforms.persistence);
      const blended       = max(blendedLinear, vec3(0.0)).pow(vec3(float(1.0).div(uniforms.kernelGamma)));
      const rttBlend = rtt(blended);
      pp.outputNode  = vec4(rttBlend.rgb, 1.0);
      pp._rttBlend   = rttBlend;  // exposed for renderFrame → copyTextureToTexture
    } else {
      // No persistence / interlace decay active — output directly without gamma round-trip.
      pp.outputNode  = vec4(finalComposite, 1.0);
      pp._rttBlend   = null;
    }
    pp._horzRttNode = horzRttNode;  // null = single-pass, non-null = two-pass (mode detection)

    return pp;
  }

  // ── Phosphor persistence helpers ─────────────────────────────────────────

  /**
   * DR-7 P2-A: Determine at build time whether the pipeline needs prevTexNode
   * (persistence gamma round-trip + rtt). Returns true when any of these are active:
   *   - persistence uniform > 0 (direct blending)
   *   - persistenceTau > 0 (frame-rate-independent decay, overwrites persistence each frame)
   *   - interlace > 0.5 (off-field rows read prevTexNode for field-rate persistence fill)
   * Checked in renderFrame before every buildPostProcessing call; a change triggers rebuild.
   */
  function _computeNeedsPrevTex() {
    return (
      uniforms.persistence.value > 0.001 ||
      _persistenceTau > 0 ||
      uniforms.interlace.value > 0.5  // off-field rows always need prevTexNode
    );
  }

  /**
   * Create or resize the HalfFloat render target used for phosphor persistence.
   * Called lazily on first use and again on canvas resize.
   * prevTexNode.value is hot-swapped in-place so the node graph (built in
   * buildPostProcessing) always references the current prevRT.texture without
   * requiring a graph rebuild.
   */
  function ensurePersistenceTargets() {
    const w = renderer.domElement.width;
    const h = renderer.domElement.height;
    if (prevRT && _persistW === w && _persistH === h) return;

    if (prevRT) { try { prevRT.dispose(); } catch (_) {} }
    prevRT    = new THREE.RenderTarget(w, h, { type: THREE.HalfFloatType });
    _persistW = w;
    _persistH = h;

    // Hot-swap the underlying texture — the rtt blend graph in buildPostProcessing
    // holds a reference to prevTexNode and will see the new texture automatically.
    prevTexNode.value = prevRT.texture;
  }

  /**
   * Dispose the current PostProcessing graph and all associated GPU resources.
   * Safe to call when postProcessing is null (no-op).
   * After return: postProcessing = null, bloom refs cleared, prevRT disposed.
   */
  function disposeCurrentPP() {
    if (!postProcessing) return;
    // Dispose the PostProcessing's internal node graph (PassNode's auto-sized RT,
    // any compiled materials, etc.). Without this, pass(scene, camera) leaks a
    // full-canvas-resolution RenderTarget (~16 MB at 1920×1080 RGBA16F) per rebuild.
    if (typeof postProcessing.dispose === 'function') {
      try { postProcessing.dispose(); } catch (_) {}
    }
    // Dispose RTT render targets (GPU textures don't GC — need explicit dispose).
    // PostProcessing.dispose() may not reach RTTNode internals, so dispose explicitly.
    if (postProcessing._rttBlend?.renderTarget) {
      try { postProcessing._rttBlend.renderTarget.dispose(); } catch (_) {}
    }
    if (postProcessing._horzRttNode?.renderTarget) {
      try { postProcessing._horzRttNode.renderTarget.dispose(); } catch (_) {}
    }
    // Bloom RTT nodes
    for (const n of _bloomBlurNodes) { try { n.dispose(); } catch (_) {} }
    _bloomBlurNodes = [];
    for (const n of _bloomRttNodes) { try { n.renderTarget?.dispose(); } catch (_) {} }
    _bloomRttNodes = [];
    // Glass scatter RTT nodes
    for (const n of _glassBlurNodes) { try { n.dispose(); } catch (_) {} }
    _glassBlurNodes = [];
    for (const n of _glassBlurRttNodes) { try { n.renderTarget?.dispose(); } catch (_) {} }
    _glassBlurRttNodes = [];
    // P0-A: 2D isotropic halation RTT nodes
    for (const n of _haloBlurNodes) { try { n.dispose(); } catch (_) {} }
    _haloBlurNodes = [];
    for (const n of _haloRttNodes) { try { n.renderTarget?.dispose(); } catch (_) {} }
    _haloRttNodes = [];
    // P1-A: accurate halation post-kernel RTT
    if (_accurateHalationRtt?.renderTarget) {
      try { _accurateHalationRtt.renderTarget.dispose(); } catch (_) {}
      _accurateHalationRtt = null;
    }
    // Ghost pre-kernel RTT (DR-14 P1-B)
    if (_ghostRttNode?.renderTarget) {
      try { _ghostRttNode.renderTarget.dispose(); } catch (_) {}
      _ghostRttNode = null;
    }
    // Dot crawl pre-kernel RTT (DR-19 P0-A)
    if (_dotCrawlRttNode?.renderTarget) {
      try { _dotCrawlRttNode.renderTarget.dispose(); } catch (_) {}
      _dotCrawlRttNode = null;
    }
    // Mask LUT RTT node
    if (_maskLutRttNode?.renderTarget) {
      try { _maskLutRttNode.renderTarget.dispose(); } catch (_) {}
      _maskLutRttNode = null;
    }
    // DR-14 P1-A: reset dirty flag so new LUT always renders at least once after rebuild.
    _maskLutNeedsRender = true;
    // DR-14 P2-A: trigger readback on next render after rebuild.
    _maskLutNeedsBoostReadback = true;
    // Persistence RT
    if (prevRT) { try { prevRT.dispose(); } catch (_) {} prevRT = null; }
    if (prevTexNode) prevTexNode.value = _dummyPrevRT.texture;
    _persistW = 0; _persistH = 0;
    postProcessing = null;
    _rebuildPending = false;  // cancel any pending deferred build
    _rebuildArgs    = null;
  }

  // ── Device loss handling ──────────────────────────────────────────────────
  function registerDeviceLostHandler(rdr) {
    try {
      rdr.backend.device.lost.then((info) => {
        if (destroyed) return;
        console.warn(
          `telescreen-crt-webgpu: WebGPU device lost (reason: ${info.reason}) — ${info.message}`
        );
        handleDeviceLost(rdr);
      });
    } catch (e) {
      // backend.device may not be accessible before first render; non-fatal
    }
  }

  async function handleDeviceLost(oldRenderer) {
    if (destroyed) return;
    deviceLost = true;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }

    try {
      oldRenderer.dispose();
    } catch (_) {}

    const canvas = oldRenderer.domElement;
    const newRenderer = new THREE.WebGPURenderer({ canvas, antialias: _antialiasFlag });
    try {
      await newRenderer.init();
    } catch (e) {
      console.error('telescreen-crt-webgpu: failed to reinitialise renderer after device loss', e);
      return;
    }

    // Rebuild everything on the new renderer — reset to lazy-init state so
    // the next renderFrame builds whichever pipeline is needed (single/two-pass).
    renderer       = newRenderer;
    postProcessing = null;  // rebuilt lazily on next renderFrame
    _lastSrcW = 0; _lastSrcH = 0;
    _lastUsePrevTex = false;      // DR-7 P2-A: force rebuild with correct usePrevTex after recovery
    _lastGlassBlurActive = false; // DR-8 P2-D: force rebuild with correct glassBlur state
    _lastHaloActive = false;      // P0-A: force rebuild with correct halo state
    _lastCanvasW = 0; _lastCanvasH = 0;
    firstRenderDone = false;

    // Re-bind the current scratch texture on the new graph (node object is reused)
    scratchTexNode.value = scratchTexture;

    // Reset persistence state: the old prevRT's GPU resources are invalidated by
    // device loss. Dispose it and reset prevTexNode to the dummy placeholder so
    // ensurePersistenceTargets() will recreate prevRT on next use.
    if (prevRT) { try { prevRT.dispose(); } catch (_) {} prevRT = null; _persistW = 0; _persistH = 0; }
    if (prevTexNode) prevTexNode.value = _dummyPrevRT.texture;

    deviceLost = false;
    registerDeviceLostHandler(renderer);

    if (autoRender) {
      startTime = null;
      rafId = requestAnimationFrame(internalLoop);
    }
  }

  registerDeviceLostHandler(renderer);

  // ── Rollbar scroll phase driver ───────────────────────────────────────────
  // Synchronises the GPU rollbarPhase uniform with the CSS ts-rollbar animation.
  // Timing: period=113s, CSS animation-delay=-43s (animation 43s ahead at JS t=0).
  // The sweep (0.45%→1.85% of cycle) is when the image scrolls; rollbarPhase 0→1
  // maps content UV vertically to match the retrace position.
  function updateRollbarPhase(t) {
    if (!cfg.rollbarScrollEnabled || prefersReduced.matches) { uniforms.rollbarPhase.value = 0; return; }
    const PERIOD      = 113.0;
    const DELAY       = 43.0;
    const cyclePos    = (t + DELAY) % PERIOD;   // seconds into current CSS cycle
    const SWEEP_START = PERIOD * 0.0045;         // 0.5085 s
    const SWEEP_END   = PERIOD * 0.0185;         // 2.0905 s
    if (cyclePos >= SWEEP_START && cyclePos <= SWEEP_END) {
      uniforms.rollbarPhase.value = (cyclePos - SWEEP_START) / (SWEEP_END - SWEEP_START);
    } else {
      uniforms.rollbarPhase.value = 0.0;
    }
  }

  // ── Voltage sag geometry phase driver ────────────────────────────────────
  // Synchronises GPU sagPhase with CSS ts-sag animation.
  // Timing: period=88s, CSS animation-delay=-17s.
  // sagPhase follows a sine-bell curve (0→1→0) over the 3.344s sag event,
  // approximating the double-peak opacity in the keyframes.
  function updateSagPhase(t) {
    if (!cfg.sagGeomEnabled || prefersReduced.matches) { uniforms.sagPhase.value = 0; return; }
    const PERIOD      = 88.0;
    const DELAY       = 17.0;
    const cyclePos    = (t + DELAY) % PERIOD;    // seconds into current CSS cycle
    const SAG_END     = PERIOD * 0.038;           // 3.344 s
    if (cyclePos < SAG_END) {
      uniforms.sagPhase.value = Math.sin((cyclePos / SAG_END) * Math.PI);
    } else {
      uniforms.sagPhase.value = 0.0;
    }
  }

  // ── Glitch burst scheduler ────────────────────────────────────────────────
  function updateGlitchScheduler(t) {
    if (cfg.glitchEnabled && !prefersReduced.matches) {
      if (t >= glitchEndTime) {
        uniforms.glitchActive.value = 0;
        if (t >= glitchNextFire) {
          const dur          = 0.08 + Math.random() * cfg.burst;
          glitchEndTime      = t + dur;
          glitchNextFire     = t + dur + 0.3 + Math.random() * cfg.delay;
          uniforms.glitchActive.value = 1;
        }
      } else {
        uniforms.glitchActive.value = 1;
      }
    } else {
      uniforms.glitchActive.value = 0;
    }
  }

  // ── Render frame (shared by internal loop and external callers) ───────────
  async function renderFrame(ts) {
    if (destroyed || deviceLost || _renderInFlight) return;
    _renderInFlight = true;
    if (startTime === null) startTime = ts;
    const t = (ts - startTime) / 1000;

    // Copy the current video frame into the proxy canvas so CanvasTexture stays live.
    // Guard on currentTime change to avoid redundant drawImage on paused or slow video.
    if (_videoCanvas && _videoCtx && currentVideoEl &&
        currentVideoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      const vt = currentVideoEl.currentTime;
      if (vt !== _lastVideoTime) {
        _lastVideoTime = vt;
        const vw = currentVideoEl.videoWidth;
        const vh = currentVideoEl.videoHeight;
        if (vw > 0 && vh > 0) {
          if (_videoCanvas.width !== vw || _videoCanvas.height !== vh) {
            _videoCanvas.width  = vw;
            _videoCanvas.height = vh;
          }
          _videoCtx.drawImage(currentVideoEl, 0, 0, vw, vh);
          if (videoTexture) videoTexture.needsUpdate = true;
        }
      }
    }

    // Compute per-frame delta time. lastTs is null only on the very first call;
    // a fallback of 1/60 s is used once (produces steady-state 60 Hz blend value).
    const dt = lastTs !== null ? (ts - lastTs) / 1000 : 1.0 / 60.0;
    lastTs = ts;

    // Auto-compute frame-rate-correct persistence blend when persistenceTau is set.
    // exp(-dt / τ) approaches 1.0 at very long τ; clamped at 0.99 to guarantee
    // the IIR always converges and avoids fp precision loss when (1−blend) → 0.
    if (_persistenceTau > 0) {
      uniforms.persistence.value = Math.min(0.99, Math.exp(-dt / _persistenceTau));
    }

    // Wrap to 3600s — prevents f32 precision loss in noise/scroll for long sessions.
    // Period 3600s chosen so grain fract(tWrapped × 73) = fract(262800) = 0 exactly:
    // 3600 × 73 = 262800 is exactly representable in f32 (IEEE 754: 0x40402D00).
    uniforms.tWrapped.value = t % 3600.0;

    updateGlitchScheduler(t);
    updateRollbarPhase(t);
    updateSagPhase(t);

    // P0-B: Hum bar phase driver — scrolls at cfg.humRate cycles/second.
    // humPhase wraps 0..1 (one full vertical traversal = one mains beat cycle).
    // Frozen at 0 when reduced motion is preferred (no animated brightness drift).
    // P1-C: AGC hunting oscillator — beat of two incommensurable frequencies for
    // non-repeating irregular pulsation. Disabled when cfg.agcAmt = 0.
    if (!prefersReduced.matches) {
      uniforms.humPhase.value = (t * (cfg.humRate ?? 0.06)) % 1.0;
      if (cfg.agcAmt > 0) {
        const agcPhase = t * (cfg.agcRate ?? 1.2);
        // Golden ratio: φ = 1.618... ensures the two frequencies are incommensurable.
        const agcVal = Math.sin(agcPhase) * 0.6 + Math.sin(agcPhase * 1.618) * 0.4;
        uniforms.agcGain.value = 1.0 + agcVal * cfg.agcAmt;
      } else {
        uniforms.agcGain.value = 1.0;
      }
    } else {
      uniforms.humPhase.value = 0.0;
      uniforms.agcGain.value  = 1.0;
    }
    // P2-C: VBI frame counter — incremented each frame, mod 1e7 to prevent f32 precision loss.
    uniforms.frameCount.value = (uniforms.frameCount.value + 1.0) % 1e7;

    // Gap C — interlace field parity: toggle 0↔1 each frame when interlace active.
    // Driven by the CPU rather than floor(t * flickerRate) % 2 to avoid frame-rate
    // aliasing (the floor() transitions are tied to wall-clock time, not display frames).
    if (uniforms.interlace.value > 0.5) {
      uniforms.interlaceField.value = 1.0 - uniforms.interlaceField.value;
    }
    // Update JS-side interlace decay scalar for early-exit guards in _computeNeedsPrevTex.
    // decayFactor = exp(-1/(flickerRate * flickerTau)) — same formula as WGSL crtKernel.
    _cpuState.interlaceDecay = Math.exp(-1.0 / (uniforms.flickerRate.value * _cpuState.flickerTau));

    // Determine whether to use the two-pass kernel path.
    // When sourceSizeX is explicitly set (> 0.5), use it directly.
    // Otherwise, when autoTwoPass is enabled, infer a virtual source size from
    // the output width using a quality-tiered table (computeAutoSourceWidth).
    // Two-pass activates only when the effective source is < 80% of output width.
    const outW = renderer.domElement.width;
    const outH = renderer.domElement.height;
    // Keep outputSizeX/Y in sync with the actual canvas every frame.
    // These uniforms are used in buildCRTEffect instead of screenSize to guarantee
    // warp, corner mask, and scanline UV are always computed in canvas space.
    uniforms.outputSizeX.value = outW;
    uniforms.outputSizeY.value = outH;
    // Compute scroll phase: (t * scrollRate) % srcY — wraps at source-grid period.
    // tWrapped-based t * scrollRate jumps by scrollRate * 3600 at the 3600-s boundary.
    // JS-side computation uses the full elapsed t, so the phase is continuous.
    {
      const _srcY = (uniforms.sourceSizeY.value > 0.5)
        ? uniforms.sourceSizeY.value
        : outH;
      uniforms.scrollPhase.value = (t * uniforms.scrollRate.value) % Math.max(_srcY, 1);
    }
    // _userSetSourceSize distinguishes user-explicit sourceSizeX (via setShader)
    // from auto-set values (via autoTwoPass). Without this, auto-set sourceSizeX
    // (e.g. 640) makes explicitSrc=true on the NEXT frame, preventing reset when
    // the window shrinks back to single-pass — sourceSizeX stays stuck at 640.
    const explicitSrc = _userSetSourceSize && uniforms.sourceSizeX.value > 0.5;
    const autoSrc     = autoTwoPass ? computeAutoSourceWidth(outW) : 0;
    const effectiveSrc = explicitSrc ? uniforms.sourceSizeX.value : autoSrc;

    // Derive effective source height proportionally when using auto source width.
    const effectiveSrcH = explicitSrc
      ? (uniforms.sourceSizeY.value > 0.5 ? uniforms.sourceSizeY.value : outH)
      : (effectiveSrc > 0.5 ? Math.round(effectiveSrc * outH / outW) : outH);

    const needsTwoPass = effectiveSrc > 0.5 && effectiveSrc < outW * 0.8;

    // Mode transition: single-pass ↔ two-pass, source dimensions changed,
    // or persistence/interlace active state changed (DR-7 P2-A).
    // RTTNode inside PostProcessing is fixed-size — rebuild when any of these change.
    // curTwoPass: null?._horzRttNode is undefined, undefined != null is true... use !! to coerce.
    const curTwoPass = !!(postProcessing?._horzRttNode);
    const srcChanged = needsTwoPass && curTwoPass &&
      (Math.round(effectiveSrc) !== _lastSrcW || Math.round(effectiveSrcH) !== _lastSrcH);
    const usePrevTex = _computeNeedsPrevTex();  // DR-7 P2-A: build-time decision
    const glassBlurActive = uniforms.glassBlurStr.value > 0.001; // DR-8 P2-D
    const ghostActive = uniforms.ghostStr.value > 0.001;          // DR-14 P1-B
    const haloActive = uniforms.haloStr.value > 0.001 &&           // P0-A
                       uniforms.haloRadius.value > 0.1 &&
                       _GaussianBlurNode !== null;
    const dotCrawlActive = uniforms.dotCrawlAmt.value > 0.001;    // DR-19 P0-A

    // Deferred pipeline build: old pipeline was disposed last frame.
    // One-frame gap lets the GPU driver release VRAM before new RTT allocations.
    if (_rebuildPending) {
      _rebuildPending = false;
      postProcessing  = buildPostProcessing(renderer, scene, camera, ..._rebuildArgs);
      _rebuildArgs    = null;
      firstRenderDone = false;
      _renderInFlight = false;
      return; // skip frame — next frame renders with fresh pipeline
    }

    if (!postProcessing || needsTwoPass !== curTwoPass || srcChanged ||
        usePrevTex !== _lastUsePrevTex || glassBlurActive !== _lastGlassBlurActive ||
        ghostActive !== _lastGhostActive || haloActive !== _lastHaloActive ||
        dotCrawlActive !== _lastDotCrawlActive) {
      disposeCurrentPP();
      _lastSrcW = needsTwoPass ? Math.round(effectiveSrc) : 0;
      _lastSrcH = needsTwoPass ? Math.round(effectiveSrcH) : 0;
      _lastUsePrevTex = usePrevTex;
      _lastGlassBlurActive = glassBlurActive; // DR-8 P2-D
      _lastGhostActive = ghostActive;         // DR-14 P1-B
      _lastHaloActive = haloActive;           // P0-A
      _lastDotCrawlActive = dotCrawlActive;   // DR-19 P0-A
      _rebuildPending = true;
      _rebuildArgs    = [
        needsTwoPass ? Math.round(effectiveSrc) : 0,
        needsTwoPass ? Math.round(effectiveSrcH) : 0,
        usePrevTex,
      ];
      firstRenderDone = false;
      _renderInFlight = false;
      return; // skip frame — GPU releases disposed memory before next-frame build
    }

    // Sync uniforms with effective source dims.
    if (needsTwoPass) {
      uniforms.kernelSrcW.value  = Math.round(effectiveSrc);
      uniforms.kernelSrcH.value  = Math.round(effectiveSrcH);
      uniforms.sourceSizeX.value = Math.round(effectiveSrc);
      uniforms.sourceSizeY.value = Math.round(effectiveSrcH);
    } else {
      // Single-pass: reset to 0 so WGSL functions use canvas-space coordinates.
      if (!explicitSrc) {
        uniforms.sourceSizeX.value = 0;
        uniforms.sourceSizeY.value = 0;
      }
    }

    // P1-A: sync mask energy compensation with the effective shader mask scale.
    // Shader computes autoScale = outW/sourceSizeX in two-pass mode (not uniforms.maskScale).
    // Must be recalculated on every resize or source-size change; gate on tolerance to avoid
    // unnecessary uniform writes on frames where neither outW nor effectiveSrc changed.
    {
      const effectiveMaskScale = needsTwoPass
        ? outW / Math.max(effectiveSrc, 1)
        : uniforms.maskScale.value;
      if (Math.abs(effectiveMaskScale - _lastMaskScale) > 0.01) {
        updateMaskBoost(effectiveMaskScale);
        _lastMaskScale = effectiveMaskScale;
      }
    }

    // Resize detection: rtt() nodes do not auto-resize after first render.
    // Track the canvas size and rebuild the active PostProcessing when it changes.
    {
      const rdrW = renderer.domElement.width;
      const rdrH = renderer.domElement.height;
      if (firstRenderDone && _lastCanvasW > 0 &&
          (rdrW !== _lastCanvasW || rdrH !== _lastCanvasH)) {
        disposeCurrentPP();
        _lastSrcW = needsTwoPass ? Math.round(effectiveSrc) : 0;
        _lastSrcH = needsTwoPass ? Math.round(effectiveSrcH) : 0;
        _lastUsePrevTex = usePrevTex;
        _lastGlassBlurActive = glassBlurActive; // DR-8 P2-D
        _lastGhostActive = ghostActive;         // DR-14 P1-B
        _lastHaloActive = haloActive;           // P0-A
        _lastDotCrawlActive = dotCrawlActive;   // DR-19 P0-A
        _rebuildPending = true;
        _rebuildArgs    = [
          needsTwoPass ? Math.round(effectiveSrc) : 0,
          needsTwoPass ? Math.round(effectiveSrcH) : 0,
          usePrevTex,
        ];
        firstRenderDone = false;
        // DR-14 P0-A: recompute mask boost with updated effective scale after resize.
        if (uniforms.sourceSizeX.value > 0.5) {
          updateMaskBoost(renderer.domElement.width / uniforms.sourceSizeX.value);
        } else {
          updateMaskBoost();
        }
        _renderInFlight = false;
        return; // skip frame — GPU releases disposed memory before next-frame build
      }
      _lastCanvasW = rdrW;
      _lastCanvasH = rdrH;
    }

    // DR-14 P1-A: mask LUT dirty-flag — only re-render when mask-governing params change.
    // Saves ~11M sin()/sec at 4K60 steady state (maskType/maskSmooth/maskScale rarely animated).
    {
      const lutType   = uniforms.maskType.value;
      const lutSmooth = uniforms.maskSmooth.value;
      const lutScale  = uniforms.sourceSizeX.value > 0.5
        ? renderer.domElement.width / Math.max(uniforms.sourceSizeX.value, 1)
        : uniforms.maskScale.value;
      if (lutType   !== _maskLutCachedType   ||
          lutSmooth !== _maskLutCachedSmooth ||
          Math.abs(lutScale - _maskLutCachedScale) > 0.0001) {
        _maskLutNeedsRender  = true;
        _maskLutNeedsBoostReadback = true;
        _maskLutCachedType   = lutType;
        _maskLutCachedSmooth = lutSmooth;
        _maskLutCachedScale  = lutScale;
      }
    }

    try {
      // Single PostProcessing — RTTNode.updateBefore fires automatically:
      //   1. PassNode.updateBefore (FRAME) renders scene at canvas res
      //   2. RTTNode.updateBefore (RENDER) renders horzPass at srcW × srcH (two-pass only)
      //   3. PostProcessing renders main pipeline to canvas using RTTNode's texture
      await postProcessing.render();

      // DR-14 P2-A: exact mask boost calibration via LUT readback after each LUT rebuild.
      if (_maskLutNeedsBoostReadback) {
        _maskLutNeedsBoostReadback = false;
        updateMaskBoostFromLut(); // async — fires after GPU readback completes
      }

      // Copy rtt output to prevRT when either persistence or interlace field blending is active.
      // Both mechanisms read from prevTexNode to blend with the previous frame.
      // DR-7 P2-A: _rttBlend is null when usePrevTex=false (no persistence/interlace).
      // Guard both conditions — skip copy if pipeline has no rtt or feature is inactive.
      const needsPrevTex = postProcessing._rttBlend !== null && (
        uniforms.persistence.value > 0.001 ||
        uniforms.interlace.value > 0.5  // off-field rows always need prevTexNode
      );
      if (needsPrevTex) {
        ensurePersistenceTargets();
        renderer.copyTextureToTexture(postProcessing._rttBlend.renderTarget.texture, prevRT.texture);
      }
      firstRenderDone = true;
    } catch (e) {
      // Guard for device loss surfacing as a thrown error
      console.warn('telescreen-crt-webgpu: renderAsync threw:', e);
    } finally {
      _renderInFlight = false;
    }
  }

  // ── Internal RAF loop (used when autoRender = true) ───────────────────────
  function internalLoop(ts) {
    if (destroyed) return;
    rafId = requestAnimationFrame(internalLoop);
    renderFrame(ts);
  }

  if (autoRender) {
    rafId = requestAnimationFrame(internalLoop);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Set glitch parameters. All arguments after `enabled` are optional.
   * @param {boolean} enabled
   * @param {number}  [strength]   0–0.10 horizontal shift amount
   * @param {number}  [speed]      1–30 block-change rate (blocks/sec)
   * @param {number}  [cols]       10–80 number of horizontal bands
   * @param {number}  [rgb]        0–1 RGB channel split strength
   * @param {number}  [delay]      max seconds between bursts
   * @param {number}  [burst]      max seconds per burst
   * @param {number}  [burstLoss]  0–1 type-5 burst-loss desaturation depth (0=off, 1=full grey)
   */
  function setGlitch(enabled, strength, speed, cols, rgb, delay, burst, burstLoss) {
    cfg.glitchEnabled = !!enabled;
    uniforms.glitchEnabled.value = cfg.glitchEnabled ? 1 : 0;
    if (!cfg.glitchEnabled) {
      uniforms.glitchActive.value = 0;
      glitchNextFire = 0;
      glitchEndTime  = 0;
    }
    if (strength   !== undefined) uniforms.glitchStrength.value  = strength;
    if (speed      !== undefined) uniforms.glitchSpeed.value     = speed;
    if (cols       !== undefined) uniforms.glitchCols.value      = cols;
    if (rgb        !== undefined) uniforms.glitchRgb.value       = rgb;
    if (delay      !== undefined) cfg.delay = delay;
    if (burst      !== undefined) cfg.burst = burst;
    if (burstLoss  !== undefined) uniforms.glitchBurstLoss.value = burstLoss;
  }

  /**
   * Enable/disable OSD mode and optionally update the OSD texture (SPEC-osd-overlay).
   * In OSD mode the overlay bypasses signal-chain artifacts (glitch, ghost, dot crawl,
   * hum bar, rollbar, snow) but is subject to display-physical effects (scanlines,
   * phosphor mask, halation, corner, gamma, bloom, scratch, grain).
   * @param {boolean} enabled  true = OSD mode, false = signal mode (default)
   * @param {THREE.Texture} [canvasTexture]  CanvasTexture to use as OSD source. Hot-swapped
   *   without a pipeline rebuild. Caller must set canvasTexture.needsUpdate = true each frame
   *   the canvas content changes.
   */
  function setOSD(enabled, canvasTexture) {
    uniforms.osdEnabled.value = enabled ? 1.0 : 0.0;
    if (canvasTexture) {
      osdTexNode.value = canvasTexture;
    }
  }

  /**
   * Tune CRT shader constants. Pass only the keys you want to change.
   * @param {Object} p
   * @param {number} [p.hardPix]     pixel sharpness (negative): -0.5 (soft) to -3.0 (sharp)
   * @param {number} [p.hardScan]    scanline sharpness (negative): -4 (soft) to -16 (sharp)
   * @param {number} [p.warpMult]    barrel distortion: 0 = flat, 0.6 = default, 2 = strong
   * @param {number} [p.maskStr]     phosphor mask: 0 = off, 1 = full
   * @param {number} [p.maskType]   phosphor mask type: 0 = aperture grille, 1 = shadow mask, 2 = slot mask
   * @param {number} [p.grainAmt]    film grain: 0–0.15
   * @param {number} [p.halationStr] halation: 0 = off, 3 = default
   * @param {number} [p.halationSharp] halation Gaussian sharpness (negative): -0.1 (wide scatter) to -2.5 (tight scanline bleed). Default -0.4.
   * @param {number} [p.convergence]  convergence error: 0 = off, 0.035 = subtle (radial pincushion)
   * @param {number}  [p.convStaticX]  Static horizontal R misconvergence in source pixels.
   *                  R shifts +X. 0 = perfect. Typical: −0.5..+0.5.
   * @param {number}  [p.convStaticY]  Static vertical R misconvergence in source pixels.
   *                  R shifts +Y. 0 = perfect. Typical: −0.3..+0.3.
   * @param {number}  [p.convBX]  Independent static horizontal B misconvergence in source pixels.
   *                  B shifts by this offset (independent from R, not anti-symmetric).
   *                  Real thermal drift moves R and B in the same direction (B ~30% larger).
   * @param {number}  [p.convBY]  Independent static vertical B misconvergence in source pixels.
   * @param {number}  [p.scratchStr]     scratch overlay: 0 = off, 0.03 = default
   * @param {number}  [p.scrollRate]     scanline drift speed: 0 = static, 0.325 = default
   * @param {number}  [p.brightBoost]   brightness multiplier: 1 = default
   * @param {number}  [p.swimAmt]       H-deflection jitter: 0 = off, 1 = default, 2 = strong
   * @param {number}  [p.colorTempStr]  9300K white point: 0 = D65, 1 = full 9300K
   * @param {number}  [p.snowAmt]       electronic snow amplitude: 0 = off, 0.05 = default (±2.5% per channel)
   * @param {boolean} [p.rollbarScroll] enable GPU UV scroll during CSS rollbar sweep
   * @param {boolean} [p.sagGeom]       enable GPU UV squeeze during CSS voltage sag
   * @param {number}  [p.maskScale]     mask pitch scale: 1 = native, 4 = 14" CRT at 1080p/3× upscale.
   *                  Choose maskScale so (outputW / sourceSizeX / maskScale) is an integer to avoid moiré.
   * @param {number}  [p.defocusAmt]    edge beam defocus: 0 = off, 0.5 = subtle, 1 = strong
   * @param {number}  [p.p22Str]        P22 phosphor primary shift: 0 = sRGB, 1 = full P22
   * @param {number}  [p.flickerRate]   emulated CRT field rate Hz: 50 = EU, 60 = US.
   *                  NOTE: must satisfy floor(3600 * flickerRate) % 1 == 0 for clean tWrapped wrap.
   *                  Safe: 50, 59.4, 60, 75, 100, 120. Unsafe: 59.94 (NTSC exact).
   * @param {number}  [p.flickerTau]    phosphor decay constant seconds: 0.001–0.02
   * @param {number}  [p.flickerAmt]    flicker blend: 0 = off, 1 = full decay
   * @param {number}  [p.blackLevel]    Phosphor dark emission floor (linear light, pre-gamma).
   *                  0 = perfect black. Useful range: [0, 0.002].
   *                  Values are in linear light; previously was display-encoded.
   *                  Old value 0.004 → new equivalent ≈ 0.0001.
   * @param {number}  [p.persistence]   Phosphor afterimage blend per-frame (0=off).
   *                  WARNING: This value is frame-rate-dependent. At 60 fps, persistence=0.5
   *                  gives tau~24 ms; at 30 fps, tau~48 ms. Use setShader({ persistenceTau })
   *                  for frame-rate-independent decay. persistenceTau overwrites this each
   *                  frame when set; do not mix the two.
   * @param {number}  [p.persistenceTau]  Phosphor afterglow time constant in seconds. When set,
   *                  overrides p.persistence each frame with blend = exp(−dt / tau), making the
   *                  afterglow frame-rate independent. 0 = disable (clears both tau and blend).
   *                  Typical values: 0.00015 = P22 red (Y₂O₂S:Eu³⁺, 150 µs),
   *                                  0.0001  = P22 green (rare-earth oxysulphide, 100 µs),
   *                                  0.001   = P43 green (Tb-doped Y₂O₂S, ~1 ms),
   *                                  0.060   = P45 white (ZnS:Cu,Ag, ~60 ms).
   *                  Note: P22 taus are << 1 frame period — frame-to-frame persistence is
   *                  effectively zero at 60 Hz. Use P43/P45 values for visible afterglow.
   *                  Precedence: _persistenceTau > 0 overwrites persistence every frame.
   * @param {number}  [p.maskSmooth]    phosphor stripe profile: 0 = binary (default), 1 = cosine smooth
   * @param {number}  [p.humAmt]        Hum bar peak amplitude. 0 = off. Positive = bright bands
   *                  (capacitive DC-rail coupling; default 0.022). Negative = dark bands
   *                  (inductive coupling; less common). Waveform is full-wave rectified abs(sin)
   *                  so peak is always humAmt in direction of sign. DR-15 P1-E.
   * @param {number}  [p.ghostStr]        ghost strength: 0=off, 0.15=subtle, negative=polarity-inverted.
   *                  Note: ghost is composited post-scanline-reconstruction so it lacks the CRT's
   *                  scanline/phosphor texture. Visually accurate for ghostStr ≤ 0.15 (< 2% error).
   *                  Above 0.3 the unscanlined ghost becomes perceptible.
   * @param {number}  [p.haloRadius]  2D isotropic halation Gaussian sigma, output pixels.
   *                  Models photon TIR scatter in CRT glass faceplate. Requires
   *                  loadBloomDependencies(). 0 = off (default). Typical: 3–8 px.
   * @param {number}  [p.haloStr]     2D isotropic halation additive intensity.
   *                  Requires loadBloomDependencies(). 0 = off (default). Typical: 0.3–1.0.
   */
  function updateFlickerCompensation() {
    uniforms.flickerBoost.value = computeFlickerBoost(
      uniforms.flickerTauR.value,
      uniforms.flickerTauG.value,
      uniforms.flickerTauB.value,
      uniforms.flickerAmt.value,
      uniforms.flickerRate.value,
    );
  }

  /**
   * Compute and update the mask energy compensation factor.
   * Automatically called by setShader() when maskStr, maskSmooth, maskType, or autoMaskBoost changes.
   * P2-C: compensates for aperture transmittance loss so perceived brightness is constant
   * regardless of maskStr setting.
   */
  function updateMaskBoost(effectiveScale) {
    // P1-A: use the caller-supplied effective scale when available (e.g. autoScale = outW/sourceSizeX
    // from renderFrame). Falls back to uniforms.maskScale.value for setShader() call sites where
    // the shader-computed auto-scale is not yet known.
    const maskScale = (effectiveScale !== undefined) ? effectiveScale : uniforms.maskScale.value;
    uniforms.maskBoostFactor.value = computeMaskBoost(
      uniforms.maskType.value,
      uniforms.maskSmooth.value,
      uniforms.maskStr.value,
      maskScale,
    );
  }

  /**
   * Exact mask boost calibration from LUT pixel readback.
   * Called once after each LUT rebuild to compute true Lanczos-integrated transmittance.
   * Falls back to analytical updateMaskBoost() if readback fails or RT is unavailable.
   * DR-14 P2-A.
   */
  async function updateMaskBoostFromLut() {
    if (!_maskLutRttNode?.renderTarget) { updateMaskBoost(); return; }
    const rt  = _maskLutRttNode.renderTarget;
    const w   = rt.width;
    const h   = rt.height; // 12 (LCM of all mask-type vertical periods; DR-15 P0-A)
    // readRenderTargetPixelsAsync (WebGPU renderer) returns a new typed array — no buffer param.
    // RTT is FloatType so the returned array is Float32Array (RGBA32F, 4 floats per texel).
    let buf;
    try {
      buf = await renderer.readRenderTargetPixelsAsync(rt, 0, 0, w, h);
      if (!(buf instanceof Float32Array)) throw new Error('unexpected readback type');
    } catch (_e) {
      // Readback not supported or failed — fall back to analytical.
      updateMaskBoost(); return;
    }
    let sumR = 0, sumG = 0, sumB = 0;
    const count = w * h;
    for (let i = 0; i < buf.length; i += 4) {
      sumR += buf[i]; sumG += buf[i + 1]; sumB += buf[i + 2];
    }
    const avgTransmittance = ((sumR + sumG + sumB) / 3) / count;
    const maskStr = uniforms.maskStr.value;
    const pipelineAvg = 1.0 - maskStr + maskStr * avgTransmittance;
    uniforms.maskBoostFactor.value = 1.0 / Math.max(pipelineAvg, 0.001);
  }

  // Prime both compensation values from initial uniform values.
  updateMaskBoost();

  function setShader({
    hardPix, hardScan, warpMult, maskStr, maskType, grainAmt,
    halationStr, halationSharp, convergence, scratchStr, scrollRate, brightBoost,
    swimAmt, colorTempStr, snowAmt, rollbarScroll, sagGeom,
    maskScale, defocusAmt, defocusAniso, warpAniso, p22Str, flickerRate, flickerTau,
    flickerTauR, flickerTauG, flickerTauB,
    flickerAmt, blackLevel,
    persistence, persistenceTau,
    maskSmooth,
    sourceSizeX, sourceSizeY,
    interlace,
    halationWarm,
    convStaticX, convStaticY,
    convBX, convBY,
    convAspect, kernelGamma, apertureW,
    glassBlurStr, glassBlurRadius,
    haloRadius, haloStr,
    // Interference pass params (SPEC-glitch-interference-v2)
    humAmt, humBars, humRate,
    dotCrawlAmt,
    ghostOffset, ghostStr, ghostTintR, ghostTintG, ghostTintB,
    glitchBurstLoss,
    vbiStr, vbiLines,
    agcAmt, agcRate,
    cornerFade,
  } = {}) {
    if (hardPix       !== undefined) uniforms.hardPix.value       = hardPix;
    if (hardScan      !== undefined) uniforms.hardScan.value      = hardScan;
    if (warpMult      !== undefined) uniforms.warpMult.value      = warpMult;
    if (maskStr       !== undefined) uniforms.maskStr.value       = maskStr;
    if (maskType      !== undefined) {
      uniforms.maskType.value = Math.max(0, Math.min(7, Math.round(maskType)));
      // Auto-set convAspect to the physically correct gun geometry when maskType changes,
      // unless convAspect is also explicitly provided in the same setShader() call.
      // aperture grille (0,3,6) → H-only inline geometry (convAspect=1)
      // shadow mask (1,4,5), slot (2) → radial delta-gun geometry (convAspect=0)
      // CGWG (7) → agnostic, leave current value
      if (convAspect === undefined) {
        const autoAspect = [1, 0, 0, 1, 0, 0, 1, null];
        const suggested  = autoAspect[Math.max(0, Math.min(7, Math.round(maskType)))];
        if (suggested !== null) uniforms.convAspect.value = suggested;
      }
      // DR-6 P3-C: auto-link apertureW when maskType changes (unless explicitly provided).
      // Physical correspondence: aperture fraction determines how much beam passes through
      // each phosphor cell — 1.0 for aperture grille, 0.67 for shadow mask, 0.75 for slot mask.
      if (apertureW === undefined) {
        const autoAperture = [1.0, 0.67, 0.75, 1.0, 0.67, 0.67, 0.67, 1.0];
        uniforms.apertureW.value = autoAperture[Math.max(0, Math.min(7, Math.round(maskType)))];
      }
    }
    // Assign maskScale before updateMaskBoost so the boost uses the new scale value.
    if (maskScale     !== undefined) uniforms.maskScale.value     = maskScale;
    // update mask energy compensation whenever mask parameters change (including maskScale)
    if (maskStr !== undefined || maskType !== undefined || maskScale !== undefined) updateMaskBoost();
    if (grainAmt      !== undefined) uniforms.grainAmt.value      = grainAmt;
    if (halationStr   !== undefined) uniforms.halationStr.value   = halationStr;
    if (halationSharp !== undefined) uniforms.halationSharp.value = halationSharp;
    if (convergence   !== undefined) uniforms.convergence.value   = convergence;
    if (convStaticX   !== undefined) uniforms.convStaticX.value   = convStaticX;
    if (convStaticY   !== undefined) uniforms.convStaticY.value   = convStaticY;
    if (convBX        !== undefined) uniforms.convBX.value        = convBX;
    if (convBY        !== undefined) uniforms.convBY.value        = convBY;
    if (cornerFade    !== undefined) uniforms.cornerFade.value    = cornerFade;
    if (scratchStr    !== undefined) uniforms.scratchStr.value    = scratchStr;
    if (scrollRate    !== undefined) uniforms.scrollRate.value    = scrollRate;
    if (brightBoost   !== undefined) uniforms.brightBoost.value   = brightBoost;
    if (swimAmt !== undefined) {
      // Always update the saved value so it restores correctly when prefers-reduced-motion reverts.
      _savedSwimAmt = swimAmt;
      uniforms.swimAmt.value = prefersReduced.matches ? 0 : swimAmt;
    }
    if (colorTempStr  !== undefined) uniforms.colorTempStr.value  = colorTempStr;
    if (snowAmt !== undefined) {
      _savedSnowAmt = snowAmt;
      uniforms.snowAmt.value = prefersReduced.matches ? 0 : snowAmt;
    }
    if (rollbarScroll !== undefined) cfg.rollbarScrollEnabled     = !!rollbarScroll;
    if (sagGeom       !== undefined) cfg.sagGeomEnabled           = !!sagGeom;
    if (defocusAmt    !== undefined) uniforms.defocusAmt.value    = defocusAmt;
    if (defocusAniso  !== undefined) uniforms.defocusAniso.value  = defocusAniso;
    if (warpAniso     !== undefined) uniforms.warpAniso.value     = warpAniso;
    if (p22Str        !== undefined) uniforms.p22Str.value        = p22Str;
    if (flickerRate   !== undefined) uniforms.flickerRate.value   = flickerRate;
    if (flickerTau    !== undefined) {
      // Shorthand: set all three channels to the same tau value.
      _cpuState.flickerTau         = flickerTau;  // P3-C: CPU-side scalar (not a GPU uniform)
      uniforms.flickerTauR.value   = flickerTau;
      uniforms.flickerTauG.value   = flickerTau;
      uniforms.flickerTauB.value   = flickerTau;
    }
    // P1-A: per-channel tau overrides (override the shorthand values when set individually).
    if (flickerTauR   !== undefined) uniforms.flickerTauR.value   = flickerTauR;
    if (flickerTauG   !== undefined) uniforms.flickerTauG.value   = flickerTauG;
    if (flickerTauB   !== undefined) uniforms.flickerTauB.value   = flickerTauB;
    if (flickerAmt !== undefined) {
      if (flickerAmt > 0.05) console.warn(
        `telescreen-crt-webgpu: flickerAmt=${flickerAmt} is above the recommended maximum of 0.05 ` +
        `at ${uniforms.flickerRate.value} Hz with P22 phosphors. ` +
        `Values above 0.05 cause visible overexposure. See flickerBoost uniform.`
      );
      uniforms.flickerAmt.value = Math.max(0, Math.min(1, flickerAmt));
    }
    if (flickerRate !== undefined || flickerTau !== undefined ||
        flickerTauR !== undefined || flickerTauG !== undefined || flickerTauB !== undefined ||
        flickerAmt !== undefined) {
      updateFlickerCompensation();
    }
    if (convAspect    !== undefined) uniforms.convAspect.value    = convAspect;
    if (kernelGamma   !== undefined) uniforms.kernelGamma.value   = kernelGamma;
    if (apertureW     !== undefined) uniforms.apertureW.value     = Math.max(0.1, apertureW);
    if (blackLevel    !== undefined) uniforms.blackLevel.value    = blackLevel;
    if (persistence   !== undefined) uniforms.persistence.value  = persistence;
    if (persistenceTau !== undefined) {
      if (persistenceTau <= 0) {
        // Disable tau-based auto-computation; clear both tau and the blend value.
        _persistenceTau = 0;
        uniforms.persistence.value = 0;
      } else {
        // Store tau; the blend value is computed on every subsequent renderFrame
        // from the measured dt. No immediate update here — takes effect next frame.
        _persistenceTau = persistenceTau;
      }
    }
    if (maskSmooth    !== undefined) { uniforms.maskSmooth.value    = maskSmooth; updateMaskBoost(); }
    // Accuracy pass params
    if (sourceSizeX   !== undefined) {
      uniforms.sourceSizeX.value = sourceSizeX;
      _userSetSourceSize = sourceSizeX > 0.5;
      // DR-14 P0-A: effective scale changed — recompute mask boost immediately.
      if (sourceSizeX > 0.5) {
        updateMaskBoost(renderer.domElement.width / sourceSizeX);
      } else {
        updateMaskBoost();
      }
    }
    if (sourceSizeY   !== undefined) uniforms.sourceSizeY.value   = sourceSizeY;
    if (interlace !== undefined) {
      uniforms.interlace.value = interlace ? 1.0 : 0.0;
      if (!interlace) uniforms.interlaceField.value = 0.0;  // reset field parity on disable
      updateFlickerCompensation();  // P2-E: interlace decay contributes to mean brightness
    }
    if (halationWarm  !== undefined) uniforms.halationWarm.value  = halationWarm;
    // Interference pass params
    if (humAmt        !== undefined) uniforms.humAmt.value        = humAmt;
    if (humBars       !== undefined) uniforms.humBars.value       = humBars;
    if (humRate       !== undefined) cfg.humRate                  = humRate;
    if (dotCrawlAmt   !== undefined) uniforms.dotCrawlAmt.value   = dotCrawlAmt;
    if (ghostOffset   !== undefined) uniforms.ghostOffset.value   = ghostOffset;
    if (ghostStr      !== undefined) uniforms.ghostStr.value      = ghostStr;
    if (ghostTintR    !== undefined) uniforms.ghostTintR.value    = ghostTintR;
    if (ghostTintG    !== undefined) uniforms.ghostTintG.value    = ghostTintG;
    if (ghostTintB    !== undefined) uniforms.ghostTintB.value    = ghostTintB;
    if (glitchBurstLoss !== undefined) uniforms.glitchBurstLoss.value = glitchBurstLoss;
    if (vbiStr        !== undefined) uniforms.vbiStr.value        = vbiStr;
    if (vbiLines      !== undefined) uniforms.vbiLines.value      = vbiLines;
    if (agcAmt        !== undefined) cfg.agcAmt                   = agcAmt;
    if (agcRate       !== undefined) cfg.agcRate                  = agcRate;
    if (glassBlurStr    !== undefined) uniforms.glassBlurStr.value    = glassBlurStr;
    if (glassBlurRadius !== undefined) {
      const v = glassBlurRadius;
      if (v > 0.004) console.warn(
        `telescreen-crt-webgpu: glassBlurRadius=${v} exceeds the physical CRT glass ` +
        `scatter range of 0.001–0.003. Values above 0.004 produce non-physical diffusion.`
      );
      uniforms.glassBlurRadius.value = v;
    }
    if (haloRadius !== undefined) uniforms.haloRadius.value = haloRadius;
    if (haloStr    !== undefined) uniforms.haloStr.value    = haloStr;
    // P0-A: warn once when haloRadius/haloStr are set but GaussianBlurNode is unavailable.
    // No rebuild needed when only the value changes (zero-strength is discarded by the GPU).
    // A rebuild is only needed when haloActive flips (crossing the > 0.001 / > 0.1 thresholds).
    if ((haloRadius !== undefined || haloStr !== undefined) &&
        !_GaussianBlurNode && !_haloMissingWarned) {
      _haloMissingWarned = true;
      console.warn(
        'telescreen-crt-webgpu: haloRadius/haloStr require loadBloomDependencies() ' +
        'for 2D isotropic halation. Call loadBloomDependencies() before init. ' +
        'Without it, haloStr/haloRadius have no effect.'
      );
    }
  }

  /**
   * Tune GPU bloom parameters at runtime. No-op if opts.bloom was not provided at init.
   * @param {Object}  [p]
   * @param {boolean} [p.enabled]      Toggle bloom on/off.
   * @param {number}  [p.strength]     Scatter halo additive intensity [0, 2]
   * @param {number}  [p.radius]       Scatter halo Gaussian sigma in pixels [0.5, 4]
   * @param {number}  [p.threshold]    Luminance threshold [0, 1]
   * @param {number}  [p.coreRadius]   Beam-spot core Gaussian sigma [0, 1]
   * @param {number}  [p.coreStrength] Beam-spot core additive intensity [0, 2]
   */
  function setBloom({ enabled, strength, radius, threshold, coreRadius, coreStrength } = {}) {
    if (!bloomEnabled) return;
    if (enabled !== undefined) {
      bloomState.active = !!enabled;
      // Zero both bloom strengths to disable rather than rebuilding the PostProcessing graph
      bloomUniforms.bloomStrength.value     = bloomState.active ? bloomState.strength     : 0;
      bloomUniforms.bloomCoreStrength.value = bloomState.active ? bloomState.coreStrength : 0;
    }
    if (strength !== undefined) {
      bloomState.strength = strength;
      if (bloomState.active) bloomUniforms.bloomStrength.value = strength;
    }
    if (radius       !== undefined) bloomUniforms.bloomRadius.value       = radius;
    if (threshold    !== undefined) bloomUniforms.bloomThreshold.value    = threshold;
    if (coreRadius   !== undefined) bloomUniforms.bloomCoreRadius.value   = coreRadius;
    if (coreStrength !== undefined) {
      bloomState.coreStrength = coreStrength;
      if (bloomState.active) bloomUniforms.bloomCoreStrength.value = coreStrength;
    }
  }

  /**
   * Swap or clear the video source at runtime.
   * Disposes the old VideoTexture, creates a new one, and hot-swaps the material map.
   * Has no effect if opts.videoSource was not provided at init — logs a warning instead.
   * @param {HTMLVideoElement | null} videoEl  New video element, or null to render black.
   */
  function setVideoSource(videoEl) {
    if (destroyed) return;
    if (!videoMesh) {
      console.warn('telescreen-crt-webgpu: setVideoSource called but no video scene was initialised (pass opts.videoSource at init)');
      return;
    }

    // 1. Remove old listener and dispose old texture
    if (loadedMetaHandler && currentVideoEl) {
      currentVideoEl.removeEventListener('loadedmetadata', loadedMetaHandler);
      loadedMetaHandler = null;
    }
    if (videoTexture) {
      try { videoTexture.dispose(); } catch (_) {}
      videoTexture = null;
    }

    // 2. Create new texture or 1×1 black DataTexture placeholder
    currentVideoEl = videoEl;
    _videoCanvas   = null;
    _videoCtx      = null;
    _lastVideoTime = -1;  // force redraw on first frame of new source
    if (videoEl) {
      // Build the OffscreenCanvas proxy — draw the first frame immediately so the
      // CanvasTexture has valid content before the bind group is created.
      const vw = videoEl.videoWidth  || 1;
      const vh = videoEl.videoHeight || 1;
      _videoCanvas = new OffscreenCanvas(vw, vh);
      _videoCtx    = _videoCanvas.getContext('2d');
      _videoCtx.drawImage(videoEl, 0, 0, vw, vh);

      videoTexture = new THREE.CanvasTexture(_videoCanvas);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.needsUpdate = true;

      if (videoEl.readyState >= HTMLMediaElement.HAVE_METADATA) {
        fitPlane(videoMesh, videoEl);
      } else {
        loadedMetaHandler = () => {
          fitPlane(videoMesh, videoEl);
          videoEl.removeEventListener('loadedmetadata', loadedMetaHandler);
          loadedMetaHandler = null;
        };
        videoEl.addEventListener('loadedmetadata', loadedMetaHandler);
      }
    } else {
      const blackData = new Uint8Array([0, 0, 0, 255]);
      videoTexture = new THREE.DataTexture(blackData, 1, 1);
      videoTexture.needsUpdate = true;
      videoMesh.scale.set(1, 1, 1);  // reset to unit square
    }

    // 3. Hot-swap material map without rebuilding the node graph
    videoMesh.material.map = videoTexture;
    videoMesh.material.needsUpdate = true;
  }


  function destroy() {
    if (destroyed) return;
    destroyed = true;

    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }

    prefersReduced.removeEventListener('change', syncReducedMotion);

    // Dispose scratch texture (only if it's not still the 1×1 placeholder)
    if (scratchTexture && scratchTexture !== placeholderTex) {
      try { scratchTexture.dispose(); } catch (_) {}
    }
    try { placeholderTex.dispose(); } catch (_) {}

    // Dispose PostProcessing graph, RTT render targets, bloom RTTs, and persistence RT.
    disposeCurrentPP();

    // Persistence dummy RT (not managed by disposeCurrentPP — it's the permanent placeholder)
    try { _dummyPrevRT.dispose(); } catch (_) {}
    prevTexNode = null;

    // Video source cleanup
    if (loadedMetaHandler && currentVideoEl) {
      currentVideoEl.removeEventListener('loadedmetadata', loadedMetaHandler);
      loadedMetaHandler = null;
    }
    if (videoTexture) {
      try { videoTexture.dispose(); } catch (_) {}
      videoTexture = null;
    }
    if (videoMesh) {
      try {
        videoMesh.geometry.dispose();
        videoMesh.material.dispose();
        if (scene.children.includes(videoMesh)) scene.remove(videoMesh);
      } catch (_) {}
      videoMesh = null;
    }
    currentVideoEl = null;
    _videoCanvas   = null;
    _videoCtx      = null;

    // Null internal refs to aid GC and prevent accidental use after destroy
    scratchTexture   = null;
    scratchTexNode   = null;
    osdTexNode       = null;
  }

  return {
    // Getter so the property reflects the live instance after device-loss recovery,
    // which rebinds the closure variable `postProcessing` to a new object.
    get postProcessing() { return postProcessing; },
    setGlitch,
    setShader,
    setBloom,
    setOSD,
    setVideoSource,
    renderFrame,
    destroy,
    get effectiveSourceW() { return uniforms.sourceSizeX.value; },
    get effectiveSourceH() { return uniforms.sourceSizeY.value; },
  };
}
