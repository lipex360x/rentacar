import { v4 as uuid } from 'uuid'
import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICars, { CreateProps, FindAvailableProps, FindById, FindByLicensePlateProps, UpdateProps } from '@modules/cars/repositories/interfaces/ICars.interface'

export default class FakeCarsRepository implements ICars {
  private repository: Car[] = []

  async create ({
    id,
    brand,
    model,
    license_plate,
    description,
    daily_rate,
    fine_amount,
    category_id,
    available = true,
    specifications
  }:CreateProps): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id: id || uuid(),
      brand,
      model,
      license_plate,
      description,
      daily_rate,
      fine_amount,
      available,
      specifications,
      category_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(car)

    return car
  }

  async update ({ car } : UpdateProps): Promise<Car> {
    const getIndex = this.repository.findIndex((getCar) => getCar.id === car.id)

    this.repository[getIndex] = car

    return car
  }

  async findByLicensePlate ({ license_plate }: FindByLicensePlateProps): Promise<Car> {
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

  async findById ({ id }: FindById): Promise<Car> {
    const car = this.repository.find(car => car.id === id)

    return car
  }
}
