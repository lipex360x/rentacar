import { Router } from 'express'

import UserForgotPasswordController from '@modules/accounts/useCases/User/ForgotPassword/UserForgotPassword.controller'

const router = Router()

const forgotPasswordController = new UserForgotPasswordController()

router.post('/forgot', forgotPasswordController.handle)

export default router
