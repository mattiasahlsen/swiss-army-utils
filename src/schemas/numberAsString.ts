import z from 'zod';
import { stringToNumber } from '../map-reduce/stringToNumber.js';

export const numberAsStringSchema = z
  .string()
  .transform((v) => stringToNumber(v));
