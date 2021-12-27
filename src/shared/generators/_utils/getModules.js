const fs = require('fs')

const getModules = (dir) => fs.readdirSync(dir, {
  withFileTypes: true
}).reduce((a, c) => {
  c.isDirectory() && a.push(c.name)
  return a
}, [])

module.exports = getModules
