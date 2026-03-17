// src/charts/AreaChart.ts
import * as THREE from 'three';
import { Line2 }        from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { OHLCVCandle } from '../types/market';
import type { ChartTheme } from '../types/theme';
import type { LayoutEngine, CandleTransform } from '../layout/LayoutEngine';
import type { CandleBuffer } from '../types/CandleBuffer';
import type { ChartRenderer } from './ChartRenderer';
import type { PriceSource } from '../types/addendum';

export interface AreaChartConfig {
  source: PriceSource;
  lineWidth: number;
  lineColor: string;
  fillColor: string;
  floorAlpha: number;
  opacity: number;
}

// Module-level scratch buffers
let _aTBuffer: Float32Array | null = null;
let _strokePositions: Float32Array | null = null;

const _scratchTransform: CandleTransform = {
  position: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
  normal: new THREE.Vector3(),
};

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

function getPriceValue(buf: CandleBuffer, i: number, source: PriceSource): number {
  switch (source) {
    case 'open':  return buf.open(i);
    case 'high':  return buf.high(i);
    case 'low':   return buf.low(i);
    case 'hl2':   return (buf.high(i) + buf.low(i)) / 2;
    case 'ohlc4': return (buf.open(i) + buf.high(i) + buf.low(i) + buf.close(i)) / 4;
    case 'close':
    default:      return buf.close(i);
  }
}

export class AreaChart implements ChartRenderer {
  private _fillMesh: THREE.Mesh;
  private _fillGeo: THREE.BufferGeometry;
  private _fillMat: THREE.ShaderMaterial;

  private _strokeLine: Line2;
  private _strokeGeo: LineGeometry;
  private _strokeMat: LineMaterial;

  private _scene: THREE.Scene;
  private _buffer: CandleBuffer;
  private _layout: LayoutEngine;
  private _priceToWorldY: (price: number) => number;
  private _config: AreaChartConfig;
  private _maxCandles: number;
  private _resolution: THREE.Vector2;
  private _floorWorldY: number;

  constructor(deps: {
    scene: THREE.Scene;
    buffer: CandleBuffer;
    layout: LayoutEngine;
    theme: ChartTheme;
    maxCandles: number;
    priceToWorldY: (price: number) => number;
    floorWorldY: number;
    resolution: THREE.Vector2;
    config?: Partial<AreaChartConfig>;
  }) {
    this._scene = deps.scene;
    this._buffer = deps.buffer;
    this._layout = deps.layout;
    this._priceToWorldY = deps.priceToWorldY;
    this._maxCandles = deps.maxCandles;
    this._resolution = deps.resolution.clone();
    this._floorWorldY = deps.floorWorldY;

    const themeLineColor  = deps.theme.area?.lineColor  ?? '#26a69a';
    const themeFillColor  = deps.theme.area?.fillColor  ?? '#26a69a';
    const themeFloorAlpha = deps.theme.area?.floorAlpha ?? 0.08;

    this._config = {
      source:     deps.config?.source     ?? 'close',
      lineWidth:  deps.config?.lineWidth  ?? 2,
      lineColor:  deps.config?.lineColor  ?? themeLineColor,
      fillColor:  deps.config?.fillColor  ?? themeFillColor,
      floorAlpha: deps.config?.floorAlpha ?? themeFloorAlpha,
      opacity:    deps.config?.opacity    ?? 1.0,
    };

    // --- Fill mesh setup ---
    this._fillGeo = new THREE.BufferGeometry();

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
      depthWrite: false,
    });

    this._fillMesh = new THREE.Mesh(this._fillGeo, this._fillMat);
    this._fillMesh.frustumCulled = false;
    this._fillMesh.renderOrder = 2;
    this._scene.add(this._fillMesh);

    // --- Stroke line setup ---
    this._strokeGeo = new LineGeometry();

    this._strokeMat = new LineMaterial({
      color:       new THREE.Color(this._config.lineColor),
      linewidth:   this._config.lineWidth,
      transparent: this._config.opacity < 1,
      opacity:     this._config.opacity,
      resolution:  this._resolution,
      depthTest:   true,
      depthWrite:  false,
    });

    this._strokeLine = new Line2(this._strokeGeo, this._strokeMat);
    this._strokeLine.renderOrder = 3;
    this._strokeLine.frustumCulled = false;
    this._scene.add(this._strokeLine);
  }

  private _rebuild(): void {
    const buf = this._buffer;
    const n = buf.count;

    if (n < 2) {
      this._fillMesh.visible = false;
      this._strokeLine.visible = false;
      return;
    }

    // Ensure module-level buffers are large enough
    if (_aTBuffer === null || _aTBuffer.length < this._maxCandles * 2) {
      _aTBuffer = new Float32Array(this._maxCandles * 2);
    }
    if (_strokePositions === null || _strokePositions.length < this._maxCandles * 3) {
      _strokePositions = new Float32Array(this._maxCandles * 3);
    }

    // Build triangle strip: 2 vertices per candle (price vertex + floor vertex)
    // Total: 2n vertices, (2n-2)*3 indices for triangle strip via index buffer
    const positions = new Float32Array(n * 2 * 3);
    const aTAttr    = new Float32Array(n * 2);
    const out = _scratchTransform;

    for (let i = 0; i < n; i++) {
      this._layout.getCandleTransform(i, buf, out);
      const price  = getPriceValue(buf, i, this._config.source);
      const worldY = this._priceToWorldY(price);
      const x = out.position.x;
      const z = out.position.z;

      // Price vertex (aT = 0, top of gradient)
      positions[i * 6]     = x;
      positions[i * 6 + 1] = worldY;
      positions[i * 6 + 2] = z;
      aTAttr[i * 2]         = 0;

      // Floor vertex (aT = 1, bottom of gradient)
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = this._floorWorldY;
      positions[i * 6 + 5] = z;
      aTAttr[i * 2 + 1]     = 1;

      // Stroke positions
      _strokePositions[i * 3]     = x;
      _strokePositions[i * 3 + 1] = worldY;
      _strokePositions[i * 3 + 2] = z;
    }

    // Triangle strip indices: for n candles, (2n - 2) * 3 indices
    const indexCount = (n - 1) * 6; // 2 tris per pair of columns
    const indices    = new Uint32Array(indexCount);
    let idx = 0;
    for (let i = 0; i < n - 1; i++) {
      const v = i * 2;
      // tri 1: v, v+1, v+2
      indices[idx++] = v;
      indices[idx++] = v + 1;
      indices[idx++] = v + 2;
      // tri 2: v+1, v+3, v+2
      indices[idx++] = v + 1;
      indices[idx++] = v + 3;
      indices[idx++] = v + 2;
    }

    this._fillGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this._fillGeo.setAttribute('aT',       new THREE.BufferAttribute(aTAttr, 1));
    this._fillGeo.setIndex(new THREE.BufferAttribute(indices, 1));
    this._fillGeo.computeVertexNormals();

    this._strokeGeo.setPositions(_strokePositions.subarray(0, n * 3) as unknown as number[]);
    this._strokeLine.computeLineDistances();

    this._fillMesh.visible   = true;
    this._strokeLine.visible = true;
  }

  updateRange(_start: number, _end: number): void {
    this._rebuild();
  }

  append(_candle: OHLCVCandle): void {
    this._rebuild();
  }

  patchLast(_partial: Partial<OHLCVCandle>): void {
    this._rebuild();
  }

  onLayoutChange(layout: LayoutEngine): void {
    this._layout = layout;
    this._rebuild();
  }

  onThemeChange(theme: ChartTheme): void {
    const lineColor  = theme.area?.lineColor  ?? this._config.lineColor;
    const fillColor  = theme.area?.fillColor  ?? this._config.fillColor;
    const floorAlpha = theme.area?.floorAlpha ?? this._config.floorAlpha;

    this._strokeMat.color.set(lineColor);
    this._strokeMat.needsUpdate = true;

    const topColor = new THREE.Color(fillColor);
    const botColor = new THREE.Color(fillColor);
    this._fillMat.uniforms['uTopColor'].value = topColor;
    this._fillMat.uniforms['uBotColor'].value = botColor;
    this._fillMat.uniforms['uBotAlpha'].value = floorAlpha;
    this._fillMat.needsUpdate = true;
  }

  setVisible(v: boolean): void {
    this._fillMesh.visible   = v;
    this._strokeLine.visible = v;
  }

  onResize(resolution: THREE.Vector2): void {
    this._resolution.copy(resolution);
    this._strokeMat.resolution.copy(resolution);
    this._strokeMat.needsUpdate = true;
  }

  dispose(): void {
    this._scene.remove(this._fillMesh);
    this._scene.remove(this._strokeLine);
    this._fillGeo.dispose();
    this._fillMat.dispose();
    this._strokeGeo.dispose();
    this._strokeMat.dispose();
  }
}
