import { groupBy } from './groupBy.js';

describe('groupBy', () => {
  it('groups objects by a string key', () => {
    const data = [
      { category: 'fruit', name: 'apple' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'banana' },
    ];
    const result = groupBy(data, (item) => item.category, {});
    expect(result).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    });
  });

  it('returns the initial value when given an empty array', () => {
    const result = groupBy([], (item) => item, {});
    expect(result).toEqual({});
  });

  it('can group numbers by even/odd', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'), {
      even: [],
      odd: [],
    });
    expect(result).toEqual({
      even: [2, 4],
      odd: [1, 3, 5],
    });
  });

  it('does not mutate the initial value object', () => {
    const initial = { x: [] };
    groupBy([{ a: 1 }], () => 'x', initial);
    expect(initial).toEqual({ x: [] });
  });

  it('handles grouping when all items have the same key', () => {
    const data = [{ x: 1 }, { x: 2 }];
    const result = groupBy(data, () => 'same', {
      same: [],
    });
    expect(result).toEqual({
      same: [{ x: 1 }, { x: 2 }],
    });
  });

  it('handles grouping when each item has a unique key', () => {
    const data = [{ id: 'a' }, { id: 'b' }];
    const result = groupBy(data, (item) => item.id, {});
    expect(result).toEqual({
      a: [{ id: 'a' }],
      b: [{ id: 'b' }],
    });
  });

  it('handles objects with fields of different types', () => {
    const result = groupBy(
      [
        { type: 'number', value: 1 },
        { type: 'string', value: 'hello' },
        { type: 'number', value: 2 },
      ],
      (item) => item.type,
      {
        number: [],
        string: [],
      }
    );
    expect(result).toEqual({
      number: [
        { type: 'number', value: 1 },
        { type: 'number', value: 2 },
      ],
      string: [{ type: 'string', value: 'hello' }],
    });
  });
});
