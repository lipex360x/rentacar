import { Router } from 'express'

import UserTokenController from '@modules/accounts/useCases/User/Token/UserToken.controller'

const router = Router()

const userTokenController = new UserTokenController()

router.post('/', userTokenController.handle)

export default router
