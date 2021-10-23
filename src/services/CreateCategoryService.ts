import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequestProps {
  name: string
  description: string
}

class CreateCategoryService {
  constructor (private repository: ICategoriesRepository) {}

  execute ({ name, description }:IRequestProps): void {
    const getCategory = this.repository.findByName({ name })

    if (getCategory) throw new Error('Category already exists')

    this.repository.create({ name, description })
  }
}

export { CreateCategoryService }
