import { sleep } from './sleep.js';

/**
 * Creates a throttled version of a function that enforces a minimum delay between executions.
 * Multiple calls made during the delay period will share the same promise and return the same result.
 * After the delay period, subsequent calls will trigger a new execution.
 *
 * @param {Object} options - Configuration object.
 * @param {number} options.minDelay - Minimum delay in milliseconds between function executions.
 * @param {function} fn - The function to throttle. Can be synchronous or asynchronous.
 * @returns {function} A throttled function that returns a promise. If multiple calls are made within the delay period,
 *          they will all receive the same promise and result.
 *
 * @example
 * ```ts
 * // Throttle an API call to at most once per second
 * const fetchData = () => fetch('/api/data').then(r => r.json());
 * const throttledFetch = makeThrottled({ minDelay: 1000 }, fetchData);
 *
 * // First call executes immediately
 * const result1 = await throttledFetch();
 *
 * // Calls within 1 second share the same promise
 * const promise2 = throttledFetch();
 * const promise3 = throttledFetch();
 * // promise2 === promise3
 *
 * // After 1 second delay, new call triggers another execution
 * await sleep(1100);
 * const result2 = await throttledFetch(); // New execution
 * ```
 */
export function makeThrottled<Returned>(
  { minDelay }: { minDelay: number },
  fn: () => Returned
): Returned extends Promise<any> ? () => Returned : () => Promise<Returned> {
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
}
