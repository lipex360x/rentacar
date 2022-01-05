import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeUsersRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'
import FakeDateProvider from '@shared/providers/DateProvider/fakes/FakeDate.provider'
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHash.provider'
import FakeTokensRepository from '@modules/tokens/repositories/fakes/FakeTokens.repository'

import UserResetPasswordService from './UserResetPassword.service'

let fakeUsersRepository: FakeUsersRepository
let fakeDateProvider: FakeDateProvider
let fakeHashProvider: FakeHashProvider
let fakeTokensRepository: FakeTokensRepository
let userResetPasswordService: UserResetPasswordService

describe('Accounts User ResetPassword', () => {
  beforeEach(() => {
    fakeDateProvider = new FakeDateProvider()
    fakeHashProvider = new FakeHashProvider()
    fakeTokensRepository = new FakeTokensRepository()
    fakeUsersRepository = new FakeUsersRepository()

    userResetPasswordService = new UserResetPasswordService(
      fakeDateProvider,
      fakeHashProvider,
      fakeTokensRepository,
      fakeUsersRepository
    )
  })

  it('should not be able to Reset Password with a invalid token', async () => {
    await expect(
      userResetPasswordService.execute({ token: 'fake_token', password: 'fake_password' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to Reset Password with a expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const token = await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: user.id,
      type: 'forgotPassword',
      expire_date: fakeDateProvider.subtractTime({ time: 1, unit: 'day' })
    })

    await expect(
      userResetPasswordService.execute({ token: token.token, password: 'fake_password' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to Reset Password with an invalid user', async () => {
    const token = await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: 'another_user',
      type: 'forgotPassword',
      expire_date: fakeDateProvider.addTime({ time: 1, unit: 'day' })
    })

    await expect(
      userResetPasswordService.execute({ token: token.token, password: 'fake_password' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to Reset Password', async () => {
    const user = await fakeUsersRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const token = await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: user.id,
      type: 'forgotPassword',
      expire_date: fakeDateProvider.addTime({ time: 1, unit: 'day' })
    })

    await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: user.id,
      type: 'refresh',
      expire_date: fakeDateProvider.subtractTime({ time: 1, unit: 'day' })
    })

    await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: user.id,
      type: 'refresh',
      expire_date: fakeDateProvider.subtractTime({ time: 1, unit: 'day' })
    })

    const compareDates = jest.spyOn(fakeDateProvider, 'compareDates')
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await userResetPasswordService.execute({ token: token.token, password: 'fake_password' })

    const getTokens = await fakeTokensRepository.findAll()

    expect(compareDates).toHaveBeenCalled()
    expect(generateHash).toHaveBeenCalled()
    expect(getTokens.length).toEqual(2)
  })
})
