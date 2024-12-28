import { asyncReduce } from './asyncReduce.js';

describe('asyncReduce', () => {
  test('should call the reducer syncronously', async () => {
    const items = [1, 2, 3, 4, 5];
    const reducer = async (result: number, item: number) => {
      expect(result).toBe(item);
      return result + 1;
    };
    const initialResult = 1;

    const result = await asyncReduce(items, reducer, initialResult);

    expect(result).toBe(6);
  });

  test('should handle empty items array', async () => {
    const items: number[] = [];
    const reducer = async (result: number, item: number) => {
      return result + item;
    };
    const initialResult = 0;

    const result = await asyncReduce(items, reducer, initialResult);

    expect(result).toBe(0);
  });

  test('should handle initialResult as a non-zero value', async () => {
    const items = [1, 2, 3, 4, 5];
    const reducer = async (result: number, item: number) => {
      return result * item;
    };
    const initialResult = 1;

    const result = await asyncReduce(items, reducer, initialResult);

    expect(result).toBe(120);
  });

  test('should reject promise if reducer throws', async () => {
    const items = [1, 2, 3, 4, 5];
    const reducer = async (result: number, item: number) => {
      if (item === 3) {
        throw new Error('Something went wrong');
      }
      return result + item;
    };
    const initialResult = 0;

    const result = asyncReduce(items, reducer, initialResult);
    await expect(result).rejects.toThrow('Something went wrong');
  });
});
