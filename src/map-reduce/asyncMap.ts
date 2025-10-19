/**
 * Asynchronously maps over an array or async iterable, applying an async mapper function to each item.
 * The mapping is performed sequentially (not in parallel) to maintain order and avoid overwhelming resources.
 *
 * @param iterator - The array or async iterable to map over.
 * @param mapper - Async function that transforms each item. Receives the item and its index.
 * @returns A promise that resolves to an array of mapped results.
 *
 * @example
 * ```ts
 * // With array
 * const numbers = [1, 2, 3];
 * const doubled = await asyncMap(numbers, async (n, index) => {
 *   await sleep(100); // Simulate async operation
 *   return n * 2;
 * });
 * // returns [2, 4, 6]
 *
 * // With async iterable
 * async function* generateNumbers() {
 *   yield 1; yield 2; yield 3;
 * }
 * const result = await asyncMap(generateNumbers(), async (n) => n * 2);
 * // returns [2, 4, 6]
 * ```
 */
export async function asyncMap<T, R>(
  iterator: readonly T[] | AsyncIterable<T>,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const result: R[] = [];

  if (Array.isArray(iterator)) {
    for (const [index, item] of iterator.entries()) {
      result.push(await mapper(item, index));
    }
  } else {
    let index = 0;
    for await (const item of iterator) {
      result.push(await mapper(item, index++));
    }
  }

  return result;
}
