import { asTuple } from './asTuple.js';

describe('asTuple', () => {
  test('preserves array elements and order', () => {
    const input = [1, 2, 3];
    const result = asTuple(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(input); // Should return the same reference
  });

  test('works with empty array', () => {
    const input: [] = [];
    const result = asTuple(input);
    expect(result).toEqual([]);
    expect(result).toBe(input);
  });

  test('works with mixed types', () => {
    const input = [1, 'string', true, null, undefined];
    const result = asTuple(input);
    expect(result).toEqual([1, 'string', true, null, undefined]);
    expect(result).toBe(input);
  });

  test('works with nested arrays', () => {
    const input = [[1, 2], [3, 4], [5]];
    const result = asTuple(input);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
    expect(result).toBe(input);
  });

  test('works with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const input = [obj1, obj2];
    const result = asTuple(input);
    expect(result).toEqual([obj1, obj2]);
    expect(result).toBe(input);
    expect(result[0]).toBe(obj1);
    expect(result[1]).toBe(obj2);
  });

  test('works with single element', () => {
    const input = ['single'];
    const result = asTuple(input);
    expect(result).toEqual(['single']);
    expect(result).toBe(input);
  });

  test('preserves TypeScript tuple types correctly', () => {
    // Test that asTuple preserves exact literal types as tuples
    asTuple([1, 2]) satisfies [1, 2];
    asTuple(['a', 'b', 'c']) satisfies ['a', 'b', 'c'];
    asTuple([true, false]) satisfies [true, false];
    asTuple([1, 'string', true]) satisfies [1, 'string', true];
    
    // Test with const assertion to ensure literal types
    const numberTuple = asTuple([1, 2, 3] as const);
    numberTuple satisfies readonly [1, 2, 3];
    
    const mixedTuple = asTuple(['hello', 42, true] as const);
    mixedTuple satisfies readonly ['hello', 42, true];
    
    // Test empty tuple
    asTuple([]) satisfies [];
    
    // Test single element tuple
    asTuple([42]) satisfies [42];
    
    // Test with objects preserving exact types
    const obj = { x: 1, y: 2 } as const;
    asTuple([obj]) satisfies [typeof obj];
    
    // Test nested arrays as tuples
    asTuple([[1, 2], [3, 4]]) satisfies [[1, 2], [3, 4]];
  });
});