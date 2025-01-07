export const omit = <T extends object, const K extends keyof T & string>(
  obj: T,
  ...keys: (K | K[])[]
): Omit<T, K> => {
  const keySet = new Set<string>(keys.flat());
  const result: any = {};

  for (const key in obj) {
    if (!keySet.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};
