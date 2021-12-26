import { container } from 'tsyringe'
import ICategoriesRepositoryProps from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<ICategoriesRepositoryProps>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
