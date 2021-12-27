import Faker from 'faker'

import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository'
import CarListService from './CarList.service'

let fakecarsRepository: FakeCarsRepository
let carListService: CarListService

describe('Cars Car List', () => {
  beforeEach(() => {
    fakecarsRepository = new FakeCarsRepository()
    carListService = new CarListService(fakecarsRepository)
  })

  it('should be able to list all available cars', async () => {
    await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    await fakecarsRepository.create({
      brand: Faker.name.firstName(1),
      model: Faker.name.firstName(2),
      license_plate: Faker.random.word(),
      description: Faker.lorem.words(4),
      daily_rate: Faker.datatype.float(2),
      fine_amount: Faker.datatype.float(2),
      category_id: Faker.datatype.uuid()
    })

    const getCars = await carListService.execute()

    expect(getCars.length).toEqual(3)
  })
})
