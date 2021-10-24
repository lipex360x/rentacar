import { ISpecificationsRepository } from '../repositories/interfaces/ISpecificationsRepository'

interface IRequestProps {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor (private repository:ISpecificationsRepository) {}

  execute ({ name, description }:IRequestProps) {
    const findSpecification = this.repository.findByName({ name })

    if (findSpecification) throw new Error('specification already exists')

    this.repository.create({ name, description })
  }
}

export { CreateSpecificationService }
