/**
 * matrix-rain-crt-bridge.js — backward-compat shim.
 * New code should use initMatrixRain({ postProcessing: 'crt' }) directly.
 */
import { initMatrixRain } from './matrix-rain-webgpu.js';

export function initMatrixRainCRT(element, rainOpts = {}, crtOpts = {}) {
  const handle = initMatrixRain(element, { ...rainOpts, postProcessing: 'crt', crtOpts });

  // Backward-compat: bridge callers access bridge.rain.setColor(), bridge.crt, bridge.destroy().
  // Expose 'rain' as an alias for the handle itself so existing call sites need no changes.
  handle.rain = handle;

  return handle;
}
