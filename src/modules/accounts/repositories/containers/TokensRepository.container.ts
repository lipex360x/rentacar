import { container } from 'tsyringe'

import ITokens from '@modules/accounts/repositories/interfaces/ITokens.interface'
import TokensRepository from '@modules/accounts/infra/typeorm/repositories/Tokens.repository'

container.registerSingleton<ITokens>(
  'TokensRepository',
  TokensRepository
)

export default container
