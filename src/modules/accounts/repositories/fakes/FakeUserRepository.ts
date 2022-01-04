import User from '@modules/accounts/infra/typeorm/entities/User'
import IUserRepository, { CreateProps, FindByEmailProps, FindByIdProps, UpdateProps } from '../interfaces/IUserRepository'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'

export default class FakeUserRepository implements IUserRepository {
  private repository: User[] = []

  constructor (
    private dateProvider: IDateProvider
  ) {}

  async create ({ name, email, password, isAdmin, driver_license, isLessee }:CreateProps): Promise<User> {
    const user = new User()

    Object.assign(user, {
      ...user,
      name,
      email,
      password,
      isAdmin,
      driver_license,
      isLessee,
      created_at: this.dateProvider.dateNow(),
      updated_at: this.dateProvider.dateNow()
    })

    this.repository.push(user)

    return user
  }

  async findById ({ id }: FindByIdProps): Promise<User> {
    return this.repository.find(user => user.id === id)
  }

  async findAll (): Promise<User[]> {
    return this.repository
  }

  async update ({ user }: UpdateProps): Promise<User> {
    const getIndex = this.repository.findIndex((getUser) => getUser.id === user.id)

    this.repository[getIndex] = user

    return user
  }

  async findByEmail ({ email }: FindByEmailProps): Promise<User> {
    const getUser = this.repository.find(user => user.email === email)

    return getUser
  }
}
