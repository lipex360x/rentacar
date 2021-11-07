import { Repository, getRepository } from 'typeorm'

import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository, { CreateProps } from '@modules/accounts/repositories/interfaces/IUserRepository'

export default class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor () {
    this.repository = getRepository(User)
  }

  async create ({ name, email, password, isAdmin, driver_license }: CreateProps): Promise<User> {
    const user = this.repository.create({ name, email, password, isAdmin, driver_license })

    await this.repository.save(user)

    return user
  }
}
