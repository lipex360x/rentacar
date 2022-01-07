const moduleGenerator = require('./modules/typeorm')
const useCasesGenerator = require('./useCases')
const seedGenerator = require('./seeds')
const migrationGenerator = require('./migrations')
const middlewareGenerator = require('./middlewares')
const providerGenerator = require('./providers')
const generator = require('./_generator')
const startGenerator = require('./start')

module.exports = function (plop) {
  plop.setGenerator('Module - TypeORM', moduleGenerator)
  plop.setGenerator('UseCase', useCasesGenerator)
  plop.setGenerator('Migration', migrationGenerator)
  plop.setGenerator('Seed', seedGenerator)
  plop.setGenerator('Middleware', middlewareGenerator)
  plop.setGenerator('Provider', providerGenerator)
  plop.setGenerator('Generator', generator)
  plop.setGenerator('Start', startGenerator)
}
