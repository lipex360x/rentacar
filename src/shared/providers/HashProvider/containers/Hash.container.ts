import { container } from 'tsyringe'

import IHashProvider from '../interface/IHash.interface'
import BcryptProvider from '../implementations/Bcrypt.implementation'

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptProvider
)

export default container
