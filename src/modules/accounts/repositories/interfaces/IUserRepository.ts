import User from '@modules/accounts/infra/typeorm/entities/User'

export interface CreateProps {
  id?: string
  name: string
  email: string
  password: string,
  driver_license: string,
  isAdmin?: boolean
  avatar?: string
}

export interface FindByEmailProps {
  email: string
}

export interface FindByIdProps {
  id: string
}

export default interface IUserRepository {
  create(data: CreateProps): Promise<User>
  findByEmail(data: FindByEmailProps): Promise<User>
  findById(data: FindByIdProps): Promise<User>
}
