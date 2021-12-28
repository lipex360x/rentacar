import Specification from '@modules/cars/infra/typeorm/entities/Specification'

export interface ICreateProps {
  name: string
  description: string
}

export interface IFindByNameProps {
  name: string
}

export interface FindByIdsProps {
  ids: string[]
}

export default interface ISpecificationsRepository {
  create(data: ICreateProps): Promise<Specification>
  findByName(data: IFindByNameProps): Promise<Specification>
  findByIds(data: FindByIdsProps): Promise<Specification[]>
  list(): Promise<Specification[]>
}
