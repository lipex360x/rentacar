import { Repository, getRepository } from 'typeorm'

import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository, { CreateProps, FindByEmailProps, FindByIdProps, UpdateProps } from '@modules/accounts/repositories/interfaces/IUserRepository'

export default class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor () {
    this.repository = getRepository(User)
  }

  async create ({ id, name, email, password, isAdmin, driver_license, avatar }: CreateProps): Promise<User> {
    const user = this.repository.create({ id, name, email, password, isAdmin, driver_license, avatar })

    await this.repository.save(user)

    return user
  }

  async update ({ user } : UpdateProps): Promise<User> {
    let getUser = await this.repository.findOne(user.id)

    getUser = { ...user }

    await this.repository.save(getUser)

    return getUser
  }

  async findByEmail ({ email }: FindByEmailProps): Promise<User> {
    const getUser = this.repository.findOne({ email })

    return getUser
  }

  async findById ({ id }: FindByIdProps): Promise<User> {
    const getUser = this.repository.findOne({ id })

    return getUser
  }
}
