import { container } from 'tsyringe'

import ITestes from '@modules/teste/repositories/interfaces/ITestes.interface'
import TestesRepository from '@modules/teste/infra/typeorm/repositories/Testes.repository'

container.registerSingleton<ITestes>(
  'TestesRepository',
  TestesRepository
)

export default container
