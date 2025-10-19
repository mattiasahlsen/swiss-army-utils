/**
 * Creates an array of consecutive integers from 0 to length-1.
 *
 * @param {number} length - The number of elements in the range. Must be non-negative.
 * @returns {number[]} An array of integers from 0 to length-1.
 * @throws {Error} If length is negative.
 *
 * @example
 * ```ts
 * createRange(5); // returns [0, 1, 2, 3, 4]
 * createRange(0); // returns []
 * createRange(-1); // throws Error
 * ```
 */
export function createRange(length: number): number[] {
  if (length < 0) {
    throw new Error('Length must be a positive number');
  }

  if (!Number.isInteger(length)) {
    throw new Error('Length must be an integer');
  }

  return Array.from({ length }, (_, i) => i);
}
