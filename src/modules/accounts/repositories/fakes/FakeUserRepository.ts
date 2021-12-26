import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository, { CreateProps, FindByEmailProps, FindByIdProps } from '../interfaces/IUserRepository'

export default class FakeUserRepository implements IUserRepository {
  private repository: User[] = []

  async create ({ name, email, password, isAdmin, driver_license }:CreateProps): Promise<User> {
    const user = new User()
    const passwordCrypted = await bcrypt.hash(password, 8)

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password: passwordCrypted,
      isAdmin,
      driver_license,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(user)

    return user
  }

  async findByEmail ({ email }: FindByEmailProps): Promise<User> {
    const getUser = this.repository.find(user => user.email === email)

    return getUser
  }

  async findById ({ id }: FindByIdProps): Promise<User> {
    const getUser = this.repository.find(user => user.id === id)

    return getUser
  }
}
