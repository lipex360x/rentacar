import { Repository, getRepository } from 'typeorm'

import User from '@modules/accounts/infra/typeorm/entities/User.entity'
import IUsers, { CreateProps, FindByEmailProps, FindByIdProps, UpdateProps } from '@modules/accounts/repositories/interfaces/IUsers.interface'

export default class UsersRepository implements IUsers {
  private repository: Repository<User>

  constructor () {
    this.repository = getRepository(User)
  }

  async create ({ id, name, email, password, isAdmin, driver_license, avatar }: CreateProps): Promise<User> {
    const user = this.repository.create({ id, name, email, password, isAdmin, driver_license, avatar })

    await this.repository.save(user)

    return user
  }

  async findById ({ id }: FindByIdProps): Promise<User> {
    return this.repository.findOne({ id })
  }

  async findAll (): Promise<User[]> {
    return this.repository.find()
  }

  async update ({ user } : UpdateProps): Promise<User> {
    let findUser = await this.repository.findOne(user.id)

    findUser = { ...user }

    await this.repository.save(findUser)

    return findUser
  }

  async findByEmail ({ email }: FindByEmailProps): Promise<User> {
    const findUser = this.repository.findOne({ email })

    return findUser
  }
}
