import { asTuple } from './asTuple.js';

describe('asTuple', () => {
  test('result becomes a tuple', () => {
    asTuple([1, 2, 3]) satisfies [number, number, number];
  });
});
