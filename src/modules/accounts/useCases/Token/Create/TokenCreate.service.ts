import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens.entity'
import IUsersTokens from '@modules/accounts/repositories/interfaces/IUsersTokens.interface'

interface Request {
  data: string
}

@injectable()
export default class TokenCreateService {
  constructor (
    @inject('UserstokensRepository')
    private repository: IUsersTokens
  ) {}

  async execute ({ data }: Request): Promise<UserTokens> {
    // To Do

    if (!true) throw new AppError('App Error')
  }
}
