import Token from '@modules/accounts/infra/typeorm/entities/Token.entity'
import ITokens, { CreateProps, FindByIdProps, UpdateProps, DeleteProps } from '@modules/accounts/repositories/interfaces/ITokens.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'

export default class FakeAccountsRepository implements ITokens {
  private repository: Token[] = []

  constructor (
    private dateProvider: IDateProvider
  ) {}

  async create ({ data }:CreateProps): Promise<Token> {
    const token = new Token()

    Object.assign(token, {
      ...token,
      data,
      created_at: this.dateProvider.dateNow(),
      updated_at: this.dateProvider.dateNow()
    })

    this.repository.push(token)

    return token
  }

  async findById ({ id }: FindByIdProps): Promise<Token> {
    return this.repository.find(findToken => findToken.id === id)
  }

  async findAll (): Promise<Token[]> {
    return this.repository
  }

  async update ({ token }: UpdateProps): Promise<Token> {
    const index = this.repository.findIndex(findToken => findToken.id === token.id)

    this.repository[index] = token

    return token
  }

  async delete ({ id }: DeleteProps): Promise<Token> {
    const token = this.repository.find(repo => repo.id === id)

    this.repository = this.repository.filter(repo => repo.id !== id)

    return token
  }
}
