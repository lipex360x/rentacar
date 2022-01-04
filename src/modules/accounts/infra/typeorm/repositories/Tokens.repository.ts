import { Repository, getRepository } from 'typeorm'

import Token from '@modules/accounts/infra/typeorm/entities/Token.entity'
import ITokens, { CreateProps, FindByIdProps, UpdateProps, DeleteProps } from '@modules/accounts/repositories/interfaces/ITokens.interface'

export default class TokensRepository implements ITokens {
  private repository: Repository<Token>

  constructor () {
    this.repository = getRepository(Token)
  }

  async create ({ data }: CreateProps): Promise<Token> {
    const token = this.repository.create({ data })

    await this.repository.save(token)

    return token
  }

  async findById ({ id }: FindByIdProps): Promise<Token> {
    return this.repository.findOne({ id })
  }

  async findAll (): Promise<Token[]> {
    return this.repository.find()
  }

  async update ({ token }: UpdateProps): Promise<Token> {
    let findToken = await this.repository.findOne(token.id)

    findToken = { ...token }

    await this.repository.save(findToken)

    return findToken
  }

  async delete ({ id }: DeleteProps): Promise<Token> {
    const token = await this.repository.findOne({ id })

    await this.repository.delete(id)

    return token
  }
}
