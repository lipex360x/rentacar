import CarImage from '@modules/cars/infra/typeorm/entities/CarImage.entity'

export interface CreateProps {
  car_id: string
  image: string
}

export default interface ICarsimages {
  create(data: CreateProps): Promise<CarImage>
}
