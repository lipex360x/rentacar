import { container } from 'tsyringe'

import IHashProvider from '../interface/IHash.interface'
import BcryptProvider from '../implementations/Bcrypt.implementation'

container.registerSingleton<IHashProvider>(
  'IHashProvider',
  BcryptProvider
)

export default container
