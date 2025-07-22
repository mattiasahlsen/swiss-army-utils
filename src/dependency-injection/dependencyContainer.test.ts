import { EmptyObject } from 'type-fest';
import { createDependencyContainer } from './dependencyContainer.js';

describe('createDependencyContainer', () => {
  test('can create a simple dependency container with both sync and async dependencies', () => {
    const container = createDependencyContainer({
      createDependencies: () => ({ foo: 'bar' }),
      createAsyncDependencies: () => Promise.resolve({ baz: 'qux' }),
    });

    expect(container.getDependencies() satisfies { foo: string }).toEqual({
      foo: 'bar',
    });
    expect(
      container.getAsyncDependencies() satisfies Promise<{ baz: string }>
    ).resolves.toEqual({ baz: 'qux' });
  });

  test('can create a dependency container without async dependencies', () => {
    const container = createDependencyContainer({
      createDependencies: () => ({ foo: 'bar' }),
    });

    expect(container.getDependencies() satisfies { foo: string }).toEqual({
      foo: 'bar',
    });
    expect(
      container.getAsyncDependencies() satisfies Promise<EmptyObject>
    ).resolves.toEqual({});
  });

  test('can create a dependency container without sync dependencies', () => {
    const container = createDependencyContainer({
      createAsyncDependencies: () => Promise.resolve({ baz: 'qux' }),
    });
    expect(container.getDependencies() satisfies EmptyObject).toEqual({});
    expect(
      container.getAsyncDependencies() satisfies Promise<{ baz: string }>
    ).resolves.toEqual({ baz: 'qux' });
  });

  test('can create dependency container without any dependencies', () => {
    const container = createDependencyContainer({});
    expect(container.getDependencies() satisfies EmptyObject).toEqual({});
    expect(
      container.getAsyncDependencies() satisfies Promise<EmptyObject>
    ).resolves.toEqual({});
  });

  test('can create a complex dependency container in multiple steps', () => {
    const container = createDependencyContainer({
      createDependencies: () => ({ foo: 'bar' }),
      createAsyncDependencies: () => Promise.resolve({ baz: 'qux' }),
    })
      .extend({
        createDependencies: (prevContainer) => ({
          foo2: `${prevContainer.getDependencies().foo}-beta`,
        }),
        createAsyncDependencies: async (prevContainer) => ({
          baz2: `${(await prevContainer.getAsyncDependencies()).baz}-delta`,
        }),
      })
      .extend({
        createDependencies: (prevContainer) => ({
          foo3: `${prevContainer.getDependencies().foo2}-gamma`,
        }),
        createAsyncDependencies: async (prevContainer) => ({
          baz3: `${(await prevContainer.getAsyncDependencies()).baz2}-epsilon`,
        }),
      })
      .extend({
        createDependencies: (prevContainer) => ({
          foo4: `${prevContainer.getDependencies().foo3}-zeta`,
        }),
      })
      .extend({
        createAsyncDependencies: async (prevContainer) => ({
          baz4: `${(await prevContainer.getAsyncDependencies()).baz3}-eta`,
        }),
      });
    interface SyncDependencies {
      foo: string;
      foo2: string;
      foo3: string;
      foo4: string;
    }

    interface AsyncDependencies {
      baz: string;
      baz2: string;
      baz3: string;
      baz4: string;
    }

    const syncDependencies: SyncDependencies = {
      foo: 'bar',
      foo2: 'bar-beta',
      foo3: 'bar-beta-gamma',
      foo4: 'bar-beta-gamma-zeta',
    };
    const asyncDependencies: AsyncDependencies = {
      baz: 'qux',
      baz2: 'qux-delta',
      baz3: 'qux-delta-epsilon',
      baz4: 'qux-delta-epsilon-eta',
    };

    expect(container.getDependencies() satisfies SyncDependencies).toEqual(
      syncDependencies
    );
    expect(
      container.getAsyncDependencies() satisfies Promise<AsyncDependencies>
    ).resolves.toEqual(asyncDependencies);

    expect(
      container.loadAllDependencies() satisfies Promise<
        SyncDependencies & AsyncDependencies
      >
    ).resolves.toEqual({
      ...syncDependencies,
      ...asyncDependencies,
    });
  });
});
