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
      name: Faker.lorem.word(1),
      description: Faker.lorem.words(1)
    })

    await categoryCreateService.execute({
      name: Faker.lorem.word(2),
      description: Faker.lorem.words(2)
    })

    await categoryCreateService.execute({
      name: Faker.lorem.word(3),
      description: Faker.lorem.words(3)
    })

    const getCategories = await categoryListService.execute()

    expect(getCategories.length).toEqual(3)
  })
})
