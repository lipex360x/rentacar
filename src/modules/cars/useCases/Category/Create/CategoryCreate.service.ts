import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import ICategories from '@modules/cars/repositories/interfaces/ICategories.interface'
import Category from '@modules/cars/infra/typeorm/entities/Category'

interface IRequestProps {
  name: string
  description: string
}

@injectable()
class CategoryCreateService {
  constructor (
    @inject('CategoriesRepository')
    private repository:ICategories) {}

  async execute ({ name, description }:IRequestProps): Promise<Category> {
    const findCategory = await this.repository.findByName({ name })

    if (findCategory) throw new AppError('category already exists')

    return this.repository.create({ name, description })
  }
}

export default CategoryCreateService
