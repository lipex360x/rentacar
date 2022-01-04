import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { v4 as uuid } from 'uuid'

import Token from '@modules/accounts/infra/typeorm/entities/Token.entity'
import ITokens from '@modules/accounts/repositories/interfaces/ITokens.interface'
import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'
import IMailProvider from '@shared/providers/MailProvider/interface/IMail.interface'

interface Request {
  email: string
}

@injectable()
export default class UserForgotPasswordService {
  // private tokenExpireTime: number = 3

  constructor (
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokensRepository')
    private tokenRepository: ITokens,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  // private async getToken (user: User, token: string) {
  //   const getToken = await this.tokenRepository.findByToken({ token })

  //   if (!getToken) throw new AppError('This token is invalid')

  //   const dateNow = this.dateProvider.dateNow()

  //   const tokenTime = this.dateProvider.compareDates({
  //     start_date: dateNow,
  //     end_date: getToken.created_at,
  //     unit: 'hour'
  //   })

  //   if (tokenTime >= this.tokenExpireTime) throw new AppError('This token is invalid')

  //   const setToken = {
  //     token: uuid(),
  //     user_id: user.id
  //   }

  //   return setToken
  // }

  async execute ({ email }: Request): Promise<Token> {
    const user = await this.userRepository.findByEmail({ email })

    if (!user) throw new AppError('User not found!')

    const token = await this.tokenRepository.findByUserId({ user_id: user.id })

    if (token) await this.tokenRepository.delete({ id: token.id })

    return this.tokenRepository.create({
      token: uuid(),
      user_id: user.id,
      type: 'forgotPassword'
    })
  }
}
