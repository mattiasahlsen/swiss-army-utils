import { isPromise } from 'node:util/types';

/**
 * Creates an async singleton that lazily fetches and caches a value.
 * The cached value is validated before each use and refreshed if invalid.
 * Handles concurrent calls by ensuring only one fetch happens at a time.
 *
 * @param options - Configuration object.
 * @param options.getValue - Function that fetches the value asynchronously.
 * @param options.isValid - Function that checks if the cached value is still valid.
 * @returns A function that returns the singleton value, fetching it if necessary.
 * @throws {Error} If the freshly fetched value is invalid.
 *
 * @example
 * ```ts
 * const getToken = createSingleton({
 *   getValue: async () => fetchAuthToken(),
 *   isValid: (token) => !token.isExpired
 * });
 *
 * // First call fetches the token
 * const token1 = await getToken();
 *
 * // Subsequent calls return cached token if valid
 * const token2 = await getToken(); // Same token if still valid
 *
 * // Concurrent calls share the same fetch
 * const [token3, token4] = await Promise.all([getToken(), getToken()]);
 * ```
 */
export function createSingletonAsync<T>({
  getValue,
  isValid,
}: {
  getValue: () => Promise<T>;
  isValid: (value: T) => boolean;
}): () => Promise<T> {
  let valuePromise: Promise<T> | undefined = undefined;
  let nextValuePromise: Promise<T> | undefined = undefined;

  return async () => {
    if (valuePromise) {
      const value = await valuePromise;

      if (isValid(value)) {
        return value;
      }
    }

    if (nextValuePromise) {
      return nextValuePromise;
    }

    nextValuePromise = getValue().then((value) => {
      if (!isValid(value)) {
        throw new Error('Fresh value is invalid');
      }
      nextValuePromise = undefined;
      return value;
    });

    valuePromise = nextValuePromise;
    return nextValuePromise;
  };
}

/**
 * Creates a synchronous singleton that lazily fetches and caches a value.
 * The cached value is validated before each use and refreshed if invalid.
 *
 * @param options - Configuration object.
 * @param options.getValue - Function that fetches the value synchronously.
 * @param options.isValid - Function that checks if the cached value is still valid.
 * @returns A function that returns the singleton value, fetching it if necessary.
 * @throws {Error} If the freshly fetched value is invalid.
 *
 * @example
 * ```ts
 * const getConfig = createSingletonSync({
 *   getValue: () => loadConfigFromFile(),
 *   isValid: (config) => config.version === expectedVersion
 * });
 *
 * // First call fetches the config
 * const config1 = getConfig();
 *
 * // Subsequent calls return cached config if valid
 * const config2 = getConfig(); // Same config if still valid
 * ```
 */
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

/**
 * Creates a lazy, refreshable singleton accessor for values of type T.
 *
 * The returned zero-argument function will:
 * - lazily obtain a value by calling options.getValue() on first use,
 * - cache that value and return it on subsequent calls while options.isValid(cached) returns true,
 * - if options.isValid returns false for the cached value, obtain and cache a new value via options.getValue().
 *
 * @template T - The type of the singleton value.
 * @param options.getValue - Factory function invoked to create the value when no valid cached value exists.
 * @param options.isValid - Predicate used to determine whether a cached value is still usable. If it returns false, a new value will be created.
 * @returns A function that returns the current singleton value of type T.
 *
 * @remarks
 * - Initialization is lazy: getValue is not called until the returned function is invoked.
 *
 * @example
 * const getConfig = createSingleton({
 *   getValue: () => loadConfigFromDisk(),
 *   isValid: (cfg) => cfg !== null && !cfg.isStale,
 * });
 *
 * const cfg = getConfig(); // loads and caches config, or returns cached config if still valid
 */
export function createSingleton<T>(options: {
  getValue: () => T;
  isValid: (value: T) => boolean;
}): () => T;
export function createSingleton<T>(options: {
  getValue: () => Promise<T>;
  isValid: (value: T) => boolean;
}): () => Promise<T>;
export function createSingleton<T>({
  getValue,
  isValid,
}: {
  getValue: () => T | Promise<T>;
  isValid: (value: T) => boolean;
}): () => T | Promise<T> {
  let value: T | Promise<T> | undefined = undefined;
  let nextValuePromise: Promise<T> | undefined = undefined;

  return () => {
    if (value === undefined) {
      value = getValue();
    }

    if (isPromise(value)) {
      return (value as Promise<T>).then((v) => {
        if (isValid(v)) {
          return v;
        }

        if (nextValuePromise) {
          return nextValuePromise;
        }

        nextValuePromise = (getValue() as Promise<T>).then((newValue) => {
          if (!isValid(newValue)) {
            throw new Error('Fresh value is invalid');
          }

          nextValuePromise = undefined;
          return newValue;
        });
        value = nextValuePromise;
        return nextValuePromise;
      });
    } else {
      if (isValid(value)) {
        return value;
      }

      const newValue = getValue() as T;
      value = newValue;
      if (!isValid(newValue)) {
        throw new Error('Fresh value is invalid');
      }

      return newValue;
    }
  };
}
