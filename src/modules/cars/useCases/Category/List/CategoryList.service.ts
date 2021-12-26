import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategoriesRepositoryProps from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CategoryListService {
  constructor (
    @inject('CategoriesRepository')
    private repository: ICategoriesRepositoryProps) {}

  async execute (): Promise<Category[]> {
    return this.repository.list()
  }
}

export default CategoryListService