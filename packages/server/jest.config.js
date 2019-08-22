module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleNameMapper: {
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@db/(.*)": "<rootDir>/src/db/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@util/(.*)": "<rootDir>/src/util/$1"
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["**/*.test.(ts)"],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  }
};
