import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UpdateUserAvatarService from './UpdateUserAvatar.service'
import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'

let fakeUserRepository: FakeUserRepository
let updateUserAvatarService: UpdateUserAvatarService
let dateProvider: DayjsDateProvider

describe('Accounts UpdateUserAvatar', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()

    fakeUserRepository = new FakeUserRepository(dateProvider)
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
