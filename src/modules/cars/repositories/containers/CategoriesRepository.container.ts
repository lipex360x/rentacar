import { container } from 'tsyringe'

import ICategoriesRepository from '../interfaces/ICategoriesRepository'
import CategoriesRepository from '../../infra/typeorm/repositories/CategoriesRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

export default container
