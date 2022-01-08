import { container } from 'tsyringe'

import IStorage from '../interface/IStorage.interface'
import DiskStorage from '../implementations/DiskStorage.implementation'
import S3Storage from '../implementations/S3Storage.implementation'

const storage = {
  local: DiskStorage,
  S3: S3Storage
}

container.registerSingleton<IStorage>(
  'StorageProvider',
  storage[process.env.DISK_STORAGE]
)

export default container
