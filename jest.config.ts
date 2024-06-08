import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: `./`,
});

const config: Config = {
  coverageProvider: `v8`,
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
};

export default createJestConfig(config);
