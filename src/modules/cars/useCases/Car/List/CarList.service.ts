import { inject, injectable } from 'tsyringe'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICars from '@modules/cars/repositories/interfaces/ICars.interface'

interface Request {
  brand?: string
  model?: string
  category_id?: string
}

@injectable()
export default class CarListService {
  constructor (
    @inject('CarsRepository')
    private repository: ICars
  ) {}

  async execute ({ brand, model, category_id }: Request): Promise<Car[]> {
    return this.repository.findAvailable({ brand, model, category_id })
  }
}
