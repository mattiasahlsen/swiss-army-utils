/**
 * Creates a new object containing only the entries that pass the filter function.
 * The filter function receives both the value and key for each entry.
 *
 * @param {Record<string, Value>} object - The object to filter.
 * @param {function} filter - Function that tests each value and key. Returns true to keep the entry.
 * @returns {Record<string, Value>} A new object with only the filtered entries.
 *
 * @example
 * ```ts
 * const scores = { alice: 85, bob: 92, charlie: 78, diana: 95 };
 * const highScores = filterObjectFields(scores, (score) => score >= 90);
 * // returns { bob: 92, diana: 95 }
 *
 * const startsWithD = filterObjectFields(scores, (_, key) => key.startsWith('d'));
 * // returns { diana: 95 }
 * ```
 */
export function filterObjectFields<Value>(
  object: Record<string, Value>,
  filter: (value: Value, key: string) => boolean
): Record<string, Value> {
  const filteredObject: Record<string, Value> = {};

  for (const key in object) {
    if (filter(object[key], key)) {
      filteredObject[key] = object[key];
    }
  }

  return filteredObject;
}
