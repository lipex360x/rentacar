import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCars.repository'
import FakeSpecificationRepository from '@modules/cars/repositories/fakes/FakeSpecification.repository'
import CarSpecificationService from './CarSpecification.service'

let fakecarsRepository: FakeCarsRepository
let fakeSpecificationRepository: FakeSpecificationRepository
let carSpecificationService: CarSpecificationService

describe('Cars Car CreateSpecification', () => {
  beforeEach(() => {
    fakecarsRepository = new FakeCarsRepository()
    fakeSpecificationRepository = new FakeSpecificationRepository()
    carSpecificationService = new CarSpecificationService(fakecarsRepository, fakeSpecificationRepository)
  })

  it('should not be able to add a new specification in a non-existent car ', async () => {
    await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    await expect(
      carSpecificationService.execute({ car_id: 'fake_id', specifications_id: [] })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to add a new specification in a car ', async () => {
    const car = await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    const spec1 = await fakeSpecificationRepository.create({
      name: Faker.lorem.words(1),
      description: Faker.lorem.words(3)
    })

    const spec2 = await fakeSpecificationRepository.create({
      name: Faker.lorem.words(2),
      description: Faker.lorem.words(3)
    })

    const specificationsCar = await carSpecificationService.execute({
      car_id: car.id,
      specifications_id: [spec1.id, spec2.id]
    })

    expect(specificationsCar).toHaveProperty('specifications')
    expect(specificationsCar.specifications.length).toBe(2)
  })
})
