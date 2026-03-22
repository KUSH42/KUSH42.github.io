/**
 * crt-bloom.wgsl.js
 * 9-tap separable Gaussian blur wgslFn helpers for the GPU bloom fallback path.
 *
 * These are used by buildFallbackBlur() in telescreen-crt-webgpu.js when
 * the three/addons GaussianBlurNode is not available.
 *
 * Note: a true two-pass separable blur (H then V from an intermediate render
 * target) requires a texture produced by the H pass, which cannot be created
 * within a single TSL PostProcessing node. These functions are exported for
 * future use when a proper intermediate-RT mechanism is wired up. The current
 * fallback path in buildFallbackBlur() returns the unblurred threshold node
 * as a graceful degradation rather than attempt two-pass emulation inside one
 * Fn call.
 */

import { wgslFn } from 'three/tsl';

// 9-tap horizontal Gaussian blur.
// sigma controls the spread; kernel is renormalised so total weight = 1.
export const bloomBlurHFn = wgslFn(/* wgsl */`
fn bloomBlurH(
  tex:        texture_2d<f32>,
  samp:       sampler,
  uv:         vec2f,
  resolution: vec2f,
  sigma:      f32
) -> vec3f {
  let px = 1.0 / resolution.x;
  var acc:  vec3f = vec3f(0.0);
  var wSum: f32   = 0.0;
  for (var i: i32 = -4; i <= 4; i++) {
    let fi = f32(i);
    let w  = exp(-0.5 * (fi * fi) / (sigma * sigma));
    acc  += textureSampleLevel(tex, samp, uv + vec2f(fi * px, 0.0), 0.0).rgb * w;
    wSum += w;
  }
  return acc / wSum;
}
`);

// 9-tap vertical Gaussian blur.
export const bloomBlurVFn = wgslFn(/* wgsl */`
fn bloomBlurV(
  tex:        texture_2d<f32>,
  samp:       sampler,
  uv:         vec2f,
  resolution: vec2f,
  sigma:      f32
) -> vec3f {
  let px = 1.0 / resolution.y;
  var acc:  vec3f = vec3f(0.0);
  var wSum: f32   = 0.0;
  for (var i: i32 = -4; i <= 4; i++) {
    let fi = f32(i);
    let w  = exp(-0.5 * (fi * fi) / (sigma * sigma));
    acc  += textureSampleLevel(tex, samp, uv + vec2f(0.0, fi * px), 0.0).rgb * w;
    wSum += w;
  }
  return acc / wSum;
}
`);
