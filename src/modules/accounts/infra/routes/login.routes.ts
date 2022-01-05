import { Router } from 'express'

import UserLoginController from '@modules/accounts/useCases/User/Login/UserLogin.controller'

const router = Router()

const userLoginController = new UserLoginController()

router.post('/', userLoginController.handle)

export default router
