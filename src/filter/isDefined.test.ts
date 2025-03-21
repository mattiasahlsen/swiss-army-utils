import { isDefined } from './isDefined.js';

describe('isDefined', () => {
  test.each([true, false, '', 0, 'heeh', {}, []])(
    'returns true if value is defined',
    (value) => {
      expect(isDefined(value)).toBe(true);
    }
  );

  test.each([undefined, null])(
    'returns false if value is not defined',
    (value) => {
      expect(isDefined(value)).toBe(false);
    }
  );
});
