import { Category } from '@modules/cars/model/Category'
import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

class CategoryListService {
  constructor (private repository: ICategoriesRepositoryProps) {}

  execute (): Category[] {
    return this.repository.list()
  }
}

export { CategoryListService }
