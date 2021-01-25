const { join } = require("path")
const packageConfig = require('./package.json')

module.exports = {
  displayName: packageConfig.name,
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testMatch: [join(__dirname, "tests/**/*.spec.{ts,tsx}")]
}
