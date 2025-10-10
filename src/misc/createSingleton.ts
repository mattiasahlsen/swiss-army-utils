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
