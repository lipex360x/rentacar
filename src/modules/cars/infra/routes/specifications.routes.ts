import { SpecificationCreateController } from '@modules/cars/useCases/Specification/Create/SpecificationCreateController'
import { SpecificationListController } from '@modules/cars/useCases/Specification/List/SpecificationListController'
import sessionMiddleware from '@shared/middlewares/sessions'
import { Router } from 'express'

const specificationsRoutes = Router()

const createController = new SpecificationCreateController()
const listController = new SpecificationListController()

specificationsRoutes.get('/', listController.handle)

specificationsRoutes.use(sessionMiddleware)
specificationsRoutes.post('/', createController.handle)

export { specificationsRoutes }
