import { isDefined } from '../filter/isDefined.js';

type NonNullable<I> = Exclude<I, null | undefined>;

type ArrayContent<I> = I extends (infer U)[] ? ArrayContent<U> : I;

export const pluckIds = <T, I>(
  items: T[],
  idGetter: (item: T) => I
): NonNullable<ArrayContent<I>>[] => {
  const ids = items.map(idGetter).flat(10).filter(isDefined);

  return [...new Set(ids)] as NonNullable<ArrayContent<I>>[];
};
