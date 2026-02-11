import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next',
    '<rootDir>/src/__tests__/integration',
    '<rootDir>/e2e',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/app/**/layout.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 44,
      functions: 45,
      lines: 45,
      statements: 45,
    },
  },
  testMatch: ['**/__tests__/unit/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default createJestConfig(customJestConfig);
