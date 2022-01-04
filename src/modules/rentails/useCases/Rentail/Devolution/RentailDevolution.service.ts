import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'
import ICars from '@modules/cars/repositories/interfaces/ICars.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import Car from '@modules/cars/infra/typeorm/entities/Car'

interface Request {
  id: string
}

interface Response {
  rentail: Rentail
  user: {
    id: string,
    name: string,
    isLessee: boolean
  }
  car: Car
}

@injectable()
export default class RentailDevolutionService {
  constructor (
    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('RentailsRepository')
    private repository: IRentails,

    @inject('CarsRepository')
    private carsRepository: ICars,

    @inject('UserRepository')
    private usersRepository: IUsers
  ) {}

  async execute ({ id }: Request): Promise<Response> {
    const minimumDaily = 1
    const rentail = await this.repository.findById({ id })

    if (!rentail) throw new AppError('Rentail not found')

    const car = await this.carsRepository.findById({ id: rentail.car_id })
    const user = await this.usersRepository.findById({ id: rentail.user_id })

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareDates({
      start_date: rentail.start_date,
      end_date: dateNow,
      unit: 'day'
    })

    daily = daily <= 0 ? minimumDaily : daily

    const delay = this.dateProvider.compareDates({
      start_date: dateNow,
      end_date: rentail.expected_return_date,
      unit: 'day'
    })

    let total = 0
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.fine_amount

    rentail.end_date = dateNow
    rentail.total = total

    await this.repository.update({ rentail })

    // set car available
    car.available = true
    const updatedCar = await this.carsRepository.update({ car })

    // set user lessee
    user.isLessee = false
    const updatedUser = await this.usersRepository.update({ user })

    return {
      rentail,
      car: updatedCar,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        isLessee: updatedUser.isLessee
      }
    }
  }
}
