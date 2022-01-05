import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import IDate from '@shared/providers/DateProvider/interface/IDate.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'

interface Request {
  token: string
}

@injectable()
export default class UserRefreshTokenService {
  constructor (
    @inject('DateProvoder')
    private dateProvider: IDate,

    @inject('HashProvider')
    private hashProvider: IHash,

    @inject('UsersRepository')
    private usersRepository: IUsers,

    @inject('TokensRepository')
    private tokensRepository: ITokens
  ) {}

  async execute ({ token }: Request): Promise<string> {
    const getToken = await this.tokensRepository.findByToken({ token })

    if (!getToken) throw new AppError('Invalid Token')

    const user = await this.usersRepository.findById({ id: getToken.user_id })

    if (!user) throw new AppError('Invalid User')

    const { REFRESH_EXPIRES_DAYS } = process.env

    await this.tokensRepository.delete({ id: getToken.id })

    const expireDate = this.dateProvider.addTime({ time: parseInt(REFRESH_EXPIRES_DAYS), unit: 'day' })
    const refreshToken = await this.hashProvider.generateHash()

    await this.tokensRepository.create({
      user_id: user.id,
      token: refreshToken,
      type: 'refreshToken',
      expire_date: expireDate
    })

    return refreshToken
  }
}
