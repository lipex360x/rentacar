import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens.entity'

export interface CreateProps {
  user_id: string
  expires_date: Date
  refresh_token: string
}

export interface FindByIdProps {
  id: string
}

export interface UpdateProps {
  userTokens: UserTokens
}

export default interface IUsersTokens {
  create(data: CreateProps): Promise<UserTokens>
  findById(data: FindByIdProps): Promise<UserTokens>
  findAll(): Promise<UserTokens[]>
  update(data: UpdateProps): Promise<UserTokens>
}
