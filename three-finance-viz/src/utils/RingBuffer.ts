// src/utils/RingBuffer.ts

/**
 * Generic fixed-capacity circular buffer.
 * Used as a sliding window for recent ticks before aggregation.
 */
export class RingBuffer<T> {
  private _buf: Array<T | undefined>;
  private _head = 0;
  private _size = 0;

  constructor(readonly capacity: number) {
    this._buf = new Array<T | undefined>(capacity);
  }

  push(item: T): void {
    this._buf[this._head] = item;
    this._head = (this._head + 1) % this.capacity;
    if (this._size < this.capacity) this._size++;
  }

  get size(): number {
    return this._size;
  }

  get(i: number): T {
    if (i < 0 || i >= this._size) throw new RangeError(`RingBuffer.get(${i}) out of range`);
    const idx = (this._head - this._size + i + this.capacity * 2) % this.capacity;
    return this._buf[idx] as T;
  }

  /** Iterate from oldest to newest */
  forEach(fn: (item: T, i: number) => void): void {
    for (let i = 0; i < this._size; i++) {
      fn(this.get(i), i);
    }
  }

  clear(): void {
    this._head = 0;
    this._size = 0;
  }
}
