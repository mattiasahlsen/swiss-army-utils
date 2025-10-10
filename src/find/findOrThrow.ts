import { raise } from '../error/raise.js';

/**
 * Finds the first item in the array that matches the predicate, throwing an error if no match is found.
 *
 * @param arr - The array to search.
 * @param predicate - Function to test each item. Returns true for the item to be returned.
 * @returns The first item that satisfies the predicate.
 * @throws {Error} If no item matches the predicate.
 *
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4];
 * 
 * findOrThrow(numbers, n => n === 2); // returns 2
 * findOrThrow(numbers, n => n > 2); // returns 3
 * findOrThrow(numbers, n => n === 5); // throws Error: Item not found
 * ```
 */
export const findOrThrow = <T>(arr: T[], predicate: (item: T) => boolean) =>
  arr.find(predicate) ?? raise('Item not found');
