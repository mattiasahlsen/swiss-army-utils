/**
 * Base error class that all custom errors in this library extend from.
 * Provides a flag to identify errors from this library.
 *
 * @class
 * @extends {Error}
 *
 * @example
 * ```ts
 * class CustomError extends BaseError {}
 *
 * const err = new CustomError('Something went wrong');
 * if (err.isBaseError) {
 *   // Handle custom error
 * }
 * ```
 */
export class BaseError extends Error {
  public readonly isBaseError = true;
}
