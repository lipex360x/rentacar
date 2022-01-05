import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import UserCreateService from '@modules/accounts/useCases/User/Create/UserCreate.service'
import HashProvider from '@shared/providers/HashProvider/implementations/Bcrypt.implementation'
import UserLoginService from './UserLogin.service'

let fakeUserRepository: FakeUserRepository
let userLoginService: UserLoginService
let userCreateService: UserCreateService
let hashProvider: HashProvider

describe('Session Service', () => {
  beforeEach(() => {
    hashProvider = new HashProvider()
    fakeUserRepository = new FakeUserRepository()

    userCreateService = new UserCreateService(hashProvider, fakeUserRepository)
    userLoginService = new UserLoginService(
      hashProvider,
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
