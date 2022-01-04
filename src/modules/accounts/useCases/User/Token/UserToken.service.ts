import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Token from '@modules/accounts/infra/typeorm/entities/Token.entity'
import ITokens from '@modules/accounts/repositories/interfaces/ITokens.interface'

interface Request {
  data: string
}

@injectable()
export default class UserTokenService {
  constructor (
    @inject('TokensRepository')
    private repository: ITokens
  ) {}

  async execute ({ data }: Request): Promise<Token> {
    // To Do

    if (!true) throw new AppError('App Error')
  }
}
