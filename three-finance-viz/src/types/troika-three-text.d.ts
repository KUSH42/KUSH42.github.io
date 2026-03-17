// Minimal ambient declaration for troika-three-text (no official @types package)
// Source: https://github.com/protectwise/troika/tree/main/packages/troika-three-text

declare module 'troika-three-text' {
  import type { Object3D, Material } from 'three';

  type AnchorX = 'left' | 'center' | 'right' | number;
  type AnchorY = 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | number;

  export class Text extends Object3D {
    /** The text string to render */
    text: string;
    /** Font size in world units */
    fontSize: number;
    /** CSS color string or 0xRRGGBB number */
    color: string | number;
    /** Font URL or registered font name */
    font: string | null;
    /** Horizontal anchor relative to position */
    anchorX: AnchorX;
    /** Vertical anchor relative to position */
    anchorY: AnchorY;
    /** Max width for line-wrapping (world units); 0 = no wrap */
    maxWidth: number;
    /** Letter spacing multiplier */
    letterSpacing: number;
    /** Line height multiplier */
    lineHeight: number | 'normal';
    /** Text alignment: 'left' | 'right' | 'center' | 'justify' */
    textAlign: 'left' | 'right' | 'center' | 'justify';
    /** Bias applied to depth buffer to prevent z-fighting */
    depthOffset: number;
    /** The text material; defaults to MeshBasicMaterial */
    material: Material | null;

    /**
     * Triggers async layout/SDF generation. The mesh updates on the next
     * animation frame after the worker finishes.
     * @param callback Optional callback invoked when sync completes.
     */
    sync(callback?: () => void): void;

    /** Release GPU resources allocated by this Text object */
    dispose(): void;
  }

  /** Pre-load a font so it is ready when Text objects first sync */
  export function preloadFont(
    options: { font?: string; characters?: string | string[]; sdfGlyphSize?: number },
    callback?: () => void,
  ): void;

  /** Returns the caret position (index) at a given 2D point within the text layout */
  export function getCaretAtPoint(
    textRenderInfo: unknown,
    x: number,
    y: number,
  ): number;

  /** Returns selection rect spans for a character range */
  export function getSelectionRects(
    textRenderInfo: unknown,
    start: number,
    end: number,
  ): Array<{ left: number; top: number; right: number; bottom: number }>;
}
