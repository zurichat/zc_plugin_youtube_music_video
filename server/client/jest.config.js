module.exports = {
	rootDir: ".",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(j|t)sx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.svg$": "<rootDir>/src/tests/svgTransform.js"
	},
	moduleNameMapper: {
		"\\.(css)$": "identity-obj-proxy",
		"single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs"
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
	setupFiles: ["<rootDir>/src/tests/setupTests.js"],
	testRegex: "/*.test.tsx$",
	collectCoverage: true,
	coverageReporters: ["lcov"],
	coverageDirectory: "test-coverage",
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0
		}
	},
	moduleDirectories: ["node_modules", "src"]
};
