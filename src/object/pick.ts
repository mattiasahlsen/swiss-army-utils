/**
 * Creates a new object by picking specified keys from an existing object.
 * Only includes properties that exist in the source object.
 *
 * @param {Object} obj - The source object to pick from.
 * @param {Array} keys - Array of keys to pick from the object.
 * @returns {Object} A new object containing only the specified keys.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
 * const userSummary = pick(user, ['id', 'name']);
 * // returns { id: 1, name: 'John' }
 * ```
 */
export function pick<
  T extends Record<string, unknown>,
  const Keys extends (keyof T)[],
>(obj: T, keys: Keys): Pick<T, Keys[number]> {
  const result = {} as Pick<T, Keys[number]>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}
