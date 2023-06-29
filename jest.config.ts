import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': '@swc/jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  modulePaths: ['<rootDir>/src/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/react'],
  testEnvironment: 'jsdom',
};

export default config;
