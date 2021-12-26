import { getRepository, Repository } from 'typeorm'

import Specification from '@modules/cars/infra/typeorm/entities/Specification'
import ISpecificationsRepository, { ICreateProps, IFindByNameProps } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor () {
    this.repository = getRepository(Specification)
  }

  async create ({ name, description }: ICreateProps): Promise<Specification> {
    const specification = this.repository.create({ name, description })

    return this.repository.save(specification)
  }

  async findByName ({ name }: IFindByNameProps): Promise<Specification> {
    return this.repository.findOne({ name })
  }

  async list (): Promise<Specification[]> {
    return this.repository.find()
  }
}

export default SpecificationsRepository