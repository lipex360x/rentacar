import { v4 as uuid } from 'uuid'

import Specification from '@modules/cars/infra/typeorm/entities/Specification'
import ISpecificationsRepository, { ICreateProps, IFindByNameProps } from '../interfaces/ISpecificationsRepository'

export default class FakeSpecificationRepository implements ISpecificationsRepository {
  private repository: Specification[] = []

  async create ({ name, description }:ICreateProps): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(specification)

    return specification
  }

  async findByName ({ name }: IFindByNameProps): Promise<Specification> {
    const getSpecification = this.repository.find(specification => specification.name === name)

    return getSpecification
  }

  async list (): Promise<Specification[]> {
    return this.repository
  }
}
