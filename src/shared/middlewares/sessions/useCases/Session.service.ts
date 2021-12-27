import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'

import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'

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
export default class SessionService {
  constructor (
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  async execute ({ email, password }: Request): Promise<Response> {
    const user = await this.repository.findByEmail({ email })

    if (!user) throw new AppError('User or password incorrect')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('User or password incorrect')

    const token = sign({}, process.env.JWT_TOKEN, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES
    })

    const useCaseReturn: Response = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return useCaseReturn
  }
}
