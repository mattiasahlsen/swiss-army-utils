/**
 * Type-level function that ensures the input array is treated as a tuple type.
 * This is useful for preserving exact array literal types.
 *
 * @param arr - The array to treat as a tuple.
 * @returns The same array, but with tuple type preservation.
 *
 * @example
 * ```ts
 * const tuple = asTuple([1, 2, 3]); // Type: [1, 2, 3]
 * const array = [1, 2, 3]; // Type: number[]
 * ```
 */
export function asTuple<const T extends unknown[]>(arr: T): T {
  return arr;
}
