import { asyncFlatMap } from './asyncFlatMap.js';

describe('asyncFlatMap', () => {
  test('runs the mapper in sequence', async () => {
    const mapper = jest.fn(async (item) => item + 1);

    const result = await asyncFlatMap([1, 2, 3], mapper);

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

    await expect(asyncFlatMap([1, 2, 3], mapper)).rejects.toThrow('test');

    expect(mapper).toHaveBeenCalledTimes(2);
    expect(mapper).toHaveBeenNthCalledWith(1, 1, 0);
    expect(mapper).toHaveBeenNthCalledWith(2, 2, 1);
  });
});
