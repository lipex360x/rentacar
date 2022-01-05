import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'
import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import IDate from '@shared/providers/DateProvider/interface/IDate.interface'

interface Request{
  email: string
  password: string
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
export default class UserLoginService {
  constructor (
    @inject('HashProvider')
    private hashProvider: IHash,

    @inject('DateProvider')
    private dateProvider: IDate,

    @inject('TokensRepository')
    private tokensRepository: ITokens,

    @inject('UsersRepository')
    private repository: IUsers
  ) {}

  async execute ({ email, password }: Request): Promise<Response> {
    const user = await this.repository.findByEmail({ email })

    if (!user) throw new AppError('User or password incorrect')

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatch) throw new AppError('User or password incorrect')

    const {
      JWT_TOKEN,
      JWT_EXPIRES,
      REFRESH_EXPIRES_DAYS
    } = process.env

    const jwtToken = sign({}, JWT_TOKEN, {
      subject: user.id,
      expiresIn: JWT_EXPIRES
    })

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
