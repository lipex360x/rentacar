import { inject, injectable } from 'tsyringe'
// import AppError from '@shared/errors/AppError'

// import CarImage from '@modules/cars/infra/typeorm/entities/CarImage.entity'
import ICarsimages from '@modules/cars/repositories/interfaces/ICarsimages.interface'

interface Request{
  car_id: string
  images: string[]
}

@injectable()
export default class CarImageCreateService {
  constructor (
    @inject('CarsimagesRepository')
    private repository: ICarsimages
  ) {}

  async execute ({ car_id, images }: Request): Promise<void> {
    images.map(async (image) => {
      await this.repository.create({ car_id, image })
    })
  }
}
