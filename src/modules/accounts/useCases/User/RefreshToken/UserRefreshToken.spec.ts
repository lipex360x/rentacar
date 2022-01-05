import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeTokensRepository from '@modules/tokens/repositories/fakes/FakeTokens.repository'
import UserRefreshTokenService from './UserRefreshToken.service'
import FakeDateProvider from '@shared/providers/DateProvider/fakes/FakeDate.provider'
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHash.provider'
import FakeUsersRepository from '@modules/accounts/repositories/fakes/FakeUsers.repository'

let fakeTokensRepository: FakeTokensRepository
let userRefreshTokenService: UserRefreshTokenService
let fakeDateProvider: FakeDateProvider
let fakeHashProvider: FakeHashProvider
let fakeUsersRepository: FakeUsersRepository

describe('Accounts User RefreshToken', () => {
  beforeEach(() => {
    fakeTokensRepository = new FakeTokensRepository()
    fakeDateProvider = new FakeDateProvider()
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()

    userRefreshTokenService = new UserRefreshTokenService(
      fakeDateProvider,
      fakeHashProvider,
      fakeUsersRepository,
      fakeTokensRepository
    )
  })

  it('should not be able to create Refresh Token with a invalid token', async () => {
    await expect(
      userRefreshTokenService.execute({ token: 'fake_token' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create Refresh Token with a invalid User', async () => {
    const { token } = await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: 'user_id',
      type: 'refresh',
      expire_date: fakeDateProvider.subtractTime({ time: 1, unit: 'day' })
    })

    await expect(
      userRefreshTokenService.execute({ token })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to Delete a Refresh Token', async () => {
    const user = await fakeUsersRepository.create({
      name: Faker.name.firstName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      driver_license: Faker.datatype.string(8)
    })

    const { token } = await fakeTokensRepository.create({
      token: Faker.datatype.uuid(),
      user_id: user.id,
      type: 'refresh',
      expire_date: fakeDateProvider.subtractTime({ time: 1, unit: 'day' })
    })

    const addTime = jest.spyOn(fakeDateProvider, 'addTime')
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
    const refreshToken = await userRefreshTokenService.execute({ token })

    expect(typeof refreshToken).toBe('string')
    expect(addTime).toHaveBeenCalled()
    expect(generateHash).toHaveBeenCalled()
  })
})
