import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategory.repository'
import CategoryCreateService from './CategoryCreate.service'

let fakeCategoryRepository: FakeCategoryRepository
let categoryCreateService: CategoryCreateService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryCreateService = new CategoryCreateService(fakeCategoryRepository)
  })

  it('should be able to create a new Category', async () => {
    const category = await categoryCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    expect(category).toHaveProperty('id')
  })

  it('should not be able to create a duplicate category', async () => {
    const category = {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    }

    await categoryCreateService.execute(category)

    await expect(
      categoryCreateService.execute(category)
    ).rejects.toBeInstanceOf(AppError)
  })
})
