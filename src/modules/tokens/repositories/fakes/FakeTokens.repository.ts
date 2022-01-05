import Token from '@modules/tokens/infra/typeorm/entities/Token.entity'
import ITokens, { CreateProps, FindByIdProps, UpdateProps, DeleteProps, FindByTokenProps, FindByUserIdProps } from '@modules/tokens/repositories/interfaces/ITokens.interface'

export default class FakeAccountsRepository implements ITokens {
  private repository: Token[] = []

  async create ({ token, user_id, type, expire_date }:CreateProps): Promise<Token> {
    const newToken = new Token()

    Object.assign(newToken, {
      ...newToken,
      token,
      user_id,
      type,
      expire_date,
      created_at: new Date()
    })

    this.repository.push(newToken)

    return newToken
  }

  async findById ({ id }: FindByIdProps): Promise<Token> {
    return this.repository.find(findToken => findToken.id === id)
  }

  async findByToken ({ token }: FindByTokenProps): Promise<Token> {
    return this.repository.find(findToken => findToken.token === token)
  }

  async findByUserId ({ user_id }: FindByUserIdProps): Promise<Token> {
    return this.repository.find(findToken => findToken.user_id === user_id)
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
