import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import JSON5 from 'json5';
const config = JSON5.parse(fs.readFileSync('./tsconfig.json', { encoding: 'utf-8' }));

// console.log( pathsToModuleNameMapper(config.compilerOptions.paths /*, { prefix: '<rootDir>/' } */));

const jestConfig: JestConfigWithTsJest = {
  // preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>'],
  modulePaths: [config.compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: { '^@[/](.*)$': '<rootDir>/src/$1' },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    // '^.+\\.module.js$': [
    //   'ts-jest',
    //   {
    //     useESM: true,
    //   },
    // ],
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
