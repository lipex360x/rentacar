import { SpecificationCreateController } from '@modules/cars/useCases/Specification/Create/SpecificationCreateController'
import { SpecificationListController } from '@modules/cars/useCases/Specification/List/SpecificationListController'
import { Router } from 'express'

const specificationsRoutes = Router()

const createController = new SpecificationCreateController()
const listController = new SpecificationListController()

specificationsRoutes.post('/', createController.handle)

specificationsRoutes.get('/', listController.handle)

export { specificationsRoutes }
