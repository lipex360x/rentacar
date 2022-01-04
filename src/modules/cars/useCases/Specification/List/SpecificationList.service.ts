import Specification from '@modules/cars/infra/typeorm/entities/Specification'
import ISpecifications from '@modules/cars/repositories/interfaces/ISpecifications.interface'
import { inject, injectable } from 'tsyringe'

@injectable()
class SpecificationListService {
  constructor (
    @inject('SpecificationsRepository')
    private repository:ISpecifications) {}

  async execute (): Promise<Specification[]> {
    return this.repository.list()
  }
}

export default SpecificationListService
