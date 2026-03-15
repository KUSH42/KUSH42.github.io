/**
 * components/sigint-feed.js
 * SIGINT news feed — auto-cycling classified intelligence items.
 *
 * Usage:
 *   import { initSigintFeed } from './components/sigint-feed.js';
 *   initSigintFeed(document.getElementById('sigint-feed'));
 */

const SIGINT_ITEMS = [
  { cls: 'sigint', headline: 'SIGNAL INTERCEPT: FREQ 12.4GHz', detail: 'Encrypted burst tx — POSEIDON signature' },
  { cls: 'humint', headline: 'ASSET CONFIRM: NIIHAMA-04', detail: 'Target movement: port district, 0300 local' },
  { cls: 'cyber',  headline: 'ZERO-DAY: CVE-2026-3917', detail: 'Legacy auth stack — remote exec payload ready' },
  { cls: 'ghost',  headline: 'DIVE ANOMALY: SECTOR ALPHA', detail: 'Ghost-barrier interference at 4.1m depth' },
  { cls: 'elint',  headline: 'DRONE SWEEP: SECTOR 12', detail: 'Coverage 73% — ETA 4 minutes to full map' },
  { cls: 'sigint', headline: 'PACKET STORM: 192.168.7.0/24', detail: '18k pps sustained — possible DDoS staging' },
  { cls: 'cyber',  headline: 'EXFIL CHANNEL COMPROMISED', detail: 'Fallback route DELTA-9 now primary exfil' },
  { cls: 'humint', headline: 'CONTACT LOST: ROMEO-7', detail: 'Last check-in 03:14:22 UTC — status unknown' },
  { cls: 'ghost',  headline: 'TACHIKOMA: AUTONOMOUS SWEEP', detail: 'Unit 9 executing sector 7 independently' },
  { cls: 'elint',  headline: 'EM PULSE DETECTED: ZONE 3', detail: 'Localized disruption — comm nodes offline' },
  { cls: 'sigint', headline: 'NODE COMMS SPIKE: BEIJING', detail: '340% increase in encrypted P2P — 0300-0500' },
  { cls: 'cyber',  headline: 'FIREWALL PROBE: AS12345', detail: 'Systematic port sweep — countermeasures deployed' },
  { cls: 'humint', headline: 'BROKER IDENTIFIED: LAUGHING MAN', detail: 'Dark web auction — biotech data linked to incident' },
  { cls: 'ghost',  headline: 'GHOST PROTOCOL: BETA-3', detail: 'Shell confirmed on target system — extract ready' },
  { cls: 'elint',  headline: 'SAT PASS: KH-17 WINDOW', detail: '6 min coverage — imaging tasked to sector 4' },
];

function _createItem(data) {
  const div = document.createElement('div');
  div.className = `sigint-item sigint-item--${data.cls}`;
  div.innerHTML = `
    <div class="sigint-item__class">${data.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${data.headline}</div>
    <div class="sigint-item__detail">${data.detail}</div>
  `;
  return div;
}

/**
 * Start the SIGINT news feed auto-cycling content.
 * @param {HTMLElement} feedEl - #sigint-feed container
 */
export function initSigintFeed(feedEl) {
  if (!feedEl) return;
  const maxVisible = 4;
  const active = [];

  function addItem() {
    const activeHeadlines = new Set(active.map(el => el.querySelector('.sigint-item__headline')?.textContent));
    const pool = SIGINT_ITEMS.filter(d => !activeHeadlines.has(d.headline));
    const src = pool.length > 0 ? pool : SIGINT_ITEMS;
    const data = src[Math.floor(Math.random() * src.length)];
    const el = _createItem(data);
    feedEl.insertBefore(el, feedEl.firstChild);
    active.unshift(el);
    requestAnimationFrame(() => el.classList.add('sigint-item--visible'));

    const ttl = 8000 + Math.random() * 12000;
    setTimeout(() => {
      el.classList.add('sigint-item--closing');
      el.classList.remove('sigint-item--visible');
      setTimeout(() => { el.remove(); const i = active.indexOf(el); if (i >= 0) active.splice(i, 1); }, 500);
    }, ttl);

    while (active.length > maxVisible) {
      const old = active.pop();
      old.classList.add('sigint-item--closing');
      old.classList.remove('sigint-item--visible');
      setTimeout(() => old.remove(), 500);
    }

    setTimeout(addItem, 3000 + Math.random() * 6000);
  }

  setTimeout(addItem, 800);
  setTimeout(addItem, 2200);
}
