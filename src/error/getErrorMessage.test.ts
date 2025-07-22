import { getErrorMessage } from './getErrorMessage.js';

describe('getErrorMessage', () => {
  test('returns message from Error instance', () => {
    const error = new Error('Something went wrong');
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  test('returns string if error is a string', () => {
    expect(getErrorMessage('A string error')).toBe('A string error');
  });

  test('returns JSON string if error is an object', () => {
    const obj = { code: 404, message: 'Not found' };
    expect(getErrorMessage(obj)).toBe(JSON.stringify(obj));
  });

  test('returns default message for null', () => {
    expect(getErrorMessage(null)).toBe('An unknown error occurred');
  });

  test('returns default message for undefined', () => {
    expect(getErrorMessage(undefined)).toBe('An unknown error occurred');
  });

  test('returns default message for number', () => {
    expect(getErrorMessage(123)).toBe('An unknown error occurred');
  });

  test('returns default message for boolean', () => {
    expect(getErrorMessage(false)).toBe('An unknown error occurred');
  });
});
