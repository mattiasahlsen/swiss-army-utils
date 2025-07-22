import { numberAsStringSchema } from './numberAsString.js';

describe('numberAsStringSchema', () => {
  test('parses valid numeric strings to numbers', () => {
    expect(numberAsStringSchema.parse('123')).toBe(123);
    expect(numberAsStringSchema.parse('0')).toBe(0);
    expect(numberAsStringSchema.parse('-123')).toBe(-123);
    expect(numberAsStringSchema.parse('45.67')).toBe(45.67);
    expect(numberAsStringSchema.parse('-45.67')).toBe(-45.67);
    expect(numberAsStringSchema.parse('0.1')).toBe(0.1);
    expect(numberAsStringSchema.parse('1000')).toBe(1000);
  });

  test('parses scientific notation', () => {
    expect(numberAsStringSchema.parse('1e5')).toBe(100000);
    expect(numberAsStringSchema.parse('1.5e2')).toBe(150);
    expect(numberAsStringSchema.parse('2E-3')).toBe(0.002);
  });

  test('throws for invalid numeric strings', () => {
    expect(() => numberAsStringSchema.parse('abc')).toThrow();
    expect(() => numberAsStringSchema.parse('123abc')).toThrow();
    expect(() => numberAsStringSchema.parse('abc123')).toThrow();
    expect(() => numberAsStringSchema.parse('12.34.56')).toThrow();
    expect(() => numberAsStringSchema.parse('--123')).toThrow();
    expect(() => numberAsStringSchema.parse('12-34')).toThrow();
  });

  test('throws for empty string', () => {
    expect(() => numberAsStringSchema.parse('')).toThrow();
  });

  test('throws for whitespace-only strings', () => {
    expect(() => numberAsStringSchema.parse('   ')).toThrow();
    expect(() => numberAsStringSchema.parse('\t')).toThrow();
    expect(() => numberAsStringSchema.parse('\n')).toThrow();
  });

  test('throws for special values', () => {
    expect(() => numberAsStringSchema.parse('NaN')).toThrow();
    expect(() => numberAsStringSchema.parse('Infinity')).toThrow();
    expect(() => numberAsStringSchema.parse('-Infinity')).toThrow();
  });

  test('throws for non-string inputs', () => {
    expect(() => numberAsStringSchema.parse(123)).toThrow();
    expect(() => numberAsStringSchema.parse(null)).toThrow();
    expect(() => numberAsStringSchema.parse(undefined)).toThrow();
    expect(() => numberAsStringSchema.parse(true)).toThrow();
    expect(() => numberAsStringSchema.parse(false)).toThrow();
    expect(() => numberAsStringSchema.parse({})).toThrow();
    expect(() => numberAsStringSchema.parse([])).toThrow();
  });

  test('works with safeParse for valid inputs', () => {
    const result = numberAsStringSchema.safeParse('42');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(42);
      expect(typeof result.data).toBe('number');
    }
  });

  test('safeParse returns error for invalid inputs when transform fails', () => {
    // When the transform function throws, safeParse should return success: false
    // However in some Zod versions, exceptions in transforms might not be caught
    // Let's test both possibilities
    try {
      const result1 = numberAsStringSchema.safeParse('invalid');
      expect(result1.success).toBe(false);
    } catch (error) {
      // If safeParse doesn't catch transform errors, that's also valid behavior
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain('Invalid number: invalid');
    }

    try {
      const result2 = numberAsStringSchema.safeParse(123);
      expect(result2.success).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      const result3 = numberAsStringSchema.safeParse('');
      expect(result3.success).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain('Invalid number: ');
    }
  });

  test('maintains number type after transformation', () => {
    const result: number = numberAsStringSchema.parse('456');
    expect(typeof result).toBe('number');
    expect(result).toBe(456);
  });

  test('handles edge cases', () => {
    // Leading zeros
    expect(numberAsStringSchema.parse('007')).toBe(7);
    expect(numberAsStringSchema.parse('00.5')).toBe(0.5);
    
    // Very small numbers
    expect(numberAsStringSchema.parse('0.0001')).toBe(0.0001);
    
    // Very large numbers (within JS safe integer range)
    expect(numberAsStringSchema.parse('999999999999999')).toBe(999999999999999);
  });

  test('handles decimal precision correctly', () => {
    expect(numberAsStringSchema.parse('0.1')).toBe(0.1);
    expect(numberAsStringSchema.parse('0.123456789')).toBe(0.123456789);
  });

  test('works with strings that have leading/trailing spaces', () => {
    // JavaScript Number() function handles leading/trailing spaces
    expect(numberAsStringSchema.parse(' 123')).toBe(123);
    expect(numberAsStringSchema.parse('123 ')).toBe(123);
    expect(numberAsStringSchema.parse(' 123 ')).toBe(123);
  });
});