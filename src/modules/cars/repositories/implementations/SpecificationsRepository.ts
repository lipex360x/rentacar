import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { getRepository, Repository } from 'typeorm'
import { ICreateProps, IFindByNameProps, ISpecificationsRepository } from '../interfaces/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor () {
    this.repository = getRepository(Specification)
  }

  async create ({ name, description }: ICreateProps): Promise<void> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)
  }

  async findByName ({ name }: IFindByNameProps): Promise<Specification> {
    return this.repository.findOne({ name })
  }

  async list (): Promise<Specification[]> {
    return this.repository.find()
  }
}

export { SpecificationsRepository }
