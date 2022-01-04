import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeTokensRepository from '@modules/accounts/repositories/fakes/FakeTokens.repository'
import UserTokenService from './UserToken.service'
import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'

let fakeTokensRepository: FakeTokensRepository
let userTokenService: UserTokenService
let dateProvider: DayjsDateProvider

describe('Accounts User Token', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()

    fakeTokensRepository = new FakeTokensRepository(dateProvider)
    userTokenService = new UserTokenService(fakeTokensRepository)
  })

  it('should not be able to Token XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }

    await expect(
      userTokenService.execute({ data })
    ).rejects.toBeInstanceOf(AppError)
  })

  // it('should be able to Token XXXXXXXXXXXXX', async () => {
  //   const data = {
  //     value: Faker.lorem.words(3)
  //   }

  //   const accounts = await userTokenService.execute({ data })

  //  expect(accounts).toHaveProperty('XXXXXXXXXXXXX')
  // })
})
