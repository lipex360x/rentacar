import { container } from 'tsyringe'

import IStorageProvider from '../interface/IStorage.interface'
import DiskStorage from '../implementations/DiskStorage.implementation'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorage
)

export default container
