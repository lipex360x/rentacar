import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICars from '@modules/cars/repositories/interfaces/ICars.interface'
import ISpecifications from '@modules/cars/repositories/interfaces/ISpecifications.interface'

interface Request{
  car_id: string,
  specifications_id: string[]
}

@injectable()
export default class CarSpecificationService {
  constructor (
    @inject('CarsRepository')
    private repository: ICars,

    @inject('SpecificationsRepository')
    private specificationRepo: ISpecifications
  ) {}

  async execute ({ car_id, specifications_id }: Request): Promise<Car> {
    const getCar = await this.repository.findById({ id: car_id })

    if (!getCar) throw new AppError('This car does not exists!')

    const specifications = await this.specificationRepo.findByIds({ ids: specifications_id })

    getCar.specifications = specifications

    await this.repository.create(getCar)

    return getCar
  }
}
