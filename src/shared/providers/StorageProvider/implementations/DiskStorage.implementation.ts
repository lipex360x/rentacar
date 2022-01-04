import fs from 'fs'
import path from 'path'
import { tmpFolder, uploadsFolder } from '@shared/config'

import IStorageProvider, { DeleteFileProps, SaveFileProps } from '../interface/IStorage.interface'

class DiskStorage implements IStorageProvider {
  async saveFile ({ file }: SaveFileProps): Promise<string> {
    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(uploadsFolder, file)
    )

    return file
  }

  async deleteFile ({ file }: DeleteFileProps): Promise<void> {
    try { await fs.promises.stat(path.resolve(uploadsFolder, file)) } catch { return }

    await fs.promises.unlink(file)
  }
}

export default DiskStorage
