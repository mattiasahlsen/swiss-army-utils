import { TimeoutError } from './TimeoutError.js';

describe('TimeoutError', () => {
  test('extends Error class', () => {
    const error = new TimeoutError('test operation', { startTime: Date.now(), timeout: 1000 });
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(TimeoutError);
  });

  test('has correct name property', () => {
    const error = new TimeoutError('test operation', { startTime: Date.now(), timeout: 1000 });
    expect(error.name).toBe('TimeoutError');
  });

  test('formats message correctly with operation name and timeout', () => {
    const startTime = 1640995200000; // 2022-01-01 00:00:00 GMT
    const timeout = 5000;
    const operation = 'fetch data';
    
    const error = new TimeoutError(operation, { startTime, timeout });
    
    expect(error.message).toMatch(/^fetch data timed out after 5000ms/);
    expect(error.message).toContain('started at 2022-01-01T00:00:00.000Z');
    expect(error.message).toContain('now: ');
    expect(error.message).toMatch(/now: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
  });

  test('works with different operation names', () => {
    const startTime = Date.now();
    const timeout = 2000;
    
    const error1 = new TimeoutError('database query', { startTime, timeout });
    const error2 = new TimeoutError('API request', { startTime, timeout });
    
    expect(error1.message).toContain('database query timed out after 2000ms');
    expect(error2.message).toContain('API request timed out after 2000ms');
  });

  test('works with different timeout values', () => {
    const startTime = Date.now();
    
    const error1 = new TimeoutError('operation', { startTime, timeout: 100 });
    const error2 = new TimeoutError('operation', { startTime, timeout: 30000 });
    
    expect(error1.message).toContain('timed out after 100ms');
    expect(error2.message).toContain('timed out after 30000ms');
  });

  test('preserves stack trace', () => {
    const error = new TimeoutError('test', { startTime: Date.now(), timeout: 1000 });
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });

  test('can be caught as Error', () => {
    expect(() => {
      throw new TimeoutError('test', { startTime: Date.now(), timeout: 1000 });
    }).toThrow(Error);
  });

  test('can be caught as TimeoutError', () => {
    expect(() => {
      throw new TimeoutError('test', { startTime: Date.now(), timeout: 1000 });
    }).toThrow(TimeoutError);
  });

  test('handles edge case with zero timeout', () => {
    const startTime = Date.now();
    const error = new TimeoutError('instant operation', { startTime, timeout: 0 });
    expect(error.message).toContain('timed out after 0ms');
  });

  test('includes valid ISO timestamp format', () => {
    const startTime = 1640995200000; // Fixed timestamp
    const error = new TimeoutError('test', { startTime, timeout: 1000 });
    
    // Check that the message contains valid ISO timestamp format
    expect(error.message).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
  });
});