import { toSorted } from './toSorted.js';

describe('sortArray', () => {
  it('sorts an array of numbers in ascending order', () => {
    const array = [5, 3, 8, 1];
    const sorted = toSorted(array, (item) => item, 'asc');

    expect(sorted).toEqual([1, 3, 5, 8]);
  });

  it('sorts an array of numbers in descending order', () => {
    const array = [5, 3, 8, 1];
    const sorted = toSorted(array, (item) => item, 'desc');

    expect(sorted).toEqual([8, 5, 3, 1]);
  });

  it('sorts an array of strings in ascending order', () => {
    const array = ['banana', 'apple', 'cherry'];
    const sorted = toSorted(array, (item) => item, 'asc');

    expect(sorted).toEqual(['apple', 'banana', 'cherry']);
  });

  it('sorts an array of strings in descending order', () => {
    const array = ['banana', 'apple', 'cherry'];
    const sorted = toSorted(array, (item) => item, 'desc');

    expect(sorted).toEqual(['cherry', 'banana', 'apple']);
  });

  it('sorts an array of objects by a numeric key in ascending order', () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const sorted = toSorted(array, (item) => item.id, 'asc');

    expect(sorted).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('sorts an array of objects by a numeric key in descending order', () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const sorted = toSorted(array, (item) => item.id, 'desc');

    expect(sorted).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
  });

  it('sorts an array of objects by a string key in ascending order', () => {
    const array = [{ name: 'banana' }, { name: 'apple' }, { name: 'cherry' }];
    const sorted = toSorted(array, (item) => item.name, 'asc');

    expect(sorted).toEqual([
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' },
    ]);
  });

  it('sorts an array of objects by a string key in descending order', () => {
    const array = [{ name: 'banana' }, { name: 'apple' }, { name: 'cherry' }];
    const sorted = toSorted(array, (item) => item.name, 'desc');

    expect(sorted).toEqual([
      { name: 'cherry' },
      { name: 'banana' },
      { name: 'apple' },
    ]);
  });

  it('returns an empty array when input is empty', () => {
    const array: number[] = [];
    const sorted = toSorted(array, (item) => item, 'asc');

    expect(sorted).toEqual([]);
  });

  it('handles an array with a single element', () => {
    const array = [42];
    const sorted = toSorted(array, (item) => item, 'asc');

    expect(sorted).toEqual([42]);
  });

  it('defaults to acsending order when no order is specified', () => {
    const array = [5, 3, 8, 1];
    const sorted = toSorted(array, (item) => item);

    expect(sorted).toEqual([1, 3, 5, 8]);
  });
});
