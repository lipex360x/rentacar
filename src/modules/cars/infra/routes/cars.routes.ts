import { Router } from 'express'
import multer from 'multer'

import CarCreateController from '@modules/cars/useCases/Car/Create/CarCreate.controller'
import CarListController from '@modules/cars/useCases/Car/List/CarList.controller'
import CarCreateSpecificationController from '@modules/cars/useCases/Car/CreateSpecification/CarCreateSpecification.controller'

import CarImageCreateController from '@modules/cars/useCases/CarImage/Create/CarImageCreate.controller'

import sessionMiddleware from '@shared/middlewares/sessions'
import adminMiddleware from '@shared/middlewares/admin'

import { uploadFile } from '@shared/utils/multerFiles'
const upload = multer(uploadFile({ folder: './tmp/cars' }))

const carsRoutes = Router()

const carCreateController = new CarCreateController()
const carListController = new CarListController()
const carCreateSpecificationController = new CarCreateSpecificationController()
const carImageCreateController = new CarImageCreateController()

carsRoutes.get('/available', carListController.handle)

carsRoutes.use(sessionMiddleware)
carsRoutes.use(adminMiddleware)
carsRoutes.post('/', carCreateController.handle)
carsRoutes.post('/specifications/:id', carCreateSpecificationController.handle)
carsRoutes.post('/images/:id', upload.array('imagesFiles'), carImageCreateController.handle)

export default carsRoutes
