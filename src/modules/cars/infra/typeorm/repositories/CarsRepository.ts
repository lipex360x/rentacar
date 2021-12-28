import { Repository, getRepository } from 'typeorm'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository, { CreateProps, FindAvailableProps, FindByLicencePlateProps } from '@modules/cars/repositories/interfaces/ICarsRepository'

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor () {
    this.repository = getRepository(Car)
  }

  async create ({ brand, model, license_plate, description, daily_rate, fine_amount, category_id }: CreateProps): Promise<Car> {
    const car = this.repository.create({ brand, model, license_plate, description, daily_rate, fine_amount, category_id })

    await this.repository.save(car)

    return car
  }

  async findByLicencePlate ({ license_plate }: FindByLicencePlateProps): Promise<Car> {
    const getCar = await this.repository.findOne({ license_plate })

    return getCar
  }

  async findAvailable ({ brand, model, category_id }: FindAvailableProps): Promise<Car[]> {
    const query = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) query.andWhere('c.brand = :brand', { brand })
    if (model) query.andWhere('c.model = :model', { model })
    if (category_id) query.andWhere('c.category_id = :category_id', { category_id })

    const cars = await query.getMany()

    return cars
  }
}
