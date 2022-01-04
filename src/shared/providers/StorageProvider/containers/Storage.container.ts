import { container } from 'tsyringe'

import IStorage from '../interface/IStorage.interface'
import DiskStorage from '../implementations/DiskStorage.implementation'

container.registerSingleton<IStorage>(
  'StorageProvider',
  DiskStorage
)

export default container
