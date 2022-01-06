import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategory.repository'
import CategoryImportService from './CategoryImport.service'
import FakeCsvProvider from '@shared/providers/CsvProvider/fakes/FakeCsv.provider'
import AppError from '@shared/errors/AppError'

let fakeCategoryRepository: FakeCategoryRepository
let categoryImportService: CategoryImportService
let fakeCsvProvider: FakeCsvProvider

describe('Category Create', () => {
  beforeEach(() => {
    fakeCsvProvider = new FakeCsvProvider()
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryImportService = new CategoryImportService(fakeCsvProvider, fakeCategoryRepository)
  })

  it('should not be able to import categories with a invalid CSV', async () => {
    const path = null
    const file = { buffer: null }

    const data = [
      { hello: Faker.name.firstName(1), world: Faker.lorem.words(3) }
    ]

    await fakeCsvProvider.write({ path, data })

    await expect(
      categoryImportService.execute({ file })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to import categories', async () => {
    const path = null
    const file = { buffer: null }

    const data = [
      { name: Faker.name.firstName(1), description: Faker.lorem.words(3) },
      { name: Faker.name.firstName(2), description: Faker.lorem.words(4) }
    ]

    await fakeCsvProvider.write({ path, data })

    const getCategories = await categoryImportService.execute({ file })

    expect(getCategories).toEqual(2)
  })
})
