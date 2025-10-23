import { type IsEqual } from 'type-fest';

/**
 * Performs a deep equality comparison between two values.
 * Handles arrays, objects, dates, regular expressions, and primitive values.
 * Type-safe: only returns boolean when types match, otherwise returns void.
 *
 * @param {T} a - The first value to compare.
 * @param {U} b - The second value to compare.
 * @returns {boolean | void} True if values are deeply equal, false otherwise. Returns void if types don't match.
 *
 * @example
 * ```ts
 * isDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // returns true
 * isDeepEqual([1, 2, 3], [1, 2, 3]); // returns true
 * isDeepEqual(new Date('2024-01-01'), new Date('2024-01-01')); // returns true
 * isDeepEqual({ a: 1 }, { a: 2 }); // returns false
 * ```
 */
export function isDeepEqual<T, U>(
  a: T,
  b: U
): IsEqual<T, U> extends true ? boolean : void {
  return _isDeepEqual(a, b) as any;
}

function _isDeepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!_isDeepEqual(a[i], b[i])) return false;
    }

    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return (
      a.getTime() === b.getTime() &&
      a.getTimezoneOffset() === b.getTimezoneOffset()
    );
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (a.constructor !== b.constructor) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!_isDeepEqual(a[key], b[key])) return false;
  }

  return true;
}
