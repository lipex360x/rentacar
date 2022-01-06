import { Router } from 'express'
import multer from 'multer'

import CarCreateController from '@modules/cars/useCases/Car/Create/CarCreate.controller'
import CarListController from '@modules/cars/useCases/Car/List/CarList.controller'
import CarSpecificationController from '@modules/cars/useCases/Car/Specification/CarSpecification.controller'

import sessionMiddleware from '@shared/middlewares/sessions'
import adminMiddleware from '@shared/middlewares/admin'

import { multerConfig } from '@shared/config/files'

const upload = multer(multerConfig())

const carsRoutes = Router()

const carCreateController = new CarCreateController()
const carListController = new CarListController()
const carSpecificationController = new CarSpecificationController()

carsRoutes.get('/available', carListController.handle)

carsRoutes.use(sessionMiddleware)
carsRoutes.use(adminMiddleware)
carsRoutes.post('/', carCreateController.handle)
carsRoutes.post('/specifications/:id', carSpecificationController.handle)

export default carsRoutes
