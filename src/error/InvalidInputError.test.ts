import { InvalidInputError } from './InvalidInputError.js';
import { BaseError } from './BaseError.js';

describe('InvalidInputError', () => {
  test('extends BaseError class', () => {
    const error = new InvalidInputError('Test message');
    expect(error).toBeInstanceOf(BaseError);
    expect(error).toBeInstanceOf(InvalidInputError);
    expect(error).toBeInstanceOf(Error);
  });

  test('inherits isBaseError property', () => {
    const error = new InvalidInputError('Test');
    expect(error.isBaseError).toBe(true);
  });

  test('sets message correctly', () => {
    const message = 'Invalid input provided';
    const error = new InvalidInputError(message);
    expect(error.message).toBe(message);
  });

  test('has correct name property', () => {
    const error = new InvalidInputError('Test');
    expect(error.name).toBe('Error'); // InvalidInputError doesn't override name property
  });

  test('preserves stack trace', () => {
    const error = new InvalidInputError('Test');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });

  test('can be caught as Error', () => {
    expect(() => {
      throw new InvalidInputError('Test error');
    }).toThrow(Error);
  });

  test('can be caught as BaseError', () => {
    expect(() => {
      throw new InvalidInputError('Test error');
    }).toThrow(BaseError);
  });

  test('can be caught as InvalidInputError', () => {
    expect(() => {
      throw new InvalidInputError('Test error');
    }).toThrow(InvalidInputError);
  });

  test('can be distinguished from other BaseError instances', () => {
    const baseError = new BaseError('Base error');
    const invalidInputError = new InvalidInputError('Invalid input error');

    expect(baseError).toBeInstanceOf(BaseError);
    expect(baseError).not.toBeInstanceOf(InvalidInputError);

    expect(invalidInputError).toBeInstanceOf(BaseError);
    expect(invalidInputError).toBeInstanceOf(InvalidInputError);
  });
});
