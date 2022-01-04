import Faker from 'faker'

import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorage.provider'
import UserUpdateAvatarService from './UserUpdateAvatar.service'

let fakeUserRepository: FakeUserRepository
let userUpdateAvatarService: UserUpdateAvatarService
let storageProvider: FakeStorageProvider

describe('Accounts UpdateAvatar', () => {
  beforeEach(() => {
    storageProvider = new FakeStorageProvider()
    fakeUserRepository = new FakeUserRepository()
    userUpdateAvatarService = new UserUpdateAvatarService(storageProvider, fakeUserRepository)
  })

  it('should be able to update an user avatar', async () => {
    const { id: user_id, avatar: avatar_file } = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8),
      isAdmin: false
    })

    const saveFile = jest.spyOn(storageProvider, 'saveFile')
    const avatar = await userUpdateAvatarService.execute({ user_id, avatar_file })

    expect(avatar).toHaveProperty('user_name')
    expect(saveFile).toHaveBeenCalled()
  })

  it('should be able to update an user avatar with another image', async () => {
    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8),
      isAdmin: false
    })

    const avatar = Faker.image.avatar()
    user.avatar = avatar

    await fakeUserRepository.update({ user })

    const deleteFile = jest.spyOn(storageProvider, 'deleteFile')
    const saveFile = jest.spyOn(storageProvider, 'saveFile')
    const updateAvatar = await userUpdateAvatarService.execute({ user_id: user.id, avatar_file: avatar })

    expect(updateAvatar).toHaveProperty('user_name')
    expect(deleteFile).toHaveBeenCalled()
    expect(saveFile).toHaveBeenCalled()
  })
})
