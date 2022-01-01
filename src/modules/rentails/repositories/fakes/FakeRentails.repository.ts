import { v4 as uuid } from 'uuid'
import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'

export default class FakeRentailsRepository implements IRentails {
  private repository: Rentail[] = []

  async create ({ user_id, car_id, expected_return_date }:CreateProps): Promise<Rentail> {
    const rentail = new Rentail()

    Object.assign(rentail, {
      id: uuid(),
      user_id,
      car_id,
      start_date: new Date(),
      expected_return_date,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(rentail)

    return rentail
  }
}
