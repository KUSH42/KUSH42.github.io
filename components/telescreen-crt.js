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
// corner masking, convergence error, and CRT gamma (γ=2.5).
const FS = `
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform vec2  iResolution;
  uniform float uTime;
  uniform vec2  uImgOffset;
  uniform vec2  uImgScale;
  varying vec2  vUv;

  const float hardPix    = -1.2;
  const vec2  warp       = vec2(1.0/96.0, 1.0/72.0);
  const float maskDark   = 0.5;
  const float maskLight  = 1.5;
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
    highp float mag  = 0.0007 * dot(dir, dir); // quadratic: zero at centre, grows to corners
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
    float wb = Gaus(dst - 1.0, hardPix);
    float wc = Gaus(dst + 0.0, hardPix);
    float wd = Gaus(dst + 1.0, hardPix);
    return (b*wb + c*wc + d*wd) / (wb + wc + wd);
  }

  vec3 Horz5(vec2 pos, float off) {
    vec3 a = FetchConv(pos, vec2(-2.0, off));
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    vec3 e = FetchConv(pos, vec2( 2.0, off));
    float dst = Dist(pos).x;
    float wa = Gaus(dst - 2.0, hardPix);
    float wb = Gaus(dst - 1.0, hardPix);
    float wc = Gaus(dst + 0.0, hardPix);
    float wd = Gaus(dst + 1.0, hardPix);
    float we = Gaus(dst + 2.0, hardPix);
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
    pos *= vec2(1.0 + pos.y * pos.y * warp.x, 1.0 + pos.x * pos.x * warp.y);
    return pos * 0.5 + 0.5;
  }

  // Aperture grille: tight vertical R/G/B stripe triads (Trinitron-style).
  vec3 Mask(vec2 pos) {
    float stripe = fract(pos.x / 3.0) * 3.0;
    vec3 mask = vec3(maskDark);
    if      (stripe < 1.0) mask.r = maskLight;
    else if (stripe < 2.0) mask.g = maskLight;
    else                    mask.b = maskLight;
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

  void main() {
    vec2 pos = Warp(vUv);

    // 1. Scanline rendering with dynamic beam width
    vec3 col = Tri(pos);

    // 2. Phosphor mask (screen-layer effect)
    col *= Mask(gl_FragCoord.xy);

    // 3. Halation (glass-layer backscatter — above mask, not stripe-modulated)
    vec3 halo     = Horz5(pos, 0.0) * Gaus(Dist(pos).y, -2.5);
    vec3 halation = max(vec3(0.0), halo - 0.35) * vec3(0.18, 0.12, 0.08);
    col += halation;

    // 4. Film grain
    float grain = (hash(gl_FragCoord.xy + fract(uTime * 73.0)) * 2.0 - 1.0) * 0.04;
    col += grain;

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
      res:       gl.getUniformLocation(prog, 'iResolution'),
      time:      gl.getUniformLocation(prog, 'uTime'),
      imgOffset: gl.getUniformLocation(prog, 'uImgOffset'),
      imgScale:  gl.getUniformLocation(prog, 'uImgScale'),
      diffuse:   gl.getUniformLocation(prog, 'tDiffuse'),
    };

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uLocs.diffuse, 0);

    Object.assign(glState, { prog, buf, tex, aPos, uLocs });
  }

  initGL();

  let texReady = false;
  let startTime = null;
  let contextLost = false;
  let animId = 0;

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
  };
}
