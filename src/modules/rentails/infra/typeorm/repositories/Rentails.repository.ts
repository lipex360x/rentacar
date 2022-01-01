import { Repository, getRepository } from 'typeorm'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'

export default class RentailsRepository implements IRentails {
  private repository: Repository<Rentail>

  constructor () {
    this.repository = getRepository(Rentail)
  }

  async create ({ data }: CreateProps): Promise<Rentail> {
    //  TO DO
  }
}
