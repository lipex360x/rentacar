import CarImage from '@modules/cars/infra/typeorm/entities/CarImage.entity'
import ICarsimages, { CreateProps } from '@modules/cars/repositories/interfaces/ICarsimages.interface'

export default class FakeCarsRepository implements ICarsimages {
  private repository: CarImage[] = []

  async create ({ car_id, image }:CreateProps): Promise<CarImage> {
    const carImage = new CarImage()

    Object.assign(carImage, {
      car_id,
      image,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(carImage)

    return carImage
  }
}
