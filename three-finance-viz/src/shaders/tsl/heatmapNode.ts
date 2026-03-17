// src/shaders/tsl/heatmapNode.ts
// TSL node for heatmap rendering on the WebGPU path

/**
 * Creates a TSL node material for heatmap rendering on the WebGPU path.
 */
export async function createHeatmapNode(
  colorLow: string,
  colorHigh: string,
): Promise<unknown> {
  try {
    const tsl = await import('three/tsl' as string);
    const { Fn, uniform, vec3, mix } = tsl as Record<string, unknown>;

    if (typeof Fn === 'function') {
      const fn = Fn as (...args: unknown[]) => unknown;
      const uniformFn = uniform as (v: unknown) => unknown;
      const vec3Fn = vec3 as (...args: unknown[]) => unknown;
      const mixFn = mix as (...args: unknown[]) => unknown;

      const THREE = await import('three');
      const lowColor = new THREE.Color(colorLow);
      const highColor = new THREE.Color(colorHigh);

      const uLow = uniformFn(vec3Fn(lowColor.r, lowColor.g, lowColor.b));
      const uHigh = uniformFn(vec3Fn(highColor.r, highColor.g, highColor.b));

      const heatmapNode = fn(([normValue]: [unknown]) => {
        return mixFn(uLow, uHigh, normValue);
      });

      void uLow;
      void uHigh;

      return heatmapNode;
    }
  } catch (_e) {
    // three/tsl not available
  }
  return null;
}
