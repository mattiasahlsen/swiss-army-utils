export function toSorted<T>(
  array: T[],
  getKey: ((item: T) => string) | ((item: T) => number),
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return array.toSorted((a, b) => {
    const keyA = getKey(a);
    const keyB = getKey(b);

    if (keyA < keyB) {
      return order === 'asc' ? -1 : 1;
    }

    if (keyA > keyB) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}
