import Token from '@modules/accounts/infra/typeorm/entities/Token.entity'

export interface CreateProps {
  data: string
}

export interface FindByIdProps {
  id: string
}

export interface UpdateProps {
  token: Token
}

export interface DeleteProps {
  id: string
}

export default interface ITokens {
  create(data: CreateProps): Promise<Token>
  findById(data: FindByIdProps): Promise<Token>
  findAll(): Promise<Token[]>
  update(data: UpdateProps): Promise<Token>
  delete(data: DeleteProps): Promise<Token>
}
