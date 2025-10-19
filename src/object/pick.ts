export function pick<
  T extends Record<string, unknown>,
  const Keys extends (keyof T)[],
>(obj: T, keys: Keys): Pick<T, Keys[number]> {
  const result = {} as Pick<T, Keys[number]>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}
