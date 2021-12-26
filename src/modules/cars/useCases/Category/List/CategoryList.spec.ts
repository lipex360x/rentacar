import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategoryRepository'
import CategoryCreateService from '../Create/CategoryCreate.service'
import CategoryListService from './CategoryList.service'

let fakeCategoryRepository: FakeCategoryRepository
let categoryCreateService: CategoryCreateService
let categoryListService: CategoryListService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryListService = new CategoryListService(fakeCategoryRepository)
    categoryCreateService = new CategoryCreateService(fakeCategoryRepository)
  })

  it('should be able to list categories', async () => {
    await categoryCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    await categoryCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    await categoryCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    const getCategories = await categoryListService.execute()

    expect(getCategories.length).toEqual(3)
  })
})
