module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/styles/__mocks__/styleMock.js',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
}
};