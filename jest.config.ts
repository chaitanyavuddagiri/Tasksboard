import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"\\.(css|less|scss)$": "fileMock.ts",
	},
};

export default config;
