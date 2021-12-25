import { v4 as uuid } from 'uuid'

import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategoriesRepositoryProps, { ICreateProps, IFindByNameProps } from '../interfaces/ICategoriesRepository'

export default class FakeCategoryRepository implements ICategoriesRepositoryProps {
  private repository: Category[] = []

  async create ({ name, description }:ICreateProps): Promise<Category> {
    const category = new Category()

    Object.assign(category, {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(category)

    return category
  }

  async findByName ({ name }: IFindByNameProps): Promise<Category> {
    const getCategory = this.repository.find(category => category.name === name)

    return getCategory
  }

  async list (): Promise<Category[]> {
    return this.repository
  }
}
