import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeSpecificationRepository from '@modules/cars/repositories/fakes/FakeSpecificationRepository'
import SpecificationCreateService from './SpecificationCreate.service'

let fakeSpecificationRepository: FakeSpecificationRepository
let specificationCreateService: SpecificationCreateService

describe('Create Specification', () => {
  beforeEach(() => {
    fakeSpecificationRepository = new FakeSpecificationRepository()
    specificationCreateService = new SpecificationCreateService(fakeSpecificationRepository)
  })

  it('should be able to create a new Specification', async () => {
    const specification = await specificationCreateService.execute({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    })

    expect(specification).toHaveProperty('id')
  })

  it('should not be able to create a duplicate Specification', async () => {
    const newSpecification = {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(3)
    }

    await specificationCreateService.execute(newSpecification)

    await expect(
      specificationCreateService.execute(newSpecification)
    ).rejects.toBeInstanceOf(AppError)
  })
})
