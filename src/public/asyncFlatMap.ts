import { asyncMap } from './asyncMap.js';

export const asyncFlatMap = async <T, R>(
  array: T[] | AsyncIterable<T>,
  mapper: (item: T, index: number) => Promise<R>
) => {
  const result = await asyncMap(array, mapper);
  return result.flat();
};
