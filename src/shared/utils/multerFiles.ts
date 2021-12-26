/* eslint-disable no-useless-escape */

import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

import fs from 'fs'

interface UploadFileProps {
  folder: string
}

interface DeleteFileProps {
  fileName: string
}

function uploadFile ({ folder }: UploadFileProps) {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', folder),

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

async function deleteFile ({ fileName }:DeleteFileProps): Promise<string> {
  try { await fs.promises.stat(fileName) } catch { return }

  await fs.promises.unlink(fileName)

  return fileName
}

export { uploadFile, deleteFile }
