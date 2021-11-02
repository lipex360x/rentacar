import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

interface IRequestProps {
  name: string
  description: string
}

class CategoryCreateService {
  constructor (private repository:ICategoriesRepositoryProps) {}

  async execute ({ name, description }:IRequestProps): Promise<void> {
    const findCategory = await this.repository.findByName({ name })

    if (findCategory) throw new Error('category already exists')

    this.repository.create({ name, description })
  }
}

export { CategoryCreateService }
