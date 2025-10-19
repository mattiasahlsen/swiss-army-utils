/**
 * Filters an array to keep only unique items based on a key extraction function.
 * When duplicate keys are found, the last occurrence is kept.
 *
 * @param {T[]} items - The array of items to filter.
 * @param {function} getKey - Function that extracts a unique key from each item.
 * @returns {Array<T>} An array containing only unique items based on the extracted keys.
 *
 * @example
 * ```ts
 * const items = [
 *   { id: '1', name: 'a' },
 *   { id: '2', name: 'b' },
 *   { id: '1', name: 'c' }
 * ];
 * filterUnique(items, (item) => item.id);
 * // returns [{ id: '1', name: 'c' }, { id: '2', name: 'b' }]
 * ```
 */
export function filterUnique<T>(
  items: T[],
  getKey: (item: T) => string | number | bigint
): T[] {
  const map = new Map();
  items.forEach((item) => map.set(getKey(item), item));
  return Array.from(map.values());
}
