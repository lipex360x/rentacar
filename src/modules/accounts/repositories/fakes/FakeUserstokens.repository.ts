import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens.entity'
import IUsersTokens, { CreateProps, FindByIdProps, UpdateProps } from '@modules/accounts/repositories/interfaces/IUsersTokens.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'

export default class FakeAccountsRepository implements IUsersTokens {
  private repository: UserTokens[] = []

  constructor (
    private dateProvider: IDateProvider
  ) {}

  async create ({ user_id, expires_date, refresh_token }:CreateProps): Promise<UserTokens> {
    const userTokens = new UserTokens()

    Object.assign(userTokens, {
      ...userTokens,
      user_id,
      expires_date,
      refresh_token,
      created_at: this.dateProvider.dateNow(),
      updated_at: this.dateProvider.dateNow()
    })

    this.repository.push(userTokens)

    return userTokens
  }

  async findById ({ id }: FindByIdProps): Promise<UserTokens> {
    return this.repository.find(findUserTokens => findUserTokens.id === id)
  }

  async findAll (): Promise<UserTokens[]> {
    return this.repository
  }

  async update ({ userTokens }: UpdateProps): Promise<UserTokens> {
    const index = this.repository.findIndex(findUserTokens => findUserTokens.id === userTokens.id)

    this.repository[index] = userTokens

    return userTokens
  }
}
