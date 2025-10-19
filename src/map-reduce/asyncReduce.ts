/**
 * Asynchronously reduces an array to a single value using an async reducer function.
 * The reduction is performed sequentially, processing one item at a time.
 *
 * @param {Item[]} items - The array to reduce.
 * @param {function} reducer - Async function that combines the accumulator with each item.
 * @param {Result} initialResult - The initial value for the accumulator.
 * @returns {Promise<Result>} A promise that resolves to the final accumulated result.
 *
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4];
 * const sum = await asyncReduce(
 *   numbers,
 *   async (total, num) => {
 *     await sleep(100); // Simulate async operation
 *     return total + num;
 *   },
 *   0
 * );
 * // returns 10
 *
 * const words = ['hello', 'world'];
 * const combined = await asyncReduce(
 *   words,
 *   async (result, word) => result + ' ' + word,
 *   ''
 * );
 * // returns ' hello world'
 * ```
 */
export async function asyncReduce<Item, Result>(
  items: Item[],
  reducer: (result: Result, item: Item) => Promise<Result>,
  initialResult: Result
): Promise<Result> {
  let result = initialResult;
  for (const item of items) {
    result = await reducer(result, item);
  }
  return result;
}
