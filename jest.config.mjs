import { createDefaultPreset } from 'ts-jest';

export default {
  ...createDefaultPreset(),
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
