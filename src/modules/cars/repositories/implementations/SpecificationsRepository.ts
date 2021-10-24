import { Specification } from '@modules/cars/model/Specification'
import { ICreateProps, IFindByNameProps, ISpecificationsRepository } from '../interfaces/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private static INSTANCE: SpecificationsRepository

  private specifications: Specification[]

  private constructor () {
    this.specifications = []
  }

  public static getInstance () {
    if (!this.INSTANCE) this.INSTANCE = new SpecificationsRepository()

    return this.INSTANCE
  }

  create ({ name, description }: ICreateProps): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })

    this.specifications.push(specification)
  }

  findByName ({ name }: IFindByNameProps): Specification {
    const findSpecification = this.specifications.find((specification) => specification.name === name)

    return findSpecification
  }

  list (): Specification[] {
    return this.specifications
  }
}

export { SpecificationsRepository }
