import z from 'zod';

/**
 * Zod schema that parses boolean values from string representations.
 * Accepts 'true' or 'false' strings and transforms them to actual boolean values.
 *
 * @type {z.ZodSchema<boolean>}
 *
 * @example
 * ```ts
 * booleanAsStringSchema.parse('true'); // returns true
 * booleanAsStringSchema.parse('false'); // returns false
 * booleanAsStringSchema.parse('yes'); // throws ZodError
 * ```
 */
export const booleanAsStringSchema = z
  .enum(['true', 'false'])
  .transform((val) => val === 'true');
