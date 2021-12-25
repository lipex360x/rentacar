import { Router } from 'express'

import UserAuthController from '@modules/accounts/useCases/User/Auth/UserAuthController'

const router = Router()

const controllerInstance = new UserAuthController()

router.post('/', controllerInstance.handle)

export default router
