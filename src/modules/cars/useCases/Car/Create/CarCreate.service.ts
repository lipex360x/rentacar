import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository'

interface Request{
  brand: string
  model: string
  license_plate: string
  description: string
  daily_rate: number
  fine_amount: number
  category_id: string
}

@injectable()
export default class CarCreateService {
  constructor (
    @inject('CarsRepository')
    private repository: ICarsRepository
  ) {}

  async execute ({ brand, model, license_plate, description, daily_rate, fine_amount, category_id }: Request): Promise<Car> {
    const getCar = await this.repository.findByLicencePlate({ license_plate })

    if (getCar) throw new AppError('Cars is already exists!')

    const createCar = await this.repository.create({ brand, model, license_plate, description, daily_rate, fine_amount, category_id })

    return createCar
  }
}
