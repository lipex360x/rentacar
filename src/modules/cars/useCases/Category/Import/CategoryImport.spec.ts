import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategoryRepository'
import CategoryImportService from './CategoryImport.service'
import FastCsvProvider from '@shared/providers/CsvProvider/implementations/FastCsv.implementation'

let fakeCategoryRepository: FakeCategoryRepository
let categoryImportService: CategoryImportService
let csvProvider: FastCsvProvider

describe('Category Create', () => {
  beforeEach(() => {
    csvProvider = new FastCsvProvider()
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryImportService = new CategoryImportService(csvProvider, fakeCategoryRepository)
  })

  it('should be able to import categories', async () => {
    const file = {} as Express.Multer.File

    const path = 'tmp/categories.csv'

    const data = [
      { name: Faker.name.firstName(1), description: Faker.lorem.words(3) },
      { name: Faker.name.firstName(2), description: Faker.lorem.words(4) }
    ]

    await csvProvider.write({ path, data })

    file.path = path

    const getCategories = await categoryImportService.execute({ file })

    expect(getCategories).toEqual(2)
  })
})
