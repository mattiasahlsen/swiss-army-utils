import { InvalidInputError } from './InvalidInputError.js';
import { raise } from './raise.js';

describe('raise', () => {
  test('throws an error when an error is passed', async () => {
    expect(() => raise(new InvalidInputError('test'))).toThrow(
      new InvalidInputError('test')
    );
  });

  test('throws an error when a string is passed', async () => {
    expect(() => raise('test')).toThrow(new Error('test'));
  });
});
