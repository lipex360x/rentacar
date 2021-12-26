import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeAccountsRepository from '@modules/accounts/repositories/fakes/FakeAccountsRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeaccountsRepository: FakeAccountsRepository
let updateUserAvatarService: UpdateUserAvatarService

describe('Accounts UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeaccountsRepository = new FakeAccountsRepository()
    updateUserAvatarService = new UpdateUserAvatarService(fakeaccountsRepository)
  })

  it('should be able to XXXXXXXXXXXXX', async () => {
    const accounts = await updateUserAvatarService.execute()

    expect(accounts).toHaveProperty('XXXXXXXXXXXXX')
  })

  it('should not be able to XXXXXXXXXXXXX', async () => {
    await expect(
      updateUserAvatarService.execute()
    ).rejects.toBeInstanceOf(AppError)
  })
})
