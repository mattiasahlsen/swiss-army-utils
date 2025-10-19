import { sleep } from '../functions/sleep.js';
import {
  createSingleton,
  createSingletonAsync,
  createSingletonSync,
} from './createSingleton.js';

describe('createSingletonAsync', () => {
  it('should return the same value if it is valid', async () => {
    const getValue = jest
      .fn()
      .mockImplementation(async () => ({ data: 'test' }));
    const isValid = jest.fn().mockReturnValue(true);

    const singleton = createSingletonAsync({
      getValue,
      isValid,
    });

    const result1 = await singleton();
    const result2 = await singleton();

    expect(getValue).toHaveBeenCalledTimes(1);
    expect(isValid).toHaveBeenCalledTimes(2);
    expect(result1).toBe(result2);
    expect(result1).toEqual({ data: 'test' });
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

    const singleton = createSingletonAsync<typeof mockValue1>({
      getValue,
      isValid,
    });

    const result1 = await singleton();
    const result2 = await singleton();

    expect(getValue).toHaveBeenCalledTimes(2);
    expect(isValid).toHaveBeenCalledTimes(3);
    expect(result1).toBe(mockValue1);
    expect(result2).toBe(mockValue2);
  });

  it('should handle concurrent calls and return the same value', async () => {
    const getValue = jest.fn().mockImplementation(async () => {
      await sleep(100); // Simulate async operation

      return { data: 'test' };
    });

    const isValid = jest.fn().mockReturnValue(true);

    const singleton = createSingletonAsync({
      getValue,
      isValid,
    });

    const [result1, result2] = await Promise.all([singleton(), singleton()]);

    expect(getValue).toHaveBeenCalledTimes(1);
    expect(isValid).toHaveBeenCalledTimes(2);
    expect(result1).toBe(result2);
    expect(result1).toEqual({ data: 'test' });
  });

  it('should only call getValue once if multiple concurrent calls happen when the value is invalid', async () => {
    let callIndex = 0;
    const getValue = jest.fn().mockImplementation(async () => {
      await sleep(100);

      return ++callIndex;
    });

    const isValid = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const singleton = createSingleton({ getValue, isValid });
    const firstValue = await singleton();
    expect(isValid).toHaveBeenCalledTimes(1);
    expect(getValue).toHaveBeenCalledTimes(1);
    expect(firstValue).toBe(1);

    const [result2, result3, result4] = await Promise.all([
      singleton(),
      singleton(),
      singleton(),
    ]);
    expect(getValue).toHaveBeenCalledTimes(2); // Only one additional call
    expect(isValid).toHaveBeenCalledTimes(5); // Two more validations
    expect(result2).toBe(2);
    expect(result3).toBe(2);
    expect(result4).toBe(2);
  });

  it('should throw an error if the freshly fetched value is invalid', async () => {
    const getValue = jest
      .fn()
      .mockImplementation(async () => ({ data: 'invalid' }));
    const isValid = jest.fn().mockReturnValue(false);

    const singleton = createSingletonAsync({
      getValue,
      isValid,
    });
    await expect(singleton()).rejects.toThrow('Fresh value is invalid');
  });

  it('should throw an error if the freshly refetched value is invalid', async () => {
    const getValue = jest
      .fn()
      .mockImplementationOnce(async () => ({ data: 'valid' }))
      .mockImplementation(async () => ({ data: 'invalid' }));
    const isValid = jest.fn().mockReturnValueOnce(true).mockReturnValue(false);

    const singleton = createSingletonAsync({
      getValue,
      isValid,
    });

    const firstValue = await singleton();
    expect(firstValue).toEqual({ data: 'valid' });

    const promise1 = singleton();
    const promise2 = singleton();

    await expect(promise1).rejects.toThrow('Fresh value is invalid');
    await expect(promise2).rejects.toThrow('Fresh value is invalid');
    expect(getValue).toHaveBeenCalledTimes(2);
    expect(isValid).toHaveBeenCalledTimes(4);
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

describe('createSingleton', () => {
  describe('with sync getValue', () => {
    it('should work as createSingletonSync when given sync getValue', () => {
      const getValue = jest.fn(() => ({ data: 'test' }));
      const isValid = jest.fn().mockReturnValue(true);

      const singleton = createSingleton({
        getValue,
        isValid,
      });

      const result1 = singleton();
      const result2 = singleton();

      expect(getValue).toHaveBeenCalledTimes(1);
      expect(isValid).toHaveBeenCalledTimes(2);
      expect(result1).toBe(result2);
      expect(result1).toEqual({ data: 'test' });
    });
  });

  describe('with async getValue', () => {
    it('should work as createSingletonAsync when given async getValue', async () => {
      const mockValue = { data: 'test' };
      const getValue = jest.fn(async () => mockValue);
      const isValid = jest.fn().mockReturnValue(true);

      const singleton = createSingleton({
        getValue,
        isValid,
      });

      const result1 = await singleton();
      const result2 = await singleton();

      expect(getValue).toHaveBeenCalledTimes(1);
      expect(isValid).toHaveBeenCalledTimes(2);
      expect(result1).toBe(result2);
      expect(result1).toBe(mockValue);
    });

    it('concurrent calls should return the same value', async () => {
      const getValue = jest.fn(async () => {
        await sleep(100);

        return { data: 'test' };
      });
      const isValid = jest.fn().mockReturnValue(true);

      const singleton = createSingleton({
        getValue,
        isValid,
      });

      const [result1, result2] = await Promise.all([singleton(), singleton()]);

      expect(getValue).toHaveBeenCalledTimes(1);
      expect(isValid).toHaveBeenCalledTimes(2);
      expect(result1).toBe(result2);
      expect(result1).toEqual({ data: 'test' });
    });

    it('should only call getValue once if multiple concurrent calls happen when the value is invalid', async () => {
      let callIndex = 0;
      const getValue = jest.fn().mockImplementation(async () => {
        await sleep(100);

        return ++callIndex;
      });
      const isValid = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      const singleton = createSingleton({ getValue, isValid });
      const firstValue = await singleton();
      expect(isValid).toHaveBeenCalledTimes(1);
      expect(getValue).toHaveBeenCalledTimes(1);
      expect(firstValue).toBe(1);

      const [result2, result3, result4] = await Promise.all([
        singleton(),
        singleton(),
        singleton(),
      ]);
      expect(getValue).toHaveBeenCalledTimes(2); // Only one additional call
      expect(isValid).toHaveBeenCalledTimes(5); // Two more validations
      expect(result2).toBe(2);
      expect(result3).toBe(2);
      expect(result4).toBe(2);
    });

    it('should throw an error if the freshly fetched value is invalid', async () => {
      const getValue = jest
        .fn()
        .mockImplementation(async () => ({ data: 'invalid' }));
      const isValid = jest.fn().mockReturnValue(false);

      const singleton = createSingleton({
        getValue,
        isValid,
      });
      await expect(singleton()).rejects.toThrow('Fresh value is invalid');
    });

    it('should throw an error if the freshly refetched value is invalid', async () => {
      const getValue = jest
        .fn()
        .mockImplementationOnce(async () => ({ data: 'valid' }))
        .mockImplementation(async () => ({ data: 'invalid' }));
      const isValid = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValue(false);

      const singleton = createSingleton({
        getValue,
        isValid,
      });
      const firstValue = await singleton();
      expect(firstValue).toEqual({ data: 'valid' });

      const promise1 = singleton();
      const promise2 = singleton();
      await expect(promise1).rejects.toThrow('Fresh value is invalid');
      await expect(promise2).rejects.toThrow('Fresh value is invalid');
      expect(getValue).toHaveBeenCalledTimes(2);
      expect(isValid).toHaveBeenCalledTimes(4);
    });
  });
});
