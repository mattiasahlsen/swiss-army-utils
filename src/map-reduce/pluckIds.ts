import { isDefined } from '../filter/isDefined.js';

type NonNullable<I> = Exclude<I, null | undefined>;

type ArrayContent<I> = I extends (infer U)[] ? ArrayContent<U> : I;

/**
 * Extracts unique IDs from an array of objects using an ID getter function.
 * The function flattens nested arrays up to 10 levels deep, filters out null/undefined values,
 * and returns a deduplicated array of IDs.
 *
 * @param items - The array of objects to extract IDs from.
 * @param idGetter - Function that extracts the ID(s) from each item. Can return single values or nested arrays.
 * @returns An array of unique, non-null IDs.
 *
 * @example
 * ```ts
 * const users = [
 *   { id: 1, friendIds: [2, 3] },
 *   { id: 2, friendIds: [1] },
 *   { id: 3, friendIds: [1, 2] }
 * ];
 * 
 * // Extract user IDs
 * pluckIds(users, user => user.id);
 * // returns [1, 2, 3]
 * 
 * // Extract friend IDs (flattened and deduplicated)
 * pluckIds(users, user => user.friendIds);
 * // returns [2, 3, 1]
 * 
 * // Extract both user ID and friend IDs
 * pluckIds(users, user => [user.id, user.friendIds]);
 * // returns [1, 2, 3]
 * ```
 */
export const pluckIds = <T, I>(
  items: T[],
  idGetter: (item: T) => I
): NonNullable<ArrayContent<I>>[] => {
  const ids = items.map(idGetter).flat(10).filter(isDefined);

  return [...new Set(ids)] as NonNullable<ArrayContent<I>>[];
};
