import { omit } from './omit.js';

describe('omit', () => {
  test('returns a new object with specified keys omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, 'a', 'c');
    expect(result).toEqual({ b: 2 });

    const result2 = omit(obj, ['a', 'c']);
    expect(result2).toEqual({ b: 2 });
  });

  test('does not modify the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    omit(obj, 'a', 'c');
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('returns the same object if no keys are specified', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj);
    expect(result).toEqual(obj);
  });
});
