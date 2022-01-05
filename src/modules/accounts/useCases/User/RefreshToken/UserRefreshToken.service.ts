import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'

import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import IDate from '@shared/providers/DateProvider/interface/IDate.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'

interface Request {
  token: string
}

interface Response {
  user: {
    name: string,
    email: string
  },
  token: string
  refreshToken: string
}

@injectable()
export default class UserRefreshTokenService {
  constructor (
    @inject('DateProvider')
    private dateProvider: IDate,

    @inject('HashProvider')
    private hashProvider: IHash,

    @inject('UsersRepository')
    private usersRepository: IUsers,

    @inject('TokensRepository')
    private tokensRepository: ITokens
  ) {}

  async execute ({ token }: Request): Promise<Response> {
    const getToken = await this.tokensRepository.findByToken({ token })

    if (!getToken) throw new AppError('Invalid Token')

    const user = await this.usersRepository.findById({ id: getToken.user_id })

    if (!user) throw new AppError('Invalid User')

    const {
      JWT_TOKEN,
      JWT_EXPIRES,
      REFRESH_EXPIRES_DAYS
    } = process.env

    const jwtToken = sign({}, JWT_TOKEN, {
      subject: user.id,
      expiresIn: JWT_EXPIRES
    })

    await this.tokensRepository.delete({ id: getToken.id })

    const expireDate = this.dateProvider.addTime({ time: parseInt(REFRESH_EXPIRES_DAYS), unit: 'day' })
    const refreshToken = await this.hashProvider.generateHash()

    await this.tokensRepository.create({
      user_id: user.id,
      token: refreshToken,
      type: 'refreshToken',
      expire_date: expireDate
    })

    return {
      token: jwtToken,
      refreshToken: refreshToken,
      user: {
        name: user.name,
        email: user.email
      }
    }
  }
}
