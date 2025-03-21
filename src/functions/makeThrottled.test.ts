import { makeThrottled } from './makeThrottled.js';

describe('makeThrottled', () => {
  test('should call the function immediately if not throttled', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const throttledFn = makeThrottled({ minDelay: 100 }, fn);

    const startTime = Date.now();
    const result = await throttledFn();
    expect(result).toBe('result');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(Date.now() - startTime).toBeLessThan(100);
  });

  test('should throttle subsequent calls', async () => {
    const fn = jest.fn().mockImplementation(() => ({ test: 'test' }));
    const throttledFn = makeThrottled({ minDelay: 105 }, fn);

    const startTime = Date.now();
    const result1 = await throttledFn();
    const timeAfterFirstCall = Date.now() - startTime;
    const result2 = await throttledFn();
    const timeAfterSecondCall = Date.now() - startTime;

    expect(result1).toEqual({ test: 'test' });
    expect(result2).not.toBe(result1);
    expect(fn).toHaveBeenCalledTimes(2);

    expect(timeAfterFirstCall).toBeLessThan(100);
    expect(timeAfterSecondCall).toBeGreaterThanOrEqual(100);
  });

  test('should return the same value for multiple throttled calls', async () => {
    const fn = jest.fn().mockImplementation(() => ({ test: 'test' }));
    const throttledFn = makeThrottled({ minDelay: 100 }, fn);

    const result1 = await throttledFn();
    const result2Promise = throttledFn();
    const result3Promise = throttledFn();

    expect(result1).toEqual({ test: 'test' });
    expect(await result2Promise).toEqual({ test: 'test' });
    expect(await result3Promise).toEqual({ test: 'test' });

    expect(result1).not.toBe(await result2Promise);
    expect(await result2Promise).toBe(await result3Promise);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should make a new call if delay has passed', async () => {
    const fn = jest.fn().mockImplementation(() => ({ test: 'test' }));
    const throttledFn = makeThrottled({ minDelay: 105 }, fn);

    const startTime = Date.now();
    const result1 = await throttledFn();
    const result2 = await throttledFn();
    const timeAfterSecondCall = Date.now() - startTime;
    const result3 = await throttledFn();
    const timeAfterThirdCall = Date.now() - startTime;

    expect(result1).not.toBe(result2);
    expect(result2).not.toBe(result3);

    expect(fn).toHaveBeenCalledTimes(3);

    expect(timeAfterSecondCall).toBeGreaterThanOrEqual(100);
    expect(timeAfterSecondCall).toBeLessThan(200);

    expect(timeAfterThirdCall).toBeGreaterThanOrEqual(200);
    expect(timeAfterThirdCall).toBeLessThan(300);
  });

  test('should throw if the function throws', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('test error'));
    const throttledFn = makeThrottled({ minDelay: 100 }, fn);

    await expect(throttledFn()).rejects.toThrow('test error');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should throw after the delay if the function throws', async () => {
    let calls = 0;
    const fn = jest.fn().mockImplementation(() => {
      if (calls === 1) {
        throw new Error('test error');
      }
      calls++;
      return 'result';
    });
    const throttledFn = makeThrottled({ minDelay: 105 }, fn);

    const startTime = Date.now();
    const result1 = await throttledFn();
    const result2Promise = throttledFn();
    const result3Promise = throttledFn();
    await expect(result2Promise).rejects.toThrow('test error');
    expect(result2Promise).toBe(result3Promise);
    expect(Date.now() - startTime).toBeGreaterThanOrEqual(100);
    expect(result1).toBe('result');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should return the same promise for throttled calls, otherwise not', async () => {
    const fn = jest.fn().mockReturnValue('result');
    const throttledFn = makeThrottled({ minDelay: 20 }, fn);

    const result1 = throttledFn();
    await result1;

    const result2 = throttledFn();
    const result3 = throttledFn();

    expect(result1).not.toBe(result2);
    expect(result2).toBe(result3);

    await result2;
    await result3;
    expect(result2).toBe(result3);
  });
});
