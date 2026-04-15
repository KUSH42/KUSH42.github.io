/**
 * matrix-rain-easter-eggs.js — CCP and Mossad easter egg assets and helpers.
 *
 * Exports data arrays, texture builders, colour utilities, and the one-time
 * CSS scan-bar injector used by initMatrixRain.
 */

import * as THREE from 'three/webgpu';

// ═════════════════════════════════════════════════════════════════════════
// CCP EASTER EGG — module-scope constants and helpers
// ═════════════════════════════════════════════════════════════════════════

// Xi Jinping braille copypasta — well-known public-domain counter-censorship art.
export const CCP_ART = [
  // [0] Xi Jinping portrait (classic braille meme)
  `⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠄⢁⠈⢻⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⡀⠭⢿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠄⢀⣾⣿⣿⣿⣷⣶⣿⣷⣶⣶⡆⠄⠄⠄⣿⣿⣿⣿
⣿⣿⣿⣿⡇⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣇⣼⣿⣿⠿⠶⠙⣿⡟⠡⣴⣿⣽⣿⣧⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣾⣿⣿⣟⣭⣾⣿⣷⣶⣶⣴⣶⣿⣿⢄⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡟⣩⣿⣿⣿⡏⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣹⡋⠘⠷⣦⣀⣠⡶⠁⠈⠁⠄⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣍⠃⣴⣶⡔⠒⠄⣠⢀⠄⠄⠄⡨⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡘⠿⣷⣿⠿⠟⠃⠄⠄⣠⡇⠈⠻⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠟⠋⢁⣷⣠⠄⠄⠄⠄⣀⣠⣾⡟⠄⠄⠄⠄⠉⠙⠻
⡿⠟⠋⠁⠄⠄⠄⢸⣿⣿⡯⢓⣴⣾⣿⣿⡟⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⣿⡟⣷⠄⠹⣿⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣸⣿⡷⡇⠄⣴⣾⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣿⣿⠃⣦⣄⣿⣿⣿⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢸⣿⠗⢈⡶⣷⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`,

  // [1] Xi Jinping portrait (second panel — same meme)
  `⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠄⢁⠈⢻⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⡀⠭⢿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠄⢀⣾⣿⣿⣿⣷⣶⣿⣷⣶⣶⡆⠄⠄⠄⣿⣿⣿⣿
⣿⣿⣿⣿⡇⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣇⣼⣿⣿⠿⠶⠙⣿⡟⠡⣴⣿⣽⣿⣧⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣾⣿⣿⣟⣭⣾⣿⣷⣶⣶⣴⣶⣿⣿⢄⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡟⣩⣿⣿⣿⡏⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣹⡋⠘⠷⣦⣀⣠⡶⠁⠈⠁⠄⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣍⠃⣴⣶⡔⠒⠄⣠⢀⠄⠄⠄⡨⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡘⠿⣷⣿⠿⠟⠃⠄⠄⣠⡇⠈⠻⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠟⠋⢁⣷⣠⠄⠄⠄⠄⣀⣠⣾⡟⠄⠄⠄⠄⠉⠙⠻
⡿⠟⠋⠁⠄⠄⠄⢸⣿⣿⡯⢓⣴⣾⣿⣿⡟⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⣿⡟⣷⠄⠹⣿⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣸⣿⡷⡇⠄⣴⣾⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣿⣿⠃⣦⣄⣿⣿⣿⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢸⣿⠗⢈⡶⣷⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`,

  // [2] Xi Jinping portrait (third panel — same meme)
  `⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠄⢁⠈⢻⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⡀⠭⢿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠄⢀⣾⣿⣿⣿⣷⣶⣿⣷⣶⣶⡆⠄⠄⠄⣿⣿⣿⣿
⣿⣿⣿⣿⡇⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣇⣼⣿⣿⠿⠶⠙⣿⡟⠡⣴⣿⣽⣿⣧⠄⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣾⣿⣿⣟⣭⣾⣿⣷⣶⣶⣴⣶⣿⣿⢄⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡟⣩⣿⣿⣿⡏⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣹⡋⠘⠷⣦⣀⣠⡶⠁⠈⠁⠄⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣍⠃⣴⣶⡔⠒⠄⣠⢀⠄⠄⠄⡨⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡘⠿⣷⣿⠿⠟⠃⠄⠄⣠⡇⠈⠻⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠟⠋⢁⣷⣠⠄⠄⠄⠄⣀⣠⣾⡟⠄⠄⠄⠄⠉⠙⠻
⡿⠟⠋⠁⠄⠄⠄⢸⣿⣿⡯⢓⣴⣾⣿⣿⡟⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⣿⡟⣷⠄⠹⣿⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣸⣿⡷⡇⠄⣴⣾⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⣿⣿⠃⣦⣄⣿⣿⣿⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢸⣿⠗⢈⡶⣷⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`,
];

// Panel position table: azimuth (rad), radius, y offset, flash phase (rad)
export const _CCP_POSES = [
  { az: 0.0,   r: 22, y: +1.5, phase: 0.0   },
  { az: 2.094, r: 24, y: -1.0, phase: 2.094 },
  { az: 4.189, r: 21, y: +2.5, phase: 4.189 },
];

// CCP mode expansion constants
export const CCP_SLOGANS = [
  '\u4e3a\u4eba\u6c11\u670d\u52a1',   // 为人民服务 Serve the People
  '\u4e2d\u56fd\u68a6',               // 中国梦 Chinese Dream
  '\u4e0d\u5fd8\u521d\u5fc3',         // 不忘初心 Never Forget the Original Mission
  '\u548c\u8c10\u793e\u4f1a',         // 和谐社会 Harmonious Society
  '\u5929\u5b89\u95e8',               // 天安门 Tiananmen
];

export const TIANANMEN_ART = [
  '\u256c\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256c',
  '\u2551  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u25b2\u25b2\u25b2  \u2551',
  '\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551',
  '\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563',
  '\u2551 \u2591\u2591\u2591\u2591\u2591\u2591 \u2551  \u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588  \u2588\u2588\u2588  \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2551 \u2591\u2591\u2591\u2591\u2591\u2591 \u2551  \u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588  \u2588\u2588\u2588  \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256c\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256c\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563',
  '\u2551 \u2591\u2591\u2591\u2591\u2591\u2591 \u2551  \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2551        \u2551  \u2591\u2591 \u5929 \u5b89 \u95e8 \u5e7f \u573a \u2591\u2591  \u2551          \u2551',
  '\u2551 \u2591\u2591\u2591\u2591\u2591\u2591 \u2551  \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256c\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256c\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563',
  '\u2551\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2551\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2551 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2551',
  '\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563',
  '\u2551 \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588  \u2551',
  '\u2551 \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588   \u2588\u2588\u2588  \u2551',
  '\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563',
  '\u2551  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2502  \u2551',
  '\u2558\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2565',
].join('\n');

/**
 * Draw a 5-pointed star on a 2D canvas context.
 */
function drawStar(ctx, cx, cy, outerR, innerR, points, rotation) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r     = i % 2 === 0 ? outerR : innerR;
    const angle = rotation + i * Math.PI / points;
    if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    else         ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
}

/**
 * Build a canvas texture with Xi Jinping braille ASCII art in red on transparent bg.
 */
export function buildGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx  = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0,    'rgba(255, 100, 60, 0.7)');
  grad.addColorStop(0.35, 'rgba(255, 30, 10, 0.35)');
  grad.addColorStop(0.7,  'rgba(200, 0, 0, 0.1)');
  grad.addColorStop(1,    'rgba(150, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function buildBrailleTexture(artStr) {
  const canvas = document.createElement('canvas');
  canvas.width  = 768;
  canvas.height = 512;
  const ctx   = canvas.getContext('2d');
  const lines = artStr.split('\n');
  ctx.font      = '16px monospace';
  ctx.fillStyle = '#ff2020';
  ctx.textBaseline = 'top';
  let maxW = 0;
  for (const l of lines) {
    const w = ctx.measureText(l).width;
    if (w > maxW) maxW = w;
  }
  const xOffset = (canvas.width - maxW) / 2;
  const yStep   = canvas.height / (lines.length + 2);
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], xOffset, yStep + i * yStep);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Build a canvas texture of the PRC five-star flag.
 */
export function buildFlagTexture() {
  const canvas = document.createElement('canvas');
  canvas.width  = 512;
  canvas.height = 341;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#DE2910';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFDE00';
  const lcx = 170, lcy = 85;
  drawStar(ctx, lcx, lcy, 51, 21, 5, -Math.PI / 2);
  const smalls = [
    { cx: 256, cy: 34  },
    { cx: 291, cy: 68  },
    { cx: 291, cy: 116 },
    { cx: 256, cy: 153 },
  ];
  for (const s of smalls) {
    const rot = Math.atan2(lcy - s.cy, lcx - s.cx) - Math.PI / 2;
    drawStar(ctx, s.cx, s.cy, 20, 8, 5, rot);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Build a canvas texture of Tiananmen Gate ASCII art (gold on red).
 */
export function buildTiananmenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width  = 768;
  canvas.height = 480;
  const ctx   = canvas.getContext('2d');
  ctx.fillStyle = '#DE2910';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font         = '15px monospace';
  ctx.fillStyle    = '#FFDE00';
  ctx.textBaseline = 'top';
  const lines = TIANANMEN_ART.split('\n');
  let maxW = 0;
  for (const l of lines) {
    const w = ctx.measureText(l).width;
    if (w > maxW) maxW = w;
  }
  const xOffset = (canvas.width - maxW) / 2;
  const yStep   = (canvas.height - 40) / (lines.length + 2);
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], xOffset, yStep + i * yStep);
  }
  ctx.font = '14px monospace';
  const lastY  = yStep + lines.length * yStep + 20;
  const label  = '\u5929\u5b89\u95e8';
  const labelW = ctx.measureText(label).width;
  ctx.fillText(label, (canvas.width - labelW) / 2, lastY);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Convert 0–1 float channels to '#rrggbb' hex string.
 */
export function toHex(r, g, b) {
  return '#' + [r, g, b].map(v =>
    Math.round(v * 255).toString(16).padStart(2, '0')
  ).join('');
}

// ═════════════════════════════════════════════════════════════════════════
// MOSSAD EASTER EGG — module-scope constants, helpers, and style guard
// ═════════════════════════════════════════════════════════════════════════

// Netanyahu braille copypasta — well-known public-domain counter-surveillance art.
export const MOSSAD_ART = [
  // [0] Netanyahu portrait — full
  `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣿⣿⣿⣶⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀
⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀
⠀⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⠀
⠀⣿⣿⣿⣿⡿⠋⠀⠀⣠⣤⣤⣀⠀⠙⢿⣿⣿⣿⣿⠀
⠀⣿⣿⣿⣿⠀⠀⠀⠸⣿⣿⣿⣿⠇⠀⠀⣿⣿⣿⣿⠀
⠀⣿⣿⣿⣿⣆⠀⠀⠀⠙⠛⠛⠋⠀⠀⣰⣿⣿⣿⣿⠀
⠀⠹⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⣀⣤⣾⣿⣿⣿⣿⠏⠀
⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀
⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

  // [1] Netanyahu portrait — compact bust
  `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀
⠀⣸⣿⣿⣿⣿⡿⠿⠛⠛⠿⢿⣿⣿⣿⣿⣇⠀⠀⠀
⠀⣿⣿⣿⡿⠋⠀⣠⣤⣤⣀⠈⢿⣿⣿⣿⣿⠀⠀⠀
⠀⣿⣿⣿⠀⠀⠸⣿⣿⣿⣿⠇⠀⢿⣿⣿⣿⠀⠀⠀
⠀⣿⣿⣿⣆⠀⠀⠙⠛⠛⠋⠀⣰⣿⣿⣿⣿⠀⠀⠀
⠀⠹⣿⣿⣿⣿⣶⣤⣀⣀⣤⣾⣿⣿⣿⣿⠏⠀⠀⠀
⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀`,

  // [2] Netanyahu portrait — dense fill
  `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿
⣿⣿⣿⠃⠀⢀⣶⣶⣶⣶⣶⣶⣶⣶⡀⠀⠘⣿⣿⣿⣿
⣿⣿⣿⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⣿⣿⣿⣿
⣿⣿⣿⠀⠀⣿⣿⡟⠛⠛⠛⠛⢻⣿⣿⠀⠀⣿⣿⣿⣿
⣿⣿⣿⠀⠀⣿⣿⡇⠀⣿⣿⠀⢸⣿⣿⠀⠀⣿⣿⣿⣿
⣿⣿⣿⠀⠀⣿⣿⣇⠀⠛⠛⠀⣸⣿⣿⠀⠀⣿⣿⣿⣿
⣿⣿⣿⠄⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠠⣿⣿⣿⣿
⣿⣿⣿⣿⠀⠀⠈⠙⠻⠿⠿⠟⠋⠁⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
];

export const MOSSAD_SLOGANS = [
  'BY DECEPTION THOU SHALT MAKE WAR',
  'OPERATION WRATH OF GOD',
  'WHO DARES TO TOUCH ME',
  'IRON DOME',
  'FROM THE NILE TO THE EUPHRATES',
];

// Panel position table: azimuth (rad), radius, y offset, flash phase (rad)
export const _MOSSAD_POSES = [
  { az: 0.0,   r: 22, yOffset: +1.5, phase: 0.0   },
  { az: 2.094, r: 24, yOffset: -1.0, phase: 2.094  },
  { az: 4.189, r: 21, yOffset: +2.5, phase: 4.189  },
  { az: 1.047, r: 23, yOffset: +0.5, phase: 1.047  },  // flag
];

/**
 * Build a canvas texture with Netanyahu braille art in blue on transparent bg.
 */
export function buildMossadPortraitTexture(artStr) {
  const canvas = document.createElement('canvas');
  canvas.width  = 768;
  canvas.height = 512;
  const ctx   = canvas.getContext('2d');
  const lines = artStr.split('\n');
  ctx.font         = '16px monospace';
  ctx.fillStyle    = '#3060FF';
  ctx.textBaseline = 'top';
  let maxW = 0;
  for (const l of lines) {
    const w = ctx.measureText(l).width;
    if (w > maxW) maxW = w;
  }
  const xOffset = (canvas.width - maxW) / 2;
  const yStep   = canvas.height / (lines.length + 2);
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], xOffset, yStep + i * yStep);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Build a canvas texture of the Israeli flag.
 */
export function buildIsraeliFlag() {
  const canvas = document.createElement('canvas');
  canvas.width  = 640;
  canvas.height = 427;
  const ctx = canvas.getContext('2d');
  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 640, 427);
  // Top blue stripe
  ctx.fillStyle = '#0038B8';
  ctx.fillRect(0, 85, 640, 64);
  // Bottom blue stripe
  ctx.fillStyle = '#0038B8';
  ctx.fillRect(0, 278, 640, 64);
  // Star of David — two equilateral triangles, circumradius 72
  const cx = 320, cy = 213, R = 72;
  ctx.fillStyle = '#0038B8';
  // Triangle 1: up-pointing (vertices at -90°, 30°, 150°)
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const ang = -Math.PI / 2 + i * (2 * Math.PI / 3);
    const x = cx + R * Math.cos(ang);
    const y = cy + R * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  // Triangle 2: down-pointing (vertices at 90°, 210°, 330°)
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const ang = Math.PI / 2 + i * (2 * Math.PI / 3);
    const x = cx + R * Math.cos(ang);
    const y = cy + R * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  // Inner hexagon in white to cut overlap and form star shape (circumradius 41.6)
  const Rh = 41.6;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const ang = i * (Math.PI / 3);
    const x = cx + Rh * Math.cos(ang);
    const y = cy + Rh * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Module-level scan bar CSS injection guard — survives re-initialisation. */
let _mossadScanStyleInjected = false;

/**
 * Inject the Mossad scan-bar CSS animation once per page load.
 * Safe to call multiple times; subsequent calls are no-ops.
 */
export function ensureMossadScanStyle() {
  if (_mossadScanStyleInjected) return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes mossadScan { from { top: 100% } to { top: -2px } }
    #mossad-scan-a, #mossad-scan-b {
      position: fixed; left: 0; right: 0; height: 2px;
      background: rgba(126,179,255,0.15); pointer-events: none; z-index: 9991;
      animation: mossadScan 3.5s linear infinite;
    }
    #mossad-scan-b { animation-delay: -1.75s; }
  `;
  document.head.appendChild(style);
  _mossadScanStyleInjected = true;
}
