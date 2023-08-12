import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|scss)$": "<rootDir>/fileMock.ts",
	},
};

export default config;
