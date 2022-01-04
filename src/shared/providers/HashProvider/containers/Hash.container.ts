import { container } from 'tsyringe'

import IHash from '../interface/IHash.interface'
import BcryptProvider from '../implementations/Bcrypt.implementation'

container.registerSingleton<IHash>(
  'HashProvider',
  BcryptProvider
)

export default container
