import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'
import { CreateSpecificationService } from '@modules/cars/services/CreateSpecificationService'
import { Router } from 'express'

const specificationsRoutes = Router()

const repository = new SpecificationsRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const service = new CreateSpecificationService(repository)

  service.execute({ name, description })

  return response.status(201).send()
})

specificationsRoutes.get('/', (request, response) => {
  const getSpecifications = repository.list()

  return response.json(getSpecifications)
})

export { specificationsRoutes }
