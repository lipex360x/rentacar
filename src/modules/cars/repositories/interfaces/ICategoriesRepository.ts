import { Category } from '@modules/cars/infra/typeorm/entities/Category'

export interface ICreateProps {
  name: string
  description: string
}

export interface IFindByNameProps {
  name: string
}

export interface ICategoriesRepositoryProps {
  create(data: ICreateProps): Promise<void>
  findByName(data: IFindByNameProps): Promise<Category>
  list(): Promise<Category[]>
}
