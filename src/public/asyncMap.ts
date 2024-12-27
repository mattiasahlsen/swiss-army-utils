export const asyncMap = async <T, R>(
  iterator: readonly T[] | AsyncIterable<T>,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> => {
  const result: R[] = [];

  if (Array.isArray(iterator)) {
    for (const [index, item] of iterator.entries()) {
      result.push(await mapper(item, index));
    }
  } else {
    let index = 0;
    for await (const item of iterator) {
      result.push(await mapper(item, index++));
    }
  }

  return result;
};
