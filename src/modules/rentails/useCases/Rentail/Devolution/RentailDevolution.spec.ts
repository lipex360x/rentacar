import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeRentailsRepository from '@modules/rentails/repositories/fakes/FakeRentails.repository'
import RentailDevolutionService from './RentailDevolution.service'
import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository'

let fakeRentailsRepository: FakeRentailsRepository
let rentailDevolutionService: RentailDevolutionService
let fakecarsRepository: FakeCarsRepository
let fakeUserRepository: FakeUserRepository
let dateProvider: DayjsDateProvider

describe('Rentails Rentail Devolution', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()

    fakecarsRepository = new FakeCarsRepository()
    fakeUserRepository = new FakeUserRepository()
    fakeRentailsRepository = new FakeRentailsRepository()

    rentailDevolutionService = new RentailDevolutionService(
      dateProvider,
      fakeRentailsRepository,
      fakecarsRepository,
      fakeUserRepository
    )
  })

  it('should not be able to return a invalid rentail', async () => {
    await expect(
      rentailDevolutionService.execute({ id: 'fake_id' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to return a rentail with minimum days', async () => {
    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const rentail = await fakeRentailsRepository.create({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dateProvider.addTime({ time: 2, unit: 'day' })
    })
    const rentails = await rentailDevolutionService.execute({ id: rentail.id })

    expect(rentails.rentail).toHaveProperty('id')
    expect(rentails.user.isLessee).toBe(false)
    expect(rentails.car.available).toBe(true)
  })

  it('should be able to return a rentail', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const rentail = await fakeRentailsRepository.create({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dateProvider.addTime({ time: 2, unit: 'day' })
    })

    rentail.start_date = dateProvider.subtractTime({ time: 3, unit: 'day' })
    await fakeRentailsRepository.update({ rentail })

    const rentails = await rentailDevolutionService.execute({ id: rentail.id })

    expect(rentails.rentail).toHaveProperty('id')
    expect(rentails.user.isLessee).toBe(false)
    expect(rentails.car.available).toBe(true)
  })
})
