import { pluckIds } from './pluckIds.js';

describe('pluckIds', () => {
  test('returns an array of ids', () => {
    const items = [
      {
        id: '1',
        name: 'Item 1',
      },
      {
        id: '2',
        name: 'Item 2',
      },
      {
        id: '3',
        name: 'Item 3',
      },
    ];

    expect(pluckIds(items, (item) => item.id)).toEqual(['1', '2', '3']);
  });

  test('returns an array of unique ids', () => {
    const items = [
      {
        id: '1',
        name: 'Item 1',
      },
      {
        id: '2',
        name: 'Item 2',
      },
      {
        id: '3',
        name: 'Item 3',
      },
      {
        id: '1',
        name: 'Item 1',
      },
    ];

    expect(pluckIds(items, (item) => item.id)).toEqual(['1', '2', '3']);
  });

  test('removes null and undefined ids', () => {
    const items = [
      {
        id: '1',
        name: 'Item 1',
      },
      {
        id: '2',
        name: 'Item 2',
      },
      {
        id: '3',
        name: 'Item 3',
      },
      {
        id: null,
        name: 'Item 1',
      },
      {
        id: undefined,
        name: 'Item 1',
      },
    ];

    expect(pluckIds(items, (item) => item.id)).toEqual(['1', '2', '3']);
  });

  test('returns an array of unique ids from nested arrays', () => {
    const items = [
      {
        id: '1',
        name: 'Item 1',
        children: [
          {
            id: '2',
            name: 'Item 2',
          },
          {
            id: '3',
            name: 'Item 3',
          },
        ],
      },
      {
        id: '2',
        name: 'Item 2',
      },
      {
        id: '3',
        name: 'Item 3',
      },
    ];

    expect(pluckIds(items, (item) => item.id)).toEqual(['1', '2', '3']);
  });

  test('works with number ids', () => {
    const items = [
      {
        id: 1,
        name: 'Item 1',
      },
      {
        id: 2,
        name: 'Item 2',
      },
      {
        id: 3,
        name: 'Item 3',
      },
    ];

    expect(pluckIds(items, (item) => item.id)).toEqual([1, 2, 3]);
  });
});
