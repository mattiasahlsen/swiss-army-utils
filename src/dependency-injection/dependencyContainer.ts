import type { EmptyObject } from 'type-fest';
import {
  createSingletonAsync,
  createSingletonSync,
} from '../misc/createSingleton.js';

export type { EmptyObject };

export interface Dependencies<
  InitDependencies extends Record<string, any>,
  AsyncDependencies extends Record<string, any>,
> {
  getSyncDependencies: () => InitDependencies;
  getAsyncDependencies: () => Promise<AsyncDependencies>;
  loadAllDependencies(): Promise<InitDependencies & AsyncDependencies>;
}

export interface DependencyContainer<
  InitDependencies extends Record<string, any>,
  AsyncDependencies extends Record<string, any>,
> extends Dependencies<InitDependencies, AsyncDependencies> {
  extend<
    NewInitDependencies extends Record<string, any>,
    NewAsyncDependencies extends Record<string, any>,
  >(options: {
    createSyncDependencies?: (
      container: Dependencies<InitDependencies, AsyncDependencies>
    ) => NewInitDependencies;
    createAsyncDependencies?: (
      container: Dependencies<InitDependencies, AsyncDependencies>
    ) => Promise<NewAsyncDependencies>;
  }): DependencyContainer<
    InitDependencies & NewInitDependencies,
    AsyncDependencies & NewAsyncDependencies
  >;
}

/**
 * Creates a dependency injection container for managing application dependencies.
 * Supports both synchronous and asynchronous dependencies with lazy initialization.
 * Containers can be extended to add new dependencies while maintaining type safety.
 *
 * @param {Object} options - Configuration for dependency creation.
 * @param {function} options.createSyncDependencies - Optional function that creates synchronous dependencies.
 * @param {function} options.createAsyncDependencies - Optional function that creates asynchronous dependencies.
 * @returns {DependencyContainer<SyncDependencies, AsyncDependencies>} A dependency container with extend and load capabilities.
 *
 * @example
 * ```ts
 * const container = createDependencyContainer({
 *   createSyncDependencies: () => ({
 *     config: { apiUrl: 'https://api.example.com' }
 *   }),
 *   createAsyncDependencies: async () => ({
 *     db: await connectToDatabase()
 *   })
 * });
 *
 * const syncDeps = container.getSyncDependencies();
 * const allDeps = await container.loadAllDependencies();
 *
 * const extended = container.extend({
 *   createSyncDependencies: (parent) => ({
 *     logger: createLogger(parent.getSyncDependencies().config)
 *   })
 * });
 * ```
 */
export function createDependencyContainer<
  SyncDependencies extends Record<string, any> = EmptyObject,
  AsyncDependencies extends Record<string, any> = EmptyObject,
>({
  createSyncDependencies,
  createAsyncDependencies,
}: {
  createSyncDependencies?: () => SyncDependencies;
  createAsyncDependencies?: () => Promise<AsyncDependencies>;
}): DependencyContainer<SyncDependencies, AsyncDependencies> {
  return {
    getSyncDependencies: createSingletonSync({
      getValue: createSyncDependencies ?? (() => ({}) as SyncDependencies),
      isValid: () => true,
    }),
    getAsyncDependencies: createSingletonAsync<AsyncDependencies>({
      getValue:
        createAsyncDependencies ??
        (() => Promise.resolve({} as AsyncDependencies)),
      isValid: () => true,
    }),
    extend({ createSyncDependencies, createAsyncDependencies }) {
      return createDependencyContainer({
        createSyncDependencies: () => ({
          ...this.getSyncDependencies(),
          ...(createSyncDependencies?.(this) as any),
        }),
        createAsyncDependencies: async () => ({
          ...((await createAsyncDependencies?.(this)) as any),
          ...(await this.getAsyncDependencies()),
        }),
      });
    },
    async loadAllDependencies() {
      const syncDeps = this.getSyncDependencies();
      const asyncDeps = await this.getAsyncDependencies();
      return { ...syncDeps, ...asyncDeps };
    },
  };
}
