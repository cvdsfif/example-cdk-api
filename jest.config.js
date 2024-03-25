module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['!tests/*', '!**/dist/**/*', '!tests/**/*'],
  coverageReporters: ['json-summary', 'text']
}
