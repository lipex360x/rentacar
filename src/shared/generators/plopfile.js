const moduleGenerator = require('./modules/index')
const seedGenerator = require('./seed/index')
const migrationGenerator = require('./migrations/index')

module.exports = function (plop) {
  plop.setGenerator('Migration', migrationGenerator)
  plop.setGenerator('Modules', moduleGenerator)
  plop.setGenerator('Seed', seedGenerator)
}
