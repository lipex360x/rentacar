import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps, FindByIdProps, FindByUserIdProps, UpdateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'

export default class FakeRentailsRepository implements IRentails {
  private repository: Rentail[] = []

  async create ({ user_id, car_id, expected_return_date }:CreateProps): Promise<Rentail> {
    const rentail = new Rentail()

    Object.assign(rentail, {
      ...rentail,
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

  async findById ({ id }: FindByIdProps): Promise<Rentail> {
    return this.repository.find(rentail => rentail.id === id)
  }

  async findAll (): Promise<Rentail[]> {
    return this.repository
  }

  async update ({ rentail }: UpdateProps): Promise<Rentail> {
    const getIndex = this.repository.findIndex(getRentail => getRentail.id === rentail.id)

    this.repository[getIndex] = rentail

    return rentail
  }

  async findByUserId ({ user_id }: FindByUserIdProps): Promise<Rentail[]> {
    return this.repository.filter(rentail => rentail.user_id === user_id)
  }
}
