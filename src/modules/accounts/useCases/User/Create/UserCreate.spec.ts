import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHash.provider'

import UserCreateService from './UserCreate.service'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let userCreateService: UserCreateService

describe('UserCreateService ', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()

    fakeUsersRepository = new FakeUsersRepository()
    userCreateService = new UserCreateService(fakeHashProvider, fakeUsersRepository)
  })

  it('should not be able to create a duplicate user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john1234',
      driver_license: '12345678'
    }

    await fakeUsersRepository.create(user)

    await expect(
      userCreateService.execute(user)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john1234',
      driver_license: '12345678'
    }

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('id')
    expect(generateHash).toHaveBeenCalledWith('john1234')
  })
})
