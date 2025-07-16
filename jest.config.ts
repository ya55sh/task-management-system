// jest.config.ts
import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js", "json"],
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
	roots: ["<rootDir>/src/tests"],
};

export default config;
