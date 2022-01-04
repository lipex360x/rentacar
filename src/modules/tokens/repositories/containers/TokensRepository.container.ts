import { container } from 'tsyringe'

import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import TokensRepository from '@modules/tokens/infra/typeorm/repositories/Tokens.repository'

container.registerSingleton<ITokens>(
  'TokensRepository',
  TokensRepository
)

export default container
