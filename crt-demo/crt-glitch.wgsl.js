/**
 * crt-glitch.wgsl.js
 * WGSL glitch displacement pass. Faithfully ported from the original GLSL
 * applyGlitch() function in telescreen-crt.js.
 *
 * Active path: crtGlitchFallbackFn (vec3f packing — always used in r171).
 * See STRUCT_RETURN_MIN_REV in telescreen-crt-webgpu.js.
 *
 * Struct return path was removed (DR-5 P3-A): Three.js r171 WGSLNodeFunction does not
 * support struct definitions inside wgslFn source. If a future revision adds struct return,
 * re-introduce a crtGlitchFn with struct output and lower STRUCT_RETURN_MIN_REV.
 *
 * Glitch types (per-band, selected by continuous hash thresholds):
 *   Type 1 — thin band horizontal shift     (~20% of bands, h1 > 0.80)
 *   Type 2 — large tear                     (~4% of bands,  h1 < 0.04)
 *   Type 3 — chroma burst error             (~6% of bands, strong windows only)
 *   Type 4 — block chunk displacement       (one large rect per time window, ~35-70%)
 *   Type 5 — burst loss sentinel (-999)     (~1% of frames, strong windows only)
 *
 * The JS-side burst scheduler gates glitchActive; when inactive the function
 * returns the input pos unchanged with rgbSplitPx = 0.
 */

import { wgslFn } from 'three/tsl';

// Active path — encodes output as vec3f(pos.x, pos.y, rgbSplitPx).
// Used when the runtime Three.js build does not support wgslFn struct return
// via .element(). TSL caller uses .xy (pos) and .z (rgbSplitPx).
export const crtGlitchFallbackFn = wgslFn(/* wgsl */`
fn applyGlitchFb(
  uv: vec2f,
  enabled: f32,
  isActive: f32,
  strength: f32,
  speed: f32,
  cols: f32,
  rgb: f32,
  t: f32
) -> vec3f {
  var pos: vec2f = uv;
  var rgbSplitPx: f32 = 0.0;

  if (enabled < 0.5 || isActive < 0.5 || strength < 0.0001) {
    return vec3f(pos.x, pos.y, rgbSplitPx);
  }

  let tSlot = floor(t * speed);

  let intensity = step(0.85, glitchHashFb(tSlot * 3.1 + 17.3));
  let str = strength * mix(0.35, 1.0, intensity);

  rgbSplitPx = rgb * mix(4.0, 14.0, intensity);

  let band = floor(uv.y * cols);
  let h1   = glitchHashFb(band * 137.3 + tSlot);
  let h2   = glitchHashFb(band *  91.7 + tSlot + 1.0);

  if (h1 > 0.80) {
    // Type 1 — thin horizontal shift: clamp (not fract) so edge pixels smear rather than teleport.
    pos.x = clamp(pos.x + (h2 * 2.0 - 1.0) * str, 0.0, 1.0);
  } else if (h1 < 0.04) {
    pos.x = fract(pos.x + (glitchHashFb(band + tSlot * 7.3) - 0.5) * str * 3.5);
  } else if (h1 > 0.72 && h1 < 0.78 && intensity > 0.5) {
    // Type 3 — chroma burst error (replaces spatial mirror): composite video burst phase glitch.
    // No positional shift — pos stays at uv.
    // Set a large rgbSplitPx so the call site shifts R and B in opposite horizontal directions,
    // creating brief desaturated/over-saturated colour banding that models a burst phase error.
    // Factor: strength * 80 gives ~0.8–8 px split at typical strength values (0.01–0.10).
    // Sign is randomised per-window: real burst phase errors alternate polarity with each field.
    rgbSplitPx = strength * 80.0;
    // Derive sign from a hash bit: glitchHashFb returns [0,1); scale to integer range and test LSB.
    let splitSign = select(-1.0, 1.0, (u32(glitchHashFb(band * 137.3 + tSlot * 7.0 + 3.0) * 65536.0) & 1u) == 0u);
    rgbSplitPx = rgbSplitPx * splitSign;
  } else if (intensity > 0.5 && h1 > 0.62 && h1 < 0.68) {
    // Type 5 — burst loss: NTSC color burst signal completely absent.
    // h1 range 0.62..0.68 (6% of bands) in strong windows only (~15%) → ~1% overall rate.
    // No positional shift — set sentinel value -999.0 so the kernel caller can detect
    // burst-loss and apply full-frame desaturation (color decoder PLL lost lock).
    // Real burst loss causes immediate grayscale; -999 is unambiguous (real split is never < -100).
    rgbSplitPx = -999.0;
  }

  let blockRoll = glitchHashFb(tSlot * 17.3 + 5.1);
  if (blockRoll < 0.35 + intensity * 0.35) {
    let blockY = glitchHashFb(tSlot * 3.7  + 1.1);
    let blockH = 0.015 + glitchHashFb(tSlot * 11.3) * 0.07 * (1.0 + intensity);
    if (abs(uv.y - blockY) < blockH) {
      // Type 4 uses clamp (not fract) so displaced blocks smear at edges rather
      // than teleporting to the opposite side of the screen.
      pos.x = clamp(pos.x + (glitchHashFb(tSlot * 23.1) - 0.5) * str * 2.5, 0.0, 1.0);
    }
  }

  pos = clamp(pos, vec2f(0.0), vec2f(1.0));
  return vec3f(pos.x, pos.y, rgbSplitPx);
}

fn glitchHashFb(n: f32) -> f32 {
  return fract(sin((n % 9973.0)) * 43758.5453123);
}
`);
