import { Category } from '@modules/cars/model/Category'
import { ICategoriesRepositoryProps, ICreateProps, IFindByNameProps } from '../interfaces/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepositoryProps {
  private categories: Category[]

  constructor () {
    this.categories = []
  }

  create ({ name, description }: ICreateProps): void {
    const category = new Category()

    const findCategory = this.findByName({ name })

    if (findCategory) throw new Error('Category already exists')

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }

  findByName ({ name }: IFindByNameProps): Category {
    const getCategory = this.categories.find((category) => category.name === name)

    return getCategory
  }

  list (): Category[] {
    return this.categories
  }
}

export { CategoriesRepository }
