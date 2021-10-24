import { ICategoriesRepositoryProps } from '../../repositories/interfaces/ICategoriesRepository'

interface IRequestProps {
  name: string
  description: string
}

class CategoryCreateService {
  constructor (private repository:ICategoriesRepositoryProps) {}

  execute ({ name, description }:IRequestProps) {
    const findCategory = this.repository.findByName({ name })

    if (findCategory) throw new Error('category already exists')

    this.repository.create({ name, description })
  }
}

export { CategoryCreateService }
