/**
 * Asynchronously pauses execution for a specified duration.
 * Returns a promise that resolves after the given number of milliseconds.
 *
 * @param ms - Duration in milliseconds to sleep.
 * @returns A promise that resolves after the specified delay.
 *
 * @example
 * ```ts
 * // Sleep for 1 second
 * await sleep(1000);
 *
 * // Use in a loop with delays
 * for (let i = 0; i < 5; i++) {
 *   console.log(i);
 *   await sleep(500);
 * }
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
