import { mountTerminal, printLine, clearOutput } from '../../components/command-terminal.js';
import { THEMES } from './theme.js';

export function setupTerminal({ termEl, applyTheme, globeNodes, metrics, radar,
  threatEl, updateNodeLevel, setThreatLevel, setActiveNode, focusNode,
  CITY_POOL, CITY_DATA, citySkyline,
  npCity, npSkyline, npCountry, npPop, npCoords, npThreat, npStatus, nodePopup }) {

  mountTerminal(termEl, {
    onSubmit(rawCmd) {
      const parts = rawCmd.trim().split(/\s+/);
      const name = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (name) {
        case 'help':
          printLine(termEl, 'SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:', 'sys');
          printLine(termEl, '  status              — system status report', 'info');
          printLine(termEl, '  ghost               — ghost coefficient analysis', 'info');
          printLine(termEl, '  nodes               — list active threat nodes', 'info');
          printLine(termEl, '  threat <lvl>        — set global threat level 0-100', 'info');
          printLine(termEl, '  threat <id> <lvl>   — set node threat level', 'info');
          printLine(termEl, '  focus <id>          — focus camera on node', 'info');
          printLine(termEl, '  theme <name>        — switch theme', 'info');
          printLine(termEl, '  themes              — list available themes', 'info');
          printLine(termEl, '  clear               — clear terminal', 'info');
          break;

        case 'status': {
          const nodeCount = globeNodes.size;
          const critCount = [...globeNodes.values()].filter(v => v >= 70).length;
          const maxThreat = nodeCount > 0 ? Math.max(...globeNodes.values()) : 0;
          printLine(termEl, '── SYSTEM STATUS ──────────────────────────', 'sys');
          printLine(termEl, `  CPU: ${metrics.cpu}%   MEM: ${metrics.mem}%   NET I/O: ${metrics.net}%`, 'info');
          printLine(termEl, `  GHOST LAYER: ${metrics.ghost}%   ENCRYPTION: ${metrics.enc}%`, 'info');
          printLine(termEl, `  NODES ON GRID: ${nodeCount}   CRITICAL: ${critCount}`, critCount > 0 ? 'err' : 'info');
          printLine(termEl, `  PEAK THREAT: ${maxThreat}   GLOBAL LEVEL: ${maxThreat}`, maxThreat >= 70 ? 'err' : 'sys');
          printLine(termEl, '  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256', 'info');
          break;
        }

        case 'ghost': {
          const gc = metrics.ghostCoeff.toFixed(1);
          printLine(termEl, '── GHOST COEFFICIENT ANALYSIS ─────────────', 'sys');
          printLine(termEl, `  COEFFICIENT: ${gc}%   BARRIER: NOMINAL`, 'info');
          printLine(termEl, `  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7`, 'info');
          printLine(termEl, `  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE`, 'info');
          printLine(termEl, `  IDENTITY: CONFIRMED — KUSANAGI.M`, gc >= 95 ? 'sys' : 'err');
          break;
        }

        case 'nodes': {
          if (globeNodes.size === 0) { printLine(termEl, 'NO NODES ON GRID', 'info'); break; }
          printLine(termEl, `ACTIVE NODES (${globeNodes.size}):`, 'sys');
          for (const [id, lvl] of globeNodes) {
            const city = CITY_POOL.find(c => c.id === id);
            const label = city?.label ?? id;
            const type = lvl >= 70 ? 'err' : lvl >= 40 ? 'sys' : 'info';
            printLine(termEl, `  ${id.padEnd(14)} ${label.padEnd(12)} LVL=${lvl}`, type);
          }
          break;
        }

        case 'threat': {
          if (args.length === 0) {
            printLine(termEl, `GLOBAL THREAT: ${Math.max(0, ...globeNodes.values())}`, 'sys');
            break;
          }
          // threat <id> <lvl>  OR  threat <lvl>
          if (args.length >= 2 && isNaN(parseInt(args[0]))) {
            const id = args[0];
            const lvl = parseInt(args[1]);
            if (!globeNodes.has(id)) { printLine(termEl, `ERR: node '${id}' not found — use NODES to list`, 'err'); break; }
            if (isNaN(lvl) || lvl < 0 || lvl > 100) { printLine(termEl, 'ERR: level must be 0-100', 'err'); break; }
            const old = updateNodeLevel(threatEl, id, lvl);
            globeNodes.set(id, lvl);
            setThreatLevel(threatEl, Math.max(0, ...globeNodes.values()));
            radar.setRadarThreatLevel(Math.max(0, ...globeNodes.values()) / 100);
            printLine(termEl, `NODE ${id}: ${old} → ${lvl}`, lvl >= 70 ? 'err' : 'sys');
            if (lvl >= 70 && old < 70) { setActiveNode(threatEl, id); focusNode(threatEl, id); }
          } else {
            const lvl = parseInt(args[0]);
            if (isNaN(lvl) || lvl < 0 || lvl > 100) { printLine(termEl, 'ERR: level must be 0-100', 'err'); break; }
            setThreatLevel(threatEl, lvl);
            radar.setRadarThreatLevel(lvl / 100);
            printLine(termEl, `GLOBAL THREAT LEVEL SET: ${lvl}`, 'sys');
          }
          break;
        }

        case 'focus': {
          const id = args[0];
          if (!id) { printLine(termEl, 'ERR: focus requires a node id — use NODES to list', 'err'); break; }
          if (!globeNodes.has(id)) { printLine(termEl, `ERR: node '${id}' not found`, 'err'); break; }
          setActiveNode(threatEl, id);
          focusNode(threatEl, id);
          const city = CITY_POOL.find(c => c.id === id);
          printLine(termEl, `CAMERA FOCUSED: ${city?.label ?? id}`, 'sys');
          break;
        }

        case 'theme': {
          const t = args[0]?.toLowerCase() ?? '';
          if (t === '' || t === 'matrixgreen') { applyTheme(''); printLine(termEl, 'THEME: MATRIX GREEN', 'sys'); break; }
          if (!Object.keys(THEMES).includes(t)) {
            printLine(termEl, `ERR: unknown theme '${t}' — use THEMES to list`, 'err'); break;
          }
          applyTheme(t);
          printLine(termEl, `THEME: ${THEMES[t]}`, 'sys');
          break;
        }

        case 'themes':
          printLine(termEl, 'AVAILABLE THEMES:', 'sys');
          for (const [k, v] of Object.entries(THEMES)) {
            printLine(termEl, `  ${(k || 'matrixgreen').padEnd(14)} ${v}`, 'info');
          }
          break;

        case 'clear':
          clearOutput(termEl);
          printLine(termEl, 'TERMINAL CLEARED', 'sys');
          break;

        default:
          if (name) printLine(termEl, `ERR: unknown command '${rawCmd}' — type HELP`, 'err');
      }
    },
    tabComplete(partial) {
      const keys = ['help', 'status', 'ghost', 'nodes', 'threat', 'focus', 'theme', 'themes', 'clear'];
      return keys.find(k => k.startsWith(partial.toLowerCase())) ?? null;
    },
  });

  printLine(termEl, 'SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS', 'sys');
  printLine(termEl, 'GHOST BABEL OPERATION: ACTIVE', 'info');
}
