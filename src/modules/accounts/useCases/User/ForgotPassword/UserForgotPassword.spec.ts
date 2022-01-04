import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeTokensRepository from '@modules/accounts/repositories/fakes/FakeTokens.repository'
import FakeUserRepository from '@modules/accounts/repositories/fakes/FakeUserRepository'
import UserForgotPasswordService from './UserForgotPassword.service'
import EtherealProvider from '@shared/providers/MailProvider/implementations/Ethereal.implementation'

let fakeTokensRepository: FakeTokensRepository
let userForgotPasswordService: UserForgotPasswordService
let fakeUserRepository: FakeUserRepository
let mailProvider: EtherealProvider

describe('Accounts User ForgotPassword', () => {
  beforeEach(() => {
    mailProvider = new EtherealProvider()

    fakeUserRepository = new FakeUserRepository()
    fakeTokensRepository = new FakeTokensRepository()
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

    const forgotPassword = await userForgotPasswordService.execute({ email: user.email })

    expect(forgotPassword).toHaveProperty('token')
  })
})
