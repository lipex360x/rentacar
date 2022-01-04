import 'reflect-metadata'

import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import RentailCreateService from './RentailCreate.service'

import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'
import FakeRentailsRepository from '@modules/rentails/repositories/fakes/FakeRentails.repository'
import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCars.repository'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'

let rentailCreateService: RentailCreateService
let fakerentailsRepository: FakeRentailsRepository
let fakecarsRepository: FakeCarsRepository
let fakeUserRepository: FakeUserRepository
let dateProvider: DayjsDateProvider

describe('Rentails Rentail Create', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()

    fakecarsRepository = new FakeCarsRepository()
    fakeUserRepository = new FakeUserRepository()
    fakerentailsRepository = new FakeRentailsRepository()

    rentailCreateService = new RentailCreateService(
      dateProvider,
      fakerentailsRepository,
      fakecarsRepository,
      fakeUserRepository
    )
  })

  it('should not be able to Create a new rentail to invalid car', async () => {
    await expect(
      rentailCreateService.execute({ user_id: 'user_id', car_id: 'invalid_car_id', expected_return_date: new Date() })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to Create a new rentail to unavailable car', async () => {
    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid(),
      available: false
    })

    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    await expect(
      rentailCreateService.execute({ car_id: car.id, user_id: user.id, expected_return_date: new Date() })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to Create a new rentail to a lessee', async () => {
    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid(),
      available: true
    })

    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8),
      isLessee: true
    })

    await expect(
      rentailCreateService.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: new Date()
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to Create a new rentail to an invalid date', async () => {
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

    await expect(
      rentailCreateService.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: dateProvider.addTime({ time: 4, unit: 'hour' })
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to Create a new rental', async () => {
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

    const rentails = await rentailCreateService.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dateProvider.addTime({ time: 1, unit: 'day' })
    })

    expect(rentails.rentail).toHaveProperty('id')
    expect(rentails.user.isLessee).toBe(true)
    expect(rentails.car.available).toBe(false)
  })
})
