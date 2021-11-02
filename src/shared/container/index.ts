import { container } from 'tsyringe'
import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'

container.registerSingleton<ICategoriesRepositoryProps>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
