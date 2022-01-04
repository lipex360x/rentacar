import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import IUser from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'

interface Request{
  name: string
  email: string
  password: string
  driver_license:string
  isAdmin?: boolean
}

interface Response {
  id: string
  name: string
  email: string
  driver_license:string
  isAdmin?: boolean
}

@injectable()
export default class UserCreateService {
  constructor (
    @inject('HashProvider')
    private hashProvider: IHash,

    @inject('UserRepository')
    private repository: IUser
  ) {}

  async execute ({ name, email, password, driver_license, isAdmin }: Request): Promise<Response> {
    const getUser = await this.repository.findByEmail({ email })

    if (getUser) throw new AppError('This user is already exists')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
      isAdmin
    })

    const response: Response = {
      id: user.id,
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      isAdmin: user.isAdmin
    }

    return response
  }
}
