/**
 * Animation constants and easing functions for the threat-map node-select animation.
 * All durations are in milliseconds.
 */

export const ANIM = {
  // ── Select phase timings ─────────────────────────────────────
  NODE_FLASH_DUR:        80,   // ms: flash color holds before settling
  NODE_SETTLE_DUR:      140,   // ms: lerp from flash color → selected highlight color
  // NOTE: NODE_FLASH_DUR + NODE_SETTLE_DUR must equal NODE_SCALE_DUR (80+140=220 ✓)
  NODE_SCALE_PEAK:      1.9,   // multiplier: peak scale during select pulse
  NODE_SCALE_DUR:       220,   // ms: total duration of select scale pulse (rise+fall)
  NODE_SCALE_RISE:      0.35,  // fraction of NODE_SCALE_DUR spent rising (0→peak)

  CROSSHAIR_IN_DUR:     200,   // ms: crosshair scale 60%→100% + border clip draw
  CROSSHAIR_IN_DELAY:    40,   // ms: delay after setActiveNode call before crosshair starts
  HAIRLINE_IN_DUR:      180,   // ms: hairlines extend from centre outward
  HAIRLINE_IN_DELAY:     60,   // ms: hairlines start after crosshair begin

  LABEL_CHAR_RATE:       38,   // ms per character
  LABEL_CURSOR_BLINK:   530,   // ms per blink half-cycle
  LABEL_START_DELAY:    250,   // ms: label starts after crosshair clip completes

  COORD_SCRAMBLE_DUR:   320,   // ms: coordinate roll effect total duration
  COORD_SCRAMBLE_DELAY:  80,   // ms: delay from setActiveNode call before coord scrambles start

  // ── Deselect phase timings ───────────────────────────────────
  DESELECT_LABEL_DUR:   100,   // ms: label fades out
  DESELECT_CROSSHAIR_DELAY: 80,// ms: crosshair starts collapsing after label fade begins
  DESELECT_CROSSHAIR_DUR:  180, // ms: crosshair scale 100%→60% + opacity fade
  DESELECT_HAIRLINE_DUR:   160, // ms: hairlines collapse back
  DESELECT_NODE_DELAY:  120,   // ms: delay from setActiveNode(null) call before deselectTween starts
  DESELECT_NODE_DUR:    180,   // ms: node scale-down pulse + return to level color

  // ── Shared ──────────────────────────────────────────────────
  NODE_DESELECT_SCALE_TROUGH: 0.65, // multiplier: how far down the node dips on deselect
};

/** Ease-out cubic: fast start, decelerates */
export function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/** Ease-in cubic: slow start, accelerates */
export function easeInCubic(t) { return t * t * t; }

/** Ease-in-out cubic */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
