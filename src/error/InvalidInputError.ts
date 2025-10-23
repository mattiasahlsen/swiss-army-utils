import { BaseError } from './BaseError.js';

/**
 * Error class for invalid input errors.
 * Extends BaseError to provide a specific error type for input validation failures.
 *
 * @class
 * @extends {BaseError}
 *
 * @example
 * ```ts
 * throw new InvalidInputError('User ID must be a positive number');
 * ```
 */
export class InvalidInputError extends BaseError {}
