import { booleanAsStringSchema } from './booleanAsString.js';

describe('booleanAsStringSchema', () => {
  test('parses "true" string to true boolean', () => {
    const result = booleanAsStringSchema.parse('true');
    expect(result).toBe(true);
    expect(typeof result).toBe('boolean');
  });

  test('parses "false" string to false boolean', () => {
    const result = booleanAsStringSchema.parse('false');
    expect(result).toBe(false);
    expect(typeof result).toBe('boolean');
  });

  test('throws for invalid string values', () => {
    expect(() => booleanAsStringSchema.parse('yes')).toThrow();
    expect(() => booleanAsStringSchema.parse('no')).toThrow();
    expect(() => booleanAsStringSchema.parse('1')).toThrow();
    expect(() => booleanAsStringSchema.parse('0')).toThrow();
    expect(() => booleanAsStringSchema.parse('TRUE')).toThrow();
    expect(() => booleanAsStringSchema.parse('FALSE')).toThrow();
    expect(() => booleanAsStringSchema.parse('')).toThrow();
    expect(() => booleanAsStringSchema.parse('true ')).toThrow(); // with space
    expect(() => booleanAsStringSchema.parse(' true')).toThrow(); // with space
  });

  test('throws for non-string values', () => {
    expect(() => booleanAsStringSchema.parse(true)).toThrow();
    expect(() => booleanAsStringSchema.parse(false)).toThrow();
    expect(() => booleanAsStringSchema.parse(1)).toThrow();
    expect(() => booleanAsStringSchema.parse(0)).toThrow();
    expect(() => booleanAsStringSchema.parse(null)).toThrow();
    expect(() => booleanAsStringSchema.parse(undefined)).toThrow();
    expect(() => booleanAsStringSchema.parse({})).toThrow();
    expect(() => booleanAsStringSchema.parse([])).toThrow();
  });

  test('works with safeParse for valid inputs', () => {
    const result1 = booleanAsStringSchema.safeParse('true');
    expect(result1.success).toBe(true);
    if (result1.success) {
      expect(result1.data).toBe(true);
    }

    const result2 = booleanAsStringSchema.safeParse('false');
    expect(result2.success).toBe(true);
    if (result2.success) {
      expect(result2.data).toBe(false);
    }
  });

  test('works with safeParse for invalid inputs', () => {
    const result1 = booleanAsStringSchema.safeParse('invalid');
    expect(result1.success).toBe(false);

    const result2 = booleanAsStringSchema.safeParse(123);
    expect(result2.success).toBe(false);
  });

  test('maintains type safety', () => {
    // These should compile without issues and maintain correct types
    const validResult: boolean = booleanAsStringSchema.parse('true');
    expect(typeof validResult).toBe('boolean');
  });
});
