// src/interaction/PriceTicker.ts

export class PriceTicker {
  private el: HTMLElement;

  constructor(container: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'chart-price-ticker';
    this.el.style.cssText = `
      position: absolute; top: 10px; right: 270px; z-index: 90;
      font: 700 14px 'Roboto Mono', monospace; pointer-events: none;
      padding: 4px 8px; border-radius: 3px;
      background: rgba(12,14,18,0.7);
    `;
    container.appendChild(this.el);
  }

  /**
   * Update the price ticker with latest price
   * @param price - Current price value
   * @param isBull - Whether price is bullish (close >= open)
   */
  update(price: number, isBull: boolean): void {
    this.el.textContent = price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    this.el.style.color = isBull ? '#26a69a' : '#ef5350';
  }

  dispose(): void {
    this.el.remove();
  }
}
