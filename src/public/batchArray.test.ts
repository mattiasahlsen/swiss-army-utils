import { batchArray } from './batchArray.js';

describe('batchArray', () => {
  test('it batches an array correctly', () => {
    expect(batchArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10],
    ]);
  });

  test('it batches an empty array correctly', () => {
    expect(batchArray([], 3)).toEqual([]);
  });

  test('it batches an array with a batch size of 1 correctly', () => {
    expect(batchArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)).toEqual([
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10],
    ]);
  });

  test('it batches an array with a batch size equal to the array length correctly', () => {
    expect(batchArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ]);
  });
});
