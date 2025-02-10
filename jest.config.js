const { defaults: tsjPreset } = require("ts-jest/presets");

/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  ...tsjPreset,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: false
    }]
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/utils/setup.ts"]
};
