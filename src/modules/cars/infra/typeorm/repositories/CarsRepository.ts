import { Repository, getRepository } from 'typeorm'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository, { CreateProps, FindByLicencePlateProps } from '@modules/cars/repositories/interfaces/ICarsRepository'

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor () {
    this.repository = getRepository(Car)
  }

  async create ({ brand, model, license_plate, description, daily_rate, fine_amount, category_id }: CreateProps): Promise<Car> {
    const car = this.repository.create({ brand, model, license_plate, description, daily_rate, fine_amount, category_id })

    await this.repository.save(car)

    throw new Error('Method not implemented.')
  }

  async findByLicencePlate ({ license_plate }: FindByLicencePlateProps): Promise<Car> {
    const getCar = await this.repository.findOne({ license_plate })

    return getCar
  }
}
