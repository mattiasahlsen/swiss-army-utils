import { raise } from '../error/raise.js';

export const findOrThrow = <T>(arr: T[], predicate: (item: T) => boolean) =>
  arr.find(predicate) ?? raise('Item not found');
