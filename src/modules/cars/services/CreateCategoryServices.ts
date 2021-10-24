import { ICategoriesRepositoryProps } from '../repositories/interfaces/ICategoriesRepository'

interface IRequestProps {
  name: string
  description: string
}

class CreateCategoryServices {
  constructor (private repository:ICategoriesRepositoryProps) {}

  execute ({ name, description }:IRequestProps) {
    this.repository.create({ name, description })
  }
}

export { CreateCategoryServices }
