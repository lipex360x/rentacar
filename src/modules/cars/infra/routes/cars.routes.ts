import { Router } from 'express'

import CarCreateController from '@modules/cars/useCases/Car/Create/CarCreate.controller'
import CarListController from '@modules/cars/useCases/Car/List/CarList.controller'

import sessionMiddleware from '@shared/middlewares/sessions'
import adminMiddleware from '@shared/middlewares/admin'

const carsRoutes = Router()

const carCreateController = new CarCreateController()
const carListController = new CarListController()

carsRoutes.get('/available', carListController.handle)

carsRoutes.use(sessionMiddleware)
carsRoutes.use(adminMiddleware)
carsRoutes.post('/', carCreateController.handle)

export default carsRoutes
