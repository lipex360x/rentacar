import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository, { CreateProps, FindAvailableProps, FindByLicencePlateProps } from '@modules/cars/repositories/interfaces/ICarsRepository'

export default class FakeCarsRepository implements ICarsRepository {
  private repository: Car[] = []

  async create ({ brand, model, license_plate, description, daily_rate, fine_amount, category_id, available = true }:CreateProps): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      brand,
      model,
      license_plate,
      description,
      daily_rate,
      fine_amount,
      available,
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

  async findAvailable ({ brand, model, category_id }: FindAvailableProps): Promise<Car[]> {
    const carsAvailable = this.repository.filter(car => car.available)

    if (!model && !brand && !category_id) return carsAvailable

    const carsFiltered = carsAvailable.filter(car => {
      if (car.brand === brand) return true
      if (car.model === model) return true
      if (car.category_id === category_id) return true

      return false
    })

    return carsFiltered
  }
}
