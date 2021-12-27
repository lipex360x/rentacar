import { container } from 'tsyringe'

import ICategoriesRepositoryProps from './interfaces/ICategoriesRepository'
import CategoriesRepository from '../infra/typeorm/repositories/CategoriesRepository'

import ISpecificationsRepository from './interfaces/ISpecificationsRepository'
import SpecificationsRepository from '../infra/typeorm/repositories/SpecificationsRepository'

import ICarRepository from './interfaces/ICarsRepository'
import CarsRepository from '../infra/typeorm/repositories/CarsRepository'

container.registerSingleton<ICategoriesRepositoryProps>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<ICarRepository>(
  'CarsRepository',
  CarsRepository
)
