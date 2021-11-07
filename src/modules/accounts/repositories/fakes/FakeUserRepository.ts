import { v4 as uuid } from 'uuid'

import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository, { CreateProps } from '../interfaces/IUserRepository'

export default class FakeUserRepository implements IUserRepository {
  private repository: User[] = []

  async create ({ name, email, password, isAdmin, driver_license }:CreateProps): Promise<User> {
    const user = new User()

    Object.assign(user, {
      user_id: uuid(),
      name,
      email,
      password,
      isAdmin,
      driver_license,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(user)

    return user
  }
}
