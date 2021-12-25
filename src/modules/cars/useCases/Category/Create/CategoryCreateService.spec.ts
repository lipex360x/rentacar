import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategoryRepository'
import CategoryCreateService from './CategoryCreateService'

let fakeCategoryRepository: FakeCategoryRepository
let categoryCreateService: CategoryCreateService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryCreateService = new CategoryCreateService(fakeCategoryRepository)
  })

  it('should be able to create a new Category', async () => {
    const newCategory = {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    }

    const category = await categoryCreateService.execute(newCategory)

    expect(category).toHaveProperty('id')
  })

  it('should not be able to create a duplicate category', async () => {
    const newCategory = {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    }

    await categoryCreateService.execute(newCategory)

    await expect(
      categoryCreateService.execute(newCategory)
    ).rejects.toBeInstanceOf(AppError)
  })
})
