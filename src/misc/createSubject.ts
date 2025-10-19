import { firstOrThrow } from '../find/firstOrThrow.js';

type Handler<TParams> = (params: TParams) => Promise<void> | void;

/**
 * Calls all handlers in order, collecting errors and throwing them at the end.
 * If only one error occurs, throws that error directly.
 * If multiple errors occur, throws an AggregateError.
 *
 * @param {Set<Handler<TParams>>} handlers - Set of handler functions to call.
 * @param {TParams} params - Parameters to pass to each handler.
 * @throws {Error} The single error if only one handler fails.
 * @throws {AggregateError} If multiple handlers fail.
 */
async function callInOrderWithErrorHandling<TParams>(
  handlers: Set<Handler<TParams>>,
  params: TParams
) {
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
}

/**
 * Creates a subject (observable) for event-driven programming.
 * Allows subscribers to listen for events and emit events to all subscribers.
 * Handlers are called in order, and all handlers are executed even if some fail.
 *
 * @returns {Object} An object with subscribe and emit methods.
 *
 * @example
 * ```ts
 * const subject = createSubject<string>();
 *
 * // Subscribe to events
 * const unsubscribe = subject.subscribe(async (message) => {
 *   console.log('Received:', message);
 * });
 *
 * // Emit events to all subscribers
 * await subject.emit('Hello, world!');
 *
 * // Unsubscribe when done
 * unsubscribe();
 * ```
 */
export function createSubject<THandlerParams>() {
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
}

export type Subject<T> = ReturnType<typeof createSubject<T>>;

/**
 * Merges multiple subjects into a single subscribable subject.
 * A handler subscribed to the merged subject will receive events from all source subjects.
 * Note: The merged subject cannot emit events, only subscribe to them.
 *
 * @param {Subject<THandlerParams>[]} subjects - Array of subjects to merge.
 * @returns {Object} A merged subject with only a subscribe method (no emit).
 *
 * @example
 * ```ts
 * const subject1 = createSubject<string>();
 * const subject2 = createSubject<string>();
 *
 * const merged = mergeSubjects([subject1, subject2]);
 *
 * // Subscribe once to receive events from both subjects
 * merged.subscribe((message) => {
 *   console.log('Received from any subject:', message);
 * });
 *
 * await subject1.emit('From subject1');
 * await subject2.emit('From subject2');
 * // Both messages are received by the merged subscriber
 * ```
 */
export function mergeSubjects<THandlerParams>(
  subjects: Subject<THandlerParams>[]
): Omit<Subject<THandlerParams>, 'emit'> {
  return {
    subscribe: (handler: Handler<THandlerParams>) => {
      const unsubscribes = subjects.map((subject) =>
        subject.subscribe(handler)
      );

      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    },
  };
}
