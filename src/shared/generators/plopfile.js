const moduleGenerator = require('./modules')
const useCasesGenerator = require('./useCases')
const seedGenerator = require('./seeds')
const migrationGenerator = require('./migrations')
const middlewareGenerator = require('./middlewares')
const generator = require('./_generator')
const startGenerator = require('./start')

module.exports = function (plop) {
  plop.setGenerator('Modules', moduleGenerator)
  plop.setGenerator('UseCases', useCasesGenerator)
  plop.setGenerator('Migration', migrationGenerator)
  plop.setGenerator('Seed', seedGenerator)
  plop.setGenerator('Middleware', middlewareGenerator)
  plop.setGenerator('Generator', generator)
  plop.setGenerator('Start', startGenerator)
}
