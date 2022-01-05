import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'

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
}

@injectable()
export default class UserLoginService {
  constructor (
    @inject('HashProvider')
    private hashProvider: IHash,

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
      JWT_EXPIRES
    } = process.env

    const token = sign({}, JWT_TOKEN, {
      subject: user.id,
      expiresIn: JWT_EXPIRES
    })

    return {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }
  }
}
