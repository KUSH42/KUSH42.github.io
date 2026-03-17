// src/shaders/tsl/candleNode.ts
// TSL (Three Shading Language) node for WebGPU path
// These functions use the three/tsl module which is only available with WebGPU-enabled Three.js builds

/**
 * Creates a TSL node material for candle rendering on the WebGPU path.
 * Falls back gracefully when three/tsl is not available.
 */
export async function createCandleNode(): Promise<unknown> {
  try {
    // Dynamic import to avoid bundler errors when three/tsl is not present
    const tsl = await import('three/tsl' as string);
    const { Fn, uniform, vec4, attribute } = tsl as Record<string, unknown>;

    if (typeof Fn === 'function') {
      const fn = Fn as (...args: unknown[]) => unknown;
      const vec4Fn = vec4 as (...args: unknown[]) => unknown;
      const attributeFn = attribute as (...args: unknown[]) => unknown;

      const candleColorNode = fn(() => {
        const instanceColor = attributeFn('instanceColor', 'vec3');
        return vec4Fn(instanceColor, 1.0);
      });

      void uniform; // used by callers for uniforms
      return candleColorNode;
    }
  } catch (_e) {
    // three/tsl not available — use WebGL fallback
  }
  return null;
}
