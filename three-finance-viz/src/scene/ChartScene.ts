// src/scene/ChartScene.ts
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import type { ChartTheme } from '../types/theme';
import { GridFloor } from './GridFloor';
import { AxesLabels } from './AxesLabels';

export class ChartScene {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly controls: OrbitControls;

  private _gridFloor: GridFloor;
  private _axesLabels: AxesLabels;
  private _ambientLight: THREE.AmbientLight;
  private _dirLight: THREE.DirectionalLight;

  constructor(
    rendererDomElement: HTMLElement,
    theme: ChartTheme,
    width: number,
    height: number,
  ) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(theme.background);
    this.scene.fog = new THREE.FogExp2(new THREE.Color(theme.background).getHex(), 0.002);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    this.camera.position.set(0, 5, 30);

    this.controls = new OrbitControls(this.camera, rendererDomElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.zoomSpeed = 1.5;
    this.controls.panSpeed = 0.8;
    this.controls.maxDistance = 500;
    this.controls.minDistance = 0.5;
    this.controls.screenSpacePanning = true;
    this.controls.maxPolarAngle = Math.PI * 0.85;
    this.controls.minPolarAngle = Math.PI * 0.05;

    // Lighting
    this._ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this._ambientLight);

    this._dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this._dirLight.position.set(10, 20, 10);
    this.scene.add(this._dirLight);

    this._gridFloor = new GridFloor(this.scene, theme);
    this._axesLabels = new AxesLabels(this.scene, theme);
  }

  update(): void {
    this.controls.update();
  }

  setRange(minPrice: number, maxPrice: number, minTimeMs: number, maxTimeMs: number): void {
    this._axesLabels.setRange(minPrice, maxPrice, minTimeMs, maxTimeMs);
  }

  centerGridFloor(x: number): void {
    this._gridFloor.setCenter(x);
  }

  onThemeChange(theme: ChartTheme): void {
    this.scene.background = new THREE.Color(theme.background);
    (this.scene.fog as THREE.FogExp2).color.set(theme.background);
    this._gridFloor.onThemeChange(theme);
    this._axesLabels.onThemeChange(theme);
  }

  dispose(): void {
    this.controls.dispose();
    this._gridFloor.dispose();
    this._axesLabels.dispose();
    this.scene.clear();
  }
}
