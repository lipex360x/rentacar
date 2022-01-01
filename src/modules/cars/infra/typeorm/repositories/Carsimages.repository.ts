import { Repository, getRepository } from 'typeorm'

import CarImage from '@modules/cars/infra/typeorm/entities/CarImage.entity'
import ICarsimages, { CreateProps } from '@modules/cars/repositories/interfaces/ICarsimages.interface'

export default class CarsimagesRepository implements ICarsimages {
  private repository: Repository<CarImage>

  constructor () {
    this.repository = getRepository(CarImage)
  }

  async create ({ car_id, image }: CreateProps): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image })

    await this.repository.save(carImage)

    return carImage
  }
}
