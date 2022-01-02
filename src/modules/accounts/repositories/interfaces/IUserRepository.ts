import User from '@modules/accounts/infra/typeorm/entities/User'

export interface CreateProps {
  id?: string
  name: string
  email: string
  password: string,
  driver_license: string,
  isAdmin?: boolean
  isLessee?: boolean
  avatar?: string
}

export interface FindByEmailProps {
  email: string
}

export interface UpdateProps {
  user: User
}

export interface FindByIdProps {
  id: string
}

export default interface IUserRepository {
  create(data: CreateProps): Promise<User>
  update(data: UpdateProps): Promise<User>
  findById(data: FindByIdProps): Promise<User>
  findAll(): Promise<User[]>
  findByEmail(data: FindByEmailProps): Promise<User>
}
