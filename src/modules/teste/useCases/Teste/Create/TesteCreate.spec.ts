import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeTestesRepository from '@modules/teste/repositories/fakes/FakeTestes.repository'
import TesteCreateService from './TesteCreate.service'

let faketesteRepository: FakeTestesRepository
let testeCreateService: TesteCreateService

describe('Teste Teste Create', () => {
  beforeEach(() => {
    faketesteRepository = new FakeTestesRepository()
    testeCreateService = new TesteCreateService(faketesteRepository)
  })

  it('should be able to Create XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }

    const teste = await testeCreateService.execute({ data })

    expect(teste).toHaveProperty('XXXXXXXXXXXXX')
  })

  it('should not be able to Create XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }
    
    await expect(
      testeCreateService.execute({ data })
    ).rejects.toBeInstanceOf(AppError)
  })
})
