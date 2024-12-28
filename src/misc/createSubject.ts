import { firstOrThrow } from '../find/firstOrThrow.js';

type Handler<TParams> = (params: TParams) => Promise<void> | void;

const callInOrderWithErrorHandling = async <TParams>(
  handlers: Set<Handler<TParams>>,
  params: TParams
) => {
  const errors: unknown[] = [];

  for (const handler of handlers) {
    try {
      await handler(params);
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    if (errors.length === 1) {
      throw firstOrThrow(errors);
    }

    throw new AggregateError(errors, 'Some handlers failed');
  }
};

export const createSubject = <THandlerParams>() => {
  const listeners = new Set<Handler<THandlerParams>>();

  return {
    subscribe: (handler: Handler<THandlerParams>) => {
      listeners.add(handler);
      return () => {
        listeners.delete(handler);
      };
    },
    emit: async (params: THandlerParams) => {
      await callInOrderWithErrorHandling(listeners, params);
    },
  };
};

export type Subject<T> = ReturnType<typeof createSubject<T>>;

export const mergeSubjects = <THandlerParams>(
  subjects: Subject<THandlerParams>[]
): Omit<Subject<THandlerParams>, 'emit'> => {
  return {
    subscribe: (handler: Handler<THandlerParams>) => {
      const unsubscribes = subjects.map((subject) =>
        subject.subscribe(handler)
      );

      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    },
  };
};
