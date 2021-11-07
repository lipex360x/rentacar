import { container } from 'tsyringe'

import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'
import UserRepository from '@modules/accounts/infra/typeorm/repositories/UserRepository'

const provider = {
  user: UserRepository
}

container.registerSingleton<IUserRepository>(
  'UserRepository',
  provider.user
)
