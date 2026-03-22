/**
 * telescreen-crt-webgpu.js
 * WebGPU CRT post-processing effect for Three.js r171+.
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

import { crtKernelFn, crtHalationFn, crtHorzPassFn, crtVertPassFn } from './crt-kernel.wgsl.js';
import { crtGlitchFallbackFn } from './crt-glitch.wgsl.js';
import {
  maskFn,
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
const STRUCT_RETURN_MIN_REV = 9999; // Struct return from wgslFn confirmed broken in r171: struct definitions
// inside wgslFn source are not supported by Three.js r171's WGSLNodeFunction. The vec3f fallback
// is the permanent path for r171. If a future Three.js revision adds struct-return support,
// lower this constant to that revision number to enable the primary path.

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
 * @param {string}  [opts.scratchUrl='./data/scratches.jpg']  Scratch texture URL (same-origin or CORS)
 * @param {boolean} [opts.autoRender=true]  Start the internal render loop.
 *                  Pass false to drive manually via crt.renderFrame(timestamp).
 * @param {boolean|Object} [opts.bloom]  Enable GPU bloom. Pass true for defaults or an object:
 *                  { enabled: true, strength: 0.8, radius: 1.5, threshold: 0.3 }
 *                  Call loadBloomDependencies() before init for full Gaussian blur support.
 * @param {Function} [opts.onError]  Optional error callback invoked with an Error when a
 *                  recoverable init failure occurs (e.g. scratch texture load failure).
 *                  Does not fire for device-loss — that triggers automatic recovery.
 *
 * @param {HTMLVideoElement} [opts.videoSource]  Optional video element to route through the CRT
 *                  effect. The library creates a VideoTexture, PlaneGeometry, and MeshBasicMaterial
 *                  and adds them to the scene. The caller must call video.play() inside a user
 *                  gesture handler (or set video.muted = true for autoplay without a gesture).
 *                  Use crt.setVideoSource() to swap or clear the video at runtime.
 *
 * @returns {{
 *   postProcessing: THREE.PostProcessing,
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
  // Returns 0 (single-pass) when output width is ≤ 1024 (source and output similar).
  // Otherwise selects a virtual SD-era source size based on output width,
  // matching real CRT source resolutions for appropriate scanline reconstruction.
  function computeAutoSourceWidth(outputW) {
    if (outputW <= 1024) return 0;   // single-pass
    if (outputW <= 1920) return 640;
    if (outputW <= 2560) return 800;
    return 960;
  }

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
    scratchUrl   = './data/scratches.jpg',
    autoRender   = true,
    autoTwoPass  = true,
    bloom:       bloomOpt    = undefined,
    videoSource: videoOpt   = undefined,
    onError,
  } = opts;

  // ── Bloom setup ───────────────────────────────────────────────────────────
  const BLOOM_DEFAULTS = { enabled: true, strength: 0.25, radius: 1.8, threshold: 0.05, coreRadius: 0.35, coreStrength: 0.6 };
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

  let _bloomNotInitWarned = false;
  let _fallbackBlurWarned = false;     // per-instance (was incorrectly at module scope)
  let _bloomBlurNodes = [];            // GaussianBlurNode refs for dispose + resolution control
  let _bloomRttNodes  = [];            // convertToTexture RTTNode refs — dispose their RTs on rebuild

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
  let _userSetSourceSize = false;  // true when setShader({ sourceSizeX }) was called by user
  let _lastCanvasW = 0;           // canvas pixel width at last render (resize detection)
  let _lastCanvasH = 0;           // canvas pixel height at last render

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
    brightBoost:    uniform(0.55),    // controls-calibrated: matches state.brightBoost = 0.55
    // Realism pass uniforms
    swimAmt:        uniform(0.12),   // H-deflection jitter amplitude (0=off, 1=full, 2=strong)
    colorTempStr:   uniform(0.65),   // 9300K white point correction (0=D65, 1=full 9300K)
    rollbarPhase:   uniform(0.0),    // driven by renderFrame: 0=no scroll, 0→1 during rollbar sweep
    sagPhase:       uniform(0.0),    // driven by renderFrame: 0=none, bell-curve during sag event
    snowAmt:        uniform(0.02),   // electronic snow density (0=off)
    // Fidelity pass uniforms
    maskScale:      uniform(3.91),   // phosphor mask pitch scale (manual override; auto-scale computes from sourceSizeX)
    // P1-B: Convergence anisotropy — 0=radial (delta gun/shadow mask), 1=H-only (inline/Trinitron).
    convAspect:     uniform(1.0),    // default H-only for aperture grille (maskType=0, the default)
    // P3-C: CRT electron-gun gamma (typically 2.2–2.5). Affects kernel horizontal blending domain.
    kernelGamma:    uniform(2.5),    // default 2.5 (CRT display gamma)
    // DR-5 P2-A: phosphor aperture width in source pixels for ErfGaus beam-profile integration.
    // 1.0 = aperture grille (one stripe per source pixel). 0.67 = shadow mask (2/3 px per channel).
    apertureW:      uniform(1.0),
    // P2-C: Auto mask energy compensation — 1/avg_aperture_efficiency to maintain perceptual brightness.
    maskBoostFactor: uniform(1.0),   // auto-computed in updateMaskBoost(); not user-settable directly
    maskSmooth:     uniform(0.12),   // phosphor stripe profile: 0=binary (default), 1=cosine smooth
    defocusAmt:     uniform(0.35),   // edge beam defocus: 0=off, 0.5=subtle, 1=strong
    p22Str:         uniform(0.40),   // P22 phosphor primary shift: 0=sRGB, 1=full P22
    // NOTE: flickerRate must satisfy floor(3600 * flickerRate) % 1 == 0 for clean tWrapped
    // wrap (no brightness flash). Safe values: 50, 59.4, 60, 75, 100, 120 Hz.
    // Unsafe: 59.94 (NTSC exact) — produces a brightness flash every 3600 s at the wrap boundary.
    flickerRate:    uniform(59.94),  // emulated CRT field rate Hz (50=EU, 60=US, 59.94=NTSC)
    flickerTau:     uniform(0.00015), // phosphor decay constant in seconds (shorthand — sets all three channels; P22 default 150 µs)
    // P1-A: Per-channel phosphor decay taus. P22 colour CRT physical values:
    //   R: Y₂O₂S:Eu³⁺  τ ≈ 150 µs = 0.00015 s  (near-instant at 60 Hz — fully decays each field)
    //   G: rare-earth oxysulphide (CRT era)  τ ≈ 100–300 µs = 0.0001–0.0003 s
    //      (NOT Zn₂SiO₄:Mn²⁺ / P1 willemite — that is an oscilloscope phosphor with τ ≈ 12 ms)
    //   B: ZnS:Ag,Cl    τ ≈ 150 µs = 0.00015 s  (near-instant, same as R)
    flickerTauR:    uniform(0.00015), // R channel decay tau (seconds)
    flickerTauG:    uniform(0.0001),  // G channel decay tau (seconds) — P22 green ~100 µs
    flickerTauB:    uniform(0.00015), // B channel decay tau (seconds)
    flickerAmt:     uniform(0.0),    // flicker blend: 0=off, 1=full decay visible
    blackLevel:     uniform(0.0001), // phosphor dark emission floor (linear light, pre-gamma): 0=perfect black, 0.0001=P22 dark emission
    persistence:    uniform(0.0),    // phosphor afterimage blend: 0=off, 0.25=P22@30fps
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
    interlaceDecay:  uniform(0.0),    // exp(-1/(flickerRate*flickerTau)) — scalar shorthand, updated each frame
    interlaceDecayR: uniform(0.0),    // per-channel: exp(-1/(flickerRate*flickerTauR))
    interlaceDecayG: uniform(0.0),    // per-channel: exp(-1/(flickerRate*flickerTauG))
    interlaceDecayB: uniform(0.0),    // per-channel: exp(-1/(flickerRate*flickerTauB))
    halationWarm:   uniform(0.0),    // halation tint: 0 = neutral/achromatic (default — matches all SOTA
                                     //   implementations), 1 = Trinitron neodymium glass (slightly cool/purple)
    tWrapped:       uniform(0.0),    // elapsed seconds mod 3600 — wrap period chosen so
                                     //   fract(tWrapped × 73) = 0 exactly at wrap boundary
                                     //   (3600 × 73 = 262800, exactly representable in f32)
    // Interference pass uniforms (SPEC-glitch-interference-v2)
    humAmt:         uniform(0.022),  // P0-B hum bar peak amplitude: 0=off, 0.12=subtle, 0.4=severe
    humBars:        uniform(1.0),    // P0-B number of hum bar cycles per screen height (1=60Hz, 2=120Hz)
    humPhase:       uniform(0.0),    // P0-B scrolling phase [0,1] — driven each frame by renderFrame
    agcGain:        uniform(1.0),    // P1-C AGC hunting gain factor (1.0=neutral) — driven by JS oscillator
    ghostOffset:    uniform(0.0),    // P0-A ghost H offset in UV (positive = right); 0=off
    ghostStr:       uniform(0.0),    // P0-A ghost strength: 0=off, 0.15=subtle, negative=polarity-inverted
    ghostTintR:     uniform(1.0),    // P0-A ghost tint R channel (1.0=neutral)
    ghostTintG:     uniform(0.97),   // P0-A ghost tint G channel — slight UHF cable green depression
    ghostTintB:     uniform(1.04),   // P0-A ghost tint B channel — slight UHF cable blue lift
    dotCrawlAmt:    uniform(0.09),   // P2-A dot crawl amplitude: 0=off, 0.15=NTSC-like, 0.5=strong
    glitchBurstLoss: uniform(0.70), // P2-B burst-loss desaturation depth: 0=off, 1=full greyscale
    vbiStr:         uniform(0.07),   // P2-C VBI bleed amplitude: 0=off, 0.3=subtle
    vbiLines:       uniform(3.0),    // P2-C number of VBI bleed rows at top of frame [1,8]
    frameCount:     uniform(0.0),    // P2-C frame counter (incremented each frame, mod 1e7)
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
   * Color temperature (stage 9) is applied pre-gamma in linear light so that the
   * γ=2.5 curve naturally compresses any channel boost, matching how a physical
   * 9300K phosphor behaves. Post-gamma application would amplify the B lift
   * geometrically and clip mid-tones (gamma B > 0.893 ≈ linear 0.75 clips at full str).
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
  function buildCRTEffect(inputNode, useVertPass = false) {
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
      const pos = buildWarpNode(outputUV, uniforms.warpMult, outputSizeVec);

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
          uniforms.scrollRate,
          uniforms.tWrapped,
          uniforms.kernelGamma,
          clampedRgbSplit,
          uniforms.swimAmt,
          uniforms.rollbarPhase,
          uniforms.sagPhase,
          uniforms.defocusAmt,
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
          uniforms.scrollRate,
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
      // When interlace is active and the current pixel row is the "off" field,
      // blend the attenuated current colour with the previous frame from prevTexNode.
      // This models P22 phosphor persistence: static content shows soft 50/60 Hz
      // flicker rather than a hard 50% duty-cycle strobe.
      // rowParity: fract(row/2)*2 floored → 0 for even source rows, 1 for odd.
      // XOR with interlaceField: abs(rowParity - field) > 0.5 → true for off-field rows.
      // blend weight: interlace * offField * 1.0 → 0 when inactive or on-field, 1 when off-field.
      {
        const srcY       = mix(outputSizeVec.y, uniforms.sourceSizeY,
                               uniforms.sourceSizeY.greaterThan(0.5).toFloat());
        const scanRow    = outputUV.y.mul(srcY).floor();
        const rowParity  = scanRow.div(2.0).fract().mul(2.0).floor();   // 0=even row, 1=odd row
        const fieldDiff  = rowParity.sub(uniforms.interlaceField).abs(); // 0 = on-field, 1 = off-field
        const offField   = fieldDiff.greaterThan(0.5).toFloat(); // 1 when off-field, 0 when on-field
        const interlaceW = uniforms.interlace.greaterThan(0.5).toFloat().mul(offField);
        // Standard IIR blend: off-field rows = col*(1-decay) + prev*decay, per channel.
        // Per-channel decay vector honours different phosphor persistence per R/G/B.
        const interlaceDecayVec = vec3(uniforms.interlaceDecayR, uniforms.interlaceDecayG, uniforms.interlaceDecayB);
        const blendedInterlace = mix(prevTexNode.rgb, col, vec3(1.0).sub(interlaceDecayVec));
        col = mix(col, blendedInterlace, interlaceW);
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

      // P0-A: Ghost / multipath echo — sample source at horizontal UV offset.
      // Composite video multipath: delayed reflected signal arrives from cable/aerial.
      // Ghost is sampled from the raw pre-kernel source (inputNode) at glitchedPos + offset.
      // This is physically correct: both direct and reflected signals traverse the same
      // electron gun and phosphor — they should be processed identically. Sampling at
      // glitchedPos inherits the glitch displacement for free.
      // ghostStr=0 → no-op (add 0). ghostStr<0 = polarity-inverted reflection.
      {
        const ghostSample = ghostFn(
          inputNode, glitchedPos,
          uniforms.ghostOffset.div(uniforms.outputSizeX.max(float(1.0)))
        );
        const ghostTint = vec3(uniforms.ghostTintR, uniforms.ghostTintG, uniforms.ghostTintB);
        col = col.add(ghostSample.mul(ghostTint).mul(uniforms.ghostStr)).max(vec3(0.0));
      }

      // 5. Phosphor mask — mix against vec3(1) so maskStr=0 cleanly disables it.
      // P0-A: Auto mask scale — when sourceSizeX > 0, the effective mask scale must be
      // screenSize.x / sourceSizeX so one triad maps to outW/srcW output pixels (physically
      // correct: one phosphor triad per source pixel). When sourceSizeX=0 (single-pass),
      // falls back to uniforms.maskScale (manual override, default 1.0).
      // This makes the mask visible at 640→1920 upscale: 9 output pixels per triad.
      const autoScale = outputSizeVec.x.div(uniforms.sourceSizeX.max(1.0));
      const effectiveMaskScale = uniforms.sourceSizeX.greaterThan(0.5)
        .select(autoScale, uniforms.maskScale);
      // screenSize and sourceSizeX/Y allow the mask to compute in source-pixel space.
      // .toInt() emits i32(f32) in WGSL. setShader ensures .value is always 0, 1, or 2.
      const maskPattern = maskFn(pixelCoord, outputSizeVec, uniforms.sourceSizeX, uniforms.sourceSizeY, uniforms.maskType.toInt(), effectiveMaskScale, uniforms.maskSmooth);
      // P2-C: maskBoostFactor compensates for aperture transmittance loss (auto-computed in JS).
      const masked = col.mul(mix(vec3(1.0), maskPattern, uniforms.maskStr)).mul(uniforms.maskBoostFactor);

      // 6. Halation — reads from post-mask 'masked' (physically correct: the phosphor
      // halo radiates from emitted light, which already has the mask structure).
      // UV distortion params mirrored so dy tracks the same scanline rows as the kernel.
      // Horizontal spread is handled by GPU bloom (threshold=0). Vertical spread is
      // controlled by halationSharp: -0.4 (default) = diffuse glass scatter (~4 src-px σ),
      // -2.5 = tight inter-scanline bleed (~0.65 src-px σ).
      const halo = crtHalationFn(
        inputNode,   // scene texture for H-tap sampling (single-pass: sceneOutput; two-pass: horzRttNode)
        masked, glitchedPos, outputSizeVec, uniforms.scrollRate, uniforms.tWrapped,
        uniforms.swimAmt, uniforms.rollbarPhase, uniforms.sagPhase,
        uniforms.sourceSizeX, uniforms.sourceSizeY,
        uniforms.halationSharp,
        uniforms.hardScan,
        uniforms.kernelGamma,
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
      // P1-B: hard 0.35 threshold removed. halationStr already provides effective
      // range-gating; the threshold was causing dark-content halation to vanish entirely.
      const halation = halo
        .mul(haloTint)
        .mul(uniforms.halationStr);
      const withHalo = masked.add(halation);

      // 7. Corner mask (bezel/overscan fade) — applied to warped pos.
      // Pass outputSizeVec for aspect so the fade radius is always correct (canvas space).
      const corner     = buildCornerMaskNode(pos, outputSizeVec);
      const withCorner = withHalo.mul(corner);

      // 8. Brightness boost (pre-gamma so it interacts naturally with the curve).
      // flickerBoost is auto-computed to compensate for phosphor decay mean darkening.
      const boosted = withCorner.mul(uniforms.brightBoost).mul(uniforms.flickerBoost);

      // 9. P22 phosphor primary shift — pre-gamma in linear light, applied FIRST.
      // Physical order: P22 is a property of the phosphor itself (intrinsic);
      // color temperature is the electron gun drive ratio (external). Apply phosphor
      // primaries first, then adapt the white point. Reversed from prior order.
      // str=0 = sRGB identity; str=1 = full P22 gamut shift.
      const p22Adjusted = buildP22MatrixNode(boosted, uniforms.p22Str);

      // 9.5. Color temperature — Bradford D65→9300K chromatic adaptation transform.
      // Consumer CRTs used a 9300K white point (CIE xy 0.2816, 0.2984) vs D65 (0.3127, 0.3290).
      // Matrix derived via M_XYZ_to_sRGB × M_CAT_XYZ × M_sRGB_to_XYZ (see SPEC-color-temperature.md).
      // At str=1: white → (0.821, 1.019, 1.337). Luminance preserved; B channel may exceed 1 —
      // values >1 are physically correct and clamped by the framebuffer post-gamma.
      const tempAdjusted = buildColorTempNode(p22Adjusted, uniforms.colorTempStr);

      // 9.6. Black level lift — phosphor dark emission floor (linear light, pre-gamma).
      // Physically: electrons emit a residual flux even when beam current is zero.
      // Adding in linear light before gamma gives the correct lift curve (linear
      // addition, not the compressive post-gamma lift). Default 0 = perfect black.
      const withBlackLevel = tempAdjusted.add(uniforms.blackLevel);

      // 10. CRT gamma encode γ=2.5
      // Grain, snow, and scratch are NOT added here — see buildPostProcessing.
      return buildGammaNode(withBlackLevel);
    })();
  }

  // ── Bloom helpers (only constructed/called when bloomEnabled) ─────────────

  /**
   * Luminance threshold node — zeroes out pixels below the bloom threshold
   * using a smoothstep over a 0.1-wide band to avoid hard aliased edges.
   * @param {TSLNode} colNode       vec3 colour to threshold
   * @param {TSLNode} thresholdNode float threshold uniform
   * @returns {TSLNode} vec3 thresholded colour
   */
  function buildBloomThresholdNode(colNode, thresholdNode) {
    // Bloom blur runs on gamma-encoded signal (display space), which overweights bright
    // pixels relative to a physically correct linear-light blur. This is an accepted
    // approximation used by crt-royale and all real-time CRT implementations — correcting
    // it would require a linear HDR intermediate render target.
    return Fn(() => {
      // Decode to linear light before luma — BT.709 coefficients are defined for
      // linear, not gamma-encoded values. Applying on gamma-encoded signal causes
      // the threshold to fire at different absolute energy levels per colour.
      // The weight is applied to gamma-encoded colNode so output stays in display space.
      const linear = pow(max(colNode, vec3(0.0)), vec3(2.5));
      const luma   = linear.dot(vec3(0.2126, 0.7152, 0.0722));
      const weight = smoothstep(thresholdNode, thresholdNode.add(0.1), luma);
      return colNode.mul(weight);
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
   * Dispatch to GaussianBlurNode (Path A) or fallback (Path B).
   * @param {TSLNode} inputNode   thresholded vec3 colour node
   * @param {TSLNode} sigmaUniform float sigma uniform
   * @returns {TSLNode} blurred vec3 colour node
   */
  function buildTwoPassBlur(inputNode, sigmaUniform) {
    if (_gaussianBlur) {
      return _gaussianBlur(inputNode, sigmaUniform, 2);
    }
    return buildFallbackBlur(inputNode);
  }


  /**
   * Build the main PostProcessing pipeline.
   * Single-pass (srcW=0): scene pass → crtKernelFn → full pipeline.
   * Two-pass (srcW>0): horzPass embedded as RTTNode → crtVertPassFn → full pipeline.
   * RTTNode has its own QuadMesh — no singleton conflict with PostProcessing.
   */
  function buildPostProcessing(rdr, scn, cam, srcW = 0, srcH = 0) {
    const pp = new THREE.PostProcessing(rdr);

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
        'Check Three.js version (r171+ required).'
      );
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
        sceneOutput, screenUV, screenSize,
        uniforms.hardPix, uniforms.scrollRate, uniforms.tWrapped,
        uniforms.convergence, uniforms.convStaticX, uniforms.convStaticY,
        uniforms.convBX, uniforms.convBY, uniforms.convAspect,
        uniforms.kernelGamma, uniforms.swimAmt, uniforms.rollbarPhase,
        uniforms.sagPhase, uniforms.defocusAmt, uniforms.apertureW,
      );
      horzRttNode = rtt(vec4(horzResult, 1.0), srcW, srcH);
      inputNode   = horzRttNode;
    } else {
      inputNode = sceneOutput;
    }

    // Post-processing composite order (physical signal chain):
    //   1. CRT base  — full pipeline including color temp, up to gamma
    //   2. Snow      — IF-stage signal noise; hits the phosphor, gets bloomed
    //   3. Bloom     — phosphor scatter (operates on CRT+snow signal)
    //   4. Scratch   — glass surface overlay; after phosphor, not bloomed
    //   5. Grain     — aesthetic texture; additive at the very end
    // Snow is NOT amplified by γ=2.5 (applied post-gamma). Scratch likewise.
    // Color temp is applied pre-gamma inside buildCRTEffect (linear-light, see stage 9).
    const crtBase     = buildCRTEffect(inputNode, useTwoPass);

    const grain       = grainFn(screenUV.mul(screenSize), uniforms.tWrapped, uniforms.grainAmt);
    const scratchLuma = scratchTexNode.rgb.dot(vec3(0.2126, 0.7152, 0.0722));  // BT.709 (consistent with pipeline)

    // P0-B: Hum bar — narrow bright luminance band scrolling vertically at the NTSC/PAL
    // mains beat frequency. humPhase is driven by renderFrame() at cfg.humRate Hz.
    // barPhase: N complete sine cycles across screen height + scrolling phase offset.
    // smoothstep(0.90, 1.0) extracts a narrow peak at the crest of each sine cycle
    // (~10% of frame height), which is characteristic of capacitive ripple coupling.
    // Applied post-gamma (hum is a display-path modulation, not a source signal artifact).
    const barPhase = screenUV.y.add(uniforms.humPhase).mul(uniforms.humBars);
    const humMod   = barPhase.mul(6.28318).sin().mul(0.5).add(0.5);
    const humBar   = humMod.smoothstep(0.90, 1.0);
    const withHum  = crtBase.mul(float(1.0).add(humBar.mul(uniforms.humAmt)));

    // P1-C: AGC hunting — multiply by CPU-driven gain oscillator (uniform updated in renderFrame).
    // agcGain=1.0 when disabled (cfg.agcAmt=0) — no-op.
    const withAGC = withHum.mul(uniforms.agcGain);

    // P2-A: Dot crawl — NTSC subcarrier aliasing at luma/chroma spatial transitions.
    // Uses scene output left-tap as edge source (scene-space gradient, pre-kernel).
    // dotCrawlAmt=0 → no-op (early-out inside dotCrawlFn).
    const onePixelX  = uniforms.outputSizeX.max(float(1.0)).reciprocal();
    const leftUV     = screenUV.sub(vec2(onePixelX, float(0.0)));
    const leftSample = texture(sceneOutput, leftUV).rgb;
    const dotCrawled = dotCrawlFn(
      withAGC, leftSample, screenUV,
      vec2(uniforms.outputSizeX, uniforms.outputSizeY),
      uniforms.sourceSizeY, uniforms.flickerRate, uniforms.tWrapped,
      uniforms.dotCrawlAmt
    );

    // P2-C: VBI bleed — coloured noise in the top N scan lines (vertical blanking interval).
    // vbiFn returns vec3(0) for rows below vbiLines; select() composites over dotCrawled.
    // vbiStr=0 → vbiFn returns black → select() result == dotCrawled (no visible effect).
    const outputSizeVecPP = vec2(uniforms.outputSizeX, uniforms.outputSizeY);
    const vbiColor = vbiFn(screenUV, outputSizeVecPP, uniforms.frameCount, uniforms.vbiStr, uniforms.vbiLines);
    const isVBI    = screenUV.y.lessThan(uniforms.vbiLines.div(uniforms.outputSizeY.max(float(1.0))));
    const baseSig  = isVBI.select(vbiColor, dotCrawled);

    // 2. Snow — additive offset onto base signal before bloom.
    // Noise is zero-mean (both brightens and darkens) so screen blend is wrong here.
    const snow     = snowFn(screenUV.mul(screenSize), uniforms.tWrapped, uniforms.snowAmt, uniforms.flickerRate);
    const withSnow = baseSig.add(snow);

    let finalComposite;
    if (bloomEnabled) {
      // 3. Dual-scale bloom: tight beam-spot core + wide phosphor scatter halo.
      // Both blurs operate on the same thresholded input; the dual composite gives
      // bright pixels a saturated centre surrounded by a soft diffuse aura.
      const threshold = buildBloomThresholdNode(withSnow, bloomUniforms.bloomThreshold);
      let bloomed;
      if (_GaussianBlurNode) {
        // Bloom blur runs at quarter resolution to avoid GPU OOM on HiDPI displays.
        // At 2× DPR a 1920×1080 window produces 3840×2160 textures; dual-scale
        // bloom at full-res allocates 6 RGBA16Float RTs ≈ 400 MB — enough to
        // trigger VK_ERROR_OUT_OF_DEVICE_MEMORY on some configurations.
        //
        // Each blur node needs its OWN convertToTexture RTT — GaussianBlurNode's
        // updateBefore() temporarily overwrites textureNode.value during the
        // horizontal pass, so sharing an RTTNode between two blur nodes causes
        // Invalid Texture cascades and device loss.
        const BLOOM_RES_SCALE = 0.25;

        const coreRtt         = convertToTexture(threshold);
        const scatterRtt      = convertToTexture(threshold);
        const coreBlurNode    = new _GaussianBlurNode(coreRtt,    bloomUniforms.bloomCoreRadius, 2);
        const scatterBlurNode = new _GaussianBlurNode(scatterRtt, bloomUniforms.bloomRadius, 2);
        coreBlurNode.resolution.set(BLOOM_RES_SCALE, BLOOM_RES_SCALE);
        scatterBlurNode.resolution.set(BLOOM_RES_SCALE, BLOOM_RES_SCALE);
        _bloomBlurNodes = [coreBlurNode, scatterBlurNode];
        _bloomRttNodes  = [coreRtt, scatterRtt];

        const coreBlur    = nodeObject(coreBlurNode);
        const scatterBlur = nodeObject(scatterBlurNode);

        bloomed = withSnow
          .add(coreBlur.rgb.mul(bloomUniforms.bloomCoreStrength))
          .add(scatterBlur.rgb.mul(bloomUniforms.bloomStrength));
      } else {
        // Fallback: single unblurred contribution (no Gaussian available)
        const unblurred = buildFallbackBlur(threshold);
        bloomed = withSnow.add(unblurred.rgb.mul(bloomUniforms.bloomStrength));
      }
      // 4. Scratch — glass surface, after bloom
      const withScratch = buildScratchNode(bloomed, vec3(scratchLuma), uniforms.scratchStr);
      // 5. Grain — post-bloom, post-scratch (blackLevel applied pre-gamma in buildCRTEffect)
      finalComposite = withScratch.add(grain);
    } else {
      const withScratch = buildScratchNode(withSnow, vec3(scratchLuma), uniforms.scratchStr);
      finalComposite = withScratch.add(grain);
    }

    // Phosphor persistence: blend current frame with previous frame.
    // When persistence = 0 (default), mix(a, b, 0) = a — no visible cost.
    // rtt() renders the blended result to its own managed texture each frame.
    // renderFrame copies that texture to prevRT after each render so the next
    // frame reads the accumulated result — correct exponential phosphor decay.
    const blended  = mix(finalComposite, prevTexNode.rgb, uniforms.persistence);
    const rttBlend = rtt(blended);
    pp.outputNode  = vec4(rttBlend.rgb, 1.0);
    pp._rttBlend   = rttBlend;  // exposed for renderFrame → copyTextureToTexture
    pp._horzRttNode = horzRttNode;  // null = single-pass, non-null = two-pass (mode detection)

    return pp;
  }

  // ── Phosphor persistence helpers ─────────────────────────────────────────

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
    // Persistence RT
    if (prevRT) { try { prevRT.dispose(); } catch (_) {} prevRT = null; }
    if (prevTexNode) prevTexNode.value = _dummyPrevRT.texture;
    _persistW = 0; _persistH = 0;
    postProcessing = null;
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
    const newRenderer = new THREE.WebGPURenderer({ canvas, antialias: true });
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
    // P1-B: update interlace decay factors for inter-frame field blending.
    // decayFactor = exp(-1/(flickerRate * flickerTau)) — same formula as WGSL crtKernel.
    uniforms.interlaceDecay.value   = Math.exp(-1.0 / (uniforms.flickerRate.value * uniforms.flickerTau.value));
    uniforms.interlaceDecayR.value  = Math.exp(-1.0 / (uniforms.flickerRate.value * uniforms.flickerTauR.value));
    uniforms.interlaceDecayG.value  = Math.exp(-1.0 / (uniforms.flickerRate.value * uniforms.flickerTauG.value));
    uniforms.interlaceDecayB.value  = Math.exp(-1.0 / (uniforms.flickerRate.value * uniforms.flickerTauB.value));

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

    // Mode transition: single-pass ↔ two-pass, or source dimensions changed.
    // RTTNode inside PostProcessing is fixed-size — rebuild when mode or src dims change.
    // curTwoPass: null?._horzRttNode is undefined, undefined != null is true... use !! to coerce.
    const curTwoPass = !!(postProcessing?._horzRttNode);
    const srcChanged = needsTwoPass && curTwoPass &&
      (Math.round(effectiveSrc) !== _lastSrcW || Math.round(effectiveSrcH) !== _lastSrcH);

    if (!postProcessing || needsTwoPass !== curTwoPass || srcChanged) {
      disposeCurrentPP();
      postProcessing = buildPostProcessing(renderer, scene, camera,
        needsTwoPass ? Math.round(effectiveSrc) : 0,
        needsTwoPass ? Math.round(effectiveSrcH) : 0);
      _lastSrcW = needsTwoPass ? Math.round(effectiveSrc) : 0;
      _lastSrcH = needsTwoPass ? Math.round(effectiveSrcH) : 0;
      firstRenderDone = false;
      _renderInFlight = false;
      return; // skip frame — next frame renders with fresh pipeline
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

    // Resize detection: rtt() nodes do not auto-resize after first render.
    // Track the canvas size and rebuild the active PostProcessing when it changes.
    {
      const rdrW = renderer.domElement.width;
      const rdrH = renderer.domElement.height;
      if (firstRenderDone && _lastCanvasW > 0 &&
          (rdrW !== _lastCanvasW || rdrH !== _lastCanvasH)) {
        disposeCurrentPP();
        postProcessing = buildPostProcessing(renderer, scene, camera,
          needsTwoPass ? Math.round(effectiveSrc) : 0,
          needsTwoPass ? Math.round(effectiveSrcH) : 0);
        _lastSrcW = needsTwoPass ? Math.round(effectiveSrc) : 0;
        _lastSrcH = needsTwoPass ? Math.round(effectiveSrcH) : 0;
        firstRenderDone = false;
        _renderInFlight = false;
        return; // skip frame — next frame renders with fresh pipeline
      }
      _lastCanvasW = rdrW;
      _lastCanvasH = rdrH;
    }

    try {
      // Single PostProcessing — RTTNode.updateBefore fires automatically:
      //   1. PassNode.updateBefore (FRAME) renders scene at canvas res
      //   2. RTTNode.updateBefore (RENDER) renders horzPass at srcW × srcH (two-pass only)
      //   3. PostProcessing renders main pipeline to canvas using RTTNode's texture
      await postProcessing.renderAsync();

      // Copy rtt output to prevRT when either persistence or interlace field blending is active.
      // Both mechanisms read from prevTexNode to blend with the previous frame.
      const needsPrevTex = uniforms.persistence.value > 0.001 ||
        (uniforms.interlace.value > 0.5 && uniforms.interlaceDecay.value > 0.001);
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
   * @param {number}  [p.maskScale]     mask pitch scale: 1 = native, 1.88 = 14" CRT at 1080p
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
   * @param {number}  [p.persistence]   phosphor afterimage: 0 = off, 0.25 = P22@30fps, 0.45 = P22@60fps
   * @param {number}  [p.persistenceTau]  Phosphor afterglow time constant in seconds. When set,
   *                  overrides p.persistence each frame with blend = exp(−dt / tau), making the
   *                  afterglow frame-rate independent. 0 = disable (clears both tau and blend).
   *                  Typical values: 0.005 = P22 red, 0.010 = P22 green, 0.060 = P45 white.
   *                  Precedence: _persistenceTau > 0 overwrites persistence every frame.
   * @param {number}  [p.maskSmooth]    phosphor stripe profile: 0 = binary (default), 1 = cosine smooth
   */
  function updateFlickerCompensation() {
    // Mean of phosphorDecay over one full frame period:
    //   E[exp(-phase/(τ·f))] = τ·f·(1 - exp(-1/(τ·f)))  for phase ~ U[0,1]
    // This holds because scanline index / src_y ~ U[0, 1/f] so phase ~ U[0,1] after fract().
    // P1-A: per-channel taus — compute luminance-weighted mean across R, G, B channels.
    // flickerBoost = 1 / blend(E[D_luminance], 1.0, flickerAmt) so brightBoost
    // remains perceptually constant regardless of flicker strength or channel distribution.
    const f    = uniforms.flickerRate.value;
    const amt  = uniforms.flickerAmt.value;
    const tauR = uniforms.flickerTauR.value;
    const tauG = uniforms.flickerTauG.value;
    const tauB = uniforms.flickerTauB.value;
    function chanMu(tau) {
      const tf = tau * f;
      return tf < 1e-9 ? 0 : tf * (1 - Math.exp(-1 / tf));
    }
    const muR = chanMu(tauR);
    const muG = chanMu(tauG);
    const muB = chanMu(tauB);
    // BT.709 luminance-weighted mean decay:
    const muLuma = 0.2126 * muR + 0.7152 * muG + 0.0722 * muB;
    const eff = muLuma * amt + (1 - amt);
    uniforms.flickerBoost.value = 1 / eff;
  }

  /**
   * Compute and update the mask energy compensation factor.
   * Automatically called by setShader() when maskStr, maskSmooth, maskType, or autoMaskBoost changes.
   * P2-C: compensates for aperture transmittance loss so perceived brightness is constant
   * regardless of maskStr setting.
   */
  function updateMaskBoost() {
    const maskStr    = uniforms.maskStr.value;
    const maskSmooth = uniforms.maskSmooth.value;
    const maskType   = Math.round(uniforms.maskType.value);
    if (maskStr < 0.001) { uniforms.maskBoostFactor.value = 1.0; return; }
    // Multi-channel average aperture transmittance per mask type and smooth factor.
    // At any pixel, one of three channels is near peak and two are at floor (0.1; 0.3 for CGWG).
    // (Numerically integrated over full mask periods, all three channels.)
    //                     [AG    SM    Slot  AG+DW Delta VGA   HiAG  CGWG]
    const avgBinaryMap = [0.40, 0.25, 0.31, 0.40, 0.25, 0.40, 0.40, 0.65];
    const avgSmoothMap = [0.25, 0.17, 0.30, 0.25, 0.17, 0.32, 0.25, 0.65];
    const idx = Math.max(0, Math.min(7, maskType));
    const avgBinary = avgBinaryMap[idx];
    const avgSmooth = avgSmoothMap[idx];
    const avg       = avgBinary * (1 - maskSmooth) + avgSmooth * maskSmooth;
    // mix(vec3(1), mask, maskStr) → pipeline avg = 1 - maskStr + maskStr * avg
    const pipelineAvg = 1.0 - maskStr + maskStr * avg;
    uniforms.maskBoostFactor.value = 1.0 / Math.max(pipelineAvg, 0.001);
  }

  // Prime both compensation values from initial uniform values.
  updateMaskBoost();

  function setShader({
    hardPix, hardScan, warpMult, maskStr, maskType, grainAmt,
    halationStr, halationSharp, convergence, scratchStr, scrollRate, brightBoost,
    swimAmt, colorTempStr, snowAmt, rollbarScroll, sagGeom,
    maskScale, defocusAmt, p22Str, flickerRate, flickerTau,
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
    // Interference pass params (SPEC-glitch-interference-v2)
    humAmt, humBars, humRate,
    dotCrawlAmt,
    ghostOffset, ghostStr, ghostTintR, ghostTintG, ghostTintB,
    glitchBurstLoss,
    vbiStr, vbiLines,
    agcAmt, agcRate,
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
    }
    // update mask energy compensation whenever mask parameters change
    if (maskStr !== undefined || maskType !== undefined) updateMaskBoost();
    if (grainAmt      !== undefined) uniforms.grainAmt.value      = grainAmt;
    if (halationStr   !== undefined) uniforms.halationStr.value   = halationStr;
    if (halationSharp !== undefined) uniforms.halationSharp.value = halationSharp;
    if (convergence   !== undefined) uniforms.convergence.value   = convergence;
    if (convStaticX   !== undefined) uniforms.convStaticX.value   = convStaticX;
    if (convStaticY   !== undefined) uniforms.convStaticY.value   = convStaticY;
    if (convBX        !== undefined) uniforms.convBX.value        = convBX;
    if (convBY        !== undefined) uniforms.convBY.value        = convBY;
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
    if (maskScale     !== undefined) uniforms.maskScale.value     = maskScale;
    if (defocusAmt    !== undefined) uniforms.defocusAmt.value    = defocusAmt;
    if (p22Str        !== undefined) uniforms.p22Str.value        = p22Str;
    if (flickerRate   !== undefined) uniforms.flickerRate.value   = flickerRate;
    if (flickerTau    !== undefined) {
      // Shorthand: set all three channels to the same tau value.
      uniforms.flickerTau.value    = flickerTau;
      uniforms.flickerTauR.value   = flickerTau;
      uniforms.flickerTauG.value   = flickerTau;
      uniforms.flickerTauB.value   = flickerTau;
    }
    // P1-A: per-channel tau overrides (override the shorthand values when set individually).
    if (flickerTauR   !== undefined) uniforms.flickerTauR.value   = flickerTauR;
    if (flickerTauG   !== undefined) uniforms.flickerTauG.value   = flickerTauG;
    if (flickerTauB   !== undefined) uniforms.flickerTauB.value   = flickerTauB;
    if (flickerAmt    !== undefined) uniforms.flickerAmt.value    = flickerAmt;
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
    if (sourceSizeX   !== undefined) { uniforms.sourceSizeX.value = sourceSizeX; _userSetSourceSize = sourceSizeX > 0.5; }
    if (sourceSizeY   !== undefined) uniforms.sourceSizeY.value   = sourceSizeY;
    if (interlace !== undefined) {
      uniforms.interlace.value = interlace ? 1.0 : 0.0;
      if (!interlace) uniforms.interlaceField.value = 0.0;  // reset field parity on disable
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
    if (!bloomEnabled) {
      if (!_bloomNotInitWarned) {
        _bloomNotInitWarned = true;
        console.warn('telescreen-crt-webgpu: setBloom() called but opts.bloom was not provided at init.');
      }
      return;
    }
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
  }

  return {
    // Getter so the property reflects the live instance after device-loss recovery,
    // which rebinds the closure variable `postProcessing` to a new object.
    get postProcessing() { return postProcessing; },
    setGlitch,
    setShader,
    setBloom,
    setVideoSource,
    renderFrame,
    destroy,
  };
}
