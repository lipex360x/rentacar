import { Router } from 'express'

import RentailCreateController from '@modules/rentails/useCases/Rentail/Create/RentailCreate.controller'

const router = Router()

const rentailCreateController = new RentailCreateController()

router.post('/', rentailCreateController.handle)

export default router
