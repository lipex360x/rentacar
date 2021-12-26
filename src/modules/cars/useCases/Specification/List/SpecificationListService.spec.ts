import Faker from 'faker'

import FakeSpecificationRepository from '@modules/cars/repositories/fakes/FakeSpecificationRepository'
import SpecificationCreateService from '../Create/SpecificationCreateService'
import SpecificationListService from './SpecificationListService'

let fakeSpecificationRepository: FakeSpecificationRepository
let specificationCreateService: SpecificationCreateService
let specificationListService: SpecificationListService

describe('Category Create', () => {
  beforeEach(() => {
    fakeSpecificationRepository = new FakeSpecificationRepository()
    specificationCreateService = new SpecificationCreateService(fakeSpecificationRepository)
    specificationListService = new SpecificationListService(fakeSpecificationRepository)
  })

  it('should be able to list categories', async () => {
    await specificationCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    await specificationCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    await specificationCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    const getSpecifications = await specificationListService.execute()

    expect(getSpecifications.length).toEqual(3)
  })
})
