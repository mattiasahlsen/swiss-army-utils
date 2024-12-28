import { createSubject, mergeSubjects } from './createSubject.js';

describe('createSubject', () => {
  test('should subscribe and emit events', async () => {
    const subject = createSubject<number>();

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    subject.subscribe(handler1);
    subject.subscribe(handler2);

    await subject.emit(42);

    expect(handler1).toHaveBeenCalledWith(42);
    expect(handler2).toHaveBeenCalledWith(42);
  });

  test('should unsubscribe a handler', async () => {
    const subject = createSubject<string>();

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const unsubscribe1 = subject.subscribe(handler1);
    subject.subscribe(handler2);

    unsubscribe1();

    await subject.emit('Hello');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledWith('Hello');
  });

  test('calls all handlers even if one throws', async () => {
    const subject = createSubject<number>();

    const handler1 = jest.fn().mockRejectedValue(new Error('Handler 1 failed'));
    const handler2 = jest.fn();

    subject.subscribe(handler1);
    subject.subscribe(handler2);

    await expect(() => subject.emit(42)).rejects.toThrow(
      new AggregateError([new Error('Handler 1 failed')], 'Handler 1 failed')
    );

    expect(handler1).toHaveBeenCalledWith(42);
    expect(handler2).toHaveBeenCalledWith(42);
  });
});

describe('mergeSubjects', () => {
  const subject1 = createSubject<number>();
  const subject2 = createSubject<number>();

  const mergedSubject = mergeSubjects([subject1, subject2]);

  test('should subscribe to all subjects', async () => {
    const handler = jest.fn();

    mergedSubject.subscribe(handler);

    await subject1.emit(42);
    await subject2.emit(43);

    expect(handler).toHaveBeenCalledTimes(2);

    expect(handler).toHaveBeenCalledWith(42);
    expect(handler).toHaveBeenCalledWith(43);
  });

  test('should unsubscribe from all subjects', async () => {
    const handler = jest.fn();

    const unsubscribe = mergedSubject.subscribe(handler);

    unsubscribe();

    await subject1.emit(42);
    await subject2.emit(43);

    expect(handler).not.toHaveBeenCalled();
  });

  test('calls all handlers even if one throws', async () => {
    const handler1 = jest.fn().mockRejectedValue(new Error('Handler 1 failed'));
    const handler2 = jest.fn();

    mergedSubject.subscribe(handler1);
    mergedSubject.subscribe(handler2);

    await expect(() => subject1.emit(42)).rejects.toThrow(
      new AggregateError([new Error('Handler 1 failed')], 'Handler 1 failed')
    );

    expect(handler1).toHaveBeenCalledWith(42);
    expect(handler2).toHaveBeenCalledWith(42);
  });
});
