export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts']
};
