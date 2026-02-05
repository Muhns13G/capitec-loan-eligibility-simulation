import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  globalSetup: '<rootDir>/jest.global-setup.ts',
};

export default config;
