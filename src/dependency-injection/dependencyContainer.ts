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
