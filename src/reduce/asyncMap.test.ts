import { asyncMap } from './asyncMap.js';

describe('asyncMap', () => {
  test('runs the mapper in sequence', async () => {
    const mapper = jest.fn(async (item) => item + 1);

    const result = await asyncMap([1, 2, 3], mapper);

    expect(result).toEqual([2, 3, 4]);
    expect(mapper).toHaveBeenCalledTimes(3);
    expect(mapper).toHaveBeenNthCalledWith(1, 1, 0);
    expect(mapper).toHaveBeenNthCalledWith(2, 2, 1);
    expect(mapper).toHaveBeenNthCalledWith(3, 3, 2);
  });

  test('works with async iterators', async () => {
    const mapper = jest.fn(async (item) => item + 1);

    const iterator = jest.fn(async function* () {
      yield 1;
      yield 2;
      yield 3;
    });

    const result = await asyncMap(iterator(), mapper);

    expect(iterator).toHaveBeenCalledTimes(1);

    expect(result).toEqual([2, 3, 4]);
    expect(mapper).toHaveBeenCalledTimes(3);
    expect(mapper).toHaveBeenNthCalledWith(1, 1, 0);
    expect(mapper).toHaveBeenNthCalledWith(2, 2, 1);
    expect(mapper).toHaveBeenNthCalledWith(3, 3, 2);
  });

  test('throw if the mapper throws', async () => {
    const mapper = jest.fn(async (item) => {
      if (item === 2) {
        throw new Error('test');
      }

      return item + 1;
    });

    await expect(asyncMap([1, 2, 3], mapper)).rejects.toThrow('test');

    expect(mapper).toHaveBeenCalledTimes(2);
    expect(mapper).toHaveBeenNthCalledWith(1, 1, 0);
    expect(mapper).toHaveBeenNthCalledWith(2, 2, 1);
  });
});
