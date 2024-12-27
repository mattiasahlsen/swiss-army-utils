import { firstOrThrow } from './firstOrThrow.js';

describe('firstOrThrow', () => {
  test('returns the item at the index', () => {
    expect(firstOrThrow(['a', 'b', 'c'])).toBe('a');
  });

  test('throws if the array is empty', () => {
    expect(() => firstOrThrow([])).toThrow(
      new Error(`No item found at index 0`)
    );
  });
});
