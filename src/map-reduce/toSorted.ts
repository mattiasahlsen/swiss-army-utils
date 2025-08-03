/**
 * Sorts an array by a key extracted from each item, returning a new sorted array.
 * The original array is not modified.
 *
 * @param array - The array to sort.
 * @param getKey - Function to extract the sort key from each item.
 * @param order - Sort order, either 'asc' for ascending or 'desc' for descending. Defaults to 'asc'.
 * @returns A new array with the same items sorted by the specified key and order.
 *
 * @example
 * ```ts
 * const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * 
 * // Sort by name ascending
 * toSorted(users, user => user.name); 
 * // returns [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }]
 * 
 * // Sort by age descending
 * toSorted(users, user => user.age, 'desc');
 * // returns [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
 * ```
 */
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
