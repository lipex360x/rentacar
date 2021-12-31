import { Repository, getRepository } from 'typeorm'

import Teste from '@modules/teste/infra/typeorm/entities/Teste.entity'
import ITestes, { CreateProps } from '@modules/teste/repositories/interfaces/ITestes.interface'

export default class TestesRepository implements ITestes {
  private repository: Repository<Teste>

  constructor () {
    this.repository = getRepository(Teste)
  }

  async create ({ data }: CreateProps): Promise<Teste> {
    //  TO DO
  }
}
