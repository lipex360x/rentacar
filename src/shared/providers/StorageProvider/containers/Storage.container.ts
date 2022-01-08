import { container } from 'tsyringe'

import IStorage from '../interface/IStorage.interface'
import DiskStorage from '../implementations/DiskStorage.implementation'
import S3Storage from '../implementations/S3Storage.implementation'

container.registerSingleton<IStorage>(
  'StorageProvider',
  S3Storage
)

export default container
