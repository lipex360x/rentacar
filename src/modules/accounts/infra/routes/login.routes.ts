import { Router } from 'express'

import UserLoginController from '@modules/accounts/useCases/User/Login/UserLogin.controller'
import UserRefreshTokenController from '@modules/accounts/useCases/User/RefreshToken/UserRefreshToken.controller'

const router = Router()

const userLoginController = new UserLoginController()
const userRefreshTokenController = new UserRefreshTokenController()

router.post('/', userLoginController.handle)
router.post('/refresh-token', userRefreshTokenController.handle)

export default router
