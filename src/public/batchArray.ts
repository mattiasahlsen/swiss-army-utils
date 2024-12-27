import { batchArrayByWeights } from "./batchArrayByWeights.js";

export const batchArray = <T>(array: T[], batchSize: number) =>
  batchArrayByWeights(array, batchSize, () => 1);
