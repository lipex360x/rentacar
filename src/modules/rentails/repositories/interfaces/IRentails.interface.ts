import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'

export interface CreateProps {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export default interface IRentails {
  create(data: CreateProps): Promise<Rentail>
}
