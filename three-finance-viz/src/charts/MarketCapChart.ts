// src/charts/MarketCapChart.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { ChartTheme } from '../types/theme';
import type { CandleBuffer } from '../types/CandleBuffer';

export interface MarketCapPoint {
  /** Unix ms timestamp */
  time: number;
  /** Market cap value (e.g. USD) */
  value: number;
}

export interface MarketCapChartConfig {
  lineWidth: number;
  lineColor: string;
  fillColor: string;
  floorAlpha: number;
}

const _VERT_SHADER = /* glsl */`
attribute float aT;
varying float vT;
void main() {
  vT = aT;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const _FRAG_SHADER = /* glsl */`
varying float vT;
uniform vec3 uTopColor;
uniform vec3 uBotColor;
uniform float uBotAlpha;
void main() {
  float alpha = mix(1.0, uBotAlpha, vT);
  gl_FragColor = vec4(mix(uTopColor, uBotColor, vT * 0.3), alpha);
}
`;

/** Gap threshold: if time delta between two points exceeds this (ms), treat as a gap. */
const GAP_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 2; // 2 days

export class MarketCapChart {
  private _scene: THREE.Scene;
  private _camera: THREE.OrthographicCamera;
  private _series: MarketCapPoint[] = [];
  private _enabled = false;

  private _lines: Line2[] = [];
  private _lineGeos: LineGeometry[] = [];
  private _lineMat: LineMaterial;

  private _fillMesh: THREE.Mesh | null = null;
  private _fillGeo: THREE.BufferGeometry | null = null;
  private _fillMat: THREE.ShaderMaterial;

  private _config: MarketCapChartConfig;
  private _resolution: THREE.Vector2;

  constructor(deps: {
    theme: ChartTheme;
    resolution: THREE.Vector2;
    config?: Partial<MarketCapChartConfig>;
  }) {
    this._resolution = deps.resolution.clone();

    const themeLineColor  = deps.theme.marketCap?.lineColor  ?? '#7c4dff';
    const themeFillColor  = deps.theme.marketCap?.fillColor  ?? '#7c4dff';
    const themeFloorAlpha = deps.theme.marketCap?.floorAlpha ?? 0.08;

    this._config = {
      lineWidth:  deps.config?.lineWidth  ?? 2,
      lineColor:  deps.config?.lineColor  ?? themeLineColor,
      fillColor:  deps.config?.fillColor  ?? themeFillColor,
      floorAlpha: deps.config?.floorAlpha ?? themeFloorAlpha,
    };

    this._scene  = new THREE.Scene();
    this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    this._camera.position.z = 1;

    this._lineMat = new LineMaterial({
      color:      new THREE.Color(this._config.lineColor),
      linewidth:  this._config.lineWidth,
      resolution: this._resolution,
      depthTest:  false,
      depthWrite: false,
    });

    const topColor = new THREE.Color(this._config.fillColor);
    const botColor = new THREE.Color(this._config.fillColor);

    this._fillMat = new THREE.ShaderMaterial({
      vertexShader:   _VERT_SHADER,
      fragmentShader: _FRAG_SHADER,
      uniforms: {
        uTopColor: { value: topColor },
        uBotColor: { value: botColor },
        uBotAlpha: { value: this._config.floorAlpha },
      },
      transparent: true,
      depthWrite:  false,
    });
  }

  get isEnabled(): boolean { return this._enabled; }

  setEnabled(v: boolean): void {
    this._enabled = v;
    this._scene.visible = v;
  }

  setSeries(series: MarketCapPoint[]): void {
    this._series = series.slice().sort((a, b) => a.time - b.time);
    this._rebuild();
  }

  /** Derive market cap from candle close * circulating supply */
  deriveFromSupply(buffer: CandleBuffer, supply: number): void {
    const pts: MarketCapPoint[] = [];
    for (let i = 0; i < buffer.count; i++) {
      pts.push({ time: buffer.time[i], value: buffer.close(i) * supply });
    }
    this.setSeries(pts);
  }

  appendPoint(point: MarketCapPoint): void {
    this._series.push(point);
    this._rebuild();
  }

  private _computeDomain(): { min: number; max: number } {
    if (this._series.length === 0) return { min: 0, max: 1 };
    let min = Infinity;
    let max = -Infinity;
    for (const pt of this._series) {
      if (pt.value < min) min = pt.value;
      if (pt.value > max) max = pt.value;
    }
    if (min === max) { min -= 1; max += 1; }
    return { min, max };
  }

  private _clearScene(): void {
    // Remove existing line objects
    for (const line of this._lines) {
      this._scene.remove(line);
      line.geometry.dispose();
    }
    this._lines.length     = 0;
    this._lineGeos.length  = 0;

    // Remove fill mesh
    if (this._fillMesh) {
      this._scene.remove(this._fillMesh);
      this._fillMesh = null;
    }
    if (this._fillGeo) {
      this._fillGeo.dispose();
      this._fillGeo = null;
    }
  }

  private _rebuild(): void {
    this._clearScene();

    const pts = this._series;
    if (pts.length < 2) return;

    const domain = this._computeDomain();
    const range  = domain.max - domain.min;

    // Map to NDC: x in [-1, 1] time, y in [-1, 1] value
    const timeMin = pts[0].time;
    const timeMax = pts[pts.length - 1].time;
    const timeRange = timeMax - timeMin || 1;

    const toX = (t: number): number => ((t - timeMin) / timeRange) * 2 - 1;
    const toY = (v: number): number => ((v - domain.min) / range) * 2 - 1;

    // Split into contiguous segments separated by gaps
    const segments: MarketCapPoint[][] = [];
    let current: MarketCapPoint[] = [pts[0]];

    for (let i = 1; i < pts.length; i++) {
      if (pts[i].time - pts[i - 1].time > GAP_THRESHOLD_MS) {
        if (current.length >= 2) segments.push(current);
        current = [];
      }
      current.push(pts[i]);
    }
    if (current.length >= 2) segments.push(current);

    // Build fill mesh across all segments
    let totalVerts = 0;
    for (const seg of segments) totalVerts += seg.length * 2;

    if (totalVerts >= 4) {
      const positions = new Float32Array(totalVerts * 3);
      const aTAttr    = new Float32Array(totalVerts);
      const floor     = -1; // NDC floor

      let vi = 0;
      const indexArrays: Uint32Array[] = [];

      let baseVertex = 0;
      for (const seg of segments) {
        const n = seg.length;
        const segIndices = new Uint32Array((n - 1) * 6);
        let idx = 0;

        for (let i = 0; i < n; i++) {
          const x = toX(seg[i].time);
          const y = toY(seg[i].value);

          // Price vertex (aT=0)
          positions[vi * 3]     = x;
          positions[vi * 3 + 1] = y;
          positions[vi * 3 + 2] = 0;
          aTAttr[vi]             = 0;
          vi++;

          // Floor vertex (aT=1)
          positions[vi * 3]     = x;
          positions[vi * 3 + 1] = floor;
          positions[vi * 3 + 2] = 0;
          aTAttr[vi]             = 1;
          vi++;

          if (i < n - 1) {
            const v = baseVertex + i * 2;
            segIndices[idx++] = v;
            segIndices[idx++] = v + 1;
            segIndices[idx++] = v + 2;
            segIndices[idx++] = v + 1;
            segIndices[idx++] = v + 3;
            segIndices[idx++] = v + 2;
          }
        }
        indexArrays.push(segIndices);
        baseVertex += n * 2;
      }

      // Merge index arrays
      let totalIndices = 0;
      for (const arr of indexArrays) totalIndices += arr.length;
      const mergedIndices = new Uint32Array(totalIndices);
      let offset = 0;
      for (const arr of indexArrays) {
        mergedIndices.set(arr, offset);
        offset += arr.length;
      }

      this._fillGeo = new THREE.BufferGeometry();
      this._fillGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      this._fillGeo.setAttribute('aT',       new THREE.BufferAttribute(aTAttr, 1));
      this._fillGeo.setIndex(new THREE.BufferAttribute(mergedIndices, 1));

      this._fillMesh = new THREE.Mesh(this._fillGeo, this._fillMat);
      this._fillMesh.renderOrder = 1;
      this._scene.add(this._fillMesh);
    }

    // Build one Line2 per segment
    for (const seg of segments) {
      if (seg.length < 2) continue;
      const linePositions = new Float32Array(seg.length * 3);
      for (let i = 0; i < seg.length; i++) {
        linePositions[i * 3]     = toX(seg[i].time);
        linePositions[i * 3 + 1] = toY(seg[i].value);
        linePositions[i * 3 + 2] = 0;
      }
      const geo = new LineGeometry();
      geo.setPositions(linePositions as unknown as number[]);
      const line = new Line2(geo, this._lineMat);
      line.renderOrder = 2;
      this._lineGeos.push(geo);
      this._lines.push(line);
      this._scene.add(line);
    }
  }

  /**
   * Render the market cap sub-panel.
   * @param renderer - The main WebGLRenderer
   * @param yOffsetPx - Pixel Y offset from bottom of canvas for the sub-panel
   * @param heightPx  - Height of the sub-panel in pixels
   */
  render(renderer: THREE.WebGLRenderer, yOffsetPx: number, heightPx: number = 80): void {
    if (!this._enabled || this._series.length < 2) return;

    const size   = renderer.getSize(new THREE.Vector2());
    const width  = size.x;

    // Save state
    const savedScissorTest = renderer.getScissorTest();
    const savedScissor     = new THREE.Vector4();
    const savedViewport    = new THREE.Vector4();
    renderer.getScissor(savedScissor);
    renderer.getViewport(savedViewport);

    // Apply scissor for sub-panel strip
    renderer.setScissorTest(true);
    renderer.setScissor(0, yOffsetPx, width, heightPx);
    renderer.setViewport(0, yOffsetPx, width, heightPx);

    // Update camera to match current sub-panel aspect
    this._camera.left   = -1;
    this._camera.right  =  1;
    this._camera.top    =  1;
    this._camera.bottom = -1;
    this._camera.updateProjectionMatrix();

    renderer.render(this._scene, this._camera);

    // Restore state
    renderer.setScissorTest(savedScissorTest);
    renderer.setScissor(savedScissor);
    renderer.setViewport(savedViewport);
  }

  onThemeChange(theme: ChartTheme): void {
    const lineColor  = theme.marketCap?.lineColor  ?? this._config.lineColor;
    const fillColor  = theme.marketCap?.fillColor  ?? this._config.fillColor;
    const floorAlpha = theme.marketCap?.floorAlpha ?? this._config.floorAlpha;

    this._lineMat.color.set(lineColor);
    this._lineMat.needsUpdate = true;

    this._fillMat.uniforms['uTopColor'].value = new THREE.Color(fillColor);
    this._fillMat.uniforms['uBotColor'].value = new THREE.Color(fillColor);
    this._fillMat.uniforms['uBotAlpha'].value = floorAlpha;
    this._fillMat.needsUpdate = true;
  }

  onResize(renderer: THREE.WebGLRenderer): void {
    const size = renderer.getSize(new THREE.Vector2());
    this._resolution.set(size.x, size.y);
    this._lineMat.resolution.copy(this._resolution);
    this._lineMat.needsUpdate = true;
  }

  dispose(): void {
    this._clearScene();
    this._lineMat.dispose();
    this._fillMat.dispose();
  }
}
