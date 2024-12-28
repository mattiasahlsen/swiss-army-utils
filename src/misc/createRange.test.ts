import { createRange } from './createRange.js';

describe('createRange', () => {
  test('should create a range of numbers', () => {
    expect(createRange(5)).toEqual([0, 1, 2, 3, 4]);
  });

  test('should create an empty array if length is 0', () => {
    expect(createRange(0)).toEqual([]);
  });

  test('throws if length is negative', () => {
    expect(() => createRange(-1)).toThrow();
  });
});
