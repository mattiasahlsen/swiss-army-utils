/**
 * Asynchronously splits an async iterable into batches based on weighted sizes.
 * Items are grouped into batches where the total weight doesn't exceed the specified batch size.
 * This is an async generator that yields batches as they are formed.
 *
 * @param {AsyncIterable<T>} items - The async iterable to split into batches.
 * @param {number} batchSize - The maximum total weight allowed per batch.
 * @param {function} getWeight - Function to calculate the weight of each item.
 * @yields {T[]} Arrays representing batches with total weight ≤ batchSize.
 *
 * @example
 * ```ts
 * async function* generateItems() {
 *   yield 'a'; yield 'bb'; yield 'ccc'; yield 'dddd';
 * }
 *
 * for await (const batch of batchAsyncIterableByWeights(generateItems(), 5, item => item.length)) {
 *   console.log(batch);
 * }
 * // Outputs: ['a', 'bb'], ['ccc'], ['dddd']
 * ```
 */
export async function* batchAsyncIterableByWeights<T>(
  items: AsyncIterable<T>,
  batchSize: number,
  getWeight: (item: T) => number
): AsyncIterable<T[]> {
  let currentBatch: T[] = [];
  let weightInCurrentBatch = 0;

  for await (const item of items) {
    const itemWeight = getWeight(item);

    if (
      weightInCurrentBatch + itemWeight > batchSize &&
      currentBatch.length > 0
    ) {
      yield currentBatch;
      currentBatch = [];
      weightInCurrentBatch = 0;
    }

    currentBatch.push(item);
    weightInCurrentBatch += itemWeight;
  }

  if (currentBatch.length > 0) {
    yield currentBatch;
  }
}
