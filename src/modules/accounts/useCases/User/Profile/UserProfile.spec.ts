import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUsersRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import UserProfileService from './UserProfile.service'

let fakeUsersRepository: FakeUsersRepository
let userProfileService: UserProfileService

describe('Accounts User Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    userProfileService = new UserProfileService(fakeUsersRepository)
  })

  it('should not be able to show Profile with an invalid user', async () => {
    await expect(
      userProfileService.execute({ user_id: 'invalid_user_id' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to show Profile', async () => {
    const user = await fakeUsersRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const accounts = await userProfileService.execute({ user_id: user.id })

    expect(accounts).toEqual(
      expect.objectContaining({
        id: user.id
      })
    )
  })
})
