import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserCreateService from '@modules/accounts/useCases/User/Create/UserCreate.service'
import HashProvider from '@shared/providers/HashProvider/implementations/Bcrypt.implementation'
import DateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'
import FakeUserstokenRepository from '@modules/accounts/repositories/fakes/FakeUserstokens.repository'

import SessionService from './Session.service'

let fakeUserRepository: FakeUserRepository
let sessionService: SessionService
let userCreateService: UserCreateService
let hashProvider: HashProvider
let dateProvider: DateProvider
let fakeUserstokenRepository: FakeUserstokenRepository

describe('Session Service', () => {
  beforeEach(() => {
    hashProvider = new HashProvider()
    dateProvider = new DateProvider()
    fakeUserRepository = new FakeUserRepository(dateProvider)
    fakeUserstokenRepository = new FakeUserstokenRepository(dateProvider)

    userCreateService = new UserCreateService(hashProvider, fakeUserRepository)
    sessionService = new SessionService(
      hashProvider,
      dateProvider,
      fakeUserRepository,
      fakeUserstokenRepository
    )
  })

  it('should be able to check if user is valid', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }

    await userCreateService.execute(user)

    let fakeUser = {
      ...user,
      email: Faker.internet.email()
    }

    await expect(
      sessionService.execute(fakeUser)
    ).rejects.toBeInstanceOf(AppError)

    fakeUser = {
      ...user,
      password: Faker.datatype.uuid()
    }

    await expect(
      sessionService.execute(fakeUser)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a token', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }

    await userCreateService.execute(user)

    const webToken = await sessionService.execute({ email: user.email, password: user.password })

    expect(webToken).toHaveProperty('token')
  })
})
