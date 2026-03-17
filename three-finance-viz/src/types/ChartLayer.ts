// src/types/ChartLayer.ts (exported from src/index.ts)

import type { LayoutEngine } from '../layout/LayoutEngine';
import type { ChartTheme } from './theme';

export interface ChartLayer {
  /** Called once per animation frame by FinanceChart */
  update(deltaMs: number): void;
  /** Called when the user switches layout mode */
  onLayoutChange(layout: LayoutEngine): void;
  /** Called when the user switches theme */
  onThemeChange(theme: ChartTheme): void;
  /** Release all GPU resources and remove from scene */
  dispose(): void;
}
