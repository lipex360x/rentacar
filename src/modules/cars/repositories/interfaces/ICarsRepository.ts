import Car from '@modules/cars/infra/typeorm/entities/Car'
import Specification from '@modules/cars/infra/typeorm/entities/Specification'

export interface CreateProps {
  brand: string
  model: string
  license_plate: string
  description: string
  daily_rate: number
  fine_amount: number
  category_id: string,
  specifications?: Specification[]
  available?: boolean,
  id?: string
}

export interface FindByLicencePlateProps {
  license_plate: string
}

export interface FindAvailableProps {
  brand?: string
  model?: string
  category_id?: string
}

export interface FindById {
  id: string
}

export default interface ICarRepository {
  create(data: CreateProps): Promise<Car>
  findByLicencePlate(data: FindByLicencePlateProps): Promise<Car>
  findAvailable(data: FindAvailableProps): Promise<Car[]>
  findById(data: FindById): Promise<Car>
}
