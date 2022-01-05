import { Router } from 'express'

import UserForgotPasswordController from '@modules/accounts/useCases/User/ForgotPassword/UserForgotPassword.controller'
import UserResetPasswordController from '@modules/accounts/useCases/User/ResetPassword/UserResetPassword.controller'

const router = Router()

const forgotPasswordController = new UserForgotPasswordController()
const resetPasswordController = new UserResetPasswordController()

router.post('/forgot', forgotPasswordController.handle)
router.post('/reset', resetPasswordController.handle)

export default router
