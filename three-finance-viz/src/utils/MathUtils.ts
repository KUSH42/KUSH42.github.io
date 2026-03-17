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
 * Build a Quaternion from three orthonormal basis vectors (xAxis, yAxis, zAxis).
 * Equivalent to THREE.Matrix4.makeBasis(x, y, z).quaternion — extracted here
 * so callers avoid constructing a Matrix4 when only a quaternion is needed.
 *
 * Prerequisite: {xAxis, yAxis, zAxis} must be orthonormal (unit length, mutually
 * perpendicular).  No normalisation is performed here for performance.
 */
export function quatFromBasis(
  xAxis: { x: number; y: number; z: number },
  yAxis: { x: number; y: number; z: number },
  zAxis: { x: number; y: number; z: number },
  out: { x: number; y: number; z: number; w: number },
): void {
  // Shepperd's method — choose largest diagonal element to maximise numerical stability.
  const m00 = xAxis.x, m10 = xAxis.y, m20 = xAxis.z;
  const m01 = yAxis.x, m11 = yAxis.y, m21 = yAxis.z;
  const m02 = zAxis.x, m12 = zAxis.y, m22 = zAxis.z;

  const trace = m00 + m11 + m22;

  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    out.w = 0.25 / s;
    out.x = (m21 - m12) * s;
    out.y = (m02 - m20) * s;
    out.z = (m10 - m01) * s;
  } else if (m00 > m11 && m00 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
    out.w = (m21 - m12) / s;
    out.x = 0.25 * s;
    out.y = (m01 + m10) / s;
    out.z = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
    out.w = (m02 - m20) / s;
    out.x = (m01 + m10) / s;
    out.y = 0.25 * s;
    out.z = (m12 + m21) / s;
  } else {
    const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
    out.w = (m10 - m01) / s;
    out.x = (m02 + m20) / s;
    out.y = (m12 + m21) / s;
    out.z = 0.25 * s;
  }
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
