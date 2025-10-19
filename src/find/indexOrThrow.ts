/**
 * Returns the item at the specified index in the array, throwing an error if the index is out of bounds.
 *
 * @param items - The array to get the item from.
 * @param index - The index of the item to retrieve.
 * @returns The item at the specified index.
 * @throws {Error} If no item exists at the specified index.
 *
 * @example
 * ```ts
 * const items = ['a', 'b', 'c'];
 *
 * indexOrThrow(items, 1); // returns 'b'
 * indexOrThrow(items, 3); // throws Error: No item found at index 3
 * indexOrThrow(items, -1); // throws Error: No item found at index -1
 * ```
 */
export function indexOrThrow<T>(items: T[], index: number): T {
  const item = items[index];

  if (item === undefined) {
    throw new Error(`No item found at index ${index}`);
  }

  return item;
}
