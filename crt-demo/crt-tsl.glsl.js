/**
 * crt-tsl.glsl.js
 * GLSL ES 3.0 shader functions for the non-kernel CRT stages.
 * Translated from crt-tsl.js — functionally identical.
 * Replaces wgslFn with glslFn for Three.js WebGL2 backend compatibility.
 *
 * Contains only the shader-language-specific exports. Pure-TSL builders
 * (buildWarpNode, buildCornerMaskNode, buildGammaNode, buildScratchNode,
 *  buildP22MatrixNode, buildColorTempNode, buildTensionWireNode) are in crt-tsl.js.
 *
 * GLSL requires helpers declared before callers (no forward references).
 * GLSLNodeFunction identifies the last function as the entry point.
 */

import { glslFn } from 'three/tsl';

// ---------------------------------------------------------------------------
// 2. Lanczos-resampled phosphor mask LUT -- glslFn (F-8 Moiré elimination)
//     Helpers before entry per CLAUDE.md glslFn source ordering rule (GLSLNodeFunction
//     identifies the last function as entry point).
// ---------------------------------------------------------------------------
export const buildMaskLutFn = glslFn(/* glsl */`
float lanczos3(float x) {
  float ax = abs(x);
  if (ax >= 3.0) { return 0.0; }
  if (ax < 0.0001) { return 1.0; }
  float PI = 3.14159265358979;
  float px = PI * ax;
  return (sin(px) / px) * (sin(px / 3.0) / (px / 3.0));
}

vec3 analyticalMaskTap(int k, int r, int maskType, float maskSmooth) {
  float PI = 3.14159265;
  if (maskType == 1) {
    int col_idx    = ((k % 6) + 6) % 6;
    int row_idx    = r % 2;
    int rowShifted = row_idx + ((col_idx >= 3) ? 1 : 0);
    int shifted    = (col_idx + (rowShifted % 2) * 3) % 6;
    float yShift   = (col_idx >= 3) ? 1.0 : 0.0;
    vec3 mask = vec3(0.1);
    int k_mod2 = ((k % 2) + 2) % 2;
    float cx   = (k_mod2 == 1) ? 0.5 : -0.5;
    float cy   = fract((float(r % 2) + 0.5 + yShift) / 2.0) * 2.0 - 1.0;
    if (maskSmooth < 0.001) {
      float dotW = clamp(1.0 - abs(cx), 0.0, 1.0) * clamp(1.0 - abs(cy), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      float dotS = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
                 * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }
  if (maskType == 7) {
    int odd   = ((k % 2) + 2) % 2;
    float fk2 = (odd == 1) ? 0.5 : 0.0;
    float t   = cos(fk2 * 2.0 * PI) * 0.5 + 0.5;
    float hi  = mix(0.3, 1.0, t);
    float lo  = mix(1.0, 0.3, t);
    vec3 bm   = (odd == 0) ? vec3(1.0, 0.3, 1.0) : vec3(0.3, 1.0, 0.3);
    return mix(bm, vec3(hi, lo, hi), maskSmooth);
  }
  if (maskType == 6) {
    int px6   = ((k % 6) + 6) % 6;
    float fpx6 = float(px6);
    vec3 mask = vec3(0.1);
    if (px6 < 2) { mask.r = 1.0; }
    else if (px6 < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      float drC = min(min(abs(fpx6 - 1.0), 6.0 - fpx6 + 1.0), 1.0);
      float dgC = min(abs(fpx6 - 3.0), 1.0);
      float dbC = min(abs(fpx6 - 5.0), 1.0);
      float rw  = clamp(cos(drC * PI) * 0.45 + 0.55, 0.1, 1.0);
      float gw  = clamp(cos(dgC * PI) * 0.45 + 0.55, 0.1, 1.0);
      float bw  = clamp(cos(dbC * PI) * 0.45 + 0.55, 0.1, 1.0);
      mask = mix(mask, vec3(rw, gw, bw), maskSmooth);
    }
    return mask;
  }
  if (maskType == 5) {
    int stagger = (r / 2) * 3;
    int qk      = k + stagger;
    int col_idx = ((qk % 6) + 6) % 6;
    vec3 mask = vec3(0.1);
    if (col_idx < 2) { mask.r = 1.0; }
    else if (col_idx < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    if (maskSmooth >= 0.001) {
      int k_mod2  = ((k % 2) + 2) % 2;
      float fx    = (k_mod2 == 1) ? 0.5 : -0.5;
      float fy    = float(r % 2) - 1.0;
      float gridX = clamp(cos(fx * PI) * 0.3 + 0.7, 0.1, 1.0);
      float gridY = clamp(cos(fy * PI) * 0.3 + 0.7, 0.1, 1.0);
      mask = mix(vec3(0.1), mask, gridX * gridY);
    }
    return mask;
  }
  if (maskType == 4) {
    int col_idx = ((k % 6) + 6) % 6;
    int row_idx = r % 3;
    int shifted = (col_idx + row_idx * 2) % 6;
    vec3 mask = vec3(0.1);
    if (maskSmooth < 0.001) {
      int k_mod2  = ((k % 2) + 2) % 2;
      float cx    = (k_mod2 == 1) ? 0.5 : -0.5;
      float dotW  = clamp(1.0 - abs(cx), 0.0, 1.0);
      if (shifted < 2) { mask.r = max(0.1, dotW); }
      else if (shifted < 4) { mask.g = max(0.1, dotW); }
      else { mask.b = max(0.1, dotW); }
    } else {
      int k_mod2  = ((k % 2) + 2) % 2;
      float cx    = (k_mod2 == 1) ? 0.5 : -0.5;
      float yPhase = float(col_idx / 2) / 3.0;
      float cy    = fract((float(r % 3) + 0.5) / 3.0 + yPhase) * 2.0 - 1.0;
      float dotS  = clamp(cos(cx * PI) * 0.45 + 0.55, 0.1, 1.0)
                  * clamp(cos(cy * PI) * 0.45 + 0.55, 0.1, 1.0);
      if (shifted < 2) { mask.r = dotS; }
      else if (shifted < 4) { mask.g = dotS; }
      else { mask.b = dotS; }
    }
    return mask;
  }
  if (maskType == 3) {
    int px3   = ((k % 3) + 3) % 3;
    float fpx3 = float(px3);
    vec3 binaryMask = vec3(0.1);
    float aper_r = clamp(min(0.5, fpx3 + 0.5) - max(-0.5, fpx3 - 0.5), 0.0, 1.0);
    float aper_g = clamp(min(1.5, fpx3 + 0.5) - max(0.5,  fpx3 - 0.5), 0.0, 1.0);
    float aper_b = clamp(min(2.5, fpx3 + 0.5) - max(1.5,  fpx3 - 0.5), 0.0, 1.0);
    if (px3 == 0) { binaryMask.r = mix(0.1, 1.0, aper_r); }
    else if (px3 == 1) { binaryMask.g = mix(0.1, 1.0, aper_g); }
    else { binaryMask.b = mix(0.1, 1.0, aper_b); }
    if (maskSmooth < 0.001) { return binaryMask; }
    float drT = min(min(fpx3, 3.0 - fpx3), 0.5);
    float dgT = min(abs(fpx3 - 1.0), 0.5);
    float dbT = min(abs(fpx3 - 2.0), 0.5);
    float rwT = clamp(cos(drT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    float gwT = clamp(cos(dgT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    float bwT = clamp(cos(dbT * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
    return mix(binaryMask, vec3(rwT, gwT, bwT), maskSmooth);
  }
  if (maskType == 2) {
    int col_idx = ((k % 6) + 6) % 6;
    vec3 mask = vec3(0.1);
    if (col_idx < 2) { mask.r = 1.0; }
    else if (col_idx < 4) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    float row_frac = float(r % 2) / 2.0;
    if (maskSmooth < 0.001) {
      float row_weight = (row_frac >= 0.5) ? 0.4 : 1.0;
      mask = mix(vec3(0.1), mask, row_weight);
    } else {
      float ry          = row_frac * 2.0 - 1.0;
      float row_weightS = 0.7 * (cos(ry * PI) * 0.5 + 0.5) + 0.3;
      mask = mix(vec3(0.1), mask, row_weightS);
    }
    return mask;
  }
  // Type 0 (default): aperture grille (3px period, 1px aperture per channel).
  int px3   = ((k % 3) + 3) % 3;
  float fpx3 = float(px3);
  vec3 binaryMask = vec3(0.1);
  float aper0_r = clamp(min(0.5, fpx3 + 0.5) - max(-0.5, fpx3 - 0.5), 0.0, 1.0);
  float aper0_g = clamp(min(1.5, fpx3 + 0.5) - max(0.5,  fpx3 - 0.5), 0.0, 1.0);
  float aper0_b = clamp(min(2.5, fpx3 + 0.5) - max(1.5,  fpx3 - 0.5), 0.0, 1.0);
  if (px3 == 0) { binaryMask.r = mix(0.1, 1.0, aper0_r); }
  else if (px3 == 1) { binaryMask.g = mix(0.1, 1.0, aper0_g); }
  else { binaryMask.b = mix(0.1, 1.0, aper0_b); }
  if (maskSmooth < 0.001) { return binaryMask; }
  float dr = min(min(fpx3, 3.0 - fpx3), 0.5);
  float dg = min(abs(fpx3 - 1.0), 0.5);
  float db = min(abs(fpx3 - 2.0), 0.5);
  float rw = clamp(cos(dr * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  float gw = clamp(cos(dg * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  float bw = clamp(cos(db * 2.0 * PI) * 0.45 + 0.55, 0.1, 1.0);
  return mix(binaryMask, vec3(rw, gw, bw), maskSmooth);
}

#pragma main
vec4 buildMaskLutFn(vec2 uv, float effectiveMaskScale, int maskType,
                    float maskSmooth, float outputW) {
  float cx  = uv.x * outputW - 0.5;
  // DR-15 P0-A: 12-row LUT, r cycles 0..11.
  int r     = min(int(uv.y * 12.0), 11);
  float x_src = cx / max(effectiveMaskScale, 0.01);
  vec3 acc = vec3(0.0);
  for (int dk = -2; dk <= 3; dk++) {
    int k   = int(floor(x_src)) + dk;
    float dx = x_src - float(k);
    float w  = lanczos3(dx);
    acc += analyticalMaskTap(k, r, maskType, maskSmooth) * w;
  }
  float floorVal = (maskType == 7) ? 0.3 : 0.1;
  return vec4(clamp(acc, vec3(floorVal), vec3(1.0)), 1.0);
}
`);

// ---------------------------------------------------------------------------
// 3. Film grain -- glslFn
// ---------------------------------------------------------------------------
export const grainFn = glslFn(/* glsl */`
vec3 grainFn(vec2 pixelCoord, float t, float grainAmt, vec3 col) {
  float tOff = fract(t * 97.0) * 100.0;
  vec3 q = fract(vec3(pixelCoord.x, pixelCoord.y, tOff) * vec3(0.1031, 0.1030, 0.0973));
  q = q + dot(q, q.yxz + 33.33);
  vec3 n = fract((q.xxy + q.yxx) * q.zyx) * 2.0 - 1.0;
  // Signal-dependent grain: Poisson shot noise -> sigma_display proportional to
  // luma^(-(gamma-1)/2) = luma^(-0.75) at gamma=2.5 (post-gamma call site).
  // Normalised by MIDGRAY_NORM=0.5^(-0.75)=1.6818 so grainAmt retains midgray meaning.
  float luma      = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float shotScale = clamp(pow(max(luma, 0.01), -0.75) / 1.6818, 0.6, 6.0);
  return n * grainAmt * shotScale;
}
`);

// ---------------------------------------------------------------------------
// 9. Electronic snow -- glslFn
// ---------------------------------------------------------------------------
export const snowFn = glslFn(/* glsl */`
vec3 snowFn(vec2 pixelCoord, float t, float snowAmt, float fieldRate) {
  if (snowAmt < 0.0001) { return vec3(0.0); }
  uint tSlot = uint(floor(t * fieldRate));
  uint ix = uint(pixelCoord.x);
  uint iy = uint(pixelCoord.y);
  uint base = ix * 1664525u + iy * 1013904223u + tSlot * 22695477u;
  uint hr = base;
  uint hg = base + 0x9e3779b9u;
  uint hb = base + 0x27d4eb2fu;
  hr ^= hr >> 16u; hr *= 0x85ebca6bu; hr ^= hr >> 13u; hr *= 0xc2b2ae35u; hr ^= hr >> 16u;
  hg ^= hg >> 16u; hg *= 0x85ebca6bu; hg ^= hg >> 13u; hg *= 0xc2b2ae35u; hg ^= hg >> 16u;
  hb ^= hb >> 16u; hb *= 0x85ebca6bu; hb ^= hb >> 13u; hb *= 0xc2b2ae35u; hb ^= hb >> 16u;
  uint base_l = (ix - 1u) * 1664525u + iy * 1013904223u + tSlot * 22695477u;
  uint hrl = base_l;
  uint hgl = base_l + 0x9e3779b9u;
  uint hbl = base_l + 0x27d4eb2fu;
  hrl ^= hrl >> 16u; hrl *= 0x85ebca6bu; hrl ^= hrl >> 13u; hrl *= 0xc2b2ae35u; hrl ^= hrl >> 16u;
  hgl ^= hgl >> 16u; hgl *= 0x85ebca6bu; hgl ^= hgl >> 13u; hgl *= 0xc2b2ae35u; hgl ^= hgl >> 16u;
  hbl ^= hbl >> 16u; hbl *= 0x85ebca6bu; hbl ^= hbl >> 13u; hbl *= 0xc2b2ae35u; hbl ^= hbl >> 16u;
  float sc = 1.0 / 4294967295.0;
  return vec3(
    (float(hr)  * sc - 0.5) * 0.75 + (float(hrl) * sc - 0.5) * 0.25,
    (float(hg)  * sc - 0.5) * 0.75 + (float(hgl) * sc - 0.5) * 0.25,
    (float(hb)  * sc - 0.5) * 0.75 + (float(hbl) * sc - 0.5) * 0.25
  ) * snowAmt;
}
`);

// ---------------------------------------------------------------------------
// 10. Ghost / multipath echo -- glslFn (P0-A)
//     Helper before entry (GLSL no forward refs).
// ---------------------------------------------------------------------------
export const ghostFn = glslFn(/* glsl */`
vec3 ghostEntry(sampler2D tex, vec2 uv, float xOffset) {
  float ghostX = uv.x + xOffset;
  if (ghostX < 0.0 || ghostX > 1.0) { return vec3(0.0); }
  vec2 texSize = vec2(textureSize(tex, 0));
  float gx = ghostX * texSize.x - 0.5;
  int gy   = clamp(int(floor(uv.y * texSize.y)), 0, int(texSize.y) - 1);
  gy = int(texSize.y) - 1 - gy;  // WebGL RT: Y=0 at bottom
  int ix0  = clamp(int(floor(gx)),     0, int(texSize.x) - 1);
  int ix1  = clamp(int(floor(gx)) + 1, 0, int(texSize.x) - 1);
  float fx = fract(gx);
  vec3 c0  = texelFetch(tex, ivec2(ix0, gy), 0).rgb;
  vec3 c1  = texelFetch(tex, ivec2(ix1, gy), 0).rgb;
  return mix(c0, c1, fx);
}
`);

// ---------------------------------------------------------------------------
// 11. VBI bleed -- glslFn (P2-C)
//     Helper before entry (GLSL no forward refs).
// ---------------------------------------------------------------------------
export const vbiFn = glslFn(/* glsl */`
float vbiHash(float n) {
  uint k = uint(abs(n)) * 2246822519u;
  float m = float(k) * (1.0 / 4294967296.0);
  return fract(sin(m * 127.1) * 43758.5453);
}

#pragma main
vec3 vbiEntry(vec2 uv, vec2 res, float src_y, float frameCount, float vbiStr, float vbiLines) {
  float effectiveSrcY = (src_y > 0.5) ? src_y : res.y;
  float py = uv.y * effectiveSrcY;
  if (py >= vbiLines) { return vec3(0.0); }
  float colGroup = floor(uv.x * res.x / 8.0);
  float row      = floor(py);
  float field    = floor(frameCount);
  float fieldW   = fract(field / 9973.0) * 9973.0;
  float h1 = vbiHash(colGroup * 317.3 + row * 7919.0 + fieldW * 1.3);
  float h2 = vbiHash(colGroup * 521.7 + row * 3571.0 + fieldW * 2.7);
  float h3 = vbiHash(colGroup * 911.1 + row * 6131.0 + fieldW * 0.9);
  return vec3(h1, h2, h3) * vbiStr;
}
`);

// ---------------------------------------------------------------------------
// 12. Dot crawl -- glslFn (P2-A)
// ---------------------------------------------------------------------------
export const dotCrawlFn = glslFn(/* glsl */`
vec3 dotCrawlEntry(
  vec3 col,
  vec2 uv,
  vec2 res,
  float src_x,
  float src_y,
  float flickerRate,
  float t,
  float amt,
  sampler2D tex
) {
  if (amt < 0.001) { return col; }
  vec2 texSize = vec2(textureSize(tex, 0));
  ivec2 iCoord  = clamp(
    ivec2(floor(uv * texSize)) + ivec2(-1, 0),
    ivec2(0),
    ivec2(texSize) - ivec2(1)
  );
  iCoord.y = int(texSize.y) - 1 - iCoord.y;  // WebGL RT: Y=0 at bottom
  vec3 left = texelFetch(tex, iCoord, 0).rgb;
  // Pre-kernel position: col is linear RGB. BT.709 linear-light luma coefficients.
  float Y  = dot(col,  vec3(0.2126, 0.7152, 0.0722));
  float Yl = dot(left, vec3(0.2126, 0.7152, 0.0722));
  float effectiveSrcX  = (src_x > 0.5) ? src_x : res.x;
  float effectiveSrcY  = (src_y > 0.5) ? src_y : res.y;
  float grad = abs(Y - Yl) * effectiveSrcX;
  float crawlRateUV    = 0.5 * flickerRate / max(effectiveSrcY, 1.0);
  float crawlPhase     = fract(t * crawlRateUV) * 6.28318;
  float subcarrierFreq = effectiveSrcX * 0.262;
  float subPhase       = uv.x * subcarrierFreq * 6.28318
                       + uv.y * effectiveSrcY * 0.5 * 6.28318
                       - crawlPhase;
  float edgeMask = smoothstep(0.05, 0.30, grad);
  // Luma-domain leakage: Y_leaked = Cb·cos(subPhase) + Cr·sin(subPhase).
  // Cb = B - Y (blue component offset from luma).
  // Cr = R - Y (red component offset from luma).
  // leakY is added equally to all channels → pure luminance modulation (achromatic dots).
  // Amplitude scales with local chroma sqrt(Cb²+Cr²): zero on desaturated content.
  float Cb    = col.b - Y;
  float Cr    = col.r - Y;
  float leakY = (Cb * cos(subPhase) + Cr * sin(subPhase)) * edgeMask * amt;
  return clamp(col + vec3(leakY), vec3(0.0), vec3(1.0));
}
`);

// ---------------------------------------------------------------------------
// 13. Combined pre-kernel signal processing -- glslFn (SPEC-analog-artifacts)
//     Helpers sigFetch/sigCb/sigCr declared before entry (GLSL no forward refs).
//     Note: WGSL `let` replaced with GLSL `float` type declarations.
// ---------------------------------------------------------------------------
export const signalProcessFn = glslFn(/* glsl */`
vec3 sigFetch(sampler2D tex, vec2 texSize, int iy, float u) {
  float gx  = u * texSize.x - 0.5;
  int ix0 = clamp(int(floor(gx)),     0, int(texSize.x) - 1);
  int ix1 = clamp(int(floor(gx)) + 1, 0, int(texSize.x) - 1);
  int fy  = int(texSize.y) - 1 - iy;  // WebGL RT: Y=0 at bottom
  vec3 c0  = texelFetch(tex, ivec2(ix0, fy), 0).rgb;
  vec3 c1  = texelFetch(tex, ivec2(ix1, fy), 0).rgb;
  return mix(c0, c1, fract(gx));
}

float sigCb(vec3 c) {
  return c.b - dot(c, vec3(0.2126, 0.7152, 0.0722));
}

float sigCr(vec3 c) {
  return c.r - dot(c, vec3(0.2126, 0.7152, 0.0722));
}

#pragma main
vec3 signalProcessFn(
  sampler2D tex, vec2 uv,
  float svmAmt,
  float ringAmt,
  float ringDecay,
  float ringFreq,
  float chromaBlur, float ycDelay,
  float chromaAMNoise, float chromaPMNoise,
  float crossColorAmt, float crossColorFreq,
  float ntscCompositeMode, float ycSeparatorQ,
  float tapeDropoutRate, float fieldCount,
  float srcW, float srcH,
  float t, float flickerRate,
  float vchromaHetAmt, float vchromaFreq, float vchromaDrift,
  float vhsLumaBlur,
  float vhsChromaVBlend,
  float vhsSwitchStr,
  float vhsSwitchLines,
  float vhsSwitchOffset
) {
  vec2 texSize = vec2(textureSize(tex, 0));
  int iy_base = clamp(int(floor(uv.y * texSize.y)), 0, int(texSize.y) - 1);
  int iy      = iy_base;
  float tapUV   = 1.0 / max(srcW, 1.0);

  // D-3. Tape dropout: replace scan line segment with the line above.
  if (tapeDropoutRate > 0.0001) {
    float srcY   = floor(uv.y * max(srcH, 1.0));
    float srcSeg = floor(uv.x * max(srcW, 1.0) / 8.0);
    float fw     = fract(fieldCount / 9973.0) * 9973.0;
    float h      = fract(sin(srcY * 7919.0 + srcSeg * 317.3 + fw * 1.3) * 43758.5453);
    if (h < tapeDropoutRate) { iy = max(iy - 1, 0); }
  }

  // SVM: horizontal scan velocity modulation -- warp u by local luma gradient.
  // Trinitron CPD-G circuit: slows scan at bright-to-dark edges => sharpness boost.
  float sampleU = uv.x;
  if (svmAmt > 0.0001) {
    vec3 svmL = sigFetch(tex, texSize, iy, uv.x - tapUV);
    vec3 svmR = sigFetch(tex, texSize, iy, uv.x + tapUV);
    float yL  = dot(svmL, vec3(0.2126, 0.7152, 0.0722));
    float yR  = dot(svmR, vec3(0.2126, 0.7152, 0.0722));
    sampleU   = uv.x + svmAmt * (yR - yL);
  }
  vec3 result = sigFetch(tex, texSize, iy, sampleU);

  // D-4: VHS head switching noise.
  // Horizontal displacement of lines at bottom of frame during head changeover.
  // Power-law settling profile; strongest at switch line, zero at vhsSwitchLines below.
  // Source: ntsc-rs HeadSwitchingSettings; BAVC AV Artifact Atlas.
  // Guard srcH > 0.5: single-pass mode sets srcH = 0; skip effect.
  // Skip when ntscCompositeMode active: NTSC chain replaces the source fetch.
  if (vhsSwitchStr > 0.001 && srcH > 0.5 && ntscCompositeMode < 0.5) {
    float switchStart = 1.0 - vhsSwitchLines / srcH - vhsSwitchOffset;
    float lineZ = (uv.y - switchStart) * srcH;
    if (lineZ >= 0.0 && lineZ < vhsSwitchLines) {
      float t_sw = lineZ / vhsSwitchLines;
      float shift = vhsSwitchStr * (72.0 / 720.0) * pow(max(0.0, 1.0 - t_sw), 1.5);
      float lineNoise = fract(sin(lineZ * 127.1 + fieldCount * 73.0)
                              * 43758.5453) * 0.006 - 0.003;
      float shiftedX = uv.x - shift - lineNoise;
      result = sigFetch(tex, texSize, iy, clamp(shiftedX, 0.0, 1.0));
      if (lineZ < 1.0) {
        float spike = vhsSwitchStr * 0.15 * (1.0 - lineZ) * step(0.90, uv.x);
        result = clamp(result + vec3(spike), vec3(0.0), vec3(1.0));
      }
    }
  }

  // H. NTSC composite encode/Y-C-separate/demodulate chain.
  // Replaces blocks A (ringing on RGB) and G (cross-color) with emergent physics.
  // ringAmt/ringDecay/ringFreq: IF filter. ycSeparatorQ: Y/C separator quality.
  if (ntscCompositeMode > 0.5) {
    // H-1. Fetch 8 additional taps (center already in 'result' as c0).
    vec3 cm4 = sigFetch(tex, texSize, iy, sampleU - 4.0*tapUV);
    vec3 cm3 = sigFetch(tex, texSize, iy, sampleU - 3.0*tapUV);
    vec3 cm2 = sigFetch(tex, texSize, iy, sampleU - 2.0*tapUV);
    vec3 cm1 = sigFetch(tex, texSize, iy, sampleU - 1.0*tapUV);
    vec3 cp1 = sigFetch(tex, texSize, iy, sampleU + 1.0*tapUV);
    vec3 cp2 = sigFetch(tex, texSize, iy, sampleU + 2.0*tapUV);
    vec3 cp3 = sigFetch(tex, texSize, iy, sampleU + 3.0*tapUV);
    vec3 cp4 = sigFetch(tex, texSize, iy, sampleU + 4.0*tapUV);

    // H-2. Subcarrier phase at center and offsets.
    // f_sc = 0.2625 cycles/src-px (NTSC 3.58 MHz at 720px/line active).
    // Temporal crawl phase locked to cross-color and dot crawl.
    float SC       = 6.28318 * 0.2625;
    float crawlPhi = fract(t * 0.5 * flickerRate / max(srcH, 1.0)) * 6.28318;
    float phi0     = SC * (sampleU * srcW) + crawlPhi;
    float cSC = cos(SC); float sSC = sin(SC);
    float cSC2 = cos(2.0*SC); float sSC2 = sin(2.0*SC);
    float cSC3 = cos(3.0*SC); float sSC3 = sin(3.0*SC);
    float cSC4 = cos(4.0*SC); float sSC4 = sin(4.0*SC);
    float c0phi = cos(phi0); float s0phi = sin(phi0);
    float cosM4 = c0phi*cSC4 + s0phi*sSC4;
    float sinM4 = s0phi*cSC4 - c0phi*sSC4;
    float cosM3 = c0phi*cSC3 + s0phi*sSC3;
    float sinM3 = s0phi*cSC3 - c0phi*sSC3;
    float cosM2 = c0phi*cSC2 + s0phi*sSC2;
    float sinM2 = s0phi*cSC2 - c0phi*sSC2;
    float cosM1 = c0phi*cSC  + s0phi*sSC;
    float sinM1 = s0phi*cSC  - c0phi*sSC;
    float cosP1 = c0phi*cSC  - s0phi*sSC;
    float sinP1 = s0phi*cSC  + c0phi*sSC;
    float cosP2 = c0phi*cSC2 - s0phi*sSC2;
    float sinP2 = s0phi*cSC2 + c0phi*sSC2;
    float cosP3 = c0phi*cSC3 - s0phi*sSC3;
    float sinP3 = s0phi*cSC3 + c0phi*sSC3;
    float cosP4 = c0phi*cSC4 - s0phi*sSC4;
    float sinP4 = s0phi*cSC4 + c0phi*sSC4;

    // H-3. YIQ coefficients (NTSC I/Q axes; BT.709 luma for Y consistency).
    vec3 Icoef = vec3( 0.5959, -0.2746, -0.3213);
    vec3 Qcoef = vec3( 0.2115, -0.5227,  0.3112);
    vec3 Ycoef = vec3(0.2126,  0.7152,  0.0722);

    // H-4. Encode 9 taps to composite scalar.
    float Sm4 = dot(cm4,Ycoef) + dot(cm4,Icoef)*cosM4 + dot(cm4,Qcoef)*sinM4;
    float Sm3 = dot(cm3,Ycoef) + dot(cm3,Icoef)*cosM3 + dot(cm3,Qcoef)*sinM3;
    float Sm2 = dot(cm2,Ycoef) + dot(cm2,Icoef)*cosM2 + dot(cm2,Qcoef)*sinM2;
    float Sm1 = dot(cm1,Ycoef) + dot(cm1,Icoef)*cosM1 + dot(cm1,Qcoef)*sinM1;
    float S0  = dot(result,Ycoef) + dot(result,Icoef)*c0phi + dot(result,Qcoef)*s0phi;
    float Sp1 = dot(cp1,Ycoef) + dot(cp1,Icoef)*cosP1 + dot(cp1,Qcoef)*sinP1;
    float Sp2 = dot(cp2,Ycoef) + dot(cp2,Icoef)*cosP2 + dot(cp2,Qcoef)*sinP2;
    float Sp3 = dot(cp3,Ycoef) + dot(cp3,Icoef)*cosP3 + dot(cp3,Qcoef)*sinP3;
    float Sp4 = dot(cp4,Ycoef) + dot(cp4,Icoef)*cosP4 + dot(cp4,Qcoef)*sinP4;

    // H-5. IF bandlimit: causal FIR on composite S (same h[n] as block A, composite domain).
    // h[n] = exp(-n*ringDecay) * sin(n*ringFreq*PI). Overshoot in composite = ringing in recon.
    float Sf0 = S0;
    if (ringAmt > 0.001) {
      float rd = max(ringDecay, 0.05);
      float rf = ringFreq * 3.14159265;
      float w1 = exp(-1.0*rd)*sin(1.0*rf);
      float w2 = exp(-2.0*rd)*sin(2.0*rf);
      float w3 = exp(-3.0*rd)*sin(3.0*rf);
      float w4 = exp(-4.0*rd)*sin(4.0*rf);
      Sf0 += ((S0-Sm1)*w1 + (S0-Sm2)*w2 + (S0-Sm3)*w3 + (S0-Sm4)*w4) * ringAmt;
    }
    // Use unfiltered S for offset taps (IF ringing is a local effect; approx OK here).
    float Sf1 = Sp1; float Sfm1 = Sm1;
    float Sf2 = Sp2; float Sfm2 = Sm2;

    // H-6. Y/C separator: Gaussian lowpass on filtered composite.
    // sigma_sep = 2.5 - 1.7*ycSeparatorQ  (range: 0.8..2.5 src-px)
    float sepSig = max(2.5 - 1.7*ycSeparatorQ, 0.5);
    float sw1 = exp(-1.0 / (2.0*sepSig*sepSig));
    float sw2 = exp(-4.0 / (2.0*sepSig*sepSig));
    float swSum = 1.0 + 2.0*sw1 + 2.0*sw2;
    float Ysep0   = (Sf0 + (Sfm1+Sf1)*sw1 + (Sfm2+Sf2)*sw2) / swSum;
    float Sfm2sep = (Sfm2 + (Sm3+Sm1)*sw1 + (Sm4+S0)*sw2) / swSum;
    float Sfm1sep = (Sfm1 + (Sm2+S0)*sw1  + (Sm3+Sp1)*sw2) / swSum;
    float Sf1sep  = (Sf1  + (S0+Sp2)*sw1  + (Sm1+Sp3)*sw2) / swSum;
    float Sf2sep  = (Sf2  + (Sp1+Sp3)*sw1 + (S0+Sp4)*sw2)  / swSum;
    float Cm2 = Sfm2 - Sfm2sep;
    float Cm1 = Sfm1 - Sfm1sep;
    float C0  = Sf0  - Ysep0;
    float C1  = Sf1  - Sf1sep;
    float C2  = Sf2  - Sf2sep;

    // H-7. Chroma demodulate: 5-tap Gaussian lowpass on C*cos and C*sin.
    // Reuse chromaBlur as chroma demod sigma (same physical meaning: chroma BW).
    float csig = max(chromaBlur, 0.8);
    float cw1 = exp(-1.0 / (2.0*csig*csig));
    float cw2 = exp(-4.0 / (2.0*csig*csig));
    float cwSum = 1.0 + 2.0*cw1 + 2.0*cw2;
    float Iprime = 2.0*(C0*c0phi  + (Cm1*cosM1+C1*cosP1)*cw1 + (Cm2*cosM2+C2*cosP2)*cw2) / cwSum;
    float Qprime = 2.0*(C0*s0phi  + (Cm1*sinM1+C1*sinP1)*cw1 + (Cm2*sinM2+C2*sinP2)*cw2) / cwSum;

    // H-8. Reconstruct RGB from Y_sep, I', Q'.
    float R_out = Ysep0 + 0.9563*Iprime + 0.6210*Qprime;
    float G_out = Ysep0 - 0.2721*Iprime - 0.6474*Qprime;
    float B_out = Ysep0 - 1.1070*Iprime + 1.7046*Qprime;
    result = clamp(vec3(R_out, G_out, B_out), vec3(0.0), vec3(1.0));
  }

  // A. Ringing -- causal 4-tap FIR: h[n] = exp(-n*ringDecay) * sin(n*ringFreq*PI), n=1..4.
  // Taps at left-of-centre (past samples in scan order): uv.x - n*tapUV.
  // Physically: causal impulse response of a 2nd-order IF bandpass filter.
  if (ringAmt > 0.001 && ntscCompositeMode < 0.5) {
    float rd = max(ringDecay, 0.05);
    float rf = ringFreq * 3.14159265;
    float w1 = exp(-1.0 * rd) * sin(1.0 * rf);
    float w2 = exp(-2.0 * rd) * sin(2.0 * rf);
    float w3 = exp(-3.0 * rd) * sin(3.0 * rf);
    float w4 = exp(-4.0 * rd) * sin(4.0 * rf);
    vec3 p1 = sigFetch(tex, texSize, iy, uv.x - 1.0 * tapUV);
    vec3 p2 = sigFetch(tex, texSize, iy, uv.x - 2.0 * tapUV);
    vec3 p3 = sigFetch(tex, texSize, iy, uv.x - 3.0 * tapUV);
    vec3 p4 = sigFetch(tex, texSize, iy, uv.x - 4.0 * tapUV);
    vec3 causalRing = (result - p1) * w1 + (result - p2) * w2
                    + (result - p3) * w3 + (result - p4) * w4;
    result = max(result + causalRing * ringAmt, vec3(0.0));
  }

  // B. Chroma blur + Y/C delay.
  if (chromaBlur > 0.001 || abs(ycDelay) > 0.001) {
    float Y    = dot(result, vec3(0.2126, 0.7152, 0.0722));
    float sig2 = max(chromaBlur, 0.1);
    float w0   = 1.0;
    float w1   = exp(-1.0 / (2.0 * sig2 * sig2));
    float w2   = exp(-4.0 / (2.0 * sig2 * sig2));
    float wSum = w0 + 2.0 * w1 + 2.0 * w2;
    float du   = uv.x + ycDelay * tapUV;
    vec3 c0   = sigFetch(tex, texSize, iy, du);
    vec3 cm1  = sigFetch(tex, texSize, iy, du - tapUV);
    vec3 cm2  = sigFetch(tex, texSize, iy, du - 2.0 * tapUV);
    vec3 cp1  = sigFetch(tex, texSize, iy, du + tapUV);
    vec3 cp2  = sigFetch(tex, texSize, iy, du + 2.0 * tapUV);
    float Cb   = (sigCb(c0)*w0 + (sigCb(cm1)+sigCb(cp1))*w1 + (sigCb(cm2)+sigCb(cp2))*w2) / wSum;
    float Cr   = (sigCr(c0)*w0 + (sigCr(cm1)+sigCr(cp1))*w1 + (sigCr(cm2)+sigCr(cp2))*w2) / wSum;
    result     = max(vec3(Y + Cr, Y - 0.2973*Cr - 0.1009*Cb, Y + Cb), vec3(0.0));
  }

  // F. Chroma AM + PM noise.
  // AM noise: random saturation jitter (tuner thermal noise on chroma carrier).
  // PM noise: random hue rotation (VCO jitter in chroma decoder PLL).
  // Both noise types are bandlimited to ~2 src-px (chroma BW ~1.2 MHz @ 720 px/line).
  if (chromaAMNoise > 0.001 || chromaPMNoise > 0.001) {
    float Y  = dot(result, vec3(0.2126, 0.7152, 0.0722));
    float Cb = result.b - Y;
    float Cr = result.r - Y;
    // Quantise to 2-px groups for spatial correlation (chroma BW ~1-2 MHz)
    float gx = floor(uv.x * srcW * 0.5);
    float gy = floor(uv.y * srcH);
    float ft = floor(t * flickerRate);
    // Two independent noise scalars in [-1, +1]
    float n1 = fract(sin(gx * 127.1 + gy * 311.7 + ft *  74.3) * 43758.5453) * 2.0 - 1.0;
    float n2 = fract(sin(gx * 271.9 + gy * 461.3 + ft *  53.1 + 1.73) * 43758.5453) * 2.0 - 1.0;
    float amp   = 1.0 + chromaAMNoise * n1;
    float phase = chromaPMNoise * n2;
    float cosP  = cos(phase);
    float sinP  = sin(phase);
    float Cb_n  = Cb * amp * cosP - Cr * amp * sinP;
    float Cr_n  = Cb * amp * sinP + Cr * amp * cosP;
    result = max(vec3(Y + Cr_n, Y - 0.2973*Cr_n - 0.1009*Cb_n, Y + Cb_n), vec3(0.0));
  }

  // A-ext: VHS luma bandwidth limiting.
  // SP: ~2.4 MHz = sigma ~1.0 src-px. Blurs Y only; chroma separately limited by chromaBlur.
  // Source: ntsc-rs VHSTapeParams luma_cut: 2,400,000 Hz.
  // BT.601 luma weights (VHS standard). Normalized chroma: Cr_n=(R-Y)/1.402, Cb_n=(B-Y)/1.772.
  // Guard srcW > 0.5: single-pass mode sets srcW = 0; 1/0 = inf -> clamp collapses to edge samples.
  // Skip when ntscCompositeMode active: NTSC chain replaces VHS luma processing.
  if (vhsLumaBlur > 0.001 && srcW > 0.5 && ntscCompositeMode < 0.5) {
    float dx_lb = 1.0 / srcW;
    float s2_lb = vhsLumaBlur * vhsLumaBlur;
    float w1_lb = exp(-0.5 / s2_lb);
    float w2_lb = exp(-2.0 / s2_lb);
    float wsum_lb = 1.0 + 2.0 * (w1_lb + w2_lb);
    vec3 bt601 = vec3(0.299, 0.587, 0.114);
    float Yl2 = dot(sigFetch(tex, texSize, iy, clamp(uv.x - 2.0*dx_lb, 0.0, 1.0)), bt601);
    float Yl1 = dot(sigFetch(tex, texSize, iy, clamp(uv.x -     dx_lb, 0.0, 1.0)), bt601);
    float Yr1 = dot(sigFetch(tex, texSize, iy, clamp(uv.x +     dx_lb, 0.0, 1.0)), bt601);
    float Yr2 = dot(sigFetch(tex, texSize, iy, clamp(uv.x + 2.0*dx_lb, 0.0, 1.0)), bt601);
    float Y_orig_lb = dot(result, bt601);
    float Y_blur = (w2_lb*Yl2 + w1_lb*Yl1 + Y_orig_lb + w1_lb*Yr1 + w2_lb*Yr2) / wsum_lb;
    float Cr_n_lb = (result.r - Y_orig_lb) / 1.402;
    float Cb_n_lb = (result.b - Y_orig_lb) / 1.772;
    result = clamp(vec3(Y_blur + 1.402*Cr_n_lb,
                        Y_blur - 0.714136*Cr_n_lb - 0.344136*Cb_n_lb,
                        Y_blur + 1.772*Cb_n_lb), vec3(0.0), vec3(1.0));
  }

  // B-ext: VHS chroma 1H delay-line averaging.
  // Hardware: colour-under recovery averages chroma[y] with chroma[y-1] to suppress
  // inter-track phase error. Halves vertical chroma resolution.
  // Source: ntsc-rs chroma_vert_blend.
  // BT.601 luma weights; normalized chroma convention matches tapeChromaFn.
  // Guard srcH > 0.5: single-pass mode sets srcH = 0 (no source RT); skip effect.
  // Skip when ntscCompositeMode active: VHS-specific hardware artifact, not present in NTSC chain.
  if (vhsChromaVBlend > 0.001 && srcH > 0.5 && ntscCompositeMode < 0.5) {
    vec3 bt601_vb = vec3(0.299, 0.587, 0.114);
    int iy_prev = max(iy - 1, 0);
    vec3 prevLine = sigFetch(tex, texSize, iy_prev, uv.x);
    float Y_vb      = dot(result,   bt601_vb);
    float Y_prev_vb = dot(prevLine, bt601_vb);
    float Cr_n_vb      = (result.r   - Y_vb)      / 1.402;
    float Cb_n_vb      = (result.b   - Y_vb)      / 1.772;
    float Cr_n_prev_vb = (prevLine.r - Y_prev_vb) / 1.402;
    float Cb_n_prev_vb = (prevLine.b - Y_prev_vb) / 1.772;
    float Cr_b = mix(Cr_n_vb, (Cr_n_vb + Cr_n_prev_vb) * 0.5, vhsChromaVBlend);
    float Cb_b = mix(Cb_n_vb, (Cb_n_vb + Cb_n_prev_vb) * 0.5, vhsChromaVBlend);
    result = clamp(vec3(Y_vb + 1.402*Cr_b,
                        Y_vb - 0.714136*Cr_b - 0.344136*Cb_b,
                        Y_vb + 1.772*Cb_b), vec3(0.0), vec3(1.0));
  }

  // G. Cross-color.
  if (crossColorAmt > 0.001 && ntscCompositeMode < 0.5) {
    vec3 cm1x  = sigFetch(tex, texSize, iy, uv.x - tapUV);
    vec3 cp1x  = sigFetch(tex, texSize, iy, uv.x + tapUV);
    float Yc    = dot(result, vec3(0.2126, 0.7152, 0.0722));
    float Ym1   = dot(cm1x,   vec3(0.2126, 0.7152, 0.0722));
    float Yp1   = dot(cp1x,   vec3(0.2126, 0.7152, 0.0722));
    float hfMag = abs(2.0 * Yc - Ym1 - Yp1);
    float srcX  = uv.x * max(srcW, 1.0);
    float srcYf = uv.y * max(srcH, 1.0);
    float crawlPhase = fract(t * 0.5 * flickerRate / max(srcH, 1.0)) * 6.28318;
    float phase = (srcX * crossColorFreq * 0.0733 + srcYf * 0.5) * 6.28318 - crawlPhase;
    float PI23  = 2.094395;
    vec3 chroma = vec3(cos(phase), cos(phase + PI23), cos(phase - PI23));
    result      = result + chroma * hfMag * crossColorAmt;
  }

  // I. VHS chroma heterodyne noise.
  if (vchromaHetAmt > 0.001) {
    float srcYv   = floor(uv.y * max(srcH, 1.0));
    float phaseV  = fract(t * vchromaDrift + srcYv * vchromaFreq * 0.0137) * 6.28318;
    float h1v     = fract(sin(srcYv * 3137.0 + t * 17.3) * 43758.5453);
    float h2v     = fract(sin(srcYv * 7919.0 + t *  8.7) * 43758.5453);
    float satMod  = 1.0 + vchromaHetAmt * (cos(phaseV) * 0.5 + (h1v - 0.5) * 0.5);
    float hueMod  = vchromaHetAmt * (h2v - 0.5) * 0.3;
    float luma    = dot(result, vec3(0.2126, 0.7152, 0.0722));
    vec3 chroma2  = result - vec3(luma);
    float cb2     = chroma2.b - chroma2.r * 0.5 - chroma2.g * 0.5;
    float cr2     = chroma2.r - chroma2.b * 0.5 - chroma2.g * 0.5;
    float cosH    = cos(hueMod);
    float sinH    = sin(hueMod);
    float cb2r    = cb2 * cosH - cr2 * sinH;
    float cr2r    = cb2 * sinH + cr2 * cosH;
    chroma2       = vec3(cr2r * 0.667, -(cb2r + cr2r) * 0.333, cb2r * 0.667);
    result = vec3(luma) + chroma2 * satMod;
  }

  return result;
}
`);

// ---------------------------------------------------------------------------
// 14. Tape flutter -- glslFn (SPEC-analog-artifacts D-1)
// ---------------------------------------------------------------------------
export const tapeFlutterFn = glslFn(/* glsl */`
vec3 tapeFlutterFn(vec3 col, vec2 uv, float flutterNoise,
                   float tapeFlutterAmt, float tapeFlutterRate) {
  if (tapeFlutterAmt < 0.0001) { return col; }
  // Spatial envelope; temporal variation driven by CPU-side OU process (flutterNoise in [-1,1]).
  float f1   = sin(uv.y * 1.73) * 0.6;
  float f2   = sin(uv.y * 2.91) * 0.4;
  float gain = 1.0 + (f1 + f2) * flutterNoise * tapeFlutterAmt;
  return col * max(gain, 0.0);
}
`);

// ---------------------------------------------------------------------------
// 15. Tape chroma noise -- glslFn (SPEC-analog-artifacts D-2)
// ---------------------------------------------------------------------------
export const tapeChromaFn = glslFn(/* glsl */`
vec3 tapeChromaFn(vec3 col, vec2 uv, float fieldCount, float tapeChromaAmt) {
  if (tapeChromaAmt < 0.001) { return col; }
  float gx  = floor(uv.x * 40.0);
  float gy  = floor(uv.y * 240.0); // VHS chroma varies per helical scan track (~240 lines/field)
  float fw  = fract(fieldCount / 7919.0) * 7919.0;
  float h1  = fract(sin(gx * 317.3 + gy * 1277.7 + fw * 1.3) * 43758.5453);
  float h3  = fract(sin(gx * 911.1 + gy * 6131.3 + fw * 0.9) * 43758.5453);
  float Cb_noise = (h3 - 0.5) * tapeChromaAmt;
  float Cr_noise = (h1 - 0.5) * tapeChromaAmt;
  // BT.601 YCbCr→RGB differential: perturb Cb/Cr only, luma unchanged.
  // dR = 1.402*Cr, dG = -0.714136*Cr - 0.344136*Cb, dB = 1.772*Cb
  return max(col + vec3(1.402*Cr_noise, -0.714136*Cr_noise - 0.344136*Cb_noise, 1.772*Cb_noise), vec3(0.0));
}
`);

// ---------------------------------------------------------------------------
// 17. Differential phosphor afterglow accumulation -- glslFn
//     (SPEC-novel-crt-physics Effect 7) GLSL parity of crt-tsl.js afterglowAccumFn.
// ---------------------------------------------------------------------------
export const afterglowAccumFn = glslFn(/* glsl */`
vec3 afterglowAccumFn(vec3 prevAfterglow, vec3 current,
                      float decayR, float decayG, float decayB) {
  vec3 decay = vec3(decayR, decayG, decayB);
  return prevAfterglow * decay + current * (vec3(1.0) - decay);
}
`);
