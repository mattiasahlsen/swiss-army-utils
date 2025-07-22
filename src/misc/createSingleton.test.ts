import { sleep } from '../functions/sleep.js';
import { createSingleton, createSingletonSync } from './createSingleton.js';

describe('createSingleton', () => {
  it('should return the same value if it is valid', async () => {
    const mockValue = { data: 'test' };
    const getValue = jest.fn().mockResolvedValue(mockValue);
    const isValid = jest.fn().mockReturnValue(true);

    const singleton = createSingleton<typeof mockValue>({ getValue, isValid });

    const result1 = await singleton();
    const result2 = await singleton();

    expect(getValue).toHaveBeenCalledTimes(1);
    expect(isValid).toHaveBeenCalledTimes(2);
    expect(result1).toBe(result2);
    expect(result1).toBe(mockValue);
  });

  it('should fetch a new value if the current value is invalid', async () => {
    const mockValue1 = { data: 'test1' };
    const mockValue2 = { data: 'test2' };
    const getValue = jest
      .fn()
      .mockResolvedValueOnce(mockValue1)
      .mockResolvedValueOnce(mockValue2);
    const isValid = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const singleton = createSingleton<typeof mockValue1>({ getValue, isValid });

    const result1 = await singleton();
    const result2 = await singleton();

    expect(getValue).toHaveBeenCalledTimes(2);
    expect(isValid).toHaveBeenCalledTimes(3);
    expect(result1).toBe(mockValue1);
    expect(result2).toBe(mockValue2);
  });

  it('should handle concurrent calls and return the same value', async () => {
    const mockValue = { data: 'test' };
    const getValue = jest.fn().mockImplementation(async () => {
      await sleep(100); // Simulate async operation

      return mockValue;
    });

    const isValid = jest.fn().mockReturnValue(true);

    const singleton = createSingleton<typeof mockValue>({ getValue, isValid });

    const [result1, result2] = await Promise.all([singleton(), singleton()]);

    expect(getValue).toHaveBeenCalledTimes(1);
    expect(isValid).toHaveBeenCalledTimes(2);
    expect(result1).toBe(result2);
    expect(result1).toBe(mockValue);
  });
});

describe('createSingletonSync', () => {
  it('should return the same value if it is valid', () => {
    const mockValue = { data: 'test' };
    const getValue = jest.fn().mockReturnValue(mockValue);
    const isValid = jest.fn().mockReturnValue(true);

    const singleton = createSingletonSync<typeof mockValue>({
      getValue,
      isValid,
    });

    const result1 = singleton();
    const result2 = singleton();

    expect(getValue).toHaveBeenCalledTimes(1);
    expect(isValid).toHaveBeenCalledTimes(2);
    expect(result1).toBe(result2);
    expect(result1).toBe(mockValue);
  });

  it('should fetch a new value if the current value is invalid', () => {
    const mockValue1 = { data: 'test1' };
    const mockValue2 = { data: 'test2' };
    const getValue = jest
      .fn()
      .mockReturnValueOnce(mockValue1)
      .mockReturnValueOnce(mockValue2);
    const isValid = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const singleton = createSingletonSync<typeof mockValue1>({
      getValue,
      isValid,
    });

    const result1 = singleton();
    const result2 = singleton();

    expect(getValue).toHaveBeenCalledTimes(2);
    expect(isValid).toHaveBeenCalledTimes(3);
    expect(result1).toBe(mockValue1);
    expect(result2).toBe(mockValue2);
  });
});
