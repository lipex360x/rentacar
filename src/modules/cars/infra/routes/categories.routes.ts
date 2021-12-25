import { Router } from 'express'
import multer from 'multer'

import CategoryCreateController from '@modules/cars/useCases/Category/Create/CategoryCreateController'
import { CategoryListController } from '@modules/cars/useCases/Category/List/CategoryListController'
import { CategoryImportController } from '@modules/cars/useCases/Category/Import/CategoryImportController'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

const createController = new CategoryCreateController()
const listController = new CategoryListController()
const importController = new CategoryImportController()

categoriesRoutes.post('/', createController.handle)

categoriesRoutes.get('/', listController.handle)

categoriesRoutes.post('/import', upload.single('file'), importController.handle)

export { categoriesRoutes }
