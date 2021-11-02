import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { inject, injectable } from 'tsyringe'

interface IRequestProps {
  name: string
  description: string
}

@injectable()
class SpecificationCreateService {
  constructor (
    @inject('SpecificationsRepository')
    private repository:ISpecificationsRepository) {}

  async execute ({ name, description }:IRequestProps) {
    const findSpecification = await this.repository.findByName({ name })

    if (findSpecification) throw new Error('specification already exists')

    this.repository.create({ name, description })
  }
}

export { SpecificationCreateService }
