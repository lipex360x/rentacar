import { Repository, getRepository } from 'typeorm'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'

export default class RentailsRepository implements IRentails {
  private repository: Repository<Rentail>

  constructor () {
    this.repository = getRepository(Rentail)
  }

  async create ({ user_id, car_id, expected_return_date }: CreateProps): Promise<Rentail> {
    const rentail = this.repository.create({ user_id, car_id, expected_return_date })

    await this.repository.save(rentail)

    return rentail
  }
}
