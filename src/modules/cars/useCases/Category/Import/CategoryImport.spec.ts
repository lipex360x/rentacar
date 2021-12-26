import Faker from 'faker'

import { writeCsv } from '@shared/utils/csvFiles'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategoryRepository'
import CategoryImportService from './CategoryImport.service'

let fakeCategoryRepository: FakeCategoryRepository
let categoryImportService: CategoryImportService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryImportService = new CategoryImportService(fakeCategoryRepository)
  })

  it('should be able to import categories', async () => {
    const file = {} as Express.Multer.File

    const path = 'tmp/categories.csv'

    const data = [
      { name: Faker.name.firstName(), description: Faker.lorem.words(4) },
      { name: Faker.name.firstName(), description: Faker.lorem.words(3) }
    ]

    await writeCsv({ path, data })

    file.path = path

    const getCategories = await categoryImportService.execute({ file })

    expect(getCategories).toEqual(2)
  })
})
