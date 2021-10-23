import { Category } from '../model/Category'

export interface ICreateProps{
  name: string,
  description: string
}

export interface IFindyByNameProps {
  name: string
}

export interface ICategoriesRepository {
  create(data: ICreateProps): void
  findByName(data: IFindyByNameProps): Category
  list(): Category[]
}
