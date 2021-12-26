const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  bail: true,

  clearMocks: true,
  
  // collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/**/*.ts'],
  
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  
  preset: 'ts-jest',
  
  testEnvironment: 'node',
  
  testMatch: ['**/*.spec.ts'],
  
  testPathIgnorePatterns: ['/node_modules/', '/src/shared/utils/'],

  collectCoverage: true,
  
  coverageProvider: "v8",
  
  coverageDirectory: 'coverage',
  
  coveragePathIgnorePatterns: [
    '/node_modules/', 
    '/src/shared/utils/', 
    '/src/shared/*/',

    '/src/modules/accounts/infra/*',
    '/src/modules/accounts/repositories/*'
  ],
  
  coverageReporters: ['text-summary','lcov']
}
