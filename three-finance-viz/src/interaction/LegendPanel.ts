// src/interaction/LegendPanel.ts
import type { IndicatorConfig } from '../types/addendum';

export class LegendPanel {
  private el: HTMLElement;

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'chart-legend';
    this.el.style.cssText = `
      position: absolute; top: 10px; left: 10px; z-index: 90;
      display: flex; flex-direction: column; gap: 4px;
      pointer-events: none;
    `;
    container.appendChild(this.el);
  }

  /**
   * Update the legend with current enabled indicators
   * @param indicators - Array of all indicator configs
   */
  update(indicators: IndicatorConfig[]): void {
    this.el.innerHTML = indicators
      .filter(c => c.enabled)
      .map(c => `
        <div style="display:flex;align-items:center;gap:6px;
                    font:11px monospace;color:#ccc">
          <span style="display:inline-block;width:18px;height:3px;
                       background:${c.color};border-radius:2px"></span>
          <span>${c.type}${(c as any).period ? `(${(c as any).period})` : ''}</span>
        </div>
      `).join('');
  }

  dispose(): void {
    this.el.remove();
  }
}
