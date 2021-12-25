import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

interface IRequestProps {
  name: string
  description: string
}

@injectable()
class CategoryCreateService {
  constructor (
    @inject('CategoriesRepository')
    private repository:ICategoriesRepositoryProps) {}

  async execute ({ name, description }:IRequestProps): Promise<void> {
    const findCategory = await this.repository.findByName({ name })

    if (findCategory) throw new AppError('category already exists')

    await this.repository.create({ name, description })
  }
}

export { CategoryCreateService }
