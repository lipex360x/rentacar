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
  devoluntion: Rentail
  daysOnLease: number
  total: number
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

    @inject('UsersRepository')
    private usersRepository: IUsers
  ) {}

  async execute ({ id }: Request): Promise<Response> {
    const minimumDaily = 1
    const rentail = await this.repository.findById({ id })

    if (!rentail) throw new AppError('Rentail not found')

    const car = await this.carsRepository.findById({ id: rentail.car_id })
    const user = await this.usersRepository.findById({ id: rentail.user_id })

    const dateNow = this.dateProvider.dateNow()

    let daysOnLease = this.dateProvider.compareDates({
      start_date: rentail.start_date,
      end_date: dateNow,
      unit: 'day'
    })

    daysOnLease = daysOnLease <= 0 ? minimumDaily : daysOnLease

    const contractedLeaseDays = this.dateProvider.compareDates({
      start_date: rentail.start_date,
      end_date: rentail.expected_return_date,
      unit: 'day'
    })

    let total = 0

    if (daysOnLease > contractedLeaseDays) {
      const fineDays = daysOnLease - contractedLeaseDays
      const calculateFine = fineDays * car.fine_amount
      total = calculateFine
    }

    total += daysOnLease * car.daily_rate

    rentail.end_date = dateNow
    rentail.total = total

    const devoluntion = await this.repository.update({ rentail })

    // set car available
    car.available = true
    const updatedCar = await this.carsRepository.update({ car })

    // set user lessee
    user.isLessee = false
    const updatedUser = await this.usersRepository.update({ user })

    return {
      devoluntion,
      car: updatedCar,
      daysOnLease,
      total,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        isLessee: updatedUser.isLessee
      }
    }
  }
}
