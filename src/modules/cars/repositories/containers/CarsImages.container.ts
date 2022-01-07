import { container } from 'tsyringe'

import ICarsimages from '@modules/cars/repositories/interfaces/ICarsimages.interface'
import CarsimagesRepository from '@modules/cars/infra/typeorm/repositories/CarsImages.repository'

container.registerSingleton<ICarsimages>(
  'CarsimagesRepository',
  CarsimagesRepository
)

export default container
