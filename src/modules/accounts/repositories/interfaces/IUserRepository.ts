import User from '@modules/accounts/infra/typeorm/entities/User'

export interface CreateProps {
  name: string
  email: string
  password: string,
  driver_license: string,
  isAdmin?: boolean
}

export interface FindByEmailProps {
  email: string
}

export default interface IUserRepository {
  create(data: CreateProps): Promise<User>
  findByEmail(data: FindByEmailProps): Promise<User>
}
