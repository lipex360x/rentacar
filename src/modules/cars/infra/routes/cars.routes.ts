import { Router } from 'express'

import CarCreateController from '@modules/cars/useCases/Car/Create/CarCreate.controller'
import sessionMiddleware from '@shared/middlewares/sessions'

const carsRoutes = Router()

const carCreateController = new CarCreateController()

carsRoutes.use(sessionMiddleware)
carsRoutes.post('/', carCreateController.handle)

export default carsRoutes
