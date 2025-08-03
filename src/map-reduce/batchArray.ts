import { batchArrayByWeights } from './batchArrayByWeights.js';

/**
 * Splits an array into smaller arrays (batches) of a specified size.
 * Each batch will contain at most `batchSize` items.
 *
 * @param array - The array to split into batches.
 * @param batchSize - The maximum number of items per batch.
 * @returns An array of arrays, where each sub-array is a batch.
 *
 * @example
 * ```ts
 * batchArray([1, 2, 3, 4, 5], 2);
 * // returns [[1, 2], [3, 4], [5]]
 * 
 * batchArray(['a', 'b', 'c'], 3);
 * // returns [['a', 'b', 'c']]
 * ```
 */
export const batchArray = <T>(array: T[], batchSize: number) =>
  batchArrayByWeights(array, batchSize, () => 1);
