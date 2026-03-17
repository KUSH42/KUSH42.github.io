// src/utils/ColorMapper.ts

import * as THREE from 'three';
import { interpolateRgb } from 'd3-interpolate';

/**
 * Wraps d3-interpolate scales.
 * map(value, domain, colorRange) → THREE.Color
 * Used by OrderBookDepth heatmap.
 */
export class ColorMapper {
  private _color = new THREE.Color();

  /**
   * Map a value within a domain to a color within a range.
   * @param value - The value to map
   * @param domain - [min, max] of the input value
   * @param colorRange - [startColor, endColor] CSS color strings
   * @param out - Optional pre-allocated THREE.Color to write into (avoids allocation)
   */
  map(
    value: number,
    domain: [number, number],
    colorRange: [string, string],
    out?: THREE.Color,
  ): THREE.Color {
    const [min, max] = domain;
    const t = max > min ? Math.max(0, Math.min(1, (value - min) / (max - min))) : 0;
    const interpolate = interpolateRgb(colorRange[0], colorRange[1]);
    const cssColor = interpolate(t);
    const target = out ?? this._color;
    target.set(cssColor);
    return target;
  }

  /**
   * Create a pre-built interpolator for repeated mapping with the same color range.
   * Returns a function that maps [0,1] t-values to THREE.Color.
   */
  static buildScale(colorRange: [string, string]): (t: number, out: THREE.Color) => void {
    const interpolate = interpolateRgb(colorRange[0], colorRange[1]);
    return (t: number, out: THREE.Color) => {
      out.set(interpolate(Math.max(0, Math.min(1, t))));
    };
  }
}
