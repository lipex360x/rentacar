import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUserstokensRepository from '@modules/accounts/repositories/fakes/FakeUserstokens.repository'
import TokenCreateService from './TokenCreate.service'
import DayjsDateProvider from '@shared/providers/DateProvider/implementations/Dayjs.implementation'

let fakeUserstokensRepository: FakeUserstokensRepository
let tokenCreateService: TokenCreateService
let dateProvider: DayjsDateProvider

describe('Accounts Token Create', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()

    fakeUserstokensRepository = new FakeUserstokensRepository(dateProvider)
    tokenCreateService = new TokenCreateService(fakeUserstokensRepository)
  })

  it('should not be able to Create XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }

    await expect(
      tokenCreateService.execute({ data })
    ).rejects.toBeInstanceOf(AppError)
  })

  // it('should be able to Create XXXXXXXXXXXXX', async () => {
  //   const data = {
  //     value: Faker.lorem.words(3)
  //   }

  //   const accounts = await tokenCreateService.execute({ data })

  //  expect(accounts).toHaveProperty('XXXXXXXXXXXXX')
  // })
})
