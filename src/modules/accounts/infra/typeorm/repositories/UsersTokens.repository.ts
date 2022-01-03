import { Repository, getRepository } from 'typeorm'

import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens.entity'
import IUsersTokens, { CreateProps, FindByIdProps, UpdateProps } from '@modules/accounts/repositories/interfaces/IUsersTokens.interface'

export default class UsersTokensRepository implements IUsersTokens {
  private repository: Repository<UserTokens>

  constructor () {
    this.repository = getRepository(UserTokens)
  }

  async create ({ user_id, expires_date, refresh_token }: CreateProps): Promise<UserTokens> {
    const userTokens = this.repository.create({ user_id, expires_date, refresh_token })

    await this.repository.save(userTokens)

    return userTokens
  }

  async findById ({ id }: FindByIdProps): Promise<UserTokens> {
    return this.repository.findOne({ id })
  }

  async findAll (): Promise<UserTokens[]> {
    return this.repository.find()
  }

  async update ({ userTokens }: UpdateProps): Promise<UserTokens> {
    let findUserTokens = await this.repository.findOne(userTokens.id)

    findUserTokens = { ...userTokens }

    await this.repository.save(findUserTokens)

    return findUserTokens
  }
}
