import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserAuthService from './UserAuthService'
import UserCreateService from '../Create/UserCreateService'

let fakeUserRepository: FakeUserRepository
let userAuthService: UserAuthService
let userCreateService: UserCreateService

describe('User Auth', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    userAuthService = new UserAuthService(fakeUserRepository)
    userCreateService = new UserCreateService(fakeUserRepository)
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
      userAuthService.execute(fakeUser)
    ).rejects.toBeInstanceOf(AppError)

    fakeUser = {
      ...user,
      password: Faker.datatype.uuid()
    }

    await expect(
      userAuthService.execute(fakeUser)
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

    const webtoken = await userAuthService.execute({ email: user.email, password: user.password })

    expect(webtoken).toHaveProperty('token')
  })
})
