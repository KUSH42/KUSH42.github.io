// src/export/CSVExporter.ts
import type { CandleBuffer } from '../types/CandleBuffer';

export class CSVExporter {
  constructor(private readonly buffer: CandleBuffer) {}

  export(timeRange?: [number, number]): string {
    const rows: string[] = ['time,open,high,low,close,volume'];
    const { buffer } = this;

    for (let i = 0; i < buffer.count; i++) {
      const t = buffer.time[i];
      if (timeRange) {
        if (t < timeRange[0] || t > timeRange[1]) continue;
      }
      const o = buffer.open(i);
      const h = buffer.high(i);
      const l = buffer.low(i);
      const c = buffer.close(i);
      const v = buffer.volume(i);
      rows.push(`${t},${o},${h},${l},${c},${v}`);
    }

    return rows.join('\n');
  }
}
