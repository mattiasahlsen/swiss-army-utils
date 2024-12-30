import { batchAsyncIterableByWeights } from './batchAsyncIterableByWeights.js';

async function* generateItems<T>(items: T[]): AsyncIterable<T> {
  for (const item of items) {
    yield item;
  }
}

describe('batchAsyncIterableByWeights', () => {
  test('batches items correctly based on weight', async () => {
    const items = [1, 2, 3, 4, 5];
    const batchSize = 5;
    const getWeight = (item: number) => item;

    const result = [];
    for await (const batch of batchAsyncIterableByWeights(
      generateItems(items),
      batchSize,
      getWeight
    )) {
      result.push(batch);
    }

    expect(result).toEqual([[1, 2], [3], [4], [5]]);
  });

  test('handles empty input', async () => {
    const items: number[] = [];
    const batchSize = 5;
    const getWeight = (item: number) => item;

    const result = [];
    for await (const batch of batchAsyncIterableByWeights(
      generateItems(items),
      batchSize,
      getWeight
    )) {
      result.push(batch);
    }

    expect(result).toEqual([]);
  });

  test('handles all items in one batch', async () => {
    const items = [1, 2, 1];
    const batchSize = 10;
    const getWeight = (item: number) => item;

    const result = [];
    for await (const batch of batchAsyncIterableByWeights(
      generateItems(items),
      batchSize,
      getWeight
    )) {
      result.push(batch);
    }

    expect(result).toEqual([[1, 2, 1]]);
  });

  test('handles items with zero weight', async () => {
    const items = [0, 0, 0];
    const batchSize = 1;
    const getWeight = (item: number) => item;

    const result = [];
    for await (const batch of batchAsyncIterableByWeights(
      generateItems(items),
      batchSize,
      getWeight
    )) {
      result.push(batch);
    }

    expect(result).toEqual([[0, 0, 0]]);
  });
});
