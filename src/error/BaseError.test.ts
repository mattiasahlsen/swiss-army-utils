import { BaseError } from './BaseError.js';

describe('BaseError', () => {
  test('extends Error class', () => {
    const error = new BaseError('Test message');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(BaseError);
  });

  test('sets message correctly', () => {
    const message = 'Something went wrong';
    const error = new BaseError(message);
    expect(error.message).toBe(message);
  });

  test('has isBaseError property set to true', () => {
    const error = new BaseError('Test');
    expect(error.isBaseError).toBe(true);
    expect(error.isBaseError).toBe(true as const);
  });

  test('preserves stack trace', () => {
    const error = new BaseError('Test');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });

  test('has correct name property', () => {
    const error = new BaseError('Test');
    expect(error.name).toBe('Error'); // BaseError doesn't override name property
  });

  test('can be caught as Error', () => {
    expect(() => {
      throw new BaseError('Test error');
    }).toThrow(Error);
  });

  test('can be caught as BaseError', () => {
    expect(() => {
      throw new BaseError('Test error');
    }).toThrow(BaseError);
  });

  test('isBaseError property is readonly in TypeScript but can be changed at runtime', () => {
    const error = new BaseError('Test');
    // TypeScript prevents this at compile time, but at runtime it can be changed
    // @ts-expect-error - testing readonly property
    error.isBaseError = false;
    expect(error.isBaseError).toBe(false); // Actually gets changed at runtime
  });
});