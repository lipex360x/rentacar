import { Specification } from '@modules/cars/entities/Specification'
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
