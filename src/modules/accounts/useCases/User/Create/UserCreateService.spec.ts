// import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserCreateService from './UserCreateService'

let fakeuserRepository: FakeUserRepository
let userCreateService: UserCreateService

describe('UserCreateService ', () => {
  beforeEach(() => {
    fakeuserRepository = new FakeUserRepository()
    userCreateService = new UserCreateService(fakeuserRepository)
  })

  it('should be able to create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'john1234',
      driver_license: '12345678',
      isAdmin: false
    }
    const createUser = await userCreateService.execute(user)

    expect(createUser).toHaveProperty('user_id')
  })
})
