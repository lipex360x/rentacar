import Car from '@modules/cars/infra/typeorm/entities/Car'

export interface CreateProps {
  brand: string
  model: string
  license_plate: string
  description: string
  daily_rate: number
  fine_amount: number
  category_id: string
}

export interface FindByLicencePlateProps {
  license_plate: string
}

export default interface ICarRepository {
  create(data: CreateProps): Promise<Car>
  findByLicencePlate(data: FindByLicencePlateProps): Promise<Car>
}
