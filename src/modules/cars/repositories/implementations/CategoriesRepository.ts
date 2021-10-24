import { Category } from '@modules/cars/model/Category'
import { ICategoriesRepositoryProps, ICreateProps, IFindByNameProps } from '../interfaces/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepositoryProps {
  private static INSTANCE: CategoriesRepository

  private categories: Category[]

  public static getInstance (): CategoriesRepository {
    if (!this.INSTANCE) this.INSTANCE = new CategoriesRepository()

    return this.INSTANCE
  }

  private constructor () {
    this.categories = []
  }

  create ({ name, description }: ICreateProps): void {
    const category = new Category()

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
