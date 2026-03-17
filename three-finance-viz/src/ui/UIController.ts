// src/ui/UIController.ts
import { debounce, throttle } from '../utils/timing';
import type { UIState, IndicatorConfig, EventBus, IndicatorType } from '../types/addendum';

// ── HTML Template ─────────────────────────────────────────────────────────────

const UI_TEMPLATE = `
<div id="chart-ui-root" class="chart-ui" data-theme="dark">

  <!-- Collapse toggle -->
  <button class="chart-ui__toggle" aria-label="Toggle settings">☰</button>

  <div class="chart-ui__panel">

    <!-- Section: Symbol & Interval -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Symbol</label>
      <div class="chart-ui__symbol-input">
        <input type="text" id="ui-symbol" value="BTCUSDT" autocomplete="off"
               list="ui-symbol-list" />
        <datalist id="ui-symbol-list">
          <option value="BTCUSDT" /><option value="ETHUSDT" />
        </datalist>
      </div>

      <label class="chart-ui__label">Interval</label>
      <div class="chart-ui__pill-group" id="ui-interval-group">
        <button class="chart-ui__pill" data-value="1m">1m</button>
        <button class="chart-ui__pill" data-value="5m">5m</button>
        <button class="chart-ui__pill" data-value="15m">15m</button>
        <button class="chart-ui__pill chart-ui__pill--active" data-value="1h">1h</button>
        <button class="chart-ui__pill" data-value="4h">4h</button>
        <button class="chart-ui__pill" data-value="1D">1D</button>
        <button class="chart-ui__pill" data-value="1W">1W</button>
      </div>
    </section>

    <!-- Section: Time Range -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Time Range</label>
      <div class="chart-ui__range-row">
        <input type="datetime-local" id="ui-range-start" />
        <span>→</span>
        <input type="datetime-local" id="ui-range-end" />
      </div>
      <button class="chart-ui__btn" id="ui-zoom-fit">Zoom to Fit</button>
      <!-- Navigator bar — custom canvas element -->
      <canvas id="ui-navigator" height="40"></canvas>
    </section>

    <!-- Section: Layout Mode -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Layout</label>
      <div class="chart-ui__pill-group" id="ui-layout-group">
        <button class="chart-ui__pill chart-ui__pill--active" data-value="Linear">Linear</button>
        <button class="chart-ui__pill" data-value="Helix">Helix</button>
        <button class="chart-ui__pill" data-value="Tunnel">Tunnel</button>
      </div>
    </section>

    <!-- Section: Indicators -->
    <section class="chart-ui__section" id="ui-indicators-section">
      <label class="chart-ui__label">Indicators
        <button class="chart-ui__add-btn" id="ui-add-indicator">+</button>
      </label>
      <div id="ui-indicator-list">
        <!-- Dynamically populated -->
      </div>
    </section>

    <!-- Section: Theme -->
    <section class="chart-ui__section">
      <label class="chart-ui__label">Theme</label>
      <div class="chart-ui__pill-group" id="ui-theme-group">
        <button class="chart-ui__pill chart-ui__pill--active" data-value="dark">Dark</button>
        <button class="chart-ui__pill" data-value="light">Light</button>
      </div>
      <div class="chart-ui__color-row">
        <span>Bull</span>
        <input type="color" id="ui-color-bull" value="#26a69a" />
        <span>Bear</span>
        <input type="color" id="ui-color-bear" value="#ef5350" />
      </div>
    </section>

  </div><!-- /.chart-ui__panel -->
</div><!-- /#chart-ui-root -->
`;

// ── CSS Styles ────────────────────────────────────────────────────────────────

const UI_STYLES = `
.chart-ui {
  position: absolute;
  top: 0; right: 0;
  width: 260px;
  height: 100%;
  z-index: 100;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  pointer-events: none;
  user-select: none;
}

.chart-ui__panel {
  position: absolute;
  top: 0; right: 0;
  width: 260px;
  height: 100%;
  background: rgba(12, 14, 18, 0.92);
  backdrop-filter: blur(8px);
  border-left: 1px solid rgba(255,255,255,0.06);
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: all;
  transform: translateX(0);
  transition: transform 0.25s ease;
}

.chart-ui__panel--collapsed {
  transform: translateX(260px);
}

.chart-ui__toggle {
  position: absolute;
  top: 12px; right: 268px;
  z-index: 101;
  pointer-events: all;
  background: rgba(12,14,18,0.85);
  border: 1px solid rgba(255,255,255,0.1);
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
}

.chart-ui__section {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.chart-ui__label {
  display: block;
  color: #666;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.chart-ui__symbol-input input {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  pointer-events: all;
  box-sizing: border-box;
}

.chart-ui__pill-group { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.chart-ui__pill {
  padding: 3px 8px; border-radius: 3px; cursor: pointer;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: #888; font-size: 11px; pointer-events: all;
  transition: background 0.15s, color 0.15s;
}
.chart-ui__pill--active { background: rgba(38,166,154,0.25); color: #26a69a; border-color: #26a69a; }

.chart-ui__range-row {
  display: flex; align-items: center; gap: 4px; margin: 6px 0;
  color: #666;
}
.chart-ui__range-row input {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 10px;
  pointer-events: all;
}

.chart-ui__btn {
  width: 100%;
  margin: 6px 0;
  padding: 5px;
  background: rgba(38,166,154,0.15);
  border: 1px solid #26a69a44;
  color: #26a69a;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  pointer-events: all;
}

#ui-navigator {
  width: 100%;
  display: block;
  cursor: ew-resize;
  pointer-events: all;
}

.chart-ui__add-btn {
  float: right;
  background: rgba(38,166,154,0.2);
  border: 1px solid #26a69a44;
  color: #26a69a;
  border-radius: 3px;
  cursor: pointer;
  padding: 0 6px;
  font-size: 14px;
  pointer-events: all;
}

.chart-ui__indicator-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.chart-ui__indicator-type {
  color: #aaa;
  font-size: 11px;
  flex: 1;
}

.chart-ui__period-input {
  width: 50px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 11px;
  pointer-events: all;
}

.chart-ui__indicator-color {
  width: 24px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  pointer-events: all;
}

.chart-ui__remove-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  padding: 0 4px;
  pointer-events: all;
}
.chart-ui__remove-btn:hover { color: #ef5350; }

.chart-ui__switch { position: relative; display: inline-block; width: 28px; height: 16px; }
.chart-ui__switch input { opacity: 0; width: 0; height: 0; }
.chart-ui__switch-track {
  position: absolute; cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  pointer-events: all;
  transition: background 0.2s;
}
.chart-ui__switch input:checked + .chart-ui__switch-track { background: #26a69a; }
.chart-ui__switch-track:before {
  content: '';
  position: absolute;
  width: 12px; height: 12px;
  left: 2px; bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.chart-ui__switch input:checked + .chart-ui__switch-track:before { transform: translateX(12px); }

.chart-ui__color-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: #888;
  font-size: 11px;
}
.chart-ui__color-row input[type=color] {
  width: 32px; height: 22px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 3px;
  background: none;
  cursor: pointer;
  pointer-events: all;
}

[data-theme="light"] .chart-ui__panel { background: rgba(248,248,248,0.95); }
[data-theme="light"] .chart-ui__pill  { color: #444; background: rgba(0,0,0,0.05); }
[data-theme="light"] .chart-ui__label { color: #888; }
[data-theme="light"] .chart-ui__symbol-input input { color: #333; background: rgba(0,0,0,0.05); }
`;

// ── UIController ─────────────────────────────────────────────────────────────

export class UIController {
  private root:      HTMLElement;
  private panel:     HTMLElement;
  private state:     UIState;
  private bus:       EventBus;
  private collapsed  = false;
  private styleEl:   HTMLStyleElement;

  constructor(container: HTMLElement, initialState: UIState, bus: EventBus) {
    this.state = { ...initialState };
    this.bus   = bus;

    // Inject styles
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = UI_STYLES;
    document.head.appendChild(this.styleEl);

    // _createDOM() and panel assignment happen before _bindEvents() and syncFromState()
    this.root  = this._createDOM();
    this.panel = this.root.querySelector('.chart-ui__panel') as HTMLElement;
    container.appendChild(this.root);
    this._bindEvents();
    this.syncFromState(this.state);
  }

  private _createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = UI_TEMPLATE;
    return div.firstElementChild as HTMLElement;
  }

  private _bindEvents(): void {
    // Collapse toggle
    this.root.querySelector('.chart-ui__toggle')!
      .addEventListener('click', () => this.togglePanel());

    // Symbol input — debounced
    const symbolInput = this.root.querySelector<HTMLInputElement>('#ui-symbol')!;
    symbolInput.addEventListener('change', debounce((e: Event) => {
      const symbol = (e.target as HTMLInputElement).value.toUpperCase().trim();
      if (symbol === this.state.symbol) return;
      this.state.symbol = symbol;
      this.bus.emit('symbolChange', { symbol });
    }, 400));

    // Interval pills
    this.root.querySelector('#ui-interval-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-interval-group', btn.dataset.value!);
        this.state.interval = btn.dataset.value!;
        this.bus.emit('intervalChange', { interval: this.state.interval });
      });

    // Layout pills
    this.root.querySelector('#ui-layout-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-layout-group', btn.dataset.value!);
        this.state.layoutMode = btn.dataset.value as UIState['layoutMode'];
        this.bus.emit('layoutChange', { mode: this.state.layoutMode });
      });

    // Theme
    this.root.querySelector('#ui-theme-group')!
      .addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-value]') as HTMLElement;
        if (!btn) return;
        this._setActivePill('#ui-theme-group', btn.dataset.value!);
        this.state.theme = btn.dataset.value as 'dark' | 'light';
        this.root.dataset.theme = this.state.theme;
        this.bus.emit('themeChange', { theme: this.state.theme });
      });

    // Color pickers — throttled
    (['bull', 'bear'] as const).forEach(key => {
      this.root.querySelector<HTMLInputElement>(`#ui-color-${key}`)!
        .addEventListener('input', throttle((e: Event) => {
          const val = (e.target as HTMLInputElement).value;
          (this.state.paletteOverrides as any)[`${key}Candle`] = val;
          this.bus.emit('paletteChange', this.state.paletteOverrides);
        }, 100));
    });

    // Zoom to fit
    this.root.querySelector('#ui-zoom-fit')!
      .addEventListener('click', () => this.bus.emit('zoomToFit', {}));

    // Add indicator
    this.root.querySelector('#ui-add-indicator')!
      .addEventListener('click', () => this._openIndicatorPicker());
  }

  private _renderIndicatorRow(config: IndicatorConfig): void {
    const list = this.root.querySelector('#ui-indicator-list')!;
    const row  = document.createElement('div');
    row.className = 'chart-ui__indicator-row';
    row.dataset.id = config.id;
    row.innerHTML = `
      <label class="chart-ui__switch">
        <input type="checkbox" ${config.enabled ? 'checked' : ''} data-action="toggle" />
        <span class="chart-ui__switch-track"></span>
      </label>
      <span class="chart-ui__indicator-type">${config.type}</span>
      <input type="number" class="chart-ui__period-input"
        value="${(config as any).period ?? ''}"
        min="2" max="500" step="1" data-action="period" />
      <input type="color" class="chart-ui__indicator-color"
        value="${config.color}" data-action="color" />
      <button class="chart-ui__remove-btn" data-action="remove">×</button>
    `;

    row.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLElement;
      const action = target.dataset.action;
      if (action === 'toggle')
        this.bus.emit('indicatorToggle', { id: config.id, enabled: (target as HTMLInputElement).checked });
      if (action === 'period')
        this.bus.emit('indicatorUpdate', { id: config.id, period: Number((target as HTMLInputElement).value) });
      if (action === 'color')
        this.bus.emit('indicatorUpdate', { id: config.id, color: (target as HTMLInputElement).value });
    });

    row.querySelector('[data-action="remove"]')!.addEventListener('click', () => {
      this.bus.emit('indicatorRemove', { id: config.id });
      row.remove();
    });

    list.appendChild(row);
  }

  /**
   * Force a UI re-render from external state change
   * @param state - Partial state to sync
   */
  syncFromState(state: Partial<UIState>): void {
    if (state.symbol !== undefined)
      (this.root.querySelector<HTMLInputElement>('#ui-symbol')!).value = state.symbol;
    if (state.interval !== undefined)
      this._setActivePill('#ui-interval-group', state.interval);
    if (state.theme !== undefined) {
      this._setActivePill('#ui-theme-group', state.theme);
      this.root.dataset.theme = state.theme;
    }
    if (state.indicators !== undefined) {
      this.root.querySelector('#ui-indicator-list')!.innerHTML = '';
      state.indicators.forEach(cfg => this._renderIndicatorRow(cfg));
    }
  }

  /**
   * Show/hide the settings panel
   * @param visible - Force visible state (toggles if not provided)
   */
  togglePanel(visible?: boolean): void {
    this.collapsed = visible !== undefined ? !visible : !this.collapsed;
    this.panel.classList.toggle('chart-ui__panel--collapsed', this.collapsed);
  }

  /**
   * Register an event bus listener
   * @param event - Event name
   * @param handler - Event handler
   */
  on(event: string, handler: Function): void {
    this.bus.on(event, handler as (...args: any[]) => void);
  }

  dispose(): void {
    this.root.remove();
    this.styleEl.remove();
  }

  // ── Private helpers ───────────────────────────────────────────────────────────

  private _setActivePill(groupSelector: string, value: string): void {
    this.root.querySelectorAll(`${groupSelector} .chart-ui__pill`).forEach(btn => {
      btn.classList.toggle('chart-ui__pill--active',
        (btn as HTMLElement).dataset.value === value);
    });
  }

  // NOTE: This is a placeholder implementation using native `prompt()` dialogs.
  // Production builds should replace this with a proper modal UI.
  private _openIndicatorPicker(): void {
    const type = prompt('Indicator type: SMA, EMA, BB, RSI, MACD') as IndicatorType;
    if (!type) return;
    const period = parseInt(prompt('Period:', '20') || '20', 10);
    const id = `${type.toLowerCase()}_${period}_${Date.now()}`;
    const config = {
      id, type: type as 'SMA', enabled: true,
      period, source: 'close' as const,
      color: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'),
      opacity: 1, lineWidth: 2,
    };
    this.state.indicators.push(config);
    this._renderIndicatorRow(config);
    this.bus.emit('indicatorAdd', config);
  }
}
