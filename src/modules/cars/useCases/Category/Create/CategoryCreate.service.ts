import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import ICategoriesRepositoryProps from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import Category from '@modules/cars/infra/typeorm/entities/Category'

interface IRequestProps {
  name: string
  description: string
}

@injectable()
class CategoryCreateService {
  constructor (
    @inject('CategoriesRepository')
    private repository:ICategoriesRepositoryProps) {}

  async execute ({ name, description }:IRequestProps): Promise<Category> {
    const findCategory = await this.repository.findByName({ name })

    if (findCategory) throw new AppError('category already exists')

    return this.repository.create({ name, description })
  }
}

export default CategoryCreateService
