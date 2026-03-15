/**
 * components/data-stream-content.js
 * Dynamic data-stream row generator — emits randomised network/auth/scan entries.
 *
 * Usage:
 *   import { startDynamicStream } from './components/data-stream-content.js';
 *   startDynamicStream(streamEl, appendRow);
 */

function _rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const _ips  = () => `${_rnd(10, 220)}.${_rnd(0, 255)}.${_rnd(0, 255)}.${_rnd(1, 254)}`;
const _port = () => [22, 80, 443, 8443, 4444, 3389, 21, 1337, 9999][Math.floor(Math.random() * 9)];
const _bytes = () => `${_rnd(64, 65535)}B`;
const _hex  = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ');

const TEMPLATES = [
  () => ({ source: 'AUTH',  message: `HANDSHAKE COMPLETE — ${_ips()}:${_port()}`, alert: false }),
  () => ({ source: 'NET',   message: `PKT ${_bytes()} ${_ips()} → ${_ips()}`, alert: false }),
  () => ({ source: 'GHOST', message: `DIVE DEPTH: ${(2 + Math.random() * 3).toFixed(1)}m — STABLE`, alert: false }),
  () => ({ source: 'CRYPT', message: `AES-256 SESSION KEY ESTABLISHED`, alert: false }),
  () => ({ source: 'SCAN',  message: `PROBE: ${_ips()}:${_port()} — ${_hex()}`, alert: true }),
  () => ({ source: 'SYS',   message: `MEM ${_rnd(60, 92)}% CPU ${_rnd(20, 80)}% THERMAL OK`, alert: false }),
  () => ({ source: 'NET',   message: `LATENCY ${_rnd(4, 45)}ms — ${Math.random() < 0.8 ? 'NOMINAL' : 'DEGRADED'}`, alert: Math.random() < 0.2 }),
  () => ({ source: 'AUTH',  message: `TOKEN REFRESH: UID-${_rnd(1000, 9999)}`, alert: false }),
  () => ({ source: 'CRIT',  message: `INTRUSION SIG: ${_ips()} PORT ${_port()}`, alert: true }),
  () => ({ source: 'SYS',   message: `COUNTERMEASURE DEPLOYED — BLOCK RULE ${_rnd(100, 999)}`, alert: false }),
  () => ({ source: 'NET',   message: `ROUTE CHANGE: AS${_rnd(1000, 65000)} VIA ${_ips()}`, alert: false }),
  () => ({ source: 'CRYPT', message: `TLS 1.3 HANDSHAKE: ${_ips()} — ${_rnd(0, 1) ? 'ECDH' : 'RSA'}-4096`, alert: false }),
  () => ({ source: 'SCAN',  message: `ANOMALY: BURST ${_rnd(800, 9999)} PPS FROM ${_ips()}`, alert: true }),
  () => ({ source: 'GHOST', message: `GHOST COEFFICIENT: ${(92 + Math.random() * 8).toFixed(1)}%`, alert: false }),
  () => ({ source: 'AUTH',  message: `CERT CHAIN VALID — SHA-${_rnd(0, 1) ? '256' : '512'}`, alert: false }),
  () => ({ source: 'NET',   message: `DNS RESOLVE: ${['niihama.net', 'togusa.local', 'sec9.gov', 'puppet.io'][Math.floor(Math.random() * 4)]}`, alert: false }),
  () => ({ source: 'SYS',   message: `FIREWALL RULE ${_rnd(1000, 9999)}: DROP ${_ips()}/${_rnd(24, 32)}`, alert: false }),
  () => ({ source: 'CRIT',  message: `ZERO-DAY ATTEMPT: ${_ips()} — MITIGATED`, alert: true }),
];

/**
 * Start emitting randomised data-stream rows.
 * @param {HTMLElement} streamEl  - mounted .s9-stream element
 * @param {Function}    appendRow - data-stream appendRow(el, row)
 */
export function startDynamicStream(streamEl, appendRow) {
  function emit() {
    const fn = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    appendRow(streamEl, { timestamp: new Date().toISOString(), ...fn() });
  }

  for (let i = 0; i < 8; i++) emit();
  setInterval(emit, _rnd(1200, 2800));
}
