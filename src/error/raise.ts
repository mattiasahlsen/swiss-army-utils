/**
 * Throws an error immediately. Useful for inline error throwing in expressions.
 * Accepts either an Error object or a string message.
 *
 * @param {Error | string} error - The error to throw, either an Error object or string message.
 * @returns {never} Never returns (always throws).
 * @throws {Error} Always throws the provided error or creates a new Error from the string.
 *
 * @example
 * ```ts
 * const value = someCondition ? validValue : raise('Invalid condition');
 *
 * const result = data ?? raise(new Error('Data is required'));
 * ```
 */
export const raise = (error: Error | string): never => {
  if (typeof error === 'string') {
    throw new Error(error);
  }

  throw error;
};
