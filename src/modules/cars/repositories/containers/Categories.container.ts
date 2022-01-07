import { container } from 'tsyringe'

import ICategoriesRepository from '../interfaces/ICategories.interface'
import CategoriesRepository from '../../infra/typeorm/repositories/Categories.repository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

export default container
