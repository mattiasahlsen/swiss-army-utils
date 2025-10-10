import { indexOrThrow } from "./indexOrThrow.js";

/**
 * Returns the first item in the array, throwing an error if the array is empty.
 *
 * @param items - The array to get the first item from.
 * @returns The first item in the array.
 * @throws {Error} If the array is empty.
 *
 * @example
 * ```ts
 * const items = ['a', 'b', 'c'];
 * 
 * firstOrThrow(items); // returns 'a'
 * firstOrThrow([]); // throws Error: No item found at index 0
 * ```
 */
export const firstOrThrow = <T>(items: T[]): T => indexOrThrow(items, 0);
