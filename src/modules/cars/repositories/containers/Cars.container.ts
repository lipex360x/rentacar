import { container } from 'tsyringe'

import ICarRepository from '../interfaces/ICars.interface'
import CarsRepository from '../../infra/typeorm/repositories/Cars.repository'

container.registerSingleton<ICarRepository>(
  'CarsRepository',
  CarsRepository
)

export default container
