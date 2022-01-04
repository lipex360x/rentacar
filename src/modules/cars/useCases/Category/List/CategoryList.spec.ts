import Faker from 'faker'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategory.repository'
import CategoryListService from './CategoryList.service'

let fakeCategoryRepository: FakeCategoryRepository
let categoryListService: CategoryListService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryListService = new CategoryListService(fakeCategoryRepository)
  })

  it('should be able to list categories', async () => {
    await fakeCategoryRepository.create({
      name: Faker.lorem.word(),
      description: Faker.lorem.words()
    })

    await fakeCategoryRepository.create({
      name: Faker.lorem.word(),
      description: Faker.lorem.words()
    })

    await fakeCategoryRepository.create({
      name: Faker.lorem.word(),
      description: Faker.lorem.words()
    })

    const getCategories = await categoryListService.execute()

    expect(getCategories.length).toEqual(3)
  })
})
