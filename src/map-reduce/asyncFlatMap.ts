import { asyncMap } from './asyncMap.js';

/**
 * Asynchronously maps over an array or async iterable and flattens the results.
 * Equivalent to calling asyncMap followed by Array.flat().
 * The mapping is performed sequentially to maintain order.
 *
 * @param {T[] | AsyncIterable<T>} array - The array or async iterable to map over.
 * @param {function} mapper - Async function that transforms each item. Receives the item and its index.
 * @returns {Promise<Array>} A promise that resolves to a flattened array of mapped results.
 *
 * @example
 * ```ts
 * const words = ['hello', 'world'];
 * const letters = await asyncFlatMap(words, async (word, index) => {
 *   await sleep(100); // Simulate async operation
 *   return word.split('');
 * });
 * // returns ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
 *
 * // Without asyncFlatMap, you'd need:
 * // const mapped = await asyncMap(words, mapper);
 * // const flattened = mapped.flat();
 * ```
 */
export async function asyncFlatMap<T, R>(
  array: T[] | AsyncIterable<T>,
  mapper: (item: T, index: number) => Promise<R>
) {
  const result = await asyncMap(array, mapper);
  return result.flat();
}
