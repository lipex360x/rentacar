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

  it('should be able to check if user exists', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }
    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('user_id')

    const userAuth = await userAuthService.execute({ email: user.email, password: user.password })

    expect(userAuth).toHaveProperty('token')
  })

  it('should be able to check if user password is valid', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }
    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('user_id')
  })

  it('should be able to check if user is valid', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }

    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('user_id')

    user.email = Faker.internet.email()

    await expect(
      userAuthService.execute(user)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to check if password is valid', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.datatype.uuid(),
      driver_license: '12345678',
      isAdmin: false
    }

    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('user_id')

    user.password = Faker.datatype.uuid()

    await expect(
      userAuthService.execute(user)
    ).rejects.toBeInstanceOf(AppError)
  })

  // it('should not be able to generate a token to invalid user', async () => {
  //   const user = {
  //     name: Faker.name.firstName(),
  //     email: Faker.internet.email(),
  //     password: Faker.datatype.uuid(),
  //     driver_license: '12345678',
  //     isAdmin: false
  //   }

  //   await expect(
  //     userAuthService.execute(user)
  //   ).rejects.toBeInstanceOf(AppError)
  // })

  // it('should be able to generate a token', async () => {
  //   const userAuth = await userAuthService.execute()

  //   expect(userAuth).toHaveProperty('XXXXXXXXXXXXX')
  // })
})
