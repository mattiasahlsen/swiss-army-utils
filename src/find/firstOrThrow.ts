import { indexOrThrow } from './indexOrThrow.js';

/**
 * Returns the first item in the array, throwing an error if the array is empty.
 *
 * @param {T[]} items - The array to get the first item from.
 * @returns {T} The first item in the array.
 * @throws {Error} If the array is empty.
 *
 * @example
 * ```ts
 * const items = ['a', 'b', 'c'];
 *
 * firstOrThrow(items); // returns 'a'
 * firstOrThrow([]); // throws Error: No item found at index 0
 * ```
 */
export function firstOrThrow<T>(items: T[]): T {
  return indexOrThrow(items, 0);
}
