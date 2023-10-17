/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgrMock.tsx',
  },
  setupFilesAfterEnv: [
    // is not part of RTL
    '@testing-library/jest-dom/extend-expect',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
