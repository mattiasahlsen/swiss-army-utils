import z from 'zod';

/**
 * Zod schema that validates strings are not empty (have at least 1 character).
 * Useful for required string fields in forms and APIs.
 *
 * @type {z.ZodSchema<string>}
 *
 * @example
 * ```ts
 * nonEmptyStringSchema.parse('hello'); // returns 'hello'
 * nonEmptyStringSchema.parse(''); // throws ZodError with 'This field cannot be empty'
 * ```
 */
export const nonEmptyStringSchema = z
  .string()
  .min(1, 'This field cannot be empty');
