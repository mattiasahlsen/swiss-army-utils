import type { EmptyObject } from 'type-fest';
import {
  createSingleton,
  createSingletonSync,
} from '../misc/createSingleton.js';

export type { EmptyObject };

export interface Dependencies<
  InitDependencies extends Record<string, any>,
  AsyncDependencies extends Record<string, any>,
> {
  getDependencies: () => InitDependencies;
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
    createDependencies?: (
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
  InitDependencies extends Record<string, any> = EmptyObject,
  AsyncDependencies extends Record<string, any> = EmptyObject,
>({
  createDependencies,
  createAsyncDependencies,
}: {
  createDependencies?: () => InitDependencies;
  createAsyncDependencies?: () => Promise<AsyncDependencies>;
}): DependencyContainer<InitDependencies, AsyncDependencies> {
  return {
    getDependencies: createSingletonSync({
      getValue: createDependencies ?? (() => ({}) as InitDependencies),
      isValid: () => true,
    }),
    getAsyncDependencies: createSingleton<AsyncDependencies>({
      getValue:
        createAsyncDependencies ??
        (() => Promise.resolve({} as AsyncDependencies)),
      isValid: () => true,
    }),
    extend({ createDependencies, createAsyncDependencies }) {
      return createDependencyContainer({
        createDependencies: () => ({
          ...this.getDependencies(),
          ...(createDependencies?.(this) as any),
        }),
        createAsyncDependencies: async () => ({
          ...((await createAsyncDependencies?.(this)) as any),
          ...(await this.getAsyncDependencies()),
        }),
      });
    },
    async loadAllDependencies() {
      const syncDeps = this.getDependencies();
      const asyncDeps = await this.getAsyncDependencies();
      return { ...syncDeps, ...asyncDeps };
    },
  };
}
