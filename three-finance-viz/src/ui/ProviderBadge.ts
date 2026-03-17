// src/ui/ProviderBadge.ts

/**
 * ProviderBadge — small HUD element showing the active exchange name
 * with a live-circle dot that flashes red on every incoming API update.
 *
 * Layout (positioned just below PriceTicker at top-right):
 *   [● BINANCE]
 */
export class ProviderBadge {
  private readonly el:    HTMLElement;
  private readonly dot:   HTMLElement;
  private readonly label: HTMLElement;
  private _flashTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'chart-provider-badge';
    this.el.style.cssText = [
      'position:absolute', 'top:36px', 'right:270px', 'z-index:90',
      'display:flex', 'align-items:center', 'gap:5px',
      "font:600 10px 'Roboto Mono',monospace",
      'letter-spacing:0.06em',
      'pointer-events:none',
      'padding:3px 7px',
      'border-radius:3px',
      'background:rgba(12,14,18,0.7)',
      'color:#555',
    ].join(';');

    this.dot = document.createElement('span');
    this.dot.style.cssText = [
      'display:inline-block',
      'width:7px', 'height:7px',
      'border-radius:50%',
      'flex-shrink:0',
      'background:#333',
      'transition:background 0.5s ease',
    ].join(';');

    this.label = document.createElement('span');
    this.label.textContent = '—';

    this.el.appendChild(this.dot);
    this.el.appendChild(this.label);
    container.appendChild(this.el);
  }

  /**
   * Set (or update) the exchange name shown in the badge.
   * Switches the dot to a dim "connected" green.
   */
  setProvider(name: string): void {
    this.label.textContent = name.toUpperCase();
    this.el.style.color = '#888';
    this._setDot('#1e5c4a');   // dim teal-green = connected, idle
  }

  /**
   * Flash the live-circle red for ~120 ms to signal an incoming API update,
   * then decay back to the connected-idle colour.
   * Safe to call at streaming frequency (≥ 1 Hz) — rapid calls coalesce.
   */
  flashUpdate(): void {
    if (this._flashTimer !== null) {
      clearTimeout(this._flashTimer);
      this._flashTimer = null;
    }
    // Instant red — no transition
    this.dot.style.transition = 'background 0s';
    this.dot.style.background = '#ef5350';

    this._flashTimer = setTimeout(() => {
      // Slow decay back to connected-idle
      this.dot.style.transition = 'background 0.5s ease';
      this.dot.style.background = '#1e5c4a';
      this._flashTimer = null;
    }, 120);
  }

  dispose(): void {
    if (this._flashTimer !== null) {
      clearTimeout(this._flashTimer);
      this._flashTimer = null;
    }
    this.el.remove();
  }

  // ── private ────────────────────────────────────────────────────────────────

  private _setDot(color: string): void {
    this.dot.style.transition = 'background 0.3s ease';
    this.dot.style.background = color;
  }
}
