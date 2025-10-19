import { nonEmptyStringSchema } from './nonEmptyString.js';

describe('nonEmptyStringSchema', () => {
  test('accepts valid non-empty strings', () => {
    expect(nonEmptyStringSchema.parse('hello')).toBe('hello');
    expect(nonEmptyStringSchema.parse('a')).toBe('a');
    expect(nonEmptyStringSchema.parse(' ')).toBe(' '); // single space is non-empty
    expect(nonEmptyStringSchema.parse('  ')).toBe('  '); // multiple spaces
    expect(nonEmptyStringSchema.parse('hello world')).toBe('hello world');
    expect(nonEmptyStringSchema.parse('123')).toBe('123');
    expect(nonEmptyStringSchema.parse('special!@#$%chars')).toBe(
      'special!@#$%chars'
    );
    expect(nonEmptyStringSchema.parse('\n')).toBe('\n'); // newline is non-empty
    expect(nonEmptyStringSchema.parse('\t')).toBe('\t'); // tab is non-empty
  });

  test('rejects empty string', () => {
    expect(() => nonEmptyStringSchema.parse('')).toThrow(
      'This field cannot be empty'
    );
  });

  test('rejects non-string values', () => {
    expect(() => nonEmptyStringSchema.parse(null)).toThrow();
    expect(() => nonEmptyStringSchema.parse(undefined)).toThrow();
    expect(() => nonEmptyStringSchema.parse(123)).toThrow();
    expect(() => nonEmptyStringSchema.parse(true)).toThrow();
    expect(() => nonEmptyStringSchema.parse(false)).toThrow();
    expect(() => nonEmptyStringSchema.parse({})).toThrow();
    expect(() => nonEmptyStringSchema.parse([])).toThrow();
    expect(() => nonEmptyStringSchema.parse(['hello'])).toThrow();
  });

  test('works with safeParse for valid inputs', () => {
    const result = nonEmptyStringSchema.safeParse('valid string');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('valid string');
    }
  });

  test('works with safeParse for empty string', () => {
    const result = nonEmptyStringSchema.safeParse('');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('This field cannot be empty');
    }
  });

  test('works with safeParse for non-string inputs', () => {
    const result1 = nonEmptyStringSchema.safeParse(123);
    expect(result1.success).toBe(false);

    const result2 = nonEmptyStringSchema.safeParse(null);
    expect(result2.success).toBe(false);
  });

  test('maintains string type', () => {
    // Type checking - should compile without issues
    const result: string = nonEmptyStringSchema.parse('test');
    expect(typeof result).toBe('string');
    expect(result).toBe('test');
  });

  test('handles unicode characters', () => {
    expect(nonEmptyStringSchema.parse('🚀')).toBe('🚀');
    expect(nonEmptyStringSchema.parse('héllo')).toBe('héllo');
    expect(nonEmptyStringSchema.parse('你好')).toBe('你好');
  });

  test('handles very long strings', () => {
    const longString = 'a'.repeat(10000);
    expect(nonEmptyStringSchema.parse(longString)).toBe(longString);
  });

  test('custom error message is specific', () => {
    try {
      nonEmptyStringSchema.parse('');
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.issues[0].message).toBe('This field cannot be empty');
    }
  });
});
