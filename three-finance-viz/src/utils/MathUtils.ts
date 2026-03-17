// src/utils/MathUtils.ts

/**
 * Returns the index of the first element in arr[0..count) >= target.
 * arr must be sorted ascending.  Returns count if all elements < target.
 */
export function lowerBound(arr: Float64Array, count: number, target: number): number {
  let lo = 0,
    hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Returns the index one past the last element in arr[0..count) <= target.
 * arr must be sorted ascending.  Returns 0 if all elements > target.
 */
export function upperBound(arr: Float64Array, count: number, target: number): number {
  let lo = 0,
    hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smooth cubic easing */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Safely normalize a value; returns 0 if range is zero */
export function safeNormalize(value: number, min: number, max: number): number {
  return max > min ? (value - min) / (max - min) : 0;
}

/**
 * Parse a CSS hex color that may carry an alpha channel (#rrggbb or #rrggbbaa).
 * THREE.Color only accepts 6-digit hex — strip the alpha and return it separately.
 * Returns { hex: string (6-digit), alpha: number (0–1) }.
 */
export function parseThemeColor(css: string): { hex: string; alpha: number } {
  if (css.length === 9 && css[0] === '#') {
    const alpha = parseInt(css.slice(7, 9), 16) / 255;
    return { hex: css.slice(0, 7), alpha };
  }
  if (css.length === 5 && css[0] === '#') {
    // 4-digit shorthand #rgba
    const a = parseInt(css[4], 16);
    const alpha = (a * 17) / 255;
    return { hex: `#${css[1]}${css[1]}${css[2]}${css[2]}${css[3]}${css[3]}`, alpha };
  }
  return { hex: css, alpha: 1 };
}
