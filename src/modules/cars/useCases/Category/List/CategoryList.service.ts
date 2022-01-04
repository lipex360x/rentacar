import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategories from '@modules/cars/repositories/interfaces/ICategories.interface'
import { inject, injectable } from 'tsyringe'

@injectable()
class CategoryListService {
  constructor (
    @inject('CategoriesRepository')
    private repository: ICategories) {}

  async execute (): Promise<Category[]> {
    return this.repository.list()
  }
}

export default CategoryListService
