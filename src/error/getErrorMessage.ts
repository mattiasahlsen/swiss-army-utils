/**
 * Extracts an error message from an unknown error value.
 * Handles Error objects, strings, objects, and other types gracefully.
 *
 * @param {unknown} error - The error value to extract a message from.
 * @returns {string} A string representation of the error message.
 *
 * @example
 * ```ts
 * getErrorMessage(new Error('Something went wrong')); // returns 'Something went wrong'
 * getErrorMessage('Error string'); // returns 'Error string'
 * getErrorMessage({ code: 404 }); // returns '{"code":404}'
 * getErrorMessage(null); // returns 'An unknown error occurred'
 * ```
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error);
  }

  return 'An unknown error occurred';
}
