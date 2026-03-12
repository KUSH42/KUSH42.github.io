/**
 * components/system-telemetry.js
 * SystemTelemetry JS API — metric bar and value update with threshold event.
 *
 * Usage:
 *   import { setValue } from './components/system-telemetry.js';
 */

// ── Internal state ─────────────────────────────────────────────
// Tracks previous threshold crossing to fire the event only once per crossing

const _prevCritical = new WeakMap();

// ── setValue ───────────────────────────────────────────────────

/**
 * Update a `.s9-telemetry__metric` element to reflect a 0–100 value.
 * - Sets bar-fill width
 * - Applies correct --ok / --warning / --critical modifier class
 * - Updates numeric value text
 * - Fires `s9:telemetry-threshold` on first crossing into critical (>85)
 *
 * @param {HTMLElement} metricEl - .s9-telemetry__metric element
 * @param {number} value - 0 to 100
 */
export function setValue(metricEl, value) {
  const clamped = Math.max(0, Math.min(100, value));

  // ── Bar fill ─────────────────────────────────────────────────
  const fill = metricEl.querySelector('.s9-telemetry__bar-fill');
  if (fill) {
    fill.style.width = `${clamped}%`;

    const stateClasses = [
      's9-telemetry__bar-fill--ok',
      's9-telemetry__bar-fill--warning',
      's9-telemetry__bar-fill--critical',
    ];
    fill.classList.remove(...stateClasses);

    if (clamped <= 60) {
      fill.classList.add('s9-telemetry__bar-fill--ok');
    } else if (clamped <= 85) {
      fill.classList.add('s9-telemetry__bar-fill--warning');
    } else {
      fill.classList.add('s9-telemetry__bar-fill--critical');
    }
  }

  // ── Numeric value ─────────────────────────────────────────────
  const valueEl = metricEl.querySelector('.s9-telemetry__value');
  if (valueEl) {
    valueEl.textContent = Math.round(clamped).toString();
  }

  // ── Threshold event ───────────────────────────────────────────
  const wasCritical = _prevCritical.get(metricEl) ?? false;
  const isCritical = clamped > 85;

  if (isCritical && !wasCritical) {
    metricEl.dispatchEvent(
      new CustomEvent('s9:telemetry-threshold', {
        bubbles: true,
        detail: { value: clamped },
      })
    );
  }

  _prevCritical.set(metricEl, isCritical);
}
