import { container } from 'tsyringe'

import ICarRepository from '../interfaces/ICarsRepository'
import CarsRepository from '../../infra/typeorm/repositories/CarsRepository'

container.registerSingleton<ICarRepository>(
  'CarsRepository',
  CarsRepository
)

export default container
