/**
 * crt-glitch.glsl.js
 * GLSL ES 3.0 glitch displacement pass. Translated from crt-glitch.wgsl.js.
 * Functionally identical — replaces wgslFn with glslFn for WebGL2 backend compat.
 *
 * Active path: crtGlitchFallbackFn (vec3 packing — always used in r171+).
 * TSL caller uses .xy (pos) and .z (rgbSplitPx).
 *
 * GLSL requires helpers before callers, so glitchHashFb precedes applyGlitchFb.
 * GLSLNodeFunction identifies the last function as the entry point.
 */

import { glslFn } from 'three/tsl';

// Active path -- encodes output as vec3(pos.x, pos.y, rgbSplitPx).
export const crtGlitchFallbackFn = glslFn(/* glsl */`
float glitchHashFb(float n) {
  // DR-15 P1-A: no modulo. f32 sin aliasing starts at n > ~122000 s; well beyond session life.
  return fract(sin(n) * 43758.5453123);
}

#pragma main
vec3 applyGlitchFb(
  vec2 uv,
  float enabled,
  float isActive,
  float strength,
  float speed,
  float cols,
  float rgb,
  float t
) {
  vec2 pos = uv;
  float rgbSplitPx = 0.0;

  if (enabled < 0.5 || isActive < 0.5 || strength < 0.0001) {
    return vec3(pos.x, pos.y, rgbSplitPx);
  }

  float tSlot = floor(t * speed);

  float intensity = step(0.85, glitchHashFb(tSlot * 3.1 + 17.3));
  float str = strength * mix(0.35, 1.0, intensity);

  rgbSplitPx = rgb * mix(4.0, 14.0, intensity);

  float band = floor(uv.y * cols);
  float h1   = glitchHashFb(band * 137.3 + tSlot);
  float h2   = glitchHashFb(band *  91.7 + tSlot + 1.0);

  if (h1 > 0.80) {
    // Type 1 -- thin horizontal shift.
    pos.x = clamp(pos.x + (h2 * 2.0 - 1.0) * str, 0.0, 1.0);
  } else if (h1 < 0.04) {
    // Type 2 -- large tear.
    pos.x = clamp(pos.x + (glitchHashFb(band + tSlot * 7.3) - 0.5) * str * 3.5, 0.0, 1.0);
  } else if (h1 > 0.72 && h1 < 0.78 && intensity > 0.5) {
    // Type 3 -- chroma burst error: large rgbSplitPx, no position shift.
    rgbSplitPx = strength * 80.0;
    float splitSign = ((uint(glitchHashFb(band * 137.3 + tSlot * 7.0 + 3.0) * 65536.0) & 1u) == 0u)
                      ? 1.0 : -1.0;
    rgbSplitPx = rgbSplitPx * splitSign;
  } else if (intensity > 0.5 && h1 > 0.62 && h1 < 0.68) {
    // Type 5 -- burst loss sentinel: -999 signals full desaturation to the kernel caller.
    rgbSplitPx = -999.0;
  }

  // Type 4 -- block chunk displacement.
  float blockRoll = glitchHashFb(tSlot * 17.3 + 5.1);
  if (blockRoll < 0.35 + intensity * 0.35) {
    float blockY = glitchHashFb(tSlot * 3.7  + 1.1);
    float blockH = 0.015 + glitchHashFb(tSlot * 11.3) * 0.07 * (1.0 + intensity);
    if (abs(uv.y - blockY) < blockH) {
      pos.x = clamp(pos.x + (glitchHashFb(tSlot * 23.1) - 0.5) * str * 2.5, 0.0, 1.0);
    }
  }

  pos = clamp(pos, vec2(0.0), vec2(1.0));
  return vec3(pos.x, pos.y, rgbSplitPx);
}
`);
