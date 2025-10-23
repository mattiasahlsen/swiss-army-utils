/**
 * Error class for timeout operations.
 * Automatically generates a detailed message with timing information.
 *
 * @class
 * @extends {Error}
 * @param {string} operation - The name of the operation that timed out.
 * @param {Object} options - Timing information.
 * @param {number} options.startTime - The timestamp when the operation started (in milliseconds).
 * @param {number} options.timeout - The timeout duration (in milliseconds).
 *
 * @example
 * ```ts
 * const startTime = Date.now();
 * try {
 *   // some async operation
 * } catch (error) {
 *   throw new TimeoutError('API request', { startTime, timeout: 5000 });
 * }
 * // Error: API request timed out after 5000ms (started at 2024-01-01T00:00:00.000Z, now: 2024-01-01T00:00:05.100Z)
 * ```
 */
export class TimeoutError extends Error {
  constructor(
    operation: string,
    { startTime, timeout }: { startTime: number; timeout: number }
  ) {
    super(
      `${operation} timed out after ${timeout.toString()}ms (started at ${new Date(startTime).toISOString()}, now: ${new Date().toISOString()})`
    );
    this.name = 'TimeoutError';
  }
}
