import { Router } from 'express'

import RentailCreateController from '@modules/rentails/useCases/Rentail/Create/RentailCreate.controller'
import sessionMiddleware from '@shared/middlewares/sessions'
import RentailDevolutionController from '@modules/rentails/useCases/Rentail/Devolution/RentailDevolution.controller'
import RentailListByUserController from '@modules/rentails/useCases/Rentail/ListByUser/RentailListByUser.controller'

const router = Router()

const rentailCreateController = new RentailCreateController()
const rentailDevolutionController = new RentailDevolutionController()
const rentailListByUserController = new RentailListByUserController()

router.use(sessionMiddleware)
router.post('/create', rentailCreateController.handle)
router.post('/devolution/:id', rentailDevolutionController.handle)
router.get('/listByUser', rentailListByUserController.handle)

export default router
