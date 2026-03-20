/**
 * components/telescreen-crt.js
 * WebGL CRT shader feed renderer (based on Timothy Lottes, public domain).
 *
 * Usage:
 *   import { initTelescreenCRT } from './components/telescreen-crt.js';
 *   const crt = initTelescreenCRT(srcImg, feedCanvas, glowCanvas);
 *   crt.destroy();
 */

const VS = `
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`;

// PUBLIC DOMAIN CRT STYLED SCAN-LINE SHADER by Timothy Lottes
// Enhanced with dynamic beam width, halation, aperture grille mask,
// corner masking, convergence error, CRT gamma (γ=2.5),
// optional glitch distortion, and optional chromatic aberration.
const FS = `
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform vec2  iResolution;
  uniform float uTime;
  uniform vec2  uImgOffset;
  uniform vec2  uImgScale;
  varying vec2  vUv;

  // ── Glitch uniforms ──────────────────────────────────────────
  uniform float uGlitchEnabled;   // 0 or 1
  uniform float uGlitchStrength;  // 0 – 0.10, horizontal shift amount
  uniform float uGlitchSpeed;     // 1 – 30, block-pattern change rate (blocks/sec)
  uniform float uGlitchCols;      // 10 – 80, number of horizontal glitch bands

  // ── CRT shader uniforms ───────────────────────────────────────
  uniform float uHardPix;      // scanline sharpness, negative: -0.5 (soft) – -3.0 (sharp)
  uniform float uWarpMult;     // barrel distortion multiplier: 0 = flat, 1 = default, 2 = strong
  uniform float uMaskStr;      // phosphor mask strength: 0 = off, 1 = full
  uniform float uGrainAmt;     // film grain amount: 0 – 0.15
  uniform float uHalationStr;  // phosphor halation strength: 0 = off, 1 = default
  uniform float uConvergence;  // convergence error: 0 = off, 0.01 = subtle, 0.1 = obvious
  uniform sampler2D tScratch;  // glass scratch overlay (screen blend)
  uniform float uScratchStr;   // scratch opacity: 0 = off, 0.35 = default

  const float scrollRate = 0.325; // scanlines/sec

  float ToLinear1(float c) {
    return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4);
  }
  vec3 ToLinear(vec3 c) {
    return vec3(ToLinear1(c.r), ToLinear1(c.g), ToLinear1(c.b));
  }

  // Map screen pos to image UV, snap to CRT grid in image space so the
  // quantization grid is locked to the source content (no tearing on transform).
  vec3 Fetch(vec2 pos, vec2 off) {
    if (max(abs(pos.x - 0.5), abs(pos.y - 0.5)) > 0.5) return vec3(0.0);
    vec2 uv = (pos - uImgOffset) / uImgScale;
    uv = floor(uv * iResolution + off) / iResolution;
    return ToLinear(texture2D(tDiffuse, uv).rgb);
  }

  // Convergence-offset fetch: R/B channels displaced radially from screen centre.
  // Uses highp for the UV arithmetic — the ~0.000175 displacement is below mediump
  // resolution near pos=1.0 and would be silently zeroed without it.
  // Falls back to the centre sample for any channel whose displaced position exits
  // the image bounds, preventing coloured fringe tears at content edges.
  vec3 FetchConv(vec2 pos, vec2 off) {
    highp vec2  hpos = pos;
    highp vec2  dir  = hpos - 0.5;
    highp float mag  = uConvergence * dot(dir, dir); // quadratic: zero at centre, grows to corners
    vec2 rPos = vec2(hpos + dir *  mag);
    vec2 bPos = vec2(hpos + dir * -mag);
    vec3 center = Fetch(pos,  off);
    float r = max(abs(rPos.x - 0.5), abs(rPos.y - 0.5)) > 0.5 ? center.r : Fetch(rPos, off).r;
    float b = max(abs(bPos.x - 0.5), abs(bPos.y - 0.5)) > 0.5 ? center.b : Fetch(bPos, off).b;
    return vec3(r, center.g, b);
  }

  vec2 Dist(vec2 pos) {
    // Both axes in image space so Gaussian weights align with the Fetch() pixel grid.
    // Screen-space vertical caused seams at fractional image scales.
    vec2 uv = (pos - uImgOffset) / uImgScale;
    float dx = uv.x * iResolution.x;
    float dy = uv.y * iResolution.y + uTime * scrollRate;
    return -vec2((dx - floor(dx)) - 0.5, (dy - floor(dy)) - 0.5);
  }

  float Gaus(float pos, float scale) { return exp2(scale * pos * pos); }

  float Luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

  vec3 Horz3(vec2 pos, float off) {
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    float dst = Dist(pos).x;
    float wb = Gaus(dst - 1.0, uHardPix);
    float wc = Gaus(dst + 0.0, uHardPix);
    float wd = Gaus(dst + 1.0, uHardPix);
    return (b*wb + c*wc + d*wd) / (wb + wc + wd);
  }

  vec3 Horz5(vec2 pos, float off) {
    vec3 a = FetchConv(pos, vec2(-2.0, off));
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    vec3 e = FetchConv(pos, vec2( 2.0, off));
    float dst = Dist(pos).x;
    float wa = Gaus(dst - 2.0, uHardPix);
    float wb = Gaus(dst - 1.0, uHardPix);
    float wc = Gaus(dst + 0.0, uHardPix);
    float wd = Gaus(dst + 1.0, uHardPix);
    float we = Gaus(dst + 2.0, uHardPix);
    return (a*wa + b*wb + c*wc + d*wd + e*we) / (wa + wb + wc + wd + we);
  }

  // Dynamic beam width: centre row luma drives scanline hardness.
  // Dark signal → narrow beam (hardScan=-12); bright signal → wide beam (hardScan=-4).
  vec3 Tri(vec2 pos) {
    vec3 b = Horz5(pos,  0.0);
    float luma    = clamp(Luma(b), 0.0, 1.0);
    float dynScan = mix(-12.0, -4.0, luma);

    vec3 a = Horz3(pos, -1.0);
    vec3 c = Horz3(pos,  1.0);
    return a * Gaus(Dist(pos).y + (-1.0), dynScan)
         + b * Gaus(Dist(pos).y +   0.0,  dynScan)
         + c * Gaus(Dist(pos).y +   1.0,  dynScan);
  }

  vec2 Warp(vec2 pos) {
    pos = pos * 2.0 - 1.0;
    vec2 warpAmt = vec2(1.0/96.0, 1.0/72.0) * uWarpMult;
    pos *= vec2(1.0 + pos.y * pos.y * warpAmt.x, 1.0 + pos.x * pos.x * warpAmt.y);
    return pos * 0.5 + 0.5;
  }

  // Aperture grille: tight vertical R/G/B stripe triads (Trinitron-style).
  vec3 Mask(vec2 pos) {
    float stripe = fract(pos.x / 3.0) * 3.0;
    vec3 mask = vec3(0.5);
    if      (stripe < 1.0) mask.r = 1.5;
    else if (stripe < 2.0) mask.g = 1.5;
    else                    mask.b = 1.5;
    return mask;
  }

  float hash(vec2 p) {
    vec2 s = fract(p * vec2(0.1031, 0.1030));
    s += dot(s, s.yx + 33.33);
    return fract((s.x + s.y) * s.x);
  }

  // Smooth bezel fade over r=0.018 band inside each screen edge.
  // Coexists safely with Fetch()'s hard clip: outside [0,1] both return 0.
  float cornerMask(vec2 pos) {
    const float r = 0.018;
    float bx = smoothstep(0.0, r, pos.x) * smoothstep(0.0, r, 1.0 - pos.x);
    float by = smoothstep(0.0, r, pos.y) * smoothstep(0.0, r, 1.0 - pos.y);
    return bx * by;
  }

  // CRT phosphor gamma (γ=2.5) — slightly punchier shadows than sRGB (γ≈2.4).
  vec3 ToCrtGamma(vec3 c) {
    return pow(max(c, vec3(0.0)), vec3(1.0 / 2.5));
  }

  // ── Glitch: hash-driven horizontal band displacement ─────────
  float glitchHash(float n) { return fract(sin(n) * 43758.5453123); }

  vec2 applyGlitch(vec2 uv) {
    if (uGlitchEnabled < 0.5 || uGlitchStrength < 0.0001) return uv;
    float t    = floor(uTime * uGlitchSpeed);
    float band = floor(uv.y * uGlitchCols);
    float h1   = glitchHash(band * 137.3 + t);
    float h2   = glitchHash(band *  91.7 + t + 1.0);
    // ~15 % of bands receive a horizontal shift; a rare 3 % get a large tear
    if (h1 > 0.85) {
      float xOff = (h2 * 2.0 - 1.0) * uGlitchStrength;
      uv.x = fract(uv.x + xOff);
    } else if (h1 < 0.03) {
      uv.x = fract(uv.x + (glitchHash(band + t * 7.3) - 0.5) * uGlitchStrength * 3.0);
    }
    return uv;
  }

  void main() {
    vec2 pos = Warp(vUv);

    // 0. Glitch distortion (before any texture sampling)
    pos = applyGlitch(pos);

    // 1. Scanline rendering with dynamic beam width
    vec3 col = Tri(pos);

    // 2. Phosphor mask (screen-layer effect)
    col *= mix(vec3(1.0), Mask(gl_FragCoord.xy), uMaskStr);

    // 3. Halation (glass-layer backscatter — above mask, not stripe-modulated)
    vec3 halo     = Horz5(pos, 0.0) * Gaus(Dist(pos).y, -2.5);
    vec3 halation = max(vec3(0.0), halo - 0.35) * vec3(0.18, 0.12, 0.08) * uHalationStr;
    col += halation;

    // 4. Film grain
    float grain = (hash(gl_FragCoord.xy + fract(uTime * 73.0)) * 2.0 - 1.0) * uGrainAmt;
    col += grain;

    // 4b. Glass scratches (screen blend, locked to screen-space not image-space)
    if (uScratchStr > 0.001) {
      vec3 sTex = texture2D(tScratch, vUv).rgb;
      col = 1.0 - (1.0 - col) * (1.0 - sTex * uScratchStr);
    }

    // 5. Corner masking (bezel/overscan fade)
    col *= cornerMask(pos);

    // 6. CRT gamma encode
    col = ToCrtGamma(col);

    gl_FragColor = vec4(col, 1.0);
  }`;

function makeShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error('Telescreen shader error:', gl.getShaderInfoLog(s));
  return s;
}

/**
 * Mount the WebGL CRT feed renderer.
 * @param {HTMLImageElement}  srcImg  - source image element
 * @param {HTMLCanvasElement} feedCvs - WebGL canvas
 * @param {HTMLCanvasElement} glowCvs - 2D glow canvas
 * @returns {{ destroy(): void }}
 */
export function initTelescreenCRT(srcImg, feedCvs, glowCvs) {
  const gl = feedCvs.getContext('webgl');
  if (!gl) {
    console.warn('Telescreen: WebGL not available');
    return { destroy() {} };
  }
  const glowCtx = glowCvs.getContext('2d');

  // All GL state in a mutable object — rebuilt on context restore
  const glState = { prog: null, buf: null, tex: null, aPos: -1, uLocs: {} };

  function initGL() {
    const prog = gl.createProgram();
    gl.attachShader(prog, makeShader(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, makeShader(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uLocs = {
      res:            gl.getUniformLocation(prog, 'iResolution'),
      time:           gl.getUniformLocation(prog, 'uTime'),
      imgOffset:      gl.getUniformLocation(prog, 'uImgOffset'),
      imgScale:       gl.getUniformLocation(prog, 'uImgScale'),
      diffuse:        gl.getUniformLocation(prog, 'tDiffuse'),
      glitchEnabled:  gl.getUniformLocation(prog, 'uGlitchEnabled'),
      glitchStrength: gl.getUniformLocation(prog, 'uGlitchStrength'),
      glitchSpeed:    gl.getUniformLocation(prog, 'uGlitchSpeed'),
      glitchCols:     gl.getUniformLocation(prog, 'uGlitchCols'),
      hardPix:        gl.getUniformLocation(prog, 'uHardPix'),
      warpMult:       gl.getUniformLocation(prog, 'uWarpMult'),
      maskStr:        gl.getUniformLocation(prog, 'uMaskStr'),
      grainAmt:       gl.getUniformLocation(prog, 'uGrainAmt'),
      halationStr:    gl.getUniformLocation(prog, 'uHalationStr'),
      convergence:    gl.getUniformLocation(prog, 'uConvergence'),
      scratch:        gl.getUniformLocation(prog, 'tScratch'),
      scratchStr:     gl.getUniformLocation(prog, 'uScratchStr'),
    };

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uLocs.diffuse, 0);
    gl.uniform1i(uLocs.scratch, 1); // tScratch → TEXTURE1

    // Scratch texture — placeholder 1×1 black; real image uploaded by uploadScratch()
    const scratchTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, scratchTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.activeTexture(gl.TEXTURE0);

    Object.assign(glState, { prog, buf, tex, scratchTex, aPos, uLocs });
  }

  initGL();

  // Load scratch overlay image; re-upload on context restore
  function uploadScratch() {
    if (!scratchImg.complete || !scratchImg.naturalWidth || !glState.scratchTex) return;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glState.scratchTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scratchImg);
    gl.activeTexture(gl.TEXTURE0);
  }
  const scratchImg = new Image();
  scratchImg.onload = uploadScratch;
  scratchImg.src = '/data/scratches.jpg';

  let texReady = false;
  let startTime = null;
  let contextLost = false;
  let animId = 0;

  // Effect parameters (mutated by setGlitch / setShader)
  const cfg = {
    glitchEnabled: 0, glitchStrength: 0.025, glitchSpeed: 8, glitchCols: 30,
    hardPix: -1.2, warpMult: 1.0, maskStr: 1.0,
    grainAmt: 0.04, halationStr: 1.0, convergence: 0.01, scratchStr: 0.35,
  };

  function uploadTexture() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glState.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, srcImg);
    texReady = true;
  }

  function imgRect(cw, ch, sw, sh) {
    const scale = Math.max(cw / sw, ch / sh) * 0.8;
    const dw = sw * scale, dh = sh * scale;
    return { ox: (cw - dw) / 2 / cw, oy: (ch - dh) / 2 / ch, sx: dw / cw, sy: dh / ch };
  }

  function sizeFeed() {
    const w = feedCvs.clientWidth || 576;
    const h = feedCvs.clientHeight || 432;
    feedCvs.width = w;  feedCvs.height = h;
    glowCvs.width = w;  glowCvs.height = h;
    if (!contextLost) gl.viewport(0, 0, w, h);
  }

  function drawGlow() {
    if (!srcImg.naturalWidth) return;
    const cw = glowCvs.width, ch = glowCvs.height;
    const sw = srcImg.naturalWidth, sh = srcImg.naturalHeight;
    const scale = Math.max(cw / sw, ch / sh) * 0.8;
    const dw = sw * scale, dh = sh * scale;
    glowCtx.clearRect(0, 0, cw, ch);
    glowCtx.drawImage(srcImg, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  // WebGL context loss recovery
  feedCvs.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    contextLost = true;
  });
  feedCvs.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    texReady = false;
    initGL();
    sizeFeed();
    uploadTexture();
    uploadScratch();
  });

  function render(ts) {
    animId = requestAnimationFrame(render);
    if (!startTime) startTime = ts;
    const t = (ts - startTime) / 1000;

    if (texReady && !contextLost) {
      const cw = feedCvs.width, ch = feedCvs.height;
      const sw = srcImg.naturalWidth, sh = srcImg.naturalHeight;
      const resY = ch / 1.0, resX = (cw / ch) * resY;
      gl.uniform2f(glState.uLocs.res, resX, resY);
      gl.uniform1f(glState.uLocs.time, t);
      const r = imgRect(cw, ch, sw, sh);
      gl.uniform2f(glState.uLocs.imgOffset, r.ox, r.oy);
      gl.uniform2f(glState.uLocs.imgScale, r.sx, r.sy);
      gl.uniform1f(glState.uLocs.glitchEnabled,  cfg.glitchEnabled);
      gl.uniform1f(glState.uLocs.glitchStrength, cfg.glitchStrength);
      gl.uniform1f(glState.uLocs.glitchSpeed,    cfg.glitchSpeed);
      gl.uniform1f(glState.uLocs.glitchCols,     cfg.glitchCols);
      gl.uniform1f(glState.uLocs.hardPix,        cfg.hardPix);
      gl.uniform1f(glState.uLocs.warpMult,       cfg.warpMult);
      gl.uniform1f(glState.uLocs.maskStr,        cfg.maskStr);
      gl.uniform1f(glState.uLocs.grainAmt,       cfg.grainAmt);
      gl.uniform1f(glState.uLocs.halationStr,    cfg.halationStr);
      gl.uniform1f(glState.uLocs.convergence,    cfg.convergence);
      gl.uniform1f(glState.uLocs.scratchStr,     cfg.scratchStr);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, glState.scratchTex);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, glState.tex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      drawGlow();
    }
  }

  function boot() {
    sizeFeed();
    uploadTexture();
    drawGlow();
    animId = requestAnimationFrame(render);
  }

  if (srcImg.complete && srcImg.naturalWidth) boot();
  else srcImg.addEventListener('load', boot);

  const ro = new ResizeObserver(() => { sizeFeed(); drawGlow(); });
  ro.observe(feedCvs);

  return {
    destroy() {
      cancelAnimationFrame(animId);
      ro.disconnect();
    },
    /**
     * @param {boolean} enabled
     * @param {number}  [strength] 0–0.10 horizontal shift amount
     * @param {number}  [speed]    1–30 block-change rate (blocks/sec)
     * @param {number}  [cols]     10–80 number of horizontal bands
     */
    setGlitch(enabled, strength, speed, cols) {
      cfg.glitchEnabled = enabled ? 1 : 0;
      if (strength !== undefined) cfg.glitchStrength = strength;
      if (speed    !== undefined) cfg.glitchSpeed    = speed;
      if (cols     !== undefined) cfg.glitchCols     = cols;
    },
    /**
     * Tune CRT shader constants.
     * @param {Object} p
     * @param {number} [p.hardPix]     scanline sharpness, negative: -0.5 (soft) to -3.0 (sharp)
     * @param {number} [p.warpMult]    barrel distortion: 0 = flat, 1 = default, 2 = strong
     * @param {number} [p.maskStr]     phosphor mask: 0 = off, 1 = full
     * @param {number} [p.grainAmt]    film grain: 0 – 0.15
     * @param {number} [p.halationStr] halation: 0 = off, 1 = default, 2 = heavy
     * @param {number} [p.convergence] convergence error: 0 = off, 0.0007 = default
     */
    setShader({ hardPix, warpMult, maskStr, grainAmt, halationStr, convergence, scratchStr } = {}) {
      if (hardPix     !== undefined) cfg.hardPix     = hardPix;
      if (warpMult    !== undefined) cfg.warpMult    = warpMult;
      if (maskStr     !== undefined) cfg.maskStr     = maskStr;
      if (grainAmt    !== undefined) cfg.grainAmt    = grainAmt;
      if (halationStr !== undefined) cfg.halationStr = halationStr;
      if (convergence !== undefined) cfg.convergence = convergence;
      if (scratchStr  !== undefined) cfg.scratchStr  = scratchStr;
    },
  };
}
