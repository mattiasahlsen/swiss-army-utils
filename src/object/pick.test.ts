import { pick } from './pick.js';

describe('pick', () => {
  it('should pick specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'c']);

    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should return an empty object if keys argument is an empty array', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, []);

    expect(result).toEqual({});
  });
});
