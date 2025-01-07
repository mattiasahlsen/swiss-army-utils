import { isDeepEqual } from './isDeepEqual.js';

describe('isDeepEqual', () => {
  test.each([
    [true, true],
    [[], []],
    [{}, {}],
    [1, 1],
    ['a', 'a'],
    [null, null],
    [undefined, undefined],
    [NaN, NaN],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [new Date(0), new Date(0)],
    [new RegExp('a'), new RegExp('a')],
    [{ a: 1 }, { a: 1 }],
    [{ a: { b: 1 } }, { a: { b: 1 } }],
  ])('should return true for equal objects %s', (a, b) => {
    expect(isDeepEqual(a, b)).toBe(true);
  });

  test.each([
    [true, false],
    [[], [1]],
    [{}, { a: 1 }],
    [1, 2],
    ['a', 'b'],
    [null, undefined],
    [NaN, 0],
    [Infinity, -Infinity],
    [new Date(0), new Date(1)],
    [new RegExp('a'), new RegExp('b')],
    [{ a: 1 }, { a: 2 }],
    [{ a: { b: 1 } }, { a: { b: 2 } }],
  ])('should return false for non-equal objects %s', (a, b) => {
    expect(isDeepEqual(a, b)).toBe(false);
  });

  describe('typing', () => {
    test('causes type error when passing objects with different keys', () => {
      const result: void = isDeepEqual(
        { a: 'value', b: 'value' },
        { b: 'value' }
      );

      // @ts-expect-error - Can not test void for truthiness
      if (result) {
        // do nothing
      }

      expect(result).toBe(false);
    });

    test('does not cause type error when correct ignoredKeys are passed', () => {
      const result: boolean = isDeepEqual({ a: 'value' }, { a: 'value' });
      expect(result).toBe(true);
    });
  });
});
