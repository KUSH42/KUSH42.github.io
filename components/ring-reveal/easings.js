/**
 * Built-in easing functions for RingRevealAnimator.
 * All functions accept and return a normalised t in [0, 1].
 */

export const linear = t => t;

export const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutExpo = t =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const backInOut = t => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2;
};
