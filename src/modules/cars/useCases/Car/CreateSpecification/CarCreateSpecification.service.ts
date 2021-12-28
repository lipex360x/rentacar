import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository'
import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

interface Request{
  car_id: string,
  specifications_id: string[]
}

@injectable()
export default class CarCreateSpecificationService {
  constructor (
    @inject('CarsRepository')
    private repository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationRepo: ISpecificationsRepository
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
