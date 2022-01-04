import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import HashProvider from '@shared/providers/HashProvider/implementations/Bcrypt.implementation'

import UserCreateService from './UserCreate.service'
import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'

let fakeUserRepository: FakeUserRepository
let userCreateService: UserCreateService
let hashProvider: HashProvider
let dateProvider: DayjsDateProvider

describe('UserCreateService ', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    hashProvider = new HashProvider()

    fakeUserRepository = new FakeUserRepository(dateProvider)
    userCreateService = new UserCreateService(hashProvider, fakeUserRepository)
  })

  it('should be able to create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john1234',
      driver_license: '12345678'
    }
    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('id')
  })

  it('should not be able to create a duplicate user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john1234',
      driver_license: '12345678'
    }

    await fakeUserRepository.create(user)

    await expect(
      userCreateService.execute(user)
    ).rejects.toBeInstanceOf(AppError)
  })
})
