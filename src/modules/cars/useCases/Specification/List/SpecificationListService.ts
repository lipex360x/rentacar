import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class SpecificationListService {
  constructor (
    @inject('SpecificationsRepository')
    private repository:ISpecificationsRepository) {}

  async execute (): Promise<Specification[]> {
    return this.repository.list()
  }
}

export { SpecificationListService }
