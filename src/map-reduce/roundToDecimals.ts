/**
 *
 * @param {number} value - The value to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} The rounded value.
 *
 * @example
 * ```ts
 * roundToDecimals(3.14159, 2); // returns 3.14
 * roundToDecimals(3.14159, 0); // returns 3
 * roundToDecimals(3.14159, 3); // returns 3.142
 * roundToDecimals(3.14, 5); // returns 3.14
 * ```
 */
export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);

  return Math.round(value * factor) / factor;
}
