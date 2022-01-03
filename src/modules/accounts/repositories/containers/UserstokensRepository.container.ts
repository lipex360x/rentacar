import { container } from 'tsyringe'

import IUsersTokens from '@modules/accounts/repositories/interfaces/IUsersTokens.interface'
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokens.repository'

container.registerSingleton<IUsersTokens>(
  'UsersTokensRepository',
  UsersTokensRepository
)

export default container
