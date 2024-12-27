import { batchArrayByWeights } from './batchArrayByWeights.js';

describe('batchArrayByWeights', () => {
  test('should batch items based on weight', () => {
    const items = [1, 2, 3, 4, 5];
    const getWeight = (item: number) => item;
    const batchSize = 5;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([[1, 2], [3], [4], [5]]);
  });

  test('should handle empty items array', () => {
    const items: number[] = [];
    const getWeight = (item: number) => item;
    const batchSize = 5;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([]);
  });

  test('should handle items with zero weight', () => {
    const items = [1, 2, 3, 4, 5];
    const getWeight = () => 0;
    const batchSize = 5;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([[1, 2, 3, 4, 5]]);
  });

  test('should handle cases when the weight is greater than the batch size', () => {
    const items = [1, 2, 3, 4, 5];
    const getWeight = (item: number) => item;
    const batchSize = 3;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([[1, 2], [3], [4], [5]]);
  });

  test('if there is a current batch after all items are iterated, push the batch', () => {
    const items = [1, 1, 1];
    const getWeight = (item: number) => item;
    const batchSize = 5;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([[1, 1, 1]]);
  });

  test('should put al items in their own batch if batchSize is 0', () => {
    const items = [1, 2, 3, 4, 5];
    const getWeight = (item: number) => item;
    const batchSize = 0;

    const result = batchArrayByWeights(items, batchSize, getWeight);

    expect(result).toEqual([[1], [2], [3], [4], [5]]);
  });
});
