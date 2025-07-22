import { filterObjectFields } from './filterObjectFields.js';

describe('filterObjectFields', () => {
  it('should filter object fields based on the provided filter function', () => {
    const input = { a: 1, b: 2, c: 3 };
    const filterFn = (value: number) => value > 1;

    const result = filterObjectFields(input, filterFn);

    expect(result).toEqual({ b: 2, c: 3 });
  });

  it('should return an empty object if no fields match the filter function', () => {
    const input = { a: 1, b: 2, c: 3 };
    const filterFn = (value: number) => value > 5;

    const result = filterObjectFields(input, filterFn);

    expect(result).toEqual({});
  });

  it('should include fields where the filter function returns true', () => {
    const input = { a: 1, b: 2, c: 3 };
    const filterFn = (value: number, key: string) => key === 'a' || value === 3;

    const result = filterObjectFields(input, filterFn);

    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should handle an empty object as input', () => {
    const input = {};
    const filterFn = () => true;

    const result = filterObjectFields(input, filterFn);

    expect(result).toEqual({});
  });

  it('should not modify the original object', () => {
    const input = { a: 1, b: 2, c: 3 };
    const filterFn = (value: number) => value > 1;

    const result = filterObjectFields(input, filterFn);

    expect(input).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).not.toBe(input);
  });

  test('should handle object with different types of values', () => {
    const input = { a: 1, b: 'string', c: true, d: null };

    const result = filterObjectFields(
      input,
      (value) => typeof value === 'number'
    );

    expect(result).toEqual({ a: 1 });
  });
});
