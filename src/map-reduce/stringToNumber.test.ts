import { stringToNumber } from './stringToNumber.js';

describe('stringToNumber', () => {
  it('should convert a valid string to a number', () => {
    expect(stringToNumber('123')).toBe(123);
    expect(stringToNumber('45.67')).toBe(45.67);
    expect(stringToNumber('-89')).toBe(-89);
  });

  it('should throw an error for an empty string', () => {
    expect(() => stringToNumber('')).toThrow('Invalid number: ');
  });

  it('should throw an error for a string with only spaces', () => {
    expect(() => stringToNumber('   ')).toThrow('Invalid number:    ');
  });

  it('should throw an error for a non-numeric string', () => {
    expect(() => stringToNumber('abc')).toThrow('Invalid number: abc');
    expect(() => stringToNumber('123abc')).toThrow('Invalid number: 123abc');
  });

  it('should throw an error for special characters', () => {
    expect(() => stringToNumber('!@#')).toThrow('Invalid number: !@#');
  });

  it('should throw an error for NaN or Infinity', () => {
    expect(() => stringToNumber('NaN')).toThrow('Invalid number: NaN');
    expect(() => stringToNumber('Infinity')).toThrow(
      'Invalid number: Infinity'
    );
    expect(() => stringToNumber('-Infinity')).toThrow(
      'Invalid number: -Infinity'
    );
  });
});
