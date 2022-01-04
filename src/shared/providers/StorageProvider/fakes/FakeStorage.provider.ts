import IStorage, { DeleteFileProps, SaveFileProps } from '../interface/IStorage.interface'

interface StorageProps {
  file: string
}

export default class FakeStorageProvider implements IStorage {
  private storage: StorageProps[] = []

  async saveFile ({ file }: SaveFileProps): Promise<string> {
    this.storage.push({ file })

    return file
  }

  async deleteFile ({ file }: DeleteFileProps): Promise<void> {
    this.storage = this.storage.filter(getFile => getFile.file !== file)
  }
}
