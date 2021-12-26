import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserCreateService from '../Create/UserCreate.service'
import UpdateUserAvatarService from './UpdateUserAvatar.service'

let fakeUserRepository: FakeUserRepository
let updateUserAvatarService: UpdateUserAvatarService
let userCreateService: UserCreateService

describe('Accounts UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository)
    userCreateService = new UserCreateService(fakeUserRepository)
  })

  it('should be able to update an user avatar', async () => {
    const user = {
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8),
      isAdmin: false,
      avatar: 'fakeimg.png'
    }
    const { id } = await userCreateService.execute(user)

    const avatar = await updateUserAvatarService.execute({ id, avatar_file: user.avatar })

    expect(avatar).toHaveProperty('user_name')
  })
})
