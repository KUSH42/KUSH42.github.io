// src/providers/SymbolResolver.ts

import type { CanonicalSymbol } from './types';

// ── Default aliases ────────────────────────────────────────────────────────────

const DEFAULT_ALIASES: [string, string][] = [
  ['XBT',  'BTC'],
  ['XDG',  'DOGE'],
  ['XXBT', 'BTC'],
  ['ZUSD', 'USD'],
  ['ZEUR', 'EUR'],
];

// Known quote currency suffixes for no-separator parsing
const KNOWN_QUOTES = ['USDT', 'USD', 'BTC', 'ETH', 'EUR', 'USDC', 'BNB', 'BUSD'] as const;

/**
 * Cross-exchange symbol normalizer.
 * Converts various symbol formats into a canonical "BASE/QUOTE" form.
 */
export class SymbolResolver {
  private readonly _aliases = new Map<string, string>();

  constructor() {
    for (const [from, to] of DEFAULT_ALIASES) {
      this.registerAlias(from, to);
    }
  }

  /**
   * Register a canonical alias (e.g. XBT → BTC).
   */
  registerAlias(from: string, to: string): void {
    this._aliases.set(from.toUpperCase(), to.toUpperCase());
  }

  private _applyAlias(part: string): string {
    return this._aliases.get(part.toUpperCase()) ?? part.toUpperCase();
  }

  /**
   * Normalize a user-provided symbol string into CanonicalSymbol form.
   * Handles:
   *   "BTCUSDT"  → "BTC/USDT"
   *   "BTC-USD"  → "BTC/USD"
   *   "BTC/USD"  → "BTC/USD" (passthrough)
   *   "XBT/USD"  → "BTC/USD" (alias normalization)
   *   "btcusdt"  → "BTC/USDT" (lowercase input)
   * Returns null if the string cannot be parsed.
   */
  normalize(symbol: string): CanonicalSymbol | null {
    if (!symbol || typeof symbol !== 'string') return null;

    const upper = symbol.toUpperCase().trim();
    if (!upper) return null;

    // Step 2: If contains '/': split on '/', apply aliases
    if (upper.includes('/')) {
      const [base, quote] = upper.split('/');
      if (!base || !quote) return null;
      return `${this._applyAlias(base)}/${this._applyAlias(quote)}` as CanonicalSymbol;
    }

    // Step 3: If contains '-': split on '-', apply aliases
    if (upper.includes('-')) {
      const [base, quote] = upper.split('-');
      if (!base || !quote) return null;
      return `${this._applyAlias(base)}/${this._applyAlias(quote)}` as CanonicalSymbol;
    }

    // Step 4: No separator — attempt known quote suffixes
    for (const suffix of KNOWN_QUOTES) {
      if (upper.endsWith(suffix) && upper.length > suffix.length) {
        const base  = upper.slice(0, upper.length - suffix.length);
        const quote = suffix;
        if (!base) continue;
        return `${this._applyAlias(base)}/${this._applyAlias(quote)}` as CanonicalSymbol;
      }
    }

    // Step 5: Could not parse
    return null;
  }
}
