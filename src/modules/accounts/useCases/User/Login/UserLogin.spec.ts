import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import UserLoginService from './UserLogin.service'

import UserCreateService from '@modules/accounts/useCases/User/Create/UserCreate.service'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import FakeTokensRepository from '@modules/tokens/repositories/fakes/FakeTokens.repository'
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHash.provider'
import FakeDateProvider from '@shared/providers/DateProvider/fakes/FakeDate.provider'

let fakeUserRepository: FakeUserRepository
let fakeTokensRepository: FakeTokensRepository
let userLoginService: UserLoginService

let userCreateService: UserCreateService
let hashProvider: FakeHashProvider
let dateProvider: FakeDateProvider

describe('Session Service', () => {
  beforeEach(() => {
    dateProvider = new FakeDateProvider()
    hashProvider = new FakeHashProvider()
    fakeUserRepository = new FakeUserRepository()
    fakeTokensRepository = new FakeTokensRepository()

    userCreateService = new UserCreateService(hashProvider, fakeUserRepository)
    userLoginService = new UserLoginService(
      hashProvider,
      fakeTokensRepository,
      fakeUserRepository
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
      userLoginService.execute(fakeUser)
    ).rejects.toBeInstanceOf(AppError)

    fakeUser = {
      ...user,
      password: Faker.datatype.uuid()
    }

    await expect(
      userLoginService.execute(fakeUser)
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

    const webToken = await userLoginService.execute({ email: user.email, password: user.password })

    expect(webToken).toHaveProperty('token')
  })
})
