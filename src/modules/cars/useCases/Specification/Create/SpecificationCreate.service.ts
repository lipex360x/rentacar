import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import Specification from '@modules/cars/infra/typeorm/entities/Specification'

interface IRequestProps {
  name: string
  description: string
}

@injectable()
class SpecificationCreateService {
  constructor (
    @inject('SpecificationsRepository')
    private repository:ISpecificationsRepository) {}

  async execute ({ name, description }:IRequestProps): Promise<Specification> {
    const findSpecification = await this.repository.findByName({ name })

    if (findSpecification) throw new AppError('specification already exists')

    return this.repository.create({ name, description })
  }
}

export default SpecificationCreateService
