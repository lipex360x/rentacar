import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import MailProvider from '@shared/providers/MailProvider/fakes/FakeMail.provider'
import FakeTokensRepository from '@modules/tokens/repositories/fakes/FakeTokens.repository'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import UserForgotPasswordService from './UserForgotPassword.service'
import FakeDateProvider from '@shared/providers/DateProvider/fakes/FakeDate.provider'

let mailProvider: MailProvider
let dateProvider: FakeDateProvider
let fakeTokensRepository: FakeTokensRepository
let fakeUserRepository: FakeUserRepository
let userForgotPasswordService: UserForgotPasswordService

describe('Accounts User ForgotPassword', () => {
  beforeEach(() => {
    mailProvider = new MailProvider()
    dateProvider = new FakeDateProvider()

    fakeTokensRepository = new FakeTokensRepository()
    fakeUserRepository = new FakeUserRepository()

    userForgotPasswordService = new UserForgotPasswordService(
      dateProvider,
      mailProvider,
      fakeTokensRepository,
      fakeUserRepository
    )
  })

  it('should not be able to ForgotPassword with a invalid user', async () => {
    await expect(
      userForgotPasswordService.execute({ email: 'fake_email' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to delete an old token', async () => {
    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    await fakeTokensRepository.create({
      user_id: user.id,
      token: Faker.datatype.uuid(),
      type: 'forgotPassword',
      expire_date: dateProvider.addTime({ time: 15, unit: 'minute' })
    })

    const forgotPassword = await userForgotPasswordService.execute({ email: user.email })

    expect(typeof forgotPassword).toBe('string')
  })

  it('should be able to create a Forgot Token', async () => {
    const user = await fakeUserRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const sendMail = jest.spyOn(mailProvider, 'sendMail')
    const forgotPassword = await userForgotPasswordService.execute({ email: user.email })

    expect(sendMail).toHaveBeenCalled()
    expect(typeof forgotPassword).toBe('string')
  })
})
