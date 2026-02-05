import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/integration/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  globalSetup: '<rootDir>/jest.integration.setup.js',
  globalTeardown: '<rootDir>/jest.integration.teardown.js',
  setupFiles: ['<rootDir>/jest.integration.env.js'],
};

export default createJestConfig(customJestConfig);
