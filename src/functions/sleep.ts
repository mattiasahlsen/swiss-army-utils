/**
 * Asynchronously pauses execution for a specified duration.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified delay.
 *
 * @example
 * ```ts
 * await sleep(1000);
 * console.log('Executed after 1 second');
 * 
 * await Promise.all([sleep(100), sleep(100)]);
 * console.log('Both sleep calls ran concurrently');
 * ```
 */
export const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};
