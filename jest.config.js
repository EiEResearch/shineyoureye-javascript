module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/api/node_modules/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^api/(.*)$': '<rootDir>/api/$1',
    '^home/(.*)$': '<rootDir>/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/**/*.(spec|test).(js|jsx|ts|tsx)|**/tests/*.(spec|test).(js|jsx|ts|tsx)',
    '**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    '**/api/tests/**/*.(spec|test).(js|jsx|ts|tsx)|**/api/tests/*.(spec|test).(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '**/src/app/**/*.{js,vue}',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/api/node_modules/**',
    '!<rootDir>/api/routes/**',
    '!<rootDir>/api/server.js',
    '!<rootDir>/bin/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/src/plugins/**',
    '!**/(*.config|.eslintrc).js',
    '!**/src/(main|router).js',
    '!**/src/**/_*.js',
  ],
  coverageReporters: ['lcov', 'text-summary'],
};
