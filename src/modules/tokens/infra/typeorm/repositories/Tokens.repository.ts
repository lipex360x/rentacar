import { Repository, getRepository } from 'typeorm'

import Token from '@modules/tokens/infra/typeorm/entities/Token.entity'
import ITokens, { CreateProps, FindByIdProps, UpdateProps, DeleteProps, FindByTokenProps, FindByUserIdProps } from '@modules/tokens/repositories/interfaces/ITokens.interface'

export default class TokensRepository implements ITokens {
  private repository: Repository<Token>

  constructor () {
    this.repository = getRepository(Token)
  }

  async create ({ token, user_id, type, expire_date }: CreateProps): Promise<Token> {
    const newToken = this.repository.create({ token, user_id, type, expire_date })

    await this.repository.save(newToken)

    return newToken
  }

  async findById ({ id }: FindByIdProps): Promise<Token> {
    return this.repository.findOne({ id })
  }

  async findAll (): Promise<Token[]> {
    return this.repository.find()
  }

  async findByToken ({ token }: FindByTokenProps): Promise<Token> {
    return this.repository.findOne({ token })
  }

  async findByUserId ({ user_id }: FindByUserIdProps): Promise<Token> {
    return this.repository.findOne({ user_id })
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
