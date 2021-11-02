import { Category } from '@modules/cars/entities/Category'
import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

class CategoryListService {
  constructor (private repository: ICategoriesRepositoryProps) {}

  async execute (): Promise<Category[]> {
    return this.repository.list()
  }
}

export { CategoryListService }
