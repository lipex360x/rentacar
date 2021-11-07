import { inject, injectable } from 'tsyringe'
// import AppError from '@shared/errors/AppError'

import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'

interface Request{
  name: string
  email: string
  password: string
  driver_license:string
  isAdmin?: boolean
}

@injectable()
export default class CreateUserService {
  constructor (
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  async execute ({ name, email, password, driver_license, isAdmin }: Request): Promise<User> {
    return this.repository.create({ name, email, password, driver_license, isAdmin })
  }
}
