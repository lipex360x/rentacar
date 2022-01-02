import { Router } from 'express'

import RentailCreateController from '@modules/rentails/useCases/Rentail/Create/RentailCreate.controller'
import sessionMiddleware from '@shared/middlewares/sessions'
import RentailDevolutionController from '@modules/rentails/useCases/Rentail/Devolution/RentailDevolution.controller'

const router = Router()

const rentailCreateController = new RentailCreateController()
const rentailDevolutionController = new RentailDevolutionController()

router.use(sessionMiddleware)
router.post('/create', rentailCreateController.handle)
router.post('/devolution/:id', rentailDevolutionController.handle)

export default router
