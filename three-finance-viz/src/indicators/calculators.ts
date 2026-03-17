// src/indicators/calculators.ts
// All functions are pure — no side effects, no scene references

import type { OHLCV, BBResult, MACDResult, PriceSource } from '../types/addendum';

export function calcSMA(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  if (period > values.length) return result;

  let sum = 0;
  for (let i = 0; i < period - 1; i++) sum += values[i];

  for (let i = period - 1; i < values.length; i++) {
    sum += values[i];
    result[i] = sum / period;
    sum -= values[i - period + 1];
  }
  return result;
}

export function calcEMA(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  const k = 2 / (period + 1);
  let prev: number | null = null;

  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) continue;
    if (prev === null) {
      // Seed with SMA of first `period` values
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += values[j];
      prev = sum / period;
    } else {
      prev = values[i] * k + prev * (1 - k);
    }
    result[i] = prev;
  }
  return result;
}

export function calcBollingerBands(
  values: number[],
  period: number,
  stdDevMultiplier: number,
): BBResult {
  const mid   = calcSMA(values, period);
  const upper = new Array(values.length).fill(null) as (number | null)[];
  const lower = new Array(values.length).fill(null) as (number | null)[];

  // Running sum-of-squares for O(N) variance — avoids slice() allocations.
  // Uses identity: Var(X) = E[X²] - (E[X])²
  let sumSq = 0;
  for (let j = 0; j < period; j++) sumSq += values[j] * values[j];

  for (let i = period - 1; i < values.length; i++) {
    if (i > period - 1) {
      sumSq += values[i] * values[i] - values[i - period] * values[i - period];
    }
    const mean = mid[i] as number;
    const variance = Math.max(0, sumSq / period - mean * mean); // clamp FP errors
    const sd = Math.sqrt(variance);
    upper[i] = mean + stdDevMultiplier * sd;
    lower[i] = mean - stdDevMultiplier * sd;
  }
  return { mid, upper, lower };
}

export function calcRSI(values: number[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(values.length).fill(null);
  // Need at least period+1 values: period differences to seed, then period index for first result
  if (values.length < period + 1) return result;

  // Seed: average gain/loss over the first `period` differences (indices 1..period)
  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const diff = values[i] - values[i - 1];
    if (diff > 0) avgGain += diff; else avgLoss -= diff;
  }
  avgGain /= period;
  avgLoss /= period;

  // First RSI result at index `period` uses the seeded averages directly
  // (Wilder smoothing applied from index `period+1` onward)
  for (let i = period; i < values.length; i++) {
    if (i > period) {
      const diff = values[i] - values[i - 1];
      const gain = diff > 0 ? diff : 0;
      const loss = diff < 0 ? -diff : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    result[i] = 100 - 100 / (1 + rs);
  }
  return result;
}

export function calcMACD(
  values: number[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number,
): MACDResult {
  const fast = calcEMA(values, fastPeriod);
  const slow = calcEMA(values, slowPeriod);

  const macd: (number | null)[] = values.map((_, i) => {
    return fast[i] !== null && slow[i] !== null
      ? (fast[i] as number) - (slow[i] as number)
      : null;
  });

  // Find first valid MACD index to avoid zero-fill distortion on the signal EMA.
  const firstValid = macd.findIndex(v => v !== null);
  if (firstValid === -1) {
    const nullArray = macd.map(() => null);
    return { macd, signal: nullArray, histogram: nullArray };
  }

  // Pass only the valid portion to calcEMA, then re-align to original length
  const macdTrimmed = macd.slice(firstValid) as number[];
  const signalTrimmed = calcEMA(macdTrimmed, signalPeriod);
  const signal: (number | null)[] = [
    ...new Array(firstValid).fill(null),
    ...signalTrimmed,
  ];

  const histogram: (number | null)[] = macd.map((v, i) =>
    v !== null && signal[i] !== null ? v - (signal[i] as number) : null,
  );

  return { macd, signal, histogram };
}

// Extract price source from OHLCV
export function extractSource(candles: OHLCV[], source: PriceSource): number[] {
  return candles.map(c => {
    switch (source) {
      case 'open':  return c.open;
      case 'high':  return c.high;
      case 'low':   return c.low;
      case 'hl2':   return (c.high + c.low) / 2;
      case 'ohlc4': return (c.open + c.high + c.low + c.close) / 4;
      default:      return c.close;
    }
  });
}
