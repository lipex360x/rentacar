import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeTokensRepository from '@modules/accounts/repositories/fakes/FakeTokens.repository'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserForgotPasswordService from './UserForgotPassword.service'
import MailProvider from '@shared/providers/MailProvider/fakes/FakeMail.provider'

let fakeTokensRepository: FakeTokensRepository
let userForgotPasswordService: UserForgotPasswordService
let fakeUserRepository: FakeUserRepository
let mailProvider: MailProvider

describe('Accounts User ForgotPassword', () => {
  beforeEach(() => {
    mailProvider = new MailProvider()

    fakeTokensRepository = new FakeTokensRepository()
    fakeUserRepository = new FakeUserRepository()

    userForgotPasswordService = new UserForgotPasswordService(
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
      type: 'forgotPassword'
    })

    const forgotPassword = await userForgotPasswordService.execute({ email: user.email })

    expect(forgotPassword).toHaveProperty('token')
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
    expect(forgotPassword).toHaveProperty('token')
  })
})
