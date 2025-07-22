import { mapObjectFields } from './mapObjectFields.js';

describe('mapObjectFields', () => {
  it('should map object fields using the provided mapping function', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = mapObjectFields(input, ([key, value]) => [
      key.toUpperCase(),
      value * 2,
    ]);

    expect(result).toEqual({ A: 2, B: 4, C: 6 });
  });

  it('should handle an empty object', () => {
    const input = {};
    const result = mapObjectFields(input, ([key, value]) => [key, value]);

    expect(result).toEqual({});
  });

  it('should handle objects with non-string keys (converted to strings)', () => {
    const input = { 1: 'one', 2: 'two' };
    const result = mapObjectFields(input, ([key, value]) => [
      `key_${key}`,
      value.toUpperCase(),
    ]);

    expect(result).toEqual({ key_1: 'ONE', key_2: 'TWO' });
  });

  it('should not mutate the original object', () => {
    const input = { a: 1, b: 2 };
    const result = mapObjectFields(input, ([key, value]) => [key, value * 2]);

    expect(result).toEqual({ a: 2, b: 4 });
    expect(input).toEqual({ a: 1, b: 2 });
  });

  it('should handle complex mapping functions', () => {
    const input = { a: 1, b: 2 };
    const result = mapObjectFields(input, ([key, value]) => [
      `prefix_${key}`,
      { value },
    ]);

    expect(result).toEqual({ prefix_a: { value: 1 }, prefix_b: { value: 2 } });
  });
});
