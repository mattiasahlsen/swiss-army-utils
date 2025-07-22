export function createSingleton<T>({
  getValue,
  isValid,
}: {
  getValue: () => Promise<T>;
  isValid: (value: T) => boolean;
}): () => Promise<T> {
  let valuePromise: Promise<T> | undefined = undefined;

  return async () => {
    if (valuePromise) {
      const value = await valuePromise;

      if (isValid(value)) {
        return value;
      }
    }

    valuePromise = getValue();

    const value = await valuePromise;

    if (!isValid(value)) {
      throw new Error('Fresh value is invalid');
    }

    return value;
  };
}

export function createSingletonSync<T>({
  getValue,
  isValid,
}: {
  getValue: () => T;
  isValid: (value: T) => boolean;
}): () => T {
  let value: T | undefined = undefined;

  return () => {
    if (value) {
      if (isValid(value)) {
        return value;
      }
    }

    value = getValue();

    if (!isValid(value)) {
      throw new Error('Fresh value is invalid');
    }

    return value;
  };
}
