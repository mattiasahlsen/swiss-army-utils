import { roundToDecimals } from './roundToDecimals.js';

describe('roundToDecimals', () => {
  it('should round to the specified number of decimal places', () => {
    expect(roundToDecimals(3.14159, 2)).toBe(3.14);
    expect(roundToDecimals(3.14159, 0)).toBe(3);
    expect(roundToDecimals(3.14159, 3)).toBe(3.142);
  });

  it('should return the same value if the number of decimals is greater than the precision of the value', () => {
    expect(roundToDecimals(3.14, 5)).toBe(3.14);
  });

  it('should handle negative numbers correctly', () => {
    expect(roundToDecimals(-3.14159, 2)).toBe(-3.14);
    expect(roundToDecimals(-3.14159, 0)).toBe(-3);
    expect(roundToDecimals(-3.14159, 3)).toBe(-3.142);
  });

  it('should handle edge cases with zero', () => {
    expect(roundToDecimals(0, 2)).toBe(0);
    expect(roundToDecimals(0, 0)).toBe(0);
  });

  it('should handle cases where decimals is negative', () => {
    expect(roundToDecimals(1234.5678, -1)).toBe(1230);
    expect(roundToDecimals(1235.5678, -1)).toBe(1240);
    expect(roundToDecimals(1234.5678, -2)).toBe(1200);
    expect(roundToDecimals(1234.5678, -3)).toBe(1000);
  });

  it('should round up when the next digit is 5', () => {
    expect(roundToDecimals(2.675, 2)).toBe(2.68);
    expect(roundToDecimals(2.685, 2)).toBe(2.69);
    expect(roundToDecimals(2.695, 2)).toBe(2.7);
  });

  it('should handle very large numbers', () => {
    expect(roundToDecimals(12345678.987654321, 2)).toBe(12345678.99);
    expect(roundToDecimals(12345678.987654321, 0)).toBe(12345679);
  });

  it('should handle very small numbers', () => {
    expect(roundToDecimals(0.000123456, 6)).toBe(0.000123);
    expect(roundToDecimals(0.000123456, 8)).toBe(0.00012346);
  });
});
