import { Specification } from '@modules/cars/model/Specification'

export interface ICreateProps {
  name: string
  description: string
}

export interface IFindByNameProps {
  name: string
}

export interface ISpecificationsRepository {
  create(data: ICreateProps): void
  findByName(data: IFindByNameProps): Specification
  list(): Specification[]
}
