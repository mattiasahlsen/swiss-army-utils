import z from 'zod';

export const booleanAsStringSchema = z
  .enum(['true', 'false'])
  .transform((val) => val === 'true');
