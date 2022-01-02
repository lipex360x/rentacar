import { Repository, getRepository } from 'typeorm'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails, { CreateProps, FindByIdProps, FindByUserIdProps, UpdateProps } from '@modules/rentails/repositories/interfaces/IRentails.interface'

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

  async findById ({ id }: FindByIdProps): Promise<Rentail> {
    return this.repository.findOne({ id })
  }

  async findAll (): Promise<Rentail[]> {
    return this.repository.find()
  }

  async update ({ rentail }: UpdateProps): Promise<Rentail> {
    let findRentail = await this.repository.findOne(rentail.id)

    findRentail = { ...rentail }

    await this.repository.save(findRentail)

    return findRentail
  }

  async findByUserId ({ user_id }: FindByUserIdProps): Promise<Rentail[]> {
    return this.repository.find({
      where: { user_id },
      relations: ['car']
    })
  }
}
