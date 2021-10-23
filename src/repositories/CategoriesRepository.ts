import { Category } from '../model/Category'

interface ICategoryProps {
  name: string,
  description: string
}

class CategoriesRepository {
  private categories: Category[]

  constructor () {
    this.categories = []
  }

  create ({ name, description }:ICategoryProps): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  list (): Category[] {
    return this.categories
  }

  findByName (name: string): Category {
    const getCategory = this.categories.find((category) => category.name === name)
    return getCategory
  }
}

export { CategoriesRepository }
