import { container } from 'tsyringe'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/Users.repository'

container.registerSingleton<IUsers>(
  'UsersRepository',
  UsersRepository
)

export default container
