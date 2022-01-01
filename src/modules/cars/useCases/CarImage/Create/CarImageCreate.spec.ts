import AppError from '@shared/errors/AppError'
import Faker from 'faker'

import FakeCarsimagesRepository from '@modules/cars/repositories/fakes/FakeCarsimages.repository'
import CarImageCreateService from './CarImageCreate.service'

let fakecarsRepository: FakeCarsimagesRepository
let carImageCreateService: CarImageCreateService

describe('Cars CarImage Create', () => {
  beforeEach(() => {
    fakecarsRepository = new FakeCarsimagesRepository()
    carImageCreateService = new CarImageCreateService(fakecarsRepository)
  })

  it('should be able to Create XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }

    const cars = await carImageCreateService.execute({ data })

    expect(cars).toHaveProperty('XXXXXXXXXXXXX')
  })

  it('should not be able to Create XXXXXXXXXXXXX', async () => {
    const data = {
      value: Faker.lorem.words(3)
    }

    await expect(
      carImageCreateService.execute({ data })
    ).rejects.toBeInstanceOf(AppError)
  })
})
