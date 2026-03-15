/**
 * components/intel-feed.js
 * Intel feed — auto-cycling strategic/tactical intelligence items.
 *
 * Usage:
 *   import { initIntelFeed } from './components/intel-feed.js';
 *   initIntelFeed(document.getElementById('intel-feed'));
 */

const INTEL_ITEMS = [
  { cls: 'STRATEGIC', headline: 'BIOMECH TREATY VOTE: 72HRS', detail: 'Section 9 on standby for security detail' },
  { cls: 'TACTICAL',  headline: 'LAUGHING MAN: ACTIVE', detail: 'New sightings logged in Niihama and Togusa ward' },
  { cls: 'ASSET',     headline: 'BATOU: FIELD POSITION UPDATE', detail: 'Grid 7-Delta — visual on primary target' },
  { cls: 'THREAT',    headline: 'PUPPET MASTER PROTOCOL', detail: 'AI ghost-dive signatures — 3 confirmed nodes' },
  { cls: 'STRATEGIC', headline: 'ARAMAKI: SITUATION ROOM', detail: 'Director briefing at 0600 UTC — attendance req' },
  { cls: 'TACTICAL',  headline: 'TOGUSA: DEEP COVER', detail: 'Identity: Muto Ryo — corporate embedded' },
  { cls: 'THREAT',    headline: 'ROGUE TACHIKOMA UNIT', detail: 'Unit 14 unresponsive — last GPS: Sector 9-Bravo' },
  { cls: 'ASSET',     headline: 'ISHIKAWA: CYBER BREACH', detail: 'Target mainframe penetrated — exfil in 180s' },
  { cls: 'STRATEGIC', headline: 'COMA CHIP EXPLOIT: CONFIRMED', detail: 'Hardware vulnerability — 40k units affected' },
  { cls: 'TACTICAL',  headline: 'HELICOPTER SUPPORT: STANDING BY', detail: 'AH-6J on tarmac — ETA to sector: 4 min' },
];

function _createItem(data) {
  const div = document.createElement('div');
  div.className = 'intel-item';
  div.innerHTML = `
    <div class="intel-item__class">${data.cls}</div>
    <div class="intel-item__headline">${data.headline}</div>
    <div class="intel-item__detail">${data.detail}</div>
  `;
  return div;
}

/**
 * Start the Intel feed auto-cycling content.
 * @param {HTMLElement} feedEl - #intel-feed container
 */
export function initIntelFeed(feedEl) {
  if (!feedEl) return;
  const maxVisible = 5;
  const active = [];

  function addItem() {
    const activeHeadlines = new Set(active.map(el => el.querySelector('.intel-item__headline')?.textContent));
    const pool = INTEL_ITEMS.filter(d => !activeHeadlines.has(d.headline));
    const src = pool.length > 0 ? pool : INTEL_ITEMS;
    const data = src[Math.floor(Math.random() * src.length)];
    const el = _createItem(data);
    feedEl.insertBefore(el, feedEl.firstChild);
    active.unshift(el);
    requestAnimationFrame(() => el.classList.add('intel-item--visible'));

    const ttl = 10000 + Math.random() * 15000;
    setTimeout(() => {
      el.classList.add('intel-item--closing');
      el.classList.remove('intel-item--visible');
      setTimeout(() => { el.remove(); const i = active.indexOf(el); if (i >= 0) active.splice(i, 1); }, 500);
    }, ttl);

    while (active.length > maxVisible) {
      const old = active.pop();
      old.classList.add('intel-item--closing');
      old.classList.remove('intel-item--visible');
      setTimeout(() => old.remove(), 500);
    }

    setTimeout(addItem, 4000 + Math.random() * 8000);
  }

  setTimeout(addItem, 1200);
  setTimeout(addItem, 3500);
  setTimeout(addItem, 5800);
}
