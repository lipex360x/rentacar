import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'

export default class FakeRentailsRepository implements IRentails {
  private repository: Rentail[] = []

  constructor (
    private dateProvider: IDateProvider
  ) {}

  async create ({ user_id, car_id, expected_return_date }:CreateProps): Promise<Rentail> {
    const rentail = new Rentail()

    Object.assign(rentail, {
      ...rentail,
      user_id,
      car_id,
      start_date: this.dateProvider.dateNow(),
      expected_return_date,
      created_at: this.dateProvider.dateNow(),
      updated_at: this.dateProvider.dateNow()
    })

    this.repository.push(rentail)

    return rentail
  }
}
