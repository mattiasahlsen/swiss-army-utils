/**
 * Creates a new object by excluding specified keys from an existing object.
 * Returns a copy of the object without the omitted properties.
 *
 * @param {Object} obj - The source object to omit from.
 * @param {...string} keys - Keys to omit from the object. Can be provided as separate arguments or arrays.
 * @returns {Object} A new object without the specified keys.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 * const publicUser = omit(user, 'password');
 * // returns { id: 1, name: 'John', email: 'john@example.com' }
 *
 * const minimal = omit(user, 'password', 'email');
 * // returns { id: 1, name: 'John' }
 * ```
 */
export function omit<T extends object, const K extends keyof T & string>(
  obj: T,
  ...keys: (K | K[])[]
): Omit<T, K> {
  const keySet = new Set<string>(keys.flat());
  const result: any = {};

  for (const key in obj) {
    if (!keySet.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
