const crypto = require("crypto");

const capitalize = (word) => {
  const lower = word.toLowerCase()
  
  return word.charAt(0).toUpperCase() + lower.slice(1)
}

const textToPascal = (word) => {
  const pascal = word.replace(/([-_ ]\w)/g, text => text[1].toUpperCase())
  
  return capitalize(pascal)
}

const generateId = (size = 20) => {
  return crypto.randomBytes(size).toString('hex')
}

module.exports = { capitalize, textToPascal, generateId }
