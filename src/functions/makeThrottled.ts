import { sleep } from './sleep.js';

/**
 * Creates a throttled version of a function that enforces a minimum delay between calls.
 * Multiple calls made within the delay period will share the same result.
 *
 * @param options - Configuration object.
 * @param options.minDelay - Minimum delay in milliseconds between function executions.
 * @param fn - The function to throttle.
 * @returns A throttled function that returns a promise. If called multiple times before
 * the delay has passed, all calls receive the same promise and result.
 *
 * @example
 * ```ts
 * const fetchData = async () => {
 *   return await fetch('/api/data').then(res => res.json());
 * };
 * 
 * const throttledFetch = makeThrottled({ minDelay: 1000 }, fetchData);
 * 
 * const result1 = throttledFetch();
 * const result2 = throttledFetch();
 * 
 * console.log(await result1 === await result2); // true - same result
 * 
 * await sleep(1100);
 * const result3 = throttledFetch();
 * console.log(await result1 === await result3); // false - new call after delay
 * ```
 */
export const makeThrottled = <Returned>(
  { minDelay }: { minDelay: number },
  fn: () => Returned
): Returned extends Promise<any> ? () => Returned : () => Promise<Returned> => {
  let nextCall: Promise<Returned> | null = null;
  let sleeping: Promise<void> | null = null;

  const callFunc = async () => {
    if (sleeping) {
      await sleeping;
    }

    sleeping = sleep(minDelay);
    return await fn();
  };

  return (() => {
    if (nextCall) {
      return nextCall;
    }

    nextCall = callFunc().finally(() => {
      nextCall = null;
    });
    return nextCall;
  }) as any;
};
