import { Router } from 'express'

import { categoryCreateController } from '@modules/cars/useCases/Category/Create'
import { categoryListController } from '@modules/cars/useCases/Category/List'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  return categoryCreateController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return categoryListController.handle(request, response)
})

export { categoriesRoutes }
