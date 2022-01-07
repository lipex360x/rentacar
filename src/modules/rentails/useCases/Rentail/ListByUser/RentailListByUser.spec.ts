import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeDateProvider from '@shared/providers/DateProvider/fakes/FakeDate.provider'
import FakeRentailsRepository from '@modules/rentails/repositories/fakes/FakeRentails.repository'
import RentailListByUserService from './RentailListByUser.service'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCars.repository'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCache.provider'

let fakeRentailsRepository: FakeRentailsRepository
let rentailListByUserService: RentailListByUserService
let fakeUsersRepository: FakeUserRepository
let fakecarsRepository: FakeCarsRepository
let dateProvider: FakeDateProvider
let cacheProvider: FakeCacheProvider

describe('Rentails Rentail ListByUser', () => {
  beforeEach(() => {
    dateProvider = new FakeDateProvider()
    cacheProvider = new FakeCacheProvider()

    fakeUsersRepository = new FakeUserRepository()
    fakecarsRepository = new FakeCarsRepository()

    fakeRentailsRepository = new FakeRentailsRepository()
    rentailListByUserService = new RentailListByUserService(
      cacheProvider,
      fakeRentailsRepository,
      fakeUsersRepository
    )
  })

  it('should not be able to List by invalid user', async () => {
    await expect(
      rentailListByUserService.execute({ user_id: 'fake_user_id' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to ListByUser', async () => {
    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    const user = await fakeUsersRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    let fakeRentail = await fakeRentailsRepository.create({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dateProvider.addTime({ time: 1, unit: 'day' })
    })
    fakeRentail.end_date = dateProvider.dateNow()
    await fakeRentailsRepository.update({ rentail: fakeRentail })

    fakeRentail = await fakeRentailsRepository.create({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dateProvider.addTime({ time: 2, unit: 'day' })
    })
    fakeRentail.end_date = dateProvider.dateNow()
    await fakeRentailsRepository.update({ rentail: fakeRentail })

    const getRentails = await rentailListByUserService.execute({ user_id: user.id })
    expect(getRentails.length).toBe(2)
  })
})
