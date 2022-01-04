import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCars.repository'
import CarCreateService from './CarCreate.service'

let fakecarsRepository: FakeCarsRepository
let carCreateService: CarCreateService

describe('Cars Car Create', () => {
  beforeEach(() => {
    fakecarsRepository = new FakeCarsRepository()
    carCreateService = new CarCreateService(fakecarsRepository)
  })

  it('should be able to create a new car', async () => {
    const createCar = await carCreateService.execute({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    expect(createCar).toHaveProperty('id')
  })

  it('should be able to create a new car with available true by default', async () => {
    const createCar = await carCreateService.execute({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    expect(createCar.available).toBe(true)
  })

  it('should not be able to create a car with exists license plate', async () => {
    const setCar = {
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    }

    await carCreateService.execute(setCar)

    await expect(
      carCreateService.execute(setCar)
    ).rejects.toBeInstanceOf(AppError)
  })
})
