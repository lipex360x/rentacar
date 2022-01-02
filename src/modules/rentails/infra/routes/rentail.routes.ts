import { Router } from 'express'

import RentailCreateController from '@modules/rentails/useCases/Rentail/Create/RentailCreate.controller'
import sessionMiddleware from '@shared/middlewares/sessions'

const router = Router()

const rentailCreateController = new RentailCreateController()

router.use(sessionMiddleware)
router.post('/create', rentailCreateController.handle)

export default router
