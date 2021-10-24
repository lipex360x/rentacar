import { specificationCreateController } from '@modules/cars/useCases/Specification/Create'
import { specificationListController } from '@modules/cars/useCases/Specification/List'
import { Router } from 'express'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  return specificationCreateController.handle(request, response)
})

specificationsRoutes.get('/', (request, response) => {
  return specificationListController.handle(request, response)
})

export { specificationsRoutes }
