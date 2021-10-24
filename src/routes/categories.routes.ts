import { Router } from 'express'

import { categoryCreateController } from '@modules/cars/useCases/categoryCreate'
import { categoryListController } from '@modules/cars/useCases/categoryList'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  return categoryCreateController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return categoryListController.handle(request, response)
})

export { categoriesRoutes }
