import { container } from 'tsyringe'

import ISpecificationsRepository from '../interfaces/ISpecificationsRepository'
import SpecificationsRepository from '../../infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

export default container
