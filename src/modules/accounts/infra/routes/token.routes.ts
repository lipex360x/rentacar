import { Router } from 'express'

import TokenCreateController from '@modules/accounts/useCases/Token/Create/TokenCreate.controller'

const router = Router()

const tokenCreateController = new TokenCreateController()

router.post('/', tokenCreateController.handle)

export default router
