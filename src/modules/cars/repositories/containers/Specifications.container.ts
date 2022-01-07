import { container } from 'tsyringe'

import ISpecificationsRepository from '../interfaces/ISpecifications.interface'
import SpecificationsRepository from '../../infra/typeorm/repositories/Specifications.repository'

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

export default container
