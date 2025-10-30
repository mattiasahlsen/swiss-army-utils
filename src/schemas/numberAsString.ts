import z from 'zod';
import { stringToNumber } from '../map-reduce/stringToNumber.js';

/**
 * Zod schema that parses number values from string representations.
 * Uses stringToNumber for validation and transformation.
 *
 * @type {z.ZodSchema<number>}
 *
 * @example
 * ```ts
 * numberAsStringSchema.parse('123'); // returns 123
 * numberAsStringSchema.parse('3.14'); // returns 3.14
 * numberAsStringSchema.parse('abc'); // throws ZodError
 * ```
 */
export const numberAsStringSchema = z
  .string()
  .transform((v) => stringToNumber(v));
