import { inject, injectable } from 'tsyringe'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

import AppError from '@shared/errors/AppError'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import ICars from '@modules/cars/repositories/interfaces/ICarsRepository'
import IUsersRepository from '@modules/accounts/repositories/interfaces/IUserRepository'
import User from '@modules/accounts/infra/typeorm/entities/User'
import Car from '@modules/cars/infra/typeorm/entities/Car'

dayjs.extend(utc)

interface Request {
  user_id: string
  car_id: string
  expected_return_date: Date
}

interface Response {
  rentail: Rentail
  user: User
  car: Car
}

@injectable()
export default class RentailCreateService {
  constructor (
    @inject('RentailsRepository')
    private repository: IRentails,

    @inject('CarsRepository')
    private carsRepository: ICars,

    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute ({ user_id, car_id, expected_return_date }: Request): Promise<Response> {
    const minimumHours = 24

    // check available car
    const car = await this.carsRepository.findById({ id: car_id })

    if (!car) throw new AppError('This car is not valid')

    if (!car.available) throw new AppError('This car is unavailable')

    // check valid user
    const user = await this.usersRepository.findById({ id: user_id })

    if (user.isLessee) throw new AppError('This user is already a lessee')

    // check valid date
    const expectedDateFormatted = dayjs(expected_return_date).utc().local().format()
    const dateNow = dayjs().utc().local().format()

    const compareDate = dayjs(expectedDateFormatted).diff(dateNow, 'hours')

    if (compareDate < minimumHours) throw new AppError('Invalid return time')

    // create rental
    const rentail = await this.repository.create({ user_id, car_id, expected_return_date })

    // set user lessee
    user.isLessee = true
    const updateUser = await this.usersRepository.create(user)

    // set car unavailable
    car.available = false
    const updateCar = await this.carsRepository.create(car)

    return { rentail, user: updateUser, car: updateCar }
  }
}
