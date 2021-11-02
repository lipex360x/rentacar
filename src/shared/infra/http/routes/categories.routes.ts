import { Router } from 'express'
import multer from 'multer'

import categoryCreateController from '@modules/cars/useCases/Category/Create'
import { categoryListController } from '@modules/cars/useCases/Category/List'
import { categoryImportController } from '@modules/cars/useCases/Category/Import'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

categoriesRoutes.post('/', (request, response) => {
  return categoryCreateController().handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return categoryListController.handle(request, response)
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return categoryImportController.handle(request, response)
})

export { categoriesRoutes }
