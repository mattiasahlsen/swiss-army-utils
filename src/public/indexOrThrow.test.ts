import { indexOrThrow } from './indexOrThrow.js';

describe('indexOrThrow', () => {
  test('returns the item at the index', () => {
    expect(indexOrThrow(['a', 'b', 'c'], 1)).toBe('b');
  });

  test('throws if the index is out of bounds', () => {
    expect(() => indexOrThrow(['a', 'b', 'c'], 3)).toThrow(
      new Error(`No item found at index 3`)
    );
  });

  test('throws if the index is negative', () => {
    expect(() => indexOrThrow(['a', 'b', 'c'], -1)).toThrow(
      new Error(`No item found at index -1`)
    );
  });
});
