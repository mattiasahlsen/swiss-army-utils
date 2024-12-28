import { findOrThrow } from './findOrThrow.js';

describe('findOrThrow', () => {
  test('should return the first item that matches the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (item: number) => item === 2;

    expect(findOrThrow(arr, predicate)).toEqual(2);
  });

  test('should throw an error if no item matches the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (item: number) => item === 4;

    expect(() => findOrThrow(arr, predicate)).toThrow('Item not found');
  });
});
