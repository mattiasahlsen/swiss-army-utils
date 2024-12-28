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
