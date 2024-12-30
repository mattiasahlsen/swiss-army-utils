export const batchAsyncIterableByWeights = async function* <T>(
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
};
