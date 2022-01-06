import crypto from 'crypto'

const capitalize = (word: string) => {
  const lower = word.toLowerCase()

  return word.charAt(0).toUpperCase() + lower.slice(1)
}

const textToPascal = (word: string) => {
  const pascal = word.replace(/([-_ ]\w)/g, text => text[1].toUpperCase())

  return capitalize(pascal)
}

const generateId = (size = 20) => {
  return crypto.randomBytes(size).toString('hex')
}

const sanitize = (text: string) => {
  text = text.replace(/\uFEFF/g, '')
  text = text.replace(/[&\\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™ ]/g, '')

  const accentsMap = {
    a: 'á|à|ã|â|À|Á|Ã|Â',
    e: 'é|è|ê|É|È|Ê|ë|Ë',
    i: 'í|ì|î|Í|Ì|Î|ï|Ï',
    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    c: 'ç|Ç',
    n: 'ñ|Ñ'
  }

  return Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text)
}

export { capitalize, textToPascal, generateId, sanitize }
