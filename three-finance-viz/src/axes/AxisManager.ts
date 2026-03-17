// src/axes/AxisManager.ts
import * as THREE from 'three';
import { timeHour, timeDay, timeWeek, timeMonth } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import type { VisibleRange, ThemePalette, LayoutMode, AxisConfig } from '../types/addendum';
import type { TroikaLabelPool } from '../labels/TroikaLabelPool';

// ── Internal types ────────────────────────────────────────────────────────────

interface PriceTick {
  value: number;
  world_y: number;
}

interface TimeTick {
  date: Date;
  world_x: number;
}

interface AxisScales {
  priceToWorldY: (price: number) => number;
  worldYToPrice: (worldY: number) => number;
  indexToWorldX: (index: number) => number;
  /** Optional: binary-search a candle index for the given timestamp. */
  timeToIndex?: (timeMs: number) => number;
}

// ── GridGeometryManager ────────────────────────────────────────────────────────

class GridGeometryManager {
  private readonly MAX_LINES = 64;
  private geometry: THREE.BufferGeometry;
  private posAttr: THREE.BufferAttribute;
  readonly lineMesh: THREE.LineSegments;

  constructor(material: THREE.LineBasicMaterial) {
    // Pre-allocate: 64 lines × 2 endpoints × 3 components
    const positions = new Float32Array(this.MAX_LINES * 2 * 3);
    this.posAttr = new THREE.BufferAttribute(positions, 3);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', this.posAttr);
    this.geometry.setDrawRange(0, 0);
    this.lineMesh = new THREE.LineSegments(this.geometry, material);
    this.lineMesh.renderOrder = 0;
  }

  updateTicks(ticks: Array<{ worldPos: number; axis: 'x' | 'y' | 'z'; gridXMin: number; gridXMax: number }>): void {
    const pos = this.posAttr.array as Float32Array;
    let i = 0;

    for (const tick of ticks) {
      if (i >= this.MAX_LINES) break;
      const base = i * 6; // 2 vertices × 3 components
      if (tick.axis === 'y') {
        pos[base]   = tick.gridXMin; pos[base+1] = tick.worldPos; pos[base+2] = 0;
        pos[base+3] = tick.gridXMax; pos[base+4] = tick.worldPos; pos[base+5] = 0;
      } else if (tick.axis === 'x') {
        pos[base]   = tick.worldPos; pos[base+1] = -5; pos[base+2] = 0;
        pos[base+3] = tick.worldPos; pos[base+4] = 10; pos[base+5] = 0;
      }
      i++;
    }

    this.posAttr.needsUpdate = true;
    this.geometry.setDrawRange(0, i * 2);
  }

  dispose(): void {
    this.geometry.dispose();
  }
}

// ── Tick generation ────────────────────────────────────────────────────────────

function generatePriceTicks(
  priceMin: number,
  priceMax: number,
  priceScale: (price: number) => number,
  targetCount: number = 8,
): PriceTick[] {
  const range = priceMax - priceMin;
  if (range <= 0) return [];
  // Nice round step using d3-scale logic
  const rawStep = range / targetCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = Math.ceil(rawStep / magnitude) * magnitude;

  const first = Math.ceil(priceMin / step) * step;
  const ticks: PriceTick[] = [];
  for (let val = first; val <= priceMax; val += step) {
    ticks.push({ value: val, world_y: priceScale(val) });
  }
  return ticks;
}

function selectD3TimeInterval(_interval: string, durationMs: number) {
  // Select appropriate d3-time interval based on chart interval and visible duration
  if (durationMs < 1000 * 60 * 60 * 24 * 2) return timeHour;      // < 2 days: hourly
  if (durationMs < 1000 * 60 * 60 * 24 * 30) return timeDay;       // < 30 days: daily
  if (durationMs < 1000 * 60 * 60 * 24 * 180) return timeWeek;     // < 180 days: weekly
  return timeMonth;                                                   // else: monthly
}

function generateTimeTicks(
  startTime: number,
  endTime: number,
  interval: string,
  indexToWorldX: (index: number) => number,
  startIndex: number,
  endIndex: number,
  maxCount: number = 12,
  scales?: AxisScales,
): TimeTick[] {
  const duration = endTime - startTime;
  if (duration <= 0) return [];

  const d3Interval = selectD3TimeInterval(interval, duration);
  const rawTicks = d3Interval.range(new Date(startTime), new Date(endTime));

  // Thin to maxCount
  const stride = Math.ceil(rawTicks.length / maxCount);
  const thinned = rawTicks.filter((_, i) => i % stride === 0);

  // Map each tick date to a world X
  const totalDuration = endTime - startTime;
  return thinned.map(d => {
    let idx: number;
    if (scales?.timeToIndex) {
      // Accurate: binary-search actual candle timestamps
      idx = scales.timeToIndex(d.getTime());
      idx = Math.max(startIndex, Math.min(endIndex, idx));
    } else {
      // Fallback: linear interpolation
      const frac = (d.getTime() - startTime) / totalDuration;
      idx = Math.round(startIndex + frac * (endIndex - startIndex));
      idx = Math.max(startIndex, Math.min(endIndex, idx));
    }
    return { date: d, world_x: indexToWorldX(idx) };
  });
}

// ── AxisManager ────────────────────────────────────────────────────────────────

export class AxisManager {
  private scene: THREE.Scene;
  private scales: AxisScales;
  private config: AxisConfig;
  private gridManager: GridGeometryManager;
  private gridMaterial: THREE.LineBasicMaterial;
  private labelPool?: TroikaLabelPool;
  private currentInterval = '1h';

  // Formatters
  private formatHour  = timeFormat('%H:%M');
  private formatDay   = timeFormat('%b %d');
  private formatMonth = timeFormat('%b %Y');

  constructor(scene: THREE.Scene, scales: AxisScales, config: AxisConfig) {
    this.scene  = scene;
    this.scales = scales;
    this.config = config;
    this.labelPool = config.labelPool;

    this.gridMaterial = new THREE.LineBasicMaterial({
      color: 0x2e3247,   // matches DARK_THEME.grid default; overridden by setTheme()
      transparent: true,
      opacity: 0.6,
    });

    this.gridManager = new GridGeometryManager(this.gridMaterial);
    scene.add(this.gridManager.lineMesh);
  }

  /**
   * Called after zoom/pan — updates tick positions and label values.
   * @param visibleRange - Current visible candle range
   * @param camera - Current camera
   * @param tickOptions - Optional tick count overrides
   */
  update(
    visibleRange: VisibleRange,
    camera: THREE.Camera,
    tickOptions?: { priceTickCount?: number; timeTickCount?: number },
  ): void {
    const priceTickCount = tickOptions?.priceTickCount ?? 8;
    const timeTickCount  = tickOptions?.timeTickCount  ?? 12;

    const priceTicks = generatePriceTicks(
      visibleRange.priceMin,
      visibleRange.priceMax,
      this.scales.priceToWorldY,
      priceTickCount,
    );

    const timeTicks = generateTimeTicks(
      visibleRange.startTime,
      visibleRange.endTime,
      this.currentInterval,
      this.scales.indexToWorldX,
      visibleRange.startIndex,
      visibleRange.endIndex,
      timeTickCount,
      this.scales,
    );

    // Update grid geometry
    const tickData: Array<{ worldPos: number; axis: 'x' | 'y' | 'z'; gridXMin: number; gridXMax: number }> = [
      ...priceTicks.map(t => ({
        worldPos: t.world_y,
        axis: 'y' as const,
        gridXMin: this.config.gridXMin,
        gridXMax: this.config.gridXMax,
      })),
      ...timeTicks.map(t => ({
        worldPos: t.world_x,
        axis: 'x' as const,
        gridXMin: this.config.gridXMin,
        gridXMax: this.config.gridXMax,
      })),
    ];
    this.gridManager.updateTicks(tickData);

    // Update labels via label pool
    if (this.labelPool) {
      // Release old axis labels
      this.labelPool.releaseAll();

      // Create price labels
      const frustum = new THREE.Frustum();
      const projMatrix = new THREE.Matrix4();
      projMatrix.multiplyMatrices(
        (camera as THREE.PerspectiveCamera).projectionMatrix,
        camera.matrixWorldInverse,
      );
      frustum.setFromProjectionMatrix(projMatrix);

      // Anchor price labels to the left edge of the visible range so they
      // always appear on-screen regardless of how far right the user has scrolled.
      const priceAxisX = this.scales.indexToWorldX(visibleRange.startIndex) - 1.5;
      priceTicks.forEach((tick, i) => {
        const pos = new THREE.Vector3(priceAxisX, tick.world_y, 0);
        const text = tick.value >= 1000
          ? tick.value.toLocaleString('en-US', { maximumFractionDigits: 0 })
          : tick.value.toFixed(2);
        this.labelPool!.acquire(`price_${i}`, text, pos);
      });

      // Create time labels just below the candle area (Y=0 is chart bottom).
      timeTicks.forEach((tick, i) => {
        const pos = new THREE.Vector3(tick.world_x, -0.7, 0);
        if (!frustum.containsPoint(pos)) return;
        const text = this._formatTime(tick.date, visibleRange.endTime - visibleRange.startTime);
        this.labelPool!.acquire(`time_${i}`, text, pos);
      });

      this.labelPool.syncAll();
    }
  }

  /**
   * Rebuild everything — called on interval change or layout switch
   * @param layoutMode - Current layout mode
   */
  rebuild(_layoutMode: LayoutMode): void {
    this.gridManager.updateTicks([]);
    this.labelPool?.releaseAll();
  }

  /**
   * Set chart interval for time tick formatting
   * @param interval - Chart interval string like '1h', '1D', etc.
   */
  setInterval(interval: string): void {
    this.currentInterval = interval;
  }

  /**
   * Set theme colors without geometry rebuild
   * @param palette - New theme palette
   */
  setTheme(palette: ThemePalette): void {
    this.gridMaterial.color.set(palette.gridLines);

    // Dark grid colors need higher opacity; light grid colors are already close
    // to the foreground so a lower opacity keeps them subtle.
    const col    = new THREE.Color(palette.gridLines);
    const isDark = (col.r + col.g + col.b) / 3 < 0.45;
    this.gridMaterial.opacity = isDark ? 0.7 : 0.55;

    // Keep axis labels readable against the current theme background.
    if (this.labelPool) {
      const labelCol = new THREE.Color(palette.axisLabels);
      this.labelPool.setColor(labelCol.getHex());
    }
  }

  dispose(): void {
    this.scene.remove(this.gridManager.lineMesh);
    this.gridManager.dispose();
    this.gridMaterial.dispose();
    this.labelPool?.releaseAll();
  }

  // ── Private helpers ──────────────────────────────────────────────────────────

  private _formatTime(date: Date, durationMs: number): string {
    if (durationMs < 1000 * 60 * 60 * 24 * 2) return this.formatHour(date);
    if (durationMs < 1000 * 60 * 60 * 24 * 60) return this.formatDay(date);
    return this.formatMonth(date);
  }
}
