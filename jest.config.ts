import nextJest from "next/jest.js";
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
  dir: `./`,
});

const config = async () => {
  const server = createJestConfig({
    displayName: `server`,
    testEnvironment: `node`,
    preset: `ts-jest`,
    testMatch: [`<rootDir>/src/server/**/?(*.)+(spec|test).[jt]s?(x)`],
    setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: `<rootDir>/`,
    }),
  });

  const client = createJestConfig({
    displayName: `client`,
    testEnvironment: `jsdom`,
    preset: `ts-jest`,
    testMatch: [`<rootDir>/src/client/**/?(*.)+(spec|test).[jt]s?(x)`],
    setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: `<rootDir>/`,
    }),
  });

  return {
    coverageProvider: `v8`,
    projects: [await server(), await client()],
  } satisfies Config;
};

export default config();
