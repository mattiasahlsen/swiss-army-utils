/**
 * Safely converts a string to a number with validation.
 * Throws an error if the string cannot be converted to a valid finite number.
 *
 * @param {string} value - The string to convert to a number.
 * @returns {number} The parsed number.
 * @throws {Error} When the string is empty, not a number, or represents an infinite value.
 *
 * @example
 * ```ts
 * stringToNumber('123'); // returns 123
 * stringToNumber('3.14'); // returns 3.14
 * stringToNumber('-42'); // returns -42
 * stringToNumber('abc'); // throws Error: Invalid number: abc
 * stringToNumber(''); // throws Error: Invalid number: 
 * stringToNumber('Infinity'); // throws Error: Invalid number: Infinity
 * ```
 */
export function stringToNumber(value: string): number {
  if (value.trim() === '') {
    throw new Error(`Invalid number: ${value}`);
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue) || !isFinite(parsedValue)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return parsedValue;
}
