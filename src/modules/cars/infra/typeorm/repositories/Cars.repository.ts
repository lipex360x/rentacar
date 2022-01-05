import { Repository, getRepository } from 'typeorm'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICars, { CreateProps, FindAvailableProps, FindById, FindByLicensePlateProps, UpdateProps } from '@modules/cars/repositories/interfaces/ICars.interface'

export default class CarsRepository implements ICars {
  private repository: Repository<Car>

  constructor () {
    this.repository = getRepository(Car)
  }

  async create ({
    id,
    brand,
    model,
    license_plate,
    description,
    daily_rate,
    fine_amount,
    category_id,
    specifications
  }: CreateProps): Promise<Car> {
    const car = this.repository.create({
      id,
      brand,
      model,
      license_plate,
      description,
      daily_rate,
      fine_amount,
      category_id,
      specifications
    })

    await this.repository.save(car)

    return car
  }

  async update ({ car } : UpdateProps): Promise<Car> {
    let getCar = await this.repository.findOne(car.id)

    getCar = { ...car }

    await this.repository.save(getCar)

    return car
  }

  async findByLicensePlate ({ license_plate }: FindByLicensePlateProps): Promise<Car> {
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

  async findById ({ id }: FindById): Promise<Car> {
    const getCar = await this.repository.findOne(id)

    return getCar
  }
}
