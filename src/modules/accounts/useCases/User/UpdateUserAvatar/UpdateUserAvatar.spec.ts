import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UpdateUserAvatarService from './UpdateUserAvatar.service'

let fakeUserRepository: FakeUserRepository
let updateUserAvatarService: UpdateUserAvatarService

describe('Accounts UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository)
  })

  it('should be able to update an user avatar', async () => {
    const { id, avatar: avatar_file } = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8),
      isAdmin: false,
      avatar: 'fakeimg.png'
    })

    const avatar = await updateUserAvatarService.execute({ id, avatar_file })

    expect(avatar).toHaveProperty('user_name')
  })
})
