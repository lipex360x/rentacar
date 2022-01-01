import { container } from 'tsyringe'

import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import RentailsRepository from '@modules/rentails/infra/typeorm/repositories/Rentails.repository'

container.registerSingleton<IRentails>(
  'RentailsRepository',
  RentailsRepository
)

export default container
