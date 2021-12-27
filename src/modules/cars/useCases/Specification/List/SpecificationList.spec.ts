import Faker from 'faker'

import FakeSpecificationRepository from '@modules/cars/repositories/fakes/FakeSpecificationRepository'
import SpecificationListService from './SpecificationList.service'

let fakeSpecificationRepository: FakeSpecificationRepository
let specificationListService: SpecificationListService

describe('Category Create', () => {
  beforeEach(() => {
    fakeSpecificationRepository = new FakeSpecificationRepository()
    specificationListService = new SpecificationListService(fakeSpecificationRepository)
  })

  it('should be able to list categories', async () => {
    await fakeSpecificationRepository.create({
      name: Faker.lorem.word(1),
      description: Faker.lorem.words(3)
    })

    await fakeSpecificationRepository.create({
      name: Faker.lorem.word(1),
      description: Faker.lorem.words(3)
    })

    await fakeSpecificationRepository.create({
      name: Faker.lorem.word(1),
      description: Faker.lorem.words(3)
    })

    const getSpecifications = await specificationListService.execute()

    expect(getSpecifications.length).toEqual(3)
  })
})
