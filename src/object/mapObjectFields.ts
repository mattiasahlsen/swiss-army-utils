/**
 * Transforms an object by mapping over its key-value pairs.
 * The mapping function receives each key-value pair as a tuple and returns a new tuple.
 *
 * @param {Record<string, TMapped>} obj - The object to transform.
 * @param {function} mapFn - Function that maps each [key, value] tuple to a new [key, value] tuple.
 * @returns {Record<string, TResult>} A new object with transformed entries.
 *
 * @example
 * ```ts
 * const prices = { apple: 1, banana: 2, orange: 3 };
 * const doubled = mapObjectFields(prices, ([key, value]) => [key, value * 2]);
 * // returns { apple: 2, banana: 4, orange: 6 }
 *
 * const prefixed = mapObjectFields(prices, ([key, value]) => [`fruit_${key}`, value]);
 * // returns { fruit_apple: 1, fruit_banana: 2, fruit_orange: 3 }
 * ```
 */
export function mapObjectFields<TMapped, TResult>(
  obj: Record<string, TMapped>,
  mapFn: (keyValueTuple: [string, TMapped]) => [string, TResult]
): Record<string, TResult> {
  return Object.fromEntries(Object.entries(obj).map(mapFn));
}
