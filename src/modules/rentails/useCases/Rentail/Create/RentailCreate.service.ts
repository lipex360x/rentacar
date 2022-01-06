import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Car from '@modules/cars/infra/typeorm/entities/Car'
import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import ICars from '@modules/cars/repositories/interfaces/ICars.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IDateProvider from '@shared/providers/DateProvider/interface/IDate.interface'
import INotitications from '@modules/notifications/repositories/interfaces/INotifications.interface'

interface Request {
  user_id: string
  car_id: string
  expected_return_date: Date
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
export default class RentailCreateService {
  constructor (
    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('RentailsRepository')
    private repository: IRentails,

    @inject('CarsRepository')
    private carsRepository: ICars,

    @inject('UsersRepository')
    private usersRepository: IUsers,

    @inject('NotificationsRepository')
    private notificationsRepository: INotitications

  ) {}

  async execute ({ user_id, car_id, expected_return_date }: Request): Promise<Response> {
    const minimumHours = 24

    // check if car is available
    const car = await this.carsRepository.findById({ id: car_id })

    if (!car) throw new AppError('This car is not valid')

    if (!car.available) throw new AppError('This car is unavailable')

    // check if user is valid
    const user = await this.usersRepository.findById({ id: user_id })

    if (user.isLessee) throw new AppError('This user is already a lessee')

    // check if date is valid
    const dateNow = this.dateProvider.dateNow()
    const compareHours = this.dateProvider.compareDates({
      start_date: dateNow,
      end_date: expected_return_date,
      unit: 'hour'
    })

    if (compareHours < minimumHours) throw new AppError('Invalid return time')

    // create rental
    const rentail = await this.repository.create({ user_id, car_id, expected_return_date })

    // set user lessee
    user.isLessee = true
    const updatedUser = await this.usersRepository.update({ user })

    // set car unavailable
    car.available = false
    const updatedCar = await this.carsRepository.update({ car })

    const rentalDate = this.dateProvider.format({ date: rentail.created_at, format: 'DD/MM/YYYY [at] HH:mm:ss' })

    await this.notificationsRepository.create({
      user_id: updatedUser.id,
      content: `New rental to car ${updatedCar.model} from ${updatedUser.name} in ${rentalDate}`
    })

    // const allNotifications = await this.notificationsRepository.findAll()
    // const findOne = await this.notificationsRepository.findById({ id: '61d702aa58393e5ed71ce78c' })

    // console.log(notification)
    // console.log(allNotifications)

    const notification = await this.notificationsRepository.create({
      user_id: updatedUser.id,
      content: 'Notification Created by Felipe'
    })

    console.log('created:', notification)

    notification.content = 'Notification Updated by HELLOOOO MONGOOOOO'

    const notUpdated = await this.notificationsRepository.update({ notification })

    const deleteNotB1 = await this.notificationsRepository.delete({ id: '61d709e940e8f010719700b1' })

    console.log('updated:', notUpdated)
    console.log('deleted:', deleteNotB1)

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
