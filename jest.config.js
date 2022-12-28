/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // [...]
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm:['.ts'],
  transformIgnorePatterns:[],
  transform: {
    '^.+\\.[tj]sx?$':['ts-jest'], // to process js/ts with `ts-jest`
    '^.+\\.m?[tj]sx?$':['ts-jest'], // to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
}