/* eslint-disable no-useless-escape */
import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp')

const uploadsFolder = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

function multerConfig () {
  return {
    storage: multer.diskStorage({
      destination: tmpFolder,

      filename: (request, file, callback) => {
        const ext = /^.+\.([^.]+)$/.exec(file.originalname)
        let [name] = file.originalname.split(`.${ext[1]}`)

        name = name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/([^\w]+|\s+)/g, '-')
          .replace(/\-\-+/g, '-')
          .replace(/(^-+|-+$)/, '')
          .toLowerCase()

        const fileText = `${name}.${ext[1]}`

        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${fileText}`

        return callback(null, fileName)
      }
    })
  }
}

export {
  tmpFolder,
  uploadsFolder,
  multerConfig
}
