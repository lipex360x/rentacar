import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

import fs from 'fs'

function uploadFile (folder: string) {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', folder),

      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex')

        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  }
}

const deleteFile = async (filename: string) => {
  const file = await fs.promises.stat(filename)

  if (file) await fs.promises.unlink(filename)
}

export { uploadFile, deleteFile }
