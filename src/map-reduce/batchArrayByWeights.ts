/**
 * Splits an array into smaller arrays (batches) based on weighted sizes.
 * Items are grouped into batches where the total weight doesn't exceed the specified batch size.
 *
 * @param items - The array to split into batches.
 * @param batchSize - The maximum total weight allowed per batch.
 * @param getWeight - Function to calculate the weight of each item.
 * @returns An array of arrays, where each sub-array is a batch with total weight ≤ batchSize.
 *
 * @example
 * ```ts
 * const items = ['a', 'bb', 'ccc', 'dddd'];
 * batchArrayByWeights(items, 5, item => item.length);
 * // returns [['a', 'bb'], ['ccc'], ['dddd']]
 * // Batch 1: 'a' (1) + 'bb' (2) = 3 ≤ 5
 * // Batch 2: 'ccc' (3) = 3 ≤ 5 
 * // Batch 3: 'dddd' (4) = 4 ≤ 5
 * ```
 */
export const batchArrayByWeights = <T>(
  items: T[],
  batchSize: number,
  getWeight: (item: T) => number
) => {
  const batches: T[][] = [];
  let currentBatch: T[] = [];
  let weightInCurrentBatch = 0;

  for (const item of items) {
    const itemWeight = getWeight(item);

    if (
      weightInCurrentBatch + itemWeight > batchSize &&
      currentBatch.length > 0
    ) {
      batches.push(currentBatch);
      currentBatch = [];
      weightInCurrentBatch = 0;
    }

    currentBatch.push(item);
    weightInCurrentBatch += itemWeight;
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
};
