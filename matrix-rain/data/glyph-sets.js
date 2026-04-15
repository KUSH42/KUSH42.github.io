/**
 * glyph-sets.js — canonical glyph set definitions for atlas generation.
 *
 * Consumed by tools/gen-atlas.html to produce MSDF-approx and bitmap atlases.
 * NOT loaded at runtime by the matrix rain library.
 *
 * Entry shapes:
 *   { char: '字', mirror: bool }    — Unicode character, optionally mirrored horizontally
 *   { path: [...cmds], stroke: bool, strokeWidth: number }  — custom drawn glyph
 *
 * Path command micro-format (coordinates normalised 0–1 within the cell, origin top-left):
 *   ['M', x, y]                           moveTo
 *   ['L', x, y]                           lineTo
 *   ['C', cx1, cy1, cx2, cy2, x, y]       bezierCurveTo
 *   ['Q', cx, cy, x, y]                   quadraticCurveTo
 *   ['Z']                                 closePath
 *
 * mirror: true  → glyph is drawn horizontally reflected (baked into the atlas cell).
 * stroke: true  → drawPath calls ctx.stroke() instead of ctx.fill().
 * strokeWidth   → line width in pixels (applied to the 64×64 cell before drawing).
 *
 * Reference: specs/matrix-rain-analysis.md §2 "Visual & Typographic Anatomy"
 */

// ── Custom glyph paths ────────────────────────────────────────────────────

// ψ-like: vertical stroke with two curved arms branching from upper-centre.
const PSI_PATH = {
  path: [
    ['M', 0.50, 0.08], ['L', 0.50, 0.92],           // central vertical
    ['M', 0.50, 0.28], ['Q', 0.20, 0.28, 0.18, 0.58], ['L', 0.22, 0.72], // left arm
    ['M', 0.50, 0.28], ['Q', 0.80, 0.28, 0.82, 0.58], ['L', 0.78, 0.72], // right arm
    ['M', 0.33, 0.88], ['L', 0.67, 0.88],            // base crossbar
  ],
  stroke: true, strokeWidth: 5,
};

// Ω-like: arch closed at top, open at bottom with small outward feet.
const OMEGA_PATH = {
  path: [
    ['M', 0.20, 0.82],
    ['L', 0.20, 0.72],
    ['Q', 0.18, 0.30, 0.50, 0.12],
    ['Q', 0.82, 0.30, 0.80, 0.72],
    ['L', 0.80, 0.82],
    ['M', 0.14, 0.82], ['L', 0.36, 0.82],  // left foot
    ['M', 0.64, 0.82], ['L', 0.86, 0.82],  // right foot
  ],
  stroke: true, strokeWidth: 5,
};

// Mirrored Z: Z reflected horizontally — top-right to top-left diagonal.
const MIRZ_PATH = {
  path: [
    ['M', 0.78, 0.15], ['L', 0.22, 0.15],  // top bar (right-to-left)
    ['L', 0.78, 0.85],                      // diagonal (top-left to bottom-right)
    ['L', 0.22, 0.85],                      // bottom bar
  ],
  stroke: true, strokeWidth: 5,
};

// Rotated T (90° clockwise): horizontal top stroke, vertical going right.
const ROTT_PATH = {
  path: [
    ['M', 0.15, 0.50], ['L', 0.85, 0.50],  // horizontal bar
    ['M', 0.15, 0.20], ['L', 0.15, 0.80],  // vertical bar on left
  ],
  stroke: true, strokeWidth: 5,
};

// Double-struck vertical bar: two parallel vertical strokes.
const DBAR_PATH = {
  path: [
    ['M', 0.35, 0.12], ['L', 0.35, 0.88],
    ['M', 0.65, 0.12], ['L', 0.65, 0.88],
  ],
  stroke: true, strokeWidth: 5,
};

// Diamond outline ◇.
const DIAMOND_PATH = {
  path: [
    ['M', 0.50, 0.10],
    ['L', 0.88, 0.50],
    ['L', 0.50, 0.90],
    ['L', 0.12, 0.50],
    ['Z'],
  ],
  stroke: true, strokeWidth: 5,
};

// Angular bracket pair ⌐ ¬ stacked — two reversed corners.
const BRACKET_PATH = {
  path: [
    ['M', 0.22, 0.22], ['L', 0.22, 0.48], ['L', 0.78, 0.48],  // top ⌐
    ['M', 0.22, 0.52], ['L', 0.78, 0.52], ['L', 0.78, 0.78],  // bottom ¬
  ],
  stroke: true, strokeWidth: 5,
};

// Triple horizontal rule — three stacked short bars of decreasing width.
const TRIBAR_PATH = {
  path: [
    ['M', 0.18, 0.28], ['L', 0.82, 0.28],
    ['M', 0.24, 0.50], ['L', 0.76, 0.50],
    ['M', 0.30, 0.72], ['L', 0.70, 0.72],
  ],
  stroke: true, strokeWidth: 5,
};

// ── Glyph set definitions ─────────────────────────────────────────────────

export const GLYPH_SETS = {

  /**
   * matrix1999 — film-accurate character set. 64 glyphs filling an 8×8 grid.
   *
   * Composition (per specs/matrix-rain-analysis.md §2):
   *   46 half-width katakana (U+FF65–U+FF9F), ~15 mirrored horizontally
   *   10 Arabic numerals (0–9)
   *    8 custom/modified glyphs (path-drawn)
   *
   * Half-width katakana used: all main forms. Small vowels (ｧ–ｮ, ｯ) and
   * voiced/semi-voiced marks (ﾞﾟ) excluded as in the film.
   */
  matrix1999: {
    gridW: 8, gridH: 8,
    /**
     * Per-glyph complexity weights for weighted glyph sampling (SPEC-2d-organic §4).
     * Three classes: complex (≥8 strokes) = 2.5 | medium = 1.0 | simple (≤4 strokes) = 0.5
     * One entry per glyph slot, length = gridW * gridH = 64.
     */
    weights: [
      1.0, 1.0, 1.0, 1.0, 1.0,  // 0–4  vowels (ｱｲｳｴｵ) — medium
      1.0, 1.0, 1.0, 1.0, 1.0,  // 5–9  K-row — medium
      1.0, 1.0, 1.0, 1.0, 1.0,  // 10–14 S-row — medium
      1.0, 1.0, 1.0, 2.5, 1.0,  // 15–19 T-row; ﾃ=18 complex (≥8 strokes)
      1.0, 2.5, 1.0, 1.0, 1.0,  // 20–24 N-row; ﾆ=21 complex
      2.5, 1.0, 1.0, 1.0, 2.5,  // 25–29 H-row; ﾊ=25 ﾎ=29 complex
      1.0, 1.0, 1.0, 1.0, 1.0,  // 30–34 M-row — medium
      1.0, 1.0, 1.0,             // 35–37 Y-row — medium
      1.0, 2.5, 2.5, 2.5, 2.5,  // 38–42 R-row; ﾘ=39 ﾙ=40 ﾚ=41 ﾛ=42 complex
      1.0, 1.0, 0.5,             // 43–45 WA/N/prolonged; ｰ=45 simple
      0.5, 0.5, 0.5, 0.5, 0.5,  // 46–50 numerals 0–4 — simple
      0.5, 0.5, 0.5, 0.5, 0.5,  // 51–55 numerals 5–9 — simple
      1.0, 1.0, 1.0, 1.0,        // 56–59 custom glyphs (ψ Ω ⌐ ⌐) — medium
      1.0, 1.0, 1.0, 1.0,        // 60–63 custom glyphs (◇ ⌐¬ ≡ ) — medium
    ],
    glyphs: [
      // ── Half-width katakana — vowel row ─────────────────────────────
      { char: 'ｱ', mirror: false },  // 0  A
      { char: 'ｲ', mirror: false },  // 1  I
      { char: 'ｳ', mirror: true  },  // 2  U      (mirrored)
      { char: 'ｴ', mirror: false },  // 3  E
      { char: 'ｵ', mirror: false },  // 4  O
      // ── K-row ────────────────────────────────────────────────────────
      { char: 'ｶ', mirror: true  },  // 5  KA     (mirrored)
      { char: 'ｷ', mirror: false },  // 6  KI
      { char: 'ｸ', mirror: true  },  // 7  KU     (mirrored)
      { char: 'ｹ', mirror: false },  // 8  KE
      { char: 'ｺ', mirror: false },  // 9  KO
      // ── S-row ────────────────────────────────────────────────────────
      { char: 'ｻ', mirror: false },  // 10 SA
      { char: 'ｼ', mirror: true  },  // 11 SI     (mirrored)
      { char: 'ｽ', mirror: true  },  // 12 SU     (mirrored)
      { char: 'ｾ', mirror: true  },  // 13 SE     (mirrored)
      { char: 'ｿ', mirror: true  },  // 14 SO     (mirrored)
      // ── T-row ────────────────────────────────────────────────────────
      { char: 'ﾀ', mirror: false },  // 15 TA
      { char: 'ﾁ', mirror: true  },  // 16 TI     (mirrored)
      { char: 'ﾂ', mirror: true  },  // 17 TU     (mirrored)
      { char: 'ﾃ', mirror: true  },  // 18 TE     (mirrored)
      { char: 'ﾄ', mirror: false },  // 19 TO
      // ── N-row ────────────────────────────────────────────────────────
      { char: 'ﾅ', mirror: true  },  // 20 NA     (mirrored)
      { char: 'ﾆ', mirror: false },  // 21 NI
      { char: 'ﾇ', mirror: false },  // 22 NU
      { char: 'ﾈ', mirror: false },  // 23 NE
      { char: 'ﾉ', mirror: true  },  // 24 NO     (mirrored)
      // ── H-row ────────────────────────────────────────────────────────
      { char: 'ﾊ', mirror: false },  // 25 HA
      { char: 'ﾋ', mirror: true  },  // 26 HI     (mirrored)
      { char: 'ﾌ', mirror: false },  // 27 HU
      { char: 'ﾍ', mirror: false },  // 28 HE
      { char: 'ﾎ', mirror: false },  // 29 HO
      // ── M-row ────────────────────────────────────────────────────────
      { char: 'ﾏ', mirror: false },  // 30 MA
      { char: 'ﾐ', mirror: false },  // 31 MI
      { char: 'ﾑ', mirror: true  },  // 32 MU     (mirrored)
      { char: 'ﾒ', mirror: false },  // 33 ME
      { char: 'ﾓ', mirror: false },  // 34 MO
      // ── Y-row ────────────────────────────────────────────────────────
      { char: 'ﾔ', mirror: false },  // 35 YA
      { char: 'ﾕ', mirror: false },  // 36 YU
      { char: 'ﾖ', mirror: false },  // 37 YO
      // ── R-row ────────────────────────────────────────────────────────
      { char: 'ﾗ', mirror: false },  // 38 RA
      { char: 'ﾘ', mirror: false },  // 39 RI
      { char: 'ﾙ', mirror: true  },  // 40 RU     (mirrored)
      { char: 'ﾚ', mirror: true  },  // 41 RE     (mirrored)
      { char: 'ﾛ', mirror: true  },  // 42 RO     (mirrored)
      // ── W-row + misc ─────────────────────────────────────────────────
      { char: 'ﾜ', mirror: false },  // 43 WA
      { char: 'ﾝ', mirror: false },  // 44 N
      { char: 'ｰ', mirror: false },  // 45 prolonged sound mark
      // ── Numerals (0–9) ───────────────────────────────────────────────
      { char: '0', mirror: false },  // 46
      { char: '1', mirror: false },  // 47
      { char: '2', mirror: false },  // 48
      { char: '3', mirror: false },  // 49
      { char: '4', mirror: false },  // 50
      { char: '5', mirror: false },  // 51
      { char: '6', mirror: false },  // 52
      { char: '7', mirror: false },  // 53
      { char: '8', mirror: false },  // 54
      { char: '9', mirror: false },  // 55
      // ── Custom / modified glyphs (film-specific symbols) ─────────────
      PSI_PATH,      // 56 ψ-like
      OMEGA_PATH,    // 57 Ω-like
      MIRZ_PATH,     // 58 mirrored Z
      ROTT_PATH,     // 59 rotated T
      DBAR_PATH,     // 60 double bar
      DIAMOND_PATH,  // 61 diamond outline
      BRACKET_PATH,  // 62 angular bracket pair
      TRIBAR_PATH,   // 63 triple horizontal rule
    ],
  },

  /**
   * latin — uppercase A–Z plus digits 0–9. 36 glyphs in an 8×8 grid (28 slots unused).
   * Uniform weights (all 1.0) — no complexity bias for latin characters.
   */
  latin: {
    gridW: 8, gridH: 8,
    weights: Array.from({ length: 36 }, () => 1.0),
    glyphs: [
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => ({ char: c, mirror: false })),
      ...'0123456789'.split('').map(c => ({ char: c, mirror: false })),
    ],
  },

  /**
   * ascii — all 95 printable ASCII characters (U+0020–U+007E).
   * Requires a 10×10 grid (100 slots, 5 unused) and the uAtlasGridW/H shader fix.
   * Uniform weights (all 1.0) — no complexity bias for ASCII characters.
   */
  ascii: {
    gridW: 10, gridH: 10,
    weights: Array.from({ length: 95 }, () => 1.0),
    glyphs: Array.from({ length: 95 }, (_, i) => ({
      char: String.fromCharCode(0x20 + i),
      mirror: false,
    })),
  },

  /**
   * cyber — mixed-script set from KUSH42/playground MatrixComponent. 90 glyphs, 10×10 grid.
   * Font: data/fonts/noto/NotoSansJP-Regular.ttf (covers all Unicode blocks present).
   * Composition: 19 Cyrillic | 10 CJK | 18 Hiragana | 3 full-width katakana |
   *              9 Greek | 5 misc symbols | 26 ASCII-derived | 10 unused trailing slots.
   * Weights: CJK/kana → 2.0 | ASCII/symbols → 0.7 | Cyrillic/Greek → 1.0 | unused → 0.0.
   */
  cyber: {
    gridW: 10, gridH: 10,
    weights: [
      // Cyrillic 19
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      // CJK 10
      2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      // Hiragana 18
      2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
      // Full-width katakana 3
      2.0, 2.0, 2.0,
      // Greek 9
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      // Misc symbols 5
      0.7, 0.7, 0.7, 0.7, 0.7,
      // ASCII-derived 26
      0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7,
      0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7,
      0.7, 0.7, 0.7, 0.7, 0.7, 0.7,
      // 10 unused trailing slots
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
    glyphs: [
      // ── Cyrillic (19) ──────────────────────────────────────────────
      { char: 'А', mirror: false }, { char: 'В', mirror: false },
      { char: 'Е', mirror: false }, { char: 'Д', mirror: false },
      { char: 'Ё', mirror: false }, { char: 'З', mirror: false },
      { char: 'И', mirror: false }, { char: 'Л', mirror: false },
      { char: 'М', mirror: false }, { char: 'Н', mirror: false },
      { char: 'О', mirror: false }, { char: 'Я', mirror: false },
      { char: 'Щ', mirror: false }, { char: 'Ц', mirror: false },
      { char: 'Х', mirror: false }, { char: 'Т', mirror: false },
      { char: 'С', mirror: false }, { char: 'Р', mirror: false },
      { char: 'П', mirror: false },
      // ── CJK (10) ───────────────────────────────────────────────────
      { char: '漢', mirror: false }, { char: '字', mirror: false },
      { char: '日', mirror: false }, { char: '本', mirror: false },
      { char: '語', mirror: false }, { char: '使', mirror: false },
      { char: '文', mirror: false }, { char: '中', mirror: false },
      { char: '国', mirror: false }, { char: '作', mirror: false },
      // ── Hiragana (18) ──────────────────────────────────────────────
      { char: 'は', mirror: false }, { char: 'で', mirror: false },
      { char: 'わ', mirror: false }, { char: 'れ', mirror: false },
      { char: 'る', mirror: false }, { char: 'か', mirror: false },
      { char: 'ら', mirror: false }, { char: 'や', mirror: false },
      { char: 'っ', mirror: false }, { char: 'て', mirror: false },
      { char: 'き', mirror: false }, { char: 'ま', mirror: false },
      { char: 'し', mirror: false }, { char: 'た', mirror: false },
      { char: 'ひ', mirror: false }, { char: 'が', mirror: false },
      { char: 'な', mirror: false }, { char: 'と', mirror: false },
      // ── Full-width katakana (3) ────────────────────────────────────
      { char: 'カ', mirror: false }, { char: 'タ', mirror: false },
      { char: 'ナ', mirror: false },
      // ── Greek (9) ──────────────────────────────────────────────────
      { char: 'Ͷ', mirror: false }, { char: 'Δ', mirror: false },
      { char: 'Λ', mirror: false }, { char: 'Ξ', mirror: false },
      { char: 'Π', mirror: false }, { char: 'Σ', mirror: false },
      { char: 'Ω', mirror: false }, { char: 'Ψ', mirror: false },
      { char: 'Χ', mirror: false },
      // ── Misc symbols (5) ───────────────────────────────────────────
      { char: '。', mirror: false }, { char: '©', mirror: false },
      { char: '®', mirror: false }, { char: '¶', mirror: false },
      { char: '¥', mirror: false },
      // ── ASCII-derived (26) ─────────────────────────────────────────
      { char: '$', mirror: false }, { char: '#', mirror: false },
      { char: '!', mirror: false }, { char: '(', mirror: false },
      { char: '*', mirror: false }, { char: '<', mirror: false },
      { char: '=', mirror: false }, { char: '>', mirror: false },
      { char: '?', mirror: false }, { char: '@', mirror: false },
      { char: '0', mirror: false }, { char: '1', mirror: false },
      { char: '2', mirror: false }, { char: '3', mirror: false },
      { char: '4', mirror: false }, { char: '5', mirror: false },
      { char: '6', mirror: false }, { char: '7', mirror: false },
      { char: '9', mirror: false }, { char: '8', mirror: false },
      { char: 'A', mirror: false }, { char: 'B', mirror: false },
      { char: 'C', mirror: false }, { char: 'D', mirror: false },
      { char: 'E', mirror: false }, { char: 'F', mirror: false },
      // 10 unused trailing slots omitted — atlas generator fills them as transparent
    ],
  },

  /**
   * cyrillic — full Russian Cyrillic both cases + digits. 76 glyphs, 10×10 grid (24 unused).
   * Font: data/fonts/Iosevka_Charon_Mono/IosevkaCharonMono-Regular.ttf
   * Mixed case produces more visual rhythm than uppercase-only in scrolling rain.
   * Weights: all used glyphs 1.0 | unused → 0.0.
   */
  cyrillic: {
    gridW: 10, gridH: 10,
    weights: [
      ...Array.from({ length: 76 }, () => 1.0),
      ...Array.from({ length: 24 }, () => 0.0),
    ],
    glyphs: [
      // ── Uppercase А–Я (33) ─────────────────────────────────────────
      ...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('').map(c => ({ char: c, mirror: false })),
      // ── Lowercase а–я (33) ─────────────────────────────────────────
      ...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('').map(c => ({ char: c, mirror: false })),
      // ── Digits 0–9 (10) ────────────────────────────────────────────
      ...'0123456789'.split('').map(c => ({ char: c, mirror: false })),
      // 24 unused trailing slots omitted — atlas generator fills them as transparent
    ],
  },

  /**
   * japanese — all base hiragana + full-width katakana. 92 glyphs, 10×10 grid (8 unused).
   * No voiced marks (゛゜) or small forms (ぁ–ょ, っ is included as a base form).
   * Font: data/fonts/noto/NotoSansJP-Regular.ttf
   * Ordering: hiragana first (0–45), katakana second (46–91), aiueo row order.
   * Weights: simple vowel kana (あ ア etc.) → 0.8 | default → 1.0 | unused → 0.0.
   */
  japanese: {
    gridW: 10, gridH: 10,
    weights: [
      // Hiragana 46: vowels (0–4) downweighted; rest 1.0
      0.8, 0.8, 0.8, 0.8, 0.8,                         // あいうえお
      1.0, 1.0, 1.0, 1.0, 1.0,                         // かきくけこ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // さしすせそ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // たちつてと
      1.0, 1.0, 1.0, 1.0, 1.0,                         // なにぬねの
      1.0, 1.0, 1.0, 1.0, 1.0,                         // はひふへほ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // まみむめも
      1.0, 1.0, 1.0,                                   // やゆよ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // らりるれろ
      1.0, 1.0, 1.0,                                   // わをん
      // Katakana 46: vowels (46–50) downweighted; rest 1.0
      0.8, 0.8, 0.8, 0.8, 0.8,                         // アイウエオ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // カキクケコ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // サシスセソ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // タチツテト
      1.0, 1.0, 1.0, 1.0, 1.0,                         // ナニヌネノ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // ハヒフヘホ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // マミムメモ
      1.0, 1.0, 1.0,                                   // ヤユヨ
      1.0, 1.0, 1.0, 1.0, 1.0,                         // ラリルレロ
      1.0, 1.0, 1.0,                                   // ワヲン
      // 8 unused trailing slots
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
    glyphs: [
      // ── Hiragana base (46) — aiueo row order ──────────────────────
      ...'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
        .split('').map(c => ({ char: c, mirror: false })),
      // ── Full-width katakana base (46) — aiueo row order ───────────
      ...'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
        .split('').map(c => ({ char: c, mirror: false })),
      // 8 unused trailing slots omitted — atlas generator fills them as transparent
    ],
  },

  /**
   * chinese — curated CJK selection, Traditional Chinese forms. 64 glyphs, 8×8 grid.
   * Font: data/fonts/noto/NotoSansTC-Regular.ttf (Traditional Chinese).
   * Codepoints must use Traditional forms where Simplified and Traditional differ
   * (e.g. 風 not 风, 雲 not 云, 國 not 国, 龍 not 龙).
   * Composition: 14 high-stroke | 16 structural | 16 motion/digital | 16 high-frequency | 2 blank.
   * Weights: high-stroke → 2.5 | others → 1.0 | blank → 0.0.
   */
  chinese: {
    gridW: 8, gridH: 8,
    weights: [
      // High-stroke 14
      2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
      // Structural 16
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      // Motion/digital 16
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      // High-frequency 16
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      // 2 blank padding slots
      0.0, 0.0,
    ],
    glyphs: [
      // ── High-stroke (14, Traditional forms) ───────────────────────
      { char: '藏', mirror: false }, { char: '疆', mirror: false },
      { char: '贏', mirror: false }, { char: '鑫', mirror: false },
      { char: '霸', mirror: false }, { char: '凰', mirror: false },
      { char: '龍', mirror: false }, { char: '魔', mirror: false },
      { char: '靈', mirror: false }, { char: '曜', mirror: false },
      { char: '耀', mirror: false }, { char: '燕', mirror: false },
      { char: '鳳', mirror: false }, { char: '騰', mirror: false },
      // ── Structural (16, Traditional forms) ────────────────────────
      { char: '中', mirror: false }, { char: '國', mirror: false },
      { char: '天', mirror: false }, { char: '地', mirror: false },
      { char: '人', mirror: false }, { char: '山', mirror: false },
      { char: '水', mirror: false }, { char: '火', mirror: false },
      { char: '風', mirror: false }, { char: '雲', mirror: false },
      { char: '雨', mirror: false }, { char: '星', mirror: false },
      { char: '月', mirror: false }, { char: '日', mirror: false },
      { char: '夜', mirror: false }, { char: '光', mirror: false },
      // ── Motion / digital theme (16, Traditional forms) ─────────────
      { char: '數', mirror: false }, { char: '字', mirror: false },
      { char: '碼', mirror: false }, { char: '網', mirror: false },
      { char: '信', mirror: false }, { char: '息', mirror: false },
      { char: '時', mirror: false }, { char: '間', mirror: false },
      { char: '流', mirror: false }, { char: '速', mirror: false },
      { char: '動', mirror: false }, { char: '靜', mirror: false },
      { char: '力', mirror: false }, { char: '影', mirror: false },
      { char: '聲', mirror: false }, { char: '波', mirror: false },
      // ── High-frequency (16, Traditional forms) ────────────────────
      { char: '的', mirror: false }, { char: '一', mirror: false },
      { char: '是', mirror: false }, { char: '在', mirror: false },
      { char: '不', mirror: false }, { char: '了', mirror: false },
      { char: '有', mirror: false }, { char: '和', mirror: false },
      { char: '來', mirror: false }, { char: '上', mirror: false },
      { char: '大', mirror: false }, { char: '為', mirror: false },
      { char: '這', mirror: false }, { char: '以', mirror: false },
      { char: '要', mirror: false }, { char: '他', mirror: false },
      // 2 blank padding slots omitted — atlas generator fills them as transparent
    ],
  },

  /**
   * orbitron — uppercase A–Z + digits 0–9. 36 glyphs, 8×8 grid (28 unused).
   * Drop-in visual swap for 'latin'. Font: data/fonts/Orbitron/static/Orbitron-Bold.ttf
   * weights.length = 64; unused → 0.0.
   */
  orbitron: {
    gridW: 8, gridH: 8,
    weights: [
      ...Array.from({ length: 36 }, () => 1.0),
      ...Array.from({ length: 28 }, () => 0.0),
    ],
    glyphs: [
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => ({ char: c, mirror: false })),
      ...'0123456789'.split('').map(c => ({ char: c, mirror: false })),
      // 28 unused trailing slots omitted
    ],
  },

  /**
   * iosevka — all 95 printable ASCII chars (U+0020–U+007E). 10×10 grid (5 unused).
   * Drop-in visual swap for 'ascii'. Font: data/fonts/Iosevka_Charon_Mono/IosevkaCharonMono-Regular.ttf
   * weights.length = 100; unused → 0.0.
   */
  iosevka: {
    gridW: 10, gridH: 10,
    weights: [
      ...Array.from({ length: 95 }, () => 1.0),
      ...Array.from({ length: 5 }, () => 0.0),
    ],
    glyphs: [
      ...Array.from({ length: 95 }, (_, i) => ({ char: String.fromCharCode(0x20 + i), mirror: false })),
      // 5 unused trailing slots omitted
    ],
  },

  /**
   * datatype — uppercase A–Z + digits 0–9. 36 glyphs, 8×8 grid (28 unused).
   * Drop-in visual swap for 'latin'. Font: data/fonts/Datatype/static/Datatype-Regular.ttf
   * weights.length = 64; unused → 0.0.
   */
  datatype: {
    gridW: 8, gridH: 8,
    weights: [
      ...Array.from({ length: 36 }, () => 1.0),
      ...Array.from({ length: 28 }, () => 0.0),
    ],
    glyphs: [
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => ({ char: c, mirror: false })),
      ...'0123456789'.split('').map(c => ({ char: c, mirror: false })),
      // 28 unused trailing slots omitted
    ],
  },

  /**
   * hebrew — 22 base Hebrew letters (alef–tav), 5 final forms, '$', and '✡'.
   * 29 glyphs in an 8×8 grid (35 unused slots).
   * Font: any Unicode font covering Hebrew + Misc Symbols blocks
   *       (e.g. Noto Sans Hebrew or similar).
   * Generate atlas: tools/gen-atlas-cli.js --set hebrew
   */
  hebrew: {
    gridW: 8, gridH: 8,
    weights: [
      // 22 base letters — moderate weights; visually complex consonants upweighted
      1.0, 1.0, 1.2, 1.2, 1.0, 1.0, 1.0, 1.2,  // א ב ג ד ה ו ז ח
      1.0, 1.5, 1.2, 1.5, 1.5, 1.5, 1.0, 1.2,  // ט י כ ל מ נ ס ע
      1.2, 1.5, 1.2, 1.5, 1.5, 1.0,             // פ צ ק ר ש ת
      // 5 final forms
      1.0, 1.0, 1.0, 1.0, 1.0,
      // $ and ✡
      0.7, 0.9,
      // 35 unused trailing slots
      ...Array.from({ length: 35 }, () => 0.0),
    ],
    glyphs: [
      // 22 base Hebrew letters (alef → tav, Unicode U+05D0–U+05EA)
      ...'אבגדהוזחטיכלמנסעפצקרשת'.split('').map(c => ({ char: c, mirror: false })),
      // 5 final forms
      ...'ךםןףץ'.split('').map(c => ({ char: c, mirror: false })),
      // Thematic symbols
      { char: '$',  mirror: false },
      { char: '✡', mirror: false },  // U+2721 Star of David
      // 35 unused trailing slots omitted
    ],
  },

  /**
   * arabic — 28 base Arabic letters and 10 Arabic-Indic digits.
   * 38 glyphs in an 8×8 grid (26 unused slots).
   * Font: Noto Sans Arabic Regular or another font with Arabic + Arabic-Indic digits.
   * Generate atlas: tools/gen-atlas-cli.js --set arabic
   */
  arabic: {
    gridW: 8, gridH: 8,
    weights: [
      // 28 base letters
      ...Array.from({ length: 28 }, () => 1.0),
      // 10 digits
      ...Array.from({ length: 10 }, () => 0.8),
      // 26 unused trailing slots
      ...Array.from({ length: 26 }, () => 0.0),
    ],
    glyphs: [
      ...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('').map(c => ({ char: c, mirror: false })),
      ...'٠١٢٣٤٥٦٧٨٩'.split('').map(c => ({ char: c, mirror: false })),
      // 26 unused trailing slots omitted
    ],
  },

  /**
   * gsanscode — all 95 printable ASCII chars (U+0020–U+007E). 10×10 grid (5 unused).
   * Drop-in visual swap for 'ascii'. Font: data/fonts/Google_Sans_Code/static/GoogleSansCode-Regular.ttf
   * weights.length = 100; unused → 0.0.
   */
  gsanscode: {
    gridW: 10, gridH: 10,
    weights: [
      ...Array.from({ length: 95 }, () => 1.0),
      ...Array.from({ length: 5 }, () => 0.0),
    ],
    glyphs: [
      ...Array.from({ length: 95 }, (_, i) => ({ char: String.fromCharCode(0x20 + i), mirror: false })),
      // 5 unused trailing slots omitted
    ],
  },
};
