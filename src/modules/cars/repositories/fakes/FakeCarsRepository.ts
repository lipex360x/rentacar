import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository, { CreateProps, FindByLicencePlateProps } from '@modules/cars/repositories/interfaces/ICarsRepository'

export default class FakeCarsRepository implements ICarsRepository {
  private repository: Car[] = []

  async create ({ brand, model, license_plate, description, daily_rate, fine_amount, category_id }:CreateProps): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      brand,
      model,
      license_plate,
      description,
      daily_rate,
      fine_amount,
      category_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(car)

    return car
  }

  async findByLicencePlate ({ license_plate }: FindByLicencePlateProps): Promise<Car> {
    const car = this.repository.find(car => car.license_plate === license_plate)

    return car
  }
}
