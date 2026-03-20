function fmtUtc(d) {
  const p = n => String(n).padStart(2, '0');
  return `UTC ${d.getUTCFullYear()}-${p(d.getUTCMonth()+1)}-${p(d.getUTCDate())} `
       + `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

function tickClock() {
  const now = new Date();
  document.getElementById('topbar-clock').textContent =
    `UTC ${now.toUTCString().split(' ')[4]}`;
}

export function startClock() {
  tickClock();
  setInterval(tickClock, 1000);
}
