const jestConfig = require('./jest.config');

const config = {
  ...jestConfig,
  testMatch: ['<rootDir>/src/infra/http/routes/*.test.js'],
  collectCoverageFrom: ['src/**/*.routes.js'],
};

module.exports = config;