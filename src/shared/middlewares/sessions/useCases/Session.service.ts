import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'

import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'
import IHashProvider from '@shared/providers/HashProvider/interface/IHash.interface'
import IUsersTokens from '@modules/accounts/repositories/interfaces/IUsersTokens.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'

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
  refresh_token: string
}

@injectable()
export default class SessionService {
  constructor (
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('UsersTokensRepository')
    private tokenRepository: IUsersTokens
  ) {}

  async execute ({ email, password }: Request): Promise<Response> {
    const user = await this.repository.findByEmail({ email })

    if (!user) throw new AppError('User or password incorrect')

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatch) throw new AppError('User or password incorrect')

    const {
      JWT_TOKEN,
      JWT_EXPIRES,
      REFRESH_TOKEN,
      REFRESH_EXPIRES,
      REFRESH_EXPIRES_DAYS
    } = process.env

    const token = sign({}, JWT_TOKEN, {
      subject: user.id,
      expiresIn: JWT_EXPIRES
    })

    console.log(REFRESH_TOKEN, REFRESH_EXPIRES)

    const refresh_token = sign({ email }, REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: REFRESH_EXPIRES
    })

    const expires_date = this.dateProvider.addTime({ time: parseInt(REFRESH_EXPIRES_DAYS), unit: 'day' })
    await this.tokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date
    })

    const useCaseReturn: Response = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return useCaseReturn
  }
}
