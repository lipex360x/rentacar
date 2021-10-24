import { Specification } from '@modules/cars/model/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

class SpecificationListService {
  constructor (private repository:ISpecificationsRepository) {}

  execute (): Specification[] {
    return this.repository.list()
  }
}

export { SpecificationListService }
