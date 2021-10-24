import { Category } from '@modules/cars/model/Category'

export interface ICreateProps {
  name: string
  description: string
}

export interface IFindByNameProps {
  name: string
}

export interface ICategoriesRepositoryProps {
  create(data: ICreateProps): void
  findByName(data: IFindByNameProps): Category
  list(): Category[]
}
