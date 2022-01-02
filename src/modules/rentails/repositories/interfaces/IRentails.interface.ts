import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'

export interface CreateProps {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export interface UpdateProps {
  rentail: Rentail
}

export interface FindByIdProps {
  id: string
}

export interface FindByUserIdProps {
  user_id: string
}

export default interface IRentails {
  create(data: CreateProps): Promise<Rentail>
  findById(data: FindByIdProps): Promise<Rentail>
  findAll(): Promise<Rentail[]>
  update(data: UpdateProps): Promise<Rentail>
  findByUserId(data: FindByUserIdProps): Promise<Rentail[]>
}
