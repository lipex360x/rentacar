import Category from '@modules/cars/infra/typeorm/entities/Category'

export interface ICreateProps {
  name: string
  description: string
}

export interface IFindByNameProps {
  name: string
}

export default interface ICategoriesRepositoryProps {
  create(data: ICreateProps): Promise<Category>
  findByName(data: IFindByNameProps): Promise<Category>
  list(): Promise<Category[]>
}
