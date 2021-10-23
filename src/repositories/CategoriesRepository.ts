import { Category } from '../model/Category'
import { ICategoriesRepository, ICreateProps, IFindyByNameProps } from './ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  constructor () {
    this.categories = []
  }

  create ({ name, description }:ICreateProps): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  findByName ({ name }:IFindyByNameProps): Category {
    const getCategory = this.categories.find((category) => category.name === name)
    return getCategory
  }

  list (): Category[] {
    return this.categories
  }
}

export { CategoriesRepository }
