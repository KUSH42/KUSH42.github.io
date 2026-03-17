// src/interaction/TooltipOverlay.ts
import * as THREE from 'three';
import type { OHLCVCandle } from '../types/market';
import type { SupportedRenderer } from '../renderer/createRenderer';

export class TooltipOverlay {
  private el: HTMLDivElement;

  constructor(
    container: HTMLElement,
    private camera: THREE.Camera,
    private renderer: SupportedRenderer,
  ) {
    this.el = document.createElement('div');
    this.el.setAttribute('role', 'status'); // ARIA live region
    this.el.setAttribute('aria-live', 'polite');
    this.el.setAttribute('aria-atomic', 'true');
    this.el.className = 'tfv-tooltip';
    Object.assign(this.el.style, {
      position: 'absolute',
      pointerEvents: 'none',
      display: 'none',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '12px',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      whiteSpace: 'pre',
      backdropFilter: 'blur(8px)',
      zIndex: '10',
    });
    container.appendChild(this.el);
  }

  applyTheme(theme: import('../types/theme').ChartTheme): void {
    Object.assign(this.el.style, {
      background: theme.tooltip.background,
      color: theme.tooltip.text,
      border: `1px solid ${theme.tooltip.border}`,
    });
  }

  show(candle: OHLCVCandle, worldPos: THREE.Vector3): void {
    const ndc = worldPos.clone().project(this.camera);
    const canvas = this.renderer.domElement;
    const x = (ndc.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (-ndc.y * 0.5 + 0.5) * canvas.clientHeight;
    // Clamp within canvas bounds
    const margin = 8;
    const clampX = Math.min(x + 16, canvas.clientWidth - 160 - margin);
    const clampY = Math.min(y - 8, canvas.clientHeight - 100 - margin);
    this.el.style.left = `${Math.max(margin, clampX)}px`;
    this.el.style.top = `${Math.max(margin, clampY)}px`;
    this.el.style.display = 'block';
    this.el.textContent = this._format(candle);
  }

  hide(): void {
    this.el.style.display = 'none';
  }

  private _format(c: OHLCVCandle): string {
    // All timestamps are UTC; always display as UTC to avoid TZ ambiguity
    const d = new Date(c.time).toISOString().slice(0, 16).replace('T', ' ');
    const dir = c.close >= c.open ? '▲' : '▼';
    return `${d} UTC  ${dir}\nO ${c.open.toFixed(2)}  H ${c.high.toFixed(2)}\nL ${c.low.toFixed(2)}  C ${c.close.toFixed(2)}\nVol ${c.volume.toLocaleString()}`;
  }

  dispose(): void {
    this.el.remove();
  }
}
