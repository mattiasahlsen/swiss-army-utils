import { sleep } from './sleep.js';

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
