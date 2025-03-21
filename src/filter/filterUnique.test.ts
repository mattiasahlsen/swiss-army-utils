import { filterUnique } from './filterUnique.js';

describe('filterUnique', () => {
  test('removes duplicates', () => {
    const items = [
      { id: '1', name: 'a' },
      { id: '2', name: 'b' },
      { id: '1', name: 'c' },
    ];
    const result = filterUnique(items, (item) => item.id);
    expect(result).toEqual([
      { id: '1', name: 'c' },
      { id: '2', name: 'b' },
    ]);
  });
});
