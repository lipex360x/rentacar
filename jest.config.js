const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  bail: true,

  clearMocks: true,
  
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/useCases/**/**/*.ts',
    '!<rootDir>/src/modules/**/useCases/**/**/*.controller.ts',
    
    '<rootDir>/src/shared/middlewares/**/useCases/**/*.ts',
    '!<rootDir>/src/shared/middlewares/**/useCases/**/*.controller.ts',
  ],
  
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  
  preset: 'ts-jest',
  
  testEnvironment: 'node',
  
  testMatch: ['**/*.spec.ts'],
  
  testPathIgnorePatterns: ['/node_modules/', '/src/shared/utils/'],

  collectCoverage: true,
   
  coverageDirectory: 'coverage',
  
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  coverageReporters: ['text-summary', 'lcov']
}
