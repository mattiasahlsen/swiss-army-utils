import { mapObjectFields } from '../object/mapObjectFields.js';

/**
 * Groups the elements of an array based on a key derived from each element.
 * @param array - The array to be grouped.
 * @param getKey - A function that derives the key from each element.
 * @param initialValue - An initial value for the grouped result.
 * @returns An object where each key maps to an array of elements that share that key.
 * @example
 * const data = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'vegetable', name: 'carrot' },
 *   { category: 'fruit', name: 'banana' },
 * ];
 * const grouped = groupBy(data, item => item.category, {});
 * // Result:
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' },
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' },
 * //   ],
 * // };
 */
export function groupBy<T, Key extends string>(
  array: T[],
  getKey: (item: T) => Key,
  initialValue: Record<Key, T[]>
): Record<Key, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    mapObjectFields(initialValue, ([key, arr]) => [key, [...arr]])
  );
}
