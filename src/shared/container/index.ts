import { container } from 'tsyringe'
import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'

container.registerSingleton<ICategoriesRepositoryProps>(
  'CategoriesRepository',
  CategoriesRepository
)
