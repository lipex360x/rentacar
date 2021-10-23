import { Category } from 'model/Category'

import { ICategoriesRepository, ICreateProps, IFindyByNameProps } from './ICategoriesRepository'

class PostgresCategoriesRepository implements ICategoriesRepository {
  create ({ name, description }: ICreateProps): void {
    console.log(name, description)
    return null
  }
  findByName ({ name }: IFindyByNameProps): Category {
    console.log(name)
    return null
  }
  list (): Category[] {
    return null
  }
}

export { PostgresCategoriesRepository }
